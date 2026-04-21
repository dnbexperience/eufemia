/**
 * Norwegian BBAN: 11 digits, mod-11 checksum.
 * Format: XXXX XX XXXXX
 */
export function norwegianBbanValidator(
  value: string,
  errorMessages: {
    errorBankAccountNumber: string
    errorBankAccountNumberLength: string
  },
): Error | undefined {
  if (value !== undefined) {
    if (value.length !== 11) {
      return Error(errorMessages.errorBankAccountNumberLength)
    }

    if (!isValidNorwegianAccountNumber(value)) {
      return Error(errorMessages.errorBankAccountNumber)
    }
  }

  return undefined
}

/**
 * Mod-11 checksum for Norwegian bank account numbers.
 */
function isValidNorwegianAccountNumber(digits: string) {
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
