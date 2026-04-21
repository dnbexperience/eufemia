/**
 * Parse compiled CSS with Lightning CSS so invalid selectors (e.g. pseudo-elements
 * not last) fail at build time, matching what consumers' bundlers report.
 */

import fs from 'fs-extra'
import path from 'path'
import { transform } from 'lightningcss'
import globby from 'globby'
import packpath from 'packpath'

const ROOT_DIR = packpath.self()

export function validateCssBuffer(
  filenameForErrors: string,
  code: Buffer
): void {
  transform({
    filename: filenameForErrors,
    code: new Uint8Array(code),
    errorRecovery: false,
  })
}

export async function validateCompiledCss(): Promise<void> {
  const files = await globby('build/**/*.css', {
    cwd: ROOT_DIR,
    absolute: true,
    onlyFiles: true,
  })

  if (files.length === 0) {
    throw new Error(
      'validateCompiledCss: no CSS files found under build/. Run yarn build:prebuild first.'
    )
  }

  for (const file of files) {
    const content = await fs.readFile(file)

    try {
      validateCssBuffer(file, content)
    } catch (e) {
      const relative = path.relative(ROOT_DIR, file)
      throw new Error(
        `Lightning CSS failed to parse compiled CSS (${relative}): ${
          e instanceof Error ? e.message : e
        }`,
        { cause: e }
      )
    }
  }
}

async function main() {
  await validateCompiledCss()
  console.log('validateCompiledCss: OK')
}

if (require.main === module) {
  main().catch((err) => {
    console.error(err)
    process.exit(1)
  })
}
