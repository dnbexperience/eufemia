---
title: 'Form.SchemaValidation'
description: 'Schema validation can be done with a JSON Schema which makes it possible to describe the data structure and validation needs, both for the individual value, and more complex rules across the data set.'
version: 10.95.0
generatedAt: 2026-01-26T10:49:26.962Z
checksum: 090b7d977ba4be5e2c4c04d199a30a4048416c59f443a56985df2f80629d9c40
---

# Form.SchemaValidation

## Table of Contents

- [About schemas](#about-schemas)
- [Using schema with DataContext](#using-schema-with-datacontext)
- [Fields which are disabled or read-only](#fields-which-are-disabled-or-read-only)
- [JSONSchema and TypeScript](#jsonschema-and-typescript)
- [Complex schemas](#complex-schemas)
  - [Custom Ajv instance and keywords](#custom-ajv-instance-and-keywords)
  - [Custom Ajv keyword in a field](#custom-ajv-keyword-in-a-field)
  - [Custom error messages](#custom-error-messages)
- [Generate schema from fields](#generate-schema-from-fields)

## About schemas

** Recommendation: Use Zod schemas when possible**

Zod schemas are the preferred choice for validation as they:

- Work out of the box without additional dependencies
- Provide better TypeScript integration
- Are more performant
- Have a more intuitive API

JSON Schema validation is still supported but requires explicitly providing an AJV instance.

JSON Schema is a vocabulary for annotating and validating data in js. More about JSON Schema on [json-schema.org](https://json-schema.org/)

A schema can be used from the simplest description of the data type of a value:

```js
{
  type: 'string'
}
```

Results in:

```json
"Foo"
```

To an object with both rules for required fields and validation rules for single values:

```js
{
  type: "object",
  properties: {
    textField: { type: 'string', minLength: 5 },
    numberField: { type: 'number', maximum: 100 },
  },
  required: ['textField']
}
```

Results in:

```json
{
  "textField": "abcde",
  "numberField": 123
}
```

## Using schema with Form.Handler (DataContext)

These two examples will result in the same validation for the user:

```jsx
<Form.Handler data={user}>
  <Field.String path="/name" label="Name" minLength={3} required />
  <Field.Email path="/email" label="E-mail" required />
  <Field.Number
    path="/birthyear"
    label="Birth year"
    minimum={1900}
    maximum={2023}
    required
  />
</Form.Handler>
```

vs.

```tsx
import { Form, Field, z, makeAjvInstance } from '@dnb/eufemia/extensions/forms'

const schema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  birthyear: z.number().min(1900).max(2023),
})

<Form.Handler data={user} schema={schema}>
  <Field.String path="/name" label="Name" />
  <Field.Email path="/email" label="E-mail" />
  <Field.Number path="/birthyear" label="Birth year" />
</Form.Handler>
```

**Using JSON Schema (Ajv)**

```tsx
import { JSONSchema, makeAjvInstance } from '@dnb/eufemia/extensions/forms'

const ajv = makeAjvInstance()
const schema: JSONSchema = {
  properties: {
    name: { minLength: 3 },
    email: { type: 'string' },
    birthyear: { minimum: 1900, maximum: 2023 },
  },
  required: ['name', 'email', 'birthyear'],
}

<Form.Handler data={user} schema={schema} ajvInstance={ajv}>
  <Field.String path="/name" label="Name" />
  <Field.Email path="/email" label="E-mail" />
  <Field.Number path="/birthyear" label="Birth year" />
</Form.Handler>
```

This makes it possible to create a uniform, testable description and requirements specification for the data, which can be tested independently of frontend code, and used across systems, e.g. frontend and backend.

Also, note you can describe the schema without using the `type` property, as the type is inferred from schema type. More on that topic in the [Ajv docs](https://ajv.js.org/guide/typescript.html#utility-types-for-schemas).

## Fields which are disabled or read-only

Fields which have the `disabled` property or the `readOnly` property, will skip validation.

## Zod schemas and TypeScript

For better TypeScript integration, consider using Zod schemas instead:

```ts
import { z } from '@dnb/eufemia/extensions/forms'

const schema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  birthyear: z.number().min(1900).max(2023),
})

// The type is automatically inferred
type UserData = z.infer<typeof schema>
```

## JSONSchema and TypeScript

You can import the `JSONSchema` type from the `@dnb/eufemia/extensions/forms` package.

```ts
import { JSONSchema } from '@dnb/eufemia/extensions/forms'
```

It's a shorthand for `JSONSchema7`.

You can also use the utility `JSONSchemaType` type, so you can validate your data types.

**NB:** This requires `strictNullChecks` in the `tsconfig` settings to be true.

```ts
import { JSONSchemaType } from '@dnb/eufemia/extensions/forms'

type MyData = {
  foo: number
  bar?: string
}

const schema: JSONSchemaType<MyData> = {
  type: 'object',
  properties: {
    foo: { type: 'integer' },
    bar: { type: 'string', nullable: true },
  },
  required: ['foo'],
}
```

## Complex schemas

In addition to basic validation as in the example above, JSON Schema can be used for more complex. Examples of definitions supported by the standard are:

- Requirement that the object must not have other properties than those defined in `properties`.
- Nested data structures and combinations of objects and arrays with rules for array elements (fixed or repetitive elements).
- Regular expressions for the syntax of individual values.
- Enum (a set of valid values).
- Rules for the number of elements in arrays.
- Rules for the number of properties in objects.
- Predefined format rules (e.g., 'uri', 'email' and 'hostname').
- Logical operators such as 'not', 'oneOf', 'allOf' and 'anyOf' which can be filled with rules for all or part of the data set.
- Rule set based on the content of values (if-then-else).
- Rules (sub-schemas) that become applicable if a given value is present.
- Reuse within the definition, such as one and the same object structure being used as a definition for several locations in a structure.

To learn more about what is possible with the JSON Schema standard, see [json-schema.org](https://json-schema.org/).

### Custom Ajv instance and keywords

You can provide your custom `validate` function with your own keywords to your schema. Below are two examples of how to do that.

First, you need to create your won instance of Ajv:

```ts
import { makeAjvInstance } from '@dnb/eufemia/extensions/forms'
import Ajv from 'ajv/dist/2020'

const ajv = makeAjvInstance(
  new Ajv({
    strict: true,
    allErrors: true,
  })
)
```

Then you add your custom keyword to the Ajv instance:

```ts
// Add a custom keyword 'isEven'
ajv.addKeyword({
  keyword: 'isEven',
  validate: (schema, value) => {
    // Check if the number is even.
    return value % 2 === 0
  },
})

// Now we can use the 'isEven' keyword in our schema.
const schema = {
  type: 'object',
  properties: {
    myKey: {
      type: 'string',
      isEven: true, // The number must be even.
    },
  },
} as const
```

Use `as const` to make sure the schema is not inferred as `JSONSchema7` but as a literal type.

And finally add the Ajv instance to your form:

```tsx
import {
  Form,
  Field,
  makeAjvInstance,
} from '@dnb/eufemia/extensions/forms'

render(
  <Form.Handler schema={schema} ajvInstance={makeAjvInstance()}>
    <Field.String path="/myKey" value="1" validateInitially />
  </Form.Handler>
)
```

### Custom Ajv keyword in a field

Here is another example of a custom keyword, used in one field only:

```tsx
import {
  Form,
  Field,
  makeAjvInstance,
} from '@dnb/eufemia/extensions/forms'

const ajv = makeAjvInstance({
  strict: true,
  allErrors: true,
})

ajv.addKeyword({
  keyword: 'notEmpty',
  validate: (schema, value) => {
    return value.length > 0
  },
})

const schema = {
  type: 'string',
  notEmpty: true, // The value must be more than one character.
} as const

render(
  <Form.Handler ajvInstance={ajv}>
    <Field.String
      schema={schema}
      path="/myKey"
      value=""
      validateInitially
    />
  </Form.Handler>
)
```

You can find more info about error messages in the [Error messages](/uilib/extensions/forms/Form/error-messages/) docs.

### Custom error messages

When having a custom keyword, you can provide custom error message on four levels with the `errorMessage` or `errorMessages` property:

1. On the schema level.
2. On the Form.Handler (Provider) level.
3. On the Form.Handler (Provider) level with a JSON Pointer path.
4. On the field level.

The levels are prioritized in the order above, so the field level error message will overwrite all other levels.

Here is an example of how to do that:

```tsx
const schema = {
  type: 'string',
  notEmpty: true, // The value must be more than one character.
  // Level 1
  errorMessage: 'You can provide a custom message in the schema itself',
} as const

render(
  <Form.Handler
    ajvInstance={ajv}
    errorMessages={{
      // Level 2
      notEmpty: 'Or on the provider',
      '/myKey': {
        // Level 3
        notEmpty: 'Or on the provider for just one field',
      },
    }}
  >
    <Field.String
      schema={schema}
      path="/myKey"
      value=""
      validateInitially
      errorMessages={{
        // Level 4
        notEmpty: 'Or on a single Field itself',
      }}
    />
  </Form.Handler>
)
```

You can find more info about error messages in the [Error messages](/uilib/extensions/forms/Form/error-messages/) docs.

## Generate schema from fields

You can also generate a Ajv schema from a set of fields, by using the `log` property on the `Tools.GenerateSchema` component. I will console log the generated schema.

```tsx
import { Form, Field, Tools } from '@dnb/eufemia/extensions/forms'

render(
  <Form.Handler>
    <Tools.GenerateSchema log>
      <Field.String path="/myString" pattern="^[a-z]{2}[0-9]+$" required />
    </Tools.GenerateSchema>
  </Form.Handler>
)
```

```json
// console.log output:
{
  "properties": {
    "myString": { "type": "string", "pattern": "^[a-z]{2}[0-9]+$" }
  },
  "required": ["myString"],
  "type": "object"
}
```

Or by using the `generateRef` property on the `Tools.GenerateSchema` component. Here is an example of how to do that within a test:

```tsx
import { Form, Field, Tools } from '@dnb/eufemia/extensions/forms'

it('should match generated schema snapshot', () => {
  const generateRef = React.createRef<>()

  render(
    <Form.Handler>
      <Tools.GenerateSchema generateRef={generateRef}>
        <Field.Name.First path="/firstName" />
        <Field.Name.Last path="/lastName" minLength={2} required />
      </Tools.GenerateSchema>
    </Form.Handler>
  )

  const { schema } = generateRef.current()
  expect(schema).toMatchInlineSnapshot(`
    {
      "type": "object",
      "properties": {
        "firstName": {
          "type": "string",
          "pattern": "^[\\p{L}\\p{M} \\-]+$",
        },
        "lastName": {
          "type": "string",
          "minLength": 2,
          "pattern": "^[\\p{L}\\p{M} \\-]+$",
        },
      },
      "required": [
        "lastName",
      ],
    }
  `)
})
```

- [Demos](#demos)
  - [Schema for single field](#schema-for-single-field)
  - [Schema for a whole data set](#schema-for-a-whole-data-set)
  - [Schema with if-rule](#schema-with-if-rule)
  - [Dependent list schema](#dependent-list-schema)
  - [Dependent schema across sections](#dependent-schema-across-sections)
  - [Dependent schema using Zod](#dependent-schema-using-zod)

## Demos

### Schema for single field

```tsx
const ajv = makeAjvInstance()
const schema = {
  type: 'string',
  minLength: 5,
}
render(
  <Form.Handler ajvInstance={ajv}>
    <Field.String schema={schema} />
  </Form.Handler>
)
```

### Schema for a whole data set

```tsx
const ajv = makeAjvInstance()
const schema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
      minLength: 2,
    },
    address: {
      type: 'string',
      minLength: 3,
    },
  },
  required: ['name', 'address'],
}
render(
  <Form.Handler
    data={{
      address: 'Prefilled address',
    }}
    schema={schema}
    ajvInstance={ajv}
  >
    <Form.Card bottom="small">
      <Form.MainHeading>Company information</Form.MainHeading>

      <Field.String path="/name" label="Name" />
      <Field.String path="/address" label="Address" />
    </Form.Card>

    <Form.SubmitButton />
  </Form.Handler>
)
```

### Schema with if-rule

```tsx
const ajv = makeAjvInstance()
const schema = {
  type: 'object',
  properties: {
    name: {
      type: 'string',
    },
    customerType: {
      type: 'string',
      enum: ['corporate', 'private'],
    },
    companyName: {
      type: 'string',
    },
  },
  if: {
    properties: {
      customerType: {
        enum: ['corporate'],
      },
    },
    required: ['customerType'],
  },
  then: {
    required: ['name', 'companyName'],
  },
  else: {
    required: ['name'],
  },
}
render(
  <Form.Handler schema={schema} ajvInstance={ajv}>
    <Form.Card>
      <Form.MainHeading>Customer information</Form.MainHeading>

      <Field.String path="/name" label="Name" />
      <Field.String
        path="/customerType"
        label="Customer type (corporate or private)"
      />
      <Field.Name.Company
        path="/companyName"
        labelDescription="Company name (required for corporate customers)"
      />
    </Form.Card>

    <Form.SubmitButton />
  </Form.Handler>
)
```

### Dependent list schema

Becoming a new customer, this form requires at least one normal account
to be added, unless the customer opens a BSU account, then normal
accounts can still be added, but is optional.

```tsx
const ajv = makeAjvInstance()
const schema = {
  type: 'object',
  definitions: {
    account: {
      type: 'object',
      properties: {
        accountNumber: {
          type: 'string',
          pattern: '^[0-9]{11}$',
        },
        alias: {
          type: 'string',
          minLength: 2,
          maxLength: 32,
        },
      },
      required: ['accountNumber'],
    },
  },
  properties: {
    name: {
      type: 'string',
    },
    email: {
      type: 'string',
    },
    phone: {
      type: 'string',
    },
    accounts: {
      type: 'array',
      items: {
        $ref: '#/definitions/account',
      },
    },
    bsuAccount: {
      $ref: '#/definitions/account',
    },
  },
  oneOf: [
    {
      properties: {
        accounts: {
          type: 'array',
          minItems: 1,
        },
      },
    },
    {
      properties: {
        accounts: {
          type: 'array',
          minItems: 0,
        },
        bsuAccount: {
          type: 'object',
          required: ['accountNumber'],
        },
      },
      required: ['bsuAccount'],
    },
  ],
}
render(
  <Form.Handler
    data={{
      accounts: [{}],
    }}
    schema={schema}
    ajvInstance={ajv}
  >
    <Flex.Vertical>
      <Form.MainHeading>Customer information</Form.MainHeading>
      <Form.Card>
        <Field.String path="/name" label="Name" />
        <Field.Email path="/email" label="E-mail" />
        <Field.PhoneNumber path="/phone" label="Phone number" />
      </Form.Card>

      <Form.MainHeading>Accounts</Form.MainHeading>
      <Form.Card>
        <Form.SubHeading>Standard accounts</Form.SubHeading>

        <Iterate.Array path="/accounts">
          <Flex.Horizontal align="flex-end">
            <Field.BankAccountNumber
              itemPath="/accountNumber"
              label="Account number"
            />
            <Field.String itemPath="/alias" label="Alias" width="medium" />
            <Iterate.RemoveButton />
          </Flex.Horizontal>
        </Iterate.Array>

        <Iterate.PushButton
          text="Add account"
          path="/accounts"
          pushValue={{}}
        />

        <Form.SubHeading>BSU Account</Form.SubHeading>
        <Field.BankAccountNumber
          path="/bsuAccount/accountNumber"
          label="Account number"
        />
        <Field.String path="/bsuAccount/alias" label="Alias" />
      </Form.Card>

      <Form.SubmitButton />
    </Flex.Vertical>
  </Form.Handler>
)
```

### Dependent schema across sections

This schema validates fields across different sections based on the value of
another field.

```tsx
const ajv = makeAjvInstance()
const counts = [1, 2, 3]
const schema = {
  type: 'object',
  properties: {
    members: {
      type: 'object',
      properties: {
        numberOfMembers: {
          type: 'integer',
        },
      },
      required: ['numberOfMembers'],
    },
    beneficialOwners: {
      type: 'object',
      properties: {
        addedExistingBeneficialOwners: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              name: {
                type: 'string',
              },
            },
            required: ['name'],
          },
        },
      },
    },
  },
  dependentSchemas: {
    members: {
      allOf: [
        // Handle count = 0: array must be empty
        {
          if: {
            properties: {
              members: {
                type: 'object',
                properties: {
                  numberOfMembers: {
                    const: 0,
                  },
                },
                required: ['numberOfMembers'],
              },
            },
          },
          then: {
            properties: {
              beneficialOwners: {
                type: 'object',
                properties: {
                  addedExistingBeneficialOwners: {
                    type: 'array',
                    maxItems: 0,
                  },
                },
              },
            },
          },
        },
        // Handle count = 1, 2, or 3: array must match exactly
        ...counts.map((count) => ({
          if: {
            properties: {
              members: {
                type: 'object',
                properties: {
                  numberOfMembers: {
                    const: count,
                  },
                },
                required: ['numberOfMembers'],
              },
            },
          },
          then: {
            required: ['beneficialOwners'],
            properties: {
              beneficialOwners: {
                type: 'object',
                properties: {
                  addedExistingBeneficialOwners: {
                    type: 'array',
                    minItems: count,
                    maxItems: count,
                  },
                },
                required: ['addedExistingBeneficialOwners'],
              },
            },
          },
        })),
      ],
    },
  },
}
render(
  <Form.Handler schema={schema} ajvInstance={ajv}>
    <Flex.Stack>
      <Form.Card>
        <Form.MainHeading>Membership</Form.MainHeading>
        <Field.Number
          path="/members/numberOfMembers"
          label="Number of members (1-3)"
          width="small"
          startWith={-1}
          showStepControls
        />
      </Form.Card>

      <Form.Card>
        <Form.SubHeading>Beneficial owners</Form.SubHeading>
        <Iterate.Array
          path="/beneficialOwners/addedExistingBeneficialOwners"
          errorMessages={{
            minItems: 'You must add {minItems} existing owners.',
          }}
          animate
        >
          <Section
            innerSpace={{
              top: 'small',
              bottom: 'small',
            }}
            bottom
            backgroundColor="lavender"
          >
            <Field.String itemPath="/name" label="Owner name {itemNo}" />
            <Iterate.RemoveButton />
          </Section>
        </Iterate.Array>
        <Iterate.PushButton
          path="/beneficialOwners/addedExistingBeneficialOwners"
          pushValue={{}}
          text="Add beneficiary"
        />
      </Form.Card>

      <Form.SubmitButton text="Show errors" />

      <Tools.Log label="Form data" />
      <Tools.Errors label="Errors" />
    </Flex.Stack>
  </Form.Handler>
)
```

### Dependent schema using Zod

This schema is using `Zod` for validation, and validates fields across different sections based on the value of another field.

```tsx
const counts = [1, 2, 3]
const ownerSchema = z.object({
  name: z.string().optional(),
})
const schema = z
  .object({
    members: z
      .object({
        numberOfMembers: z.number().int().optional(),
      })
      .optional(),
    beneficialOwners: z
      .object({
        addedExistingBeneficialOwners: z.array(ownerSchema).optional(),
      })
      .optional(),
  })
  .superRefine((value, ctx) => {
    // numberOfMembers is always required
    if (!value.members || value.members.numberOfMembers === undefined) {
      ctx.addIssue({
        code: 'custom',
        path: ['members', 'numberOfMembers'],
        message: 'Field.errorRequired',
      })
      return // stop further validation
    }
    const count = value.members.numberOfMembers

    // Check if count matches one of the expected values (1, 2, or 3)
    // This matches the AJV dependentSchemas logic with allOf and if/then
    if (counts.includes(count)) {
      // If count matches, beneficialOwners is required
      if (!value.beneficialOwners) {
        ctx.addIssue({
          code: 'custom',
          path: ['beneficialOwners'],
          message: 'Field.errorRequired',
        })
        return // stop further validation
      }

      // addedExistingBeneficialOwners is required
      if (!value.beneficialOwners.addedExistingBeneficialOwners) {
        ctx.addIssue({
          code: 'custom',
          path: ['beneficialOwners', 'addedExistingBeneficialOwners'],
          message: 'Field.errorRequired',
        })
        return // stop further validation
      }
      const ownersLength =
        value.beneficialOwners.addedExistingBeneficialOwners.length
      const path = ['beneficialOwners', 'addedExistingBeneficialOwners']

      // Validate array length matches count exactly
      if (ownersLength < count) {
        ctx.addIssue({
          code: 'custom',
          path,
          message: 'IterateArray.errorMinItems',
          messageValues: {
            minItems: count,
          },
        })
      }
      if (ownersLength > count) {
        ctx.addIssue({
          code: 'custom',
          path,
          message: 'IterateArray.errorMaxItems',
          messageValues: {
            maxItems: count,
          },
        })
      }

      // Validate that each owner has a name (required)
      value.beneficialOwners.addedExistingBeneficialOwners.forEach(
        (owner, index) => {
          if (!owner.name) {
            ctx.addIssue({
              code: 'custom',
              path: [
                'beneficialOwners',
                'addedExistingBeneficialOwners',
                index,
                'name',
              ],
              message: 'Field.errorRequired',
            })
          }
        }
      )
    }

    // Validate array length sync for all count values (including 0)
    if (
      value.beneficialOwners?.addedExistingBeneficialOwners &&
      Array.isArray(value.beneficialOwners.addedExistingBeneficialOwners)
    ) {
      const ownersLength =
        value.beneficialOwners.addedExistingBeneficialOwners.length
      const path = ['beneficialOwners', 'addedExistingBeneficialOwners']

      // If count is not in the expected range, array length must not exceed count
      if (!counts.includes(count) && count >= 0 && ownersLength > count) {
        ctx.addIssue({
          code: 'custom',
          path,
          message: 'IterateArray.errorMaxItems',
          messageValues: {
            maxItems: count,
          },
        })
      }
    }
  })
render(
  <Form.Handler
    schema={schema}
    defaultData={{
      beneficialOwners: {
        addedExistingBeneficialOwners: undefined,
      },
    }}
  >
    <Flex.Stack>
      <Form.Card>
        <Form.MainHeading>Membership</Form.MainHeading>
        <Field.Number
          path="/members/numberOfMembers"
          label="Number of members (1-3)"
          width="small"
          startWith={-1}
          showStepControls
        />
      </Form.Card>

      <Form.Card>
        <Form.SubHeading>Beneficial owners</Form.SubHeading>
        <Iterate.Array
          path="/beneficialOwners/addedExistingBeneficialOwners"
          animate
        >
          <Section
            innerSpace={{
              top: 'small',
              bottom: 'small',
            }}
            bottom
            backgroundColor="lavender"
          >
            <Field.String itemPath="/name" label="Owner name {itemNo}" />
            <Iterate.RemoveButton />
          </Section>
        </Iterate.Array>
        <Iterate.PushButton
          path="/beneficialOwners/addedExistingBeneficialOwners"
          pushValue={{}}
          text="Add beneficiary"
        />
      </Form.Card>

      <Form.SubmitButton text="Show errors" />

      <Tools.Log label="Form data" />
      <Tools.Errors label="Errors" />
    </Flex.Stack>
  </Form.Handler>
)
```
