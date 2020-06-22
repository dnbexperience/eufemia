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
// import { IS_IE11, IS_EDGE } from '../../shared/helpers'
import classnames from 'classnames'
import AccordionContext from './AccordionContext'
import { createSpacingClasses } from '../space/SpacingHelper'

const propTypes = {
  /// React props
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

/**
 * The accordion component is our enhancement of the classic accordion button.
 */
export default class AccordionContent extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps
  // static renderProps = renderProps
  static contextType = AccordionContext
  // static Group = AccordionGroup

  constructor(props, context) {
    super(props)
    this._ref = React.createRef()

    this.state = {
      _gotOpened: context.gotOpened
    }

    if (context.expanded) {
      // this.state.keepContentVisible = true
      // this.state.openFromBeginning = true
    }

    this.anim = new HeightAnim()
    this.anim.onEnd(() => {
      // checking additional for  && state === 'close' makes it more "safe"
      // && state === 'close'
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
      // this.setState({
      //   keepContentVisible: true
      //   // openFromBeginning: true
      // })
      //   this.anim.setAsOpened()
    }
  }

  componentWillUnmount() {
    this.anim.remove() //this._ref.current
  }

  componentDidUpdate(props) {
    // console.log('props', props)
    // const { gotOpened } = this.context
    // if (this._ref.current && gotOpened !== this.state._gotOpened) {
    // this._ref.current.focus()

    // console.log('this.context', this.context.expanded, this.context.open)
    // if (this.context.expanded === this.context.open && !this.isAnimating) {

    // if (!this.isAnimating && !this.state.animating) {
    // if (!this.state.animating) {
    // this.setState({
    //   animating: true
    // })
    // this.isAnimating = true

    // console.log('this.context.expanded', this.context.expanded)

    if (this.context.expanded) {
      this.anim.open()
      this.setState({
        keepContentVisible: true
      })
    } else {
      this.anim.close()
    }
    // setHeight({
    //   element: this._ref.current,
    //   expanded: this.context.expanded
    // })

    // setTimeout(() => {
    //   this.setState({
    //     animating: false
    //   })
    //   this.isAnimating = false
    // }, 1e3)
    // }

    // }

    // this.setState({
    //   _gotOpened: gotOpened
    // })
    // }
  }

  render() {
    const { children, className, ...rest } = this.props

    // const { animating } = this.state

    const {
      id,
      expanded,
      prerender,
      disabled // eslint-disable-line
    } = this.context

    // const expanded = isTrue(expanded)
    // const doPrerender = isTrue(prerender)

    const wrapperParams = {
      // 'aria-hidden': !expanded,
      className: classnames(
        'dnb-accordion__content',
        !expanded && prerender && 'dnb-accordion__content--hidden',
        createSpacingClasses(rest),
        className
      ),
      ...rest
    }

    const innerParams = {}

    // legacy borwer support
    // if (1 || IS_IE11 || IS_EDGE) {
    innerParams.id = `${id}-content`
    innerParams.role = 'region'
    // innerParams.tabIndex = '-1'
    innerParams['aria-labelledby'] = `${id}-header`

    if (isTrue(expanded)) {
      innerParams['aria-expanded'] = true
    }
    // }

    if (prerender && !expanded) {
      innerParams['aria-hidden'] = true
    }

    // if (!expanded) {
    //   return null
    // }
    // if (!(expanded || this.state.keepContentVisible)) {
    //   return null
    // }

    // console.log('this.context', this.context.expanded, this.context.open)

    let content = children
    if (typeof content === 'string') {
      content = <p className="dnb-p">{content}</p>
    }

    return (
      <div {...wrapperParams} ref={this._ref}>
        {prerender ? 'prerender' : null}
        {(expanded ||
          this.state.keepContentVisible ||
          this.anim.isAnimating) && <div {...innerParams}>{children}</div>}
      </div>
    )
  }
}

class HeightAnim {
  constructor() {
    this.state = 'init'
    this.cbStack = []
  }
  setElem(elem) {
    this.elem = elem

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
    const position = window.getComputedStyle(this.elem).position

    this.elem.style.position = 'absolute'
    this.elem.style.visibility = 'hidden'
    this.elem.style.height = 'auto'

    this.openHeight = parseFloat(this.elem.clientHeight)
    // this.openHeight = parseFloat(window.getComputedStyle(this.elem).height)

    this.elem.style.position = position
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
