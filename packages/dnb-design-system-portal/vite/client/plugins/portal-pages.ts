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
import matter from '@11ty/gray-matter'
import {
  getSlugFromMdxHeading,
  getSlugFromText,
} from '../../../src/uilib/utils/slug.mjs'
import type {
  MdxFrontmatter,
  MdxNode,
  PageFileInfo,
  TableOfContentsItem,
} from './portal-pages.shared'
import {
  compareByOrder,
  getPageRedirects,
  isFirstTabPage,
} from './portal-pages.shared'

const PAGE_MODULE_PREFIX = 'virtual:portal-page/'
const DATA_MODULE_ID = 'virtual:portal-data'
const TOC_MODULE_ID = 'virtual:portal-toc'
const VIRTUAL_MODULE_ID = 'virtual:portal-pages'
const RESOLVED_VIRTUAL_MODULE_ID = '\0' + VIRTUAL_MODULE_ID
const PORTAL_DOCS_SOURCE_PATH =
  'packages/dnb-design-system-portal/src/docs'

// Patterns to ignore when scanning for page files.
const IGNORE_PATTERNS = [
  /\/Examples\./,
  /_not_in_use/,
  /\/[A-Z][^/]*\.tsx$/, // PascalCase TSX files are components that pages import
  /\/assets\//,
  /\/__utils__\//,
  /\/_[^/]+\.[^/]+$/, // underscore-prefixed files (e.g. _helpers.tsx)
]
// The page shape lives in a types-only file, so app code can import it
// without reaching into this module's build-time dependencies.
export type {
  TableOfContentsItem,
  KnownFrontmatter,
  MdxFrontmatter,
  MdxNode,
  PageFileInfo,
} from './portal-pages.shared'

export type PortalPagesPluginOptions = {
  docsDir?: string
}

export function shouldIgnore(filePath: string): boolean {
  return IGNORE_PATTERNS.some((pattern) => pattern.test(filePath))
}

/**
 * Extract a table-of-contents tree from MDX content by parsing
 * markdown headings (## and ###).
 *
 * The shallowest heading level present sets the top level, so partials
 * that only use ### list their headings instead of dropping them.
 */
export function extractTableOfContents(
  mdxContent: string
): { items: TableOfContentsItem[] } | undefined {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm
  const firstDepth = /^##\s+.+$/m.test(mdxContent) ? 2 : 3
  const items: TableOfContentsItem[] = []
  let match: RegExpExecArray | null

  while ((match = headingRegex.exec(mdxContent)) !== null) {
    const depth = match[1].length
    const title = match[2].trim()
    const url = `#${getSlugFromMdxHeading(match[0])}`

    if (depth === firstDepth) {
      items.push({ url, title })
    } else if (depth === firstDepth + 1 && items.length > 0) {
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

/** Where the portal's pages live, when no other location is given. */
export function getDefaultDocsDir() {
  return path.resolve(__dirname, '../../../src/docs')
}

/**
 * Read every page from disk and build the two lists the portal exposes.
 *
 * This is the single definition of the portal's page data. The Vite plugin
 * calls it to build `virtual:portal-pages`, and tools that run outside Vite —
 * such as the LLM markdown generator — call it to get the identical lists.
 */
export function getPortalPages(docsDir: string = getDefaultDocsDir()) {
  const files = scanPageFiles(docsDir)
  const allMdxNodes = toMdxNodes(files)

  return {
    files,
    allMdxNodes,
    regularMdxNodes: toRegularMdxNodes(allMdxNodes),
  }
}

/**
 * The listable pages, in the order lists expect them: a title, not a draft,
 * sorted by `order` with pages that have none last, and by title within an
 * order.
 */
export function toRegularMdxNodes(nodes: MdxNode[]): MdxNode[] {
  return nodes
    .filter(
      (node) =>
        node.frontmatter?.title &&
        node.frontmatter?.draft !== true &&
        node.frontmatter?.route !== false
    )
    .sort((a, b) => {
      return String(a.frontmatter.title).localeCompare(
        String(b.frontmatter.title)
      )
    })
    .sort((a, b) =>
      compareByOrder(a.frontmatter.order, b.frontmatter.order)
    )
}

/** Every MDX page found on disk, in the shape the virtual module exposes. */
export function toMdxNodes(files: PageFileInfo[]): MdxNode[] {
  return files
    .filter((file) => file.type === 'mdx')
    .map((file) => ({
      fields: { slug: file.slug, sourcePath: file.sourcePath },
      frontmatter: file.frontmatter,
      ...(file.tableOfContents
        ? { tableOfContents: file.tableOfContents }
        : {}),
    }))
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
      const normalizedRelativePath = relativePath.replace(/\\/g, '/')
      let slug = normalizedRelativePath
        .replace(/\.(mdx|tsx)$/, '')
        .replace(/(^|\/)index$/, '$1')
        .replace(/\/$/, '')

      let frontmatter: MdxFrontmatter = {}
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

      if (typeof frontmatter.slug === 'string') {
        slug = frontmatter.slug.replace(/^\/+|\/+$/g, '')
      }
      results.push({
        filePath: fullPath,
        sourcePath: `${PORTAL_DOCS_SOURCE_PATH}/${normalizedRelativePath}`,
        slug,
        frontmatter,
        tableOfContents,
        type: isMdx ? 'mdx' : 'tsx',
      })
    }
  }

  walk(docsDir)
  return inheritTabTitleFragments(results)
}

function inheritTabTitleFragments(files: PageFileInfo[]): PageFileInfo[] {
  const pages = new Map(
    files
      .filter(({ type }) => type === 'mdx')
      .map((file) => [file.slug, file])
  )
  return files.map((file) => {
    const fm = file.frontmatter
    if (
      file.type !== 'mdx' ||
      !fm.showTabs ||
      fm.title ||
      fm.contentTitle
    ) {
      return file
    }
    let parentSlug = file.slug
    let parent: PageFileInfo | undefined
    while (parentSlug.includes('/') && !parent) {
      parentSlug = parentSlug.slice(0, parentSlug.lastIndexOf('/'))
      parent = pages.get(parentSlug)
    }
    if (
      !parent?.frontmatter.title ||
      !parent.frontmatter.legacyFragments
    ) {
      return file
    }
    const titleHash = '#' + getSlugFromText(parent.frontmatter.title)
    const inherited: Record<string, string> = {}
    for (const [key, target] of Object.entries(
      parent.frontmatter.legacyFragments
    )) {
      const url = new URL(target, 'https://eufemia.dnb.no')
      if (
        url.origin === 'https://eufemia.dnb.no' &&
        url.pathname.replace(/^\/+|\/+$/g, '') === parent.slug &&
        url.hash === titleHash
      ) {
        const slug = isFirstTabPage(file) ? parent.slug : file.slug
        inherited[key] = '/' + slug + '/' + url.search + titleHash
      }
    }
    if (!Object.keys(inherited).length) {
      return file
    }
    return {
      ...file,
      frontmatter: {
        ...fm,
        legacyFragments: { ...inherited, ...fm.legacyFragments },
      },
    }
  })
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
  const normalizedRelativePath = relativePath.replace(/\\/g, '/')
  let slug = normalizedRelativePath
    .replace(/\.(mdx|tsx)$/, '')
    .replace(/(^|\/)index$/, '$1')
    .replace(/\/$/, '')

  let frontmatter: MdxFrontmatter = {}
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

  if (typeof frontmatter.slug === 'string') {
    slug = frontmatter.slug.replace(/^\/+|\/+$/g, '')
  }
  return {
    filePath,
    sourcePath: `${PORTAL_DOCS_SOURCE_PATH}/${normalizedRelativePath}`,
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
    isFirstTab: isFirstTabPage(file),
    redirectFrom: file.frontmatter.redirect_from,
  })
}

