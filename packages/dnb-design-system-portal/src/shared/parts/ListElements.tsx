import { useStaticQuery, graphql } from 'portal-query'
import ListSummaryFromEdges from './ListSummaryFromEdges'

export default function ListElements() {
  const {
    allMdx: { edges },
  } = useStaticQuery(graphql`
    {
      allMdx(
        filter: {
          frontmatter: {
            title: { ne: "" }
            draft: { ne: true }
            hideInMenu: { ne: true }
          }
          internal: { contentFilePath: { glob: "**/uilib/elements/*" } }
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

  return <ListSummaryFromEdges edges={edges} returnListItems />
}
