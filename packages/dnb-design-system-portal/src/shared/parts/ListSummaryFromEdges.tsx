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
  const ListWrapper = returnListItems ? Ul : React.Fragment
  const ItemWrapper = returnListItems ? Li : React.Fragment

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
        <ItemWrapper key={i}>
          <Title />
          <Description />
        </ItemWrapper>
      )

      function Title() {
        const titleLink = <Anchor href={'/' + slug}>{title}</Anchor>

        if (returnListItems) {
          return titleLink
        }

        return (
          <AutoLinkHeader
            level={level || 2}
            size={size}
            useSlug={'/' + slug}
            title={title}
            {...props}
          >
            {titleLink}
          </AutoLinkHeader>
        )
      }

      function Description() {
        const rawDescription =
          description !== null ? description : fmDescription

        if (rawDescription) {
          if (returnListItems) {
            return (
              <>
                :{' '}
                <ReactMarkdown
                  components={basicComponents}
                  disallowedElements={['p']}
                  unwrapDisallowed={true}
                >
                  {rawDescription}
                </ReactMarkdown>
              </>
            )
          }

          return (
            <ReactMarkdown components={basicComponents}>
              {rawDescription}
            </ReactMarkdown>
          )
        }
      }
    },
  )

  return <ListWrapper>{jsx}</ListWrapper>
}
