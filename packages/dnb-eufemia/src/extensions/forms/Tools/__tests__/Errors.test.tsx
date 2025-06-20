import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Field, Form, JSONSchema, Tools } from '../../'

describe('Tools.Errors', () => {
  it('should render empty log when no errors are present', () => {
    const data = {
      fieldErrors: {},
      formErrors: {},
    }

    render(
      <Form.Handler>
        <Tools.Errors />
      </Form.Handler>
    )

    const element = document.querySelector('output')
    expect(element.textContent).toBe(JSON.stringify(data, null, 2) + ' ')
  })

  it('should render field errors', () => {
    const error = new Error('Field error message')

    const { rerender } = render(
      <Form.Handler>
        <Field.String path="/foo" error={error} />
        <Tools.Errors />
      </Form.Handler>
    )

    const element = document.querySelector('output')
    expect(element.textContent).toBe(
      JSON.stringify(
        {
          fieldErrors: {
            '/foo': 'Field error message',
          },
          formErrors: {},
        },
        null,
        2
      ) + ' '
    )

    rerender(
      <Form.Handler>
        <Field.String path="/foo" error={undefined} />
        <Tools.Errors />
      </Form.Handler>
    )

    expect(element.textContent).toBe(
      JSON.stringify(
        {
          fieldErrors: {},
          formErrors: {},
        },
        null,
        2
      ) + ' '
    )
  })

  it('should render form errors', () => {
    const schema1: JSONSchema = {
      type: 'object',
      properties: {
        foo: { type: 'string' },
      },
      required: ['foo'],
    }

    const { rerender } = render(
      <Form.Handler schema={schema1}>
        <Field.String path="/foo" />
        <Tools.Errors />
      </Form.Handler>
    )

    const element = document.querySelector('output')
    expect(element.textContent).toBe(
      JSON.stringify(
        {
          fieldErrors: {
            '/foo': 'Dette feltet må fylles ut.',
          },
          formErrors: {
            '/foo': 'Dette feltet må fylles ut.',
          },
        },
        null,
        2
      ) + ' '
    )

    const schema2: JSONSchema = {
      type: 'object',
      properties: {
        foo: { type: 'string' },
      },
      required: [],
    }

    rerender(
      <Form.Handler schema={schema2}>
        <Field.String path="/foo" />
        <Tools.Errors />
      </Form.Handler>
    )

    expect(element.textContent).toBe(
      JSON.stringify(
        {
          fieldErrors: {},
          formErrors: {},
        },
        null,
        2
      ) + ' '
    )
  })

  it('should render Isolation required', async () => {
    render(
      <Form.Handler>
        <Tools.Errors />
        <Form.Isolation preventUncommittedChanges resetDataAfterCommit>
          <Field.String path="/foo" />
          <Form.Isolation.CommitButton />
        </Form.Isolation>
      </Form.Handler>
    )

    const input = document.querySelector('input')
    const commitButton = document.querySelector(
      '.dnb-forms-isolate__commit-button'
    )
    const form = document.querySelector('form')

    await userEvent.type(input, 'bar')
    fireEvent.submit(form)

    const element = document.querySelector('output')
    expect(element.textContent).toBe(
      JSON.stringify(
        {
          fieldErrors: {
            '/internal/isolation-container/id-ri': 'Form.Isolation',
          },
          formErrors: {},
        },
        null,
        2
      ) + ' '
    )

    await userEvent.click(commitButton)

    // After commit, the errors should be cleared,
    // which we achieve with the "forceUpdate" in handleSetFieldError.
    expect(element.textContent).toBe(
      JSON.stringify(
        {
          fieldErrors: {},
          formErrors: {},
        },
        null,
        2
      ) + ' '
    )
  })
})
