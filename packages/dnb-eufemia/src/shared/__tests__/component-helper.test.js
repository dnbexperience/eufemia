/**
 * Helper tests
 *
 */

import React from 'react'
import { mount } from '../../core/jest/jestSetup'
import { registerElement } from '../custom-element'
import {
  warn,
  isTrue,
  extend,
  extendPropsWithContext,
  defineNavigator,
  validateDOMAttributes,
  processChildren,
  dispatchCustomElementEvent,
  toPascalCase,
  toCamelCase,
  toSnakeCase,
  toKebabCase,
  // pickRenderProps,
  detectOutsideClick,
  makeUniqueId,
  filterProps,
  isTouchDevice,
  slugify,
  roundToNearest,
  InteractionInvalidation,
  matchAll,
} from '../component-helper'

beforeAll(() => {
  window.PointerEvent = new CustomEvent('ontouchstart')
  navigator.maxTouchPoints = 2 // mocking touch
  defineNavigator()

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
    expect(document.documentElement.getAttribute('data-os')).toBe('other')
  })
})

describe('"detectOutsideClick" should', () => {
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

      // but we don't expet more event calls
      expect(mockedEvent).toHaveBeenCalledTimes(calledTimes)
    }

    // test mousedown
    testEvent({
      mockedEvent: jest.fn(),
      event: new CustomEvent('mousedown', { bubbles: true }),
      calledTimes: 2,
    })
  })
})

