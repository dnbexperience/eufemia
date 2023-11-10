import { FormError } from '../types'

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
  if (error1 && error2 && error1.message !== error2.message) {
    return true
  }
  return false
}
