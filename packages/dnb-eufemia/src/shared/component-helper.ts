/**
 * Component helpers
 *
 */

import React from 'react'

import whatInput from './helpers/whatInput'
import { warn } from './helpers'
import { getClosestParent } from './helpers/getClosest'
import { init } from './Eufemia'
import { defineNavigator } from './legacy/component-helper-legacy'

export * from './legacy/component-helper-legacy'
export { InteractionInvalidation } from './helpers/InteractionInvalidation'
export {
  extendPropsWithContext,
  extendExistingPropsWithContext,
} from './helpers/extendPropsWithContext'
export { assignPropsWithContext } from './helpers/assignPropsWithContext'
export { filterProps } from './helpers/filterProps'

export { getClosestParent, warn }

init()

// run component helper functions
whatInput.specificKeys([9])
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

export function isObject(item: unknown): item is Record<string, unknown> {
  return (
    item !== null &&
    item !== undefined &&
    typeof item === 'object' &&
    !Array.isArray(item)
  )
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
  src: Record<string, unknown> | { props?: Record<string, unknown> },
  eventName: string,
  eventObjectOrig: Record<string, unknown> | undefined = undefined
) => {
  let ret = undefined

  const eventObject = {
    ...((eventObjectOrig?.event &&
      typeof eventObjectOrig.event === 'object' &&
      eventObjectOrig.event) ||
      {}),
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
export const toPascalCase = (s: string) =>
  s
    .split(/_/g)
    .reduce(
      (acc: string, cur: string) =>
        acc +
        cur.replace(
          /(\w)(\w*)/g,
          (_g0: string, g1: string, g2: string) =>
            g1.toUpperCase() + g2.toLowerCase()
        ),
      ''
    )

// transform MyComponent to my-component
export const toKebabCase = (str: string) =>
  str.replace(/\B[A-Z]/g, (letter: string) => `-${letter}`).toLowerCase()

export function toCapitalized(str: string): string
export function toCapitalized(str: unknown): unknown
export function toCapitalized(str: unknown) {
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

export const slugify = (s: unknown) =>
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
export const isChildOfElement = (
  element: HTMLElement | EventTarget | null,
  target: HTMLElement | EventTarget | null,
  callback: ((element: HTMLElement) => boolean) | null = null
) => {
  try {
    const contains = (el: HTMLElement | EventTarget | null) => {
      if (callback && el instanceof HTMLElement) {
        const res = callback(el)
        if (res) {
          return el
        }
      }
      return el && el === target
    }

    if (contains(element)) {
      return element
    }

    while (
      (element = element && (element as HTMLElement).parentElement) &&
      !contains(element)
    );
  } catch (e) {
    //
  }

  return element
}

// Round number to nearest target number
export const roundToNearest = (num: number, target: number) => {
  const diff = num % target
  return diff > target / 2 ? num - diff + target : num - diff
}

export const getClosestScrollViewElement = (
  currentElement: HTMLElement
) => {
  return getClosestParent('.dnb-scroll-view', currentElement)
}

export function convertJsxToString(
  elements: React.ReactNode | React.ReactNode[],
  separator: string = undefined,
  transformWord: (
    element: React.ReactElement<Record<string, unknown>>
  ) => React.ReactElement<Record<string, unknown>> = undefined
): string {
  if (!Array.isArray(elements)) {
    elements = [elements]
  }

  const process = (word: React.ReactNode) => {
    if (React.isValidElement(word)) {
      let element = word as React.ReactElement<Record<string, unknown>>

      if (transformWord) {
        element = transformWord(element)
      }

      if (Array.isArray(element.props.children)) {
        word = element.props.children.reduce(
          (acc: string, word: React.ReactNode) => {
            if (typeof word !== 'string') {
              word = process(word)
            }
            if (typeof word === 'string') {
              acc = (acc + (separator || '') + word).trim()
            }
            return acc
          },
          ''
        )
      } else if (element.props.children) {
        word = element.props.children as React.ReactNode
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

export function getStatusState(status: unknown) {
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
function combineAriaBy(type: string, params: unknown[]) {
  const mapped = params
    .map((cur: unknown) => {
      if (Array.isArray(cur)) {
        return cur.join(' ')
      }
      if (cur && typeof cur === 'object' && type in cur) {
        const value = (cur as Record<string, unknown>)[type]
        if (params.includes(value)) {
          return null
        }
        return value as string
      }
      if (typeof cur !== 'string') {
        return null
      }
      return cur
    })
    .filter(Boolean)
    .join(' ')

  return mapped || undefined
}

export function findElementInChildren(
  children: React.ReactNode | React.ReactNode[],
  find: (element: React.ReactElement) => boolean
) {
  if (!Array.isArray(children)) {
    children = [children]
  }

  let result: React.ReactElement | null = null
  ;(children as React.ReactNode[]).some((cur: React.ReactNode) => {
    if (
      cur &&
      React.isValidElement(cur) &&
      (cur as React.ReactElement<{ children?: React.ReactNode }>).props
        .children
    ) {
      const res = findElementInChildren(
        (cur as React.ReactElement<{ children?: React.ReactNode }>).props
          .children,
        find
      )
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

export function escapeRegexChars(str: string) {
  return str.replace(/[-[\]{}()*+?.,\\^$|#]/g, '\\$&')
}

// Return type is intentionally `any` – this function is used as a pass-through
// whose result is spread into diverse component prop types.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function removeUndefinedProps<T extends Record<string, any>>(
  object: T
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): any {
  Object.keys(object || {}).forEach((key) => {
    if (object[key] === undefined) {
      delete object[key]
    }
  })
  return object
}
