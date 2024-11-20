import React from 'react'
import { Field, Validator } from '../../..'
import { Wrapper } from 'storybook-utils/helpers'
import { createMinimumAgeValidator } from '../NationalIdentityNumber'

export default {
  title: 'Eufemia/Extensions/Forms/NationalIdentityNumber',
}

const simpleValidator = (value) => {
  return value?.length < 4 ? Error('At least 4 characters') : undefined
}

const adultValidator = createMinimumAgeValidator(18)

const myAdultValidator: Validator<string> = () => {
  return [adultValidator]
}

const myAdultFnrDnrValidator: Validator<string> = (
  value,
  { validators }
) => {
  const { dnrAndFnrValidator } = validators

  return [dnrAndFnrValidator, adultValidator]
}

const myFnrValidator: Validator<string> = (value, { validators }) => {
  const { fnrValidator } = validators

  return [fnrValidator]
}

const myDnrValidator: Validator<string> = (value, { validators }) => {
  const { dnrValidator } = validators

  return [dnrValidator]
}

const myFnrAndDnrValidator: Validator<string> = (
  value,
  { validators }
) => {
  const { dnrAndFnrValidator } = validators

  return [dnrAndFnrValidator]
}

export function ValidatorsUndefinedFalse() {
  return (
    <Wrapper>
      <Field.NationalIdentityNumber
        onChangeValidator={undefined}
        onBlurValidator={false}
      />
      <Field.NationalIdentityNumber
        onChangeValidator={undefined}
        onBlurValidator={false}
        value="123"
      />
      <Field.NationalIdentityNumber
        onChangeValidator={undefined}
        onBlurValidator={false}
        value="12345678901"
      />
      <h2>Validate Initially:</h2>
      <Field.NationalIdentityNumber
        validateInitially
        onChangeValidator={undefined}
        onBlurValidator={false}
      />
      <Field.NationalIdentityNumber
        validateInitially
        onChangeValidator={undefined}
        onBlurValidator={false}
        value="123"
      />
      <Field.NationalIdentityNumber
        validateInitially
        onChangeValidator={undefined}
        onBlurValidator={false}
        value="12345678901"
      />
    </Wrapper>
  )
}

export function NationalIdentityNumberDefault() {
  return (
    <Wrapper>
      <Field.NationalIdentityNumber />
      <Field.NationalIdentityNumber value="12345678901" />
      <Field.NationalIdentityNumber value="42345678901" />
      <h2>Validate Initially:</h2>
      <Field.NationalIdentityNumber validateInitially />
      <Field.NationalIdentityNumber
        validateInitially
        value="12345678901"
      />
      <Field.NationalIdentityNumber
        validateInitially
        value="42345678901"
      />
    </Wrapper>
  )
}

export function NationalIdentityNumberAndDNumberOnBlurValidator() {
  return (
    <Wrapper>
      <Field.NationalIdentityNumber
        onBlurValidator={myFnrAndDnrValidator}
      />
      <Field.NationalIdentityNumber
        onBlurValidator={myFnrAndDnrValidator}
        value="12345678901"
      />
      <Field.NationalIdentityNumber
        onBlurValidator={myFnrAndDnrValidator}
        value="42345678901"
      />
      <h2>Validate Initially:</h2>
      <Field.NationalIdentityNumber
        validateInitially
        onBlurValidator={myFnrAndDnrValidator}
      />
      <Field.NationalIdentityNumber
        validateInitially
        onBlurValidator={myFnrAndDnrValidator}
        value="12345678901"
      />
      <Field.NationalIdentityNumber
        validateInitially
        onBlurValidator={myFnrAndDnrValidator}
        value="42345678901"
      />
    </Wrapper>
  )
}

