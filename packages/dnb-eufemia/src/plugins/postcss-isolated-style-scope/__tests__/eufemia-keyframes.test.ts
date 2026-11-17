// @vitest-environment node

import fs from 'node:fs'
import path from 'node:path'

const sourceDirectory = path.resolve(__dirname, '../../..')

function readStyles(directory: string): Array<[string, string]> {
  return fs
    .readdirSync(directory, { withFileTypes: true })
    .flatMap((entry) => {
      const file = path.join(directory, entry.name)
      if (entry.isDirectory()) {
        return readStyles(file)
      }
      return entry.name.endsWith('.scss')
        ? [[file, fs.readFileSync(file, 'utf-8')]]
        : []
    })
}

describe('Eufemia keyframes', () => {
  // The isolated build only renames keyframes in animation and animation-name
  it('are not referenced from custom properties', () => {
    const styles = readStyles(sourceDirectory)
    const keyframes = new Set(
      styles.flatMap(([, content]) =>
        [...content.matchAll(/@keyframes\s+([\w-]+)/g)].map(
          ([, name]) => name
        )
      )
    )
    expect(keyframes.size).toBeGreaterThan(30)

    const references = styles.flatMap(([file, content]) =>
      [...content.matchAll(/(--[\w-]+)\s*:([^;{}]*)/g)].flatMap(
        ([, property, value]) =>
          value
            .split(/[\s,()]+/)
            .filter((word) => keyframes.has(word))
            .map(
              (name) =>
                `${path.relative(sourceDirectory, file)}: ${property}: ${name}`
            )
      )
    )
    expect(references).toEqual([])
  })
})
