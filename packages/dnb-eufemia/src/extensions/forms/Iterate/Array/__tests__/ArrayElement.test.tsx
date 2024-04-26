import React, { useEffect } from 'react'
import { render } from '@testing-library/react'
import IterateElementContext from '../../IterateElementContext'
import Array from '../Array'

describe('ArrayElement', () => {
  it('should contain tabindex of -1', () => {
    render(<Array value={['one']}>content</Array>)

    expect(
      document.querySelector('.dnb-form-iterate__element')
    ).toHaveAttribute('tabindex', '-1')
  })

  it('should set elementRef', () => {
    let elementRef = null

    const ContextConsumer = () => {
      const context = React.useContext(IterateElementContext)

      useEffect(() => {
        elementRef = context.elementRef.current
      })

      return null
    }

    render(
      <Array value={['one']}>
        <ContextConsumer />
      </Array>
    )

    expect(elementRef).toBeDefined()
    expect(elementRef instanceof HTMLElement).toBeTruthy()
  })

  it('should set index and value', () => {
    let contextToTest = null

    const ContextConsumer = () => {
      const context = React.useContext(IterateElementContext)

      useEffect(() => {
        contextToTest = context
      })

      return null
    }

    render(
      <Array value={['one']}>
        <ContextConsumer />
      </Array>
    )

    expect(contextToTest).toMatchObject({
      index: 0,
      value: 'one',
    })
  })

  it('focuses on the block when focusOnOpen prop is true', async () => {
    const { rerender } = render(
      <Array value={['foo']}>
        {(itemValue, index) => {
          return (
            <output>
              Content {JSON.stringify(itemValue)} {index}
            </output>
          )
        }}
      </Array>
    )

    expect(
      document.querySelectorAll('.dnb-form-iterate__element')
    ).toHaveLength(1)
    expect(document.querySelector('output')).toHaveTextContent(
      'Content "foo" 0'
    )

    rerender(
      <Array value={['foo', 'bar']}>
        {(itemValue, index) => {
          return (
            <output>
              Content {JSON.stringify(itemValue)} {index}
            </output>
          )
        }}
      </Array>
    )

    const outputs = document.querySelectorAll('output')
    expect(outputs[0]).toHaveTextContent('Content "foo" 0')
    expect(outputs[1]).toHaveTextContent('Content "bar" 1')
  })
})
