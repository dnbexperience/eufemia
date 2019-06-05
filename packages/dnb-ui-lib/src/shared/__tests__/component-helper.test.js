/**
 * Helper tests
 *
 */

import {
  isTrue,
  defineIsTouch,
  validateDOMAttributes,
  processChildren,
  dispatchCustomElementEvent,
  transformToReactEventCase,
  setCustomElementMethod,
  pickRenderProps
} from '../component-helper'

beforeAll(() => {
  navigator.maxTouchPoints = 2 // mocking touch
  defineIsTouch(true)
})

describe('"defineIsTouch" should', () => {
  it('add "dnb-is-touch" as an attribute to the HTML tag', () => {
    expect(document.documentElement.getAttribute('dnb-is-touch')).toBe(
      'true'
    )
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
    const children = ['foo', 'bar']
    const props = { children }
    const res = processChildren(props)
    expect(res).toMatch(children.join(''))
  })
  it('return a joined string if we send in a children property with as a function returning an array', () => {
    const children = ['foo', 'bar']
    const props = { children: () => children }
    const res = processChildren(props)
    expect(res).toMatch(children.join(''))
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
    const element = {
      props: {
        my_event,
        myEvent
      }
    }
    const event = {}
    dispatchCustomElementEvent(element, 'my_event', event)
    expect(my_event.mock.calls.length).toBe(1)
    expect(myEvent.mock.calls.length).toBe(1)
  })
  it('call a custom event function, set as a property in props', () => {
    const fireEvent = jest.fn()
    const element = {
      props: {
        custom_element: {
          fireEvent
        }
      }
    }
    const event = {}
    dispatchCustomElementEvent(element, 'eventName', event)
    expect(fireEvent.mock.calls.length).toBe(1)
    expect(fireEvent.mock.calls[0][0]).toBe('eventName')
  })
})

describe('"transformToReactEventCase" should', () => {
  it('transform a snail case event name to a React event case', () => {
    expect(transformToReactEventCase('my_event_is_long')).toBe(
      'myEventIsLong'
    )
  })
})

describe('"setCustomElementMethod" should', () => {
  it('call a custom event function, set as a property in props called "custom_method"', () => {
    const custom_method = jest.fn()
    const element = {
      props: {
        custom_method
      }
    }
    const methodFunc = jest.fn()
    setCustomElementMethod(element, 'methodName', methodFunc)
    expect(custom_method.mock.calls.length).toBe(1)
    expect(custom_method.mock.calls[0][0]).toBe('methodName')
    expect(custom_method.mock.calls[0][1]).toBe(methodFunc)
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
