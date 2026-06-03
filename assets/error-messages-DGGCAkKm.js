import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{W as n}from"./index-BCXtuv-b.js";import r from"./demos-DP0neYPA.js";var i=e(t());function a(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,h4:`h4`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...n(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h2,{children:`Table of Contents`}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`#description`,children:`Description`})}),`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`#error-object`,children:`Error object`})}),`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.a,{href:`#reuse-existing-error-messages-in-a-validator-function`,children:`Reuse existing error messages in a validator function`}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.a,{href:`#formerror-object`,children:`FormError object`}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`#overwrite-existing-keys`,children:`Overwrite existing keys`})}),`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`#custom-keys-in-a-field`,children:`Custom keys in a field`})}),`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`#custom-keys-in-formhandler`,children:`Custom keys in Form.Handler`})}),`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`#localization-of-error-messages`,children:`Localization of error messages`})}),`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`#use-translations-to-localize-error-messages`,children:`Use translations to localize error messages`})}),`
`,(0,i.jsx)(t.li,{children:(0,i.jsxs)(t.a,{href:`#error-message-in-a-field-schema`,children:[`Error message in a field `,(0,i.jsx)(t.code,{children:`schema`})]})}),`
`,(0,i.jsx)(t.li,{children:(0,i.jsxs)(t.a,{href:`#error-message-in-a-global-schema`,children:[`Error message in a global `,(0,i.jsx)(t.code,{children:`schema`})]})}),`
`]}),`
`]}),`
`]}),`
`]}),`
`,(0,i.jsx)(t.li,{children:(0,i.jsxs)(t.a,{href:`#levels-of-errormessages`,children:[`Levels of `,(0,i.jsx)(t.code,{children:`errorMessages`})]})}),`
`]}),`
`,(0,i.jsx)(t.h2,{children:`Description`}),`
`,(0,i.jsxs)(t.p,{children:[`Eufemia Forms comes with built-in error messages. But you can also customize and override these messages by using the `,(0,i.jsx)(t.code,{children:`errorMessages`}),` property both on `,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/all-fields/`,children:`fields`}),` (field level) and on the `,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/Form/Handler/`,children:`Form.Handler`}),` (global level).`]}),`
`,(0,i.jsxs)(t.p,{children:[`You may use the `,(0,i.jsx)(t.code,{children:`errorMessages`}),` property for two purposes:`]}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsx)(t.li,{children:`Provide your own error messages.`}),`
`,(0,i.jsx)(t.li,{children:`Overwrite the default error messages.`}),`
`]}),`
`,(0,i.jsx)(t.p,{children:`Both can be done on a global level or on a field level.`}),`
`,(0,i.jsxs)(t.p,{children:[`However, for when overwriting the default error messages on a global level, you can also use `,(0,i.jsx)(t.a,{href:`#localization-of-error-messages`,children:`internationalization (i18n)`}),`.`]}),`
`,(0,i.jsx)(t.h2,{children:`Error object`}),`
`,(0,i.jsxs)(t.p,{children:[`Use `,(0,i.jsx)(t.code,{children:`new Error`}),` with a message to display a custom error message.`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`render(<Field.PhoneNumber error={new Error('Show this message')} />)
`})}),`
`,(0,i.jsx)(t.p,{children:`Or in case of a validator:`}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`const myValidator = (value) => {
  // Your validation logic
  return new Error('Show this message')
}

render(<Field.PhoneNumber onBlurValidator={myValidator} />)
`})}),`
`,(0,i.jsx)(t.h2,{children:`Reuse existing error messages in a validator function`}),`
`,(0,i.jsx)(t.p,{children:`You can reuse existing error messages in a validator function. The types of error messages available depend on the field type.`}),`
`,(0,i.jsxs)(t.p,{children:[`For example, you can reuse the `,(0,i.jsx)(t.code,{children:`Field.errorRequired`}),` error message in a validator function:`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`const myValidator = (value) => {
  // Your validation logic
  return new FormError('Field.errorRequired')
}

// Other options to reuse error messages, without using "FormError".
const myValidatorAlt = (value, { errorMessages }) => {
  return new Error(errorMessages['Field.errorRequired'])
}

