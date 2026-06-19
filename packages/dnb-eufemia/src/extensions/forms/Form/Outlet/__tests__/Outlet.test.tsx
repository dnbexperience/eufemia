import { fireEvent, render, waitFor } from '@testing-library/react'
import { Form, Field } from '../../..'
import type { ComponentMarkers } from '../../../../../shared/helpers/withComponentMarkers'

describe('Form.Outlet', () => {
  it('should have constant of _supportsSpacingProps="children"', () => {
    expect((Form.Outlet as ComponentMarkers)._supportsSpacingProps).toBe(
      'children'
    )
  })

  it('should throw if no matching Form.Handler exists for formHandlerId', () => {
    const log = vi.spyOn(console, 'error').mockImplementation(() => {})

    const renderFn = () => {
      render(
        <Form.Outlet formHandlerId="missing-handler-id">
          <Field.String path="/name" />
        </Form.Outlet>
      )
    }

    expect(renderFn).toThrow(
      'Form.Outlet needs a valid formHandlerId that points to a mounted Form.Handler'
    )

    log.mockRestore()
  })

  it('should connect nested fields to linked Form.Handler by formHandlerId', () => {
    const formId = 'linked-handler-id'

    const { rerender } = render(
      <>
        <Form.Handler id={formId} data={{ name: 'Nora' }} />
        <Form.Outlet formHandlerId={formId}>
          <Field.String path="/name" />
        </Form.Outlet>
      </>
    )

    const input = document.querySelector(
      'input.dnb-input__input'
    ) as HTMLInputElement

    expect(input.value).toBe('Nora')

    rerender(
      <>
        <Form.Handler id={formId} data={{ name: 'Ada' }} />
        <Form.Outlet formHandlerId={formId}>
          <Field.String path="/name" />
        </Form.Outlet>
      </>
    )

    expect(input.value).toBe('Ada')
  })

  it('should render a form element when used outside Form.Handler', () => {
    const formId = 'linked-handler-outside'

    const { container } = render(
      <>
        <Form.Handler id={formId} data={{ name: 'Nora' }} />
        <Form.Outlet formHandlerId={formId}>
          <Field.String path="/name" />
        </Form.Outlet>
      </>
    )

    const forms = container.querySelectorAll('form.dnb-forms-form')

    expect(forms).toHaveLength(2)
  })

  it('should not render an extra form element when used inside Form.Handler', () => {
    const formId = 'linked-handler-inside'

    const { container } = render(
      <Form.Handler id={formId} data={{ name: 'Nora' }}>
        <Form.Outlet formHandlerId={formId}>
          <Field.String path="/name" />
        </Form.Outlet>
      </Form.Handler>
    )

    const forms = container.querySelectorAll('form.dnb-forms-form')

    expect(forms).toHaveLength(1)
  })

  it('should submit when clicking submit buttons in both Form.Handler and external Form.Outlet', () => {
    const formId = 'linked-submit-handler'
    const onSubmit = vi.fn()

    const { container } = render(
      <>
        <Form.Handler
          id={formId}
          data={{ name: 'Nora' }}
          onSubmit={onSubmit}
        >
          <Form.SubmitButton>Submit from handler</Form.SubmitButton>
        </Form.Handler>

        <Form.Outlet formHandlerId={formId}>
          <Form.SubmitButton>Submit from outlet</Form.SubmitButton>
        </Form.Outlet>
      </>
    )

    const buttons = container.querySelectorAll(
      'button.dnb-forms-submit-button'
    ) as NodeListOf<HTMLButtonElement>

    expect(buttons).toHaveLength(2)

    fireEvent.click(buttons[0])
    expect(onSubmit).toHaveBeenCalledTimes(1)

    fireEvent.click(buttons[1])
    expect(onSubmit).toHaveBeenCalledTimes(2)
  })

  it('should show outlet field validation when submitting from external Form.Outlet', async () => {
    const formId = 'linked-submit-validation'
    const onSubmit = vi.fn()

    const { container } = render(
      <>
        <Form.Handler id={formId} onSubmit={onSubmit} />

        <Form.Outlet formHandlerId={formId}>
          <Field.Name.First path="/firstName" required />
          <Form.SubmitButton>Submit from outlet</Form.SubmitButton>
        </Form.Outlet>
      </>
    )

    const outletButton = container.querySelectorAll(
      'button.dnb-forms-submit-button'
    )[0] as HTMLButtonElement

    fireEvent.click(outletButton)

    expect(onSubmit).not.toHaveBeenCalled()

    await waitFor(() => {
      expect(document.querySelector('[role="alert"]')).toBeInTheDocument()
    })
  })

  it('should show required errors in outlet section when submitting from outlet submit button', async () => {
    const formId = 'linked-submit-section-validation'

    const { container } = render(
      <>
        <Form.Handler id={formId} required>
          <Field.Composition width="large">
            <Field.Name.First path="/mySection/firstName" />
            <Field.Name.Last path="/mySection/lastName" />
          </Field.Composition>
          <Form.SubmitButton>Submit from handler</Form.SubmitButton>
        </Form.Handler>

        <Form.Outlet formHandlerId={formId}>
          <Form.Section path="/mySection">
            <Field.Composition width="large">
              <Field.Name.First path="/firstName" required />
              <Field.Name.Last path="/lastName" required />
            </Field.Composition>
            <Form.SubmitButton>Submit from outlet</Form.SubmitButton>
          </Form.Section>
        </Form.Outlet>
      </>
    )

    const forms = container.querySelectorAll('form.dnb-forms-form')
    const outletForm = forms[1]
    const outletButton = outletForm.querySelector(
      'button.dnb-forms-submit-button'
    ) as HTMLButtonElement

    fireEvent.click(outletButton)

    await waitFor(() => {
      expect(
        outletForm.querySelector('[role="alert"]')
      ).toBeInTheDocument()
    })
  })

  it('should pass outlet field data to handler onSubmit', async () => {
    const formId = 'linked-submit-data-flow'
    const onSubmit = vi.fn()

    const { container } = render(
      <>
        <Form.Handler id={formId} onSubmit={onSubmit} />

        <Form.Outlet formHandlerId={formId}>
          <Field.String path="/name" value="Nora" />
          <Form.SubmitButton />
        </Form.Outlet>
      </>
    )

    const form = container.querySelectorAll('form.dnb-forms-form')[1]
    fireEvent.submit(form)

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(
        { name: 'Nora' },
        expect.anything()
      )
    })
  })

  it('should make Form.Section work inside linked context', () => {
    const formId = 'linked-section-handler'

    render(
      <>
        <Form.Handler
          id={formId}
          data={{ profile: { firstName: 'Kai' } }}
        />
        <Form.Outlet formHandlerId={formId}>
          <Form.Section path="/profile">
            <Field.String path="/firstName" />
          </Form.Section>
        </Form.Outlet>
      </>
    )

    const input = document.querySelector(
      'input.dnb-input__input'
    ) as HTMLInputElement

    expect(input.value).toBe('Kai')
  })
})
