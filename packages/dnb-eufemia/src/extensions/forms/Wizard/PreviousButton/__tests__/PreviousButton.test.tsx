import { fireEvent, render, waitFor } from '@testing-library/react'
import '../../../../../core/vitest/mockMatchMediaSetup'
import { wait } from '../../../../../core/test-utils/testSetup'
import PreviousButton from '../PreviousButton'
import WizardContext from '../../Context/WizardContext'
import { Provider } from '../../../../../shared'
import { Button } from '../../../../../components'
import { Form, Wizard } from '../../..'

describe('PreviousButton', () => {
  it('should have default text', () => {
    render(<PreviousButton />)

    const button = document.querySelector('.dnb-forms-previous-button')

    expect(button).toHaveTextContent('Tilbake')
  })

  it('should use en-GB text', () => {
    render(
      <Provider locale="en-GB">
        <PreviousButton />
      </Provider>
    )

    const button = document.querySelector('.dnb-forms-previous-button')

    expect(button).toHaveTextContent('Back')
  })

  it('should support custom text', () => {
    render(<PreviousButton text="Custom" />)

    const button = document.querySelector('.dnb-forms-previous-button')

    expect(button).toHaveTextContent('Custom')
  })

  it('should be tertiary variant', () => {
    render(<PreviousButton />)

    const button = document.querySelector('.dnb-forms-previous-button')

    expect(button).toHaveClass('dnb-button--tertiary')
  })

  it('should have chevron left icon', () => {
    render(<PreviousButton />)

    const button = document.querySelector('.dnb-forms-previous-button')

    expect(button.querySelector('.dnb-icon')).toHaveAttribute(
      'data-testid',
      'chevron left icon'
    )
  })

  it('should be disabled when activeIndex is 0', () => {
    const { rerender } = render(
      <WizardContext
        value={{
          activeIndex: 1,
          handlePrevious: () => null,
          handleNext: () => null,
          setActiveIndex: () => null,
          setFormError: () => null,
        }}
      >
        <PreviousButton />
      </WizardContext>
    )

    const button = document.querySelector('.dnb-forms-previous-button')

    expect(button).not.toBeDisabled()

    rerender(
      <WizardContext
        value={{
          activeIndex: 0,
          handlePrevious: () => null,
          handleNext: () => null,
          setActiveIndex: () => null,
          setFormError: () => null,
        }}
      >
        <PreviousButton />
      </WizardContext>
    )

    expect(button).toBeDisabled()
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
        <PreviousButton />
      </WizardContext>
    )

    const button = document.querySelector('.dnb-forms-previous-button')

    fireEvent.click(button)

    expect(handlePrevious).toHaveBeenCalledTimes(1)
    expect(handleNext).toHaveBeenCalledTimes(0)
  })

  it('should keep navigating when an onClick is given', () => {
    const handlePrevious = vi.fn()
    const onClick = vi.fn()

    render(
      <WizardContext value={{ handlePrevious }}>
        <PreviousButton onClick={onClick} />
      </WizardContext>
    )

    fireEvent.click(document.querySelector('.dnb-forms-previous-button'))

    expect(onClick).toHaveBeenCalledTimes(1)
    expect(handlePrevious).toHaveBeenCalledTimes(1)
  })

  it('should keep its own className when a className is given', () => {
    render(<PreviousButton className="custom" />)

    expect(document.querySelector('button')).toHaveClass(
      'dnb-forms-previous-button',
      'custom'
    )
  })

  describe('submit indicator', () => {
    const isPending = (selector: string) =>
      Boolean(
        document.querySelector(
          `${selector} .dnb-forms-submit-indicator--state-pending`
        )
      )
    const output = () => document.querySelector('output')
    const waitForStep = async (title: string) => {
      await waitFor(
        () => {
          expect(output()).toHaveTextContent(title)
          expect(
            document.querySelector(
              'button[disabled]:not(.dnb-forms-previous-button)'
            )
          ).toBeNull()
          expect(
            document.querySelector(
              '.dnb-forms-submit-indicator[class*="--state-"]'
            )
          ).toBeNull()
        },
        { timeout: 2000 }
      )
    }

    it('should show the indicator on the Previous button during an async step change', async () => {
      let resolveStepChange: () => void
      const onStepChange = async () => {
        await new Promise<void>((resolve) => {
          resolveStepChange = resolve
        })
      }
      const changeStep = async (selector: string, title: string) => {
        fireEvent.click(document.querySelector(selector))
        await waitFor(() => {
          expect(resolveStepChange).toBeDefined()
        })
        resolveStepChange()
        resolveStepChange = undefined
        await waitForStep(title)
      }

      render(
        <Form.Handler onSubmit={() => null} minimumAsyncBehaviorTime={50}>
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
              <Form.SubmitButton />
            </Wizard.Step>
          </Wizard.Container>
        </Form.Handler>
      )

      await changeStep('.dnb-forms-next-button', 'Step 2')
      await changeStep('.dnb-forms-next-button', 'Step 3')

      fireEvent.click(document.querySelector('.dnb-forms-previous-button'))
      await waitFor(() => {
        expect(isPending('.dnb-forms-previous-button')).toBe(true)
      })
      expect(isPending('.dnb-forms-submit-button')).toBe(false)
      resolveStepChange()
      resolveStepChange = undefined
      await waitForStep('Step 2')

      fireEvent.click(document.querySelector('.dnb-forms-previous-button'))
      await waitFor(() => {
        expect(isPending('.dnb-forms-previous-button')).toBe(true)
      })
      expect(isPending('.dnb-forms-next-button')).toBe(false)
      resolveStepChange()
      resolveStepChange = undefined
      await waitForStep('Step 1')

      fireEvent.click(document.querySelector('.dnb-forms-next-button'))
      await waitFor(() => {
        expect(isPending('.dnb-forms-next-button')).toBe(true)
      })
      expect(isPending('.dnb-forms-previous-button')).toBe(false)
      resolveStepChange()
    })

    it('should show the indicator on the Previous button when going back with the step indicator', async () => {
      let resolveStepChange: () => void
      const onStepChange = async () => {
        await new Promise<void>((resolve) => {
          resolveStepChange = resolve
        })
      }

      render(
        <Form.Handler onSubmit={() => null} minimumAsyncBehaviorTime={50}>
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

      fireEvent.click(document.querySelector('.dnb-forms-next-button'))
      await waitFor(() => {
        expect(resolveStepChange).toBeDefined()
      })
      resolveStepChange()
      resolveStepChange = undefined
      await waitForStep('Step 2')

      fireEvent.click(
        document.querySelector(
          'button.dnb-step-indicator__trigger__button--collapsed'
        )
      )
      fireEvent.click(
        document.querySelectorAll('.dnb-step-indicator__button')[0]
      )
      await waitFor(() => {
        expect(isPending('.dnb-forms-previous-button')).toBe(true)
      })
      expect(isPending('.dnb-forms-submit-button')).toBe(false)
      resolveStepChange()
      await waitForStep('Step 1')
    })

    it('should show the indicator on the Previous button when going back with the EditButton', async () => {
      let resolveStepChange: () => void
      const onStepChange = async () => {
        await new Promise<void>((resolve) => {
          resolveStepChange = resolve
        })
      }

      render(
        <Form.Handler onSubmit={() => null} minimumAsyncBehaviorTime={50}>
          <Wizard.Container onStepChange={onStepChange}>
            <Wizard.Step title="Step 1">
              <output>Step 1</output>
              <Wizard.Buttons />
            </Wizard.Step>
            <Wizard.Step title="Summary">
              <output>Summary</output>
              <Wizard.EditButton toStep={0} />
              <Wizard.Buttons />
              <Form.SubmitButton />
            </Wizard.Step>
          </Wizard.Container>
        </Form.Handler>
      )

      fireEvent.click(document.querySelector('.dnb-forms-next-button'))
      await waitFor(() => {
        expect(resolveStepChange).toBeDefined()
      })
      resolveStepChange()
      resolveStepChange = undefined
      await waitForStep('Summary')

      fireEvent.click(document.querySelector('.dnb-forms-edit-button'))
      await waitFor(() => {
        expect(isPending('.dnb-forms-previous-button')).toBe(true)
      })
      expect(isPending('.dnb-forms-submit-button')).toBe(false)
      resolveStepChange()
      await waitForStep('Step 1')
    })

    it('should show the indicator on the Previous button when a custom button passes handlePrevious to onClick', async () => {
      let resolveStepChange: () => void
      const onStepChange = async () => {
        await new Promise<void>((resolve) => {
          resolveStepChange = resolve
        })
      }
      const CustomPreviousButton = () => {
        const { handlePrevious } = Wizard.useStep()
        return (
          <Button className="custom-previous" onClick={handlePrevious}>
            Back
          </Button>
        )
      }

      render(
        <Form.Handler onSubmit={() => null} minimumAsyncBehaviorTime={50}>
          <Wizard.Container
            onStepChange={onStepChange}
            initialActiveIndex={1}
          >
            <Wizard.Step title="Step 1">
              <output>Step 1</output>
              <Wizard.Buttons />
            </Wizard.Step>
            <Wizard.Step title="Step 2">
              <output>Step 2</output>
              <CustomPreviousButton />
              <Wizard.Buttons />
              <Form.SubmitButton />
            </Wizard.Step>
          </Wizard.Container>
        </Form.Handler>
      )

      fireEvent.click(document.querySelector('.custom-previous'))
      await waitFor(() => {
        expect(isPending('.dnb-forms-previous-button')).toBe(true)
      })
      expect(isPending('.dnb-forms-submit-button')).toBe(false)
      resolveStepChange()
      await waitForStep('Step 1')
    })

    it('should not take the indicator from the submit button when the step change is not async', async () => {
      let submit: () => void
      const SubmitFromOutside = () => {
        submit = Form.useSubmit().submit
        return null
      }

      render(
        <Form.Handler
          onSubmit={async () => {
            await wait(10)
          }}
        >
          <Wizard.Container>
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
          <SubmitFromOutside />
        </Form.Handler>
      )

      fireEvent.click(document.querySelector('.dnb-forms-next-button'))
      await waitForStep('Step 2')

      fireEvent.click(document.querySelector('.dnb-forms-previous-button'))
      await waitForStep('Step 1')

      fireEvent.click(document.querySelector('.dnb-forms-next-button'))
      await waitForStep('Step 2')

      submit()

      await waitFor(() => {
        expect(isPending('.dnb-forms-submit-button')).toBe(true)
      })
    })
  })
})
