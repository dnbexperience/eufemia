import { Button, Flex } from '@dnb/eufemia/src'
import ComponentBox from '../../../../../../../shared/tags/ComponentBox'
import { Steps } from '@dnb/eufemia/src/extensions/forms'

export const Default = () => {
  return (
    <ComponentBox>
      {() => {
        const Component = () => {
          return (
            <Steps.Layout mode="loose" variant="drawer">
              <Steps.Step title="Step 1">
                <Step1 />
              </Steps.Step>

              <Steps.Step title="Step 2">
                <Step2 />
              </Steps.Step>

              <Steps.Step title="Step 3">
                <Step3 />
              </Steps.Step>
            </Steps.Layout>
          )
        }

        const Step1 = () => {
          const { activeIndex, setActiveIndex } = Steps.useStep()
          return (
            <Button
              variant="secondary"
              onClick={() => {
                setActiveIndex(activeIndex + 1)
              }}
            >
              Next
            </Button>
          )
        }

        const Step2 = () => {
          const { activeIndex, setActiveIndex } = Steps.useStep()
          return (
            <Button
              variant="secondary"
              onClick={() => {
                setActiveIndex(activeIndex + 1)
              }}
            >
              Next
            </Button>
          )
        }

        const Step3 = () => {
          const { activeIndex, setActiveIndex } = Steps.useStep()
          return (
            <Button
              variant="secondary"
              onClick={() => {
                setActiveIndex(activeIndex - 1)
              }}
            >
              Previous
            </Button>
          )
        }

        return <Component />
      }}
    </ComponentBox>
  )
}

export const OutsideOfContext = () => {
  return (
    <ComponentBox>
      {() => {
        const Component = () => {
          return (
            <Flex.Stack>
              <RenderBefore />
              <Steps.Layout id="unique-id" mode="loose" variant="drawer">
                <Steps.Step title="Step 1">
                  <output>Step 1</output>
                </Steps.Step>

                <Steps.Step title="Step 2">
                  <output>Step 2</output>
                </Steps.Step>

                <Steps.Step title="Step 1">
                  <output>Step 3</output>
                </Steps.Step>
              </Steps.Layout>
              <RenderAfter />
            </Flex.Stack>
          )
        }

        const RenderBefore = () => {
          const { activeIndex, setActiveIndex } =
            Steps.useStep('unique-id')
          return (
            <Button
              variant="secondary"
              onClick={() => {
                setActiveIndex(activeIndex - 1)
              }}
            >
              Previous
            </Button>
          )
        }

        const RenderAfter = () => {
          const { activeIndex, setActiveIndex } =
            Steps.useStep('unique-id')
          return (
            <Button
              variant="secondary"
              onClick={() => {
                setActiveIndex(activeIndex + 1)
              }}
            >
              Next
            </Button>
          )
        }

        return <Component />
      }}
    </ComponentBox>
  )
}
