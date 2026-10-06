import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import '../../../../../core/vitest/mockMatchMediaSetup'
import { wait } from '../../../../../core/test-utils/testSetup'
import { Form, Field, Wizard } from '../../..'
import { Provider } from '../../../../../shared'

import nbNO from '../../../constants/locales/nb-NO'
const nb = nbNO['nb-NO']

describe('Form.SubmitButton', () => {
  it('should call "onSubmit" on form element', () => {
    const onSubmit = vi.fn()

    render(
      <Form.Element onSubmit={onSubmit}>
        <Field.String path="/foo" value="Value" />
        <Form.SubmitButton>Submit</Form.SubmitButton>
      </Form.Element>
    )

    const buttonElement = document.querySelector('button')

    fireEvent.click(buttonElement)

    expect(onSubmit).toHaveBeenCalledTimes(1)

    fireEvent.submit(buttonElement)

    expect(onSubmit).toHaveBeenCalledTimes(2)

    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({ type: 'submit', target: buttonElement })
    )
  })

  it('should call preventDefault', () => {
    const preventDefault = vi.fn()
    const onSubmit = vi.fn(preventDefault)

    render(
      <Form.Handler onSubmit={onSubmit}>
        <Form.SubmitButton>Submit</Form.SubmitButton>
      </Form.Handler>
    )

    const buttonElement = document.querySelector('button')

    fireEvent.click(buttonElement)

    expect(preventDefault).toHaveBeenCalledTimes(1)
    expect(onSubmit).toHaveBeenCalledTimes(1)

    fireEvent.submit(buttonElement)

    expect(preventDefault).toHaveBeenCalledTimes(2)
    expect(onSubmit).toHaveBeenCalledTimes(2)
  })

  it('should default to button element with type of submit', () => {
    render(
      <Form.Handler>
        <Form.SubmitButton>Submit</Form.SubmitButton>
      </Form.Handler>
    )

    const buttonElement = document.querySelector('button')

    expect(buttonElement.tagName).toBe('BUTTON')
    expect(buttonElement.type).toBe('submit')
  })

  it('should set custom "className"', () => {
    render(
      <Form.Handler>
        <Form.SubmitButton className="custom-class">
          Submit
        </Form.SubmitButton>
      </Form.Handler>
    )

    const buttonElement = document.querySelector('button')

    expect(buttonElement).toHaveClass(
      'dnb-button dnb-button--primary dnb-button--has-text dnb-forms-submit-button custom-class',
      { exact: true }
    )
  })

  it('should have default text', () => {
    render(<Form.SubmitButton />)

    const button = document.querySelector('.dnb-forms-submit-button')

    expect(button).toHaveTextContent('Send')
  })

  it('should use en-GB text', () => {
    render(
      <Provider locale="en-GB">
        <Form.SubmitButton />
      </Provider>
    )

    const button = document.querySelector('.dnb-forms-submit-button')

    expect(button).toHaveTextContent('Send')
  })

  it('should support custom text', () => {
    render(<Form.SubmitButton text="Custom" />)

    const button = document.querySelector('.dnb-forms-submit-button')

    expect(button).toHaveTextContent('Custom')
  })

  it('should be primary variant', () => {
    render(<Form.SubmitButton />)

    const button = document.querySelector('.dnb-forms-submit-button')

    expect(button).toHaveClass('dnb-button--primary')
  })

  it('should support secondary variant', () => {
    render(<Form.SubmitButton variant="secondary" />)

    const button = document.querySelector('.dnb-forms-submit-button')

    expect(button).toHaveClass('dnb-button--secondary')
  })

  it('should have "text" by default', () => {
    render(<Form.SubmitButton />)

    const button = document.querySelector('.dnb-forms-submit-button')

    expect(button.textContent).toBe('' + nb.SubmitButton.text)
  })

  it('should have "sendText" when variant is "send"', () => {
    render(<Form.SubmitButton variant="send" />)

    const button = document.querySelector('.dnb-forms-submit-button')

    expect(button.textContent).toBe('' + nb.SubmitButton.sendText)
  })

  it('should have "send" icon when variant is "send"', () => {
    render(<Form.SubmitButton variant="send" />)

    const button = document.querySelector('.dnb-forms-submit-button')

    expect(button.querySelector('.dnb-icon')).toHaveAttribute(
      'data-testid',
      'send icon'
    )
  })

  it('should have no icon', () => {
    render(<Form.SubmitButton />)

    const button = document.querySelector('.dnb-forms-submit-button')

    expect(button.querySelector('.dnb-icon')).toBeNull()
  })

  it('should forward custom HTML props', () => {
    render(
      <Form.Handler>
        <Form.SubmitButton aria-label="Aria Label">
          Submit
        </Form.SubmitButton>
      </Form.Handler>
    )

    const buttonElement = document.querySelector('button')
    const attributes = Array.from(buttonElement.attributes).map(
      (attr) => attr.name
    )

    expect(attributes).toEqual([
      'class',
      'type',
      'data-form-submit-button-id',
      'aria-label',
    ])
    expect(buttonElement.getAttribute('aria-label')).toBe('Aria Label')
  })

  it('should show submit indicator when showIndicator is true', () => {
    const { rerender } = render(<Form.SubmitButton showIndicator />)

    const buttonElement = document.querySelector('button')

    expect(
      buttonElement.querySelector(
        '.dnb-forms-submit-indicator--state-pending'
      )
    ).toBeTruthy()

    rerender(<Form.SubmitButton />)

    expect(
      document.querySelector('.dnb-forms-submit-indicator--state-pending')
    ).toBeNull()
  })

  it('should only show submit indicator on the clicked submit button', async () => {
    const onSubmit = vi.fn(async () => {
      await wait(10)
    })

    render(
      <Form.Handler onSubmit={onSubmit}>
        <Form.SubmitButton>First</Form.SubmitButton>
        <Form.SubmitButton>Second</Form.SubmitButton>
      </Form.Handler>
    )

    const [firstButton, secondButton] = screen.getAllByRole('button')

    fireEvent.click(secondButton)

    const firstIndicator = firstButton.querySelector(
      '.dnb-forms-submit-indicator'
    )
    const secondIndicator = secondButton.querySelector(
      '.dnb-forms-submit-indicator'
    )

    expect(firstIndicator).not.toHaveClass(
      'dnb-forms-submit-indicator--state-pending'
    )
    expect(secondIndicator).toHaveClass(
      'dnb-forms-submit-indicator--state-pending'
    )
  })

  it('should show the indicator on every submit button again after the clicked one is done', async () => {
    const onSubmit = vi.fn(async () => {
      await wait(10)
    })

    let submit: () => void
    const SubmitFromOutside = () => {
      submit = Form.useSubmit().submit
      return null
    }

    render(
      <Form.Handler onSubmit={onSubmit}>
        <Form.SubmitButton>First</Form.SubmitButton>
        <Form.SubmitButton>Second</Form.SubmitButton>
        <SubmitFromOutside />
      </Form.Handler>
    )

    const [firstButton, secondButton] = screen.getAllByRole('button')
    const isPending = (button: HTMLElement) =>
      button
        .querySelector('.dnb-forms-submit-indicator')
        .classList.contains('dnb-forms-submit-indicator--state-pending')

    fireEvent.click(secondButton)

    expect(isPending(secondButton)).toBe(true)
    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledTimes(1)
      expect(
        document.querySelector(
          '.dnb-forms-submit-indicator[class*="--state-"]'
        )
      ).toBeNull()
    })

    submit()

    await waitFor(() => {
      expect(isPending(firstButton)).toBe(true)
      expect(isPending(secondButton)).toBe(true)
    })
  })

  it('should show the indicator on every submit button after a click that was stopped by an error', async () => {
    const onSubmit = vi.fn(async () => {
      await wait(10)
    })

    let submit: () => void
    const SubmitFromOutside = () => {
      submit = Form.useSubmit().submit
      return null
    }

    render(
      <Form.Handler onSubmit={onSubmit}>
        <Field.String path="/foo" required />
        <Form.SubmitButton>First</Form.SubmitButton>
        <Form.SubmitButton>Second</Form.SubmitButton>
        <SubmitFromOutside />
      </Form.Handler>
    )

    const [firstButton, secondButton] = screen.getAllByRole('button')
    const isPending = (button: HTMLElement) =>
      button
        .querySelector('.dnb-forms-submit-indicator')
        .classList.contains('dnb-forms-submit-indicator--state-pending')

    fireEvent.click(secondButton)

    expect(onSubmit).toHaveBeenCalledTimes(0)

    fireEvent.change(document.querySelector('input'), {
      target: { value: 'value' },
    })
    submit()

    await waitFor(() => {
      expect(isPending(firstButton)).toBe(true)
      expect(isPending(secondButton)).toBe(true)
    })
  })

  it('should show the indicator on the Next button when going back after a submit', async () => {
    let resolveStepChange: () => void
    const onStepChange = async () => {
      await new Promise<void>((resolve) => {
        resolveStepChange = resolve
      })
    }

    render(
      // A click right after a step change happens while its state is still shown
      <Form.Handler onSubmit={() => null} minimumAsyncBehaviorTime={300}>
        <Wizard.Container onStepChange={onStepChange}>
          <Wizard.Step title="Step 1">
            <output>Step 1</output>
            <Wizard.Buttons />
          </Wizard.Step>
          <Wizard.Step title="Step 2">
            <output>Step 2</output>
            <Wizard.Buttons />
            <Form.SubmitButton />
          </Wizard.Step>
        </Wizard.Container>
      </Form.Handler>
    )

    const output = () => document.querySelector('output')
    const nextIndicator = () =>
      document.querySelector(
        '.dnb-forms-next-button .dnb-forms-submit-indicator--state-pending'
      )
    const changeStep = async (selector: string, title: string) => {
      fireEvent.click(document.querySelector(selector))
      await waitFor(() => {
        expect(resolveStepChange).toBeDefined()
      })
      resolveStepChange()
      resolveStepChange = undefined
      await waitFor(
        () => {
          expect(output()).toHaveTextContent(title)
          expect(document.querySelector('button[disabled]')).toBeNull()
        },
        { timeout: 2000 }
      )
    }

    await changeStep('.dnb-forms-next-button', 'Step 2')

    fireEvent.click(
      document.querySelector(
        '.dnb-forms-submit-button:not(.dnb-forms-next-button)'
      )
    )

    await changeStep('.dnb-forms-previous-button', 'Step 1')

    fireEvent.click(document.querySelector('.dnb-forms-next-button'))
    await waitFor(() => {
      expect(nextIndicator()).toBeInTheDocument()
    })
    resolveStepChange()
  })

  it('should contain submit indicator and its aria features', () => {
    const { rerender } = render(<Form.SubmitButton />)

    const buttonElement = document.querySelector('button')
    const indicatorElement = buttonElement.querySelector(
      '.dnb-forms-submit-indicator'
    )
    const indicatorContentElement = buttonElement.querySelector(
      '.dnb-forms-submit-indicator__content'
    )

    expect(indicatorElement).not.toHaveClass(
      'dnb-forms-submit-indicator--state-pending'
    )

    rerender(<Form.SubmitButton showIndicator />)

    expect(buttonElement).toHaveTextContent('Send')
    expect(
      buttonElement.querySelectorAll(
        '.dnb-forms-submit-indicator__content b'
      )
    ).toHaveLength(3)
    expect(indicatorElement).toHaveClass(
      'dnb-forms-submit-indicator--state-pending'
    )
    expect(indicatorContentElement).toHaveAttribute('role', 'status')
    expect(indicatorContentElement).toHaveAttribute(
      'aria-label',
      nb.SubmitIndicator.label
    )
  })

  it('should support custom text with submit indicator', () => {
    const { rerender } = render(<Form.SubmitButton text="Save" />)

    const buttonElement = document.querySelector('button')
    const indicatorElement = buttonElement.querySelector(
      '.dnb-forms-submit-indicator'
    )

    expect(indicatorElement).not.toHaveClass(
      'dnb-forms-submit-indicator--state-pending'
    )

    rerender(<Form.SubmitButton text="Save" showIndicator />)

    expect(buttonElement).toHaveTextContent('Save')
    expect(
      buttonElement.querySelectorAll(
        '.dnb-forms-submit-indicator__content b'
      )
    ).toHaveLength(3)
    expect(indicatorElement).toHaveClass(
      'dnb-forms-submit-indicator--state-pending'
    )
  })

  it('should keep submitting when an onClick is given and no form element is used', () => {
    const onSubmit = vi.fn()
    const onClick = vi.fn()

    render(
      <Form.Handler decoupleForm onSubmit={onSubmit}>
        <Form.SubmitButton onClick={onClick} />
      </Form.Handler>
    )

    fireEvent.click(document.querySelector('.dnb-forms-submit-button'))

    expect(onClick).toHaveBeenCalledTimes(1)
    expect(onSubmit).toHaveBeenCalledTimes(1)
  })
})
