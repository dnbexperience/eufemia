import { describe, it, expect } from 'vitest'
import fs from 'node:fs'
import path from 'node:path'
import matter from 'gray-matter'
import { scanPageFiles } from '../client/plugins/portal-pages'
import { makeSlug } from '../../src/uilib/utils/slug'
import { themeNames } from '@dnb/eufemia/src/style/themes/capabilities'
import type { ThemeName } from '@dnb/eufemia/src/style/themes/capabilities'
import {
  buildImportedSet,
  docsDir,
  resolveImportCandidates,
} from './shared/helpers'

/**
 * Guards against duplicate `id` attributes in portal documentation pages.
 *
 * A document may only contain one element per `id`. Duplicates break anchor
 * links (`#some-heading` always jumps to the first match), the table of
 * contents, and assistive technology relying on `aria-*` references.
 *
 * How ids are produced (see shared/tags/AutoLinkHeader.tsx + tags/index.tsx):
 * - Every markdown heading is rendered as an `AutoLinkHeader`, which adds an
 *   anchor with `id={makeSlug(children)}`. Two headings with the same text
 *   therefore produce the same id, since `makeSlug` resets its slugger and
 *   does not add a uniqueness counter.
 * - Tab pages (`showTabs: true`) get an extra H1 from the frontmatter `title`,
 *   rendered by the TabBar with the same slug logic.
 * - MDX may also set `id="..."` explicitly on any element.
 *
 * A page is analyzed together with the MDX partials it renders, because those
 * become part of the same document. Partials are counted per render, since an
 * import may go unused, or the same partial may be rendered more than once.
 *
 * Each theme is analyzed on its own, because `VisibilityByTheme` lets two
 * branches of a page carry the same heading as long as no theme renders both.
 *
 * Use a custom heading id to resolve a collision:
 * `## Relevant links \{#flex-item-relevant-links\}`
 */

