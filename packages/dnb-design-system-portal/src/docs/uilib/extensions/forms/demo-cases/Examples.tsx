import { Section, Code, Card, Flex } from '@dnb/eufemia/src'
import * as React from 'react'
import {
  Form,
  StepsLayout,
  Field,
  Value,
  FieldBlock,
} from '@dnb/eufemia/src/extensions/forms'
import { Provider } from '@dnb/eufemia/src/shared'
import ComponentBox from '../../../../../shared/tags/ComponentBox'

export const BecomeCorporateCustomer = () => {
  return (
    <ComponentBox hideCode scope={{ StepsLayout }}>
      {() => {
        const Output = () => {
          const { data } = Form.useData('example-form', {
            website: 'www.dnb.no',
          })

          return (
            <Section
              element="output"
              innerSpace
              backgroundColor="sand-yellow"
              top
              bottom="large"
            >
              JSON Output: <Code>{JSON.stringify(data, null, 4)}</Code>
            </Section>
          )
        }

        return (
          <>
            <Form.Handler
              id="example-form"
              onSubmit={(data) => console.log('onSubmit', data)}
            >
              <StepsLayout top scrollTopOnStepChange>
                <StepsLayout.Step title="Bedriftsopplysninger">
                  <Form.MainHeading>Bedriftsopplysninger</Form.MainHeading>

                  <Card spacing="medium">
                    <Field.OrganizationNumber
                      path="/companyOrganizationNumber"
                      required
                    />
                    <Field.String
                      path="/companyName"
                      label="Bedriftens navn"
                      required
                    />
                    <Field.String
                      path="/companyAddress"
                      label="Forretningsadresse (NB! Ikke postadresse)"
                      required
                    />
                    <Field.PostalCodeAndCity
                      postalCode={{
                        path: '/companyPostalCode',
                      }}
                      city={{
                        path: '/companyCity',
                      }}
                    />
                    <Field.Selection
                      variant="radio"
                      path="/postalAddressSelect"
                      label="Postadresse (ønsket sted for tilsendt post)"
                    >
                      <Field.Option
                        value="companyAddress"
                        title="Samme som forretningsadresse"
                      />
                      <Field.Option value="other" title="Annet" />
                    </Field.Selection>
                    <Field.Selection
                      variant="radio"
                      path="/hqAddress"
                      label="Hovedkontoradresse"
                    >
                      <Field.Option
                        value="companyAddress"
                        title="Samme som forretningsadresse"
                      />
                      <Field.Option
                        value="postalAddress"
                        title="Samme som postadresse"
                      />
                      <Field.Option value="other" title="Annet" />
                    </Field.Selection>
                    <Field.SelectCountry
                      path="/countryOfEstablishment"
                      label="Etableringsland"
                      required
                    />
                  </Card>

                  <Card spacing="medium">
                    <Field.PhoneNumber
                      path="/phoneNumber"
                      label="Telefon/mobilnummer"
                      required
                    />
                    <Field.Email path="/email" required />
                    <Field.String
                      path="/website"
                      label="Nettstedsadresse (valgfritt)"
                    />
                  </Card>

                  <Form.ButtonRow>
                    <StepsLayout.NextButton />
                  </Form.ButtonRow>
                </StepsLayout.Step>

                <StepsLayout.Step title="Kontaktperson">
                  <Form.MainHeading>Profile</Form.MainHeading>

                  <Card stack>
                    <Form.SubHeading>More information</Form.SubHeading>

                    <Field.NationalIdentityNumber path="/ssn" />
                    <Field.Email path="/email" />
                    <Field.PhoneNumber path="/phone" />
                  </Card>

                  <Form.ButtonRow>
                    <StepsLayout.PreviousButton />
                    <StepsLayout.NextButton />
                  </Form.ButtonRow>
                </StepsLayout.Step>

                <StepsLayout.Step title="Bedriftens virksomhet">
                  <em>Bedriftens virksomhet</em>
                </StepsLayout.Step>

                <StepsLayout.Step title="Bruk av DNBs tjenester">
                  <em>Bruk av DNBs tjenester</em>
                </StepsLayout.Step>

                <StepsLayout.Step title="Inntekt og egenkapital">
                  <em>Inntekt og egenkapital</em>
                </StepsLayout.Step>

                <StepsLayout.Step title="Skatterapportering">
                  <em>Skatterapportering</em>
                </StepsLayout.Step>

                <StepsLayout.Step title="Eierskap og kontroll">
                  ...
                </StepsLayout.Step>

                <StepsLayout.Step title="Roller i bedriften">
                  ...
                </StepsLayout.Step>

                <StepsLayout.Step title="Oppsummering">
                  <Form.MainHeading>Profile</Form.MainHeading>

                  <Card stack>
                    <Flex.Container>
                      <Value.String path="/firstName" />
                      <Value.String path="/lastName" />
                    </Flex.Container>

                    <Value.NationalIdentityNumber path="/ssn" />
                    <Value.Email path="/email" />
                    <Value.PhoneNumber path="/phone" />
                  </Card>

                  <Form.ButtonRow>
                    <StepsLayout.PreviousButton />
                    <Form.SubmitButton />
                  </Form.ButtonRow>
                </StepsLayout.Step>

                <StepsLayout.Step title="Kvittering">
                  Kvittering...
                </StepsLayout.Step>
              </StepsLayout>
            </Form.Handler>

            <Output />
          </>
        )
      }}
    </ComponentBox>
  )
}

