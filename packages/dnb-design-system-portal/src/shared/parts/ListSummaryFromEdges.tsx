import React from 'react'
import { Anchor, Ul, Li } from '@dnb/eufemia/src'
import AutoLinkHeader from '../tags/AutoLinkHeader'
import { resetLevels } from '@dnb/eufemia/src/components/Heading'
import ReactMarkdown from 'react-markdown'
import { basicComponents } from '../../shared/tags'
import { SpacingProps } from '@dnb/eufemia/src/shared/types'

import type {
  HeadingLevel,
  InternalHeadingLevel,
} from '@dnb/eufemia/src/components/Heading'

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
  level?: HeadingLevel
  description?: string
  returnListItems?: boolean
} & SpacingProps

export default function ListSummaryFromEdges({
  edges,
  level = null,
  description: _description = null,
  returnListItems = false,
  ...props
}: ListSummaryFromEdgesProps) {
  const Wrapper = returnListItems ? Ul : React.Fragment

  resetLevels((level || 2) as InternalHeadingLevel)

  const jsx = edges.map(
    (
      {
        node: {
          frontmatter: { title, description },
          fields: { slug },
        },
      },
      i,
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
            <AutoLinkHeader
              level={level || 2}
              useSlug={'/' + slug}
              title={title}
              {...props}
            >
              <Anchor href={'/' + slug}>{title}</Anchor>
            </AutoLinkHeader>
            {(_description !== null ? _description : description) && (
              <ReactMarkdown components={basicComponents}>
                {_description !== null ? _description : description}
              </ReactMarkdown>
            )}
          </>
        )
      }
    },
  )

  return <>{jsx}</>
}
