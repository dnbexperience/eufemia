import React from 'react'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { makeUniqueId } from '../../../../../shared/component-helper'
import useStep from '../useStep'
import { Wizard } from '../../..'

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
            <Wizard.NextButton />
          </>
        )
      }

      render(
        <Wizard.Container initialActiveIndex={1}>
          <Wizard.Step>
            <Step />
          </Wizard.Step>

          <Wizard.Step>
            <Step />
          </Wizard.Step>

          <Wizard.Step>
            <Step />
          </Wizard.Step>
        </Wizard.Container>
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
        <Wizard.Container onStepChange={onStepChange} mode="loose">
          <Wizard.Step>
            <Step />
          </Wizard.Step>

          <Wizard.Step>
            <Step />
          </Wizard.Step>

          <Wizard.Step>
            <Step />
          </Wizard.Step>
        </Wizard.Container>
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
        <Wizard.Container mode="loose">
          <Wizard.Step>
            <Step />
          </Wizard.Step>

          <Wizard.Step>
            <Step />
          </Wizard.Step>

          <Wizard.Step>
            <Step />
          </Wizard.Step>
        </Wizard.Container>
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

    it('should return "totalSteps"', async () => {
      const Step = () => {
        const { totalSteps } = useStep()
        return <output>{JSON.stringify({ totalSteps })}</output>
      }

      render(
        <Wizard.Container mode="loose">
          <Wizard.Step>
            <Step />
          </Wizard.Step>

          <Wizard.Step>
            <Step />
          </Wizard.Step>

          <Wizard.Step>
            <Step />
          </Wizard.Step>
        </Wizard.Container>
      )

      expect(output()).toHaveTextContent('{"totalSteps":3}')
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
          <Wizard.Container
            id={identifier}
            initialActiveIndex={1}
            mode="loose"
          >
            <Wizard.Step>
              <output>Step 1</output>
              <Wizard.NextButton />
            </Wizard.Step>

            <Wizard.Step>
              <output>Step 2</output>
              <Wizard.NextButton />
            </Wizard.Step>

            <Wizard.Step>
              <output>Step 3</output>
              <Wizard.NextButton />
            </Wizard.Step>
          </Wizard.Container>
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
          <Wizard.Container
            id={identifier}
            onStepChange={onStepChange}
            mode="loose"
          >
            <Wizard.Step>
              <output>Step 1</output>
            </Wizard.Step>

            <Wizard.Step>
              <output>Step 2</output>
            </Wizard.Step>

            <Wizard.Step>
              <output>Step 3</output>
            </Wizard.Step>
          </Wizard.Container>
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
          <Wizard.Container mode="loose" id={identifier}>
            <Wizard.Step>
              <Step />
            </Wizard.Step>

            <Wizard.Step>
              <Step />
            </Wizard.Step>

            <Wizard.Step>
              <Step />
            </Wizard.Step>
          </Wizard.Container>
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

    it('should return "totalSteps"', async () => {
      const Sidecar = () => {
        const { totalSteps } = useStep(identifier)
        return <output>{JSON.stringify({ totalSteps })}</output>
      }

      render(
        <>
          <Sidecar />
          <Wizard.Container mode="loose" id={identifier}>
            <Wizard.Step>content</Wizard.Step>

            <Wizard.Step>content</Wizard.Step>

            <Wizard.Step>content</Wizard.Step>
          </Wizard.Container>
        </>
      )

      expect(output()).toHaveTextContent('{"totalSteps":3}')
    })
  })
})
