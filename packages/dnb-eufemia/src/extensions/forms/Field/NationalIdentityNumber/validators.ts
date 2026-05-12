import { dnr, fnr } from '@navikt/fnrvalidator'

type FnrErrorMessages = {
  errorFnr: string
  errorFnrLength: string
}

type DnrErrorMessages = {
  errorDnr: string
  errorDnrLength: string
}

export type DnrAndFnrErrorMessages = FnrErrorMessages & DnrErrorMessages

function identificationNumberIsOfLength(
  identificationNumber: string,
  length: number
) {
  return identificationNumber?.length === length
}

export function norwegianFnrValidator(
  value: string,
  { errorFnr, errorFnrLength }: FnrErrorMessages
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

export function norwegianDnrValidator(
  value: string,
  { errorDnr, errorDnrLength }: DnrErrorMessages
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

export function norwegianDnrAndFnrValidator(
  value: string,
  errorMessages: DnrAndFnrErrorMessages
): Error | undefined {
  const dnrValidationPattern = '^[4-9].*'

  if (new RegExp(dnrValidationPattern).test(value)) {
    return norwegianDnrValidator(value, errorMessages)
  }

  return norwegianFnrValidator(value, errorMessages)
}
