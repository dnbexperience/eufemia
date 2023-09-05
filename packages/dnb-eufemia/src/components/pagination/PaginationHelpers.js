/**
 * Web Pagination Helpers
 *
 */
import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import Context from '../../shared/Context'
import ProgressIndicator from '../progress-indicator/ProgressIndicator'

export class PaginationIndicator extends React.PureComponent {
  static contextType = Context
  static propTypes = {
    indicator_element: PropTypes.oneOfType([
      PropTypes.object,
      PropTypes.node,
      PropTypes.func,
      PropTypes.string,
    ]),
  }
  static defaultProps = {
    indicator_element: 'div',
  }
  render() {
    const { indicator_element } = this.props
    const Element = preparePageElement(indicator_element)
    const ElementChild = isTrElement(Element) ? 'td' : 'div'

    return (
      <Element>
        <ElementChild className="dnb-pagination__indicator">
          <div className="dnb-pagination__indicator__inner">
            <ProgressIndicator />
            {
              this.context.getTranslation(this.props).Pagination
                .is_loading_text
            }
          </div>
        </ElementChild>
      </Element>
    )
  }
}

export class ContentObject {
  constructor({ pageNumber, ...props }) {
    this.content = null

    this.pageNumber = pageNumber
    this.hasContent = false

    for (let k in props) {
      this[k] = props[k]
    }
  }
  insert(content) {
    this.hasContent = true
    this.content = content
    if (typeof this.onInsert === 'function') {
      this.onInsert(this)
    }
    return this
  }
  update(content) {
    this.hasContent = true
    this.content = content
    if (typeof this.onUpdate === 'function') {
      this.onUpdate(this)
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

export function preparePageElement(
  Element,
  includeClassName = 'dnb-pagination__page'
) {
  if (String(Element) === 'Symbol(react.fragment)') {
    return Element
  }

  if (includeClassName) {
    const isTr = isTrElement(Element)

    // eslint-disable-next-line
    return React.forwardRef(({ className, children, ...props }, ref) => {
      const params = {
        ...props,
        className: classnames(includeClassName, className),
        ref,
      }
      return isTr ? (
        <td>
          <div {...params}>{children}</div>
        </td>
      ) : (
        <Element {...params}>{children}</Element>
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
