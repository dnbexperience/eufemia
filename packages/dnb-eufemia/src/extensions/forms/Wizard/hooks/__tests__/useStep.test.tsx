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
  const previousButton = () => {
    return document.querySelector('.dnb-forms-previous-button')
  }
  const output = () => {
    return document.querySelector('output')
  }

  describe('without "id"', () => {
    it('should return activeIndex on step change', async () => {
      const Step = () => {
        const { activeIndex } = useStep()
        return (
          <Wizard.Step>
            <output>{JSON.stringify({ activeIndex })}</output>
            <Wizard.NextButton />
          </Wizard.Step>
        )
      }

      render(
        <Wizard.Container initialActiveIndex={1}>
          <Step />
          <Step />
          <Step />
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
          <Wizard.Step>
            <output>{JSON.stringify({ activeIndex })}</output>
            <button
              type="button"
              className="dnb-forms-next-button"
              onClick={() => {
                setActiveIndex(activeIndex + 1)
              }}
            >
              Next
            </button>
          </Wizard.Step>
        )
      }

      render(
        <Wizard.Container onStepChange={onStepChange}>
          <Step />
          <Step />
          <Step />
        </Wizard.Container>
      )

      expect(output()).toHaveTextContent('{"activeIndex":0}')
      expect(onStepChange).toHaveBeenCalledTimes(0)

      await userEvent.click(nextButton())

      expect(output()).toHaveTextContent('{"activeIndex":1}')
      expect(onStepChange).toHaveBeenCalledTimes(1)

      await userEvent.click(nextButton())

      expect(output()).toHaveTextContent('{"activeIndex":2}')
      expect(onStepChange).toHaveBeenCalledTimes(2)
    })

    it('should call onStepChange event by using setActiveIndex', async () => {
      const onStepChange = jest.fn()

      const Step = () => {
        const { activeIndex, setActiveIndex } = useStep(undefined, {
          onStepChange,
        })
        return (
          <Wizard.Step>
            <output>{JSON.stringify({ activeIndex })}</output>
            <button
              type="button"
              className="dnb-forms-next-button"
              onClick={() => {
                setActiveIndex(activeIndex + 1)
              }}
            >
              Next
            </button>
            <button
              type="button"
              className="dnb-forms-previous-button"
              onClick={() => {
                setActiveIndex(activeIndex - 1)
              }}
            >
              Previous
            </button>
          </Wizard.Step>
        )
      }

      render(
        <Wizard.Container>
          <Step />
          <Step />
          <Step />
        </Wizard.Container>
      )

      expect(output()).toHaveTextContent('{"activeIndex":0}')
      expect(onStepChange).toHaveBeenCalledTimes(0)

      await userEvent.click(nextButton())

      expect(output()).toHaveTextContent('{"activeIndex":1}')
      expect(onStepChange).toHaveBeenCalledTimes(1)
      expect(onStepChange).toHaveBeenLastCalledWith(1, 'next', {
        preventNavigation: expect.any(Function),
        previousStep: {
          index: 0,
        },
      })

      await userEvent.click(nextButton())

      expect(output()).toHaveTextContent('{"activeIndex":2}')
      expect(onStepChange).toHaveBeenCalledTimes(2)
      expect(onStepChange).toHaveBeenLastCalledWith(2, 'next', {
        preventNavigation: expect.any(Function),
        previousStep: {
          index: 1,
        },
      })

      await userEvent.click(previousButton())

      expect(output()).toHaveTextContent('{"activeIndex":1}')
      expect(onStepChange).toHaveBeenCalledTimes(3)
      expect(onStepChange).toHaveBeenLastCalledWith(1, 'previous', {
        preventNavigation: expect.any(Function),
        previousStep: {
          index: 2,
        },
      })
    })

    it('should call onStepChange event by using buttons', async () => {
      const onStepChange = jest.fn()

      const Step = () => {
        const { activeIndex } = useStep(undefined, {
          onStepChange,
        })
        return (
          <Wizard.Step>
            <output>{JSON.stringify({ activeIndex })}</output>
            <Wizard.Buttons />
          </Wizard.Step>
        )
      }

      render(
        <Wizard.Container>
          <Step />
          <Step />
          <Step />
        </Wizard.Container>
      )

      expect(output()).toHaveTextContent('{"activeIndex":0}')
      expect(onStepChange).toHaveBeenCalledTimes(0)

      await userEvent.click(nextButton())

      expect(output()).toHaveTextContent('{"activeIndex":1}')
      expect(onStepChange).toHaveBeenCalledTimes(1)
      expect(onStepChange).toHaveBeenLastCalledWith(1, 'next', {
        preventNavigation: expect.any(Function),
        previousStep: {
          index: 0,
        },
      })

      await userEvent.click(nextButton())

      expect(output()).toHaveTextContent('{"activeIndex":2}')
      expect(onStepChange).toHaveBeenCalledTimes(2)
      expect(onStepChange).toHaveBeenLastCalledWith(2, 'next', {
        preventNavigation: expect.any(Function),
        previousStep: {
          index: 1,
        },
      })

      await userEvent.click(previousButton())

      expect(output()).toHaveTextContent('{"activeIndex":1}')
      expect(onStepChange).toHaveBeenCalledTimes(3)
      expect(onStepChange).toHaveBeenLastCalledWith(1, 'previous', {
        preventNavigation: expect.any(Function),
        previousStep: {
          index: 2,
        },
      })
    })

    it('should call onStepChange event on every step', async () => {
      const onStepChange1 = jest.fn()
      const onStepChange2 = jest.fn()
      const onStepChange3 = jest.fn()

      const Step1 = () => {
        const { activeIndex } = useStep(undefined, {
          onStepChange: onStepChange1,
        })
        return (
          <Wizard.Step>
            <output>{JSON.stringify({ activeIndex })}</output>
            <Wizard.Buttons />
          </Wizard.Step>
        )
      }

      const Step2 = () => {
        const { activeIndex } = useStep(undefined, {
          onStepChange: onStepChange2,
        })
        return (
          <Wizard.Step>
            <output>{JSON.stringify({ activeIndex })}</output>
            <Wizard.Buttons />
          </Wizard.Step>
        )
      }

      const Step3 = () => {
        const { activeIndex } = useStep(undefined, {
          onStepChange: onStepChange3,
        })
        return (
          <Wizard.Step>
            <output>{JSON.stringify({ activeIndex })}</output>
            <Wizard.Buttons />
          </Wizard.Step>
        )
      }

      render(
        <Wizard.Container>
          <Step1 />
          <Step2 />
          <Step3 />
        </Wizard.Container>
      )

      expect(output()).toHaveTextContent('{"activeIndex":0}')
      expect(onStepChange1).toHaveBeenCalledTimes(0)
      expect(onStepChange2).toHaveBeenCalledTimes(0)
      expect(onStepChange3).toHaveBeenCalledTimes(0)

      await userEvent.click(nextButton())

      expect(output()).toHaveTextContent('{"activeIndex":1}')
      expect(onStepChange1).toHaveBeenCalledTimes(1)
      expect(onStepChange1).toHaveBeenLastCalledWith(1, 'next', {
        preventNavigation: expect.any(Function),
        previousStep: {
          index: 0,
        },
      })
      expect(onStepChange2).toHaveBeenCalledTimes(1)
      expect(onStepChange2).toHaveBeenLastCalledWith(1, 'next', {
        preventNavigation: expect.any(Function),
        previousStep: {
          index: 0,
        },
      })
      expect(onStepChange3).toHaveBeenCalledTimes(1)
      expect(onStepChange3).toHaveBeenLastCalledWith(1, 'next', {
        preventNavigation: expect.any(Function),
        previousStep: {
          index: 0,
        },
      })

      await userEvent.click(nextButton())

      expect(output()).toHaveTextContent('{"activeIndex":2}')
      expect(onStepChange1).toHaveBeenCalledTimes(2)
      expect(onStepChange1).toHaveBeenLastCalledWith(2, 'next', {
        preventNavigation: expect.any(Function),
        previousStep: {
          index: 1,
        },
      })
      expect(onStepChange2).toHaveBeenCalledTimes(2)
      expect(onStepChange2).toHaveBeenLastCalledWith(2, 'next', {
        preventNavigation: expect.any(Function),
        previousStep: {
          index: 1,
        },
      })
      expect(onStepChange3).toHaveBeenCalledTimes(2)
      expect(onStepChange3).toHaveBeenLastCalledWith(2, 'next', {
        preventNavigation: expect.any(Function),
        previousStep: {
          index: 1,
        },
      })

      await userEvent.click(previousButton())

      expect(output()).toHaveTextContent('{"activeIndex":1}')
      expect(onStepChange1).toHaveBeenCalledTimes(3)
      expect(onStepChange1).toHaveBeenLastCalledWith(1, 'previous', {
        preventNavigation: expect.any(Function),
        previousStep: {
          index: 2,
        },
      })
      expect(onStepChange2).toHaveBeenCalledTimes(3)
      expect(onStepChange2).toHaveBeenLastCalledWith(1, 'previous', {
        preventNavigation: expect.any(Function),
        previousStep: {
          index: 2,
        },
      })
      expect(onStepChange3).toHaveBeenCalledTimes(3)
      expect(onStepChange3).toHaveBeenLastCalledWith(1, 'previous', {
        preventNavigation: expect.any(Function),
        previousStep: {
          index: 2,
        },
      })
    })

    it('should return "totalSteps"', async () => {
      const Step = () => {
        const { totalSteps } = useStep()
        return (
          <Wizard.Step>
            <output>{JSON.stringify({ totalSteps })}</output>
          </Wizard.Step>
        )
      }

      render(
        <Wizard.Container>
          <Step />
          <Step />
          <Step />
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
          <Wizard.Container id={identifier} initialActiveIndex={1}>
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
            type="button"
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
            type="button"
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
          <Wizard.Container id={identifier} onStepChange={onStepChange}>
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

    it('should call onStepChange event by using setActiveIndex', async () => {
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
              type="button"
              className="dnb-forms-next-button"
              onClick={() => {
                setActiveIndex(activeIndex + 1)
              }}
            >
              Next
            </button>
            <button
              type="button"
              className="dnb-forms-previous-button"
              onClick={() => {
                setActiveIndex(activeIndex - 1)
              }}
            >
              Previous
            </button>
          </>
        )
      }

      render(
        <>
          <Sidecar />
          <Wizard.Container id={identifier}>
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

      await userEvent.click(nextButton())

      expect(output()).toHaveTextContent('{"activeIndex":1}')
      expect(onStepChange).toHaveBeenCalledTimes(1)
      expect(onStepChange).toHaveBeenLastCalledWith(1, 'next', {
        preventNavigation: expect.any(Function),
        previousStep: {
          index: 0,
        },
      })

      await userEvent.click(nextButton())

      expect(output()).toHaveTextContent('{"activeIndex":2}')
      expect(onStepChange).toHaveBeenCalledTimes(2)
      expect(onStepChange).toHaveBeenLastCalledWith(2, 'next', {
        preventNavigation: expect.any(Function),
        previousStep: {
          index: 1,
        },
      })
      await userEvent.click(previousButton())

      expect(output()).toHaveTextContent('{"activeIndex":1}')
      expect(onStepChange).toHaveBeenCalledTimes(3)
      expect(onStepChange).toHaveBeenLastCalledWith(1, 'previous', {
        preventNavigation: expect.any(Function),
        previousStep: {
          index: 2,
        },
      })
    })

    it('should call onStepChange event by using buttons', async () => {
      const onStepChange = jest.fn()

      const Sidecar = () => {
        useStep(identifier, { onStepChange })
        return null
      }

      const Step = () => {
        const { activeIndex } = useStep()
        return (
          <>
            <output>{JSON.stringify({ activeIndex })}</output>
            <Wizard.Buttons />
          </>
        )
      }

      render(
        <>
          <Sidecar />
          <Wizard.Container id={identifier}>
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

      await userEvent.click(nextButton())

      expect(output()).toHaveTextContent('{"activeIndex":1}')
      expect(onStepChange).toHaveBeenCalledTimes(1)
      expect(onStepChange).toHaveBeenLastCalledWith(1, 'next', {
        preventNavigation: expect.any(Function),
        previousStep: {
          index: 0,
        },
      })

      await userEvent.click(nextButton())

      expect(output()).toHaveTextContent('{"activeIndex":2}')
      expect(onStepChange).toHaveBeenCalledTimes(2)
      expect(onStepChange).toHaveBeenLastCalledWith(2, 'next', {
        preventNavigation: expect.any(Function),
        previousStep: {
          index: 1,
        },
      })

      await userEvent.click(previousButton())

      expect(output()).toHaveTextContent('{"activeIndex":1}')
      expect(onStepChange).toHaveBeenCalledTimes(3)
      expect(onStepChange).toHaveBeenLastCalledWith(1, 'previous', {
        preventNavigation: expect.any(Function),
        previousStep: {
          index: 2,
        },
      })
    })

    it('should call onStepChange event on every step', async () => {
      const onStepChange1a = jest.fn()
      const onStepChange2a = jest.fn()
      const onStepChange3a = jest.fn()
      const onStepChange1b = jest.fn()
      const onStepChange2b = jest.fn()
      const onStepChange3b = jest.fn()

      const Step1 = () => {
        const { activeIndex } = useStep(undefined, {
          onStepChange: onStepChange1a,
        })
        return (
          <Wizard.Step>
            <output>{JSON.stringify({ activeIndex })}</output>
            <Wizard.Buttons />
          </Wizard.Step>
        )
      }

      const Step2 = () => {
        const { activeIndex } = useStep(undefined, {
          onStepChange: onStepChange2a,
        })
        return (
          <Wizard.Step>
            <output>{JSON.stringify({ activeIndex })}</output>
            <Wizard.Buttons />
          </Wizard.Step>
        )
      }

      const Step3 = () => {
        const { activeIndex } = useStep(undefined, {
          onStepChange: onStepChange3a,
        })
        return (
          <Wizard.Step>
            <output>{JSON.stringify({ activeIndex })}</output>
            <Wizard.Buttons />
          </Wizard.Step>
        )
      }

      const Sidecar = () => {
        useStep(identifier, { onStepChange: onStepChange1b })
        useStep(identifier, { onStepChange: onStepChange2b })
        useStep(identifier, { onStepChange: onStepChange3b })
        return null
      }

      render(
        <>
          <Sidecar />
          <Wizard.Container id={identifier}>
            <Wizard.Step>
              <Step1 />
            </Wizard.Step>

            <Wizard.Step>
              <Step2 />
            </Wizard.Step>

            <Wizard.Step>
              <Step3 />
            </Wizard.Step>
          </Wizard.Container>
        </>
      )

      expect(output()).toHaveTextContent('{"activeIndex":0}')
      expect(onStepChange1a).toHaveBeenCalledTimes(0)
      expect(onStepChange2a).toHaveBeenCalledTimes(0)
      expect(onStepChange3a).toHaveBeenCalledTimes(0)
      expect(onStepChange1b).toHaveBeenCalledTimes(0)
      expect(onStepChange2b).toHaveBeenCalledTimes(0)
      expect(onStepChange3b).toHaveBeenCalledTimes(0)

      await userEvent.click(nextButton())

      expect(output()).toHaveTextContent('{"activeIndex":1}')
      expect(onStepChange1a).toHaveBeenCalledTimes(1)
      expect(onStepChange1a).toHaveBeenLastCalledWith(1, 'next', {
        preventNavigation: expect.any(Function),
        previousStep: {
          index: 0,
        },
      })
      expect(onStepChange2a).toHaveBeenCalledTimes(1)
      expect(onStepChange2a).toHaveBeenLastCalledWith(1, 'next', {
        preventNavigation: expect.any(Function),
        previousStep: {
          index: 0,
        },
      })
      expect(onStepChange3a).toHaveBeenCalledTimes(1)
      expect(onStepChange3a).toHaveBeenLastCalledWith(1, 'next', {
        preventNavigation: expect.any(Function),
        previousStep: {
          index: 0,
        },
      })
      expect(onStepChange1b).toHaveBeenCalledTimes(1)
      expect(onStepChange1b).toHaveBeenLastCalledWith(1, 'next', {
        preventNavigation: expect.any(Function),
        previousStep: {
          index: 0,
        },
      })
      expect(onStepChange2b).toHaveBeenCalledTimes(1)
      expect(onStepChange2b).toHaveBeenLastCalledWith(1, 'next', {
        preventNavigation: expect.any(Function),
        previousStep: {
          index: 0,
        },
      })
      expect(onStepChange3b).toHaveBeenCalledTimes(1)
      expect(onStepChange3b).toHaveBeenLastCalledWith(1, 'next', {
        preventNavigation: expect.any(Function),
        previousStep: {
          index: 0,
        },
      })

      await userEvent.click(nextButton())

      expect(output()).toHaveTextContent('{"activeIndex":2}')
      expect(onStepChange1a).toHaveBeenCalledTimes(2)
      expect(onStepChange1a).toHaveBeenLastCalledWith(2, 'next', {
        preventNavigation: expect.any(Function),
        previousStep: {
          index: 1,
        },
      })
      expect(onStepChange2a).toHaveBeenCalledTimes(2)
      expect(onStepChange2a).toHaveBeenLastCalledWith(2, 'next', {
        preventNavigation: expect.any(Function),
        previousStep: {
          index: 1,
        },
      })
      expect(onStepChange3a).toHaveBeenCalledTimes(2)
      expect(onStepChange3a).toHaveBeenLastCalledWith(2, 'next', {
        preventNavigation: expect.any(Function),
        previousStep: {
          index: 1,
        },
      })
      expect(onStepChange1b).toHaveBeenCalledTimes(2)
      expect(onStepChange1b).toHaveBeenLastCalledWith(2, 'next', {
        preventNavigation: expect.any(Function),
        previousStep: {
          index: 1,
        },
      })
      expect(onStepChange2b).toHaveBeenCalledTimes(2)
      expect(onStepChange2b).toHaveBeenLastCalledWith(2, 'next', {
        preventNavigation: expect.any(Function),
        previousStep: {
          index: 1,
        },
      })
      expect(onStepChange3b).toHaveBeenCalledTimes(2)
      expect(onStepChange3b).toHaveBeenLastCalledWith(2, 'next', {
        preventNavigation: expect.any(Function),
        previousStep: {
          index: 1,
        },
      })

      await userEvent.click(previousButton())

      expect(output()).toHaveTextContent('{"activeIndex":1}')
      expect(onStepChange1a).toHaveBeenCalledTimes(3)
      expect(onStepChange1a).toHaveBeenLastCalledWith(1, 'previous', {
        preventNavigation: expect.any(Function),
        previousStep: {
          index: 2,
        },
      })
      expect(onStepChange2a).toHaveBeenCalledTimes(3)
      expect(onStepChange2a).toHaveBeenLastCalledWith(1, 'previous', {
        preventNavigation: expect.any(Function),
        previousStep: {
          index: 2,
        },
      })
      expect(onStepChange3a).toHaveBeenCalledTimes(3)
      expect(onStepChange3a).toHaveBeenLastCalledWith(1, 'previous', {
        preventNavigation: expect.any(Function),
        previousStep: {
          index: 2,
        },
      })
      expect(onStepChange1b).toHaveBeenCalledTimes(3)
      expect(onStepChange1b).toHaveBeenLastCalledWith(1, 'previous', {
        preventNavigation: expect.any(Function),
        previousStep: {
          index: 2,
        },
      })
      expect(onStepChange2b).toHaveBeenCalledTimes(3)
      expect(onStepChange2b).toHaveBeenLastCalledWith(1, 'previous', {
        preventNavigation: expect.any(Function),
        previousStep: {
          index: 2,
        },
      })
      expect(onStepChange3b).toHaveBeenCalledTimes(3)
      expect(onStepChange3b).toHaveBeenLastCalledWith(1, 'previous', {
        preventNavigation: expect.any(Function),
        previousStep: {
          index: 2,
        },
      })
    })

    it('should return "totalSteps"', async () => {
      const Sidecar = () => {
        const { totalSteps } = useStep(identifier)
        return <output>{JSON.stringify({ totalSteps })}</output>
      }

      render(
        <>
          <Sidecar />
          <Wizard.Container id={identifier}>
            <Wizard.Step>content</Wizard.Step>

            <Wizard.Step>content</Wizard.Step>

            <Wizard.Step>content</Wizard.Step>
          </Wizard.Container>
        </>
      )

      expect(output()).toHaveTextContent('{"totalSteps":3}')
    })
  })

  it('should warn when not wrapped in Form.Handler', () => {
    const MockStep = () => {
      const { setFormError } = useStep(identifier)

      React.useEffect(() => {
        setFormError(new Error('My error'))
      }, [setFormError])

      return (
        <Wizard.Step id={identifier} title="Step 1">
          <output>Step 1</output>
        </Wizard.Step>
      )
    }

    render(
      <Wizard.Container>
        <MockStep />
      </Wizard.Container>
    )

    expect(document.querySelector('.dnb-form-status')).toHaveTextContent(
      'My error'
    )
  })
})