render(<Field.String onBlurValidator={myValidator} />)
`})}),`
`,(0,i.jsx)(t.h3,{children:`FormError object`}),`
`,(0,i.jsxs)(t.p,{children:[`You can use the JavaScript `,(0,i.jsx)(t.code,{children:`Error`}),` object to display a custom error message:`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Field } from '@dnb/eufemia/extensions/forms'

render(<Field.PhoneNumber error={new Error('Custom message')} />)
`})}),`
`,(0,i.jsxs)(t.p,{children:[`When it comes to re-using existing translations, you can also use the `,(0,i.jsx)(t.code,{children:`FormError`}),` object to display error messages.`]}),`
`,(0,i.jsx)(t.p,{children:`You can provide either an existing translation key, such as:`}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.code,{children:`Field.errorRequired`}),` - Displayed when the field is required and the user has not provided a value.`]}),`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.code,{children:`Field.errorPattern`}),` - Displayed when the user has provided a value that does not match the pattern.`]}),`
`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { FormError, Field } from '@dnb/eufemia/extensions/forms'

// - Error property
render(<Field.PhoneNumber error={new FormError('Field.errorRequired')} />)

// - Validator function
render(
  <Field.PhoneNumber
    onBlurValidator={() => {
      return new FormError('Field.errorRequired')
    }}
  />
)
`})}),`
`,(0,i.jsx)(t.h4,{children:`Overwrite existing keys`}),`
`,(0,i.jsx)(t.p,{children:`Per field, you can overwrite existing keys:`}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`render(
  <Field.PhoneNumber
    errorMessages={{
      'Field.errorRequired': 'Display me, instead of the default message',
    }}
  />
)
`})}),`
`,(0,i.jsx)(t.h4,{children:`Custom keys in a field`}),`
`,(0,i.jsx)(t.p,{children:`You can also provide your own keys:`}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`<Field.PhoneNumber
  error={new FormError('MyCustom.message')}
  errorMessages={{
    'MyCustom.message': 'Your custom error message',
  }}
/>
`})}),`
`,(0,i.jsx)(t.h4,{children:`Custom keys in Form.Handler`}),`
`,(0,i.jsxs)(t.p,{children:[`Here is how you can provide your own keys or overwrite existing ones in a global `,(0,i.jsx)(t.code,{children:`errorMessages`}),` object inside the `,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/Form/Handler/`,children:`Form.Handler`}),`:`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`render(
  <Form.Handler
    errorMessages={{
      'MyCustom.message': 'Your custom error message',
      'Field.errorRequired': 'Display me, instead of the default message',
    }}
  >
    ...
  </Form.Handler>
)
`})}),`
`,(0,i.jsx)(t.h4,{children:`Localization of error messages`}),`
`,(0,i.jsx)(t.p,{children:`You can also provide localized error messages:`}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`render(
  <Form.Handler
    errorMessages={{
      'en-GB': {
        'Field.errorRequired':
          'Display me, instead of the default message',
      },
      'nb-NO': {
        'Field.errorRequired': 'Vis meg istedenfor standardmeldingen',
      },
    }}
  >
    ...
  </Form.Handler>
)
`})}),`
`,(0,i.jsx)(t.h4,{children:`Use translations to localize error messages`}),`
`,(0,i.jsx)(t.p,{children:`You can customize error messages via translations for the entire form:`}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Form } from '@dnb/eufemia/extensions/forms'

render(
  <Form.Handler
    translations={{
      'nb-NO': {
        // - Overwrite existing keys
        Field: { errorRequired: 'Display this error message instead' },
        'Field.errorRequired': 'Display this error message instead',

        // - Custom keys
        MyCustom: { key: 'Your custom error message' },
        'MyCustom.message': 'Your custom error message',
      },
    }}
  >
    <Field.String pattern="^([a-z]+)$" value="123" validateInitially />
  </Form.Handler>
)
`})}),`
`,(0,i.jsxs)(t.h4,{children:[`Error message in a field `,(0,i.jsx)(t.code,{children:`schema`})]}),`
`,(0,i.jsxs)(t.p,{children:[`You can define an error message in a `,(0,i.jsx)(t.code,{children:`schema`}),` for one field:`]}),`
`,(0,i.jsx)(t.p,{children:(0,i.jsx)(t.strong,{children:`Using Zod schemas`})}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Form, Field, z } from '@dnb/eufemia/extensions/forms'

const schema = z
  .string()
  .regex(
    /^([a-z]+)$/,
    'You can provide a custom message in the schema itself'
  )

render(
  <Form.Handler>
    <Field.String schema={schema} value="123" validateInitially />
  </Form.Handler>
)
`})}),`
`,(0,i.jsx)(t.p,{children:(0,i.jsx)(t.strong,{children:`Using JSON Schema (Ajv)`})}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import {
  Form,
  Field,
  makeAjvInstance,
} from '@dnb/eufemia/extensions/forms'

const ajv = makeAjvInstance()
const schema = {
  type: 'string',
  pattern: '^([a-z]+)$',
  errorMessage: 'You can provide a custom message in the schema itself',
} as const

render(
  <Form.Handler ajvInstance={ajv}>
    <Field.String schema={schema} value="123" validateInitially />
  </Form.Handler>
)
`})}),`
`,(0,i.jsxs)(t.h4,{children:[`Error message in a global `,(0,i.jsx)(t.code,{children:`schema`})]}),`
`,(0,i.jsxs)(t.p,{children:[`You can also define an error message in a `,(0,i.jsx)(t.code,{children:`schema`}),` for the entire form:`]}),`
`,(0,i.jsx)(t.p,{children:(0,i.jsx)(t.strong,{children:`Using Zod schemas`})}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Form, Field, z } from '@dnb/eufemia/extensions/forms'

