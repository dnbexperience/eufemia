import { useStaticQuery, graphql } from 'gatsby'
import ListSummaryFromEdges from '../../../../../shared/parts/ListSummaryFromEdges'

export default function ListUiLibVersions(props) {
  const {
    allMdx: { edges },
  } = useStaticQuery(graphql`
    {
      allMdx(
        filter: {
          frontmatter: { title: { ne: null }, draft: { ne: true } }
          internal: {
            contentFilePath: {
              glob: "**/uilib/about-the-lib/releases/dnb-ui-lib/**/*"
            }
          }
        }
        sort: [
          { frontmatter: { order: ASC } }
          { frontmatter: { title: DESC } }
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

  return <ListSummaryFromEdges edges={edges} {...props} />
}
