/**
 * Web Accordion Component
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {
  // warn,
  isTrue,
  makeUniqueId,
  registerElement,
  extendPropsWithContext,
  validateDOMAttributes,
  dispatchCustomElementEvent
} from '../../shared/component-helper'
import { createSpacingClasses } from '../space/SpacingHelper'

import AccordionProvider from './AccordionProvider'
import AccordionHeader from './AccordionHeader'
import AccordionContent from './AccordionContent'
import AccordionContext from './AccordionContext'
import AccordionProviderContext from './AccordionProviderContext'
import Context from '../../shared/Context'

const renderProps = {
  on_change: null,
  on_state_update: null
}

const propTypes = {
  label: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.func,
    PropTypes.node
  ]),
  title: PropTypes.string,
  expanded: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  prerender: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  variant: PropTypes.oneOf(['default', 'checkbox', 'radio']),
  // left_component: PropTypes.node,
  disabled: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  id: PropTypes.string,
  group: PropTypes.string,
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
  label: null,
  title: null,
  expanded: null,
  prerender: null,
  variant: null,
  // left_component: null,
  disabled: null,
  id: null,
  group: null,
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

  static getDerivedStateFromProps(props, state) {
    if (state._listenForPropChanges) {
      if (props.expanded !== state._expanded) {
        state.expanded = isTrue(props.expanded)
        state._expanded = props.expanded
      }

      if (props.group) {
        state.group = props.group
      }
    }
    state._listenForPropChanges = true

    return state
  }

  constructor(props, context) {
    super(props)
    this._id = props.id || makeUniqueId() // cause we need an id anyway

    this.state = {
      expanded: props.expanded !== null ? isTrue(props.expanded) : null,
      _expanded: props.expanded,
      _listenForPropChanges: false // make sure to not run DerivedState
    }

    this.state.group = props.group || context?.group

    if (
      (this.state.group || context?.id) &&
      isTrue(context?.expanded) &&
      props.expanded === null
    ) {
      this.state.open = true
      this.state.expanded = true
    }

    if (this.state.group) {
      window.__dnbAccordion = window.__dnbAccordion || {}
      window.__dnbAccordion[this.state.group] =
        window.__dnbAccordion[this.state.group] ||
        new AccordionStore(this.state.group)

      window.__dnbAccordion[this.state.group].addInstance(this)
    }
  }

  componentDidMount() {
    this._isMounted = true
  }

  componentWillUnmount() {
    this._isMounted = false

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
    if (!this._isMounted) {
      return
    }

    this.setState({
      expanded,
      _listenForPropChanges: false
    })
  }

  callOnChange = ({ expanded, event }) => {
    this.changeOpened(expanded)

    dispatchCustomElementEvent(this, 'on_change', {
      expanded,
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

              const {
                title,
                className,
                class: _className,
                prerender,
                disabled,
                // variant,
                // left_component,
                // icon,
                // icon_size,
                // icon_position,
                // value: propValue,

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

              const id = this._id

              const mainParams = {
                id,
                className: classnames(
                  'dnb-accordion',
                  // status && `dnb-accordion__status--${status_state}`,
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
              }

              // to remove spacing props
              validateDOMAttributes(this.props, rest)

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
                }
              }

              // Some articles states that summary/details will act as a button and buttons cannot have a heading
              // My tests shows that this is not true, and it works very well to have headings inside summary
              // Both on VoiceOver and NVDA I could navigate by headings only just fine
              // https://daverupert.com/2019/12/why-details-is-not-an-accordion/

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
