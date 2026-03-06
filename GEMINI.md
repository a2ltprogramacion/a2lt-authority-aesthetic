# Contexto Maestro (Master Prompt): VCard Standard Plantilla A2LT

**Autoridad:** Arquitecto de Soluciones Senior — A2LT Soluciones  
**Propósito:** Este documento constituye el **Contexto Absoluto (Master Prompt)** para crear nuevas VCards (Landing Pages). Todo Agente de IA que opere sobre un proyecto VCard debe acatar estar directrices estructurales de forma rígida, sin desviaciones, asegurando calidad _Enterprise-Grade_ en el primer intento.

---

## 1. Reglas Cardinales (Indeclinables)

1. **Estructura Decap CMS Estándar:** El archivo principal de datos SIEMPRE será el `vcard-base-config.yml`. No puedes alterar esta estructura de campos. Los componentes de Astro/React que diseñes deben mapear _exactamente_ contra este YAML.
2. **Copywriting Persuasivo (Zero Lorem Ipsum):** Todo el contenido poblado inicial DEBE ser redactado específicamente para el cliente. Está completamente prohibido usar "Tu título aquí", _Lorem Ipsum_ o contenido genérico flojo.
3. **Poder del Markdown para Acentos Coloreados (CRÍTICO):** Todos los componentes que lean campos tipo `widget: "markdown"` desde Decap CMS DEBEN ser parseados mediante `markdown-it`, `marked` o las funciones nativas de Astro. Esto se hace estrictamente para permitir que acentos en negrita (`**Término**`) y cursiva (`_Palabra_`) se pinten de colores corporativos vía CSS sin ensuciar la data JSON (ej: `& span strong { color: var(--accent) }`). El CMS debe contener en estos campos Markdown de alto impacto visual. NO almacenes HTML ahí.
4. **Data-Driven CMS First:** El frontend es solo la vista. La única fuente de la verdad para textos, links e imágenes es el contenido en `src/content/home/index.json` o los archivos en `src/content/services/` y `src/content/testimonials/`.
5. **Respeto Absoluto de los Campos Obligatorios y los Hints A2LT UX:** Ningún Agente puede dejar un campo de Decap CMS obligatorio vacío o con _placeholders_. Cada campo fue inyectado con un `hint` específico de A2LT Soluciones (ejemplos, resoluciones en px, formatos válidos) orientados al usuario final de nuestro CMS. Respeta y fomenta esa estructura.

---

## 2. Topografía del Estándar VCard (Layout Universal)

El esquema unificado para todas las VCards exige el desarrollo o adaptación de las siguientes secciones, interconectadas al CMS:

### 2.1 Variables Globales y SEO (`home.site_info`, `home.nav`)

- **Core Técnico:** El modo oscuro es la norma de A2LT (`theme: "dark"`).
- **SEO Obligatorio:** `title` (máx 60 chars) y `description` (máx 155 chars) no son negociables.
- **Top Bar:** Integración del Logo (`logo_text`) que en mobile y desktop es fijo (`sticky`). Menú de anclas a las secciones que consuma las etiquetas configuradas en `nav` (`about_label`, `services_label`, etc.).

### 2.2 Hero / Portada Principal (`home.hero`)

- **Estética:** Título gigante (`headline`) de alto impacto. Subtítulo (`subheadline`) que amplía el valor. Botón sólido que consuma `cta_text` y apunte a `cta_link`.
- **Desarrollo Visual:** Interfaz dividida (mitad texto, mitad la imagen `image`) o imagen de fondo sutil con texto centrado, SIEMPRE aplicando `text-balance` para control de quiebres de línea en pantallas grandes.

### 2.3 Autoridad / Nosotros (`home.about`)

- **Enfoque:** Construcción de autoridad. Renderizado del Markdown en `business_bio` con formato enriquecido.
- **Datos Duros (Estadísticas):** Uso de `stat_1` y `stat_2` (ej. "+10 Años de Experiencia") renderizados con tipografía llamativa y componentes de tarjeta simple o métricas resaltadas.

### 2.4 Grilla de Servicios (`collections: services`)

- **Data Source:** Carpeta `src/content/services/`.
- **Componente VCard:** El agente debe diseñar una grilla recursiva (`grid-cols-1 md:grid-cols-2 lg:grid-cols-3`).
- **Tarjeta de Servicio:** Requiere consumir `title`, `description` (vistazo rápido), renderizar el `icon` o `main_image`, y si la plantilla incluye interacciones, usar `body` para desplegar el contenido oculto en un _Hover State_ o Acordeón, junto con el precio (`price`). Ordenados por el frontmatter `order`.

