import React from 'react'
import { Button, Flex } from '@dnb/eufemia/src'
import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { Wizard } from '@dnb/eufemia/src/extensions/forms'

export const Default = () => {
  return (
    <ComponentBox>
      {() => {
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

        return (
          <Wizard.Container mode="loose">
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
      }}
    </ComponentBox>
  )
}

export const OnStepChange = () => {
  return (
    <ComponentBox>
      {() => {
        const onStepChange1 = (index, mode, { preventNavigation }) => {
          console.log(
            'onStepChange from Step1:',
            index,
            mode,
            typeof preventNavigation
          )
        }

        const onStepChange2 = (index, mode, { preventNavigation }) => {
          console.log(
            'onStepChange from Step2:',
            index,
            mode,
            typeof preventNavigation
          )
        }

        const onStepChange3 = (index, mode, { preventNavigation }) => {
          console.log(
            'onStepChange from Step3:',
            index,
            mode,
            typeof preventNavigation
          )
        }

        const Step1 = () => {
          Wizard.useStep(undefined, { onStepChange: onStepChange1 })

          return (
            <Wizard.Step title="Step 1">
              <Wizard.Buttons />
            </Wizard.Step>
          )
        }

        const Step2 = () => {
          Wizard.useStep(undefined, { onStepChange: onStepChange2 })

          return (
            <Wizard.Step title="Step 2">
              <Wizard.Buttons />
            </Wizard.Step>
          )
        }

        const Step3 = () => {
          Wizard.useStep(undefined, { onStepChange: onStepChange3 })

          return (
            <Wizard.Step title="Step 3">
              <Wizard.Buttons />
            </Wizard.Step>
          )
        }

        return (
          <Wizard.Container mode="loose">
            <Step1 />
            <Step2 />
            <Step3 />
          </Wizard.Container>
        )
      }}
    </ComponentBox>
  )
}

export const OutsideOfContext = () => {
  return (
    <ComponentBox>
      {() => {
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

        return (
          <Flex.Stack>
            <RenderBefore />
            <Wizard.Container id="unique-id" mode="loose">
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
      }}
    </ComponentBox>
  )
}
