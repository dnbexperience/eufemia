---
title: 'Form.Section'
description: '`Form.Section` lets you compose blocks of fields and values to be reused in different contexts.'
version: 10.95.0
generatedAt: 2026-01-26T10:49:26.910Z
checksum: e125633052ef7908a2f0171cb864e12c3c898f9452212cab006b060b10d68116
---

# Form.Section

## Import

```tsx
import { Form } from '@dnb/eufemia/extensions/forms'
render(<Form.Section />)
```

## Description

`Form.Section` lets you compose together sections of fields and values to be reused in different contexts.

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Form/Section)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/Form/Section)

### Good to know

- It allows you to easily customize and reposition nested `Form.Section` components within the data context, making it effortless to reuse the same set of fields and values in various contexts. Check out the `overwriteProps` and `path` properties for more information.
- When defining a default value for a field or value, you can use the `defaultValue` property instead of `value`. It will not take precedence over the data context like `value` does.
- Use [Form.Visibility](/uilib/extensions/forms/Form/Visibility/) to handle logic and hide parts of your form based on the data context.
- To provide localization for all used texts defined in the `translations` property of the section, you can create a localization easily.
- Only imported sections with their localizations are included in the production bundle.
- It is possible to overwrite the translations later by using the `Form.Handler` component.
- A single section can be used without `Form.Handler`, just like any other field and value.
- [Form.Section.EditContainer](/uilib/extensions/forms/Form/Section/EditContainer/) and [Form.Section.ViewContainer](/uilib/extensions/forms/Form/Section/ViewContainer/) containers are available to use.
- Here is a [list of blocks](/uilib/extensions/forms/blocks/) ready to use.
- You can use `//` at the start of a field path to access data from the root of the form data context, bypassing the section path. For example, `path="//rootField"` inside a section at `/section` will access `/rootField` instead of `/section/rootField`.
- You can use `../` to reference parent section paths. Each `../` moves one section up before appending the rest of the path, letting you read or write sibling fields such as `path="../targetField"`.

## Usage

1. Create the section component and export it:

```tsx
import { Form, Field } from '@dnb/eufemia/extensions/forms'

export function MySection(props) {
  return (
    <Form.Section {...props}>
      {/* Fields*/}
      <Field.PhoneNumber path="/phoneNumber" required />

      {/* Views*/}
      <View.PhoneNumber path="/phoneNumber" />
    </Form.Section>
  )
}
```

2. Import the section component and use it in a form:

```tsx
import { Form } from '@dnb/eufemia/extensions/forms'
import { MySection } from './form-sections'

function MyForm() {
  return (
    <Form.Handler>
      <MySection />
    </Form.Handler>
  )
}
```

## Overwrite properties

It lets you overwrite all of the given properties if needed by using `overwriteProps`:

```tsx
import { Form, Field } from '@dnb/eufemia/extensions/forms'

const MySection = (props) => {
  return (
    <Form.Section {...props}>
      <Field.Name.First path="/firstName" />
      <Field.Name.Last path="/lastName" required minLength={2} />
    </Form.Section>
  )
}

render(
  <Form.Handler>
    <MySection
      overwriteProps={{
        firstName: { label: '/Custom label' },
        lastName: { required: false, minLength: 0 },
      }}
    />
  </Form.Handler>
)
```

## Optional `path` support

You can optionally define a `path` for the section component. Fields inside the section will use this path as a prefix for their own path. This makes it possible to reuse the same section component in different contexts.

```tsx
import { Form, Field } from '@dnb/eufemia/extensions/forms'

const MySection = (props) => {
  return (
    <Form.Section {...props}>
      <Field.Name.First path="/firstName" />
      <Field.Name.Last path="/lastName" />
    </Form.Section>
  )
}

render(
  <Form.Handler
    defaultData={{
      // MySection has a path="/nestedPath" and therefore it is nested in the data context
      nestedPath: {
        firstName: 'Nora',
      },
    }}
  >
    <MySection path="/nestedPath" />
  </Form.Handler>
)
```

### Accessing root data with `//`

When a field is inside a `Form.Section`, you can use a path starting with `//` to access data from the root of the form data context, bypassing the section path. This is useful when you need to reference data outside the current section.

