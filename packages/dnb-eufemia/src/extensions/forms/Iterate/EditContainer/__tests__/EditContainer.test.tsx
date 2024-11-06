import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Field, Form, Iterate } from '../../..'
import IterateItemContext from '../../IterateItemContext'
import EditContainer from '../EditContainer'
import nbNO from '../../../constants/locales/nb-NO'

const nb = nbNO['nb-NO'].IterateEditContainer

describe('EditContainer', () => {
  it('renders content and without errors', () => {
    const { rerender } = render(
      <IterateItemContext.Provider
        value={{ containerMode: 'view', value: 'foo' }}
      >
        <EditContainer>content</EditContainer>
      </IterateItemContext.Provider>
    )

    const element = document.querySelector('.dnb-forms-section-block')
    const inner = element.querySelector('.dnb-forms-section-block__inner')

    expect(element).toBeInTheDocument()
    expect(element).toHaveClass('dnb-height-animation--hidden')

    expect(inner).toBeInTheDocument()
    expect(inner).toHaveTextContent('content')

    rerender(
      <IterateItemContext.Provider
        value={{ containerMode: 'edit', value: 'foo' }}
      >
        <EditContainer>content</EditContainer>
      </IterateItemContext.Provider>
    )

    expect(element).not.toHaveClass('dnb-height-animation--hidden')
  })

  it('calls "switchContainerMode" when edit button is clicked', () => {
    const switchContainerMode = jest.fn()

    render(
      <IterateItemContext.Provider value={{ switchContainerMode }}>
        <EditContainer>content</EditContainer>
      </IterateItemContext.Provider>
    )

    fireEvent.click(document.querySelectorAll('button')[0])

    expect(switchContainerMode).toHaveBeenCalledTimes(1)
    expect(switchContainerMode).toHaveBeenCalledWith('view')
  })

  it('calls "switchContainerMode" when edit button is clicked and isNew is true', () => {
    const switchContainerMode = jest.fn()

    render(
      <IterateItemContext.Provider
        value={{ switchContainerMode, isNew: true }}
      >
        <EditContainer>content</EditContainer>
      </IterateItemContext.Provider>
    )

    fireEvent.click(document.querySelectorAll('button')[0])

    expect(switchContainerMode).toHaveBeenCalledTimes(1)
    expect(switchContainerMode).toHaveBeenCalledWith('view')
  })

  it('calls "handleRemove" when remove button is clicked and isNew is true', () => {
    const handleRemove = jest.fn()

    render(
      <IterateItemContext.Provider value={{ handleRemove, isNew: true }}>
        <EditContainer>content</EditContainer>
      </IterateItemContext.Provider>
    )

    fireEvent.click(document.querySelectorAll('button')[1])

    expect(handleRemove).toHaveBeenCalledTimes(1)
  })

  it('calls "restoreOriginalValue" when cancel button is clicked', () => {
    const restoreOriginalValue = jest.fn()

    render(
      <IterateItemContext.Provider
        value={{
          restoreOriginalValue,
          containerMode: 'edit',
          index: 0,
          arrayValue: ['original value'],
        }}
      >
        <EditContainer>content</EditContainer>
      </IterateItemContext.Provider>
    )

    fireEvent.click(document.querySelectorAll('button')[1])

    expect(restoreOriginalValue).toHaveBeenCalledTimes(1)
    expect(restoreOriginalValue).toHaveBeenCalledWith('original value')
  })

  it('should render "title"', () => {
    render(
      <IterateItemContext.Provider value={{ containerMode: 'edit' }}>
        <EditContainer title="Item title">content</EditContainer>
      </IterateItemContext.Provider>
    )

    expect(document.querySelector('.dnb-p')).toHaveTextContent(
      'Item title'
    )
  })

  it('should render "titleWhenNew"', () => {
    render(
      <IterateItemContext.Provider
        value={{ containerMode: 'edit', isNew: true }}
      >
        <EditContainer title="Item title" titleWhenNew="New Item title">
          content
        </EditContainer>
      </IterateItemContext.Provider>
    )

    expect(document.querySelector('.dnb-p')).toHaveTextContent(
      'New Item title'
    )
  })

  it('should render title with "itemNo"', () => {
    render(
      <Iterate.Array value={['foo', 'bar']}>
        <EditContainer title="Item title {itemNo}">content</EditContainer>
      </Iterate.Array>
    )

    const leads = document.querySelectorAll('.dnb-p')
    expect(leads).toHaveLength(2)
    expect(leads[0]).toHaveTextContent('Item title 1')
    expect(leads[1]).toHaveTextContent('Item title 2')
  })

  it('should render titleWhenNew with "itemNo"', () => {
    render(
      <IterateItemContext.Provider
        value={{ containerMode: 'edit', isNew: true, index: 0 }}
      >
        <EditContainer titleWhenNew="New Item title {itemNo}">
          content
        </EditContainer>
      </IterateItemContext.Provider>
    )

    expect(document.querySelector('.dnb-p')).toHaveTextContent(
      'New Item title 1'
    )
  })

  it('has correct class', () => {
    render(
      <IterateItemContext.Provider value={{ containerMode: 'edit' }}>
        <EditContainer>content</EditContainer>
      </IterateItemContext.Provider>
    )

    expect(
      document.querySelector('.dnb-forms-section-edit-block')
    ).toBeInTheDocument()
  })

  it('will forward custom HTML attributes to the inner wrapper', () => {
    render(
      <IterateItemContext.Provider value={{ containerMode: 'edit' }}>
        <EditContainer data-attr="value">content</EditContainer>
      </IterateItemContext.Provider>
    )

    expect(
      document.querySelector(
        '.dnb-forms-section-edit-block .dnb-forms-section-block__inner'
      )
    ).toHaveAttribute('data-attr', 'value')
  })

  it('should validate on done button click', async () => {
    render(
      <Form.Handler>
        <Iterate.Array value={['']}>
          <EditContainer>
            <Field.String required itemPath="/" />
          </EditContainer>
        </Iterate.Array>
      </Form.Handler>
    )

    expect(
      document.querySelector('.dnb-form-status')
    ).not.toBeInTheDocument()

    const [doneButton] = Array.from(document.querySelectorAll('button'))

    expect(doneButton).toHaveTextContent(nb.doneButton)

    await userEvent.click(doneButton)

    expect(document.querySelector('.dnb-form-status')).toBeInTheDocument()

    const input = document.querySelector('input')
    await userEvent.type(input, 'foo')
    await userEvent.click(doneButton)

    expect(
      document.querySelector('.dnb-form-status')
    ).not.toBeInTheDocument()
  })

  describe('to have buttons with correct text', () => {
    it('and isNew is true', () => {
      render(
        <IterateItemContext.Provider
          value={{
            containerMode: 'edit',
            isNew: true,
          }}
        >
          <EditContainer>content</EditContainer>
        </IterateItemContext.Provider>
      )

      const buttons = document.querySelectorAll('button')

      expect(buttons).toHaveLength(2)
      expect(buttons[0]).toHaveTextContent(nb.doneButton)
      expect(buttons[1]).toHaveTextContent(nb.removeButton)
    })

    it('and isNew is not set', () => {
      render(
        <IterateItemContext.Provider value={{ containerMode: 'edit' }}>
          <EditContainer>content</EditContainer>
        </IterateItemContext.Provider>
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
          <IterateItemContext.Provider
            value={{
              containerMode: 'edit',
              isNew: true,
            }}
          >
            <EditContainer>content</EditContainer>
          </IterateItemContext.Provider>
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
          <IterateItemContext.Provider
            value={{
              containerMode: 'edit',
            }}
          >
            <EditContainer>content</EditContainer>
          </IterateItemContext.Provider>
        </Form.Handler>
      )

      expect(screen.getByText(cancel)).toBeInTheDocument()
      expect(screen.getByText(done)).toBeInTheDocument()
    })
  })
})
