/**
 * Which markdown copy, if any, a portal page should advertise to LLMs.
 *
 * Imported by both prerender.mjs and its tests, so the build and the tests
 * exercise the same code. Keep this module free of Vite-resolved imports:
 * prerender.mjs runs under plain Node.
 */

import fs from 'node:fs'
import path from 'node:path'

/**
 * Tab pages have no markdown copy of their own — their content is part of
 * the entry one level up. These are exactly the names findEntryMdxFiles in
 * eufemia-llm-metadata excludes when it picks entries, which is what makes
 * the list complete: a page may declare any tab names it likes through its
 * `tabs` frontmatter, but any other name is treated as an entry, so such a
 * page advertises its own copy when one was written and nothing when it was
 * not. Either way it needs no fallback to its parent.
 *
 * Keep the two in sync. A name added here that the generator still treats
 * as an entry would make those pages advertise their parent's document
 * instead of their own — a link that resolves, so the build's link check
 * cannot catch it.
 */
const TAB_SEGMENTS = new Set(['info', 'demos', 'properties', 'events'])

/**
 * Resolve the markdown alternate link path for a URL, or null when the page
 * should not advertise one.
 *
 * Takes the copies present in the output rather than a prediction of them: the
 * generator skips drafts, files that are not entries, and anything robots.txt
 * disallows, and reproducing those rules here is what once left pages pointing
 * at files that were never written.
 */
export function getMdPath(
  url: string,
  mdPaths: Set<string>
): string | null {
  // Must match LLM_DOCS_SLUG_PREFIX from eufemia-llm-metadata
  const prefix = 'uilib'

  if (!url.startsWith(`/${prefix}/`)) {
    return null
  }

  const slug = url.replace(/^\/|\/$/g, '')
  const own = `/${slug}.md`

  if (mdPaths.has(own)) {
    return own
  }

  // A tab page inherits its entry's copy, which covers every tab. Nothing else
  // borrows from its parent: /uilib/components/icon-primary/ is a component in
  // its own right, not a view of /uilib/components.md, and an over-broad
  // target would be as wrong as a dead one.
  const parts = slug.split('/')

  if (parts.length > 1 && TAB_SEGMENTS.has(parts[parts.length - 1])) {
    const entry = `/${parts.slice(0, -1).join('/')}.md`

    if (mdPaths.has(entry)) {
      return entry
    }
  }

  return null
}

/**
 * Collect the markdown copies present in the build output, as URL paths.
 */
export function collectMarkdownPaths(
  directory: string,
  root: string = directory,
  paths: Set<string> = new Set()
): Set<string> {
  if (!fs.existsSync(directory)) {
    return paths
  }

  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    // The SSR bundle is removed later in the build and serves no pages.
    if (entry.name === 'server' || entry.name.startsWith('.')) {
      continue
    }

    const entryPath = path.resolve(directory, entry.name)

    if (entry.isDirectory()) {
      collectMarkdownPaths(entryPath, root, paths)
    } else if (entry.name.endsWith('.md')) {
      paths.add(
        `/${path.relative(root, entryPath).split(path.sep).join('/')}`
      )
    }
  }

  return paths
}
