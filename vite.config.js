import { defineConfig } from 'vite'
import { resolve } from 'path'

export default defineConfig({
  // Nome do repositório no GitHub Pages
  base: '/instituto-maos-que-ajudam/',
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        projetos: resolve(import.meta.dirname, 'projetos.html'),
        cadastro: resolve(import.meta.dirname, 'cadastro.html'),
      },
    },
  },
})
