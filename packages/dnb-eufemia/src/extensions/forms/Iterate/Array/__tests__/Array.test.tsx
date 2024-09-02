import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import * as Iterate from '../..'
import * as DataContext from '../../../DataContext'
import { Field, FieldBlock, Form, Value, ValueBlock } from '../../..'
import { FilterData } from '../../../DataContext'

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
      expect(onChange).toHaveBeenNthCalledWith(1, ['one1', 'two', 'three'])
      expect(onChange).toHaveBeenNthCalledWith(2, [
        'one1',
        'two',
        'threet',
      ])
      expect(onChange).toHaveBeenNthCalledWith(3, [
        'one1',
        'two',
        'threeth',
      ])
      expect(onChange).toHaveBeenNthCalledWith(4, [
        'one1',
        'two',
        'threethr',
      ])
      expect(onChange).toHaveBeenNthCalledWith(5, [
        'one1',
        'two',
        'threethre',
      ])
      expect(onChange).toHaveBeenNthCalledWith(6, [
        'one1',
        'two',
        'threethree',
      ])
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
    })

    describe('label', () => {
      it('should replace {itemNr} in labels for fields and values', () => {
        render(
          <Iterate.Array value={['foo', 'bar']}>
            <Field.String itemPath="/" label="Field label {itemNr}" />
            <Value.String itemPath="/" label="Value label {itemNr}" />
          </Iterate.Array>
        )

        const [fieldLabel1, valueLabel1, fieldLabel2, valueLabel2] =
          Array.from(document.querySelectorAll('.dnb-form-label'))

        expect(fieldLabel1).toHaveTextContent('Field label 1')
        expect(fieldLabel2).toHaveTextContent('Field label 2')
        expect(valueLabel1).toHaveTextContent('Value label 1')
        expect(valueLabel2).toHaveTextContent('Value label 2')
      })

      it('should replace {itemNr} in labels for FieldBlock and ValueBlock', () => {
        render(
          <Iterate.Array value={['foo', 'bar']}>
            <FieldBlock label="FieldBlock label {itemNr}">
              content
            </FieldBlock>
            <ValueBlock label="ValueBlock label {itemNr}">
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
      expect(onChange).toHaveBeenNthCalledWith(1, [
        { foo: 'foo 0', bar: 'bar 0a' },
        { foo: 'foo 1', bar: 'bar 1' },
        { foo: 'foo 2', bar: 'bar 2' },
      ])
      expect(onChange).toHaveBeenNthCalledWith(2, [
        { foo: 'foo 0', bar: 'bar 0a' },
        { foo: 'foo 1', bar: 'bar 1' },
        { foo: 'foo 2c', bar: 'bar 2' },
      ])
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

    it('should render input value defined by "countPathTransform"', () => {
      render(
        <Form.Handler data={{ count: 2 }}>
          <Iterate.Array
            path="/items"
            countPath="/count"
            countPathTransform={({ value, index }) =>
              Object.prototype.hasOwnProperty.call(value || {}, 'item')
                ? value
                : { item: index }
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
        expect(renderProp).toHaveBeenNthCalledWith(1, 'first', 0)
        expect(renderProp).toHaveBeenNthCalledWith(2, 'second', 1)
        expect(renderProp).toHaveBeenNthCalledWith(3, 'third', 2)
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
            <Field.String itemPath="/" />
            {renderProp1}
            {renderProp2}
          </Iterate.Array>
        )

        expect(renderProp1).toHaveBeenCalledTimes(4)
        expect(renderProp1).toHaveBeenNthCalledWith(1, { mem: 'A' }, 0)
        expect(renderProp1).toHaveBeenNthCalledWith(2, { mem: 'B' }, 1)
        expect(renderProp1).toHaveBeenNthCalledWith(3, { mem: 'C' }, 2)
        expect(renderProp1).toHaveBeenNthCalledWith(
          4,
          { mem: 'D', second: '2nd' },
          3
        )

        expect(renderProp2).toHaveBeenCalledTimes(4)
        expect(renderProp2).toHaveBeenNthCalledWith(1, { mem: 'A' }, 0)
        expect(renderProp2).toHaveBeenNthCalledWith(2, { mem: 'B' }, 1)
        expect(renderProp2).toHaveBeenNthCalledWith(3, { mem: 'C' }, 2)
        expect(renderProp2).toHaveBeenNthCalledWith(
          4,
          { mem: 'D', second: '2nd' },
          3
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

          expect(iterateOnChange).toHaveBeenNthCalledWith(1, [
            'fool',
            'bar',
          ])
          expect(iterateOnChange).toHaveBeenNthCalledWith(2, [
            'fools',
            'bar',
          ])
          expect(iterateOnChange).toHaveBeenNthCalledWith(3, [
            'fools',
            'bar ',
          ])
          expect(iterateOnChange).toHaveBeenNthCalledWith(4, [
            'fools',
            'bar c',
          ])
          expect(iterateOnChange).toHaveBeenNthCalledWith(5, [
            'fools',
            'bar co',
          ])
          expect(iterateOnChange).toHaveBeenNthCalledWith(6, [
            'fools',
            'bar cod',
          ])
          expect(iterateOnChange).toHaveBeenNthCalledWith(7, [
            'fools',
            'bar code',
          ])

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
                <Field.String itemPath="/foo" />
                <Field.String itemPath="/bar" />
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
                <Field.String itemPath="/foo" disabled />
                <Field.String itemPath="/bar" />
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
        'Value components as siblings should be wrapped inside a Value.SummaryList!'
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
    it('should warn when "value" prop is used', () => {
      const log = jest.spyOn(console, 'log').mockImplementation()

      render(
        <Form.Handler data={['foo']}>
          <Iterate.Array path="/">
            <Field.String itemPath="/" value="bar" />
          </Iterate.Array>
        </Form.Handler>
      )

      expect(log).toHaveBeenCalledWith(
        expect.any(String),
        'Using value="bar" prop inside Iterate is not supported yet'
      )

      log.mockRestore()
    })

    it('should warn when "defaultValue" prop is used', () => {
      const log = jest.spyOn(console, 'log').mockImplementation()

      render(
        <Form.Handler data={['foo']}>
          <Iterate.Array path="/">
            <Field.String itemPath="/" defaultValue="bar" />
          </Iterate.Array>
        </Form.Handler>
      )

      expect(log).toHaveBeenCalledWith(
        expect.any(String),
        'Using defaultValue="bar" prop inside iterate is not supported yet'
      )

      log.mockRestore()
    })
  })
})
