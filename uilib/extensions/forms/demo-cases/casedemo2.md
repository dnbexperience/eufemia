---
version: 10.95.0
generatedAt: 2026-01-26T10:49:27.282Z
checksum: 090b7d977ba4be5e2c4c04d199a30a4048416c59f443a56985df2f80629d9c40
---

# Case Demo 2

Below, you can extend the demo code.

```tsx
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
                city={{
                  required: true,
                  path: '/city',
                }}
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
                <Value.String label="My allergies" path="/allergies" />
              </Value.SummaryList>
            </Form.Card>

            <Form.Card>
              <Value.SummaryList layout="grid">
                <Value.Name.First path="/firstName" />
                <Value.Name.Last path="/lastName" />

                <Value.String label="Street" path="/streetName" />
                <Value.Number label="Nr." path="/streetNr" />

                <Value.String label="Postal Code" path="/postalCode" />
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
render(<MyForm />)
```
