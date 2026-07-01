/**
 * Helper tests
 *
 */

import type { RefObject } from 'react'
import { render } from '@testing-library/react'

import {
  extendDeep,
  defineNavigator,
  mergeAttributes,
  processChildren,
  dispatchCustomElementEvent,
  toPascalCase,
  toKebabCase,
  toCapitalized,
  checkIfHasScrollbar,
  detectOutsideClick,
  makeUniqueId,
  isTouchDevice,
  slugify,
  roundToNearest,
  findElementInChildren,
  convertJsxToString,
  escapeRegexChars,
  removeUndefinedProps,
  removeNullProps,
} from '../component-helper'
import userEvent from '@testing-library/user-event'

beforeAll(() => {
  // @ts-expect-error mocking PointerEvent for touch detection
  window.PointerEvent = new CustomEvent('ontouchstart')
  Object.defineProperty(navigator, 'maxTouchPoints', {
    value: 2,
    writable: true,
    configurable: true,
  })

  vi.spyOn(global.console, 'log')
})
afterAll(() => {
  document.documentElement.removeAttribute('data-is-touch')
  window.PointerEvent = undefined
  Object.defineProperty(navigator, 'maxTouchPoints', {
    value: 0,
    writable: true,
    configurable: true,
  })
})

describe('"isTouchDevice" should', () => {
  it('return false if what-input did not run', () => {
    expect(isTouchDevice()).toBe(false)
  })
  it('return true if device is touch', () => {
    document.documentElement.setAttribute('data-whatintent', 'touch')
    expect(isTouchDevice()).toBe(true)
    document.documentElement.removeAttribute('data-whatintent')
  })
})

describe('"defineNavigator" should', () => {
  it('add "os" as an attribute to the HTML tag', () => {
    globalThis.IS_TEST = true
    defineNavigator()
    expect(document.documentElement.getAttribute('data-os')).toBe('other')
    globalThis.IS_TEST = false
  })
})

describe('"detectOutsideClick" should', () => {
  vi.spyOn(
    document.documentElement,
    'clientWidth',
    'get'
  ).mockImplementation(() => 200)
  vi.spyOn(
    document.documentElement,
    'clientHeight',
    'get'
  ).mockImplementation(() => 200)

  it('detect a click outside of our scope element', () => {
    // create some DOM elements
    const inside = document.createElement('BUTTON')
    const outside = document.createElement('DIV')
    const wrapperWithScrollbar = document.createElement('DIV')
    outside.appendChild(inside)
    wrapperWithScrollbar.appendChild(outside)
    document.body.appendChild(wrapperWithScrollbar)

    // give the scroll wrapper some styles and mock the offset- and scroll width
    wrapperWithScrollbar.style = 'overflow: auto scroll;'
    Object.defineProperty(wrapperWithScrollbar, 'scrollWidth', {
      configurable: true,
      value: 200,
    })
    Object.defineProperty(wrapperWithScrollbar, 'offsetWidth', {
      configurable: true,
      value: 100,
    })

    const testEvent = ({ mockedEvent, event, calledTimes }) => {
      const outsideClick = detectOutsideClick(inside, mockedEvent)

      // and dispatch it 3 time
      document.childNodes[1].dispatchEvent(event) // ignore
      document.body.dispatchEvent(event) // count
      outside.dispatchEvent(event) // count
      wrapperWithScrollbar.dispatchEvent(event) // ignore
      inside.dispatchEvent(event) // ignore

      // but since "inside" is protected, it should not call the callback
      expect(mockedEvent).toHaveBeenCalledTimes(calledTimes)

      // remove the detection
      outsideClick.remove()

      // call again outside
      outside.dispatchEvent(event)

      // but we don't expect more event calls
      expect(mockedEvent).toHaveBeenCalledTimes(calledTimes)
    }

    const event = new CustomEvent('mousedown', {
      bubbles: true,
    }) as CustomEvent & { pageX: number; pageY: number }
    event.pageX = 300 // over 200 clientWidth
    event.pageY = 0

    // test mousedown
    testEvent({
      event,
      mockedEvent: vi.fn(),
      calledTimes: 2,
    })
    event.pageX = 0
    event.pageY = 300 // over 200 clientHeight

    // test mousedown
    testEvent({
      event,
      mockedEvent: vi.fn(),
      calledTimes: 2,
    })

    event.pageX = 100
    event.pageY = 100

    // test mousedown
    testEvent({
      event,
      mockedEvent: vi.fn(),
      calledTimes: 3,
    })
  })

  it('should support react refs as ignore element', async () => {
    // Set PointerEvent to undefined to prevent the await keyword from failing this test
    // Is there perhaps a better way to handle this?
    window.PointerEvent = undefined

    const ignoreElementRef: RefObject<HTMLDivElement | null> = {
      current: null,
    }
    const wrapperElementRef: RefObject<HTMLDivElement | null> = {
      current: null,
    }
    const onSuccess = vi.fn()

    const Component = () => {
      detectOutsideClick(
        ignoreElementRef as unknown as HTMLElement,
        onSuccess
      )
      return (
        <div ref={wrapperElementRef}>
          <div ref={ignoreElementRef} />
        </div>
      )
    }

    render(<Component />)

    await userEvent.click(ignoreElementRef.current!)
    expect(onSuccess).toHaveBeenCalledTimes(0)

    await userEvent.click(wrapperElementRef.current!)
    expect(onSuccess).toHaveBeenCalledTimes(1)

    await userEvent.click(ignoreElementRef.current!)
    expect(onSuccess).toHaveBeenCalledTimes(1)

    await userEvent.click(wrapperElementRef.current!)
    expect(onSuccess).toHaveBeenCalledTimes(2)
  })

  it('should not throw an error when "ignoreElementRef" is undefined', async () => {
    const log = vi.spyOn(console, 'log').mockImplementation(() => {})

    window.PointerEvent = undefined
    const ignoreElementRef = undefined

    const MockComponent = () => {
      // @ts-expect-error testing undefined ignoreElementRef
      detectOutsideClick(ignoreElementRef)
      return null
    }

    render(<MockComponent />)

    await userEvent.click(document.body)

    expect(log).toHaveBeenCalledTimes(0)
    log.mockRestore()
  })
})

