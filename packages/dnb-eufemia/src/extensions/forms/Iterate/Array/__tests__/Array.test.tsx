import React, { useEffect } from 'react'
import { fireEvent, render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import * as Iterate from '../..'
import * as DataContext from '../../../DataContext'
import { IterateItemContext } from '../..'
import { Field, FieldBlock, Form, Value, ValueBlock } from '../../..'
import { ContextState, FilterData } from '../../../DataContext'

import nbNO from '../../../constants/locales/nb-NO'
const nb = nbNO['nb-NO']

describe('Iterate.Array', () => {
  describe('with primitive elements', () => {
    it('should distribute values and receive callbacks', async () => {
      const onChange = jest.fn()

      render(
        <Iterate.Array value={['one', 'two', 'three']} onChange={onChange}>
          <Field.String itemPath="/" />
        </Iterate.Array>
      )
      const fields = document.querySelectorAll('input')
      expect(fields).toHaveLength(3)
      const [fieldOne, fieldTwo, fieldThree] = Array.from(fields)

      expect(fieldOne).toHaveDisplayValue('one')
      expect(fieldTwo).toHaveDisplayValue('two')
      expect(fieldThree).toHaveDisplayValue('three')

      await userEvent.type(fieldOne, '1')
      await userEvent.type(fieldThree, 'three')

      expect(fieldOne).toHaveDisplayValue('one1')
      expect(fieldTwo).toHaveDisplayValue('two')
      expect(fieldThree).toHaveDisplayValue('threethree')

      expect(onChange).toHaveBeenCalledTimes(6)
      expect(onChange).toHaveBeenNthCalledWith(
        1,
        ['one1', 'two', 'three'],
        expect.anything()
      )
      expect(onChange).toHaveBeenNthCalledWith(
        2,
        ['one1', 'two', 'threet'],
        expect.anything()
      )
      expect(onChange).toHaveBeenNthCalledWith(
        3,
        ['one1', 'two', 'threeth'],
        expect.anything()
      )
      expect(onChange).toHaveBeenNthCalledWith(
        4,
        ['one1', 'two', 'threethr'],
        expect.anything()
      )
      expect(onChange).toHaveBeenNthCalledWith(
        5,
        ['one1', 'two', 'threethre'],
        expect.anything()
      )
      expect(onChange).toHaveBeenNthCalledWith(
        6,
        ['one1', 'two', 'threethree'],
        expect.anything()
      )
    })

    it('should support a function callback as the children prop', async () => {
      const onChange = jest.fn()
      const callback = jest.fn(() => {
        return <Field.String itemPath="/" />
      })

      const data = ['one', 'two', 'three']

      render(
        <Iterate.Array value={data} onChange={onChange}>
          {callback}
        </Iterate.Array>
      )

      const fields = document.querySelectorAll('input')
      expect(fields).toHaveLength(3)
      const [fieldOne, fieldTwo, fieldThree] = Array.from(fields)

      expect(fieldOne).toHaveDisplayValue('one')
      expect(fieldTwo).toHaveDisplayValue('two')
      expect(fieldThree).toHaveDisplayValue('three')

      expect(callback).toHaveBeenCalledTimes(3)
      expect(callback).toHaveBeenNthCalledWith(
        1,
        'one',
        0,
        expect.arrayContaining([
          expect.objectContaining({
            arrayValue: data,
          }),
        ])
      )
      expect(callback).toHaveBeenNthCalledWith(
        2,
        'two',
        1,
        expect.arrayContaining([
          expect.objectContaining({
            arrayValue: data,
          }),
        ])
      )
      expect(callback).toHaveBeenNthCalledWith(
        3,
        'three',
        2,
        expect.arrayContaining([
          expect.objectContaining({
            arrayValue: data,
          }),
        ])
      )
    })

    describe('placeholder', () => {
      it('should show placeholder when value is undefined', () => {
        const renderProp = jest.fn()

        const list = undefined

        render(
          <Iterate.Array value={list} placeholder="Placeholder text">
            {renderProp}
          </Iterate.Array>
        )

        expect(
          document.querySelectorAll('.dnb-forms-section')
        ).toHaveLength(1)
        expect(
          document.querySelector('.dnb-forms-section')
        ).toHaveTextContent('Placeholder text')
      })

      it('should show placeholder when emptyValue is same as instance', () => {
        const renderProp = jest.fn()

        const list = []

        render(
          <Iterate.Array
            value={list}
            emptyValue={list}
            placeholder="Placeholder text"
          >
            {renderProp}
          </Iterate.Array>
        )

        expect(
          document.querySelectorAll('.dnb-forms-section')
        ).toHaveLength(1)
        expect(
          document.querySelector('.dnb-forms-section')
        ).toHaveTextContent('Placeholder text')
      })

      it('should show given placeholder when value is empty', () => {
        const renderProp = jest.fn()

        const list = []

        render(
          <Iterate.Array value={list} placeholder="Placeholder text">
            {renderProp}
          </Iterate.Array>
        )

        expect(
          document.querySelectorAll('.dnb-forms-section')
        ).toHaveLength(1)
        expect(
          document.querySelector('.dnb-forms-section')
        ).toHaveTextContent('Placeholder text')
      })

      it('should render span when placeholder is a string', () => {
        const list = []

        render(
          <Iterate.Array value={list} placeholder="Placeholder text">
            content
          </Iterate.Array>
        )

        expect(document.querySelectorAll('.dnb-span')).toHaveLength(1)
        expect(document.querySelector('.dnb-span')).toHaveTextContent(
          'Placeholder text'
        )
        expect(document.querySelector('.dnb-span')).toHaveClass(
          'dnb-t__size--small'
        )
      })
    })

    describe('label', () => {
      it('should replace {itemNo} in labels for fields and values', () => {
        render(
          <Iterate.Array value={['foo', 'bar']}>
            <Field.String itemPath="/" label="Field label {itemNo}" />
            <Value.String itemPath="/" label="Value label {itemNo}" />
          </Iterate.Array>
        )

        const [fieldLabel1, valueLabel1, fieldLabel2, valueLabel2] =
          Array.from(document.querySelectorAll('.dnb-form-label'))

        expect(fieldLabel1).toHaveTextContent('Field label 1')
        expect(fieldLabel2).toHaveTextContent('Field label 2')
        expect(valueLabel1).toHaveTextContent('Value label 1')
        expect(valueLabel2).toHaveTextContent('Value label 2')
      })

      it('should replace {itemNo} in labels for FieldBlock and ValueBlock', () => {
        render(
          <Iterate.Array value={['foo', 'bar']}>
            <FieldBlock label="FieldBlock label {itemNo}">
              content
            </FieldBlock>
            <ValueBlock label="ValueBlock label {itemNo}">
              content
            </ValueBlock>
          </Iterate.Array>
        )

        const [FieldBlock1, ValueBlock1, FieldBlock2, ValueBlock2] =
          Array.from(document.querySelectorAll('.dnb-form-label'))

        expect(FieldBlock1).toHaveTextContent('FieldBlock label 1')
        expect(ValueBlock1).toHaveTextContent('ValueBlock label 1')
        expect(FieldBlock2).toHaveTextContent('FieldBlock label 2')
        expect(ValueBlock2).toHaveTextContent('ValueBlock label 2')
      })
    })
  })

  describe('with object elements', () => {
    it('should distribute values and receive callbacks', async () => {
      const onChange = jest.fn()

      render(
        <Iterate.Array
          value={[
            { foo: 'foo 0', bar: 'bar 0' },
            { foo: 'foo 1', bar: 'bar 1' },
            { foo: 'foo 2', bar: 'bar 2' },
          ]}
          onChange={onChange}
        >
          <Field.String itemPath="/foo" />
          <Field.String itemPath="/bar" />
        </Iterate.Array>
      )

      const fields = document.querySelectorAll('input')
      expect(fields).toHaveLength(6)
      const [
        object0FieldFoo,
        object0FieldBar,
        object1FieldFoo,
        object1FieldBar,
        object2FieldFoo,
        object2FieldBar,
      ] = Array.from(fields)

      expect(object0FieldFoo).toHaveDisplayValue('foo 0')
      expect(object0FieldBar).toHaveDisplayValue('bar 0')
      expect(object1FieldFoo).toHaveDisplayValue('foo 1')
      expect(object1FieldBar).toHaveDisplayValue('bar 1')
      expect(object2FieldFoo).toHaveDisplayValue('foo 2')
      expect(object2FieldBar).toHaveDisplayValue('bar 2')

      await userEvent.type(object0FieldBar, 'a')
      await userEvent.type(object2FieldFoo, 'c')
      expect(object0FieldFoo).toHaveDisplayValue('foo 0')
      expect(object0FieldBar).toHaveDisplayValue('bar 0a')
      expect(object2FieldFoo).toHaveDisplayValue('foo 2c')

      expect(onChange).toHaveBeenCalledTimes(2)
      expect(onChange).toHaveBeenNthCalledWith(
        1,
        [
          { foo: 'foo 0', bar: 'bar 0a' },
          { foo: 'foo 1', bar: 'bar 1' },
          { foo: 'foo 2', bar: 'bar 2' },
        ],
        expect.anything()
      )
      expect(onChange).toHaveBeenNthCalledWith(
        2,
        [
          { foo: 'foo 0', bar: 'bar 0a' },
          { foo: 'foo 1', bar: 'bar 1' },
          { foo: 'foo 2c', bar: 'bar 2' },
        ],
        expect.anything()
      )
    })

    it('should render array elements defined in the root data context', () => {
      const data = [
        { name: 'Iron Man' },
        { name: 'Captain America' },
        { name: 'Thor' },
      ]

      render(
        <Form.Handler data={data}>
          <Iterate.Array path="/">
            <Field.String itemPath="/name" />
          </Iterate.Array>
        </Form.Handler>
      )

      const inputs = document.querySelectorAll('input')

      expect(inputs).toHaveLength(3)
      expect(inputs[0]).toHaveValue('Iron Man')
      expect(inputs[1]).toHaveValue('Captain America')
      expect(inputs[2]).toHaveValue('Thor')
    })
  })

  describe('countPath', () => {
    it('should iterate over the amount given in countPath', () => {
      render(
        <Form.Handler data={{ count: 2 }}>
          <Iterate.Array path="/items" countPath="/count">
            <Field.Number itemPath="/" />
          </Iterate.Array>
        </Form.Handler>
      )

      const inputs = document.querySelectorAll('input')
      expect(inputs).toHaveLength(2)
    })

    it('should update items when countPath value changes', async () => {
      render(
        <Form.Handler>
          <Field.Number path="/count" defaultValue={2} />

          <section>
            <Iterate.Array path="/items" countPath="/count">
              <Field.Number itemPath="/" />
            </Iterate.Array>
          </section>
        </Form.Handler>
      )

      expect(document.querySelectorAll('section input')).toHaveLength(2)

      await userEvent.type(document.querySelector('input'), '{Backspace}3')

      expect(document.querySelectorAll('section input')).toHaveLength(3)

      await userEvent.type(document.querySelector('input'), '{Backspace}0')

      expect(document.querySelectorAll('section input')).toHaveLength(0)

      await userEvent.type(document.querySelector('input'), '{Backspace}1')

      expect(document.querySelectorAll('section input')).toHaveLength(1)
    })

    it('should keep data context in sync when countPath value changes', async () => {
      const onChange = jest.fn()
      let collectedContext: ContextState = null

      render(
        <Form.Handler onChange={onChange}>
          <Field.Number path="/count" defaultValue={2} />

          <section>
            <Iterate.Array path="/items" countPath="/count">
              <Field.Number itemPath="/" defaultValue={2} />
            </Iterate.Array>
          </section>

          <DataContext.Context.Consumer>
            {(context) => {
              collectedContext = context
              return null
            }}
          </DataContext.Context.Consumer>
        </Form.Handler>
      )

      expect(document.querySelectorAll('section input')).toHaveLength(2)
      expect(onChange).toHaveBeenCalledTimes(0)
      expect(collectedContext.data).toEqual({
        count: 2,
        items: [2, 2],
      })

      await userEvent.type(
        document.querySelectorAll('section input')[0],
        '2'
      )
      expect(onChange).toHaveBeenCalledTimes(1)
      expect(onChange).toHaveBeenLastCalledWith(
        {
          count: 2,
          items: [22, 2],
        },
        expect.anything()
      )
      expect(collectedContext.data).toEqual({
        count: 2,
        items: [22, 2],
      })

      fireEvent.change(document.querySelector('input'), {
        target: { value: '3' },
      })

      expect(document.querySelectorAll('section input')).toHaveLength(3)
      expect(onChange).toHaveBeenCalledTimes(2)
      expect(onChange).toHaveBeenLastCalledWith(
        {
          count: 3, // we first only change this value
          items: [22, 2],
        },
        expect.anything()
      )
      expect(collectedContext.data).toEqual({
        count: 3,
        items: [22, 2, 2],
      })

      await waitFor(() => {
        expect(onChange).toHaveBeenCalledTimes(3)
        expect(onChange).toHaveBeenLastCalledWith(
          {
            count: 3,
            items: [22, 2, 2],
          },
          expect.anything()
        )
      })

      expect(collectedContext.data).toEqual({
        count: 3,
        items: [22, 2, 2],
      })

      fireEvent.change(document.querySelector('input'), {
        target: { value: '1' },
      })

      expect(document.querySelectorAll('section input')).toHaveLength(1)
      expect(onChange).toHaveBeenCalledTimes(4)
      expect(onChange).toHaveBeenLastCalledWith(
        {
          count: 1, // we first only change this value
          items: [22, 2, 2],
        },
        expect.anything()
      )
      expect(collectedContext.data).toEqual({
        count: 1,
        items: [22, 2, 2],
      })

      await waitFor(() => {
        expect(onChange).toHaveBeenCalledTimes(5)
        expect(onChange).toHaveBeenLastCalledWith(
          {
            count: 1,
            items: [22],
          },
          expect.anything()
        )
      })

      expect(collectedContext.data).toEqual({
        count: 1,
        items: [22],
      })
    })

    it('should use defaultValue from Field.Number', async () => {
      render(
        <Form.Handler data={{ count: 2 }}>
          <section>
            <Iterate.Array path="/items" countPath="/count">
              <Field.Number itemPath="/" defaultValue={2} />
            </Iterate.Array>
          </section>
        </Form.Handler>
      )

      const inputs = document.querySelectorAll('input')
      expect(inputs).toHaveLength(2)
      expect(inputs[0]).toHaveValue('2')
      expect(inputs[1]).toHaveValue('2')
    })

    it('should render input value defined by "countPathTransform"', () => {
      render(
        <Form.Handler data={{ count: 2 }}>
          <Iterate.Array
            path="/items"
            countPath="/count"
            countPathTransform={({ value, index }) =>
              'item' in (value || {}) ? value : { item: index }
            }
          >
            <Field.Number itemPath="/item" />
          </Iterate.Array>
        </Form.Handler>
      )

      const inputs = document.querySelectorAll('input')
      expect(inputs).toHaveLength(2)
      expect(inputs[0]).toHaveValue('0')
      expect(inputs[1]).toHaveValue('1')
    })

    it('should support React.StrictMode when using "countPathTransform"', () => {
      render(
        <React.StrictMode>
          <Form.Handler data={{ count: 2 }}>
            <Iterate.Array
              path="/items"
              countPath="/count"
              countPathTransform={({ value, index }) =>
                'item' in (value || {}) ? value : { item: index }
              }
            >
              <Field.Number itemPath="/item" defaultValue={2} />
            </Iterate.Array>
          </Form.Handler>
        </React.StrictMode>
      )

      const inputs = document.querySelectorAll('input')
      expect(inputs).toHaveLength(2)
      expect(inputs[0]).toHaveValue('0')
      expect(inputs[1]).toHaveValue('1')
    })

    it('should not iterate over invalid countPath', () => {
      render(
        <Form.Handler data={{ count: '' }}>
          <Iterate.Array path="/items" countPath="/count">
            <Field.Number itemPath="/" />
          </Iterate.Array>
        </Form.Handler>
      )

      expect(document.querySelectorAll('input')).toHaveLength(0)
    })

    it('should not iterate over negative countPath', () => {
      render(
        <Form.Handler data={{ count: -1 }}>
          <Iterate.Array path="/items" countPath="/count">
            <Field.Number itemPath="/" />
          </Iterate.Array>
        </Form.Handler>
      )

      expect(document.querySelectorAll('input')).toHaveLength(0)
    })

    it('should limit the iterate amount by given "countPathLimit" value', () => {
      render(
        <Form.Handler data={{ count: 10 }}>
          <Iterate.Array
            path="/items"
            countPath="/count"
            countPathLimit={2}
          >
            <Field.Number itemPath="/" />
          </Iterate.Array>
        </Form.Handler>
      )

      expect(document.querySelectorAll('input')).toHaveLength(2)
    })
  })

  describe('required', () => {
    it('should show required error on initial render', () => {
      render(
        <Form.Handler>
          <Iterate.Array path="/items" required validateInitially>
            <Field.String itemPath="/" />
          </Iterate.Array>
        </Form.Handler>
      )

      expect(document.querySelector('.dnb-form-status')).toHaveTextContent(
        nb.Field.errorRequired
      )
    })

    it('should not inherit required from parent', () => {
      render(
        <Form.Handler required>
          <Iterate.Array path="/items" validateInitially>
            <Field.String itemPath="/" />
          </Iterate.Array>
        </Form.Handler>
      )

      expect(
        document.querySelector('.dnb-form-status')
      ).not.toBeInTheDocument()
    })

    it('should support custom error messages', () => {
      render(
        <Form.Handler>
          <Iterate.Array
            path="/items"
            required
            errorMessages={{
              'Field.errorRequired': 'Custom message',
            }}
            validateInitially
          >
            <Field.String itemPath="/" />
          </Iterate.Array>
        </Form.Handler>
      )

      expect(document.querySelector('.dnb-form-status')).toHaveTextContent(
        'Custom message'
      )
    })

    it('should show required error on submit', () => {
      render(
        <Form.Handler>
          <Iterate.Array path="/items" required>
            <Field.String itemPath="/" />
          </Iterate.Array>
        </Form.Handler>
      )

      expect(
        document.querySelector('.dnb-form-status')
      ).not.toBeInTheDocument()

      fireEvent.submit(document.querySelector('form'))

      expect(document.querySelector('.dnb-form-status')).toHaveTextContent(
        nb.Field.errorRequired
      )
    })

    it('should show and hide required error', async () => {
      render(
        <Form.Handler>
          <Iterate.Array path="/items" required>
            <Field.String itemPath="/" />
          </Iterate.Array>
          <Iterate.PushButton path="/items" pushValue="baz" />
        </Form.Handler>
      )

      expect(
        document.querySelector('.dnb-form-status')
      ).not.toBeInTheDocument()

      fireEvent.submit(document.querySelector('form'))

      expect(document.querySelector('.dnb-form-status')).toHaveTextContent(
        nb.Field.errorRequired
      )

      await userEvent.click(document.querySelector('button'))

      await waitFor(() => {
        expect(
          document.querySelector('.dnb-form-status')
        ).not.toBeInTheDocument()
      })
    })

    it('should report error to FieldBlock initially', async () => {
      render(
        <Form.Handler>
          <FieldBlock asFieldset>
            <Iterate.Array path="/items" required validateInitially>
              <Field.String itemPath="/" />
            </Iterate.Array>
          </FieldBlock>
        </Form.Handler>
      )

      expect(
        document.querySelector(
          '.dnb-forms-field-block__status > .dnb-form-status'
        )
      ).toHaveTextContent(nb.Field.errorRequired)
    })

    it('should show and hide error message user interaction', async () => {
      render(
        <Form.Handler
          defaultData={{
            items: ['foo', 'bar'],
          }}
        >
          <FieldBlock asFieldset>
            <Iterate.Array path="/items" required>
              <Field.String itemPath="/" />
              <Iterate.RemoveButton />
            </Iterate.Array>
          </FieldBlock>
          <Iterate.PushButton path="/items" pushValue="baz" />
        </Form.Handler>
      )

      expect(
        document.querySelector('.dnb-form-status')
      ).not.toBeInTheDocument()

      fireEvent.submit(document.querySelector('form'))

      expect(
        document.querySelector('.dnb-form-status')
      ).not.toBeInTheDocument()

      await userEvent.click(document.querySelector('button'))

      expect(
        document.querySelector('.dnb-form-status')
      ).not.toBeInTheDocument()

      await userEvent.click(document.querySelector('button'))

      expect(document.querySelector('.dnb-form-status')).toHaveTextContent(
        nb.Field.errorRequired
      )

      // Add a new item
      await userEvent.click(document.querySelector('button'))

      expect(
        document.querySelector('.dnb-form-status')
      ).not.toBeInTheDocument()
    })
  })

  describe('onChangeValidator', () => {
    it('should validate onChangeValidator initially (validateInitially)', async () => {
      const onChangeValidator = jest.fn((arrayValue) => {
        if (arrayValue.length === 2) {
          return new Error('Error message')
        }
      })

      render(
        <Form.Handler
          data={{
            items: ['foo', 'bar'],
          }}
        >
          <Iterate.Array
            path="/items"
            onChangeValidator={onChangeValidator}
            validateInitially
          >
            <Field.String itemPath="/" />
          </Iterate.Array>
          <Iterate.PushButton path="/items" pushValue="baz" />
        </Form.Handler>
      )

      expect(onChangeValidator).toHaveBeenCalledTimes(1)
      expect(onChangeValidator).toHaveBeenCalledWith(
        ['foo', 'bar'],
        expect.anything()
      )

      await waitFor(() => {
        expect(
          document.querySelector('.dnb-form-status')
        ).toBeInTheDocument()
        expect(
          document.querySelector('.dnb-form-status')
        ).toHaveTextContent('Error message')
      })

      fireEvent.click(document.querySelector('button'))

      expect(onChangeValidator).toHaveBeenCalledTimes(3)
      expect(onChangeValidator).toHaveBeenCalledWith(
        ['foo', 'bar', 'baz'],
        expect.anything()
      )

      await waitFor(() => {
        expect(
          document.querySelector('.dnb-form-status')
        ).not.toBeInTheDocument()
      })
    })

    it('should validate onChangeValidator on form submit', async () => {
      const onChangeValidator = jest.fn((arrayValue) => {
        if (arrayValue.length === 2) {
          return new Error('Error message')
        }
      })

      render(
        <Form.Handler
          data={{
            items: ['foo', 'bar'],
          }}
        >
          <Iterate.Array
            path="/items"
            onChangeValidator={onChangeValidator}
          >
            <Field.String itemPath="/" />
          </Iterate.Array>
          <Iterate.PushButton path="/items" pushValue="baz" />
        </Form.Handler>
      )

      expect(onChangeValidator).toHaveBeenCalledTimes(0)

      const form = document.querySelector('form')
      fireEvent.submit(form)

      expect(onChangeValidator).toHaveBeenCalledTimes(1)
      expect(onChangeValidator).toHaveBeenCalledWith(
        ['foo', 'bar'],
        expect.anything()
      )

      await waitFor(() => {
        expect(
          document.querySelector('.dnb-form-status')
        ).toBeInTheDocument()
        expect(
          document.querySelector('.dnb-form-status')
        ).toHaveTextContent('Error message')
      })

      fireEvent.click(document.querySelector('button'))

      expect(onChangeValidator).toHaveBeenCalledTimes(3)
      expect(onChangeValidator).toHaveBeenCalledWith(
        ['foo', 'bar', 'baz'],
        expect.anything()
      )

      await waitFor(() => {
        expect(
          document.querySelector('.dnb-form-status')
        ).not.toBeInTheDocument()
      })
    })

    it('should validate during typing and show error when duplicate item is added', async () => {
      const findFirstDuplication = (arr) =>
        arr.findIndex((e, i) => arr.indexOf(e) !== i)

      const onChangeValidator = jest.fn((arrayValue) => {
        const index = findFirstDuplication(arrayValue)
        if (index > -1) {
          const value = arrayValue[index]
          return new Error(`You cannot have duplicate items: ${value}`)
        }
      })

      render(
        <Form.Handler data={{ items: [null, 'foo'] }}>
          <Iterate.Array
            path="/items"
            onChangeValidator={onChangeValidator}
          >
            <Field.String itemPath="/" />
          </Iterate.Array>
        </Form.Handler>
      )

      const input = document.querySelector('input')
      await userEvent.type(input, 'foo')

      await waitFor(() => {
        expect(
          document.querySelector('.dnb-form-status')
        ).toBeInTheDocument()
      })

      expect(document.querySelector('.dnb-form-status')).toHaveTextContent(
        'You cannot have duplicate items: foo'
      )
    })
  })

  describe('using single render prop', () => {
    describe('with primitive elements', () => {
      it('should call renderers with each element value', () => {
        const renderProp = jest.fn()

        render(
          <Iterate.Array value={['first', 'second', 'third']}>
            {renderProp}
          </Iterate.Array>
        )

        expect(renderProp).toHaveBeenCalledTimes(3)
        expect(renderProp).toHaveBeenNthCalledWith(
          1,
          'first',
          0,
          expect.any(Array)
        )
        expect(renderProp).toHaveBeenNthCalledWith(
          2,
          'second',
          1,
          expect.any(Array)
        )
        expect(renderProp).toHaveBeenNthCalledWith(
          3,
          'third',
          2,
          expect.any(Array)
        )
      })
    })

    describe('with object elements and multiple render props', () => {
      it('should call renderers with each element value', () => {
        const renderProp1 = jest.fn()
        const renderProp2 = jest.fn()

        render(
          <Iterate.Array
            value={[
              { mem: 'A' },
              { mem: 'B' },
              { mem: 'C' },
              { mem: 'D', second: '2nd' },
            ]}
          >
            {renderProp1}
            {renderProp2}
          </Iterate.Array>
        )

        expect(renderProp1).toHaveBeenCalledTimes(4)
        expect(renderProp1).toHaveBeenNthCalledWith(
          1,
          { mem: 'A' },
          0,
          expect.any(Array)
        )
        expect(renderProp1).toHaveBeenNthCalledWith(
          2,
          { mem: 'B' },
          1,
          expect.any(Array)
        )
        expect(renderProp1).toHaveBeenNthCalledWith(
          3,
          { mem: 'C' },
          2,
          expect.any(Array)
        )
        expect(renderProp1).toHaveBeenNthCalledWith(
          4,
          { mem: 'D', second: '2nd' },
          3,
          expect.any(Array)
        )

        expect(renderProp2).toHaveBeenCalledTimes(4)
        expect(renderProp2).toHaveBeenNthCalledWith(
          1,
          { mem: 'A' },
          0,
          expect.any(Array)
        )
        expect(renderProp2).toHaveBeenNthCalledWith(
          2,
          { mem: 'B' },
          1,
          expect.any(Array)
        )
        expect(renderProp2).toHaveBeenNthCalledWith(
          3,
          { mem: 'C' },
          2,
          expect.any(Array)
        )
        expect(renderProp2).toHaveBeenNthCalledWith(
          4,
          { mem: 'D', second: '2nd' },
          3,
          expect.any(Array)
        )
      })
    })
  })

  describe('in DataContext', () => {
    it('should call onChange when new item is added', () => {
      const onChangeDataContext = jest.fn()
      const onChangeIterate = jest.fn()

      render(
        <DataContext.Provider onChange={onChangeDataContext}>
          <Iterate.Array path="/myList" onChange={onChangeIterate}>
            content
          </Iterate.Array>

          <Iterate.PushButton path="/myList" pushValue="foo" />
        </DataContext.Provider>
      )

      const addButton = document.querySelector('button')
      fireEvent.click(addButton)

      const elements = document.querySelectorAll(
        '.dnb-forms-iterate__element'
      )
      expect(elements).toHaveLength(1)

      expect(onChangeDataContext).toHaveBeenCalledTimes(1)
      expect(onChangeDataContext).toHaveBeenLastCalledWith(
        {
          myList: ['foo'],
        },
        expect.anything()
      )
      expect(onChangeIterate).toHaveBeenCalledTimes(1)
      expect(onChangeIterate).toHaveBeenLastCalledWith(['foo'])
    })

    describe('defaultValue on Iterate.Array', () => {
      it('should validate required fields', async () => {
        const onSubmit = jest.fn()

        render(
          <Form.Handler onSubmit={onSubmit}>
            <Iterate.Array path="/myList" defaultValue={[null]}>
              <Field.String itemPath="/" required />
            </Iterate.Array>
          </Form.Handler>
        )

        const form = document.querySelector('form')
        fireEvent.submit(form)

        expect(onSubmit).toHaveLength(0)

        await waitFor(() => {
          expect(
            document.querySelectorAll('.dnb-form-status')
          ).toHaveLength(1)
        })
      })

      it('should handle "defaultValue" (empty string) in React.StrictMode', () => {
        const onSubmit = jest.fn()

        render(
          <React.StrictMode>
            <Form.Handler onSubmit={onSubmit}>
              <Iterate.Array path="/myList" defaultValue={['']}>
                <Field.String itemPath="/" />
              </Iterate.Array>
            </Form.Handler>
          </React.StrictMode>
        )

        const form = document.querySelector('form')
        const input = document.querySelector('input')

        expect(input).toHaveValue('')

        fireEvent.submit(form)

        expect(onSubmit).toHaveBeenCalledTimes(1)
        expect(onSubmit).toHaveBeenLastCalledWith(
          { myList: [''] },
          expect.anything()
        )
      })

      it('should handle "defaultValue" (with value) in React.StrictMode', () => {
        const onSubmit = jest.fn()

        render(
          <React.StrictMode>
            <Form.Handler onSubmit={onSubmit}>
              <Iterate.Array path="/myList" defaultValue={['foo']}>
                <Field.String itemPath="/" />
              </Iterate.Array>
            </Form.Handler>
          </React.StrictMode>
        )

        const form = document.querySelector('form')
        const input = document.querySelector('input')

        expect(input).toHaveValue('foo')

        fireEvent.submit(form)

        expect(onSubmit).toHaveBeenCalledTimes(1)
        expect(onSubmit).toHaveBeenLastCalledWith(
          { myList: ['foo'] },
          expect.anything()
        )
      })

      it('should handle "defaultValue" (with null) in React.StrictMode', () => {
        const onSubmit = jest.fn()

        render(
          <React.StrictMode>
            <Form.Handler onSubmit={onSubmit}>
              <Iterate.Array path="/myList" defaultValue={[null]}>
                <Field.String itemPath="/" defaultValue="foo" />
              </Iterate.Array>
            </Form.Handler>
          </React.StrictMode>
        )

        const form = document.querySelector('form')
        const input = document.querySelector('input')

        expect(input).toHaveValue('foo')

        fireEvent.submit(form)

        expect(onSubmit).toHaveBeenCalledTimes(1)
        expect(onSubmit).toHaveBeenLastCalledWith(
          { myList: ['foo'] },
          expect.anything()
        )
      })

      it('should not set defaultValue when item gets removed', () => {
        const onSubmit = jest.fn()

        render(
          <React.StrictMode>
            <Form.Handler onSubmit={onSubmit}>
              <Iterate.Array path="/myList" defaultValue={[null]}>
                <Field.String itemPath="/" defaultValue="foo" />
              </Iterate.Array>
            </Form.Handler>
          </React.StrictMode>
        )

        const form = document.querySelector('form')
        const input = document.querySelector('input')

        expect(input).toHaveValue('foo')

        fireEvent.submit(form)

        expect(onSubmit).toHaveBeenCalledTimes(1)
        expect(onSubmit).toHaveBeenLastCalledWith(
          { myList: ['foo'] },
          expect.anything()
        )
      })

      it('should set empty array in the data context', () => {
        const onSubmit = jest.fn()

        render(
          <React.StrictMode>
            <Form.Handler onSubmit={onSubmit}>
              <Iterate.Array path="/myList" defaultValue={[]}>
                content
              </Iterate.Array>
            </Form.Handler>
          </React.StrictMode>
        )

        const form = document.querySelector('form')
        fireEvent.submit(form)

        expect(onSubmit).toHaveBeenCalledTimes(1)
        expect(onSubmit).toHaveBeenLastCalledWith(
          { myList: [] },
          expect.anything()
        )
      })
    })

    describe('with primitive elements', () => {
      describe('referenced with path', () => {
        it('should distribute values and receive callbacks on both iterate and context', async () => {
          const dataContextOnChange = jest.fn()
          const iterateOnChange = jest.fn()

          render(
            <DataContext.Provider
              data={{
                someList: ['foo', 'bar'],
                otherValue: 'lorem ipsu',
              }}
              onChange={dataContextOnChange}
            >
              <Iterate.Array path="/someList" onChange={iterateOnChange}>
                <Field.String itemPath="/" />
                <Field.String path="/otherValue" />
              </Iterate.Array>
            </DataContext.Provider>
          )

          const fields = document.querySelectorAll('input')
          expect(fields).toHaveLength(4)
          const fieldFoo = fields[0]
          const fieldLorem1 = fields[1]
          const fieldBar = fields[2]
          const fieldLorem2 = fields[3]
          expect(fieldFoo).toHaveDisplayValue('foo')
          expect(fieldLorem1).toHaveDisplayValue('lorem ipsu')
          expect(fieldBar).toHaveDisplayValue('bar')
          expect(fieldLorem2).toHaveDisplayValue('lorem ipsu')

          await userEvent.type(fieldFoo, 'ls')
          await userEvent.type(fieldLorem1, 'm')
          await userEvent.type(fieldBar, ' code')

          expect(iterateOnChange).toHaveBeenCalledTimes(7)

          expect(iterateOnChange).toHaveBeenNthCalledWith(
            1,
            ['fool', 'bar'],
            expect.anything()
          )
          expect(iterateOnChange).toHaveBeenNthCalledWith(
            2,
            ['fools', 'bar'],
            expect.anything()
          )
          expect(iterateOnChange).toHaveBeenNthCalledWith(
            3,
            ['fools', 'bar '],
            expect.anything()
          )
          expect(iterateOnChange).toHaveBeenNthCalledWith(
            4,
            ['fools', 'bar c'],
            expect.anything()
          )
          expect(iterateOnChange).toHaveBeenNthCalledWith(
            5,
            ['fools', 'bar co'],
            expect.anything()
          )
          expect(iterateOnChange).toHaveBeenNthCalledWith(
            6,
            ['fools', 'bar cod'],
            expect.anything()
          )
          expect(iterateOnChange).toHaveBeenNthCalledWith(
            7,
            ['fools', 'bar code'],
            expect.anything()
          )

          expect(dataContextOnChange).toHaveBeenCalledTimes(8)
          expect(dataContextOnChange).toHaveBeenNthCalledWith(
            1,
            {
              someList: ['fool', 'bar'],
              otherValue: 'lorem ipsu',
            },
            expect.anything()
          )
          expect(dataContextOnChange).toHaveBeenNthCalledWith(
            2,
            {
              someList: ['fools', 'bar'],
              otherValue: 'lorem ipsu',
            },
            expect.anything()
          )
          expect(dataContextOnChange).toHaveBeenNthCalledWith(
            3,
            {
              someList: ['fools', 'bar'],
              otherValue: 'lorem ipsum',
            },
            expect.anything()
          )
          expect(dataContextOnChange).toHaveBeenNthCalledWith(
            4,
            {
              someList: ['fools', 'bar '],
              otherValue: 'lorem ipsum',
            },
            expect.anything()
          )
          expect(dataContextOnChange).toHaveBeenNthCalledWith(
            5,
            {
              someList: ['fools', 'bar c'],
              otherValue: 'lorem ipsum',
            },
            expect.anything()
          )
          expect(dataContextOnChange).toHaveBeenNthCalledWith(
            6,
            {
              someList: ['fools', 'bar co'],
              otherValue: 'lorem ipsum',
            },
            expect.anything()
          )
          expect(dataContextOnChange).toHaveBeenNthCalledWith(
            7,
            {
              someList: ['fools', 'bar cod'],
              otherValue: 'lorem ipsum',
            },
            expect.anything()
          )
          expect(dataContextOnChange).toHaveBeenNthCalledWith(
            8,
            {
              someList: ['fools', 'bar code'],
              otherValue: 'lorem ipsum',
            },
            expect.anything()
          )
        })

        it('should filter data based on the given "filterSubmitData" property method', () => {
          let filteredData = undefined
          const onSubmit = jest.fn((data) => (filteredData = data))

          const filterDataHandler: FilterData = jest.fn(({ props }) => {
            if (props.disabled === true) {
              return false
            }
          })

          const { rerender } = render(
            <DataContext.Provider
              onSubmit={onSubmit}
              filterSubmitData={filterDataHandler}
            >
              <Iterate.Array
                path="/myList"
                value={[
                  { foo: 'foo 1', bar: 'bar 1' },
                  { foo: 'foo 2', bar: 'bar 2' },
                ]}
              >
                <Field.String label="Label" itemPath="/foo" />
                <Field.String label="Label" itemPath="/bar" />
              </Iterate.Array>

              <Form.SubmitButton>Submit</Form.SubmitButton>
            </DataContext.Provider>
          )

          const submitButton = document.querySelector('button')

          fireEvent.click(submitButton)

          expect(onSubmit).toHaveBeenCalledTimes(1)
          expect(onSubmit).toHaveBeenLastCalledWith(
            {
              myList: [
                {
                  bar: 'bar 1',
                  foo: 'foo 1',
                },
                {
                  bar: 'bar 2',
                  foo: 'foo 2',
                },
              ],
            },
            expect.anything()
          )

          expect(filterDataHandler).toHaveBeenCalledTimes(5)
          expect(filterDataHandler).toHaveBeenNthCalledWith(1, {
            path: '/myList',
            value: [
              { bar: 'bar 1', foo: 'foo 1' },
              { bar: 'bar 2', foo: 'foo 2' },
            ],
            displayValue: undefined,
            label: undefined,
            data: {
              myList: [
                { bar: 'bar 1', foo: 'foo 1' },
                { bar: 'bar 2', foo: 'foo 2' },
              ],
            },
            props: expect.objectContaining({ path: '/myList' }),
            internal: { error: undefined },
          })
          expect(filterDataHandler).toHaveBeenNthCalledWith(2, {
            path: '/myList/0/foo',
            value: 'foo 1',
            displayValue: 'foo 1',
            label: 'Label',
            data: {
              myList: [
                { bar: 'bar 1', foo: 'foo 1' },
                { bar: 'bar 2', foo: 'foo 2' },
              ],
            },
            props: expect.objectContaining({
              itemPath: '/foo',
            }),
            internal: { error: undefined },
          })
          expect(filterDataHandler).toHaveBeenNthCalledWith(3, {
            path: '/myList/0/bar',
            value: 'bar 1',
            displayValue: 'bar 1',
            label: 'Label',
            data: {
              myList: [
                { bar: 'bar 1', foo: 'foo 1' },
                { bar: 'bar 2', foo: 'foo 2' },
              ],
            },
            props: expect.objectContaining({
              itemPath: '/bar',
            }),
            internal: { error: undefined },
          })
          expect(filterDataHandler).toHaveBeenNthCalledWith(4, {
            path: '/myList/1/foo',
            value: 'foo 2',
            displayValue: 'foo 2',
            label: 'Label',
            data: {
              myList: [
                { bar: 'bar 1', foo: 'foo 1' },
                { bar: 'bar 2', foo: 'foo 2' },
              ],
            },
            props: expect.objectContaining({ itemPath: '/foo' }),
            internal: { error: undefined },
          })
          expect(filterDataHandler).toHaveBeenNthCalledWith(5, {
            path: '/myList/1/bar',
            value: 'bar 2',
            displayValue: 'bar 2',
            label: 'Label',
            data: {
              myList: [
                { bar: 'bar 1', foo: 'foo 1' },
                { bar: 'bar 2', foo: 'foo 2' },
              ],
            },
            props: expect.objectContaining({ itemPath: '/bar' }),
            internal: { error: undefined },
          })

          rerender(
            <DataContext.Provider
              onSubmit={onSubmit}
              filterSubmitData={filterDataHandler}
            >
              <Iterate.Array
                path="/myList"
                value={[
                  { foo: 'foo 1', bar: 'bar 1' },
                  { foo: 'foo 2', bar: 'bar 2' },
                ]}
              >
                <Field.String label="Label" itemPath="/foo" disabled />
                <Field.String label="Label" itemPath="/bar" />
              </Iterate.Array>

              <Form.SubmitButton>Submit</Form.SubmitButton>
            </DataContext.Provider>
          )

          expect(filteredData).toEqual({
            myList: [
              { bar: 'bar 1', foo: 'foo 1' },
              { bar: 'bar 2', foo: 'foo 2' },
            ],
          })

          fireEvent.click(submitButton)

          expect(filterDataHandler).toHaveBeenCalledTimes(10)
          expect(filterDataHandler).toHaveBeenNthCalledWith(6, {
            path: '/myList',
            value: [
              { bar: 'bar 1', foo: 'foo 1' },
              { bar: 'bar 2', foo: 'foo 2' },
            ],
            displayValue: undefined,
            label: undefined,
            data: {
              myList: [
                { bar: 'bar 1', foo: 'foo 1' },
                { bar: 'bar 2', foo: 'foo 2' },
              ],
            },
            props: expect.objectContaining({ path: '/myList' }),
            internal: { error: undefined },
          })
          expect(filterDataHandler).toHaveBeenNthCalledWith(7, {
            path: '/myList/0/foo',
            value: 'foo 1',
            displayValue: 'foo 1',
            label: 'Label',
            data: {
              myList: [
                { bar: 'bar 1', foo: 'foo 1' },
                { bar: 'bar 2', foo: 'foo 2' },
              ],
            },
            props: expect.objectContaining({
              itemPath: '/foo',
            }),
            internal: { error: undefined },
          })
          expect(filterDataHandler).toHaveBeenNthCalledWith(8, {
            path: '/myList/0/bar',
            value: 'bar 1',
            displayValue: 'bar 1',
            label: 'Label',
            data: {
              myList: [
                { bar: 'bar 1', foo: 'foo 1' },
                { bar: 'bar 2', foo: 'foo 2' },
              ],
            },
            props: expect.objectContaining({
              itemPath: '/bar',
            }),
            internal: { error: undefined },
          })
          expect(filterDataHandler).toHaveBeenNthCalledWith(9, {
            path: '/myList/1/foo',
            value: 'foo 2',
            displayValue: 'foo 2',
            label: 'Label',
            data: {
              myList: [
                { bar: 'bar 1', foo: 'foo 1' },
                { bar: 'bar 2', foo: 'foo 2' },
              ],
            },
            props: expect.objectContaining({
              itemPath: '/foo',
            }),
            internal: { error: undefined },
          })
          expect(filterDataHandler).toHaveBeenNthCalledWith(10, {
            path: '/myList/1/bar',
            value: 'bar 2',
            displayValue: 'bar 2',
            label: 'Label',
            data: {
              myList: [
                { bar: 'bar 1', foo: 'foo 1' },
                { bar: 'bar 2', foo: 'foo 2' },
              ],
            },
            props: expect.objectContaining({
              itemPath: '/bar',
            }),
            internal: { error: undefined },
          })

          expect(filteredData).toEqual({
            myList: [
              {
                bar: 'bar 1',
              },
              {
                bar: 'bar 2',
              },
            ],
          })
        })

        it('should filter data based on the given "filterSubmitData" property paths', () => {
          let filteredData = undefined
          const onSubmit = jest.fn((data) => (filteredData = data))

          const Content = () => {
            return (
              <>
                <Iterate.Array
                  path="/myList"
                  value={[
                    { foo: 'foo 1', bar: 'bar 1' },
                    { foo: 'foo 2', bar: 'bar 2' },
                  ]}
                >
                  <Field.String itemPath="/foo" />
                  <Field.String itemPath="/bar" />
                </Iterate.Array>

                <Form.SubmitButton>Submit</Form.SubmitButton>
              </>
            )
          }

          const { rerender } = render(
            <DataContext.Provider
              onSubmit={onSubmit}
              filterSubmitData={{
                '/myList/0/foo': false,
              }}
            >
              <Content />
            </DataContext.Provider>
          )

          const submitButton = document.querySelector('button')

          fireEvent.click(submitButton)

          expect(onSubmit).toHaveBeenCalledTimes(1)
          expect(onSubmit).toHaveBeenLastCalledWith(
            {
              myList: [
                {
                  bar: 'bar 1',
                },
                {
                  bar: 'bar 2',
                  foo: 'foo 2',
                },
              ],
            },
            expect.anything()
          )
          expect(filteredData).toEqual({
            myList: [
              {
                bar: 'bar 1',
              },
              {
                bar: 'bar 2',
                foo: 'foo 2',
              },
            ],
          })

          rerender(
            <DataContext.Provider
              onSubmit={onSubmit}
              filterSubmitData={{
                '/myList/1': false,
              }}
            >
              <Content />
            </DataContext.Provider>
          )

          fireEvent.click(submitButton)

          expect(onSubmit).toHaveBeenCalledTimes(2)
          expect(onSubmit).toHaveBeenLastCalledWith(
            {
              myList: [
                {
                  bar: 'bar 1',
                  foo: 'foo 1',
                },
              ],
            },
            expect.anything()
          )
          expect(filteredData).toEqual({
            myList: [
              {
                bar: 'bar 1',
                foo: 'foo 1',
              },
            ],
          })

          rerender(
            <DataContext.Provider
              onSubmit={onSubmit}
              filterSubmitData={{
                '/myList/*/foo': false,
              }}
            >
              <Content />
            </DataContext.Provider>
          )

          fireEvent.click(submitButton)

          expect(onSubmit).toHaveBeenCalledTimes(3)
          expect(onSubmit).toHaveBeenLastCalledWith(
            {
              myList: [
                {
                  bar: 'bar 1',
                },
                {
                  bar: 'bar 2',
                },
              ],
            },
            expect.anything()
          )
          expect(filteredData).toEqual({
            myList: [
              {
                bar: 'bar 1',
              },
              {
                bar: 'bar 2',
              },
            ],
          })
        })

        it('should filter data based with multi wildcard paths', () => {
          let filteredData = undefined
          const onSubmit = jest.fn(
            (data, { filterData }) =>
              (filteredData = filterData({
                '/firstList/0/secondList/*/foo': false,
                '/firstList/1/secondList/*/bar': false,
              }))
          )

          render(
            <DataContext.Provider
              onSubmit={onSubmit}
              data={{
                firstList: [
                  {
                    foo: 'foo 1',
                    secondList: [
                      { foo: 'foo 1', bar: 'bar 1' },
                      { foo: 'foo 2', bar: 'bar 2' },
                    ],
                  },
                  {
                    foo: 'foo 2',
                    secondList: [
                      { foo: 'foo 1', bar: 'bar 1' },
                      { foo: 'foo 2', bar: 'bar 2' },
                    ],
                  },
                ],
              }}
            >
              <Form.SubmitButton>Submit</Form.SubmitButton>
            </DataContext.Provider>
          )

          const submitButton = document.querySelector('button')

          fireEvent.click(submitButton)

          expect(onSubmit).toHaveBeenCalledTimes(1)
          expect(onSubmit).toHaveBeenLastCalledWith(
            {
              firstList: [
                {
                  foo: 'foo 1',
                  secondList: [
                    {
                      foo: 'foo 1',
                      bar: 'bar 1',
                    },
                    {
                      foo: 'foo 2',
                      bar: 'bar 2',
                    },
                  ],
                },
                {
                  foo: 'foo 2',
                  secondList: [
                    {
                      foo: 'foo 1',
                      bar: 'bar 1',
                    },
                    {
                      foo: 'foo 2',
                      bar: 'bar 2',
                    },
                  ],
                },
              ],
            },
            expect.anything()
          )
          expect(filteredData).toEqual({
            firstList: [
              {
                foo: 'foo 1',
                secondList: [
                  {
                    bar: 'bar 1',
                  },
                  {
                    bar: 'bar 2',
                  },
                ],
              },
              {
                foo: 'foo 2',
                secondList: [
                  {
                    foo: 'foo 1',
                  },
                  {
                    foo: 'foo 2',
                  },
                ],
              },
            ],
          })
        })
      })
    })
  })

  describe('should render without flex', () => {
    it('when "withoutFlex" is true', () => {
      const log = jest.spyOn(console, 'log').mockImplementation()

      const { container } = render(
        <Iterate.Array value={['one', 'two', 'three']} withoutFlex>
          <Value.String itemPath="/" />
        </Iterate.Array>
      )

      expect(container.children).toHaveLength(3)
      expect(container.querySelector('.dnb-flex-container')).toBeNull()
      expect(log).toHaveBeenCalledWith(
        expect.any(String),
        'Value components as siblings should be wrapped inside a Value.SummaryList:',
        { itemPath: '/', label: '', path: undefined }
      )

      log.mockRestore()
    })

    it('when inside "SummaryList"', () => {
      const { container } = render(
        <Value.SummaryList>
          <Iterate.Array value={['one', 'two', 'three']}>
            <Value.String itemPath="/" />
          </Iterate.Array>
        </Value.SummaryList>
      )

      expect(container.querySelector('.dnb-flex-container')).toBeNull()
    })

    it('when inside "Composition"', () => {
      const { container } = render(
        <Value.Composition>
          <Iterate.Array value={['one', 'two', 'three']}>
            <Value.String itemPath="/" />
          </Iterate.Array>
        </Value.Composition>
      )

      expect(container.querySelector('.dnb-flex-container')).toBeNull()
    })
  })

  describe('value and defaultValue', () => {
    it('should support "value" on fields inside iterate', () => {
      const onSubmit = jest.fn()

      render(
        <Form.Handler
          onSubmit={onSubmit}
          data={{
            myList: ['', undefined, null, 'something'],
          }}
        >
          <Iterate.Array path="/myList">
            {(value, index) => {
              return (
                <Field.String itemPath="/" value={`value ${index + 1}`} />
              )
            }}
          </Iterate.Array>
        </Form.Handler>
      )

      const form = document.querySelector('form')
      const [first, second, third, forth] = Array.from(
        document.querySelectorAll('input')
      )

      expect(first).toHaveValue('value 1')
      expect(second).toHaveValue('value 2')
      expect(third).toHaveValue('value 3')
      expect(forth).toHaveValue('value 4')

      fireEvent.submit(form)

      expect(onSubmit).toHaveBeenCalledTimes(1)
      expect(onSubmit).toHaveBeenLastCalledWith(
        {
          myList: ['value 1', 'value 2', 'value 3', 'value 4'],
        },
        expect.anything()
      )
    })

    it('should support "defaultValue" on fields inside iterate', () => {
      const onSubmit = jest.fn()

      render(
        <Form.Handler
          onSubmit={onSubmit}
          data={{
            myList: [undefined, null, 'something'],
          }}
        >
          <Iterate.Array path="/myList">
            {(value, index) => {
              return (
                <Field.String
                  itemPath="/"
                  defaultValue={`default value ${index + 1}`}
                />
              )
            }}
          </Iterate.Array>
        </Form.Handler>
      )

      const form = document.querySelector('form')
      const [first, second, third] = Array.from(
        document.querySelectorAll('input')
      )

      expect(first).toHaveValue('default value 1')
      expect(second).toHaveValue('default value 2')
      expect(third).toHaveValue('something')

      fireEvent.submit(form)

      expect(onSubmit).toHaveBeenCalledTimes(1)
      expect(onSubmit).toHaveBeenLastCalledWith(
        {
          myList: ['default value 1', 'default value 2', 'something'],
        },
        expect.anything()
      )
    })
  })

  describe('itemPath', () => {
    it('should iterate over the values given in data context', () => {
      const onSubmit = jest.fn()
      let collectedContext = null

      render(
        <Form.Handler
          onSubmit={onSubmit}
          data={{
            outer: [{ inner: ['value 1', 'value 2'] }],
          }}
        >
          <Iterate.Array path="/outer">
            <Iterate.Array itemPath="/inner">
              <Field.String itemPath="/" />
            </Iterate.Array>
          </Iterate.Array>

          <DataContext.Consumer>
            {(context) => {
              collectedContext = context
              return null
            }}
          </DataContext.Consumer>
        </Form.Handler>
      )

      const form = document.querySelector('form')
      const [first, second] = Array.from(
        document.querySelectorAll('input')
      )

      expect(first).toHaveValue('value 1')
      expect(second).toHaveValue('value 2')

      expect(collectedContext.data).toEqual({
        outer: [{ inner: ['value 1', 'value 2'] }],
      })

      fireEvent.submit(form)

      expect(onSubmit).toHaveBeenCalledTimes(1)
      expect(onSubmit).toHaveBeenLastCalledWith(
        {
          outer: [{ inner: ['value 1', 'value 2'] }],
        },
        expect.anything()
      )
    })

    it('should iterate over the values given as defaultValue', () => {
      const onSubmit = jest.fn()
      let collectedContext = null

      render(
        <Form.Handler onSubmit={onSubmit}>
          <Iterate.Array
            path="/outer"
            defaultValue={[{ inner: ['value 1', 'value 2'] }]}
          >
            <Iterate.Array itemPath="/inner">
              <Field.String itemPath="/" />
            </Iterate.Array>
          </Iterate.Array>

          <DataContext.Consumer>
            {(context) => {
              collectedContext = context
              return null
            }}
          </DataContext.Consumer>
        </Form.Handler>
      )

      const form = document.querySelector('form')
      const [first, second] = Array.from(
        document.querySelectorAll('input')
      )

      expect(first).toHaveValue('value 1')
      expect(second).toHaveValue('value 2')

      fireEvent.submit(form)

      expect(onSubmit).toHaveBeenCalledTimes(1)
      expect(onSubmit).toHaveBeenLastCalledWith(
        {
          outer: [{ inner: ['value 1', 'value 2'] }],
        },
        expect.anything()
      )
      expect(collectedContext.data).toEqual({
        outer: [{ inner: ['value 1', 'value 2'] }],
      })
    })

    it('should iterate over the values given as defaultValue (nested)', () => {
      const onSubmit = jest.fn()
      let collectedContext = null

      render(
        <Form.Handler onSubmit={onSubmit}>
          <Iterate.Array path="/outer" defaultValue={[{}]}>
            <Iterate.Array
              itemPath="/inner"
              defaultValue={['value 1', 'value 2']}
            >
              <Field.String itemPath="/" />
            </Iterate.Array>
          </Iterate.Array>

          <DataContext.Consumer>
            {(context) => {
              collectedContext = context
              return null
            }}
          </DataContext.Consumer>
        </Form.Handler>
      )

      const form = document.querySelector('form')
      const [first, second] = Array.from(
        document.querySelectorAll('input')
      )

      expect(first).toHaveValue('value 1')
      expect(second).toHaveValue('value 2')

      fireEvent.submit(form)

      expect(onSubmit).toHaveBeenCalledTimes(1)
      expect(onSubmit).toHaveBeenLastCalledWith(
        {
          outer: [{ inner: ['value 1', 'value 2'] }],
        },
        expect.anything()
      )
      expect(collectedContext.data).toEqual({
        outer: [{ inner: ['value 1', 'value 2'] }],
      })
    })

    it('should update data context on changes', async () => {
      const onSubmit = jest.fn()

      render(
        <Form.Handler
          onSubmit={onSubmit}
          data={{
            outer: [{ inner: ['value 1', 'value 2'] }],
          }}
        >
          <Iterate.Array path="/outer">
            <Iterate.Array itemPath="/inner">
              <Field.String itemPath="/" />
            </Iterate.Array>
          </Iterate.Array>
        </Form.Handler>
      )

      const form = document.querySelector('form')
      const [first, second] = Array.from(
        document.querySelectorAll('input')
      )

      expect(first).toHaveValue('value 1')
      expect(second).toHaveValue('value 2')

      await userEvent.type(first, '{Backspace}foo')
      await userEvent.type(second, '{Backspace}bar')

      expect(first).toHaveValue('value foo')
      expect(second).toHaveValue('value bar')

      fireEvent.submit(form)

      expect(onSubmit).toHaveBeenCalledTimes(1)
      expect(onSubmit).toHaveBeenLastCalledWith(
        {
          outer: [{ inner: ['value foo', 'value bar'] }],
        },
        expect.anything()
      )
    })

    it('should support "defaultValue" on fields inside nested iterate', () => {
      const onSubmit = jest.fn()

      render(
        <Form.Handler
          onSubmit={onSubmit}
          data={{
            outer: [{ inner: [undefined, null, 'something'] }],
          }}
        >
          <Iterate.Array path="/outer">
            <Iterate.Array itemPath="/inner">
              {(value, index) => {
                return (
                  <Field.String
                    itemPath="/"
                    defaultValue={`default value ${index + 1}`}
                  />
                )
              }}
            </Iterate.Array>
          </Iterate.Array>
        </Form.Handler>
      )

      const form = document.querySelector('form')
      const [first, second, third] = Array.from(
        document.querySelectorAll('input')
      )

      expect(first).toHaveValue('default value 1')
      expect(second).toHaveValue('default value 2')
      expect(third).toHaveValue('something')

      fireEvent.submit(form)

      expect(onSubmit).toHaveBeenCalledTimes(1)
      expect(onSubmit).toHaveBeenLastCalledWith(
        {
          outer: [
            { inner: ['default value 1', 'default value 2', 'something'] },
          ],
        },
        expect.anything()
      )
    })
  })

  it('should contain tabindex of -1', () => {
    render(<Iterate.Array value={['one']}>content</Iterate.Array>)

    expect(
      document.querySelector('.dnb-forms-iterate__element')
    ).toHaveAttribute('tabindex', '-1')
  })

  it('should set elementRef', () => {
    let elementRef = null

    const ContextConsumer = () => {
      const context = React.useContext(IterateItemContext)

      useEffect(() => {
        elementRef = context.elementRef.current
      })

      return null
    }

    render(
      <Iterate.Array value={['one']}>
        <ContextConsumer />
      </Iterate.Array>
    )

    expect(elementRef).toBeDefined()
    expect(elementRef instanceof HTMLElement).toBeTruthy()
  })

  it('should set index and value', () => {
    let contextToTest = null

    const ContextConsumer = () => {
      const context = React.useContext(IterateItemContext)

      useEffect(() => {
        contextToTest = context
      })

      return null
    }

    render(
      <Iterate.Array value={['one']}>
        <ContextConsumer />
      </Iterate.Array>
    )

    expect(contextToTest).toMatchObject({
      index: 0,
      value: 'one',
    })
  })

  it('focuses on the block when focusOnOpen prop is true', async () => {
    const { rerender } = render(
      <Iterate.Array value={['foo']}>
        {(itemValue, index) => {
          return (
            <output>
              Content {JSON.stringify(itemValue)} {index}
            </output>
          )
        }}
      </Iterate.Array>
    )

    expect(
      document.querySelectorAll('.dnb-forms-iterate__element')
    ).toHaveLength(1)
    expect(document.querySelector('output')).toHaveTextContent(
      'Content "foo" 0'
    )

    rerender(
      <Iterate.Array value={['foo', 'bar']}>
        {(itemValue, index) => {
          return (
            <output>
              Content {JSON.stringify(itemValue)} {index}
            </output>
          )
        }}
      </Iterate.Array>
    )

    const outputs = document.querySelectorAll('output')
    expect(outputs[0]).toHaveTextContent('Content "foo" 0')
    expect(outputs[1]).toHaveTextContent('Content "bar" 1')
  })

  describe('limit', () => {
    it('should limit the number of rendered items', () => {
      const { rerender } = render(
        <Iterate.Array value={['foo', 'bar', 'baz']} limit={2}>
          <Value.String itemPath="/" />
        </Iterate.Array>
      )

      expect(
        document.querySelectorAll('.dnb-forms-iterate__element')
      ).toHaveLength(2)
      expect(document.body.textContent).toBe('foobar')

      rerender(
        <Iterate.Array value={['foo', 'bar', 'baz']} limit={1}>
          <Value.String itemPath="/" />
        </Iterate.Array>
      )

      expect(
        document.querySelectorAll('.dnb-forms-iterate__element')
      ).toHaveLength(1)
      expect(document.body.textContent).toBe('foo')
    })

    it('should not display a warning when the number of items exceeds the limit', () => {
      render(
        <Iterate.Array value={['foo', 'bar', 'baz']} limit={2}>
          <Value.String itemPath="/" />
        </Iterate.Array>
      )

      expect(document.querySelectorAll('.dnb-form-status')).toHaveLength(0)
    })
  })
})
