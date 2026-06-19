import React from 'react'
import {
  Field as FieldNamespace,
  Value as ValueNamespace,
  Form as FormNamespace,
} from '..'
import type { TypedField, TypedValue, TypedForm } from '..'

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
