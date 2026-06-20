import ComponentBox from '../../../../../shared/tags/ComponentBox'
import {
  RegisteredForm as Form,
  RegisteredField as Field,
  Iterate,
} from '@dnb/eufemia/src/extensions/forms'
import type {
  TypedItemField,
  TypedSectionField,
} from '@dnb/eufemia/src/extensions/forms'

/**
 * Example data type registered globally for the demos below, mirroring TanStack
 * Router's `Register` pattern. With the registration in place, importing the
 * pre-typed `RegisteredForm`/`RegisteredField` (aliased to `Form`/`Field`)
 * gives compile-time `path` checking — including hard errors on typos —
 * without writing a cast.
 */
type RegisteredExampleData = {
  firstName: string
  age: number
  address?: {
    street: string
  }
  company?: {
    name: string
  }
  accounts?: Array<{
    name: string
    balance: number
  }>
}

declare module '@dnb/eufemia/src/extensions/forms' {
  // `interface` is required to augment the registry.
  // eslint-disable-next-line @typescript-eslint/consistent-type-definitions
  interface Register {
    formData: RegisteredExampleData
  }
}

export const BasicFields = () => {
  return (
    <ComponentBox>
      <Form.Handler
        defaultData={{ firstName: 'Nora', age: 30 }}
        onSubmit={(data) => console.log('onSubmit', data)}
      >
        <Form.Card>
          <Field.Name.First path="/firstName" />
          <Field.Number path="/age" label="Age" />
          <Field.Address.Street path="/address/street" />
          <Field.Name.Company path="/company/name" />

          {/* @ts-expect-error /lastName is not defined */}
          <Field.Name.Last path="/lastName" />

          <Form.SubmitButton />
        </Form.Card>
      </Form.Handler>
    </ComponentBox>
  )
}

export const SectionExample = () => {
  return (
    <ComponentBox>
      {() => {
        // Derive the section's object type from the registered path to
        // type-check the section-relative `path` — no extra registration.
        // `as unknown as` because we re-narrow the already-root-typed namespace.
        const { Name } = Field as unknown as TypedSectionField<'/company'>

        return (
          <Form.Handler
            defaultData={{
              firstName: 'Nora',
              age: 30,
              company: { name: 'DNB' },
            }}
            onSubmit={(data) => console.log('onSubmit', data)}
          >
            <Form.Card>
              <Form.Section path="/company">
                {/* Section-relative paths are checked against the section type */}
                <Name.Company path="/name" label="Company name" />

                {/* @ts-expect-error /nope is not a path in the section */}
                <Name.Company path="/nope" />
              </Form.Section>

              <Form.SubmitButton />
            </Form.Card>
          </Form.Handler>
        )
      }}
    </ComponentBox>
  )
}

export const IterateExample = () => {
  return (
    <ComponentBox>
      {() => {
        // Derive the item type from the registered array path to type-check
        // the item-relative `itemPath` — no extra registration.
        const { String: AccountName, Number: AccountBalance } =
          Field as TypedItemField<'/accounts'>
        return (
          <Form.Handler
            defaultData={{
              firstName: 'Nora',
              age: 30,
              accounts: [
                { name: 'Savings', balance: 1000 },
                { name: 'Checking', balance: 500 },
              ],
            }}
            onSubmit={(data) => console.log('onSubmit', data)}
          >
            <Form.Card>
              <Iterate.Array path="/accounts">
                <AccountName itemPath="/name" label="Name" />
                <AccountBalance itemPath="/balance" label="Balance" />

                {/* @ts-expect-error /nope is not a path in the array item */}
                <AccountName itemPath="/nope" />
              </Iterate.Array>

              <Form.SubmitButton />
            </Form.Card>
          </Form.Handler>
        )
      }}
    </ComponentBox>
  )
}
