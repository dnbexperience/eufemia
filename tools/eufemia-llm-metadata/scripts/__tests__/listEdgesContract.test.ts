/**
 * The contract between the portal's `List*` components and this generator.
 *
 * The generator renders `<ListElements />` and friends into the `.md` files
 * served for LLMs. It cannot run a React component, so instead it reads the
 * `edges` prop, imports the function the component calls, and calls it with
 * the portal's own `regularMdxNodes`:
 *
 *     <ListSummaryFromEdges edges={getElements(regularMdxNodes)} />
 *                                  ^^^^^^^^^^^ ^^^^^^^^^^^^^^^
 *                                  imported     substituted by
 *                                  and called   the generator
 *
 * A list that breaks this shape is not a build error and not a type error —
 * the page keeps rendering, and only the `.md` silently goes stale or wrong.
 * These tests fail instead.
 */

import { describe, it, expect } from 'vitest'
import { readdirSync, readFileSync } from 'node:fs'
import path from 'node:path'

const portalRoot = path.resolve(
  process.cwd(),
  '..',
  '..',
  'packages',
  'dnb-design-system-portal'
)
const listEdgesPath = path.join(
  portalRoot,
  'src/shared/parts/listEdges.ts'
)

/** What the generator substitutes for the selection function's argument. */
const SUBSTITUTED_ARGUMENT = 'regularMdxNodes'

type ListComponent = {
  name: string
  /** The function called in the `edges` prop, e.g. `getElements`. */
  selection: string | null
  /** What that function is called with, e.g. `regularMdxNodes`. */
  argument: string | null
  importsSelectionFromListEdges: boolean
}

function findListComponents(dir: string): string[] {
  const files: string[] = []

  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name)

    if (entry.isDirectory()) {
      if (entry.name !== 'node_modules' && entry.name !== '__tests__') {
        files.push(...findListComponents(fullPath))
      }
    } else if (
      entry.name.startsWith('List') &&
      entry.name.endsWith('.tsx') &&
      entry.name !== 'ListSummaryFromEdges.tsx'
    ) {
      files.push(fullPath)
    }
  }

  return files
}

function readListComponent(filePath: string): ListComponent {
  const source = readFileSync(filePath, 'utf-8')
  const edgesProp = source.match(/edges=\{\s*(\w+)\s*\(\s*(\w+)\s*\)\s*\}/)
  const selection = edgesProp?.[1] ?? null

  return {
    name: path.basename(filePath),
    selection,
    argument: edgesProp?.[2] ?? null,
    importsSelectionFromListEdges: selection
      ? new RegExp(
          `import \\{[^}]*\\b${selection}\\b[^}]*\\} from '[^']*listEdges'`
        ).test(source)
      : false,
  }
}

const lists = findListComponents(path.join(portalRoot, 'src'))
  .filter((filePath) =>
    readFileSync(filePath, 'utf-8').includes('ListSummaryFromEdges')
  )
  .map(readListComponent)

describe('every List component stays readable by the generator', () => {
  it('finds the list components', () => {
    expect(lists.length).toBeGreaterThan(0)
  })

  it('renders `edges` as a single call the generator can parse', () => {
    const unparsable = lists
      .filter(({ selection }) => !selection)
      .map(({ name }) => name)

    expect(unparsable).toEqual([])
  })

  it(`calls that function with \`${SUBSTITUTED_ARGUMENT}\``, () => {
    // The generator always substitutes `regularMdxNodes`. A list that reads
    // from anything else — `allMdxNodes`, say, which is unsorted and includes
    // drafts — renders pages the `.md` will not contain.
    const wrongArgument = lists
      .filter(({ argument }) => argument !== SUBSTITUTED_ARGUMENT)
      .map(({ name, argument }) => `${name} uses ${argument}`)

    expect(wrongArgument).toEqual([])
  })

  it('imports that function from `listEdges`', () => {
    // The generator resolves the import to find the function, so it has to be
    // a static import it can follow.
    const notImported = lists
      .filter(({ importsSelectionFromListEdges }) => {
        return !importsSelectionFromListEdges
      })
      .map(({ name, selection }) => `${name} does not import ${selection}`)

    expect(notImported).toEqual([])
  })
})

describe('every selection runs outside the app and returns pages', () => {
  it('selects pages for each list', async () => {
    const { getPortalPages } = await import(
      path.join(portalRoot, 'vite/client/plugins/portal-pages.ts')
    )
    const selections = await import(listEdgesPath)
    const { regularMdxNodes } = getPortalPages()

    const empty = lists
      .filter(({ selection }) => {
        const getEdges = selections[selection]

        return (
          typeof getEdges !== 'function' ||
          getEdges(regularMdxNodes).length === 0
        )
      })
      .map(({ name, selection }) => `${name} -> ${selection}`)

    expect(empty).toEqual([])
  })
})
