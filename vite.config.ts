import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  // public/index.html is served as the root page by Vite's static file server
  // The React SPA entry is now superseded by the Unifex HTML page
});
