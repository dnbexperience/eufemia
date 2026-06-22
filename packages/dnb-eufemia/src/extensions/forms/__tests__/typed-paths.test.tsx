import { render } from '@testing-library/react'
import {
  Field as FieldNamespace,
  Value as ValueNamespace,
  Form as FormNamespace,
  Iterate,
  RegisteredField,
  RegisteredValue,
  RegisteredForm,
  RegisteredIterate,
} from '..'
import type {
  Paths,
  PathValue,
  TypedItemField,
  TypedItemValue,
  TypedSectionField,
  TypedSectionValue,
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

// Register the form data type once. The augmentation is global to the
// type-check, so it lives in a single place with a single data shape, and the
// pre-typed namespaces resolve it automatically.
declare module '..' {
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Register {
    formData: MyData
  }
}

const defaultData: MyData = {
  firstName: 'John',
  age: 30,
  address: { street: 'Main St', zip: '0001' },
  hobbies: [{ title: 'Climbing', years: 3 }],
}

describe('typed paths', () => {
  describe('Paths', () => {
    it('narrows to valid root, nested and array-item paths', () => {
      const root: Paths<MyData> = '/firstName'
      const nested: Paths<MyData> = '/address/street'
      const item: Paths<MyData> = '/hobbies/0/title'

      // @ts-expect-error /nope is not a path in MyData
      const invalidRoot: Paths<MyData> = '/nope'
      // @ts-expect-error /address/nope is not a path in MyData
      const invalidNested: Paths<MyData> = '/address/nope'

      // The real assertions are the type annotations and `@ts-expect-error`
      // lines above (checked by `tsc`); this runtime check just satisfies the
      // test runner.
      expect([root, nested, item, invalidRoot, invalidNested]).toEqual([
        '/firstName',
        '/address/street',
        '/hobbies/0/title',
        '/nope',
        '/address/nope',
      ])
    })
  })

  describe('PathValue', () => {
    it('resolves the value type at a given path', () => {
      const name: PathValue<MyData, '/firstName'> = 'John'
      const age: PathValue<MyData, '/age'> = 30
      const street: PathValue<MyData, '/address/street'> = 'Main St'

      // @ts-expect-error /firstName resolves to string, not number
      const wrong: PathValue<MyData, '/firstName'> = 123

      expect([name, age, street, wrong]).toEqual([
        'John',
        30,
        'Main St',
        123,
      ])

      expectTypeOf<PathValue<MyData, '/age'>>().toEqualTypeOf<number>()
      expectTypeOf<PathValue<MyData, '/address'>>().toEqualTypeOf<{
        street: string
        zip: string
      }>()
      expectTypeOf<PathValue<MyData, '/hobbies/0'>>().toEqualTypeOf<{
        title: string
        years: number
      }>()
    })
  })

  describe('RegisteredField / RegisteredValue / RegisteredForm', () => {
    it('renders the underlying namespaces at runtime (the cast is type-only)', () => {
      render(
        <RegisteredForm.Handler defaultData={defaultData}>
          <RegisteredField.String path="/firstName" />
          <RegisteredField.Number path="/age" />
          <RegisteredField.Address.Street path="/address/street" />
          <RegisteredValue.String path="/firstName" />
        </RegisteredForm.Handler>
      )

      const inputs = document.querySelectorAll('input')
      expect(inputs).toHaveLength(3)
      expect(inputs[0]).toHaveValue('John')
      expect(inputs[2]).toHaveValue('Main St')
      expect(document.body).toHaveTextContent('John')
    })

    it('rejects invalid root paths at compile time', () => {
      render(
        <RegisteredForm.Handler defaultData={defaultData}>
          {/* @ts-expect-error /nope is not a path in the registered MyData */}
          <RegisteredField.String path="/nope" />
          {/* @ts-expect-error nested static sub-component still narrows the path */}
          <RegisteredField.Address.Street path="/address/nope" />
        </RegisteredForm.Handler>
      )

      expect(document.querySelectorAll('input')).toHaveLength(2)
    })

    it('types the Handler data and defaultData', () => {
      render(
        <RegisteredForm.Handler
          // @ts-expect-error firstName must be a string, not a number
          defaultData={{ ...defaultData, firstName: 123 }}
        >
          <RegisteredField.String path="/firstName" />
        </RegisteredForm.Handler>
      )

      expect(document.querySelectorAll('input')).toHaveLength(1)
    })
  })

  describe('RegisteredPath (soft autocomplete on the plain namespaces)', () => {
    it('accepts registered paths while still allowing any string', () => {
      const valid: RegisteredPath = '/firstName'
      const dynamic: RegisteredPath = `/hobbies/${0}/title`
      const arbitrary: RegisteredPath = '/anything/goes'

      render(
        <FormNamespace.Handler defaultData={defaultData}>
          <FieldNamespace.String path={valid} />
          <ValueNamespace.String path={dynamic} />
        </FormNamespace.Handler>
      )

      expect(valid).toBe('/firstName')
      expect(arbitrary).toBe('/anything/goes')
      expect(document.querySelector('input')).toHaveValue('John')
    })
  })

  describe('paths stored in a const', () => {
    it('keeps the literal type, so a const path is checked like an inline literal', () => {
      // `const` infers the literal type '/firstName' (not the wider `string`),
      // so the path stays narrowed and is checked against the registered paths.
      const path = '/firstName'

      // A typo stored in a const is still a hard compile-time error when used.
      const typo = '/nope'

      render(
        <RegisteredForm.Handler defaultData={defaultData}>
          <RegisteredField.String path={path} />

          {/* @ts-expect-error /nope is not a path in the registered MyData */}
          <RegisteredField.String path={typo} />
        </RegisteredForm.Handler>
      )

      expect(path).toBe('/firstName')
      expect(typo).toBe('/nope')
      expect(document.querySelectorAll('input')).toHaveLength(2)
    })

    it('reuses one const for both the TypedSectionField argument and the Section path', () => {
      // The same const drives the type argument (via `typeof`) and the runtime
      // prop, so the section type and the container path stay in sync.
      const path = '/address'
      const { String: AddressField } = FieldNamespace as TypedSectionField<
        typeof path
      >

      render(
        <RegisteredForm.Handler defaultData={defaultData}>
          <RegisteredForm.Section path={path}>
            <AddressField path="/street" />

            {/* @ts-expect-error /nope is not a path in the section object */}
            <AddressField path="/nope" />
          </RegisteredForm.Section>
        </RegisteredForm.Handler>
      )

      expect(path).toBe('/address')
      expect(document.querySelector('input')).toHaveValue('Main St')
    })
  })

  describe('TypedItemField (item-relative itemPath inside Iterate)', () => {
    it('narrows itemPath to the array item type', () => {
      const { String: HobbyTitle, Number: HobbyYears } =
        FieldNamespace as TypedItemField<'/hobbies'>

      render(
        <RegisteredForm.Handler defaultData={defaultData}>
          <Iterate.Array path="/hobbies">
            <HobbyTitle itemPath="/title" />
            <HobbyYears itemPath="/years" />

            {/* @ts-expect-error /nope is not a path in the array item */}
            <HobbyTitle itemPath="/nope" />
          </Iterate.Array>
        </RegisteredForm.Handler>
      )

      const inputs = document.querySelectorAll('input')
      expect(inputs).toHaveLength(3)
      expect(inputs[0]).toHaveValue('Climbing')
    })
  })

  describe('TypedSectionField (section-relative path inside Form.Section)', () => {
    it('narrows path to the section object type', () => {
      const { String: AddressField } =
        FieldNamespace as TypedSectionField<'/address'>

      render(
        <RegisteredForm.Handler defaultData={defaultData}>
          <RegisteredForm.Section path="/address">
            <AddressField path="/street" />
            <AddressField path="/zip" />

            {/* @ts-expect-error /nope is not a path in the section object */}
            <AddressField path="/nope" />
          </RegisteredForm.Section>
        </RegisteredForm.Handler>
      )

      const inputs = document.querySelectorAll('input')
      expect(inputs).toHaveLength(3)
      expect(inputs[0]).toHaveValue('Main St')
      expect(inputs[1]).toHaveValue('0001')
    })
  })

  describe('TypedItemValue (item-relative itemPath inside Iterate)', () => {
    it('narrows itemPath to the array item type', () => {
      const { String: HobbyTitle } =
        ValueNamespace as TypedItemValue<'/hobbies'>

      render(
        <RegisteredForm.Handler defaultData={defaultData}>
          <Iterate.Array path="/hobbies">
            <HobbyTitle itemPath="/title" />

            {/* @ts-expect-error /nope is not a path in the array item */}
            <HobbyTitle itemPath="/nope" />
          </Iterate.Array>
        </RegisteredForm.Handler>
      )

      expect(document.body).toHaveTextContent('Climbing')
    })
  })

  describe('TypedSectionValue (section-relative path inside Form.Section)', () => {
    it('narrows path to the section object type', () => {
      const { String: AddressValue } =
        ValueNamespace as TypedSectionValue<'/address'>

      render(
        <RegisteredForm.Handler defaultData={defaultData}>
          <RegisteredForm.Section path="/address">
            <AddressValue path="/street" />

            {/* @ts-expect-error /nope is not a path in the section object */}
            <AddressValue path="/nope" />
          </RegisteredForm.Section>
        </RegisteredForm.Handler>
      )

      expect(document.body).toHaveTextContent('Main St')
    })
  })

  describe('container path narrowing', () => {
    it('narrows the Form.Section path to object paths', () => {
      render(
        <RegisteredForm.Handler defaultData={defaultData}>
          <RegisteredForm.Section path="/address">
            <RegisteredField.Address.Street path="/address/street" />
          </RegisteredForm.Section>

          {/* @ts-expect-error /nope is not a path in the registered MyData */}
          <RegisteredForm.Section path="/nope">
            <RegisteredField.String path="/firstName" />
          </RegisteredForm.Section>

          {/* @ts-expect-error /firstName is a string, not an object */}
          <RegisteredForm.Section path="/firstName">
            <RegisteredField.String path="/firstName" />
          </RegisteredForm.Section>

          {/* @ts-expect-error /hobbies is an array, not an object */}
          <RegisteredForm.Section path="/hobbies">
            <RegisteredField.String path="/firstName" />
          </RegisteredForm.Section>
        </RegisteredForm.Handler>
      )

      type SectionPath = NonNullable<
        Parameters<typeof RegisteredForm.Section>[0]['path']
      >
      expectTypeOf<SectionPath>().toEqualTypeOf<
        '/address' | `/hobbies/${number}`
      >()

      expect(document.querySelectorAll('input').length).toBeGreaterThan(0)
    })

    it('narrows the Iterate.Array path to array paths', () => {
      render(
        <RegisteredForm.Handler defaultData={defaultData}>
          <RegisteredIterate.Array path="/hobbies">
            <RegisteredField.String itemPath="/title" />
          </RegisteredIterate.Array>

          {/* @ts-expect-error /nope is not a path in the registered MyData */}
          <RegisteredIterate.Array path="/nope">
            <RegisteredField.String itemPath="/title" />
          </RegisteredIterate.Array>

          {/* @ts-expect-error /firstName is a string, not an array */}
          <RegisteredIterate.Array path="/firstName">
            <RegisteredField.String itemPath="/title" />
          </RegisteredIterate.Array>

          {/* @ts-expect-error /address is an object, not an array */}
          <RegisteredIterate.Array path="/address">
            <RegisteredField.String itemPath="/title" />
          </RegisteredIterate.Array>
        </RegisteredForm.Handler>
      )

      type ArrayPath = NonNullable<
        Parameters<typeof RegisteredIterate.Array>[0]['path']
      >
      expectTypeOf<ArrayPath>().toEqualTypeOf<'/hobbies'>()

      expect(document.querySelectorAll('input').length).toBeGreaterThan(0)
    })

    it('renders every Iterate.Array item at runtime (the cast is type-only)', () => {
      render(
        <RegisteredForm.Handler
          defaultData={{
            ...defaultData,
            hobbies: [
              { title: 'Climbing', years: 3 },
              { title: 'Diving', years: 5 },
            ],
          }}
        >
          <RegisteredIterate.Array path="/hobbies">
            <RegisteredField.String itemPath="/title" />
          </RegisteredIterate.Array>
        </RegisteredForm.Handler>
      )

      const inputs = document.querySelectorAll('input')
      expect(inputs).toHaveLength(2)
      expect(inputs[0]).toHaveValue('Climbing')
      expect(inputs[1]).toHaveValue('Diving')
    })
  })
})
