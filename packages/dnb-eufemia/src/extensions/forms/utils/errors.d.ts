import type { FormError } from './FormError';
import type { DefaultErrorMessages } from '../types';
import type { FormsTranslation } from '../hooks/useTranslation';
/**
 * Extend the error messages with relevant translation messages.
 */
export declare function extendErrorMessagesWithTranslationMessages(messages: DefaultErrorMessages, translation: FormsTranslation): DefaultErrorMessages;
/**
 * Get the translation key from the Ajv validation rule
 */
export declare function getTranslationKeyFromValidationRule(validationRule: string): string | undefined;
export declare function errorChanged(error1?: FormError, error2?: FormError): boolean;
