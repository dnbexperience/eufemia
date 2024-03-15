import ComponentBox from '../../../../../../../shared/tags/ComponentBox'
import { Card, P } from '@dnb/eufemia/src'
import {
  StepsLayout,
  Form,
  Field,
  Value,
} from '@dnb/eufemia/src/extensions/forms'
import { debounceAsync } from '@dnb/eufemia/src/shared/helpers/debounce'
import React from 'react'
import { createRequest } from '../../Form/SubmitIndicator/Examples'

export const Default = () => {
  return (
    <ComponentBox
      scope={{ StepsLayout }}
      data-visual-test="steps-layout-card-border"
    >
      <Form.Handler
        data={{
          firstName: 'John',
          lastName: 'Doe',
          streetName: 'Osloveien',
          streetNr: 12,
          postalCode: '1234',
          city: 'Oslo',
        }}
      >
        <StepsLayout>
          <StepsLayout.Step title="Step 1">
            <Form.MainHeading>Heading</Form.MainHeading>
            <Card>
              <P>Contents</P>
            </Card>
            <Card>
              <P>Contents</P>
            </Card>
            <StepsLayout.NextButton />
          </StepsLayout.Step>

          <StepsLayout.Step title="Step 2">
            <Form.MainHeading>Heading</Form.MainHeading>
            <Card>
              <P>Contents</P>
            </Card>
            <Form.ButtonRow>
              <StepsLayout.PreviousButton />
              <StepsLayout.NextButton />
            </Form.ButtonRow>
          </StepsLayout.Step>

          <StepsLayout.Step title="Summary">
            <Form.MainHeading>Summary</Form.MainHeading>
            <Card stack>
              <Form.SubHeading>Deliver address</Form.SubHeading>

              <Value.SummaryList layout="grid">
                <Value.String label="First name" path="/firstName" />
                <Value.String label="Last name" path="/lastName" />

                <Value.String label="Street" path="/streetName" />
                <Value.Number label="Nr." path="/streetNr" />

                <Value.String label="Postalc." path="/postalCode" />
                <Value.String label="City" path="/city" />
              </Value.SummaryList>
            </Card>
            <StepsLayout.PreviousButton />
          </StepsLayout.Step>
        </StepsLayout>
      </Form.Handler>
    </ComponentBox>
  )
}

export const AsyncStepsLayout = () => {
  return (
    <ComponentBox scope={{ StepsLayout, createRequest, debounceAsync }}>
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

          return (
            <Form.Handler onSubmit={onSubmit}>
              <StepsLayout onStepChange={onStepChange} variant="drawer">
                <StepsLayout.Step title="Step 1">
                  <Card stack>
                    <Field.String
                      label="Required field with async validator"
                      validator={validator1}
                      path="/field1"
                      required
                    />
                    <Field.String
                      label="Field with async validator"
                      validator={validator2}
                      path="/field2"
                    />
                  </Card>
                  <Form.ButtonRow>
                    <StepsLayout.PreviousButton />
                    <StepsLayout.NextButton />
                  </Form.ButtonRow>
                </StepsLayout.Step>

                <StepsLayout.Step title="Step 2">
                  <Form.MainHeading>Heading</Form.MainHeading>
                  <Card>
                    <P>Contents of step 2</P>
                  </Card>
                  <Form.ButtonRow>
                    <StepsLayout.PreviousButton />
                    <Form.SubmitButton />
                  </Form.ButtonRow>
                </StepsLayout.Step>
              </StepsLayout>
            </Form.Handler>
          )
        }

        return <MyForm />
      }}
    </ComponentBox>
  )
}
