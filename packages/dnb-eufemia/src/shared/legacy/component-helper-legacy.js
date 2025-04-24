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
        // Allow for comparing ref elements that are rendered conditionally,
        // That might be `null` or ´undefined` during the construction stage of this class

        const ignoreElement =
          ignoreElements[i] && 'current' in ignoreElements[i]
            ? ignoreElements[i].current
            : ignoreElements[i]

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
