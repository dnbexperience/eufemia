/**
 * Custom element tests
 *
 */

import React from 'react'

import { registerElement, registeredElements } from '../custom-element'
import { toJson, mount } from '../../core/jest/jestSetup'

// IMPORTANT: The tests requires that the custom element is polyfilled by using "document-register-element"

const CustomElementComponentContent = 'I have a rendered content'
document.body.insertAdjacentHTML(
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
  update() {
    this.setState({ content: this.props.value })
  }
  render() {
    return <div>{this.state.content}</div>
  }
}

describe('"registerElement" should', () => {
  registerElement('custom-element', CustomElementComponent, [
    'observed-attribute'
  ])
  const customElement = document.getElementsByTagName('custom-element')

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

  it('handle "setProps" as expected', () => {
    customElement[0].setProps('value', 456)
    expect(customElement[0]._props.value).toBe(456)

    customElement[0].setProps({
      value: 789
    })
    expect(customElement[0]._props.value).toBe(789)
  })

  it('handle "getRef" as expected', () => {
    const ref = customElement[0].getRef()
    expect(React.isValidElement(ref)).toBe(true)

    const mouted = mount(ref)
    expect(mouted.find('div').text()).toBe('new-value')

    customElement[0].setProps('value', 456)

    // mouted.setProps({
    //   value: '456'
    // })
    // mouted.setState({
    //   content: '456'
    // })

    // mouted.instance().update()
    // expect(mouted.find('div').text()).toBe(456) // we get here new-value
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
