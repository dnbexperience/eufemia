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
  validateDOMAttributes
  // dispatchCustomElementEvent
} from '../../shared/component-helper'
import { createSpacingClasses } from '../space/SpacingHelper'

import Context from '../../shared/Context'
import AccordionGroupContext from './AccordionProviderContext'

const renderProps = {
  // on_change: null
}

const propTypes = {
  expanded: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  prerender: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  prevent_rerender: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ]),
  single_container: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ]),
  allow_close_all: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  disabled: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  id: PropTypes.string,
  group: PropTypes.string
}

const defaultProps = {
  expanded: null,
  prerender: null,
  prevent_rerender: null,
  single_container: null,
  allow_close_all: null,
  disabled: null,
  id: null,
  group: null
  // ...renderProps
}

export default class AccordionGroup extends React.PureComponent {
  static tagName = 'dnb-accordion-group'
  static propTypes = propTypes
  static defaultProps = defaultProps
  static renderProps = renderProps
  static contextType = Context

  static enableWebComponent() {
    registerElement(AccordionGroup.tagName, AccordionGroup, defaultProps)
  }

  constructor(props) {
    super(props)
    this._id = props.id || makeUniqueId() // cause we need an id anyway
    this.state = {
      _listenForPropChanges: true
    }
  }

  onChangeHandler = () => {
    // console.log('onChangeHandler', params)
  }

  render() {
    // use only the props from context, who are available here anyway
    const props = extendPropsWithContext(
      this.props,
      defaultProps,
      this.context.formRow,
      this.context.translation.Accordion
    )

    const {
      expanded, // eslint-disable-line
      prerender, // eslint-disable-line
      prevent_rerender, // eslint-disable-line
      single_container, // eslint-disable-line
      allow_close_all, // eslint-disable-line
      remember_state, // eslint-disable-line
      disabled, // eslint-disable-line
      group, // eslint-disable-line
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