export function NationalIdentityNumberOnBlurValidator() {
  return (
    <Wrapper>
      <Field.NationalIdentityNumber onBlurValidator={myFnrValidator} />
      <Field.NationalIdentityNumber
        onBlurValidator={myFnrValidator}
        value="12345678901"
      />
      <Field.NationalIdentityNumber
        onBlurValidator={myFnrValidator}
        value="42345678901"
      />
      <h2>Validate Initially:</h2>
      <Field.NationalIdentityNumber
        validateInitially
        onBlurValidator={myFnrValidator}
      />
      <Field.NationalIdentityNumber
        validateInitially
        onBlurValidator={myFnrValidator}
        value="12345678901"
      />
      <Field.NationalIdentityNumber
        validateInitially
        onBlurValidator={myFnrValidator}
        value="42345678901"
      />
    </Wrapper>
  )
}

export function NationalIdentityNumberValidator() {
  return (
    <Wrapper>
      <Field.NationalIdentityNumber
        onBlurValidator={false}
        onChangeValidator={myFnrValidator}
      />
      <Field.NationalIdentityNumber
        onBlurValidator={false}
        onChangeValidator={myFnrValidator}
        value="12345678901"
      />
      <Field.NationalIdentityNumber
        onBlurValidator={false}
        onChangeValidator={myFnrValidator}
        value="42345678901"
      />
      <h2>Validate Initially:</h2>
      <Field.NationalIdentityNumber
        validateInitially
        onBlurValidator={false}
        onChangeValidator={myFnrValidator}
      />
      <Field.NationalIdentityNumber
        validateInitially
        onBlurValidator={false}
        onChangeValidator={myFnrValidator}
        value="12345678901"
      />
      <Field.NationalIdentityNumber
        validateInitially
        onBlurValidator={false}
        onChangeValidator={myFnrValidator}
        value="42345678901"
      />
    </Wrapper>
  )
}

export function DNumberOnBlurValidator() {
  return (
    <Wrapper>
      <Field.NationalIdentityNumber onBlurValidator={myDnrValidator} />
      <Field.NationalIdentityNumber
        onBlurValidator={myDnrValidator}
        value="12345678901"
      />
      <Field.NationalIdentityNumber
        onBlurValidator={myDnrValidator}
        value="42345678901"
      />
      <h2>Validate Initially:</h2>
      <Field.NationalIdentityNumber
        validateInitially
        onBlurValidator={myDnrValidator}
      />
      <Field.NationalIdentityNumber
        validateInitially
        onBlurValidator={myDnrValidator}
        value="12345678901"
      />
      <Field.NationalIdentityNumber
        validateInitially
        onBlurValidator={myDnrValidator}
        value="42345678901"
      />
    </Wrapper>
  )
}

export function DNumberValidator() {
  return (
    <Wrapper>
      <Field.NationalIdentityNumber
        onBlurValidator={false}
        onChangeValidator={myDnrValidator}
      />
      <Field.NationalIdentityNumber
        onBlurValidator={false}
        onChangeValidator={myDnrValidator}
        value="12345678901"
      />
      <Field.NationalIdentityNumber
        onBlurValidator={false}
        onChangeValidator={myDnrValidator}
        value="42345678901"
      />
      <h2>Validate Initially:</h2>
      <Field.NationalIdentityNumber
        validateInitially
        onBlurValidator={false}
        onChangeValidator={myDnrValidator}
      />
      <Field.NationalIdentityNumber
        validateInitially
        onBlurValidator={false}
        onChangeValidator={myDnrValidator}
        value="12345678901"
      />
      <Field.NationalIdentityNumber
        validateInitially
        onBlurValidator={false}
        onChangeValidator={myDnrValidator}
        value="42345678901"
      />
    </Wrapper>
  )
}

