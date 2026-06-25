/* eslint-disable no-console -- this is a CLI entry that prints to stdout */
import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

import { generateStyleManifest } from './generateStyleManifest.ts'

const here = path.dirname(fileURLToPath(import.meta.url))

function parseArgs(argv: string[]): Record<string, string> {
  const args: Record<string, string> = {}

  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i]

    if (!arg.startsWith('--')) {
      continue
    }

    const body = arg.slice(2)
    const eq = body.indexOf('=')

    if (eq !== -1) {
      args[body.slice(0, eq)] = body.slice(eq + 1)
      continue
    }

    const next = argv[i + 1]

    if (next && !next.startsWith('--')) {
      args[body] = next
      i++
    } else {
      args[body] = 'true'
    }
  }

  return args
}

function main(): void {
  const args = parseArgs(process.argv.slice(2))

  const sourceRoot = args.source
    ? path.resolve(process.cwd(), args.source)
    : path.resolve(here, '../../../packages/dnb-eufemia/src')

  if (!fs.existsSync(sourceRoot)) {
    console.error(`Source root not found: ${sourceRoot}`)
    process.exit(1)
  }

  const manifest = generateStyleManifest({
    sourceRoot,
  })
  const json = JSON.stringify(manifest, null, 2)

  if (args.out) {
    const outFile = path.resolve(process.cwd(), args.out)
    fs.mkdirSync(path.dirname(outFile), { recursive: true })
    fs.writeFileSync(outFile, `${json}\n`)
    console.log(
      `Wrote manifest with ${Object.keys(manifest.entries).length} entries to ${outFile}`
    )
  } else {
    console.log(json)
  }
}

main()