```tsx
import { Form, Field } from '@dnb/eufemia/extensions/forms'

const MySection = (props) => {
  return (
    <Form.Section {...props}>
      {/* This field accesses data at /sectionField relative to the section */}
      <Field.String path="/sectionField" />

      {/* This field accesses data at /rootField from the root, ignoring the section path */}
      <Field.String path="//rootField" />

      {/* You can also access nested root paths */}
      <Field.String path="//user/profile/name" />
    </Form.Section>
  )
}

render(
  <Form.Handler
    defaultData={{
      rootField: 'Root value',
      user: {
        profile: {
          name: 'John Doe',
        },
      },
      section: {
        sectionField: 'Section value',
      },
    }}
  >
    <MySection path="/section" />
  </Form.Handler>
)
```

In the example above:

- The field with `path="/sectionField"` will access `/section/sectionField`
- The field with `path="//rootField"` will access `/rootField` (root level)
- The field with `path="//user/profile/name"` will access `/user/profile/name` (root level)

This feature works even with nested sections - `//` always refers to the root of the form data context.

If you want every field inside a nested `Form.Section` to bypass the parent path, set the section `path` to start with `//` as well (for example `path="//global"` or `path="//"`). This works like protocol-relative URLs in HTML and resets the section context back to the root.

### Accessing parent data with `../`

When a section is nested inside another section, you can use a path starting with `../` to access data relative to the parent section. Each `../` moves one level up the section hierarchy before the remainder of the path is appended.

```tsx
import { Form, Field } from '@dnb/eufemia/extensions/forms'

const AddressSection = (props) => {
  return (
    <Form.Section {...props}>
      <Field.String path="/street" label="Street" />
      <Field.String path="/postalCode" label="Postal code" />

      <Form.Section path="/verification">
        {/* Reads and writes the parent postal code */}
        <Field.String path="../postalCode" label="Confirm postal code" />

        {/* Goes two levels up (Form.Handler root) */}
        <Field.String path="../../customerId" label="Customer ID" />
      </Form.Section>
    </Form.Section>
  )
}

render(
  <Form.Handler
    defaultData={{
      customerId: 'ABC-123',
      address: {
        street: 'Example street 1',
        postalCode: '0123',
        verification: {},
      },
    }}
  >
    <AddressSection path="/address" />
  </Form.Handler>
)
```

In the example above:

- `path="../postalCode"` resolves to `/address/postalCode`, enabling fields inside `/address/verification` to work with the parent value.
- `path="../../customerId"` resolves to `/customerId`, since the section is nested two levels deep.
- When you chain more `../` segments than there are parent sections, the path simply starts from the root.

This makes it easy to build advanced sections where nested parts reuse sibling values without duplicating props.

## Required property

You can optionally define a `required` property for the section component. Fields inside the section will then be required.

```tsx
render(
  <Form.Section required={true}>
    <Field.Name.First path="/firstName" />
    <Field.Name.Last path="/lastName" />
  </Form.Section>
)
```

## TypeScript support

You can optionally define which properties the nested fields should accept:

```tsx
import { Form, Field, SectionProps } from '@dnb/eufemia/extensions/forms'
import type { Props as PhoneNumberProps } from '@dnb/eufemia/extensions/forms/Field/PhoneNumber'

const MySection = (
  props: SectionProps<{ phoneNumber?: PhoneNumberProps }>
) => {
  return (
    <Form.Section {...props}>
      <Field.Name.Last path="/phoneNumber" required />
    </Form.Section>
  )
}

render(
  <Form.Handler>
    <MySection />
  </Form.Handler>
)
```

## Schema support

You can also use a `schema` on the [Form.Handler](/extensions/forms/Form/Handler) to define the validation rules for the fields inside the section.

**Using Zod:**

```tsx
import { Form, Field, z } from '@dnb/eufemia/extensions/forms'

const MySection = (props) => {
  return (
    <Form.Section {...props}>
      <Field.PhoneNumber path="/phoneNumber" />
    </Form.Section>
  )
}

const formSchema = z.object({
  mySection: z.object({
    phoneNumber: z.string().regex(/^[0-9]{10}$/),
  }),
})

function MyForm() {
  return (
    <Form.Handler schema={formSchema}>
      <MySection path="/mySection" />
    </Form.Handler>
  )
}
```

**Using JSON (Ajv):**