export function AdultOnBlurValidator() {
  return (
    <Wrapper>
      <Field.NationalIdentityNumber onBlurValidator={myAdultValidator} />
      <Field.NationalIdentityNumber
        onBlurValidator={myAdultValidator}
        value="123"
      />
      <Field.NationalIdentityNumber
        onBlurValidator={myAdultValidator}
        value="12345678901"
      />
      <Field.NationalIdentityNumber
        onBlurValidator={myAdultValidator}
        value="42345678901"
      />
      <Field.NationalIdentityNumber
        onBlurValidator={myAdultValidator}
        value="29082499936"
      />
      <Field.NationalIdentityNumber
        onBlurValidator={myAdultValidator}
        value="44011957371"
      />
      <h2>Validate Initially:</h2>
      <Field.NationalIdentityNumber
        validateInitially
        onBlurValidator={myAdultValidator}
      />
      <Field.NationalIdentityNumber
        validateInitially
        onBlurValidator={myAdultValidator}
        value="123"
      />
      <Field.NationalIdentityNumber
        validateInitially
        onBlurValidator={myAdultValidator}
        value="12345678901"
      />
      <Field.NationalIdentityNumber
        validateInitially
        onBlurValidator={myAdultValidator}
        value="42345678901"
      />
      <Field.NationalIdentityNumber
        validateInitially
        onBlurValidator={myAdultValidator}
        value="29082499936"
      />
      <Field.NationalIdentityNumber
        validateInitially
        onBlurValidator={myAdultValidator}
        value="44011957371"
      />
    </Wrapper>
  )
}

export function AdultValidator() {
  return (
    <Wrapper>
      <Field.NationalIdentityNumber
        onBlurValidator={false}
        onChangeValidator={myAdultValidator}
      />
      <Field.NationalIdentityNumber
        onBlurValidator={false}
        onChangeValidator={myAdultValidator}
        value="123"
      />
      <Field.NationalIdentityNumber
        onBlurValidator={false}
        onChangeValidator={myAdultValidator}
        value="12345678901"
      />
      <Field.NationalIdentityNumber
        onBlurValidator={false}
        onChangeValidator={myAdultValidator}
        value="42345678901"
      />
      <Field.NationalIdentityNumber
        onBlurValidator={false}
        onChangeValidator={myAdultValidator}
        value="29082499936"
      />
      <Field.NationalIdentityNumber
        onBlurValidator={false}
        onChangeValidator={myAdultValidator}
        value="44011957371"
      />
      <h2>Validate Initially:</h2>
      <Field.NationalIdentityNumber
        validateInitially
        onBlurValidator={false}
        onChangeValidator={myAdultValidator}
      />
      <Field.NationalIdentityNumber
        validateInitially
        onBlurValidator={false}
        onChangeValidator={myAdultValidator}
        value="123"
      />
      <Field.NationalIdentityNumber
        validateInitially
        onBlurValidator={false}
        onChangeValidator={myAdultValidator}
        value="12345678901"
      />
      <Field.NationalIdentityNumber
        validateInitially
        onBlurValidator={false}
        onChangeValidator={myAdultValidator}
        value="42345678901"
      />
      <Field.NationalIdentityNumber
        validateInitially
        onBlurValidator={false}
        onChangeValidator={myAdultValidator}
        value="29082499936"
      />
      <Field.NationalIdentityNumber
        validateInitially
        onBlurValidator={false}
        onChangeValidator={myAdultValidator}
        value="44011957371"
      />
    </Wrapper>
  )
}

export function AdultOnBlurValidatorAndDefaultValidator() {
  return (
    <Wrapper>
      <Field.NationalIdentityNumber
        onBlurValidator={myAdultFnrDnrValidator}
      />
      <Field.NationalIdentityNumber
        onBlurValidator={myAdultFnrDnrValidator}
        value="12345678901"
      />
      <Field.NationalIdentityNumber
        onBlurValidator={myAdultFnrDnrValidator}
        value="42345678901"
      />
      <Field.NationalIdentityNumber
        onBlurValidator={myAdultFnrDnrValidator}
        value="29082499936"
      />
      <Field.NationalIdentityNumber
        onBlurValidator={myAdultFnrDnrValidator}
        value="44011957371"
      />
      <h2>Validate Initially:</h2>
      <Field.NationalIdentityNumber
        validateInitially
        onBlurValidator={myAdultFnrDnrValidator}
      />
      <Field.NationalIdentityNumber
        validateInitially
        onBlurValidator={myAdultFnrDnrValidator}
        value="12345678901"
      />
      <Field.NationalIdentityNumber
        validateInitially
        onBlurValidator={myAdultFnrDnrValidator}
        value="42345678901"
      />
      <Field.NationalIdentityNumber
        validateInitially
        onBlurValidator={myAdultFnrDnrValidator}
        value="29082499936"
      />
      <Field.NationalIdentityNumber
        validateInitially
        onBlurValidator={myAdultFnrDnrValidator}
        value="44011957371"
      />
    </Wrapper>
  )
}

