import React from 'react'
import { render, waitFor } from '@testing-library/react'
import { Field, Form, Value } from '../../..'
import userEvent from '@testing-library/user-event'

describe('Visibility.Provider', () => {
  describe('inheritVisibility', () => {
    it('renders value when visibility of field is initially true', async () => {
      render(
        <Form.Handler>
          <Field.Boolean
            variant="button"
            path="/isVisible"
            defaultValue={true}
          />

          <Form.Visibility pathTrue="/isVisible">
            <Field.String path="/foo" defaultValue="Foo" />
            <Field.String path="/bar" defaultValue="Bar" />
          </Form.Visibility>

          <Form.Visibility.Provider inheritVisibility>
            <Value.SummaryList>
              <Value.String path="/foo" />
              <Value.String path="/bar" />
            </Value.SummaryList>
          </Form.Visibility.Provider>
        </Form.Handler>
      )

      expect(document.querySelectorAll('input')).toHaveLength(2)
      expect(document.querySelectorAll('dd')).toHaveLength(2)

      const [valueFoo, valueBar] = Array.from(
        document.querySelectorAll('dd')
      )

      expect(valueFoo).toHaveTextContent('Foo')
      expect(valueBar).toHaveTextContent('Bar')

      const button = document.querySelector('.dnb-toggle-button__button')
      await userEvent.click(button)

      await waitFor(() => {
        expect(document.querySelectorAll('input')).toHaveLength(0)
        expect(document.querySelectorAll('dd')).toHaveLength(0)
      })

      await userEvent.click(button)

      await waitFor(() => {
        expect(document.querySelectorAll('input')).toHaveLength(2)
        expect(document.querySelectorAll('dd')).toHaveLength(2)
      })
    })
  })
})
