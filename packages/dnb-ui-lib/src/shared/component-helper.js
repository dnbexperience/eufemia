/**
 * Component helpers
 *
 */

import React from 'react'
import keycode from 'keycode'
import whatInput from 'what-input'
import { registerElement } from './custom-element'

export { registerElement }

export const PLATFORM_MAC = 'Mac|iPad|iPhone|iPod'
export const PLATFORM_WIN = 'Win'
export const PLATFORM_LINUX = 'Linux'
export const PLATFORM_IOS = 'iOS|iPhone|iPad|iPod'

if (
  typeof process !== 'undefined' &&
  process.env.NODE_ENV === 'test' &&
  typeof window !== 'undefined'
) {
  window.IS_TEST = true
}

// run component helper functions
whatInput.specificKeys([9])
defineNavigator()

/**
 * Check if device is touch device or not
 */
export function isTouchDevice() {
  if (typeof document !== 'undefined') {
    let intent = false
    try {
      intent = document.documentElement.getAttribute('data-whatintent')
    } catch (e) {
      //
    }
    return intent === 'touch'
  }
  return false
}

export function defineNavigator() {
  const handleNavigator = () => {
    if (
      typeof document === 'undefined' ||
      typeof window === 'undefined' ||
      typeof navigator === 'undefined'
    ) {
      return
    }

    try {
      if (!window.IS_TEST) {
        if (navigator.platform.match(new RegExp(PLATFORM_MAC)) !== null) {
          document.documentElement.setAttribute('data-os', 'mac')
        } else if (
          navigator.platform.match(new RegExp(PLATFORM_WIN)) !== null
        ) {
          document.documentElement.setAttribute('data-os', 'win')
        } else if (
          navigator.platform.match(new RegExp(PLATFORM_LINUX)) !== null
        ) {
          document.documentElement.setAttribute('data-os', 'linux')
        }
      } else {
        document.documentElement.setAttribute('data-os', 'other')
      }
    } catch (e) {
      warn(e)
    }

    document.removeEventListener('DOMContentLoaded', handleNavigator)
  }

  if (
    typeof document !== 'undefined' &&
    document.readyState === 'loading'
  ) {
    document.addEventListener('DOMContentLoaded', handleNavigator)
  } else {
    handleNavigator()
  }
}

export const skeletonElement = (params) => {
  params.disabled = true
  params['aria-disabled'] = true
  params['aria-hidden'] = true
  params['aria-busy'] = true

  return params
}

export const validateDOMAttributes = (props, params) => {
  // if there is an "attributes" prop, prepare these
  // mostly used for prop example usage
  if (props && props.attributes) {
    let attr = props.attributes
    if (attr) {
      if (attr[0] === '{') attr = JSON.parse(attr)
      if (attr && typeof attr === 'object') {
        Object.entries(attr).forEach(([key, value]) => {
          Object.assign(params, { [key]: value })
        })
      }
    }
  }

  // remove disabled, in case it is false (this is for web components support)
  if (params.disabled === null || params.disabled === 'false') {
    delete params.disabled
  }
  if (typeof params.top !== 'undefined') {
    delete params.top
  }
  if (typeof params.right !== 'undefined') {
    delete params.right
  }
  if (typeof params.bottom !== 'undefined') {
    delete params.bottom
  }
  if (typeof params.left !== 'undefined') {
    delete params.left
  }
  if (typeof params.no_collapse !== 'undefined') {
    delete params.no_collapse
  }

  // in case disabled is a string, it its enabled, send it in as a true (this is for web components support)
  else if (params.disabled === 'true') {
    params.disabled = true
  }
  if (params.disabled === true) {
    params['aria-disabled'] = true
  }

  if (props && props.tabindex) {
    let tabIndex = props.tabindex
    if (tabIndex === 'off') {
      tabIndex = '-1'
    }
    params['tabIndex'] = tabIndex
  }

  // make sure we don't return a render prop as a DOM attribute
  if (params && typeof params === 'object') {
    for (const i in params) {
      if (
        // is React
        typeof params[i] === 'function' &&
        // only React Style props, like onClick are allowed
        !/(^[a-z]{1,}[A-Z]{1})/.test(i)
      ) {
        delete params[i]

        // filter out invalid attrinutes
      } else if (
        // we dont want NULL values
        params[i] === null ||
        // we dont want
        /[^a-z-]/i.test(i)
        // (typeof params[i] !== 'string' && /[^a-z-]/i.test(i))
      ) {
        delete params[i]
      }
    }
  }

  return params
}

