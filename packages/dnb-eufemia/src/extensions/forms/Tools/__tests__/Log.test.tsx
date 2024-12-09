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
})
