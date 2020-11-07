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

import Context from '../../shared/Context'
import AccordionGroupContext from './AccordionProviderContext'

export default class AccordionGroup extends React.PureComponent {
  static tagName = 'dnb-accordion-group'
  static contextType = Context

  static propTypes = {
    expanded: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    expanded_id: PropTypes.string,
    prerender: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    prevent_rerender: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool
    ]),
    single_container: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool
    ]),
    allow_close_all: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool
    ]),
    on_change: PropTypes.func,
    disabled: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    id: PropTypes.string,
    group: PropTypes.string,
    onInit: PropTypes.func
  }

  static defaultProps = {
    expanded: null,
    expanded_id: null,
    prerender: null,
    prevent_rerender: null,
    single_container: null,
    allow_close_all: null,
    on_change: null,
    disabled: null,
    id: null,
    group: null,
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
      this.context.formRow,
      this.context.translation.Accordion
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
