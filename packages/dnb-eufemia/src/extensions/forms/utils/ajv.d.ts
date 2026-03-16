import Ajv from 'ajv/dist/2020.js';
export { Ajv };
/**
 * Creates or enhances an Ajv instance.
 * If no instance is provided, a new one is created with allErrors option enabled.
 * The ajv-errors plugin is added to the instance if it hasn't been added yet.
 */
export declare function makeAjvInstance(instance?: Ajv): Ajv;
/**
 * Enhances an Ajv instance by adding the ajv-errors plugin if it hasn't been added yet.
 *
 * @param instance - Optional custom instance of Ajv.
 * @returns The created or provided instance of Ajv.
 */
export declare function enhanceAjvInstance(instance?: Ajv): Ajv;
