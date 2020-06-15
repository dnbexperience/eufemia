/**
 * Web Accordion Component
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import keycode from 'keycode'
import {
  warn,
  isTrue,
  makeUniqueId,
  registerElement,
  extendPropsWithContext,
  validateDOMAttributes,
  dispatchCustomElementEvent
} from '../../shared/component-helper'
import AlignmentHelper from '../../shared/AlignmentHelper'
import { createSpacingClasses } from '../space/SpacingHelper'

import AccordionGroup from './AccordionGroup'
import AccordionGroupContext from './AccordionGroupContext'
import Context from '../../shared/Context'
import Suffix from '../../shared/helpers/Suffix'

const renderProps = {
  on_change: null,
  on_state_update: null
}

const propTypes = {
  text: PropTypes.string,
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.node
  ]),
  // label_direction: PropTypes.oneOf(['horizontal', 'vertical']),
  // label_sr_only: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  title: PropTypes.string,
  opened: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  variant: PropTypes.oneOf(['default', 'checkbox', 'radio']),
  left_component: PropTypes.node,
  disabled: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  id: PropTypes.string,
  // group: PropTypes.string,
  status: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.node
  ]),
  status_state: PropTypes.string,
  value: PropTypes.string,
  // suffix: PropTypes.oneOfType([
  //   PropTypes.string,
  //   PropTypes.func,
  //   PropTypes.node
  // ]),
  icon: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.func
  ]),
  icon_position: PropTypes.string,
  icon_size: PropTypes.string,
  attributes: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  readOnly: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  class: PropTypes.string,

  /// React props
  className: PropTypes.string,
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),

  // Web Component props
  custom_element: PropTypes.object,
  custom_method: PropTypes.func,
  on_change: PropTypes.func,
  on_state_update: PropTypes.func
}

const defaultProps = {
  text: null,
  label: null,
  // label_direction: null,
  // label_sr_only: null,
  title: null,
  opened: undefined,
  variant: null,
  left_component: null,
  disabled: null,
  id: null,
  // group: null,
  status: null,
  status_state: 'error',
  status_animation: null,
  global_status_id: null,
  // suffix: null,
  // value: '',
  icon: null,
  icon_position: 'right',
  icon_size: null,
  attributes: null,
  readOnly: false,
  class: null,

  // React props
  className: null,
  children: null,

  // Web Component props
  custom_element: null,
  custom_method: null,
  ...renderProps
}

/**
 * The accordion component is our enhancement of the classic accordion button.
 */
export default class Accordion extends React.PureComponent {
  static tagName = 'dnb-accordion'
  static propTypes = propTypes
  static defaultProps = defaultProps
  static renderProps = renderProps
  static contextType = AccordionGroupContext
  static Group = AccordionGroup

  static enableWebComponent() {
    registerElement(Accordion.tagName, Accordion, defaultProps)
  }

  static parseChecked = (state) => /true|on/.test(String(state))

  static getDerivedStateFromProps(props, state) {
    if (state._listenForPropChanges) {
      if (props.opened !== state._opened) {
        state.opened = Accordion.parseChecked(props.opened)
      }
      if (typeof props.opened !== 'undefined') {
        state._opened = props.opened
      }
    }
    state._listenForPropChanges = true

    if (state.opened !== state.__opened) {
      dispatchCustomElementEvent({ props }, 'on_state_update', {
        opened: state.opened
      })
    }

    if (typeof state.opened === 'undefined') {
      state.opened = false
    }
    state.__opened = state.opened

    return state
  }

  constructor(props, context) {
    super(props)
    this._id = props.id || makeUniqueId() // cause we need an id anyway
    this._refButton = React.createRef()

    this.state = {
      _listenForPropChanges: true
    }

    // set the startup opened values from context, if they exists
    if (context.name && typeof props.value !== 'undefined') {
      if (typeof context.value !== 'undefined') {
        this.state.opened = context.value === props.value
        this.state._listenForPropChanges = false
      } else if (context.values && Array.isArray(context.values)) {
        this.state.opened = context.values.includes(props.value)
        this.state._listenForPropChanges = false

        // make sure we update the context
        // with a possible custom set "opened" state
      } else if (Accordion.parseChecked(props.opened)) {
        if (context.setContext) {
          if (context.multiselect) {
            context.setContext((tmp) => {
              return {
                values:
                  // in case we have set before a new context (other component)
                  // we fill combine theese arrays
                  tmp && Array.isArray(tmp.values)
                    ? [...tmp.values, props.value]
                    : [props.value]
              }
            })
          } else {
            context.setContext({
              value: props.value
            })
          }
        }
      }
    }
  }

  onKeyDownHandler = (event) => {
    switch (keycode(event)) {
      case 'enter':
        this.onClickHandler(event)
        break
    }
  }

  onKeyUpHandler = (event) => {
    switch (keycode(event)) {
      case 'enter':
        this.onClickHandler(event)
        break
    }
  }

