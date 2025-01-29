import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import IterateItemContext from '../../IterateItemContext'
import { DataContext, Field, Form, Iterate } from '../../..'

describe('PushButton', () => {
  it('should call handlePush when clicked inside an Iterate element', () => {
    const handlePush = jest.fn()
    const pushValue = 'push value'

    render(
      <Iterate.PushButton pushValue={pushValue}>
        Push Button
      </Iterate.PushButton>,
      {
        wrapper: ({ children }) => (
          <IterateItemContext.Provider value={{ handlePush }}>
            {children}
          </IterateItemContext.Provider>
        ),
      }
    )

    const button = document.querySelector('button')
    fireEvent.click(button)

    expect(handlePush).toHaveBeenCalledTimes(1)
    expect(handlePush).toHaveBeenLastCalledWith(pushValue)
  })

  it('should call handleChange when clicked outside an Iterate element', () => {
    const handleChange = jest.fn()
    const pushValue = 'push value'

    render(
      <Form.Handler onChange={handleChange}>
        <Iterate.PushButton path="/foo" pushValue={pushValue}>
          Push Button
        </Iterate.PushButton>
      </Form.Handler>
    )

    const button = document.querySelector('button')
    fireEvent.click(button)

    expect(handleChange).toHaveBeenCalledTimes(1)
    expect(handleChange).toHaveBeenLastCalledWith(
      { foo: [pushValue] },
      expect.anything()
    )
  })

  it('should accept "pushValue" from a function call', () => {
    const handleChange = jest.fn()
    const pushValue = jest.fn(() => 'push value')

    render(
      <Form.Handler onChange={handleChange}>
        <Iterate.PushButton path="/foo" pushValue={pushValue}>
          Push Button
        </Iterate.PushButton>
      </Form.Handler>
    )

    const button = document.querySelector('button')
    fireEvent.click(button)

    expect(handleChange).toHaveBeenLastCalledWith(
      { foo: ['push value'] },
      expect.anything()
    )
    expect(pushValue).toHaveBeenLastCalledWith(undefined)
  })

  it('should render with the correct class name', () => {
    render(
      <Iterate.PushButton pushValue="push value">
        Push Button
      </Iterate.PushButton>
    )

    const button = document.querySelector('button')
    expect(button).toHaveClass('dnb-forms-iterate-push-button')
  })

  it('should be a secondary variant', () => {
    render(
      <Iterate.PushButton pushValue="push value">
        Push Button
      </Iterate.PushButton>
    )

    const button = document.querySelector('button')
    expect(button).toHaveClass('dnb-button--secondary')
  })

  it('should have no text by default', () => {
    render(<Iterate.PushButton pushValue="push value" />)

    const button = document.querySelector('button')
    expect(button.textContent).toBe('‌')
  })

  it('should accept "text" prop', () => {
    render(<Iterate.PushButton pushValue="push value" text="text" />)

    const button = document.querySelector('button')
    expect(button).toHaveTextContent('text')
  })

  it('should accept children content as text', () => {
    render(
      <Iterate.PushButton pushValue="push value">text</Iterate.PushButton>
    )

    const button = document.querySelector('button')
    expect(button).toHaveTextContent('text')
  })

  it('should accept custom attributes', () => {
    render(
      <Iterate.PushButton pushValue="push value" aria-label="Aria Label">
        text
      </Iterate.PushButton>
    )

    const button = document.querySelector('button')
    expect(button).toHaveAttribute('aria-label', 'Aria Label')
  })

  it('should render with "add" icon', () => {
    render(
      <Iterate.PushButton pushValue="push value">
        Push Button
      </Iterate.PushButton>
    )

    const button = document.querySelector('.dnb-forms-iterate-push-button')

    expect(button.querySelector('.dnb-icon')).toHaveAttribute(
      'data-testid',
      'add icon'
    )
  })

  it('should not overwrite initial data because of the same path as the Iterate.Array', async () => {
    const onSubmit = jest.fn()

    render(
      <Form.Handler onSubmit={onSubmit}>
        <Iterate.Array path="/myList" defaultValue={[null]}>
          <Field.String itemPath="/" />
        </Iterate.Array>

        <Iterate.PushButton path="/myList" pushValue="push value" />
      </Form.Handler>
    )

    const form = document.querySelector('form')
    const button = document.querySelector('.dnb-forms-iterate-push-button')

    fireEvent.submit(form)

    expect(onSubmit).toHaveBeenCalledTimes(1)
    expect(onSubmit).toHaveBeenLastCalledWith(
      { myList: [null] },
      expect.anything()
    )

    await userEvent.click(button)
    fireEvent.submit(form)

    expect(onSubmit).toHaveBeenCalledTimes(2)
    expect(onSubmit).toHaveBeenLastCalledWith(
      { myList: [null, 'push value'] },
      expect.anything()
    )
  })

  it('should support {nextItemNo}', async () => {
    render(
      <Form.Handler>
        <Iterate.Array path="/myList">
          <Field.String itemPath="/" />
          <Iterate.RemoveButton />
        </Iterate.Array>

        <Iterate.PushButton
          path="/myList"
          pushValue="push value"
          text="Add no. {nextItemNo}"
        />
      </Form.Handler>
    )

    const pushButton = document.querySelector(
      '.dnb-forms-iterate-push-button'
    )

    expect(pushButton).toHaveTextContent('Add no. 1')

    await userEvent.click(pushButton)
    expect(pushButton).toHaveTextContent('Add no. 2')

    const removeButton = document.querySelector(
      '.dnb-forms-iterate-remove-element-button'
    )
    await userEvent.click(removeButton)
    expect(pushButton).toHaveTextContent('Add no. 1')
  })

  it('should inherit "limit" prop from Array and show warning when limit is reached', async () => {
    render(
      <Form.Handler>
        <Iterate.Array path="/myList" limit={2}>
          <i />
          <Iterate.RemoveButton />
        </Iterate.Array>

        <Iterate.PushButton path="/myList" pushValue="push value" />
      </Form.Handler>
    )

    const pushButton = document.querySelector(
      '.dnb-forms-iterate-push-button'
    )

    // Add first item
    await userEvent.click(pushButton)

    // Add second item
    await userEvent.click(pushButton)

    expect(document.querySelector('.dnb-form-status')).toBeNull()

    // Try a third one
    await userEvent.click(pushButton)

    await waitFor(() => {
      const element = document.querySelector('.dnb-form-status')
      expect(element).toBeInTheDocument()
      expect(element).toHaveTextContent('Du har nådd grensen på: 2')
      expect(element).toHaveClass('dnb-form-status--warn')
      expect(document.querySelectorAll('i')).toHaveLength(2)
    })

    const removeButton = document.querySelector(
      '.dnb-forms-iterate-remove-element-button'
    )
    await userEvent.click(removeButton)

    await waitFor(() => {
      expect(document.querySelector('.dnb-form-status')).toBeNull()
    })
  })

  describe('itemPath', () => {
    it('should add item to the correct array', async () => {
      let collectedData = null

      render(
        <Form.Handler
          data={{
            outer: [{ inner: ['foo'] }],
          }}
        >
          <Iterate.Array path="/outer">
            <Iterate.Array itemPath="/inner">
              <Field.String itemPath="/" />
              <Iterate.RemoveButton />
            </Iterate.Array>

            <Iterate.PushButton itemPath="/inner" pushValue="bar" />
          </Iterate.Array>

          <DataContext.Consumer>
            {(context) => {
              collectedData = context.data
              return null
            }}
          </DataContext.Consumer>
        </Form.Handler>
      )

      expect(collectedData).toEqual({
        outer: [{ inner: ['foo'] }],
      })

      await userEvent.click(
        document.querySelector('.dnb-forms-iterate-push-button')
      )

      expect(collectedData).toEqual({
        outer: [{ inner: ['foo', 'bar'] }],
      })

      await userEvent.click(
        document.querySelector('.dnb-forms-iterate-remove-element-button')
      )

      expect(collectedData).toEqual({
        outer: [{ inner: ['bar'] }],
      })

      await userEvent.click(
        document.querySelector('.dnb-forms-iterate-remove-element-button')
      )

      expect(collectedData).toEqual({
        outer: [{ inner: [] }],
      })

      await userEvent.click(
        document.querySelector('.dnb-forms-iterate-push-button')
      )

      expect(collectedData).toEqual({
        outer: [{ inner: ['bar'] }],
      })
    })

    it('should add item within PushContainer to the correct array', async () => {
      let outerData = null
      let pushContainerData = null

      render(
        <Form.Handler>
          <Iterate.Array path="/outer">
            <Iterate.EditContainer>
              <Iterate.Array itemPath="/inner">
                <Field.String itemPath="/" />
              </Iterate.Array>
            </Iterate.EditContainer>
          </Iterate.Array>

          <Iterate.PushContainer path="/outer">
            <Iterate.Array itemPath="/inner">
              <Field.String itemPath="/" />
            </Iterate.Array>

            <Iterate.PushButton itemPath="/inner" pushValue="new value" />

            <DataContext.Consumer>
              {(context) => {
                pushContainerData = context.data
                return null
              }}
            </DataContext.Consumer>
          </Iterate.PushContainer>

          <DataContext.Consumer>
            {(context) => {
              outerData = context.data
              return null
            }}
          </DataContext.Consumer>
        </Form.Handler>
      )

      expect(outerData).toEqual(undefined)
      expect(pushContainerData).toEqual({
        pushContainerItems: [{}],
      })

      await userEvent.click(
        document.querySelector('.dnb-forms-iterate-push-button')
      )

      expect(outerData).toEqual(undefined)
      expect(pushContainerData).toEqual({
        pushContainerItems: [
          {
            inner: ['new value'],
          },
        ],
      })

      await userEvent.click(
        document.querySelector('.dnb-push-container__done-button')
      )

      expect(outerData).toEqual({ outer: [{ inner: ['new value'] }] })
      expect(pushContainerData).toEqual({
        pushContainerItems: [{}],
      })
    })

    it('should stay in edit mode when pushing new item (with changed items beforehand)', async () => {
      let outerData = null

      let containerModeOfFirstItem = null

      const ContainerModeConsumer = () => {
        const context = React.useContext(IterateItemContext)
        if (context.index === 0) {
          containerModeOfFirstItem = context.containerMode
        }

        return null
      }

      render(
        <Form.Handler
          defaultData={{
            outer: [{ inner: ['new value'] }],
          }}
        >
          <Iterate.Array path="/outer">
            <Iterate.ViewContainer>
              <Iterate.Array itemPath="/inner">content</Iterate.Array>
            </Iterate.ViewContainer>

            <Iterate.EditContainer>
              <Iterate.Array itemPath="/inner">
                <Field.String itemPath="/" />
              </Iterate.Array>

              <Iterate.PushButton
                itemPath="/inner"
                pushValue="new value"
              />
            </Iterate.EditContainer>

            <ContainerModeConsumer />
          </Iterate.Array>

          <Iterate.PushContainer path="/outer">
            content
          </Iterate.PushContainer>

          <DataContext.Consumer>
            {(context) => {
              outerData = context.data
              return null
            }}
          </DataContext.Consumer>
        </Form.Handler>
      )

      expect(containerModeOfFirstItem).toEqual('view')
      expect(outerData).toEqual({
        outer: [
          {
            inner: ['new value'],
          },
        ],
      })

      await userEvent.click(
        document.querySelectorAll('.dnb-push-container__done-button')[1]
      )

      expect(outerData).toEqual({
        outer: [
          {
            inner: ['new value'],
          },
          {},
        ],
      })

      await userEvent.click(
        document.querySelector('.dnb-forms-iterate-push-button')
      )

      expect(containerModeOfFirstItem).toEqual('view')

      await userEvent.click(
        document.querySelector('.dnb-push-container__edit-button')
      )

      expect(containerModeOfFirstItem).toEqual('edit')

      await userEvent.click(
        document.querySelector('.dnb-forms-iterate-push-button')
      )

      await expect(() => {
        expect(containerModeOfFirstItem).toEqual('view')
      }).toNeverResolve()
      expect(containerModeOfFirstItem).toEqual('edit')
    })
  })
})
