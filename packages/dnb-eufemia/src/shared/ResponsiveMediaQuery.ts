import type { RefObject } from 'react'
import type {
  MediaQueryBreakpoints,
  MediaQueryCondition,
  MediaQueryOptions,
  MediaQueryProperties,
} from './MediaQueryUtils'
import { makeMediaQueryList } from './MediaQueryUtils'

export type ResponsiveConfig =
  | { target: 'viewport'; offset?: number }
  | { target: 'container'; containerRef: RefObject<HTMLElement | null> }

const widthProperties = new Set(['min', 'max', 'minWidth', 'maxWidth'])

function length(value: unknown, breakpoints: MediaQueryBreakpoints) {
  if (typeof value !== 'string' && typeof value !== 'number') {
    throw new Error(
      'Responsive width conditions require a breakpoint name, px, em, or rem value.'
    )
  }
  const resolved = breakpoints?.[value] ?? value
  const text =
    typeof resolved === 'number' ? resolved + 'em' : String(resolved)
  if (text === '0') {
    return { value: 0, unit: 'px' }
  }
  const match = /^([0-9]*[.]?[0-9]+)(px|em|rem)$/.exec(text)
  if (!match) {
    throw new Error(
      'Responsive width conditions require a breakpoint name, px, em, or rem value.'
    )
  }
  return { value: Number(match[1]), unit: match[2] }
}

export function offsetConditions(
  when: MediaQueryProperties['when'],
  offset: number,
  breakpoints: MediaQueryBreakpoints,
  correctRange: boolean
): MediaQueryProperties['when'] {
  if (!Number.isFinite(offset) || offset < 0) {
    throw new Error(
      'Responsive offset must be a finite, non-negative number of CSS pixels.'
    )
  }
  if (!offset || !when || typeof when === 'string') {
    return when
  }
  if (Array.isArray(when)) {
    return when.map((condition) =>
      offsetConditions(condition, offset, breakpoints, correctRange)
    ) as MediaQueryCondition[]
  }
  return Object.fromEntries(
    Object.entries(when).map(([key, value]) => {
      if (!widthProperties.has(key)) {
        return [key, value]
      }
      const size = length(value, breakpoints)
      if (!size.value && (key === 'min' || key === 'minWidth')) {
        return [key, '0px']
      }
      const correction =
        correctRange &&
        (key === 'min' || key === 'minWidth') &&
        size.unit === 'em' &&
        Number.isInteger(size.value) &&
        size.value > 0
          ? 0.00625
          : 0
      return [
        key,
        'calc(' +
          (size.value + correction) +
          size.unit +
          ' + ' +
          offset +
          'px)',
      ]
    })
  )
}

type ContainerObserver = {
  subscribe: (listener: () => void) => () => void
}
const observers = new WeakMap<HTMLElement, ContainerObserver>()
const observedWidths = new WeakMap<HTMLElement, number>()

function observeContainer(element: HTMLElement): ContainerObserver {
  const existing = observers.get(element)
  if (existing) {
    return existing
  }
  const listeners = new Set<() => void>()
  const notify = () => listeners.forEach((listener) => listener())
  const observer =
    typeof ResizeObserver === 'undefined'
      ? undefined
      : new ResizeObserver((entries) => {
          const entry = entries.find(({ target }) => target === element)
          if (entry) {
            observedWidths.set(element, entry.contentRect.width)
          }
          notify()
        })
  // Observe an em-sized probe so font-size changes also update queries.
  const probe = element.ownerDocument.createElement('span')
  probe.setAttribute('aria-hidden', 'true')
  probe.style.cssText =
    'position:absolute;visibility:hidden;pointer-events:none;font:inherit;box-sizing:content-box;padding:0;border:0;width:1em;height:0;overflow:hidden;'
  element.appendChild(probe)
  observer?.observe(element)
  observer?.observe(probe)
  const rootProbe = probe.cloneNode() as HTMLElement
  rootProbe.style.width = '1rem'
  element.appendChild(rootProbe)
  observer?.observe(rootProbe)
  const store = {
    subscribe(listener: () => void) {
      listeners.add(listener)
      return () => {
        listeners.delete(listener)
        if (!listeners.size) {
          observer?.disconnect()
          probe.remove()
          rootProbe.remove()
          observers.delete(element)
          observedWidths.delete(element)
        }
      }
    },
  }
  observers.set(element, store)
  return store
}

