import React from 'react'
import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import { wait } from '../../../../../core/jest/jestSetup'
import { Field, Form, Wizard } from '../../..'
import userEvent from '@testing-library/user-event'

import nbNO from '../../../constants/locales/nb-NO'
const nb = nbNO['nb-NO']

jest.mock('../../../../../shared/component-helper', () => {
  const original = jest.requireActual(
    '../../../../../shared/component-helper'
  )
  return {
    ...original,
    warn: jest.fn(),
  }
})

describe('Wizard.Container', () => {
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
      <Wizard.Container>
        <Wizard.Step title="Step 1">
          <Wizard.NextButton />
        </Wizard.Step>
        <Wizard.Step title="Step 2">
          <Wizard.PreviousButton />
        </Wizard.Step>
      </Wizard.Container>
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
      </Wizard.Container>
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
      <Wizard.Container>
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
      <Wizard.Container omitFocusManagement>
        <Wizard.Step title="Step 1">
          <output>Step 1</output>
          <Field.String
            path="/foo"
            required
            validator={validator}
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

    expect(output()).toHaveTextContent('Step 1')
    expect(screen.queryByRole('alert')).toBeNull()

    await userEvent.click(nextButton())

    expect(output()).toHaveTextContent('Step 1')
    expect(screen.queryByRole('alert')).toHaveTextContent(
      nb.Field.errorRequired
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
      nb.Field.errorRequired
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

  it('should show error on navigating back and forth in loose mode', async () => {
    render(
      <Wizard.Container mode="loose">
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
      <Wizard.Container variant="drawer">
        <Wizard.Step title="Step 1">
          <output>Step 1</output>
        </Wizard.Step>

        <Wizard.Step title="Step 2">
          <output>Step 2</output>
        </Wizard.Step>
      </Wizard.Container>
    )

    const sidebar = document.querySelector(
      '.dnb-forms-wizard-layout__sidebar'
    )

    const stepTrigger = () =>
      sidebar.querySelector('.dnb-step-indicator__trigger')

    const wizardList = () =>
      sidebar.querySelector('.dnb-step-indicator__list')

    expect(stepTrigger()).toBeInTheDocument()
    expect(wizardList()).not.toBeInTheDocument()

    rerender(
      <Wizard.Container sidebarId="drawer-please">
        <Wizard.Step title="Step 1">
          <output>Step 1</output>
        </Wizard.Step>

        <Wizard.Step title="Step 2">
          <output>Step 2</output>
        </Wizard.Step>
      </Wizard.Container>
    )

    expect(stepTrigger()).toBeInTheDocument()
    expect(wizardList()).not.toBeInTheDocument()
  })

  describe('async step change', () => {
    it('should handle async onStepChange', async () => {
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

    it('should handle async validator', async () => {
      const asyncValidator = async () => null

      render(
        <Wizard.Container>
          <Wizard.Step title="Step 1">
            <output>Step 1</output>
            <Field.String value="Value" validator={asyncValidator} />
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

    it('should handle async validator with error', async () => {
      const asyncValidator = async (value: string) => {
        if (value !== 'valid') {
          return new Error('Error message')
        }
      }

      render(
        <Wizard.Container>
          <Wizard.Step title="Step 1">
            <output>Step 1</output>
            <Field.String validator={asyncValidator} />
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
        <Wizard.Container>
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

  it('should scroll to top on step change', async () => {
    const scrollIntoViewMock = jest.fn()
    window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock

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

    const [firstStep, secondStep] = Array.from(
      document.querySelectorAll('.dnb-step-indicator__item')
    )

    await userEvent.click(secondStep.querySelector('.dnb-button'))
    expect(output()).toHaveTextContent('Step 2')
    await waitFor(() => {
      expect(scrollIntoViewMock).toHaveBeenCalledTimes(3)
    })

    await userEvent.click(firstStep.querySelector('.dnb-button'))
    expect(output()).toHaveTextContent('Step 1')
    await waitFor(() => {
      expect(scrollIntoViewMock).toHaveBeenCalledTimes(4)
    })
  })

  it('should not scroll to top on step change when omitScrollManagement is true', async () => {
    const scrollIntoViewMock = jest.fn()
    window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock

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

    const [firstStep, secondStep] = Array.from(
      document.querySelectorAll('.dnb-step-indicator__item')
    )

    await userEvent.click(secondStep.querySelector('.dnb-button'))
    expect(output()).toHaveTextContent('Step 2')
    expect(scrollIntoViewMock).toHaveBeenCalledTimes(0)

    await userEvent.click(firstStep.querySelector('.dnb-button'))
    expect(output()).toHaveTextContent('Step 1')
    expect(scrollIntoViewMock).toHaveBeenCalledTimes(0)
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
    expect(screen.queryByRole('alert')).toBeNull()

    fireEvent.click(nextButton())

    expect(output()).toHaveTextContent('Step 1')
    expect(screen.queryByRole('alert')).toBeInTheDocument()
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
})
