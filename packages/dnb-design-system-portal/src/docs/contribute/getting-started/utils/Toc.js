import { useStaticQuery, graphql } from 'gatsby'
import TableOfContents from '../../../../shared/parts/TableOfContents'

const Toc = () => {
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
            frontmatter {
              order
            }
            tableOfContents
          }
        }
      }
    }
  `)

  return <TableOfContents edges={edges} />
}

export default Toc
