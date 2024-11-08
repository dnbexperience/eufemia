import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import IterateItemContext from '../../IterateItemContext'
import ViewContainer from '../ViewContainer'
import { Form, Iterate } from '../../..'
import nbNO from '../../../constants/locales/nb-NO'

const nb = nbNO['nb-NO'].IterateViewContainer

describe('ViewContainer', () => {
  it('renders content and without errors', () => {
    const { rerender } = render(
      <IterateItemContext.Provider
        value={{ containerMode: 'edit', value: 'foo' }}
      >
        <ViewContainer>content</ViewContainer>
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
        value={{ containerMode: 'view', value: 'foo' }}
      >
        <ViewContainer>content</ViewContainer>
      </IterateItemContext.Provider>
    )

    expect(element).not.toHaveClass('dnb-height-animation--hidden')
  })

  it('calls "switchContainerMode" when edit button is clicked', () => {
    const switchContainerMode = jest.fn()

    render(
      <IterateItemContext.Provider value={{ switchContainerMode }}>
        <ViewContainer>content</ViewContainer>
      </IterateItemContext.Provider>
    )

    fireEvent.click(document.querySelectorAll('button')[0])

    expect(switchContainerMode).toHaveBeenCalledTimes(1)
    expect(switchContainerMode).toHaveBeenCalledWith('edit')
  })

  it('should render "title"', () => {
    render(
      <IterateItemContext.Provider value={{ containerMode: 'edit' }}>
        <ViewContainer title="Item title">content</ViewContainer>
      </IterateItemContext.Provider>
    )

    expect(document.querySelector('.dnb-p')).toHaveTextContent(
      'Item title'
    )
  })

  it('should render title with "itemNo"', () => {
    render(
      <Iterate.Array value={['foo', 'bar']}>
        <ViewContainer title="Item title {itemNo}">content</ViewContainer>
      </Iterate.Array>
    )

    const leads = document.querySelectorAll('.dnb-p')
    expect(leads).toHaveLength(2)
    expect(leads[0]).toHaveTextContent('Item title 1')
    expect(leads[1]).toHaveTextContent('Item title 2')
  })

  // Deprecated, can be removed in v11
  it('should render title with "itemNr"', () => {
    render(
      <Iterate.Array value={['foo', 'bar']}>
        <ViewContainer title="Item title {itemNr}">content</ViewContainer>
      </Iterate.Array>
    )

    const leads = document.querySelectorAll('.dnb-p')
    expect(leads).toHaveLength(2)
    expect(leads[0]).toHaveTextContent('Item title 1')
    expect(leads[1]).toHaveTextContent('Item title 2')
  })

  it('calls "handleRemove" when remove button is clicked', () => {
    const handleRemove = jest.fn()

    render(
      <IterateItemContext.Provider value={{ handleRemove }}>
        <ViewContainer>content</ViewContainer>{' '}
      </IterateItemContext.Provider>
    )

    fireEvent.click(document.querySelectorAll('button')[1])

    expect(handleRemove).toHaveBeenCalledTimes(1)
  })

  it('has correct class', () => {
    render(
      <IterateItemContext.Provider value={{ containerMode: 'view' }}>
        <ViewContainer>content</ViewContainer>
      </IterateItemContext.Provider>
    )

    expect(
      document.querySelector('.dnb-forms-section-view-block')
    ).toBeInTheDocument()
  })

  it('will forward custom HTML attributes to the inner wrapper', () => {
    render(
      <IterateItemContext.Provider value={{ containerMode: 'view' }}>
        <ViewContainer data-attr="value">content</ViewContainer>
      </IterateItemContext.Provider>
    )

    expect(
      document.querySelector(
        '.dnb-forms-section-view-block .dnb-forms-section-block__inner'
      )
    ).toHaveAttribute('data-attr', 'value')
  })

  it('to have buttons with correct text', () => {
    render(
      <IterateItemContext.Provider value={{ containerMode: 'view' }}>
        <ViewContainer>content</ViewContainer>
      </IterateItemContext.Provider>
    )

    const buttons = document.querySelectorAll('button')

    expect(buttons).toHaveLength(2)
    expect(buttons[0]).toHaveTextContent(nb.editButton)
    expect(buttons[1]).toHaveTextContent(nb.removeButton)
  })

  it('supports translations from Form.Handler', () => {
    const remove = 'custom-translation-remove-button-text'
    const edit = 'custom-translation-edit-button-text'

    render(
      <Form.Handler
        translations={{
          'nb-NO': {
            'IterateViewContainer.removeButton': remove,
            'IterateViewContainer.editButton': edit,
          },
          'en-GB': {
            'IterateViewContainer.removeButton': remove,
            'IterateViewContainer.editButton': edit,
          },
        }}
      >
        <IterateItemContext.Provider value={{ containerMode: 'view' }}>
          <ViewContainer>content</ViewContainer>
        </IterateItemContext.Provider>
      </Form.Handler>
    )

    expect(screen.getByText(remove)).toBeInTheDocument()
    expect(screen.getByText(edit)).toBeInTheDocument()
  })
})
