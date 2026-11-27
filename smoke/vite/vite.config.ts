import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'assert-forms-dependencies',
      generateBundle(_, bundle) {
        for (const output of Object.values(bundle)) {
          if (output.type !== 'chunk') {
            continue
          }

          for (const [id, module] of Object.entries(output.modules)) {
            if (module.renderedLength === 0) {
              continue
            }

            if (/[/\\]node_modules[/\\]zod[/\\]/.test(id)) {
              this.error(`String-only forms must not bundle Zod: ${id}`)
            }

            if (
              /[/\\]core-js-pure[/\\]modules[/\\]web\.structured-clone\.js$/.test(
                id
              )
            ) {
              this.error(
                `Forms already provides a structuredClone fallback. Do not bundle a second one: ${id}`
              )
            }
          }
        }
      },
    },
  ],
})
