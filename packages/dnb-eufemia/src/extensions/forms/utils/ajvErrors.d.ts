/**
 * Utility functions to convert AJV errors to FormError objects.
 *
 * NB: Do not include these functions in the main ajv file.
 * Else ajv will be included in the main bundle even if it is not used.
 */
import type { ErrorObject } from 'ajv/dist/2020.js';
import type { JsonObject } from './json-pointer';
import type { Path } from '../types';
import { FormError } from './FormError';
/**
 * Returns the instance path of the given Ajv error.
 * If the error is of type 'required', it is considered an object error and the missing property is shown under the relevant field.
 * If the error is of type 'errorMessage', it is a wrapped error and the instance path is found from the original error to avoid issues like required-errors pointing at the parent object.
 * @param ajvError - The Ajv error object.
 * @returns The instance path of the error.
 */
export declare function getInstancePath(ajvError: ErrorObject): Path;
/**
 * Retrieves the validation rule from an AJV error object.
 * If the error object has an 'errorMessage' keyword, it unwraps the original error
 * to avoid issues like required-errors pointing at the parent object.
 * @param ajvError - The AJV error object.
 * @returns The validation rule.
 */
export declare function getValidationRule(ajvError: ErrorObject): string;
/**
 * Retrieves the message values from an AJV error object.
 * @param ajvError The AJV error object.
 * @returns The message values extracted from the error object.
 */
export declare function getMessageValues(ajvError: ErrorObject): FormError['messageValues'];
/**
 * Converts an AJV error object to a FormError object.
 *
 * @param ajvError - The AJV error object to convert.
 * @returns The converted FormError object.
 */
export declare function ajvErrorToFormError(ajvError: ErrorObject): FormError;
/**
 * Converts an array of Ajv errors to a single FormError.
 * @param errors - An array of Ajv errors.
 * @returns A single FormError or undefined if there are no errors.
 */
export declare function ajvErrorsToOneFormError(errors?: ErrorObject[] | null, value?: unknown): FormError | undefined;
/**
 * Converts AJV validation errors to form errors.
 *
 * @param errors - The array of AJV validation errors.
 * @param data - The data object being validated.
 * @returns The converted form errors as a record of path and form error pairs.
 */
export declare const ajvErrorsToFormErrors: (errors?: ErrorObject[] | null, data?: JsonObject) => Record<string, FormError>;
