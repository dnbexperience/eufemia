import React from 'react'
import { render, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Field, Form, Iterate } from '../../..'
import nbNO from '../../../constants/locales/nb-NO'

const nb = nbNO['nb-NO']

describe('CreateEntryContainer', () => {
  it('should add a new entry to the array', async () => {
    const onChange = jest.fn()

    render(
      <Form.Handler onChange={onChange}>
        <Iterate.Array path="/entries">...</Iterate.Array>

        <Iterate.CreateEntryContainer path="/entries">
          <Field.String itemPath="/name" />
        </Iterate.CreateEntryContainer>
      </Form.Handler>
    )

    const input = document.querySelector('input')
    const button = document.querySelector('button')

    await userEvent.type(input, 'Tony')

    expect(onChange).toHaveBeenCalledTimes(0)

    await userEvent.click(button)

    expect(onChange).toHaveBeenCalledTimes(1)
    expect(onChange).toHaveBeenLastCalledWith({
      entries: [
        {
          name: 'Tony',
        },
      ],
    })
  })

  it('should show view container after adding a new entry', async () => {
    render(
      <Form.Handler>
        <Iterate.Array path="/entries">
          <Iterate.EditContainer>EditContainer</Iterate.EditContainer>
          <Iterate.ViewContainer>ViewContainer</Iterate.ViewContainer>
        </Iterate.Array>

        <Iterate.CreateEntryContainer path="/entries">
          <Field.String itemPath="/name" />
        </Iterate.CreateEntryContainer>
      </Form.Handler>
    )

    const input = document.querySelector('input')
    const button = document.querySelector('button')

    await userEvent.type(input, 'Tony')

    expect(
      document.querySelectorAll('.dnb-forms-iterate__element')
    ).toHaveLength(1)

    await userEvent.click(button)

    expect(
      document.querySelectorAll('.dnb-forms-iterate__element')
    ).toHaveLength(2)
    expect(
      document.querySelector('.dnb-forms-section-edit-block')
    ).toHaveAttribute('aria-hidden', 'true')

    await waitFor(() => {
      expect(
        document.querySelector('.dnb-forms-section-view-block')
      ).toHaveAttribute('aria-hidden', 'false')
    })
  })

  it('should clear the input when the button is clicked', async () => {
    render(
      <Form.Handler>
        <Iterate.CreateEntryContainer path="/entries">
          <Field.String itemPath="/name" />
        </Iterate.CreateEntryContainer>
      </Form.Handler>
    )

    const input = document.querySelector('input')
    const button = document.querySelector('button')

    await userEvent.type(input, 'Tony')

    expect(input).toHaveValue('Tony')

    await userEvent.click(button)

    expect(input).toHaveValue('')
    expect(document.querySelector('.dnb-form-status')).toBeNull()
  })

  it('should validate input values', async () => {
    render(
      <Form.Handler>
        <Iterate.CreateEntryContainer path="/entries">
          <Field.Name.Last itemPath="/name" required />
        </Iterate.CreateEntryContainer>
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
      <Iterate.CreateEntryContainer path="/entries" title="New entry">
        <Field.String itemPath="/name" />
      </Iterate.CreateEntryContainer>
    )

    const title = document.querySelector('.dnb-p--lead')
    expect(title).toBeInTheDocument()
    expect(title).toHaveTextContent('New entry')
  })

  it('should render children with initial value', () => {
    render(
      <Form.Handler>
        <Iterate.CreateEntryContainer
          path="/entries"
          data={{ name: 'Tony' }}
          showButton={<Iterate.CreateEntryContainer.OpenButton />}
        >
          <Field.String itemPath="/name" />
        </Iterate.CreateEntryContainer>
      </Form.Handler>
    )

    const input = document.querySelector('input')
    expect(input).toBeInTheDocument()
    expect(input).toHaveValue('Tony')
  })

  it('should render children and not the button', () => {
    render(
      <Form.Handler>
        <Iterate.CreateEntryContainer
          path="/entries"
          showButton={<Iterate.CreateEntryContainer.OpenButton />}
        >
          <Field.String itemPath="/name" />
        </Iterate.CreateEntryContainer>
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
        <Iterate.CreateEntryContainer path="/entries">
          <Field.String itemPath="/name" />
        </Iterate.CreateEntryContainer>
      </Form.Handler>
    )

    const button = document.querySelector('button')
    expect(button).toBeInTheDocument()
    expect(button).toHaveTextContent(
      nb.IterateCreateEntryContainer.createButton
    )
  })

  it('should not show cancel button when no entries are given', () => {
    render(
      <Form.Handler>
        <Iterate.CreateEntryContainer path="/entries">
          <Field.String itemPath="/name" />
        </Iterate.CreateEntryContainer>
      </Form.Handler>
    )

    const buttons = document.querySelectorAll('button')
    expect(buttons).toHaveLength(1)
    expect(buttons[0]).toHaveTextContent(
      nb.IterateCreateEntryContainer.createButton
    )
  })

  it('should show cancel button when open button is clicked', async () => {
    render(
      <Form.Handler>
        <Iterate.CreateEntryContainer
          path="/entries"
          showButton={<Iterate.CreateEntryContainer.OpenButton />}
          showButtonWhen={(list) => list.length > 0}
        >
          <Field.String itemPath="/name" />
        </Iterate.CreateEntryContainer>
      </Form.Handler>
    )

    {
      const buttons = document.querySelectorAll(
        '.dnb-forms-section-block__inner button'
      )
      expect(buttons).toHaveLength(1)
      expect(buttons[0]).toHaveTextContent(
        nb.IterateCreateEntryContainer.createButton
      )
      // Hide the form
      await userEvent.click(buttons[0])
    }

    expect(
      document.querySelector('.dnb-forms-section-edit-block')
    ).toHaveAttribute('aria-hidden', 'true')

    // Show the form
    await userEvent.click(
      document.querySelector('.dnb-forms-iterate-open-button')
    )

    expect(
      document.querySelector('.dnb-forms-section-edit-block')
    ).toHaveAttribute('aria-hidden', 'false')

    {
      const buttons = document.querySelectorAll(
        '.dnb-forms-section-block__inner button'
      )
      expect(buttons).toHaveLength(2)
      expect(buttons[0]).toHaveTextContent(
        nb.IterateCreateEntryContainer.createButton
      )
      expect(buttons[1]).toHaveTextContent(
        nb.IterateEditContainer.cancelButton
      )
      // Hide the form
      await userEvent.click(buttons[1])
    }

    expect(
      document.querySelector('.dnb-forms-section-edit-block')
    ).toHaveAttribute('aria-hidden', 'true')
    expect(
      document.querySelectorAll('.dnb-forms-section-block__inner button')
    ).toHaveLength(1)

    // Show the form
    await userEvent.click(
      document.querySelector('.dnb-forms-iterate-open-button')
    )

    expect(
      document.querySelectorAll('.dnb-forms-section-block__inner button')
    ).toHaveLength(2)
  })

  it('should render OpenButton and hide the form', () => {
    render(
      <Form.Handler>
        <Iterate.CreateEntryContainer
          path="/entries"
          showButton={
            <Iterate.CreateEntryContainer.OpenButton text="Add new entry" />
          }
          showButtonWhen={(list) => list.length === 0}
        >
          <Field.String itemPath="/name" />
        </Iterate.CreateEntryContainer>
      </Form.Handler>
    )

    const buttons = document.querySelectorAll('button')
    expect(buttons).toHaveLength(2)

    const [addButton, openButton] = Array.from(buttons)

    expect(openButton).toHaveTextContent('Add new entry')
    expect(addButton).toHaveTextContent(
      nb.IterateCreateEntryContainer.createButton
    )
    expect(document.querySelector('.dnb-forms-section-block')).toHaveClass(
      'dnb-height-animation--hidden'
    )
  })

  it('should support spacing props', () => {
    render(
      <Iterate.CreateEntryContainer top="large" path="/entries">
        <Field.String itemPath="/name" />
      </Iterate.CreateEntryContainer>
    )

    expect(
      document.querySelector('.dnb-forms-section-block__inner')
    ).toHaveClass('dnb-space__top--large')
  })
})
