/**
 * Web Accordion Component
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import {
  // warn,
  isTrue
  // makeUniqueId,
  // registerElement,
  // extendPropsWithContext,
  // validateDOMAttributes,
  // dispatchCustomElementEvent
} from '../../shared/component-helper'
import classnames from 'classnames'
import AccordionContext from './AccordionContext'
import { createSpacingClasses } from '../space/SpacingHelper'

const propTypes = {
  // React props
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.func
  ])
}

const defaultProps = {
  // React props
  className: null,
  children: null
}

export default class AccordionContent extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps
  static contextType = AccordionContext

  constructor(props, context) {
    super(props)
    this._ref = React.createRef()

    this.state = {
      _gotOpened: context.gotOpened
    }

    this.anim = new HeightAnim()
    this.anim.onEnd(() => {
      // checking additional for  && state === 'close' makes it more "safe"
      if (!this.context.expanded) {
        this.setState({
          keepContentVisible: false
        })
      } else {
        this.setState({
          keepContentVisible: true
        })
      }
    })
  }

  componentDidMount() {
    this.anim.setElem(this._ref.current)
    if (this.context.expanded) {
      this.anim.open(false)
    }
  }

  componentWillUnmount() {
    this.anim.remove()
  }

  componentDidUpdate() {
    if (this.context.expanded) {
      this.anim.open()
      this.setState({
        keepContentVisible: true
      })
    } else {
      this.anim.close()
    }
  }

  renderContent() {
    const { children } = this.props

    const {
      id,
      expanded,
      prerender
      // prevent_rerender, // eslint-disable-line
      // disabled // eslint-disable-line
    } = this.context

    const innerParams = {}

    // legacy borwer support
    innerParams.id = `${id}-content`
    innerParams.role = 'region'
    innerParams['aria-labelledby'] = `${id}-header`

    if (expanded) {
      innerParams['aria-expanded'] = true
    }

    if (prerender && !expanded) {
      innerParams['aria-hidden'] = true
    }

    let content = children
    if (typeof content === 'string') {
      content = <p className="dnb-p">{content}</p>
    }

    content = (expanded ||
      prerender ||
      this.state.keepContentVisible ||
      this.anim.isAnimating) && <div {...innerParams}>{children}</div>

    return content
  }

  getContent(cache = null) {
    const { className, ...rest } = this.props

    const {
      expanded,
      prerender
      // prevent_rerender, // eslint-disable-line
      // disabled // eslint-disable-line
    } = this.context

    const wrapperParams = {
      className: classnames(
        'dnb-accordion__content',
        !expanded && prerender && 'dnb-accordion__content--hidden',
        createSpacingClasses(rest),
        className
      ),
      ...rest
    }

    return (
      <div {...wrapperParams} ref={this._ref}>
        {cache || (this._cache = this.renderContent())}
      </div>
    )
  }

  render() {
    const { prevent_rerender } = this.context

    if (isTrue(prevent_rerender) && this._cache) {
      return this.getContent(this._cache)
    }

    return this.getContent()
  }
}

class HeightAnim {
  constructor() {
    this.state = 'init'
    this.cbStack = []
  }
  setElem(elem) {
    this.elem =
      elem ||
      (typeof document !== 'undefined' && document.createElement('div'))

    // get tr element
    if (String(this.elem?.nodeName).toLowerCase() === 'td') {
      this.elem = this.elem.parentElement
    }
  }
  removeEndEvents() {
    if (this.onOpenEnd) {
      this.elem.removeEventListener('transitionend', this.onOpenEnd)
      this.onOpenEnd = null
    }
    if (this.onCloseEnd) {
      this.elem.removeEventListener('transitionend', this.onCloseEnd)
      this.onCloseEnd = null
    }
  }
  remove() {
    this.removeEndEvents()
    this.isAnimating = false
    this.cbStack = null
    this.stop()
    this.elem = null
    this.openHeight = null
  }
  geOpentHeight() {
    const position = window.getComputedStyle(this.elem.parentElement)
      .position

    this.elem.parentElement.style.position = 'relative'
    this.elem.style.position = 'absolute'
    this.elem.style.visibility = 'hidden'
    this.elem.style.height = 'auto'

    this.openHeight = parseFloat(this.elem.clientHeight)
    // this.openHeight = parseFloat(window.getComputedStyle(this.elem).height)

    this.elem.parentElement.style.position =
      position !== 'static' ? position : ''
    this.elem.style.position = ''
    this.elem.style.height = '0'
    this.elem.style.visibility = 'visible'

    return this.openHeight
  }
  getCloseHeight() {
    this.closeHeight = parseFloat(this.elem.clientHeight)
    // this.closeHeight = parseFloat(window.getComputedStyle(this.elem).height)

    return this.closeHeight
  }
  onEnd(fn) {
    this.cbStack.push(fn)
  }
  callOnEnd() {
    this.isAnimating = false
    this.removeEndEvents()

    if (this.transitionDuration) {
      this.elem.style.transitionDuration = this.transitionDuration
      this.transitionDuration = null
    }

    this.cbStack.forEach((fn) => {
      if (typeof fn === 'function') {
        fn(this.state)
      }
    })

    this.state = null
  }
  start(height = 0, before = '0px', { animate = true } = {}) {
    if (typeof window !== 'undefined' && window.requestAnimationFrame) {
      this.stop()

      this.isAnimating = true

      if (animate === false) {
        this.oppressAnimation()
      }

      // make the animation
      this.reqId1 = window.requestAnimationFrame(() => {
        if (before) {
          this.elem.style.height = `${before}px`
        }
        this.reqId2 = window.requestAnimationFrame(() => {
          this.elem.style.height = `${height}px`
        })
      })
    }
  }
  stop() {
    if (typeof window !== 'undefined' && window.requestAnimationFrame) {
      window.cancelAnimationFrame(this.reqId1)
      window.cancelAnimationFrame(this.reqId2)
    }
  }
  oppressAnimation() {
    this.transitionDuration = window.getComputedStyle(
      this.elem
    ).transitionDuration
    this.elem.style.transitionDuration = '1ms'
  }
  open(animate = true) {
    if (this.state === 'open') {
      return
    }
    this.state = 'open'
    this.removeEndEvents() // also, remove events on every open (but not on close!)

    if (!this.onOpenEnd) {
      this.elem.addEventListener(
        'transitionend',
        (this.onOpenEnd = () => {
          this.elem.style.height = 'auto'
          this.callOnEnd()
        })
      )
    }

    const height = this.geOpentHeight()
    this.start(height, 0, { animate })
  }
  close(animate = true) {
    if (this.state === 'close') {
      return
    }
    this.state = 'close'

    if (!this.onCloseEnd) {
      this.elem.addEventListener(
        'transitionend',
        (this.onCloseEnd = () => {
          this.callOnEnd()
        })
      )
    }

    const height = this.getCloseHeight()
    this.start(0, height, { animate })
  }
}
