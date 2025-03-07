import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { Form, Field } from '@dnb/eufemia/src/extensions/forms'
import { Flex } from '@dnb/eufemia/src'

export const Size = () => {
  return (
    <ComponentBox data-visual-test="form-appearance-size">
      {() => {
        const Appearance = () => {
          const { data } = Form.useData('appearance', { size: 'medium' })
          const size: any = data.size
          return (
            <Form.Appearance size={size}>
              <Form.Handler id="appearance">
                <Flex.Stack>
                  <Field.Selection label="Choose size">
                    <Field.Option
                      value="default"
                      title="Small (Default)"
                    />
                    <Field.Option value="medium" title="Medium" />
                    <Field.Option value="large" title="Large" />
                  </Field.Selection>
                  <Field.String label="String" value="Foo" />
                  <Field.String
                    label="String multiline"
                    multiline
                    value="Foo"
                    rows={1}
                  />
                  <Field.Number label="Number" value={1234} />
                  <Field.Number
                    label="Number"
                    currency
                    currencyDisplay="name"
                    value={1234}
                    showStepControls
                  />
                  <Field.Date />
                  <Field.Email value="mail@dnb.no" />
                  <Field.Currency
                    label="Amount"
                    currencyDisplay="name"
                    value={1234}
                  />
                  <Field.Expiry />
                  <Field.NationalIdentityNumber value="12345678012" />
                  <Field.OrganizationNumber value="123123123" />
                  <Field.PhoneNumber />
                  <Field.PostalCodeAndCity
                    postalCode={{}}
                    city={{ value: 'Oslo' }}
                  />
                  <Field.SelectCountry />
                  <Field.BankAccountNumber />
                  <Field.Name.First />
                  <Field.Name.Last />
                  <Field.Password />
                  <Field.Slider />
                  <Field.Upload />
                  <Field.Address.Postal />
                  <Field.Address.Street />
                  <Field.Indeterminate dependencePaths={[]} />

                  <Field.Toggle
                    valueOn="what-ever"
                    valueOff="you-name-it"
                  />

                  <Field.Boolean />
                  <Form.ButtonRow>
                    <Form.SubmitButton />
                  </Form.ButtonRow>
                </Flex.Stack>
              </Form.Handler>
            </Form.Appearance>
          )
        }

        return <Appearance />
      }}
    </ComponentBox>
  )
}

export const NestedSize = () => {
  return (
    <ComponentBox data-visual-test="form-appearance-size-nested">
      <Form.Appearance size="medium">
        <Form.Handler>
          <Flex.Stack>
            <Field.String label="Medium" value="Foo" />

            <Form.Appearance size="large">
              <Field.String label="Large" value="Bar" />
            </Form.Appearance>
          </Flex.Stack>
        </Form.Handler>
      </Form.Appearance>
    </ComponentBox>
  )
}
