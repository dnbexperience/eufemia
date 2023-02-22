import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { P, Anchor, Ul, Li } from '@dnb/eufemia/src/elements'
import AutoLinkHeader from '../tags/AutoLinkHeader'

const ListSummaryFromPages = ({
  slug = null,
  returnListItems = false,
  showBody = false,
  edges = null,
}) => {
  const {
    allMdx: { edges: defaultEdges },
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
            body
          }
        }
      }
    }
  `)

  const Wrapper = returnListItems ? Ul : React.Fragment

  return (
    <>
      {(edges ? edges : defaultEdges)
        .filter(
          ({
            node: {
              fields: { slug: s },
            },
          }) => (slug ? s.includes(String(slug).replace(/^\//, '')) : true)
        )
        .sort(
          (
            {
              node: {
                frontmatter: { title: titleA, order: orderA },
              },
            },
            {
              node: {
                frontmatter: { title: titleB, order: orderB },
              },
            }
          ) => {
            if (
              typeof orderA !== 'undefined' &&
              typeof orderB !== 'undefined'
            ) {
              return (orderA > orderB) - (orderA < orderB)
            }
            return (titleA > titleB) - (titleA < titleB)
          }
        )
        .map(
          (
            {
              node: {
                frontmatter: { title, description },
                fields: { slug },
                body,
              },
            },
            i
          ) => {
            return (
              <Wrapper key={i}>{showBody ? <Body /> : <Title />}</Wrapper>
            )

            function Title() {
              if (returnListItems) {
                return (
                  <Li>
                    <Anchor href={'/' + slug}>{title}</Anchor>
                    <br />
                  </Li>
                )
              }

              return (
                <>
                  <AutoLinkHeader
                    level="2"
                    useSlug={'/' + slug}
                    title={title}
                  >
                    <Anchor href={'/' + slug}>{title}</Anchor>
                  </AutoLinkHeader>
                  {description && <P>{description}</P>}
                </>
              )
            }

            function Body() {
              return body
            }
          }
        )}
    </>
  )
}

export default ListSummaryFromPages
