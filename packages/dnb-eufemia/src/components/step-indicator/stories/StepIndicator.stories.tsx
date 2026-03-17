/**
 * @dnb/eufemia Component Story
 *
 */

import React from 'react'
import { Wrapper, Box } from 'storybook-utils/helpers'
import { StepIndicator, Button, Space } from '../../'
import { Code } from '../../..'
import { Provider } from '../../../shared'
import type { StepIndicatorDataItem } from '../StepIndicator'

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
      onClick: ({ currentStep }) =>
        console.log('currentStep:', currentStep),
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
          id="main"
          mode="loose"
          data={data}
          currentStep={1}
          onClick={() => {
            console.log('')
          }}
          onChange={({ currentStep }) => {
            console.log('onChange', currentStep)
          }}
        />
      </Provider>
      <Button
        top
        onClick={() => {
          increment((c) => c + 1)
        }}
        text="increment"
      />
    </>
  )
}

const data = [
  {
    title: <>Bestill eller erstatt</>,
    status:
      'Du må velge bestill nytt kort eller erstatt kort for å kunne fullføre bestillingen din.',
  },
  {
    title:
      'Second Sapien vivamus convallis fermentum euismod quam platea tellus nullam mollis',
  },
  {
    title:
      'Third Sapien vivamus convallis fermentum euismod quam platea tellus nullam mollis',
  },
]

const InteractiveDemo = () => {
  const [step, setStep] = React.useState(1)

  return (
    <div style={{ display: 'flex' }}>
      <Space stretch>
        <StepIndicator
          mode="loose"
          currentStep={step}
          onChange={({ currentStep }) => {
            setStep(currentStep)
          }}
          data={[
            'Cum odio si bolig bla et ta',
            'Auctor tortor vestibulum placerat bibendum sociis aliquam nunc sed venenatis massa eget duis',
            'Bibendum sociis',
          ]}
          bottom
        />

        <Button
          variant="secondary"
          onClick={() => {
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
  const [currentStep, setCurrentStep] = React.useState(1)
  return (
    <Wrapper>
      <Box>
        <InteractiveDemo />
      </Box>
      <Box>
        <Code>{JSON.stringify({ count, currentStep })}</Code>
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
          top="large"
          mode="loose"
          currentStep={currentStep}
          onChange={({ currentStep }) => {
            console.log('onChange', currentStep)
            setCurrentStep(currentStep)
          }}
          data={data}
        />
      </Box>
      <Box>
        <StepIndicator
          top="large"
          mode="strict"
          currentStep={currentStep}
          onChange={({ currentStep }) => {
            console.log('onChange', currentStep)
            setCurrentStep(currentStep)
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
  const [currentStep, setCurrentStep] = React.useState(1)

  function stepOn() {
    if (currentStep === stepIndicatorListData.length - 1) {
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
          currentStep={currentStep}
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
              isCurrent: true,
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
      isCurrent: true,
      onClick: (event) => {
        console.log('Item Click', event)
      },
    },
  ]

  return (
    <Wrapper>
      <Box>
        <StepIndicator
          onClick={(event) => {
            console.log('Stepinidcator Click', event)
          }}
          onChange={(event) => console.log('On Change', event)}
          mode="loose"
          data={data}
        />
      </Box>
    </Wrapper>
  )
}

export const TitleTests = () => {
  const [currentStep, setCurrentStep] = React.useState(0)

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
          overviewTitle="Custom Overview Title"
          stepTitle="Custom Step Title"
          top="large"
          mode="loose"
          currentStep={currentStep}
          data={data}
          onClick={({ currentStep }) => setCurrentStep(currentStep)}
        />
      </Box>
    </>
  )
}
