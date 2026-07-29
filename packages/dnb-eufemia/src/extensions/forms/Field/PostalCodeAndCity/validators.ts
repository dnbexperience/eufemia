import { FormError } from '../../utils'

/**
 * Rejects the placeholder postal code "0000", which is not a valid
 * postal code in four-digit-pattern countries (e.g. NO, DK, CH).
 *
 * Exposed so consumers can build upon it, e.g. by combining it with
 * their own `onChangeValidator`:
 *
 * ```tsx
 * <Field.PostalCodeAndCity
 *   postalCode={{
 *     onChangeValidator: (value) =>
 *       postalCodeValidator(value) ?? myOwnValidator(value),
 *   }}
 * />
 * ```
 */
export function postalCodeValidator(value: string): Error | undefined {
  if (value === '0000') {
    return new FormError('PostalCode.errorInvalidCode')
  }

  return undefined
}
