import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import ListSummaryFromEdges from '../../../../../shared/parts/ListSummaryFromEdges'

export default function ListBaseInputComponents() {
  const {
    allMdx: { edges },
  } = useStaticQuery(graphql`
    {
      allMdx(
        filter: {
          frontmatter: {
            title: { ne: null }
            draft: { ne: true }
            componentType: { in: "base-input" }
          }
          internal: {
            contentFilePath: {
              glob: "**/uilib/extensions/forms/base-fields/*"
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

  return (
    <ListSummaryFromEdges
      space={{ top: 'x-small' }}
      level={3}
      description=""
      edges={edges}
    />
  )
}
