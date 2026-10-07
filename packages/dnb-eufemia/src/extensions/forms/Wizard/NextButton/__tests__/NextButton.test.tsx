import { createRef } from 'react'
import { fireEvent, render, waitFor } from '@testing-library/react'
import '../../../../../core/vitest/mockMatchMediaSetup'
import NextButton from '../NextButton'
import { Button } from '../../../../../components'
import { Provider } from '../../../../../shared'
import WizardContext from '../../Context/WizardContext'
import { Field, Form, Wizard } from '../../..'

describe('NextButton', () => {
  it('should have default text', () => {
    render(<NextButton />)

    const button = document.querySelector('.dnb-forms-next-button')

    expect(button).toHaveTextContent('Neste')
  })

  it('should use en-GB text', () => {
    render(
      <Provider locale="en-GB">
        <NextButton />
      </Provider>
    )

    const button = document.querySelector('.dnb-forms-next-button')

    expect(button).toHaveTextContent('Next')
  })

  it('should support custom text', () => {
    render(<NextButton text="Custom" />)

    const button = document.querySelector('.dnb-forms-next-button')

    expect(button).toHaveTextContent('Custom')
  })

  it('should be primary variant', () => {
    render(<NextButton />)

    const button = document.querySelector('.dnb-forms-next-button')

    expect(button).toHaveClass('dnb-button--primary')
  })

  it('should have chevron left icon', () => {
    render(<NextButton />)

    const button = document.querySelector('.dnb-forms-next-button')

    expect(button.querySelector('.dnb-icon')).toHaveAttribute(
      'data-testid',
      'chevron right icon'
    )
  })

  it('should handle handlePrevious event', () => {
    const handlePrevious = vi.fn()
    const handleNext = vi.fn()
    const setActiveIndex = vi.fn()
    const setFormError = vi.fn()

    render(
      <WizardContext
        value={{
          activeIndex: 1,
          handlePrevious,
          handleNext,
          setActiveIndex,
          setFormError,
        }}
      >
        <NextButton />
      </WizardContext>
    )

    const button = document.querySelector('.dnb-forms-next-button')

    fireEvent.click(button)

    expect(handlePrevious).toHaveBeenCalledTimes(0)
    expect(handleNext).toHaveBeenCalledTimes(1)
  })

  it('should keep navigating when an onClick is given', () => {
    const handleNext = vi.fn()
    const onClick = vi.fn()

    render(
      <WizardContext value={{ handleNext }}>
        <NextButton onClick={onClick} />
      </WizardContext>
    )

    fireEvent.click(document.querySelector('.dnb-forms-next-button'))

    expect(onClick).toHaveBeenCalledTimes(1)
    expect(handleNext).toHaveBeenCalledTimes(1)
  })

  it('should stay on the step when the given onClick returns false', () => {
    const handleNext = vi.fn()
    const onClick = vi.fn(() => false)

    render(
      <WizardContext value={{ handleNext }}>
        <NextButton onClick={onClick} />
      </WizardContext>
    )

    fireEvent.click(document.querySelector('.dnb-forms-next-button'))

    expect(onClick).toHaveBeenCalledTimes(1)
    expect(handleNext).not.toHaveBeenCalled()
  })

  it('should keep its own className when a className is given', () => {
    render(<NextButton className="custom" />)

    expect(document.querySelector('button')).toHaveClass(
      'dnb-forms-next-button',
      'custom'
    )
  })

  it('should support a given ref', () => {
    const ref = createRef<HTMLElement>()
    render(<NextButton ref={ref} />)

    expect(ref.current).toBe(
      document.querySelector('.dnb-forms-next-button')
    )
  })

  it('should commit a surrounding Form.Isolation only once', async () => {
    const onCommit = vi.fn()

    render(
      <Form.Handler>
        <Form.Isolation onCommit={onCommit}>
          <Wizard.Container>
            <Wizard.Step title="Step 1">
              <Field.String path="/name" />
              <Wizard.Buttons />
            </Wizard.Step>
            <Wizard.Step title="Step 2">
              <output>Step 2</output>
            </Wizard.Step>
          </Wizard.Container>
        </Form.Isolation>
      </Form.Handler>
    )

    fireEvent.click(document.querySelector('.dnb-forms-next-button'))

    await waitFor(() => {
      expect(document.querySelector('output')).toHaveTextContent('Step 2')
    })
    expect(onCommit).toHaveBeenCalledTimes(1)
  })

  it('should leave the indicator to the Previous button when going back', async () => {
    let resolveStepChange: () => void
    const onStepChange = async () => {
      await new Promise<void>((resolve) => {
        resolveStepChange = resolve
      })
    }

    render(
      <Form.Handler minimumAsyncBehaviorTime={0}>
        <Wizard.Container onStepChange={onStepChange}>
          <Wizard.Step title="Step 1">
            <output>Step 1</output>
            <Wizard.Buttons />
          </Wizard.Step>
          <Wizard.Step title="Step 2">
            <output>Step 2</output>
            <Wizard.Buttons />
          </Wizard.Step>
          <Wizard.Step title="Step 3">
            <output>Step 3</output>
            <Wizard.Buttons />
          </Wizard.Step>
        </Wizard.Container>
      </Form.Handler>
    )

    const indicator = () =>
      document.querySelector(
        '.dnb-forms-next-button .dnb-forms-submit-indicator--state-pending'
      )

    fireEvent.click(document.querySelector('.dnb-forms-next-button'))
    await waitFor(() => {
      expect(indicator()).toBeInTheDocument()
    })
    resolveStepChange()

    await waitFor(() => {
      expect(document.querySelector('output')).toHaveTextContent('Step 2')
      expect(indicator()).toBeNull()
    })

    fireEvent.click(document.querySelector('.dnb-forms-previous-button'))
    await waitFor(() => {
      expect(
        document.querySelector(
          '.dnb-forms-previous-button .dnb-forms-submit-indicator--state-pending'
        )
      ).toBeInTheDocument()
    })
    expect(indicator()).toBeNull()
    resolveStepChange()
  })

  describe('submit indicator', () => {
    const isPending = (selector: string) =>
      Boolean(
        document.querySelector(
          `${selector} .dnb-forms-submit-indicator--state-pending`
        )
      )

    let resolveStepChange: () => void
    const onStepChange = async () => {
      await new Promise<void>((resolve) => {
        resolveStepChange = resolve
      })
    }

    it('should show the indicator only on the Next button when the step also has a submit button', async () => {
      render(
        <Form.Handler minimumAsyncBehaviorTime={0}>
          <Wizard.Container onStepChange={onStepChange}>
            <Wizard.Step title="Step 1">
              <output>Step 1</output>
              <Wizard.Buttons />
              <Form.SubmitButton className="send" />
            </Wizard.Step>
            <Wizard.Step title="Step 2">
              <output>Step 2</output>
            </Wizard.Step>
          </Wizard.Container>
        </Form.Handler>
      )

      fireEvent.click(document.querySelector('.dnb-forms-next-button'))
      await waitFor(() => {
        expect(isPending('.dnb-forms-next-button')).toBe(true)
      })
      expect(isPending('.send')).toBe(false)
      resolveStepChange()

      await waitFor(() => {
        expect(document.querySelector('output')).toHaveTextContent(
          'Step 2'
        )
      })
    })

    it('should show the indicator on the Next button when going forward with the step indicator', async () => {
      render(
        <Form.Handler minimumAsyncBehaviorTime={0}>
          <Wizard.Container onStepChange={onStepChange} mode="loose">
            <Wizard.Step title="Step 1">
              <output>Step 1</output>
              <Wizard.Buttons />
              <Form.SubmitButton className="send" />
            </Wizard.Step>
            <Wizard.Step title="Step 2">
              <output>Step 2</output>
            </Wizard.Step>
          </Wizard.Container>
        </Form.Handler>
      )

      fireEvent.click(
        document.querySelector(
          'button.dnb-step-indicator__trigger__button--collapsed'
        )
      )
      fireEvent.click(
        document.querySelectorAll('.dnb-step-indicator__button')[1]
      )
      await waitFor(() => {
        expect(isPending('.dnb-forms-next-button')).toBe(true)
      })
      expect(isPending('.send')).toBe(false)
      resolveStepChange()

      await waitFor(() => {
        expect(document.querySelector('output')).toHaveTextContent(
          'Step 2'
        )
      })
    })

    it('should leave the indicator to a submit button that moves to the next step', async () => {
      render(
        <Form.Handler minimumAsyncBehaviorTime={0}>
          <Wizard.Container onStepChange={onStepChange}>
            <Wizard.Step title="Step 1">
              <output>Step 1</output>
              <Wizard.Buttons />
              <Form.SubmitButton className="send" />
            </Wizard.Step>
            <Wizard.Step title="Step 2">
              <output>Step 2</output>
            </Wizard.Step>
          </Wizard.Container>
        </Form.Handler>
      )

      fireEvent.click(document.querySelector('.send'))
      await waitFor(() => {
        expect(isPending('.send')).toBe(true)
      })
      expect(isPending('.dnb-forms-next-button')).toBe(false)
      resolveStepChange()

      await waitFor(() => {
        expect(document.querySelector('output')).toHaveTextContent(
          'Step 2'
        )
      })
    })

    it('should show the indicator on the Next button when handleNext from useStep is given as onClick', async () => {
      const CustomNextButton = () => {
        const { handleNext } = Wizard.useStep()
        return (
          <Button
            className="custom-next"
            text="Continue"
            onClick={handleNext}
          />
        )
      }

      render(
        <Form.Handler minimumAsyncBehaviorTime={0}>
          <Wizard.Container onStepChange={onStepChange}>
            <Wizard.Step title="Step 1">
              <output>Step 1</output>
              <Wizard.Buttons />
              <Form.SubmitButton className="send" />
              <CustomNextButton />
            </Wizard.Step>
            <Wizard.Step title="Step 2">
              <output>Step 2</output>
            </Wizard.Step>
          </Wizard.Container>
        </Form.Handler>
      )

      fireEvent.click(document.querySelector('.custom-next'))
      await waitFor(() => {
        expect(isPending('.dnb-forms-next-button')).toBe(true)
      })
      expect(isPending('.send')).toBe(false)
      resolveStepChange()

      await waitFor(() => {
        expect(document.querySelector('output')).toHaveTextContent(
          'Step 2'
        )
      })
    })

    it('should not keep the indicator on the Next button when errors stop the step change', async () => {
      let submit: () => void
      const SubmitFromCode = () => {
        submit = Form.useSubmit().submit
        return null
      }

      render(
        <Form.Handler minimumAsyncBehaviorTime={0}>
          <Wizard.Container onStepChange={onStepChange}>
            <Wizard.Step title="Step 1">
              <Field.String path="/name" required />
              <Wizard.Buttons />
              <Form.SubmitButton className="send" />
            </Wizard.Step>
            <Wizard.Step title="Step 2">
              <output>Step 2</output>
            </Wizard.Step>
          </Wizard.Container>
          <SubmitFromCode />
        </Form.Handler>
      )

      fireEvent.click(document.querySelector('.dnb-forms-next-button'))
      await waitFor(() => {
        expect(
          document.querySelector('.dnb-form-status--error')
        ).toBeInTheDocument()
      })

      fireEvent.change(document.querySelector('input'), {
        target: { value: 'Name' },
      })
      submit()

      await waitFor(() => {
        expect(isPending('.dnb-forms-next-button')).toBe(true)
      })
      expect(isPending('.send')).toBe(true)
      resolveStepChange()

      await waitFor(() => {
        expect(document.querySelector('output')).toHaveTextContent(
          'Step 2'
        )
      })
    })
  })
})
