/**
 * Web AccordionGroup Component
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {
  isTrue,
  makeUniqueId,
  extendPropsWithContext,
  registerElement,
  validateDOMAttributes,
  dispatchCustomElementEvent
} from '../../shared/component-helper'
import { createSpacingClasses } from '../space/SpacingHelper'
import {
  accordionPropTypes,
  accordionDefaultProps
} from './AccordionPropTypes'

import Context from '../../shared/Context'
import AccordionGroupContext from './AccordionProviderContext'

export default class AccordionGroup extends React.PureComponent {
  static tagName = 'dnb-accordion-group'
  static contextType = Context

  static propTypes = {
    ...accordionPropTypes,

    expanded_id: PropTypes.string,
    onInit: PropTypes.func
  }

  static defaultProps = {
    ...accordionDefaultProps,

    expanded_id: null,
    onInit: null
  }

  static enableWebComponent() {
    registerElement(
      AccordionGroup.tagName,
      AccordionGroup,
      AccordionGroup.defaultProps
    )
  }

  constructor(props) {
    super(props)
    this._id = props.id || makeUniqueId() // cause we need an id anyway
    this.state = {
      _listenForPropChanges: true
    }
  }

  onChangeHandler = (event) => {
    dispatchCustomElementEvent(this, 'on_change', {
      id: event.id,
      expanded: event.expanded,
      event
    })
  }

  render() {
    // use only the props from context, who are available here anyway
    const props = extendPropsWithContext(
      this.props,
      AccordionGroup.defaultProps,
      this.context.FormRow,
      this.context.Accordion,
      this.context.getTranslation(this.props).Accordion
    )

    const {
      expanded, // eslint-disable-line
      expanded_id, // eslint-disable-line
      prerender, // eslint-disable-line
      prevent_rerender, // eslint-disable-line
      single_container, // eslint-disable-line
      allow_close_all, // eslint-disable-line
      remember_state, // eslint-disable-line
      flush_remembered_state, // eslint-disable-line
      disabled, // eslint-disable-line
      group, // eslint-disable-line
      onInit, // eslint-disable-line
      className,
      class: _className,

      id: _id, // eslint-disable-line
      children, // eslint-disable-line

      ...rest
    } = props

    const id = this._id

    const classes = classnames(
      'dnb-accordion-group',
      isTrue(single_container) && 'dnb-accordion-group--single-container',
      createSpacingClasses(props),
      className,
      _className
    )

    const params = {
      ...rest
    }

    // also used for code markup simulation
    validateDOMAttributes(this.props, params)

    if (!props.group && isTrue(props.single_container)) {
      props.group = makeUniqueId()
    }

    const context = {
      ...props,
      id,
      onChange: this.onChangeHandler
    }

    return (
      <AccordionGroupContext.Provider value={context}>
        <div className={classes}>
          <span
            id={id}
            className="dnb-accordion-group__shell"
            role="group"
            {...params}
          >
            <span className="dnb-accordion-group__children">
              {children}
            </span>
          </span>
        </div>
      </AccordionGroupContext.Provider>
    )
  }
}
