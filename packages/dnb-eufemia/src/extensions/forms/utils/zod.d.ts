import * as z from 'zod';
import { FormError } from './FormError';
export type ZodSchema = z.ZodTypeAny;
export { z };
/**
 * Checks if a schema is a Zod schema by checking if it has the Zod-specific properties
 */
export declare function isZodSchema(schema: unknown): schema is ZodSchema;
/**
 * Converts a ZodError to a single FormError
 */
export declare function zodErrorToFormError(zodError: z.ZodError): FormError;
/**
 * Converts an array of Zod issues to a single FormError
 */
export declare function zodErrorsToOneFormError(zodIssues: z.core.$ZodIssue[]): FormError;
/**
 * Converts an array of Zod issues to a record of path-mapped FormErrors
 */
export declare const zodErrorsToFormErrors: (issues?: z.core.$ZodIssue[] | null) => Record<string, FormError>;
/**
 * Creates a Zod validator function compatible with useFieldProps
 */
export declare function createZodValidator(schema: ZodSchema): (value: unknown) => true | z.ZodError;
