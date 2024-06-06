import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import IterateElementContext from '../../IterateElementContext'
import ViewContainer from '../ViewContainer'
import nbNO from '../../../constants/locales/nb-NO'

const nb = nbNO['nb-NO'].Section

describe('ViewContainer', () => {
  it('renders content and without errors', () => {
    const { rerender } = render(
      <IterateElementContext.Provider value={{ containerMode: 'edit' }}>
        <ViewContainer>content</ViewContainer>
      </IterateElementContext.Provider>
    )

    const element = document.querySelector('.dnb-forms-section-block')
    const inner = element.querySelector('.dnb-forms-section-block__inner')

    expect(element).toBeInTheDocument()
    expect(element).toHaveClass('dnb-height-animation--hidden')

    expect(inner).toBeInTheDocument()
    expect(inner).toHaveTextContent('content')

    rerender(
      <IterateElementContext.Provider value={{ containerMode: 'view' }}>
        <ViewContainer>content</ViewContainer>
      </IterateElementContext.Provider>
    )

    expect(element).not.toHaveClass('dnb-height-animation--hidden')
  })

  it('calls "switchContainerMode" when remove button is clicked', () => {
    const switchContainerMode = jest.fn()

    render(
      <IterateElementContext.Provider value={{ switchContainerMode }}>
        <ViewContainer>content</ViewContainer>
      </IterateElementContext.Provider>
    )

    fireEvent.click(document.querySelectorAll('button')[0])

    expect(switchContainerMode).toHaveBeenCalledTimes(1)
    expect(switchContainerMode).toHaveBeenCalledWith('edit')
  })

  it('calls "handleRemove" when remove button is clicked', () => {
    const handleRemove = jest.fn()

    render(
      <IterateElementContext.Provider value={{ handleRemove }}>
        <ViewContainer>content</ViewContainer>{' '}
      </IterateElementContext.Provider>
    )

    fireEvent.click(document.querySelectorAll('button')[1])

    expect(handleRemove).toHaveBeenCalledTimes(1)
  })

  it('has correct class', () => {
    render(
      <IterateElementContext.Provider value={{ containerMode: 'view' }}>
        <ViewContainer>content</ViewContainer>
      </IterateElementContext.Provider>
    )

    expect(
      document.querySelector('.dnb-forms-section-view-block')
    ).toBeInTheDocument()
  })

  it('will forward custom HTML attributes to the inner wrapper', () => {
    render(
      <IterateElementContext.Provider value={{ containerMode: 'view' }}>
        <ViewContainer data-attr="value">content</ViewContainer>
      </IterateElementContext.Provider>
    )

    expect(
      document.querySelector(
        '.dnb-forms-section-view-block .dnb-forms-section-block__inner'
      )
    ).toHaveAttribute('data-attr', 'value')
  })

  it('to have buttons with correct text', () => {
    render(
      <IterateElementContext.Provider value={{ containerMode: 'view' }}>
        <ViewContainer>content</ViewContainer>
      </IterateElementContext.Provider>
    )

    const buttons = document.querySelectorAll('button')

    expect(buttons).toHaveLength(2)
    expect(buttons[0]).toHaveTextContent(nb.edit)
    expect(buttons[1]).toHaveTextContent(nb.remove)
  })
})
