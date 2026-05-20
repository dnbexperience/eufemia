import type { PropertiesTableProps } from '../../../shared/types'

/**
 * Documentation for the useTranslation hook parameters.
 *
 * The useTranslation hook provides localized strings and translation utilities
 * for Forms components. It merges custom translations with built-in forms locales.
 */
export const useTranslationParameters: PropertiesTableProps = {
  messages: {
    doc: 'Custom translation messages to merge with built-in forms translations. Can be a flat object or locale-keyed object.',
    type: ['FormsTranslation', 'Record<locale, FormsTranslation>'],
    status: 'optional',
  },
  fallbackLocale: {
    doc: 'Locale to use when translations are missing in the current locale. Defaults to "nb-NO".',
    type: 'string',
    status: 'optional',
  },
}

/**
 * Documentation for the useTranslation hook return values.
 *
 * Returns translation strings plus utility functions for formatting messages.
 */
export const useTranslationReturns: PropertiesTableProps = {
  formatMessage: {
    doc: 'Formats a translation key with ICU MessageFormat syntax. Supports pluralization, select, and variable interpolation.',
    type: '(id: string, values?: Record<string, unknown>) => string',
    status: 'required',
  },
  renderMessage: {
    doc: 'Like formatMessage but returns ReactNode, allowing React elements in interpolated values.',
    type: '(id: string, values?: Record<string, ReactNode>) => ReactNode',
    status: 'required',
  },
  countries: {
    doc: 'Array of country names in the current locale, for use in country selection components.',
    type: 'Array<string>',
    status: 'required',
  },
  Field: {
    doc: 'Translation strings for Field.* components (labels, error messages, placeholders).',
    type: 'object',
    status: 'required',
  },
  'Field.errorRequired': {
    doc: 'Default error message for required field validation.',
    type: 'string',
    status: 'required',
  },
  'Field.errorPattern': {
    doc: 'Default error message for pattern validation failures.',
    type: 'string',
    status: 'required',
  },
  Section: {
    doc: 'Translation strings for Form.Section components.',
    type: 'object',
    status: 'required',
  },
  Wizard: {
    doc: 'Translation strings for Wizard components (step labels, navigation).',
    type: 'object',
    status: 'required',
  },
  Iterate: {
    doc: 'Translation strings for Iterate components (add/remove buttons).',
    type: 'object',
    status: 'required',
  },
}
