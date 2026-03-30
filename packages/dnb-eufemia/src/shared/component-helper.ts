/**
 * Component helpers
 *
 */

import React from 'react'

import { warn } from './helpers'
import { getClosestParent } from './helpers/getClosest'
import { init } from './Eufemia'
import { defineNavigator } from './legacy/component-helper-legacy'

export * from './legacy/component-helper-legacy'
export { InteractionInvalidation } from './helpers/InteractionInvalidation'
export {
  extendPropsWithContext,
  extendPropsWithContextInClassComponent,
} from './helpers/extendPropsWithContext'
export { assignPropsWithContext } from './helpers/assignPropsWithContext'
export { filterProps } from './helpers/filterProps'

export { getClosestParent, warn }

init()

// run component helper functions
defineNavigator()

/** @private */
const startsWithCamelCaseRegex = /(^[a-z]{1,}[A-Z]{1})/
/** @private */
const notOnlyAZOrHyphenRegex = /[^a-z-]/i

/**
 * @deprecated stop using this function as it only removes things that should be handled in the component any documented prop should be explicitly removed, and props should not have default value `null`
 * @description Removes invalid DOM attributes from `params`.
 * @param props properties from `props.attributes` are added to `params`
 * @param params object with DOM attributes
 * @returns `params` cleaned from invalid DOM attributes
 */
export const validateDOMAttributes = (
  /** `null` or an object with property `attributes` that is merged with `params` */
  props: Record<string, any>,
  /** object with DOM attributes */
  params: Record<string, any>
) => {
  // if there is an "attributes" prop, prepare these
  // mostly used for prop example usage
  if (props && props.attributes) {
    const attr = props.attributes
    if (attr && typeof attr === 'object') {
      Object.entries(attr).forEach(([key, value]) => {
        // Prevent prototype pollution
        if (
          key === '__proto__' ||
          key === 'constructor' ||
          key === 'prototype'
        ) {
          return
        }
        Object.assign(params, { [key]: value })
      })
    }
    delete params.attributes
  }

  if (params.disabled === null) {
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
  if (typeof params.noCollapse !== 'undefined') {
    delete params.noCollapse
  }
  if (typeof params.innerSpace !== 'undefined') {
    delete params.innerSpace
  }
  if (typeof params.labelDirection !== 'undefined') {
    delete params.labelDirection
  }

  if (params.disabled === true) {
    params['aria-disabled'] = true
  }

  // make sure we don't return a render prop as a DOM attribute
  if (params && typeof params === 'object') {
    for (const i in params) {
      if (
        // is React
        typeof params[i] === 'function' &&
        // "ref" is a valid React prop (callback ref)
        i !== 'ref' &&
        // only React Style props, like "onClick" are allowed
        // (starts with lowercase letters followed by at least on uppercase letter)
        !startsWithCamelCaseRegex.test(i)
      ) {
        delete params[i]

        // filter out invalid attributes
      } else if (
        // we don't want NULL values
        params[i] === null ||
        // we don't want if there are any characters except "a-z", "A-Z" or "-"
        // Removes non-standard DOM attribute names (e.g. containing underscores)
        notOnlyAZOrHyphenRegex.test(i)
        // (typeof params[i] !== 'string' && /[^a-z-]/i.test(i))
      ) {
        delete params[i]
      }
    }
  }

  return params
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
        if (!Object.hasOwn(source, key)) continue
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

export const dispatchCustomElementEvent = (
  src,
  eventName,
  eventObjectOrig = undefined
) => {
  let ret = undefined

  const eventObject = {
    ...((eventObjectOrig && eventObjectOrig.event) || {}),
    ...eventObjectOrig,
  }

  const props = (src && src.props) || src

  if (typeof props[eventName] === 'function') {
    const r = props[eventName].apply(src, [eventObject])
    if (typeof r !== 'undefined') {
      ret = r
    }
  }

  return ret
}

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

export const makeUniqueId = (prefix = 'id-', length = 8) =>
  prefix +
  String(
    Math.random()
      .toString(36)
      .substring(2, 2 + length) + idIncrement++
  ).slice(-length)
let idIncrement = 0

export const slugify = (s) =>
  String(s)
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '')

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
  return getClosestParent('.dnb-scroll-view', currentElement)
}

export function convertJsxToString(
  elements: React.ReactNode | React.ReactNode[],
  separator: string = undefined,
  transformWord: (
    element: React.ReactElement<any>
  ) => React.ReactElement<any> = undefined
): string {
  if (!Array.isArray(elements)) {
    elements = [elements]
  }

  const process = (word: React.ReactNode) => {
    if (React.isValidElement<any>(word)) {
      let element = word as React.ReactElement<any>

      if (transformWord) {
        element = transformWord(element)
      }

      if (Array.isArray(element.props.children)) {
        word = element.props.children.reduce((acc, word) => {
          if (typeof word !== 'string') {
            word = process(word)
          }
          if (typeof word === 'string') {
            acc = (acc + (separator || '') + word).trim()
          }
          return acc
        }, '')
      } else if (element.props.children) {
        word = element.props.children
        if (typeof word !== 'string') {
          word = process(word)
        }
        if (typeof word === 'string') {
          word = word.trim()
        } else {
          return undefined
        }
      } else {
        return undefined
      }
    }

    return word
  }

  return Array.from(elements)
    .map((word) => process(word))
    .filter(Boolean)
    .join(separator)
    .trim()
}

export function getStatusState(status) {
  return (
    status &&
    status !== 'error' &&
    status !== 'warning' &&
    status !== 'information'
  )
}

export function combineLabelledBy(...params) {
  return combineAriaBy('aria-labelledby', params)
}
export function combineDescribedBy(...params) {
  return combineAriaBy('aria-describedby', params)
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
