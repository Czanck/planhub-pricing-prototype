import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// `base` must match the GitHub Pages repo name so assets resolve at
// https://czanck.github.io/planhub-pricing-prototype/
// https://vite.dev/config/
export default defineConfig({
  base: '/planhub-pricing-prototype/',
  plugins: [react(), tailwindcss()],
})
