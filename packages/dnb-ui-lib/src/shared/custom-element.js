/**
 * Make React component aviable as a Web Component
 *
 */

import React from 'react'
import { render, unmountComponentAtNode } from 'react-dom'
import { ErrorHandler } from './error-helper'

// import "custom-element-polyfill" - insted of import 'document-register-element' // https://github.com/WebReflection/document-register-element
// This way we can controll the execution of the polyfill with customElementPolyfill()
import customElementPolyfill from './custom-element-polyfill'

export const registeredElements = (global.registeredElements =
  global.registeredElements || [])

export const registerElement = (
  tagName,
  ReactComponent,
  propNames = null,
  // remove id, because we never can have more than one of the same id
  { attributesBlacklist = ['id'] } = {}
) => {
  if (!tagName) tagName = ReactComponent.displayName || ReactComponent.name

  // stop here if we already have registered the tag
  if (registeredElements.indexOf(tagName) !== -1) return
  registeredElements.push(tagName)

  if (typeof document === 'undefined' || typeof window === 'undefined') {
    return null
  }

  //always run the customElementPolyfill unlress we are in the build process
  if (!global.registeredElements.hasPolyfill) {
    global.registeredElements.hasPolyfill = true
    customElementPolyfill(window)
  }

  if (propNames) {
    propNames = prepareDefaultProps(propNames)
  }

  class HtmlClass extends HTMLElement {
    static get observedAttributes() {
      return propNames || []
    }
    constructor(props) {
      super(props)
      this._elementRef = React.createRef()
      this._customMethodes = {}
      this._customEvents = []
      this._isConnected = false
    }
    connectedCallback() {
      this.updateChildren()
      this.renderElement()
      this._isConnected = true
    }
    attributeChangedCallback(attrName, oldAttr, newAttr) {
      if (!this._isConnected || oldAttr === newAttr) {
        return false
      }
      this.renderElement()
      return newAttr
    }
    // adoptedCallback: Invoked when the custom element is moved to a new document.
    detachedCallback() {
      unmountComponentAtNode(this)
      if (this._children) delete this._children
      if (this._isConnected) delete this._isConnected
      if (this._elementRef) delete this._elementRef
      if (this._customMethodes) delete this._customMethodes
      if (this._customEvents) delete this._customEvents
    }
    updateChildren() {
      this._children = []
      let i,
        cn = this.childNodes,
        v
      for (i = cn.length; i--; ) {
        v = toVdom(cn[i])
        if (v) {
          this._children.push(v)
        }
        // TODO: we may remove this child - need more testing
        // cn[i].remove()
      }
    }
    connectEvents(props) {
      if (props.events) {
        props.event = props.events
        delete props.events
      }

      // check if there are more than one events
      let events = props.event ? props.event.split(',') : []

      // check if there are custom renderer, if so, add them as well
      if (ReactComponent.renderProps) {
        events = Object.entries(ReactComponent.renderProps)
          .filter(([key]) => key && props[key])
          .reduce((events, [key]) => {
            events.push(key + '=' + props[key])
            delete props[key]
            return events
          }, events)
      }

      if (events.length > 0) {
        events.forEach(eventDef => {
          // extract the prop name and callback function
          let [type, func] = eventDef.split('=')
          type = EVENT_TRANSLATIONS[type] || type

          // add a react function prop or event callback
          props[type] = (...args) => {
            try {
              // check if there is a element returned, convert it to html then
              if (args[0]) {
                if (React.isValidElement(args[0])) args[0] = [args[0]]
                if (Array.isArray(args[0])) {
                  const elems = []
                  // we have to overwrite the first arg like this - and cant use map/reduce here
                  args[0].forEach(elem => {
                    if (React.isValidElement(elem)) {
                      const rootEl = document.createElement('div') // createDocumentFragment
                      render(elem, rootEl)
                      elems.push(rootEl)
                    }
                  })
                  if (elems.length > 0) args[0] = elems
                }
              }

              // call the function, either it in a class or not
              let [scope, fn] = func.split('.')
              fn = fn ? window[scope][fn] : window[scope] // TODO: remove this because of security notation
              const ret = fn.apply(scope, [...args])

              // convert to react if we get an HTMLElement
              // this is used for custom renderer
              if (ret instanceof HTMLElement) {
                const children = [],
                  cn = ret.childNodes,
                  a = ret.attributes,
                  props = {}

                for (let i = cn.length; i--; ) {
                  children.push(toVdom(cn[i])) // TODO: remove this because of security notation
                  // TODO: we may remove this child - need more testing
                  // cn[i].remove()
                }

                for (let i = a.length; i--; ) {
                  props[PROP_TRANSLATIONS[a[i].name] || a[i].name] =
                    a[i].value // TODO: remove this because of security notation
                }

                const nodeName = ret.nodeName.toLowerCase()
                ret.remove()

                return React.createElement(nodeName, props, children)
              }

              return ret
            } catch (error) {
              new ErrorHandler(
                `The '${type}' event has failed. '${func}' has to exist on a 'window' scope!`,
                error
              )
            }
          }
        })

        // do send this event to the react props
        delete props.event
      }
      return props
    }
    addEvent(eventName, eventCallback) {
      const eventWrapper = event => eventCallback.apply(this, [event])
      this._customEvents.push({ eventName, eventCallback, eventWrapper })
      return eventWrapper
    }
    removeEvent(eventId, removeCallback = null) {
      this._customEvents = this._customEvents.reduce(
        (accumulator, current) => {
          if (removeCallback) {
            const { eventCallback: eventWrapper } = current
            if (eventWrapper !== removeCallback) {
              accumulator.push(current)
            }
          } else {
            const { eventWrapper } = current
            if (eventWrapper !== eventId) {
              accumulator.push(current)
            }
          }
          return accumulator
        },
        []
      )
    }
    fireEvent(eventName, ...args) {
      this._customEvents.forEach(({ eventName: name, eventCallback }) => {
        if (name === eventName && typeof eventCallback === 'function') {
          eventCallback.apply(this, [...args])
        }
      })
    }
    renderElement() {
      let props = {},
        i = 0,
        a = this.attributes

      for (i = a.length; i--; ) {
        props[a[i].name] = a[i].value // TODO: remove this because of security notation
      }

      props = this.connectEvents(props)

      // we dont allow ids
      for (i = attributesBlacklist.length; i--; ) {
        if (props[attributesBlacklist[i]]) {
          // TODO: remove this because of security notation
          this.removeAttribute(attributesBlacklist[i]) // TODO: remove this because of security notation
        }
      }

      if (this._children && this._children.length > 0) {
        props.children = this._children // we have returned a () => before
      }

      if (this._elementRef) {
        props.ref = this._elementRef
      }
      if (!props.custom_element) {
        props.custom_element = this
      }
      if (!props.custom_method) {
        props.custom_method = (methodName, methodFunc) => {
          this[methodName] = this._customMethodes[methodName] = methodFunc
        }
      }

      render(<ReactComponent {...props} />, this)
    }
  }

  return window.customElements.define(tagName, HtmlClass)
}

