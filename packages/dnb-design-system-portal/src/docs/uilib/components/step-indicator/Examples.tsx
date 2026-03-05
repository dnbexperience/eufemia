/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from '../../../../shared/tags/ComponentBox'
import { StepIndicator, Space, Button, Section } from '@dnb/eufemia/src'

export const StepIndicatorStatic = () => (
  <ComponentBox data-visual-test="step-indicator-static">
    <StepIndicator
      mode="static"
      currentStep={1}
      onChange={({ value }) => {
        console.log('onChange', value)
      }}
      data={[
        {
          title: 'Om din nye bolig',
        },
        {
          title: 'Ditt lån og egenkapital',
          onClick: ({ value }) => console.log(value),
        },
        {
          title: 'Oppsummering',
        },
      ]}
    />
  </ComponentBox>
)

export const StepIndicatorStrict = () => (
  <ComponentBox data-visual-test="step-indicator-strict">
    <StepIndicator
      mode="strict"
      currentStep={1}
      onChange={({ value }) => {
        console.log('onChange', value)
      }}
      data={[
        {
          title: 'Velg mottaker',
        },
        {
          title: 'Bestill eller erstatt',
          onClick: ({ value }) => console.log('value:', value),
          status:
            'Du må velge bestill nytt kort eller erstatt kort for å kunne fullføre bestillingen din.',
        },
        {
          title: 'Oppsummering',
        },
      ]}
    />
  </ComponentBox>
)

export const StepIndicatorLoose = () => (
  <ComponentBox data-visual-test="step-indicator-loose">
    {() => {
      const InteractiveDemo = () => {
        const [step, setStep] = React.useState(1)

        return (
          <div style={{ display: 'flex' }}>
            <Space stretch>
              <StepIndicator
                mode="loose"
                currentStep={step}
                onChange={({ value }) => {
                  setStep(value)
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
      return <InteractiveDemo />
    }}
  </ComponentBox>
)

export const StepIndicatorCustomized = () => (
  <ComponentBox>
    {() => {
      function CustomStepIndicator({ children, data, ...props }) {
        const [step, setStep] = React.useState(0)
        return (
          <>
            <StepIndicator
              mode="loose"
              data={data}
              currentStep={step}
              onChange={({ value }) => setStep(value)}
              bottom
              {...props}
            />
            <Section variant="lavender" innerSpace>
              {children(step)}
            </Section>
          </>
        )
      }
      return (
        <CustomStepIndicator
          data={[
            {
              title: 'First',
              isCurrent: true,
            },
            {
              title: 'Second',
            },
            {
              title: 'Last',
            },
          ]}
        >
          {(step) => {
            switch (step) {
              case 0:
                return <>Step One</>
              case 1:
                return <>Step Two</>
              default:
                return <>Fallback</>
            }
          }}
        </CustomStepIndicator>
      )
    }}
  </ComponentBox>
)

export const StepIndicatorTextOnly = () => (
  <ComponentBox data-visual-test="step-indicator-expanded">
    <StepIndicator
      expandedInitially
      mode="static"
      currentStep={1}
      data={[
        'Om din nye bolig',
        'Ditt lån og egenkapital',
        'Oppsummering',
      ]}
    />
  </ComponentBox>
)

export const StepIndicatorRouter = () => (
  <ComponentBox>
    {() => {
      const StepIndicatorWithRouter = () => {
        const [currentStep, setCurrentStep] = React.useState(1)

        React.useEffect(() => {
          const step =
            parseFloat(window.location.search?.replace(/[?]/, '')) || 1
          setCurrentStep(step)
        }, [])

        return (
          <>
            <StepIndicator
              mode="loose"
              currentStep={currentStep - 1}
              onChange={({ value }) => {
                const step = value + 1
                setCurrentStep(step)
                window.history.pushState({}, '', '?' + step)
              }}
              data={[
                {
                  title: 'Om din nye bolig',
                },
                {
                  title: 'Ditt lån og egenkapital',
                },
                {
                  title: 'Oppsummering',
                },
              ]}
            />
          </>
        )
      }
      return <StepIndicatorWithRouter />
    }}
  </ComponentBox>
)

export const StepIndicatorStatuses = () => (
  <ComponentBox data-visual-test="step-indicator-statuses">
    <StepIndicator
      mode="loose"
      currentStep={0}
      data={[
        {
          title: 'Current',
        },
        {
          title: 'Warning',
          status: 'Status message',
          statusState: 'warning',
        },
        {
          title: 'Error',
          status: 'Status message',
          statusState: 'error',
        },
        {
          title: 'Info',
          status: 'Status message',
          statusState: 'info',
        },
      ]}
    />
  </ComponentBox>
)

export const StepIndicatorSkeleton = () => (
  <ComponentBox data-visual-test="step-indicator-skeleton">
    <StepIndicator
      mode="static"
      skeleton
      currentStep={1}
      expandedInitially
      data={[
        {
          title: 'Om din nye bolig',
        },
        {
          title: 'Ditt lån og egenkapital',
        },
        {
          title: 'Oppsummering',
        },
      ]}
    />
  </ComponentBox>
)