export const processChildren = (props) => {
  if (!props) {
    return null
  }

  // If used in WB, call functions who starts with "render_"
  if (
    typeof global !== 'undefined' &&
    Array.isArray(global.registeredElements) &&
    global.registeredElements.length > 0
  ) {
    let cache = null
    Object.entries(props)
      .reverse()
      .map(([key, cb]) => {
        if (key.includes('render_') && /^render_/.test(key)) {
          if (typeof cb === 'function') {
            if (cache) {
              if (Object.isFrozen(props)) {
                props = { ...props }
              }
              props.children = cache
            }
            return (cache = (
              <React.Fragment key={key}>{cb(props)}</React.Fragment>
            ))
          }
        }

        return null
      })
      .filter(Boolean)
    if (cache) {
      return cache
    }
  }

  const res =
    typeof props.children === 'function'
      ? props.children(props)
      : props.children

  // if we get several react children which representates only a text
  if (Array.isArray(res)) {
    const onlyTexts = res.reduce((pV, cV) => {
      if (typeof cV === 'string' || typeof cV === 'number') {
        pV.push(cV)
      }
      return pV
    }, [])

    // if there was one or more text elements
    if (onlyTexts.length === res.length && onlyTexts.length > 0) {
      return onlyTexts.join('')
    }
  }

  return res
}

// extends given objects recursively and removes entries with null values
// makes sure that we by default return a totally new object every time
export const extend = (...objects) => {
  let first = {}
  const keepRef = objects[0]

  if (keepRef === true || keepRef === false) {
    // remove settings value
    objects.shift()

    if (keepRef) {
      // by extracting the first, we keep the same main object refferance
      first = objects.shift()
    }
  }

  return objects.reduce((acc1, object) => {
    if (object) {
      acc1 = Object.assign(
        acc1,
        Object.entries(object).reduce((acc2, [key, value]) => {
          if (value !== null) {
            // go recursively
            if (typeof value === 'object') {
              value = extend(acc1[key] || {}, value)
              if (Object.keys(value).length > 0) {
                acc2[key] = value
              }
            } else {
              acc2[key] = value
            }
          }
          return acc2
        }, {})
      )
    }
    return acc1
  }, first)
}

// extends props from a given context
// but give the context second priority only
export const extendPropsWithContext = (
  props,
  defaults = {},
  ...contexts
) => {
  const context = contexts.reduce((acc, cur) => {
    if (cur) {
      acc = { ...acc, ...cur }
    }
    return acc
  }, {})

  return {
    ...props,
    ...Object.entries(context).reduce((acc, [key, value]) => {
      if (
        // check if a prop of the same name exists
        typeof props[key] !== 'undefined' &&
        // and if it was NOT defined as a component prop, because its still the same as the defaults
        props[key] === defaults[key]
      ) {
        // then we use the context value
        acc[key] = value
      }
      return acc
    }, {})
  }
}

// check if value is "truthy"
export const isTrue = (value) => {
  if (
    value !== null &&
    typeof value !== 'undefined' &&
    (String(value) === 'true' || String(value) === '1')
  ) {
    return true
  }
  return false
}

