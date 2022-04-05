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
          fileAbsolutePath: { glob: "**/uilib/**" }
        }
      ) {
        edges {
          node {
            frontmatter {
              title
              description
            }
            slug
          }
        }
      }
    }
  `)

  const Wrapper = useAsIndex ? Ul : React.Fragment

  return (
    <>
      {edges
        .filter(({ node: { slug: s } }) =>
          s.includes(String(slug).replace(/^\//, ''))
        )
        .map(
          (
            {
              node: {
                frontmatter: { title, description },
                slug,
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
