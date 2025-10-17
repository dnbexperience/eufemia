import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import MatchMediaMock from 'jest-matchmedia-mock'
import { spyOnEufemiaWarn, wait } from '../../../../../core/jest/jestSetup'
import { Translation } from '../../../../../shared'
import {
  Field,
  Form,
  Iterate,
  OnSubmit,
  OnSubmitRequest,
  Wizard,
  makeAjvInstance,
} from '../../..'
import WizardContext from '../../Context'

import nbNO from '../../../constants/locales/nb-NO'
const nb = nbNO['nb-NO']

const matchMedia = new MatchMediaMock()

beforeEach(() => {
  matchMedia.useMediaQuery('(min-width: 60em)')
  globalThis.IS_TEST = true
})

function simulateSmallScreen() {
  matchMedia.useMediaQuery('(min-width: 0) and (max-width: 60em)')
}

const expandStepIndicator = async () => {
  await fireEvent.click(
    document.querySelector(
      'button.dnb-step-indicator__trigger__button--collapsed'
    )
  )
}

const log = global.console.log
beforeEach(() => {
  global.console.log = jest.fn((...args) => {
    if (
      !String(args[1]).includes(
        'You may wrap Wizard.Container in Form.Handler'
      ) &&
      !String(args[1]).includes('initialActiveIndex=')
    ) {
      log(...args)
    }
  })
})
afterEach(() => {
  global.console.log = log
  jest.resetAllMocks()
})

