/**
 * Component helpers
 *
 */

import { registerElement } from './custom-element'
import whatInput from 'what-input' // More flexible solution

// IE 11: as we don't need to change CSS Custom Properties in runtime, we don't use this for now
// import cssVars from 'css-vars-ponyfill'
// cssVars()

whatInput.specificKeys([9])

export { registerElement }

export const defineIsTouch = (runInstantly = true) => {
  const handleDefineTouch = () => {
    /**
     * Check if device is touch device or not
     */
    const isTouchDevice = () => {
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
    }

    //Adds class to <body> depending on if isTouchDevice()
    if (typeof document !== 'undefined') {
      const touchClass = isTouchDevice() ? 'touch' : 'no-touch'
      document.body.classList.add(touchClass)
    }
  }

  if (runInstantly) {
    handleDefineTouch()
  } else if (typeof window !== 'undefined') {
    window.addEventListener('load', handleDefineTouch)
  }

  return handleDefineTouch
}

defineIsTouch(true)

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
  if (params.disabled !== null && String(params.disabled) === 'false') {
    delete params.disabled
  }

  // add web component event handler
  if (props && typeof props.on_click === 'function') {
    params['onClick'] = props.on_click
  }

  // make sure we don't return a render prop as a DOM attribute
  if (props && params) {
    for (let i in params) {
      if (
        typeof params[i] === 'function' &&
        // only React Style props, like onClick
        !/(^[a-z]{1,}[A-Z]{1})/.test(i)
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
  if (Array.isArray(res)) {
    return res.reduce((pV, cV) => {
      if (typeof cV === 'string') {
        pV += cV
      }
      if (typeof cV === 'object') {
        if (typeof pV === 'string') {
          pV = []
        }
        pV.push(cV)
        return pV
      }
      return pV
    }, '')
  }
  return res
}

export const dispatchCustomElementEvent = (element, eventName, event) => {
  if (element && element.props && element.props.custom_element) {
    if (typeof element.props.custom_element.fireEvent === 'function') {
      element.props.custom_element.fireEvent(eventName, event)
    }
  }

  if (element && typeof element.props[eventName] === 'function') {
    element.props[eventName].apply(element, [event]) // TODO: remove this because of security notation
  }
}

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
