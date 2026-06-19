import { Form as FormNS, Field as FieldNS, Value as ValueNS } from './'
import type { JsonObject } from './utils/json-pointer'

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

export type CreateFormReturn<Data extends JsonObject> = {
  Form: TypedForm<Data>
  Field: TypedNamespace<typeof FieldNS, Data>
  Value: TypedNamespace<typeof ValueNS, Data>
}

/**
 * Binds a data type to the Forms components so that the `path` prop on every
 * `Field.*` and `Value.*` gets autocomplete and type checking based on the
 * shape of `Data`.
 *
 * @example
 * type MyData = { firstName: string; age: number }
 * const { Form, Field } = createForm<MyData>()
 *
 * <Form.Handler defaultData={{ firstName: 'John' }}>
 *   <Field.String path="/firstName" /> // ✅ autocompletes + type-checked
 *   <Field.Number path="/age" />       // ✅
 *   <Field.String path="/nope" />      // ❌ type error
 * </Form.Handler>
 *
 * @remarks
 * The path typing itself is purely type-level — `Paths<Data>` and
 * `PathValue<Data, P>` are erased at build time, so the types add no runtime
 * or bundle-size cost.
 *
 * Tree-shaking caveat: `createForm` returns the `Form`, `Field` and `Value`
 * namespace objects as runtime values. Because the namespaces "escape" through
 * the returned object, bundlers can no longer tell which members are used and
 * include the full Forms field set in the bundle. This was verified with both
 * esbuild and Rollup. A type-only cast over the namespace
 * (`Field as TypedNamespace<typeof Field, MyData>`) does not help either — it
 * has the same escape problem.
 *
 * If bundle size is critical, keep the standard imports (which tree-shake under
 * Rollup/Vite) and apply the exported `Paths<Data>` type only to the path
 * values:
 *
 * @example
 * import { Field } from '@dnb/eufemia/extensions/forms'
 * import type { Paths } from '@dnb/eufemia/extensions/forms'
 *
 * const path = (p: Paths<MyData>) => p
 * <Field.String path={path('/firstName')} /> // typed and tree-shakeable
 */
export function createForm<
  Data extends JsonObject,
>(): CreateFormReturn<Data> {
  return {
    Form: FormNS as unknown as TypedForm<Data>,
    Field: FieldNS as unknown as TypedNamespace<typeof FieldNS, Data>,
    Value: ValueNS as unknown as TypedNamespace<typeof ValueNS, Data>,
  }
}
