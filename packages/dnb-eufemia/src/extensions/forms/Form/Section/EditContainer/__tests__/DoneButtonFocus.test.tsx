import { render, waitFor } from '@testing-library/react'
import { Field, Form } from '../../../..'
import userEvent from '@testing-library/user-event'

describe('EditContainer done button focus', () => {
  const renderSection = (
    onDone: () => void | Promise<unknown>,
    asyncSubmitTimeout?: number
  ) =>
    render(
      <Form.Handler asyncSubmitTimeout={asyncSubmitTimeout}>
        {/* Focus target outside the section, so it stays focusable while
        the section is pending */}
        <button type="button" data-testid="outside">
          outside
        </button>

        <Form.Section containerMode="edit">
          <Form.Section.EditContainer onDone={onDone}>
            <Field.String path="/name" />
          </Form.Section.EditContainer>

          <Form.Section.ViewContainer>content</Form.Section.ViewContainer>
        </Form.Section>
      </Form.Handler>
    )

  const getDoneButton = () =>
    document.querySelector('.dnb-forms-section-edit-block button')

  const getOutsideButton = () =>
    document.querySelector('[data-testid="outside"]') as HTMLButtonElement

  it('should keep focus on the done button while async onDone is pending and when it rejects', async () => {
    let rejectOnDone!: (reason?: unknown) => void
    const onDone = vi.fn(
      () =>
        new Promise<void>((_resolve, reject) => {
          rejectOnDone = reject
        })
    )

    renderSection(onDone)

    const doneButton = getDoneButton()
    await userEvent.click(doneButton)

    // Browsers move focus to the document body when the focused element
    // becomes disabled, so the pending done button must not be disabled
    expect(doneButton).not.toBeDisabled()
    expect(doneButton).toHaveAttribute('aria-disabled', 'true')
    expect(doneButton).toHaveFocus()

    rejectOnDone(new Error('Save failed'))

    await waitFor(() => {
      expect(doneButton).not.toHaveAttribute('aria-disabled')
    })
    expect(doneButton).toHaveFocus()
  })

  it('should not move focus when the user moved it elsewhere while async onDone was pending', async () => {
    let rejectOnDone!: (reason?: unknown) => void
    const onDone = vi.fn(
      () =>
        new Promise<void>((_resolve, reject) => {
          rejectOnDone = reject
        })
    )

    renderSection(onDone)

    const doneButton = getDoneButton()
    await userEvent.click(doneButton)

    getOutsideButton().focus()
    expect(getOutsideButton()).toHaveFocus()

    rejectOnDone(new Error('Save failed'))

    await waitFor(() => {
      expect(doneButton).not.toHaveAttribute('aria-disabled')
    })
    expect(getOutsideButton()).toHaveFocus()
  })

  it('should keep focus on the done button after asyncSubmitTimeout', async () => {
    const onDone = vi.fn(() => new Promise<void>(() => undefined))

    renderSection(onDone, 100)

    const doneButton = getDoneButton()
    await userEvent.click(doneButton)
    expect(doneButton).not.toBeDisabled()
    expect(doneButton).toHaveAttribute('aria-disabled', 'true')
    expect(doneButton).toHaveFocus()

    await waitFor(() => {
      expect(doneButton).not.toHaveAttribute('aria-disabled')
    })
    expect(doneButton).toHaveFocus()
  })
})