export function AdultValidatorAndDefaultValidator() {
  return (
    <Wrapper>
      <Field.NationalIdentityNumber
        onChangeValidator={myAdultFnrDnrValidator}
        onBlurValidator={false}
      />
      <Field.NationalIdentityNumber
        onChangeValidator={myAdultFnrDnrValidator}
        onBlurValidator={false}
        value="12345678901"
      />
      <Field.NationalIdentityNumber
        onChangeValidator={myAdultFnrDnrValidator}
        onBlurValidator={false}
        value="42345678901"
      />
      <Field.NationalIdentityNumber
        onChangeValidator={myAdultFnrDnrValidator}
        onBlurValidator={false}
        value="29082499936"
      />
      <Field.NationalIdentityNumber
        onChangeValidator={myAdultFnrDnrValidator}
        onBlurValidator={false}
        value="44011957371"
      />
      <h2>Validate Initially:</h2>
      <Field.NationalIdentityNumber
        validateInitially
        onChangeValidator={myAdultFnrDnrValidator}
        onBlurValidator={false}
      />
      <Field.NationalIdentityNumber
        validateInitially
        onChangeValidator={myAdultFnrDnrValidator}
        onBlurValidator={false}
        value="12345678901"
      />
      <Field.NationalIdentityNumber
        validateInitially
        onChangeValidator={myAdultFnrDnrValidator}
        onBlurValidator={false}
        value="42345678901"
      />
      <Field.NationalIdentityNumber
        validateInitially
        onChangeValidator={myAdultFnrDnrValidator}
        onBlurValidator={false}
        value="29082499936"
      />
      <Field.NationalIdentityNumber
        validateInitially
        onChangeValidator={myAdultFnrDnrValidator}
        onBlurValidator={false}
        value="44011957371"
      />
    </Wrapper>
  )
}

export function CustomValidatorFunction() {
  return (
    <Wrapper>
      <Field.NationalIdentityNumber
        onChangeValidator={simpleValidator}
        onBlurValidator={false}
      />
      <Field.NationalIdentityNumber
        onChangeValidator={simpleValidator}
        onBlurValidator={false}
        value="12345678901"
      />
      <Field.NationalIdentityNumber
        onChangeValidator={simpleValidator}
        onBlurValidator={false}
        value="42345678901"
      />
      <Field.NationalIdentityNumber
        onChangeValidator={simpleValidator}
        onBlurValidator={false}
        value="29082499936"
      />
      <Field.NationalIdentityNumber
        onChangeValidator={simpleValidator}
        onBlurValidator={false}
        value="44011957371"
      />
      <h2>Validate Initially:</h2>
      <Field.NationalIdentityNumber
        validateInitially
        onChangeValidator={simpleValidator}
        onBlurValidator={false}
      />
      <Field.NationalIdentityNumber
        validateInitially
        onChangeValidator={simpleValidator}
        onBlurValidator={false}
        value="12345678901"
      />
      <Field.NationalIdentityNumber
        validateInitially
        onChangeValidator={simpleValidator}
        onBlurValidator={false}
        value="42345678901"
      />
      <Field.NationalIdentityNumber
        validateInitially
        onChangeValidator={simpleValidator}
        onBlurValidator={false}
        value="29082499936"
      />
      <Field.NationalIdentityNumber
        validateInitially
        onChangeValidator={simpleValidator}
        onBlurValidator={false}
        value="44011957371"
      />
    </Wrapper>
  )
}

