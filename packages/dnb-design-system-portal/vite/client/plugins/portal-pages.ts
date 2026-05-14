/**
 * Vite plugin that provides file-system based routing for the portal.
 *
 * It scans src/docs/ for .mdx and .tsx page files and generates a
 * virtual module (`virtual:portal-pages`) that exports:
 *   - `routes`: an array of { path, component } for React Router
 *   - `allMdxNodes`: a static data structure with frontmatter and table of contents for all MDX pages
 */

import { type Plugin } from 'vite'
import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'

const VIRTUAL_MODULE_ID = 'virtual:portal-pages'
const RESOLVED_VIRTUAL_MODULE_ID = '\0' + VIRTUAL_MODULE_ID

// Patterns to ignore when scanning for page files.
const IGNORE_PATTERNS = [
  /\/Examples\./,
  /_not_in_use/,
  /\/CardProductsTable\.js$/,
  /\/ColorTable\.tsx$/,
  /\/assets\//,
  /\/__utils__\//,
  /\/_[^/]+\.[^/]+$/, // underscore-prefixed files (e.g. _helpers.tsx)
]

export type TableOfContentsItem = {
  url: string
  title: string
  items?: TableOfContentsItem[]
}

export type PageFileInfo = {
  filePath: string
  slug: string
  frontmatter: Record<string, unknown>
  tableOfContents?: { items: TableOfContentsItem[] }
  type: 'mdx' | 'tsx'
}

export type PortalPagesPluginOptions = {
  docsDir?: string
}

export function shouldIgnore(filePath: string): boolean {
  return IGNORE_PATTERNS.some((pattern) => pattern.test(filePath))
}

/**
 * Convert a heading title to a URL-friendly slug.
 */
export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
}

/**
 * Extract a table-of-contents tree from MDX content by parsing
 * markdown headings (## and ###).
 */
export function extractTableOfContents(
  mdxContent: string
): { items: TableOfContentsItem[] } | undefined {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm
  const items: TableOfContentsItem[] = []
  let match: RegExpExecArray | null

  while ((match = headingRegex.exec(mdxContent)) !== null) {
    const depth = match[1].length
    const title = match[2].trim()
    const url = `#${slugify(title)}`

    if (depth === 2) {
      items.push({ url, title })
    } else if (depth === 3 && items.length > 0) {
      const parent = items[items.length - 1]
      if (!parent.items) {
        parent.items = []
      }
      parent.items.push({ url, title })
    }
  }

  if (items.length === 0) {
    return undefined
  }

  return { items }
}

export function scanPageFiles(docsDir: string): PageFileInfo[] {
  const results: PageFileInfo[] = []

  function walk(dir: string) {
    for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
      const fullPath = path.join(dir, entry.name)

      if (entry.isDirectory()) {
        walk(fullPath)
        continue
      }

      if (shouldIgnore(fullPath)) {
        continue
      }

      const isMdx =
        entry.name.endsWith('.mdx') && !entry.name.startsWith('_')
      const isTsx = entry.name.endsWith('.tsx')

      if (!isMdx && !isTsx) {
        continue
      }

      const relativePath = path.relative(docsDir, fullPath)
      const slug = relativePath
        .replace(/\.(mdx|tsx)$/, '')
        .replace(/(^|\/)index$/, '$1')
        .replace(/\/$/, '')

      let frontmatter: Record<string, unknown> = {}
      let tableOfContents: { items: TableOfContentsItem[] } | undefined
      if (isMdx) {
        try {
          const content = fs.readFileSync(fullPath, 'utf-8')
          const parsed = matter(content)
          frontmatter = parsed.data
          tableOfContents = extractTableOfContents(parsed.content)
        } catch {
          // ignore frontmatter parse errors
        }
      }

      results.push({
        filePath: fullPath,
        slug,
        frontmatter,
        tableOfContents,
        type: isMdx ? 'mdx' : 'tsx',
      })
    }
  }

  walk(docsDir)
  return results
}

