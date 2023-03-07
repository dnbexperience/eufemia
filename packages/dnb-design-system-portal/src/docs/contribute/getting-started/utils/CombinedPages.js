import { useStaticQuery, graphql } from 'gatsby'
import ListSummaryFromPages from '../../../../shared/parts/ListSummaryFromPages'

const CombinedPages = () => {
  const {
    allMdx: { edges },
  } = useStaticQuery(graphql`
    {
      allMdx(
        filter: {
          frontmatter: { title: { ne: "" }, draft: { ne: true } }
          # MDX v1
          fileAbsolutePath: { glob: "**/contribute/getting-started/**" }

          # TODO MDX v2
          # internal: { contentFilePath: { glob: "**/contribute/getting-started/**"  } }
        }
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              title
              description
              order
            }
            body
          }
        }
      }
    }
  `)

  return <ListSummaryFromPages edges={edges} showBody />
}

export default CombinedPages
