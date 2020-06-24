/**
 * Web AccordionGroup Component
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {
  // isTrue,
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
  disabled: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  id: PropTypes.string,
  group: PropTypes.string
}

const defaultProps = {
  expanded: null,
  prerender: null,
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

  // static getDerivedStateFromProps(props, state) {
  //   if (state._listenForPropChanges) {
  //     // if (props.value !== state._value) {
  //     //   state.value = props.value
  //     // }
  //   }
  //   state._listenForPropChanges = true

  //   return state
  // }

  // static getValues(props) {
  //   if (typeof props.values === 'string' && props.values[0] === '[') {
  //     return JSON.parse(props.values)
  //   }
  //   return props.values
  // }

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
      disabled, // eslint-disable-line
      className,
      class: _className,

      id: _id, // eslint-disable-line
      children, // eslint-disable-line

      ...rest
    } = props

    const id = this._id

    const classes = classnames(
      'dnb-accordion-group',
      createSpacingClasses(props),
      className,
      _className
    )

    const params = {
      ...rest
    }

    // also used for code markup simulation
    validateDOMAttributes(this.props, params)

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