const MARKDOWN_HEADING_LINE = /^(#{1,6})\s+(\S.*?)\s*$/
const CODE_FENCE_LINE = /^\s*(```+|~~~+)/
const INLINE_CODE_SPAN = /`[^`]*`/g
const INLINE_LINK = /\[([^\]]*)\]\([^)]*\)/g
const INLINE_EMPHASIS = /(\*\*|~~|`)/g
const LITERAL_ID_ATTRIBUTE = /\bid=["']([^"'{}\s]+)["']/g
const IMPORT_STATEMENT = /import\s+([\s\S]*?)\s+from\s+['"]([^'"]+)['"]/g
const DEFAULT_IMPORT_NAME = /^([A-Za-z_$][\w$]*)/
const ESCAPED_PUNCTUATION = /\\([!-/:-@[-`{-~])/g
const VISIBILITY_BY_THEME_TAG =
  /<(\/?)VisibilityByTheme(?!\.)([^>]*?)(\/?)>/
const VISIBLE_FOR_THEMES = /\bvisible=("[^"]*"|\{[\s\S]*\})/
const HIDDEN_FOR_THEMES = /\bhidden=("[^"]*"|\{[\s\S]*\})/

type RenderedId = {
  id: string

  /** Docs-relative path of the file that renders it, for the failure report. */
  sourceFile: string
}

/**
 * Remove fenced code blocks, so documented markup does not count as rendered
 * output. Inline code is kept, because it is part of a heading's text and
 * therefore part of its slug.
 */
function stripCodeFences(markdown: string): string {
  const keptLines: string[] = []
  let insideFence = false
  let openingMarker = ''

  for (const line of markdown.split('\n')) {
    const fence = CODE_FENCE_LINE.exec(line)
    if (fence) {
      const marker = fence[1][0]
      if (!insideFence) {
        insideFence = true
        openingMarker = marker
      } else if (marker === openingMarker) {
        insideFence = false
      }
      continue
    }
    if (!insideFence) {
      keptLines.push(line)
    }
  }

  return keptLines.join('\n')
}

/**
 * Whether a `VisibilityByTheme` prop value names the given theme. The value
 * may be a string, an array of strings, or an array of theme objects, so it
 * is enough that the theme name appears somewhere inside it.
 */
function namesTheme(propValue: string, theme: ThemeName): boolean {
  return new RegExp(`\\b${theme}\\b`).test(propValue)
}

/** Whether a `VisibilityByTheme` renders its children for the given theme. */
function isVisibleForTheme(attributes: string, theme: ThemeName): boolean {
  // "visible" takes precedence over "hidden", as it does in the component.
  const visible = VISIBLE_FOR_THEMES.exec(attributes)
  if (visible) {
    return namesTheme(visible[1], theme)
  }

  const hidden = HIDDEN_FOR_THEMES.exec(attributes)
  if (hidden) {
    return !namesTheme(hidden[1], theme)
  }

  return true
}

/**
 * Remove the `VisibilityByTheme` branches that the given theme does not
 * render. Two branches that no theme renders together are free to repeat the
 * same heading, so they must never be compared against each other.
 */
function stripBranchesHiddenFromTheme(
  markdown: string,
  theme: ThemeName
): string {
  const keptLines: string[] = []
  const openBranches: boolean[] = []

  for (const line of markdown.split('\n')) {
    const tag = VISIBILITY_BY_THEME_TAG.exec(line)
    if (tag) {
      const [, isClosingTag, attributes, isSelfClosing] = tag
      if (isClosingTag) {
        openBranches.pop()
      } else if (!isSelfClosing) {
        openBranches.push(isVisibleForTheme(attributes, theme))
      }
      continue
    }

    if (openBranches.every(Boolean)) {
      keptLines.push(line)
    }
  }

  return keptLines.join('\n')
}

/**
 * The ids one markdown body renders on its own: heading anchors and literal
 * `id` attributes. Partials it renders are not included.
 */
function collectIdsInMarkdown(
  markdown: string,
  sourceFile: string
): RenderedId[] {
  const renderedIds: RenderedId[] = []

  for (const line of markdown.split('\n')) {
    const heading = MARKDOWN_HEADING_LINE.exec(line)
    if (heading) {
      // `makeSlug` receives the rendered children, so inline markdown is
      // already resolved to plain text. MDX also resolves escapes, so
      // `\{#custom-id\}` has to become `{#custom-id}` to slug the same way.
      const id = makeSlug(
        heading[2]
          .replace(INLINE_LINK, '$1')
          .replace(INLINE_EMPHASIS, '')
          .replace(ESCAPED_PUNCTUATION, '$1')
      )
      if (id) {
        renderedIds.push({ id, sourceFile })
      }
      continue
    }

    const lineWithoutInlineCode = line.replace(INLINE_CODE_SPAN, '')

    LITERAL_ID_ATTRIBUTE.lastIndex = 0
    let attribute: RegExpExecArray | null
    while (
      (attribute = LITERAL_ID_ATTRIBUTE.exec(lineWithoutInlineCode)) !==
      null
    ) {
      renderedIds.push({ id: attribute[1], sourceFile })
    }
  }

  return renderedIds
}

/**
 * The MDX file an import specifier points to, or null when it resolves to
 * something else (a React component, a package, a missing path).
 */
function resolveImportedMdxFile(
  importingFile: string,
  specifier: string
): string | null {
  for (const candidate of resolveImportCandidates(
    importingFile,
    specifier
  )) {
    if (fs.existsSync(candidate) && fs.statSync(candidate).isFile()) {
      return candidate.endsWith('.mdx') ? candidate : null
    }
  }
  return null
}

/**
 * The MDX partials a markdown body renders, listed once per render. An import
 * is not a render: it may go unused, be handed to a component as a prop, or be
 * placed several times. Only default imports can name a partial, so named
 * imports are ignored.
 */
function listRenderedPartials(
  importingFile: string,
  markdown: string
): string[] {
  const renderedPartials: string[] = []
  const markup = markdown.replace(IMPORT_STATEMENT, '')

  IMPORT_STATEMENT.lastIndex = 0
  let statement: RegExpExecArray | null
  while ((statement = IMPORT_STATEMENT.exec(markdown)) !== null) {
    const componentName = DEFAULT_IMPORT_NAME.exec(
      statement[1].trim()
    )?.[1]
    if (!componentName) {
      continue
    }

    const partialFile = resolveImportedMdxFile(importingFile, statement[2])
    if (!partialFile) {
      continue
    }

    const elementCount =
      markup.match(new RegExp(`<${componentName}[\\s/>]`, 'g'))?.length ??
      0

    // Handed to a component instead of placed directly, so it renders once.
    const isPassedAsValue = new RegExp(
      `\\{\\s*${componentName}\\s*[}.]|=\\{\\s*${componentName}\\b`
    ).test(markup)
    const renderCount = elementCount || (isPassedAsValue ? 1 : 0)

    for (let i = 0; i < renderCount; i++) {
      renderedPartials.push(partialFile)
    }
  }

  return renderedPartials
}

/**
 * Every id a page renders, including the ids of the MDX partials it renders,
 * since those become part of the same document. A partial rendered twice
 * contributes its ids twice, as it does in the browser. Circular imports are
 * cut off by the chain of files already being rendered.
 */
function collectRenderedIds(
  pageFile: string,
  theme: ThemeName,
  enclosingFiles: ReadonlySet<string> = new Set()
): RenderedId[] {
  const normalizedFile = path.normalize(pageFile)
  if (enclosingFiles.has(normalizedFile)) {
    return []
  }

  const sourceFile = path
    .relative(docsDir, normalizedFile)
    .replace(/\\/g, '/')
  const markdown = stripBranchesHiddenFromTheme(
    stripCodeFences(
      matter(fs.readFileSync(normalizedFile, 'utf-8')).content
    ),
    theme
  )

  const renderedIds = collectIdsInMarkdown(markdown, sourceFile)
  const nestedEnclosingFiles = new Set(enclosingFiles).add(normalizedFile)

  for (const partialFile of listRenderedPartials(
    normalizedFile,
    markdown
  )) {
    renderedIds.push(
      ...collectRenderedIds(partialFile, theme, nestedEnclosingFiles)
    )
  }

  return renderedIds
}

describe('portal page ids', () => {
  const partialFiles = buildImportedSet()
  const mdxPages = scanPageFiles(docsDir).filter(
    (page) => page.type === 'mdx'
  )

  it('scans a meaningful number of MDX pages', () => {
    // Sanity check so the assertion below can never pass vacuously.
    expect(mdxPages.length).toBeGreaterThan(50)
  })

  it('every published page renders unique ids', () => {
    const collisions: string[] = []

    for (const page of mdxPages) {
      const frontmatter = page.frontmatter as Record<string, unknown>

      if (frontmatter.draft === true) {
        continue
      }

      // Partials are checked as part of the page that renders them.
      if (partialFiles.has(path.normalize(page.filePath))) {
        continue
      }

      const collidingThemes = new Map<string, ThemeName[]>()
      const collisionReports = new Map<string, string>()

      for (const theme of themeNames) {
        const renderedIds = collectRenderedIds(page.filePath, theme)

        // The TabBar renders an H1 with an anchor made from the title.
        if (frontmatter.showTabs === true && frontmatter.title) {
          const id = makeSlug(String(frontmatter.title))
          if (id) {
            renderedIds.unshift({ id, sourceFile: 'frontmatter title' })
          }
        }

        const sourceFilesById = new Map<string, string[]>()
        for (const { id, sourceFile } of renderedIds) {
          sourceFilesById.set(id, [
            ...(sourceFilesById.get(id) ?? []),
            sourceFile,
          ])
        }

        for (const [id, sourceFiles] of Array.from(sourceFilesById)) {
          if (sourceFiles.length > 1) {
            const where = Array.from(new Set(sourceFiles)).join(', ')
            collidingThemes.set(id, [
              ...(collidingThemes.get(id) ?? []),
              theme,
            ])
            collisionReports.set(
              id,
              `/${page.slug} → "${id}" (${sourceFiles.length}× in ${where})`
            )
          }
        }
      }

      for (const [id, report] of Array.from(collisionReports)) {
        const themes = collidingThemes.get(id)
        collisions.push(
          themes.length === themeNames.length
            ? report
            : `${report} in the ${themes.join('/')} theme`
        )
      }
    }

    expect(
      collisions,
      `Some pages render the same id more than once. ` +
        `Each entry below names the page, the duplicated id, and the ` +
        `files it is rendered from.`
    ).toEqual([])
  })
})