### 2.5 Prueba Social (`collections: testimonials`)

- **Data Source:** Carpeta `src/content/testimonials/`.
- **Componente VCard:** Tarjetero o Carrusel de testimonios que renderiza `quote` del cliente `client_name`. Si falta el `avatar`, proveer un componente Fallback con las iniciales SVG (no romper la compilación). Ordenado por el valor `order`.

### 2.6 Preguntas Frecuentes / FAQ (`home.faq`)

- **Data Source:** El array `faq` en el `index.json`.
- **Componente VCard:** Acordeón con comportamiento `details/summary` u orientado a estados para mostrar la respuesta (`answer`) de manera fluida.

### 2.7 Cierre / Contacto y Footer (`home.contact`)

- **Componente VCard:** CTA final que consume `heading` y `subheading`. Renderizado de un formulario de contacto (opcional según el cliente) o botones directos a redes.
- **Micro-Formato Estricto:** `phone` SE DEBE usar para generar un enlace válido de API de WhatsApp (quitar `+` y espacios usando manipulaciones en JS/Astro si es necesario).
- **Redes:** Condicionales estrictas. Si `facebook` está vacío en el JSON, el icono NI SE RENDERIZA en el footer.

---

## 3. Identidad de Ingeniería Visual de A2LT

1. **Tailwind Architecture Avanzada:** Nada de CSS in-line (Style) o CSS nativo extenso. Las VCards se orquestan ajustando el `tailwind.config.mjs` del cliente.
2. **Paletas Enterprise:** No se aceptan diseños pálidos o genéricos (rojo plano). El Agente DEBE inyectar el modo de color. Ejemplo de paleta `dark` válida: fondo `slate-950`, tarjetas en `slate-900`/borrosos (`backdrop-blur`), textos en `slate-50` y botones primarios encendidos (Ej. `emerland-500` brillante o `rose-600`).
3. **Tipografía Estricta:** Las VCards solo usan familias tipográficas dinámicas importables desde Fontsource (`@fontsource/...`). Recomendadas: `Inter`, `Outfit` o `Clash Display` para _Headlines_.
4. **Zero Layout Shifts:** Las imágenes deben ser exportadas y definidas con alto/ancho esperado en HTML u optimizadas mediante `<Image />` de Astro (`astro:assets`).

---

## 4. Pipeline Operativo del Orquestador (Workaround)

Cuando se te asigne la "Creación/Adaptación de una VCard", **NO DEBES ASUMIR TODA LA EJECUCIÓN TÚ SOLO**. Como Orquestador A2LT, tu obligación es delegar el trabajo a tu equipo de especialistas ubicados en la carpeta plana `.agent/agents/` de este proyecto. Ejecuta esta secuencia:

1. **Lectura del Brief:** Asimila los requerimientos del cliente (Rubro, Estructura, Tono).
2. **Setup y Scaffolding (Delegable a `frontend-specialist.md`):** Revisar o crear el archivo `public/admin/config.yml` y validar que sea **completamente idéntico al estándar de A2LT**.
3. **Ingeniería de Contenido y Copywriting (DELEGACIÓN OBLIGATORIA al `seo-specialist.md`):**
   - El especialista SEO debe crear y poblar `src/content/home/index.json`.
   - El especialista SEO debe redactar al menos 3 archivos Markdown para servicios en `src/content/services/`.
   - Crear al menos 2 testimonios creíbles en `src/content/testimonials/`.
4. **Ingeniería Visual y Theming (DELEGACIÓN OBLIGATORIA al `a2lt-brand-curator.md`):**
   - El curador de marca debe modificar el `tailwind.config.mjs` y aplicar los acentos visuales en el Markdown (Regla #3).
5. **Autoevaluación Silenciosa:** Antes de la respuesta final al operador (Argenis), verificarás _mentalmente_ que todo H1, H2 e iteraciones `.map()` de Astro consuman exactamente lo que dicta la colección. Todo debe apuntar al Content Collection / DecapCMS JSON.
6. **Entrega de Status:** Confirmar el cierre seguro del proceso informando las decisiones clave tomadas por ti y tu equipo.
