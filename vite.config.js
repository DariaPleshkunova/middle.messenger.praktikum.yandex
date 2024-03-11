import { resolve } from 'path'
import { defineConfig } from 'vite'
// import handlebars from 'vite-plugin-handlebars';

const root = resolve(__dirname, 'src')
const outDir = resolve(__dirname, 'dist')

export default defineConfig({
  root,
  // plugins: [handlebars()],
  server: {
    port: 3000,
  },
  build: {
    outDir,
  }
}) 