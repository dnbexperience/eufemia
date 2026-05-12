/**
 * Norwegian organization number: 9 digits, mod-11 checksum.
 * Source:
 * www.brreg.no/om-oss/registrene-vare/om-enhetsregisteret/organisasjonsnummeret/
 */
export function norwegianOrgNumberValidator(
  value: string,
  errorMessages: {
    errorOrgNo: string
    errorOrgNoLength: string
  }
): Error | undefined {
  if (value !== undefined) {
    if (value.length !== 9) {
      return Error(errorMessages.errorOrgNoLength)
    }

    if (!isValidOrgNumber(value)) {
      return Error(errorMessages.errorOrgNo)
    }
  }

  return undefined
}

function isValidOrgNumber(digits: string) {
  if (parseFloat(digits) === 0) {
    return false
  }

  let checkDigit = 2
  let sum = 0

  for (let i = digits.length - 2; i >= 0; --i) {
    sum += parseInt(digits.charAt(i), 10) * checkDigit

    checkDigit += 1

    if (checkDigit > 7) {
      checkDigit = 2
    }
  }

  const result = 11 - (sum % 11)
  const finalCheckDigit = result === 11 ? 0 : result

  return parseInt(digits.charAt(digits.length - 1), 10) === finalCheckDigit
}
