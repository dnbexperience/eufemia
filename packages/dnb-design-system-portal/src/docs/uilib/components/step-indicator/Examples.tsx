/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from '../../../../shared/tags/ComponentBox'
import { createBrowserHistory } from 'history'
import { StepIndicator, Space, Button, Section } from '@dnb/eufemia/src'

export const StepIndicatorStatic = () => (
  <ComponentBox data-visual-test="step-indicator-static">
    <StepIndicator
      sidebar_id="unique-id-static"
      mode="static"
      current_step={1}
      on_change={({ current_step }) => {
        console.log('on_change', current_step)
      }}
      data={[
        {
          title: 'Om din nye bolig',
        },
        {
          title: 'Ditt lån og egenkapital',
          on_click: ({ current_step }) => console.log(current_step),
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
    <StepIndicator.Sidebar sidebar_id="unique-id-strict" />
    <StepIndicator
      sidebar_id="unique-id-strict"
      mode="strict"
      current_step={1}
      on_change={({ current_step }) => {
        console.log('on_change', current_step)
      }}
      data={[
        {
          title: 'Velg mottaker',
        },
        {
          title: 'Bestill eller erstatt',
          on_click: ({ current_step }) =>
            console.log('current_step:', current_step),
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
            <StepIndicator.Sidebar sidebar_id="unique-id-loose" />

            <Space stretch>
              <StepIndicator
                sidebar_id="unique-id-loose"
                mode="loose"
                current_step={step}
                on_change={({ current_step }) => {
                  setStep(current_step)
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
              sidebar_id="unique-id-customized"
              mode="loose"
              data={data}
              current_step={step}
              on_change={({ current_step }) => setStep(current_step)}
              {...props}
            />
            <Section style_type="lavender" spacing>
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
              is_current: true,
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

export const StepIndicatorSidebar = () => (
  <ComponentBox data-visual-test="step-indicator-sidebar">
    <StepIndicator
      style={{ display: 'none' }}
      sidebar_id="unique-id-sidebar"
      mode="loose"
      data={[
        {
          title: 'Om din nye bolig',
        },
        {
          title: 'Ditt lån og egenkapital',
        },
        {
          title: 'Oppsummering',
          is_current: true,
        },
      ]}
    />
    <StepIndicator.Sidebar sidebar_id="unique-id-sidebar" top="large" />
  </ComponentBox>
)

export const StepIndicatorTextOnly = () => (
  <ComponentBox>
    <StepIndicator
      sidebar_id="unique-id-text"
      mode="static"
      current_step={1}
      data={[
        'Om din nye bolig',
        'Ditt lån og egenkapital',
        'Oppsummering',
      ]}
    />
  </ComponentBox>
)

export const StepIndicatorCustomRenderer = () => (
  <ComponentBox>
    <StepIndicator
      sidebar_id="unique-id-renderer"
      mode="strict"
      current_step={1}
      on_change={({ current_step }) => {
        console.log('on_change', current_step)
      }}
      on_item_render={({ StepItem }) => {
        return <StepItem onClick={(e) => console.log(e)} />
      }}
      data={[
        {
          title: 'Om din nye bolig',
        },
        {
          title: 'Ditt lån og egenkapital',
          on_click: ({ current_step }) => console.log(current_step),
          on_render: ({ StepItem }) => (
            <StepItem onClick={(e) => console.log(e)} />
          ),
        },
        {
          title: 'Oppsummering',
          /**
           * We can also overwrite the states
           * inactive: true
           * is_current: true
           */
        },
      ]}
    />
  </ComponentBox>
)

export const StepIndicatorRouter = () => (
  <ComponentBox scope={{ createBrowserHistory }}>
    {() => {
      const StepIndicatorWithRouter = () => {
        const [currentStep, setCurrentStep] = React.useState(1)
        const [history, setInstance] = React.useState(null)
        React.useEffect(() => {
          const history = createBrowserHistory()
          const step =
            parseFloat(history.location.search?.replace(/[?]/, '')) || 1
          setCurrentStep(step)
          setInstance(history)
        }, [])
        return (
          <>
            <StepIndicator
              sidebar_id="step-indicator-router"
              mode="loose"
              current_step={currentStep - 1}
              on_change={({ current_step }) => {
                const step = current_step + 1
                setCurrentStep(step)
                history.push('?' + step)
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
              space
            />
            <StepIndicator.Sidebar
              sidebar_id="step-indicator-router"
              space
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
    <StepIndicator.Sidebar sidebar_id="unique-id-statuses" />
    <StepIndicator
      sidebar_id="unique-id-statuses"
      mode="loose"
      current_step={0}
      data={[
        {
          title: 'Current',
        },
        {
          title: 'Warning',
          status: 'Status message',
          status_state: 'warn',
        },
        {
          title: 'Error',
          status: 'Status message',
          status_state: 'error',
        },
        {
          title: 'Info',
          status: 'Status message',
          status_state: 'info',
        },
      ]}
    />
  </ComponentBox>
)
