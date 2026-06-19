import { fireEvent, render, waitFor } from '@testing-library/react'
import { Form, Field, Tools, Value } from '../../..'
import type { ComponentMarkers } from '../../../../../shared/helpers/withComponentMarkers'

describe('Form.Bridge', () => {
  it('should have constant of _supportsSpacingProps="children"', () => {
    expect((Form.Bridge as ComponentMarkers)._supportsSpacingProps).toBe(
      'children'
    )
  })

  it('should throw if no matching Form.Handler exists for formHandlerId', () => {
    const log = vi.spyOn(console, 'error').mockImplementation(() => {})

    const renderFn = () => {
      render(
        <Form.Bridge formHandlerId="missing-handler-id">
          <Field.String path="/name" />
        </Form.Bridge>
      )
    }

    expect(renderFn).toThrow(
      'Form.Bridge needs a valid formHandlerId that points to a mounted Form.Handler'
    )

    log.mockRestore()
  })

  it('should connect nested fields to linked Form.Handler by formHandlerId', () => {
    const formId = 'linked-handler-id'

    const { rerender } = render(
      <>
        <Form.Handler id={formId} data={{ name: 'Nora' }}>
          {null}
        </Form.Handler>
        <Form.Bridge formHandlerId={formId}>
          <Field.String path="/name" />
        </Form.Bridge>
      </>
    )

    const input = document.querySelector(
      'input.dnb-input__input'
    ) as HTMLInputElement

    expect(input.value).toBe('Nora')

    rerender(
      <>
        <Form.Handler id={formId} data={{ name: 'Ada' }}>
          {null}
        </Form.Handler>
        <Form.Bridge formHandlerId={formId}>
          <Field.String path="/name" />
        </Form.Bridge>
      </>
    )

    expect(input.value).toBe('Ada')
  })

  it('should render a form element when used outside Form.Handler', () => {
    const formId = 'linked-handler-outside'

    const { container } = render(
      <>
        <Form.Handler id={formId} data={{ name: 'Nora' }}>
          {null}
        </Form.Handler>
        <Form.Bridge formHandlerId={formId}>
          <Field.String path="/name" />
        </Form.Bridge>
      </>
    )

    const forms = container.querySelectorAll('form.dnb-forms-form')

    expect(forms).toHaveLength(2)
  })

  it('should not render an extra form element when used inside Form.Handler', () => {
    const formId = 'linked-handler-inside'

    const { container } = render(
      <Form.Handler id={formId} data={{ name: 'Nora' }}>
        <Form.Bridge formHandlerId={formId}>
          <Field.String path="/name" />
        </Form.Bridge>
      </Form.Handler>
    )

    const forms = container.querySelectorAll('form.dnb-forms-form')

    expect(forms).toHaveLength(1)
  })

  it('should render a local form and submit linked handler when inside a different handler context', async () => {
    const linkedFormId = 'linked-handler-context-1'
    const outerFormId = 'outer-handler-context-1'
    const onSubmitLinked = vi.fn()
    const onSubmitOuter = vi.fn()

    const { container } = render(
      <>
        <Form.Handler
          id={outerFormId}
          data={{ outer: 'value' }}
          onSubmit={onSubmitOuter}
        >
          <Field.String path="/outer" />
        </Form.Handler>

        <Form.Handler
          id={linkedFormId}
          data={{ name: 'Nora' }}
          onSubmit={onSubmitLinked}
        >
          {null}
        </Form.Handler>

        <Form.Bridge formHandlerId={linkedFormId}>
          <Field.String path="/name" />
          <Form.SubmitButton>Submit from bridge</Form.SubmitButton>
        </Form.Bridge>
      </>
    )

    const forms = container.querySelectorAll('form.dnb-forms-form')
    expect(forms).toHaveLength(3)

    const bridgeForm = forms[2]
    fireEvent.submit(bridgeForm)

    await waitFor(() => {
      expect(onSubmitLinked).toHaveBeenCalledWith(
        { name: 'Nora' },
        expect.anything()
      )
    })

    expect(onSubmitOuter).not.toHaveBeenCalled()
  })

  it('should submit when clicking submit buttons in both Form.Handler and external Form.Bridge', () => {
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

        <Form.Bridge formHandlerId={formId}>
          <Form.SubmitButton>Submit from bridge</Form.SubmitButton>
        </Form.Bridge>
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

  it('should show bridge field validation when submitting from external Form.Bridge', async () => {
    const formId = 'linked-submit-validation'
    const onSubmit = vi.fn()

    const { container } = render(
      <>
        <Form.Handler id={formId} onSubmit={onSubmit}>
          {null}
        </Form.Handler>

        <Form.Bridge formHandlerId={formId}>
          <Field.Name.First path="/firstName" required />
          <Form.SubmitButton>Submit from bridge</Form.SubmitButton>
        </Form.Bridge>
      </>
    )

    const bridgeButton = container.querySelectorAll(
      'button.dnb-forms-submit-button'
    )[0] as HTMLButtonElement

    fireEvent.click(bridgeButton)

    expect(onSubmit).not.toHaveBeenCalled()

    await waitFor(() => {
      expect(document.querySelector('[role="alert"]')).toBeInTheDocument()
    })
  })

  it('should show required errors in bridge section when submitting from bridge submit button', async () => {
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

        <Form.Bridge formHandlerId={formId}>
          <Form.Section path="/mySection">
            <Field.Composition width="large">
              <Field.Name.First path="/firstName" required />
              <Field.Name.Last path="/lastName" required />
            </Field.Composition>
            <Form.SubmitButton>Submit from bridge</Form.SubmitButton>
          </Form.Section>
        </Form.Bridge>
      </>
    )

    const forms = container.querySelectorAll('form.dnb-forms-form')
    const bridgeForm = forms[1]
    const bridgeButton = bridgeForm.querySelector(
      'button.dnb-forms-submit-button'
    ) as HTMLButtonElement

    fireEvent.click(bridgeButton)

    await waitFor(() => {
      expect(
        bridgeForm.querySelector('[role="alert"]')
      ).toBeInTheDocument()
    })
  })

  it('should pass bridge field data to handler onSubmit', async () => {
    const formId = 'linked-submit-data-flow'
    const onSubmit = vi.fn()

    const { container } = render(
      <>
        <Form.Handler id={formId} onSubmit={onSubmit}>
          {null}
        </Form.Handler>

        <Form.Bridge formHandlerId={formId}>
          <Field.String path="/name" value="Nora" />
          <Form.SubmitButton />
        </Form.Bridge>
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
        <Form.Handler id={formId} data={{ profile: { firstName: 'Kai' } }}>
          {null}
        </Form.Handler>
        <Form.Bridge formHandlerId={formId}>
          <Form.Section path="/profile">
            <Field.String path="/firstName" />
          </Form.Section>
        </Form.Bridge>
      </>
    )

    const input = document.querySelector(
      'input.dnb-input__input'
    ) as HTMLInputElement

    expect(input.value).toBe('Kai')
  })

  it('should re-render consumers inside the bridge when typing in a bridge field', () => {
    const formId = 'linked-live-updates'

    render(
      <>
        <Form.Handler id={formId} data={{ name: 'Nora' }}>
          {null}
        </Form.Handler>
        <Form.Bridge formHandlerId={formId}>
          <Field.String path="/name" />
          <Value.String path="/name" />
          <Tools.Log />
        </Form.Bridge>
      </>
    )

    const input = document.querySelector(
      'input.dnb-input__input'
    ) as HTMLInputElement
    const valueElement = document.querySelector(
      '.dnb-forms-value-block__content'
    ) as HTMLElement
    const log = document.querySelector('output pre') as HTMLElement

    expect(input.value).toBe('Nora')
    expect(valueElement.textContent).toContain('Nora')
    expect(log.textContent).toContain('"name": "Nora"')

    fireEvent.change(input, { target: { value: 'Ada' } })

    expect(input.value).toBe('Ada')
    expect(valueElement.textContent).toContain('Ada')
    expect(log.textContent).toContain('"name": "Ada"')
  })
})