describe('"validateDOMAttributes" should', () => {
  it('work fine', () => {
    const props = {}
    const params = {}
    const res = validateDOMAttributes(props, params)
    expect(params).toMatchObject(res)
  })

  it('has equal object after sending a json object as an prop.attributes', () => {
    const attr = { foo: 'bar' }
    const props = { attributes: JSON.stringify(attr) }
    const params = {}
    const res = validateDOMAttributes(props, params)
    expect(res).toMatchObject(attr)
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
  registerElement('custom-element', () => {})

  it('a given amount of registered custom elements', () => {
    expect(global.registeredElements).toBeType('array')
    expect(global.registeredElements.length).toBe(1)
  })

  it('return a joined string if we send in a children property with an array', () => {
    const children = ['foo', 'bar', 123]
    const props = { children }
    const res = processChildren(props)
    expect(res).toMatch(children.join(''))
  })

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

  it('return a joined string, even with only one child', () => {
    const props = {
      content: 'foo',
      render_func: (props) => {
        return props.content + ' new content'
      },
    }
    const res = processChildren(props)
    expect(res.props).toMatchObject({ children: 'foo new content' })
  })
})

describe('"extend" should', () => {
  it('keep the object reference', () => {
    const object1 = { key: null }
    const object2 = { key: 'value' }
    expect(extend(true, object1, object2)).toBe(object1)
    expect(extend(true, object2, object1)).toBe(object2)
    expect(extend(false, object2, object1)).not.toBe(object2)
  })
  it('extend an object and have correct object shape', () => {
    expect(extend({ key: null }, { key: 'value' })).toMatchObject({
      key: 'value',
    })
    expect(extend({ key: 'value' }, { key: null })).toMatchObject({
      key: 'value',
    })
  })
  it('extend an object recursively and have correct object shape', () => {
    expect(
      extend({ key1: { key2: null } }, { key1: { key2: 'value' } })
    ).toMatchObject({
      key1: { key2: 'value' },
    })
    expect(
      extend({ key1: { key2: 'value' } }, { key1: { key2: null } })
    ).toMatchObject({
      key1: { key2: 'value' },
    })
    expect(
      extend(
        { key1: { key2: 'value' } },
        { key1: { key2: null, foo: 'bar' } }
      )
    ).toMatchObject({
      key1: { key2: 'value', foo: 'bar' },
    })
  })
})

describe('"extendPropsWithContext" should', () => {
  it('extend prop from other context object', () => {
    expect(
      extendPropsWithContext(
        { key: { x: 'y' }, foo: null }, // given props
        { key: { x: 'y' }, foo: null }, // default props
        { key: 'I can’t replace You', foo: 'bar' }
      )
    ).toMatchObject({
      key: { x: 'y' },
      foo: 'bar', // because the prop was null, we get bar
    })
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
    expect(my_event).toBeCalledTimes(1)
    expect(myEvent).toBeCalledTimes(1)

    // dispatchCustomElementEvent(instance, 'my_event', eventObject)
    dispatchCustomElementEvent(instance, 'myEvent', eventObject)
    expect(my_event).toBeCalledTimes(2)
    expect(myEvent).toBeCalledTimes(2)
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

    expect(my_event).toBeCalledTimes(1)
    expect(myEvent).toBeCalledTimes(1)

    const eventResult = {
      data: {
        foo: 'bar',
      },
      event,
      isTrusted: false,
    }
    expect(my_event).toBeCalledWith(eventResult)
    expect(myEvent).toBeCalledWith(eventResult)
  })

  it('call a custom event function, set as a property in props', () => {
    const fireEvent = jest.fn()
    const instance = {
      props: {
        custom_element: {
          fireEvent,
        },
      },
    }
    const event = {}
    dispatchCustomElementEvent(instance, 'eventName', event)
    expect(fireEvent).toBeCalledTimes(1)
    expect(fireEvent.mock.calls[0][0]).toBe('eventName')
  })

  it('call an event and return dataset properties as well "data-*" attributes', () => {
    const my_event = jest.fn()
    const instance = {
      props: {
        my_event,
      },
    }
    const renderedButton = mount(<button data-prop="value">Button</button>)
    const currentTarget = renderedButton.find('button').getDOMNode()
    const event = { currentTarget }
    const attributes = {
      'data-attr': 'value',
    }
    dispatchCustomElementEvent(instance, 'my_event', { event, attributes })
    expect(my_event.mock.calls.length).toBe(1)
    expect(
      my_event.mock.calls[0][0].event.currentTarget.dataset
    ).toMatchObject({
      attr: 'value',
      prop: 'value',
    })
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

// Removed as we now run function props from Web Components (custom-element)
// describe('"pickRenderProps" should', () => {
//   it('only pass function props which don't exists in renderProps', () => {
//     const renderProp = jest.fn()
//     const customRenderer = jest.fn()
//     const children = jest.fn()
//     const custom_method = jest.fn()
//     const props = {
//       foo: 'bar',
//       renderProp,
//       customRenderer,
//       children,
//       custom_method
//     }
//     const renderProps = {
//       customRenderer
//     }
//     const res = pickRenderProps(props, renderProps)

//     expect(res).not.toHaveProperty([
//       'custom_method',
//       'children',
//       'customRenderer',
//       'foo'
//     ])
//     expect(res).toHaveProperty(['renderProp'])
//     expect(res.renderProp).toBe(renderProp)
//   })
// })

describe('"filterProps" should', () => {
  const attributes = {
    key1: 'value1',
    key2: 'value2',
    attr1: 'value1',
    attr2: false,
  }
  const defaultProps = {
    key1: 'value1',
    key2: false,
  }
  it('remove all unwanted properties', () => {
    expect(filterProps(attributes, defaultProps)).toEqual({
      attr1: 'value1',
      attr2: false,
    })
  })
  it('remove all unwanted properties except "allowed"', () => {
    expect(filterProps(attributes, defaultProps, ['key1'])).toEqual({
      key1: 'value1',
      attr1: 'value1',
      attr2: false,
    })
  })
})

describe('"makeUniqueId" should', () => {
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

let ii
beforeAll(() => {
  ii = new InteractionInvalidation()

  const effected = document.createElement('div')
  effected.classList.add('effected')

  const bypass = document.createElement('div')
  bypass.classList.add('bypass')

  const h1 = document.createElement('h1')
  h1.setAttribute('tabindex', '0')
  h1.setAttribute('aria-hidden', 'true')
  effected.appendChild(h1.cloneNode())
  bypass.appendChild(h1.cloneNode())

  const h2 = document.createElement('h2')
  h2.setAttribute('tabindex', '-1')
  h2.setAttribute('aria-hidden', 'false')
  effected.appendChild(h2.cloneNode())
  bypass.appendChild(h2.cloneNode())

  const h3 = document.createElement('h3')
  effected.appendChild(h3.cloneNode())
  bypass.appendChild(h3.cloneNode())

  document.body.appendChild(effected)
  document.body.appendChild(bypass)
})

describe('"InteractionInvalidation" should', () => {
  const hasDefaultState = (selector) => {
    expect(
      document
        .querySelector(`${selector} > h1`)
        .getAttribute('aria-hidden')
    ).toBe('true')
    expect(
      document.querySelector(`${selector} > h1`).getAttribute('tabindex')
    ).toBe('0')

    expect(
      document
        .querySelector(`${selector} > h2`)
        .getAttribute('aria-hidden')
    ).toBe('false')
    expect(
      document.querySelector(`${selector} > h2`).getAttribute('tabindex')
    ).toBe('-1')

    expect(
      document
        .querySelector(`${selector} > h3`)
        .hasAttribute('aria-hidden')
    ).toBe(false)
    expect(
      document.querySelector(`${selector} > h3`).hasAttribute('tabindex')
    ).toBe(false)
  }

  const hasInvalidatedState = (selector) => {
    expect(
      document
        .querySelector(`${selector} > h1`)
        .getAttribute('aria-hidden')
    ).toBe('true')
    expect(
      document.querySelector(`${selector} > h1`).getAttribute('tabindex')
    ).toBe('-1')

    expect(
      document
        .querySelector(`${selector} > h2`)
        .getAttribute('aria-hidden')
    ).toBe('true')
    expect(
      document.querySelector(`${selector} > h2`).getAttribute('tabindex')
    ).toBe('-1')

    expect(
      document
        .querySelector(`${selector} > h3`)
        .getAttribute('aria-hidden')
    ).toBe('true')
    expect(
      document.querySelector(`${selector} > h3`).getAttribute('tabindex')
    ).toBe('-1')
  }

  it('be in its original state', () => {
    hasDefaultState('.effected')
  })

  it('have invalidated everything', () => {
    ii.activate()

    hasInvalidatedState('.effected')
  })

  it('have reverted the invalidation', () => {
    ii.revert()

    hasDefaultState('.effected')
  })

  it('have invalidated everything, even with a bypassed selector', () => {
    ii.setBypassSelector('.bypass-invalid')
    ii.activate()

    hasInvalidatedState('.bypass')
    hasInvalidatedState('.effected')
  })

  it('have invalidated only .effected', () => {
    ii.revert()
    ii.setBypassSelector('.bypass')
    ii.activate()

    hasDefaultState('.bypass')
    hasInvalidatedState('.effected')
  })

  it('have invalidated only .effected', () => {
    ii.revert()
    ii.setBypassSelector(null)
    ii.activate('.effected')

    hasDefaultState('.bypass')
    hasInvalidatedState('.effected')
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

describe('"warn" should', () => {
  const text = 'warning text'

  it('print a console.log', () => {
    process.env.NODE_ENV = 'development'
    global.console.log = jest.fn()
    warn(text)
    expect(global.console.log).toBeCalled()
    expect(global.console.log).toHaveBeenCalledWith('Eufemia:', text)
  })

  it('not print a console.log in production', () => {
    process.env.NODE_ENV = 'production'
    global.console.log = jest.fn()
    warn(text)
    expect(global.console.log).not.toBeCalled()
  })
})
