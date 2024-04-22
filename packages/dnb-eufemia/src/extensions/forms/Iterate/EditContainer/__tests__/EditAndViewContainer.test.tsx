import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import IterateElementContext from '../../IterateElementContext'
import EditContainer from '../EditContainer'
import ViewContainer from '../../ViewContainer'
import { Field, Form, Iterate } from '../../..'
import userEvent from '@testing-library/user-event'
import nbNO from '../../../constants/locales/nb-NO'

const nb = nbNO['nb-NO'].Iterate

describe('EditContainer and ViewContainer', () => {
  it('should switch mode on pressing edit button', async () => {
    render(
      <Iterate.Array value={['foo', 'bar']}>
        <Iterate.ViewContainer>View Content</Iterate.ViewContainer>
        <Iterate.EditContainer>Edit Content</Iterate.EditContainer>
      </Iterate.Array>
    )

    const elements = document.querySelectorAll(
      '.dnb-form-iterate__element'
    )
    expect(elements).toHaveLength(2)

    const [firstElement, secondElement] = Array.from(elements)

    {
      const [viewBlock, editBlock] = Array.from(
        firstElement.querySelectorAll('.dnb-form-iterate-block')
      )
      expect(viewBlock).toHaveClass('dnb-form-iterate-view-block')
      expect(editBlock).toHaveClass('dnb-form-iterate-edit-block')

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
        secondElement.querySelectorAll('.dnb-form-iterate-block')
      )
      expect(viewBlock).toHaveClass('dnb-form-iterate-view-block')
      expect(editBlock).toHaveClass('dnb-form-iterate-edit-block')

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
      const context = React.useContext(IterateElementContext)
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
      '.dnb-form-iterate__element'
    )
    expect(elements).toHaveLength(2)

    const firstElement = elements[0]
    const [viewBlock, editBlock] = Array.from(
      firstElement.querySelectorAll('.dnb-form-iterate-block')
    )
    const [editButton] = Array.from(viewBlock.querySelectorAll('button'))
    const [cancelButton] = Array.from(editBlock.querySelectorAll('button'))

    expect(viewBlock).toHaveClass('dnb-form-iterate-view-block')
    expect(editBlock).toHaveClass('dnb-form-iterate-edit-block')

    expect(document.body).toHaveFocus()

    // Switch to edit mode
    fireEvent.click(editButton)
    expect(firstElement).toHaveTextContent('Edit Content')

    expect(firstElement).toHaveFocus()

    // Reset focus, so we can test focus during close
    ;(document.activeElement as HTMLElement).blur()

    // Switch to view mode
    fireEvent.click(cancelButton)
    expect(firstElement).toHaveTextContent('View Content')

    expect(firstElement).toHaveFocus()

    // Reset focus, so we can test focus during close
    ;(document.activeElement as HTMLElement).blur()

    // Switch to edit mode
    fireEvent.click(editButton)
    expect(firstElement).toHaveTextContent('Edit Content')

    expect(firstElement).toHaveFocus()
  })

  it('should set focus on other item __element when containerMode gets removed', async () => {
    render(
      <Iterate.Array value={['foo', 'bar']}>
        <Iterate.ViewContainer>View Content</Iterate.ViewContainer>
        <Iterate.EditContainer>Edit Content</Iterate.EditContainer>
      </Iterate.Array>
    )

    const elements = document.querySelectorAll(
      '.dnb-form-iterate__element'
    )
    expect(elements).toHaveLength(2)

    const firstElement = elements[0]
    const [viewBlock, editBlock] = Array.from(
      firstElement.querySelectorAll('.dnb-form-iterate-block')
    )
    const [, removeButton] = Array.from(
      viewBlock.querySelectorAll('button')
    )

    expect(viewBlock).toHaveClass('dnb-form-iterate-view-block')
    expect(editBlock).toHaveClass('dnb-form-iterate-edit-block')

    expect(document.body).toHaveFocus()

    // Remove the element
    fireEvent.click(removeButton)
    expect(removeButton).toHaveTextContent(nb.remove)

    await waitFor(() => {
      const elements = document.querySelectorAll(
        '.dnb-form-iterate__element'
      )
      expect(elements).toHaveLength(1)
      expect(elements[0]).toHaveFocus()
    })
  })
})
