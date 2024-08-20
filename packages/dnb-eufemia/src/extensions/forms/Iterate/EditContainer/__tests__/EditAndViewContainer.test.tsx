import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import IterateItemContext from '../../IterateItemContext'
import EditContainer from '../EditContainer'
import ViewContainer from '../../ViewContainer'
import { Field, Form, Iterate } from '../../..'
import userEvent from '@testing-library/user-event'
import nbNO from '../../../constants/locales/nb-NO'

const nb = nbNO['nb-NO'].IterateEditContainer

describe('EditContainer and ViewContainer', () => {
  it('should switch mode on pressing edit button', async () => {
    render(
      <Iterate.Array value={['foo', 'bar']}>
        <Iterate.ViewContainer>View Content</Iterate.ViewContainer>
        <Iterate.EditContainer>Edit Content</Iterate.EditContainer>
      </Iterate.Array>
    )

    const elements = document.querySelectorAll(
      '.dnb-forms-iterate__element'
    )
    expect(elements).toHaveLength(2)

    const [firstElement, secondElement] = Array.from(elements)

    {
      const [viewBlock, editBlock] = Array.from(
        firstElement.querySelectorAll('.dnb-forms-section-block')
      )
      expect(viewBlock).toHaveClass('dnb-forms-section-view-block')
      expect(editBlock).toHaveClass('dnb-forms-section-edit-block')

      // Switch to edit mode
      fireEvent.click(viewBlock.querySelector('button'))
      expect(firstElement).toHaveTextContent('Edit Content')

      // Switch to view mode
      fireEvent.click(editBlock.querySelector('button'))
      expect(firstElement).toHaveTextContent('View Content')

      // Switch to edit mode
      fireEvent.click(viewBlock.querySelector('button'))
      expect(firstElement).toHaveTextContent('Edit Content')
    }

    {
      const [viewBlock, editBlock] = Array.from(
        secondElement.querySelectorAll('.dnb-forms-section-block')
      )
      expect(viewBlock).toHaveClass('dnb-forms-section-view-block')
      expect(editBlock).toHaveClass('dnb-forms-section-edit-block')

      // Switch to edit mode
      fireEvent.click(viewBlock.querySelector('button'))
      expect(secondElement).toHaveTextContent('Edit Content')

      // Switch to view mode
      fireEvent.click(editBlock.querySelector('button'))
      expect(secondElement).toHaveTextContent('View Content')

      // Switch to edit mode
      fireEvent.click(viewBlock.querySelector('button'))
      expect(secondElement).toHaveTextContent('Edit Content')
    }

    expect(firstElement).toHaveTextContent('Edit Content')
    expect(secondElement).toHaveTextContent('Edit Content')
  })

  it('should switch mode from view to edit on error during submit', async () => {
    let containerMode = null

    const ContextConsumer = () => {
      const context = React.useContext(IterateItemContext)
      containerMode = context.containerMode

      return null
    }

    render(
      <Form.Handler>
        <Iterate.Array value={['']}>
          <EditContainer>
            <Field.String itemPath="/" required />
          </EditContainer>
          <ViewContainer>content</ViewContainer>
          <ContextConsumer />
        </Iterate.Array>
      </Form.Handler>
    )

    const input = document.querySelector('input')
    await userEvent.type(input, 'x{Backspace}')
    expect(containerMode).toBe('view')

    const form = document.querySelector('form')
    fireEvent.submit(form)

    expect(containerMode).toBe('edit')
  })

  it('should set focus on __element when containerMode changes', async () => {
    render(
      <Iterate.Array value={['foo', 'bar']}>
        <Iterate.ViewContainer>View Content</Iterate.ViewContainer>
        <Iterate.EditContainer>Edit Content</Iterate.EditContainer>
      </Iterate.Array>
    )

    const elements = document.querySelectorAll(
      '.dnb-forms-iterate__element'
    )
    expect(elements).toHaveLength(2)

    const firstElement = elements[0]
    const [viewBlock, editBlock] = Array.from(
      firstElement.querySelectorAll('.dnb-forms-section-block')
    )
    const [editButton] = Array.from(viewBlock.querySelectorAll('button'))
    const [cancelButton] = Array.from(editBlock.querySelectorAll('button'))

    expect(viewBlock).toHaveClass('dnb-forms-section-view-block')
    expect(editBlock).toHaveClass('dnb-forms-section-edit-block')

    expect(document.body).toHaveFocus()

    // Switch to edit mode
    fireEvent.click(editButton)
    expect(firstElement).toHaveTextContent('Edit Content')

    await waitFor(() => {
      expect(firstElement).toHaveFocus()
    })

    // Reset focus, so we can test focus during close
    ;(document.activeElement as HTMLElement).blur()

    // Switch to view mode
    fireEvent.click(cancelButton)
    expect(firstElement).toHaveTextContent('View Content')

    await waitFor(() => {
      expect(firstElement).toHaveFocus()
    })

    // Reset focus, so we can test focus during close
    ;(document.activeElement as HTMLElement).blur()

    // Switch to edit mode
    fireEvent.click(editButton)
    expect(firstElement).toHaveTextContent('Edit Content')

    await waitFor(() => {
      expect(firstElement).toHaveFocus()
    })
  })

  it('should set focus on other item __element when containerMode gets removed', async () => {
    render(
      <Iterate.Array value={['foo', 'bar']}>
        <Iterate.ViewContainer>View Content</Iterate.ViewContainer>
        <Iterate.EditContainer>Edit Content</Iterate.EditContainer>
      </Iterate.Array>
    )

    const elements = document.querySelectorAll(
      '.dnb-forms-iterate__element'
    )
    expect(elements).toHaveLength(2)

    const firstElement = elements[0]
    const [viewBlock, editBlock] = Array.from(
      firstElement.querySelectorAll('.dnb-forms-section-block')
    )
    const [, removeButton] = Array.from(
      viewBlock.querySelectorAll('button')
    )

    expect(viewBlock).toHaveClass('dnb-forms-section-view-block')
    expect(editBlock).toHaveClass('dnb-forms-section-edit-block')

    expect(document.body).toHaveFocus()

    // Remove the element
    fireEvent.click(removeButton)
    expect(removeButton).toHaveTextContent(nb.removeButton)

    await waitFor(() => {
      const elements = document.querySelectorAll(
        '.dnb-forms-iterate__element'
      )
      expect(elements).toHaveLength(1)
      expect(elements[0]).toHaveFocus()
    })
  })

  it('should set variant to "outline" when variant is not set', async () => {
    render(
      <Iterate.Array value={['foo']}>
        <Iterate.ViewContainer>View Content</Iterate.ViewContainer>
        <Iterate.EditContainer>Edit Content</Iterate.EditContainer>
      </Iterate.Array>
    )

    const element = document.querySelector('.dnb-forms-iterate__element')
    const [viewBlock, editBlock] = Array.from(
      element.querySelectorAll('.dnb-forms-section-block')
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
      <Iterate.Array value={['foo', 'bar']}>
        <Iterate.ViewContainer variant="basic">
          View Content
        </Iterate.ViewContainer>
        <Iterate.EditContainer variant="basic">
          Edit Content
        </Iterate.EditContainer>
      </Iterate.Array>
    )

    const element = document.querySelector('.dnb-forms-iterate__element')
    const [viewBlock, editBlock] = Array.from(
      element.querySelectorAll('.dnb-forms-section-block')
    )
    expect(viewBlock).toHaveClass('dnb-forms-section-block--variant-basic')
    expect(editBlock).toHaveClass('dnb-forms-section-block--variant-basic')
  })

  it('should validate on done button click', async () => {
    const onChange = jest.fn()

    render(
      <Form.Handler>
        <Iterate.Array value={['']} onChange={onChange}>
          <EditContainer>
            <Field.String required itemPath="/" />
          </EditContainer>
          <ViewContainer>content</ViewContainer>
        </Iterate.Array>
      </Form.Handler>
    )

    expect(
      document.querySelector('.dnb-form-status')
    ).not.toBeInTheDocument()

    const [doneButton, cancelButton, editButton] = Array.from(
      document.querySelectorAll('button')
    )
    expect(doneButton).toHaveTextContent(nb.doneButton)
    expect(cancelButton).toHaveTextContent(nb.cancelButton)
    expect(editButton).toHaveTextContent(
      nbNO['nb-NO'].IterateViewContainer.editButton
    )
    await userEvent.click(doneButton)

    expect(document.querySelector('.dnb-form-status')).toBeInTheDocument()
    expect(onChange).toHaveBeenCalledTimes(0)

    await userEvent.click(cancelButton)
    await userEvent.click(editButton)

    expect(
      document.querySelector('.dnb-form-status')
    ).not.toBeInTheDocument()

    await userEvent.click(doneButton)

    expect(document.querySelector('.dnb-form-status')).toBeInTheDocument()

    await userEvent.type(document.querySelector('input'), 'foo')
    await userEvent.click(doneButton)

    expect(
      document.querySelector('.dnb-form-status')
    ).not.toBeInTheDocument()
  })
})