```tsx
import {
  Form,
  Field,
  JSONSchema,
  makeAjvInstance,
} from '@dnb/eufemia/extensions/forms'

const ajv = makeAjvInstance()
const MySection = (props) => {
  return (
    <Form.Section {...props}>
      <Field.PhoneNumber path="/phoneNumber" />
    </Form.Section>
  )
}

const formSchema: JSONSchema = {
  type: 'object',
  properties: {
    mySection: {
      type: 'object',
      properties: {
        phoneNumber: {
          type: 'string',
          pattern: '^[0-9]{10}$',
        },
      },
      required: ['phoneNumber'],
    },
  },
}

function MyForm() {
  return (
    <Form.Handler schema={formSchema} ajvInstance={ajv}>
      <MySection path="/mySection" />
    </Form.Handler>
  )
}
```

### Section-level schema

You can define a `schema` directly on the `Form.Section` component. The handler or fields will automatically collect and validate all section schemas without requiring manual merging.

**Using Zod:**

```tsx
import { Form, Field, z } from '@dnb/eufemia/extensions/forms'

const sectionSchema = z.object({
  phoneNumber: z
    .string()
    .regex(/^[0-9]{10}$/)
    .optional()
    .refine((val) => val !== undefined, {
      message: 'Field.errorRequired',
    }),
})

function MyForm() {
  return (
    <Form.Handler>
      <Form.Section path="/mySection" schema={sectionSchema}>
        <Field.PhoneNumber path="/phoneNumber" />
      </Form.Section>
    </Form.Handler>
  )
}
```

**Using JSON (Ajv):**

```tsx
import {
  Form,
  Field,
  JSONSchema,
  makeAjvInstance,
} from '@dnb/eufemia/extensions/forms'

const sectionSchema: JSONSchema = {
  type: 'object',
  properties: {
    phoneNumber: {
      type: 'string',
      pattern: '^[0-9]{10}$',
    },
  },
  required: ['phoneNumber'],
}

const ajv = makeAjvInstance()

function MyForm() {
  return (
    <Form.Handler ajvInstance={ajv}>
      <Form.Section path="/mySection" schema={sectionSchema}>
        <Field.PhoneNumber path="/phoneNumber" />
      </Form.Section>
    </Form.Handler>
  )
}
```

## Translations

You can use the `translations` property to provide translations for the section:

```tsx
import { Field, Form } from '@dnb/eufemia/extensions/forms'

const translations = {
  // It's optional to wrap the translations in an additional "MySection" object
  'nb-NO': { MySection: { MyField: { label: 'Felt label' } } },
  'en-GB': { MySection: { MyField: { label: 'Field label' } } },
}

// For TypeScript support
type Translation = (typeof translations)[keyof typeof translations]

export function MySection() {
  return (
    <Form.Section translations={translations}>
      <ContentOfMySection />
    </Form.Section>
  )
}

function ContentOfMySection() {
  const { MyField } = Form.useTranslation<Translation>().MySection
  return <Field.String label={MyField.label} path="/custom" />
}
```

This way it is possible to extend or change the translations for a specific section from a `Form.Handler`:

```tsx
import { Form } from '@dnb/eufemia/extensions/forms'
import { MySection } from './form-sections'

const myTranslations = {
  'nb-NO': { MySection: { MyField: { label: 'Egendefinert' } } },
  'en-GB': { MySection: { MyField: { label: 'Custom' } } },
}

export function MyForm() {
  return (
    <Form.Handler translations={myTranslations}>
      <MySection />
    </Form.Handler>
  )
}
```

## Edit and View container

The `Form.Section` supports a [Form.Section.EditContainer](/uilib/extensions/forms/Form/Section/EditContainer/) and a [Form.Section.ViewContainer](/uilib/extensions/forms/Form/Section/ViewContainer/) container. The edit container should be used for data input with fields, while the view container is used to display the data in a read-only manner.

```tsx
import { Form, Field } from '@dnb/eufemia/extensions/forms'

function MyEditContainer() {
  return (
    <Form.Section.EditContainer>
      <Field.Name.First path="/firstName" />
      <Field.Name.Last path="/lastName" />
    </Form.Section.EditContainer>
  )
}

function MyViewContainer() {
  return (
    <Form.Section.EditContainer>
      <Value.Name.First path="/firstName" />
      <Value.Name.Last path="/lastName" />
    </Form.Section.EditContainer>
  )
}

function MySection() {
  return (
    <Form.Section>
      <MyEditContainer />
      <MyViewContainer />
    </Form.Section>
  )
}

render(
  <Form.Handler>
    <MySection />
    <Form.SubmitButton />
  </Form.Handler>
)
```

