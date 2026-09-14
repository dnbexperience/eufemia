import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import {
  buildInternalLinkMap,
  extractPageLinks,
  formatInternalLinkErrors,
} from './internal-links.mjs'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const portalRoot = path.resolve(__dirname, '../..')
const outDir = path.resolve(portalRoot, 'public')
const renderedPages = []

for (const filePath of findIndexFiles(outDir)) {
  const html = fs.readFileSync(filePath, 'utf8')
  const relativeDir = path.relative(outDir, path.dirname(filePath))
  const url = relativeDir
    ? `/${relativeDir.split(path.sep).join('/')}/`
    : '/'
  renderedPages.push({ url, ...extractPageLinks(html) })
}

const notFoundPath = path.resolve(outDir, '404.html')
if (fs.existsSync(notFoundPath)) {
  renderedPages.push({
    url: '/404/',
    ...extractPageLinks(fs.readFileSync(notFoundPath, 'utf8')),
  })
}

const { manifest, errors } = buildInternalLinkMap(renderedPages)
fs.writeFileSync(
  path.resolve(outDir, 'internal-link-map.json'),
  JSON.stringify(manifest, null, 2) + '\n'
)

if (errors.length > 0) {
  throw new Error(formatInternalLinkErrors(errors))
}

process.stdout.write(
  `✓ Validated internal links across ${renderedPages.length} pages\n`
)

function findIndexFiles(directory) {
  const files = []

  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (entry.name === 'server' || entry.name.startsWith('.')) {
      continue
    }

    const entryPath = path.resolve(directory, entry.name)
    if (entry.isDirectory()) {
      files.push(...findIndexFiles(entryPath))
    } else if (entry.name === 'index.html') {
      files.push(entryPath)
    }
  }

  return files.sort()
}
