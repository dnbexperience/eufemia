import Ajv from 'ajv/dist/2020.js'
import ajvErrors from 'ajv-errors'

export { Ajv }

/**
 * Creates or enhances an Ajv instance.
 * If no instance is provided, a new one is created with allErrors option enabled.
 * The ajv-errors plugin is added to the instance if it hasn't been added yet.
 */
export function makeAjvInstance(instance?: Ajv): Ajv {
  return enhanceAjvInstance(instance || new Ajv({ allErrors: true }))
}

/**
 * Enhances an Ajv instance by adding the ajv-errors plugin if it hasn't been added yet.
 *
 * @param instance - Optional custom instance of Ajv.
 * @returns The created or provided instance of Ajv.
 */
export function enhanceAjvInstance(instance?: Ajv): Ajv {
  if (!instance['__ajvErrors__']) {
    ajvErrors(instance)
    instance['__ajvErrors__'] = true
  }

  return instance
}
