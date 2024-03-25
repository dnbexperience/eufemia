import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import StepsLayout from '../StepsLayout'
import { Field, Form } from '../..'
import userEvent from '@testing-library/user-event'

import nbNO from '../../../../shared/locales/nb-NO'
const nb = nbNO['nb-NO'].Forms

jest.mock('../../../../shared/component-helper', () => {
  const original = jest.requireActual(
    '../../../../shared/component-helper'
  )
  return {
    ...original,
    warn: jest.fn(),
  }
})

describe('StepsLayout', () => {
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

  it('should have "strict" mode as the default mode', () => {
    render(
      <StepsLayout>
        <StepsLayout.Step title="Step 1">
          <StepsLayout.NextButton />
        </StepsLayout.Step>
        <StepsLayout.Step title="Step 2">
          <StepsLayout.PreviousButton />
        </StepsLayout.Step>
      </StepsLayout>
    )

    const [firstStep, secondStep] = Array.from(
      document.querySelectorAll('.dnb-step-indicator__item')
    )

    expect(firstStep.querySelector('.dnb-button').tagName).toBe('BUTTON')
    expect(secondStep.querySelector('.dnb-button').tagName).toBe('SPAN')
  })

  it('should call event listener onStepChange', async () => {
    const onStepChange = jest.fn()

    render(
      <StepsLayout onStepChange={onStepChange} mode="loose">
        <StepsLayout.Step title="Step 1">
          <output>Step 1</output>
          <StepsLayout.NextButton />
        </StepsLayout.Step>

        <StepsLayout.Step title="Step 2">
          <output>Step 2</output>
          <StepsLayout.PreviousButton />
          <StepsLayout.NextButton />
        </StepsLayout.Step>
      </StepsLayout>
    )

    const [firstStep, secondStep] = Array.from(
      document.querySelectorAll('.dnb-step-indicator__item')
    )

    await userEvent.click(secondStep.querySelector('.dnb-button'))
    expect(output()).toHaveTextContent('Step 2')
    expect(onStepChange).toHaveBeenCalledTimes(1)
    expect(onStepChange).toHaveBeenLastCalledWith(1, 'next')

    await userEvent.click(firstStep.querySelector('.dnb-button'))
    expect(output()).toHaveTextContent('Step 1')
    expect(onStepChange).toHaveBeenCalledTimes(2)
    expect(onStepChange).toHaveBeenLastCalledWith(0, 'previous')

    await userEvent.click(nextButton())
    expect(nextButton()).not.toBeDisabled()

    expect(onStepChange).toHaveBeenCalledTimes(3)
    expect(onStepChange).toHaveBeenLastCalledWith(1, 'next')

    // Use fireEvent to trigger the event fast
    fireEvent.click(previousButton())
    expect(previousButton()).not.toBeDisabled()

    await waitFor(() => {
      expect(previousButton()).toBeNull()
      expect(onStepChange).toHaveBeenCalledTimes(4)
      expect(onStepChange).toHaveBeenLastCalledWith(0, 'previous')
      expect(previousButton()).not.toBeInTheDocument()
    })
  })

  it('should show error on navigating back and forth', async () => {
    render(
      <StepsLayout>
        <StepsLayout.Step title="Step 1">
          <output>Step 1</output>
          <Field.String path="/something" />
          <StepsLayout.PreviousButton />
          <StepsLayout.NextButton />
        </StepsLayout.Step>

        <StepsLayout.Step title="Step 2">
          <output>Step 2</output>
          <Field.String path="/foo" required />
          <StepsLayout.PreviousButton />
          <StepsLayout.NextButton />
        </StepsLayout.Step>

        <StepsLayout.Step title="Step 3">
          <output>Step 3</output>
          <StepsLayout.PreviousButton />
          <StepsLayout.NextButton />
        </StepsLayout.Step>
      </StepsLayout>
    )

    expect(output()).toHaveTextContent('Step 1')
    expect(screen.queryByRole('alert')).toBeNull()

    await userEvent.click(nextButton())

    await waitFor(() => {
      expect(output()).toHaveTextContent('Step 2')
      expect(screen.queryByRole('alert')).toBeNull()
    })

    await userEvent.click(nextButton())

    await waitFor(() => {
      expect(output()).toHaveTextContent('Step 2')
      expect(screen.queryByRole('alert')).toBeInTheDocument()
    })

    await userEvent.click(previousButton())

    await waitFor(() => {
      expect(output()).toHaveTextContent('Step 1')
      expect(screen.queryByRole('alert')).toBeNull()
    })

    await userEvent.click(nextButton())

    await waitFor(() => {
      expect(output()).toHaveTextContent('Step 2')
      expect(screen.queryByRole('alert')).toBeInTheDocument()
    })

    await userEvent.type(document.querySelector('input'), 'foo')
    await userEvent.click(nextButton())

    await waitFor(() => {
      expect(output()).toHaveTextContent('Step 3')
      expect(screen.queryByRole('alert')).toBeNull()
    })
  })

  it('should support navigating back and forth with async validators', async () => {
    const validator = async (value: string) => {
      if (value !== 'valid') {
        return new Error('validator-error')
      }
    }

    const onBlurValidator = async (value: string) => {
      if (value !== 'valid') {
        return new Error('onBlurValidator-error')
      }
    }

    render(
      <StepsLayout>
        <StepsLayout.Step title="Step 1">
          <output>Step 1</output>
          <Field.String
            path="/foo"
            required
            validator={validator}
            onBlurValidator={onBlurValidator}
          />
          <StepsLayout.PreviousButton />
          <StepsLayout.NextButton />
        </StepsLayout.Step>

        <StepsLayout.Step title="Step 2">
          <output>Step 2</output>
          <Field.String path="/bar" required />
          <StepsLayout.PreviousButton />
          <StepsLayout.NextButton />
        </StepsLayout.Step>

        <StepsLayout.Step title="Step 3">
          <StepsLayout.PreviousButton />
        </StepsLayout.Step>
      </StepsLayout>
    )

    const input = () => document.querySelector('input')

    expect(output()).toHaveTextContent('Step 1')
    expect(screen.queryByRole('alert')).toBeNull()

    await userEvent.click(nextButton())

    expect(output()).toHaveTextContent('Step 1')
    expect(screen.queryByRole('alert')).toHaveTextContent(
      nb.inputErrorRequired
    )

    await userEvent.type(input(), 'invalid')
    fireEvent.click(nextButton())

    expect(output()).toHaveTextContent('Step 1')
    expect(screen.queryByRole('alert')).toHaveTextContent(
      'validator-error'
    )

    fireEvent.blur(input())

    await waitFor(() => {
      expect(output()).toHaveTextContent('Step 1')
      expect(screen.queryByRole('alert')).toHaveTextContent(
        'onBlurValidator-error'
      )
    })

    fireEvent.change(input(), { target: { value: 'valid' } })
    await userEvent.click(nextButton())

    expect(output()).toHaveTextContent('Step 2')
    expect(screen.queryByRole('alert')).toBeNull()

    await userEvent.click(nextButton())

    expect(output()).toHaveTextContent('Step 2')
    expect(screen.queryByRole('alert')).toHaveTextContent(
      nb.inputErrorRequired
    )

    await userEvent.click(previousButton())

    expect(output()).toHaveTextContent('Step 1')
    expect(screen.queryByRole('alert')).toBeNull()

    await userEvent.type(input(), '{Backspace>8}invalid')
    fireEvent.click(nextButton())

    expect(output()).toHaveTextContent('Step 1')
    expect(screen.queryByRole('alert')).toHaveTextContent(
      'validator-error'
    )

    fireEvent.blur(input())

    await waitFor(() => {
      expect(output()).toHaveTextContent('Step 1')
      expect(screen.queryByRole('alert')).toHaveTextContent(
        'onBlurValidator-error'
      )
    })

    fireEvent.change(input(), { target: { value: 'valid' } })
    await userEvent.click(nextButton())

    expect(output()).toHaveTextContent('Step 2')
    expect(screen.queryByRole('alert')).toHaveTextContent(
      nb.inputErrorRequired
    )
  }, 20000)

  it('should set initialActiveIndex initially but not react on changes', () => {
    const { rerender } = render(
      <StepsLayout initialActiveIndex={1}>
        <StepsLayout.Step title="Step 1">
          <output>Step 1</output>
        </StepsLayout.Step>

        <StepsLayout.Step title="Step 2">
          <output>Step 2</output>
        </StepsLayout.Step>

        <StepsLayout.Step title="Step 3">
          <output>Step 3</output>
        </StepsLayout.Step>
      </StepsLayout>
    )

    expect(output()).toHaveTextContent('Step 2')

    rerender(
      <StepsLayout initialActiveIndex={2}>
        <StepsLayout.Step title="Step 1">
          <output>Step 1</output>
        </StepsLayout.Step>

        <StepsLayout.Step title="Step 2">
          <output>Step 2</output>
        </StepsLayout.Step>

        <StepsLayout.Step title="Step 3">
          <output>Step 3</output>
        </StepsLayout.Step>
      </StepsLayout>
    )

    expect(output()).toHaveTextContent('Step 2')
  })

  it('supports steps to be in their own components', async () => {
    let context = null

    const Step1 = () => {
      context = StepsLayout.useStep()
      return (
        <StepsLayout.Step title="Step 1">
          <output>Step 1</output>
          <StepsLayout.Buttons />
        </StepsLayout.Step>
      )
    }

    const Step2 = () => {
      return (
        <StepsLayout.Step title="Step 2">
          <output>Step 2</output>
          <StepsLayout.Buttons />
        </StepsLayout.Step>
      )
    }
    const Step3 = () => {
      return (
        <StepsLayout.Step title="Step 3">
          <output>Step 3</output>
          <StepsLayout.Buttons />
        </StepsLayout.Step>
      )
    }

    const { rerender } = render(
      <StepsLayout aria-label="step 1">
        <Step1 />
        <Step2 />
        <Step3 />
      </StepsLayout>
    )

    expect(output()).toHaveTextContent('Step 1')
    expect(context.activeIndex).toBe(0)

    rerender(
      <StepsLayout aria-label="step 2">
        <Step1 />
        <Step2 />
        <Step3 />
      </StepsLayout>
    )
    await userEvent.click(nextButton())

    expect(output()).toHaveTextContent('Step 2')
    expect(context.activeIndex).toBe(1)

    rerender(
      <StepsLayout aria-label="step 3">
        <Step1 />
        <Step2 />
        <Step3 />
      </StepsLayout>
    )
    await userEvent.click(nextButton())

    expect(output()).toHaveTextContent('Step 3')
    expect(context.activeIndex).toBe(2)
  })

  it('should show error on navigating back and forth in loose mode', async () => {
    render(
      <StepsLayout mode="loose">
        <StepsLayout.Step title="Step 1">
          <output>Step 1</output>
          <Field.String path="/something" />
          <StepsLayout.NextButton />
        </StepsLayout.Step>

        <StepsLayout.Step title="Step 2">
          <output>Step 2</output>
          <Field.String path="/foo" required />
          <StepsLayout.NextButton />
        </StepsLayout.Step>
      </StepsLayout>
    )

    const [firstStep, secondStep] = Array.from(
      document.querySelectorAll('.dnb-step-indicator__item')
    )

    expect(output()).toHaveTextContent('Step 1')
    expect(screen.queryByRole('alert')).toBeNull()

    await userEvent.click(secondStep.querySelector('button'))

    await waitFor(() => {
      expect(output()).toHaveTextContent('Step 2')
      expect(screen.queryByRole('alert')).toBeNull()
    })

    // Show the error message
    await userEvent.click(nextButton())

    await waitFor(() => {
      expect(output()).toHaveTextContent('Step 2')
      expect(screen.queryByRole('alert')).toBeInTheDocument()
    })

    await userEvent.click(firstStep.querySelector('button'))

    await waitFor(() => {
      expect(output()).toHaveTextContent('Step 1')
      expect(screen.queryByRole('alert')).toBeNull()
    })

    await userEvent.click(secondStep.querySelector('button'))

    await waitFor(() => {
      expect(output()).toHaveTextContent('Step 2')
      expect(screen.queryByRole('alert')).toBeInTheDocument()
    })
  })

  it('should support drawer variant', () => {
    const { rerender } = render(
      <StepsLayout variant="drawer">
        <StepsLayout.Step title="Step 1">
          <output>Step 1</output>
        </StepsLayout.Step>

        <StepsLayout.Step title="Step 2">
          <output>Step 2</output>
        </StepsLayout.Step>
      </StepsLayout>
    )

    const sidebar = document.querySelector(
      '.dnb-forms-steps-layout__sidebar'
    )

    const stepTrigger = () =>
      sidebar.querySelector('.dnb-step-indicator__trigger')

    const stepsList = () =>
      sidebar.querySelector('.dnb-step-indicator__list')

    expect(stepTrigger()).toBeInTheDocument()
    expect(stepsList()).not.toBeInTheDocument()

    rerender(
      <StepsLayout sidebarId="drawer-please">
        <StepsLayout.Step title="Step 1">
          <output>Step 1</output>
        </StepsLayout.Step>

        <StepsLayout.Step title="Step 2">
          <output>Step 2</output>
        </StepsLayout.Step>
      </StepsLayout>
    )

    expect(stepTrigger()).toBeInTheDocument()
    expect(stepsList()).not.toBeInTheDocument()
  })

  describe('async step change', () => {
    it('should handle async onStepChange', async () => {
      const onStepChange = async () => null

      render(
        <StepsLayout onStepChange={onStepChange}>
          <StepsLayout.Step title="Step 1">
            <output>Step 1</output>
            <Form.ButtonRow>
              <StepsLayout.PreviousButton />
              <StepsLayout.NextButton />
            </Form.ButtonRow>
          </StepsLayout.Step>

          <StepsLayout.Step title="Step 2">
            <output>Step 2</output>
            <Form.ButtonRow>
              <StepsLayout.PreviousButton />
              <StepsLayout.NextButton />
            </Form.ButtonRow>
          </StepsLayout.Step>
        </StepsLayout>
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

    it('should handle async onSubmit', async () => {
      const onSubmit = async () => null

      render(
        <Form.Handler onSubmit={onSubmit}>
          <StepsLayout>
            <StepsLayout.Step title="Step 1">
              <output>Step 1</output>
              <Form.ButtonRow>
                <StepsLayout.PreviousButton />
                <StepsLayout.NextButton />
              </Form.ButtonRow>
            </StepsLayout.Step>

            <StepsLayout.Step title="Step 2">
              <output>Step 2</output>
              <Form.ButtonRow>
                <StepsLayout.PreviousButton />
                <Form.SubmitButton />
              </Form.ButtonRow>
            </StepsLayout.Step>
          </StepsLayout>
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

    it('should handle async validator', async () => {
      const asyncValidator = async () => null

      render(
        <StepsLayout>
          <StepsLayout.Step title="Step 1">
            <output>Step 1</output>
            <Field.String value="Value" validator={asyncValidator} />
            <Form.ButtonRow>
              <StepsLayout.PreviousButton />
              <StepsLayout.NextButton />
            </Form.ButtonRow>
          </StepsLayout.Step>

          <StepsLayout.Step title="Step 2">
            <output>Step 2</output>
            <Field.String required />
            <Form.ButtonRow>
              <StepsLayout.PreviousButton />
              <StepsLayout.NextButton />
            </Form.ButtonRow>
          </StepsLayout.Step>
        </StepsLayout>
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

    it('should handle async validator with error', async () => {
      const asyncValidator = async (value: string) => {
        if (value !== 'valid') {
          return new Error('Error message')
        }
      }

      render(
        <StepsLayout>
          <StepsLayout.Step title="Step 1">
            <output>Step 1</output>
            <Field.String validator={asyncValidator} />
            <Form.ButtonRow>
              <StepsLayout.PreviousButton />
              <StepsLayout.NextButton />
            </Form.ButtonRow>
          </StepsLayout.Step>

          <StepsLayout.Step title="Step 2">
            <output>Step 2</output>
            <Field.String required />
            <Form.ButtonRow>
              <StepsLayout.PreviousButton />
              <StepsLayout.NextButton />
            </Form.ButtonRow>
          </StepsLayout.Step>
        </StepsLayout>
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
        expect(screen.queryByRole('alert')).toHaveTextContent(
          'Error message'
        )
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
        <StepsLayout>
          <StepsLayout.Step title="Step 1">
            <output>Step 1</output>
            <Field.String
              value="Value"
              onBlurValidator={onBlurValidator}
            />
            <Form.ButtonRow>
              <StepsLayout.PreviousButton />
              <StepsLayout.NextButton />
            </Form.ButtonRow>
          </StepsLayout.Step>

          <StepsLayout.Step title="Step 2">
            <output>Step 2</output>
            <Field.String required />
            <Form.ButtonRow>
              <StepsLayout.PreviousButton />
              <StepsLayout.NextButton />
            </Form.ButtonRow>
          </StepsLayout.Step>
        </StepsLayout>
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
        <StepsLayout>
          <StepsLayout.Step title="Step 1">
            <output>Step 1</output>
            <Field.String onBlurValidator={onBlurValidator} />
            <Form.ButtonRow>
              <StepsLayout.PreviousButton />
              <StepsLayout.NextButton />
            </Form.ButtonRow>
          </StepsLayout.Step>

          <StepsLayout.Step title="Step 2">
            <output>Step 2</output>
            <Field.String required />
            <Form.ButtonRow>
              <StepsLayout.PreviousButton />
              <StepsLayout.NextButton />
            </Form.ButtonRow>
          </StepsLayout.Step>
        </StepsLayout>
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
        expect(screen.queryByRole('alert')).toHaveTextContent(
          'Error message'
        )
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

  describe('scrollTopOnStepChange', () => {
    it('should scroll to top on step change when scrollTopOnStepChange is true', async () => {
      const scrollTo = jest.fn()
      jest.spyOn(window, 'scrollTo').mockImplementation(scrollTo)

      render(
        <StepsLayout scrollTopOnStepChange>
          <StepsLayout.Step title="Step 1">
            <output>Step 1</output>
            <StepsLayout.PreviousButton />
            <StepsLayout.NextButton />
          </StepsLayout.Step>

          <StepsLayout.Step title="Step 2">
            <output>Step 2</output>
            <StepsLayout.PreviousButton />
            <StepsLayout.NextButton />
          </StepsLayout.Step>
        </StepsLayout>
      )

      fireEvent.click(nextButton())

      await waitFor(() => {
        expect(scrollTo).toHaveBeenCalledTimes(1)
      })

      fireEvent.click(previousButton())

      await waitFor(() => {
        expect(scrollTo).toHaveBeenCalledTimes(2)
      })

      const [firstStep, secondStep] = Array.from(
        document.querySelectorAll('.dnb-step-indicator__item')
      )

      await userEvent.click(secondStep.querySelector('.dnb-button'))
      expect(output()).toHaveTextContent('Step 2')
      expect(scrollTo).toHaveBeenCalledTimes(3)

      await userEvent.click(firstStep.querySelector('.dnb-button'))
      expect(output()).toHaveTextContent('Step 1')
      expect(scrollTo).toHaveBeenCalledTimes(4)
    })

    it('should show remaining errors on step change', () => {
      const scrollTo = jest.fn()
      jest.spyOn(window, 'scrollTo').mockImplementation(scrollTo)

      render(
        <StepsLayout mode="loose" scrollTopOnStepChange>
          <StepsLayout.Step title="Step 1">
            <output>Step 1</output>
            <Field.String required />
            <StepsLayout.PreviousButton />
            <StepsLayout.NextButton />
          </StepsLayout.Step>

          <StepsLayout.Step title="Step 2">
            <output>Step 2</output>
            <StepsLayout.PreviousButton />
            <StepsLayout.NextButton />
          </StepsLayout.Step>
        </StepsLayout>
      )

      expect(output()).toHaveTextContent('Step 1')
      expect(screen.queryByRole('alert')).toBeNull()

      fireEvent.click(nextButton())

      expect(output()).toHaveTextContent('Step 1')
      expect(screen.queryByRole('alert')).toBeInTheDocument()
    })
  })
})