Note: The reason `Done` is used in the toolbar button instead of `Save` is because validation is performed in fields. If we decouple the data entered in a section, the `Form.Handler` will not be able to validate the data on submit. This can also lead to missing data because the user can press the submit button before `Save` is pressed.

## Snapshot testing of a section (block)

One way to ensure a "contract" of what you expect a section to be outlined as, is to create a snapshot test:

```tsx
import { Form, Tools } from '@dnb/eufemia/extensions/forms'
import { GenerateRef } from '@dnb/eufemia/extensions/forms/Tools/ListAllProps'

it('MySection should match snapshot', () => {
  const generateRef = React.createRef<GenerateRef>()

  render(
    <Form.Handler>
      <Tools.ListAllProps generateRef={generateRef}>
        <MySection />
      </Tools.ListAllProps>
    </Form.Handler>
  )

  const { propsOfFields, propsOfValues } = generateRef.current()
  expect(propsOfFields).toMatchInlineSnapshot(`...`)
  expect(propsOfValues).toMatchInlineSnapshot(`...`)
})
```

## Demos

### Without Form.Handler

```tsx
render(
  <Form.Section
    data={{
      myField: 'Value',
    }}
    onChange={console.log}
  >
    <Field.String path="/myField" />
  </Form.Section>
)
```

### With a nested path

This lets you reuse the same section of fields in multiple places in your forms.

```tsx
const MyNameSection = (props: SectionProps) => {
  return (
    <Form.Section {...props}>
      <Form.Card>
        <Field.Name.First path="/firstName" />
        <Field.Name.Last path="/lastName" />
      </Form.Card>
    </Form.Section>
  )
}
render(
  <Form.Handler
    onSubmit={async (data) => console.log('onSubmit', data)}
    defaultData={{
      nestedPath: {
        firstName: 'Nora',
        lastName: 'Mørk',
      },
    }}
  >
    <MyNameSection path="/nestedPath" />
    <Form.SubmitButton variant="send" />
  </Form.Handler>
)
```

### With a Edit and View container

This example uses the [Form.Section.EditContainer](/uilib/extensions/forms/Form/Section/EditContainer/) and [Form.Section.ViewContainer](/uilib/extensions/forms/Form/Section/ViewContainer/) containers with the default `variant="outline"`.

```tsx
const MyEditContainer = () => {
  return (
    <Form.Section.EditContainer>
      <Field.Name.First path="/firstName" />
      <Field.Name.Last path="/lastName" />
    </Form.Section.EditContainer>
  )
}
const MyViewContainer = () => {
  return (
    <Form.Section.ViewContainer>
      <Value.SummaryList>
        <Value.Name.First path="/firstName" />
        <Value.Name.Last path="/lastName" />
      </Value.SummaryList>
    </Form.Section.ViewContainer>
  )
}
render(
  <Form.Handler
    onSubmit={async (data) => console.log('onSubmit', data)}
    defaultData={{
      nestedPath: {
        firstName: 'Nora',
        lastName: 'Mørk',
      },
    }}
  >
    <Form.Card>
      <Form.SubHeading>Your account</Form.SubHeading>
      <Form.Section path="/nestedPath" required>
        <MyEditContainer />
        <MyViewContainer />
      </Form.Section>
    </Form.Card>
    <Form.SubmitButton />
  </Form.Handler>
)
```

### Show errors on the whole section

When a field in the section has an error and the section has `containerMode` set to `auto` (default), the whole section will switch to edit mode. The errors will be shown when `validateInitially` is set to `true`.

