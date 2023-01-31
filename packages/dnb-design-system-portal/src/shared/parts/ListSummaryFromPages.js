import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'

import { P, Anchor, Ul, Li } from '@dnb/eufemia/src/elements'
import AutoLinkHeader from '../tags/AutoLinkHeader'

const ListSummaryFromDocs = ({ slug, useAsIndex = false }) => {
  const {
    allMdx: { edges },
  } = useStaticQuery(graphql`
    {
      allMdx(
        filter: {
          frontmatter: { title: { ne: "" }, draft: { ne: true } }
          internal: { contentFilePath: { glob: "**/uilib/**" } }
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

  const Wrapper = useAsIndex ? Ul : React.Fragment

  return (
    <>
      {edges
        .filter(
          ({
            node: {
              fields: { slug: s },
            },
          }) => s.includes(String(slug).replace(/^\//, ''))
        )
        .sort(
          (
            {
              node: {
                frontmatter: { title: titleA },
              },
            },
            {
              node: {
                frontmatter: { title: titleB },
              },
            }
          ) => {
            return (titleA > titleB) - (titleA < titleB)
          }
        )
        .map(
          (
            {
              node: {
                frontmatter: { title, description },
                fields: { slug },
              },
            },
            i
          ) => {
            return (
              <Wrapper key={i}>
                {useAsIndex ? (
                  <Li>
                    <Anchor href={'/' + slug}>{title}</Anchor>
                    <br />
                  </Li>
                ) : (
                  <AutoLinkHeader
                    level="2"
                    useSlug={'/' + slug}
                    title={title}
                  >
                    <Anchor href={'/' + slug}>{title}</Anchor>
                  </AutoLinkHeader>
                )}

                {description && <P>{description}</P>}
              </Wrapper>
            )
          }
        )}
    </>
  )
}

export default ListSummaryFromDocs
