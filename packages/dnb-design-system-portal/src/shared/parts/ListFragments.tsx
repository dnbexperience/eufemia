import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import ListSummaryFromEdges, { ListEdges } from './ListSummaryFromEdges'

export default function ListFragments() {
  const {
    allMdx: { edges },
  } = useStaticQuery(graphql`
    {
      allMdx(
        filter: {
          frontmatter: { title: { ne: "" }, draft: { ne: true } }
          internal: {
            contentFilePath: { glob: "**/uilib/components/fragments/*" }
          }
        }
        sort: { fields: [frontmatter___order, frontmatter___title] }
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

  return <ListSummaryFromEdges edges={edges as ListEdges} />
}