export default function portalPagesPlugin(
  options: PortalPagesPluginOptions = {}
): Plugin {
  const docsDir = options.docsDir ?? getDefaultDocsDir()
  const normalizedDocsDir = docsDir.replace(/\\/g, '/')
  const pageModules = new Map<string, string>()
  const pageSignatures = new Map<string, string | null>()

  return {
    name: 'vite-plugin-portal-pages',

    resolveId(id) {
      if (
        [VIRTUAL_MODULE_ID, DATA_MODULE_ID, TOC_MODULE_ID].includes(id) ||
        id.startsWith(PAGE_MODULE_PREFIX)
      ) {
        return '\0' + id
      }
    },

    load(id, options) {
      const pageModule = pageModules.get(id.slice(1))
      if (pageModule) {
        return (
          'export { default } from ' + JSON.stringify(pageModule) + ';'
        )
      }
      if (
        [
          RESOLVED_VIRTUAL_MODULE_ID,
          '\0' + DATA_MODULE_ID,
          '\0' + TOC_MODULE_ID,
        ].includes(id)
      ) {
        const { files, allMdxNodes, regularMdxNodes } =
          getPortalPages(docsDir)

        const regularMdxNodeIndexes = regularMdxNodes.map((node) =>
          allMdxNodes.indexOf(node)
        )

        for (const file of files) {
          pageModules.set(
            PAGE_MODULE_PREFIX + file.slug,
            file.filePath.split(path.sep).join('/')
          )
        }

        pageSignatures.clear()
        for (const file of files) {
          pageSignatures.set(
            file.filePath.replace(/\\/g, '/'),
            getVirtualModuleSignature(file)
          )
        }

        if (id === '\0' + TOC_MODULE_ID) {
          return `export const tableOfContentsNodes = ${JSON.stringify(
            allMdxNodes.filter(
              (node) =>
                node.fields.slug.startsWith(
                  'contribute/getting-started/'
                ) && node.tableOfContents
            )
          )};`
        }

        if (id === '\0' + DATA_MODULE_ID) {
          // Routes own redirects. Heading trees are only needed by the
          // contribution guide, which imports them separately.
          const nodes = options?.ssr
            ? allMdxNodes
            : allMdxNodes.map(({ fields, frontmatter }) => {
                const {
                  redirect_from,
                  legacyPrefixes,
                  ...clientFrontmatter
                } = frontmatter
                return { fields, frontmatter: clientFrontmatter }
              })
          return `
export const allMdxNodes = ${JSON.stringify(
            nodes.map(({ fields, ...node }) => [
              fields.slug,
              fields.sourcePath.slice(PORTAL_DOCS_SOURCE_PATH.length + 1),
              node,
            ])
          )}.map(([slug, sourcePath, node]) => ({
  fields: { slug, sourcePath: ${JSON.stringify(PORTAL_DOCS_SOURCE_PATH + '/')} + sourcePath }, ...node,
}));
export const regularMdxNodes = ${JSON.stringify(regularMdxNodeIndexes)}.map(index => allMdxNodes[index]);
export { globPath } from '${path.join(__dirname, 'portal-pages.shared').split(path.sep).join('/')}';
`
        }

        // Generate lazy import statements and route definitions
        const routeDefs: string[] = []

        files.forEach((file) => {
          if (file.frontmatter.route === false) {
            return
          }
          const importPath = PAGE_MODULE_PREFIX + file.slug

          // First-tab pages (e.g. info.mdx with showTabs but no title)
          // redirect to the parent page instead of rendering separately.
          // The parent page already includes this content.
          const isFirstTab = isFirstTabPage(file)

          if (isFirstTab) {
            // The common redirect registry includes first-tab routes.
          } else if (file.slug === '') {
            // Homepage: index route
            routeDefs.push(
              `  { id: 'page:', index: true, lazy: () => import('${importPath}').then(m => ({ Component: m.default })) },`
            )
          } else {
            // React Router also matches URLs with a trailing slash.
            routeDefs.push(
              `  { id: 'page:${file.slug}', path: '/${file.slug}', lazy: () => import('${importPath}').then(m => ({ Component: m.default })) },`
            )
          }
        })

        const redirectData = JSON.stringify(getPageRedirects(files))

        // Path matching helper, re-exported so page lists can select pages
        // with the same globs the content queries used.
        const globModulePath = path
          .join(__dirname, 'portal-pages.shared')
          .replace(/\\/g, '/')

        // Add catch-all 404 route
        const notFoundPath = path
          .join(docsDir, '404.tsx')
          .replace(/\\/g, '/')
        routeDefs.push(
          `  { id: 'portal-not-found', path: '*', lazy: () => import('${notFoundPath}').then(m => ({ Component: m.default })) },`
        )

        return `
import React from 'react';
import { Navigate, redirect, useLocation } from 'react-router';
import { resolvePageRedirect } from '${globModulePath}';

function PageRedirect({ target, fragments }) {
  const source = useLocation();
  const key = source.hash.slice(1);
  const destination = Object.prototype.hasOwnProperty.call(fragments, key) ? fragments[key] : target;
  return React.createElement(Navigate, {
    replace: true,
    to: resolvePageRedirect(destination, source.pathname + source.search + source.hash),
  });
}

const redirectRoutes = ${redirectData}.flatMap(({ from, to, fragments }) =>
  [from, from + '/'].map(path => ({
    id: 'redirect:' + path,
    path,
    Component: () => React.createElement(PageRedirect, { target: to, fragments }),
    handle: { redirectTo: to },
    loader: typeof window === 'undefined' ? ({ request }) => redirect(resolvePageRedirect(to, request.url)) : undefined,
  }))
);

export const routes = [
...redirectRoutes,
${routeDefs.join('\n')}
];

export { allMdxNodes, regularMdxNodes, globPath } from 'virtual:portal-data';
export const routeModules = ${JSON.stringify(Object.fromEntries(files.map((file) => ['page:' + file.slug, PAGE_MODULE_PREFIX + file.slug])))};
`
      }
    },

    configureServer(server) {
      // Vite's root is vite/client/, so src/docs/ isn't watched by default.
      // Add it explicitly so new page files trigger the 'add' event.
      server.watcher.add(docsDir)

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
        const dataMod = server.moduleGraph.getModuleById(
          '\0' + DATA_MODULE_ID
        )
        const tocMod = server.moduleGraph.getModuleById(
          '\0' + TOC_MODULE_ID
        )
        for (const data of [dataMod, tocMod]) {
          if (data) {
            server.moduleGraph.invalidateModule(data)
          }
        }
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
        const dataMod = server.moduleGraph.getModuleById(
          '\0' + DATA_MODULE_ID
        )
        const tocMod = server.moduleGraph.getModuleById(
          '\0' + TOC_MODULE_ID
        )
        for (const data of [dataMod, tocMod]) {
          if (data) {
            server.moduleGraph.invalidateModule(data)
          }
        }
        if (mod) {
          server.moduleGraph.invalidateModule(mod)
          return Array.from(
            new Set([...modules, mod, dataMod, tocMod].filter(Boolean))
          )
        }
      }
    },
  }
}
