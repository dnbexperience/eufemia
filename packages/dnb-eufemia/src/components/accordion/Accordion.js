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
  findElementInChildren,
  extendPropsWithContextInClassComponent,
  validateDOMAttributes,
  dispatchCustomElementEvent,
} from '../../shared/component-helper'
import { createSpacingClasses } from '../space/SpacingHelper'

import AccordionProvider from './AccordionProvider'
import AccordionHeader from './AccordionHeader'
import AccordionContent from './AccordionContent'
import AccordionContext from './AccordionContext'
import AccordionProviderContext from './AccordionProviderContext'
import Context from '../../shared/Context'
import {
  accordionPropTypes,
  accordionDefaultProps,
} from './AccordionPropTypes'

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
  static contextType = AccordionProviderContext
  static Provider = AccordionProvider
  static Header = AccordionHeader
  static Content = AccordionContent

  static propTypes = {
    ...accordionPropTypes,
  }

  static defaultProps = {
    ...accordionDefaultProps,
  }

  static enableWebComponent() {
    registerElement(Accordion?.tagName, Accordion, Accordion.defaultProps)
  }

  static getDerivedStateFromProps(props, state) {
    if (state._listenForPropChanges) {
      if (props.expanded !== state._expanded) {
        state.expanded = isTrue(props.expanded)
        state._expanded = props.expanded
      }

      if (props.group && !state.group) {
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
      _expanded: props.expanded,
      expanded:
        props.expanded !== null
          ? isTrue(props.expanded)
          : isTrue(context?.expanded),
      group: props.group || context?.group,
      _listenForPropChanges: false, // make sure to not run DerivedState
    }

    if (
      typeof window === 'undefined' &&
      isTrue(props.expanded_ssr || context?.expanded_ssr)
    ) {
      this.state.expanded = true
    }

    if (this.state.group && typeof window !== 'undefined') {
      window.__dnbAccordion = window.__dnbAccordion || {}
      window.__dnbAccordion[this.state.group] =
        window.__dnbAccordion[this.state.group] ||
        new AccordionStore(this.state.group)

      window.__dnbAccordion[this.state.group].addInstance(this)
    }

    this.store = new Store({ id: props.id, group: this.state.group })

    if (
      isTrue(props.remember_state || context.remember_state) &&
      isTrue(props.expanded)
    ) {
      const expanded = this.store.getState()
      if (expanded === false) {
        this.state.expanded = false
      }
    }

    if (context && typeof context?.onInit === 'function') {
      context.onInit(this)
    }

    if (
      typeof window !== 'undefined' &&
      isTrue(props.expanded_ssr || context?.expanded_ssr)
    ) {
      this.state.expanded = false
    }

    if (isTrue(this.props.remember_state || context.remember_state)) {
      const expanded = this.store.getState()
      if (expanded) {
        this.state.expanded = true
      }
    }
  }

  componentDidMount() {
    this._isMounted = true
  }

  componentWillUnmount() {
    this._isMounted = false

    clearTimeout(this._animationState)
    clearTimeout(this._openTimeout)
    clearTimeout(this._changeOpenState)

    if (this.state.group && typeof window !== 'undefined') {
      window?.__dnbAccordion[this.state.group]?.removeInstance(this)
    }
  }

  componentDidUpdate(props) {
    if (isTrue(this.context.flush_remembered_state)) {
      this.store.flush()
      this.setState({
        expanded: isTrue(this.props.expanded),
      })
    }

    if (
      this.context?.expanded_id &&
      this.context.expanded_id === props.id
    ) {
      this.setState({
        expanded: true,
      })
    }
  }

  setExpandedState(expanded) {
    this.setState({
      expanded,
      _listenForPropChanges: false,
    })
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
      _listenForPropChanges: false,
    })

    // check if a event exists, because, then it's a user click
    if (
      isTrue(this.props.remember_state) ||
      isTrue(this.context.remember_state)
    ) {
      this.store.saveState(expanded)
    }
  }

  handleDisabledClick = (e) => {
    e.preventDefault()
    return false
  }

  callOnChangeHandler = (...params) => {
    this.callOnChange(...params)
    if (this.context?.onChange) {
      this.context?.onChange(...params)
    }
    if (this.state.group && typeof window !== 'undefined') {
      window?.__dnbAccordion[this.state.group]?.onChange(...params)
    }
  }

  callOnChange = ({ expanded, event }) => {
    this.changeOpened(expanded, event)

    dispatchCustomElementEvent(this, 'on_change', {
      expanded,
      event,
    })
  }

  render() {
    return (
      <Context.Consumer>
        {(globalContext) => (
          <AccordionContext.Consumer>
            {(nestedContext) => {
              let { expanded } = this.state

              // use only the props from context, who are available here anyway
              const props = extendPropsWithContextInClassComponent(
                this.props,
                Accordion.defaultProps,
                this.context, // group context
                nestedContext, // internal context
                { skeleton: globalContext?.skeleton },
                globalContext.accordion, // global context
                globalContext.translation.Accordion
              )

              if (expanded === null && globalContext.accordion) {
                if (globalContext.accordion.expanded) {
                  expanded = isTrue(props.expanded)
                }
              }

              const {
                variant,
                className,
                class: _className,
                prerender,
                prevent_rerender,
                prevent_rerender_conditional,
                single_container,
                remember_state,
                disabled,
                skeleton,
                no_animation,
                expanded_ssr: _expanded_ssr, // eslint-disable-line
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
                on_change, // eslint-disable-line
                on_state_update, // eslint-disable-line
                custom_method, // eslint-disable-line
                custom_element, // eslint-disable-line
                contentRef, // eslint-disable-line

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
                ),
              }

              if (this.state.open) {
                mainParams.open = true
              }

              // to remove spacing props
              validateDOMAttributes(this.props, rest)

              const extendProps = extendPropsWithContextInClassComponent(
                this.props,
                Accordion.defaultProps,
                this.state,
                this.context
              )

              const context = {
                ...extendProps,
                id,
                expanded,
                prerender: isTrue(prerender),
                prevent_rerender: isTrue(prevent_rerender),
                prevent_rerender_conditional: isTrue(
                  prevent_rerender_conditional
                ),
                single_container: isTrue(single_container),
                remember_state: isTrue(remember_state),
                disabled: isTrue(disabled),
                skeleton: isTrue(skeleton),
                no_animation: isTrue(no_animation),
                callOnChange: this.callOnChangeHandler,
              }

              if (isTrue(disabled)) {
                mainParams.onClick = this.handleDisabledClick
              }

              return (
                <AccordionContext.Provider value={context}>
                  <div {...mainParams}>
                    {findElementInChildren(
                      children,
                      (cur) => cur.type === AccordionHeader
                    ) ? null : (
                      <AccordionHeader />
                    )}
                    {findElementInChildren(
                      children,
                      (cur) => cur.type === AccordionContent
                    ) ? (
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

class Group extends React.PureComponent {
  static propTypes = {
    id: PropTypes.string,
    group: PropTypes.string,
    remember_state: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.bool,
    ]),
  }

  static defaultProps = {
    id: null,
    group: null,
    remember_state: null,
  }

  state = {}

  constructor(props) {
    super(props)

    let group

    if (props.id) {
      group = props.id
    } else if (!props.group) {
      group = '#' + makeUniqueId()
    }
    this.state.group = group

    this.store = new Store({ group })
    this._IDs = []

    if (isTrue(props.remember_state) && !props.id) {
      rememberWarning('accordion group')
    }
  }

  onInit = (instance) => {
    if (instance.props.id && !this._IDs.includes(instance.props.id)) {
      this._IDs.push(instance.props.id)
    }
  }

  componentDidMount() {
    const storedData = this.store.getData()
    if (storedData?.id) {
      if (!this._IDs.includes(storedData.id)) {
        // 1. get the fallback id
        const expanded_id = this._IDs[0]

        if (expanded_id) {
          // 2. set the fallback id
          this.setState(
            {
              expanded_id,
            },
            () => {
              // 3. save the fallback id
              this.store.saveState(true, expanded_id)

              // 4. and reset the fallback id
              this.setState({
                expanded_id: null,
              })
            }
          )
        }
      }
    }
  }

  render() {
    return (
      <AccordionProvider
        onInit={this.onInit}
        {...this.props}
        {...this.state}
      />
    )
  }
}

Accordion.Group = Group
Accordion.Group.Store = (group, id = null) => {
  return new Store({ group, id })
}
Accordion.Store = (id) => {
  return new Store({ id })
}

function rememberWarning(type = 'accordion') {
  warn(`Missing "id" prop the ${type}! "remember_state" is enabled.`)
}

class Store {
  constructor({ id, group }) {
    this.id = id
    this.group = group
    return this
  }

  storeId(id = this.id) {
    if (this.group) {
      // Skip using the random ID
      if (this.group[0] === '#') {
        return null
      }
      id = this.group
    }
    return `dnb-accordion-${id}`
  }

  saveState(expanded, id = this.id, opts = {}) {
    if (id) {
      try {
        const store = this.getData() || {}

        if (this.group) {
          if (expanded) {
            store.id = id
          } else if (opts && opts.force) {
            store.id = null
          }
        } else {
          store.expanded = expanded
        }

        const storeId = this.storeId(id)
        if (storeId) {
          window.localStorage.setItem(storeId, JSON.stringify(store))
        }
      } catch (e) {
        //
      }
    } else {
      rememberWarning()
    }
  }

  getData(id = this.id) {
    const storeId = this.storeId(id)

    if (storeId) {
      try {
        if (
          Object.prototype.hasOwnProperty.call(
            window.localStorage,
            storeId
          )
        ) {
          return JSON.parse(window.localStorage.getItem(storeId))
        }
      } catch (e) {
        //
      }
    }

    return null
  }

  getState(id = this.id) {
    let state = null

    const store = this.getData(id)

    if (store) {
      if (typeof store.id !== 'undefined') {
        state = id === store.id
      } else if (store.expanded !== 'undefined') {
        state = isTrue(store.expanded)
      }
    }

    return state
  }

  flush(id = this.id) {
    if (id) {
      try {
        const storeId = this.storeId(id)
        if (storeId) {
          window.localStorage.setItem(storeId, null)
        }
      } catch (e) {
        //
      }
    }
  }
}
