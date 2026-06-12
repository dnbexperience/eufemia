import { isAsync } from '../../../shared/helpers/isAsync'

export type ValidatorRunOnSubmit = 'always' | 'never' | 'when-changed'

export type ValidatorOptions = {
  runOnSubmit?: ValidatorRunOnSubmit
}

type ValidatorFunction = (...args: Array<any>) => unknown

const validatorOptions = new WeakMap<object, ValidatorOptions>()

export function withValidatorOptions<
  ValidatorFn extends ValidatorFunction,
>(validator: ValidatorFn, options: ValidatorOptions): ValidatorFn {
  const mergedOptions = {
    ...validatorOptions.get(validator),
    ...options,
  }

  const validatorWithOptions = (
    isAsync(validator)
      ? async (...args: Parameters<ValidatorFn>) => {
          return validator(...args)
        }
      : (...args: Parameters<ValidatorFn>) => {
          return validator(...args)
        }
  ) as ValidatorFn

  validatorOptions.set(validatorWithOptions, mergedOptions)

  return validatorWithOptions
}

export function getValidatorOptions(
  validator: unknown
): ValidatorOptions | undefined {
  if (typeof validator !== 'function') {
    return undefined
  }

  return validatorOptions.get(validator)
}