export function readPageFileInfo(
  filePath: string,
  docsDir: string
): PageFileInfo | null {
  if (shouldIgnore(filePath)) {
    return null
  }

  const normalizedPath = filePath.replace(/\\/g, '/')
  const normalizedDocsDir = docsDir.replace(/\\/g, '/')

  if (!normalizedPath.startsWith(normalizedDocsDir + '/')) {
    return null
  }

  const entryName = path.basename(filePath)
  const isMdx = entryName.endsWith('.mdx') && !entryName.startsWith('_')
  const isTsx = entryName.endsWith('.tsx')

  if (!isMdx && !isTsx) {
    return null
  }

  const relativePath = path.relative(docsDir, filePath)
  const slug = relativePath
    .replace(/\.(mdx|tsx)$/, '')
    .replace(/(^|\/)index$/, '$1')
    .replace(/\/$/, '')

  let frontmatter: Record<string, unknown> = {}
  let tableOfContents: { items: TableOfContentsItem[] } | undefined

  if (isMdx) {
    try {
      const content = fs.readFileSync(filePath, 'utf-8')
      const parsed = matter(content)
      frontmatter = parsed.data
      tableOfContents = extractTableOfContents(parsed.content)
    } catch {
      // ignore frontmatter parse errors
    }
  }

  return {
    filePath,
    slug,
    frontmatter,
    tableOfContents,
    type: isMdx ? 'mdx' : 'tsx',
  }
}

export function getVirtualModuleSignature(
  file: PageFileInfo
): string | null {
  if (file.type !== 'mdx') {
    return null
  }

  return JSON.stringify({
    slug: file.slug,
    frontmatter: file.frontmatter,
    isFirstTab:
      file.frontmatter.showTabs &&
      !file.frontmatter.title &&
      file.slug.endsWith('/info'),
    redirectFrom: file.frontmatter.redirect_from,
  })
}

