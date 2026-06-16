import { useStaticQuery, graphql } from 'portal-query'
import { Card, Hr, Li, ListFormat, P, Span, Ul } from '@dnb/eufemia/src'
import ReactMarkdown from 'react-markdown'
import Anchor from '../tags/Anchor'
import AutoLinkHeader from '../tags/AutoLinkHeader'
import { basicComponents } from '../../shared/tags'
import { makeSlug } from '../../uilib/utils/slug'
import { cardItemStyle } from '../menu/MainMenu.module.scss'

const categoryOrder = [
  {
    id: 'actions',
    title: 'Actions',
    description:
      'For things people click to do something, open choices, follow a link, or get help.',
  },
  {
    id: 'input',
    title: 'Input',
    description:
      'For entering information, choosing options, uploading files, or changing values.',
  },
  {
    id: 'navigation',
    title: 'Navigation',
    description:
      'For helping people move between pages, jump to content, or continue through steps.',
  },
  {
    id: 'feedback',
    title: 'Feedback',
    description:
      'For messages and panels that tell people what happened, what is happening, or what needs attention.',
  },
  {
    id: 'content',
    title: 'Content',
    description:
      'For showing information, such as text, numbers, tables, icons, lists, and cards.',
  },
  {
    id: 'other',
    title: 'Other',
    description:
      'For special page behavior that does not fit the groups above.',
  },
] as const

type CategoryId = (typeof categoryOrder)[number]['id']
type CategoryValue = string | false | null | undefined

type Entry = {
  slug: string
  title: string
  description?: string | undefined
  category: CategoryId
}

type QueryEdge = {
  node: {
    fields: {
      slug: string
    }
    frontmatter: {
      title: string
      description?: string | undefined
      category: CategoryValue
    }
  }
}

type QueryData = {
  components: {
    edges: QueryEdge[]
  }
}

type CategoryDefinition = {
  id: CategoryId
  title: string
  description: string
}

type Category = CategoryDefinition & {
  entries: Entry[]
}

const categoryIds = new Set<string>(categoryOrder.map(({ id }) => id))

const excludedSlugs = new Set([
  'uilib/components/fragments',
  'uilib/components/overview',
])

function isCategoryId(category: CategoryValue): category is CategoryId {
  return typeof category === 'string' && categoryIds.has(category)
}

function getCategoryId(category: CategoryValue): CategoryId | undefined {
  if (category === false) {
    return undefined
  }

  if (isCategoryId(category)) {
    return category
  }

  return 'other'
}

export default function ListComponentsOverview() {
  const data = useStaticQuery(graphql`
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
  `) as QueryData

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
      <CategoriesTableOfContents categories={categories} />

      {categories.map(({ id, title, description, entries }: Category) => (
        <section key={id}>
          <AutoLinkHeader level={2} size="large" useSlug={id}>
            {title}
          </AutoLinkHeader>

          {id === 'input' && <FormsAndInputsIntro />}

          <InlineComponentList
            description={description}
            entries={entries}
          />

          <ComponentsOverviewList entries={entries} />
        </section>
      ))}
    </>
  )
}

function CategoriesTableOfContents({
  categories,
}: {
  categories: Category[]
}) {
  return (
    <nav aria-label="Component categories">
      <Card.List bottom="large">
        {categories.map(({ id, title, description }) => (
          <Card.ListItem
            key={id}
            center="when-small"
            className={cardItemStyle}
          >
            <Card.Action href={`#${makeSlug(title, id)}`} stack dropShadow>
              <Span size="large">{title}</Span>

              <P>{description}</P>
            </Card.Action>
          </Card.ListItem>
        ))}
      </Card.List>
    </nav>
  )
}

function InlineComponentList({
  description,
  entries,
}: {
  description: string
  entries: Entry[]
}) {
  return (
    <>
      <P bottom="x-small">{description}</P>
      <P size="small">
        <ListFormat>
          {entries.map(({ slug, title }) => (
            <Anchor key={slug} href={`/${slug}`}>
              {title}
            </Anchor>
          ))}
        </ListFormat>
      </P>

      <Hr />
    </>
  )
}

function FormsAndInputsIntro() {
  return (
    <P>
      When creating application forms, use{' '}
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
