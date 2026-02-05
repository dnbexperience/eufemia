/**
 * Component helpers legacy
 *
 * These are functions for ../component-helper.ts that have yet to be refactored to typescript.
 */

import React from 'react'
import keycode from '../keycode'
import {
  warn,
  PLATFORM_MAC,
  PLATFORM_WIN,
  PLATFORM_LINUX,
} from '../helpers'

/**
 * Check if device is touch device or not
 */
export function isTouchDevice(): boolean {
  if (typeof document !== 'undefined') {
    let intent: string | null = null

    try {
      intent = document.documentElement.getAttribute('data-whatintent')
    } catch (e) {
      // stop here
    }

    return intent === 'touch'
  }

  return false
}

export function defineNavigator(): void {
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
          (window as unknown as { IS_TEST?: boolean }).IS_TEST
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

export const processChildren = (props: {
  children?: React.ReactNode | ((props: unknown) => React.ReactNode)
  [key: string]: unknown
}): React.ReactNode => {
  if (!props) {
    return null
  }

  // If used in WB, call functions who starts with "render_"
  if (
    typeof global !== 'undefined' &&
    'registeredElements' in global &&
    Array.isArray(
      (global as { registeredElements: unknown[] }).registeredElements
    ) &&
    (global as { registeredElements: unknown[] }).registeredElements
      .length > 0
  ) {
    let cache: React.ReactElement | null = null
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
            return (cache = React.createElement(
              React.Fragment,
              { key },
              cb(props)
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
    const onlyTexts = res.reduce<(string | number)[]>((pV, cV) => {
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

type DetectOutsideClickOptions = {
  includedKeys?: string[]
}

type DetectOutsideClickCallback = (params: {
  event: Event | KeyboardEvent | MouseEvent
}) => void

/**
 * [detectOutsideClick Detects a click outside a given DOM element]
 * @param  {HTMLElement | HTMLElement[] | React.RefObject<HTMLElement> | React.RefObject<HTMLElement>[]} ignoreElements [The elements we want to protect from a click]
 * @param  {Function} onSuccess [Will be called on outside click]
 * @param  {Object} [options] [Options]
 * @return {DetectOutsideClickClass} [A new instance of DetectOutsideClickClass]
 */
export const detectOutsideClick = (
  ignoreElements:
    | HTMLElement
    | HTMLElement[]
    | React.RefObject<HTMLElement>
    | React.RefObject<HTMLElement>[],
  onSuccess: DetectOutsideClickCallback,
  options?: DetectOutsideClickOptions
): DetectOutsideClickClass =>
  new DetectOutsideClickClass(ignoreElements, onSuccess, options)

/**
 * Used by detectOutsideClick
 */
export class DetectOutsideClickClass {
  private handleClickOutside: ((event: Event) => void) | null = null
  private keydownCallback: ((event: KeyboardEvent) => void) | null = null
  private keyupCallback: ((event: KeyboardEvent) => void) | null = null

  constructor(
    ignoreElements:
      | HTMLElement
      | HTMLElement[]
      | React.RefObject<HTMLElement>
      | React.RefObject<HTMLElement>[],
    onSuccess: DetectOutsideClickCallback,
    options: DetectOutsideClickOptions = {}
  ) {
    if (
      !this.handleClickOutside &&
      typeof document !== 'undefined' &&
      typeof window !== 'undefined'
    ) {
      let ignoreElementsArray: (
        | HTMLElement
        | React.RefObject<HTMLElement>
      )[]
      if (!Array.isArray(ignoreElements)) {
        ignoreElementsArray = [ignoreElements]
      } else {
        ignoreElementsArray = ignoreElements
      }
      this.handleClickOutside = (event: Event) => {
        this.checkOutsideClick(
          {
            event,
            ignoreElements: ignoreElementsArray,
          },
          () => typeof onSuccess === 'function' && onSuccess({ event })
        )
      }
      document.addEventListener('mousedown', this.handleClickOutside)

      this.keydownCallback = (event: KeyboardEvent) => {
        const keyCode = keycode(event)
        if (keyCode === 'esc') {
          window.removeEventListener('keydown', this.keydownCallback!)
          if (typeof onSuccess === 'function') {
            onSuccess({ event })
          }
        }
      }
      window.addEventListener('keydown', this.keydownCallback)

      // e.g. includedKeys = ['tab']
      if (options.includedKeys) {
        // use keyup so we get the correct new target
        this.keyupCallback = (event: KeyboardEvent) => {
          const keyCode = keycode(event)
          if (
            options.includedKeys?.includes(keyCode) &&
            typeof this.handleClickOutside === 'function'
          ) {
            this.handleClickOutside(event as unknown as Event)
            if (this.keyupCallback) {
              window.removeEventListener('keyup', this.keyupCallback)
            }
          }
        }
        window.addEventListener('keyup', this.keyupCallback)
      }
    }
  }

  remove(): void {
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
      ignoreElements: (HTMLElement | React.RefObject<HTMLElement>)[]
    },
    onSuccess: (() => void) | null = null
  ): void => {
    try {
      const currentElement = event.target as HTMLElement

      // we also check if currentElement is documentElement
      // and if it has scrollbars, we then ignore the click
      const pageX = 'pageX' in event ? (event.pageX as number) : 0
      const pageY = 'pageY' in event ? (event.pageY as number) : 0

      if (
        currentElement?.tagName === 'HTML' &&
        (pageX > document.documentElement.clientWidth - 40 ||
          pageY > document.documentElement.clientHeight - 40)
      ) {
        return // stop here
      }

      // check if element has e.g. "overflow: scroll"
      if (checkIfHasScrollbar(currentElement)) {
        return // stop here
      }

      // check the rest
      for (let i = 0, l = ignoreElements.length; i < l; ++i) {
        // Allow for comparing ref elements that are rendered conditionally,
        // That might be `null` or `undefined` during the construction stage of this class

        const ignoreElement =
          ignoreElements[i] && 'current' in ignoreElements[i]
            ? (ignoreElements[i] as React.RefObject<HTMLElement>).current
            : (ignoreElements[i] as HTMLElement)

        let elem: HTMLElement | null = currentElement
        if (!ignoreElements[i]) {
          continue
        }
        do {
          if (elem === ignoreElement) {
            return // stop here
          }
          elem = elem ? (elem.parentNode as HTMLElement) : null
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

export const checkIfHasScrollbar = (elem: HTMLElement): boolean => {
  return (
    elem &&
    (elem.scrollHeight > elem.offsetHeight ||
      elem.scrollWidth > elem.offsetWidth) &&
    overflowIsScrollable(elem)
  )
}

const overflowIsScrollable = (elem: HTMLElement): boolean => {
  const style =
    typeof window !== 'undefined'
      ? window.getComputedStyle(elem)
      : ({} as CSSStyleDeclaration)
  return /scroll|auto/i.test(
    (style.overflow || '') +
      (style.overflowX || '') +
      (style.overflowY || '')
  )
}
