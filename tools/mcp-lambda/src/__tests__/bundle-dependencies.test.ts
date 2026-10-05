import { describe, it, expect } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { build } from 'esbuild'

const lambdaRoot = fileURLToPath(new URL('../..', import.meta.url))

function readManifest(file: string) {
  return JSON.parse(fs.readFileSync(path.join(lambdaRoot, file), 'utf8'))
}

function packageName(file: string) {
  const [scope = '', name] = file
    .slice(file.lastIndexOf('node_modules/') + 'node_modules/'.length)
    .split('/')

  return scope.startsWith('@') ? `${scope}/${name}` : scope
}

describe('Lambda bundle', () => {
  // @dnb/eufemia is a devDependency, so the audit never sees its devDependencies.
  it('imports only packages that an audited workspace declares as a production dependency', async () => {
    const lambda = readManifest('package.json')
    const eufemia = readManifest('../../packages/dnb-eufemia/package.json')
    const declared = new Set([
      ...Object.keys(lambda.dependencies),
      ...Object.keys(eufemia.dependencies),
    ])

    const entryPoints: string[] = [
      ...lambda.scripts.build.matchAll(/esbuild (\S+\.ts)/g),
    ].map((match) => match[1])

    const { metafile } = await build({
      absWorkingDir: lambdaRoot,
      entryPoints,
      bundle: true,
      platform: 'node',
      format: 'esm',
      external: ['@aws-sdk/*'],
      outdir: 'dist',
      write: false,
      metafile: true,
      logLevel: 'silent',
    })

    const imported = new Set<string>()
    for (const [file, input] of Object.entries(metafile.inputs)) {
      if (file.includes('node_modules/')) {
        continue
      }

      for (const { path: target, external } of input.imports) {
        if (!external && target.includes('node_modules/')) {
          imported.add(packageName(target))
        }
      }
    }

    expect(entryPoints.length).toBeGreaterThan(0)
    expect(imported.size).toBeGreaterThan(0)
    expect([...imported].filter((name) => !declared.has(name))).toEqual([])
  })
})
