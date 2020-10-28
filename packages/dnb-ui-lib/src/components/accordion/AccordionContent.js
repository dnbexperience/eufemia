/**
 * Web Accordion Component
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import {
  isTrue,
  validateDOMAttributes,
  processChildren,
  getPreviousSibling
} from '../../shared/component-helper'
import classnames from 'classnames'
import AccordionContext from './AccordionContext'
import { createSpacingClasses } from '../space/SpacingHelper'

export default class AccordionContent extends React.PureComponent {
  static contextType = AccordionContext

  static propTypes = {
    instance: PropTypes.object,
    className: PropTypes.string,
    children: PropTypes.oneOfType([PropTypes.node, PropTypes.func])
  }

  static defaultProps = {
    instance: null,
    className: null,
    children: null
  }

  static getContent(props) {
    return processChildren(props)
  }

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

    if (
      props.instance &&
      Object.prototype.hasOwnProperty.call(props.instance, 'current')
    ) {
      props.instance.current = this
    }
  }

  componentDidMount() {
    this.anim.setElem(
      this._ref.current,
      getPreviousSibling(
        'dnb-accordion-group--single-container',
        this._ref.current
      )
    )
  }

  componentWillUnmount() {
    this.anim.remove()
  }

  componentDidUpdate(prevProps) {
    if (this.context.expanded !== this.context._expanded) {
      this.setState(
        {
          _expanded: this.context.expanded,
          keepContentVisible: true
        },
        () => {
          if (this.context.expanded) {
            this.anim.open()
          } else {
            this.anim.close()
          }
        }
      )
    }

    if (
      AccordionContent.getContent(prevProps) !==
      AccordionContent.getContent(this.props)
    ) {
      this.anim.setContainerHeight()
    }
  }

  setContainerHeight() {
    this.anim?.setContainerHeight()
  }

  renderContent() {
    const children = AccordionContent.getContent(this.props)
    const {
      expanded,
      prerender,
      prevent_rerender,
      prevent_rerender_conditional
    } = this.context

    let content = children

    if (typeof content === 'string') {
      content = <p className="dnb-p">{content}</p>
    }

    content =
      expanded ||
      prerender ||
      this.state.keepContentVisible ||
      this.state.isAnimating
        ? children
        : null

    if (isTrue(prevent_rerender)) {
      // update the cache if children is not the same anymore
      if (
        isTrue(prevent_rerender_conditional) &&
        this._cache !== content
      ) {
        this._cache = content
      }

      if (this._cache) {
        content = this._cache
      } else {
        this._cache = content
      }
    }

    return content
  }

  render() {
    const {
      className,
      instance, // eslint-disable-line
      ...rest
    } = this.props
    const { keepContentVisible, isAnimating } = this.state

    const { id, expanded, disabled } = this.context

    const content = this.renderContent()

    const wrapperParams = {
      className: classnames(
        'dnb-accordion__content',
        !expanded && 'dnb-accordion__content--hidden',
        isAnimating && 'dnb-accordion__content--is-animating',
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
        <div {...innerParams}>{content}</div>
      </div>
    )
  }
}

class HeightAnim {
  constructor() {
    this.state = 'init'
    this.onStartStack = []
    this.onEndStack = []
  }
  setElem(elem, container = null) {
    this.elem =
      elem ||
      (typeof document !== 'undefined' && document.createElement('div'))

    // get tr element
    if (String(this.elem?.nodeName).toLowerCase() === 'td') {
      this.elem = this.elem.parentElement
    }

    this.container = container

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
    if (this.onResize) {
      clearTimeout(this.resizeTimeout)
      window.removeEventListener('resize', this.onResize)
    }
  }
  getCloseHeight() {
    return parseFloat(this.elem.clientHeight)
  }
  getOpenHeight(state) {
    const currentHeight = window.getComputedStyle(this.elem).height
    const currentPosition = window.getComputedStyle(this.elem).position
    const parentPosition = window.getComputedStyle(this.elem.parentElement)
      .position

    this.elem.parentElement.style.position = 'relative'
    this.elem.style.position = 'absolute'
    this.elem.style.visibility = 'hidden'
    this.elem.style.height = 'auto'

    const height = parseFloat(this.elem.clientHeight)

    this.elem.parentElement.style.position =
      parentPosition !== 'static' ? parentPosition : ''
    this.elem.style.position = currentPosition
    this.elem.style.visibility = 'visible'

    switch (state) {
      case 'open':
        this.elem.style.height =
          this.state === 'init' ? '0' : currentHeight
        break
    }

    return height
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
    this.resetSuppressAnimation()

    this.onEndStack.forEach((fn) => {
      if (typeof fn === 'function') {
        fn(this.state)
      }
    })
  }
  start(newHeight = 0, oldHeight = 0, { animate }) {
    if (typeof window !== 'undefined' && window.requestAnimationFrame) {
      this.stop()

      this.isAnimating = true

      if (animate === false) {
        this.suppressAnimation()
      }

      // call the callbacks here, because then we do not call this during startup. This way we get an instant startup
      this.onStartStack.forEach((fn) => {
        if (typeof fn === 'function') {
          fn(this.state)
        }
      })

      // make the animation
      this.reqId1 = window.requestAnimationFrame(() => {
        this.elem.style.height = `${oldHeight}px`

        if (this.container) {
          this.container.style.minHeight = `${oldHeight}px`
        }

        this.reqId2 = window.requestAnimationFrame(() => {
          this.elem.style.height = `${newHeight}px`
          this.setContainerHeight()
        })
      })
    }
  }
  resetContainerHeight() {}
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
  suppressAnimation() {
    this.transitionDuration = window.getComputedStyle(
      this.elem
    ).transitionDuration
    this.elem.style.transitionDuration = '1ms'
  }
  resetSuppressAnimation() {
    if (this.transitionDuration) {
      this.elem.style.transitionDuration = this.transitionDuration
      this.transitionDuration = null
    }
  }
  open({ animate = true } = {}) {
    if (this.state === 'opened' || this.state === 'opening') {
      return
    }

    const height = this.getOpenHeight('open')

    this.state = 'opening'
    this.removeEndEvents() // also, remove events on every open (but not on close!)

    if (!this.onOpenEnd) {
      this.elem.addEventListener(
        'transitionend',
        (this.onOpenEnd = () => {
          if (this.elem) {
            this.elem.style.height = 'auto'
          }

          this.callOnEnd()
          this.setContainerHeight()
          this.state = 'opened'
        })
      )
    }

    this.start(height, 0, { animate })
  }
  close({ animate = true } = {}) {
    if (this.state === 'closed' || this.state === 'closing') {
      return
    }

    let height = this.getCloseHeight()
    if (this.state === 'init') {
      height = this.getOpenHeight()
    }

    this.state = 'closing'
    this.removeEndEvents() // also, remove events on every open (but not on close!)

    if (!this.onCloseEnd) {
      this.elem.addEventListener(
        'transitionend',
        (this.onCloseEnd = () => {
          if (this.elem) {
            this.elem.style.visibility = 'hidden'
          }

          this.callOnEnd()
          this.state = 'closed'
        })
      )
    }

    this.start(0, height, { animate })
  }
}
