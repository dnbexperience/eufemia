/**
 * Custom element tests
 *
 */

import React from 'react'

import { registerElement, registeredElements } from '../custom-element'
import { toJson } from '../../core/jest/jestSetup'

// IMPORTANT: The tests requires that the custom element is polyfilled by using "document-register-element"

const bodyElements = window.document.getElementsByTagName('body')
const bodyElement = bodyElements[0]
const CustomElementComponentContent = 'I have a rendered content'
bodyElement.insertAdjacentHTML(
  'afterbegin',
  `<custom-element observed-attribute="${CustomElementComponentContent}">Startup Content</custom-element>`
)

class CustomElementComponent extends React.Component {
  state = {}
  static getDerivedStateFromProps(props, state) {
    state.content = props['observed-attribute']
    return state
  }
  constructor(props) {
    super(props)
    this.state.content = CustomElementComponentContent
  }
  render() {
    return <div>{this.state.content}</div>
  }
}

describe('"registerElement" should', () => {
  registerElement('custom-element', CustomElementComponent, [
    'observed-attribute'
  ])
  const customElement = window.document.getElementsByTagName(
    'custom-element'
  )

  it('have "registeredElements" with more than one element', () => {
    expect(registeredElements.length).toBeGreaterThanOrEqual(1)
  })
  it('have "registeredElements" with the correct tagName registered', () => {
    expect(registeredElements[0]).toBe('custom-element')
  })

  it('have a "custom-element" tag in the jsdom', () => {
    expect(customElement.length).toBe(1)
  })

  it('have a "custom-element" with the correct element value', () => {
    expect(customElement[0].textContent).toBe(
      CustomElementComponentContent
    )
  })

  it('have a "custom-element" with the correct attribute value', () => {
    expect(customElement[0].getAttribute('observed-attribute')).toBe(
      CustomElementComponentContent
    )
  })

  it('have a "custom-element" with the correct element content value, even after changing the attribute value', () => {
    const newAttributeValue = 'new-value'
    customElement[0].setAttribute('observed-attribute', newAttributeValue)
    expect(customElement[0].textContent).toBe(newAttributeValue)
  })

  it('handle "custom event" as expected', () => {
    const eventCallback = jest.fn()
    const eventParams = { value: 123 }
    const eventId = customElement[0].addEvent('on_change', eventCallback)

    // call the event one time
    customElement[0].fireEvent('on_change', eventParams)
    customElement[0].removeEvent(eventId)

    // should not trigger the event
    customElement[0].fireEvent('on_change', eventParams)

    // expect the event to be called once
    expect(eventCallback.mock.calls.length).toBe(1)

    // and check for some more criterias
    expect(eventCallback.mock.calls[0][0]).toBe(eventParams)
    const eventId2 = customElement[0].addEvent('on_change', jest.fn())
    expect(eventId).not.toBe(eventId2)
  })

  it('handle "native event" (CustomEvent) as expected', () => {
    const eventCallback = jest.fn()
    const detail = { value: 123 }
    const customEvent = new CustomEvent('on_change', {
      bubbles: true,
      cancelable: true,
      detail
    })
    customElement[0].addEventListener('on_change', eventCallback)

    // call the event one time
    customElement[0].dispatchEvent(customEvent)
    customElement[0].removeEventListener('on_change', eventCallback)

    // should not trigger the event
    customElement[0].dispatchEvent(customEvent)

    // expect the event to be called once
    expect(eventCallback.mock.calls.length).toBe(1)
    expect(eventCallback.mock.calls[0][0].detail).toBe(detail)
  })

  it('have to match snapshot', () => {
    expect(toJson(customElement)).toMatchSnapshot()
  })
})
