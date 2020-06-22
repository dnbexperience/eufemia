/**
 * Web Accordion Component
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
// import keycode from 'keycode'
import {
  // warn,
  isTrue,
  makeUniqueId,
  registerElement,
  extendPropsWithContext,
  validateDOMAttributes,
  dispatchCustomElementEvent
} from '../../shared/component-helper'
import { IS_IE11, IS_EDGE } from '../../shared/helpers'
// import AlignmentHelper from '../../shared/AlignmentHelper'
import { createSpacingClasses } from '../space/SpacingHelper'

import AccordionProvider from './AccordionProvider'
import AccordionHeader from './AccordionHeader'
import AccordionContent from './AccordionContent'
import AccordionContext from './AccordionContext'
import AccordionProviderContext from './AccordionProviderContext'
import Context from '../../shared/Context'
// import Suffix from '../../shared/helpers/Suffix'

const renderProps = {
  on_change: null,
  on_state_update: null
}

const propTypes = {
  // text: PropTypes.string,
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.node
  ]),
  // label_direction: PropTypes.oneOf(['horizontal', 'vertical']),
  // label_sr_only: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  title: PropTypes.string,
  expanded: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  prerender: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  variant: PropTypes.oneOf(['default', 'checkbox', 'radio']),
  // left_component: PropTypes.node,
  disabled: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  id: PropTypes.string,
  group: PropTypes.string,
  // status: PropTypes.oneOfType([
  //   PropTypes.string,
  //   PropTypes.func,
  //   PropTypes.node
  // ]),
  // status_state: PropTypes.string,
  // value: PropTypes.string,
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
  class: PropTypes.string,

  /// React props
  className: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.func
  ]),

  // Web Component props
  custom_element: PropTypes.object,
  custom_method: PropTypes.func,
  on_change: PropTypes.func,
  on_state_update: PropTypes.func
}

const defaultProps = {
  // text: null,
  label: null,
  // label_direction: null,
  // label_sr_only: null,
  title: null,
  expanded: null,
  prerender: null,
  variant: null,
  // left_component: null,
  disabled: null,
  id: null,
  group: null,
  // status: null,
  // status_state: 'error',
  // status_animation: null,
  // global_status_id: null,
  // suffix: null,
  // value: '',
  icon: null,
  icon_position: 'right',
  icon_size: null,
  attributes: null,
  class: null,

  // React props
  className: null,
  children: null,

  // Web Component props
  custom_element: null,
  custom_method: null,
  ...renderProps
}

class AccordionStore {
  constructor(id) {
    this._id = id
    this._instances = []
  }
  onChange({ id }) {
    this._instances.forEach((inst) => {
      if (inst._id !== id) {
        inst.close()
      }
    })
  }
  addInstance(instance) {
    this._instances.push(instance)
  }
  removeInstance(instance) {
    this._instances = this._instances.filter((inst) => inst !== instance)
  }
}

/**
 * The accordion component is our enhancement of the classic accordion button.
 */
export default class Accordion extends React.PureComponent {
  static tagName = 'dnb-accordion'
  static propTypes = propTypes
  static defaultProps = defaultProps
  static renderProps = renderProps
  static contextType = AccordionProviderContext
  static Provider = AccordionProvider
  static Header = AccordionHeader
  static Content = AccordionContent

  static enableWebComponent() {
    registerElement(Accordion.tagName, Accordion, defaultProps)
  }

  // static parseChecked = (state) => /true|on/.test(String(state))

  static getDerivedStateFromProps(props, state) {
    if (state._listenForPropChanges) {
      if (props.expanded !== state._expanded) {
        state.expanded = isTrue(props.expanded)
        state._expanded = props.expanded
      }

      if (props.group) {
        state.group = props.group
      }
      // console.log('state.expanded', state.expanded)
      // if (typeof props.expanded !== 'undefined') {
      //   state._expanded = props.expanded
      // }
    }
    state._listenForPropChanges = true

    // if (state.expanded !== state.__expanded) {
    //   dispatchCustomElementEvent({ props }, 'on_state_update', {
    //     expanded: state.expanded
    //   })
    // }

    // if (typeof state.expanded === 'undefined') {
    //   state.expanded = false
    // }
    // state.__expanded = state.expanded

    return state
  }

