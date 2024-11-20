import React from 'react'
import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { debounceAsync } from '@dnb/eufemia/src/shared/helpers/debounce'
import { createRequest } from '../../Form/SubmitIndicator/Examples'
import {
  Form,
  Field,
  Value,
  Wizard,
} from '@dnb/eufemia/src/extensions/forms'
import { Card, P } from '@dnb/eufemia/src'

export const Default = () => {
  return (
    <ComponentBox data-visual-test="wizard-layout-card-border">
      {() => {
        const initialData = {
          firstName: 'John',
          lastName: 'Doe',
          streetName: 'Osloveien',
          streetNr: 12,
          postalCode: '1234',
          city: 'Oslo',
        }

        const Step1 = () => (
          <Wizard.Step title="Step 1">
            <Form.MainHeading>Heading</Form.MainHeading>
            <Card stack>
              <P>Contents</P>
            </Card>
            <Card stack>
              <P>Contents</P>
            </Card>

            <Wizard.Buttons />
          </Wizard.Step>
        )

        const Step2 = () => (
          <Wizard.Step title="Step 2">
            <Form.MainHeading>Heading</Form.MainHeading>
            <Card stack>
              <P>Contents</P>
            </Card>
            <Card stack>
              <P>Contents</P>
            </Card>

            <Wizard.Buttons />
          </Wizard.Step>
        )

        const Summary = () => {
          const { summaryTitle } = Form.useLocale().Step

          return (
            <Wizard.Step title={summaryTitle}>
              <Form.MainHeading>Summary</Form.MainHeading>
              <Card stack>
                <Form.SubHeading>Deliver address</Form.SubHeading>

                <Value.SummaryList layout="grid">
                  <Value.Name.First path="/firstName" />
                  <Value.Name.Last path="/lastName" />

                  <Value.Composition label="Street">
                    <Value.String path="/streetName" />
                    <Value.Number path="/streetNr" />
                  </Value.Composition>

                  <Value.Composition label="City">
                    <Value.String path="/postalCode" />
                    <Value.String path="/city" />
                  </Value.Composition>
                </Value.SummaryList>

                <Wizard.EditButton toStep={1} />
              </Card>

              <Form.ButtonRow>
                <Wizard.Buttons />
                <Form.SubmitButton variant="send" />
              </Form.ButtonRow>
            </Wizard.Step>
          )
        }

        // Can be an async function, in case you need to make some async stuff
        const onStepChange = async (step, mode) => {
          if (mode === 'next') {
            await new Promise((resolve) => setTimeout(resolve, 1000))
          }
          console.log('onStepChange', step, mode)
        }

        // Can be an async function, in case you need to make some async stuff
        const onSubmit = async (data) => {
          await new Promise((resolve) => setTimeout(resolve, 2000))
          console.log('onSubmit', data)
        }

        const MyForm = () => {
          // Routers like "react-router" are supported as well
          Wizard.useQueryLocator('my-wizard')

          return (
            <Form.Handler data={initialData} onSubmit={onSubmit}>
              <Wizard.Container id="my-wizard" onStepChange={onStepChange}>
                <Step1 />
                <Step2 />
                <Summary />
              </Wizard.Container>
            </Form.Handler>
          )
        }

        return <MyForm />
      }}
    </ComponentBox>
  )
}

export const AsyncWizardContainer = () => {
  return (
    <ComponentBox scope={{ createRequest, debounceAsync }}>
      {() => {
        const MyForm = () => {
          const onStepChange = React.useCallback(async (index, mode) => {
            console.log('onStepChange', index)

            if (mode === 'next') {
              try {
                const request = createRequest()
                await request(1000) // Simulate a request
              } catch (error) {
                return error
              }
            }

            // Optional, you can show a FormStatus at the bottom of the form
            return { info: 'Info message: ' + index }
          }, [])

          const onSubmit = React.useCallback(async (data) => {
            console.log('onSubmit', data)

            try {
              const request = createRequest()
              await request(1000) // Simulate a request
            } catch (error) {
              return error
            }

            // Optional, you can show a FormStatus at the bottom of the form
            return { warning: 'Warning message' }
          }, [])

          const validator = React.useCallback(async (value) => {
            try {
              const request = createRequest()
              await request(1000) // Simulate a request
            } catch (error) {
              return error
            }

            if (value === 'invalid') {
              return Error('Error message')
            }
          }, [])

          const validator1 = debounceAsync(validator)
          const validator2 = debounceAsync(validator)

          const Step1 = () => {
            return (
              <Wizard.Step title="Step 1">
                <Card stack>
                  <Field.String
                    label="Required field with async validator"
                    onChangeValidator={validator1}
                    path="/field1"
                    required
                  />
                  <Field.String
                    label="Field with async validator"
                    onChangeValidator={validator2}
                    path="/field2"
                  />
                </Card>

                <Wizard.Buttons />
              </Wizard.Step>
            )
          }

          const Step2 = () => {
            return (
              <Wizard.Step title="Step 2">
                <Form.MainHeading>Heading</Form.MainHeading>

                <Card stack>
                  <P>Contents of step 2</P>
                </Card>

                <Form.ButtonRow>
                  <Wizard.Buttons />
                  <Form.SubmitButton variant="send" />
                </Form.ButtonRow>
              </Wizard.Step>
            )
          }

          return (
            <Form.Handler onSubmit={onSubmit}>
              <Wizard.Container onStepChange={onStepChange}>
                <Step1 />
                <Step2 />
              </Wizard.Container>
            </Form.Handler>
          )
        }

        return <MyForm />
      }}
    </ComponentBox>
  )
}

export const WithStatusMessage = () => {
  return (
    <ComponentBox data-visual-test="wizard-with-status-message">
      <Form.Handler>
        <Wizard.Container
          onStepChange={async (index, mode, { preventNavigation }) => {
            preventNavigation()

            return {
              info: 'Info message.',
              warning: 'Warning message.',
            }
          }}
        >
          <Wizard.Step title="Step 1">
            <Form.MainHeading>Step 1</Form.MainHeading>
            <P>Content</P>
            <Wizard.NextButton text="Press me to see the status message" />
          </Wizard.Step>
        </Wizard.Container>
      </Form.Handler>
    </ComponentBox>
  )
}
