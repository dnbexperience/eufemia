import {
  useStaticQuery,
  graphql,
  type StaticQueryConnection,
} from 'portal-query'
import { Hr, Li, P, Span, Ul } from '@dnb/eufemia/src'
import ReactMarkdown from 'react-markdown'
import Anchor from '../tags/Anchor'
import AutoLinkHeader from '../tags/AutoLinkHeader'
import { basicComponents } from '../../shared/tags'
import {
  categoryOrder,
  excludedSlugs,
  getCategoryId,
  type CategoryDefinition,
  type CategoryId,
} from './componentCategories'

type Entry = {
  slug: string
  title: string
  description?: string | undefined
  category: CategoryId
}

type Category = CategoryDefinition & {
  entries: Entry[]
}

export default function ListComponentsOverview() {
  const data = useStaticQuery<{
    components: StaticQueryConnection
  }>(graphql`
    {
      components: allMdx(
        filter: {
          frontmatter: {
            title: { ne: null }
            draft: { ne: true }
            hideInMenu: { ne: true }
          }
          internal: {
            contentFilePath: { regex: "/(uilib/components/.*)/" }
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
              category
            }
          }
        }
      }
    }
  `)

  const items = data.components.edges.reduce<Entry[]>(
    (items, { node }) => {
      const slug = node.fields.slug
      const category = getCategoryId(node.frontmatter.category)

      if (excludedSlugs.has(slug) || !category) {
        return items
      }

      items.push({
        slug,
        title: node.frontmatter.title,
        description: node.frontmatter.description,
        category,
      })

      return items
    },
    []
  )

  const grouped: Partial<Record<CategoryId, Entry[]>> = {}

  items.forEach((entry) => {
    grouped[entry.category] = grouped[entry.category] || []
    grouped[entry.category].push(entry)
  })

  const categories: Category[] = categoryOrder
    .map(({ id, title, description }) => ({
      id,
      title,
      description,
      entries: (grouped[id] || []).sort((a, b) =>
        a.title.localeCompare(b.title)
      ),
    }))
    .filter(({ entries }) => entries.length > 0)

  return (
    <>
      {categories.map(({ id, title, description, entries }: Category) => (
        <section key={id}>
          <Hr top="x-large" />
          <AutoLinkHeader level={2} size="x-large" useSlug={id}>
            {title}
          </AutoLinkHeader>

          <P>{description}</P>

          {id === 'input' && <FormsAndInputsIntro />}

          <ComponentsOverviewList entries={entries} />
        </section>
      ))}
    </>
  )
}

function FormsAndInputsIntro() {
  return (
    <P>
      <strong>NB:</strong> When creating application forms, use{' '}
      <Anchor href="/uilib/extensions/forms/">Eufemia Forms</Anchor>{' '}
      instead of composing forms from the base components below.
    </P>
  )
}

function ComponentsOverviewList({ entries }: { entries: Entry[] }) {
  return (
    <Ul className="dnb-unstyled-list">
      {entries.map(({ slug, title, description }) => (
        <Li key={slug}>
          <Span size="medium">
            <Anchor href={`/${slug}`}>{title}</Anchor>
          </Span>

          {description && (
            <ReactMarkdown
              // @ts-expect-error -- strictFunctionTypes
              components={basicComponents}
            >
              {description}
            </ReactMarkdown>
          )}
        </Li>
      ))}
    </Ul>
  )
}
