import { dnr, fnr } from '@navikt/fnrvalidator'

function identificationNumberIsOfLength(
  identificationNumber: string,
  length: number
) {
  return identificationNumber?.length === length
}

export function validateFnr(
  value: string,
  {
    errorFnr,
    errorFnrLength,
  }: {
    errorFnr: string
    errorFnrLength: string
  }
): Error | undefined {
  if (value !== undefined) {
    if (Number.parseInt(value.substring(0, 1), 10) > 3) {
      return Error(errorFnr)
    }

    const fnrIs11Digits = identificationNumberIsOfLength(value, 11)

    if (!fnrIs11Digits) {
      return Error(errorFnrLength)
    }
    if (fnrIs11Digits && fnr(value).status === 'invalid') {
      return Error(errorFnr)
    }
  }

  return undefined
}

export function validateDnr(
  value: string,
  {
    errorDnr,
    errorDnrLength,
  }: {
    errorDnr: string
    errorDnrLength: string
  }
): Error | undefined {
  if (value !== undefined) {
    if (Number.parseInt(value.substring(0, 1), 10) < 4) {
      return Error(errorDnr)
    }

    const dnrIs11Digits = identificationNumberIsOfLength(value, 11)

    if (!dnrIs11Digits) {
      return Error(errorDnrLength)
    }
    if (dnrIs11Digits && dnr(value).status === 'invalid') {
      return Error(errorDnr)
    }
  }

  return undefined
}

export function validateDnrAndFnr(
  value: string,
  errorMessages: {
    errorFnr: string
    errorFnrLength: string
    errorDnr: string
    errorDnrLength: string
  }
): Error | undefined {
  const dnrValidationPattern = '^[4-9].*' // 1st num is increased by 4. i.e, if 01.01.1985, D number would be 410185.

  if (new RegExp(dnrValidationPattern).test(value)) {
    return validateDnr(value, errorMessages)
  }
  return validateFnr(value, errorMessages)
}
