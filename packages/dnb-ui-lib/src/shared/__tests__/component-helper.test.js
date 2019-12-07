/**
 * Helper tests
 *
 */

import React from 'react'
import { mount } from '../../core/jest/jestSetup'
import {
  isTrue,
  extend,
  extendPropsWithContext,
  defineIsTouch,
  defineNavigator,
  validateDOMAttributes,
  processChildren,
  dispatchCustomElementEvent,
  toPascalCase,
  pickRenderProps,
  detectOutsideClick,
  makeUniqueId,
  filterProps,
  slugify,
  matchAll
} from '../component-helper'

beforeAll(() => {
  window.PointerEvent = new CustomEvent('ontouchstart')
  navigator.maxTouchPoints = 2 // mocking touch
  defineIsTouch()
  defineNavigator()
})
afterAll(() => {
  document.documentElement.removeAttribute('data-is-touch')
  window.PointerEvent = undefined
  navigator.maxTouchPoints = 0
})

describe('"defineIsTouch" should', () => {
  it('add "data-is-touch" as an attribute to the HTML tag', () => {
    expect(document.documentElement.getAttribute('data-is-touch')).toBe(
      'true'
    )
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
      value: 200
    })
    Object.defineProperty(wrapperWithScrollbar, 'offsetWidth', {
      configurable: true,
      value: 100
    })

    const testEvent = ({ mockedEvent, event, calledTimes }) => {
      const outsideClick = detectOutsideClick(inside, mockedEvent)

      // and dispatch it 3 time
      document.childNodes[1].dispatchEvent(event) // ignore
      document.body.dispatchEvent(event) // count
      outside.dispatchEvent(event) // count
      wrapperWithScrollbar.dispatchEvent(event) // ignore
      inside.dispatchEvent(event) // ignore

      // but since "inside" is pritected, it should not call the callback
      expect(mockedEvent).toHaveBeenCalledTimes(calledTimes)

      // remove the detection
      outsideClick.remove()

      // call again outside
      outside.dispatchEvent(event)

      // but we dont expet more event calls
      expect(mockedEvent).toHaveBeenCalledTimes(calledTimes)
    }

    // test mousedown
    testEvent({
      mockedEvent: jest.fn(),
      event: new CustomEvent('mousedown', { bubbles: true }),
      calledTimes: 2
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

  it('pass thru rest attrinutes', () => {
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
      on_click: () => {}
    }
    const params = {
      onChange: () => {},
      someting: () => {}
    }
    const res = validateDOMAttributes(props, params)
    expect(res).toHaveProperty('onChange')
    expect(res).not.toHaveProperty('someting')
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

describe('"extend" should', () => {
  it('keep the object refferance', () => {
    const object1 = { key: null }
    const object2 = { key: 'value' }
    expect(extend(true, object1, object2)).toBe(object1)
    expect(extend(true, object2, object1)).toBe(object2)
    expect(extend(false, object2, object1)).not.toBe(object2)
  })
  it('extend an object and have correct object shape', () => {
    expect(extend({ key: null }, { key: 'value' })).toMatchObject({
      key: 'value'
    })
    expect(extend({ key: 'value' }, { key: null })).toMatchObject({
      key: 'value'
    })
  })
  it('extend an object recursively and have correct object shape', () => {
    expect(
      extend({ key1: { key2: null } }, { key1: { key2: 'value' } })
    ).toMatchObject({
      key1: { key2: 'value' }
    })
    expect(
      extend({ key1: { key2: 'value' } }, { key1: { key2: null } })
    ).toMatchObject({
      key1: { key2: 'value' }
    })
    expect(
      extend(
        { key1: { key2: 'value' } },
        { key1: { key2: null, foo: 'bar' } }
      )
    ).toMatchObject({
      key1: { key2: 'value', foo: 'bar' }
    })
  })
})

describe('"extendPropsWithContext" should', () => {
  it('extend prop from other context object', () => {
    expect(
      extendPropsWithContext(
        { key: { x: 'y' }, foo: null }, // given props
        { key: { x: 'y' }, foo: null }, // defualt props
        { key: 'I cant replace You', foo: 'bar' }
      )
    ).toMatchObject({
      key: { x: 'y' },
      foo: 'bar' // because the prop was null, we get bar
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
    expect(isTrue('someting')).toBe(false)
  })
})

describe('"dispatchCustomElementEvent" should', () => {
  it('call a custom event function, set as a property in props', () => {
    const my_event = jest.fn()
    const myEvent = jest.fn()
    const instance = {
      props: {
        my_event,
        myEvent
      }
    }
    const event = {}
    dispatchCustomElementEvent(instance, 'my_event', event)
    expect(my_event.mock.calls.length).toBe(1)
    expect(myEvent.mock.calls.length).toBe(1)
  })

  it('call a custom event function, set as a property in props', () => {
    const fireEvent = jest.fn()
    const instance = {
      props: {
        custom_element: {
          fireEvent
        }
      }
    }
    const event = {}
    dispatchCustomElementEvent(instance, 'eventName', event)
    expect(fireEvent.mock.calls.length).toBe(1)
    expect(fireEvent.mock.calls[0][0]).toBe('eventName')
  })

  it('call an event and return dataset properties as well "data-*" attributes', () => {
    const my_event = jest.fn()
    const instance = {
      props: {
        my_event
      }
    }
    const renderedButton = mount(<button data-prop="value">Button</button>)
    const currentTarget = renderedButton.find('button').getDOMNode()
    const event = { currentTarget }
    const attributes = {
      'data-attr': 'value'
    }
    dispatchCustomElementEvent(instance, 'my_event', { event, attributes })
    expect(my_event.mock.calls.length).toBe(1)
    expect(
      my_event.mock.calls[0][0].event.currentTarget.dataset
    ).toMatchObject({
      attr: 'value',
      prop: 'value'
    })
  })
})

describe('"toPascalCase" should', () => {
  it('transform a snail case event name to a React event case', () => {
    expect(toPascalCase('my_event_is_long')).toBe('myEventIsLong')
  })
})

describe('"pickRenderProps" should', () => {
  it('only pass function props witch dont exists in renderProps', () => {
    const renderProp = jest.fn()
    const customRenderer = jest.fn()
    const children = jest.fn()
    const custom_method = jest.fn()
    const props = {
      foo: 'bar',
      renderProp,
      customRenderer,
      children,
      custom_method
    }
    const renderProps = {
      customRenderer
    }
    const res = pickRenderProps(props, renderProps)

    expect(res).not.toHaveProperty([
      'custom_method',
      'children',
      'customRenderer',
      'foo'
    ])
    expect(res).toHaveProperty(['renderProp'])
    expect(res.renderProp).toBe(renderProp)
  })
})

describe('"filterProps" should', () => {
  const attributes = {
    key1: 'value1',
    key2: 'value2',
    attr1: 'value1',
    attr2: 'value2'
  }
  const propTypes = {
    key1: 'value1',
    key2: 'value2'
  }
  it('remove all unwanted properties', () => {
    expect(filterProps(attributes, propTypes)).toEqual({
      attr1: 'value1',
      attr2: 'value2'
    })
  })
  it('remove all unwanted properties except "allowed"', () => {
    expect(filterProps(attributes, propTypes, ['key1'])).toEqual({
      key1: 'value1',
      attr1: 'value1',
      attr2: 'value2'
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
  it('have a correctly slugifyed string', () => {
    expect(slugify('What ever !#.- 0123')).toEqual('what-ever-0123')
  })
  it('also if we send in only a number a correctly slugifyed string', () => {
    expect(slugify(123)).toEqual('123')
  })
  it('or other types', () => {
    expect(slugify({ foo: 'bar' })).toEqual('object-object')
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
        expect.arrayContaining(['var(--color-two)', '--color-two'])
      ])
    )
  })
})
