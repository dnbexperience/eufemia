import ComponentBox from '../../../../../shared/tags/ComponentBox'
import { GlobalStatus, Section, Code, Layout } from '@dnb/eufemia/src'
import * as React from 'react'
import {
  Form,
  StepsLayout,
  Field,
  Value,
} from '@dnb/eufemia/src/extensions/forms'

export const BecomeCorporateCustomer = () => {
  return (
    <ComponentBox
      scope={{
        Form,
        Code,
        StepsLayout,
        Field,
        Value,
      }}
      hideCode
    >
      {() => {
        const App = () => {
          const [data, setData] = React.useState({})
          return (
            <>
              <GlobalStatus />
              <Form.Handler
                data={data}
                onChange={setData}
                onSubmit={(data) => console.log('onSubmit', data)}
              >
                <StepsLayout top scrollTopOnStepChange>
                  <StepsLayout.Step title="Bedriftsopplysninger">
                    <Layout.MainHeading>
                      Bedriftsopplysninger
                    </Layout.MainHeading>
                    <Layout.Card spacing="medium">
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
                    </Layout.Card>
                    <Layout.Card spacing="medium">
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
                    </Layout.Card>

                    <Form.ButtonRow>
                      <StepsLayout.NextButton />
                    </Form.ButtonRow>
                  </StepsLayout.Step>

                  <StepsLayout.Step title="Kontaktperson">
                    <Layout.MainHeading>Profile</Layout.MainHeading>

                    <Layout.Card stack>
                      <Layout.SubHeading>
                        More information
                      </Layout.SubHeading>

                      <Field.NationalIdentityNumber path="/ssn" />
                      <Field.Email path="/email" />
                      <Field.PhoneNumber path="/phone" />
                    </Layout.Card>

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
                    <Layout.MainHeading>Profile</Layout.MainHeading>

                    <Layout.Card stack>
                      <Layout.FlexContainer>
                        <Value.String path="/firstName" />
                        <Value.String path="/lastName" />
                      </Layout.FlexContainer>

                      <Value.NationalIdentityNumber path="/ssn" />
                      <Value.Email path="/email" />
                      <Value.PhoneNumber path="/phone" />
                    </Layout.Card>

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

              <Section
                element="output"
                spacing
                style_type="sand-yellow"
                top
                bottom="large"
              >
                JSON Output: <Code>{JSON.stringify(data, null, 4)}</Code>
              </Section>
            </>
          )
        }

        return <App />
      }}
    </ComponentBox>
  )
}
