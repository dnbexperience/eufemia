/**
 * The one description of how a heading becomes an id.
 *
 * Every part of the codebase that produces or consumes a heading id has to
 * agree on these, so each implementation should run this table rather than
 * restate its own expectations. The ids are taken from the rendered pages,
 * not from a reimplementation of the rules.
 */

/**
 * A heading, described from every angle a consumer needs.
 *
 * `children` mirrors what MDX passes to the heading component: plain strings,
 * and `{ element }` for anything wrapped in inline markup. Joining the text
 * gives what the reader actually sees.
 */
export type HeadingIdCase = {
  name: string
  markdown: string
  children: Array<string | { element: string }>
  id: string
}

export const headingIdCases: HeadingIdCase[] = [
  {
    name: 'plain text',
    markdown: 'Getting started',
    children: ['Getting started'],
    id: 'getting-started',
  },
  {
    name: 'inline code and bold',
    markdown: 'Default `font-size` **rem** table',
    children: [
      'Default ',
      { element: 'font-size' },
      ' ',
      { element: 'rem' },
      ' table',
    ],
    id: 'default-font-size-rem-table',
  },
  {
    name: 'a link with bold inside',
    markdown:
      'Use the [**FormStatus**](/uilib/components/form-status) icons only',
    children: ['Use the ', { element: 'FormStatus' }, ' icons only'],
    id: 'use-the-formstatus-icons-only',
  },
  {
    name: 'code and an arrow',
    markdown: 'SCSS: `@import` → `@use`',
    children: [
      'SCSS: ',
      { element: '@import' },
      ' → ',
      { element: '@use' },
    ],
    id: 'scss-import--use',
  },
  {
    name: 'an en dash',
    markdown: 'Developers – what to expect',
    children: ['Developers – what to expect'],
    id: 'developers--what-to-expect',
  },
  {
    name: 'a dropped symbol',
    markdown: 'Eufemia Spatial System ≠ A Grid System',
    children: ['Eufemia Spatial System ≠ A Grid System'],
    id: 'eufemia-spatial-system--a-grid-system',
  },
  {
    name: 'non-ASCII letters',
    markdown: 'National Identification number (Fødselsnummer)',
    children: ['National Identification number (Fødselsnummer)'],
    id: 'national-identification-number-fødselsnummer',
  },
  {
    name: 'an escaped asterisk',
    markdown: '\\* Optional values (defaults)',
    children: ['* Optional values (defaults)'],
    id: '-optional-values-defaults',
  },
  {
    name: 'a custom id',
    markdown: 'Spacing for Articles \\{#spacing\\}',
    children: ['Spacing for Articles {#spacing}'],
    id: 'spacing',
  },
  {
    name: 'a custom id next to inline markup',
    markdown: '**200%** in `font-size` \\{#font-size\\}',
    children: [
      { element: '200%' },
      ' in ',
      { element: 'font-size' },
      ' {#font-size}',
    ],
    id: 'font-size',
  },
]

/**
 * The text a case renders as, which is what the id derives from.
 */
export function textOf({ children }: HeadingIdCase): string {
  return children
    .map((child) => (typeof child === 'string' ? child : child.element))
    .join('')
}

/**
 * The case as MDX hands it to a heading: a bare string when there is no
 * inline markup, otherwise an array mixing strings and elements.
 */
export function childrenOf({ children }: HeadingIdCase) {
  const nodes = children.map((child) =>
    typeof child === 'string'
      ? child
      : { props: { children: child.element } }
  )

  return nodes.length === 1 && typeof nodes[0] === 'string'
    ? nodes[0]
    : nodes
}
