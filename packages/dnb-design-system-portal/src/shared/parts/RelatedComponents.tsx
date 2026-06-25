import { useStaticQuery, graphql } from 'portal-query'
import { Li, P, Ul } from '@dnb/eufemia/src'
import { useLocation } from 'react-router-dom'
import Anchor from '../tags/Anchor'
import AutoLinkHeader from '../tags/AutoLinkHeader'
import {
  excludedSlugs,
  getCategoryId,
  getCategoryTitle,
  type CategoryId,
  type CategoryValue,
} from './componentCategories'

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

type Entry = {
  slug: string
  title: string
  description?: string | undefined
  category: CategoryId
}

function normalizeSlug(pathname: string): string {
  return pathname
    .replace(/^\/|\/$/g, '')
    .replace(/\/(info|demos|properties|events)$/, '')
}

function cleanTitle(title: string): string {
  return title.replace(/\s*\(.*\)\s*$/, '')
}

function toReason(description?: string): string | undefined {
  if (!description) {
    return undefined
  }

  // Turn "Use <Component> to/when …" into a short reason clause.
  // Only strip the leading "Use <Name> " when the next word is a
  // connector, so descriptions with other phrasing stay intact.
  return description.replace(
    /^Use\s+[A-Z]\S*\s+(?=to\b|when\b|for\b|as\b|if\b)/,
    ''
  )
}

export default function RelatedComponents() {
  const location = useLocation()

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

  const currentSlug = normalizeSlug(location?.pathname || '')

  const entries = data.components.edges.reduce<Entry[]>(
    (entries, { node }) => {
      const slug = node.fields.slug
      const category = getCategoryId(node.frontmatter.category)

      if (excludedSlugs.has(slug) || !category) {
        return entries
      }

      entries.push({
        slug,
        title: node.frontmatter.title,
        description: node.frontmatter.description,
        category,
      })

      return entries
    },
    []
  )

  const current = entries.find((entry) => entry.slug === currentSlug)

  if (!current) {
    return null
  }

  const related = entries
    .filter(
      (entry) =>
        entry.category === current.category && entry.slug !== current.slug
    )
    .sort((a, b) => a.title.localeCompare(b.title))

  if (related.length === 0) {
    return null
  }

  const categoryTitle = getCategoryTitle(current.category)

  return (
    <>
      <AutoLinkHeader level={2} useSlug="related-components">
        Related components
      </AutoLinkHeader>

      <P bottom="small">
        {cleanTitle(current.title)} is part of the{' '}
        <Anchor href={`/uilib/components/overview/#${current.category}`}>
          {categoryTitle}
        </Anchor>{' '}
        category. Other components for similar needs:
      </P>

      <Ul>
        {related.map(({ slug, title, description }) => {
          const reason = toReason(description)

          return (
            <Li key={slug}>
              <Anchor href={`/${slug}`}>{cleanTitle(title)}</Anchor>
              {reason ? ` — ${reason}` : null}
            </Li>
          )
        })}
      </Ul>
    </>
  )
}
