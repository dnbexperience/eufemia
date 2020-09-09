/**
 * Web Accordion Component
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import {
  isTrue,
  validateDOMAttributes,
  getPreviousSibling
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
    this.anim.onStart(() => {
      this.setState({
        isAnimating: true
      })
    })
    this.anim.onEnd(() => {
      this.setState({
        isAnimating: false
      })
      // checking additional for  && state === 'closing' makes it more "safe"
      if (this.context.expanded) {
        this.setState({
          keepContentVisible: true
        })
      } else {
        this.setState({
          keepContentVisible: false
        })
      }
    })
  }

  componentDidMount() {
    this.anim.setElem(this._ref.current)
    // We open the expanded in the main component for now
    // if (this.context.expanded) {
    //   this.anim.open(false)
    // }
  }

  componentWillUnmount() {
    this.anim.remove()
  }

  componentDidUpdate() {
    if (this.context.expanded) {
      this.setState(
        {
          keepContentVisible: true
        },
        () => this.anim.open()
      )
    } else {
      this.anim.close()
    }
  }

  renderContent() {
    const { children } = this.props

    const { expanded, prerender } = this.context

    let content = children
    if (typeof content === 'string') {
      content = <p className="dnb-p">{content}</p>
    }

    content =
      (expanded ||
        prerender ||
        this.state.keepContentVisible ||
        // we do check that directly (this.anim.isAnimating), rather than check this.state.isAnimating, because of the instant feedback
        this.anim.isAnimating) &&
      children

    return content
  }

  getContent(cache = null) {
    const { className, ...rest } = this.props
    const { keepContentVisible } = this.state

    const { id, expanded, disabled } = this.context

    const wrapperParams = {
      className: classnames(
        'dnb-accordion__content',
        !expanded && 'dnb-accordion__content--hidden',
        this.state.isAnimating && 'dnb-accordion__content--is-animating',
        className
      ),
      ...rest
    }

    const innerParams = {
      id: `${id}-content`,
      role: 'region',
      'aria-labelledby': `${id}-header`,
      className: classnames(
        'dnb-accordion__content__inner',
        keepContentVisible === false &&
          'dnb-accordion__content__inner--remove-content',
        createSpacingClasses(rest)
      )
    }

    if (expanded) {
      innerParams['aria-expanded'] = true
    }

    if (!expanded || disabled) {
      innerParams.disabled = true
      innerParams['aria-hidden'] = true
    }

    // to remove spacing props
    validateDOMAttributes(this.props, wrapperParams)
    validateDOMAttributes(null, innerParams)

    return (
      <div {...wrapperParams} ref={this._ref}>
        <div {...innerParams}>
          {cache || (this._cache = this.renderContent())}
        </div>
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
    this.onStartStack = []
    this.onEndStack = []
  }
  setElem(elem) {
    this.elem =
      elem ||
      (typeof document !== 'undefined' && document.createElement('div'))

    // get tr element
    if (String(this.elem?.nodeName).toLowerCase() === 'td') {
      this.elem = this.elem.parentElement
    }

    this.container = getPreviousSibling(
      'dnb-accordion-group--single-container',
      this.elem
    )

    if (this.container) {
      this.onResize = () => {
        clearTimeout(this.resizeTimeout)
        this.resizeTimeout = setTimeout(
          () => this.setContainerHeight(),
          300
        )
      }
      window.addEventListener('resize', this.onResize)
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
    this.onStartStack = null
    this.onEndStack = null
    this.stop()
    this.elem = null
    this.state = 'init'
    this.openHeight = null
    if (this.onResize) {
      clearTimeout(this.resizeTimeout)
      window.removeEventListener('resize', this.onResize)
    }
  }
  getOpentHeight() {
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
    this.elem.style.opacity = '0'
    this.elem.style.visibility = 'visible'

    return this.openHeight
  }
  getCloseHeight() {
    this.closeHeight = parseFloat(this.elem.clientHeight)
    // this.closeHeight = parseFloat(window.getComputedStyle(this.elem).height)

    return this.closeHeight
  }
  onStart(fn) {
    this.onStartStack.push(fn)
  }
  onEnd(fn) {
    this.onEndStack.push(fn)
  }
  callOnEnd() {
    this.isAnimating = false
    this.removeEndEvents()

    if (this.transitionDuration) {
      this.elem.style.transitionDuration = this.transitionDuration
      this.transitionDuration = null
    }

    this.onEndStack.forEach((fn) => {
      if (typeof fn === 'function') {
        fn(this.state)
      }
    })
  }
  start(height = 0, before = '0px', { animate = true } = {}) {
    if (typeof window !== 'undefined' && window.requestAnimationFrame) {
      this.stop()

      this.isAnimating = true

      if (animate === false) {
        this.oppressAnimation()
      }

      // call the callbacks here, because then we do not call this during startup. This way we get an instant startup
      this.onStartStack.forEach((fn) => {
        if (typeof fn === 'function') {
          fn(this.state)
        }
      })

      // make the animation
      this.reqId1 = window.requestAnimationFrame(() => {
        if (before) {
          this.elem.style.height = `${before}px`
          this.elem.style.opacity = String(before > 0 ? 1 : 0)
          if (this.container) {
            this.container.style.minHeight = `${before}px`
          }
        }
        this.reqId2 = window.requestAnimationFrame(() => {
          this.elem.style.height = `${height}px`
          this.elem.style.opacity = String(height > 0 ? 1 : 0)
          this.setContainerHeight()
        })
      })
    }
  }
  setContainerHeight() {
    if (this.container) {
      const contentElem = this.elem
      if (contentElem.offsetHeight > 0) {
        this.container.style.minHeight = `${
          contentElem.offsetHeight + contentElem.offsetTop
        }px`
      }
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
    if (this.state === 'opened' || this.state === 'opening') {
      return
    }
    this.state = 'opening'
    this.removeEndEvents() // also, remove events on every open (but not on close!)

    if (!this.onOpenEnd) {
      this.elem.addEventListener(
        'transitionend',
        (this.onOpenEnd = () => {
          this.elem.style.height = 'auto'
          this.callOnEnd()
          this.state = 'opened'

          this.setContainerHeight()
        })
      )
    }

    const height = this.getOpentHeight()
    this.start(height, 0, { animate })
  }
  close(animate = true) {
    if (this.state === 'closed' || this.state === 'closing') {
      return
    }
    this.state = 'closing'
    this.removeEndEvents() // also, remove events on every open (but not on close!)

    if (!this.onCloseEnd) {
      this.elem.addEventListener(
        'transitionend',
        (this.onCloseEnd = () => {
          this.callOnEnd()
          this.state = 'closed'
        })
      )
    }

    const height = this.getCloseHeight()
    this.start(0, height, { animate })
  }
}
