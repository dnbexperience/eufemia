import React from 'react'
import { fireEvent, render } from '@testing-library/react'
import IterateItemContext from '../../IterateItemContext'
import ArrayItemArea from '../ArrayItemArea'
import RemoveButton from '../../RemoveButton'
import FieldBoundaryContext from '../../../DataContext/FieldBoundary/FieldBoundaryContext'
import { wait } from '../../../../../core/jest/jestSetup'
import { DataContext, Field, Form, Iterate } from '../../..'
import { simulateAnimationEnd } from '../../../../../components/height-animation/__tests__/HeightAnimationUtils'

describe('ArrayItemArea', () => {
  it('should call "onAnimationEnd"', () => {
    const onAnimationEnd = jest.fn()

    const wrapper = ({ children }) => (
      <IterateItemContext.Provider
        value={{ containerMode: 'view', value: 'foo' }}
      >
        {children}
      </IterateItemContext.Provider>
    )

    render(
      <ArrayItemArea mode="view" onAnimationEnd={onAnimationEnd}>
        <RemoveButton />
      </ArrayItemArea>,
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
      <ArrayItemArea mode="view">
        <RemoveButton />
      </ArrayItemArea>,
      { wrapper }
    )

    fireEvent.click(document.querySelector('button'))

    expect(handleRemove).toHaveBeenCalledTimes(1)
  })

  it('should call "fulfillRemove" from the context during element remove', () => {
    const fulfillRemove = jest.fn()

    const wrapper = ({ children }) => (
      <IterateItemContext.Provider
        value={{ containerMode: 'view', value: 'foo', fulfillRemove }}
      >
        {children}
      </IterateItemContext.Provider>
    )

    render(
      <ArrayItemArea mode="view">
        <RemoveButton />
      </ArrayItemArea>,
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
      <ArrayItemArea mode="view" openDelay={1}>
        Content
      </ArrayItemArea>,
      { wrapper }
    )

    const block = document.querySelector('.dnb-forms-section-block')
    expect(block).toHaveClass('dnb-height-animation--hidden')

    rerender(
      <ArrayItemArea mode="edit" openDelay={1}>
        Content
      </ArrayItemArea>
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

    render(<ArrayItemArea mode="view">Content</ArrayItemArea>, { wrapper })

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
      <ArrayItemArea mode="view" ariaLabel="Aria Label">
        Content
      </ArrayItemArea>,
      { wrapper }
    )

    expect(
      document.querySelector('.dnb-forms-section-block__inner')
    ).toHaveAttribute('aria-label', 'Aria Label')
  })

  it('renders content and without errors', () => {
    const { rerender } = render(
      <ArrayItemArea mode="view">content</ArrayItemArea>
    )

    const element = document.querySelector('.dnb-forms-section-block')
    const inner = element.querySelector('.dnb-forms-section-block__inner')

    expect(element).toBeInTheDocument()
    expect(element).toHaveClass('dnb-height-animation--hidden')

    expect(inner).toBeInTheDocument()
    expect(inner).toHaveTextContent('content')

    rerender(
      <ArrayItemArea mode="view" open>
        content
      </ArrayItemArea>
    )

    expect(element).not.toHaveClass('dnb-height-animation--hidden')
  })

  it('closes the block when open prop is false', () => {
    render(
      <ArrayItemArea mode="view" open={false}>
        content
      </ArrayItemArea>
    )

    expect(
      document.querySelector('.dnb-forms-section-block')
    ).not.toHaveClass('open')
  })

  it('calls handleRemove when remove button is clicked', () => {
    const handleRemove = jest.fn()

    render(
      <IterateItemContext.Provider value={{ handleRemove }}>
        <ArrayItemArea mode="view">
          <RemoveButton />
        </ArrayItemArea>
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
        value={{
          handleRemove,
          fulfillRemove,
          containerMode: 'view',
          value: 'foo',
        }}
      >
        <ArrayItemArea mode="view">
          <RemoveButton />
        </ArrayItemArea>
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
      <IterateItemContext.Provider
        value={{ containerMode: 'view', value: 'foo' }}
      >
        <ArrayItemArea mode="view">content</ArrayItemArea>
      </IterateItemContext.Provider>
    )

    const element = document.querySelector('.dnb-forms-section-block')

    expect(element).not.toHaveClass('dnb-height-animation--hidden')

    rerender(
      <IterateItemContext.Provider
        value={{ containerMode: 'edit', value: 'foo' }}
      >
        <ArrayItemArea mode="view">content</ArrayItemArea>
      </IterateItemContext.Provider>
    )

    expect(element).toHaveClass('dnb-height-animation--hidden')
  })

  it('opens in view mode by default when mode is view', () => {
    let containerMode = null

    const ContextConsumer = () => {
      const context = React.useContext(IterateItemContext)
      containerMode = context.containerMode

      return null
    }

    render(
      <IterateItemContext.Provider
        value={{
          containerMode: 'auto',
          value: 'foo',
        }}
      >
        <ArrayItemArea mode="view">
          <ContextConsumer />
        </ArrayItemArea>
      </IterateItemContext.Provider>
    )

    expect(containerMode).toBe('view')
  })

  it('opens in view mode by default when mode is edit', () => {
    let containerMode = null

    const ContextConsumer = () => {
      const context = React.useContext(IterateItemContext)
      containerMode = context.containerMode

      return null
    }

    render(
      <IterateItemContext.Provider
        value={{
          containerMode: 'auto',
          value: 'foo',
        }}
      >
        <ArrayItemArea mode="edit">
          <ContextConsumer />
        </ArrayItemArea>
      </IterateItemContext.Provider>
    )

    expect(containerMode).toBe('view')
  })

  it('opens in edit mode when falsy value was given and mode is view', () => {
    let containerMode = null
    const switchContainerMode = jest.fn()

    const ContextConsumer = () => {
      const context = React.useContext(IterateItemContext)
      containerMode = context.containerMode

      return null
    }

    render(
      <IterateItemContext.Provider
        value={{
          switchContainerMode,
          initialContainerMode: 'auto',
          value: null,
        }}
      >
        <ArrayItemArea mode="view">
          <ContextConsumer />
        </ArrayItemArea>
      </IterateItemContext.Provider>
    )

    expect(containerMode).toBe('edit')
    expect(switchContainerMode).toHaveBeenCalledTimes(0)
  })

  it('opens in edit mode when falsy value was given and mode is edit', () => {
    let containerMode = null
    const switchContainerMode = jest.fn()

    const ContextConsumer = () => {
      const context = React.useContext(IterateItemContext)
      containerMode = context.containerMode

      return null
    }

    render(
      <IterateItemContext.Provider
        value={{
          switchContainerMode,
          initialContainerMode: 'auto',
          value: null,
        }}
      >
        <ArrayItemArea mode="edit">
          <ContextConsumer />
        </ArrayItemArea>
      </IterateItemContext.Provider>
    )

    expect(containerMode).toBe('edit')
    expect(switchContainerMode).toHaveBeenCalledTimes(1)
    expect(switchContainerMode).toHaveBeenLastCalledWith('edit', {
      omitFocusManagement: true,
      preventUpdate: true,
    })
  })

  it('should thread empty object as falsy', () => {
    let containerMode = null
    const switchContainerMode = jest.fn()

    const ContextConsumer = () => {
      const context = React.useContext(IterateItemContext)
      containerMode = context.containerMode

      return null
    }

    render(
      <IterateItemContext.Provider
        value={{
          switchContainerMode,
          initialContainerMode: 'auto',
          value: {},
        }}
      >
        <ArrayItemArea mode="edit">
          <ContextConsumer />
        </ArrayItemArea>
      </IterateItemContext.Provider>
    )

    expect(containerMode).toBe('edit')
    expect(switchContainerMode).toHaveBeenCalledTimes(1)
    expect(switchContainerMode).toHaveBeenLastCalledWith('edit', {
      omitFocusManagement: true,
      preventUpdate: true,
    })
  })

  it('should call switchContainerMode when mode is edit and error is present', () => {
    const switchContainerMode = jest.fn()

    render(
      <FieldBoundaryContext.Provider value={{ hasError: true }}>
        <IterateItemContext.Provider
          value={{
            switchContainerMode,
            initialContainerMode: 'auto',
            containerMode: 'view',
            value: 'foo',
          }}
        >
          <ArrayItemArea mode="edit">content</ArrayItemArea>
        </IterateItemContext.Provider>
      </FieldBoundaryContext.Provider>
    )

    expect(switchContainerMode).toHaveBeenCalledTimes(1)
    expect(switchContainerMode).toHaveBeenLastCalledWith('edit', {
      omitFocusManagement: true,
      preventUpdate: true,
    })
  })

  it('opens component based on "open" prop', async () => {
    const { rerender } = render(
      <ArrayItemArea mode="view" open={true}>
        content
      </ArrayItemArea>
    )

    const element = document.querySelector('.dnb-forms-section-block')

    expect(element).not.toHaveClass('dnb-height-animation--hidden')

    rerender(
      <ArrayItemArea mode="view" open={false}>
        content
      </ArrayItemArea>
    )

    expect(element).toHaveClass('dnb-height-animation--hidden')

    rerender(
      <ArrayItemArea mode="view" open={true}>
        content
      </ArrayItemArea>
    )

    expect(element).not.toHaveClass('dnb-height-animation--hidden')
  })

  it('inverts default open state when "isNew" is true', async () => {
    render(
      <IterateItemContext.Provider
        value={{ containerMode: 'view', isNew: true }}
      >
        <ArrayItemArea mode="view">content</ArrayItemArea>
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
          value: 'foo',
        }}
      >
        <ArrayItemArea mode="view" onAnimationEnd={onAnimationEnd}>
          <RemoveButton />
        </ArrayItemArea>
      </IterateItemContext.Provider>
    )

    const buttons = document.querySelectorAll('button')
    expect(buttons).toHaveLength(1)

    fireEvent.click(buttons[0])

    expect(handleRemove).toHaveBeenCalledTimes(1)

    simulateAnimationEnd()

    expect(onAnimationEnd).toHaveBeenCalledTimes(1)
  })
})
