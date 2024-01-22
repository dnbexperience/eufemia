import React from 'react'
import { Ul, Li } from '@dnb/eufemia/src'
import AutoLinkHeader from '../tags/AutoLinkHeader'
import Anchor from '../tags/Anchor'
import {
  HeadingSize,
  resetLevels,
} from '@dnb/eufemia/src/components/Heading'
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
  size?: HeadingSize
  description?: string
  returnListItems?: boolean
} & SpacingProps

export default function ListSummaryFromEdges({
  edges,
  level = undefined,
  size = undefined,
  description: description = null,
  returnListItems = false,
  ...props
}: ListSummaryFromEdgesProps) {
  const Wrapper = returnListItems ? Ul : React.Fragment

  resetLevels((level || 2) as InternalHeadingLevel)

  const jsx = edges.map(
    (
      {
        node: {
          frontmatter: { title, description: fmDescription },
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
              size={size}
              useSlug={'/' + slug}
              title={title}
              {...props}
            >
              <Anchor href={'/' + slug}>{title}</Anchor>
            </AutoLinkHeader>
            {(description !== null ? description : fmDescription) && (
              <ReactMarkdown components={basicComponents}>
                {description !== null ? description : fmDescription}
              </ReactMarkdown>
            )}
          </>
        )
      }
    },
  )

  return <>{jsx}</>
}
