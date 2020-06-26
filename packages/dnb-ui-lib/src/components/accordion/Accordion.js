/**
 * Web Accordion Component
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'
import {
  warn,
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
  prevent_rerender: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ]),
  remember_state: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
  single_container: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.bool
  ]),
  variant: PropTypes.oneOf(['default', 'outlined', 'filled']),
  left_component: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.node,
    PropTypes.func
  ]),
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
  prevent_rerender: null,
  remember_state: null,
  single_container: null,
  variant: 'outlined',
  left_component: null,
  disabled: null,
  id: null,
  group: null,
  icon: null,
  icon_position: null,
  icon_size: 'medium',
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
      this.state.expanded = true
    }

    if (isTrue(context.remember_state)) {
      const state = this.getState()
      if (state !== null) {
        this.state.expanded = state
      }
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

    // check if a event exists, becaus, then it's a user click
    if (isTrue(this.context.remember_state)) {
      this.saveState(expanded)
    }
  }

  _storeId() {
    const { id } = this.props
    return `dnb-accordion-${id}`
  }

  saveState(expanded) {
    const { id } = this.props
    if (id) {
      try {
        window.localStorage.setItem(this._storeId(), String(expanded))
      } catch (e) {
        //
      }
    } else {
      warn('No id prop is provided in order to store the accordion state!')
    }
  }

  getState() {
    let state = null
    try {
      if (window.localStorage.hasOwnProperty(this._storeId())) {
        state = isTrue(window.localStorage.getItem(this._storeId()))
      }
    } catch (e) {
      //
    }

    return state
  }

  handleDisabledClick = (e) => {
    e.preventDefault()
    return false
  }

  callOnChange = ({ expanded, event }) => {
    this.changeOpened(expanded, event)

    dispatchCustomElementEvent(this, 'on_change', {
      expanded,
      event
    })
  }

  hasAccordionHeader(children) {
    if (!Array.isArray(children)) {
      children = [children]
    }
    return (
      children.findIndex(
        (cur) => React.isValidElement(cur) && cur.type === AccordionHeader
      ) !== -1
    )
  }

  hasAccordionContent(children) {
    if (!Array.isArray(children)) {
      children = [children]
    }
    return (
      children.findIndex(
        (cur) => React.isValidElement(cur) && cur.type === AccordionContent
      ) !== -1
    )
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
                variant,
                className,
                class: _className,
                prerender,
                prevent_rerender,
                single_container,
                remember_state,
                disabled,
                children,

                id: _id, // eslint-disable-line
                group: _group, // eslint-disable-line
                expanded: _expanded, // eslint-disable-line

                title, // eslint-disable-line
                description, // eslint-disable-line
                left_component, // eslint-disable-line
                icon, // eslint-disable-line
                icon_position, // eslint-disable-line
                icon_size, // eslint-disable-line
                attributes, // eslint-disable-line
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
                  expanded && 'dnb-accordion--expanded',
                  variant && `dnb-accordion__variant--${variant}`,
                  isTrue(prerender) && 'dnb-accordion--prerender',
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
                ...this.context,
                ...this.state,
                ...this.props,
                id,
                expanded,
                prerender: isTrue(prerender),
                prevent_rerender: isTrue(prevent_rerender),
                single_container: isTrue(single_container),
                remember_state: isTrue(remember_state),
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

              if (isTrue(disabled)) {
                mainParams.onClick = this.handleDisabledClick
              }

              return (
                <AccordionContext.Provider value={context}>
                  <div {...mainParams}>
                    {this.hasAccordionHeader(children) ? null : (
                      <AccordionHeader />
                    )}
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
