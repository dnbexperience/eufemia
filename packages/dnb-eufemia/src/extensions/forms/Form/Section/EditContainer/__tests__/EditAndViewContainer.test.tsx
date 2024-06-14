import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import EditContainer from '../EditContainer'
import ViewContainer from '../../ViewContainer'
import SectionContainerContext from '../../containers/SectionContainerContext'
import { Field, Form } from '../../../..'
import userEvent from '@testing-library/user-event'

describe('EditContainer and ViewContainer', () => {
  it('should switch mode on pressing edit button', () => {
    render(
      <Form.Section>
        <Form.Section.ViewContainer>
          View Content
        </Form.Section.ViewContainer>
        <Form.Section.EditContainer>
          Edit Content
        </Form.Section.EditContainer>
      </Form.Section>
    )

    const blocks = document.querySelectorAll('.dnb-forms-section-block')
    expect(blocks).toHaveLength(2)
    const [viewBlock, editBlock] = Array.from(blocks)

    expect(viewBlock).toHaveClass('dnb-forms-section-view-block')
    expect(editBlock).toHaveClass('dnb-forms-section-edit-block')

    // Switch to edit mode
    fireEvent.click(viewBlock.querySelector('button'))
    expect(editBlock).toHaveTextContent('Edit Content')

    // Switch to view mode
    fireEvent.click(editBlock.querySelector('button'))
    expect(viewBlock).toHaveTextContent('View Content')

    // Switch to edit mode
    fireEvent.click(viewBlock.querySelector('button'))
    expect(editBlock).toHaveTextContent('Edit Content')
  })

  it('should switch mode from view to edit on error during submit', async () => {
    let containerMode = null

    const ContextConsumer = () => {
      const context = React.useContext(SectionContainerContext)
      containerMode = context.containerMode

      return null
    }

    render(
      <Form.Handler>
        <Form.Section>
          <EditContainer>
            <Field.String path="/" required />
          </EditContainer>
          <ViewContainer>content</ViewContainer>
          <ContextConsumer />
        </Form.Section>
      </Form.Handler>
    )

    expect(containerMode).toBe('view')

    const input = document.querySelector('input')
    await userEvent.type(input, 'x{Backspace}')

    const form = document.querySelector('form')
    fireEvent.submit(form)

    expect(containerMode).toBe('edit')
  })

  it('should reset entered data on Cancel press, when containerMode is set to "edit"', async () => {
    let containerMode = null

    const ContextConsumer = () => {
      const context = React.useContext(SectionContainerContext)
      containerMode = context.containerMode

      return null
    }

    render(
      <Form.Handler data={{ foo: 'bar' }}>
        <Form.Section containerMode="edit" path="/">
          <EditContainer>
            <Field.String path="/foo" required />
          </EditContainer>
          <ViewContainer>content</ViewContainer>
          <ContextConsumer />
        </Form.Section>
      </Form.Handler>
    )

    expect(containerMode).toBe('edit')

    const input = document.querySelector('input')
    expect(input).toHaveValue('bar')

    await userEvent.type(input, ' additional')
    expect(input).toHaveValue('bar additional')

    const [, cancelButton] = Array.from(
      document.querySelectorAll('button')
    )
    await userEvent.click(cancelButton)

    expect(containerMode).toBe('view')
    expect(input).toHaveValue('bar')
  })

  it('should set focus on __element when containerMode changes', async () => {
    render(
      <Form.Section>
        <Form.Section.ViewContainer>
          View Content
        </Form.Section.ViewContainer>
        <Form.Section.EditContainer>
          Edit Content
        </Form.Section.EditContainer>
      </Form.Section>
    )

    const blocks = document.querySelectorAll('.dnb-forms-section-block')
    expect(blocks).toHaveLength(2)
    const [viewBlock, editBlock] = Array.from(blocks)
    const [editButton] = Array.from(viewBlock.querySelectorAll('button'))
    const [cancelButton] = Array.from(editBlock.querySelectorAll('button'))

    expect(viewBlock).toHaveClass('dnb-forms-section-view-block')
    expect(editBlock).toHaveClass('dnb-forms-section-edit-block')

    expect(document.body).toHaveFocus()

    // Switch to edit mode
    fireEvent.click(editButton)
    expect(editBlock).toHaveTextContent('Edit Content')

    await waitFor(() => {
      expect(
        editBlock.querySelector('.dnb-forms-section-block__inner')
      ).toHaveFocus()
    })

    // Reset focus, so we can test focus during close
    ;(document.activeElement as HTMLElement).blur()

    // Switch to view mode
    fireEvent.click(cancelButton)
    expect(viewBlock).toHaveTextContent('View Content')

    await waitFor(() => {
      expect(
        viewBlock.querySelector('.dnb-forms-section-block__inner')
      ).toHaveFocus()
    })

    // Reset focus, so we can test focus during close
    ;(document.activeElement as HTMLElement).blur()

    // Switch to edit mode
    fireEvent.click(editButton)
    expect(editBlock).toHaveTextContent('Edit Content')

    await waitFor(() => {
      expect(
        editBlock.querySelector('.dnb-forms-section-block__inner')
      ).toHaveFocus()
    })
  })

  it('should set variant to "outline" when variant is not set', async () => {
    render(
      <Form.Section>
        <Form.Section.ViewContainer>
          View Content
        </Form.Section.ViewContainer>
        <Form.Section.EditContainer>
          Edit Content
        </Form.Section.EditContainer>
      </Form.Section>
    )

    const [viewBlock, editBlock] = Array.from(
      document.querySelectorAll('.dnb-forms-section-block')
    )
    expect(viewBlock).toHaveClass(
      'dnb-forms-section-block--variant-outline'
    )
    expect(editBlock).toHaveClass(
      'dnb-forms-section-block--variant-outline'
    )
  })

  it('should set variant to "basic" when variant is set to "basic"', async () => {
    render(
      <Form.Section>
        <Form.Section.ViewContainer variant="basic">
          View Content
        </Form.Section.ViewContainer>
        <Form.Section.EditContainer variant="basic">
          Edit Content
        </Form.Section.EditContainer>
      </Form.Section>
    )

    const [viewBlock, editBlock] = Array.from(
      document.querySelectorAll('.dnb-forms-section-block')
    )
    expect(viewBlock).toHaveClass('dnb-forms-section-block--variant-basic')
    expect(editBlock).toHaveClass('dnb-forms-section-block--variant-basic')
  })
})
