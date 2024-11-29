import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react'
import SectionContainerContext from '../../containers/SectionContainerContext'
import { Field, Form } from '../../../..'
import userEvent from '@testing-library/user-event'
import nbNO from '../../../../constants/locales/nb-NO'

const nb = nbNO['nb-NO']

describe('EditContainer and ViewContainer', () => {
  it('should switch mode on pressing edit button', () => {
    let containerMode = null

    const ContextConsumer = () => {
      const context = React.useContext(SectionContainerContext)
      containerMode = context.containerMode

      return null
    }

    render(
      <Form.Section>
        <Form.Section.ViewContainer>
          View Content
        </Form.Section.ViewContainer>

        <Form.Section.EditContainer>
          Edit Content
        </Form.Section.EditContainer>

        <ContextConsumer />
      </Form.Section>
    )

    const blocks = document.querySelectorAll('.dnb-forms-section-block')
    expect(blocks).toHaveLength(2)
    const [viewBlock, editBlock] = Array.from(blocks)

    expect(viewBlock).toHaveClass('dnb-forms-section-view-block')
    expect(editBlock).toHaveClass('dnb-forms-section-edit-block')

    // Switch to edit mode
    fireEvent.click(viewBlock.querySelector('button'))
    expect(containerMode).toBe('edit')

    // Switch to view mode
    fireEvent.click(editBlock.querySelector('button'))
    expect(containerMode).toBe('view')

    // Switch to edit mode
    fireEvent.click(viewBlock.querySelector('button'))
    expect(containerMode).toBe('edit')
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
          <Form.Section.EditContainer>
            <Field.String
              path="/"
              label="Label"
              onBlurValidator={() => {
                return new Error('Error message')
              }}
            />
          </Form.Section.EditContainer>

          <Form.Section.ViewContainer>content</Form.Section.ViewContainer>

          <ContextConsumer />
        </Form.Section>
      </Form.Handler>
    )

    expect(containerMode).toBe('view')
    expect(
      document.querySelector('.dnb-form-status')
    ).not.toBeInTheDocument()

    const input = document.querySelector('input')
    await userEvent.type(input, 'x{Backspace}')

    const form = document.querySelector('form')
    fireEvent.submit(form)

    expect(document.querySelector('.dnb-form-status')).toBeInTheDocument()
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
          <Form.Section.EditContainer>
            <Field.String path="/foo" required />
          </Form.Section.EditContainer>

          <Form.Section.ViewContainer>content</Form.Section.ViewContainer>

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

  it('should open in view mode when there are no errors', async () => {
    let containerMode = null

    const ContextConsumer = () => {
      const context = React.useContext(SectionContainerContext)
      containerMode = context.containerMode

      return null
    }

    render(
      <Form.Section containerMode="auto">
        <Form.Section.EditContainer>
          <Field.String path="/foo" />
        </Form.Section.EditContainer>

        <Form.Section.ViewContainer>content</Form.Section.ViewContainer>

        <ContextConsumer />
      </Form.Section>
    )

    expect(containerMode).toBe('view')
  })

  describe('validateInitially', () => {
    it('fields open in edit mode and show errors when there are errors', async () => {
      let containerMode = null

      const ContextConsumer = () => {
        const context = React.useContext(SectionContainerContext)
        containerMode = context.containerMode

        return null
      }

      render(
        <Form.Section validateInitially>
          <Form.Section.EditContainer>
            <Field.String path="/foo" required />
          </Form.Section.EditContainer>

          <Form.Section.ViewContainer>content</Form.Section.ViewContainer>

          <ContextConsumer />
        </Form.Section>
      )

      expect(containerMode).toBe('edit')
      expect(
        document.querySelector('.dnb-form-status')
      ).toBeInTheDocument()
      expect(document.querySelector('.dnb-form-status')).toHaveTextContent(
        nb.Field.errorRequired
      )

      const input = document.querySelector('input')
      expect(input).toHaveValue('')

      await userEvent.type(input, 'something')

      expect(
        document.querySelector('.dnb-form-status')
      ).not.toBeInTheDocument()

      const [doneButton] = Array.from(document.querySelectorAll('button'))
      await userEvent.click(doneButton)

      expect(containerMode).toBe('view')
    })

    it('fields with validateInitially=false should not validate initially', async () => {
      render(
        <Form.Section validateInitially>
          <Form.Section.EditContainer>
            <Field.String required />
            <Field.String required validateInitially={false} />
          </Form.Section.EditContainer>
        </Form.Section>
      )

      expect(document.querySelectorAll('.dnb-form-status')).toHaveLength(1)
      const [, second] = Array.from(document.querySelectorAll('input'))
      expect(second).toHaveValue('')

      await userEvent.type(second, 'x{Backspace}')
      fireEvent.blur(second)

      expect(document.querySelectorAll('.dnb-form-status')).toHaveLength(2)
    })

    it('when done button is pressed, the section should show all errors', async () => {
      render(
        <Form.Section validateInitially>
          <Form.Section.ViewContainer>
            View Content
          </Form.Section.ViewContainer>

          <Form.Section.EditContainer>
            <Field.String required validateInitially={false} />
          </Form.Section.EditContainer>
        </Form.Section>
      )

      const blocks = document.querySelectorAll('.dnb-forms-section-block')
      const [viewBlock, editBlock] = Array.from(blocks)
      const [doneButton] = Array.from(editBlock.querySelectorAll('button'))

      await waitFor(() => {
        // Wait for the animation to finish
        expect(viewBlock).toHaveClass('dnb-height-animation--hidden')
      })

      expect(document.querySelectorAll('.dnb-form-status')).toHaveLength(0)

      await userEvent.click(doneButton)

      expect(document.querySelectorAll('.dnb-form-status')).toHaveLength(1)

      await userEvent.click(doneButton)

      expect(document.querySelectorAll('.dnb-form-status')).toHaveLength(2)
      expect(
        document.querySelectorAll('.dnb-form-status')[1]
      ).toHaveTextContent(nb.SectionEditContainer.errorInSection)
    })

    it('the cancel button should not cancel the edit mode', async () => {
      let containerMode = null

      const ContextConsumer = () => {
        const context = React.useContext(SectionContainerContext)
        containerMode = context.containerMode

        return null
      }

      render(
        <Form.Section validateInitially required>
          <Form.Section.EditContainer>
            <Field.String path="/foo" />
            <Field.String path="/bar" />
          </Form.Section.EditContainer>

          <Form.Section.ViewContainer>content</Form.Section.ViewContainer>

          <ContextConsumer />
        </Form.Section>
      )

      expect(containerMode).toBe('edit')
      expect(document.querySelectorAll('.dnb-form-status')).toHaveLength(2)

      const [doneButton, cancelButton] = Array.from(
        document.querySelectorAll('button')
      )
      await userEvent.click(doneButton)

      expect(document.querySelectorAll('.dnb-form-status')).toHaveLength(3)

      await userEvent.click(cancelButton)

      expect(document.querySelectorAll('.dnb-form-status')).toHaveLength(3)

      expect(containerMode).toBe('edit')
    })
  })

  describe('focus management', () => {
    it('should set focus on __element when containerMode changes', async () => {
      let containerMode = null

      const ContextConsumer = () => {
        const context = React.useContext(SectionContainerContext)
        containerMode = context.containerMode

        return null
      }

      render(
        <Form.Section>
          <Form.Section.ViewContainer>
            View Content
          </Form.Section.ViewContainer>

          <Form.Section.EditContainer>
            Edit Content
          </Form.Section.EditContainer>

          <ContextConsumer />
        </Form.Section>
      )

      const blocks = document.querySelectorAll('.dnb-forms-section-block')
      expect(blocks).toHaveLength(2)
      const [viewBlock, editBlock] = Array.from(blocks)
      const [editButton] = Array.from(viewBlock.querySelectorAll('button'))
      const [cancelButton] = Array.from(
        editBlock.querySelectorAll('button')
      )

      expect(viewBlock).toHaveClass('dnb-forms-section-view-block')
      expect(editBlock).toHaveClass('dnb-forms-section-edit-block')

      expect(document.body).toHaveFocus()

      // Switch to edit mode
      fireEvent.click(editButton)
      expect(containerMode).toBe('edit')

      await waitFor(() => {
        expect(
          editBlock.querySelector('.dnb-forms-section-block__inner')
        ).toHaveFocus()
        expect(document.activeElement.parentElement).toBe(editBlock)
      })

      // Reset focus, so we can test focus during close
      ;(document.activeElement as HTMLElement).blur()

      // Switch to view mode
      fireEvent.click(cancelButton)
      expect(containerMode).toBe('view')

      await waitFor(() => {
        expect(
          viewBlock.querySelector('.dnb-forms-section-block__inner')
        ).toHaveFocus()
        expect(document.activeElement.parentElement).toBe(viewBlock)
      })

      // Reset focus, so we can test focus during close
      ;(document.activeElement as HTMLElement).blur()

      // Switch to edit mode
      fireEvent.click(editButton)
      expect(containerMode).toBe('edit')

      await waitFor(() => {
        expect(
          editBlock.querySelector('.dnb-forms-section-block__inner')
        ).toHaveFocus()
        expect(document.activeElement.parentElement).toBe(editBlock)
      })
    })

    it('should not set focus on initially opened section', async () => {
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

      expect(document.body).toHaveFocus()
    })

    it('should set focus after the section is opened', async () => {
      let containerMode = null

      const ContextConsumer = () => {
        const context = React.useContext(SectionContainerContext)
        containerMode = context.containerMode

        return null
      }

      render(
        <Form.Handler>
          <Form.Section>
            <Form.Section.ViewContainer>
              View Content
            </Form.Section.ViewContainer>

            <Form.Section.EditContainer>
              <Field.String path="/foo" required />
            </Form.Section.EditContainer>

            <ContextConsumer />
          </Form.Section>
        </Form.Handler>
      )

      expect(document.body).toHaveFocus()
      expect(containerMode).toBe('edit')

      const blocks = document.querySelectorAll('.dnb-forms-section-block')
      const [viewBlock, editBlock] = Array.from(blocks)
      const [editButton] = Array.from(viewBlock.querySelectorAll('button'))
      const [cancelButton] = Array.from(
        editBlock.querySelectorAll('button')
      )

      await waitFor(() => {
        // Wait for the animation to finish
        expect(viewBlock).toHaveClass('dnb-height-animation--hidden')
      })

      expect(document.body).toHaveFocus()

      const input = document.querySelector('input')
      await userEvent.type(input, 'foo')

      fireEvent.click(cancelButton)

      expect(containerMode).toBe('view')
      await waitFor(() => {
        expect(
          viewBlock.querySelector('.dnb-forms-section-block__inner')
        ).toHaveFocus()
        expect(document.activeElement.parentElement).toBe(viewBlock)
      })

      fireEvent.click(editButton)

      expect(containerMode).toBe('edit')
      await waitFor(() => {
        expect(
          editBlock.querySelector('.dnb-forms-section-block__inner')
        ).toHaveFocus()
        expect(document.activeElement.parentElement).toBe(editBlock)
      })

      fireEvent.click(cancelButton)

      expect(containerMode).toBe('view')
      await waitFor(() => {
        expect(
          viewBlock.querySelector('.dnb-forms-section-block__inner')
        ).toHaveFocus()
        expect(document.activeElement.parentElement).toBe(viewBlock)
      })

      fireEvent.click(editButton)

      expect(containerMode).toBe('edit')
      await waitFor(() => {
        expect(
          editBlock.querySelector('.dnb-forms-section-block__inner')
        ).toHaveFocus()
        expect(document.activeElement.parentElement).toBe(editBlock)
      })
    })
  })

  it('should reset entered data on Cancel press when path is set', async () => {
    let containerMode = null

    const ContextConsumer = () => {
      const context = React.useContext(SectionContainerContext)
      containerMode = context.containerMode

      return null
    }

    render(
      <Form.Handler
        data={{
          section: {
            foo: 'bar',
          },
        }}
      >
        <Form.Section containerMode="edit" path="/section">
          <Form.Section.EditContainer>
            <Field.String path="/foo" required />
          </Form.Section.EditContainer>

          <Form.Section.ViewContainer>content</Form.Section.ViewContainer>

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

  it('should set correct class for variant "basic"', () => {
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

  it('should set correct class for variant "filled"', () => {
    render(
      <Form.Section>
        <Form.Section.ViewContainer variant="filled">
          View Content
        </Form.Section.ViewContainer>

        <Form.Section.EditContainer variant="filled">
          Edit Content
        </Form.Section.EditContainer>
      </Form.Section>
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

  it('should validate on done button click', async () => {
    render(
      <Form.Section>
        <Form.Section.EditContainer>
          <Field.Name required path="/name" />
        </Form.Section.EditContainer>

        <Form.Section.ViewContainer>content</Form.Section.ViewContainer>
      </Form.Section>
    )

    expect(
      document.querySelector('.dnb-form-status')
    ).not.toBeInTheDocument()

    const [doneButton, cancelButton, editButton] = Array.from(
      document.querySelectorAll('button')
    )
    expect(doneButton).toHaveTextContent(
      nb.SectionEditContainer.doneButton
    )
    expect(cancelButton).toHaveTextContent(
      nb.SectionEditContainer.cancelButton
    )
    expect(editButton).toHaveTextContent(
      nbNO['nb-NO'].SectionViewContainer.editButton
    )
    await userEvent.click(doneButton)

    expect(document.querySelector('.dnb-form-status')).toBeInTheDocument()
    expect(document.querySelectorAll('.dnb-form-status')).toHaveLength(1)

    await userEvent.click(cancelButton)

    expect(document.querySelectorAll('.dnb-form-status')).toHaveLength(2)

    await userEvent.type(document.querySelector('input'), 'foo')

    await waitFor(() => {
      expect(
        document.querySelector('.dnb-form-status')
      ).not.toBeInTheDocument()
    })

    await userEvent.click(doneButton)

    expect(
      document.querySelector('.dnb-form-status')
    ).not.toBeInTheDocument()
  })

  it('should emit "onDone" event when done button is clicked', async () => {
    const onDone = jest.fn()

    render(
      <Form.Section>
        <Form.Section.EditContainer onDone={onDone}>
          <Field.Name required path="/name" />
        </Form.Section.EditContainer>

        <Form.Section.ViewContainer>content</Form.Section.ViewContainer>
      </Form.Section>
    )

    const [doneButton] = Array.from(document.querySelectorAll('button'))
    await userEvent.click(doneButton)
    expect(onDone).toHaveBeenCalledTimes(0)

    await userEvent.type(document.querySelector('input'), 'foo')

    await userEvent.click(doneButton)
    expect(onDone).toHaveBeenCalledTimes(1)
  })

  it('should emit "onCancel" event when cancel button is clicked', async () => {
    const onCancel = jest.fn()

    render(
      <Form.Section>
        <Form.Section.EditContainer onCancel={onCancel}>
          <Field.Name required path="/name" />
        </Form.Section.EditContainer>

        <Form.Section.ViewContainer>content</Form.Section.ViewContainer>
      </Form.Section>
    )

    const [, cancelButton] = Array.from(
      document.querySelectorAll('button')
    )
    await userEvent.click(cancelButton)
    expect(onCancel).toHaveBeenCalledTimes(0)

    await userEvent.type(document.querySelector('input'), 'foo')

    await userEvent.click(cancelButton)
    expect(onCancel).toHaveBeenCalledTimes(1)
  })

  it('should emit "onEdit" event when cancel button is clicked', async () => {
    const onEdit = jest.fn()

    render(
      <Form.Section>
        <Form.Section.EditContainer>
          <Field.Name required path="/name" />
        </Form.Section.EditContainer>

        <Form.Section.ViewContainer onEdit={onEdit}>
          content
        </Form.Section.ViewContainer>
      </Form.Section>
    )

    const [, , editButton] = Array.from(
      document.querySelectorAll('button')
    )

    await userEvent.click(editButton)
    expect(onEdit).toHaveBeenCalledTimes(1)
  })
})
