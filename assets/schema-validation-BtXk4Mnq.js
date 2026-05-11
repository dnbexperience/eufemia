import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Lr as t}from"./index-DVm0MbGb.js";import n from"./demos-CBmzwfvW.js";var r=e();function i(e){let n={a:`a`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...t(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h2,{children:`Relevant links`}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Form/schema-validation`,children:`Source code`})}),`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/Form/schema-validation`,children:`Docs code`})}),`
`]}),`
`,(0,r.jsx)(n.h2,{children:`Table of Contents`}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`#about-schemas`,children:`About schemas`})}),`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`#using-schema-with-datacontext`,children:`Using schema with DataContext`})}),`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`#fields-which-are-disabled-or-read-only`,children:`Fields which are disabled or read-only`})}),`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`#jsonschema-and-typescript`,children:`JSONSchema and TypeScript`})}),`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.a,{href:`#complex-schemas`,children:`Complex schemas`}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`#custom-ajv-instance-and-keywords`,children:`Custom Ajv instance and keywords`})}),`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`#custom-ajv-keyword-in-a-field`,children:`Custom Ajv keyword in a field`})}),`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`#custom-error-messages`,children:`Custom error messages`})}),`
`]}),`
`]}),`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`#generate-schema-from-fields`,children:`Generate schema from fields`})}),`
`]}),`
`,(0,r.jsx)(n.h2,{children:`About schemas`}),`
`,(0,r.jsx)(n.p,{children:`** Recommendation: Use Zod schemas when possible**`}),`
`,(0,r.jsx)(n.p,{children:`Zod schemas are the preferred choice for validation as they:`}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsx)(n.li,{children:`Work out of the box without additional dependencies`}),`
`,(0,r.jsx)(n.li,{children:`Provide better TypeScript integration`}),`
`,(0,r.jsx)(n.li,{children:`Are more performant`}),`
`,(0,r.jsx)(n.li,{children:`Have a more intuitive API`}),`
`]}),`
`,(0,r.jsx)(n.p,{children:`JSON Schema validation is still supported but requires explicitly providing an AJV instance.`}),`
`,(0,r.jsxs)(n.p,{children:[`JSON Schema is a vocabulary for annotating and validating data in js. More about JSON Schema on `,(0,r.jsx)(n.a,{href:`https://json-schema.org/`,children:`json-schema.org`})]}),`
`,(0,r.jsx)(n.p,{children:`A schema can be used from the simplest description of the data type of a value:`}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-js`,children:`{
  type: 'string'
}
`})}),`
`,(0,r.jsx)(n.p,{children:`Results in:`}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-json`,children:`"Foo"
`})}),`
`,(0,r.jsx)(n.p,{children:`To an object with both rules for required fields and validation rules for single values:`}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-js`,children:`{
  type: "object",
  properties: {
    textField: { type: 'string', minLength: 5 },
    numberField: { type: 'number', maximum: 100 },
  },
  required: ['textField']
}
`})}),`
`,(0,r.jsx)(n.p,{children:`Results in:`}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-json`,children:`{
  "textField": "abcde",
  "numberField": 123
}
`})}),`
`,(0,r.jsx)(n.h2,{children:`Using schema with Form.Handler (DataContext)`}),`
`,(0,r.jsx)(n.p,{children:`These two examples will result in the same validation for the user:`}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-jsx`,children:`<Form.Handler data={user}>
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
`})}),`
`,(0,r.jsx)(n.p,{children:`vs.`}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Form, Field, z, makeAjvInstance } from '@dnb/eufemia/extensions/forms'

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
`})}),`
`,(0,r.jsx)(n.p,{children:(0,r.jsx)(n.strong,{children:`Using JSON Schema (Ajv)`})}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { JSONSchema, makeAjvInstance } from '@dnb/eufemia/extensions/forms'

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
`})}),`
`,(0,r.jsx)(n.p,{children:`This makes it possible to create a uniform, testable description and requirements specification for the data, which can be tested independently of frontend code, and used across systems, e.g. frontend and backend.`}),`
`,(0,r.jsxs)(n.p,{children:[`Also, note you can describe the schema without using the `,(0,r.jsx)(n.code,{children:`type`}),` property, as the type is inferred from schema type. More on that topic in the `,(0,r.jsx)(n.a,{href:`https://ajv.js.org/guide/typescript.html#utility-types-for-schemas`,children:`Ajv docs`}),`.`]}),`
`,(0,r.jsx)(n.h2,{children:`Fields which are disabled or read-only`}),`
`,(0,r.jsxs)(n.p,{children:[`Fields which have the `,(0,r.jsx)(n.code,{children:`disabled`}),` property or the `,(0,r.jsx)(n.code,{children:`readOnly`}),` property, will skip validation.`]}),`
`,(0,r.jsx)(n.h2,{children:`Zod schemas and TypeScript`}),`
`,(0,r.jsx)(n.p,{children:`For better TypeScript integration, consider using Zod schemas instead:`}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-ts`,children:`import { z } from '@dnb/eufemia/extensions/forms'

const schema = z.object({
  name: z.string().min(3),
  email: z.string().email(),
  birthyear: z.number().min(1900).max(2023),
})

// The type is automatically inferred
type UserData = z.infer<typeof schema>
`})}),`
`,(0,r.jsx)(n.h2,{children:`JSONSchema and TypeScript`}),`
`,(0,r.jsxs)(n.p,{children:[`You can import the `,(0,r.jsx)(n.code,{children:`JSONSchema`}),` type from the `,(0,r.jsx)(n.code,{children:`@dnb/eufemia/extensions/forms`}),` package.`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-ts`,children:`import { JSONSchema } from '@dnb/eufemia/extensions/forms'
`})}),`
`,(0,r.jsxs)(n.p,{children:[`It's a shorthand for `,(0,r.jsx)(n.code,{children:`JSONSchema7`}),`.`]}),`
`,(0,r.jsxs)(n.p,{children:[`You can also use the utility `,(0,r.jsx)(n.code,{children:`JSONSchemaType`}),` type, so you can validate your data types.`]}),`
`,(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:`NB:`}),` This requires `,(0,r.jsx)(n.code,{children:`strictNullChecks`}),` in the `,(0,r.jsx)(n.code,{children:`tsconfig`}),` settings to be true.`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-ts`,children:`import { JSONSchemaType } from '@dnb/eufemia/extensions/forms'

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
`})}),`
`,(0,r.jsx)(n.h2,{children:`Complex schemas`}),`
`,(0,r.jsx)(n.p,{children:`In addition to basic validation as in the example above, JSON Schema can be used for more complex. Examples of definitions supported by the standard are:`}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsxs)(n.li,{children:[`Requirement that the object must not have other properties than those defined in `,(0,r.jsx)(n.code,{children:`properties`}),`.`]}),`
`,(0,r.jsx)(n.li,{children:`Nested data structures and combinations of objects and arrays with rules for array elements (fixed or repetitive elements).`}),`
`,(0,r.jsx)(n.li,{children:`Regular expressions for the syntax of individual values.`}),`
`,(0,r.jsx)(n.li,{children:`Enum (a set of valid values).`}),`
`,(0,r.jsx)(n.li,{children:`Rules for the number of elements in arrays.`}),`
`,(0,r.jsx)(n.li,{children:`Rules for the number of properties in objects.`}),`
`,(0,r.jsx)(n.li,{children:`Predefined format rules (e.g., 'uri', 'email' and 'hostname').`}),`
`,(0,r.jsx)(n.li,{children:`Logical operators such as 'not', 'oneOf', 'allOf' and 'anyOf' which can be filled with rules for all or part of the data set.`}),`
`,(0,r.jsx)(n.li,{children:`Rule set based on the content of values (if-then-else).`}),`
`,(0,r.jsx)(n.li,{children:`Rules (sub-schemas) that become applicable if a given value is present.`}),`
`,(0,r.jsx)(n.li,{children:`Reuse within the definition, such as one and the same object structure being used as a definition for several locations in a structure.`}),`
`]}),`
`,(0,r.jsxs)(n.p,{children:[`To learn more about what is possible with the JSON Schema standard, see `,(0,r.jsx)(n.a,{href:`https://json-schema.org/`,children:`json-schema.org`}),`.`]}),`
`,(0,r.jsx)(n.h3,{children:`Custom Ajv instance and keywords`}),`
`,(0,r.jsxs)(n.p,{children:[`You can provide your custom `,(0,r.jsx)(n.code,{children:`validate`}),` function with your own keywords to your schema. Below are two examples of how to do that.`]}),`
`,(0,r.jsx)(n.p,{children:`First, you need to create your won instance of Ajv:`}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-ts`,children:`import { makeAjvInstance } from '@dnb/eufemia/extensions/forms'
import Ajv from 'ajv/dist/2020'

const ajv = makeAjvInstance(
  new Ajv({
    strict: true,
    allErrors: true,
  })
)
`})}),`
`,(0,r.jsx)(n.p,{children:`Then you add your custom keyword to the Ajv instance:`}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-ts`,children:`// Add a custom keyword 'isEven'
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
`})}),`
`,(0,r.jsxs)(n.p,{children:[`Use `,(0,r.jsx)(n.code,{children:`as const`}),` to make sure the schema is not inferred as `,(0,r.jsx)(n.code,{children:`JSONSchema7`}),` but as a literal type.`]}),`
`,(0,r.jsx)(n.p,{children:`And finally add the Ajv instance to your form:`}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import {
  Form,
  Field,
  makeAjvInstance,
} from '@dnb/eufemia/extensions/forms'

render(
  <Form.Handler schema={schema} ajvInstance={makeAjvInstance()}>
    <Field.String path="/myKey" value="1" validateInitially />
  </Form.Handler>
)
`})}),`
`,(0,r.jsx)(n.h3,{children:`Custom Ajv keyword in a field`}),`
`,(0,r.jsx)(n.p,{children:`Here is another example of a custom keyword, used in one field only:`}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import {
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
`})}),`
`,(0,r.jsxs)(n.p,{children:[`You can find more info about error messages in the `,(0,r.jsx)(n.a,{href:`/uilib/extensions/forms/Form/error-messages/`,children:`Error messages`}),` docs.`]}),`
`,(0,r.jsx)(n.h3,{children:`Custom error messages`}),`
`,(0,r.jsxs)(n.p,{children:[`When having a custom keyword, you can provide custom error message on four levels with the `,(0,r.jsx)(n.code,{children:`errorMessage`}),` or `,(0,r.jsx)(n.code,{children:`errorMessages`}),` property:`]}),`
`,(0,r.jsxs)(n.ol,{children:[`
`,(0,r.jsx)(n.li,{children:`On the schema level.`}),`
`,(0,r.jsx)(n.li,{children:`On the Form.Handler (Provider) level.`}),`
`,(0,r.jsx)(n.li,{children:`On the Form.Handler (Provider) level with a JSON Pointer path.`}),`
`,(0,r.jsx)(n.li,{children:`On the field level.`}),`
`]}),`
`,(0,r.jsx)(n.p,{children:`The levels are prioritized in the order above, so the field level error message will overwrite all other levels.`}),`
`,(0,r.jsx)(n.p,{children:`Here is an example of how to do that:`}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`const schema = {
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
`})}),`
`,(0,r.jsxs)(n.p,{children:[`You can find more info about error messages in the `,(0,r.jsx)(n.a,{href:`/uilib/extensions/forms/Form/error-messages/`,children:`Error messages`}),` docs.`]}),`
`,(0,r.jsx)(n.h2,{children:`Generate schema from fields`}),`
`,(0,r.jsxs)(n.p,{children:[`You can also generate a Ajv schema from a set of fields, by using the `,(0,r.jsx)(n.code,{children:`log`}),` property on the `,(0,r.jsx)(n.code,{children:`Tools.GenerateSchema`}),` component. I will console log the generated schema.`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Form, Field, Tools } from '@dnb/eufemia/extensions/forms'

render(
  <Form.Handler>
    <Tools.GenerateSchema log>
      <Field.String path="/myString" pattern="^[a-z]{2}[0-9]+$" required />
    </Tools.GenerateSchema>
  </Form.Handler>
)
`})}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-json`,children:`// console.log output:
{
  "properties": {
    "myString": { "type": "string", "pattern": "^[a-z]{2}[0-9]+$" }
  },
  "required": ["myString"],
  "type": "object"
}
`})}),`
`,(0,r.jsxs)(n.p,{children:[`Or by using the `,(0,r.jsx)(n.code,{children:`generateRef`}),` property on the `,(0,r.jsx)(n.code,{children:`Tools.GenerateSchema`}),` component. Here is an example of how to do that within a test:`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Form, Field, Tools } from '@dnb/eufemia/extensions/forms'

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
  expect(schema).toMatchInlineSnapshot(\`
    {
      "type": "object",
      "properties": {
        "firstName": {
          "type": "string",
          "pattern": "^[\\\\p{L}\\\\p{M} \\\\-]+$",
        },
        "lastName": {
          "type": "string",
          "minLength": 2,
          "pattern": "^[\\\\p{L}\\\\p{M} \\\\-]+$",
        },
      },
      "required": [
        "lastName",
      ],
    }
  \`)
})
`})})]})}function a(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(i,{...e})}):i(e)}function o(e){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(a,{}),`
`,(0,r.jsx)(n,{})]})}function s(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(o,{...e})}):o(e)}export{s as default};