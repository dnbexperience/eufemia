---
metadata: https://eufemia.dnb.no/uilib/extensions/forms/demo-cases/casedemo1/metadata.json
---

# Case Demo 1

Below, you can extend the demo code.

```tsx
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
render(
  <>
    <MyForm />
    <Output />
  </>,
)
```
