/**
 * Web Pagination Helpers
 *
 */

import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Context from '../../shared/Context'
import ProgressIndicator from '../progress-indicator/ProgressIndicator'

export class PaginationIndicator extends PureComponent {
  static contextType = Context
  static propTypes = {
    indicator_element: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.node,
      PropTypes.func,
      PropTypes.string
    ])
  }
  static defaultProps = {
    indicator_element: 'div'
  }
  render() {
    const { indicator_element } = this.props
    const Element = preparePageElement(indicator_element)
    return (
      <Element className="dnb-pagination__indicator">
        <div className="dnb-pagination__indicator__inner">
          <ProgressIndicator />
          {this.context.translation.Pagination.is_loading_text}
        </div>
      </Element>
    )
  }
}

export class ContentObject {
  constructor({ pageNo, ...props }) {
    this.content = null

    this.pageNo = pageNo
    this.hasContent = false

    for (let k in props) {
      this[k] = props[k]
    }
  }
  insert(content) {
    this.hasContent = true
    this.content = content
    if (typeof this.onInsert === 'function') {
      this.onInsert({ content, pageNo: this.pageNo })
    }
    return this
  }
  update(content) {
    this.hasContent = true
    this.content = content
    if (typeof this.onUpdate === 'function') {
      this.onUpdate({ content, pageNo: this.pageNo })
    }
    return this
  }
}

export function isTrElement(Element) {
  let isTr = false

  if (Element === 'tr') {
    isTr = true
  } else if (
    Element &&
    (typeof Element === 'object' || React.isValidElement(Element))
  ) {
    if ((Element.__emotion_base || Element.target) === 'tr') {
      isTr = true
    }
  }

  return isTr
}

export function preparePageElement(Element) {
  if (String(Element) === 'Symbol(react.fragment)') {
    return Element
  }

  if (isTrElement(Element)) {
    const Tr = Element

    Element = React.forwardRef(({ ...props }, ref) => {
      return (
        <Tr className="dnb-pagination__page">
          <td {...props} ref={ref} />
        </Tr>
      )
    })
  }

  return Element
}

// NB: We do currently not use scroll direction handling
// export function detectScrollDirection(cb, direction = null) {
//   if (typeof window === 'undefined' || typeof document === 'undefined') {
//     return cb('down')
//   }
//
//   let last = 0,
//     current,
//     position
//
//   const listener = () => {
//     position = window.pageYOffset || document.documentElement.scrollTop
//     current = position > last ? 'down' : 'up'
//     if (current && current !== direction) {
//       direction = current
//       cb(current)
//     }
//     last = position <= 0 ? 0 : position // secure negative scrolling on mobile
//   }
//
//   window.addEventListener('scroll', listener, false)
//
//   return {
//     remove: () => {
//       if (typeof window !== 'undefined') {
//         window.removeEventListener('scroll', listener)
//       }
//     }
//   }
// }
