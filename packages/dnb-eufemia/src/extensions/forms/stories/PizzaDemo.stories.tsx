import React from 'react'
import { Card, Flex, Section } from '../../../components'
import {
  Field,
  FieldBlock,
  Form,
  StepsLayout,
  Value,
  Visibility,
} from '..'
import { MainHeading, SubHeading } from '../Form'
import { Code } from '../../../elements'
import { Provider } from '../../../../shared'

export default {
  title: 'Eufemia/Forms/PizzaDemo',
}

type MyDataSet = {
  flavour: string
  hasAllergies: boolean
  allergies?: string
  firstName?: string
  lastName?: string
  streetName?: string
  streetNr?: number
  postalCode?: number
  city?: string
}

export function PizzaDemo() {
  const [data, setData] = React.useState<MyDataSet>()

  return (
    <Provider locale="en-GB">
      <Form.Handler
        defaultData={data}
        onChange={setData}
        onSubmit={(data) => console.log('onSubmit', data)}
        sessionStorageId="pizza-demo"
        autoComplete
      >
        <StepsLayout>
          <StepsLayout.Step title="Which pizza do you want?">
            <MainHeading>Which pizza do you want?</MainHeading>

            <Card stack>
              <SubHeading>Your Pizza</SubHeading>
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
              <SubHeading>Allergies</SubHeading>
              <Field.Boolean
                label="Do you have any allergies?"
                path="/hasAllergies"
                variant="buttons"
                required
              />

              <Visibility pathTrue="/hasAllergies">
                <Field.String
                  label="Write down your alergies"
                  path="/alergies"
                  required // only if visible 👌
                />
              </Visibility>
            </Card>

            <Form.ButtonRow>
              <StepsLayout.NextButton />
            </Form.ButtonRow>
          </StepsLayout.Step>

          <StepsLayout.Step title="Delivery address">
            <MainHeading>Delivery address</MainHeading>

            <Card stack>
              <SubHeading>Your name</SubHeading>

              <Field.String
                label="First name"
                path="/firstName"
                required
              />
              <Field.String label="Last name" path="/lastName" required />
            </Card>

            <Card stack>
              <SubHeading>Your address</SubHeading>

              <FieldBlock label="Address" width="large">
                <Flex.Horizontal>
                  <Field.String
                    label="Street"
                    width="medium"
                    path="/streetName"
                    required
                  />
                  <Field.Number
                    label="Nr."
                    width="small"
                    path="/streetNr"
                    required
                  />
                </Flex.Horizontal>
              </FieldBlock>

              <Field.PostalCodeAndCity
                postalCode={{ required: true, path: '/postalCode' }}
                city={{ required: true, path: '/city' }}
              />
            </Card>

            <Form.ButtonRow>
              <StepsLayout.NextButton />
            </Form.ButtonRow>
          </StepsLayout.Step>

          <StepsLayout.Step title="Summary">
            <MainHeading>Summary</MainHeading>

            <Card stack>
              <Value.String label="My flavour" path="/flavour" />
              <Value.Boolean
                label="I have allergies"
                path="/hasAllergies"
              />
              <Value.String label="My allergies" path="/alergies" />
            </Card>

            <Card stack>
              <Flex.Horizontal>
                <Value.String label="First name" path="/firstName" />
                <Value.Number label="Last name" path="/lastName" />
              </Flex.Horizontal>

              <Flex.Horizontal>
                <Value.String label="Street" path="/streetName" />
                <Value.Number label="Nr." path="/streetNr" />
              </Flex.Horizontal>

              <Flex.Horizontal>
                <Value.String label="Postal Code" path="/postalCode" />
                <Value.Number label="City" path="/city" />
              </Flex.Horizontal>
            </Card>

            <Form.ButtonRow>
              <StepsLayout.PreviousButton />
              <Form.SubmitButton />
            </Form.ButtonRow>
          </StepsLayout.Step>
        </StepsLayout>
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
