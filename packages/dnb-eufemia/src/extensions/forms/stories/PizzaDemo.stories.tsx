import React from 'react'
import { Field, Form, Wizard, Value, Tools } from '..'
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

            <Form.Card>
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
            </Form.Card>

            <Form.Card>
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
            </Form.Card>

            <Wizard.Buttons />
          </Wizard.Step>

          <Wizard.Step title="Delivery address">
            <Form.MainHeading>Delivery address</Form.MainHeading>

            <Form.Card>
              <Form.SubHeading>Your name</Form.SubHeading>

              <Field.Name.First path="/firstName" required />
              <Field.Name.Last path="/lastName" required />
            </Form.Card>

            <Form.Card>
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
            </Form.Card>

            <Wizard.Buttons />
          </Wizard.Step>

          <Wizard.Step title={summaryTitle}>
            <Form.MainHeading>Summary</Form.MainHeading>

            <Form.Card>
              <Value.String label="My flavour" path="/flavour" />
              <Value.Boolean
                label="I have allergies"
                path="/hasAllergies"
              />
              <Value.String label="My allergies" path="/allergies" />
            </Form.Card>

            <Form.Card>
              <Form.SubHeading>Deliver address</Form.SubHeading>

              <Value.Composition>
                <Value.Name.First path="/firstName" />
                <Value.Name.Last path="/lastName" />
              </Value.Composition>

              <Value.Composition label="Street">
                <Value.String path="/streetName" />
                <Value.Number path="/streetNr" />
              </Value.Composition>

              <Value.Composition label="City">
                <Value.String path="/postalCode" />
                <Value.String path="/city" />
              </Value.Composition>
            </Form.Card>

            <Form.ButtonRow>
              <Wizard.Buttons />
              <Form.SubmitButton />
            </Form.ButtonRow>
          </Wizard.Step>
        </Wizard.Container>
      </Form.Handler>

      <Tools.Log data={data} top />
    </Provider>
  )
}
