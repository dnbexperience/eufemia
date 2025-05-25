import React from 'react'
import { render } from '@testing-library/react'
import { Form, Tools } from '../../'

describe('Tools.Log', () => {
  it('should render data context', () => {
    const data = { foo: 'bar' }
    render(
      <Form.Handler data={data}>
        <Tools.Log />
      </Form.Handler>
    )

    const element = document.querySelector('output')
    expect(element.textContent).toBe(JSON.stringify(data, null, 2) + ' ')
  })

  it('should format array with square brackets', () => {
    const data = { foo: ['bar', 'baz'] }
    render(
      <Form.Handler data={data}>
        <Tools.Log />
      </Form.Handler>
    )

    const element = document.querySelector('output')
    expect(element.textContent).toBe(JSON.stringify(data, null, 2) + ' ')
    expect(element.textContent).toContain('[')
    expect(element.textContent).toContain('}')
  })

  it('should format "undefined"', () => {
    const data = { foo: { bar: undefined } }
    render(
      <Form.Handler data={data}>
        <Tools.Log />
      </Form.Handler>
    )

    const element = document.querySelector('output')
    expect(element.textContent).toContain('"bar": "undefined"')
  })

  it('should render a label when given', () => {
    const data = { foo: { bar: undefined } }
    render(
      <Form.Handler data={data}>
        <Tools.Log label="My label" />
      </Form.Handler>
    )

    const element = document.querySelector('output')
    expect(element.textContent).toContain('My label')
  })

  it('should render a placeholder when given', () => {
    const { rerender } = render(
      <Form.Handler>
        <Tools.Log placeholder="My placeholder" />
      </Form.Handler>
    )

    const element = document.querySelector('output')
    expect(element.textContent).toContain('My placeholder')

    rerender(
      <Form.Handler data={{ foo: 'bar' }}>
        <Tools.Log placeholder="My placeholder" />
      </Form.Handler>
    )

    expect(element.textContent).not.toContain('My placeholder')
  })

  it('should render a maxWidth style', () => {
    render(
      <Form.Handler data={{ foo: 'bar' }}>
        <Tools.Log placeholder="My placeholder" />
      </Form.Handler>
    )

    const element = document.querySelector('output')
    expect(element).toHaveStyle('maxWidth: 80vw')
  })

  it('should render pre element', () => {
    render(
      <Form.Handler data={{ foo: 'bar' }}>
        <Tools.Log placeholder="My placeholder" />
      </Form.Handler>
    )

    const element = document.querySelector('output')
    expect(element.innerHTML).toBe(`<pre>{
  "foo": "bar"
}&nbsp;</pre>`)
  })
})
