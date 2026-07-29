import { FormError } from '../../utils'

export function postalCodeValidator(value: string): Error | undefined {
  if (value === '0000') {
    return new FormError('PostalCode.errorInvalidCode')
  }

  return undefined
}
