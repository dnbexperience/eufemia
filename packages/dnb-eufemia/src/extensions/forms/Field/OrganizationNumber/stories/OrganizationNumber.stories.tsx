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
        onChangeValidator={myOrganizationNumberValidator}
      />
      <Field.OrganizationNumber
        onBlurValidator={false}
        onChangeValidator={myOrganizationNumberValidator}
        value="123123123"
      />
      <Field.OrganizationNumber
        onBlurValidator={false}
        onChangeValidator={myOrganizationNumberValidator}
        value="321321321"
      />
      <h2>Validate Initially:</h2>
      <Field.OrganizationNumber
        onBlurValidator={false}
        validateInitially
        onChangeValidator={myOrganizationNumberValidator}
      />
      <Field.OrganizationNumber
        validateInitially
        onBlurValidator={false}
        onChangeValidator={myOrganizationNumberValidator}
        value="123123123"
      />
      <Field.OrganizationNumber
        validateInitially
        onBlurValidator={false}
        onChangeValidator={myOrganizationNumberValidator}
        value="321321321"
      />
    </Wrapper>
  )
}

export function CustomValidator() {
  const simpleValidator = (value) => {
    return value?.length < 4 ? Error('At least 4 characters') : undefined
  }

  return (
    <Wrapper>
      <Field.OrganizationNumber
        onBlurValidator={false}
        onChangeValidator={simpleValidator}
      />
      <Field.OrganizationNumber
        onBlurValidator={false}
        onChangeValidator={simpleValidator}
        value="123"
      />
      <Field.OrganizationNumber
        onBlurValidator={false}
        onChangeValidator={simpleValidator}
        value="321321321"
      />
      <h2>Validate Initially:</h2>
      <Field.OrganizationNumber
        validateInitially
        onBlurValidator={false}
        onChangeValidator={simpleValidator}
      />
      <Field.OrganizationNumber
        validateInitially
        onBlurValidator={false}
        onChangeValidator={simpleValidator}
        value="123"
      />
      <Field.OrganizationNumber
        validateInitially
        onBlurValidator={false}
        onChangeValidator={simpleValidator}
        value="321321321"
      />
    </Wrapper>
  )
}

export function CustomOnBlurValidator() {
  const simpleValidator = (value) => {
    return value?.length < 4 ? Error('At least 4 characters') : undefined
  }

  return (
    <Wrapper>
      <Field.OrganizationNumber onBlurValidator={simpleValidator} />
      <Field.OrganizationNumber
        onBlurValidator={simpleValidator}
        value="123"
      />
      <Field.OrganizationNumber
        onBlurValidator={simpleValidator}
        value="321321321"
      />
      <h2>Validate Initially:</h2>
      <Field.OrganizationNumber
        validateInitially
        onBlurValidator={simpleValidator}
      />
      <Field.OrganizationNumber
        validateInitially
        onBlurValidator={simpleValidator}
        value="123"
      />
      <Field.OrganizationNumber
        validateInitially
        onBlurValidator={simpleValidator}
        value="321321321"
      />
    </Wrapper>
  )
}

export function CustomValidatorReturnArray() {
  const validatorX = (value) => {
    return value?.length < 4 ? Error('At least 4 characters') : undefined
  }

  const simpleValidator = () => {
    return [validatorX]
  }

  return (
    <Wrapper>
      <Field.OrganizationNumber
        onBlurValidator={false}
        onChangeValidator={simpleValidator}
      />
      <Field.OrganizationNumber
        onBlurValidator={false}
        onChangeValidator={simpleValidator}
        value="123"
      />
      <Field.OrganizationNumber
        onBlurValidator={false}
        onChangeValidator={simpleValidator}
        value="321321321"
      />
      <h2>Validate Initially:</h2>
      <Field.OrganizationNumber
        validateInitially
        onBlurValidator={false}
        onChangeValidator={simpleValidator}
      />
      <Field.OrganizationNumber
        validateInitially
        onBlurValidator={false}
        onChangeValidator={simpleValidator}
        value="123"
      />
      <Field.OrganizationNumber
        validateInitially
        onBlurValidator={false}
        onChangeValidator={simpleValidator}
        value="321321321"
      />
    </Wrapper>
  )
}

export function CustomOnBlurValidatorReturnArray() {
  const validatorX = (value) => {
    return value?.length < 4 ? Error('At least 4 characters') : undefined
  }

  const simpleValidator = () => {
    return [validatorX]
  }

  return (
    <Wrapper>
      <Field.OrganizationNumber onBlurValidator={simpleValidator} />
      <Field.OrganizationNumber
        onBlurValidator={simpleValidator}
        value="123"
      />
      <Field.OrganizationNumber
        onBlurValidator={simpleValidator}
        value="321321321"
      />
      <h2>Validate Initially:</h2>
      <Field.OrganizationNumber
        validateInitially
        onBlurValidator={simpleValidator}
      />
      <Field.OrganizationNumber
        validateInitially
        onBlurValidator={simpleValidator}
        value="123"
      />
      <Field.OrganizationNumber
        validateInitially
        onBlurValidator={simpleValidator}
        value="321321321"
      />
    </Wrapper>
  )
}

export function StringValidatorSimple() {
  const validatorX = (value) => {
    return value?.length < 4 ? Error('At least 4 characters') : undefined
  }

  const simpleValidator = () => {
    return [validatorX]
  }

  return (
    <Wrapper>
      <Field.String onChangeValidator={simpleValidator} />
      <Field.String onChangeValidator={simpleValidator} value="123" />
      <Field.String onChangeValidator={simpleValidator} value="321" />
      <h2>Validate Initially:</h2>
      <Field.String
        validateInitially
        onChangeValidator={simpleValidator}
      />
      <Field.String
        validateInitially
        onChangeValidator={simpleValidator}
        value="123"
      />
      <Field.String
        validateInitially
        onChangeValidator={simpleValidator}
        value="321"
      />
    </Wrapper>
  )
}
