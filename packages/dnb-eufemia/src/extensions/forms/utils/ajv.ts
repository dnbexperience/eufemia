import Ajv from 'ajv/dist/2020.js'
import ajvErrors from 'ajv-errors'
import {
  ajvErrorsToFormErrors,
  ajvErrorsToOneFormError,
} from './ajvErrors'

export { Ajv }

export type AjvInstance = Ajv & {
  ajvErrorsToFormErrors: typeof ajvErrorsToFormErrors
  ajvErrorsToOneFormError: typeof ajvErrorsToOneFormError
}

/**
 * Creates or enhances an Ajv instance.
 * If no instance is provided, a new one is created with allErrors option enabled.
 * The ajv-errors plugin is added to the instance if it hasn't been added yet.
 */
export function makeAjvInstance(instance?: Ajv): AjvInstance {
  return enhanceAjvInstance(instance || new Ajv({ allErrors: true }))
}

/**
 * Enhances an Ajv instance by adding the ajv-errors plugin if it hasn't been added yet.
 *
 * @param instance - Optional custom instance of Ajv.
 * @returns The created or provided instance of Ajv.
 */
export function enhanceAjvInstance(instance?: Ajv): AjvInstance {
  if (!instance['__ajvErrors__']) {
    ajvErrors(instance)
    instance['__ajvErrors__'] = true
  }

  instance['ajvErrorsToFormErrors'] = ajvErrorsToFormErrors
  instance['ajvErrorsToOneFormError'] = ajvErrorsToOneFormError

  return instance as AjvInstance
}