```tsx
const MyEditContainer = () => {
  return (
    <Form.Section.EditContainer>
      <Field.Name.First path="/firstName" />
      <Field.Name.Last path="/lastName" />
    </Form.Section.EditContainer>
  )
}
const MyViewContainer = () => {
  return (
    <Form.Section.ViewContainer>
      <Value.SummaryList>
        <Value.Name.First path="/firstName" />
        <Value.Name.Last path="/lastName" />
      </Value.SummaryList>
    </Form.Section.ViewContainer>
  )
}
render(
  <Form.Handler
    onSubmit={async (data) => console.log('onSubmit', data)}
    defaultData={{
      nestedPath: {
        firstName: 'Nora',
        lastName: undefined, // initiate error
      },
    }}
  >
    <Form.Card>
      <Form.SubHeading>Your account</Form.SubHeading>
      <Form.Section path="/nestedPath" required validateInitially>
        <MyEditContainer />
        <MyViewContainer />
      </Form.Section>
    </Form.Card>
    <Form.SubmitButton />
  </Form.Handler>
)
```

### Using `variant="basic"`

Using `variant="basic"` will render the view and edit container without the additional Card `outline`.

```tsx
const MyEditContainer = () => {
  return (
    <Form.Section.EditContainer variant="basic">
      <Field.Name.First path="/firstName" />
      <Field.Name.Last path="/lastName" />
    </Form.Section.EditContainer>
  )
}
const MyViewContainer = () => {
  return (
    <Form.Section.ViewContainer variant="basic">
      <Value.SummaryList>
        <Value.Name.First path="/firstName" />
        <Value.Name.Last path="/lastName" />
      </Value.SummaryList>
    </Form.Section.ViewContainer>
  )
}
render(
  <Form.Handler
    onSubmit={async (data) => console.log('onSubmit', data)}
    defaultData={{
      nestedPath: {
        firstName: 'Nora',
        lastName: 'Mørk',
      },
    }}
  >
    <Form.Card>
      <Form.SubHeading>Your account</Form.SubHeading>
      <Form.Section path="/nestedPath" required>
        <MyEditContainer />
        <MyViewContainer />
      </Form.Section>
    </Form.Card>
    <Form.SubmitButton />
  </Form.Handler>
)
```

### Overwrite properties

Overwriting properties makes it very flexible to reuse the same section of fields in multiple places in your forms.

```tsx
const MyNameSection = (props) => {
  return (
    <Form.Section {...props}>
      <Form.Card>
        <Field.Composition width="large">
          <Field.Name.First path="/firstName" />
          <Field.Name.Last path="/lastName" required minLength={10} />
        </Field.Composition>
      </Form.Card>
    </Form.Section>
  )
}
render(
  <Form.Handler
    onSubmit={async (data) => console.log('onSubmit', data)}
    defaultData={{
      nestedPath: {
        firstName: '',
        lastName: 'M',
      },
    }}
  >
    <MyNameSection
      path="/nestedPath"
      overwriteProps={{
        firstName: {
          required: true,
          label: 'Custom',
        },
        lastName: {
          required: false,
          minLength: 2,
        },
      }}
    />
    <Form.SubmitButton variant="send" />
  </Form.Handler>
)
```

### Schema support

