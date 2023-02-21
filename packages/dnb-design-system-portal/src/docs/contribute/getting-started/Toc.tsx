import { useStaticQuery, graphql } from 'gatsby'
import TableOfContents from 'dnb-design-system-portal/src/shared/parts/TableOfContents'

export default function Toc() {
  const {
    allMdx: { edges },
  } = useStaticQuery(graphql`
    query {
      allMdx(
        filter: {
          fileAbsolutePath: { glob: "**/contribute/getting-started/*" }
        }
      ) {
        edges {
          node {
            headings {
              value
              depth
            }
          }
        }
      }
    }
  `)

  return <TableOfContents edges={edges} />
}
