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
 *
 * Optionally register your data type once (see {@link Register}) to drop the
 * generic argument: `Field as TypedField`.
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
 * recursively re-typed so nested sub-components keep their `path` (and
 * optionally `itemPath`) narrowing.
 */
type TypedStatics<Component, Data, ItemData = never> = {
  [Key in keyof Component]: WithTypedPath<Component[Key], Data, ItemData>
}

/**
 * Narrows the item-relative `itemPath` prop to the valid paths of an Iterate
 * item type `ItemData`. A no-op when `ItemData` is `never` (the default), so
 * the common `path`-only narrowing leaves `itemPath` untouched.
 */
type NarrowItemPath<Props, ItemData> = [ItemData] extends [never]
  ? Props
  : Props extends { itemPath?: unknown }
    ? Omit<Props, 'itemPath'> & { itemPath?: Paths<ItemData> }
    : Props

/**
 * Re-types a single Field/Value component so its `path` prop is narrowed to
 * the valid `Paths<Data>` union. When an Iterate item type `ItemData` is given,
 * the item-relative `itemPath` prop is narrowed too. Components without a
 * `path` prop are left untouched. Static sub-members (such as
 * `Field.Address.Street`) are preserved and recursively narrowed as well.
 */
type WithTypedPath<Component, Data, ItemData = never> = Component extends (
  props: infer Props
) => infer Return
  ? Props extends { path?: unknown }
    ? ((
        props: NarrowItemPath<
          Omit<Props, 'path'> & { path?: Paths<Data> },
          ItemData
        >
      ) => Return) &
        TypedStatics<Component, Data, ItemData>
    : Component
  : Component

/**
 * Maps over a Field/Value namespace, narrowing every member's `path` prop (and,
 * when `ItemData` is given, the item-relative `itemPath` prop).
 */
export type TypedNamespace<Namespace, Data, ItemData = never> = {
  [Key in keyof Namespace]: WithTypedPath<Namespace[Key], Data, ItemData>
}

/**
 * Augmentable registry for binding a form data type globally, mirroring
 * TanStack Router's `Register` interface. Augment it once in your app to make
 * {@link TypedField}, {@link TypedValue} and {@link TypedForm} resolve their
 * data type automatically, so the generic argument can be omitted:
 *
 * @example
 * declare module '@dnb/eufemia/extensions/forms' {
 *   interface Register {
 *     formData: MyData
 *   }
 * }
 *
 * // Anywhere afterwards — no generic needed:
 * const { Name } = Field as TypedField
 *
 * @remarks
 * Like TanStack Router's single registered router, this binds one data type
 * globally. For an additional form with a different shape, pass the generic
 * explicitly (`Field as TypedField<OtherData>`).
 */
// `interface` is required so the registry can be augmented via `declare module`.
// eslint-disable-next-line @typescript-eslint/no-empty-object-type, @typescript-eslint/consistent-type-definitions
export interface Register {}

/**
 * Resolves the form data type registered via {@link Register}, mirroring
 * TanStack Router's `RegisteredRouter`. Falls back to `JsonObject` when no
 * `formData` has been registered.
 */
export type RegisteredFormData = Register extends {
  formData: infer Data extends JsonObject
}
  ? Data
  : JsonObject

/**
 * The type used for the `path` prop of every `Field.*` and `Value.*` component.
 *
 * When a form data type is registered via {@link Register}, this offers
 * **autocomplete** of the valid {@link Paths} directly on `Field.Name`,
 * `Value.String`, … — no cast needed. It still accepts any string, so relative
 * paths inside `Form.Section`/`Iterate` and dynamic paths keep working. Without
 * a registration it is a plain string, exactly as before.
 *
 * @remarks
 * Because any string is still accepted, typos are not hard errors here. For
 * compile-time errors on invalid paths (and tree-shaking), use the
 * {@link TypedField}/{@link TypedValue} cast instead.
 */
export type RegisteredPath = Register extends {
  formData: infer Data extends JsonObject
}
  ? Paths<Data> | (string & {})
  : string

type TypedHandler<Data extends JsonObject> = (
  props: Parameters<typeof FormNS.Handler<Data>>[0]
) => ReturnType<typeof FormNS.Handler<Data>>

/**
 * The `Form` namespace with its `Handler` bound to `Data`, so `Form.Handler`
 * gets typed `data`/`defaultData` while the rest of the namespace
 * (`Form.Card`, `Form.SubmitButton`, …) stays available unchanged.
 */
