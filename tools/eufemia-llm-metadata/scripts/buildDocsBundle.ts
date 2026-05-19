/**
 * Build a single-file JSON bundle of the generated Eufemia docs so that the
 * MCP Cloudflare Worker can ship the docs corpus inside its script bundle
 * (Workers have no `node:fs`, so we cannot read .md files at request time).
 *
 * Reads:    packages/dnb-eufemia/build/docs/**\/(*.md|*.mdx)
 * Writes:   packages/dnb-eufemia/src/mcp/worker/docs.bundle.json
 *
 * The output is a `{ "<rel-path>": "<file contents>" }` map, sorted by path,
 * keyed without a leading slash. The Worker imports the JSON directly via
 * `import bundle from './docs.bundle.json'` and feeds it to
 * `createBundledDocsSource`.
 *
 * The script also fails loudly when the docs root is empty so a misbuild is
 * caught in CI before we ever publish a Worker that has nothing to serve.
 */

import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'
import fs from 'fs-extra'

import { findRepoRoot } from '../src/convertHelpers.ts'

const isDirectRun = () => {
  const entry = process.argv[1]
  if (!entry) {
    return false
  }
  return import.meta.url === pathToFileURL(entry).href
}

if (isDirectRun()) {
  buildDocsBundle()
}

export async function buildDocsBundle(
  options: { docsRoot?: string; outFile?: string } = {}
) {
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = path.dirname(__filename)
  const repoRoot = options.docsRoot ? null : findRepoRoot()

  const docsRoot =
    options.docsRoot ??
    path.join(
      repoRoot as string,
      'packages',
      'dnb-eufemia',
      'build',
      'docs'
    )

  const outFile =
    options.outFile ??
    path.join(
      repoRoot as string,
      'packages',
      'dnb-eufemia',
      'src',
      'mcp',
      'worker',
      'docs.bundle.json'
    )

  console.log(`[docs-bundle] reading docs from: ${docsRoot}`)
  console.log(`[docs-bundle] writing bundle to: ${outFile}`)

  if (!(await fs.pathExists(docsRoot))) {
    throw new Error(
      `[docs-bundle] docs root does not exist: ${docsRoot}\n` +
        '  Run `yarn workspace @dnb/eufemia build:docs` first.'
    )
  }

  const files = await listMarkdownFiles(docsRoot)
  if (files.length === 0) {
    throw new Error(
      `[docs-bundle] no markdown/MDX files found under ${docsRoot}.\n` +
        '  Did `yarn workspace @dnb/eufemia build:docs` succeed?'
    )
  }

  const bundle: Record<string, string> = {}
  for (const rel of files.sort()) {
    const abs = path.join(docsRoot, rel)
    const content = await fs.readFile(abs, 'utf8')
    bundle[rel.replaceAll(path.sep, '/')] = content
  }

  await fs.ensureDir(path.dirname(outFile))
  await fs.writeFile(
    outFile,
    JSON.stringify(bundle, null, 0) + '\n',
    'utf8'
  )

  const sizeBytes = (await fs.stat(outFile)).size
  console.log(
    `[docs-bundle] wrote ${files.length} file(s), ${(sizeBytes / 1024).toFixed(1)} KiB`
  )

  // Reference __dirname so it is not flagged as unused under strict TS.
  void __dirname
}

async function listMarkdownFiles(rootAbs: string): Promise<string[]> {
  const out: string[] = []
  const stack: string[] = ['']

  while (stack.length > 0) {
    const relDir = stack.pop() as string
    const absDir = path.join(rootAbs, relDir)

    let entries
    try {
      entries = await fs.readdir(absDir, { withFileTypes: true })
    } catch {
      continue
    }

    for (const entry of entries) {
      if (entry.name.startsWith('.') || entry.name === 'node_modules') {
        continue
      }
      const relPath = relDir ? path.join(relDir, entry.name) : entry.name
      if (entry.isDirectory()) {
        stack.push(relPath)
        continue
      }
      const lower = entry.name.toLowerCase()
      if (
        entry.isFile() &&
        (lower.endsWith('.md') || lower.endsWith('.mdx'))
      ) {
        out.push(relPath)
      }
    }
  }

  return out
}
