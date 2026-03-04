/**
 * Component helpers legacy
 *
 * This is a legacy component.
 */

import React from 'react'
import {
  warn,
  PLATFORM_MAC,
  PLATFORM_WIN,
  PLATFORM_LINUX,
} from '../helpers'

/**
 * Check if device is touch device or not
 */
export function isTouchDevice() {
  if (typeof document !== 'undefined') {
    let intent: string | null = null
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
      if (
        !(
          typeof window !== 'undefined' &&
          (window as Window & { IS_TEST?: boolean }).IS_TEST
        )
      ) {
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

export const processChildren = (props: Record<string, any>) => {
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

/**
 * [detectOutsideClick Detects a click outside a given DOM element]
 * @param  {HTMLElement} ignoreElement [The element we want to protect from a click]
 * @param  {Function} onSuccess     [Will be called on outside click]
 * @param  {Object} [options]      [Options]
 * @return {DetectOutsideClickClass} [A new instance of DetectOutsideClickClass]
 */
export const detectOutsideClick = (
  ignoreElements:
    | HTMLElement
    | HTMLElement[]
    | React.RefObject<HTMLElement>[],
  onSuccess: (args: { event: Event }) => void,
  options?: { includedKeys?: string[] }
) => new DetectOutsideClickClass(ignoreElements, onSuccess, options)

// Used by detectOutsideClick
export class DetectOutsideClickClass {
  handleClickOutside:
    | ((event: Event, onDone?: () => void) => void)
    | null = null

  keydownCallback: ((event: KeyboardEvent) => void) | null = null
  keyupCallback: ((event: KeyboardEvent) => void) | null = null

  constructor(
    ignoreElementsInput:
      | HTMLElement
      | HTMLElement[]
      | React.RefObject<HTMLElement>[],
    onSuccess: (args: { event: Event }) => void,
    options: { includedKeys?: string[] } = {}
  ) {
    const ignoreElements: (HTMLElement | React.RefObject<HTMLElement>)[] =
      Array.isArray(ignoreElementsInput)
        ? ignoreElementsInput
        : [ignoreElementsInput]

    if (
      !this.handleClickOutside &&
      typeof document !== 'undefined' &&
      typeof window !== 'undefined'
    ) {
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
        if (event.key === 'Escape') {
          window.removeEventListener('keydown', this.keydownCallback)
          if (typeof onSuccess === 'function') {
            onSuccess({ event })
          }
        }
      }
      window.addEventListener('keydown', this.keydownCallback)

      // e.g. includedKeys = ['Tab']
      if (options.includedKeys) {
        // use keyup so we get the correct new target
        this.keyupCallback = (event) => {
          if (
            options.includedKeys.includes(event.key) &&
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
    {
      event,
      ignoreElements,
    }: {
      event: Event
      ignoreElements: (HTMLElement | React.RefObject<HTMLElement> | null)[]
    },
    onSuccess: (() => void) | null = null
  ) => {
    try {
      const currentElement = event.target as HTMLElement | null

      // we also check if currentElement is documentElement
      // and if it has scrollbars, we then ignore the click
      if (
        currentElement?.tagName === 'HTML' &&
        ((event as MouseEvent).pageX >
          document.documentElement.clientWidth - 40 ||
          (event as MouseEvent).pageY >
            document.documentElement.clientHeight - 40)
      ) {
        return // stop here
      }

      // check if element has e.g. "overflow: scroll"
      if (checkIfHasScrollbar(currentElement)) {
        return // stop here
      }

      // check the rest
      for (let i = 0, elem, l = ignoreElements.length; i < l; ++i) {
        // Allow for comparing ref elements that are rendered conditionally,
        // That might be `null` or ´undefined` during the construction stage of this class

        const ignoreElement =
          ignoreElements[i] &&
          ignoreElements[i] !== null &&
          'current' in ignoreElements[i]
            ? (ignoreElements[i] as React.RefObject<HTMLElement>).current
            : (ignoreElements[i] as HTMLElement)

        elem = currentElement
        if (!ignoreElements[i]) {
          continue
        }
        do {
          if (elem === ignoreElement) {
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

export const checkIfHasScrollbar = (elem: HTMLElement | null) => {
  return (
    elem &&
    (elem.scrollHeight > elem.offsetHeight ||
      elem.scrollWidth > elem.offsetWidth) &&
    overflowIsScrollable(elem)
  )
}

const overflowIsScrollable = (elem: Element) => {
  if (typeof window === 'undefined') {
    return false
  }

  const style = window.getComputedStyle(elem)
  return /scroll|auto/i.test(
    (style.overflow || '') +
      (style.overflowX || '') +
      (style.overflowY || '')
  )
}
