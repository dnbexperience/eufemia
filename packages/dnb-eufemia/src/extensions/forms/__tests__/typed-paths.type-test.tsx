import React from 'react'
import {
  Field as FieldNamespace,
  Value as ValueNamespace,
  Form as FormNamespace,
  Iterate,
  RegisteredField,
  RegisteredValue,
  RegisteredForm,
} from '..'
import type {
  TypedField,
  TypedValue,
  TypedForm,
  TypedItemField,
  TypedSectionField,
  RegisteredPath,
} from '..'

type MyData = {
  firstName: string
  age: number
  address: {
    street: string
    zip: string
  }
  hobbies: Array<{
    title: string
    years: number
  }>
}

// A type-only cast + destructuring narrows the `path` prop to the valid paths
// of `MyData`, while keeping member access tree-shakeable (the cast erases at
// build time and destructuring keeps the used members statically trackable).
export function Example() {
  const {
    String: StringField,
    Number: NumberField,
    Address,
  } = FieldNamespace as TypedField<MyData>
  const { Number: NumberValue, String: StringValue } =
    ValueNamespace as TypedValue<MyData>
  const { Handler, Card } = FormNamespace as TypedForm<MyData>

  return (
    <Handler
      defaultData={{
        firstName: 'John',
        age: 30,
        address: { street: 'Main St', zip: '0001' },
        hobbies: [{ title: 'Climbing', years: 3 }],
      }}
    >
      <Card>
        {/* ✅ Valid paths — autocomplete + type-checked */}
        <StringField path="/firstName" />
        <NumberField path="/age" />
        <StringField path="/address/street" />
        <StringField path="/address/zip" />
        <StringField path="/hobbies/0/title" />
        <NumberField path="/hobbies/0/years" />

        {/* ✅ Value components are narrowed the same way */}
        <NumberValue path="/age" />
        <StringValue path="/address/street" />

        {/* ✅ Nested static sub-components are preserved and narrowed */}
        <Address.Street path="/address/street" />

        {/* ❌ Invalid paths must error */}
        {/* @ts-expect-error path does not exist in MyData */}
        <StringField path="/nope" />
        {/* @ts-expect-error nested path does not exist */}
        <StringField path="/address/country" />
        {/* @ts-expect-error array element path is wrong */}
        <StringField path="/hobbies/0/name" />
        {/* @ts-expect-error nested static sub-component still narrows the path */}
        <Address.Street path="/address/nope" />
      </Card>
    </Handler>
  )
}

// Registering the form data type once (TanStack Router's `Register` pattern)
// lets the helpers resolve `MyData` automatically, so the generic argument can
// be omitted. The augmentation is global to the type-check, so it lives in a
// single place with a single data shape.
declare module '..' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Register {
    formData: MyData
  }
}

// With the data type registered, casting without a generic narrows the `path`
// prop to the valid paths of `MyData`.
export function RegisteredExample() {
  const { String: StringField, Number: NumberField } =
    FieldNamespace as TypedField
  const { String: StringValue } = ValueNamespace as TypedValue
  const { Handler, Card } = FormNamespace as TypedForm

  return (
    <Handler
      defaultData={{
        firstName: 'John',
        age: 30,
        address: { street: 'Main St', zip: '0001' },
        hobbies: [{ title: 'Climbing', years: 3 }],
      }}
    >
      <Card>
        {/* ✅ Valid paths resolved from the registered data type */}
        <StringField path="/firstName" />
        <NumberField path="/age" />
        <StringValue path="/address/street" />

        {/* ❌ Invalid path must still error */}
        {/* @ts-expect-error path does not exist in the registered MyData */}
        <StringField path="/nope" />
      </Card>
    </Handler>
  )
}

