import * as FieldNamespace from './Field'
import * as FormNamespace from './Form'
import * as ValueNamespace from './Value'
import * as IterateNamespace from './Iterate'
import type {
  TypedField,
  TypedForm,
  TypedValue,
  TypedIterate,
} from './typed-paths'

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
 * `path` checking — including hard errors on typos:
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
 * `itemPath` inside `Iterate`, use {@link TypedItemField}.
 */
export const RegisteredField = FieldNamespace as unknown as TypedField

/**
 * The `Value` namespace pre-bound to the globally registered form data type.
 * See {@link RegisteredField} for usage.
 */
export const RegisteredValue = ValueNamespace as unknown as TypedValue

/**
 * The `Form` namespace pre-bound to the globally registered form data type,
 * so `Form.Handler` gets typed `data`/`defaultData` and `Form.Section`'s `path`
 * is narrowed to the valid object paths. See {@link RegisteredField} for usage.
 */
export const RegisteredForm = FormNamespace as unknown as TypedForm

/**
 * The `Iterate` namespace pre-bound to the globally registered form data type,
 * so `Iterate.Array`'s `path` is narrowed to the valid array paths — typos are
 * a compile error. To type the item-relative `itemPath` of fields inside the
 * loop, use {@link TypedItemField}. See {@link RegisteredField} for usage.
 */
export const RegisteredIterate =
  IterateNamespace as unknown as TypedIterate

// Types
export type { SectionProps } from './Form/Section'
