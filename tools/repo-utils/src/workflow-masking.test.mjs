import assert from 'node:assert/strict'
import fs from 'node:fs'
import path from 'node:path'
import { test } from 'node:test'

const workflowsDir = path.resolve(
  import.meta.dirname,
  '../../../.github/workflows'
)

// GitHub masks secrets only verbatim, so a value encoded from a secret must be
// masked before any step can print it.
test('workflows mask every base64-encoded variable', () => {
  const unmasked = fs
    .readdirSync(workflowsDir)
    .filter((file) => file.endsWith('.yml'))
    .flatMap((file) => {
      const lines = fs
        .readFileSync(path.join(workflowsDir, file), 'utf8')
        .split('\n')

      return lines.flatMap((line, index) => {
        const name = line.match(/^\s*([A-Z_]+)=\$\(.*\|\s*base64\b/)?.[1]
        if (!name) {
          return []
        }

        const isMasked =
          lines[index + 1]?.trim() === `echo "::add-mask::\${${name}}"`

        return isMasked ? [] : [`${file}:${index + 1} ${name}`]
      })
    })

  assert.deepEqual(unmasked, [])
})
