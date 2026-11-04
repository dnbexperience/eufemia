import path from 'node:path'
import * as sass from 'sass'

const sourceRoot = path.resolve(__dirname, '../..')

export function compileFontTestStyles(file: string) {
  // Font verification waits for the real face, even past Firefox's fallback deadline.
  return sass
    .compile(path.join(sourceRoot, file))
    .css.replace(/font-display:\s*fallback;/g, 'font-display: block;')
}
