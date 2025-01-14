/**
 * Helper tests
 *
 */

import React from 'react'
import { render, screen } from '@testing-library/react'

import {
  isTrue,
  extendGracefully,
  extendDeep,
  defineNavigator,
  validateDOMAttributes,
  processChildren,
  dispatchCustomElementEvent,
  toPascalCase,
  toCamelCase,
  toSnakeCase,
  toKebabCase,
  toCapitalized,
  checkIfHasScrollbar,
  detectOutsideClick,
  makeUniqueId,
  isTouchDevice,
  slugify,
  roundToNearest,
  findElementInChildren,
  matchAll,
  convertJsxToString,
  escapeRegexChars,
  removeUndefinedProps,
} from '../component-helper'
import userEvent from '@testing-library/user-event'

beforeAll(() => {
  window.PointerEvent = new CustomEvent('ontouchstart')
  navigator.maxTouchPoints = 2 // mocking touch

  jest.spyOn(global.console, 'log')
})
afterAll(() => {
  document.documentElement.removeAttribute('data-is-touch')
  window.PointerEvent = undefined
  navigator.maxTouchPoints = 0
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
    window.IS_TEST = true
    defineNavigator()
    expect(document.documentElement.getAttribute('data-os')).toBe('other')
    window.IS_TEST = false
  })
})