export const dispatchCustomElementEvent = (
  src,
  eventName,
  eventObject
) => {
  let ret = null

  // distribute dataset like "data-*" to both currentTarget and target
  if (eventObject && eventObject.attributes && eventObject.event) {
    const currentTarget = eventObject.event.currentTarget
    if (currentTarget) {
      try {
        // 1. create new dataset, and copy if exists
        const dataset = { ...(currentTarget.dataset || {}) }

        // 2. copy in our attributes if they are of "data-" type
        const attributes = { ...eventObject.attributes }
        for (const i in attributes) {
          if (/^data-/.test(i)) {
            dataset[String(i).replace(/^data-/, '')] = attributes[i]
          }
        }

        // 3. and distribute them to the targets. Use the for method because of immutability
        for (const i in dataset) {
          if (eventObject.event.currentTarget.dataset) {
            eventObject.event.currentTarget.dataset[i] = dataset[i]
          }
          if (
            eventObject.event.target &&
            eventObject.event.target.dataset
          ) {
            eventObject.event.target.dataset[i] = dataset[i]
          }
        }
      } catch (e) {
        warn('Error on handling dataset:', e)
      }
    }
  }

  const props = (src && src.props) || src

  // call Web Component events
  if (props.custom_element) {
    if (typeof props.custom_element.fireEvent === 'function') {
      ret = props.custom_element.fireEvent(eventName, eventObject)
    }
  }

  // call the default snail case event
  if (typeof props[eventName] === 'function') {
    ret = props[eventName].apply(src, [eventObject])
  }

  // call Syntetic React event camelCase naming events
  eventName = toPascalCase(eventName)
  if (typeof props[eventName] === 'function') {
    // TODO: we may use [eventObject.event, eventObject] in future
    ret = props[eventName].apply(src, [eventObject])
  }

  return ret
}

// transform on_click to onClick
export const toPascalCase = (s) =>
  s
    .split(/_/g)
    .reduce(
      (acc, cur, i) =>
        acc +
        (i === 0
          ? cur
          : cur.replace(
              /(\w)(\w*)/g,
              (g0, g1, g2) => g1.toUpperCase() + g2.toLowerCase()
            )),
      ''
    )

export const pickRenderProps = (props, renderProps) =>
  Object.entries(props)
    .filter(([key, value]) => {
      if (
        typeof renderProps[key] !== 'undefined' || // TODO: remove this because of security notation
        key === 'children' ||
        key === 'custom_method'
      )
        return false
      return typeof value === 'function'
    })
    .reduce((obj, [key, value]) => {
      obj[key] = value // TODO: remove this because of security notation
      return obj
    }, {})

/**
 * [detectOutsideClick Detects a click outside a given DOM element]
 * @param  {[type]} ignoreElement [The element we want to protect from a click]
 * @param  {[type]} onSuccess     [Will be called on outside click]
 * @return {[type]}               [void]
 */
export const detectOutsideClick = (ignoreElements, onSuccess, options) =>
  new DetectOutsideClickClass(ignoreElements, onSuccess, options)

// Used by detectOutsideClick
export class DetectOutsideClickClass {
  constructor(ignoreElements, onSuccess, options = {}) {
    if (
      !this.handleClickOutside &&
      typeof document !== 'undefined' &&
      typeof window !== 'undefined'
    ) {
      if (!Array.isArray(ignoreElements)) {
        ignoreElements = [ignoreElements]
      }
      this.handleClickOutside = (event) => {
        this.checkOutsideClick(
          {
            currentElement: event.target,
            ignoreElements
          },
          () => typeof onSuccess === 'function' && onSuccess({ event })
        )
      }
      document.addEventListener('mousedown', this.handleClickOutside)

      this.keydownCallback = (event) => {
        const keyCode = keycode(event)
        if (keyCode === 'esc') {
          window.removeEventListener('keydown', this.keydownCallback)
          if (typeof onSuccess === 'function') {
            onSuccess({ event })
          }
        }
      }
      window.addEventListener('keydown', this.keydownCallback)

      // e.g. includedKeys = ['tab']
      if (options.includedKeys) {
        // use keyup so we get the correct new target
        this.keyupCallback = (event) => {
          const keyCode = keycode(event)
          if (
            options.includedKeys.includes(keyCode) &&
            typeof this.handleClickOutside === 'function'
          ) {
            this.handleClickOutside(event, () => {
              if (this.keyupCallback)
                window.removeEventListener('keyup', this.keyupCallback)
            })
          }
        }
        window.addEventListener('keyup', this.keyupCallback)
      }
    }
  }

