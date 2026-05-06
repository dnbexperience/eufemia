import { useStaticQuery, graphql } from 'portal-query'
import ListSummaryFromEdges from '../../../../../shared/parts/ListSummaryFromEdges'

export default function ListFeatureFieldComponents(props) {
  const {
    allMdx: { edges },
  } = useStaticQuery(graphql`
    {
      allMdx(
        filter: {
          frontmatter: {
            showTabs: { ne: null }
            title: { ne: null }
            draft: { ne: true }
          }
          internal: {
            contentFilePath: {
              glob: "**/uilib/extensions/forms/feature-fields/{more-fields/,}*"
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

  return <ListSummaryFromEdges edges={edges} {...props} />
}
