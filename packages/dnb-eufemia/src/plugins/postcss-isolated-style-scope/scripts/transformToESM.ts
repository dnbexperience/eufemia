import path from 'path'
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

      // Point .cjs imports to the ESM .js build, when there is one
      .replace(/'([^']+)\.cjs'/g, (match, specifier: string) => {
        const esmFile = path.resolve(path.dirname(file), `${specifier}.js`)
        return fs.existsSync(esmFile) ? `'${specifier}.js'` : match
      })

    const { code: codeOut } = transform(codeIn, ['commonjs'])

    fs.writeFileSync(file, codeOut, 'utf8')
  })
}

// Execute the function if this file is run directly
if (require.main === module) {
  transformFilesToESM()
}
