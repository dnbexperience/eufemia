/**
 * Inline Tag
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import { Tr, Th, Td } from '@dnb/eufemia/src'
import { Table as TableElement } from '@dnb/eufemia/src/components'
import Copy from './Copy'

export default class Table extends React.PureComponent {
  static propTypes = {
    selectable: PropTypes.bool,
    children: PropTypes.node,
  }
  static defaultProps = {
    selectable: false,
    children: null,
  }
  render() {
    // make sure we get the table children
    let children =
      recursiveFind(this.props.children, (child) =>
        child.type === 'table' ? child.props.children : false
      ) || this.props.children

    // manipulate the colors, if provided
    children = recursiveMap(children, (child, isValid) => {
      if (!isValid && typeof child === 'string') {
        const checkChild = String(child).trim()
        if (checkChild.length === 0) {
          return null
        }
        return child
      }

      // in case we will color the whole td
      if (child.type === 'td') {
        // Create the color preview sample
        const hex = child.props.color ? child.props.color : null
        if (hex && hex.length === 7) {
          return (
            <Td
              style={prepareWithSameColor(hex)}
              className="selectable"
              aria-hidden
            >
              {hex}
            </Td>
          )
        }

        child = getChildren(child)

        if (child?.[0].type?.name === 'code') {
          return (
            <Td>
              <Copy>{child}</Copy>
            </Td>
          )
        } else if (this.props.selectable) {
          return <Td className="selectable">{child}</Td>
        }

        return <Td>{child}</Td>
      }

      if (child.type === 'th') {
        return <Th>{getChildren(child)}</Th>
      }

      if (child.type === 'tr') {
        return <Tr>{getChildren(child)}</Tr>
      }

      return child
    })

    return <TableElement>{children}</TableElement>
  }
}

const getChildren = (children) => {
  return recursiveMap(children.props.children, (child) => child)
}

const recursiveFind = (children, func) => {
  let found = null
  if (children) {
    React.Children.forEach(children, (child) => {
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

const recursiveMap = (children, func = null) => {
  return React.Children.map(children, (child) => {
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

const prepareWithSameColor = (hex) => ({
  color: hex,
  background: hex,
})
