import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// If deploying to GitHub Pages at https://<user>.github.io/<repo>/,
// set base to '/<repo>/'. For a user/org page (username.github.io) leave it as '/'.
export default defineConfig({
  base: './',
  plugins: [react()],
  server: {
    port: process.env.PORT ? Number(process.env.PORT) : 5173,
  },
});