function contentWidth(element: HTMLElement) {
  const observed = observedWidths.get(element)
  if (observed !== undefined) {
    return observed
  }
  const style = getComputedStyle(element)
  const width = parseFloat(style.width)
  if (!Number.isFinite(width)) {
    return 0
  }
  return Math.max(
    0,
    width -
      (style.boxSizing === 'border-box'
        ? (parseFloat(style.paddingLeft) || 0) +
          (parseFloat(style.paddingRight) || 0) +
          (parseFloat(style.borderLeftWidth) || 0) +
          (parseFloat(style.borderRightWidth) || 0)
        : 0)
  )
}

/** A MediaQueryList-compatible subscription for structured container width conditions. */
export function makeContainerQueryList(
  element: HTMLElement | null,
  { when, not }: MediaQueryProperties,
  breakpoints: MediaQueryBreakpoints,
  options: MediaQueryOptions
): MediaQueryList {
  const lists: MediaQueryList[] = []
  const compile = (condition: MediaQueryCondition): (() => boolean) => {
    if (typeof condition === 'string') {
      throw new Error(
        'Container queries require structured width conditions. Use target="viewport" for raw media queries.'
      )
    }
    const { not: conditionNot, ...conditions } = condition
    const widths = Object.entries(conditions)
      .filter(([key]) => widthProperties.has(key))
      .map(([key, value]) => ({ key, ...length(value, breakpoints) }))
    const device = Object.fromEntries(
      Object.entries(conditions).filter(
        ([key]) => !widthProperties.has(key)
      )
    )
    const deviceList = Object.keys(device).length
      ? makeMediaQueryList({ when: device }, breakpoints, {
          ...options,
          responsive: undefined,
        })
      : undefined
    if (deviceList) {
      lists.push(deviceList)
    }
    return () => {
      const width = element ? contentWidth(element) : 0
      const fontSize = element
        ? parseFloat(getComputedStyle(element).fontSize)
        : 0
      const rootFontSize = element
        ? parseFloat(
            getComputedStyle(element.ownerDocument.documentElement)
              .fontSize
          )
        : 0
      const matches =
        (!deviceList || deviceList.matches) &&
        widths.every(({ key, value, unit }) => {
          const threshold =
            value *
            (unit === 'em' ? fontSize : unit === 'rem' ? rootFontSize : 1)
          if (key === 'min' || key === 'minWidth') {
            return options.correctRange !== false && threshold > 0
              ? width > threshold
              : width >= threshold
          }
          return width <= threshold
        })
      return conditionNot ? !matches : matches
    }
  }
  const conditions = Array.isArray(when) ? when : [when]
  const groups: Array<Array<() => boolean>> = []
  conditions.forEach((condition, index) => {
    if (condition === 'and') {
      return
    }
    if (conditions[index - 1] !== 'and') {
      groups.push([])
    }
    groups.at(-1).push(compile(condition))
  })
  const evaluate = () => {
    if (!element || typeof ResizeObserver === 'undefined') {
      return false
    }
    const matches = groups.some((group) => group.every((test) => test()))
    return not ? !matches : matches
  }
  const subscriptions = new Map<
    EventListenerOrEventListenerObject,
    () => void
  >()
  return {
    get matches() {
      return evaluate()
    },
    addEventListener(
      _event: string,
      listener: EventListenerOrEventListenerObject
    ) {
      if (subscriptions.has(listener)) {
        return
      }
      let previous = evaluate()
      const notify = () => {
        const matches = evaluate()
        if (matches === previous) {
          return
        }
        previous = matches
        const event = { matches } as MediaQueryListEvent
        if (typeof listener === 'function') {
          listener(event)
        } else {
          listener.handleEvent(event)
        }
      }
      const unsubscribe = element
        ? observeContainer(element).subscribe(notify)
        : () => undefined
      lists.forEach((list) => list.addEventListener('change', notify))
      subscriptions.set(listener, () => {
        unsubscribe()
        lists.forEach((list) => list.removeEventListener('change', notify))
      })
    },
    removeEventListener(
      _event: string,
      listener: EventListenerOrEventListenerObject
    ) {
      subscriptions.get(listener)?.()
      subscriptions.delete(listener)
    },
  } as unknown as MediaQueryList
}
