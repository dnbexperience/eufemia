import path from 'node:path'
import * as sass from 'sass'

const sourceRoot = path.resolve(__dirname, '../..')
const compiledStyles = new Map<string, string>()

export function compileFontTestStyles(file: string) {
  const filePath = path.resolve(sourceRoot, file)
  const cached = compiledStyles.get(filePath)
  if (cached !== undefined) {
    return cached
  }

  // Font verification waits for the real face, even past Firefox's fallback deadline.
  const css = sass
    .compile(filePath)
    .css.replace(/font-display:\s*fallback;/g, 'font-display: block;')

  compiledStyles.set(filePath, css)
  return css
}
