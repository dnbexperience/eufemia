import { transform } from 'lebab'
import { sync } from 'globby'
import fs from 'fs-extra'

export function transformFilesToESM(): void {
  const files: string[] = sync(
    ['./build/**/plugins/**/*.js', '!./build/cjs/plugins/**/*.js'],
    {
      onlyFiles: true,
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
