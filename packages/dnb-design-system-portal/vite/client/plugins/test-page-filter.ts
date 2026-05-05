/**
 * Vite plugin that dramatically speeds up test builds by only keeping
 * the pages that tests actually visit.
 *
 * The full portal has 500+ pages. Building all of them for a screenshot
 * test that only visits 20 pages is wasteful — it turns a 30-second
 * build into a 5-minute build. This plugin solves that by:
 *
 * 1. Scanning test files to find which portal URLs they reference
 * 2. Building an allowlist of only those pages (plus error pages)
 * 3. Filtering out all other routes from the virtual:portal-pages module
 *
 * Environment variables:
 * - `IS_VISUAL_TEST=1` — extracts URLs from `setupPageScreenshot()` /
 *   `makeScreenshot()` calls in `.screenshot.test.ts` files
 * - `IS_E2E=1` — extracts URLs from `page.goto()` calls in
 *   `.spec.ts` / `.e2e.spec.ts` files
 *
 * When neither variable is set, the plugin does nothing.
 */

import { type Plugin } from 'vite'
import { readFileSync, readdirSync } from 'node:fs'
import path from 'node:path'
import ts from 'typescript'

const repoRoot = path.resolve(__dirname, '..', '..', '..', '..', '..')

const GENERAL_TEST_PAGES = ['/404', '/404.html', '/500', '/500.html']

const VISUAL_TEST_FALLBACK_PAGES = ['/visual-tests', '/demos']

const E2E_TEST_FALLBACK_PAGES = [
  '/',
  '/design-system/',
  '/uilib/components/',
  '/uilib/extensions/',
  '/uilib/elements/',
  '/uilib/components/button/',
  '/uilib/components/button/demos/',
  '/uilib/components/textarea/demos/',
  '/uilib/about-the-lib/',
  '/uilib/components/card/',
  '/uilib/typography/',
  '/quickguide-designer/colors/',
  '/quickguide-designer/fonts/',
  '/contribute/getting-started/',
]

export default function testPageFilterPlugin(): Plugin {
  const isVisualTest = process.env.IS_VISUAL_TEST === '1'
  const isE2e = process.env.IS_E2E === '1'

  if (!isVisualTest && !isE2e) {
    return { name: 'test-page-filter' }
  }

  let allowlist: Set<string>

  if (isVisualTest) {
    allowlist = mergePageSets(
      mergePageSets(
        new Set(GENERAL_TEST_PAGES.map(normalizePagePath).filter(Boolean)),
        new Set(
          VISUAL_TEST_FALLBACK_PAGES.map(normalizePagePath).filter(Boolean)
        )
      ),
      collectVisualTestPages()
    )
  } else {
    allowlist = mergePageSets(
      mergePageSets(
        new Set(GENERAL_TEST_PAGES.map(normalizePagePath).filter(Boolean)),
        new Set(
          E2E_TEST_FALLBACK_PAGES.map(normalizePagePath).filter(Boolean)
        )
      ),
      collectE2eTestPages()
    )
  }

  return {
    name: 'test-page-filter',
    enforce: 'post',

    transform(code, id) {
      if (!id.includes('virtual:portal-pages')) {
        return null
      }

      // Inject a filter that removes routes not in the allowlist
      const filterCode = `
;(function filterTestPages() {
  const allowlist = new Set(${JSON.stringify(Array.from(allowlist))});

  function normalize(p) {
    if (!p) return null;
    return p.replace(/\\/+$/, '') || '/';
  }

  const originalLength = routes.length;
  const filtered = routes.filter(r => {
    if (r.index) return true;
    const norm = normalize(r.path);
    if (!norm) return true;
    if (norm === '/404' || norm === '/500') return true;
    return allowlist.has(norm);
  });

  routes.length = 0;
  routes.push(...filtered);
})();
`

      return { code: code + filterCode, map: null }
    },
  }
}

// -- URL collection helpers shared by the production test build --

export function collectVisualTestPages(): Set<string> {
  const testDir = path.join(repoRoot, 'packages', 'dnb-eufemia', 'src')
  const screenshotFiles = collectTestFiles(testDir, (name) => {
    return (
      name.endsWith('.screenshot.test.ts') ||
      name.endsWith('.screenshot.test.tsx') ||
      name.endsWith('.screenshot.test.js') ||
      name.endsWith('.screenshot.test.jsx')
    )
  })

  const pages = new Set<string>()

  for (const file of screenshotFiles) {
    const urls = extractVisualTestUrls(file)
    urls.forEach((value) => {
      if (value) {
        pages.add(value)
      }
    })
  }

  return pages
}

export function collectE2eTestPages(): Set<string> {
  const portalDir = path.join(
    repoRoot,
    'packages',
    'dnb-design-system-portal',
    'src',
    'e2e'
  )
  const portalFiles = collectTestFiles(
    portalDir,
    (name) => name.endsWith('.spec.ts') || name.endsWith('.spec.tsx')
  )

  const componentRoot = path.join(
    repoRoot,
    'packages',
    'dnb-eufemia',
    'src'
  )
  const componentFiles = collectTestFiles(
    componentRoot,
    (name) =>
      name.endsWith('.e2e.spec.ts') || name.endsWith('.e2e.spec.tsx')
  )

  const pages = new Set<string>()

  for (const file of [...portalFiles, ...componentFiles]) {
    const urls = extractPageGotoUrls(file)
    urls.forEach((value) => {
      if (value) {
        pages.add(value)
      }
    })
  }

  return pages
}

