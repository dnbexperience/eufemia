import React from 'react'
import { act, render } from '@testing-library/react'
import { Field, Form } from '../../..'

describe('Form.clearData', () => {
  it('should clear a form with an id', () => {
    render(
      <Form.Handler id="unique-id" data={{ myString: 'my string' }}>
        <Field.String path="/myString" />
      </Form.Handler>
    )

    expect(document.querySelector('input')).toHaveValue('my string')

    act(() => Form.clearData('unique-id'))

    expect(document.querySelector('input')).toHaveValue('')
  })

  describe('can be used in beforeEach', () => {
    beforeEach(() => {
      Form.clearData('unique-id')
    })

    it('first set the value', () => {
      render(
        <Form.Handler id="unique-id" data={{ myString: 'my string' }}>
          <Field.String path="/myString" />
        </Form.Handler>
      )

      expect(document.querySelector('input')).toHaveValue('my string')
    })

    it('second, it should not be present anymore', () => {
      render(
        <Form.Handler id="unique-id">
          <Field.String path="/myString" />
        </Form.Handler>
      )

      expect(document.querySelector('input')).toHaveValue('')
    })
  })
})
