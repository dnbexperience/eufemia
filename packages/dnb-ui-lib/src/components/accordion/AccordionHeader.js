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
import keycode from 'keycode'
import AccordionContext from './AccordionContext'
import { createSpacingClasses } from '../space/SpacingHelper'

const propTypes = {
  title: PropTypes.string,
  icon: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.func
  ]),
  icon_position: PropTypes.string,
  icon_size: PropTypes.string,

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
export default class AccordionHeader extends React.PureComponent {
  static propTypes = propTypes
  static defaultProps = defaultProps
  // static renderProps = renderProps
  static contextType = AccordionContext
  // static Group = AccordionGroup

  // componentDidUpdate() {
  //   const { gotOpened } = this.context
  //   if (this._ref.current && gotOpened !== this.state._gotOpened) {
  //     this._ref.current.focus()

  //     this.setState({
  //       _gotOpened: gotOpened
  //     })
  //   }
  // }

  // constructor(props, context) {
  //   super(props)
  //   //   // this._ref = React.createRef()

  //   // this.state = {
  //   //   _expanded: context.expanded
  //   // }

  //   // if (context.group) {
  //   //   window.__dnbAccordion = window.__dnbAccordion || {}
  //   //   window.__dnbAccordion[context.group] =
  //   //     window.__dnbAccordion[context.group] || new AccordionStore()
  //   // }
  // }

  onKeyDownHandler = (event) => {
    // const { _expanded } = this.context
    // console.log('_expanded', _expanded, this.context.expanded)
    switch (keycode(event)) {
      case 'enter':
      case 'space':
        // if (this.context.expanded === _expanded) {
        this.onClickHandler(event)
        // }
        break
    }
  }

  onClickHandler = (event) => {
    const { id, group } = this.context
    // console.log('group', group)
    // else we change the expanded sstate
    const expanded = !this.context.expanded
    // console.log('expanded', expanded)

    // this.setState({
    //   _expanded: expanded
    // })

    this.context.callOnChange({ id, group, expanded, event })

    // if (this._refButton.current && expanded) {
    //   // simulate focus for firefox and safari
    //   // so we can get rid of the hover ring after click
    //   try {
    //     this._refButton.current._ref.current.focus()
    //   } catch (e) {
    //     warn(e)
    //   }
    // }
  }

  render() {
    const { children, className, ...rest } = this.props

    const {
      id,
      expanded,
      disabled,
      prerendered // eslint-disable-line
    } = this.context

    // console.log('this.context', this.context)
    // console.log('expanded', expanded)

    const headerParams = {
      disabled,
      className: classnames(
        'dnb-accordion__header',
        // expanded && 'dnb-accordion__content--expanded',
        createSpacingClasses(rest),
        className
      ),
      ...rest
    }

    // legacy borwer support
    // let Element = 'summary'
    // if (1 || IS_IE11 || IS_EDGE) {
    // Element = 'div'
    headerParams.id = `${id}-header`
    headerParams['aria-controls'] = `${id}-content`

    // use div, only to make it easier to style (legacy borwer support)
    headerParams.role = 'button'
    headerParams.tabIndex = '0'
    // }

    if (isTrue(expanded)) {
      headerParams['aria-expanded'] = true
    }

    if (isTrue(disabled)) {
      // Element = 'div'
      headerParams.tabIndex = '-1' // make the "button" not accessible for keyboard?
      headerParams.disabled = true
      headerParams['aria-disabled'] = true
    } else {
      headerParams.onClick = this.onClickHandler
      headerParams.onKeyDown = this.onKeyDownHandler
    }

    return (
      <div {...headerParams}>
        <span className="dnb-tabs__button__title">{children}</span>
        {/* <Dummy>{title}</Dummy> */}
      </div>
    )
  }
}
