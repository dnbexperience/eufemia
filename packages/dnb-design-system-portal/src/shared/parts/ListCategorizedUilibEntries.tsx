import { useMemo } from 'react'
import { useStaticQuery, graphql } from 'portal-query'
import { Ul, Li } from '@dnb/eufemia/src'
import Anchor from '../tags/Anchor'
import AutoLinkHeader from '../tags/AutoLinkHeader'

type SourceType = 'component' | 'fragment' | 'element'

type Entry = {
  slug: string
  title: string
  description?: string
  source: SourceType
  leaf: string
}

type QueryEdge = {
  node: {
    fields: {
      slug: string
    }
    frontmatter: {
      title: string
      description?: string
    }
  }
}

type Category = {
  title: string
  entries: Entry[]
}

const categoryOrder = [
  'Form Input',
  'Selection Controls',
  'Navigation and Flow',
  'Overlay and Dialog',
  'Data Display',
  'Feedback and Status',
  'Layout and Utility',
  'Brand and Identity',
  'Typography and Text',
  'Media and Visuals',
  'Other',
]

const excludedSlugs = new Set([
  'uilib/categorized',
  'uilib/components/fragments',
])

export default function ListCategorizedUilibEntries() {
  const data = useStaticQuery(graphql`
    {
      allMdx(
        filter: {
          frontmatter: {
            title: { ne: null }
            draft: { ne: true }
            hideInMenu: { ne: true }
          }
          internal: {
            contentFilePath: {
              regex: "/(uilib/(components|elements)/.*)/"
            }
          }
        }
        sort: [
          { frontmatter: { order: ASC } }
          { frontmatter: { title: ASC } }
        ]
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
              description
            }
          }
        }
      }
    }
  `)

  const edges = data.allMdx.edges as QueryEdge[]

  const categories = useMemo(() => {
    const items = edges
      .map(({ node }) => {
        const slug = node.fields.slug
        const parts = slug.split('/').filter(Boolean)

        const source = resolveSource(parts)
        const leaf = parts[parts.length - 1] ?? ''

        return {
          slug,
          title: node.frontmatter.title,
          description: node.frontmatter.description,
          source,
          leaf,
        } as Entry
      })
      .filter((entry) => entry.source !== null)
      .filter((entry) => !excludedSlugs.has(entry.slug))

    const grouped: Record<string, Entry[]> = {}

    items.forEach((entry) => {
      const category = resolveCategory(entry)
      grouped[category] = grouped[category] || []
      grouped[category].push(entry)
    })

    return categoryOrder
      .map((title) => ({
        title,
        entries: (grouped[title] || []).sort((a, b) =>
          a.title.localeCompare(b.title)
        ),
      }))
      .filter(({ entries }) => entries.length > 0)
  }, [edges])

  return (
    <>
      {categories.map(({ title, entries }: Category) => (
        <section key={title}>
          <AutoLinkHeader level={2} size="large" useSlug={title}>
            {title}
          </AutoLinkHeader>

          <Ul>
            {entries.map((entry) => (
              <Li key={entry.slug}>
                <Anchor href={`/${entry.slug}`}>{entry.title}</Anchor>
              </Li>
            ))}
          </Ul>
        </section>
      ))}
    </>
  )
}

function resolveSource(parts: string[]): SourceType | null {
  if (parts[0] !== 'uilib') {
    return null
  }

  if (parts[1] === 'elements') {
    return 'element'
  }

  if (parts[1] === 'components' && parts[2] === 'fragments') {
    return 'fragment'
  }

  if (parts[1] === 'components') {
    return 'component'
  }

  return null
}

function resolveCategory(entry: Entry) {
  if (entry.source === 'element') {
    return resolveElementCategory(entry.leaf)
  }

  if (entry.source === 'fragment') {
    return 'Layout and Utility'
  }

  return resolveComponentCategory(entry.leaf)
}

function resolveElementCategory(leaf: string) {
  if (
    [
      'blockquote',
      'heading',
      'ingress',
      'lead',
      'lists',
      'paragraph',
      'span',
    ].includes(leaf)
  ) {
    return 'Typography and Text'
  }

  if (['image', 'code'].includes(leaf)) {
    return 'Media and Visuals'
  }

  if (leaf === 'horizontal-rule') {
    return 'Layout and Utility'
  }

  return 'Other'
}

function resolveComponentCategory(leaf: string) {
  if (
    [
      'autocomplete',
      'date-format',
      'date-picker',
      'input',
      'input-masked',
      'number-format',
      'slider',
      'textarea',
      'upload',
    ].includes(leaf)
  ) {
    return 'Form Input'
  }

  if (
    ['checkbox', 'dropdown', 'radio', 'switch', 'toggle-button'].includes(
      leaf
    )
  ) {
    return 'Selection Controls'
  }

  if (
    [
      'anchor',
      'breadcrumb',
      'menu',
      'pagination',
      'infinity-scroller',
      'skip-content',
      'step-indicator',
      'tabs',
    ].includes(leaf)
  ) {
    return 'Navigation and Flow'
  }

  if (
    [
      'dialog',
      'drawer',
      'modal',
      'popover',
      'portal-root',
      'tooltip',
    ].includes(leaf)
  ) {
    return 'Overlay and Dialog'
  }

  if (
    [
      'avatar',
      'card',
      'country-flag',
      'global-error',
      'heading',
      'info-card',
      'list',
      'list-format',
      'stat',
      'table',
      'tag',
      'term-definition',
      'timeline',
    ].includes(leaf)
  ) {
    return 'Data Display'
  }

  if (
    [
      'aria-live',
      'badge',
      'copy-on-click',
      'form-status',
      'global-status',
      'progress-indicator',
      'skeleton',
    ].includes(leaf)
  ) {
    return 'Feedback and Status'
  }

  if (
    [
      'accordion',
      'filter',
      'form-label',
      'height-animation',
      'section',
      'visually-hidden',
    ].includes(leaf)
  ) {
    return 'Layout and Utility'
  }

  if (
    ['button', 'help-button', 'icon', 'icon-primary', 'logo'].includes(
      leaf
    )
  ) {
    return 'Brand and Identity'
  }

  return 'Other'
}
