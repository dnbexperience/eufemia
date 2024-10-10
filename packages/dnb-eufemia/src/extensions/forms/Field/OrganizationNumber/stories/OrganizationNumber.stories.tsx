import React from 'react'
import { Field, Validator } from '../../..'
import { Wrapper } from 'storybook-utils/helpers'

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
    <Wrapper>
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
    </Wrapper>
  )
}

export function OrganizationNumberDefault() {
  return (
    <Wrapper>
      <Field.OrganizationNumber />
      <Field.OrganizationNumber value="123123123" />
      <Field.OrganizationNumber value="321321321" />
      <h2>Validate Initially:</h2>
      <Field.OrganizationNumber validateInitially />
      <Field.OrganizationNumber validateInitially value="123123123" />
      <Field.OrganizationNumber validateInitially value="321321321" />
    </Wrapper>
  )
}

export function OrganizationNumberOnBlurValidator() {
  return (
    <Wrapper>
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
    </Wrapper>
  )
}

export function OrganizationNumberValidator() {
  return (
    <Wrapper>
      <Field.OrganizationNumber
        onBlurValidator={false}
        validator={myOrganizationNumberValidator}
      />
      <Field.OrganizationNumber
        onBlurValidator={false}
        validator={myOrganizationNumberValidator}
        value="123123123"
      />
      <Field.OrganizationNumber
        onBlurValidator={false}
        validator={myOrganizationNumberValidator}
        value="321321321"
      />
      <h2>Validate Initially:</h2>
      <Field.OrganizationNumber
        onBlurValidator={false}
        validateInitially
        validator={myOrganizationNumberValidator}
      />
      <Field.OrganizationNumber
        validateInitially
        onBlurValidator={false}
        validator={myOrganizationNumberValidator}
        value="123123123"
      />
      <Field.OrganizationNumber
        validateInitially
        onBlurValidator={false}
        validator={myOrganizationNumberValidator}
        value="321321321"
      />
    </Wrapper>
  )
}

export function OrganizationNumberValidatorSimple() {
  const simpleValidator = (value) => {
    return value?.length < 4 ? Error('At least 4 characters') : undefined
  }

  return (
    <Wrapper>
      <Field.OrganizationNumber
        onBlurValidator={false}
        validator={simpleValidator}
      />
      <Field.OrganizationNumber
        onBlurValidator={false}
        validator={simpleValidator}
        value="123123123"
      />
      <Field.OrganizationNumber
        onBlurValidator={false}
        validator={simpleValidator}
        value="321321321"
      />
      <h2>Validate Initially:</h2>
      <Field.OrganizationNumber
        validateInitially
        onBlurValidator={false}
        validator={simpleValidator}
      />
      <Field.OrganizationNumber
        validateInitially
        onBlurValidator={false}
        validator={simpleValidator}
        value="123123123"
      />
      <Field.OrganizationNumber
        validateInitially
        onBlurValidator={false}
        validator={simpleValidator}
        value="321321321"
      />
    </Wrapper>
  )
}

export function StringValidatorSimple() {
  const simpleValidator = (value) => {
    return value?.length < 4 ? Error('At least 4 characters') : undefined
  }

  return (
    <Wrapper>
      <Field.String validator={simpleValidator} />
      <Field.String validator={simpleValidator} value="123" />
      <Field.String validator={simpleValidator} value="321" />
      <h2>Validate Initially:</h2>
      <Field.String validateInitially validator={simpleValidator} />
      <Field.String
        validateInitially
        validator={simpleValidator}
        value="123"
      />
      <Field.String
        validateInitially
        validator={simpleValidator}
        value="321"
      />
    </Wrapper>
  )
}
