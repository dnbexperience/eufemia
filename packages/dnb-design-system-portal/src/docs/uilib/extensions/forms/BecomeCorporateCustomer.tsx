import { useState } from 'react'
import {
  DataContext,
  Layout,
  StepsLayout,
  DataInput,
  DataValue,
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
            <DataInput.OrganizationNumber
              path="/companyOrganizationNumber"
              required
            />
            <DataInput.String
              path="/companyName"
              label="Bedriftens navn"
              required
            />
            <DataInput.String
              path="/companyAddress"
              label="Forretningsadresse (NB! Ikke postadresse)"
              required
            />
            <DataInput.PostalCodeAndCity
              postalCode={{
                path: '/companyPostalCode',
              }}
              city={{
                path: '/companyCity',
              }}
            />
            <DataInput.Select
              variant="radio"
              path="/postalAddressSelect"
              label="Postadresse (ønsket sted for tilsendt post)"
            >
              <DataInput.Option
                value="companyAddress"
                title="Samme som forretningsadresse"
              />
              <DataInput.Option value="other" title="Annet" />
            </DataInput.Select>
            <DataInput.Select
              variant="radio"
              path="/hqAddress"
              label="Hovedkontoradresse"
            >
              <DataInput.Option
                value="companyAddress"
                title="Samme som forretningsadresse"
              />
              <DataInput.Option
                value="postalAddress"
                title="Samme som postadresse"
              />
              <DataInput.Option value="other" title="Annet" />
            </DataInput.Select>
            <DataInput.SelectCountry
              path="/countryOfEstablishment"
              label="Etableringsland og sånt som det"
              required
            />
          </Layout.Card>
          <Layout.Card spacing="medium">
            <DataInput.PhoneNumber
              path="/phoneNumber"
              label="Telefon/mobilnummer"
              required
            />
            <DataInput.Email path="/email" required />
            <DataInput.String
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

            <DataInput.NationalIdentityNumber path="/ssn" />
            <DataInput.Email path="/email" />
            <DataInput.PhoneNumber path="/phone" />
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
              <DataValue.FirstName path="/firstName" />
              <DataValue.LastName path="/lastName" />
            </Layout.FlexContainer>

            <DataValue.NationalIdentityNumber path="/ssn" />
            <DataValue.Email path="/email" />
            <DataValue.PhoneNumber path="/phone" />
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
