import * as React from 'react'
import { Flex } from '@dnb/eufemia/src'
import {
  Form,
  Field,
  Value,
  Wizard,
  Tools,
} from '@dnb/eufemia/src/extensions/forms'
import { Provider } from '@dnb/eufemia/src/shared'
import ComponentBox from '../../../../../shared/tags/ComponentBox'

export const BecomeCorporateCustomer = () => {
  return (
    <ComponentBox hideCode scope={{ Tools }}>
      {() => {
        const Output = () => {
          const { data } = Form.useData('example-form', {
            website: 'www.dnb.no',
          })

          return <Tools.Log data={data} top bottom="large" />
        }

        const MyForm = () => {
          // Routers like "react-router" are supported as well
          Wizard.useQueryLocator('example-wizard')

          return (
            <Form.Handler
              id="example-form"
              onSubmit={(data) => console.log('onSubmit', data)}
            >
              <Wizard.Container id="example-wizard" top>
                <Wizard.Step title="Bedriftsopplysninger">
                  <Form.MainHeading>Bedriftsopplysninger</Form.MainHeading>

                  <Form.Card>
                    <Field.OrganizationNumber
                      path="/companyOrganizationNumber"
                      required
                    />
                    <Field.Name.Company path="/companyName" required />
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
                  </Form.Card>

                  <Form.Card>
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
                  </Form.Card>

                  <Wizard.Buttons />
                </Wizard.Step>

                <Wizard.Step title="Kontaktperson">
                  <Form.MainHeading>Profile</Form.MainHeading>

                  <Form.Card>
                    <Form.SubHeading>More information</Form.SubHeading>

                    <Field.NationalIdentityNumber path="/ssn" />
                    <Field.Email path="/email" />
                    <Field.PhoneNumber path="/phone" />
                  </Form.Card>

                  <Wizard.Buttons />
                </Wizard.Step>

                <Wizard.Step title="Bedriftens virksomhet">
                  <em>Bedriftens virksomhet</em>
                </Wizard.Step>

                <Wizard.Step title="Bruk av DNBs tjenester">
                  <em>Bruk av DNBs tjenester</em>
                </Wizard.Step>

                <Wizard.Step title="Inntekt og egenkapital">
                  <em>Inntekt og egenkapital</em>
                </Wizard.Step>

                <Wizard.Step title="Skatterapportering">
                  <em>Skatterapportering</em>
                </Wizard.Step>

                <Wizard.Step title="Eierskap og kontroll">...</Wizard.Step>

                <Wizard.Step title="Roller i bedriften">...</Wizard.Step>

                <Wizard.Step title="Oppsummering">
                  <Form.MainHeading>Profile</Form.MainHeading>

                  <Form.Card>
                    <Flex.Container>
                      <Value.String path="/firstName" />
                      <Value.String path="/lastName" />
                    </Flex.Container>

                    <Value.NationalIdentityNumber path="/ssn" />
                    <Value.Email path="/email" />
                    <Value.PhoneNumber path="/phone" />
                  </Form.Card>

                  <Form.ButtonRow>
                    <Wizard.Buttons />
                    <Form.SubmitButton />
                  </Form.ButtonRow>
                </Wizard.Step>

                <Wizard.Step title="Kvittering">Kvittering...</Wizard.Step>
              </Wizard.Container>
            </Form.Handler>
          )
        }

        return (
          <>
            <MyForm />
            <Output />
          </>
        )
      }}
    </ComponentBox>
  )
}

export function PizzaDemo() {
  return (
    <ComponentBox hideCode scope={{ Tools }}>
      {() => {
        const MyForm = () => {
          // Routers like "react-router" are supported as well
          Wizard.useQueryLocator('my-wizard')
          const { summaryTitle } = Form.useLocale().Step

          return (
            <Provider locale="en-GB">
              <Form.Handler
                onSubmit={(data) => console.log('onSubmit', data)}
                sessionStorageId="pizza-form"
              >
                <Wizard.Container id="my-wizard">
                  <Wizard.Step title="Which pizza do you want?">
                    <Form.MainHeading>
                      Which pizza do you want?
                    </Form.MainHeading>

                    <Form.Card>
                      <Form.SubHeading>Your Pizza</Form.SubHeading>
                      <Field.Selection
                        variant="button"
                        label="Choose a flavour"
                        path="/flavour"
                        required
                      >
                        <Field.Option
                          value="pepperoni"
                          title="Pepperoni"
                        />
                        <Field.Option
                          value="margarita"
                          title="Margarita"
                        />
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

                      <Field.Composition width="large">
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
                        postalCode={{
                          required: true,
                          path: '/postalCode',
                        }}
                        city={{ required: true, path: '/city' }}
                      />
                    </Form.Card>

                    <Wizard.Buttons />
                  </Wizard.Step>

                  <Wizard.Step title={summaryTitle}>
                    <Form.MainHeading>Summary</Form.MainHeading>

                    <Form.Card>
                      <Value.SummaryList>
                        <Value.String label="My flavour" path="/flavour" />
                        <Value.Boolean
                          label="I have allergies"
                          path="/hasAllergies"
                        />
                        <Value.String
                          label="My allergies"
                          path="/allergies"
                        />
                      </Value.SummaryList>
                    </Form.Card>

                    <Form.Card>
                      <Value.SummaryList layout="grid">
                        <Value.Name.First path="/firstName" />
                        <Value.Name.Last path="/lastName" />

                        <Value.String label="Street" path="/streetName" />
                        <Value.Number label="Nr." path="/streetNr" />

                        <Value.String
                          label="Postal Code"
                          path="/postalCode"
                        />
                        <Value.String label="City" path="/city" />
                      </Value.SummaryList>
                    </Form.Card>

                    <Form.ButtonRow>
                      <Wizard.Buttons />
                      <Form.SubmitButton />
                    </Form.ButtonRow>
                  </Wizard.Step>
                </Wizard.Container>
              </Form.Handler>

              <Tools.Log />
            </Provider>
          )
        }

        return <MyForm />
      }}
    </ComponentBox>
  )
}
