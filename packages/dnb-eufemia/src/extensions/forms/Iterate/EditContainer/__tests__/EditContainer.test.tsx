import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import { Form } from '../../..'
import IterateElementContext from '../../IterateElementContext'
import EditContainer from '../EditContainer'
import nbNO from '../../../constants/locales/nb-NO'

const nb = nbNO['nb-NO'].IterateEditContainer

describe('EditContainer', () => {
  it('renders content and without errors', () => {
    const { rerender } = render(
      <IterateElementContext.Provider value={{ containerMode: 'view' }}>
        <EditContainer>content</EditContainer>
      </IterateElementContext.Provider>
    )

    const element = document.querySelector('.dnb-forms-section-block')
    const inner = element.querySelector('.dnb-forms-section-block__inner')

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
      document.querySelector('.dnb-forms-section-edit-block')
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
        '.dnb-forms-section-edit-block .dnb-forms-section-block__inner'
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
      expect(buttons[0]).toHaveTextContent(nb.doneButton)
      expect(buttons[1]).toHaveTextContent(nb.removeButton)
    })

    it('and isNew is not set', () => {
      render(
        <IterateElementContext.Provider value={{ containerMode: 'edit' }}>
          <EditContainer>content</EditContainer>
        </IterateElementContext.Provider>
      )

      const buttons = document.querySelectorAll('button')

      expect(buttons).toHaveLength(2)
      expect(buttons[0]).toHaveTextContent(nb.doneButton)
      expect(buttons[1]).toHaveTextContent(nb.cancelButton)
    })

    it('supports translations removeButton and doneButton from Form.Handler', () => {
      const remove = 'custom-translation-remove-button-text'
      const done = 'custom-translation-done-button-text'

      render(
        <Form.Handler
          translations={{
            'nb-NO': {
              'IterateEditContainer.removeButton': remove,
              'IterateEditContainer.doneButton': done,
            },
            'en-GB': {
              'IterateEditContainer.removeButton': remove,
              'IterateEditContainer.doneButton': done,
            },
          }}
        >
          <IterateElementContext.Provider
            value={{
              containerMode: 'edit',
              isNew: true,
            }}
          >
            <EditContainer>content</EditContainer>
          </IterateElementContext.Provider>
        </Form.Handler>
      )

      expect(screen.getByText(remove)).toBeInTheDocument()
      expect(screen.getByText(done)).toBeInTheDocument()
    })
    it('supports translations cancelButton and doneButton from Form.Handler', () => {
      const done = 'custom-translation-done-button-text'
      const cancel = 'custom-translation-cancel-button-text'

      render(
        <Form.Handler
          translations={{
            'nb-NO': {
              'IterateEditContainer.doneButton': done,
              'IterateEditContainer.cancelButton': cancel,
            },
            'en-GB': {
              'IterateEditContainer.doneButton': done,
              'IterateEditContainer.cancelButton': cancel,
            },
          }}
        >
          <IterateElementContext.Provider
            value={{
              containerMode: 'edit',
            }}
          >
            <EditContainer>content</EditContainer>
          </IterateElementContext.Provider>
        </Form.Handler>
      )

      expect(screen.getByText(cancel)).toBeInTheDocument()
      expect(screen.getByText(done)).toBeInTheDocument()
    })
  })
})
