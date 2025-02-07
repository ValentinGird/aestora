import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  base: "/aestora/",
  plugins: [react()],
  build: {
    outDir: "dist",
    manifest: true, // Permet de générer un manifest pour voir les fichiers générés
    rollupOptions: {
      input: {
        main: "src/main.tsx", // Assure-toi que le fichier d’entrée est bien spécifié
      },
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
