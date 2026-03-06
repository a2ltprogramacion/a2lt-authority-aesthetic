// @astro.config.mjs
// @ts-check
import { defineConfig } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import netlify from '@astrojs/netlify';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  // 1. AGREGA ESTA LÍNEA (Vital para solucionar el error "Invalid URL")
  site: 'https://a2lt-authority-aesthetic.netlify.app',

  vite: {
    plugins: [tailwindcss()]
  },

  adapter: netlify(),
  integrations: [react()]
});