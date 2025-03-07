import { FormError } from './FormError'

export function errorChanged(
  error1?: FormError,
  error2?: FormError
): boolean {
  if (
    (error1 === undefined && error2 instanceof Error) ||
    (error1 instanceof Error && error2 === undefined)
  ) {
    return true
  }
  if (error1 && error2) {
    if (error1.message !== error2.message) {
      return true
    }

    const errors1 = error1.errors
    const errors2 = error2.errors
    if (Array.isArray(errors1)) {
      if (errors1.length !== errors2?.length) {
        return true
      }

      if (
        errors1.length &&
        errors1.some(({ message }, i) => {
          return errors2?.[i].message !== message
        })
      ) {
        return true
      }
    }
  }
  return false
}
