import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import ViewContainer from '../ViewContainer'
import { Form } from '../../../..'
import nbNO from '../../../../constants/locales/nb-NO'
import SectionContainerContext from '../../containers/SectionContainerContext'
import Toolbar from '../../Toolbar'

const nb = nbNO['nb-NO'].SectionViewContainer

describe('ViewContainer', () => {
  it('renders content and without errors', () => {
    const { rerender } = render(
      <SectionContainerContext.Provider value={{ containerMode: 'edit' }}>
        <ViewContainer>content</ViewContainer>
      </SectionContainerContext.Provider>
    )

    const element = document.querySelector('.dnb-forms-section-block')
    const inner = element.querySelector('.dnb-forms-section-block__inner')

    expect(element).toBeInTheDocument()
    expect(element).toHaveClass('dnb-height-animation--hidden')

    expect(inner).toBeInTheDocument()
    expect(inner).toHaveTextContent('content')

    rerender(
      <SectionContainerContext.Provider value={{ containerMode: 'view' }}>
        <ViewContainer>content</ViewContainer>
      </SectionContainerContext.Provider>
    )

    expect(element).not.toHaveClass('dnb-height-animation--hidden')
  })

  it('calls "switchContainerMode" when edit button is clicked', () => {
    const switchContainerMode = jest.fn()

    render(
      <SectionContainerContext.Provider value={{ switchContainerMode }}>
        <ViewContainer>content</ViewContainer>
      </SectionContainerContext.Provider>
    )

    fireEvent.click(document.querySelectorAll('button')[0])

    expect(switchContainerMode).toHaveBeenCalledTimes(1)
    expect(switchContainerMode).toHaveBeenCalledWith('edit')
  })

  it('has correct class', () => {
    render(
      <SectionContainerContext.Provider value={{ containerMode: 'view' }}>
        <ViewContainer>content</ViewContainer>
      </SectionContainerContext.Provider>
    )

    expect(
      document.querySelector('.dnb-forms-section-view-block')
    ).toBeInTheDocument()
  })

  it('will forward custom HTML attributes to the inner wrapper', () => {
    render(
      <SectionContainerContext.Provider value={{ containerMode: 'view' }}>
        <ViewContainer data-attr="value">content</ViewContainer>
      </SectionContainerContext.Provider>
    )

    expect(
      document.querySelector(
        '.dnb-forms-section-view-block .dnb-forms-section-block__inner'
      )
    ).toHaveAttribute('data-attr', 'value')
  })

  it('to have buttons with correct text', () => {
    render(
      <SectionContainerContext.Provider value={{ containerMode: 'view' }}>
        <ViewContainer>content</ViewContainer>
      </SectionContainerContext.Provider>
    )

    const buttons = document.querySelectorAll('button')

    expect(buttons).toHaveLength(1)
    expect(buttons[0]).toHaveTextContent(nb.editButton)
  })

  it('supports translations from Form.Handler', () => {
    const edit = 'custom-translation-edit-button-text'

    render(
      <Form.Handler
        translations={{
          'nb-NO': {
            'SectionViewContainer.editButton': edit,
          },
          'en-GB': {
            'SectionViewContainer.editButton': edit,
          },
        }}
      >
        <SectionContainerContext.Provider
          value={{ containerMode: 'edit' }}
        >
          <ViewContainer>content</ViewContainer>
        </SectionContainerContext.Provider>
      </Form.Handler>
    )

    expect(screen.getByText(edit)).toBeInTheDocument()
  })

  it('should render default toolbar', () => {
    render(
      <Form.Section>
        <Form.Section.ViewContainer>
          Edit Content
        </Form.Section.ViewContainer>
      </Form.Section>
    )

    expect(document.querySelectorAll('button')).toHaveLength(1)
    expect(document.querySelectorAll('button')[0]).toHaveTextContent(
      nb.editButton
    )
  })

  it('should render custom toolbar', () => {
    render(
      <Form.Section>
        <Form.Section.ViewContainer>
          Edit Content
          <Toolbar>no button</Toolbar>
        </Form.Section.ViewContainer>
      </Form.Section>
    )

    expect(document.querySelectorAll('button')).toHaveLength(0)
  })
})