  constructor(props, context) {
    super(props)
    this._id = props.id || makeUniqueId() // cause we need an id anyway

    // this._ref = React.createRef()

    this.state = {
      // open: isTrue(props.expanded),
      expanded: props.expanded !== null ? isTrue(props.expanded) : null,
      _expanded: props.expanded,
      _listenForPropChanges: false // make sure to not run DerivedState
    }

    // console.log('props.expanded', props.expanded)

    this.state.group = props.group || context?.group

    if (
      (this.state.group || context?.id) &&
      isTrue(context?.expanded) &&
      props.expanded === null
    ) {
      // this._expanded = 'false'
      this.state.open = true
      this.state.expanded = true
    }

    //   this.state = {
    //     _expanded: context.expanded
    //   }

    // console.log('context', context)

    if (this.state.group) {
      window.__dnbAccordion = window.__dnbAccordion || {}
      window.__dnbAccordion[this.state.group] =
        window.__dnbAccordion[this.state.group] ||
        new AccordionStore(this.state.group)

      window.__dnbAccordion[this.state.group].addInstance(this)
    }

    // console.log('this.state', this.state)

    // context.setContext({
    //   callOnChange: this.callOnChange
    //   // value: props.value
    // })
    // context.callOnChange = this.callOnChange
    // console.log('context', context)

    // set the startup expanded values from context, if they exists
    // if (context.name) {
    //   // if (typeof context.value !== 'undefined') {
    //   //   this.state.expanded = context.value === props.value
    //   //   this.state._listenForPropChanges = false
    //   // } else if (context.values && Array.isArray(context.values)) {
    //   //   this.state.expanded = context.values.includes(props.value)
    //   //   this.state._listenForPropChanges = false

    //   //   // make sure we update the context
    //   //   // with a possible custom set "expanded" state
    //   // } else
    //   if (isTrue(props.expanded)) {
    //     if (context.setContext) {
    //       // if (context.multiselect) {
    //       //   context.setContext((tmp) => {
    //       //     return {
    //       //       values:
    //       //         // in case we have set before a new context (other component)
    //       //         // we fill combine theese arrays
    //       //         tmp && Array.isArray(tmp.values)
    //       //           ? [...tmp.values, props.value]
    //       //           : [props.value]
    //       //     }
    //       //   })
    //       // } else {
    //       // }
    //       // context.setContext({
    //       //   callOnChange: this.callOnChange
    //       //   // value: props.value
    //       // })
    //     }
    //   }
    // }
  }

  componentWillUnmount() {
    clearTimeout(this._openTimeout)
    clearTimeout(this._changeOpenState)

    if (this.state.group) {
      window?.__dnbAccordion[this.state.group]?.removeInstance(this)
    }
  }

  close() {
    this.changeOpened(false)
  }

  changeOpened(expanded) {
    // let { gotOpened } = this.state
    // if (expanded) {
    //   gotOpened = makeUniqueId()
    // }

    this.setState({
      // open: !expanded,
      expanded,
      // gotOpened,
      _listenForPropChanges: false
    })

    // this._openTimeout = setTimeout(() => {
    //   this.setState({
    //     open: expanded,
    //     _listenForPropChanges: false
    //   })
    // }, 1) // delay, to set the open attribute after the browser has done his job, else we get a non working details/summary
  }

  callOnChange = ({ expanded, event }) => {
    this.changeOpened(expanded)

    dispatchCustomElementEvent(this, 'on_change', {
      expanded,
      // value,
      event
    })
  }

  hasAccordionContent(children) {
    if (!Array.isArray(children)) {
      children = [children]
    }

    return children.reduce((acc, cur) => {
      if (React.isValidElement(cur) && cur.type === AccordionContent) {
        return true
      }
      return acc
    }, false)
  }

