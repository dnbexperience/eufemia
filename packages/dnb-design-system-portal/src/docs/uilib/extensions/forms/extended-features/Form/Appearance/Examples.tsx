import ComponentBox from '../../../../../../../shared/tags/ComponentBox'
import { Form, Field } from '@dnb/eufemia/src/extensions/forms'
import { Flex } from '@dnb/eufemia/src'

export const Size = () => {
  return (
    <ComponentBox data-visual-test="form-appearance-size">
      <Form.Appearance size="medium">
        <Form.Handler>
          <Flex.Stack>
            <Field.String label="String" value="Foo" />
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

            <Form.ButtonRow>
              <Form.SubmitButton />
            </Form.ButtonRow>
          </Flex.Stack>
        </Form.Handler>
      </Form.Appearance>
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