describe('"checkIfHasScrollbar" should', () => {
  it('detect if an element has a scrollbar', () => {
    // create some DOM elements
    const inside = document.createElement('BUTTON')
    const outside = document.createElement('DIV')
    const wrapperWithScrollbar = document.createElement('DIV')
    outside.appendChild(inside)
    wrapperWithScrollbar.appendChild(outside)
    document.body.appendChild(wrapperWithScrollbar)

    // give the scroll wrapper some styles and mock the offset- and scroll width
    wrapperWithScrollbar.style = 'overflow: auto scroll;'

    const changeProperty = (prop, value) => {
      Object.defineProperty(wrapperWithScrollbar, prop, {
        configurable: true,
        value,
      })
    }

    changeProperty('scrollWidth', 200)
    changeProperty('offsetWidth', 100)
    expect(checkIfHasScrollbar(wrapperWithScrollbar)).toBe(true)

    changeProperty('scrollWidth', 100)
    changeProperty('offsetWidth', 200)
    expect(checkIfHasScrollbar(wrapperWithScrollbar)).toBe(false)

    changeProperty('scrollWidth', undefined)
    changeProperty('offsetWidth', undefined)

    changeProperty('scrollHeight', 200)
    changeProperty('offsetHeight', 100)
    expect(checkIfHasScrollbar(wrapperWithScrollbar)).toBe(true)

    changeProperty('scrollHeight', 100)
    changeProperty('offsetHeight', 200)
    expect(checkIfHasScrollbar(wrapperWithScrollbar)).toBe(false)
  })
})

describe('"mergeAttributes" should', () => {
  it('merge attribute contents onto the target and return it', () => {
    const params = { id: 'x' }
    const res = mergeAttributes(params, {
      'data-foo': 'bar',
      role: 'note',
    })
    expect(res).toBe(params)
    expect(res).toEqual({ id: 'x', 'data-foo': 'bar', role: 'note' })
  })

  it('ignore nullish or non-object attributes', () => {
    expect(mergeAttributes({ id: 'x' }, undefined)).toEqual({ id: 'x' })
    expect(mergeAttributes({ id: 'x' }, null)).toEqual({ id: 'x' })
    expect(mergeAttributes({ id: 'x' }, 'nope')).toEqual({ id: 'x' })
  })

  it('prevent prototype pollution', () => {
    const params: Record<string, unknown> = {}
    const res = mergeAttributes(params, {
      constructor: { polluted: 'value' },
      prototype: { polluted: 'value' },
      safeKey: 'safeValue',
    })

    expect(res).toHaveProperty('safeKey', 'safeValue')
    expect(Object.prototype.hasOwnProperty.call(res, 'constructor')).toBe(
      false
    )
    expect(Object.prototype.hasOwnProperty.call(res, 'prototype')).toBe(
      false
    )
    expect(({} as Record<string, unknown>).polluted).toBeUndefined()
  })

  it('prevent prototype pollution via a JSON-sourced "__proto__" key', () => {
    // A literal `{ __proto__: ... }` sets the prototype rather than creating
    // an own key, so it never reaches the guard. `JSON.parse` creates a real,
    // enumerable `__proto__` key — the actual attack vector. Without the
    // guard, `params['__proto__'] = value` reassigns the target's prototype
    // (so `params.polluted` would resolve through it).
    const attributes = JSON.parse(
      '{"__proto__":{"polluted":"yes"},"safeKey":"safeValue"}'
    )
    const params: Record<string, unknown> = {}
    const res = mergeAttributes(params, attributes)

    expect(res).toHaveProperty('safeKey', 'safeValue')
    expect(Object.getPrototypeOf(res)).toBe(Object.prototype)
    expect(res.polluted).toBeUndefined()
    expect(({} as Record<string, unknown>).polluted).toBeUndefined()
  })
})

