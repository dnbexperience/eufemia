/**
 * Component helpers
 *
 */

import { registerElement } from './custom-element'
export { registerElement }
import keycode from 'keycode'
import whatInput from 'what-input'

// run component helper functions
whatInput.specificKeys([9])
defineIsTouch()

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
        (navigator.maxTouchPoints || navigator.msMaxTouchPoints)
      )
    )
  } catch (e) {
    console.log('Could not determine the touch situation:', e)
    return null
  }
}

export function defineIsTouch(runInstantly = true) {
  const handleDefineTouch = () => {
    if (typeof document === 'undefined' || typeof window === 'undefined')
      return
    try {
      if (isTouchDevice()) {
        document.documentElement.setAttribute('dnb-is-touch', true)
      }
    } catch (e) {
      console.log('Could not apply "touch class"', e)
    }

    window.removeEventListener('load', handleDefineTouch)
  }

  if (runInstantly) {
    handleDefineTouch()
  } else if (typeof window !== 'undefined') {
    try {
      window.addEventListener('load', handleDefineTouch)
    } catch (e) {
      console.log('Could not add "load" event listener', e)
    }
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
  if (params.top) {
    delete params.top
  }
  if (params.right) {
    delete params.right
  }
  if (params.bottom) {
    delete params.bottom
  }
  if (params.left) {
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
      if (typeof cV === 'string') {
        pV.push(cV)
      }
      return pV
    }, [])

    // if there was more than one text elements
    if (onlyTexts.length > 1) {
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

export const dispatchCustomElementEvent = (element, eventName, event) => {
  let ret = null

  if (element && element.props && element.props.custom_element) {
    if (typeof element.props.custom_element.fireEvent === 'function') {
      ret = element.props.custom_element.fireEvent(eventName, event)
    }
  }

  if (element && typeof element.props[eventName] === 'function') {
    ret = element.props[eventName].apply(element, [event])
  }

  eventName = transformToReactEventCase(eventName)
  if (element && typeof element.props[eventName] === 'function') {
    ret = element.props[eventName].apply(element, [event])
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

export const setCustomElementMethod = (
  element,
  methodName,
  methodFunc
) => {
  if (element && typeof element.props.custom_method === 'function') {
    element.props.custom_method.apply(element, [methodName, methodFunc])
  }
}

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

export const detectOutsideClick = (element, ignoreElement, onSuccess) => {
  if (
    !element.handleClickOutside &&
    typeof document !== 'undefined' &&
    typeof window !== 'undefined'
  ) {
    element.handleClickOutside = event => {
      checkOutsideClick(
        {
          currentElement: event.target,
          ignoreElement
        },
        () => typeof onSuccess === 'function' && onSuccess({ event })
      )
    }
    document.addEventListener('mousedown', element.handleClickOutside)
    document.addEventListener('touchstart', element.handleClickOutside)

    element.keydownCallback = event => {
      const keyCode = keycode(event)
      if (keyCode === 'esc') {
        window.removeEventListener('keydown', element.keydownCallback)
        if (typeof onSuccess === 'function') {
          onSuccess({ event })
        }
      }
    }
    window.addEventListener('keydown', element.keydownCallback)

    // use keyup so we get the correct new target
    element.keyupCallback = event => {
      const keyCode = keycode(event)
      if (
        keyCode === 'tab' &&
        typeof element.handleClickOutside === 'function'
      ) {
        element.handleClickOutside(event, () => {
          if (element.keyupCallback)
            window.removeEventListener('keyup', element.keyupCallback)
        })
      }
    }
    window.addEventListener('keyup', element.keyupCallback)
  }
}
detectOutsideClick.remove = element => {
  if (element.handleClickOutside && typeof document !== 'undefined') {
    document.removeEventListener('mousedown', element.handleClickOutside)
    document.removeEventListener('touchstart', element.handleClickOutside)
    element.handleClickOutside = null
  }
  if (element.keydownCallback && typeof window !== 'undefined') {
    window.removeEventListener('keydown', element.keydownCallback)
    element.keydownCallback = null
  }
  if (element.keyupCallback && typeof window !== 'undefined') {
    window.removeEventListener('keyup', element.keyupCallback)
    element.keyupCallback = null
  }
}

export const checkOutsideClick = (
  { currentElement, ignoreElement },
  onSuccess = null
) => {
  try {
    let targetElement = currentElement
    do {
      if (targetElement == ignoreElement) {
        return // stop here
      }
      targetElement = targetElement.parentNode
    } while (targetElement)

    if (typeof onSuccess === 'function') {
      onSuccess()
    }
  } catch (e) {
    console.log(e)
  }
}
