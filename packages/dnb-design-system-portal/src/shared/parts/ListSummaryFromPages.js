import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { MDXRenderer } from 'gatsby-plugin-mdx' // deprecated, remove in MDX v2
import { P, Anchor, Ul, Li } from '@dnb/eufemia/src/elements'
import AutoLinkHeader from '../tags/AutoLinkHeader'

const ListSummaryFromPages = ({
  slug,
  returnListItems = false,
  showBody = false,
}) => {
  const {
    allMdx: { edges },
  } = useStaticQuery(graphql`
    {
      allMdx(
        filter: {
          frontmatter: { title: { ne: "" }, draft: { ne: true } }
          # MDX v1
          fileAbsolutePath: { glob: "**/uilib/**" }

          # TODO MDX v2
          # internal: { contentFilePath: { glob: "**/uilib/**" } }
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
              return <MDXRenderer>{body}</MDXRenderer>
            }
          }
        )}
    </>
  )
}

export default ListSummaryFromPages
