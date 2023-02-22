import { useStaticQuery, graphql } from 'gatsby'
import TableOfContents from 'dnb-design-system-portal/src/shared/parts/TableOfContents'

const Toc = ({ mainTitle }) => {
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

  return <TableOfContents mainTitle={mainTitle} edges={edges} />
}

export default Toc