  onClickHandler = ({ event }) => {
    if (isTrue(this.props.readOnly)) {
      return event.preventDefault()
    }
    event.persist()

    // only select a value once
    if (
      !isTrue(this.context.multiselect) &&
      this.props.value === this.context.value
    ) {
      return
    }

    // else we change the opened sstate
    const opened = !this.state.opened
    this.setState({
      // reset the status state, because the user has mad an action
      // status_state: null,
      opened,
      _listenForPropChanges: false
    })
    this.callOnChange({ opened, event })

    if (this._refButton.current && opened) {
      // simulate focus for firefox and safari
      // so we can get rid of the hover ring after click
      try {
        this._refButton.current._ref.current.focus()
      } catch (e) {
        warn(e)
      }
    }
  }

  callOnChange = ({ opened, event }) => {
    const { value } = this.props
    if (this.context.onChange) {
      this.context.onChange({
        value,
        event
      })
    }
    dispatchCustomElementEvent(this, 'on_change', {
      opened,
      value,
      event
    })
  }

  render() {
    return (
      <Context.Consumer>
        {(context) => {
          // use only the props from context, who are available here anyway
          const props = extendPropsWithContext(
            this.props,
            defaultProps,
            this.context, // internal context
            context.formRow,
            context.translation.Accordion
          )

          const {
            status,
            status_state,
            // status_animation,
            // global_status_id,
            suffix,
            // label,
            // label_direction,
            // label_sr_only,
            text,
            title,
            readOnly,
            className,
            class: _className,
            disabled,
            // variant,
            // left_component,
            icon,
            icon_size,
            icon_position,
            value: propValue,

            id: _id, // eslint-disable-line
            // group: _group, // eslint-disable-line
            opened: _opened, // eslint-disable-line
            attributes, // eslint-disable-line
            children,
            on_change, // eslint-disable-line
            on_state_update, // eslint-disable-line
            custom_method, // eslint-disable-line
            custom_element, // eslint-disable-line

            ...rest
          } = props

          let { opened } = this.state

          if (
            !isTrue(this.context.multiselect) &&
            typeof this.context.value !== 'undefined'
          ) {
            const contextValue = this.context.value
            if (
              typeof propValue === 'string' ||
              typeof propValue === 'number'
            ) {
              opened = propValue === contextValue
            } else if (typeof JSON !== 'undefined') {
              opened =
                JSON.stringify(propValue) === JSON.stringify(contextValue)
            }
          }

          const id = this._id
          const showStatus = status && status !== 'error'

          const mainParams = {
            className: classnames(
              'dnb-accordion',
              status && `dnb-accordion__status--${status_state}`,
              // variant && `dnb-accordion__variant--${variant}`,
              opened && `dnb-accordion--opened`,
              // label_direction && `dnb-accordion--${label_direction}`,
              createSpacingClasses(props),
              className,
              _className
            )
          }

          // to remove spacing props
          validateDOMAttributes(this.props, rest)

          const buttonParams = {
            id,
            disabled,
            text: text || children,
            title,
            icon,
            icon_size,
            icon_position,
            ['aria-pressed']: String(opened),
            ...rest
          }

          const componentParams = {
            opened,
            disabled,
            ['aria-hidden']: true,
            tabIndex: '-1'
          }

          if (status) {
            // do not send along the message, but only the status states
            if (status_state === 'info') {
              componentParams.status_state = 'info'
            } else {
              componentParams.status = 'error'
            }
          }

          if (showStatus || suffix) {
            buttonParams['aria-describedby'] = `${
              showStatus ? id + '-status' : ''
            } ${suffix ? id + '-suffix' : ''}`
          }
          if (readOnly) {
            buttonParams['aria-readonly'] = buttonParams.readOnly = true
          }

          {
            /* let leftComponent = null
          switch (variant) {
            case 'radio':
              leftComponent = (
                <Radio id={`${id}-radio`} {...componentParams} />
              )
              break

            case 'checkbox':
              leftComponent = (
                <Checkbox id={`${id}-checkbox`} {...componentParams} />
              )
              break

            case 'default':
            default:
              leftComponent = left_component
              break
          } */
          }

          return (
            <span {...mainParams}>
              {/* {label && (
                <FormLabel
                  id={id + '-label'}
                  for_id={id}
                  text={label}
                  disabled={disabled}
                  // label_direction={label_direction}
                  // sr_only={label_sr_only}
                />
              )} */}
              <span className="dnb-accordion__inner">
                {/* {showStatus && (
                  <FormStatus
                    id={id + '-form-status'}
                    global_status_id={global_status_id}
                    text_id={id + '-status'} // used for "aria-describedby"
                    text={status}
                    status={status_state}
                    animation={status_animation}
                  />
                )} */}

                <span className="dnb-accordion__shell">
                  <AlignmentHelper />

                  {/* <Button
                    variant="secondary"
                    className="dnb-accordion__button"
                    {...buttonParams}
                    ref={this._refButton}
                    onClick={this.onClickHandler}
                    onKeyDown={this.onKeyDownHandler}
                    onKeyUp={this.onKeyUpHandler}
                  >
                    {leftComponent && (
                      <span className="dnb-accordion__component">
                        {leftComponent}
                      </span>
                    )}
                  </Button> */}

                  {suffix && (
                    <span
                      className="dnb-accordion__suffix"
                      id={id + '-suffix'} // used for "aria-describedby"
                    >
                      <Suffix {...props}>{suffix}</Suffix>
                    </span>
                  )}
                </span>
              </span>
            </span>
          )
        }}
      </Context.Consumer>
    )
  }
}
