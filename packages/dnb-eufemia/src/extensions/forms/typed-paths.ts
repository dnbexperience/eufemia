import type {
  Form as FormNS,
  Field as FieldNS,
  Value as ValueNS,
} from './'
import type { JsonObject } from './utils/json-pointer'

/**
 * Type-level helpers for type-checking Eufemia Forms `path` props against a
 * data model. Cast a namespace and destructure the members you use — the cast
 * erases at build time and destructuring keeps tree-shaking intact:
 *
 * @example
 * import { Field, Form } from '@dnb/eufemia/extensions/forms'
 * import type { TypedField, TypedForm } from '@dnb/eufemia/extensions/forms'
 *
 * const { Name, Number } = Field as TypedField<MyData>
 * const { Handler, Card } = Form as TypedForm<MyData>
 */

/**
 * Depth limiter for the recursive `Paths` type, to avoid
 * "Type instantiation is excessively deep and possibly infinite" on
 * deep or recursive data models.
 */
type Prev = [never, 0, 1, 2, 3, 4, 5, 6]

/**
 * Produces a union of all valid JSON Pointer paths in `Data`.
 *
 * @example
 * type T = { user: { name: string }; items: Array<{ title: string }> }
 * type P = Paths<T>
 * // "/user" | "/user/name" | "/items" | `/items/${number}` | `/items/${number}/title`
 */
export type Paths<Data, Depth extends number = 6> = [Depth] extends [never]
  ? never
  : Data extends ReadonlyArray<infer Item>
    ? `/${number}` | `/${number}${Paths<Item, Prev[Depth]>}`
    : Data extends object
      ? {
          [Key in Extract<keyof Data, string>]:
            | `/${Key}`
            | `/${Key}${Paths<NonNullable<Data[Key]>, Prev[Depth]>}`
        }[Extract<keyof Data, string>]
      : never

/**
 * Resolves the value type located at the JSON Pointer path `P` in `Data`.
 *
 * @example
 * type T = { user: { age: number } }
 * type V = PathValue<T, '/user/age'> // number
 */
export type PathValue<Data, P> = P extends `/${infer Key}/${infer Rest}`
  ? Key extends `${number}`
    ? Data extends ReadonlyArray<infer Item>
      ? PathValue<Item, `/${Rest}`>
      : never
    : Key extends keyof Data
      ? PathValue<NonNullable<Data[Key]>, `/${Rest}`>
      : never
  : P extends `/${infer Key}`
    ? Key extends `${number}`
      ? Data extends ReadonlyArray<infer Item>
        ? Item
        : never
      : Key extends keyof Data
        ? Data[Key]
        : never
    : never

/**
 * The static members attached to a component (e.g. `Field.Address.Street`),
 * recursively re-typed so nested sub-components keep their `path` narrowing.
 */
type TypedStatics<Component, Data> = {
  [Key in keyof Component]: WithTypedPath<Component[Key], Data>
}

/**
 * Re-types a single Field/Value component so its `path` prop is narrowed to
 * the valid `Paths<Data>` union. Components without a `path` prop are left
 * untouched. Static sub-members (such as `Field.Address.Street`) are preserved
 * and recursively narrowed as well.
 */
type WithTypedPath<Component, Data> = Component extends (
  props: infer Props
) => infer Return
  ? Props extends { path?: unknown }
    ? ((props: Omit<Props, 'path'> & { path?: Paths<Data> }) => Return) &
        TypedStatics<Component, Data>
    : Component
  : Component

/**
 * Maps over a Field/Value namespace, narrowing every member's `path` prop.
 */
export type TypedNamespace<Namespace, Data> = {
  [Key in keyof Namespace]: WithTypedPath<Namespace[Key], Data>
}

type TypedHandler<Data extends JsonObject> = (
  props: Parameters<typeof FormNS.Handler<Data>>[0]
) => ReturnType<typeof FormNS.Handler<Data>>

/**
 * The `Form` namespace with its `Handler` bound to `Data`, so `Form.Handler`
 * gets typed `data`/`defaultData` while the rest of the namespace
 * (`Form.Card`, `Form.SubmitButton`, …) stays available unchanged.
 */
export type TypedForm<Data extends JsonObject> = Omit<
  typeof FormNS,
  'Handler'
> & {
  Handler: TypedHandler<Data>
}

/**
 * The `Field` namespace with every member's `path` prop narrowed to the valid
 * paths of `Data`.
 *
 * Apply it with a type-only cast and destructure the fields you use directly
 * from the namespace. The cast erases at build time and the destructuring keeps
 * member access statically trackable, so tree-shaking still works (under
 * Rollup/Vite/webpack). Do not alias the whole namespace
 * (`const F = Field as TypedField<MyData>`); destructure instead.
 *
 * @example
 * import { Field } from '@dnb/eufemia/extensions/forms'
 * import type { TypedField } from '@dnb/eufemia/extensions/forms'
 * const { Name, Number } = Field as TypedField<MyData>
 * <Name path="/firstName" /> // typed + tree-shakeable
 */
export type TypedField<Data extends JsonObject> = TypedNamespace<
  typeof FieldNS,
  Data
>

/**
 * The `Value` namespace with every member's `path` prop narrowed to the valid
 * paths of `Data`. See {@link TypedField} for usage.
 */
export type TypedValue<Data extends JsonObject> = TypedNamespace<
  typeof ValueNS,
  Data
>