  remove() {
    if (this.handleClickOutside && typeof document !== 'undefined') {
      document.removeEventListener('mousedown', this.handleClickOutside)
      this.handleClickOutside = null
    }
    if (this.keydownCallback && typeof window !== 'undefined') {
      window.removeEventListener('keydown', this.keydownCallback)
      this.keydownCallback = null
    }
    if (this.keyupCallback && typeof window !== 'undefined') {
      window.removeEventListener('keyup', this.keyupCallback)
      this.keyupCallback = null
    }
  }

  checkOutsideClick = (
    { currentElement, ignoreElements },
    onSuccess = null
  ) => {
    try {
      // scrollbars are on HTML, therefore we ignroe the click
      if (
        typeof currentElement.tagName === 'undefined' ||
        /html/i.test(currentElement.tagName) // we may also ignore |body
      ) {
        return // stop here
      }

      // check if element has like "overflow: scroll"
      if (this.checkIfHasScrollbar(currentElement)) {
        return // stop here
      }

      // check the rest
      for (let i = 0, elem, l = ignoreElements.length; i < l; ++i) {
        elem = currentElement
        if (!ignoreElements[i]) {
          continue
        }
        do {
          if (elem === ignoreElements[i]) {
            return // stop here
          }
          elem = elem && elem.parentNode
        } while (elem)
      }

      if (typeof onSuccess === 'function') {
        onSuccess()
      }
    } catch (e) {
      warn(e)
    }
  }

  checkIfHasScrollbar = (elem) => {
    return (
      elem &&
      (elem.scrollHeight > elem.offsetHeight ||
        elem.scrollWidth > elem.offsetWidth) &&
      this.overflowIsScrollable(elem)
    )
  }

  overflowIsScrollable = (elem) => {
    const style = window.getComputedStyle(elem)
    return /scroll|auto/i.test(
      style.overflow + (style.overflowX || '') + (style.overflowY || '')
    )
  }
}

export const filterProps = (props, remove = null, allowed = null) => {
  if (Array.isArray(remove)) {
    remove = remove.reduce((acc, key) => {
      acc[key] = true
      return acc
    }, {})
  }
  if (Array.isArray(allowed)) {
    allowed = allowed.reduce((acc, key) => {
      acc[key] = true
      return acc
    }, {})
  }
  return Object.entries(props).reduce((acc, [k, v]) => {
    if ((remove && !remove[k]) || (allowed && allowed[k])) {
      acc[k] = v
    }
    return acc
  }, {})
}

export const makeUniqueId = (prefix = '', length = 8) =>
  prefix +
  String(
    Math.random().toString(36).substr(2, length) + idIncrement++
  ).slice(-length)
let idIncrement = 0

export const slugify = (s) =>
  String(s)
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')

// NB: in future we can use String.matchAll() instead
export const matchAll = (string, regex) => {
  if (typeof string.matchAll === 'function') {
    return Array.from(string.matchAll(regex))
  }
  const matches = []
  let match
  while ((match = regex.exec(string))) {
    matches.push(match)
  }
  return matches
}

/**
 * [getPreviousSibling traverses down the DOM tree until it finds the wanted element]
 * @param  {[string]} className [CSS class]
 * @param  {[HTMLElement]} element      [starting HTMLElement]
 * @return {[HTMLElement]}           [HTMLElement]
 */
export const getPreviousSibling = (className, element) => {
  try {
    const contains = (element) =>
      element && element.classList.contains(className)

    if (contains(element)) {
      return element
    }

    while (
      (element = element && element.parentElement) &&
      !contains(element)
    );
  } catch (e) {
    warn(e)
  }
  return element
}

