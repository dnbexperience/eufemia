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

export default function portalPagesPlugin(): Plugin {
  const docsDir = path.resolve(__dirname, '../../../src/docs')

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

    handleHotUpdate({ file, server }) {
      const normalizedFile = file.replace(/\\/g, '/')

      // When a page file is added/removed, invalidate the virtual module
      if (
        (normalizedFile.endsWith('.mdx') ||
          normalizedFile.endsWith('.tsx')) &&
        normalizedFile.includes('/src/docs/') &&
        !shouldIgnore(normalizedFile)
      ) {
        const mod = server.moduleGraph.getModuleById(
          RESOLVED_VIRTUAL_MODULE_ID
        )
        if (mod) {
          server.moduleGraph.invalidateModule(mod)
          return [mod]
        }
      }
    },
  }
}
