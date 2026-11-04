import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [
    react(),
    {
      name: 'assert-string-fields-without-zod',
      generateBundle(_, bundle) {
        for (const output of Object.values(bundle)) {
          if (output.type !== 'chunk') {
            continue
          }

          const zodModules = Object.entries(output.modules).filter(
            ([id, module]) =>
              /[/\\]node_modules[/\\]zod[/\\]/.test(id) &&
              module.renderedLength > 0
          )

          if (zodModules.length > 0) {
            this.error(
              `String-only forms must not bundle Zod: ${zodModules.map(([id]) => id).join(', ')}`
            )
          }
        }
      },
    },
  ],
})
