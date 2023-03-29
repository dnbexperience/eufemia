import React from 'react'
import { P, Anchor, Ul, Li } from '@dnb/eufemia/src/elements'
import AutoLinkHeader from '../tags/AutoLinkHeader'

type ListEdge = {
  node: {
    frontmatter: {
      title: string
      description?: string
      order?: number
    }
    fields: {
      slug: string
    }
  }
}
export type ListEdges = Array<ListEdge>
type ListSummaryFromEdgesProps = {
  edges: ListEdges
  returnListItems?: boolean
}

export default function ListSummaryFromEdges({
  edges,
  returnListItems = false,
}: ListSummaryFromEdgesProps) {
  const Wrapper = returnListItems ? Ul : React.Fragment

  const jsx = edges.map(
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
          <Title />
        </Wrapper>
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
            <AutoLinkHeader level="2" useSlug={'/' + slug} title={title}>
              <Anchor href={'/' + slug}>{title}</Anchor>
            </AutoLinkHeader>
            {description && <P>{description}</P>}
          </>
        )
      }
    }
  )

  return <>{jsx}</>
}
