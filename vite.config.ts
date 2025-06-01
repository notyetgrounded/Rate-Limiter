// vite.config.ts
import { defineConfig } from 'vite'
import dts from 'vite-plugin-dts'

export default defineConfig({
  build: {
    lib: {
      entry: 'src/index.ts',
      name: 'Rate-Limiter',
      fileName: (format) => `my-lib.${format}.js`,
      formats: ['es', 'cjs'],
    },
    rollupOptions: {
      external: [], // Add dependencies you want to exclude from the bundle
    },
  },
  plugins: [dts()],
})
