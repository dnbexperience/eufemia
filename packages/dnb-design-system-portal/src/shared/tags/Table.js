/**
 * Inline Tag
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
// import Color from 'color'
import { Table as TableElement } from '@dnb/eufemia/src/components'

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

    // manipulate the colors, if providet
    children = recursiveMap(children, (child, isValid) => {
      if (!isValid && typeof child === 'string') {
        const checkChild = String(child).trim()
        if (checkChild.length === 0) {
          return null
        }
        // in case we will color only the filed with the hex color
        // if (0 && checkChild[0] === '#') {
        //   return <span style={{ background: child }}>{child}</span>
        // }
        return child
      }

      // Not used anymore
      // in case we will color the whole tr
      // } else if (0 && child.props.originalType === 'tr') {
      //   const hex = findColor(child.props.children)
      //   if (hex && hex.length === 7) {
      //     return (
      //       <tr style={this.prepareWithContrastColor(hex)}>
      //         {recursiveMap(child.props.children, child => child)}
      //       </tr>
      //     )
      //   }

      // in case we will color the whole td
      if (child.props.originalType === 'td') {
        const hex = child.props.color ? child.props.color : null
        // : findColor(child.props.children)
        if (hex && hex.length === 7) {
          return (
            <td
              // style={prepareWithContrastColor(hex)}
              style={prepareWithSameColor(hex)}
              className="selectable"
              aria-hidden
            >
              {hex}
            </td>
          )
        } else if (this.props.selectable) {
          return (
            <td className="selectable">
              {recursiveMap(child.props.children, (child) => child)}
            </td>
          )
        }
      }

      return child
    })
    return <TableElement>{children}</TableElement>
  }
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

// Not used anymore
// const findColor = children => {
//   if (children) {
//     for (let found, i = 0, l = children.length; i < l; i++) {
//       const child = children[i]
//       if (typeof child === 'string' && child[0] === '#') {
//         return child
//       } else if (child.props && child.props.children) {
//         found = findColor(child.props.children)
//         if (found) return found
//       }
//     }
//   }
//   return null
// }

// Not used anymore
// const prepareWithContrastColor = hex => {
//   const color = Color(hex)
//   let textColor =
//     color.luminosity() > 0.5
//       ? color.negate().grayscale()
//       : color.negate()
//   const contrast = color.contrast(textColor)
//   if (contrast < 3) {
//     textColor = color.rotate(60)
//   }
//   return {
//     color: textColor,
//     background: color.rgb()
//   }
// }