// remove react props witch has uppercase chars
const filterProps = key =>
  key && !/[A-Z]/.test(key) && !/children/.test(key)

export const prepareDefaultProps = defaultProps =>
  Array.isArray(defaultProps)
    ? defaultProps.filter(filterProps)
    : Object.entries(defaultProps || {})
        .reduce((props, [key]) => {
          props.push(key)
          return props
        }, [])
        .filter(filterProps)

const toVdom = (elem, name = null) => {
  if (elem.nodeType === 3) return elem.nodeValue
  if (elem.nodeType !== 1) return null

  let children = [],
    props = {},
    i = 0,
    a = elem.attributes,
    cn = elem.childNodes

  for (i = a.length; i--; ) {
    // a[i].name = PROP_TRANSLATIONS[a[i].name]||a[i].name
    props[a[i].name] = a[i].value // TODO: remove this because of security notation
  }
  for (i = cn.length; i--; ) {
    children[i] = toVdom(cn[i]) // TODO: remove this because of security notation
  }
  props.key = `key${Math.random() * 1000}`

  return React.createElement(
    name || elem.nodeName.toLowerCase(),
    props,
    children
  )
}

const PROP_TRANSLATIONS = {
  class: 'className',
  for: 'htmlFor'
}
const EVENT_TRANSLATIONS = {
  onclick: 'onClick'
}
