import React from 'react'
import { Field, Validator } from '../../..'

export default {
  title: 'Eufemia/Extensions/Forms/OrganizationNumber',
}

const myOrganizationNumberValidator: Validator<string> = (
  value,
  { validators }
) => {
  const { organizationNumberValidator } = validators

  return [organizationNumberValidator]
}

export function OnBlurValidatorFalse() {
  return (
    <>
      <Field.OrganizationNumber onBlurValidator={false} />
      <Field.OrganizationNumber
        onBlurValidator={false}
        value="123123123"
      />
      <Field.OrganizationNumber
        onBlurValidator={false}
        value="321321321"
      />
      <h2>Validate Initially:</h2>
      <Field.OrganizationNumber
        validateInitially
        onBlurValidator={false}
      />
      <Field.OrganizationNumber
        validateInitially
        onBlurValidator={false}
        value="123123123"
      />
      <Field.OrganizationNumber
        validateInitially
        onBlurValidator={false}
        value="321321321"
      />
    </>
  )
}

export function OrganizationNumberDefault() {
  return (
    <>
      <Field.OrganizationNumber />
      <Field.OrganizationNumber value="123123123" />
      <Field.OrganizationNumber value="321321321" />
      <h2>Validate Initially:</h2>
      <Field.OrganizationNumber validateInitially />
      <Field.OrganizationNumber validateInitially value="123123123" />
      <Field.OrganizationNumber validateInitially value="321321321" />
    </>
  )
}

export function OrganizationNumberValidator() {
  return (
    <>
      <Field.OrganizationNumber
        onBlurValidator={myOrganizationNumberValidator}
      />
      <Field.OrganizationNumber
        onBlurValidator={myOrganizationNumberValidator}
        value="123123123"
      />
      <Field.OrganizationNumber
        onBlurValidator={myOrganizationNumberValidator}
        value="321321321"
      />
      <h2>Validate Initially:</h2>
      <Field.OrganizationNumber
        validateInitially
        onBlurValidator={myOrganizationNumberValidator}
      />
      <Field.OrganizationNumber
        validateInitially
        onBlurValidator={myOrganizationNumberValidator}
        value="123123123"
      />
      <Field.OrganizationNumber
        validateInitially
        onBlurValidator={myOrganizationNumberValidator}
        value="321321321"
      />
    </>
  )
}
