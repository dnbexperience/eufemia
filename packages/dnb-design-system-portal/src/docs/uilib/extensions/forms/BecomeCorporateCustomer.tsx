import { useState } from 'react'
import {
  DataContext,
  Layout,
  StepsLayout,
  Field,
  Value,
} from '@dnb/eufemia/src/extensions/forms'

const Wrapper = ({ children }) => {
  const [data, setData] = useState({})
  return (
    <>
      <DataContext.Provider
        data={data}
        onChange={setData}
        onSubmit={(data) => console.log('onSubmit', data)}
      >
        {children}
      </DataContext.Provider>
      <pre>{JSON.stringify(data, null, 4)}</pre>
    </>
  )
}

export const BecomeCorporateCustomer = () => {
  return (
    <Wrapper>
      <StepsLayout>
        <StepsLayout.Step title="Bedriftsopplysninger">
          <Layout.MainHeading>Bedriftsopplysninger</Layout.MainHeading>
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
            <Field.Select
              variant="radio"
              path="/postalAddressSelect"
              label="Postadresse (ønsket sted for tilsendt post)"
            >
              <Field.Option
                value="companyAddress"
                title="Samme som forretningsadresse"
              />
              <Field.Option value="other" title="Annet" />
            </Field.Select>
            <Field.Select
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
            </Field.Select>
            <Field.SelectCountry
              path="/countryOfEstablishment"
              label="Etableringsland og sånt som det"
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

          <Layout.ButtonRow>
            <StepsLayout.NextButton />
          </Layout.ButtonRow>
        </StepsLayout.Step>

        <StepsLayout.Step title="Kontaktperson">
          <Layout.MainHeading>Profile</Layout.MainHeading>

          <Layout.Card stack>
            <Layout.SubHeading>More information</Layout.SubHeading>

            <Field.NationalIdentityNumber path="/ssn" />
            <Field.Email path="/email" />
            <Field.PhoneNumber path="/phone" />
          </Layout.Card>

          <Layout.ButtonRow>
            <StepsLayout.PreviousButton />
            <StepsLayout.NextButton />
          </Layout.ButtonRow>
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

        <StepsLayout.Step title="Roller i bedriften">...</StepsLayout.Step>

        <StepsLayout.Step title="Oppsummering">
          <Layout.MainHeading>Profile</Layout.MainHeading>

          <Layout.Card stack>
            <Layout.FlexContainer direction="row">
              <Value.FirstName path="/firstName" />
              <Value.LastName path="/lastName" />
            </Layout.FlexContainer>

            <Value.NationalIdentityNumber path="/ssn" />
            <Value.Email path="/email" />
            <Value.PhoneNumber path="/phone" />
          </Layout.Card>

          <Layout.ButtonRow>
            <StepsLayout.PreviousButton />
            <DataContext.SubmitButton />
          </Layout.ButtonRow>
        </StepsLayout.Step>

        <StepsLayout.Step title="Kvittering">
          Kvittering...
        </StepsLayout.Step>
      </StepsLayout>
    </Wrapper>
  )
}

export default BecomeCorporateCustomer