export function CustomOnBlurValidatorFunction() {
  return (
    <Wrapper>
      <Field.NationalIdentityNumber onBlurValidator={simpleValidator} />
      <Field.NationalIdentityNumber
        onBlurValidator={simpleValidator}
        value="12345678901"
      />
      <Field.NationalIdentityNumber
        onBlurValidator={simpleValidator}
        value="42345678901"
      />
      <Field.NationalIdentityNumber
        onBlurValidator={simpleValidator}
        value="321"
      />
      <Field.NationalIdentityNumber
        onBlurValidator={simpleValidator}
        value="123"
      />
      <h2>Validate Initially:</h2>
      <Field.NationalIdentityNumber
        validateInitially
        onBlurValidator={simpleValidator}
      />
      <Field.NationalIdentityNumber
        validateInitially
        onBlurValidator={simpleValidator}
        value="12345678901"
      />
      <Field.NationalIdentityNumber
        validateInitially
        onBlurValidator={simpleValidator}
        value="42345678901"
      />
      <Field.NationalIdentityNumber
        validateInitially
        onBlurValidator={simpleValidator}
        value="321"
      />
      <Field.NationalIdentityNumber
        validateInitially
        onBlurValidator={simpleValidator}
        value="123"
      />
    </Wrapper>
  )
}

export function CustomValidatorFunctionReturnArray() {
  const validatorX = (value) => {
    return value?.length < 4 ? Error('At least 4 characters') : undefined
  }

  const simpleValidator = () => {
    return [validatorX]
  }

  return (
    <Wrapper>
      <Field.NationalIdentityNumber
        onChangeValidator={simpleValidator}
        onBlurValidator={false}
      />
      <Field.NationalIdentityNumber
        onChangeValidator={simpleValidator}
        onBlurValidator={false}
        value="12345678901"
      />
      <Field.NationalIdentityNumber
        onChangeValidator={simpleValidator}
        onBlurValidator={false}
        value="42345678901"
      />
      <Field.NationalIdentityNumber
        onChangeValidator={simpleValidator}
        onBlurValidator={false}
        value="321"
      />
      <Field.NationalIdentityNumber
        onChangeValidator={simpleValidator}
        onBlurValidator={false}
        value="123"
      />
      <h2>Validate Initially:</h2>
      <Field.NationalIdentityNumber
        validateInitially
        onChangeValidator={simpleValidator}
        onBlurValidator={false}
      />
      <Field.NationalIdentityNumber
        validateInitially
        onChangeValidator={simpleValidator}
        onBlurValidator={false}
        value="12345678901"
      />
      <Field.NationalIdentityNumber
        validateInitially
        onChangeValidator={simpleValidator}
        onBlurValidator={false}
        value="42345678901"
      />
      <Field.NationalIdentityNumber
        validateInitially
        onChangeValidator={simpleValidator}
        onBlurValidator={false}
        value="321"
      />
      <Field.NationalIdentityNumber
        validateInitially
        onChangeValidator={simpleValidator}
        onBlurValidator={false}
        value="123"
      />
    </Wrapper>
  )
}

export function CustomOnBlurValidatorFunctionReturnArray() {
  const validatorX = (value) => {
    return value?.length < 4 ? Error('At least 4 characters') : undefined
  }

  const simpleValidator = () => {
    return [validatorX]
  }

  return (
    <Wrapper>
      <Field.NationalIdentityNumber onBlurValidator={simpleValidator} />
      <Field.NationalIdentityNumber
        onBlurValidator={simpleValidator}
        value="12345678901"
      />
      <Field.NationalIdentityNumber
        onBlurValidator={simpleValidator}
        value="42345678901"
      />
      <Field.NationalIdentityNumber
        onBlurValidator={simpleValidator}
        value="321"
      />
      <Field.NationalIdentityNumber
        onBlurValidator={simpleValidator}
        value="123"
      />
      <h2>Validate Initially:</h2>
      <Field.NationalIdentityNumber
        validateInitially
        onBlurValidator={simpleValidator}
      />
      <Field.NationalIdentityNumber
        validateInitially
        onBlurValidator={simpleValidator}
        value="12345678901"
      />
      <Field.NationalIdentityNumber
        validateInitially
        onBlurValidator={simpleValidator}
        value="42345678901"
      />
      <Field.NationalIdentityNumber
        validateInitially
        onBlurValidator={simpleValidator}
        value="321"
      />
      <Field.NationalIdentityNumber
        validateInitially
        onBlurValidator={simpleValidator}
        value="123"
      />
    </Wrapper>
  )
}
