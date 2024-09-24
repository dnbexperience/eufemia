import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import ListSummaryFromEdges from '../../../../../../shared/parts/ListSummaryFromEdges'

export default function ListMoreFieldComponents(props) {
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
              glob: "**/uilib/extensions/forms/feature-fields/more-fields/*"
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
