import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import IterateItemContext from '../../IterateItemContext'
import ElementBlock from '../ElementBlock'
import RemoveButton from '../../RemoveButton'
import { wait } from '../../../../../core/jest/jestSetup'
import { DataContext, Field, Form, Iterate } from '../../..'
import { simulateAnimationEnd } from '../../../../../components/height-animation/__tests__/HeightAnimationUtils'

describe('ElementBlock', () => {
  it('should call "onAnimationEnd"', () => {
    const onAnimationEnd = jest.fn()

    const wrapper = ({ children }) => (
      <IterateItemContext.Provider value={{ containerMode: 'view' }}>
        {children}
      </IterateItemContext.Provider>
    )

    render(
      <ElementBlock mode="view" onAnimationEnd={onAnimationEnd}>
        <RemoveButton />
      </ElementBlock>,
      { wrapper }
    )

    fireEvent.click(document.querySelector('button'))

    expect(onAnimationEnd).toHaveBeenCalledTimes(1)
  })

  it('should call "handleRemove" from the context during element remove', () => {
    const handleRemove = jest.fn()

    const wrapper = ({ children }) => (
      <IterateItemContext.Provider
        value={{ containerMode: 'view', handleRemove }}
      >
        {children}
      </IterateItemContext.Provider>
    )

    render(
      <ElementBlock mode="view">
        <RemoveButton />
      </ElementBlock>,
      { wrapper }
    )

    fireEvent.click(document.querySelector('button'))

    expect(handleRemove).toHaveBeenCalledTimes(1)
  })

  it('should call "fulfillRemove" from the context during element remove', () => {
    const fulfillRemove = jest.fn()

    const wrapper = ({ children }) => (
      <IterateItemContext.Provider
        value={{ containerMode: 'view', fulfillRemove }}
      >
        {children}
      </IterateItemContext.Provider>
    )

    render(
      <ElementBlock mode="view">
        <RemoveButton />
      </ElementBlock>,
      { wrapper }
    )

    fireEvent.click(document.querySelector('button'))

    expect(fulfillRemove).toHaveBeenCalledTimes(1)
  })

  it('should set "--new" class on new blocks', async () => {
    render(
      <DataContext.Provider
        data={{
          myList: ['one'],
        }}
      >
        <Iterate.Array path="/myList">
          <Iterate.AnimatedContainer>content</Iterate.AnimatedContainer>
        </Iterate.Array>

        <Iterate.PushButton path="/myList" pushValue="foo" />
      </DataContext.Provider>
    )

    const addButton = document.querySelector('button')
    fireEvent.click(addButton)

    const elements = document.querySelectorAll(
      '.dnb-forms-iterate__element'
    )
    expect(elements).toHaveLength(2)

    expect(
      elements[0].querySelector('.dnb-forms-section-block--new')
    ).toBeFalsy()
    expect(
      elements[1].querySelector('.dnb-forms-section-block--new')
    ).toBeTruthy()
  })

  it('should set "--error" class on blocks with error', () => {
    render(
      <Form.Handler
        data={{
          myList: ['foo'],
        }}
      >
        <Iterate.Array path="/myList">
          {(value, index) => {
            return (
              <Iterate.AnimatedContainer>
                <Field.String required={index > 0} />
              </Iterate.AnimatedContainer>
            )
          }}
        </Iterate.Array>

        <Iterate.PushButton path="/myList" pushValue={undefined} />
      </Form.Handler>
    )

    expect(
      document.querySelector('.dnb-forms-section-block--error')
    ).toBeFalsy()

    const addButton = document.querySelector('button')
    fireEvent.click(addButton)

    const elements = document.querySelectorAll(
      '.dnb-forms-iterate__element'
    )
    expect(elements).toHaveLength(2)

    expect(
      elements[0].querySelector('.dnb-forms-section-block--error')
    ).toBeFalsy()
    expect(
      elements[1].querySelector('.dnb-forms-section-block--error')
    ).toBeFalsy()

    fireEvent.submit(document.querySelector('form'))

    expect(
      elements[0].querySelector('.dnb-forms-section-block--error')
    ).toBeFalsy()
    expect(
      elements[1].querySelector('.dnb-forms-section-block--error')
    ).toBeTruthy()
  })

  it('should open delayed when isNew is true', async () => {
    const wrapper = ({ children }) => (
      <IterateItemContext.Provider
        value={{ containerMode: 'view', isNew: true }}
      >
        {children}
      </IterateItemContext.Provider>
    )

    const { rerender } = render(
      <ElementBlock mode="view" openDelay={1}>
        Content
      </ElementBlock>,
      { wrapper }
    )

    const block = document.querySelector('.dnb-forms-section-block')
    expect(block).toHaveClass('dnb-height-animation--hidden')

    rerender(
      <ElementBlock mode="edit" openDelay={1}>
        Content
      </ElementBlock>
    )

    expect(block).toHaveClass('dnb-height-animation--hidden')

    await wait(1)

    expect(block).toHaveClass('dnb-height-animation--is-visible')
    expect(block).not.toHaveClass('dnb-height-animation--hidden')
  })

  it('should have inner element of section', () => {
    const wrapper = ({ children }) => (
      <IterateItemContext.Provider value={{ containerMode: 'view' }}>
        {children}
      </IterateItemContext.Provider>
    )

    render(<ElementBlock mode="view">Content</ElementBlock>, { wrapper })

    expect(
      document.querySelector('.dnb-forms-section-block__inner').tagName
    ).toBe('SECTION')
  })

  it('should set aria-label', () => {
    const wrapper = ({ children }) => (
      <IterateItemContext.Provider value={{ containerMode: 'view' }}>
        {children}
      </IterateItemContext.Provider>
    )

    render(
      <ElementBlock mode="view" ariaLabel="Aria Label">
        Content
      </ElementBlock>,
      { wrapper }
    )

    expect(
      document.querySelector('.dnb-forms-section-block__inner')
    ).toHaveAttribute('aria-label', 'Aria Label')
  })

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
      <IterateItemContext.Provider value={{ handleRemove }}>
        <ElementBlock mode="view">
          <RemoveButton />
        </ElementBlock>
      </IterateItemContext.Provider>
    )

    fireEvent.click(document.querySelector('button'))

    expect(handleRemove).toHaveBeenCalledTimes(1)
  })

  it('calls "fulfillRemove" when remove button is clicked', async () => {
    const handleRemove = jest.fn()
    const fulfillRemove = jest.fn()

    render(
      <IterateItemContext.Provider
        value={{ handleRemove, fulfillRemove, containerMode: 'view' }}
      >
        <ElementBlock mode="view">
          <RemoveButton />
        </ElementBlock>
      </IterateItemContext.Provider>
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
      <IterateItemContext.Provider value={{ containerMode: 'view' }}>
        <ElementBlock mode="view">content</ElementBlock>
      </IterateItemContext.Provider>
    )

    const element = document.querySelector('.dnb-forms-section-block')

    expect(element).not.toHaveClass('dnb-height-animation--hidden')

    rerender(
      <IterateItemContext.Provider value={{ containerMode: 'edit' }}>
        <ElementBlock mode="view">content</ElementBlock>
      </IterateItemContext.Provider>
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
      <IterateItemContext.Provider
        value={{ containerMode: 'view', isNew: true }}
      >
        <ElementBlock mode="view">content</ElementBlock>
      </IterateItemContext.Provider>
    )

    const element = document.querySelector('.dnb-forms-section-block')

    expect(element).toHaveClass('dnb-height-animation--hidden')
  })

  it('calls onAnimationEnd when remove button is clicked', async () => {
    const handleRemove = jest.fn()
    const onAnimationEnd = jest.fn()

    render(
      <IterateItemContext.Provider
        value={{
          handleRemove,
          containerMode: 'view',
        }}
      >
        <ElementBlock mode="view" onAnimationEnd={onAnimationEnd}>
          <RemoveButton />
        </ElementBlock>
      </IterateItemContext.Provider>
    )

    fireEvent.click(document.querySelector('button'))

    expect(handleRemove).toHaveBeenCalledTimes(1)

    simulateAnimationEnd()

    expect(onAnimationEnd).toHaveBeenCalledTimes(1)
  })
})
