import { Button, Flex } from '@dnb/eufemia/src'
import ComponentBox from '../../../../../../../shared/tags/ComponentBox'
import {
  StepsLayout,
  StepsContext,
} from '@dnb/eufemia/src/extensions/forms'

export const Default = () => {
  return (
    <ComponentBox scope={{ StepsLayout, StepsContext }}>
      {() => {
        const Component = () => {
          return (
            <StepsLayout mode="loose" variant="drawer">
              <StepsLayout.Step title="Step 1">
                <Step1 />
              </StepsLayout.Step>

              <StepsLayout.Step title="Step 2">
                <Step2 />
              </StepsLayout.Step>

              <StepsLayout.Step title="Step 3">
                <Step3 />
              </StepsLayout.Step>
            </StepsLayout>
          )
        }

        const Step1 = () => {
          const { activeIndex, setActiveIndex } = StepsLayout.useStep()
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
          const { activeIndex, setActiveIndex } = StepsLayout.useStep()
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
          const { activeIndex, setActiveIndex } = StepsLayout.useStep()
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
    <ComponentBox scope={{ StepsLayout, StepsContext }}>
      {() => {
        const Component = () => {
          return (
            <Flex.Stack>
              <RenderBefore />
              <StepsLayout id="unique-id" mode="loose" variant="drawer">
                <StepsLayout.Step title="Step 1">
                  <output>Step 1</output>
                </StepsLayout.Step>

                <StepsLayout.Step title="Step 2">
                  <output>Step 2</output>
                </StepsLayout.Step>

                <StepsLayout.Step title="Step 1">
                  <output>Step 3</output>
                </StepsLayout.Step>
              </StepsLayout>
              <RenderAfter />
            </Flex.Stack>
          )
        }

        const RenderBefore = () => {
          const { activeIndex, setActiveIndex } =
            StepsLayout.useStep('unique-id')
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
            StepsLayout.useStep('unique-id')
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
