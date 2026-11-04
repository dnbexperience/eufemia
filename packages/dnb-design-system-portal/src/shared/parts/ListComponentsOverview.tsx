import {
  useStaticQuery,
  graphql,
  type StaticQueryConnection,
} from 'portal-query'
import { Card, Hr, P, Span } from '@dnb/eufemia/src'
import ReactMarkdown from 'react-markdown'
import Anchor, { Link } from '../tags/Anchor'
import AutoLinkHeader from '../tags/AutoLinkHeader'
import basicComponents from '../tags/markdownComponents'
import {
  componentsStyle,
  illustrationStyle,
} from './ListComponentsOverview.module.scss'
import illustrations from './component-illustrations.svg?url'
import {
  categoryOrder,
  excludedSlugs,
  getCategoryId,
  isCategorizedComponentSlug,
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
          internal: { contentFilePath: { regex: "/(web/.*)/" } }
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

      if (
        node.frontmatter.route === false ||
        excludedSlugs.has(slug) ||
        !isCategorizedComponentSlug(slug) ||
        !category
      ) {
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
      <Anchor href="/web/extensions/forms/">Eufemia Forms</Anchor> instead
      of composing forms from the base components below.
    </P>
  )
}

function ComponentsOverviewList({ entries }: { entries: Entry[] }) {
  return (
    <Card.List className={componentsStyle}>
      {entries.map(({ slug, title, description }) => (
        <Card.ListItem key={slug}>
          <Card.Action
            to={`/${slug}`}
            element={Link}
            stack
            responsive={false}
            gap="small"
            className={illustrationStyle}
          >
            <Card
              element="div"
              innerSpace={0}
              responsive={false}
              backgroundColor="var(--token-color-background-neutral-base)"
            >
              <svg
                viewBox="0 0 240 144"
                width="240"
                height="144"
                aria-hidden="true"
                focusable="false"
                fill="none"
                stroke="none"
              >
                <use href={`${illustrations}#${slug.split('/').pop()}`} />
              </svg>
            </Card>
            <Span size="medium" weight="medium">
              {title}
            </Span>

            {description && (
              <ReactMarkdown
                // @ts-expect-error -- strictFunctionTypes
                components={basicComponents}
              >
                {description}
              </ReactMarkdown>
            )}
          </Card.Action>
        </Card.ListItem>
      ))}
    </Card.List>
  )
}