const schema = z.object({
  myKey: z
    .string()
    .regex(
      /^([a-z]+)$/,
      'You can provide a custom message in the schema itself'
    ),
})

render(
  <Form.Handler schema={schema}>
    <Field.String path="/myKey" value="123" validateInitially />
  </Form.Handler>
)
`})}),`
`,(0,i.jsx)(t.p,{children:(0,i.jsx)(t.strong,{children:`Using JSON Schema (Ajv)`})}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`const ajv = makeAjvInstance()
const schema = {
  type: 'object',
  properties: {
    myKey: {
      type: 'string',
      pattern: '^([a-z]+)$',
      errorMessage:
        'You can provide a custom message in the schema itself',
    },
  },
} as const

render(
  <Form.Handler schema={schema} ajvInstance={ajv}>
    <Field.String path="/myKey" value="123" validateInitially />
  </Form.Handler>
)
`})}),`
`,(0,i.jsxs)(t.p,{children:[`Or in a Form.Handler `,(0,i.jsx)(t.code,{children:`schema`}),` with several validation rules:`]}),`
`,(0,i.jsx)(t.p,{children:(0,i.jsx)(t.strong,{children:`Using Zod schemas`})}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Form, Field, z } from '@dnb/eufemia/extensions/forms'

const schema = z.object({
  myKey: z
    .string()
    .min(2, 'minLength message in provider schema')
    .max(3, 'maxLength message in provider schema'),
})

render(
  <Form.Handler schema={schema}>
    <Field.String path="/myKey" value="123" validateInitially />
  </Form.Handler>
)
`})}),`
`,(0,i.jsx)(t.p,{children:(0,i.jsx)(t.strong,{children:`Using JSON Schema (Ajv)`})}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import {
  Form,
  Field,
  makeAjvInstance,
} from '@dnb/eufemia/extensions/forms'

const ajv = makeAjvInstance()
const schema = {
  type: 'object',
  properties: {
    myKey: {
      type: 'string',
      minLength: 2,
      maxLength: 3,
      errorMessage: {
        minLength: 'minLength message in provider schema',
        maxLength: 'maxLength message in provider schema',
      },
    },
  },
} as const

render(
  <Form.Handler schema={schema} ajvInstance={ajv}>
    <Field.String path="/myKey" value="123" validateInitially />
  </Form.Handler>
)
`})}),`
`,(0,i.jsxs)(t.h2,{children:[`Levels of `,(0,i.jsx)(t.code,{children:`errorMessages`})]}),`
`,(0,i.jsxs)(t.p,{children:[`You can provide custom error message different levels with the `,(0,i.jsx)(t.code,{children:`errorMessages`}),` property:`]}),`
`,(0,i.jsxs)(t.ol,{children:[`
`,(0,i.jsx)(t.li,{children:`On the Form.Handler (Provider) level.`}),`
`,(0,i.jsx)(t.li,{children:`On the Form.Handler (Provider) level with a JSON Pointer path.`}),`
`,(0,i.jsx)(t.li,{children:`On the field level.`}),`
`]}),`
`,(0,i.jsx)(t.p,{children:`The levels are prioritized in the order above, so the field level error message will overwrite all other levels.`}),`
`,(0,i.jsxs)(t.p,{children:[`Here is an example of how to do expose a custom error message for the `,(0,i.jsx)(t.code,{children:`Field.errorRequired`}),` validation rule on all levels:`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import {
  Form,
  Field,
  makeAjvInstance,
} from '@dnb/eufemia/extensions/forms'

const ajv = makeAjvInstance()

render(
  <Form.Handler
    ajvInstance={ajv}
    errorMessages={{
      // Level 1
      'Field.errorRequired': 'Or on the provider',
      '/myKey': {
        // Level 2
        'Field.errorRequired': 'Or on the provider for just one field',
      },
    }}
  >
    <Field.String
      path="/myKey"
      errorMessages={{
        // Level 3
        'Field.errorRequired': 'Or on a single Field itself',
      }}
    />
  </Form.Handler>
)
`})})]})}function o(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}function s(e){return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(o,{}),`
`,(0,i.jsx)(r,{})]})}function c(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(s,{...e})}):s(e)}export{c as default};