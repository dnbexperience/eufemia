// @vitest-environment node

import fs from 'fs'
import path from 'path'
import globby from 'globby'

const marker = '_supportsSpacingProps'
const comments = /\/\*[\s\S]*?\*\/|\/\/.*$/gm
const packageRoot = path.resolve(__dirname, '../../../..')
const baselinePath = path.join(
  __dirname,
  'supportsSpacingProps.baseline.json'
)

describe('_supportsSpacingProps migration', () => {
  it('should not add production marker usages', () => {
    const baseline = JSON.parse(
      fs.readFileSync(baselinePath, 'utf8')
    ) as Record<string, number>
    const files = globby.sync('src/**/*.{js,jsx,ts,tsx}', {
      cwd: packageRoot,
      ignore: ['**/__tests__/**', '**/*Docs.{ts,tsx}'],
    })
    const increases: string[] = []

    for (const file of files) {
      const source = fs
        .readFileSync(path.join(packageRoot, file), 'utf8')
        .replace(comments, '')
      const count = source.split(marker).length - 1
      const relativePath = file.replace(/^src\//, '')
      const allowed = baseline[relativePath] ?? 0

      if (count > allowed) {
        increases.push(`${relativePath}: ${count} (allowed ${allowed})`)
      }
    }

    expect(increases).toEqual([])
  })
})
