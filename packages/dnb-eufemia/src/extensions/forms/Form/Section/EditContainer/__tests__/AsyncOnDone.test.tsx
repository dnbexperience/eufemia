import { render, waitFor } from '@testing-library/react'
import { Field, Form, Value } from '../../../..'
import userEvent from '@testing-library/user-event'

describe('EditContainer async onDone', () => {
  it('should not commit values that were changed after an async onDone started', async () => {
    const formId = 'async-done-no-stale-commit'
    let resolveOnDone!: () => void
    const saved: string[] = []

    const onDone = () => {
      const { getValue } = Form.getData(formId)
      saved.push(String(getValue('/name')))

      return new Promise<void>((resolve) => {
        resolveOnDone = resolve
      })
    }

    render(
      <Form.Handler id={formId} defaultData={{ name: 'Ada' }}>
        <Form.Section containerMode="edit">
          <Form.Section.EditContainer onDone={onDone}>
            <Field.String path="/name" disabled={false} />
          </Form.Section.EditContainer>

          <Form.Section.ViewContainer>
            <Value.String path="/name" />
          </Form.Section.ViewContainer>
        </Form.Section>
      </Form.Handler>
    )

    const input = document.querySelector('input')
    expect(input).toHaveValue('Ada')

    await userEvent.click(
      document.querySelector('.dnb-forms-section-edit-block button')
    )
    expect(saved).toEqual(['Ada'])

    // The field is disabled while the save is pending, so typing cannot
    // change a value the pending save will not include.
    expect(input).toBeDisabled()
    await userEvent.type(input, 'Grace')
    expect(input).toHaveValue('Ada')

    resolveOnDone()

    await waitFor(() => {
      expect(
        document.querySelector('.dnb-forms-section-view-block')
      ).not.toHaveAttribute('aria-hidden', 'true')
    })

    // What the view shows is what the save actually received
    expect(saved).toEqual(['Ada'])
    expect(
      document.querySelector('.dnb-forms-section-view-block')
    ).toHaveTextContent('Ada')
    expect(input).not.toBeDisabled()
  })

  it('should enable the fields again when an async onDone rejects', async () => {
    let rejectOnDone!: (reason?: unknown) => void
    const onDone = vi.fn(
      () =>
        new Promise<void>((_resolve, reject) => {
          rejectOnDone = reject
        })
    )

    render(
      <Form.Section containerMode="edit">
        <Form.Section.EditContainer onDone={onDone}>
          <Field.String path="/name" />
        </Form.Section.EditContainer>

        <Form.Section.ViewContainer>content</Form.Section.ViewContainer>
      </Form.Section>
    )

    const input = document.querySelector('input')
    await userEvent.click(
      document.querySelector('.dnb-forms-section-edit-block button')
    )
    expect(input).toBeDisabled()

    rejectOnDone(new Error('Save failed'))

    await waitFor(() => {
      expect(input).not.toBeDisabled()
    })

    // The user can correct the value and try again
    await userEvent.type(input, 'Grace')
    expect(input).toHaveValue('Grace')
  })

  it('should force nested fields disabled until an async onDone rejects', async () => {
    let rejectOnDone!: (reason?: unknown) => void
    const onDone = vi.fn(
      () =>
        new Promise<void>((_resolve, reject) => {
          rejectOnDone = reject
        })
    )

    render(
      <Form.Section containerMode="edit">
        <Form.Section.EditContainer onDone={onDone}>
          <Field.Provider disabled={false}>
            <Field.String path="/name" disabled={false} />
          </Field.Provider>
        </Form.Section.EditContainer>

        <Form.Section.ViewContainer>content</Form.Section.ViewContainer>
      </Form.Section>
    )

    const input = document.querySelector('input')
    await userEvent.click(
      document.querySelector('.dnb-forms-section-edit-block button')
    )
    expect(input).toBeDisabled()

    await userEvent.type(input, 'Grace')
    expect(input).toHaveValue('')

    rejectOnDone(new Error('Save failed'))

    await waitFor(() => {
      expect(input).not.toBeDisabled()
    })

    await userEvent.type(input, 'Grace')
    expect(input).toHaveValue('Grace')
  })

  it('should not disable the fields when onDone is synchronous', async () => {
    const onDone = vi.fn()

    render(
      <Form.Section containerMode="edit">
        <Form.Section.EditContainer onDone={onDone}>
          <Field.String path="/name" />
        </Form.Section.EditContainer>

        <Form.Section.ViewContainer>content</Form.Section.ViewContainer>
      </Form.Section>
    )

    const input = document.querySelector('input')
    expect(input).not.toBeDisabled()

    await userEvent.click(
      document.querySelector('.dnb-forms-section-edit-block button')
    )

    expect(onDone).toHaveBeenCalledTimes(1)
    expect(input).not.toBeDisabled()
  })

  it('should keep inheriting a form level disabled state', async () => {
    render(
      <Form.Handler disabled>
        <Form.Section containerMode="edit">
          <Form.Section.EditContainer onDone={vi.fn()}>
            <Field.String path="/name" />
          </Form.Section.EditContainer>

          <Form.Section.ViewContainer>content</Form.Section.ViewContainer>
        </Form.Section>
      </Form.Handler>
    )

    expect(document.querySelector('input')).toBeDisabled()
  })

  it('should disable the toolbar buttons while an async onDone is pending', async () => {
    let resolveOnDone!: () => void

    const onDone = () =>
      new Promise<void>((resolve) => {
        resolveOnDone = resolve
      })

    render(
      <Form.Section containerMode="edit">
        <Form.Section.EditContainer onDone={onDone}>
          <Field.String path="/name" />
        </Form.Section.EditContainer>

        <Form.Section.ViewContainer>content</Form.Section.ViewContainer>
      </Form.Section>
    )

    // The EditContainer renders its Done button before the Cancel button
    const buttons = document.querySelectorAll(
      '.dnb-forms-section-edit-block button'
    )
    expect(buttons).toHaveLength(2)

    const [doneButton, cancelButton] = Array.from(buttons)
    expect(doneButton).not.toBeDisabled()
    expect(cancelButton).not.toBeDisabled()

    await userEvent.click(doneButton)

    // Cancel restores the original data and leaves edit mode, which would
    // discard the values a pending save is still writing. Both buttons
    // stay disabled until the Promise settles.
    expect(doneButton).toBeDisabled()
    expect(cancelButton).toBeDisabled()

    resolveOnDone()

    await waitFor(() => {
      expect(
        document.querySelector('.dnb-forms-section-view-block')
      ).not.toHaveAttribute('aria-hidden', 'true')
    })
  })
})