This feature lets you extend the requirements of the fields in the section with a [JSON Schema](/uilib/extensions/forms/all-features/#schema-validation).

```tsx
const MyNameSection = (props: SectionProps) => {
  return (
    <Form.Section {...props}>
      <Form.Card>
        <Field.Composition width="large">
          <Field.Name.First path="/firstName" />
          <Field.Name.Last path="/lastName" required minLength={10} />
        </Field.Composition>
      </Form.Card>
    </Form.Section>
  )
}
const mySchema: JSONSchema = {
  type: 'object',
  properties: {
    nestedPath: {
      type: 'object',
      properties: {
        firstName: {
          type: 'string',
          minLength: 3,
        },
        lastName: {
          type: 'string',
          minLength: 2,
        },
      },
      required: ['firstName', 'lastName'],
    },
  },
}
const ajv = makeAjvInstance()
render(
  <Form.Handler
    onSubmit={async (data) => console.log('onSubmit', data)}
    schema={mySchema}
    ajvInstance={ajv}
    defaultData={{
      nestedPath: {
        firstName: '',
        lastName: 'M',
      },
    }}
  >
    <MyNameSection path="/nestedPath" />
    <Form.SubmitButton variant="send" />
  </Form.Handler>
)
```

### Section level Zod schema

You can also use a Zod schema to validate the data in the section.

```tsx
const sectionSchema = z.object({
  firstName: z
    .string()
    .min(4, 'StringField.errorMinLength')
    .optional()
    .refine(...asRequired('FirstName.errorRequired')),
  lastName: z
    .string()
    .min(5, 'StringField.errorMinLength')
    .optional()
    .refine(...asRequired('LastName.errorRequired')),
})
render(
  <Form.Handler>
    <Flex.Stack>
      <Form.Section path="/customer" schema={sectionSchema}>
        <Field.Composition width="large">
          <Field.Name.First path="/firstName" label="Given name" />
          <Field.Name.Last path="/lastName" label="Surname" />
        </Field.Composition>
      </Form.Section>
      <Form.SubmitButton />
      <Tools.Log label="Data" />
      <Tools.Errors label="Errors" />
    </Flex.Stack>
  </Form.Handler>
)
```

### Required support

You can easily make a section of fields required by setting the `required` property on the section itself.

```tsx
const MyNameSection = (props: SectionProps) => {
  return (
    <Form.Section {...props}>
      <Form.Card>
        <Field.Composition width="large">
          <Field.Name.First path="/firstName" />
          <Field.Name.Last path="/lastName" />
        </Field.Composition>
      </Form.Card>
    </Form.Section>
  )
}
const schema: JSONSchema = {
  type: 'object',
  required: ['myRequiredSection'],
}
const ajv = makeAjvInstance()
render(
  <Flex.Stack>
    <Form.Handler onSubmit={async (data) => console.log('onSubmit', data)}>
      <MyNameSection required />
      <Form.SubmitButton variant="send" />
    </Form.Handler>

    <Form.Handler
      onSubmit={async (data) => console.log('onSubmit', data)}
      schema={schema}
      ajvInstance={ajv}
    >
      <MyNameSection path="/myRequiredSection" />
      <Form.SubmitButton variant="send" />
    </Form.Handler>
  </Flex.Stack>
)
```

### Nested sections

You can nest sections inside each other.

```tsx
return (
  <Form.Handler
    onSubmit={async (data) => console.log('onSubmit', data)}
    defaultData={{
      nestedPath: {
        name: {
          first: 'Nora',
          last: 'Mørk',
        },
        address: {
          street: 'Strøget',
          nr: '',
        },
      },
    }}
  >
    <MySection path="/nestedPath" required />
    <Form.SubmitButton variant="send" />
  </Form.Handler>
)
function MySection(props: SectionProps) {
  return (
    <Form.Section {...props}>
      <Form.Card>
        <MyNameSection path="/name" />
        <MyAddressSection path="/address" />
        <MyValueSection />
      </Form.Card>
    </Form.Section>
  )
}
function MyNameSection(props: SectionProps) {
  return (
    <Form.Section {...props}>
      <Field.Composition width="large">
        <Field.Name.First path="/first" />
        <Field.Name.Last path="/last" />
      </Field.Composition>
    </Form.Section>
  )
}
function MyAddressSection(props: SectionProps) {
  return (
    <Form.Section {...props}>
      <Field.Composition width="large">
        <Field.String label="Gateadresse" path="/street" width="stretch" />
        <Field.String label="Nr." path="/nr" width="small" />
      </Field.Composition>
    </Form.Section>
  )
}
function MyValueSection(props: SectionProps) {
  return (
    <Form.Section {...props}>
      <Value.SummaryList>
        <Form.Section path="/name">
          <Value.Composition gap="small">
            <Value.Name.First path="/first" />
            <Value.Name.Last path="/last" />
          </Value.Composition>
        </Form.Section>

        <Form.Section path="/address">
          <Value.Composition gap="small">
            <Value.String label="Gateadresse" path="/street" />
            <Value.String label="Nr." path="/nr" placeholder="–" />
          </Value.Composition>
        </Form.Section>
      </Value.SummaryList>
    </Form.Section>
  )
}
```

### With Visibility logic

The [Form.Visibility](/uilib/extensions/forms/Form/Visibility/) component lets you show or hide parts of your form based on the data given in the section itself.

```tsx
const MySection = ({ children, ...props }) => {
  return (
    <Form.Section {...props}>
      <Form.Card>
        <Field.Boolean
          label="Are you sure?"
          variant="buttons"
          path="/iAmSure"
        />
        <Form.Visibility pathTrue="/iAmSure" animate>
          <Field.Selection
            label="Choose"
            variant="radio"
            path="/mySelection"
          >
            <Field.Option value="less" title="Less" />
            <Field.Option value="more" title="More" />
          </Field.Selection>

          <Form.Visibility
            visibleWhen={{
              path: '/mySelection',
              hasValue: 'more',
            }}
            animate
          >
            <Field.String label="My String" path="/myString" />
          </Form.Visibility>
        </Form.Visibility>

        {children}
      </Form.Card>

      <Tools.Log />
    </Form.Section>
  )
}
render(
  <Form.Handler
    onChange={console.log}
    defaultData={{
      nestedPath: {
        iAmSure: false,
        mySelection: 'less',
        myString: 'has a value',
      },
    }}
  >
    <MySection path="/nestedPath">
      <Form.Visibility
        visibleWhen={{
          path: '/myString',
          hasValue: (value) => value !== 'has a value',
        }}
        animate
      >
        <P>
          Result: <Value.String path="/nestedPath/myString" inline />
        </P>
      </Form.Visibility>
    </MySection>
  </Form.Handler>
)
```

## Properties

```json
{
  "path": {
    "doc": "A path to the section (JSON Pointer). When defined, fields inside the section will get this path as a prefix of their own path.",
    "type": "string",
    "status": "optional"
  },
  "overwriteProps": {
    "doc": "Overwrite field props for the section.",
    "type": "object",
    "status": "optional"
  },
  "translation": {
    "doc": "Provide a translation for the section (e.g. `{'nb-NO': { MySection: { MyField: { label: 'Custom' }}}}`).",
    "type": "object",
    "status": "optional"
  },
  "required": {
    "doc": "Makes all fields inside it required.",
    "type": "boolean",
    "status": "optional"
  },
  "validateInitially": {
    "doc": "If set to `true`, the whole section will be validated initially. All fields will then automatically get `validateInitially` and show their error messages. Can be useful in combination with `containerMode=\"auto\"`.",
    "type": "boolean",
    "status": "optional"
  },
  "defaultData": {
    "doc": "Provide default data to the section fields and values, in case the data context (Form.Handler) is not available.",
    "type": "object",
    "status": "optional"
  },
  "data": {
    "doc": "Provide data to the section fields and values, in case the data context (Form.Handler) is not available.",
    "type": "object",
    "status": "optional"
  },
  "containerMode": {
    "doc": "Defines the container mode. Can be `view`, `edit` or `auto`. When set to `auto`, the mode will initially be \"edit\" if fields contain errors. Defaults to `auto`.",
    "type": "string",
    "status": "optional"
  },
  "disableEditing": {
    "doc": "If set to `true`, the section will stay in view mode and hide the edit toolbar.",
    "type": "boolean",
    "status": "optional"
  },
  "children": {
    "doc": "All the fields and values inside the section.",
    "type": "React.Node",
    "status": "optional"
  }
}
```

## Translations

```json
{
  "locales": ["da-DK", "en-GB", "nb-NO", "sv-SE"],
  "entries": {
    "SectionEditContainer.cancelButton": {
      "nb-NO": "Avbryt",
      "en-GB": "Cancel",
      "sv-SE": "Avbryt",
      "da-DK": "Annuller"
    },
    "SectionEditContainer.confirmCancelText": {
      "nb-NO": "Er du sikker på at du vil forkaste endringene?",
      "en-GB": "Are you sure you want to discard your changes?",
      "sv-SE": "Är du säker på att du vill ångra dina ändringar?",
      "da-DK": "Er du sikker på, at du vil forkaste dine ændringer?"
    },
    "SectionEditContainer.doneButton": {
      "nb-NO": "Ferdig",
      "en-GB": "Done",
      "sv-SE": "Klar",
      "da-DK": "Færdig"
    },
    "SectionEditContainer.errorInSection": {
      "nb-NO": "Feilene ovenfor må rettes.",
      "en-GB": "Please correct the errors above.",
      "sv-SE": "Felen ovan måste åtgärdas.",
      "da-DK": "Fejlene ovenfor skal rettes."
    },
    "SectionViewContainer.editButton": {
      "nb-NO": "Endre",
      "en-GB": "Edit",
      "sv-SE": "Ändra",
      "da-DK": "Rediger"
    }
  }
}
```

## Events

### Section-specific events

```json
{
  "onChange": {
    "doc": "Will be called when a value of a field was changed by the user, with the data set (including the changed value) as argument.",
    "type": "function",
    "status": "optional"
  }
}
```