export type TypedForm<Data extends JsonObject = RegisteredFormData> = Omit<
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
 * Pass the data type as the generic argument, or register it once via
 * {@link Register} and omit the generic.
 *
 * @example
 * import { Field } from '@dnb/eufemia/extensions/forms'
 * import type { TypedField } from '@dnb/eufemia/extensions/forms'
 * const { Name, Number } = Field as TypedField<MyData>
 * <Name path="/firstName" /> // typed + tree-shakeable
 */
export type TypedField<Data extends JsonObject = RegisteredFormData> =
  TypedNamespace<typeof FieldNS, Data>

/**
 * The `Value` namespace with every member's `path` prop narrowed to the valid
 * paths of `Data`. See {@link TypedField} for usage.
 */
export type TypedValue<Data extends JsonObject = RegisteredFormData> =
  TypedNamespace<typeof ValueNS, Data>

/**
 * Resolves the item type of the array located at `ArrayPath` in the registered
 * form data. Falls back to `never` (which disables `itemPath` narrowing) when
 * the path does not point to an array of objects.
 */
type RegisteredItem<ArrayPath extends Paths<RegisteredFormData>> =
  NonNullable<
    PathValue<RegisteredFormData, ArrayPath>
  > extends ReadonlyArray<infer Item extends JsonObject>
    ? Item
    : never

/**
 * The `Field` namespace with every member's item-relative `itemPath` prop
 * narrowed to the valid paths of the array item at `ArrayPath` (resolved from
 * the registered form data — see {@link Register}).
 *
 * Use it inside an `Iterate.Array` so item-relative `itemPath` props are
 * type-checked. The item type is derived from the single registered root data,
 * so there is one source of truth — no extra registration is needed. Pass the
 * same path you give to `Iterate.Array`.
 *
 * @example
 * import { Field, Iterate } from '@dnb/eufemia/extensions/forms'
 * import type { TypedItemField } from '@dnb/eufemia/extensions/forms'
 *
 * // Registered data: { accounts: Array<{ name: string }> }
 * const { String } = Field as TypedItemField<'/accounts'>
 *
 * <Iterate.Array path="/accounts">
 *   <String itemPath="/name" /> // typed + checked
 * </Iterate.Array>
 */
export type TypedItemField<ArrayPath extends Paths<RegisteredFormData>> =
  TypedNamespace<
    typeof FieldNS,
    RegisteredFormData,
    RegisteredItem<ArrayPath>
  >

/**
 * The `Value` namespace with every member's item-relative `itemPath` prop
 * narrowed to the valid paths of the array item at `ArrayPath`. See
 * {@link TypedItemField}.
 */
export type TypedItemValue<ArrayPath extends Paths<RegisteredFormData>> =
  TypedNamespace<
    typeof ValueNS,
    RegisteredFormData,
    RegisteredItem<ArrayPath>
  >

/**
 * Resolves the object type located at `SectionPath` in the registered form
 * data, used to narrow the section-relative `path` prop. Falls back to `never`
 * when the path does not point to an object.
 */
type RegisteredSection<SectionPath extends Paths<RegisteredFormData>> =
  NonNullable<
    PathValue<RegisteredFormData, SectionPath>
  > extends infer Section extends JsonObject
    ? Section
    : never

/**
 * The `Field` namespace with every member's `path` prop narrowed to the valid
 * paths of the object at `SectionPath` (resolved from the registered form data
 * — see {@link Register}).
 *
 * Use it inside a `Form.Section` so the section-relative `path` props are
 * type-checked. Inside a section, fields use a `path` relative to the section,
 * so the type is derived from the section's object type — not the root. The
 * object type comes from the single registered root data, so there is one
 * source of truth — no extra registration is needed. Pass the same path you
 * give to `Form.Section`.
 *
 * @example
 * import { Field, Form } from '@dnb/eufemia/extensions/forms'
 * import type { TypedSectionField } from '@dnb/eufemia/extensions/forms'
 *
 * // Registered data: { company?: { name: string } }
 * const { Name } = Field as TypedSectionField<'/company'>
 *
 * <Form.Section path="/company">
 *   <Name.Company path="/name" /> // typed + checked, relative to the section
 * </Form.Section>
 */
export type TypedSectionField<
  SectionPath extends Paths<RegisteredFormData>,
> = TypedNamespace<typeof FieldNS, RegisteredSection<SectionPath>>

/**
 * The `Value` namespace with every member's `path` prop narrowed to the valid
 * paths of the object at `SectionPath`. See {@link TypedSectionField}.
 */
export type TypedSectionValue<
  SectionPath extends Paths<RegisteredFormData>,
> = TypedNamespace<typeof ValueNS, RegisteredSection<SectionPath>>
