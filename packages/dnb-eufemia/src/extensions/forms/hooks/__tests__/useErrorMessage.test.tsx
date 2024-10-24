import React from 'react'
import { render } from '@testing-library/react'
import useErrorMessage from '../useErrorMessage'
import { Field, Form } from '../..'

describe('useErrorMessage', () => {
  it('should handle deprecated situation', () => {
    const MockComponent = (props) => {
      const errorMessages = useErrorMessage(
        props.path,
        props.errorMessages,
        {
          'Field.errorRequired': 'bar',
        }
      )

      return (
        <Field.String
          errorMessages={errorMessages}
          required
          validateInitially
        />
      )
    }

    const { rerender } = render(
      <Form.Handler>
        <MockComponent path="/foo" />
      </Form.Handler>
    )

    expect(document.querySelector('.dnb-form-status').textContent).toBe(
      'bar'
    )

    rerender(
      <Form.Handler>
        <MockComponent
          path="/foo"
          errorMessages={{
            'Field.errorRequired': 'baz',
          }}
        />
      </Form.Handler>
    )

    expect(document.querySelector('.dnb-form-status').textContent).toBe(
      'baz'
    )
  })
})
