import React from 'react'
import { graphql, useStaticQuery } from 'gatsby'
import ListSummaryFromPages from './ListSummaryFromPages'

export default function Summary() {
  const {
    allMdx: { edges },
  } = useStaticQuery(graphql`
    {
      allMdx(
        filter: {
          frontmatter: { title: { ne: "" }, draft: { ne: true } }
          # MDX v1
          fileAbsolutePath: { glob: "**/uilib/extensions/*" }

          # TODO MDX v2
          # internal: { contentFilePath: { glob: "**/uilib/extensions/*" } }
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
            }
          }
        }
      }
    }
  `)

  return <ListSummaryFromPages edges={edges} />
}
