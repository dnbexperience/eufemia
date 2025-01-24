import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Flex } from '../../../../../components'
import IterateItemContext from '../../IterateItemContext'
import { Field, Form, Iterate, Value } from '../../..'
import nbNO from '../../../constants/locales/nb-NO'

const tr = {
  viewContainer: nbNO['nb-NO'].IterateViewContainer,
  editContainer: nbNO['nb-NO'].IterateEditContainer,
}

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

  it('should switch mode from view to edit when a field errors', async () => {
    let containerMode = null

    const ContextConsumer = () => {
      const context = React.useContext(IterateItemContext)
      containerMode = context.containerMode

      return null
    }

    render(
      <Form.Handler>
        <Iterate.Array value={['0']}>
          <Iterate.EditContainer>
            <Field.String
              itemPath="/"
              onChangeValidator={(value) => {
                if (value === '01') {
                  return new Error('error')
                }
              }}
            />
          </Iterate.EditContainer>
          <Iterate.ViewContainer>content</Iterate.ViewContainer>
          <ContextConsumer />
        </Iterate.Array>
      </Form.Handler>
    )

    expect(containerMode).toBe('view')

    const input = document.querySelector('input')
    await userEvent.type(input, '1')

    expect(containerMode).toBe('edit')
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
        <Iterate.Array value={['0']}>
          <Iterate.EditContainer>
            <Field.String
              itemPath="/"
              onBlurValidator={(value) => {
                if (value === '01') {
                  return new Error('error')
                }
              }}
            />
          </Iterate.EditContainer>
          <Iterate.ViewContainer>content</Iterate.ViewContainer>
          <ContextConsumer />
        </Iterate.Array>
        <Form.SubmitButton />
      </Form.Handler>
    )

    expect(containerMode).toBe('view')

    const input = document.querySelector('input')
    await userEvent.type(input, '1')

    expect(containerMode).toBe('view')

    const button = document.querySelector('button')
    await userEvent.click(button)

    expect(containerMode).toBe('edit')
  })

  it('should not show error if every field is required via Form.Handler required', async () => {
    let containerMode = null

    const ContextConsumer = () => {
      const context = React.useContext(IterateItemContext)
      containerMode = context.containerMode

      return null
    }

    render(
      <Form.Handler required defaultData={{ myList: ['foo'] }}>
        <Iterate.Array path="/myList">
          <Iterate.ViewContainer>ViewContainer</Iterate.ViewContainer>
          <Iterate.EditContainer>EditContainer</Iterate.EditContainer>
          <ContextConsumer />
        </Iterate.Array>
      </Form.Handler>
    )

    const [editButton, removeButton, doneButton, cancelButton] =
      Array.from(document.querySelectorAll('button'))

    expect(containerMode).toBe('view')
    expect(
      document.querySelector('.dnb-form-status')
    ).not.toBeInTheDocument()

    expect(editButton).toHaveTextContent(tr.viewContainer.editButton)
    expect(removeButton).toHaveTextContent(tr.viewContainer.removeButton)
    expect(doneButton).toHaveTextContent(tr.editContainer.doneButton)
    expect(cancelButton).toHaveTextContent(tr.editContainer.cancelButton)

    await userEvent.click(editButton)
    expect(containerMode).toBe('edit')
    expect(
      document.querySelector('.dnb-form-status')
    ).not.toBeInTheDocument()

    await userEvent.click(doneButton)
    expect(containerMode).toBe('view')
    expect(
      document.querySelector('.dnb-form-status')
    ).not.toBeInTheDocument()
  })

  describe('focus management', () => {
    it('should not set focus when container opens initially in edit mode', async () => {
      let containerMode = null

      const ContextConsumer = () => {
        const context = React.useContext(IterateItemContext)
        containerMode = context.containerMode

        return null
      }

      render(
        <Iterate.Array value={['foo']} containerMode="edit">
          <Iterate.ViewContainer>View Content</Iterate.ViewContainer>
          <Iterate.EditContainer>
            <Field.String path="/foo" required />
          </Iterate.EditContainer>
          <ContextConsumer />
        </Iterate.Array>
      )

      expect(document.body).toHaveFocus()
      expect(containerMode).toBe('edit')

      const elements = document.querySelectorAll(
        '.dnb-forms-iterate__element'
      )
      const firstElement = elements[0]
      const [viewBlock] = Array.from(
        firstElement.querySelectorAll('.dnb-forms-section-block')
      )

      await waitFor(() => {
        expect(viewBlock).toHaveClass('dnb-height-animation--hidden')
      })

      expect(document.body).toHaveFocus()
      expect(containerMode).toBe('edit')
    })

    it('should only set focus on newly added element when containerMode changes', async () => {
      const containerMode = []

      const ContextConsumer = () => {
        const context = React.useContext(IterateItemContext)
        containerMode.push(context.containerMode)

        return null
      }

      render(
        <Form.Handler>
          <Iterate.Array path="/items">
            <Iterate.ViewContainer>
              <Value.String path="/foo" />
            </Iterate.ViewContainer>
            <Iterate.EditContainer>
              <Field.String path="/foo" />
            </Iterate.EditContainer>
            <ContextConsumer />
          </Iterate.Array>
          <Iterate.PushButton path="/items" pushValue="value" />
        </Form.Handler>
      )

      expect(document.body).toHaveFocus()
      expect(containerMode).toEqual([])

      const button = document.querySelector('button')
      await userEvent.click(button)

      expect(containerMode).toEqual(['edit', 'edit', 'edit'])

      {
        const elements = document.querySelectorAll(
          '.dnb-forms-iterate__element'
        )
        expect(elements).toHaveLength(1)

        const firstElement = elements[0]
        const [, editBlock] = Array.from(
          firstElement.querySelectorAll('.dnb-forms-section-block')
        )

        expect(
          document.querySelector('.dnb-forms-iterate-push-button')
        ).toHaveFocus()
        await waitFor(() => {
          expect(editBlock).toHaveStyle('height: auto;')
        })
        expect(firstElement).toHaveFocus()
      }

      await userEvent.click(button)

      {
        expect(containerMode).toEqual([
          'edit',
          'edit',
          'edit',
          'edit',
          'edit',
          'edit',
        ])

        const elements = document.querySelectorAll(
          '.dnb-forms-iterate__element'
        )
        expect(elements).toHaveLength(2)

        const firstElement = elements[0]
        const secondElement = elements[1]
        const [, editBlock] = Array.from(
          secondElement.querySelectorAll('.dnb-forms-section-block')
        )

        expect(
          document.querySelector('.dnb-forms-iterate-push-button')
        ).toHaveFocus()
        await waitFor(() => {
          expect(editBlock).toHaveStyle('height: auto;')
        })
        expect(
          firstElement.querySelector('.dnb-forms-section-block')
        ).toHaveStyle('height: 0;')
        expect(secondElement).toHaveFocus()
        expect(containerMode).toEqual([
          'edit',
          'edit',
          'edit',
          'edit',
          'edit',
          'edit',
          'view',
          'edit',
        ])
      }
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
      const [cancelButton] = Array.from(
        editBlock.querySelectorAll('button')
      )

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
        <Iterate.Array value={['foo', 'bar', 'baz']}>
          <Iterate.ViewContainer>View Content</Iterate.ViewContainer>
          <Iterate.EditContainer>Edit Content</Iterate.EditContainer>
        </Iterate.Array>
      )

      const elements = document.querySelectorAll(
        '.dnb-forms-iterate__element'
      )
      expect(elements).toHaveLength(3)

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
      await userEvent.click(removeButton)
      expect(removeButton).toHaveTextContent(tr.editContainer.removeButton)

      await waitFor(() => {
        const elements = document.querySelectorAll(
          '.dnb-forms-iterate__element'
        )
        expect(elements).toHaveLength(2)
        expect(elements[1]).toHaveFocus()
      })
    })

    it('should removed item from data context', async () => {
      const onChange = jest.fn()

      render(
        <Form.Handler onChange={onChange}>
          <Iterate.Array path="/myList" defaultValue={['foo', 'bar']}>
            <Iterate.ViewContainer>View Content</Iterate.ViewContainer>
            <Iterate.EditContainer>Edit Content</Iterate.EditContainer>
          </Iterate.Array>
        </Form.Handler>
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

      // Remove the element
      await userEvent.click(removeButton)

      expect(onChange).toHaveBeenCalledTimes(1)
      expect(onChange).toHaveBeenLastCalledWith(
        {
          myList: ['bar'],
        },
        expect.anything()
      )

      await waitFor(() => {
        const elements = document.querySelectorAll(
          '.dnb-forms-iterate__element'
        )
        expect(elements).toHaveLength(1)
      })
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
          <Iterate.EditContainer>
            <Field.String required itemPath="/" />
          </Iterate.EditContainer>
          <Iterate.ViewContainer>content</Iterate.ViewContainer>
        </Iterate.Array>
      </Form.Handler>
    )

    expect(
      document.querySelector('.dnb-form-status')
    ).not.toBeInTheDocument()

    const [doneButton, cancelButton, editButton] = Array.from(
      document.querySelectorAll('button')
    )
    expect(doneButton).toHaveTextContent(tr.editContainer.doneButton)
    expect(cancelButton).toHaveTextContent(tr.editContainer.cancelButton)
    expect(editButton).toHaveTextContent(tr.viewContainer.editButton)
    await userEvent.click(doneButton)

    expect(document.querySelector('.dnb-form-status')).toBeInTheDocument()
    expect(onChange).toHaveBeenCalledTimes(0)

    await userEvent.click(cancelButton)

    expect(
      document.querySelector('.dnb-form-status')
    ).not.toBeInTheDocument()

    await userEvent.click(editButton)

    expect(
      document.querySelector('.dnb-form-status')
    ).not.toBeInTheDocument()

    await userEvent.click(doneButton)

    expect(document.querySelector('.dnb-form-status')).toBeInTheDocument()

    await userEvent.type(document.querySelector('input'), 'foo')
    await userEvent.click(doneButton)

    await waitFor(() => {
      expect(
        document.querySelector('.dnb-form-status')
      ).not.toBeInTheDocument()
    })
  })

  it('should set all items to the given containerMode', async () => {
    let containerMode = null

    const ContextConsumer = () => {
      const context = React.useContext(IterateItemContext)
      containerMode = context.containerMode

      return null
    }

    render(
      <Iterate.Array value={['foo', 'bar']} containerMode="edit">
        <Iterate.ViewContainer>View Content</Iterate.ViewContainer>
        <Iterate.EditContainer>Edit Content</Iterate.EditContainer>
        <ContextConsumer />
      </Iterate.Array>
    )

    expect(containerMode).toBe('edit')

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
      expect(viewBlock).toHaveClass('dnb-height-animation--hidden')
      expect(editBlock).toHaveClass('dnb-forms-section-edit-block')
      expect(editBlock).not.toHaveClass('dnb-height-animation--hidden')
    }

    {
      const [viewBlock, editBlock] = Array.from(
        secondElement.querySelectorAll('.dnb-forms-section-block')
      )
      expect(viewBlock).toHaveClass('dnb-forms-section-view-block')
      expect(viewBlock).toHaveClass('dnb-height-animation--hidden')
      expect(editBlock).toHaveClass('dnb-forms-section-edit-block')
      expect(editBlock).not.toHaveClass('dnb-height-animation--hidden')
    }

    expect(containerMode).toBe('edit')
  })

  it('should hide toolbar in view mode', async () => {
    render(
      <Iterate.Array value={['foo']}>
        <Iterate.ViewContainer toolbar={false}>
          View Content
        </Iterate.ViewContainer>
        <Iterate.EditContainer>Edit Content</Iterate.EditContainer>
      </Iterate.Array>
    )

    const elements = document.querySelectorAll(
      '.dnb-forms-iterate__element'
    )
    expect(elements).toHaveLength(1)

    const [firstElement] = Array.from(elements)

    {
      const [viewBlock, editBlock] = Array.from(
        firstElement.querySelectorAll('.dnb-forms-section-block')
      )
      expect(editBlock.querySelectorAll('button')).toHaveLength(2)
      expect(viewBlock.querySelectorAll('button')).toHaveLength(0)
    }
  })

  it('should render the given toolbar buttons', () => {
    const viewToolbar = (
      <Iterate.Toolbar>
        {({ items }) => {
          if (items.length === 1) {
            return <Iterate.ViewContainer.EditButton />
          }
          return (
            <>
              <Iterate.ViewContainer.EditButton />
              <Iterate.ViewContainer.RemoveButton />
            </>
          )
        }}
      </Iterate.Toolbar>
    )

    const editToolbar = (
      <Iterate.Toolbar>
        {({ items }) => {
          if (items.length === 1) {
            return null
          }
          return (
            <>
              <Iterate.EditContainer.DoneButton />
              <Iterate.EditContainer.CancelButton />
            </>
          )
        }}
      </Iterate.Toolbar>
    )

    const { rerender } = render(
      <Iterate.Array value={['foo']}>
        <Iterate.ViewContainer>
          View Content
          {viewToolbar}
        </Iterate.ViewContainer>
        <Iterate.EditContainer>
          Edit Content
          {editToolbar}
        </Iterate.EditContainer>
      </Iterate.Array>
    )

    {
      const elements = document.querySelectorAll(
        '.dnb-forms-iterate__element'
      )
      expect(elements).toHaveLength(1)

      const [firstElement] = Array.from(elements)
      const [viewBlock, editBlock] = Array.from(
        firstElement.querySelectorAll('.dnb-forms-section-block')
      )
      expect(editBlock.querySelectorAll('button')).toHaveLength(0)
      expect(viewBlock.querySelectorAll('button')).toHaveLength(1)
      expect(viewBlock.querySelectorAll('button')[0]).toHaveTextContent(
        tr.viewContainer.editButton
      )
    }

    rerender(
      <Iterate.Array value={['foo', 'bar']}>
        <Iterate.ViewContainer>
          View Content
          {viewToolbar}
        </Iterate.ViewContainer>
        <Iterate.EditContainer>
          Edit Content
          {editToolbar}
        </Iterate.EditContainer>
      </Iterate.Array>
    )

    {
      const elements = document.querySelectorAll(
        '.dnb-forms-iterate__element'
      )
      expect(elements).toHaveLength(2)

      const [firstElement] = Array.from(elements)
      const [viewBlock, editBlock] = Array.from(
        firstElement.querySelectorAll('.dnb-forms-section-block')
      )
      expect(editBlock.querySelectorAll('button')).toHaveLength(2)
      expect(viewBlock.querySelectorAll('button')).toHaveLength(2)
    }
  })

  describe('toolbarVariant', () => {
    it('should render toolbarVariant="minimumOneItem" with correct buttons', () => {
      const { rerender } = render(
        <Iterate.Array value={['foo']}>
          <Iterate.ViewContainer toolbarVariant="minimumOneItem">
            View Content
          </Iterate.ViewContainer>
          <Iterate.EditContainer toolbarVariant="minimumOneItem">
            Edit Content
          </Iterate.EditContainer>
        </Iterate.Array>
      )

      {
        const elements = document.querySelectorAll(
          '.dnb-forms-iterate__element'
        )
        expect(elements).toHaveLength(1)

        const [firstElement] = Array.from(elements)
        const [viewBlock, editBlock] = Array.from(
          firstElement.querySelectorAll('.dnb-forms-section-block')
        )
        expect(editBlock.querySelectorAll('button')).toHaveLength(0)
        expect(viewBlock.querySelectorAll('button')).toHaveLength(1)
        expect(viewBlock.querySelectorAll('button')[0]).toHaveTextContent(
          tr.viewContainer.editButton
        )
      }

      rerender(
        <Iterate.Array value={['foo', 'bar']}>
          <Iterate.ViewContainer toolbarVariant="minimumOneItem">
            View Content
          </Iterate.ViewContainer>
          <Iterate.EditContainer toolbarVariant="minimumOneItem">
            Edit Content
          </Iterate.EditContainer>
        </Iterate.Array>
      )

      {
        const elements = document.querySelectorAll(
          '.dnb-forms-iterate__element'
        )
        expect(elements).toHaveLength(2)

        const [firstElement] = Array.from(elements)
        const [viewBlock, editBlock] = Array.from(
          firstElement.querySelectorAll('.dnb-forms-section-block')
        )
        expect(editBlock.querySelectorAll('button')).toHaveLength(2)
        expect(viewBlock.querySelectorAll('button')).toHaveLength(2)
      }
    })

    it('should render toolbarVariant="custom" without a toolbar', () => {
      render(
        <Iterate.Array value={['foo']}>
          <Iterate.ViewContainer toolbarVariant="custom">
            View Content
          </Iterate.ViewContainer>
          <Iterate.EditContainer toolbarVariant="custom">
            Edit Content
          </Iterate.EditContainer>
        </Iterate.Array>
      )

      const [viewBlock, editBlock] = Array.from(
        document
          .querySelector('.dnb-forms-iterate__element')
          .querySelectorAll('.dnb-forms-section-block')
      )
      expect(editBlock.querySelectorAll('button')).toHaveLength(0)
      expect(viewBlock.querySelectorAll('button')).toHaveLength(0)
    })

    it('should render toolbarVariant="custom" should default toolbar', () => {
      render(
        <Iterate.Array value={['foo']}>
          <Iterate.ViewContainer toolbarVariant="custom">
            View Content
          </Iterate.ViewContainer>
          <Iterate.EditContainer toolbarVariant="custom">
            Edit Content
          </Iterate.EditContainer>
        </Iterate.Array>
      )

      const [viewBlock, editBlock] = Array.from(
        document
          .querySelector('.dnb-forms-iterate__element')
          .querySelectorAll('.dnb-forms-section-block')
      )
      expect(editBlock.querySelectorAll('button')).toHaveLength(0)
      expect(viewBlock.querySelectorAll('button')).toHaveLength(0)
    })

    it('should render toolbarVariant="custom" with correct spacing', () => {
      render(
        <Iterate.Array value={['foo']}>
          <Iterate.ViewContainer toolbarVariant="custom">
            View Content
            <Flex.Horizontal>
              <Iterate.Toolbar>
                <Iterate.ViewContainer.EditButton />
              </Iterate.Toolbar>
            </Flex.Horizontal>
          </Iterate.ViewContainer>
          <Iterate.EditContainer toolbarVariant="custom">
            Edit Content
            <Flex.Horizontal>
              <Iterate.Toolbar>
                <Iterate.EditContainer.DoneButton />
              </Iterate.Toolbar>
            </Flex.Horizontal>
          </Iterate.EditContainer>
        </Iterate.Array>
      )

      const [viewBlock, editBlock] = Array.from(
        document
          .querySelector('.dnb-forms-iterate__element')
          .querySelectorAll('.dnb-forms-section-block')
      )

      expect(editBlock.querySelectorAll('button')).toHaveLength(1)
      expect(viewBlock.querySelectorAll('button')).toHaveLength(1)

      const viewToolbars = viewBlock.querySelectorAll(
        '.dnb-forms-iterate-toolbar'
      )
      const editToolbars = editBlock.querySelectorAll(
        '.dnb-forms-iterate-toolbar'
      )

      expect(viewToolbars).toHaveLength(1)
      expect(editToolbars).toHaveLength(1)

      const viewToolbar = viewToolbars[0]
      expect(viewToolbar).toHaveClass('dnb-space__top--zero')
      expect(viewToolbar).toHaveClass('dnb-space__right--small')
      expect(viewToolbar).toHaveClass('dnb-space__left--zero')

      const editToolbar = editToolbars[0]
      expect(editToolbar).toHaveClass('dnb-space__top--zero')
      expect(editToolbar).toHaveClass('dnb-space__right--small')
      expect(editToolbar).toHaveClass('dnb-space__left--zero')

      const viewSpace = viewToolbars[0].querySelector('.dnb-space')
      expect(viewSpace).toHaveClass('dnb-space__top--zero')
      expect(viewSpace).toHaveClass('dnb-flex-container--row-gap-small')

      const editSpace = editToolbars[0].querySelector('.dnb-space')
      expect(editSpace).toHaveClass('dnb-space__top--zero')
      expect(editSpace).toHaveClass('dnb-flex-container--row-gap-small')
    })

    it('should render toolbarVariant="custom" without a hr', () => {
      render(
        <Iterate.Array value={['foo']}>
          <Iterate.ViewContainer toolbarVariant="custom">
            View Content
            <Flex.Horizontal>
              <Iterate.Toolbar>
                <Iterate.ViewContainer.EditButton />
              </Iterate.Toolbar>
            </Flex.Horizontal>
          </Iterate.ViewContainer>
          <Iterate.EditContainer toolbarVariant="custom">
            Edit Content
            <Flex.Horizontal>
              <Iterate.Toolbar>
                <Iterate.EditContainer.DoneButton />
              </Iterate.Toolbar>
            </Flex.Horizontal>
          </Iterate.EditContainer>
        </Iterate.Array>
      )

      const [viewBlock, editBlock] = Array.from(
        document
          .querySelector('.dnb-forms-iterate__element')
          .querySelectorAll('.dnb-forms-section-block')
      )

      expect(editBlock.querySelectorAll('button')).toHaveLength(1)
      expect(viewBlock.querySelectorAll('button')).toHaveLength(1)

      const viewToolbars = viewBlock.querySelectorAll(
        '.dnb-forms-iterate-toolbar'
      )
      const editToolbars = editBlock.querySelectorAll(
        '.dnb-forms-iterate-toolbar'
      )

      expect(viewToolbars).toHaveLength(1)
      expect(editToolbars).toHaveLength(1)

      const viewToolbar = viewToolbars[0]
      const editToolbar = editToolbars[0]

      expect(viewToolbar.querySelectorAll('hr')).toHaveLength(0)
      expect(editToolbar.querySelectorAll('hr')).toHaveLength(0)
    })
  })

  it('should validate on submit', () => {
    render(
      <Form.Handler>
        <Iterate.Array value={['']}>
          <Iterate.EditContainer>
            <Field.String required itemPath="/" />
          </Iterate.EditContainer>
          <Iterate.ViewContainer>content</Iterate.ViewContainer>
        </Iterate.Array>
      </Form.Handler>
    )

    expect(
      document.querySelector('.dnb-form-status')
    ).not.toBeInTheDocument()

    const input = document.querySelector('input')
    fireEvent.submit(input)

    expect(document.querySelector('.dnb-form-status')).toBeInTheDocument()
  })

  it('should show "errorInContainer" message', async () => {
    render(
      <Form.Handler>
        <Iterate.Array value={[null]}>
          <Iterate.EditContainer>
            <Field.String required itemPath="/" />
          </Iterate.EditContainer>
        </Iterate.Array>
      </Form.Handler>
    )

    expect(
      document.querySelector('.dnb-form-status')
    ).not.toBeInTheDocument()

    const [doneButton] = Array.from(document.querySelectorAll('button'))
    const input = document.querySelector('input')
    fireEvent.submit(input)

    expect(document.querySelectorAll('.dnb-form-status')).toHaveLength(1)

    fireEvent.submit(input)

    expect(document.querySelectorAll('.dnb-form-status')).toHaveLength(1)

    await userEvent.click(doneButton)

    expect(document.querySelectorAll('.dnb-form-status')).toHaveLength(2)

    await userEvent.type(input, 'x{Backspace}')

    await waitFor(() => {
      expect(document.querySelectorAll('.dnb-form-status')).toHaveLength(0)
    })

    await userEvent.click(doneButton)

    // Expect 2, because we already have an error in the field
    expect(document.querySelectorAll('.dnb-form-status')).toHaveLength(2)
    expect(
      document.querySelectorAll('.dnb-form-status')[1]
    ).toHaveTextContent(
      nbNO['nb-NO'].IterateEditContainer.errorInContainer
    )

    await userEvent.type(input, 'x')

    await waitFor(() => {
      expect(document.querySelectorAll('.dnb-form-status')).toHaveLength(0)
    })
  })

  it('should open in "edit" mode without focusing', async () => {
    const containerMode = {}

    const ContextConsumer = () => {
      const context = React.useContext(IterateItemContext)
      containerMode[context.index] = context.containerMode

      return null
    }

    render(
      <Form.Handler data={[{ firstName: 'Tony' }]}>
        <Iterate.Array path="/">
          <Iterate.ViewContainer>View Content</Iterate.ViewContainer>
          <Iterate.EditContainer>
            <Field.Name.First required itemPath="/firstName" />
            <Field.Name.Last required itemPath="/lastName" />
          </Iterate.EditContainer>
          <ContextConsumer />
        </Iterate.Array>
      </Form.Handler>
    )

    expect(containerMode[0]).toBe('edit')
    expect(document.body).toHaveFocus()
  })

  it('should set first item to "view" mode when a new is pushed to the array', async () => {
    const containerMode = {}

    const ContextConsumer = () => {
      const context = React.useContext(IterateItemContext)
      containerMode[context.index] = context.containerMode

      return null
    }

    render(
      <Form.Handler>
        <Iterate.Array path="/" defaultValue={[null]}>
          <Iterate.ViewContainer>View Content</Iterate.ViewContainer>
          <Iterate.EditContainer>
            <Field.String itemPath="/" required />
          </Iterate.EditContainer>
          <ContextConsumer />
        </Iterate.Array>

        <Iterate.PushButton path="/" pushValue={null} />
      </Form.Handler>
    )

    expect(containerMode[0]).toBe('edit')

    const input = document.querySelector('input')
    await userEvent.type(input, 'foo')

    await userEvent.click(
      document.querySelector('button.dnb-forms-iterate-push-button')
    )

    const blocks = Array.from(
      document.querySelectorAll('.dnb-forms-section-block')
    )
    expect(blocks).toHaveLength(4)
    const [, secondBlock] = blocks

    expect(containerMode[1]).toBe('edit')

    await userEvent.click(secondBlock.querySelector('button'))

    await waitFor(() => {
      expect(containerMode[0]).toBe('view')
      expect(containerMode[1]).toBe('edit')
    })
  })

  it('should keep first item in "edit" mode when there is an error', async () => {
    const containerMode = {}

    const ContextConsumer = () => {
      const context = React.useContext(IterateItemContext)
      containerMode[context.index] = context.containerMode

      return null
    }

    render(
      <Form.Handler data={[null]}>
        <Iterate.Array path="/">
          <Iterate.ViewContainer>View Content</Iterate.ViewContainer>
          <Iterate.EditContainer>
            <Field.String itemPath="/" required />
          </Iterate.EditContainer>
          <ContextConsumer />
        </Iterate.Array>

        <Iterate.PushButton path="/" pushValue={null} />
      </Form.Handler>
    )

    expect(containerMode[0]).toBe('edit')

    await userEvent.click(
      document.querySelector('button.dnb-forms-iterate-push-button')
    )

    const blocks = Array.from(
      document.querySelectorAll('.dnb-forms-section-block')
    )
    expect(blocks).toHaveLength(4)
    const [, secondBlock] = blocks

    expect(containerMode[0]).toBe('edit')
    expect(containerMode[1]).toBe('edit')

    await userEvent.click(secondBlock.querySelector('button'))

    expect(containerMode[0]).toBe('edit')
    expect(containerMode[1]).toBe('edit')
  })

  it('should set correct class for variant "basic"', () => {
    render(
      <Iterate.Array path="/" defaultValue={[null]}>
        <Iterate.ViewContainer variant="basic">
          View Content
        </Iterate.ViewContainer>
        <Iterate.EditContainer variant="basic">
          <Field.String itemPath="/" required />
        </Iterate.EditContainer>
      </Iterate.Array>
    )

    const [viewBlock, editBlock] = Array.from(
      document.querySelectorAll('.dnb-forms-section-block')
    )
    expect(viewBlock).toHaveClass('dnb-forms-section-block--variant-basic')
    expect(editBlock).toHaveClass('dnb-forms-section-block--variant-basic')
  })

  it('should set correct class for variant "filled"', () => {
    render(
      <Iterate.Array path="/" defaultValue={[null]}>
        <Iterate.ViewContainer variant="filled">
          View Content
        </Iterate.ViewContainer>
        <Iterate.EditContainer variant="filled">
          <Field.String itemPath="/" required />
        </Iterate.EditContainer>
      </Iterate.Array>
    )

    const [viewBlock, editBlock] = Array.from(
      document.querySelectorAll('.dnb-forms-section-block')
    )
    expect(viewBlock).toHaveClass(
      'dnb-forms-section-block--variant-filled'
    )
    expect(editBlock).toHaveClass(
      'dnb-forms-section-block--variant-filled'
    )
  })
})
