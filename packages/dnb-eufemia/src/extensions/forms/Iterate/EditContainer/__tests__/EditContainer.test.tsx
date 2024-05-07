import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import IterateElementContext from '../../IterateElementContext'
import EditContainer from '../EditContainer'
import nbNO from '../../../constants/locales/nb-NO'

const nb = nbNO['nb-NO'].Iterate

describe('EditContainer', () => {
  it('renders content and without errors', () => {
    const { rerender } = render(
      <IterateElementContext.Provider value={{ containerMode: 'view' }}>
        <EditContainer>content</EditContainer>
      </IterateElementContext.Provider>
    )

    const element = document.querySelector('.dnb-forms-iterate-block')
    const inner = element.querySelector('.dnb-forms-iterate-block__inner')

    expect(element).toBeInTheDocument()
    expect(element).toHaveClass('dnb-height-animation--hidden')

    expect(inner).toBeInTheDocument()
    expect(inner).toHaveTextContent('content')

    rerender(
      <IterateElementContext.Provider value={{ containerMode: 'edit' }}>
        <EditContainer>content</EditContainer>
      </IterateElementContext.Provider>
    )

    expect(element).not.toHaveClass('dnb-height-animation--hidden')
  })

  it('calls "switchContainerMode" when remove button is clicked', () => {
    const switchContainerMode = jest.fn()

    render(
      <IterateElementContext.Provider value={{ switchContainerMode }}>
        <EditContainer>content</EditContainer>
      </IterateElementContext.Provider>
    )

    fireEvent.click(document.querySelectorAll('button')[0])

    expect(switchContainerMode).toHaveBeenCalledTimes(1)
    expect(switchContainerMode).toHaveBeenCalledWith('view')
  })

  it('calls "switchContainerMode" when remove button is clicked and isNew is true', () => {
    const switchContainerMode = jest.fn()

    render(
      <IterateElementContext.Provider
        value={{ switchContainerMode, isNew: true }}
      >
        <EditContainer>content</EditContainer>
      </IterateElementContext.Provider>
    )

    fireEvent.click(document.querySelectorAll('button')[0])

    expect(switchContainerMode).toHaveBeenCalledTimes(1)
    expect(switchContainerMode).toHaveBeenCalledWith('view')
  })

  it('calls "handleRemove" when remove button is clicked and isNew is true', () => {
    const handleRemove = jest.fn()

    render(
      <IterateElementContext.Provider
        value={{ handleRemove, isNew: true }}
      >
        <EditContainer>content</EditContainer>
      </IterateElementContext.Provider>
    )

    fireEvent.click(document.querySelectorAll('button')[1])

    expect(handleRemove).toHaveBeenCalledTimes(1)
  })

  it('calls "restoreOriginalValue" when cancel button is clicked', () => {
    const restoreOriginalValue = jest.fn()

    render(
      <IterateElementContext.Provider
        value={{
          restoreOriginalValue,
          containerMode: 'edit',
          index: 0,
          arrayValue: ['original value'],
        }}
      >
        <EditContainer>content</EditContainer>
      </IterateElementContext.Provider>
    )

    fireEvent.click(document.querySelectorAll('button')[1])

    expect(restoreOriginalValue).toHaveBeenCalledTimes(1)
    expect(restoreOriginalValue).toHaveBeenCalledWith('original value')
  })

  it('should render "title"', () => {
    render(
      <IterateElementContext.Provider value={{ containerMode: 'edit' }}>
        <EditContainer title="Block title">content</EditContainer>
      </IterateElementContext.Provider>
    )

    expect(document.querySelector('.dnb-p')).toHaveTextContent(
      'Block title'
    )
  })

  it('should render "titleWhenNew"', () => {
    render(
      <IterateElementContext.Provider
        value={{ containerMode: 'edit', isNew: true }}
      >
        <EditContainer title="Block title" titleWhenNew="New Block title">
          content
        </EditContainer>
      </IterateElementContext.Provider>
    )

    expect(document.querySelector('.dnb-p')).toHaveTextContent(
      'New Block title'
    )
  })

  it('has correct class', () => {
    render(
      <IterateElementContext.Provider value={{ containerMode: 'edit' }}>
        <EditContainer>content</EditContainer>
      </IterateElementContext.Provider>
    )

    expect(
      document.querySelector('.dnb-forms-iterate-edit-block')
    ).toBeInTheDocument()
  })

  it('will forward custom HTML attributes to the inner wrapper', () => {
    render(
      <IterateElementContext.Provider value={{ containerMode: 'edit' }}>
        <EditContainer data-attr="value">content</EditContainer>
      </IterateElementContext.Provider>
    )

    expect(
      document.querySelector(
        '.dnb-forms-iterate-edit-block .dnb-forms-iterate-block__inner'
      )
    ).toHaveAttribute('data-attr', 'value')
  })

  describe('to have buttons with correct text', () => {
    it('and isNew is true', () => {
      render(
        <IterateElementContext.Provider
          value={{
            containerMode: 'edit',
            isNew: true,
          }}
        >
          <EditContainer>content</EditContainer>
        </IterateElementContext.Provider>
      )

      const buttons = document.querySelectorAll('button')

      expect(buttons).toHaveLength(2)
      expect(buttons[0]).toHaveTextContent(nb.done)
      expect(buttons[1]).toHaveTextContent(nb.remove)
    })

    it('and isNew is not set', () => {
      render(
        <IterateElementContext.Provider value={{ containerMode: 'edit' }}>
          <EditContainer>content</EditContainer>
        </IterateElementContext.Provider>
      )

      const buttons = document.querySelectorAll('button')

      expect(buttons).toHaveLength(2)
      expect(buttons[0]).toHaveTextContent(nb.done)
      expect(buttons[1]).toHaveTextContent(nb.cancel)
    })
  })
})
