import React from 'react'
import { Field, Form } from '../../..'
import { Flex } from '../../../../../components'

export default {
  title: 'Eufemia/Extensions/Forms/Theme',
}

export function ThemeSize() {
  return (
    <Form.Theme size="medium">
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
    </Form.Theme>
  )
}
