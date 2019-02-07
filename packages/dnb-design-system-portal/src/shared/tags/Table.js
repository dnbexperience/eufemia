/**
 * Inline Tag
 *
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Color from 'color'

export default class Table extends PureComponent {
  static propTypes = {
    children: PropTypes.node.isRequired
  }
  renderStyle = hex => {
    const color = Color(hex)
    let textColor =
      color.luminosity() > 0.5
        ? color.negate().grayscale()
        : color.negate()
    const contrast = color.contrast(textColor)
    if (contrast < 3) {
      textColor = color.rotate(60)
    }
    return {
      color: textColor,
      backgroundColor: color.rgb()
    }
  }
  render() {
    // make sure we get the table children
    let children =
      recursiveFind(this.props.children, child =>
        child.type === 'table' ? child.props.children : false
      ) || this.props.children

    // manipulate the colors, if providet
    children = recursiveMap(children, (child, isValid) => {
      if (!isValid && typeof child === 'string') {
        child = String(child).trim()
        if (child.length === 0) {
          return null
        }
        // in case we will color only the filed with the hex color
        if (0 && child[0] === '#') {
          return <span style={{ background: child }}>{child}</span>
        }
        return child

        // in case we will color the whole tr
      } else if (0 && child.type === 'tr') {
        const hex = findColor(child.props.children)
        if (hex && hex.length === 7) {
          return (
            <tr style={this.renderStyle(hex)}>
              {recursiveMap(child.props.children, child => child)}
            </tr>
          )
        }

        // in case we will color the whole td
      } else if (1 && child.type === 'td') {
        const hex = findColor(child.props.children)
        if (hex && hex.length === 7) {
          return (
            <td style={this.renderStyle(hex)} className="selectable">
              {recursiveMap(child.props.children, child => child)}
            </td>
          )
        }
      }
      return child
    })
    return <table>{children}</table>
  }
}

const findColor = children => {
  if (children) {
    for (let found, i = 0, l = children.length; i < l; i++) {
      const child = children[i]
      if (typeof child === 'string' && child[0] === '#') {
        return child
      } else if (child.props && child.props.children) {
        found = findColor(child.props.children)
        if (found) return found
      }
    }
  }
  return null
}

const recursiveFind = (children, func) => {
  let found = null
  if (children) {
    React.Children.forEach(children, child => {
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
  return React.Children.map(children, child => {
    if (!React.isValidElement(child)) {
      return func ? func(child, false) : child
    }

    if (child.props.children) {
      child = React.cloneElement(child, {
        children: recursiveMap(child.props.children, func)
      })
    }

    return func ? func(child, true) : child
  })
}
