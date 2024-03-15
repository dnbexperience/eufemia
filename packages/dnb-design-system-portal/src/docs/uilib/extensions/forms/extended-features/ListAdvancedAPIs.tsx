import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import ListSummaryFromEdges from '../../../../../shared/parts/ListSummaryFromEdges'

/**
 * As of now, this component is not used in the portal.
 * All the advanced APIs are listed in the `extended-features.mdx` file, manually.
 */

export default function ListAdvancedAPIs(props) {
  const {
    allMdx: { edges },
  } = useStaticQuery(graphql`
    {
      allMdx(
        filter: {
          frontmatter: {
            title: { ne: null }
            draft: { ne: true }
            componentType: { in: "advanced-api" }
          }
          internal: {
            contentFilePath: { glob: "**/uilib/extensions/forms/**/*" }
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
