import React from 'react'
import { MDXRenderer, MDXRendererProps } from 'gatsby-plugin-mdx' // deprecated, remove in MDX v2
import { P, Anchor, Ul, Li } from '@dnb/eufemia/src/elements'
import AutoLinkHeader from '../tags/AutoLinkHeader'

type EdgesNode = {
  frontmatter: { title: string; description: string }
  fields: { slug: string }
  body: React.Component<MDXRendererProps>
}

type ListSummaryFromPagesProps = {
  edges: Array<{ node: EdgesNode }>
  returnListItems?: boolean
  showBody?: boolean
}

function ListSummaryFromPages({
  edges,
  returnListItems,
  showBody,
}: ListSummaryFromPagesProps) {
  const Wrapper = returnListItems ? Ul : React.Fragment

  return (
    <>
      {edges
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
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
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
              // eslint-disable-next-line @typescript-eslint/ban-ts-comment
              // @ts-ignore
              return <MDXRenderer>{body}</MDXRenderer>
            }
          }
        )}
    </>
  )
}

export default ListSummaryFromPages
