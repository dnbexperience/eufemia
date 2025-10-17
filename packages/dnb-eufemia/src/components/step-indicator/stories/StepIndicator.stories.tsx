/**
 * @dnb/eufemia Component Story
 *
 */

import React from 'react'
import { Wrapper, Box } from 'storybook-utils/helpers'
import { StepIndicator, Button, Space } from '../../'
import { Code } from '../../..'
import { Provider } from '../../../shared'
import { StepIndicatorDataItem } from '../StepIndicator'

export default {
  title: 'Eufemia/Components/StepIndicator',
}

export function RenderDuringSSR() {
  const [count, increment] = React.useState(0)

  const data = [
    {
      title: 'Velg mottaker ' + count,
    },
    {
      title: 'Bestill eller erstatt ' + count,
      on_click: ({ current_step }) =>
        console.log('current_step:', current_step),
      status:
        'Du må velge bestill nytt kort eller erstatt kort for å kunne fullføre bestillingen din.',
    },
    {
      title: 'Oppsummering ' + count,
    },
  ]

  return (
    <>
      <Provider StepIndicator={{ data }}>
        <StepIndicator
          // skeleton
          id="main"
          // mode="strict"
          mode="loose"
          data={data}
          // current_step={0}
          current_step={1}
          on_click={() => {
            console.log('')
          }}
          on_change={({ current_step }) => {
            console.log('on_change', current_step)
          }}
        />
      </Provider>
      <Button
        top
        on_click={() => {
          increment((c) => c + 1)
        }}
        text="increment"
      />
    </>
  )
}

const data = [
  {
    // title: 'First',
    title: <>Bestill eller erstatt</>,
    // 'Second Sapien vivamus convallis fermentum euismod quam platea tellus nullam mollis',
    // on_click: ({ currentStep }) => console.log('on_click', currentStep),
    status:
      'Du må velge bestill nytt kort eller erstatt kort for å kunne fullføre bestillingen din.',
    // status_state: 'warn',
    // on_click: ({ currentStep }) => console.log('on_click', currentStep),
  },
  {
    title:
      'Second Sapien vivamus convallis fermentum euismod quam platea tellus nullam mollis',
    // on_click: ({ currentStep }) => console.log('on_click', currentStep),
    // disabled: true,
    // inactive: true,
    // is_current: true,
  },
  {
    title:
      'Third Sapien vivamus convallis fermentum euismod quam platea tellus nullam mollis',
    // on_click: ({ currentStep }) => console.log('on_click', currentStep),
  },
]

const InteractiveDemo = () => {
  const [step, setStep] = React.useState(1)

  return (
    <div style={{ display: 'flex' }}>
      <Space stretch>
        <StepIndicator
          mode="loose"
          current_step={step}
          on_change={({ current_step }) => {
            setStep(current_step)
          }}
          data={[
            // 'a',
            // 'b',
            // 'c',
            'Cum odio si bolig bla et ta',
            'Auctor tortor vestibulum placerat bibendum sociis aliquam nunc sed venenatis massa eget duis',
            'Bibendum sociis',
          ]}
          bottom
        />

        <Button
          variant="secondary"
          on_click={() => {
            setStep((step) => {
              if (step >= 2) {
                step = -1
              }
              return step + 1
            })
          }}
        >
          Next step
        </Button>
      </Space>
    </div>
  )
}

export const StepIndicatorSandbox = () => {
  const [count, increment] = React.useState(0)
  const [current_step, setCurrentStep] = React.useState(1)
  return (
    <Wrapper>
      <Box>
        <InteractiveDemo />
      </Box>
      <Box>
        <Code>{JSON.stringify({ count, current_step })}</Code>
        <Button
          onClick={() => {
            increment((i) => i + 1)
          }}
        >
          Increment
        </Button>
        <Button
          onClick={() => {
            setCurrentStep((i) => {
              if (i >= 2) {
                i = -1
              }
              return i + 1
            })
          }}
        >
          Step
        </Button>

        <br />
        <br />

        <StepIndicator
          // skeleton
          top="large"
          // hide_numbers
          // mode="static"
          // mode="strict"
          mode="loose"
          current_step={current_step}
          on_change={({ currentStep }) => {
            console.log('on_change', currentStep)
            setCurrentStep(currentStep)
            // console.log('on_change', currentStep)
          }}
          data={data}
        />
      </Box>
      <Box>
        <StepIndicator
          // skeleton
          top="large"
          // mode="static"
          mode="strict"
          current_step={current_step}
          on_change={({ currentStep }) => {
            console.log('on_change', currentStep)
            setCurrentStep(currentStep)
            // console.log('on_change', currentStep)
          }}
          data={data}
        />
      </Box>
    </Wrapper>
  )
}

const stepIndicatorListData = [
  {
    title: 'Step A',
  },
  {
    title: 'Step B',
  },
  {
    title: 'Step C',
  },
  {
    title: 'Step D',
  },
]

export const CurrentStepPropChange = () => {
  const [current_step, setCurrentStep] = React.useState(1)

  function stepOn() {
    if (current_step === stepIndicatorListData.length - 1) {
      return setCurrentStep(0)
    }

    setCurrentStep((step) => step + 1)
  }

  return (
    <Wrapper>
      <Box>
        <Button onClick={stepOn}>Step</Button>
        <Button onClick={() => setCurrentStep(2)}>Go to third step</Button>
        <Button onClick={() => setCurrentStep(0)}>Reset</Button>
      </Box>
      <Box>
        <StepIndicator
          current_step={current_step}
          mode="loose"
          data={stepIndicatorListData}
        />
      </Box>
    </Wrapper>
  )
}

export const OnlyOneCurrent = () => {
  return (
    <Wrapper>
      <Box>
        <StepIndicator
          mode="loose"
          data={[
            {
              title: 'Step A',
            },
            {
              title: 'Step B',
            },
            {
              title: 'Step C',
              is_current: true,
            },
          ]}
        />
      </Box>
    </Wrapper>
  )
}

export const EventTests = () => {
  const data: StepIndicatorDataItem[] = [
    {
      title: 'Step A',
    },
    {
      title: 'Step B',
    },
    {
      title: 'Step C',
      is_current: true,
      on_click: (event) => {
        console.log('Item Click', event)
      },
    },
  ]

  return (
    <Wrapper>
      <Box>
        <StepIndicator
          on_click={(event) => {
            console.log('Stepinidcator Click', event)
          }}
          on_change={(event) => console.log('On Change', event)}
          mode="loose"
          data={data}
        />
      </Box>
    </Wrapper>
  )
}

export const TitleTests = () => {
  const [current_step, setCurrentStep] = React.useState(0)

  const data: StepIndicatorDataItem[] = [
    {
      title: 'Step A',
    },
    {
      title: 'Step B',
    },
    {
      title: 'Step C',
    },
  ]

  return (
    <>
      <Box>
        <StepIndicator
          overview_title="Custom Overview Title"
          step_title="Custom Step Title"
          top="large"
          mode="loose"
          current_step={current_step}
          data={data}
          on_click={({ currentStep }) => setCurrentStep(currentStep)}
        />
      </Box>
    </>
  )
}
