import { Button, Flex } from '@dnb/eufemia/src'
import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { Wizard } from '@dnb/eufemia/src/extensions/forms'

export const Default = () => {
  return (
    <ComponentBox>
      {() => {
        const Component = () => {
          return (
            <Wizard.Container mode="loose" variant="drawer">
              <Wizard.Step title="Step 1">
                <Step1 />
              </Wizard.Step>

              <Wizard.Step title="Step 2">
                <Step2 />
              </Wizard.Step>

              <Wizard.Step title="Step 3">
                <Step3 />
              </Wizard.Step>
            </Wizard.Container>
          )
        }

        const Step1 = () => {
          const { activeIndex, setActiveIndex } = Wizard.useStep()
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
          const { activeIndex, setActiveIndex } = Wizard.useStep()
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
          const { activeIndex, setActiveIndex } = Wizard.useStep()
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
              <Wizard.Container
                id="unique-id"
                mode="loose"
                variant="drawer"
              >
                <Wizard.Step title="Step 1">
                  <output>Step 1</output>
                </Wizard.Step>

                <Wizard.Step title="Step 2">
                  <output>Step 2</output>
                </Wizard.Step>

                <Wizard.Step title="Step 1">
                  <output>Step 3</output>
                </Wizard.Step>
              </Wizard.Container>
              <RenderAfter />
            </Flex.Stack>
          )
        }

        const RenderBefore = () => {
          const { activeIndex, setActiveIndex } =
            Wizard.useStep('unique-id')
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
            Wizard.useStep('unique-id')
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
