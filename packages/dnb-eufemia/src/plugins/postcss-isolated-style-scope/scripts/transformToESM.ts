import { transform } from 'lebab'
import * as nodeFs from 'node:fs'
import fs from 'fs-extra'

export function transformFilesToESM(): void {
  const files: string[] = (nodeFs as any).globSync(
    ['./build/**/plugins/**/*.js', '!./build/cjs/plugins/**/*.js'],
    {
      withFileTypes: false,
    }
  )

  files.forEach((file: string) => {
    const codeIn = fs
      .readFileSync(file, 'utf8')

      // Replace .cjs with .js (can be rewritten to a babel plugin at some point)
      .replace(/\.cjs'/g, ".js'")

    const { code: codeOut } = transform(codeIn, ['commonjs'])

    fs.writeFileSync(file, codeOut, 'utf8')
  })
}

// Execute the function if this file is run directly
if (require.main === module) {
  transformFilesToESM()
}