export function PizzaDemo() {
  return (
    <ComponentBox hideCode scope={{ StepsLayout }}>
      {() => {
        const Output = () => {
          const { data } = Form.useData('pizza-demo', {})

          return (
            <Section
              element="output"
              innerSpace
              backgroundColor="sand-yellow"
              top
              bottom="large"
            >
              JSON Output: <Code>{JSON.stringify(data, null, 4)}</Code>
            </Section>
          )
        }

        return (
          <Provider locale="en-GB">
            <Form.Handler
              onSubmit={(data) => console.log('onSubmit', data)}
              id="pizza-demo"
              sessionStorageId="pizza-form"
            >
              <StepsLayout scrollTopOnStepChange>
                <StepsLayout.Step title="Which pizza do you want?">
                  <Form.MainHeading>
                    Which pizza do you want?
                  </Form.MainHeading>

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

                  <Form.ButtonRow>
                    <StepsLayout.NextButton />
                  </Form.ButtonRow>
                </StepsLayout.Step>

                <StepsLayout.Step title="Delivery address">
                  <Form.MainHeading>Delivery address</Form.MainHeading>

                  <Card stack>
                    <Form.SubHeading>Your name</Form.SubHeading>

                    <Field.String
                      label="First name"
                      path="/firstName"
                      required
                    />
                    <Field.String
                      label="Last name"
                      path="/lastName"
                      required
                    />
                  </Card>

                  <Card stack>
                    <Form.SubHeading>Your address</Form.SubHeading>

                    <FieldBlock width="large" composition>
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
                    </FieldBlock>

                    <Field.PostalCodeAndCity
                      postalCode={{
                        required: true,
                        path: '/postalCode',
                      }}
                      city={{ required: true, path: '/city' }}
                    />
                  </Card>

                  <Form.ButtonRow>
                    <StepsLayout.PreviousButton />
                    <StepsLayout.NextButton />
                  </Form.ButtonRow>
                </StepsLayout.Step>

                <StepsLayout.Step title="Summary">
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
                    <Flex.Horizontal>
                      <Value.String label="First name" path="/firstName" />
                      <Value.String label="Last name" path="/lastName" />
                    </Flex.Horizontal>

                    <Flex.Horizontal>
                      <Value.String label="Street" path="/streetName" />
                      <Value.Number label="Nr." path="/streetNr" />
                    </Flex.Horizontal>

                    <Flex.Horizontal>
                      <Value.String
                        label="Postal Code"
                        path="/postalCode"
                      />
                      <Value.String label="City" path="/city" />
                    </Flex.Horizontal>
                  </Card>

                  <Form.ButtonRow>
                    <StepsLayout.PreviousButton />
                    <Form.SubmitButton />
                  </Form.ButtonRow>
                </StepsLayout.Step>
              </StepsLayout>
            </Form.Handler>

            <Output />
          </Provider>
        )
      }}
    </ComponentBox>
  )
}