describe('"processChildren" should', () => {
  it('return a joined string if we send in a children property with an array', () => {
    const children = ['foo', 'bar', 123]
    const props = { children }
    const res = processChildren(props)
    expect(res).toMatch(children.join(''))
  })

  it('return a joined string if we send in a children property with as a function returning an array', () => {
    const children = ['foo', 'bar', 123]
    const props = { children: () => children }
    const res = processChildren(props)
    expect(res).toMatch(children.join(''))
  })

  it('return a joined string, even with only one child', () => {
    const children = ['foo']
    const props = { children }
    const res = processChildren(props)
    expect(res).toMatch(children.join(''))
  })
})

describe('"extendDeep" should', () => {
  it('keep the object reference', () => {
    const object1 = { key: null }
    const object2 = { key: 'value' }
    expect(extendDeep(object1, object2)).toBe(object1)
  })

  it('extend an object and have correct object shape', () => {
    expect(extendDeep({ key: null }, { key: 'value' })).toEqual({
      key: 'value',
    })
    expect(extendDeep({ key: 'value' }, { key: null })).toEqual({
      key: null,
    })
  })

  it('extend an object recursively and have correct object shape', () => {
    expect(
      extendDeep({ key1: { key2: null } }, { key1: { key2: 'value' } })
    ).toEqual({
      key1: { key2: 'value' },
    })
    expect(
      extendDeep({ key1: { key2: 'value' } }, { key1: { key2: null } })
    ).toEqual({
      key1: { key2: null },
    })
    expect(
      extendDeep(
        { key1: { key2: 'value' } },
        { key1: { key2: null, foo: 'bar' } }
      )
    ).toEqual({
      key1: { key2: null, foo: 'bar' },
    })
  })

  it('should ensure that the prototype is not polluted', () => {
    const target = {}
    const source = {
      __proto__: {
        pollute: 'polluted',
      },
    }

    extendDeep(target, source)

    expect((target as Record<string, unknown>).pollute).toBeUndefined()
  })
})

describe('"dispatchCustomElementEvent" should', () => {
  it('emit camel case events', () => {
    const myEvent = vi.fn()
    const instance = {
      props: {
        myEvent,
      },
    }

    const eventObject = {}

    dispatchCustomElementEvent(instance, 'myEvent', eventObject)
    expect(myEvent).toHaveBeenCalledTimes(1)
  })

  it('emit an event and return its event properties, including custom properties', () => {
    const myEvent = vi.fn()
    const instance = {
      props: {
        myEvent,
      },
    }

    const event = new KeyboardEvent('keydown', { key: 'Enter' })
    const data = { foo: 'bar' }
    const eventObject = { event, data }
    dispatchCustomElementEvent(instance, 'myEvent', eventObject)

    expect(myEvent).toHaveBeenCalledTimes(1)

    const eventResult = {
      data: {
        foo: 'bar',
      },
      event,
      isTrusted: false,
    }
    expect(myEvent).toHaveBeenCalledWith(eventResult)
  })
})

describe('"findElementInChildren" should', () => {
  it('find nested React elements', () => {
    const h1 = <h1>find this</h1>
    const Heading = () => h1
    const children = (
      <div>
        <Heading />
        <span>
          <h2>and this</h2>
        </span>
      </div>
    )

    const HeadingElement = findElementInChildren(children, (cur) => {
      return cur.type === Heading
    })
    expect(HeadingElement.type).toBe(Heading)

    const h2Element = findElementInChildren(children, (cur) => {
      return cur.type === 'h2'
    })
    expect(h2Element.type).toBe('h2')
  })
})

describe('"toPascalCase" should', () => {
  it('transform a snake case event name to a React event case', () => {
    expect(toPascalCase('my_component')).toBe('MyComponent')
  })
})

describe('"toKebabCase" should', () => {
  it('transform a camel case event name to kebab case', () => {
    expect(toKebabCase('MyEventIsLong')).toBe('my-event-is-long')
  })
})

