/**
 * Inline Tag
 *
 */

import React from 'react'
import styled from '@emotion/styled'
import { Table as TableElement } from '@dnb/eufemia/src/components'

const StyledTable = styled(TableElement)`
  td {
    white-space: nowrap;
  }
`

export function OmitTableProperties({ children }) {
  const omitProperties = globalThis.omitTableProperties || []

  return recursiveMap(children, (child: React.ReactNode) => {
    if (React.isValidElement(child) && child.type === 'tr') {
      const firstTd = getFirstChild(child as ChildWithChildren)

      if (React.isValidElement(firstTd) && firstTd.type === 'td') {
        const tdContent = getFirstChild(firstTd as ChildWithChildren)
        const name = React.isValidElement(tdContent)
          ? getFirstChild(tdContent as ChildWithChildren)
          : tdContent

        if (omitProperties.includes(String(name))) {
          return null
        }
      }
    }

    return child
  })
}

export default function Table({ children }) {
  // make sure we get the table children
  children =
    recursiveFind(children, (child) =>
      child.type === 'table'
        ? (child.props as { children?: React.ReactNode }).children
        : false
    ) || children

  children = recursiveMap(
    children,
    (child: React.ReactNode, isValid: boolean) => {
      if (!isValid && typeof child === 'string') {
        const checkChild = String(child).trim()
        if (checkChild.length === 0) {
          return null
        }
      }

      if (React.isValidElement(child) && child.type === 'td') {
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

type ChildWithChildren = React.ReactElement<{
  children?: React.ReactNode
}>

function getFirstChild(
  children: ChildWithChildren
): React.ReactNode | undefined {
  const c = children.props?.children
  return Array.isArray(c) ? c[0] : c
}

function getChildren(children: ChildWithChildren) {
  return recursiveMap(children.props.children, (child) => child)
}

function recursiveFind(
  children: React.ReactNode,
  func: (child: ChildWithChildren) => unknown
) {
  let found = null
  if (children) {
    React.Children.forEach(children, (child) => {
      if (!React.isValidElement(child)) {
        return
      }
      found = func(child as ChildWithChildren)
      if (found) {
        return found
      } else if (
        child.props &&
        (child.props as { children?: React.ReactNode }).children
      ) {
        found = recursiveFind(
          (child.props as { children: React.ReactNode }).children,
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
  children: React.ReactNode,
  func:
    | ((child: React.ReactNode, isValid: boolean) => React.ReactNode)
    | null = null
): React.ReactNode[] {
  return React.Children.map(children, (child: React.ReactNode) => {
    if (!React.isValidElement(child)) {
      return func ? func(child, false) : child
    }

    const childWithChildren = child as ChildWithChildren
    if (childWithChildren.props.children) {
      child = React.cloneElement(
        childWithChildren,
        {},
        recursiveMap(childWithChildren.props.children, func)
      ) as ChildWithChildren
    }

    return func ? func(child, true) : child
  }) as React.ReactNode[]
}

function prepareStyleWithSameColor(hex: string) {
  return {
    color: hex,
    background: hex,
    fontFamily: 'var(--font-family-monospace)',
    width: 0,
  }
}