export function collectTestFiles(
  baseDir: string,
  matcher: (name: string) => boolean
): string[] {
  const found: string[] = []

  function traverse(dir: string) {
    let entries
    try {
      entries = readdirSync(dir, { withFileTypes: true })
    } catch {
      return
    }

    for (const entry of entries) {
      if (entry.name === 'node_modules' || entry.name === '.git') {
        continue
      }

      const entryPath = path.join(dir, entry.name)

      if (entry.isDirectory()) {
        traverse(entryPath)
        continue
      }

      if (matcher(entry.name)) {
        found.push(entryPath)
      }
    }
  }

  traverse(baseDir)
  return found
}

export function extractVisualTestUrls(filePath: string): Set<string> {
  const pages = new Set<string>()
  const sourceFile = parseSourceFile(filePath)
  const constants = collectStringConstants(sourceFile)

  function visit(node: ts.Node) {
    if (
      ts.isCallExpression(node) &&
      ts.isIdentifier(node.expression) &&
      (node.expression.text === 'setupPageScreenshot' ||
        node.expression.text === 'makeScreenshot')
    ) {
      const [arg] = node.arguments
      if (arg && ts.isObjectLiteralExpression(arg)) {
        collectUrlsFromObject(arg, constants, pages)
      }
    }

    ts.forEachChild(node, visit)
  }

  visit(sourceFile)
  return pages
}

function collectUrlsFromObject(
  objectNode: ts.ObjectLiteralExpression,
  constants: Map<string, string>,
  pages: Set<string>
) {
  for (const prop of objectNode.properties) {
    if (
      ts.isPropertyAssignment(prop) &&
      getPropertyName(prop.name) === 'url'
    ) {
      const value =
        getLiteralValue(prop.initializer) ??
        (ts.isIdentifier(prop.initializer)
          ? constants.get(prop.initializer.text)
          : null)
      addNormalizedUrl(value, pages)
    } else if (
      ts.isShorthandPropertyAssignment(prop) &&
      prop.name.text === 'url'
    ) {
      const value = constants.get(prop.name.text)
      addNormalizedUrl(value, pages)
    }
  }
}

function addNormalizedUrl(
  value: string | null | undefined,
  pages: Set<string>
) {
  const normalized = normalizePagePath(value)
  if (normalized && isPortalPath(normalized)) {
    pages.add(normalized)
  }
}

export function extractPageGotoUrls(filePath: string): Set<string> {
  const pages = new Set<string>()
  const sourceFile = parseSourceFile(filePath)
  const constants = collectStringConstants(sourceFile)

  function visit(node: ts.Node) {
    if (
      ts.isCallExpression(node) &&
      ts.isPropertyAccessExpression(node.expression) &&
      node.expression.name.text === 'goto'
    ) {
      const [arg] = node.arguments
      const rawValue =
        getLiteralValue(arg) ??
        (ts.isIdentifier(arg) ? constants.get(arg.text) : null)

      const normalized = normalizePagePath(rawValue)
      if (normalized && isPortalPath(normalized)) {
        pages.add(normalized)
      }
    }

    ts.forEachChild(node, visit)
  }

  visit(sourceFile)
  return pages
}

function parseSourceFile(filePath: string): ts.SourceFile {
  const content = readFileSync(filePath, 'utf8')
  let scriptKind = ts.ScriptKind.TS

  if (filePath.endsWith('.tsx') || filePath.endsWith('.jsx')) {
    scriptKind = ts.ScriptKind.TSX
  } else if (filePath.endsWith('.js')) {
    scriptKind = ts.ScriptKind.JS
  }

  return ts.createSourceFile(
    filePath,
    content,
    ts.ScriptTarget.Latest,
    true,
    scriptKind
  )
}

function collectStringConstants(
  sourceFile: ts.SourceFile
): Map<string, string> {
  const constants = new Map<string, string>()

  function visit(node: ts.Node) {
    if (
      ts.isVariableDeclaration(node) &&
      ts.isIdentifier(node.name) &&
      node.initializer
    ) {
      const literal = getLiteralValue(node.initializer)
      if (literal) {
        constants.set(node.name.text, literal)
      }
    }

    ts.forEachChild(node, visit)
  }

  visit(sourceFile)
  return constants
}

function getLiteralValue(node: ts.Node | undefined): string | null {
  if (!node) {
    return null
  }

  if (
    ts.isStringLiteral(node) ||
    ts.isNoSubstitutionTemplateLiteral(node)
  ) {
    return node.text
  }

  return null
}

function getPropertyName(name: ts.PropertyName): string | null {
  if (ts.isIdentifier(name) || ts.isStringLiteral(name)) {
    return name.text
  }

  return null
}

export function normalizePagePath(
  rawPath: string | null | undefined
): string | null {
  if (typeof rawPath !== 'string') {
    return null
  }

  const trimmed = rawPath.trim()
  if (!trimmed) {
    return null
  }

  const cleaned = trimmed.replace(/[?#].*$/, '').replace(/\/$/, '')
  if (cleaned === '') {
    return '/'
  }

  return cleaned.startsWith('/') ? cleaned : `/${cleaned}`
}

function isPortalPath(value: string): boolean {
  return value.startsWith('/')
}

function mergePageSets(
  baseSet: Set<string>,
  extraSet: Set<string>
): Set<string> {
  const merged = new Set(baseSet)
  extraSet.forEach((page) => merged.add(page))

  return merged
}