describe('"toCapitalized" should', () => {
  let replaceSpy: import('vitest').MockInstance
  beforeEach(() => {
    replaceSpy = vi.spyOn(String.prototype, 'replace')
  })
  afterEach(() => {
    replaceSpy.mockRestore()
  })

  it('capitalize the first letter of every word', () => {
    expect(toCapitalized('first word æøå')).toBe('First Word Æøå')
  })
  it('capitalize the first letter of every word even if there is a space', () => {
    expect(toCapitalized(' first word  æøå')).toBe(' First Word  Æøå')
  })
  it('capitalize the first letter after a dash', () => {
    expect(toCapitalized('first-word')).toBe('First-Word')
  })
  it('capitalize supports non string values', () => {
    expect(toCapitalized(undefined)).toBeUndefined()
  })
  it('should not use replace with lookbehind regexp to support older browsers', () => {
    replaceSpy.mockImplementationOnce(() => 'First Word')
    expect(String.prototype.replace).toHaveBeenCalledTimes(0)
    expect(toCapitalized('first word')).toBe('First Word')
    expect(String(replaceSpy.mock.calls?.[0]?.[0])).not.toContain('?<=')
    expect(replaceSpy).toHaveBeenCalledTimes(0)
  })
})

describe('"makeUniqueId" should', () => {
  it('have prepended "id-" by default', () => {
    expect(makeUniqueId()).toEqual(
      expect.stringMatching(/^id-[a-z0-9]{8}/g)
    )
  })

  it('make unique ids', () => {
    const ids = {}
    for (let i = 1, l = 10; i <= l; ++i) {
      ids[makeUniqueId()] = i
    }

    const flatten = Object.values(ids)
    expect(flatten.length).toBe(10)
    expect(flatten[flatten.length - 1]).toBe(10)
  })

  it('have a prepended string', () => {
    expect(makeUniqueId('string-', 10)).toEqual(
      expect.stringMatching(/^string-[a-z0-9]{10}/g)
    )
  })
})

describe('"slugify" should', () => {
  it('have a correctly slugified string', () => {
    expect(slugify('What ever !#.- 0123')).toEqual('what-ever-0123')
  })
  it('also if we send in only a number a correctly slugified string', () => {
    expect(slugify(123)).toEqual('123')
  })
  it('or other types', () => {
    expect(slugify({ foo: 'bar' })).toEqual('object-object')
  })
})

describe('"roundToNearest" should', () => {
  it('round to 8 if under is given', () => {
    expect(roundToNearest(7, 8)).toEqual(8)
  })
  it('round to 8 if over is given', () => {
    expect(roundToNearest(9, 8)).toEqual(8)
  })
  it('round to 16 if too much over is given', () => {
    expect(roundToNearest(13, 8)).toEqual(16)
  })
  it('round to 16 if under is given', () => {
    expect(roundToNearest(9, 16)).toEqual(16)
  })
  it('round to 16 if over is given', () => {
    expect(roundToNearest(20, 16)).toEqual(16)
  })
  it('round to 0 if too much under is given', () => {
    expect(roundToNearest(7, 16)).toEqual(0)
  })
})

describe('"convertJsxToString" should', () => {
  it('extracts content from components inside array', () => {
    const Component = () => 'not reachable'
    const Content = [
      <div key="a">reachable A</div>,
      <Component key="x" />,
      <div key="b">reachable B</div>,
    ]
    expect(convertJsxToString(Content, '|')).toBe(
      'reachable A|reachable B'
    )
  })

  it('handle whitespace situations', () => {
    const Component = () => 'not reachable'
    const Content = [
      <div key="a"> reachable A</div>,
      <Component key="x" />,
      <div key="b"> </div>,
      <div key="c"> reachable B</div>,
    ]
    expect(convertJsxToString(Content, ' ')).toBe(
      'reachable A reachable B'
    )
  })
})

describe('"escapeRegexChars" should', () => {
  const text = '-\\{}()*+?.,^$|#'

  it('escape regex chars', () => {
    expect(escapeRegexChars(text)).toBe(
      '\\-\\\\\\{\\}\\(\\)\\*\\+\\?\\.\\,\\^\\$\\|\\#'
    )
  })
})

describe('"removeUndefinedProps" should', () => {
  const object = {
    foo: undefined,
    bar: null,
    baz: undefined,
    qux: null,
    quux: undefined,
  }

  it('remove undefined props', () => {
    expect(removeUndefinedProps(object)).toEqual({
      bar: null,
      baz: undefined,
      qux: null,
      quux: undefined,
    })
  })

  it('remove support undefined as data', () => {
    expect(removeUndefinedProps(undefined)).toBeUndefined()
  })
})

describe('"removeNullProps" should', () => {
  it('remove null props', () => {
    const object = {
      foo: undefined,
      bar: null,
      baz: 'value',
      qux: null,
      quux: 0,
    }

    expect(removeNullProps(object)).toEqual({
      foo: undefined,
      baz: 'value',
      quux: 0,
    })
  })

  it('support an empty object', () => {
    expect(removeNullProps({})).toEqual({})
  })
})
