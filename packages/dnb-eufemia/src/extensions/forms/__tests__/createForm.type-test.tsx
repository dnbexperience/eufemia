import React from 'react'
import { createForm } from '..'

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

const { Form, Field, Value } = createForm<MyData>()

export function Example() {
  return (
    <Form.Handler
      defaultData={{
        firstName: 'John',
        age: 30,
        address: { street: 'Main St', zip: '0001' },
        hobbies: [{ title: 'Climbing', years: 3 }],
      }}
    >
      {/* ✅ Valid paths — autocomplete + type-checked */}
      <Field.String path="/firstName" />
      <Field.Number path="/age" />
      <Field.String path="/address/street" />
      <Field.String path="/address/zip" />
      <Field.String path="/hobbies/0/title" />
      <Field.Number path="/hobbies/0/years" />

      {/* ✅ Value components are narrowed the same way */}
      <Value.Number path="/age" />
      <Value.String path="/address/street" />

      {/* ✅ Nested static sub-components are preserved and narrowed */}
      <Field.Address.Street path="/address/street" />

      {/* ❌ Invalid paths must error */}
      {/* @ts-expect-error path does not exist in MyData */}
      <Field.String path="/nope" />
      {/* @ts-expect-error nested path does not exist */}
      <Field.String path="/address/country" />
      {/* @ts-expect-error array element path is wrong */}
      <Field.String path="/hobbies/0/name" />
      {/* @ts-expect-error nested static sub-component still narrows the path */}
      <Field.Address.Street path="/address/nope" />
    </Form.Handler>
  )
}
