/**
 * Component helpers
 *
 */

import React from 'react'
import keycode from './keycode'
import whatInput from 'what-input'
import {
  warn,
  PLATFORM_MAC,
  PLATFORM_WIN,
  PLATFORM_LINUX,
} from './helpers'
import { getPreviousSibling } from './helpers/getPreviousSibling'
import { init } from './Eufemia'

export { InteractionInvalidation } from './helpers/InteractionInvalidation'
export {
  extendPropsWithContext,
  extendPropsWithContextInClassComponent,
} from './helpers/extendPropsWithContext'
export { assignPropsWithContext } from './helpers/assignPropsWithContext'
export { filterProps } from './helpers/filterProps'

export { keycode, getPreviousSibling, warn }

init()

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
      if (!(typeof window !== 'undefined' && window.IS_TEST)) {
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

export const validateDOMAttributes = (props, params) => {
  // if there is an "attributes" prop, prepare these
  // mostly used for prop example usage
  if (props && props.attributes) {
    let attr = props.attributes
    if (attr) {
      if (attr[0] === '{') {
        attr = JSON.parse(attr)
      }
      if (attr && typeof attr === 'object') {
        Object.entries(attr).forEach(([key, value]) => {
          Object.assign(params, { [key]: value })
        })
      }
      delete params.attributes
    }
  }

  // remove disabled, in case it is false (this is for web components support)
  if (params.disabled === null || params.disabled === 'false') {
    delete params.disabled
  }
  if (typeof params.space !== 'undefined') {
    delete params.space
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
  if (typeof params.innerSpace !== 'undefined') {
    delete params.innerSpace
  }

  // in case disabled is a string, it's enabled, send it in as a true (this is for web components support)
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

        // filter out invalid attributes
      } else if (
        // we don't want NULL values
        params[i] === null ||
        // we don't want
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

  // if we get several react children which represents only a text
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

/** @deprecated Can be removed in v11 */
export const extendGracefully = (...objects) => {
  let first = {}
  const keepRef = objects[0]

  if (keepRef === true || keepRef === false) {
    // remove settings value
    objects.shift()

    if (keepRef) {
      // by extracting the first, we keep the same main object reference
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
              value = extendGracefully(acc1[key] || {}, value)
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

export function isObject(item) {
  return item && typeof item === 'object' && !Array.isArray(item)
}

export function extendDeep(target = {}, ...sources) {
  for (const source of sources) {
    if (isObject(source)) {
      for (const key in source) {
        // Prototype-polluting checks etc.
        if (key === '__proto__' || key === 'constructor') continue
        if (!Object.prototype.hasOwnProperty.call(source, key)) continue
        if (!isObject(target)) continue

        if (isObject(source[key])) {
          if (!isObject(target[key])) {
            target[key] = {}
          }
          extendDeep(target[key], source[key])
        } else {
          target[key] = source[key]
        }
      }
    }
  }

  return target
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
  eventObjectOrig
) => {
  let ret = undefined

  const eventObject = {
    ...((eventObjectOrig && eventObjectOrig.event) || {}),
    ...eventObjectOrig,
  }

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

  // call the default snake case event
  if (eventName.includes('_')) {
    if (typeof props[eventName] === 'function') {
      const r = props[eventName].apply(src, [eventObject])
      if (typeof r !== 'undefined') {
        ret = r
      }
    }

    // call Synthetic React event camelCase naming events
    eventName = toCamelCase(eventName)
    if (typeof props[eventName] === 'function') {
      const r = props[eventName].apply(src, [eventObject])
      if (typeof r !== 'undefined') {
        ret = r
      }
    }
  } else {
    if (typeof props[eventName] === 'function') {
      const r = props[eventName].apply(src, [eventObject])
      if (typeof r !== 'undefined') {
        ret = r
      }
    }

    // call (in future deprecated) event snake case naming events
    eventName = toSnakeCase(eventName)
    if (typeof props[eventName] === 'function') {
      const r = props[eventName].apply(src, [eventObject])
      if (typeof r !== 'undefined') {
        ret = r
      }
    }
  }

  return ret
}

// transform on_click to onClick
export const toCamelCase = (s) =>
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

// transform my_component to MyComponent
export const toPascalCase = (s) =>
  s
    .split(/_/g)
    .reduce(
      (acc, cur) =>
        acc +
        cur.replace(
          /(\w)(\w*)/g,
          (g0, g1, g2) => g1.toUpperCase() + g2.toLowerCase()
        ),
      ''
    )

// transform MyComponent to my_component
export const toSnakeCase = (str) =>
  str.replace(/\B[A-Z]/g, (letter) => `_${letter}`).toLowerCase()

// transform MyComponent to my-component
export const toKebabCase = (str) =>
  str.replace(/\B[A-Z]/g, (letter) => `-${letter}`).toLowerCase()

export function toCapitalized(str) {
  return typeof str === 'string'
    ? str
        .toLowerCase()
        .split('')
        .map((char, index, arr) =>
          index === 0 || arr[index - 1] === ' ' || arr[index - 1] === '-'
            ? char.toUpperCase()
            : char
        )
        .join('')
    : str
}

/**
 * [detectOutsideClick Detects a click outside a given DOM element]
 * @param  {HTMLElement} ignoreElement [The element we want to protect from a click]
 * @param  {Function} onSuccess     [Will be called on outside click]
 * @param  {Object} [options]      [Options]
 * @return {DetectOutsideClickClass} [A new instance of DetectOutsideClickClass]
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
            event,
            ignoreElements,
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

  checkOutsideClick = ({ event, ignoreElements }, onSuccess = null) => {
    try {
      const currentElement = event.target

      // we also check if currentElement is documentElement
      // and if it has scrollbars, we then ignore the click
      if (
        currentElement?.tagName === 'HTML' &&
        (event.pageX > document.documentElement.clientWidth - 40 ||
          event.pageY > document.documentElement.clientHeight - 40)
      ) {
        return // stop here
      }

      // check if element has e.g. "overflow: scroll"
      if (checkIfHasScrollbar(currentElement)) {
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
}

export const checkIfHasScrollbar = (elem) => {
  return (
    elem &&
    (elem.scrollHeight > elem.offsetHeight ||
      elem.scrollWidth > elem.offsetWidth) &&
    overflowIsScrollable(elem)
  )
}
const overflowIsScrollable = (elem) => {
  const style =
    typeof window !== 'undefined' ? window.getComputedStyle(elem) : {}
  return /scroll|auto/i.test(
    (style.overflow || '') +
      (style.overflowX || '') +
      (style.overflowY || '')
  )
}

export const makeUniqueId = (prefix = 'id-', length = 8) =>
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
 * Check if an element exists in its children
 * If it finds it, the child "element" of target will be returned.
 *
 * @param {HTMLElement} element The DOM Element to find
 * @param {HTMLElement} target The DOM Element that should contain "element"
 * @param {function} callback (optional)
 * @returns {HTMLElement | null} Returns the found child of all existing dom elements inside of "target"
 */
export const isChildOfElement = (element, target, callback = null) => {
  try {
    const contains = (element) => {
      if (callback) {
        const res = callback(element)
        if (res) {
          return element
        }
      }
      return element && element === target
    }

    if (contains(element)) {
      return element
    }

    while (
      (element = element && element.parentElement) &&
      !contains(element)
    );
  } catch (e) {
    //
  }

  return element
}

// Round number to nearest target number
export const roundToNearest = (num, target) => {
  const diff = num % target
  return diff > target / 2 ? num - diff + target : num - diff
}

export const getClosestScrollViewElement = (currentElement) => {
  return getPreviousSibling('.dnb-scroll-view', currentElement)
}

export const convertJsxToString = (
  elements,
  separator = undefined,
  transformWord = undefined
) => {
  if (!Array.isArray(elements)) {
    elements = [elements]
  }

  const process = (word) => {
    if (React.isValidElement(word)) {
      if (transformWord) {
        word = transformWord(word)
      }

      if (typeof word.props.children === 'string') {
        word = word.props.children.trim()
      } else if (Array.isArray(word.props.children)) {
        word = word.props.children.reduce((acc, word) => {
          if (typeof word !== 'string') {
            word = process(word, separator, transformWord)
          }
          if (typeof word === 'string') {
            acc = (acc + (separator || '') + word).trim()
          }
          return acc
        }, '')
      } else {
        return null
      }
    }

    return word
  }

  return elements
    .map((word) => process(word))
    .filter(Boolean)
    .join(separator)
    .trim()
}

export function convertStatusToStateOnly(status, state) {
  return status ? state : null
}

export function getStatusState(status) {
  return (
    status && status !== 'error' && status !== 'warn' && status !== 'info'
  )
}

export function combineLabelledBy(...params) {
  return combineAriaBy('aria-labelledby', params)
}
export function combineDescribedBy(...params) {
  return combineAriaBy('aria-describedby', params)
}
export function combineDetails(...params) {
  return combineAriaBy('aria-details', params)
}
function combineAriaBy(type, params) {
  params = params.map((cur) => {
    if (Array.isArray(cur)) {
      return cur.join(' ')
    }
    if (cur && params.includes(cur[type])) {
      return null
    }
    if (cur && typeof cur[type] !== 'undefined') {
      cur = cur[type]
    }
    if (typeof cur !== 'string') {
      cur = null
    }
    return cur
  })
  params = params.filter(Boolean).join(' ')
  if (params === '') {
    params = undefined
  }
  return params
}

export function findElementInChildren(children, find) {
  if (!Array.isArray(children)) {
    children = [children]
  }

  let result = null
  children.some((cur) => {
    if (cur && cur.props && cur.props.children) {
      const res = findElementInChildren(cur.props.children, find)
      if (res) {
        return (result = res)
      }
    }
    if (React.isValidElement(cur) && find(cur)) {
      return (result = cur)
    }
    return null
  })

  return result
}

export function escapeRegexChars(str) {
  return str.replace(/[-[\]{}()*+?.,\\^$|#]/g, '\\$&')
}

export function removeUndefinedProps(object) {
  Object.keys(object || {}).forEach((key) => {
    if (object[key] === undefined) {
      delete object[key]
    }
  })
  return object
}
