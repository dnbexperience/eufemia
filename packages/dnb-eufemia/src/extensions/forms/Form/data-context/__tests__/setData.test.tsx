import React from 'react'
import { act, render } from '@testing-library/react'
import { makeUniqueId } from '../../../../../shared/component-helper'
import { Field, Form } from '../../..'
import setData from '../setData'
import userEvent from '@testing-library/user-event'

describe('setData', () => {
  let identifier: string

  beforeEach(() => {
    identifier = makeUniqueId()
  })

  it('should set form data before render', () => {
    setData(identifier, { foo: 'bar' })

    render(
      <Form.Handler id={identifier}>
        <Field.String path="/foo" />
      </Form.Handler>
    )

    const input = document.querySelector('input')

    expect(input).toHaveValue('bar')
  })

  it('should set form data after render', () => {
    render(
      <Form.Handler id={identifier}>
        <Field.String path="/foo" />
      </Form.Handler>
    )

    const input = document.querySelector('input')

    expect(input).toHaveValue('')

    act(() => {
      setData(identifier, { foo: 'bar' })
    })

    expect(input).toHaveValue('bar')

    act(() => {
      setData(identifier, { foo: 'baz' })
    })

    expect(input).toHaveValue('baz')
  })

  it('should overwrite user form data', async () => {
    render(
      <Form.Handler id={identifier}>
        <Field.String path="/foo" />
      </Form.Handler>
    )

    const input = document.querySelector('input')

    expect(input).toHaveValue('')

    act(() => {
      setData(identifier, { foo: 'bar' })
    })

    expect(input).toHaveValue('bar')

    await userEvent.type(input, '{Backspace>3}something')

    expect(input).toHaveValue('something')

    act(() => {
      setData(identifier, { foo: 'baz' })
    })

    expect(input).toHaveValue('baz')
  })

  it('should not overwrite existing input value', () => {
    render(
      <Form.Handler id={identifier}>
        <Field.String path="/foo" value="existing value" />
      </Form.Handler>
    )

    const input = document.querySelector('input')

    expect(input).toHaveValue('existing value')

    act(() => {
      setData(identifier, { foo: 'new value' })
    })

    expect(input).toHaveValue('existing value')
  })
})
