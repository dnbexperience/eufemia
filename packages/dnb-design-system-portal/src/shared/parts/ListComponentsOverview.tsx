import { useStaticQuery, graphql } from 'portal-query'
import { Fragment } from 'react'
import { Card, Li, P, Span, Ul } from '@dnb/eufemia/src'
import ReactMarkdown from 'react-markdown'
import Anchor from '../tags/Anchor'
import AutoLinkHeader from '../tags/AutoLinkHeader'
import { basicComponents } from '../../shared/tags'
import { makeSlug } from '../../uilib/utils/slug'
import { cardItemStyle } from '../menu/MainMenu.module.scss'

type CategoryValue = string | false | null | undefined

type Entry = {
  slug: string
  title: string
  description?: string | undefined
  category: string
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

type Category = {
  title: string
  description: string
  entries: Entry[]
}

type CategoryDefinition = Omit<Category, 'entries'>

const categoryOrder: CategoryDefinition[] = [
  {
    title: 'Action',
    description:
      'For things people click to do something, open choices, follow a link, or get help.',
  },
  {
    title: 'Input',
    description:
      'For entering information, choosing options, uploading files, or changing values.',
  },
  {
    title: 'Navigation',
    description:
      'For helping people move between pages, jump to content, or continue through steps.',
  },
  {
    title: 'Feedback',
    description:
      'For messages and panels that tell people what happened, what is happening, or what needs attention.',
  },
  {
    title: 'Content',
    description:
      'For showing information, such as text, numbers, tables, icons, lists, and cards.',
  },
  {
    title: 'Other',
    description:
      'For special page behavior that does not fit the groups above.',
  },
]

const excludedSlugs = new Set(['uilib/components/overview'])

export default function ListComponentsOverview() {
  const data = useStaticQuery(graphql`
    {
      components: allMdx(
        filter: {
          frontmatter: {
            title: { ne: null }
            category: { ne: null }
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
      const category = node.frontmatter.category

      if (
        excludedSlugs.has(slug) ||
        typeof category !== 'string' ||
        category.length === 0
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

  const grouped: Record<string, Entry[]> = {}

  items.forEach((entry) => {
    grouped[entry.category] = grouped[entry.category] || []
    grouped[entry.category].push(entry)
  })

  const categories = categoryOrder
    .map(({ title, description }) => ({
      title,
      description,
      entries: (grouped[title] || []).sort((a, b) =>
        a.title.localeCompare(b.title)
      ),
    }))
    .filter(({ entries }) => entries.length > 0)

  return (
    <>
      <CategoriesTableOfContents categories={categories} />

      {categories.map(({ title, entries }: Category) => (
        <section key={title}>
          <AutoLinkHeader level={2} size="large" useSlug={title}>
            {title}
          </AutoLinkHeader>

          {title === 'Input' && <FormsAndInputsIntro />}

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
        {categories.map(({ title, description, entries }) => (
          <Card.ListItem
            key={title}
            center="when-small"
            className={cardItemStyle}
          >
            <Card.Action
              href={`#${makeSlug(title, title)}`}
              stack
              dropShadow
            >
              <Span size="large">{title}</Span>

              <P>
                {description}
                <br />
                <Span size="x-small" style={{ opacity: 0.7 }}>
                  {entries.map(({ slug, title }, index) => (
                    <Fragment key={slug}>
                      {title}
                      {index < entries.length - 1 ? ', ' : '.'}
                    </Fragment>
                  ))}
                </Span>
              </P>
            </Card.Action>
          </Card.ListItem>
        ))}
      </Card.List>
    </nav>
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
