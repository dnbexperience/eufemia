/**
 * Inline Tag
 *
 */

import React from 'react'
import { Td } from '@dnb/eufemia/src'
import { Table as TableElement } from '@dnb/eufemia/src/components'

export function Sample({ children }) {
  return children
}

export default function Table({ children }) {
  // make sure we get the table children
  children =
    recursiveFind(children, (child: React.ReactElement) =>
      child.type === 'table' ? child.props.children : false
    ) || children

  children = recursiveMap(
    children,
    (child: React.ReactElement, isValid: boolean) => {
      if (!isValid && typeof child === 'string') {
        const checkChild = String(child).trim()
        if (checkChild.length === 0) {
          return null
        }
        return child
      }

      if (child.type === 'td') {
        const tds = getChildren(child)
        const foundSample = tds?.find((content) => {
          return content.type?.name === 'Sample'
        })

        // manipulate the colors, if provided
        if (foundSample) {
          const hex = foundSample.props.children?.[0]

          return (
            <Td aria-hidden style={prepareStyleWithSameColor(hex)}>
              {foundSample}
            </Td>
          )
        }
      }

      return child
    }
  )

  return <TableElement>{children}</TableElement>
}

function getChildren(children: ChildrenWithChildren) {
  return recursiveMap(children.props.children, (child) => child)
}

type ChildrenWithChildren = {
  props: { children: ChildrenWithChildren & React.ReactNode }
} & React.ReactNode

function recursiveFind(children: ChildrenWithChildren, func) {
  let found = null
  if (children) {
    React.Children.forEach(children, (child: ChildrenWithChildren) => {
      found = func(child)
      if (found) {
        return found
      } else if (child.props && child.props.children) {
        found = recursiveFind(child.props.children, func)
        if (found) {
          return found
        }
      }
    })
  }
  return found
}

function recursiveMap(
  children: ChildrenWithChildren,
  func = null
): Array<React.ReactElement & { type: { name: string } }> {
  return React.Children.map(children, (child: React.ReactNode) => {
    if (!React.isValidElement(child)) {
      return func ? func(child, false) : child
    }

    if (child.props.children) {
      child = React.cloneElement(child, {
        children: recursiveMap(child.props.children, func),
      })
    }

    return func ? func(child, true) : child
  })
}

function prepareStyleWithSameColor(hex: string) {
  return {
    color: hex,
    background: hex,
  }
}