export default function portalPagesPlugin(
  options: PortalPagesPluginOptions = {}
): Plugin {
  const docsDir =
    options.docsDir ?? path.resolve(__dirname, '../../../src/docs')
  const normalizedDocsDir = docsDir.replace(/\\/g, '/')
  const pageSignatures = new Map<string, string | null>()

  return {
    name: 'vite-plugin-portal-pages',

    resolveId(id) {
      if (id === VIRTUAL_MODULE_ID) {
        return RESOLVED_VIRTUAL_MODULE_ID
      }
    },

    load(id) {
      if (id === RESOLVED_VIRTUAL_MODULE_ID) {
        const files = scanPageFiles(docsDir)

        pageSignatures.clear()
        for (const file of files) {
          pageSignatures.set(
            file.filePath.replace(/\\/g, '/'),
            getVirtualModuleSignature(file)
          )
        }

        // Generate lazy import statements and route definitions
        const routeDefs: string[] = []
        const nodeEntries: string[] = []
        const redirectDefs: string[] = []

        files.forEach((file) => {
          const importPath = file.filePath.replace(/\\/g, '/')

          // First-tab pages (e.g. info.mdx with showTabs but no title)
          // redirect to the parent page instead of rendering separately.
          // The parent page already includes this content.
          const isFirstTab =
            file.type === 'mdx' &&
            file.frontmatter.showTabs &&
            !file.frontmatter.title &&
            file.slug.endsWith('/info')

          if (isFirstTab) {
            const parentSlug = file.slug.replace(/\/info$/, '')
            redirectDefs.push(
              `  { path: '/${file.slug}', loader: () => redirect('/${parentSlug}/') },`
            )
            redirectDefs.push(
              `  { path: '/${file.slug}/', loader: () => redirect('/${parentSlug}/') },`
            )
          } else if (file.slug === '') {
            // Homepage: index route
            routeDefs.push(
              `  { index: true, lazy: () => import('${importPath}').then(m => ({ Component: m.default })) },`
            )
          } else {
            // Register both with and without trailing slash so links work either way
            routeDefs.push(
              `  { path: '/${file.slug}', lazy: () => import('${importPath}').then(m => ({ Component: m.default })) },`
            )
            routeDefs.push(
              `  { path: '/${file.slug}/', lazy: () => import('${importPath}').then(m => ({ Component: m.default })) },`
            )
          }

          // Only MDX files contribute to the allMdxNodes data structure
          // (TSX pages like index.tsx, 404.tsx don't have frontmatter for the sidebar)
          if (file.type === 'mdx') {
            const nodeData: Record<string, unknown> = {
              fields: { slug: file.slug },
              frontmatter: file.frontmatter,
            }
            if (file.tableOfContents) {
              nodeData.tableOfContents = file.tableOfContents
            }
            nodeEntries.push(`  ${JSON.stringify(nodeData)},`)

            // Collect redirect_from frontmatter for redirect routes
            const redirectFrom = file.frontmatter.redirect_from
            if (Array.isArray(redirectFrom)) {
              for (const from of redirectFrom) {
                const fromPath = String(from).replace(/\/$/, '')
                const target = `/${file.slug}/`
                redirectDefs.push(
                  `  { path: '${fromPath}', loader: () => redirect('${target}') },`
                )
                redirectDefs.push(
                  `  { path: '${fromPath}/', loader: () => redirect('${target}') },`
                )
              }
            }
          }
        })

        // Add catch-all 404 route — wraps the 404 page component to inject location prop
        const notFoundPath = path
          .join(docsDir, '404.tsx')
          .replace(/\\/g, '/')
        routeDefs.push(
          `  { path: '*', lazy: () => import('${notFoundPath}').then(m => ({ Component: () => React.createElement(WithLocationProps, { Component: m.default }) })) },`
        )

        return `
import React from 'react';
import { redirect, useLocation } from 'react-router-dom';

// Wrapper for page components that expect Gatsby-style props (location, etc.)
function WithLocationProps({ Component }) {
  const location = useLocation();
  return React.createElement(Component, { location });
}

export const routes = [
${redirectDefs.join('\n')}
${routeDefs.join('\n')}
];

export const allMdxNodes = [
${nodeEntries.join('\n')}
];
`
      }
    },

    configureServer(server) {
      function isPageFile(file: string) {
        const normalized = file.replace(/\\/g, '/')
        return (
          normalized.startsWith(normalizedDocsDir + '/') &&
          !shouldIgnore(normalized) &&
          (normalized.endsWith('.mdx') || normalized.endsWith('.tsx'))
        )
      }

      function invalidateRoutes() {
        const mod = server.moduleGraph.getModuleById(
          RESOLVED_VIRTUAL_MODULE_ID
        )
        if (mod) {
          server.moduleGraph.invalidateModule(mod)
          server.ws.send({ type: 'full-reload' })
        }
      }

      // Rebuild routes when page files are added or removed (renames
      // show up as an unlink + add pair). handleHotUpdate only fires
      // for files already in the module graph, so it cannot detect new pages.
      server.watcher.on('add', (file) => {
        if (isPageFile(file)) {
          invalidateRoutes()
        }
      })
      server.watcher.on('unlink', (file) => {
        if (isPageFile(file)) {
          pageSignatures.delete(file.replace(/\\/g, '/'))
          invalidateRoutes()
        }
      })
    },

    handleHotUpdate({ file, modules, server }) {
      const normalizedFile = file.replace(/\\/g, '/')

      // Let regular module HMR handle page content edits. Only invalidate the
      // virtual registry when route/sidebar metadata changes.
      if (
        normalizedFile.endsWith('.mdx') &&
        normalizedFile.startsWith(normalizedDocsDir + '/') &&
        !shouldIgnore(normalizedFile)
      ) {
        const nextFileInfo = readPageFileInfo(file, docsDir)
        const nextSignature = nextFileInfo
          ? getVirtualModuleSignature(nextFileInfo)
          : null
        const previousSignature = pageSignatures.get(normalizedFile)

        pageSignatures.set(normalizedFile, nextSignature)

        if (previousSignature === nextSignature) {
          return
        }

        const mod = server.moduleGraph.getModuleById(
          RESOLVED_VIRTUAL_MODULE_ID
        )
        if (mod) {
          server.moduleGraph.invalidateModule(mod)
          return modules.includes(mod) ? modules : [...modules, mod]
        }
      }
    },
  }
}
