import { defineConfig } from 'vite';
import { plugin as elm } from 'vite-plugin-elm';

export default defineConfig({
  plugins: [elm()],
  build: {
    rollupOptions: {
      input: 'frontend/src/elm.js',
    },
  },
});