  render() {
    return (
      <Context.Consumer>
        {(globalContext) => (
          <AccordionContext.Consumer>
            {(nestedContext) => {
              let { expanded } = this.state

              // use only the props from context, who are available here anyway
              const props = extendPropsWithContext(
                this.props,
                defaultProps,
                this.context, // group context
                nestedContext, // internal context
                globalContext.accordion, // global context
                globalContext.translation.Accordion
              )

              if (expanded === null && globalContext.accordion) {
                if (globalContext.accordion.expanded) {
                  expanded = props.expanded
                }
              }

              {
                /* if (nestedContext) {
                console.log('nestedContext', props.expanded)
              } */
              }

              const {
                // status,
                // status_state,
                // status_animation,
                // global_status_id,
                //suffix,
                // label,
                // label_direction,
                // label_sr_only,
                //text,
                title,
                className,
                class: _className,
                prerender,
                disabled,
                // variant,
                // left_component,
                icon,
                icon_size,
                icon_position,
                //value: propValue,

                id: _id, // eslint-disable-line
                group: _group, // eslint-disable-line
                expanded: _expanded, // eslint-disable-line
                attributes, // eslint-disable-line
                children,
                on_change, // eslint-disable-line
                on_state_update, // eslint-disable-line
                custom_method, // eslint-disable-line
                custom_element, // eslint-disable-line

                ...rest
              } = props

              {
                /* if (
            //!isTrue(this.context.multiselect) &&
            typeof this.context.value !== 'undefined'
          ) {
            const contextValue = this.context.value
            if (
              typeof propValue === 'string' ||
              typeof propValue === 'number'
            ) {
              expanded = propValue === contextValue
            } else if (typeof JSON !== 'undefined') {
              expanded =
                JSON.stringify(propValue) === JSON.stringify(contextValue)
            }
          } */
              }

              const id = this._id

              const mainParams = {
                id,
                className: classnames(
                  'dnb-accordion',
                  //status && `dnb-accordion__status--${status_state}`,
                  // variant && `dnb-accordion__variant--${variant}`,
                  expanded && 'dnb-accordion--expanded',
                  prerender && 'dnb-accordion--prerender',
                  // label_direction && `dnb-accordion--${label_direction}`,
                  createSpacingClasses(props),
                  className,
                  _className
                )
              }

              if (this.state.open) {
                mainParams.open = true
                {
                  /* mainParams.open = true */
                }
              }
              {
                /* console.log('mainParams', mainParams) */
              }

              // to remove spacing props
              validateDOMAttributes(this.props, rest)

              {
                /* console.log('commonProps', commonProps) */
              }

              // if (status) {
              //   // do not send along the message, but only the status states
              //   if (status_state === 'info') {
              //     commonProps.status_state = 'info'
              //   } else {
              //     commonProps.status = 'error'
              //   }
              // }

              {
                /* let leftComponent = null
          switch (variant) {
            case 'radio':
              leftComponent = (
                <Radio id={`${id}-radio`} {...commonProps} />
              )
              break

            case 'checkbox':
              leftComponent = (
                <Checkbox id={`${id}-checkbox`} {...commonProps} />
              )
              break

            case 'default':
            default:
              leftComponent = left_component
              break
          } */
              }

              {
                /* if (this.state.group) {
                console.log('this.context', this.context)
              } */
              }

              const context = {
                ...this.state,
                expanded,
                id,
                prerender: isTrue(prerender),
                disabled: isTrue(disabled),
                callOnChange: (...params) => {
                  this.callOnChange(...params)
                  if (this.context?.onChange) {
                    this.context?.onChange(...params)
                  }
                  if (this.state.group) {
                    window?.__dnbAccordion[this.state.group]?.onChange(
                      ...params
                    )
                  }

                  // setHeight({
                  //   element: this._ref.current,
                  //   expanded: !this.state.expanded
                  // })
                }
              }
              {
                /* console.log('context', context) */
              }

              // Some articles states that summary/details will act as a button and buttons cannot have a heading
              // My tests shows that this is not true, and it works very well to have headings inside summary
              // Both on VoiceOver and NVDA I could navigate by headings only just fine
              // https://daverupert.com/2019/12/why-details-is-not-an-accordion/
              {
                /* let Element = 'details' */
              }

              // legacy borwer support
              {
                /* if (1 || IS_IE11 || IS_EDGE) {
              } */
              }

              {
                /* const Element = 'div' */
              }

              if (isTrue(disabled)) {
                mainParams.onClick = (e) => {
                  e.preventDefault()
                  return false
                }
              }

              return (
                <AccordionContext.Provider value={context}>
                  <div {...mainParams}>
                    {title && <AccordionHeader>{title}</AccordionHeader>}
                    {this.hasAccordionContent(children) ? (
                      children
                    ) : (
                      <AccordionContent>{children}</AccordionContent>
                    )}
                  </div>
                </AccordionContext.Provider>
              )
            }}
          </AccordionContext.Consumer>
        )}
      </Context.Consumer>
    )
  }
}

Accordion.Group = ({ ...props }) => {
  props.group = props.group || makeUniqueId()
  return <AccordionProvider {...props} />
}
Accordion.Group.propTypes = {
  group: PropTypes.string
}
Accordion.Group.defaultProps = {
  group: null
}
