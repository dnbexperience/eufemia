/**
 * Component helpers
 *
 */

import { registerElement } from './custom-element'
export { registerElement }

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

  // in case disabled is a string, it its enabled, send it in as a true (this is for web components support)
  else if (params.disabled === 'true') {
    params.disabled = true
  }

  if (props && props.tabindex) {
    let tabIndex = props.tabindex
    if (tabIndex === 'off') {
      tabIndex = '-1'
    }
    params['tabIndex'] = tabIndex
  }

  // add web component event handler
  if (props && typeof props.on_click === 'function') {
    params['onClick'] = props.on_click
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
