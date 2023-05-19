import { defineConfig } from 'vite';
import { plugin as elm } from 'vite-plugin-elm';
import dns from 'dns';

dns.setDefaultResultOrder('verbatim');

export default defineConfig({
  plugins: [elm()],
  server: {
    open: true,
    // port: 8080,
    // origin: 'http://localhost:5173',
    // proxy: {
    //   '/': {
    //     target: 'http://localhost:5173',
    //     changeOrigin: true,
    //   },
    // },
  },
  build: {
    manifest: true,
    rollupOptions: {
      input: './frontend/src/Main.elm',
    },
    outDir: 'build',
    target: 'es2020',
  },
});
