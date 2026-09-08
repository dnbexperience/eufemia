import { useStaticQuery, graphql } from 'portal-query'
import ListSummaryFromEdges from './ListSummaryFromEdges'
import { excludedSlugs } from './componentCategories'

export default function ListComponents(props) {
  const {
    allMdx: { edges },
  } = useStaticQuery(graphql`
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
              regex: "/(?!uilib/components/fragments)(uilib/components/.*)/"
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

  const visibleEdges = edges.filter(
    ({ node }) => !excludedSlugs.has(node.fields.slug)
  )

  return <ListSummaryFromEdges edges={visibleEdges} {...props} />
}
