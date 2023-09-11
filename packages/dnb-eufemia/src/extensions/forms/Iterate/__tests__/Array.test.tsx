import '@testing-library/jest-dom'
import React from 'react'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Iterate from '..'
import Field from '../../Field'
import DataContext from '../../DataContext'

describe('Iterate.Array', () => {
  describe('with primitive elements', () => {
    it('should distribute values and receive callbacks', async () => {
      const onChange = jest.fn()
      render(
        <Iterate.Array value={['one', 'two', 'three']} onChange={onChange}>
          <Field.String elementPath="/" />
        </Iterate.Array>,
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
          <Field.String elementPath="/foo" />
          <Field.String elementPath="/bar" />
        </Iterate.Array>,
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
  })

  describe('using single render prop', () => {
    describe('with primitive elements', () => {
      it('should call renderers with each element value', async () => {
        const renderProp = jest.fn()
        render(
          <Iterate.Array value={['first', 'second', 'third']}>
            {renderProp}
          </Iterate.Array>,
        )

        expect(renderProp).toHaveBeenCalledTimes(3)
        expect(renderProp).toHaveBeenNthCalledWith(1, 'first', 0)
        expect(renderProp).toHaveBeenNthCalledWith(2, 'second', 1)
        expect(renderProp).toHaveBeenNthCalledWith(3, 'third', 2)
      })
    })
    describe('with object elements and multiple render props', () => {
      it('should call renderers with each element value', async () => {
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
            <Field.String elementPath="/" />
            {renderProp1}
            {renderProp2}
          </Iterate.Array>,
        )

        expect(renderProp1).toHaveBeenCalledTimes(4)
        expect(renderProp1).toHaveBeenNthCalledWith(1, { mem: 'A' }, 0)
        expect(renderProp1).toHaveBeenNthCalledWith(2, { mem: 'B' }, 1)
        expect(renderProp1).toHaveBeenNthCalledWith(3, { mem: 'C' }, 2)
        expect(renderProp1).toHaveBeenNthCalledWith(
          4,
          { mem: 'D', second: '2nd' },
          3,
        )

        expect(renderProp2).toHaveBeenCalledTimes(4)
        expect(renderProp2).toHaveBeenNthCalledWith(1, { mem: 'A' }, 0)
        expect(renderProp2).toHaveBeenNthCalledWith(2, { mem: 'B' }, 1)
        expect(renderProp2).toHaveBeenNthCalledWith(3, { mem: 'C' }, 2)
        expect(renderProp2).toHaveBeenNthCalledWith(
          4,
          { mem: 'D', second: '2nd' },
          3,
        )
      })
    })
  })

  describe('in DataContext', () => {
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
                <Field.String elementPath="/" />
                <Field.String path="/otherValue" />
              </Iterate.Array>
            </DataContext.Provider>,
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
          expect(dataContextOnChange).toHaveBeenNthCalledWith(1, {
            someList: ['fool', 'bar'],
            otherValue: 'lorem ipsu',
          })
          expect(dataContextOnChange).toHaveBeenNthCalledWith(2, {
            someList: ['fools', 'bar'],
            otherValue: 'lorem ipsu',
          })
          expect(dataContextOnChange).toHaveBeenNthCalledWith(3, {
            someList: ['fools', 'bar'],
            otherValue: 'lorem ipsum',
          })
          expect(dataContextOnChange).toHaveBeenNthCalledWith(4, {
            someList: ['fools', 'bar '],
            otherValue: 'lorem ipsum',
          })
          expect(dataContextOnChange).toHaveBeenNthCalledWith(5, {
            someList: ['fools', 'bar c'],
            otherValue: 'lorem ipsum',
          })
          expect(dataContextOnChange).toHaveBeenNthCalledWith(6, {
            someList: ['fools', 'bar co'],
            otherValue: 'lorem ipsum',
          })
          expect(dataContextOnChange).toHaveBeenNthCalledWith(7, {
            someList: ['fools', 'bar cod'],
            otherValue: 'lorem ipsum',
          })
          expect(dataContextOnChange).toHaveBeenNthCalledWith(8, {
            someList: ['fools', 'bar code'],
            otherValue: 'lorem ipsum',
          })
        })
      })
    })
  })
})
