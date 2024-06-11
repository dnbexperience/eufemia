import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { simulateAnimationEnd } from '../../../../../components/height-animation/__tests__/HeightAnimationUtils'
import IterateElementContext from '../../IterateElementContext'
import RemoveButton from '../../RemoveButton'
import ElementBlock from '../ElementBlock'

describe('ElementBlock', () => {
  it('renders content and without errors', () => {
    const { rerender } = render(
      <ElementBlock mode="view">content</ElementBlock>
    )

    const element = document.querySelector('.dnb-forms-section-block')
    const inner = element.querySelector('.dnb-forms-section-block__inner')

    expect(element).toBeInTheDocument()
    expect(element).toHaveClass('dnb-height-animation--hidden')

    expect(inner).toBeInTheDocument()
    expect(inner).toHaveTextContent('content')

    rerender(
      <ElementBlock mode="view" open>
        content
      </ElementBlock>
    )

    expect(element).not.toHaveClass('dnb-height-animation--hidden')
  })

  it('closes the block when open prop is false', () => {
    render(
      <ElementBlock mode="view" open={false}>
        content
      </ElementBlock>
    )

    expect(
      document.querySelector('.dnb-forms-section-block')
    ).not.toHaveClass('open')
  })

  it('calls handleRemove when remove button is clicked', () => {
    const handleRemove = jest.fn()

    render(
      <IterateElementContext.Provider value={{ handleRemove }}>
        <ElementBlock mode="view">
          <RemoveButton />
        </ElementBlock>
      </IterateElementContext.Provider>
    )

    fireEvent.click(document.querySelector('button'))

    expect(handleRemove).toHaveBeenCalledTimes(1)
  })

  it('calls "fulfillRemove" when remove button is clicked', async () => {
    const handleRemove = jest.fn()
    const fulfillRemove = jest.fn()

    render(
      <IterateElementContext.Provider
        value={{ handleRemove, fulfillRemove, containerMode: 'view' }}
      >
        {' '}
        <ElementBlock mode="view">
          <RemoveButton />
        </ElementBlock>{' '}
      </IterateElementContext.Provider>
    )

    const element = document.querySelector('.dnb-forms-section-block')

    expect(element).not.toHaveClass('dnb-height-animation--hidden')

    fireEvent.click(document.querySelector('button'))

    expect(element).toHaveClass('dnb-height-animation--hidden')

    expect(handleRemove).toHaveBeenCalledTimes(1)
    expect(fulfillRemove).toHaveBeenCalledTimes(1)
  })

  it('opens component based on containerMode', async () => {
    const { rerender } = render(
      <IterateElementContext.Provider value={{ containerMode: 'view' }}>
        <ElementBlock mode="view">content</ElementBlock>
      </IterateElementContext.Provider>
    )

    const element = document.querySelector('.dnb-forms-section-block')

    expect(element).not.toHaveClass('dnb-height-animation--hidden')

    rerender(
      <IterateElementContext.Provider value={{ containerMode: 'edit' }}>
        <ElementBlock mode="view">content</ElementBlock>
      </IterateElementContext.Provider>
    )

    expect(element).toHaveClass('dnb-height-animation--hidden')
  })

  it('opens component based on "open" prop', async () => {
    const { rerender } = render(
      <ElementBlock mode="view" open={true}>
        content
      </ElementBlock>
    )

    const element = document.querySelector('.dnb-forms-section-block')

    expect(element).not.toHaveClass('dnb-height-animation--hidden')

    rerender(
      <ElementBlock mode="view" open={false}>
        content
      </ElementBlock>
    )

    expect(element).toHaveClass('dnb-height-animation--hidden')

    rerender(
      <ElementBlock mode="view" open={true}>
        content
      </ElementBlock>
    )

    expect(element).not.toHaveClass('dnb-height-animation--hidden')
  })

  it('inverts default open state when "isNew" is true', async () => {
    render(
      <IterateElementContext.Provider
        value={{ containerMode: 'view', isNew: true }}
      >
        <ElementBlock mode="view">content</ElementBlock>
      </IterateElementContext.Provider>
    )

    const element = document.querySelector('.dnb-forms-section-block')

    expect(element).toHaveClass('dnb-height-animation--hidden')
  })

  it('calls onAnimationEnd when remove button is clicked', async () => {
    const handleRemove = jest.fn()
    const onAnimationEnd = jest.fn()

    render(
      <IterateElementContext.Provider
        value={{
          handleRemove,
          containerMode: 'view',
        }}
      >
        {' '}
        <ElementBlock mode="view" onAnimationEnd={onAnimationEnd}>
          <RemoveButton />
        </ElementBlock>
      </IterateElementContext.Provider>
    )

    fireEvent.click(document.querySelector('button'))

    expect(handleRemove).toHaveBeenCalledTimes(1)

    simulateAnimationEnd()

    expect(onAnimationEnd).toHaveBeenCalledTimes(1)
  })
})
