import React from 'react'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { makeUniqueId } from '../../../../shared/component-helper'
import StepsLayout from '../StepsLayout'
import { useStep } from '../useStep'

jest.mock('../../../../shared/component-helper', () => {
  const original = jest.requireActual(
    '../../../../shared/component-helper'
  )
  return {
    ...original,
    warn: jest.fn(),
  }
})

describe('useStep', () => {
  let identifier: string
  beforeEach(() => {
    identifier = makeUniqueId()
  })
  const nextButton = () => {
    return document.querySelector('.dnb-forms-next-button')
  }
  const output = () => {
    return document.querySelector('output')
  }

  describe('without "id"', () => {
    it('should return activeIndex on step change', async () => {
      const Step = () => {
        const step = useStep()
        return (
          <>
            <output>{JSON.stringify(step)}</output>
            <StepsLayout.NextButton />
          </>
        )
      }

      render(
        <StepsLayout initialActiveIndex={1}>
          <StepsLayout.Step>
            <Step />
          </StepsLayout.Step>

          <StepsLayout.Step>
            <Step />
          </StepsLayout.Step>

          <StepsLayout.Step>
            <Step />
          </StepsLayout.Step>
        </StepsLayout>
      )

      expect(output()).toHaveTextContent('{"activeIndex":1}')

      await userEvent.click(nextButton())

      expect(output()).toHaveTextContent('{"activeIndex":2}')
    })

    it('should set new index and call onStepChange', async () => {
      const onStepChange = jest.fn()

      const Step = () => {
        const step = useStep()
        return (
          <>
            <output>{JSON.stringify(step)}</output>
            <button
              className="next"
              onClick={() => {
                step.setActiveIndex(step.activeIndex + 1)
              }}
            >
              Next
            </button>
          </>
        )
      }

      render(
        <StepsLayout onStepChange={onStepChange} mode="loose">
          <StepsLayout.Step>
            <Step />
          </StepsLayout.Step>

          <StepsLayout.Step>
            <Step />
          </StepsLayout.Step>

          <StepsLayout.Step>
            <Step />
          </StepsLayout.Step>
        </StepsLayout>
      )

      expect(output()).toHaveTextContent('{"activeIndex":0}')
      expect(onStepChange).toHaveBeenCalledTimes(0)

      await userEvent.click(document.querySelector('button.next'))

      expect(output()).toHaveTextContent('{"activeIndex":1}')
      expect(onStepChange).toHaveBeenCalledTimes(1)

      await userEvent.click(document.querySelector('button.next'))

      expect(output()).toHaveTextContent('{"activeIndex":2}')
      expect(onStepChange).toHaveBeenCalledTimes(2)
    })
  })

  describe('with "id" and outside of context', () => {
    it('should return activeIndex on step change', async () => {
      const RenderBefore = () => {
        const step = useStep(identifier)
        return <output className="before">{JSON.stringify(step)}</output>
      }
      const RenderAfter = () => {
        const step = useStep(identifier)
        return <output className="after">{JSON.stringify(step)}</output>
      }

      render(
        <>
          <RenderBefore />
          <StepsLayout id={identifier} initialActiveIndex={1} mode="loose">
            <StepsLayout.Step>
              <output>Step 1</output>
              <StepsLayout.NextButton />
            </StepsLayout.Step>

            <StepsLayout.Step>
              <output>Step 2</output>
              <StepsLayout.NextButton />
            </StepsLayout.Step>

            <StepsLayout.Step>
              <output>Step 3</output>
              <StepsLayout.NextButton />
            </StepsLayout.Step>
          </StepsLayout>
          <RenderAfter />
        </>
      )

      expect(document.querySelector('output.before')).toHaveTextContent(
        '{"activeIndex":1}'
      )
      expect(document.querySelector('output.after')).toHaveTextContent(
        '{"activeIndex":1}'
      )

      await userEvent.click(nextButton())

      expect(document.querySelector('output.before')).toHaveTextContent(
        '{"activeIndex":2}'
      )
      expect(document.querySelector('output.after')).toHaveTextContent(
        '{"activeIndex":2}'
      )
    })

    it('should set new index and call onStepChange', async () => {
      const onStepChange = jest.fn()

      const RenderBefore = () => {
        const step = useStep(identifier)
        return (
          <button
            className="before"
            onClick={() => {
              step.setActiveIndex(step.activeIndex + 1)
            }}
          >
            Next
          </button>
        )
      }

      const RenderAfter = () => {
        const step = useStep(identifier)
        return (
          <button
            className="after"
            onClick={() => {
              step.setActiveIndex(step.activeIndex + 1)
            }}
          >
            Next
          </button>
        )
      }

      render(
        <>
          <RenderBefore />
          <StepsLayout
            id={identifier}
            onStepChange={onStepChange}
            mode="loose"
          >
            <StepsLayout.Step>
              <output>Step 1</output>
            </StepsLayout.Step>

            <StepsLayout.Step>
              <output>Step 2</output>
            </StepsLayout.Step>

            <StepsLayout.Step>
              <output>Step 3</output>
            </StepsLayout.Step>
          </StepsLayout>
          <RenderAfter />
        </>
      )

      expect(document.querySelector('output')).toHaveTextContent('Step 1')
      expect(onStepChange).toHaveBeenCalledTimes(0)

      await userEvent.click(document.querySelector('button.before'))

      expect(document.querySelector('output')).toHaveTextContent('Step 2')
      expect(onStepChange).toHaveBeenCalledTimes(1)

      await userEvent.click(document.querySelector('button.after'))

      expect(document.querySelector('output')).toHaveTextContent('Step 3')
      expect(onStepChange).toHaveBeenCalledTimes(2)
    })
  })
})