// Round number to nearest target number
export const roundToNearest = (num, target) => {
  const diff = num % target
  return diff > target / 2 ? num - diff + target : num - diff
}

export const isInsideScrollView = (
  currentElement,
  returnElement = false
) => {
  const elem = getPreviousSibling('dnb-scroll-view', currentElement)
  if (returnElement) {
    return elem == window ? null : elem
  }
  return elem == window ? false : Boolean(elem)
}

export const warn = (...e) => {
  if (typeof console !== 'undefined') {
    console.warn(...e)
  }
}

export const convertJsxToString = (elements, separator = undefined) => {
  if (!Array.isArray(elements)) {
    elements = [elements]
  }

  return elements
    .map((word) => {
      if (React.isValidElement(word)) {
        if (typeof word.props.children === 'string') {
          word = word.props.children
        } else if (Array.isArray(word.props.children)) {
          word = word.props.children.reduce((acc, word) => {
            if (typeof word === 'string') {
              acc = acc + word
            }
            return acc
          }, '')
        } else {
          return null
        }
      }

      return word
    })
    .filter(Boolean)
    .join(separator)
}

export class InteractionInvalidation {
  active(element = null) {
    this.preventScreenReaderPossibility(element)
    this.removeFocusPossibility(element)
  }
  revert() {
    this.revertScreenReaderPossibility()
    this.revertFocusPossibility()
  }

  removeFocusPossibility(element = null) {
    // since touch devices works diffrent, and we also use preventScreenReaderPossibility
    // we dont set the tabindex by using removeFocusPossibility
    if (typeof document === 'undefined' || isTouchDevice()) {
      return // stop here
    }

    const modalNodes = Array.from(
      (element || document).querySelectorAll('.dnb-modal__content *')
    )

    // by only finding elements that do not have tabindex="-1" we ensure we don't
    // corrupt the previous state of the element if a modal was already open
    this.nonModalNodes = Array.from(
      (element || document).querySelectorAll(
        'body *:not(.dnb-modal__content):not([tabindex="-1"]):not(script)'
      )
    ).filter((node) => !modalNodes.includes(node))

    this.nonModalNodes.forEach((node) => {
      try {
        // save the previous tabindex state so we can restore it on close
        node._prevTabindex = node.getAttribute('tabindex')
        node.setAttribute('tabindex', -1)

        // tabindex=-1 does not prevent the mouse from focusing the node (which
        // would show a focus outline around the element). prevent this by disabling
        // outline styles while the modal is open
        node.style.outline = 'none'
      } catch (e) {
        warn(e)
      }
    })
  }

  revertFocusPossibility() {
    // since touch devices works diffrent, and we also use preventScreenReaderPossibility
    // we dont set the tabindex by using removeFocusPossibility
    if (!this.nonModalNodes) {
      return // stop here
    }
    // restore or remove tabindex from nodes
    this.nonModalNodes.forEach((node) => {
      try {
        if (node && node._prevTabindex) {
          node.setAttribute('tabindex', node._prevTabindex)
          node._prevTabindex = null
          delete node._prevTabindex
        } else {
          node.removeAttribute('tabindex')
        }
        node.style.outline = null
      } catch (e) {
        warn(e)
      }
    })
    this.nonModalNodes = null
  }

  preventScreenReaderPossibility(element = null) {
    if (typeof document === 'undefined') {
      return // stop here
    }

    this.nonScreenReaderNodes = Array.from(
      (element || document).querySelectorAll(
        'body > div:not(#dnb-modal-root)'
      )
    )
    this.nonScreenReaderNodes.forEach((node) => {
      node.setAttribute('aria-hidden', true)
    })
  }

  revertScreenReaderPossibility() {
    if (!this.nonScreenReaderNodes) {
      return // stop here
    }

    this.nonScreenReaderNodes.forEach((node) => {
      node.removeAttribute('aria-hidden')
    })
  }
}
