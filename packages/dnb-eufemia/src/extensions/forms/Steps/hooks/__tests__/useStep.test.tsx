import React from 'react'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { makeUniqueId } from '../../../../../shared/component-helper'
import useStep from '../useStep'
import { Steps } from '../../..'

jest.mock('../../../../../shared/component-helper', () => {
  const original = jest.requireActual(
    '../../../../../shared/component-helper'
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
        const { activeIndex } = useStep()
        return (
          <>
            <output>{JSON.stringify({ activeIndex })}</output>
            <Steps.NextButton />
          </>
        )
      }

      render(
        <Steps.Layout initialActiveIndex={1}>
          <Steps.Step>
            <Step />
          </Steps.Step>

          <Steps.Step>
            <Step />
          </Steps.Step>

          <Steps.Step>
            <Step />
          </Steps.Step>
        </Steps.Layout>
      )

      expect(output()).toHaveTextContent('{"activeIndex":1}')

      await userEvent.click(nextButton())

      expect(output()).toHaveTextContent('{"activeIndex":2}')
    })

    it('should set new index and call onStepChange', async () => {
      const onStepChange = jest.fn()

      const Step = () => {
        const { activeIndex, setActiveIndex } = useStep()
        return (
          <>
            <output>{JSON.stringify({ activeIndex })}</output>
            <button
              className="next"
              onClick={() => {
                setActiveIndex(activeIndex + 1)
              }}
            >
              Next
            </button>
          </>
        )
      }

      render(
        <Steps.Layout onStepChange={onStepChange} mode="loose">
          <Steps.Step>
            <Step />
          </Steps.Step>

          <Steps.Step>
            <Step />
          </Steps.Step>

          <Steps.Step>
            <Step />
          </Steps.Step>
        </Steps.Layout>
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

    it('should onStepChange given in the Hook', async () => {
      const onStepChange = jest.fn()

      const Step = () => {
        const { activeIndex, setActiveIndex } = useStep(undefined, {
          onStepChange,
        })
        return (
          <>
            <output>{JSON.stringify({ activeIndex })}</output>
            <button
              className="next"
              onClick={() => {
                setActiveIndex(activeIndex + 1)
              }}
            >
              Next
            </button>
          </>
        )
      }

      render(
        <Steps.Layout mode="loose">
          <Steps.Step>
            <Step />
          </Steps.Step>

          <Steps.Step>
            <Step />
          </Steps.Step>

          <Steps.Step>
            <Step />
          </Steps.Step>
        </Steps.Layout>
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
        const { activeIndex } = useStep(identifier)
        return (
          <output className="before">
            {JSON.stringify({ activeIndex })}
          </output>
        )
      }
      const RenderAfter = () => {
        const { activeIndex } = useStep(identifier)
        return (
          <output className="after">
            {JSON.stringify({ activeIndex })}
          </output>
        )
      }

      render(
        <>
          <RenderBefore />
          <Steps.Layout
            id={identifier}
            initialActiveIndex={1}
            mode="loose"
          >
            <Steps.Step>
              <output>Step 1</output>
              <Steps.NextButton />
            </Steps.Step>

            <Steps.Step>
              <output>Step 2</output>
              <Steps.NextButton />
            </Steps.Step>

            <Steps.Step>
              <output>Step 3</output>
              <Steps.NextButton />
            </Steps.Step>
          </Steps.Layout>
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
        const { activeIndex, setActiveIndex } = useStep(identifier)
        return (
          <button
            className="before"
            onClick={() => {
              setActiveIndex(activeIndex + 1)
            }}
          >
            Next
          </button>
        )
      }

      const RenderAfter = () => {
        const { activeIndex, setActiveIndex } = useStep(identifier)
        return (
          <button
            className="after"
            onClick={() => {
              setActiveIndex(activeIndex + 1)
            }}
          >
            Next
          </button>
        )
      }

      render(
        <>
          <RenderBefore />
          <Steps.Layout
            id={identifier}
            onStepChange={onStepChange}
            mode="loose"
          >
            <Steps.Step>
              <output>Step 1</output>
            </Steps.Step>

            <Steps.Step>
              <output>Step 2</output>
            </Steps.Step>

            <Steps.Step>
              <output>Step 3</output>
            </Steps.Step>
          </Steps.Layout>
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

    it('should onStepChange given in the Hook', async () => {
      const onStepChange = jest.fn()

      const Sidecar = () => {
        useStep(identifier, { onStepChange })
        return null
      }

      const Step = () => {
        const { activeIndex, setActiveIndex } = useStep()
        return (
          <>
            <output>{JSON.stringify({ activeIndex })}</output>
            <button
              className="next"
              onClick={() => {
                setActiveIndex(activeIndex + 1)
              }}
            >
              Next
            </button>
          </>
        )
      }

      render(
        <>
          <Sidecar />
          <Steps.Layout mode="loose" id={identifier}>
            <Steps.Step>
              <Step />
            </Steps.Step>

            <Steps.Step>
              <Step />
            </Steps.Step>

            <Steps.Step>
              <Step />
            </Steps.Step>
          </Steps.Layout>
        </>
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
})
