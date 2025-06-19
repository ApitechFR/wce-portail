import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: './',
  plugins: [
    react()
  ],
  assetsInclude: ['**/*.md'],
  server: {
    host: '0.0.0.0',
    port: 3000,
    origin: 'https://jitsi-new.dev.joona.fr',
    hmr: {
      host: 'jitsi-new.dev.joona.fr',
      protocol: 'wss',
      port: 3005
    }
  },
});
