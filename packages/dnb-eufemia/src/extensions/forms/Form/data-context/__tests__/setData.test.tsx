import React from 'react'
import { act, render } from '@testing-library/react'
import { makeUniqueId } from '../../../../../shared/component-helper'
import { Field, Form } from '../../..'
import setData from '../setData'
import getData from '../getData'
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

  it('should not overwrite existing input "value"', () => {
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

  it('should overwrite existing input "defaultValue"', () => {
    render(
      <Form.Handler id={identifier}>
        <Field.String path="/foo" defaultValue="existing value" />
      </Form.Handler>
    )

    const input = document.querySelector('input')

    expect(input).toHaveValue('existing value')

    act(() => {
      setData(identifier, { foo: 'new value' })
    })

    expect(input).toHaveValue('new value')

    act(() => {
      setData(identifier, { foo: 'second time' })
    })

    expect(input).toHaveValue('second time')
  })

  describe('update', () => {
    it('should rerender fields with updated value', () => {
      type Data = { foo: string }

      render(
        <Form.Handler id={identifier}>
          <Field.String path="/foo" defaultValue="foo" />
          <Field.String path="/bar" defaultValue="bar" />
        </Form.Handler>
      )

      const { update } = setData<Data>(identifier)

      expect(getData<Data>(identifier).data).toEqual({
        foo: 'foo',
        bar: 'bar',
      })

      act(() => {
        update('/foo', 'changed')
      })

      expect(getData<Data>(identifier).data).toEqual({
        foo: 'changed',
        bar: 'bar',
      })

      const [foo, bar] = Array.from(document.querySelectorAll('input'))
      expect(foo).toHaveValue('changed')
      expect(bar).toHaveValue('bar')
    })

    it('should return the current value in the first function parameter', () => {
      type Data = { foo: number }

      render(
        <Form.Handler id={identifier}>
          <Field.Number path="/foo" defaultValue={1} />
        </Form.Handler>
      )

      const { update } = setData<Data>(identifier)

      expect(getData<Data>(identifier).data).toEqual({
        foo: 1,
      })

      act(() => {
        update('/foo', (count: number) => count + 1)
      })

      expect(getData<Data>(identifier).data).toEqual({
        foo: 2,
      })

      const [foo] = Array.from(document.querySelectorAll('input'))
      expect(foo).toHaveValue('2')
    })

    it('should set value when no defaultValue is given', () => {
      type Data = { foo: string }

      render(
        <Form.Handler id={identifier}>
          <Field.String path="/foo" />
          <Field.String path="/bar" />
        </Form.Handler>
      )

      const { update } = setData<Data>(identifier)

      expect(getData<Data>(identifier).data).toEqual({})

      act(() => {
        update('/foo', 'changed')
      })

      expect(getData<Data>(identifier).data).toEqual({
        foo: 'changed',
        bar: undefined,
      })

      const [foo, bar] = Array.from(document.querySelectorAll('input'))
      expect(foo).toHaveValue('changed')
      expect(bar).toHaveValue('')
    })

    it('should set undefined', () => {
      type Data = { foo: string }

      render(
        <Form.Handler id={identifier}>
          <Field.String path="/foo" defaultValue="foo" />
        </Form.Handler>
      )

      const { update } = setData<Data>(identifier)

      expect(getData<Data>(identifier).data).toEqual({ foo: 'foo' })

      act(() => {
        update('/foo', undefined)
      })

      expect(getData<Data>(identifier).data).toEqual({ foo: undefined })

      const [foo] = Array.from(document.querySelectorAll('input'))
      expect(foo).toHaveValue('')
    })
  })
})
