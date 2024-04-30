import React from 'react'
import { Card, Section } from '../../../components'
import { Field, Form, Wizard, Value } from '..'
import { Code } from '../../../elements'
import { Provider } from '../../../../shared'

export default {
  title: 'Eufemia/Forms/PizzaDemo',
}

type MyDataSet = {
  flavour?: string
  hasAllergies?: boolean
  allergies?: string
  firstName?: string
  lastName?: string
  streetName?: string
  streetNr?: number
  postalCode?: number
  city?: string
}

export function PizzaDemo() {
  const { data } = Form.useData<MyDataSet>('pizza-demo', {
    // flavour: 'pepperoni',
  })
  const { summaryTitle } = Form.useLocale().Step

  return (
    <Provider locale="en-GB">
      <Form.Handler
        defaultData={data}
        onSubmit={(data) => console.log('onSubmit', data)}
        id="pizza-demo"
        sessionStorageId="pizza-demo"
        autoComplete
      >
        <Wizard.Container>
          <Wizard.Step title="Which pizza do you want?">
            <Form.MainHeading>Which pizza do you want?</Form.MainHeading>

            <Card stack>
              <Form.SubHeading>Your Pizza</Form.SubHeading>
              <Field.Selection
                variant="button"
                label="Choose a flavour"
                path="/flavour"
                required
              >
                <Field.Option value="pepperoni" title="Pepperoni" />
                <Field.Option value="margarita" title="Margarita" />
                <Field.Option value="parma" title="Parma" />
              </Field.Selection>
            </Card>

            <Card stack>
              <Form.SubHeading>Allergies</Form.SubHeading>
              <Field.Boolean
                label="Do you have any allergies?"
                path="/hasAllergies"
                variant="buttons"
                required
              />

              <Form.Visibility pathTrue="/hasAllergies" animate>
                <Field.String
                  label="Write down your allergies"
                  path="/allergies"
                  required // only if visible 👌
                />
              </Form.Visibility>
            </Card>

            <Wizard.Buttons />
          </Wizard.Step>

          <Wizard.Step title="Delivery address">
            <Form.MainHeading>Delivery address</Form.MainHeading>

            <Card stack>
              <Form.SubHeading>Your name</Form.SubHeading>

              <Field.String
                label="First name"
                path="/firstName"
                required
              />
              <Field.String label="Last name" path="/lastName" required />
            </Card>

            <Card stack>
              <Form.SubHeading>Your address</Form.SubHeading>

              <Field.Composition label="Address" width="large">
                <Field.String
                  label="Street"
                  width="stretch"
                  path="/streetName"
                  required
                />
                <Field.Number
                  label="Nr."
                  width="small"
                  path="/streetNr"
                  required
                />
              </Field.Composition>

              <Field.PostalCodeAndCity
                postalCode={{ required: true, path: '/postalCode' }}
                city={{ required: true, path: '/city' }}
              />
            </Card>

            <Wizard.Buttons />
          </Wizard.Step>

          <Wizard.Step title={summaryTitle}>
            <Form.MainHeading>Summary</Form.MainHeading>

            <Card stack>
              <Value.String label="My flavour" path="/flavour" />
              <Value.Boolean
                label="I have allergies"
                path="/hasAllergies"
              />
              <Value.String label="My allergies" path="/allergies" />
            </Card>

            <Card stack>
              <Form.SubHeading>Deliver address</Form.SubHeading>

              <Value.Composition>
                <Value.String label="First name" path="/firstName" />
                <Value.String label="Last name" path="/lastName" />
              </Value.Composition>

              <Value.Composition label="Street">
                <Value.String path="/streetName" />
                <Value.Number path="/streetNr" />
              </Value.Composition>

              <Value.Composition label="City">
                <Value.String path="/postalCode" />
                <Value.String path="/city" />
              </Value.Composition>
            </Card>

            <Form.ButtonRow>
              <Wizard.Buttons />
              <Form.SubmitButton />
            </Form.ButtonRow>
          </Wizard.Step>
        </Wizard.Container>
      </Form.Handler>

      <Output>{data}</Output>
    </Provider>
  )
}

function Output({ children }) {
  return (
    <Section
      element="output"
      spacing
      style_type="sand-yellow"
      top
      bottom="large"
    >
      JSON Output: <Code>{JSON.stringify(children || {}, null, 4)}</Code>
    </Section>
  )
}