// With the data type registered, the `path` prop is autocomplete-aware directly
// on the namespace components — no cast needed (soft narrowing). Any string is
// still accepted, so relative/dynamic paths keep working.
export function RegisteredDirectExample() {
  // `RegisteredPath` offers the valid paths (for autocomplete) while still
  // accepting any string.
  const validPath: RegisteredPath = '/firstName'
  const dynamicPath: RegisteredPath = `/hobbies/${0}/title`

  return (
    <FormNamespace.Handler
      defaultData={{
        firstName: 'John',
        age: 30,
        address: { street: 'Main St', zip: '0001' },
        hobbies: [{ title: 'Climbing', years: 3 }],
      }}
    >
      <FormNamespace.Card>
        {/* ✅ Valid registered paths accepted directly on the namespace */}
        <FieldNamespace.String path={validPath} />
        <FieldNamespace.Number path="/age" />
        <ValueNamespace.String path={dynamicPath} />
      </FormNamespace.Card>
    </FormNamespace.Handler>
  )
}

// The pre-typed `RegisteredField`/`RegisteredValue`/`RegisteredForm` namespaces
// resolve the registered data type, so bare namespace access (no cast) is
// checked at compile time — including hard errors on typos.
export function RegisteredNamespaceExample() {
  return (
    <RegisteredForm.Handler
      defaultData={{
        firstName: 'John',
        age: 30,
        address: { street: 'Main St', zip: '0001' },
        hobbies: [{ title: 'Climbing', years: 3 }],
      }}
    >
      <RegisteredForm.Card>
        {/* ✅ Valid registered paths checked directly on the namespace */}
        <RegisteredField.String path="/firstName" />
        <RegisteredField.Number path="/age" />
        <RegisteredField.Address.Street path="/address/street" />
        <RegisteredValue.String path="/address/street" />

        {/* ❌ Invalid paths must error without any cast */}
        {/* @ts-expect-error path does not exist in the registered MyData */}
        <RegisteredField.String path="/nope" />
        {/* @ts-expect-error nested static sub-component still narrows the path */}
        <RegisteredField.Address.Street path="/address/nope" />
      </RegisteredForm.Card>
    </RegisteredForm.Handler>
  )
}

// Inside an `Iterate.Array`, cast to `TypedItemField` (passing the same array
// path) to narrow the item-relative `itemPath` prop to the array item type,
// resolved from the single registered root data — no extra registration needed.
export function ItemPathExample() {
  const { String: StringField, Number: NumberField } =
    FieldNamespace as TypedItemField<'/hobbies'>

  return (
    <RegisteredForm.Handler
      defaultData={{
        firstName: 'John',
        age: 30,
        address: { street: 'Main St', zip: '0001' },
        hobbies: [{ title: 'Climbing', years: 3 }],
      }}
    >
      <Iterate.Array path="/hobbies">
        {/* ✅ Item-relative paths narrowed to the array item type */}
        <StringField itemPath="/title" />
        <NumberField itemPath="/years" />

        {/* ❌ Invalid item paths must error */}
        {/* @ts-expect-error itemPath does not exist in the array item */}
        <StringField itemPath="/nope" />
      </Iterate.Array>
    </RegisteredForm.Handler>
  )
}

// Inside a `Form.Section`, cast to `TypedSectionField` (passing the same section
// path) to narrow the section-relative `path` prop to the section's object type,
// resolved from the single registered root data — no extra registration needed.
export function SectionPathExample() {
  const { String: StringField } =
    FieldNamespace as TypedSectionField<'/address'>

  return (
    <RegisteredForm.Handler
      defaultData={{
        firstName: 'John',
        age: 30,
        address: { street: 'Main St', zip: '0001' },
        hobbies: [{ title: 'Climbing', years: 3 }],
      }}
    >
      <RegisteredForm.Section path="/address">
        {/* ✅ Section-relative paths narrowed to the section object type */}
        <StringField path="/street" />
        <StringField path="/zip" />

        {/* ❌ Invalid section paths must error */}
        {/* @ts-expect-error path does not exist in the section object */}
        <StringField path="/nope" />
      </RegisteredForm.Section>
    </RegisteredForm.Handler>
  )
}
