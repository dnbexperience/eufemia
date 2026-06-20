import * as FieldNamespace from './Field'
import * as FormNamespace from './Form'
import * as ValueNamespace from './Value'
import type { TypedField, TypedForm, TypedValue } from './typed-paths'

export * from './types'
export * from './utils'
export * from './hooks'
export * as Field from './Field'
export * as Value from './Value'
export * as Form from './Form'
export * as Wizard from './Wizard'
export * as DataContext from './DataContext'
export * as Iterate from './Iterate'
export * as Tools from './Tools'
export * as Connectors from './Connectors'
export { default as FieldBlock } from './FieldBlock'
export { default as ValueBlock } from './ValueBlock'
export type {
  Paths,
  PathValue,
  TypedNamespace,
  TypedField,
  TypedValue,
  TypedForm,
  TypedItemField,
  TypedItemValue,
  TypedSectionField,
  TypedSectionValue,
  Register,
  RegisteredFormData,
  RegisteredPath,
} from './typed-paths'

/**
 * The `Field` namespace pre-bound to the globally registered form data type
 * (see {@link Register}). Import it aliased to `Field` to get compile-time
 * `path` checking — including hard errors on typos — without writing a cast:
 *
 * @example
 * import {
 *   RegisteredForm as Form,
 *   RegisteredField as Field,
 * } from '@dnb/eufemia/extensions/forms'
 *
 * <Field.String path="/firstName" /> // typed; typos are a compile error
 *
 * Paths are checked against the root data type. For the section-relative `path`
 * inside `Form.Section`, use {@link TypedSectionField}; for the item-relative
 * `itemPath` inside `Iterate`, use {@link TypedItemField}. Member access on a
 * namespace is not tree-shakeable; destructure from `Field as TypedField` when
 * that matters.
 */
export const RegisteredField = FieldNamespace as unknown as TypedField

/**
 * The `Value` namespace pre-bound to the globally registered form data type.
 * See {@link RegisteredField} for usage.
 */
export const RegisteredValue = ValueNamespace as unknown as TypedValue

/**
 * The `Form` namespace pre-bound to the globally registered form data type,
 * so `Form.Handler` gets typed `data`/`defaultData`. See {@link RegisteredField}
 * for usage.
 */
export const RegisteredForm = FormNamespace as unknown as TypedForm

// Types
export type { SectionProps } from './Form/Section'
