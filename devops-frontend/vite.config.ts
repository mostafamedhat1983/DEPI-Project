import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/test-shop/', // Add repository name back to base URL
  optimizeDeps: {
    exclude: ['lucide-react'], // Exclude specific dependencies from optimization
  },
  server: {
    host: '0.0.0.0', // Allow access from outside the container
    port: 5174, // Specify the port to match your Docker setup
    hmr: {
      port: 5174, // Enable HMR on the same port
    },
  },
  preview: {
    port: 5174, // Port for the production preview server
  },
});