describe('Wizard.Container', () => {
  // Increase timeout for all tests in this suite due to async operations
  jest.setTimeout(30000)
  // Add a shadow, so we can spy on the scrollIntoView method
  window.HTMLElement.prototype.scrollIntoView = () => null

  const previousButton = () => {
    return document.querySelector('.dnb-forms-previous-button')
  }
  const nextButton = () => {
    return document.querySelector('.dnb-forms-next-button')
  }
  const submitButton = () => {
    return document.querySelector('.dnb-forms-submit-button')
  }
  const output = () => {
    return document.querySelector('output')
  }
  const content = () =>
    document.querySelector('.dnb-forms-wizard-layout__contents section')

  it('should have "strict" mode as the default mode', async () => {
    render(
      <Wizard.Container>
        <Wizard.Step title="Step 1">
          <Wizard.NextButton />
        </Wizard.Step>
        <Wizard.Step title="Step 2">
          <Wizard.PreviousButton />
        </Wizard.Step>
      </Wizard.Container>
    )

    await expandStepIndicator()

    const [firstStep, secondStep] = Array.from(
      document.querySelectorAll('.dnb-step-indicator__item')
    )

    expect(firstStep.querySelector('.dnb-anchor').tagName).toBe('BUTTON')
    expect(secondStep.querySelector('.dnb-anchor').tagName).toBe('SPAN')
  })

  it('should call event listener "onStepChange"', async () => {
    const onStepChange = jest.fn()

    render(
      <Wizard.Container onStepChange={onStepChange} mode="loose">
        <Wizard.Step title="Step 1">
          <output>Step 1</output>
          <Wizard.Buttons />
        </Wizard.Step>

        <Wizard.Step title="Step 2">
          <output>Step 2</output>
          <Wizard.Buttons />
        </Wizard.Step>
      </Wizard.Container>
    )

    await expandStepIndicator()
    const [firstStep, secondStep] = Array.from(
      document.querySelectorAll('.dnb-step-indicator__item')
    )

    await userEvent.click(secondStep.querySelector('.dnb-anchor'))
    expect(output()).toHaveTextContent('Step 2')
    expect(onStepChange).toHaveBeenCalledTimes(1)
    expect(onStepChange).toHaveBeenLastCalledWith(
      1,
      'next',
      expect.anything()
    )

    await userEvent.click(firstStep.querySelector('.dnb-anchor'))
    expect(output()).toHaveTextContent('Step 1')
    expect(onStepChange).toHaveBeenCalledTimes(2)
    expect(onStepChange).toHaveBeenLastCalledWith(
      0,
      'previous',
      expect.anything()
    )

    await userEvent.click(nextButton())

    expect(onStepChange).toHaveBeenCalledTimes(3)
    expect(onStepChange).toHaveBeenLastCalledWith(
      1,
      'next',
      expect.anything()
    )

    // Use fireEvent to trigger the event fast
    fireEvent.click(previousButton())

    await waitFor(() => {
      expect(previousButton()).toBeNull()
      expect(onStepChange).toHaveBeenCalledTimes(4)
      expect(onStepChange).toHaveBeenLastCalledWith(
        0,
        'previous',
        expect.anything()
      )
      expect(previousButton()).not.toBeInTheDocument()
    })
  })

  it('should have previousStep in "onStepChange" when navigating back and forth', async () => {
    const onStepChange = jest.fn()

    render(
      <Wizard.Container onStepChange={onStepChange} mode="loose">
        <Wizard.Step title="Step 1">
          <output>Step 1</output>
          <Wizard.Buttons />
        </Wizard.Step>

        <Wizard.Step title="Step 2">
          <output>Step 2</output>
          <Wizard.Buttons />
        </Wizard.Step>
      </Wizard.Container>
    )

    await userEvent.click(nextButton())

    expect(onStepChange).toHaveBeenCalledTimes(1)
    expect(onStepChange).toHaveBeenLastCalledWith(1, 'next', {
      preventNavigation: expect.any(Function),
      previousStep: { index: 0 },
    })

    await userEvent.click(previousButton())

    expect(onStepChange).toHaveBeenCalledTimes(2)
    expect(onStepChange).toHaveBeenLastCalledWith(0, 'previous', {
      preventNavigation: expect.any(Function),
      previousStep: { index: 1 },
    })

    await userEvent.click(nextButton())

    expect(onStepChange).toHaveBeenCalledTimes(3)
    expect(onStepChange).toHaveBeenLastCalledWith(1, 'next', {
      preventNavigation: expect.any(Function),
      previousStep: { index: 0 },
    })
  })

  it('should provide id prop in "onStepChange"', async () => {
    const onStepChange = jest.fn()

    render(
      <Wizard.Container onStepChange={onStepChange} mode="loose">
        <Wizard.Step title="Step 1" id="step-1">
          <output>Step 1</output>
          <Wizard.Buttons />
        </Wizard.Step>

        <Wizard.Step title="Step 2" id="step-2">
          <output>Step 2</output>
          <Wizard.Buttons />
        </Wizard.Step>
      </Wizard.Container>
    )

    await expandStepIndicator()
    const [firstStep, secondStep] = Array.from(
      document.querySelectorAll('.dnb-step-indicator__item')
    )

    await userEvent.click(secondStep.querySelector('.dnb-anchor'))
    expect(output()).toHaveTextContent('Step 2')
    expect(onStepChange).toHaveBeenCalledTimes(1)
    expect(onStepChange).toHaveBeenLastCalledWith(1, 'next', {
      id: 'step-2',
      previousStep: { index: 0, id: 'step-1' },
      preventNavigation: expect.any(Function),
    })

    await userEvent.click(firstStep.querySelector('.dnb-anchor'))
    expect(output()).toHaveTextContent('Step 1')
    expect(onStepChange).toHaveBeenCalledTimes(2)
    expect(onStepChange).toHaveBeenLastCalledWith(0, 'previous', {
      id: 'step-1',
      previousStep: { index: 1, id: 'step-2' },
      preventNavigation: expect.any(Function),
    })

    await userEvent.click(nextButton())

    expect(onStepChange).toHaveBeenCalledTimes(3)
    expect(onStepChange).toHaveBeenLastCalledWith(1, 'next', {
      id: 'step-2',
      previousStep: { index: 0, id: 'step-1' },
      preventNavigation: expect.any(Function),
    })
  })

  it('should support navigating back and forth and only show one step at a time', async () => {
    const Step1 = () => (
      <Wizard.Step title="Step 1">
        <output>Step 1</output>
        <Wizard.Buttons />
      </Wizard.Step>
    )

    const Step2 = () => (
      <Wizard.Step title="Step 2">
        <output>Step 2</output>
        <Wizard.Buttons />
      </Wizard.Step>
    )

    const Summary = () => {
      const { summaryTitle } = Form.useTranslation().Step
      return (
        <Wizard.Step title={summaryTitle}>
          <output>Summary</output>
          <Wizard.Buttons />
        </Wizard.Step>
      )
    }

    const onStepChange = async (step, mode) => {
      if (mode === 'next') {
        await wait(100)
      }
    }

    render(
      <Form.Handler>
        <Wizard.Container onStepChange={onStepChange}>
          <Step1 />
          <Step2 />
          <Summary />
        </Wizard.Container>
      </Form.Handler>
    )

    expect(output()).toHaveTextContent('Step 1')
    expect(document.querySelectorAll('output')).toHaveLength(1)

    await userEvent.click(nextButton())

    expect(document.querySelectorAll('output')).toHaveLength(1)

    await waitFor(() => {
      expect(output()).toHaveTextContent('Step 2')
      expect(document.querySelectorAll('output')).toHaveLength(1)
    })

    await userEvent.click(nextButton())

    expect(document.querySelectorAll('output')).toHaveLength(1)

    await waitFor(() => {
      expect(output()).toHaveTextContent('Summary')
      expect(document.querySelectorAll('output')).toHaveLength(1)
    })

    await userEvent.click(previousButton())

    expect(document.querySelectorAll('output')).toHaveLength(1)

    await waitFor(() => {
      expect(output()).toHaveTextContent('Step 2')
      expect(document.querySelectorAll('output')).toHaveLength(1)
    })

    await userEvent.click(previousButton())

    expect(document.querySelectorAll('output')).toHaveLength(1)

    await waitFor(() => {
      expect(output()).toHaveTextContent('Step 1')
      expect(document.querySelectorAll('output')).toHaveLength(1)
    })
  })

  describe('StrictMode', () => {
    it('should support rendering without id and title', async () => {
      const Step1 = () => (
        <Wizard.Step>
          <output>Step 1</output>
          <Wizard.Buttons />
        </Wizard.Step>
      )

      const Step2 = () => (
        <Wizard.Step>
          <output>Step 2</output>
          <Wizard.Buttons />
        </Wizard.Step>
      )

      const Summary = () => {
        return (
          <Wizard.Step>
            <output>Summary</output>
            <Wizard.Buttons />
          </Wizard.Step>
        )
      }

      const onStepChange = async (step, mode) => {
        if (mode === 'next') {
          await wait(100)
        }
      }

      render(
        <React.StrictMode>
          <Form.Handler>
            <Wizard.Container onStepChange={onStepChange}>
              <Step1 />
              <Step2 />
              <Summary />
            </Wizard.Container>
          </Form.Handler>
        </React.StrictMode>
      )

      expect(output()).toHaveTextContent('Step 1')
      expect(document.querySelectorAll('output')).toHaveLength(1)

      await userEvent.click(nextButton())

      expect(document.querySelectorAll('output')).toHaveLength(1)

      await waitFor(() => {
        expect(output()).toHaveTextContent('Step 2')
        expect(document.querySelectorAll('output')).toHaveLength(1)
      })

      await userEvent.click(nextButton())

      expect(document.querySelectorAll('output')).toHaveLength(1)

      await waitFor(() => {
        expect(output()).toHaveTextContent('Summary')
        expect(document.querySelectorAll('output')).toHaveLength(1)
      })

      await userEvent.click(previousButton())

      expect(document.querySelectorAll('output')).toHaveLength(1)

      await waitFor(() => {
        expect(output()).toHaveTextContent('Step 2')
        expect(document.querySelectorAll('output')).toHaveLength(1)
      })

      await userEvent.click(previousButton())

      expect(document.querySelectorAll('output')).toHaveLength(1)

      await waitFor(() => {
        expect(output()).toHaveTextContent('Step 1')
        expect(document.querySelectorAll('output')).toHaveLength(1)
      })
    })

    it('should support navigating back and forth and only show one step at a time', async () => {
      const Step1 = () => (
        <Wizard.Step title="Step 1">
          <output>Step 1</output>
          <Wizard.Buttons />
        </Wizard.Step>
      )

      const Step2 = () => (
        <Wizard.Step title="Step 2">
          <output>Step 2</output>
          <Wizard.Buttons />
        </Wizard.Step>
      )

      const Summary = () => {
        const { summaryTitle } = Form.useTranslation().Step
        return (
          <Wizard.Step title={summaryTitle}>
            <output>Summary</output>
            <Wizard.Buttons />
          </Wizard.Step>
        )
      }

      const onStepChange = async (step, mode) => {
        if (mode === 'next') {
          await wait(100)
        }
      }

      render(
        <React.StrictMode>
          <Form.Handler>
            <Wizard.Container onStepChange={onStepChange}>
              <Step1 />
              <Step2 />
              <Summary />
            </Wizard.Container>
          </Form.Handler>
        </React.StrictMode>
      )

      expect(output()).toHaveTextContent('Step 1')
      expect(document.querySelectorAll('output')).toHaveLength(1)

      await userEvent.click(nextButton())

      expect(document.querySelectorAll('output')).toHaveLength(1)

      await waitFor(() => {
        expect(output()).toHaveTextContent('Step 2')
        expect(document.querySelectorAll('output')).toHaveLength(1)
      })

      await userEvent.click(nextButton())

      expect(document.querySelectorAll('output')).toHaveLength(1)

      await waitFor(() => {
        expect(output()).toHaveTextContent('Summary')
        expect(document.querySelectorAll('output')).toHaveLength(1)
      })

      await userEvent.click(previousButton())

      expect(document.querySelectorAll('output')).toHaveLength(1)

      await waitFor(() => {
        expect(output()).toHaveTextContent('Step 2')
        expect(document.querySelectorAll('output')).toHaveLength(1)
      })

      await userEvent.click(previousButton())

      expect(document.querySelectorAll('output')).toHaveLength(1)

      await waitFor(() => {
        expect(output()).toHaveTextContent('Step 1')
        expect(document.querySelectorAll('output')).toHaveLength(1)
      })
    })

    it('should support the Translation component for titles', async () => {
      const Step1 = () => (
        <Wizard.Step title={<Translation id="wizard.step1" />}>
          <output>Step 1</output>
          <Wizard.Buttons />
        </Wizard.Step>
      )

      const Step2 = () => (
        <Wizard.Step title={<Translation id="wizard.step2" />}>
          <output>Step 2</output>
          <Wizard.Buttons />
        </Wizard.Step>
      )

      const Summary = () => {
        const { summaryTitle } = Form.useTranslation().Step
        return (
          <Wizard.Step title={summaryTitle}>
            <output>Summary</output>
            <Wizard.Buttons />
          </Wizard.Step>
        )
      }

      const onStepChange = async (step, mode) => {
        if (mode === 'next') {
          await wait(100)
        }
      }

      render(
        <React.StrictMode>
          <Form.Handler>
            <Wizard.Container
              expandedInitially
              onStepChange={onStepChange}
            >
              <Step1 />
              <Step2 />
              <Summary />
            </Wizard.Container>
          </Form.Handler>
        </React.StrictMode>
      )

      expect(screen.getAllByText('wizard.step1')).toHaveLength(2)
      expect(screen.getByText('wizard.step2')).toBeInTheDocument()

      expect(output()).toHaveTextContent('Step 1')
      expect(document.querySelectorAll('output')).toHaveLength(1)

      await userEvent.click(nextButton())

      expect(document.querySelectorAll('output')).toHaveLength(1)

      await waitFor(() => {
        expect(output()).toHaveTextContent('Step 2')
        expect(document.querySelectorAll('output')).toHaveLength(1)
      })

      await userEvent.click(nextButton())

      expect(document.querySelectorAll('output')).toHaveLength(1)

      await waitFor(() => {
        expect(output()).toHaveTextContent('Summary')
        expect(document.querySelectorAll('output')).toHaveLength(1)
      })

      await userEvent.click(previousButton())

      expect(document.querySelectorAll('output')).toHaveLength(1)

      await waitFor(() => {
        expect(output()).toHaveTextContent('Step 2')
        expect(document.querySelectorAll('output')).toHaveLength(1)
      })

      await userEvent.click(previousButton())

      expect(document.querySelectorAll('output')).toHaveLength(1)

      await waitFor(() => {
        expect(output()).toHaveTextContent('Step 1')
        expect(document.querySelectorAll('output')).toHaveLength(1)
      })
    })
  })

  it('should support navigating back and forth with async validators', async () => {
    const onChangeValidator = async (value: string) => {
      if (value !== 'valid') {
        return new Error('onChangeValidator-error')
      }
    }

    const onBlurValidator = async (value: string) => {
      if (value !== 'valid') {
        return new Error('onBlurValidator-error')
      }
    }

    render(
      <Wizard.Container omitFocusManagement expandedInitially>
        <Wizard.Step title="Step 1">
          <output>Step 1</output>
          <Field.String
            path="/foo"
            required
            onChangeValidator={onChangeValidator}
            onBlurValidator={onBlurValidator}
          />
          <Wizard.PreviousButton />
          <Wizard.NextButton />
        </Wizard.Step>

        <Wizard.Step title="Step 2">
          <output>Step 2</output>
          <Field.String path="/bar" required />
          <Wizard.PreviousButton />
          <Wizard.NextButton />
        </Wizard.Step>

        <Wizard.Step title="Step 3">
          <Wizard.PreviousButton />
        </Wizard.Step>
      </Wizard.Container>
    )

    const input = () => document.querySelector('input')

    const [, secondStep] = Array.from(
      document.querySelectorAll('.dnb-step-indicator__item')
    )
    expect(output()).toHaveTextContent('Step 1')
    expect(document.querySelector('.dnb-form-status')).toBeNull()

    await userEvent.click(nextButton())

    expect(output()).toHaveTextContent('Step 1')
    expect(document.querySelector('.dnb-form-status')).toHaveTextContent(
      nb.Field.errorRequired
    )

    await userEvent.type(input(), 'invalid')
    fireEvent.click(nextButton())

    expect(output()).toHaveTextContent('Step 1')
    expect(document.querySelector('.dnb-form-status')).toHaveTextContent(
      'onChangeValidator-error'
    )

    fireEvent.blur(input())

    await waitFor(() => {
      expect(output()).toHaveTextContent('Step 1')
      expect(document.querySelector('.dnb-form-status')).toHaveTextContent(
        'onBlurValidator-error'
      )
    })

    fireEvent.change(input(), { target: { value: 'valid' } })
    await userEvent.click(nextButton())

    expect(output()).toHaveTextContent('Step 2')
    expect(document.querySelector('.dnb-form-status')).toBeNull()

    await userEvent.click(nextButton())

    expect(output()).toHaveTextContent('Step 2')
    expect(document.querySelector('.dnb-form-status')).toHaveTextContent(
      nb.Field.errorRequired
    )

    await userEvent.click(previousButton())

    expect(output()).toHaveTextContent('Step 1')
    expect(document.querySelectorAll('.dnb-form-status')).toHaveLength(1)
    expect(secondStep.querySelector('.dnb-form-status')).toHaveTextContent(
      nb.Step.stepHasError
    )

    await userEvent.type(input(), '{Backspace>8}invalid')
    fireEvent.click(nextButton())

    expect(output()).toHaveTextContent('Step 1')
    expect(document.querySelectorAll('.dnb-form-status')).toHaveLength(2)
    expect(secondStep.querySelector('.dnb-form-status')).toHaveTextContent(
      nb.Step.stepHasError
    )
    expect(content().querySelector('.dnb-form-status')).toHaveTextContent(
      'onChangeValidator-error'
    )

    fireEvent.blur(input())

    await waitFor(() => {
      expect(output()).toHaveTextContent('Step 1')
      expect(
        content().querySelector('.dnb-form-status')
      ).toHaveTextContent('onBlurValidator-error')
    })

    fireEvent.change(input(), { target: { value: 'valid' } })
    await userEvent.click(nextButton())

    expect(output()).toHaveTextContent('Step 2')
    expect(document.querySelectorAll('.dnb-form-status')).toHaveLength(1)
    expect(document.querySelector('.dnb-form-status')).toHaveTextContent(
      nb.Field.errorRequired
    )
  }, 20000)

  it('should set initialActiveIndex initially but not react on changes', () => {
    const { rerender } = render(
      <Wizard.Container initialActiveIndex={1}>
        <Wizard.Step title="Step 1">
          <output>Step 1</output>
        </Wizard.Step>

        <Wizard.Step title="Step 2">
          <output>Step 2</output>
        </Wizard.Step>

        <Wizard.Step title="Step 3">
          <output>Step 3</output>
        </Wizard.Step>
      </Wizard.Container>
    )

    expect(output()).toHaveTextContent('Step 2')

    rerender(
      <Wizard.Container initialActiveIndex={2}>
        <Wizard.Step title="Step 1">
          <output>Step 1</output>
        </Wizard.Step>

        <Wizard.Step title="Step 2">
          <output>Step 2</output>
        </Wizard.Step>

        <Wizard.Step title="Step 3">
          <output>Step 3</output>
        </Wizard.Step>
      </Wizard.Container>
    )

    expect(output()).toHaveTextContent('Step 2')
  })

  it('supports wizard layout to be in their own components', async () => {
    let context = null

    const Step1 = () => {
      context = Wizard.useStep()
      return (
        <Wizard.Step title="Step 1">
          <output>Step 1</output>
          <Wizard.Buttons />
        </Wizard.Step>
      )
    }

    const Step2 = () => {
      return (
        <Wizard.Step title="Step 2">
          <output>Step 2</output>
          <Wizard.Buttons />
        </Wizard.Step>
      )
    }
    const Step3 = () => {
      return (
        <Wizard.Step title="Step 3">
          <output>Step 3</output>
          <Wizard.Buttons />
        </Wizard.Step>
      )
    }

    const { rerender } = render(
      <Wizard.Container aria-label="step 1">
        <Step1 />
        <Step2 />
        <Step3 />
      </Wizard.Container>
    )

    expect(output()).toHaveTextContent('Step 1')
    expect(context.activeIndex).toBe(0)

    rerender(
      <Wizard.Container aria-label="step 2">
        <Step1 />
        <Step2 />
        <Step3 />
      </Wizard.Container>
    )
    await userEvent.click(nextButton())

    expect(output()).toHaveTextContent('Step 2')
    expect(context.activeIndex).toBe(1)

    rerender(
      <Wizard.Container aria-label="step 3">
        <Step1 />
        <Step2 />
        <Step3 />
      </Wizard.Container>
    )
    await userEvent.click(nextButton())

    expect(output()).toHaveTextContent('Step 3')
    expect(context.activeIndex).toBe(2)
  })

  it('should trigger next step when submitting the form', async () => {
    const onSubmit: OnSubmit = jest.fn()
    const onStepChange = jest.fn()

    render(
      <Form.Handler onSubmit={onSubmit}>
        <Wizard.Container onStepChange={onStepChange} mode="loose">
          <Wizard.Step title="Step 1">
            <output>Step 1</output>
            <Wizard.NextButton />
          </Wizard.Step>

          <Wizard.Step title="Step 2">
            <output>Step 2</output>
            <Wizard.PreviousButton />
            <Wizard.NextButton />
          </Wizard.Step>

          <Wizard.Step title="Step 3">
            <output>Step 3</output>
            <Form.SubmitButton />
          </Wizard.Step>
        </Wizard.Container>
      </Form.Handler>
    )

    expect(output()).toHaveTextContent('Step 1')

    const form = document.querySelector('form')

    fireEvent.submit(form)

    expect(onSubmit).toHaveBeenCalledTimes(0)
    expect(onStepChange).toHaveBeenCalledTimes(1)
    await waitFor(() => {
      expect(output()).toHaveTextContent('Step 2')
    })

    fireEvent.submit(form)

    expect(onSubmit).toHaveBeenCalledTimes(0)
    expect(onStepChange).toHaveBeenCalledTimes(2)
    await waitFor(() => {
      expect(output()).toHaveTextContent('Step 3')
    })

    fireEvent.submit(form)

    expect(onSubmit).toHaveBeenCalledTimes(1)
    expect(onStepChange).toHaveBeenCalledTimes(2)
    expect(output()).toHaveTextContent('Step 3')
  })

  it('should keep current step on rerender', async () => {
    const onStepChange = jest.fn()

    render(
      <Form.Handler>
        <Wizard.Container mode="loose" onStepChange={onStepChange}>
          <Wizard.Step title="Step 1">
            <output>Step 1</output>
            <button
              type="button" // needed in order to not submit the form
              id="not-submit"
            >
              not-submit
            </button>
            <button
              // no type is defined
              id="submit"
            >
              submit
            </button>
          </Wizard.Step>

          <Wizard.Step title="Step 2">
            <output>Step 2</output>
          </Wizard.Step>
        </Wizard.Container>
      </Form.Handler>
    )

    expect(output()).toHaveTextContent('Step 1')

    await userEvent.click(document.querySelector('#not-submit'))

    expect(output()).toHaveTextContent('Step 1')
    expect(onStepChange).toHaveBeenCalledTimes(0)

    await userEvent.click(document.querySelector('#submit'))

    expect(output()).toHaveTextContent('Step 2')
    expect(onStepChange).toHaveBeenCalledTimes(1)
  })

  describe('dynamic steps', () => {
    it('should not render excluded steps', async () => {
      render(
        <Wizard.Container mode="loose">
          <Wizard.Step title="Step 1" include={false}>
            <output>Step 1</output>
          </Wizard.Step>

          <Wizard.Step title="Step 2">
            <output>Step 2</output>
          </Wizard.Step>
        </Wizard.Container>
      )

      expect(output()).toHaveTextContent('Step 2')

      await expandStepIndicator()

      expect(
        document.querySelectorAll('.dnb-step-indicator__item')
      ).toHaveLength(1)
    })

    it('should render dynamically enabled steps', async () => {
      const { rerender } = render(
        <Wizard.Container mode="loose">
          <Wizard.Step title="Step 1" include={false}>
            <output>Step 1</output>
          </Wizard.Step>

          <Wizard.Step title="Step 2">
            <output>Step 2</output>
          </Wizard.Step>
        </Wizard.Container>
      )

      expect(output()).toHaveTextContent('Step 2')
      expect(
        document.querySelector('.dnb-step-indicator')
      ).toHaveTextContent('Steg 1 av 1')
      expect(
        document.querySelector('.dnb-step-indicator__trigger__button')
      ).toHaveTextContent('Step 2')

      await expandStepIndicator()
      expect(
        document.querySelectorAll('.dnb-step-indicator__item')
      ).toHaveLength(1)

      rerender(
        <Wizard.Container mode="loose">
          <Wizard.Step title="Step 1">
            <output>Step 1</output>
            <Field.String path="/something" />
          </Wizard.Step>

          <Wizard.Step title="Step 2">
            <output>Step 2</output>
          </Wizard.Step>
        </Wizard.Container>
      )

      expect(output()).toHaveTextContent('Step 1')
      expect(
        document.querySelector('.dnb-step-indicator')
      ).toHaveTextContent('Steg 2 av 2')
      expect(
        document.querySelector('.dnb-step-indicator__trigger__button')
      ).toHaveTextContent('Step 1')

      expect(
        document.querySelectorAll('.dnb-step-indicator__item')
      ).toHaveLength(2)

      rerender(
        <Wizard.Container mode="loose">
          <Wizard.Step title="Step 1" include={false}>
            <output>Step 1</output>
            <Field.String path="/something" />
          </Wizard.Step>

          <Wizard.Step title="Step 2">
            <output>Step 2</output>
          </Wizard.Step>
        </Wizard.Container>
      )

      expect(output()).toHaveTextContent('Step 2')
      expect(
        document.querySelector('.dnb-step-indicator')
      ).toHaveTextContent('Steg 1 av 1')
      expect(
        document.querySelector('.dnb-step-indicator__trigger__button')
      ).toHaveTextContent('Step 2')

      expect(
        document.querySelectorAll('.dnb-step-indicator__item')
      ).toHaveLength(1)

      rerender(
        <Wizard.Container mode="loose">
          <Wizard.Step title="Step 1" include={false}>
            <output>Step 1</output>
            <Field.String path="/something" />
          </Wizard.Step>

          <Wizard.Step title="Step 2" include={false}>
            <output>Step 2</output>
          </Wizard.Step>
        </Wizard.Container>
      )

      expect(output()).toBeNull()
      expect(
        document.querySelector('.dnb-step-indicator')
      ).toHaveTextContent('Steg 1 av 1')
      expect(
        document.querySelector('.dnb-step-indicator__trigger__button')
      ).toHaveTextContent('')
      expect(
        document.querySelectorAll('.dnb-step-indicator__item')
      ).toHaveLength(0)
    })

    it('should update include steps without rerendering', async () => {
      const initialData = {
        showStep1: true,
        showStep2: true,
      }

      const Step1 = () => {
        const { data } = Form.useData<typeof initialData>()
        return (
          <Wizard.Step title="Step 1" include={data?.showStep1}>
            <output>Step 1</output>
            <Field.Boolean id="toggleStep2" path="/showStep2" />
            <Wizard.Buttons />
          </Wizard.Step>
        )
      }

      const Step2 = () => {
        const { data } = Form.useData<typeof initialData>()
        return (
          <Wizard.Step title="Step 2" include={data?.showStep2}>
            <output>Step 2</output>
            <Field.Boolean id="toggleStep1" path="/showStep1" />
            <Wizard.Buttons />
          </Wizard.Step>
        )
      }

      const MyForm = () => {
        return (
          <Form.Handler defaultData={initialData}>
            <Wizard.Container>
              <Step1 />
              <Step2 />
            </Wizard.Container>
          </Form.Handler>
        )
      }

      render(<MyForm />)

      expect(output()).toHaveTextContent('Step 1')
      await expandStepIndicator()
      expect(
        document.querySelectorAll('.dnb-step-indicator__item')
      ).toHaveLength(2)
      expect(previousButton()).toBeNull()
      expect(nextButton()).toBeInTheDocument()

      await userEvent.click(document.querySelector('#toggleStep2'))

      expect(output()).toHaveTextContent('Step 1')
      expect(
        document.querySelectorAll('.dnb-step-indicator__item')
      ).toHaveLength(1)
      expect(previousButton()).toBeNull()
      expect(nextButton()).not.toBeInTheDocument()

      await userEvent.click(document.querySelector('#toggleStep2'))

      expect(
        document.querySelectorAll('.dnb-step-indicator__item')
      ).toHaveLength(2)
      expect(previousButton()).toBeNull()
      expect(nextButton()).toBeInTheDocument()
    })

    it('should not render excluded steps based on paths and includeWhen', async () => {
      render(
        <Form.Handler
          data={{
            enabledStep: 'does not match',
          }}
        >
          <Wizard.Container mode="loose">
            <Wizard.Step
              title="Step 1"
              includeWhen={{ path: '/enabledStep', hasValue: 'match me' }}
            >
              <output>Step 1</output>
            </Wizard.Step>

            <Wizard.Step title="Step 2">
              <output>Step 2</output>
            </Wizard.Step>
          </Wizard.Container>
        </Form.Handler>
      )
      await expandStepIndicator()
      expect(output()).toHaveTextContent('Step 2')
      expect(
        document.querySelectorAll('.dnb-step-indicator__item')
      ).toHaveLength(1)
    })

    it('should render excluded steps based on paths and includeWhen with hasValue', async () => {
      render(
        <Form.Handler defaultData={{ enabledStep: 'group-1' }}>
          <Wizard.Container mode="loose">
            <Wizard.Step
              title="Step 1"
              includeWhen={{
                path: '/enabledStep',
                hasValue: (value) => {
                  return value === 'group-1'
                },
              }}
            >
              <output>Step 1</output>
            </Wizard.Step>

            <Wizard.Step title="Step 2">
              <output>Step 2</output>
            </Wizard.Step>
          </Wizard.Container>
        </Form.Handler>
      )

      await expandStepIndicator()
      expect(output()).toHaveTextContent('Step 1')
      expect(
        document.querySelectorAll('.dnb-step-indicator__item')
      ).toHaveLength(2)
    })

    it('should render dynamically enabled steps based on paths and includeWhen', async () => {
      render(
        <Form.Handler defaultData={{ enabledStep: 'group-2' }}>
          <Field.Selection path="/enabledStep" variant="button">
            <Field.Option value="group-1" title="1" />
            <Field.Option value="group-2" title="2" />
            <Field.Option value="invalid" title="invalid" />
          </Field.Selection>

          <Wizard.Container mode="loose">
            <Wizard.Step
              title="Step 1"
              includeWhen={{ path: '/enabledStep', hasValue: 'group-1' }}
            >
              <output>Step 1</output>
              <Wizard.Buttons />
            </Wizard.Step>

            <Wizard.Step
              title="Step 2"
              includeWhen={{ path: '/enabledStep', hasValue: 'group-2' }}
            >
              <output>Step 2</output>
              <Wizard.Buttons />
            </Wizard.Step>

            <Wizard.Step
              title="Step 3"
              includeWhen={{
                path: '/enabledStep',
                hasValue: (value) => {
                  return value === 'group-1'
                },
              }}
            >
              <output>Step 3</output>
              <Wizard.Buttons />
            </Wizard.Step>
          </Wizard.Container>
        </Form.Handler>
      )

      await expandStepIndicator()
      const [groupOne, groupTwo] = Array.from(
        document.querySelectorAll('.dnb-toggle-button button')
      )

      expect(output()).toHaveTextContent('Step 2')
      expect(
        document.querySelector('.dnb-step-indicator')
      ).toHaveTextContent('Steg 1 av 1')
      expect(
        document.querySelectorAll('.dnb-step-indicator__item')
      ).toHaveLength(1)
      expect(previousButton()).toBeNull()
      expect(nextButton()).toBeNull()

      await userEvent.click(groupOne)

      expect(output()).toHaveTextContent('Step 1')
      expect(
        document.querySelector('.dnb-step-indicator')
      ).toHaveTextContent('Steg 1 av 2')
      expect(
        document.querySelectorAll('.dnb-step-indicator__item')
      ).toHaveLength(2)
      expect(previousButton()).toBeNull()
      expect(nextButton()).toBeInTheDocument()

      await userEvent.click(groupTwo)

      expect(output()).toHaveTextContent('Step 2')
      expect(
        document.querySelector('.dnb-step-indicator')
      ).toHaveTextContent('Steg 1 av 1')
      expect(
        document.querySelectorAll('.dnb-step-indicator__item')
      ).toHaveLength(1)
      expect(previousButton()).toBeNull()
      expect(nextButton()).toBeNull()

      await userEvent.click(
        document.querySelectorAll('.dnb-toggle-button button')[2]
      )

      expect(output()).toBeNull()
      expect(
        document.querySelector('.dnb-step-indicator__trigger__button')
      ).toHaveTextContent('')
      expect(
        document.querySelectorAll('.dnb-step-indicator__item')
      ).toHaveLength(0)
      expect(previousButton()).toBeNull()
      expect(nextButton()).toBeNull()
    })

    it('should provide "id" prop and "same" mode in "onStepChange"', async () => {
      const onStepChange = jest.fn(async () => null)

      render(
        <Form.Handler defaultData={{ enabledStep: 'group-2' }}>
          <Field.Selection path="/enabledStep" variant="button">
            <Field.Option value="group-1" title="1" />
            <Field.Option value="group-2" title="2" />
          </Field.Selection>

          <Wizard.Container mode="loose" onStepChange={onStepChange}>
            <Wizard.Step
              title="Step 1"
              id="step-1"
              includeWhen={{ path: '/enabledStep', hasValue: 'group-1' }}
            >
              <output>Step 1</output>
              <Wizard.Buttons />
            </Wizard.Step>

            <Wizard.Step
              title="Step 2"
              id="step-2"
              includeWhen={{ path: '/enabledStep', hasValue: 'group-2' }}
            >
              <output>Step 2</output>
              <Wizard.Buttons />
            </Wizard.Step>

            <Wizard.Step
              title="Step 3"
              id="step-3"
              includeWhen={{ path: '/enabledStep', hasValue: 'group-1' }}
            >
              <output>Step 3</output>
              <Wizard.Buttons />
            </Wizard.Step>
          </Wizard.Container>
        </Form.Handler>
      )

      expect(output()).toHaveTextContent('Step 2')
      expect(onStepChange).toHaveBeenCalledTimes(0)

      const [groupOne, groupTwo] = Array.from(
        document.querySelectorAll('.dnb-toggle-button button')
      )

      await userEvent.click(groupOne)

      expect(output()).toHaveTextContent('Step 1')
      expect(onStepChange).toHaveBeenCalledTimes(1)
      expect(onStepChange).toHaveBeenLastCalledWith(
        0,
        'stepListModified',
        {
          id: 'step-1',
          previousStep: { index: 0, id: 'step-1' },
          preventNavigation: expect.any(Function),
        }
      )

      await userEvent.click(groupTwo)

      expect(output()).toHaveTextContent('Step 2')
      expect(onStepChange).toHaveBeenCalledTimes(2)
      expect(onStepChange).toHaveBeenLastCalledWith(
        0,
        'stepListModified',
        {
          id: 'step-2',
          previousStep: { index: 0, id: 'step-2' },
          preventNavigation: expect.any(Function),
        }
      )

      await userEvent.click(groupOne)

      expect(output()).toHaveTextContent('Step 1')
      expect(onStepChange).toHaveBeenCalledTimes(3)
      expect(onStepChange).toHaveBeenLastCalledWith(
        0,
        'stepListModified',
        {
          id: 'step-1',
          previousStep: { index: 0, id: 'step-1' },
          preventNavigation: expect.any(Function),
        }
      )

      await userEvent.click(nextButton())

      expect(output()).toHaveTextContent('Step 3')
      expect(onStepChange).toHaveBeenCalledTimes(4)
      expect(onStepChange).toHaveBeenLastCalledWith(1, 'next', {
        id: 'step-3',
        previousStep: { index: 0, id: 'step-1' },
        preventNavigation: expect.any(Function),
      })

      await userEvent.click(groupTwo)

      expect(output()).toHaveTextContent('Step 2')
      expect(onStepChange).toHaveBeenCalledTimes(5)
      expect(onStepChange).toHaveBeenLastCalledWith(
        0,
        'stepListModified',
        {
          id: 'step-2',
          previousStep: { index: 0, id: 'step-2' },
          preventNavigation: expect.any(Function),
        }
      )

      await userEvent.click(groupOne)

      expect(output()).toHaveTextContent('Step 1')
      expect(onStepChange).toHaveBeenCalledTimes(6)
      expect(onStepChange).toHaveBeenLastCalledWith(
        0,
        'stepListModified',
        {
          id: 'step-1',
          previousStep: { index: 0, id: 'step-1' },
          preventNavigation: expect.any(Function),
        }
      )

      await userEvent.click(nextButton())

      expect(output()).toHaveTextContent('Step 3')
      expect(onStepChange).toHaveBeenCalledTimes(7)
      expect(onStepChange).toHaveBeenLastCalledWith(1, 'next', {
        id: 'step-3',
        previousStep: { index: 0, id: 'step-1' },
        preventNavigation: expect.any(Function),
      })

      await userEvent.click(previousButton())

      expect(output()).toHaveTextContent('Step 1')
      expect(onStepChange).toHaveBeenCalledTimes(8)
      expect(onStepChange).toHaveBeenLastCalledWith(0, 'previous', {
        id: 'step-1',
        previousStep: { index: 1, id: 'step-3' },
        preventNavigation: expect.any(Function),
      })
    })
  })

  // Deprecated – active and activeWhen is replaced with include and includeWhen - can be removed in v11
  describe('dynamic steps - active & activeWhen', () => {
    it('should not render inactive steps', async () => {
      render(
        <Wizard.Container mode="loose">
          <Wizard.Step title="Step 1" active={false}>
            <output>Step 1</output>
          </Wizard.Step>

          <Wizard.Step title="Step 2">
            <output>Step 2</output>
          </Wizard.Step>
        </Wizard.Container>
      )

      expect(output()).toHaveTextContent('Step 2')

      await expandStepIndicator()

      expect(
        document.querySelectorAll('.dnb-step-indicator__item')
      ).toHaveLength(1)
    })

    it('should render dynamically enabled steps', async () => {
      const { rerender } = render(
        <Wizard.Container mode="loose">
          <Wizard.Step title="Step 1" active={false}>
            <output>Step 1</output>
          </Wizard.Step>

          <Wizard.Step title="Step 2">
            <output>Step 2</output>
          </Wizard.Step>
        </Wizard.Container>
      )

      expect(output()).toHaveTextContent('Step 2')
      expect(
        document.querySelector('.dnb-step-indicator')
      ).toHaveTextContent('Steg 1 av 1')
      expect(
        document.querySelector('.dnb-step-indicator__trigger__button')
      ).toHaveTextContent('Step 2')

      await expandStepIndicator()
      expect(
        document.querySelectorAll('.dnb-step-indicator__item')
      ).toHaveLength(1)

      rerender(
        <Wizard.Container mode="loose">
          <Wizard.Step title="Step 1">
            <output>Step 1</output>
            <Field.String path="/something" />
          </Wizard.Step>

          <Wizard.Step title="Step 2">
            <output>Step 2</output>
          </Wizard.Step>
        </Wizard.Container>
      )

      expect(output()).toHaveTextContent('Step 1')
      expect(
        document.querySelector('.dnb-step-indicator')
      ).toHaveTextContent('Steg 2 av 2')
      expect(
        document.querySelector('.dnb-step-indicator__trigger__button')
      ).toHaveTextContent('Step 1')

      expect(
        document.querySelectorAll('.dnb-step-indicator__item')
      ).toHaveLength(2)

      rerender(
        <Wizard.Container mode="loose">
          <Wizard.Step title="Step 1" active={false}>
            <output>Step 1</output>
            <Field.String path="/something" />
          </Wizard.Step>

          <Wizard.Step title="Step 2">
            <output>Step 2</output>
          </Wizard.Step>
        </Wizard.Container>
      )

      expect(output()).toHaveTextContent('Step 2')
      expect(
        document.querySelector('.dnb-step-indicator')
      ).toHaveTextContent('Steg 1 av 1')
      expect(
        document.querySelector('.dnb-step-indicator__trigger__button')
      ).toHaveTextContent('Step 2')

      expect(
        document.querySelectorAll('.dnb-step-indicator__item')
      ).toHaveLength(1)

      rerender(
        <Wizard.Container mode="loose">
          <Wizard.Step title="Step 1" active={false}>
            <output>Step 1</output>
            <Field.String path="/something" />
          </Wizard.Step>

          <Wizard.Step title="Step 2" active={false}>
            <output>Step 2</output>
          </Wizard.Step>
        </Wizard.Container>
      )

      expect(output()).toBeNull()
      expect(
        document.querySelector('.dnb-step-indicator')
      ).toHaveTextContent('Steg 1 av 1')
      expect(
        document.querySelector('.dnb-step-indicator__trigger__button')
      ).toHaveTextContent('')
      expect(
        document.querySelectorAll('.dnb-step-indicator__item')
      ).toHaveLength(0)
    })

    it('should update active steps without rerendering', async () => {
      const initialData = {
        showStep1: true,
        showStep2: true,
      }

      const Step1 = () => {
        const { data } = Form.useData<typeof initialData>()
        return (
          <Wizard.Step title="Step 1" active={data?.showStep1}>
            <output>Step 1</output>
            <Field.Boolean id="toggleStep2" path="/showStep2" />
            <Wizard.Buttons />
          </Wizard.Step>
        )
      }

      const Step2 = () => {
        const { data } = Form.useData<typeof initialData>()
        return (
          <Wizard.Step title="Step 2" active={data?.showStep2}>
            <output>Step 2</output>
            <Field.Boolean id="toggleStep1" path="/showStep1" />
            <Wizard.Buttons />
          </Wizard.Step>
        )
      }

      const MyForm = () => {
        return (
          <Form.Handler defaultData={initialData}>
            <Wizard.Container>
              <Step1 />
              <Step2 />
            </Wizard.Container>
          </Form.Handler>
        )
      }

      render(<MyForm />)

      expect(output()).toHaveTextContent('Step 1')
      await expandStepIndicator()
      expect(
        document.querySelectorAll('.dnb-step-indicator__item')
      ).toHaveLength(2)
      expect(previousButton()).toBeNull()
      expect(nextButton()).toBeInTheDocument()

      await userEvent.click(document.querySelector('#toggleStep2'))

      expect(output()).toHaveTextContent('Step 1')
      expect(
        document.querySelectorAll('.dnb-step-indicator__item')
      ).toHaveLength(1)
      expect(previousButton()).toBeNull()
      expect(nextButton()).not.toBeInTheDocument()

      await userEvent.click(document.querySelector('#toggleStep2'))

      expect(
        document.querySelectorAll('.dnb-step-indicator__item')
      ).toHaveLength(2)
      expect(previousButton()).toBeNull()
      expect(nextButton()).toBeInTheDocument()
    })

    it('should not render inactive steps based on paths and activeWhen', async () => {
      render(
        <Form.Handler
          data={{
            enabledStep: 'does not match',
          }}
        >
          <Wizard.Container mode="loose">
            <Wizard.Step
              title="Step 1"
              activeWhen={{ path: '/enabledStep', hasValue: 'match me' }}
            >
              <output>Step 1</output>
            </Wizard.Step>

            <Wizard.Step title="Step 2">
              <output>Step 2</output>
            </Wizard.Step>
          </Wizard.Container>
        </Form.Handler>
      )
      await expandStepIndicator()
      expect(output()).toHaveTextContent('Step 2')
      expect(
        document.querySelectorAll('.dnb-step-indicator__item')
      ).toHaveLength(1)
    })

    it('should render inactive steps based on paths and activeWhen with hasValue', async () => {
      render(
        <Form.Handler defaultData={{ enabledStep: 'group-1' }}>
          <Wizard.Container mode="loose">
            <Wizard.Step
              title="Step 1"
              activeWhen={{
                path: '/enabledStep',
                hasValue: (value) => {
                  return value === 'group-1'
                },
              }}
            >
              <output>Step 1</output>
            </Wizard.Step>

            <Wizard.Step title="Step 2">
              <output>Step 2</output>
            </Wizard.Step>
          </Wizard.Container>
        </Form.Handler>
      )
      await expandStepIndicator()
      expect(output()).toHaveTextContent('Step 1')
      expect(
        document.querySelectorAll('.dnb-step-indicator__item')
      ).toHaveLength(2)
    })

    it('should render dynamically enabled steps based on paths and activeWhen', async () => {
      render(
        <Form.Handler defaultData={{ enabledStep: 'group-2' }}>
          <Field.Selection path="/enabledStep" variant="button">
            <Field.Option value="group-1" title="1" />
            <Field.Option value="group-2" title="2" />
            <Field.Option value="invalid" title="invalid" />
          </Field.Selection>

          <Wizard.Container mode="loose">
            <Wizard.Step
              title="Step 1"
              activeWhen={{ path: '/enabledStep', hasValue: 'group-1' }}
            >
              <output>Step 1</output>
              <Wizard.Buttons />
            </Wizard.Step>

            <Wizard.Step
              title="Step 2"
              activeWhen={{ path: '/enabledStep', hasValue: 'group-2' }}
            >
              <output>Step 2</output>
              <Wizard.Buttons />
            </Wizard.Step>

            <Wizard.Step
              title="Step 3"
              activeWhen={{
                path: '/enabledStep',
                hasValue: (value) => {
                  return value === 'group-1'
                },
              }}
            >
              <output>Step 3</output>
              <Wizard.Buttons />
            </Wizard.Step>
          </Wizard.Container>
        </Form.Handler>
      )

      await expandStepIndicator()
      const [groupOne, groupTwo] = Array.from(
        document.querySelectorAll('.dnb-toggle-button button')
      )

      expect(output()).toHaveTextContent('Step 2')
      expect(
        document.querySelector('.dnb-step-indicator')
      ).toHaveTextContent('Steg 1 av 1')
      expect(
        document.querySelectorAll('.dnb-step-indicator__item')
      ).toHaveLength(1)
      expect(previousButton()).toBeNull()
      expect(nextButton()).toBeNull()

      await userEvent.click(groupOne)

      expect(output()).toHaveTextContent('Step 1')
      expect(
        document.querySelector('.dnb-step-indicator')
      ).toHaveTextContent('Steg 1 av 2')
      expect(
        document.querySelectorAll('.dnb-step-indicator__item')
      ).toHaveLength(2)
      expect(previousButton()).toBeNull()
      expect(nextButton()).toBeInTheDocument()

      await userEvent.click(groupTwo)

      expect(output()).toHaveTextContent('Step 2')
      expect(
        document.querySelector('.dnb-step-indicator')
      ).toHaveTextContent('Steg 1 av 1')
      expect(
        document.querySelectorAll('.dnb-step-indicator__item')
      ).toHaveLength(1)
      expect(previousButton()).toBeNull()
      expect(nextButton()).toBeNull()

      await userEvent.click(
        document.querySelectorAll('.dnb-toggle-button button')[2]
      )

      expect(output()).toBeNull()
      expect(
        document.querySelector('.dnb-step-indicator__trigger__button')
      ).toHaveTextContent('')
      expect(
        document.querySelectorAll('.dnb-step-indicator__item')
      ).toHaveLength(0)
      expect(previousButton()).toBeNull()
      expect(nextButton()).toBeNull()
    })

    it('should provide "id" prop and "same" mode in "onStepChange"', async () => {
      const onStepChange = jest.fn(async () => null)

      render(
        <Form.Handler defaultData={{ enabledStep: 'group-2' }}>
          <Field.Selection path="/enabledStep" variant="button">
            <Field.Option value="group-1" title="1" />
            <Field.Option value="group-2" title="2" />
          </Field.Selection>

          <Wizard.Container mode="loose" onStepChange={onStepChange}>
            <Wizard.Step
              title="Step 1"
              id="step-1"
              activeWhen={{ path: '/enabledStep', hasValue: 'group-1' }}
            >
              <output>Step 1</output>
              <Wizard.Buttons />
            </Wizard.Step>

            <Wizard.Step
              title="Step 2"
              id="step-2"
              activeWhen={{ path: '/enabledStep', hasValue: 'group-2' }}
            >
              <output>Step 2</output>
              <Wizard.Buttons />
            </Wizard.Step>

            <Wizard.Step
              title="Step 3"
              id="step-3"
              activeWhen={{ path: '/enabledStep', hasValue: 'group-1' }}
            >
              <output>Step 3</output>
              <Wizard.Buttons />
            </Wizard.Step>
          </Wizard.Container>
        </Form.Handler>
      )

      expect(output()).toHaveTextContent('Step 2')
      expect(onStepChange).toHaveBeenCalledTimes(0)

      const [groupOne, groupTwo] = Array.from(
        document.querySelectorAll('.dnb-toggle-button button')
      )

      await userEvent.click(groupOne)

      expect(output()).toHaveTextContent('Step 1')
      expect(onStepChange).toHaveBeenCalledTimes(1)
      expect(onStepChange).toHaveBeenLastCalledWith(
        0,
        'stepListModified',
        {
          id: 'step-1',
          previousStep: { index: 0, id: 'step-1' },
          preventNavigation: expect.any(Function),
        }
      )

      await userEvent.click(groupTwo)

      expect(output()).toHaveTextContent('Step 2')
      expect(onStepChange).toHaveBeenCalledTimes(2)
      expect(onStepChange).toHaveBeenLastCalledWith(
        0,
        'stepListModified',
        {
          id: 'step-2',
          previousStep: { index: 0, id: 'step-2' },
          preventNavigation: expect.any(Function),
        }
      )

      await userEvent.click(groupOne)

      expect(output()).toHaveTextContent('Step 1')
      expect(onStepChange).toHaveBeenCalledTimes(3)
      expect(onStepChange).toHaveBeenLastCalledWith(
        0,
        'stepListModified',
        {
          id: 'step-1',
          previousStep: { index: 0, id: 'step-1' },
          preventNavigation: expect.any(Function),
        }
      )

      await userEvent.click(nextButton())

      expect(output()).toHaveTextContent('Step 3')
      expect(onStepChange).toHaveBeenCalledTimes(4)
      expect(onStepChange).toHaveBeenLastCalledWith(1, 'next', {
        id: 'step-3',
        previousStep: { index: 0, id: 'step-1' },
        preventNavigation: expect.any(Function),
      })

      await userEvent.click(groupTwo)

      expect(output()).toHaveTextContent('Step 2')
      expect(onStepChange).toHaveBeenCalledTimes(5)
      expect(onStepChange).toHaveBeenLastCalledWith(
        0,
        'stepListModified',
        {
          id: 'step-2',
          previousStep: { index: 0, id: 'step-2' },
          preventNavigation: expect.any(Function),
        }
      )

      await userEvent.click(groupOne)

      expect(output()).toHaveTextContent('Step 1')
      expect(onStepChange).toHaveBeenCalledTimes(6)
      expect(onStepChange).toHaveBeenLastCalledWith(
        0,
        'stepListModified',
        {
          id: 'step-1',
          previousStep: { index: 0, id: 'step-1' },
          preventNavigation: expect.any(Function),
        }
      )

      await userEvent.click(nextButton())

      expect(output()).toHaveTextContent('Step 3')
      expect(onStepChange).toHaveBeenCalledTimes(7)
      expect(onStepChange).toHaveBeenLastCalledWith(1, 'next', {
        id: 'step-3',
        previousStep: { index: 0, id: 'step-1' },
        preventNavigation: expect.any(Function),
      })

      await userEvent.click(previousButton())

      expect(output()).toHaveTextContent('Step 1')
      expect(onStepChange).toHaveBeenCalledTimes(8)
      expect(onStepChange).toHaveBeenLastCalledWith(0, 'previous', {
        id: 'step-1',
        previousStep: { index: 1, id: 'step-3' },
        preventNavigation: expect.any(Function),
      })
    })
  })

  describe('async step change', () => {
    it('should disable and enable buttons', async () => {
      const onStepChange = async () => null

      render(
        <Wizard.Container onStepChange={onStepChange}>
          <Wizard.Step title="Step 1">
            <output>Step 1</output>
            <Form.ButtonRow>
              <Wizard.PreviousButton />
              <Wizard.NextButton />
            </Form.ButtonRow>
          </Wizard.Step>

          <Wizard.Step title="Step 2">
            <output>Step 2</output>
            <Form.ButtonRow>
              <Wizard.PreviousButton />
              <Wizard.NextButton />
            </Form.ButtonRow>
          </Wizard.Step>
        </Wizard.Container>
      )

      expect(output()).toHaveTextContent('Step 1')
      expect(previousButton()).toBeDisabled()
      expect(nextButton()).not.toBeDisabled()

      fireEvent.click(nextButton())

      expect(output()).toHaveTextContent('Step 1')
      expect(previousButton()).toBeDisabled()
      expect(nextButton()).toBeDisabled()

      await waitFor(() => {
        expect(output()).toHaveTextContent('Step 2')
        expect(previousButton()).not.toBeDisabled()
        expect(nextButton()).not.toBeDisabled()
      })

      fireEvent.click(previousButton())

      expect(output()).toHaveTextContent('Step 2')
      expect(previousButton()).toBeDisabled()
      expect(nextButton()).toBeDisabled()

      await waitFor(() => {
        expect(output()).toHaveTextContent('Step 1')
        expect(previousButton()).toBeDisabled()
        expect(nextButton()).not.toBeDisabled()
      })
    })

    it('should provide id prop in "onStepChange"', async () => {
      const onStepChange = jest.fn(async () => null)

      render(
        <Wizard.Container onStepChange={onStepChange} mode="loose">
          <Wizard.Step title="Step 1" id="step-1">
            <output>Step 1</output>
            <Wizard.Buttons />
          </Wizard.Step>

          <Wizard.Step title="Step 2" id="step-2">
            <output>Step 2</output>
            <Wizard.Buttons />
          </Wizard.Step>
        </Wizard.Container>
      )

      await expandStepIndicator()

      const [firstStep, secondStep] = Array.from(
        document.querySelectorAll('.dnb-step-indicator__item')
      )
      await userEvent.click(secondStep.querySelector('.dnb-anchor'))
      expect(output()).toHaveTextContent('Step 2')
      expect(onStepChange).toHaveBeenCalledTimes(1)
      expect(onStepChange).toHaveBeenLastCalledWith(1, 'next', {
        id: 'step-2',
        previousStep: { index: 0, id: 'step-1' },
        preventNavigation: expect.any(Function),
      })

      await userEvent.click(firstStep.querySelector('.dnb-anchor'))
      expect(output()).toHaveTextContent('Step 1')
      expect(onStepChange).toHaveBeenCalledTimes(2)
      expect(onStepChange).toHaveBeenLastCalledWith(0, 'previous', {
        id: 'step-1',
        previousStep: { index: 1, id: 'step-2' },
        preventNavigation: expect.any(Function),
      })

      await userEvent.click(nextButton())

      expect(onStepChange).toHaveBeenCalledTimes(3)
      expect(onStepChange).toHaveBeenLastCalledWith(1, 'next', {
        id: 'step-2',
        previousStep: { index: 0, id: 'step-1' },
        preventNavigation: expect.any(Function),
      })
    })

    it('should handle async onSubmit', async () => {
      const onSubmit = async () => null

      render(
        <Form.Handler onSubmit={onSubmit}>
          <Wizard.Container>
            <Wizard.Step title="Step 1">
              <output>Step 1</output>
              <Form.ButtonRow>
                <Wizard.PreviousButton />
                <Wizard.NextButton />
              </Form.ButtonRow>
            </Wizard.Step>

            <Wizard.Step title="Step 2">
              <output>Step 2</output>
              <Form.ButtonRow>
                <Wizard.PreviousButton />
                <Form.SubmitButton />
              </Form.ButtonRow>
            </Wizard.Step>
          </Wizard.Container>
        </Form.Handler>
      )

      expect(output()).toHaveTextContent('Step 1')
      expect(previousButton()).toBeDisabled()
      expect(nextButton()).not.toBeDisabled()

      fireEvent.click(nextButton())

      expect(output()).toHaveTextContent('Step 1')
      expect(previousButton()).toBeDisabled()
      expect(nextButton()).not.toBeDisabled()

      await waitFor(() => {
        expect(output()).toHaveTextContent('Step 2')
        expect(previousButton()).not.toBeDisabled()
        expect(submitButton()).not.toBeDisabled()
      })

      fireEvent.click(previousButton())

      expect(output()).toHaveTextContent('Step 2')
      expect(previousButton()).not.toBeDisabled()
      expect(submitButton()).not.toBeDisabled()

      await waitFor(() => {
        expect(output()).toHaveTextContent('Step 1')
        expect(previousButton()).toBeDisabled()
        expect(nextButton()).not.toBeDisabled()
      })

      fireEvent.click(nextButton())

      await waitFor(() => {
        expect(output()).toHaveTextContent('Step 2')
      })

      fireEvent.click(submitButton())

      expect(output()).toHaveTextContent('Step 2')
      expect(previousButton()).toBeDisabled()
      expect(submitButton()).toBeDisabled()

      await waitFor(() => {
        expect(output()).toHaveTextContent('Step 2')
        expect(previousButton()).not.toBeDisabled()
        expect(submitButton()).not.toBeDisabled()
      })
    })

    it('should handle async onChangeValidator', async () => {
      const asyncValidator = async () => null

      render(
        <Wizard.Container>
          <Wizard.Step title="Step 1">
            <output>Step 1</output>
            <Field.String
              value="Value"
              onChangeValidator={asyncValidator}
            />
            <Form.ButtonRow>
              <Wizard.PreviousButton />
              <Wizard.NextButton />
            </Form.ButtonRow>
          </Wizard.Step>

          <Wizard.Step title="Step 2">
            <output>Step 2</output>
            <Field.String required />
            <Form.ButtonRow>
              <Wizard.PreviousButton />
              <Wizard.NextButton />
            </Form.ButtonRow>
          </Wizard.Step>
        </Wizard.Container>
      )

      expect(output()).toHaveTextContent('Step 1')
      expect(previousButton()).toBeDisabled()
      expect(nextButton()).not.toBeDisabled()

      fireEvent.click(nextButton())

      expect(previousButton()).toBeDisabled()
      expect(nextButton()).toBeDisabled()

      await waitFor(() => {
        expect(output()).toHaveTextContent('Step 2')
        expect(previousButton()).not.toBeDisabled()
        expect(nextButton()).not.toBeDisabled()
      })

      fireEvent.click(previousButton())

      expect(output()).toHaveTextContent('Step 2')
      expect(previousButton()).not.toBeDisabled()
      expect(nextButton()).not.toBeDisabled()

      await waitFor(() => {
        expect(output()).toHaveTextContent('Step 1')
        expect(previousButton()).toBeDisabled()
        expect(nextButton()).not.toBeDisabled()
      })
    })

    it('should handle async onChangeValidator with error', async () => {
      const asyncValidator = async (value: string) => {
        if (value !== 'valid') {
          return new Error('Error message')
        }
      }

      render(
        <Wizard.Container expandedInitially>
          <Wizard.Step title="Step 1">
            <output>Step 1</output>
            <Field.String onChangeValidator={asyncValidator} />
            <Form.ButtonRow>
              <Wizard.PreviousButton />
              <Wizard.NextButton />
            </Form.ButtonRow>
          </Wizard.Step>

          <Wizard.Step title="Step 2">
            <output>Step 2</output>
            <Field.String required />
            <Form.ButtonRow>
              <Wizard.PreviousButton />
              <Wizard.NextButton />
            </Form.ButtonRow>
          </Wizard.Step>
        </Wizard.Container>
      )

      expect(output()).toHaveTextContent('Step 1')
      expect(screen.queryAllByRole('alert')).toHaveLength(0)
      expect(previousButton()).toBeDisabled()
      expect(nextButton()).not.toBeDisabled()

      fireEvent.click(nextButton())

      expect(previousButton()).toBeDisabled()
      expect(nextButton()).toBeDisabled()

      await waitFor(() => {
        expect(output()).toHaveTextContent('Step 1')
        expect(screen.queryAllByRole('alert')).toHaveLength(1)
        expect(
          document.querySelector('.dnb-form-status')
        ).toHaveTextContent('Error message')
        expect(previousButton()).toBeDisabled()
        expect(nextButton()).not.toBeDisabled()
      })

      await userEvent.type(document.querySelector('input'), 'valid')

      fireEvent.click(nextButton())

      expect(output()).toHaveTextContent('Step 1')
      expect(screen.queryAllByRole('alert')).toHaveLength(0)
      expect(previousButton()).toBeDisabled()
      expect(nextButton()).toBeDisabled()

      await waitFor(() => {
        expect(output()).toHaveTextContent('Step 2')
        expect(screen.queryAllByRole('alert')).toHaveLength(0)
        expect(previousButton()).not.toBeDisabled()
        expect(nextButton()).not.toBeDisabled()
      })
    })

    it('should handle async onBlurValidator', async () => {
      const onBlurValidator = async () => null

      render(
        <Wizard.Container>
          <Wizard.Step title="Step 1">
            <output>Step 1</output>
            <Field.String
              value="Value"
              onBlurValidator={onBlurValidator}
            />
            <Form.ButtonRow>
              <Wizard.PreviousButton />
              <Wizard.NextButton />
            </Form.ButtonRow>
          </Wizard.Step>

          <Wizard.Step title="Step 2">
            <output>Step 2</output>
            <Field.String required />
            <Form.ButtonRow>
              <Wizard.PreviousButton />
              <Wizard.NextButton />
            </Form.ButtonRow>
          </Wizard.Step>
        </Wizard.Container>
      )

      expect(output()).toHaveTextContent('Step 1')
      expect(previousButton()).toBeDisabled()
      expect(nextButton()).not.toBeDisabled()

      fireEvent.click(nextButton())

      expect(previousButton()).toBeDisabled()
      expect(nextButton()).toBeDisabled()

      await waitFor(() => {
        expect(output()).toHaveTextContent('Step 2')
        expect(previousButton()).not.toBeDisabled()
        expect(nextButton()).not.toBeDisabled()
      })

      fireEvent.click(previousButton())

      expect(output()).toHaveTextContent('Step 2')
      expect(previousButton()).not.toBeDisabled()
      expect(nextButton()).not.toBeDisabled()

      await waitFor(() => {
        expect(output()).toHaveTextContent('Step 1')
        expect(previousButton()).toBeDisabled()
        expect(nextButton()).not.toBeDisabled()
      })
    })

    it('should handle async onBlurValidator with error', async () => {
      const onBlurValidator = async (value: string) => {
        if (value !== 'valid') {
          return new Error('Error message')
        }
      }

      render(
        <Wizard.Container expandedInitially>
          <Wizard.Step title="Step 1">
            <output>Step 1</output>
            <Field.String onBlurValidator={onBlurValidator} />
            <Form.ButtonRow>
              <Wizard.PreviousButton />
              <Wizard.NextButton />
            </Form.ButtonRow>
          </Wizard.Step>

          <Wizard.Step title="Step 2">
            <output>Step 2</output>
            <Field.String required />
            <Form.ButtonRow>
              <Wizard.PreviousButton />
              <Wizard.NextButton />
            </Form.ButtonRow>
          </Wizard.Step>
        </Wizard.Container>
      )

      expect(output()).toHaveTextContent('Step 1')
      expect(screen.queryAllByRole('alert')).toHaveLength(0)
      expect(previousButton()).toBeDisabled()
      expect(nextButton()).not.toBeDisabled()

      fireEvent.click(nextButton())

      expect(previousButton()).toBeDisabled()
      expect(nextButton()).toBeDisabled()

      await waitFor(() => {
        expect(output()).toHaveTextContent('Step 1')
        expect(screen.queryAllByRole('alert')).toHaveLength(1)
        expect(
          document.querySelector('.dnb-form-status')
        ).toHaveTextContent('Error message')
        expect(previousButton()).toBeDisabled()
        expect(nextButton()).not.toBeDisabled()
      })

      await userEvent.type(document.querySelector('input'), 'valid')

      fireEvent.click(nextButton())

      expect(output()).toHaveTextContent('Step 1')
      expect(screen.queryAllByRole('alert')).toHaveLength(0)
      expect(previousButton()).toBeDisabled()
      expect(nextButton()).toBeDisabled()

      await waitFor(() => {
        expect(output()).toHaveTextContent('Step 2')
        expect(screen.queryAllByRole('alert')).toHaveLength(0)
        expect(previousButton()).not.toBeDisabled()
        expect(nextButton()).not.toBeDisabled()
      })
    })
  })

  it('should scroll to top on step change', async () => {
    const scrollIntoViewMock = jest.fn()

    render(
      <Wizard.Container>
        <Wizard.Step title="Step 1">
          <output>Step 1</output>
          <Wizard.PreviousButton />
          <Wizard.NextButton />
        </Wizard.Step>

        <Wizard.Step title="Step 2">
          <output>Step 2</output>
          <Wizard.PreviousButton />
          <Wizard.NextButton />
        </Wizard.Step>
      </Wizard.Container>
    )

    const scrollMock = jest
      .spyOn(
        document.querySelector('.dnb-forms-wizard-layout'),
        'scrollIntoView'
      )
      .mockImplementation(scrollIntoViewMock)

    expect(scrollIntoViewMock).toHaveBeenCalledTimes(0)

    await wait(10) // wait for the isInteractionRef to be set

    fireEvent.click(nextButton())
    await waitFor(() => {
      expect(scrollIntoViewMock).toHaveBeenCalledTimes(1)
    })

    fireEvent.click(previousButton())
    await waitFor(() => {
      expect(scrollIntoViewMock).toHaveBeenCalledTimes(2)
    })
    await expandStepIndicator()
    const secondStep = Array.from(
      document.querySelectorAll('.dnb-step-indicator__item')
    )[1]

    await userEvent.click(secondStep.querySelector('.dnb-anchor'))
    expect(output()).toHaveTextContent('Step 2')
    await waitFor(() => {
      expect(scrollIntoViewMock).toHaveBeenCalledTimes(3)
    })

    const firstStep = Array.from(
      document.querySelectorAll('.dnb-step-indicator__item')
    )[0]
    await userEvent.click(firstStep.querySelector('.dnb-anchor'))
    expect(output()).toHaveTextContent('Step 1')
    await waitFor(() => {
      expect(scrollIntoViewMock).toHaveBeenCalledTimes(4)
    })

    scrollMock.mockRestore()
  })

  it('should not scroll to top on step change when omitScrollManagement is true', async () => {
    const scrollIntoViewMock = jest.fn()
    const scrollMock = jest
      .spyOn(window.HTMLElement.prototype, 'scrollIntoView')
      .mockImplementation(scrollIntoViewMock)

    render(
      <Wizard.Container omitScrollManagement={true}>
        <Wizard.Step title="Step 1">
          <output>Step 1</output>
          <Wizard.PreviousButton />
          <Wizard.NextButton />
        </Wizard.Step>

        <Wizard.Step title="Step 2">
          <output>Step 2</output>
          <Wizard.PreviousButton />
          <Wizard.NextButton />
        </Wizard.Step>
      </Wizard.Container>
    )

    fireEvent.click(nextButton())

    await waitFor(() => {
      expect(scrollIntoViewMock).toHaveBeenCalledTimes(0)
    })

    fireEvent.click(previousButton())

    await waitFor(() => {
      expect(scrollIntoViewMock).toHaveBeenCalledTimes(0)
    })
    await expandStepIndicator()

    const [firstStep, secondStep] = Array.from(
      document.querySelectorAll('.dnb-step-indicator__item')
    )
    await userEvent.click(secondStep.querySelector('.dnb-anchor'))
    expect(output()).toHaveTextContent('Step 2')
    expect(scrollIntoViewMock).toHaveBeenCalledTimes(0)

    await userEvent.click(firstStep.querySelector('.dnb-anchor'))
    expect(output()).toHaveTextContent('Step 1')
    expect(scrollIntoViewMock).toHaveBeenCalledTimes(0)

    scrollMock.mockRestore()
  })

  it('should show remaining errors on step change', () => {
    render(
      <Wizard.Container mode="loose">
        <Wizard.Step title="Step 1">
          <output>Step 1</output>
          <Field.String required />
          <Wizard.PreviousButton />
          <Wizard.NextButton />
        </Wizard.Step>

        <Wizard.Step title="Step 2">
          <output>Step 2</output>
          <Wizard.PreviousButton />
          <Wizard.NextButton />
        </Wizard.Step>
      </Wizard.Container>
    )

    expect(output()).toHaveTextContent('Step 1')
    expect(document.querySelector('.dnb-form-status')).toBeNull()

    fireEvent.click(nextButton())

    expect(output()).toHaveTextContent('Step 1')
    expect(document.querySelector('.dnb-form-status')).toBeInTheDocument()
  })

  it('should keep inactive steps in DOM when using keepInDOM', async () => {
    let currentIndex = null

    render(
      <Wizard.Container mode="loose" keepInDOM>
        <Wizard.Step title="Step 1">
          <Field.String />
          <Wizard.Buttons />
        </Wizard.Step>

        <Wizard.Step title="Step 2">
          <Wizard.Buttons />
        </Wizard.Step>

        <WizardContext.Consumer>
          {(context) => {
            currentIndex = context.activeIndex
            return null
          }}
        </WizardContext.Consumer>
      </Wizard.Container>
    )

    const getHiddenSteps = () =>
      Array.from(
        document.querySelectorAll('div[title="Wizard Step"][hidden]')
      )

    expect(currentIndex).toBe(0)

    await userEvent.click(nextButton())

    expect(currentIndex).toBe(1)
    // Inactive step remains mounted but hidden
    expect(getHiddenSteps().length).toBeGreaterThan(0)

    await userEvent.click(previousButton())

    expect(currentIndex).toBe(0)
    expect(getHiddenSteps().length).toBeGreaterThan(0)

    await userEvent.click(nextButton())

    expect(currentIndex).toBe(1)
    expect(getHiddenSteps().length).toBeGreaterThan(0)
  })

  it('should set focus on step change', async () => {
    render(
      <Wizard.Container mode="loose">
        <Wizard.Step title="Step 1">
          <output>Step 1</output>
          <Field.String />
          <Wizard.Buttons />
        </Wizard.Step>

        <Wizard.Step title="Step 2">
          <output>Step 2</output>
          <Wizard.Buttons />
        </Wizard.Step>
      </Wizard.Container>
    )

    expect(output()).toHaveTextContent('Step 1')
    expect(document.querySelector('body')).toHaveFocus()

    await userEvent.click(nextButton())

    expect(output()).toHaveTextContent('Step 2')
    await waitFor(() => {
      expect(document.querySelector('.dnb-forms-step')).toHaveFocus()
    })

    await userEvent.click(previousButton())

    expect(output()).toHaveTextContent('Step 1')
    await waitFor(() => {
      expect(document.querySelector('.dnb-forms-step')).toHaveFocus()
    })

    // Replace the focus method in every HTML element
    const focusMock = jest
      .spyOn(window.HTMLElement.prototype, 'focus')
      .mockImplementation()

    await userEvent.click(nextButton())

    expect(output()).toHaveTextContent('Step 2')
    await waitFor(() => {
      expect(focusMock).toHaveBeenCalledTimes(2)
      expect(focusMock).toHaveBeenLastCalledWith({ preventScroll: true })
    })

    focusMock.mockRestore()
  })

  it('should omit setting focus if omitFocusManagement is true', async () => {
    render(
      <Wizard.Container mode="loose">
        <Wizard.Step title="Step 1">
          <output>Step 1</output>
          <Field.String />
          <Wizard.Buttons />
        </Wizard.Step>

        <Wizard.Step title="Step 2">
          <output>Step 2</output>
          <Wizard.Buttons />
        </Wizard.Step>
      </Wizard.Container>
    )

    expect(output()).toHaveTextContent('Step 1')
    expect(document.querySelector('body')).toHaveFocus()

    await userEvent.click(nextButton())

    expect(output()).toHaveTextContent('Step 2')
    await waitFor(() => {
      expect(document.querySelector('.dnb-forms-step')).not.toHaveFocus()
    })
  })

  it('should have fallback title when no title was given', () => {
    render(
      <Wizard.Container>
        <Wizard.Step>
          <output>Step 1</output>
        </Wizard.Step>
      </Wizard.Container>
    )

    expect(
      document.querySelector('.dnb-step-indicator__trigger__button')
    ).toHaveTextContent('Title missing')

    expandStepIndicator()

    expect(
      document.querySelector('.dnb-step-indicator__button')
    ).toHaveTextContent('Title missing')
  })

  it('should warn when not wrapped in Form.Handler', () => {
    const log = jest.spyOn(console, 'log').mockImplementation()

    render(
      <Wizard.Container>
        <Wizard.Step title="Step 1">
          <output>Step 1</output>
        </Wizard.Step>
      </Wizard.Container>
    )

    expect(log).toHaveBeenCalledTimes(1)
    expect(log).toHaveBeenCalledWith(
      expect.anything(),
      'You may wrap Wizard.Container in Form.Handler'
    )

    log.mockRestore()
  })

  it('should support schema', async () => {
    const schema = {
      type: 'object',
      properties: {
        foo: {
          type: 'string',
        },
        bar: {
          type: 'string',
        },
      },
      required: ['foo', 'bar'],
    } as const

    render(
      <Form.Handler schema={schema} ajvInstance={makeAjvInstance()}>
        <Wizard.Container>
          <Wizard.Step title="Step 1">
            <output>Step 1</output>
            <Field.String path="/foo" />
            <Wizard.Buttons />
          </Wizard.Step>
          <Wizard.Step title="Step 2">
            <output>Step 2</output>
            <Field.String path="/bar" />
            <Wizard.Buttons />
          </Wizard.Step>
        </Wizard.Container>
        <Form.SubmitButton />
      </Form.Handler>
    )

    expect(output()).toHaveTextContent('Step 1')
    expect(document.querySelector('.dnb-form-status')).toBeNull()

    fireEvent.click(nextButton())

    expect(output()).toHaveTextContent('Step 1')
    expect(document.querySelector('.dnb-form-status')).toBeInTheDocument()

    await userEvent.type(document.querySelector('input'), 'valid')
    expect(document.querySelector('.dnb-form-status')).toBeNull()

    await userEvent.click(nextButton())

    expect(output()).toHaveTextContent('Step 2')
    expect(document.querySelector('.dnb-form-status')).toBeNull()

    await userEvent.click(submitButton())

    expect(output()).toHaveTextContent('Step 2')
    expect(document.querySelector('.dnb-form-status')).toBeInTheDocument()
  })

  it('should prevent navigation if `preventNavigation` is called', async () => {
    render(
      <Form.Handler>
        <Wizard.Container
          onStepChange={(step, mode, { preventNavigation }) => {
            // Stop navigation of user presses the next button on step 2 (B)
            if (step === 2 && mode === 'next') {
              preventNavigation()
            }
          }}
        >
          <Wizard.Step title="Step A">
            <p>Step A</p>
            <Wizard.Buttons />
          </Wizard.Step>
          <Wizard.Step title="Step B">
            <p>Step B</p>
            <Wizard.Buttons />
          </Wizard.Step>
          <Wizard.Step title="Step C">
            <p>Step C</p>
            <Wizard.Buttons />
          </Wizard.Step>
        </Wizard.Container>
      </Form.Handler>
    )

    await expandStepIndicator()
    const [stepA, stepB, stepC] = Array.from(
      document.querySelectorAll('.dnb-step-indicator__item')
    )

    expect(stepA).toHaveClass('dnb-step-indicator__item--current')
    expect(stepB).not.toHaveClass('dnb-step-indicator__item--current')
    expect(stepC).not.toHaveClass('dnb-step-indicator__item--current')

    await userEvent.click(screen.getByText('Neste'))

    expect(stepA).not.toHaveClass('dnb-step-indicator__item--current')
    expect(stepB).toHaveClass('dnb-step-indicator__item--current')
    expect(stepC).not.toHaveClass('dnb-step-indicator__item--current')

    await userEvent.click(screen.getByText('Neste'))

    // Stay on Step B

    expect(stepA).not.toHaveClass('dnb-step-indicator__item--current')
    expect(stepB).toHaveClass('dnb-step-indicator__item--current')
    expect(stepC).not.toHaveClass('dnb-step-indicator__item--current')

    await userEvent.click(screen.getByText('Tilbake'))

    expect(stepA).toHaveClass('dnb-step-indicator__item--current')
    expect(stepB).not.toHaveClass('dnb-step-indicator__item--current')
    expect(stepC).not.toHaveClass('dnb-step-indicator__item--current')
  })

  it('should run validation before `preventNavigation` result is evaluated', async () => {
    const onStepChange = jest.fn((step, mode, { preventNavigation }) => {
      if (step === 1 && mode === 'next') {
        preventNavigation()
      }
    })

    render(
      <Form.Handler>
        <Wizard.Container onStepChange={onStepChange}>
          <Wizard.Step title="Step 1">
            <Field.String required />
            <output>Step 1</output>
            <Wizard.Buttons />
          </Wizard.Step>
          <Wizard.Step title="Step 2">
            <output>Step 2</output>
            <Wizard.Buttons />
          </Wizard.Step>
        </Wizard.Container>
      </Form.Handler>
    )

    expect(output()).toHaveTextContent('Step 1')

    await userEvent.click(nextButton())

    await waitFor(() => {
      expect(
        document.querySelector('.dnb-form-status')
      ).toBeInTheDocument()
    })

    expect(output()).toHaveTextContent('Step 1')

    await userEvent.type(document.querySelector('input'), 'valid')

    await waitFor(() => {
      expect(document.querySelector('.dnb-form-status')).toBeNull()
    })

    await userEvent.click(nextButton())

    expect(output()).toHaveTextContent('Step 1')
    expect(onStepChange).toHaveBeenCalledTimes(1)
    expect(onStepChange).toHaveBeenLastCalledWith(1, 'next', {
      previousStep: { index: 0 },
      preventNavigation: expect.any(Function),
    })
  })

  it('should bypass validation on every step when validationMode is bypassOnNavigation', async () => {
    const onStepChange = jest.fn()

    render(
      <Form.Handler>
        <Wizard.Container
          mode="loose"
          validationMode="bypassOnNavigation"
          onStepChange={onStepChange}
          expandedInitially
        >
          <Wizard.Step title="Step 1">
            <Field.String path="/foo" required />
            <output>Step 1</output>
            <Wizard.Buttons />
          </Wizard.Step>
          <Wizard.Step title="Step 2">
            <Field.String path="/bar" required />
            <output>Step 2</output>
            <Wizard.Buttons />
          </Wizard.Step>
        </Wizard.Container>
      </Form.Handler>
    )

    const [firstStep, secondStep] = Array.from(
      document.querySelectorAll('.dnb-step-indicator__item')
    )

    expect(output()).toHaveTextContent('Step 1')

    // Go to Step 2
    await userEvent.click(secondStep.querySelector('.dnb-anchor'))

    expect(output()).toHaveTextContent('Step 2')
    expect(document.querySelector('.dnb-form-status')).toBeNull()
    expect(onStepChange).toHaveBeenCalledTimes(1)
    expect(onStepChange).toHaveBeenLastCalledWith(1, 'next', {
      previousStep: { index: 0 },
      preventNavigation: expect.any(Function),
    })

    // Go to Step 1
    await userEvent.click(firstStep.querySelector('.dnb-anchor'))

    expect(output()).toHaveTextContent('Step 1')
    expect(document.querySelector('.dnb-form-status')).toBeNull()

    await userEvent.type(document.querySelector('input'), '{Backspace>3}')

    // Go to Step 2
    await userEvent.click(nextButton())

    expect(output()).toHaveTextContent('Step 2')
    expect(document.querySelectorAll('.dnb-form-status')).toHaveLength(1)
    expect(firstStep.querySelector('.dnb-form-status')).toBeInTheDocument()

    // Go to Step 1
    await userEvent.click(previousButton())

    expect(output()).toHaveTextContent('Step 1')
    expect(document.querySelector('.dnb-form-status')).toBeNull()

    // Go to Step 2
    await userEvent.click(nextButton())

    expect(output()).toHaveTextContent('Step 2')
    expect(document.querySelectorAll('.dnb-form-status')).toHaveLength(1)
    expect(firstStep.querySelector('.dnb-form-status')).toBeInTheDocument()
  })

  describe('validation', () => {
    it('should show error on navigating back and forth', async () => {
      render(
        <Wizard.Container expandedInitially>
          <Wizard.Step title="Step 1">
            <output>Step 1</output>
            <Field.String path="/something" />
            <Wizard.PreviousButton />
            <Wizard.NextButton />
          </Wizard.Step>

          <Wizard.Step title="Step 2">
            <output>Step 2</output>
            <Field.String path="/foo" required />
            <Wizard.PreviousButton />
            <Wizard.NextButton />
          </Wizard.Step>

          <Wizard.Step title="Step 3">
            <output>Step 3</output>
            <Wizard.PreviousButton />
            <Wizard.NextButton />
          </Wizard.Step>
        </Wizard.Container>
      )
      const [, secondStep] = Array.from(
        document.querySelectorAll('.dnb-step-indicator__item')
      )
      expect(output()).toHaveTextContent('Step 1')
      expect(document.querySelector('.dnb-form-status')).toBeNull()

      await userEvent.click(nextButton())

      expect(output()).toHaveTextContent('Step 2')

      await waitFor(() => {
        expect(document.querySelector('.dnb-form-status')).toBeNull()
      })

      await userEvent.click(nextButton())

      expect(output()).toHaveTextContent('Step 2')

      await waitFor(() => {
        expect(
          content().querySelector('.dnb-form-status')
        ).toBeInTheDocument()
        expect(secondStep.querySelector('.dnb-form-status')).toBeNull()
      })

      await userEvent.click(previousButton())

      expect(output()).toHaveTextContent('Step 1')

      await waitFor(() => {
        expect(content().querySelector('.dnb-form-status')).toBeNull()
        expect(
          secondStep.querySelector('.dnb-form-status')
        ).toBeInTheDocument()
      })

      await userEvent.click(nextButton())

      expect(output()).toHaveTextContent('Step 2')

      await waitFor(() => {
        expect(
          content().querySelector('.dnb-form-status')
        ).toBeInTheDocument()
        expect(secondStep.querySelector('.dnb-form-status')).toBeNull()
      })

      await wait(100)
      await userEvent.type(document.querySelector('input'), 'foo')

      await waitFor(() => {
        expect(content().querySelector('.dnb-form-status')).toBeNull()
      })

      await userEvent.click(nextButton())

      expect(output()).toHaveTextContent('Step 3')

      expect(document.querySelector('.dnb-form-status')).toBeNull()
    })

    it('should show error on navigating back and forth in loose mode', async () => {
      render(
        <Wizard.Container mode="loose" expandedInitially>
          <Wizard.Step title="Step 1">
            <output>Step 1</output>
            <Field.String path="/something" />
            <Wizard.NextButton />
          </Wizard.Step>

          <Wizard.Step title="Step 2">
            <output>Step 2</output>
            <Field.String path="/foo" required />
            <Wizard.NextButton />
          </Wizard.Step>
        </Wizard.Container>
      )

      const [firstStep, secondStep] = Array.from(
        document.querySelectorAll('.dnb-step-indicator__item')
      )

      expect(output()).toHaveTextContent('Step 1')
      expect(document.querySelector('.dnb-form-status')).toBeNull()

      await userEvent.click(secondStep.querySelector('button'))

      await waitFor(() => {
        expect(output()).toHaveTextContent('Step 2')
        expect(document.querySelector('.dnb-form-status')).toBeNull()
      })

      // Show the error message
      await userEvent.click(nextButton())

      await waitFor(() => {
        expect(output()).toHaveTextContent('Step 2')
        expect(
          content().querySelector('.dnb-form-status')
        ).toBeInTheDocument()
      })
      await userEvent.click(firstStep.querySelector('button'))

      await waitFor(() => {
        expect(output()).toHaveTextContent('Step 1')
        expect(content().querySelector('.dnb-form-status')).toBeNull()
        expect(
          secondStep.querySelector('.dnb-form-status')
        ).toBeInTheDocument()
      })

      await userEvent.click(secondStep.querySelector('button'))

      await waitFor(() => {
        expect(output()).toHaveTextContent('Step 2')
        expect(
          content().querySelector('.dnb-form-status')
        ).toBeInTheDocument()
        expect(secondStep.querySelector('.dnb-form-status')).toBeNull()
      })
    })

    it('should be able to navigate forth with NextButton even if there are errors in other steps', async () => {
      let currentIndex = null

      render(
        <Wizard.Container
          mode="strict"
          initialActiveIndex={2}
          expandedInitially
        >
          <Wizard.Step title="Step 1">
            <Field.String path="/foo" required />
            <Wizard.Buttons />
          </Wizard.Step>

          <Wizard.Step title="Step 2">
            <Field.String path="/bar" required />
            <Wizard.Buttons />
          </Wizard.Step>

          <Wizard.Step title="Step 3">
            <Wizard.Buttons />
          </Wizard.Step>

          <WizardContext.Consumer>
            {(context) => {
              currentIndex = context.activeIndex
              return null
            }}
          </WizardContext.Consumer>
        </Wizard.Container>
      )

      const [firstStep] = Array.from(
        document.querySelectorAll('.dnb-step-indicator__item')
      )

      expect(currentIndex).toBe(2)

      fireEvent.submit(document.querySelector('form'))

      await waitFor(() => {
        expect(screen.getAllByText(nb.Step.stepHasError)).toHaveLength(2)
      })

      // Go to Step 1
      await userEvent.click(firstStep.querySelector('button'))

      expect(currentIndex).toBe(0)

      await userEvent.type(document.querySelector('input'), 'foo')

      // Go to Step 2
      await userEvent.click(nextButton())

      expect(currentIndex).toBe(1)
    })

    it('should remove the prerendered steps from the DOM after submitting the form', async () => {
      render(
        <Wizard.Container initialActiveIndex={2} expandedInitially>
          <Wizard.Step title="Step 1">
            <Field.String path="/foo" required />
            <Wizard.Buttons />
          </Wizard.Step>

          <Wizard.Step title="Step 2">
            <Field.String path="/bar" required />
            <Wizard.Buttons />
          </Wizard.Step>

          <Wizard.Step title="Step 3">
            <Wizard.Buttons />
          </Wizard.Step>
        </Wizard.Container>
      )

      const addedNodes = []
      const removedNodes = []

      const observer = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
          if (mutation.type === 'childList') {
            if (mutation.removedNodes?.length) {
              removedNodes.push(mutation.removedNodes)
            }
            if (mutation.addedNodes?.length) {
              addedNodes.push(mutation.addedNodes)
            }
          }
        }
      })

      observer.observe(document.body, {
        childList: true,
        subtree: true,
      })

      fireEvent.submit(document.querySelector('form'))

      await waitFor(() => {
        expect(screen.getAllByText(nb.Step.stepHasError)).toHaveLength(2)
      })

      expect(document.querySelector('iframe').innerHTML).toBe('')

      expect(addedNodes.length).toBeGreaterThanOrEqual(4)
      expect(removedNodes.length).toBeGreaterThanOrEqual(2)
    })

    it('should prevent navigation if field inside Visibility with keepInDOM is invalid', async () => {
      let currentIndex = null

      render(
        <Wizard.Container>
          <Wizard.Step title="Step 1">
            <Form.Visibility visible={false} keepInDOM>
              <Field.String path="/foo" required />
            </Form.Visibility>
            <Wizard.Buttons />
          </Wizard.Step>

          <Wizard.Step title="Step 2">
            <Form.Visibility visible={false}>
              <Field.String path="/bar" required />
            </Form.Visibility>
            <Wizard.Buttons />
          </Wizard.Step>

          <Wizard.Step title="Step 3">
            <Wizard.Buttons />
          </Wizard.Step>

          <WizardContext.Consumer>
            {(context) => {
              currentIndex = context.activeIndex
              return null
            }}
          </WizardContext.Consumer>
        </Wizard.Container>
      )

      expect(currentIndex).toBe(0)

      // Try Step 2
      await userEvent.click(nextButton())

      expect(currentIndex).toBe(0)

      await userEvent.type(document.querySelector('input'), 'foo')

      // Go to Step 2
      await userEvent.click(nextButton())

      expect(currentIndex).toBe(1)

      // Go to Step 3
      await userEvent.click(nextButton())

      expect(currentIndex).toBe(2)
    })

    it('should not show a status when Iterate.PushContainer is closed', async () => {
      render(
        <Form.Handler>
          <Wizard.Container mode="loose">
            <Wizard.Step title="Step 1">
              <output>Step 1</output>
              <Iterate.PushContainer
                path="/does-not-matter"
                showOpenButtonWhen={() => true}
                bubbleValidation
              >
                <Field.String required itemPath="/initiateError" />
              </Iterate.PushContainer>
              <Wizard.Buttons />
            </Wizard.Step>
            <Wizard.Step title="Step 2">
              <output>Step 2</output>
              <Wizard.Buttons />
            </Wizard.Step>
          </Wizard.Container>
        </Form.Handler>
      )

      expect(output()).toHaveTextContent('Step 1')
      expect(
        document.querySelector('.dnb-step-indicator__item-content__status')
      ).toBeNull()

      await userEvent.click(nextButton())

      expect(output()).toHaveTextContent('Step 2')
      expect(
        document.querySelector('.dnb-step-indicator__item-content__status')
      ).toBeNull()
    })

    it('should show a warning beneath the trigger button when the step status has an error and the screen width is small', async () => {
      simulateSmallScreen()

      const onStepChange = jest.fn()
      const onSubmit = jest.fn()

      render(
        <Form.Handler onSubmit={onSubmit}>
          <Wizard.Container
            mode="loose"
            initialActiveIndex={2}
            onStepChange={onStepChange}
          >
            <Wizard.Step title="Step 1">
              <Field.String path="/foo" required />
              <output>Step 1</output>
              <Wizard.Buttons />
            </Wizard.Step>
            <Wizard.Step title="Step 2">
              <Field.String path="/bar" required />
              <output>Step 2</output>
              <Wizard.Buttons />
            </Wizard.Step>
            <Wizard.Step title="Step 3">
              <Field.String path="/baz" />
              <output>Step 3</output>
              <Wizard.Buttons />
            </Wizard.Step>
          </Wizard.Container>
        </Form.Handler>
      )

      expect(
        document.querySelectorAll('.dnb-step-indicator__item')
      ).toHaveLength(0)
      expect(output()).toHaveTextContent('Step 3')

      // Try submit while on Step 3
      fireEvent.submit(document.querySelector('form'))

      expect(output()).toHaveTextContent('Step 3')
      expect(document.querySelector('.dnb-form-status')).toHaveTextContent(
        nb.Step.stepHasError
      )
      expect(
        document.querySelectorAll(
          '.dnb-step-indicator__item-content__status.dnb-form-status--error'
        )
      ).toHaveLength(0)
      expect(
        document.querySelectorAll(
          '.dnb-step-indicator__item-content__status.dnb-form-status--error'
        )
      ).toHaveLength(0)
    })

    it('should not submit when steps have an error status', async () => {
      const onStepChange = jest.fn()
      const onSubmit = jest.fn()

      render(
        <Form.Handler onSubmit={onSubmit}>
          <Wizard.Container
            mode="loose"
            initialActiveIndex={2}
            onStepChange={onStepChange}
            expandedInitially
          >
            <Wizard.Step title="Step 1">
              <Field.String path="/foo" required />
              <output>Step 1</output>
              <Wizard.Buttons />
            </Wizard.Step>
            <Wizard.Step title="Step 2">
              <Field.String path="/bar" required />
              <output>Step 2</output>
              <Wizard.Buttons />
            </Wizard.Step>
            <Wizard.Step title="Step 3">
              <Field.String path="/baz" />
              <output>Step 3</output>
              <Wizard.Buttons />
            </Wizard.Step>
          </Wizard.Container>
        </Form.Handler>
      )

      expect(output()).toHaveTextContent('Step 3')

      // Try submit while on Step 3
      fireEvent.submit(document.querySelector('form'))

      expect(output()).toHaveTextContent('Step 3')

      // Go to Step 2
      await userEvent.click(previousButton())

      expect(output()).toHaveTextContent('Step 2')

      // Try Step 3
      await userEvent.click(nextButton())

      expect(output()).toHaveTextContent('Step 2')

      // Go to Step 1
      await userEvent.click(previousButton())

      expect(output()).toHaveTextContent('Step 1')

      // Try Step 2
      await userEvent.click(nextButton())

      expect(output()).toHaveTextContent('Step 1')

      await userEvent.type(document.querySelector('input'), 'foo')

      // Go to Step 2
      await userEvent.click(nextButton())

      expect(output()).toHaveTextContent('Step 2')

      // Set the input value directly using fireEvent for reliability
      const input = document.querySelector('input')
      fireEvent.change(input, { target: { value: 'bar' } })

      // Verify the value was set
      expect(input).toHaveValue('bar')

      // Go to Step 3 using Next button instead of form submission
      await userEvent.click(nextButton())

      await waitFor(
        () => {
          expect(output()).toHaveTextContent('Step 3')
        },
        { timeout: 10000, interval: 100 }
      )

      expect(onSubmit).toHaveBeenCalledTimes(0)

      // Make the submit
      fireEvent.submit(document.querySelector('form'))

      expect(onSubmit).toHaveBeenCalledTimes(1)
    })

    it('should not submit when steps have a schema error status', async () => {
      const onSubmit = jest.fn()

      const schema = {
        type: 'object',
        required: ['isThisTrue'],
      }

      render(
        <Form.Handler
          schema={schema}
          ajvInstance={makeAjvInstance()}
          onSubmit={onSubmit}
        >
          <Wizard.Container initialActiveIndex={1}>
            <Wizard.Step title="Step 1">
              <output>Step 1</output>
              <Field.Boolean path="/isThisTrue" variant="buttons" />
              <Wizard.Buttons />
            </Wizard.Step>
            <Wizard.Step title="Step 2">
              <output>Step 2</output>
              <Wizard.Buttons />
            </Wizard.Step>
          </Wizard.Container>
        </Form.Handler>
      )

      expect(output()).toHaveTextContent('Step 2')

      // Try submit while on Step 2
      fireEvent.submit(document.querySelector('form'))

      await expect(() => {
        expect(onSubmit).toHaveBeenCalledTimes(1)
      }).toNeverResolve()
      expect(onSubmit).toHaveBeenCalledTimes(0)
      expect(
        document.querySelector('.dnb-form-status')
      ).toBeInTheDocument()
      expect(document.querySelector('.dnb-form-status')).toHaveTextContent(
        nb.Step.stepHasError
      )
      expect(output()).toHaveTextContent('Step 2')

      // Go to Step 1
      await userEvent.click(previousButton())

      expect(output()).toHaveTextContent('Step 1')

      // Try Step 2
      await userEvent.click(nextButton())

      expect(output()).toHaveTextContent('Step 1')

      // Make a choice
      await userEvent.click(screen.getByText('Nei'))

      // Try Step 2
      await userEvent.click(nextButton())

      expect(output()).toHaveTextContent('Step 2')

      // Try submit while on Step 2
      fireEvent.submit(document.querySelector('form'))

      expect(onSubmit).toHaveBeenCalledTimes(1)
    })

    it('should not submit when steps have an error by navigating in the menu', async () => {
      const onStepChange = jest.fn()
      const onSubmit = jest.fn()

      render(
        <Form.Handler onSubmit={onSubmit}>
          <Wizard.Container
            mode="loose"
            initialActiveIndex={2}
            onStepChange={onStepChange}
            expandedInitially
          >
            <Wizard.Step title="Step 1">
              <Field.String path="/foo" required />
              <output>Step 1</output>
              <Wizard.Buttons />
            </Wizard.Step>
            <Wizard.Step title="Step 2">
              <Field.String path="/bar" required />
              <output>Step 2</output>
              <Wizard.Buttons />
            </Wizard.Step>
            <Wizard.Step title="Step 3">
              <Field.String path="/baz" />
              <output>Step 3</output>
              <Wizard.Buttons />
            </Wizard.Step>
          </Wizard.Container>
        </Form.Handler>
      )

      const [, , thirdStep] = Array.from(
        document.querySelectorAll('.dnb-step-indicator__item')
      )

      expect(output()).toHaveTextContent('Step 3')

      // Try submit while on Step 3
      fireEvent.submit(document.querySelector('form'))

      expect(output()).toHaveTextContent('Step 3')

      // Go to Step 2
      await userEvent.click(previousButton())

      expect(output()).toHaveTextContent('Step 2')

      // Try Step 3
      await userEvent.click(nextButton())

      expect(output()).toHaveTextContent('Step 2')

      // Go to Step 1
      await userEvent.click(previousButton())

      expect(output()).toHaveTextContent('Step 1')

      // Try Step 2
      await userEvent.click(nextButton())

      expect(output()).toHaveTextContent('Step 1')

      // Go to Step 3
      await userEvent.click(thirdStep.querySelector('.dnb-anchor'))

      expect(output()).toHaveTextContent('Step 3')

      expect(onSubmit).toHaveBeenCalledTimes(0)

      // Try submit while on Step 3
      fireEvent.submit(document.querySelector('form'))

      expect(onSubmit).toHaveBeenCalledTimes(0)
    })

    describe('with validation shown in menu', () => {
      it('should not show a status on submit when no error is present', async () => {
        const onSubmit = jest.fn()

        render(
          <Form.Handler onSubmit={onSubmit}>
            <Wizard.Container>
              <Wizard.Step title="Step 1">
                <output>Step 1</output>
                <Field.String path="/foo" />
                <Wizard.Buttons />
              </Wizard.Step>
              <Wizard.Step title="Step 2">
                <output>Step 2</output>
                <Field.String path="/bar" />
                <Wizard.Buttons />
              </Wizard.Step>
            </Wizard.Container>
          </Form.Handler>
        )

        expect(output()).toHaveTextContent('Step 1')
        expect(
          document.querySelector(
            '.dnb-step-indicator__item-content__status'
          )
        ).toBeNull()

        fireEvent.submit(document.querySelector('form'))

        await waitFor(() => {
          expect(output()).toHaveTextContent('Step 2')
        })
        expect(
          document.querySelector(
            '.dnb-step-indicator__item-content__status'
          )
        ).toBeNull()
        expect(onSubmit).toHaveBeenCalledTimes(0)

        fireEvent.submit(document.querySelector('form'))

        expect(output()).toHaveTextContent('Step 2')
        expect(
          document.querySelector(
            '.dnb-step-indicator__item-content__status'
          )
        ).toBeNull()
        expect(onSubmit).toHaveBeenCalledTimes(1)
      })

      it('should not show a status when no fields are present', async () => {
        render(
          <Form.Handler>
            <Wizard.Container expandedInitially>
              <Wizard.Step title="Step 1">
                <output>Step 1</output>
                <Wizard.Buttons />
              </Wizard.Step>
              <Wizard.Step title="Step 2">
                <output>Step 2</output>
                <Wizard.Buttons />
              </Wizard.Step>
            </Wizard.Container>
          </Form.Handler>
        )

        expect(output()).toHaveTextContent('Step 1')
        expect(
          document.querySelector(
            '.dnb-step-indicator__item-content__status'
          )
        ).toBeNull()

        await userEvent.click(nextButton())

        expect(output()).toHaveTextContent('Step 2')
        expect(
          document.querySelector(
            '.dnb-step-indicator__item-content__status'
          )
        ).toBeNull()
      })

      it('should not show a status when Iterate.PushContainer is closed', async () => {
        render(
          <Form.Handler>
            <Wizard.Container expandedInitially>
              <Wizard.Step title="Step 1">
                <output>Step 1</output>
                <Iterate.PushContainer
                  path="/does-not-matter"
                  showOpenButtonWhen={() => true}
                  bubbleValidation
                >
                  <Field.String required itemPath="/initiateError" />
                </Iterate.PushContainer>
                <Wizard.Buttons />
              </Wizard.Step>
              <Wizard.Step title="Step 2">
                <output>Step 2</output>
                <Wizard.Buttons />
              </Wizard.Step>
            </Wizard.Container>
          </Form.Handler>
        )

        expect(output()).toHaveTextContent('Step 1')
        expect(
          document.querySelector(
            '.dnb-step-indicator__item-content__status'
          )
        ).toBeNull()

        await userEvent.click(nextButton())

        expect(output()).toHaveTextContent('Step 2')
        expect(
          document.querySelector(
            '.dnb-step-indicator__item-content__status'
          )
        ).toBeNull()
      })

      it('should not navigate to next step when Iterate.PushContainer is open', async () => {
        render(
          <Form.Handler>
            <Wizard.Container expandedInitially>
              <Wizard.Step title="Step 1">
                <output>Step 1</output>
                <Iterate.PushContainer
                  path="/does-not-matter"
                  showOpenButtonWhen={() => true}
                  openButton={<Iterate.PushContainer.OpenButton />}
                  bubbleValidation
                >
                  <Field.String required itemPath="/initiateError" />
                </Iterate.PushContainer>
                <Wizard.Buttons />
              </Wizard.Step>

              <Wizard.Step title="Step 2">
                <output>Step 2</output>
                <Wizard.Buttons />
              </Wizard.Step>
            </Wizard.Container>
          </Form.Handler>
        )

        expect(output()).toHaveTextContent('Step 1')
        expect(
          document.querySelector(
            '.dnb-step-indicator__item-content__status'
          )
        ).toBeNull()

        await userEvent.click(nextButton())

        expect(output()).toHaveTextContent('Step 2')
        expect(
          document.querySelector(
            '.dnb-step-indicator__item-content__status'
          )
        ).toBeNull()

        await userEvent.click(previousButton())

        expect(output()).toHaveTextContent('Step 1')
        expect(
          document.querySelector(
            '.dnb-step-indicator__item-content__status'
          )
        ).toBeNull()

        await userEvent.click(
          document.querySelector('.dnb-forms-iterate__open-button')
        )

        await userEvent.click(nextButton())

        expect(output()).toHaveTextContent('Step 1')
        expect(
          document.querySelector(
            '.dnb-step-indicator__item-content__status'
          )
        ).toBeNull()

        await userEvent.click(
          document.querySelector('.dnb-forms-iterate__cancel-button')
        )
        // Confirm cancel in dialog
        await userEvent.click(
          document.querySelector(
            '.dnb-dialog__actions .dnb-button--primary'
          )
        )

        await waitFor(async () => {
          await userEvent.click(nextButton())
          expect(output()).toHaveTextContent('Step 2')
        })

        expect(
          document.querySelector(
            '.dnb-step-indicator__item-content__status'
          )
        ).toBeNull()
      })

      it('should not show error in menu when Iterate.PushContainer has shown error', async () => {
        render(
          <Form.Handler>
            <Wizard.Container>
              <Wizard.Step title="Step 1">
                <output>Step 1</output>
                <Iterate.PushContainer
                  path="/does-not-matter"
                  showOpenButtonWhen={() => true}
                  openButton={<Iterate.PushContainer.OpenButton />}
                  bubbleValidation
                >
                  <Field.String required itemPath="/initiateError" />
                </Iterate.PushContainer>
                <Wizard.Buttons />
              </Wizard.Step>

              <Wizard.Step title="Step 2">
                <output>Step 2</output>
                <Wizard.Buttons />
              </Wizard.Step>
            </Wizard.Container>
          </Form.Handler>
        )

        expect(output()).toHaveTextContent('Step 1')

        await userEvent.click(
          document.querySelector('.dnb-forms-iterate__open-button')
        )

        await userEvent.click(nextButton())

        expect(output()).toHaveTextContent('Step 1')
        expect(
          document.querySelector('.dnb-form-status')
        ).toBeInTheDocument()

        await userEvent.click(
          document.querySelector('.dnb-forms-iterate__cancel-button')
        )
        // Confirm cancel in dialog
        await userEvent.click(
          document.querySelector(
            '.dnb-dialog__actions .dnb-button--primary'
          )
        )

        await waitFor(async () => {
          await userEvent.click(nextButton())
          expect(output()).toHaveTextContent('Step 2')
        })

        fireEvent.submit(document.querySelector('form'))
        fireEvent.submit(document.querySelector('form')) // Try a second time

        await expect(() => {
          expect(
            document.querySelector('.dnb-form-status')
          ).toBeInTheDocument()
        }).toNeverResolve()
      })

      it('should render error status when form cannot be submitted', async () => {
        // Increase timeout for this specific test
        jest.setTimeout(15000)
        const onStepChange = jest.fn()
        const onSubmit = jest.fn()

        render(
          <Form.Handler onSubmit={onSubmit}>
            <Wizard.Container
              mode="loose"
              initialActiveIndex={2}
              onStepChange={onStepChange}
              expandedInitially
            >
              <Wizard.Step title="Step 1">
                <Field.String path="/foo" required />
                <output>Step 1</output>
                <Wizard.Buttons />
              </Wizard.Step>
              <Wizard.Step title="Step 2">
                <Field.String path="/bar" required />
                <output>Step 2</output>
                <Wizard.Buttons />
              </Wizard.Step>
              <Wizard.Step title="Step 3">
                <Field.String path="/baz" />
                <output>Step 3</output>
                <Wizard.Buttons />
              </Wizard.Step>
            </Wizard.Container>
          </Form.Handler>
        )

        expect(output()).toHaveTextContent('Step 3')

        // Try submit while on Step 3
        fireEvent.submit(document.querySelector('form'))

        expect(output()).toHaveTextContent('Step 3')
        expect(
          document.querySelectorAll(
            '.dnb-step-indicator__item-content__status.dnb-form-status--error'
          )
        ).toHaveLength(2)

        // Go to Step 2
        await userEvent.click(previousButton())

        expect(output()).toHaveTextContent('Step 2')

        // Try Step 3
        await userEvent.click(nextButton())

        expect(output()).toHaveTextContent('Step 2')
        expect(
          document.querySelectorAll(
            '.dnb-step-indicator__item-content__status.dnb-form-status--error'
          )
        ).toHaveLength(1)

        // Go to Step 1
        await userEvent.click(previousButton())

        expect(output()).toHaveTextContent('Step 1')

        // Try Step 2
        await userEvent.click(nextButton())

        expect(output()).toHaveTextContent('Step 1')
        expect(
          document.querySelectorAll(
            '.dnb-step-indicator__item-content__status.dnb-form-status--error'
          )
        ).toHaveLength(1)

        // Set the input value directly using fireEvent for reliability
        const input1 = document.querySelector('input')
        fireEvent.change(input1, { target: { value: 'foo' } })

        expect(
          document.querySelectorAll(
            '.dnb-step-indicator__item-content__status.dnb-form-status--error'
          )
        ).toHaveLength(1)

        // Go to Step 2
        await userEvent.click(nextButton())

        expect(output()).toHaveTextContent('Step 2')

        expect(
          document.querySelectorAll(
            '.dnb-step-indicator__item-content__status.dnb-form-status--error'
          )
        ).toHaveLength(0)

        // Set the input value directly using fireEvent for reliability
        const input2 = document.querySelector('input')
        fireEvent.change(input2, { target: { value: 'bar' } })

        expect(
          document.querySelectorAll(
            '.dnb-step-indicator__item-content__status.dnb-form-status--error'
          )
        ).toHaveLength(0)

        // Go to Step 3 using Next button instead of form submission
        await userEvent.click(nextButton())

        // Wait for step change to complete
        await waitFor(
          () => {
            expect(output()).toHaveTextContent('Step 3')
          },
          {
            timeout: 10000,
            interval: 100,
          }
        )

        expect(onSubmit).toHaveBeenCalledTimes(0)

        // Make the submit
        fireEvent.submit(document.querySelector('form'))

        expect(onSubmit).toHaveBeenCalledTimes(1)
      })

      it('should not show error status on inactive step', async () => {
        render(
          <Form.Handler>
            <Wizard.Container mode="loose" initialActiveIndex={2}>
              <Wizard.Step title="Step 1" inactive>
                <Field.String path="/foo" required />
                <output>Step 1</output>
                <Wizard.Buttons />
              </Wizard.Step>
              <Wizard.Step title="Step 2">
                <Field.String path="/bar" required />
                <output>Step 2</output>
                <Wizard.Buttons />
              </Wizard.Step>
              <Wizard.Step title="Step 3">
                <Field.String path="/baz" />
                <output>Step 3</output>
                <Wizard.Buttons />
              </Wizard.Step>
            </Wizard.Container>
          </Form.Handler>
        )

        expect(output()).toHaveTextContent('Step 3')
        expect(screen.queryAllByText(nb.Step.stepHasError)).toHaveLength(0)

        fireEvent.submit(document.querySelector('form'))

        expect(screen.getAllByText(nb.Step.stepHasError)).toHaveLength(1)
      })

      it('should not show error status without form submit', async () => {
        render(
          <Form.Handler>
            <Wizard.Container mode="loose" initialActiveIndex={2}>
              <Wizard.Step title="Step 1">
                <Field.String path="/foo" required />
                <output>Step 1</output>
                <Wizard.Buttons />
              </Wizard.Step>
              <Wizard.Step title="Step 2">
                <Field.String path="/bar" required />
                <output>Step 2</output>
                <Wizard.Buttons />
              </Wizard.Step>
              <Wizard.Step title="Step 3">
                <Field.String path="/baz" />
                <output>Step 3</output>
                <Wizard.Buttons />
              </Wizard.Step>
            </Wizard.Container>
          </Form.Handler>
        )

        expect(output()).toHaveTextContent('Step 3')
        expect(screen.queryAllByText(nb.Step.stepHasError)).toHaveLength(0)

        fireEvent.submit(document.querySelector('form'))

        expect(screen.getAllByText(nb.Step.stepHasError)).toHaveLength(1)

        await expandStepIndicator()
        expect(screen.getAllByText(nb.Step.stepHasError)).toHaveLength(2)
      })

      it('should not show error status on navigation without form submit', async () => {
        // Increase timeout for this specific test
        jest.setTimeout(15000)
        render(
          <Form.Handler>
            <Wizard.Container
              mode="loose"
              initialActiveIndex={1}
              expandedInitially
            >
              <Wizard.Step title="Step 1">
                <Field.String path="/foo" required />
                <output>Step 1</output>
                <Wizard.Buttons />
              </Wizard.Step>
              <Wizard.Step title="Step 2">
                <Field.String path="/bar" />
                <output>Step 2</output>
                <Wizard.Buttons />
              </Wizard.Step>
              <Wizard.Step title="Step 3">
                <Field.String path="/baz" />
                <output>Step 3</output>
                <Wizard.Buttons />
              </Wizard.Step>
            </Wizard.Container>
          </Form.Handler>
        )

        expect(output()).toHaveTextContent('Step 2')
        expect(screen.queryAllByText(nb.Step.stepHasError)).toHaveLength(0)

        await userEvent.click(nextButton())

        await waitFor(
          () => {
            expect(output()).toHaveTextContent('Step 3')
          },
          { timeout: 10000, interval: 100 }
        )

        // Wait for error status to be cleared
        await waitFor(
          () => {
            expect(
              screen.queryAllByText(nb.Step.stepHasError)
            ).toHaveLength(0)
          },
          { timeout: 10000, interval: 100 }
        )

        fireEvent.submit(document.querySelector('form'))

        expect(screen.getAllByText(nb.Step.stepHasError)).toHaveLength(1)

        await userEvent.click(previousButton())

        expect(screen.getAllByText(nb.Step.stepHasError)).toHaveLength(1)
      })

      it('should not show error status on same step', async () => {
        let currentIndex = null

        render(
          <Form.Handler>
            <Wizard.Container
              mode="loose"
              initialActiveIndex={2}
              expandedInitially
            >
              <Wizard.Step title="Step 1">
                <Field.String path="/foo" required />
                <Wizard.Buttons />
              </Wizard.Step>
              <Wizard.Step title="Step 2">
                <Field.String path="/bar" required />
                <Wizard.Buttons />
              </Wizard.Step>
              <Wizard.Step title="Step 3">
                <Field.String path="/baz" />
                <Wizard.Buttons />
              </Wizard.Step>

              <Form.SubmitButton />

              <WizardContext.Consumer>
                {(context) => {
                  currentIndex = context.activeIndex
                  return null
                }}
              </WizardContext.Consumer>
            </Wizard.Container>
          </Form.Handler>
        )

        const [firstStep, secondStep] = Array.from(
          document.querySelectorAll('.dnb-step-indicator__item')
        )

        expect(currentIndex).toBe(2)

        fireEvent.submit(document.querySelector('form'))

        await waitFor(
          () => {
            expect(screen.getAllByText(nb.Step.stepHasError)).toHaveLength(
              2
            )
          },
          { timeout: 10000, interval: 100 }
        )

        await userEvent.click(previousButton())

        expect(currentIndex).toBe(1)

        expect(
          firstStep.querySelector(
            '.dnb-step-indicator__item-content__status'
          )
        ).toHaveTextContent(nb.Step.stepHasError)
        expect(
          secondStep.querySelector(
            '.dnb-step-indicator__item-content__status'
          )
        ).not.toBeInTheDocument()
        expect(screen.queryAllByText(nb.Step.stepHasError)).toHaveLength(1)
      })

      it('should run validation before every step change using StepIndicator menu to navigate back and forth', async () => {
        const onStepChange = jest.fn()

        render(
          <Form.Handler>
            <Wizard.Container
              onStepChange={onStepChange}
              expandedInitially
            >
              <Wizard.Step title="Step 1">
                <Field.String required />
                <output>Step 1</output>
                <Wizard.Buttons />
              </Wizard.Step>
              <Wizard.Step title="Step 2">
                <output>Step 2</output>
                <Wizard.Buttons />
              </Wizard.Step>
            </Wizard.Container>
          </Form.Handler>
        )

        const [firstStep, secondStep] = Array.from(
          document.querySelectorAll('.dnb-step-indicator__item')
        )

        expect(output()).toHaveTextContent('Step 1')

        // Try Step 2
        await userEvent.click(nextButton()) // Use nextButton, because menu button of step is not active yet

        expect(output()).toHaveTextContent('Step 1')
        expect(
          document.querySelector('.dnb-form-status')
        ).toBeInTheDocument()

        await userEvent.type(document.querySelector('input'), 'foo')

        // Try Step 2
        await userEvent.click(nextButton()) // Use nextButton, because menu button of step is not active yet

        expect(output()).toHaveTextContent('Step 2')
        expect(document.querySelector('.dnb-form-status')).toBeNull()

        await userEvent.click(firstStep.querySelector('.dnb-anchor'))

        expect(output()).toHaveTextContent('Step 1')

        // Try Step 2 (because no path="/foo" is given, the value got lost)
        await userEvent.click(secondStep.querySelector('.dnb-anchor'))

        expect(output()).toHaveTextContent('Step 1')
        expect(
          document.querySelector('.dnb-form-status')
        ).toBeInTheDocument()

        await userEvent.type(
          document.querySelector('input'),
          '{Backspace>3}'
        )

        // Try Step 2
        await userEvent.click(secondStep.querySelector('.dnb-anchor'))

        expect(output()).toHaveTextContent('Step 1')
        expect(
          document.querySelector('.dnb-form-status')
        ).toBeInTheDocument()

        await userEvent.type(document.querySelector('input'), 'foo')

        // Try Step 2
        await userEvent.click(secondStep.querySelector('.dnb-anchor'))
        expect(output()).toHaveTextContent('Step 2')
        expect(document.querySelector('.dnb-form-status')).toBeNull()
      })

      it('should show error in menu when validation fails', async () => {
        render(
          <Form.Handler>
            <Wizard.Container mode="loose" expandedInitially>
              <Wizard.Step title="Step 1">
                <Field.String path="/foo" required />
                <output>Step 1</output>
                <Wizard.Buttons />
              </Wizard.Step>
              <Wizard.Step title="Step 2">
                <Field.String path="/bar" required />
                <output>Step 2</output>
                <Wizard.Buttons />
              </Wizard.Step>
            </Wizard.Container>
          </Form.Handler>
        )

        const [firstStep, secondStep] = Array.from(
          document.querySelectorAll('.dnb-step-indicator__item')
        )

        expect(output()).toHaveTextContent('Step 1')

        // Try Step 2
        await userEvent.click(nextButton())

        expect(output()).toHaveTextContent('Step 1')

        expect(screen.queryAllByText(nb.Step.stepHasError)).toHaveLength(0)
        expect(
          firstStep.querySelector(
            '.dnb-step-indicator__item-content__status'
          )
        ).not.toBeInTheDocument()
        expect(
          document.querySelectorAll(
            '.dnb-step-indicator__item-content__status.dnb-form-status--error'
          )
        ).toHaveLength(0)

        // To to Step 2
        await userEvent.click(secondStep.querySelector('.dnb-anchor'))

        expect(output()).toHaveTextContent('Step 2')

        fireEvent.submit(document.querySelector('form'))

        expect(screen.queryAllByText(nb.Step.stepHasError)).toHaveLength(1)
        expect(
          firstStep.querySelector(
            '.dnb-step-indicator__item-content__status'
          )
        ).toHaveTextContent(nb.Step.stepHasError)
        expect(
          secondStep.querySelector(
            '.dnb-step-indicator__item-content__status'
          )
        ).not.toBeInTheDocument()

        await userEvent.type(document.querySelector('input'), 'bar')

        expect(screen.getAllByText(nb.Step.stepHasError)).toHaveLength(1)
        expect(
          firstStep.querySelector(
            '.dnb-step-indicator__item-content__status'
          )
        ).toHaveTextContent(nb.Step.stepHasError)

        await userEvent.click(previousButton())

        expect(output()).toHaveTextContent('Step 1')

        await userEvent.type(document.querySelector('input'), 'bar')

        expect(screen.queryAllByText(nb.Step.stepHasError)).toHaveLength(0)

        await userEvent.type(
          document.querySelector('input'),
          '{Backspace>3}'
        )

        expect(screen.queryAllByText(nb.Step.stepHasError)).toHaveLength(0)

        // Try Step 2
        await userEvent.click(nextButton())

        expect(screen.queryAllByText(nb.Step.stepHasError)).toHaveLength(0)
      })

      it('should show error in menu of other steps with errors', async () => {
        render(
          <Form.Handler>
            <Wizard.Container
              mode="loose"
              initialActiveIndex={2}
              expandedInitially
            >
              <Wizard.Step title="Step 1">
                <Field.String path="/foo" required />
                <output>Step 1</output>
                <Wizard.Buttons />
              </Wizard.Step>
              <Wizard.Step title="Step 2">
                <Field.String path="/bar" required />
                <output>Step 2</output>
                <Wizard.Buttons />
              </Wizard.Step>
              <Wizard.Step title="Step 3">
                <Field.String path="/baz" />
                <output>Step 3</output>
                <Wizard.Buttons />
              </Wizard.Step>
            </Wizard.Container>
          </Form.Handler>
        )

        expect(output()).toHaveTextContent('Step 3')

        fireEvent.submit(document.querySelector('form'))

        const [firstStep, secondStep] = Array.from(
          document.querySelectorAll('.dnb-step-indicator__item')
        )

        expect(screen.getAllByText(nb.Step.stepHasError)).toHaveLength(2)
        expect(
          firstStep.querySelector(
            '.dnb-step-indicator__item-content__status'
          )
        ).toHaveTextContent(nb.Step.stepHasError)
        expect(
          secondStep.querySelector(
            '.dnb-step-indicator__item-content__status'
          )
        ).toHaveTextContent(nb.Step.stepHasError)
        expect(
          document.querySelectorAll(
            '.dnb-step-indicator__item-content__status.dnb-form-status--error'
          )
        ).toHaveLength(2)

        await userEvent.click(previousButton())

        expect(output()).toHaveTextContent('Step 2')
        expect(screen.getAllByText(nb.Step.stepHasError)).toHaveLength(1)

        await userEvent.click(nextButton())

        expect(output()).toHaveTextContent('Step 2')
        expect(screen.getAllByText(nb.Step.stepHasError)).toHaveLength(1)

        await userEvent.type(document.querySelector('input'), 'bar')

        expect(screen.getAllByText(nb.Step.stepHasError)).toHaveLength(1)

        await userEvent.click(previousButton())

        expect(output()).toHaveTextContent('Step 1')
        expect(screen.queryAllByText(nb.Step.stepHasError)).toHaveLength(0)

        await userEvent.click(nextButton())

        expect(output()).toHaveTextContent('Step 1')
        expect(screen.queryAllByText(nb.Step.stepHasError)).toHaveLength(0)

        await userEvent.type(document.querySelector('input'), 'foo')

        expect(screen.queryAllByText(nb.Step.stepHasError)).toHaveLength(0)

        await userEvent.click(nextButton())

        expect(output()).toHaveTextContent('Step 2')

        await userEvent.click(nextButton())

        expect(output()).toHaveTextContent('Step 3')
      })

      it('should remove error in menu after user enters required data using Field.Boolean', async () => {
        render(
          <Form.Handler>
            <Wizard.Container mode="loose" expandedInitially>
              <Wizard.Step title="Step 1">
                <Field.Boolean path="/foo" variant="checkbox" required />
                <output>Step 1</output>
                <Wizard.Buttons />
              </Wizard.Step>
              <Wizard.Step title="Step 2">
                <Field.Boolean path="/bar" variant="checkbox" required />
                <output>Step 2</output>
                <Wizard.Buttons />
              </Wizard.Step>
            </Wizard.Container>
          </Form.Handler>
        )

        const [firstStep, secondStep] = Array.from(
          document.querySelectorAll('.dnb-step-indicator__item')
        )

        expect(output()).toHaveTextContent('Step 1')

        // Try Step 2
        await userEvent.click(nextButton())

        expect(output()).toHaveTextContent('Step 1')

        expect(screen.queryAllByText(nb.Step.stepHasError)).toHaveLength(0)
        expect(
          firstStep.querySelector(
            '.dnb-step-indicator__item-content__status'
          )
        ).not.toBeInTheDocument()
        expect(
          document.querySelectorAll(
            '.dnb-step-indicator__item-content__status.dnb-form-status--error'
          )
        ).toHaveLength(0)

        // To to Step 2
        await userEvent.click(secondStep.querySelector('.dnb-anchor'))

        expect(output()).toHaveTextContent('Step 2')

        fireEvent.submit(document.querySelector('form'))

        expect(screen.getAllByText(nb.Step.stepHasError)).toHaveLength(1)
        expect(
          firstStep.querySelector(
            '.dnb-step-indicator__item-content__status'
          )
        ).toHaveTextContent(nb.Step.stepHasError)
        expect(
          secondStep.querySelector(
            '.dnb-step-indicator__item-content__status'
          )
        ).not.toBeInTheDocument()

        await userEvent.click(screen.getByRole('checkbox'))

        expect(screen.getAllByText(nb.Step.stepHasError)).toHaveLength(1)
        expect(
          firstStep.querySelector(
            '.dnb-step-indicator__item-content__status'
          )
        ).toHaveTextContent(nb.Step.stepHasError)

        await userEvent.click(previousButton())

        expect(output()).toHaveTextContent('Step 1')

        await userEvent.click(screen.getByRole('checkbox'))

        expect(screen.queryAllByText(nb.Step.stepHasError)).toHaveLength(0)
      })

      it('should remove error in menu when visibility hides the field', async () => {
        render(
          <Form.Handler>
            <Wizard.Container>
              <Wizard.Step title="Step 1">
                <output>Step 1</output>
                <Form.Section
                  required // Ensure all fields in the section are required
                  path="/sectionPath"
                >
                  <Field.Boolean path="/isThisTrue" variant="buttons" />
                  <Form.Visibility pathFalse="/isThisTrue">
                    <Field.String path="/showMeWhenTrue" />
                  </Form.Visibility>
                  <Wizard.Buttons />
                </Form.Section>
              </Wizard.Step>

              <Wizard.Step title="Step 2">
                <output>Step 2</output>
                <Field.String path="/someField" />
              </Wizard.Step>
            </Wizard.Container>
          </Form.Handler>
        )

        expect(document.querySelector('.dnb-form-status')).toBeNull()

        await userEvent.click(screen.getByText('Neste'))

        expect(document.querySelectorAll('.dnb-form-status')).toHaveLength(
          1
        )
        expect(
          document.querySelector('.dnb-form-status')
        ).toHaveTextContent(nb.Field.errorRequired)

        await userEvent.click(screen.getByText('Nei'))

        expect(document.querySelector('.dnb-form-status')).toBeNull()

        await userEvent.click(screen.getByText('Neste'))

        expect(document.querySelectorAll('.dnb-form-status')).toHaveLength(
          1
        )
        expect(
          document.querySelector('.dnb-form-status')
        ).toHaveTextContent(nb.Field.errorRequired)

        await userEvent.click(screen.getByText('Ja'))

        expect(document.querySelector('.dnb-form-status')).toBeNull()

        expect(output()).toHaveTextContent('Step 1')

        await userEvent.click(screen.getByText('Neste'))

        expect(output()).toHaveTextContent('Step 2')
        expect(document.querySelector('.dnb-form-status')).toBeNull()
      })

      it('should not show error during back and forth navigation', async () => {
        const onStepChange = async () => {
          await wait(1)
        }

        render(
          <Form.Handler>
            <Wizard.Container
              onStepChange={onStepChange}
              expandedInitially
            >
              <Wizard.Step title="Step 1">
                <output>Step 1</output>
                <Wizard.Buttons />
              </Wizard.Step>

              <Wizard.Step title="Step 2">
                <output>Step 2</output>

                <Field.Boolean
                  path="/foo"
                  variant="buttons"
                  required // ensure to show error message
                />

                <Wizard.Buttons />
              </Wizard.Step>

              <Wizard.Step title="Step 3">
                <output>Step 3</output>
                <Wizard.Buttons />
              </Wizard.Step>
            </Wizard.Container>
          </Form.Handler>
        )

        expect(output()).toHaveTextContent('Step 1')
        expect(
          document.querySelector(
            '.dnb-step-indicator__item-content__status'
          )
        ).toBeNull()
        expect(document.querySelector('.dnb-form-status')).toBeNull()

        await userEvent.click(nextButton())

        expect(output()).toHaveTextContent('Step 2')
        expect(
          document.querySelector(
            '.dnb-step-indicator__item-content__status'
          )
        ).toBeNull()
        expect(document.querySelector('.dnb-form-status')).toBeNull()

        await userEvent.click(previousButton())

        expect(output()).toHaveTextContent('Step 1')
        expect(
          document.querySelector(
            '.dnb-step-indicator__item-content__status'
          )
        ).toBeNull()
        expect(document.querySelector('.dnb-form-status')).toBeNull()

        await userEvent.click(nextButton())

        expect(output()).toHaveTextContent('Step 2')
        expect(
          document.querySelector(
            '.dnb-step-indicator__item-content__status'
          )
        ).toBeNull()
        expect(document.querySelector('.dnb-form-status')).toBeNull()

        await userEvent.click(nextButton())

        expect(output()).toHaveTextContent('Step 2')
        expect(
          document.querySelector(
            '.dnb-step-indicator__item-content__status'
          )
        ).toBeNull()
        expect(document.querySelectorAll('.dnb-form-status')).toHaveLength(
          1
        )
        expect(
          document.querySelector('.dnb-form-status')
        ).toHaveTextContent(nb.Field.errorRequired)

        await userEvent.click(previousButton())

        expect(output()).toHaveTextContent('Step 1')
        expect(
          document.querySelector(
            '.dnb-step-indicator__item-content__status'
          )
        ).toHaveTextContent(nb.Step.stepHasError)
        expect(content().querySelector('.dnb-form-status')).toBeNull()

        await userEvent.click(nextButton())

        expect(output()).toHaveTextContent('Step 2')
        expect(
          document.querySelector(
            '.dnb-step-indicator__item-content__status'
          )
        ).toBeNull()
        expect(document.querySelectorAll('.dnb-form-status')).toHaveLength(
          1
        )
        expect(
          document.querySelector('.dnb-form-status')
        ).toHaveTextContent(nb.Field.errorRequired)
      })
    })

    it('should show a error beneath the trigger button when the step status has an error and the screen width is small', async () => {
      simulateSmallScreen()

      render(
        <Form.Handler>
          <Wizard.Container mode="loose">
            <Wizard.Step title="Step 1">
              <Field.String path="/foo" required />
              <output>Step 1</output>
              <Wizard.Buttons />
            </Wizard.Step>
            <Wizard.Step title="Step 2">
              <output>Step 2</output>
              <Wizard.Buttons />
            </Wizard.Step>
          </Wizard.Container>
        </Form.Handler>
      )

      expect(
        document.querySelectorAll('.dnb-step-indicator__item')
      ).toHaveLength(0)
      expect(output()).toHaveTextContent('Step 1')

      // Try submit while on Step 1
      fireEvent.submit(document.querySelector('form'))

      expect(output()).toHaveTextContent('Step 1')
      // Expect a single only from the input field
      expect(document.querySelectorAll('.dnb-form-status')).toHaveLength(1)
      expect(
        content().querySelector('.dnb-form-status')
      ).not.toHaveTextContent(nb.Step.stepHasError)

      // Open the drawer
      await expandStepIndicator()

      // Expect no errors in the step indicator list
      expect(document.querySelectorAll('.dnb-form-status')).toHaveLength(1)

      // Go to Step 2
      const [firstStep, secondStep] = Array.from(
        document.querySelectorAll('.dnb-step-indicator__item')
      )
      await userEvent.click(secondStep.querySelector('.dnb-anchor'))

      // Expect a single error on the first step
      expect(document.querySelectorAll('.dnb-form-status')).toHaveLength(1)
      expect(
        firstStep.querySelector('.dnb-form-status')
      ).toHaveTextContent(nb.Step.stepHasError)
    })
  })

  describe('prerenderFieldProps and filterData', () => {
    it('should keep field props in memory during step change', async () => {
      const filterDataHandler = jest.fn(({ props }) => {
        if (props['data-exclude-field']) {
          return false
        }
      })

      const onChange = jest.fn()

      let currentData = null
      let filteredData = null

      const MyForm = () => {
        const { data, filterData } = Form.useData('my-form')
        currentData = data
        filteredData = filterData(filterDataHandler)

        return (
          <Form.Handler
            id="my-form"
            defaultData={{
              fooStep1: 'has value',
              barStep1: 'has value',
              fooStep2: 'has value',
              barStep2: 'has value',
            }}
            onChange={onChange}
          >
            <Wizard.Container>
              <Wizard.Step title="Step 1">
                <Field.String path="/fooStep1" />
                <Field.String path="/barStep1" data-exclude-field />
                <Wizard.Buttons />
              </Wizard.Step>

              <Wizard.Step title="Step 2">
                <Field.String path="/fooStep2" />
                <Field.String path="/barStep2" data-exclude-field />
                <Wizard.Buttons />
              </Wizard.Step>

              <Wizard.Step title="Step 3">
                <Field.String path="/fooStep3" />
                <Field.String path="/barStep3" data-exclude-field />
                <Wizard.Buttons />
              </Wizard.Step>
            </Wizard.Container>
          </Form.Handler>
        )
      }

      render(<MyForm />)

      expect(filterDataHandler).toHaveBeenCalledTimes(6)

      expect(currentData).toEqual({
        barStep1: 'has value',
        fooStep1: 'has value',
        fooStep2: 'has value',
        barStep2: 'has value',
      })

      expect(filteredData).toEqual({
        fooStep1: 'has value',
        fooStep2: 'has value',
        fooStep3: undefined,
      })

      await userEvent.click(nextButton())

      expect(currentData).toEqual({
        barStep1: 'has value',
        fooStep1: 'has value',
        fooStep2: 'has value',
        barStep2: 'has value',
      })

      expect(filteredData).toEqual({
        fooStep1: 'has value',
        fooStep2: 'has value',
        fooStep3: undefined,
      })

      await wait(100)
      await userEvent.type(document.querySelector('input'), ' changed')

      expect(onChange).toHaveBeenCalledTimes(8)
      expect(onChange).toHaveBeenLastCalledWith(
        {
          barStep1: 'has value',
          barStep2: 'has value',
          barStep3: undefined,
          fooStep1: 'has value',
          fooStep2: 'has value changed',
          fooStep3: undefined,
        },
        expect.anything()
      )

      await userEvent.click(nextButton())

      expect(currentData).toEqual({
        barStep1: 'has value',
        fooStep1: 'has value',
        fooStep2: 'has value changed',
        barStep2: 'has value',
        fooStep3: undefined,
        barStep3: undefined,
      })

      expect(filteredData).toEqual({
        fooStep1: 'has value',
        fooStep2: 'has value changed',
        fooStep3: undefined,
      })

      await userEvent.click(previousButton())

      expect(currentData).toEqual({
        barStep1: 'has value',
        fooStep1: 'has value',
        fooStep2: 'has value changed',
        barStep2: 'has value',
        fooStep3: undefined,
        barStep3: undefined,
      })

      expect(filteredData).toEqual({
        fooStep1: 'has value',
        fooStep2: 'has value changed',
        fooStep3: undefined,
      })

      expect(filterDataHandler).toHaveBeenCalledTimes(54)
    })

    it('should set field props of all steps when "prerenderFieldProps" is set', () => {
      const filterDataHandler = jest.fn(({ props }) => {
        if (props['data-exclude-field']) {
          return false
        }
      })

      let currentData = null
      let filteredData = null

      const MyWizard = () => {
        const { data, filterData } = Form.useData()
        currentData = data
        filteredData = filterData(filterDataHandler)

        return (
          <Wizard.Container initialActiveIndex={2}>
            <Wizard.Step title="Step 1">
              <Field.String path="/fooStep1" />
              <Field.String path="/barStep1" data-exclude-field />
              <Wizard.Buttons />
            </Wizard.Step>

            <Wizard.Step title="Step 2">
              <Field.String path="/fooStep2" />
              <Field.String path="/barStep2" data-exclude-field />
              <Wizard.Buttons />
            </Wizard.Step>

            <Wizard.Step title="Step 3">
              <Field.String path="/fooStep3" />
              <Field.String
                path="/barStep3"
                // excludeFromFilterData
                data-exclude-field
              />
              <Wizard.Buttons />
            </Wizard.Step>
          </Wizard.Container>
        )
      }

      render(
        <Form.Handler
          defaultData={{
            fooStep2: 'has value',
            barStep2: 'has value',
            fooStep3: 'has value',
            barStep3: 'has value',
          }}
        >
          <MyWizard />
        </Form.Handler>
      )

      expect(currentData).toEqual({
        barStep1: undefined,
        fooStep1: undefined,
        barStep2: 'has value',
        fooStep2: 'has value',
        barStep3: 'has value',
        fooStep3: 'has value',
      })

      expect(filteredData).toEqual({
        fooStep1: undefined,
        fooStep2: 'has value',
        fooStep3: 'has value',
      })
    })

    it('should put prerendered fields (Step 1) in the portal inside an hidden iframe', async () => {
      const addedNodes = []
      const removedNodes = []

      const observer = new MutationObserver((mutationsList) => {
        for (const mutation of mutationsList) {
          if (mutation.type === 'childList') {
            if (mutation.removedNodes?.length) {
              removedNodes.push(mutation.removedNodes)
            }
            if (mutation.addedNodes?.length) {
              addedNodes.push(mutation.addedNodes)
            }
          }
        }
      })

      observer.observe(document.body, {
        childList: true,
      })

      render(
        <Form.Handler>
          <Wizard.Container initialActiveIndex={1}>
            <Wizard.Step title="Step 1">
              <Field.String path="/fooStep1" />
              <Field.String path="/barStep1" />
              <Wizard.Buttons />
            </Wizard.Step>

            <Wizard.Step title="Step 2">
              <Field.String path="/fooStep2" />
              <Field.String path="/barStep2" />
              <Wizard.Buttons />
            </Wizard.Step>
          </Wizard.Container>
        </Form.Handler>
      )

      expect(document.querySelector('iframe').innerHTML).toBe('')

      await wait(1)

      observer.disconnect()

      expect(addedNodes).toHaveLength(2)
      expect(addedNodes[0]).toHaveLength(1)
      expect(addedNodes[0][0]).toBe(document.body.querySelector('div'))
      expect(addedNodes[1]).toHaveLength(1)
      expect(addedNodes[1][0].tagName).toBe('IFRAME')

      const iframe = addedNodes[1][0]
      expect(iframe).toHaveAttribute('hidden', '')
      expect(iframe).toHaveAttribute('title', 'Wizard Prerender')
      expect(iframe).toHaveTextContent('')
      expect(iframe.innerHTML).toBe('')

      expect(removedNodes).toHaveLength(0)
    })
  })

  describe('defaultValue', () => {
    it('should set defaultValue of a Field.* only once between step changes', async () => {
      const onChange = jest.fn()
      const onStepChange = jest.fn()

      render(
        <Form.Handler onChange={onChange}>
          <Wizard.Container onStepChange={onStepChange}>
            <Wizard.Step>
              <Field.String path="/foo" defaultValue="123" />
              <Wizard.Buttons />
            </Wizard.Step>

            <Wizard.Step>
              <Wizard.Buttons />
            </Wizard.Step>
          </Wizard.Container>
        </Form.Handler>
      )

      const input = () => {
        const element = content()?.querySelector('input')
        if (!element) {
          throw new Error('Active wizard input not found')
        }
        return element as HTMLInputElement
      }

      expect(input()).toHaveValue('123')

      await userEvent.type(input(), '4')

      expect(input()).toHaveValue('1234')

      await userEvent.click(nextButton())

      expect(onStepChange).toHaveBeenLastCalledWith(
        1,
        'next',
        expect.anything()
      )

      await userEvent.click(previousButton())

      expect(onStepChange).toHaveBeenLastCalledWith(
        0,
        'previous',
        expect.anything()
      )

      expect(input()).toHaveValue('1234')
    })

    it('should remember an entered value between step changes', async () => {
      const log = spyOnEufemiaWarn()

      const onChange = jest.fn()
      const onStepChange = jest.fn()

      render(
        <Form.Handler onChange={onChange}>
          <Wizard.Container onStepChange={onStepChange}>
            <Wizard.Step>
              <Iterate.Array path="/items" defaultValue={[null]}>
                <Field.String itemPath="/" />
              </Iterate.Array>

              <Wizard.Buttons />
            </Wizard.Step>

            <Wizard.Step>
              <Iterate.Array path="/items">
                <Field.String itemPath="/" />
              </Iterate.Array>

              <Wizard.Buttons />
            </Wizard.Step>
          </Wizard.Container>
        </Form.Handler>
      )

      const input = () => {
        const element = content()?.querySelector('input')
        if (!element) {
          throw new Error('Active wizard input not found')
        }
        return element as HTMLInputElement
      }

      expect(input()).toHaveValue('')

      await userEvent.type(input(), '123')

      expect(input()).toHaveValue('123')

      await userEvent.click(nextButton())
      expect(onStepChange).toHaveBeenLastCalledWith(
        1,
        'next',
        expect.anything()
      )
      expect(input()).toHaveValue('123')

      await waitFor(async () => {
        await userEvent.type(input(), '4')
        expect(input()).toHaveValue('1234')
      })

      await userEvent.click(previousButton())
      expect(onStepChange).toHaveBeenLastCalledWith(
        0,
        'previous',
        expect.anything()
      )
      await waitFor(() => {
        expect(input()).toHaveValue('1234')
      })

      log.mockRestore()
    })

    it('should set defaultValue of Iterate.Array only once between step changes', async () => {
      const onChange = jest.fn()
      const onStepChange = jest.fn()

      render(
        <Form.Handler onChange={onChange}>
          <Wizard.Container onStepChange={onStepChange}>
            <Wizard.Step>
              <Iterate.Array path="/items" defaultValue={[null]}>
                <Field.String itemPath="/" defaultValue="123" />
              </Iterate.Array>

              <Iterate.PushButton pushValue={null} path="/items" />

              <Wizard.Buttons />
            </Wizard.Step>

            <Wizard.Step>
              <Wizard.Buttons />
            </Wizard.Step>
          </Wizard.Container>
        </Form.Handler>
      )

      const input = () => {
        const element = content()?.querySelector('input')
        if (!element) {
          throw new Error('Active wizard input not found')
        }
        return element as HTMLInputElement
      }

      expect(document.querySelectorAll('input')).toHaveLength(1)
      expect(input()).toHaveValue('123')

      await userEvent.type(input(), '4')

      expect(input()).toHaveValue('1234')

      const pushButton = document.querySelector(
        '.dnb-forms-iterate-push-button'
      )
      await userEvent.click(pushButton)

      expect(document.querySelectorAll('input')).toHaveLength(2)

      await userEvent.click(nextButton())

      expect(onStepChange).toHaveBeenLastCalledWith(
        1,
        'next',
        expect.anything()
      )

      await userEvent.click(previousButton())

      expect(document.querySelectorAll('input')).toHaveLength(2)
      expect(onStepChange).toHaveBeenLastCalledWith(
        0,
        'previous',
        expect.anything()
      )
      expect(input()).toHaveValue('1234')
    })
  })

  it('should call onSubmitRequest on step change', async () => {
    let receivedErrors = null

    const onSubmitRequest: OnSubmitRequest = jest.fn(({ getErrors }) => {
      receivedErrors = getErrors()
    })

    render(
      <Form.Handler onSubmitRequest={onSubmitRequest}>
        <Wizard.Container mode="loose">
          <Wizard.Step title="Step 1">
            <Form.Card>
              <Field.String path="/bar" label="Bar" required />
            </Form.Card>
            <Wizard.Buttons />
          </Wizard.Step>

          <Wizard.Step title="Step 2">
            <Wizard.Buttons />
          </Wizard.Step>
        </Wizard.Container>
      </Form.Handler>
    )

    await userEvent.click(nextButton())

    expect(onSubmitRequest).toHaveBeenCalledTimes(1)
    expect(onSubmitRequest).toHaveBeenLastCalledWith(
      expect.objectContaining({
        getErrors: expect.any(Function),
      })
    )
    expect(receivedErrors).toEqual([
      {
        path: '/bar',
        value: undefined,
        displayValue: undefined,
        label: 'Bar',
        props: expect.objectContaining({
          label: 'Bar',
        }),
        data: {
          bar: undefined,
        },
        error: new Error(nb.Field.errorRequired),
        internal: {
          error: new Error(nb.Field.errorRequired),
        },
      },
    ])
  })

  describe('keepInDOM', () => {
    it('should keep all non-active steps in the DOM when keepInDOM is true', async () => {
      render(
        <Wizard.Container keepInDOM>
          <Wizard.Step>Active Content</Wizard.Step>
          <Wizard.Step>keepInDOM Content</Wizard.Step>
          <Wizard.Step>keepInDOM Content</Wizard.Step>
        </Wizard.Container>
      )

      const [step1, step2, step3] = Array.from(
        document.querySelectorAll('.dnb-forms-step')
      )

      expect(step1).toHaveTextContent('Active Content')
      expect(step1.parentElement).not.toHaveAttribute('hidden')

      expect(step2).toHaveTextContent('keepInDOM Content')
      expect(step2.parentElement).toHaveAttribute('hidden')

      expect(step3).toHaveTextContent('keepInDOM Content')
      expect(step3.parentElement).toHaveAttribute('hidden')
    })
  })

  describe('step context render routine', () => {
    it('should hide the visibility content when the condition is met', async () => {
      render(
        <Form.Handler>
          <Wizard.Container mode="loose">
            <Wizard.Step title="Step 1">
              <output>Step 1</output>
              <Form.Section
                required // Ensure all fields in the section are required
                path="/sectionPath"
              >
                <Field.Boolean path="/isThisTrue" variant="buttons" />
                <Form.Visibility pathFalse="/isThisTrue">
                  <Field.String path="/showMeWhenTrue" />
                </Form.Visibility>
                <Wizard.Buttons />
              </Form.Section>
            </Wizard.Step>

            <Wizard.Step title="Step 2">
              <output>Step 2</output>
              <Field.String path="/someField" />
            </Wizard.Step>
          </Wizard.Container>
        </Form.Handler>
      )

      expect(document.querySelector('.dnb-form-status')).toBeNull()

      await userEvent.click(screen.getByText('Neste'))

      expect(document.querySelectorAll('.dnb-form-status')).toHaveLength(1)
      expect(document.querySelector('.dnb-form-status')).toHaveTextContent(
        nb.Field.errorRequired
      )

      await userEvent.click(screen.getByText('Nei'))

      expect(document.querySelector('.dnb-form-status')).toBeNull()

      await userEvent.click(screen.getByText('Neste'))

      expect(document.querySelectorAll('.dnb-form-status')).toHaveLength(1)
      expect(document.querySelector('.dnb-form-status')).toHaveTextContent(
        nb.Field.errorRequired
      )

      await userEvent.click(screen.getByText('Ja'))

      expect(document.querySelector('.dnb-form-status')).toBeNull()

      expect(output()).toHaveTextContent('Step 1')

      await userEvent.click(screen.getByText('Neste'))

      expect(output()).toHaveTextContent('Step 2')
      expect(document.querySelector('.dnb-form-status')).toBeNull()
    })

    it('should hide the visibility content when the condition is met using a schema', async () => {
      render(
        <Form.Handler
          schema={{
            type: 'object',
            required: ['sectionPath'],
            properties: {
              sectionPath: {
                type: 'object',
                additionalProperties: false,
                required: ['isThisTrue'],
                properties: {
                  isThisTrue: {
                    type: 'boolean',
                  },
                  showMeWhenTrue: {
                    type: 'string',
                  },
                },
                if: {
                  properties: {
                    isThisTrue: {
                      const: false,
                    },
                  },
                },
                then: {
                  required: ['showMeWhenTrue'],
                },
              },
            },
          }}
          ajvInstance={makeAjvInstance()}
        >
          <Wizard.Container expandedInitially>
            <Wizard.Step title="Step 1">
              <output>Step 1</output>
              <Form.Section path="/sectionPath">
                <Field.Boolean path="/isThisTrue" variant="buttons" />
                <Form.Visibility pathFalse="/isThisTrue">
                  <Field.String path="/showMeWhenTrue" />
                </Form.Visibility>
                <Wizard.Buttons />
              </Form.Section>
            </Wizard.Step>

            <Wizard.Step title="Step 2">
              <output>Step 2</output>
              <Field.String path="/someField" />
            </Wizard.Step>
          </Wizard.Container>
        </Form.Handler>
      )

      expect(document.querySelector('.dnb-form-status')).toBeNull()

      await userEvent.click(screen.getByText('Neste'))

      expect(document.querySelectorAll('.dnb-form-status')).toHaveLength(1)
      expect(document.querySelector('.dnb-form-status')).toHaveTextContent(
        nb.Field.errorRequired
      )

      await userEvent.click(screen.getByText('Nei'))

      expect(document.querySelector('.dnb-form-status')).toBeNull()

      await userEvent.click(screen.getByText('Neste'))

      expect(document.querySelectorAll('.dnb-form-status')).toHaveLength(1)
      expect(document.querySelector('.dnb-form-status')).toHaveTextContent(
        nb.Field.errorRequired
      )

      await userEvent.click(screen.getByText('Ja'))

      expect(document.querySelector('.dnb-form-status')).toBeNull()

      expect(output()).toHaveTextContent('Step 1')

      await userEvent.click(screen.getByText('Neste'))

      expect(output()).toHaveTextContent('Step 2')
      expect(document.querySelector('.dnb-form-status')).toBeNull()
    })
  })

  it('should render the Wizard container in an expanded state when "expandedInitially" is set', () => {
    render(
      <>
        <Wizard.Container expandedInitially>
          <Wizard.Step title="Step 1">
            <Wizard.NextButton />
          </Wizard.Step>
          <Wizard.Step title="Step 2">
            <Wizard.PreviousButton />
          </Wizard.Step>
        </Wizard.Container>
      </>
    )
    expect(
      document.querySelector('button.dnb-step-indicator__trigger__button')
    ).toHaveClass('dnb-step-indicator__trigger__button--expanded')

    expect(
      document.querySelectorAll('li.dnb-step-indicator__item')
    ).toHaveLength(2)
  })
})
