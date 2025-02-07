import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: "/aestora/",  // <-- Ajoute cette ligne pour corriger les chemins
  plugins: [react()],
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});

