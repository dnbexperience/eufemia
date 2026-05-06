/**
 * Inline Tag
 *
 */

import { Children, cloneElement, isValidElement } from 'react'
import type { ReactElement, ReactNode } from 'react'
import styled from '@emotion/styled'
import { Table as TableElement } from '@dnb/eufemia/src/components'

const StyledTable = styled(TableElement)`
  td {
    white-space: nowrap;
  }
`

export default function Table({ children }) {
  // make sure we get the table children
  children =
    recursiveFind(children, (child) =>
      child.type === 'table'
        ? (child.props as { children?: ReactNode }).children
        : false
    ) || children

  children = recursiveMap(
    children,
    (child: ReactNode, isValid: boolean) => {
      if (!isValid && typeof child === 'string') {
        const checkChild = String(child).trim()
        if (checkChild.length === 0) {
          return null
        }
      }

      if (isValidElement(child) && child.type === 'td') {
        const tdChildren = getChildren(child as ChildWithChildren)
        if (tdChildren?.length === 1) {
          const text = String(tdChildren?.[0])
          if (
            text.startsWith('#') &&
            (text.length === 7 || text.length === 4)
          ) {
            // manipulate the colors, if provided
            return (
              <td aria-hidden style={prepareStyleWithSameColor(text)}>
                {text}
              </td>
            )
          }
        }
      }

      return child
    }
  )

  return (
    <TableElement.ScrollView>
      <StyledTable border outline>
        {children}
      </StyledTable>
    </TableElement.ScrollView>
  )
}

type ChildWithChildren = ReactElement<{
  children?: ReactNode
}>

function getChildren(children: ChildWithChildren) {
  return recursiveMap(children.props.children, (child) => child)
}

function recursiveFind(
  children: ReactNode,
  func: (child: ChildWithChildren) => unknown
) {
  let found = null
  if (children) {
    Children.forEach(children, (child) => {
      if (!isValidElement(child)) {
        return
      }
      found = func(child as ChildWithChildren)
      if (found) {
        return found
      } else if (
        child.props &&
        (child.props as { children?: ReactNode }).children
      ) {
        found = recursiveFind(
          (child.props as { children: ReactNode }).children,
          func
        )
        if (found) {
          return found
        }
      }
    })
  }
  return found
}

function recursiveMap(
  children: ReactNode,
  func: ((child: ReactNode, isValid: boolean) => ReactNode) | null = null
): ReactNode[] {
  return Children.map(children, (child: ReactNode) => {
    if (!isValidElement(child)) {
      return func ? func(child, false) : child
    }

    const childWithChildren = child as ChildWithChildren
    if (childWithChildren.props.children) {
      child = cloneElement(
        childWithChildren,
        {},
        recursiveMap(childWithChildren.props.children, func)
      ) as ChildWithChildren
    }

    return func ? func(child, true) : child
  }) as ReactNode[]
}

function prepareStyleWithSameColor(hex: string) {
  return {
    color: hex,
    background: hex,
    fontFamily: 'var(--font-family-monospace)',
    width: 0,
  }
}
