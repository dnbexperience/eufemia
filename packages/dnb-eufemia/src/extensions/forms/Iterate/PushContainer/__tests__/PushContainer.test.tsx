import React, { useContext } from 'react'
import { fireEvent, render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Field, Form, Iterate, Wizard } from '../../..'
import { Div } from '../../../../../elements'
import DataContext from '../../../DataContext/Context'

import nbNO from '../../../constants/locales/nb-NO'
const nb = nbNO['nb-NO']

describe('PushContainer', () => {
  it('should add a new entry to the array', async () => {
    const onChange = jest.fn()

    render(
      <Form.Handler onChange={onChange}>
        <Iterate.Array path="/entries">...</Iterate.Array>

        <Iterate.PushContainer path="/entries">
          <Field.String itemPath="/name" />
        </Iterate.PushContainer>
      </Form.Handler>
    )

    const input = document.querySelector('input')
    const button = document.querySelector('button')

    await userEvent.type(input, 'Tony')

    expect(onChange).toHaveBeenCalledTimes(0)

    await userEvent.click(button)

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenLastCalledWith(
      {
        entries: [
          {
            name: 'Tony',
          },
        ],
      },
      expect.anything()
    )
  })

  it('should show errors when pressing commit button', async () => {
    render(
      <Form.Handler>
        <Iterate.Array path="/entries">...</Iterate.Array>

        <Iterate.PushContainer path="/entries">
          <Field.String itemPath="/name" required />
        </Iterate.PushContainer>
      </Form.Handler>
    )

    await userEvent.click(document.querySelector('button'))

    expect(document.querySelector('.dnb-form-status')).toHaveTextContent(
      nb.Field.errorRequired
    )
  })

  describe('bubbleValidation', () => {
    it('should prevent the form from submitting as long as there are errors', async () => {
      const onSubmitRequest = jest.fn()
      const onSubmit = jest.fn()
      const onCommit = jest.fn()

      render(
        <Form.Handler
          onSubmitRequest={onSubmitRequest}
          onSubmit={onSubmit}
        >
          <Iterate.Array path="/entries">...</Iterate.Array>

          <Iterate.PushContainer
            path="/entries"
            bubbleValidation
            onCommit={onCommit}
          >
            <Field.String itemPath="/name" required />
          </Iterate.PushContainer>
        </Form.Handler>
      )

      const input = document.querySelector('input')
      const form = document.querySelector('form')
      const commitButton = document.querySelector('button')

      await userEvent.click(commitButton)

      expect(onCommit).toHaveBeenCalledTimes(0)
      expect(document.querySelector('.dnb-form-status')).toHaveTextContent(
        nb.Field.errorRequired
      )

      fireEvent.submit(form)

      expect(onSubmit).toHaveBeenCalledTimes(0)
      expect(onSubmitRequest).toHaveBeenCalledTimes(1)

      await userEvent.type(input, 'Tony')

      expect(
        document.querySelector('.dnb-form-status')
      ).not.toBeInTheDocument()

      fireEvent.submit(form)

      expect(onSubmit).toHaveBeenCalledTimes(1)
      expect(onSubmitRequest).toHaveBeenCalledTimes(1)
      expect(onCommit).toHaveBeenCalledTimes(0)

      await userEvent.click(commitButton)
      expect(onCommit).toHaveBeenCalledTimes(1)
    })

    it('should not show errors when submitting the form when bubbleValidation is false', async () => {
      render(
        <Form.Handler>
          <Iterate.Array path="/entries">...</Iterate.Array>

          <Iterate.PushContainer path="/entries" bubbleValidation={false}>
            <Field.String itemPath="/name" required />
          </Iterate.PushContainer>
        </Form.Handler>
      )

      fireEvent.submit(document.querySelector('form'))

      expect(
        document.querySelector('.dnb-form-status')
      ).not.toBeInTheDocument()
    })

    it('should show errors when submitting the form', async () => {
      render(
        <Form.Handler>
          <Iterate.Array path="/entries">...</Iterate.Array>

          <Iterate.PushContainer path="/entries" bubbleValidation>
            <Field.String itemPath="/name" required />
          </Iterate.PushContainer>
        </Form.Handler>
      )

      const input = document.querySelector('input')
      const form = document.querySelector('form')

      fireEvent.submit(form)

      expect(document.querySelector('.dnb-form-status')).toHaveTextContent(
        nb.Field.errorRequired
      )

      await userEvent.type(input, 'Tony')

      expect(
        document.querySelector('.dnb-form-status')
      ).not.toBeInTheDocument()

      fireEvent.submit(form)
    })

    it('should not prevent Wizard navigation when no error messages are present', async () => {
      render(
        <Form.Handler>
          <Wizard.Container>
            <Wizard.Step>
              <output>Step 1</output>

              <Iterate.PushContainer
                path="/myList"
                bubbleValidation
                openButton={
                  <Iterate.PushContainer.OpenButton id="open-button" />
                }
                showOpenButtonWhen={() => true}
              >
                <Field.String itemPath="/foo" required />
              </Iterate.PushContainer>

              <Wizard.Buttons />
            </Wizard.Step>

            <Wizard.Step>
              <output>Step 2</output>

              <Wizard.Buttons />
            </Wizard.Step>
          </Wizard.Container>
        </Form.Handler>
      )

      const previousButton = () => {
        return document.querySelector('.dnb-forms-previous-button')
      }
      const nextButton = () => {
        return document.querySelector('.dnb-forms-next-button')
      }
      const output = () => {
        return document.querySelector('output')
      }

      expect(output()).toHaveTextContent('Step 1')

      await userEvent.click(nextButton())

      expect(output()).toHaveTextContent('Step 2')

      await userEvent.click(previousButton())

      expect(output()).toHaveTextContent('Step 1')

      await userEvent.click(document.querySelector('#open-button'))
      expect(
        document.querySelector('.dnb-form-status')
      ).not.toBeInTheDocument()

      await userEvent.click(nextButton())

      expect(output()).toHaveTextContent('Step 1')
      expect(
        document.querySelector('.dnb-form-status')
      ).toBeInTheDocument()
    })
  })

  it('should show view container after adding a new entry', async () => {
    render(
      <Form.Handler>
        <Iterate.Array path="/entries">
          <Iterate.EditContainer>EditContainer</Iterate.EditContainer>
          <Iterate.ViewContainer>ViewContainer</Iterate.ViewContainer>
        </Iterate.Array>

        <Iterate.PushContainer path="/entries">
          <Field.String itemPath="/name" />
        </Iterate.PushContainer>
      </Form.Handler>
    )

    const input = document.querySelector('input')
    const button = document.querySelector('button')

    await userEvent.type(input, 'Tony')

    expect(
      document.querySelectorAll('.dnb-forms-iterate__element')
    ).toHaveLength(0)

    await userEvent.click(button)

    expect(
      document.querySelectorAll('.dnb-forms-iterate__element')
    ).toHaveLength(1)
    expect(
      document.querySelector('.dnb-forms-section-edit-block')
    ).toHaveAttribute('aria-hidden', 'true')

    await waitFor(() => {
      expect(
        document.querySelector('.dnb-forms-section-view-block')
      ).toHaveAttribute('aria-hidden', 'false')
    })
  })

  it('should clear the input without an error, when the submit button is clicked', async () => {
    render(
      <Form.Handler>
        <Iterate.PushContainer path="/entries">
          <Field.Name.First itemPath="/name" required />
        </Iterate.PushContainer>
      </Form.Handler>
    )

    const input = document.querySelector('input')
    const button = document.querySelector('button')

    await userEvent.type(input, '1')
    await userEvent.click(button)

    await waitFor(() => {
      expect(
        document.querySelector('.dnb-form-status')
      ).toBeInTheDocument()
    })

    await userEvent.type(input, '{Backspace}Tony')

    expect(input).toHaveValue('Tony')

    await userEvent.click(button)

    expect(input).toHaveValue('')
    await waitFor(() => {
      expect(document.querySelector('.dnb-form-status')).toBeNull()
    })
  })

  it('should validate input values', async () => {
    render(
      <Form.Handler>
        <Iterate.PushContainer path="/entries">
          <Field.Name.Last itemPath="/name" required />
        </Iterate.PushContainer>
      </Form.Handler>
    )

    const input = document.querySelector('input')
    const button = document.querySelector('button')

    expect(input).toHaveValue('')

    await userEvent.click(button)

    expect(input).toHaveValue('')
    expect(document.querySelector('.dnb-form-status')).toHaveTextContent(
      nb.LastName.errorRequired
    )
  })

  it('should support "required" prop', async () => {
    render(
      <Form.Handler>
        <Iterate.PushContainer path="/entries" required>
          <Field.Name.Last itemPath="/name" />
        </Iterate.PushContainer>
      </Form.Handler>
    )

    const input = document.querySelector('input')
    const button = document.querySelector('button')

    expect(input).toHaveValue('')

    await userEvent.click(button)

    expect(input).toHaveValue('')
    expect(document.querySelector('.dnb-form-status')).toHaveTextContent(
      nb.LastName.errorRequired
    )
  })

  it('should inherit "required" from DataContext', async () => {
    render(
      <Form.Handler required>
        <Iterate.PushContainer path="/entries">
          <Field.Name.Last itemPath="/name" />
        </Iterate.PushContainer>
      </Form.Handler>
    )

    const input = document.querySelector('input')
    const button = document.querySelector('button')

    expect(input).toHaveValue('')

    await userEvent.click(button)

    expect(input).toHaveValue('')
    expect(document.querySelector('.dnb-form-status')).toHaveTextContent(
      nb.LastName.errorRequired
    )
  })

  it('should render the "title"', () => {
    render(
      <Iterate.PushContainer path="/entries" title="New entry">
        <Field.String itemPath="/name" />
      </Iterate.PushContainer>
    )

    const title = document.querySelector('.dnb-p--lead')
    expect(title).toBeInTheDocument()
    expect(title).toHaveTextContent('New entry')
  })

  it('should render children with initial data value as an object', () => {
    render(
      <Form.Handler>
        <Iterate.PushContainer path="/entries" data={{ name: 'Tony' }}>
          <Field.String itemPath="/name" />
        </Iterate.PushContainer>
      </Form.Handler>
    )

    const input = document.querySelector('input')
    expect(input).toBeInTheDocument()
    expect(input).toHaveValue('Tony')
  })

  it('should render children with initial data value as a string', async () => {
    const onChange = jest.fn()

    render(
      <Form.Handler data={['foo']} onChange={onChange}>
        <Iterate.Array path="/">
          <Iterate.ViewContainer>View Content</Iterate.ViewContainer>
          <Iterate.EditContainer>Edit Content</Iterate.EditContainer>
        </Iterate.Array>

        <Iterate.PushContainer path="/" data="bar">
          <Field.String itemPath="/" />
        </Iterate.PushContainer>
      </Form.Handler>
    )

    const blocks = Array.from(
      document.querySelectorAll('.dnb-forms-section-block')
    )
    const [, , thirdBlock] = blocks

    const input = thirdBlock.querySelector('input')
    expect(input).toHaveValue('bar')

    await userEvent.click(thirdBlock.querySelector('button'))

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenLastCalledWith(
      ['foo', 'bar'],
      expect.anything()
    )

    await userEvent.type(input, '{Backspace>3}baz')
    expect(input).toHaveValue('baz')

    await userEvent.click(thirdBlock.querySelector('button'))

    expect(onChange).toHaveBeenCalledTimes(2)
    expect(onChange).toHaveBeenLastCalledWith(
      ['foo', 'bar', 'baz'],
      expect.anything()
    )
  })

  it('should render children and not the button', () => {
    render(
      <Form.Handler>
        <Iterate.PushContainer
          path="/entries"
          openButton={<Iterate.PushContainer.OpenButton />}
        >
          <Field.String itemPath="/name" />
        </Iterate.PushContainer>
      </Form.Handler>
    )

    const input = document.querySelector('input')
    expect(input).toBeInTheDocument()
    expect(input).toHaveValue('')

    expect(document.querySelectorAll('button')).toHaveLength(1)
    expect(
      document.querySelector('.dnb-forms-section-block__inner button')
    ).toBeInTheDocument()
  })

  it('should render correct button text', () => {
    render(
      <Form.Handler>
        <Iterate.PushContainer path="/entries">
          <Field.String itemPath="/name" />
        </Iterate.PushContainer>
      </Form.Handler>
    )

    const button = document.querySelector('button')
    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent(nb.IteratePushContainer.createButton)
  })

  it('should not show cancel button when no entries are given', () => {
    render(
      <Form.Handler>
        <Iterate.PushContainer path="/entries">
          <Field.String itemPath="/name" />
        </Iterate.PushContainer>
      </Form.Handler>
    )

    const buttons = document.querySelectorAll('button')
    expect(buttons).toHaveLength(1)
    expect(buttons[0]).toHaveTextContent(
      nb.IteratePushContainer.createButton
    )
  })

  it('should show cancel button when open button is clicked', async () => {
    render(
      <Form.Handler>
        <Iterate.PushContainer
          path="/entries"
          openButton={<Iterate.PushContainer.OpenButton />}
          showOpenButtonWhen={(list) => list.length > 0}
        >
          <Field.String itemPath="/name" />
        </Iterate.PushContainer>
      </Form.Handler>
    )

    const editBlock = document.querySelector(
      '.dnb-forms-section-edit-block'
    )

    expect(editBlock).toHaveAttribute('aria-hidden', 'false')

    {
      const buttons = document.querySelectorAll(
        '.dnb-forms-section-block__inner button'
      )
      expect(buttons).toHaveLength(1)
      expect(buttons[0]).toHaveTextContent(
        nb.IteratePushContainer.createButton
      )

      // Hide the form by adding a new item
      await userEvent.click(buttons[0])
    }

    expect(editBlock).toHaveAttribute('aria-hidden', 'true')

    // Show the form
    await userEvent.click(
      document.querySelector('.dnb-forms-iterate-open-button')
    )

    expect(editBlock).toHaveAttribute('aria-hidden', 'false')

    {
      const buttons = document.querySelectorAll(
        '.dnb-forms-section-block__inner button'
      )
      expect(buttons).toHaveLength(2)
      expect(buttons[0]).toHaveTextContent(
        nb.IteratePushContainer.createButton
      )
      expect(buttons[1]).toHaveTextContent(
        nb.IterateEditContainer.cancelButton
      )

      // Hide the form by adding a new item
      await userEvent.click(buttons[1])
    }

    expect(editBlock).toHaveAttribute('aria-hidden', 'true')

    // Show the form
    await userEvent.click(
      document.querySelector('.dnb-forms-iterate-open-button')
    )

    {
      const buttons = document.querySelectorAll(
        '.dnb-forms-section-block__inner button'
      )
      expect(buttons).toHaveLength(2)
      expect(buttons[0]).toHaveTextContent(
        nb.IteratePushContainer.createButton
      )
      expect(buttons[1]).toHaveTextContent(
        nb.IterateEditContainer.cancelButton
      )

      // Hide the form by adding a new item
      await userEvent.click(buttons[1])

      expect(editBlock).toHaveAttribute('aria-hidden', 'true')
    }
  })

  it('should render OpenButton and hide the form', () => {
    render(
      <Form.Handler>
        <Iterate.PushContainer
          path="/entries"
          openButton={
            <Iterate.PushContainer.OpenButton text="Add new entry" />
          }
          showOpenButtonWhen={(list) => list.length === 0}
        >
          <Field.String itemPath="/name" />
        </Iterate.PushContainer>
      </Form.Handler>
    )

    const buttons = document.querySelectorAll('button')
    expect(buttons).toHaveLength(3)

    const [addButton, cancelButton, openButton] = Array.from(buttons)

    expect(addButton).toHaveTextContent(
      nb.IteratePushContainer.createButton
    )
    expect(cancelButton).toHaveTextContent(
      nb.IterateEditContainer.cancelButton
    )
    expect(openButton).toHaveTextContent('Add new entry')
    expect(document.querySelector('.dnb-forms-section-block')).toHaveClass(
      'dnb-height-animation--hidden'
    )
    expect(
      document.querySelector('.dnb-forms-section-edit-block')
    ).toHaveAttribute('aria-hidden', 'true')
  })

  it('should render custom Toolbar', () => {
    const Toolbar = (props) => {
      return (
        <Div id="toolbar" {...props}>
          Custom Toolbar
        </Div>
      )
    }
    Toolbar._supportsSpacingProps = true

    render(
      <Form.Handler>
        <Iterate.Array path="/entries">...</Iterate.Array>

        <Iterate.PushContainer path="/entries">
          <Field.String itemPath="/" />
          <Toolbar />
        </Iterate.PushContainer>
      </Form.Handler>
    )

    const toolbar = document.querySelector('#toolbar')
    expect(toolbar).toHaveTextContent('Custom Toolbar')
    expect(toolbar).toHaveClass('dnb-space__top--medium')
  })

  it('should support spacing props', () => {
    render(
      <Iterate.PushContainer top="large" path="/entries">
        <Field.String itemPath="/name" />
      </Iterate.PushContainer>
    )

    expect(
      document.querySelector('.dnb-forms-section-block__inner')
    ).toHaveClass('dnb-space__top--large')
  })

  it('should support array data', async () => {
    const onChange = jest.fn()

    render(
      <Form.Handler data={['foo']} onChange={onChange}>
        <Iterate.Array path="/">
          <Iterate.ViewContainer>View Content</Iterate.ViewContainer>
          <Iterate.EditContainer>Edit Content</Iterate.EditContainer>
        </Iterate.Array>

        <Iterate.PushContainer path="/">
          <Field.String itemPath="/" />
        </Iterate.PushContainer>
      </Form.Handler>
    )

    const blocks = Array.from(
      document.querySelectorAll('.dnb-forms-section-block')
    )
    const [, , thirdBlock] = blocks

    const input = thirdBlock.querySelector('input')
    expect(input).toHaveValue('')

    await userEvent.type(input, 'bar')
    expect(input).toHaveValue('bar')

    await userEvent.click(thirdBlock.querySelector('button'))

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenLastCalledWith(
      ['foo', 'bar'],
      expect.anything()
    )
  })

  describe('defaultValue', () => {
    it('should render and set defaultValue in data context', async () => {
      const onChange = jest.fn()

      render(
        <Form.Handler onChange={onChange}>
          <Iterate.PushContainer path="/myList">
            <Field.String itemPath="/foo" defaultValue="bar" />
          </Iterate.PushContainer>
        </Form.Handler>
      )

      expect(document.querySelector('input')).toHaveValue('bar')
      await userEvent.click(document.querySelector('button'))

      expect(document.querySelector('input')).toHaveValue('bar')
      expect(onChange).toHaveBeenCalledTimes(1)
      expect(onChange).toHaveBeenLastCalledWith(
        {
          myList: [{ foo: 'bar' }],
        },
        expect.anything()
      )

      await userEvent.click(document.querySelector('button'))

      expect(document.querySelector('input')).toHaveValue('bar')
      expect(onChange).toHaveBeenCalledTimes(2)
      expect(onChange).toHaveBeenLastCalledWith(
        {
          myList: [{ foo: 'bar' }, { foo: 'bar' }],
        },
        expect.anything()
      )
    })

    it('should support "/" as the path and push the defaultValue', async () => {
      const onChange = jest.fn()

      render(
        <Form.Handler onChange={onChange}>
          <Iterate.PushContainer path="/">
            <Field.String itemPath="/" defaultValue="foo" />
          </Iterate.PushContainer>
        </Form.Handler>
      )

      expect(document.querySelector('input')).toHaveValue('foo')
      await userEvent.click(document.querySelector('button'))

      expect(document.querySelector('input')).toHaveValue('foo')
      expect(onChange).toHaveBeenCalledTimes(1)
      expect(onChange).toHaveBeenLastCalledWith(['foo'], expect.anything())

      await userEvent.click(document.querySelector('button'))

      expect(document.querySelector('input')).toHaveValue('foo')
      expect(onChange).toHaveBeenCalledTimes(2)
      expect(onChange).toHaveBeenLastCalledWith(
        ['foo', 'foo'],
        expect.anything()
      )
    })

    it('should render and extend the data context', async () => {
      const onChange = jest.fn()

      render(
        <Form.Handler data={['foo']} onChange={onChange}>
          <Iterate.Array path="/">
            <Iterate.ViewContainer>View Content</Iterate.ViewContainer>
            <Iterate.EditContainer>Edit Content</Iterate.EditContainer>
          </Iterate.Array>

          <Iterate.PushContainer path="/">
            <Field.String itemPath="/" defaultValue="bar" />
          </Iterate.PushContainer>
        </Form.Handler>
      )

      const blocks = Array.from(
        document.querySelectorAll('.dnb-forms-section-block')
      )
      const [, , thirdBlock] = blocks

      const input = thirdBlock.querySelector('input')
      expect(input).toHaveValue('bar')

      await userEvent.click(thirdBlock.querySelector('button'))

      expect(onChange).toHaveBeenCalledTimes(1)
      expect(onChange).toHaveBeenLastCalledWith(
        ['foo', 'bar'],
        expect.anything()
      )
    })

    it('should not show error message after clearing', async () => {
      const onChange = jest.fn()

      render(
        <Form.Handler onChange={onChange}>
          <Iterate.PushContainer path="/entries">
            <Field.Name.First
              itemPath="/first"
              defaultValue="first name"
              required
            />
            <Field.Name.Last
              itemPath="/last"
              defaultValue="last name"
              required
            />
          </Iterate.PushContainer>
        </Form.Handler>
      )

      const [firstInput, lastInput] = Array.from(
        document.querySelectorAll('input')
      )
      const button = document.querySelector('button')

      expect(firstInput).toHaveValue('first name')
      expect(lastInput).toHaveValue('last name')

      await userEvent.click(button)
      expect(onChange).toHaveBeenCalledTimes(1)
      expect(onChange).toHaveBeenLastCalledWith(
        {
          entries: [
            {
              first: 'first name',
              last: 'last name',
            },
          ],
        },
        expect.anything()
      )

      expect(firstInput).toHaveValue('first name')
      expect(lastInput).toHaveValue('last name')

      await userEvent.click(button)
      expect(onChange).toHaveBeenCalledTimes(2)
      expect(onChange).toHaveBeenLastCalledWith(
        {
          entries: [
            {
              first: 'first name',
              last: 'last name',
            },
            {
              first: 'first name',
              last: 'last name',
            },
          ],
        },
        expect.anything()
      )

      expect(firstInput).toHaveValue('first name')
      expect(lastInput).toHaveValue('last name')

      await userEvent.click(button)
      expect(onChange).toHaveBeenCalledTimes(3)
      expect(onChange).toHaveBeenLastCalledWith(
        {
          entries: [
            {
              first: 'first name',
              last: 'last name',
            },
            {
              first: 'first name',
              last: 'last name',
            },
            {
              first: 'first name',
              last: 'last name',
            },
          ],
        },
        expect.anything()
      )

      expect(firstInput).toHaveValue('first name')
      expect(lastInput).toHaveValue('last name')

      await waitFor(() => {
        expect(document.querySelector('.dnb-form-status')).toBeNull()
      })
    })

    it('should keep the defaultValue after clearing', async () => {
      const onChange = jest.fn()
      const onCommit = jest.fn()

      let internalContext = null
      const CollectInternalData = () => {
        internalContext = useContext(DataContext)
        return null
      }

      render(
        <Form.Handler onChange={onChange}>
          <Iterate.PushContainer path="/" onCommit={onCommit}>
            <Field.String itemPath="/" defaultValue="default value" />
            <CollectInternalData />
          </Iterate.PushContainer>
        </Form.Handler>
      )

      expect(internalContext).toMatchObject({
        data: {
          pushContainerItems: ['default value'],
        },
      })

      const input = document.querySelector('input')

      await userEvent.type(input, ' changed')

      const button = document.querySelector('button')

      await userEvent.click(button)
      expect(internalContext.internalDataRef.current).toEqual({
        pushContainerItems: ['default value'],
      })
      expect(onChange).toHaveBeenCalledTimes(1)
      expect(onChange).toHaveBeenLastCalledWith(
        ['default value changed'],
        expect.anything()
      )
      expect(onCommit).toHaveBeenCalledTimes(1)
      expect(onCommit).toHaveBeenLastCalledWith(
        ['default value changed'],
        expect.anything()
      )

      await userEvent.click(button)
      expect(internalContext.internalDataRef.current).toEqual({
        pushContainerItems: ['default value'],
      })
      expect(onChange).toHaveBeenCalledTimes(2)
      expect(onChange).toHaveBeenLastCalledWith(
        ['default value changed', 'default value'],
        expect.anything()
      )
      expect(onCommit).toHaveBeenCalledTimes(2)
      expect(onCommit).toHaveBeenLastCalledWith(
        ['default value changed', 'default value'],
        expect.anything()
      )
    })
  })

  it('should support initial data as a string', async () => {
    const onChange = jest.fn()

    render(
      <Form.Handler data={['foo']} onChange={onChange}>
        <Iterate.Array path="/">
          <Iterate.ViewContainer>View Content</Iterate.ViewContainer>
          <Iterate.EditContainer>Edit Content</Iterate.EditContainer>
        </Iterate.Array>

        <Iterate.PushContainer path="/" data="bar">
          <Field.String itemPath="/" />
        </Iterate.PushContainer>
      </Form.Handler>
    )

    const blocks = Array.from(
      document.querySelectorAll('.dnb-forms-section-block')
    )
    const [, , thirdBlock] = blocks

    const input = thirdBlock.querySelector('input')
    expect(input).toHaveValue('bar')

    await userEvent.click(thirdBlock.querySelector('button'))

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenLastCalledWith(
      ['foo', 'bar'],
      expect.anything()
    )

    await userEvent.type(input, '{Backspace>3}baz')
    expect(input).toHaveValue('baz')

    await userEvent.click(thirdBlock.querySelector('button'))

    expect(onChange).toHaveBeenCalledTimes(2)
    expect(onChange).toHaveBeenLastCalledWith(
      ['foo', 'bar', 'baz'],
      expect.anything()
    )
  })

  it('should support {nextItemNo}', async () => {
    render(
      <Form.Handler data={{ myList: undefined }}>
        <Iterate.Array path="/myList">
          <Iterate.ViewContainer>View Content</Iterate.ViewContainer>
          <Iterate.EditContainer>Edit Content</Iterate.EditContainer>
        </Iterate.Array>

        <Iterate.PushContainer
          path="/myList"
          openButton={
            <Iterate.PushContainer.OpenButton text="Add no. {nextItemNo}" />
          }
          showOpenButtonWhen={(list) => list.length >= 0}
        >
          <Field.String itemPath="/name" />
        </Iterate.PushContainer>
      </Form.Handler>
    )

    const openButton = document.querySelector(
      '.dnb-forms-iterate-open-button'
    )
    const doneButton = document.querySelector('button')

    expect(openButton).toHaveTextContent('Add no. 1')

    await userEvent.click(doneButton)
    expect(openButton).toHaveTextContent('Add no. 2')

    const removeButton = document.querySelectorAll('button')[1]
    await userEvent.click(removeButton)
    expect(openButton).toHaveTextContent('Add no. 1')
  })

  it('should inherit "limit" prop from Array and show warning when limit is reached', async () => {
    render(
      <Form.Handler>
        <Iterate.Array path="/myList" limit={2}>
          <i />
          <Iterate.RemoveButton />
        </Iterate.Array>

        <Iterate.PushContainer path="/myList">
          content
        </Iterate.PushContainer>
      </Form.Handler>
    )

    const doneButton = document.querySelector('button')

    // Add first item
    await userEvent.click(doneButton)

    // Add second item
    await userEvent.click(doneButton)

    expect(document.querySelector('.dnb-form-status')).toBeNull()

    // Try a third one
    await userEvent.click(doneButton)

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
})
