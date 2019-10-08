/**
 * Component helpers
 *
 */

import { registerElement } from './custom-element'
export { registerElement }
import keycode from 'keycode'
import whatInput from 'what-input'

if (
  typeof process !== 'undefined' &&
  process.env.NODE_ENV === 'test' &&
  typeof window !== 'undefined'
) {
  window.IS_TEST = true
}

// run component helper functions
whatInput.specificKeys([9])
defineIsTouch()
defineNavigator()

/**
 * Check if device is touch device or not
 */
export function isTouchDevice() {
  try {
    return (
      !!(
        typeof window !== 'undefined' &&
        ('ontouchstart' in window ||
          (window.DocumentTouch &&
            typeof document !== 'undefined' &&
            document instanceof window.DocumentTouch))
      ) ||
      !!(
        typeof navigator !== 'undefined' &&
        (navigator.maxTouchPoints > 1 || navigator.msMaxTouchPoints > 1)
      )
    )
  } catch (e) {
    console.warn('Could not determine the touch situation:', e)
    return null
  }
}

export function defineIsTouch() {
  const handleDefineTouch = () => {
    if (typeof document === 'undefined' || typeof window === 'undefined')
      return
    try {
      if (isTouchDevice()) {
        document.documentElement.setAttribute('data-is-touch', true)
      }
    } catch (e) {
      console.warn('Could not apply "touch attribute"', e)
    }

    document.removeEventListener('DOMContentLoaded', handleDefineTouch)
  }

  if (
    typeof document !== 'undefined' &&
    document.readyState === 'loading'
  ) {
    document.addEventListener('DOMContentLoaded', handleDefineTouch)
  } else {
    handleDefineTouch()
  }
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
        if (navigator.platform.match(/Mac|iPad|iPhone|iPod/) !== null) {
          document.documentElement.setAttribute('data-os', 'mac')
        } else if (navigator.platform.match('Win') !== null) {
          document.documentElement.setAttribute('data-os', 'win')
        }
      } else {
        document.documentElement.setAttribute('data-os', 'other')
      }
    } catch (e) {
      console.warn('Could not apply "os attribute"', e)
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
      if (attr[0] === '{') attr = JSON.parse(attr)
      if (attr && typeof attr === 'object') {
        Object.entries(attr).forEach(([key, value]) => {
          Object.assign(params, { [key]: value })
        })
      }
    }
  }

  // remove disabled, in case it is false (this is for web components support)
  if (params.disabled === null || String(params.disabled) === 'false') {
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

  // in case disabled is a string, it its enabled, send it in as a true (this is for web components support)
  else if (params.disabled === 'true') {
    params.disabled = true
  }
  if (params.disabled) {
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

export const processChildren = props => {
  const res =
    typeof props.children === 'function'
      ? props.children(props)
      : props.children

  // if we get several react children witch representates only a text
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

// extends given objects recursively and removing entries with null values
export const extend = (...objects) => {
  const list = Array.from(objects)
  const recursive = list[0] !== false
  return list.reduce((acc1, object) => {
    if (object) {
      acc1 = Object.assign(
        acc1,
        Object.entries(object).reduce((acc2, [key, value]) => {
          if (value !== null) {
            if (recursive && typeof value === 'object') {
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
  }, {})
}

// extends props from a given context
// but give the context second priority only
export const extendPropsWithContext = (props, context) =>
  extend(
    false, // prevent recursion
    Object.entries(context).reduce((acc, [key, value]) => {
      if (typeof props[key] !== 'undefined' && value !== null) {
        acc[key] = value
      }
      return acc
    }, {}),
    props
  )

// check if value is "truthy"
export const isTrue = value => {
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
        console.warn('Error on handling dataset:', e)
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
  eventName = transformToReactEventCase(eventName)
  if (typeof props[eventName] === 'function') {
    ret = props[eventName].apply(src, [eventObject])
  }

  return ret
}

// transform on_click to onClick
export const transformToReactEventCase = s =>
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
export const detectOutsideClick = (ignoreElement, onSuccess) =>
  new DetectOutsideClickClass(ignoreElement, onSuccess)

// Used by detectOutsideClick
export class DetectOutsideClickClass {
  constructor(ignoreElement, onSuccess) {
    if (
      !this.handleClickOutside &&
      typeof document !== 'undefined' &&
      typeof window !== 'undefined'
    ) {
      this.handleClickOutside = event => {
        this.checkOutsideClick(
          {
            currentElement: event.target,
            ignoreElement
          },
          () => typeof onSuccess === 'function' && onSuccess({ event })
        )
      }
      document.addEventListener('mousedown', this.handleClickOutside)

      this.keydownCallback = event => {
        const keyCode = keycode(event)
        if (keyCode === 'esc') {
          window.removeEventListener('keydown', this.keydownCallback)
          if (typeof onSuccess === 'function') {
            onSuccess({ event })
          }
        }
      }
      window.addEventListener('keydown', this.keydownCallback)

      // use keyup so we get the correct new target
      this.keyupCallback = event => {
        const keyCode = keycode(event)
        if (
          keyCode === 'tab' &&
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
    { currentElement, ignoreElement },
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
      do {
        if (currentElement === ignoreElement) {
          return // stop here
        }
        currentElement = currentElement.parentNode
      } while (currentElement)

      if (typeof onSuccess === 'function') {
        onSuccess()
      }
    } catch (e) {
      console.warn(e)
    }
  }

  checkIfHasScrollbar = elem => {
    return (
      elem &&
      (elem.scrollHeight > elem.offsetHeight ||
        elem.scrollWidth > elem.offsetWidth) &&
      this.overflowIsScrollable(elem)
    )
  }

  overflowIsScrollable = elem => {
    const style = getComputedStyle(elem)
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

export const makeUniqueId = (pendix = '', length = 8) =>
  pendix +
  String(
    Math.random()
      .toString(36)
      .substr(2, length) + idIncrement++
  ).slice(-length)
let idIncrement = 0

export const slugify = s =>
  String(s)
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')
