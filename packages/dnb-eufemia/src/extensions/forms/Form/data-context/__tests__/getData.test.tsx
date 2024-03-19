import React from 'react'
import { act, render } from '@testing-library/react'
import { makeUniqueId } from '../../../../../shared/component-helper'
import { Field, Form } from '../../..'
import setData from '../setData'
import getData from '../getData'
import userEvent from '@testing-library/user-event'

describe('getData', () => {
  let identifier: string

  beforeEach(() => {
    identifier = makeUniqueId()
  })

  it('should be able to get data from form before render', () => {
    type Data = { foo: string }
    setData<Data>(identifier, { foo: 'bar' })

    render(
      <Form.Handler id={identifier}>
        <Field.String path="/foo" />
      </Form.Handler>
    )

    const { data } = getData<Data>(identifier)
    expect(data).toEqual({ foo: 'bar' })
  })

  it('should be able to get data from form after render', () => {
    type Data = { foo: string }
    render(
      <Form.Handler id={identifier}>
        <Field.String path="/foo" />
      </Form.Handler>
    )

    expect(getData<Data>(identifier).data).toEqual({ foo: undefined })

    act(() => {
      setData<Data>(identifier, { foo: 'bar' })
    })

    expect(getData<Data>(identifier).data).toEqual({ foo: 'bar' })

    act(() => {
      setData<Data>(identifier, { foo: 'baz' })
    })

    expect(getData<Data>(identifier).data).toEqual({ foo: 'baz' })
  })

  it('should overwrite user form data', async () => {
    type Data = { foo: string }
    render(
      <Form.Handler id={identifier}>
        <Field.String path="/foo" />
      </Form.Handler>
    )

    expect(getData<Data>(identifier).data).toEqual({ foo: undefined })

    act(() => {
      setData<Data>(identifier, { foo: 'bar' })
    })

    expect(getData<Data>(identifier).data).toEqual({ foo: 'bar' })

    const input = document.querySelector('input')
    await userEvent.type(input, '{Backspace>3}something')

    expect(getData<Data>(identifier).data).toEqual({ foo: 'something' })

    act(() => {
      setData<Data>(identifier, { foo: 'baz' })
    })

    expect(getData<Data>(identifier).data).toEqual({ foo: 'baz' })
  })

  it('should not overwrite existing input value', () => {
    type Data = { foo: string }
    render(
      <Form.Handler id={identifier}>
        <Field.String path="/foo" value="existing value" />
      </Form.Handler>
    )

    expect(getData<Data>(identifier).data).toEqual({
      foo: 'existing value',
    })

    act(() => {
      setData<Data>(identifier, { foo: 'new value' })
    })

    expect(getData<Data>(identifier).data).toEqual({
      foo: 'existing value',
    })
  })

  it('should provide filterData handler', () => {
    type Data = { foo: string }

    const filterDataHandler = jest.fn((path, value, props) => {
      if (props.disabled === true) {
        return false
      }
    })

    render(
      <Form.Handler id={identifier}>
        <Field.String path="/foo" value="foo" disabled />
        <Field.String path="/bar" value="baz" />
      </Form.Handler>
    )

    const { data, filterData } = getData<Data>(identifier)

    expect(data).toEqual({
      foo: 'foo',
      bar: 'baz',
    })

    expect(filterData(filterDataHandler)).toEqual({
      bar: 'baz',
    })
  })
})