describe('"detectOutsideClick" should', () => {
  jest
    .spyOn(document.documentElement, 'clientWidth', 'get')
    .mockImplementation(() => 200)
  jest
    .spyOn(document.documentElement, 'clientHeight', 'get')
    .mockImplementation(() => 200)

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
    })
    event.pageX = 300 // over 200 clientWidth
    event.pageY = 0

    // test mousedown
    testEvent({
      event,
      mockedEvent: jest.fn(),
      calledTimes: 2,
    })
    event.pageX = 0
    event.pageY = 300 // over 200 clientHeight

    // test mousedown
    testEvent({
      event,
      mockedEvent: jest.fn(),
      calledTimes: 2,
    })

    event.pageX = 100
    event.pageY = 100

    // test mousedown
    testEvent({
      event,
      mockedEvent: jest.fn(),
      calledTimes: 3,
    })
  })

  it('should support react refs as ignore element', async () => {
    // Set PointerEvent to undefined to prevent the await keyword from failing this test
    // Is there perhaps a better way to handle this?
    window.PointerEvent = undefined

    const ignoreElementRef = React.createRef()
    const wrapperElementRef = React.createRef()
    const onSuccess = jest.fn()

    const Component = () => {
      detectOutsideClick(ignoreElementRef, onSuccess)
      return (
        <div ref={wrapperElementRef}>
          <div ref={ignoreElementRef} />
        </div>
      )
    }

    render(<Component />)

    await userEvent.click(ignoreElementRef.current)
    expect(onSuccess).toHaveBeenCalledTimes(0)

    await userEvent.click(wrapperElementRef.current)
    expect(onSuccess).toHaveBeenCalledTimes(1)

    await userEvent.click(ignoreElementRef.current)
    expect(onSuccess).toHaveBeenCalledTimes(1)

    await userEvent.click(wrapperElementRef.current)
    expect(onSuccess).toHaveBeenCalledTimes(2)
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

describe('"validateDOMAttributes" should', () => {
  it('work fine', () => {
    const props = {}
    const params = {}
    const res = validateDOMAttributes(props, params)
    expect(params).toEqual(res)
  })

  it('has equal object after sending a json object as an prop.attributes', () => {
    const attr = { foo: 'bar' }
    const props = { attributes: JSON.stringify(attr) }
    const params = {}
    const res = validateDOMAttributes(props, params)
    expect(res).toEqual(attr)
  })

  it('"disabled" property should be removed once its value is false', () => {
    const props = {}
    const res1 = validateDOMAttributes(
      props,
      Object.assign({}, { disabled: 'false' })
    )
    expect(res1).not.toHaveProperty('disabled')
    const res2 = validateDOMAttributes(
      props,
      Object.assign({}, { disabled: 'disabled' })
    )
    expect(res2).toHaveProperty('disabled')
  })

  it('pass thru rest attributes', () => {
    const props = {}
    const params = { 'aria-hidden': true }
    const res = validateDOMAttributes(props, params)
    expect(res).toHaveProperty('aria-hidden')
  })

  it('remove values with null', () => {
    const props = {}
    const params = { 'aria-hidden': null }
    const res = validateDOMAttributes(props, params)
    expect(res).not.toHaveProperty('aria-hidden')
  })

  it('remove attributes with invalid names', () => {
    const props = {}
    const params = { aria_hidden: 'true' }
    const res = validateDOMAttributes(props, params)
    expect(res).not.toHaveProperty('aria_hidden')
  })

  it('function props should not be returned as long as they don\'t are "onClick"', () => {
    const props = {
      on_click: () => {},
    }
    const params = {
      onChange: () => {},
      something: () => {},
    }
    const res = validateDOMAttributes(props, params)
    expect(res).toHaveProperty('onChange')
    expect(res).not.toHaveProperty('something')
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

/** @deprecated Can be removed in v11 */
describe('"extendGracefully" should', () => {
  it('keep the object reference', () => {
    const object1 = { key: null }
    const object2 = { key: 'value' }
    expect(extendGracefully(true, object1, object2)).toBe(object1)
    expect(extendGracefully(true, object2, object1)).toBe(object2)
    expect(extendGracefully(false, object2, object1)).not.toBe(object2)
  })
  it('extend an object and have correct object shape', () => {
    expect(extendGracefully({ key: null }, { key: 'value' })).toEqual({
      key: 'value',
    })
    expect(extendGracefully({ key: 'value' }, { key: null })).toEqual({
      key: 'value',
    })
  })
  it('extend an object recursively and have correct object shape', () => {
    expect(
      extendGracefully(
        { key1: { key2: null } },
        { key1: { key2: 'value' } }
      )
    ).toEqual({
      key1: { key2: 'value' },
    })
    expect(
      extendGracefully(
        { key1: { key2: 'value' } },
        { key1: { key2: null } }
      )
    ).toEqual({
      key1: { key2: 'value' },
    })
    expect(
      extendGracefully(
        { key1: { key2: 'value' } },
        { key1: { key2: null, foo: 'bar' } }
      )
    ).toEqual({
      key1: { key2: 'value', foo: 'bar' },
    })
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

    expect(target.pollute).toBeUndefined()
  })
})

describe('"isTrue" should', () => {
  it('return true if we provide true as boolean', () => {
    expect(isTrue(true)).toBe(true)
  })
  it('return true if we provide true as string', () => {
    expect(isTrue('true')).toBe(true)
  })
  it('return true if we provide 1 as number', () => {
    expect(isTrue(1)).toBe(true)
  })
  it('return false if we provide a invalid value', () => {
    expect(isTrue(0)).toBe(false)
    expect(isTrue(null)).toBe(false)
    expect(isTrue(undefined)).toBe(false)
    expect(isTrue('something')).toBe(false)
  })
})

describe('"dispatchCustomElementEvent" should', () => {
  it('emit snake case and camel case events', () => {
    const my_event = jest.fn()
    const myEvent = jest.fn()
    const instance = {
      props: {
        my_event,
        myEvent,
      },
    }

    const eventObject = {}

    dispatchCustomElementEvent(instance, 'my_event', eventObject)
    expect(my_event).toHaveBeenCalledTimes(1)
    expect(myEvent).toHaveBeenCalledTimes(1)

    // dispatchCustomElementEvent(instance, 'my_event', eventObject)
    dispatchCustomElementEvent(instance, 'myEvent', eventObject)
    expect(my_event).toHaveBeenCalledTimes(2)
    expect(myEvent).toHaveBeenCalledTimes(2)
  })

  it('emit an event and return its event properties, including custom properties', () => {
    const my_event = jest.fn()
    const myEvent = jest.fn()
    const instance = {
      props: {
        my_event,
        myEvent,
      },
    }

    const keyCode = 13
    const event = new KeyboardEvent('keydown', { keyCode })
    const data = { foo: 'bar' }
    const eventObject = { event, data }
    dispatchCustomElementEvent(instance, 'my_event', eventObject)

    expect(my_event).toHaveBeenCalledTimes(1)
    expect(myEvent).toHaveBeenCalledTimes(1)

    const eventResult = {
      data: {
        foo: 'bar',
      },
      event,
      isTrusted: false,
    }
    expect(my_event).toHaveBeenCalledWith(eventResult)
    expect(myEvent).toHaveBeenCalledWith(eventResult)
  })

  it('call an event and return dataset properties as well "data-*" attributes', () => {
    const my_event = jest.fn()
    const instance = {
      props: {
        my_event,
      },
    }
    const buttonText = 'Button'
    render(<button data-prop="value">{buttonText}</button>)

    const currentTarget = screen.getByRole('button', {
      name: buttonText,
    })
    const event = { currentTarget }
    const attributes = {
      'data-attr': 'value',
    }
    dispatchCustomElementEvent(instance, 'my_event', { event, attributes })
    expect(my_event.mock.calls.length).toBe(1)
    expect(my_event.mock.calls[0][0].event.currentTarget.dataset).toEqual(
      expect.objectContaining({
        attr: 'value',
        prop: 'value',
      })
    )
  })
})

describe('"findElementInChildren" should', () => {
  it('find nested React elements', () => {
    const h1 = <h1>find this</h1>
    const Heading = () => h1
    const children = React.createElement(
      'div',
      null,
      React.createElement(Heading),
      React.createElement(
        'span',
        null,
        React.createElement('h2', null, 'and this')
      )
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

describe('"toCamelCase" should', () => {
  it('transform a snake case event name to a React event case', () => {
    expect(toCamelCase('my_event_is_long')).toBe('myEventIsLong')
  })
})

describe('"toSnakeCase" should', () => {
  it('transform a camel case event name to snake case', () => {
    expect(toSnakeCase('MyEventIsLong')).toBe('my_event_is_long')
  })
})

describe('"toKebabCase" should', () => {
  it('transform a camel case event name to kebab case', () => {
    expect(toKebabCase('MyEventIsLong')).toBe('my-event-is-long')
  })
})

describe('"toCapitalized" should', () => {
  let replaceSpy
  beforeEach(() => {
    replaceSpy = jest.spyOn(String.prototype, 'replace')
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
    expect(
      String(String.prototype.replace.mock.calls?.[0]?.[0])
    ).not.toContain('?<=')
    expect(String.prototype.replace).toHaveBeenCalledTimes(0)
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

describe('"matchAll" should', () => {
  it('match correct parts from a string', () => {
    const content = `
      color: var(--color-one);
      background-color: var(--color-two);
    `
    expect(matchAll(content, /var\(([^)]*)\)/g)).toEqual(
      expect.arrayContaining([
        expect.arrayContaining(['var(--color-one)', '--color-one']),
        expect.arrayContaining(['var(--color-two)', '--color-two']),
      ])
    )
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
