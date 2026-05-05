import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Rr as t}from"./index-CMgyXmp3.js";import n from"./demos-DciAuwVN.js";var r=e();function i(e){let n={a:`a`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...t(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h2,{children:`Import`}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Form } from '@dnb/eufemia/extensions/forms'
render(<Form.Section />)
`})}),`
`,(0,r.jsx)(n.h2,{children:`Description`}),`
`,(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:`Form.Section`}),` lets you compose together sections of fields and values to be reused in different contexts.`]}),`
`,(0,r.jsx)(n.h2,{children:`Relevant links`}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Form/Section`,children:`Source code`})}),`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/Form/Section`,children:`Docs code`})}),`
`]}),`
`,(0,r.jsx)(n.h3,{children:`Good to know`}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsxs)(n.li,{children:[`It allows you to easily customize and reposition nested `,(0,r.jsx)(n.code,{children:`Form.Section`}),` components within the data context, making it effortless to reuse the same set of fields and values in various contexts. Check out the `,(0,r.jsx)(n.code,{children:`overwriteProps`}),` and `,(0,r.jsx)(n.code,{children:`path`}),` properties for more information.`]}),`
`,(0,r.jsxs)(n.li,{children:[`When defining a default value for a field or value, you can use the `,(0,r.jsx)(n.code,{children:`defaultValue`}),` property instead of `,(0,r.jsx)(n.code,{children:`value`}),`. It will not take precedence over the data context like `,(0,r.jsx)(n.code,{children:`value`}),` does.`]}),`
`,(0,r.jsxs)(n.li,{children:[`Use `,(0,r.jsx)(n.a,{href:`/uilib/extensions/forms/Form/Visibility/`,children:`Form.Visibility`}),` to handle logic and hide parts of your form based on the data context.`]}),`
`,(0,r.jsxs)(n.li,{children:[`To provide localization for all used texts defined in the `,(0,r.jsx)(n.code,{children:`translations`}),` property of the section, you can create a localization easily.`]}),`
`,(0,r.jsx)(n.li,{children:`Only imported sections with their localizations are included in the production bundle.`}),`
`,(0,r.jsxs)(n.li,{children:[`It is possible to overwrite the translations later by using the `,(0,r.jsx)(n.code,{children:`Form.Handler`}),` component.`]}),`
`,(0,r.jsxs)(n.li,{children:[`A single section can be used without `,(0,r.jsx)(n.code,{children:`Form.Handler`}),`, just like any other field and value.`]}),`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.a,{href:`/uilib/extensions/forms/Form/Section/EditContainer/`,children:`Form.Section.EditContainer`}),` and `,(0,r.jsx)(n.a,{href:`/uilib/extensions/forms/Form/Section/ViewContainer/`,children:`Form.Section.ViewContainer`}),` containers are available to use.`]}),`
`,(0,r.jsxs)(n.li,{children:[`Here is a `,(0,r.jsx)(n.a,{href:`/uilib/extensions/forms/blocks/`,children:`list of blocks`}),` ready to use.`]}),`
`,(0,r.jsxs)(n.li,{children:[`You can use `,(0,r.jsx)(n.code,{children:`//`}),` at the start of a field path to access data from the root of the form data context, bypassing the section path. For example, `,(0,r.jsx)(n.code,{children:`path="//rootField"`}),` inside a section at `,(0,r.jsx)(n.code,{children:`/section`}),` will access `,(0,r.jsx)(n.code,{children:`/rootField`}),` instead of `,(0,r.jsx)(n.code,{children:`/section/rootField`}),`.`]}),`
`,(0,r.jsxs)(n.li,{children:[`You can use `,(0,r.jsx)(n.code,{children:`../`}),` to reference parent section paths. Each `,(0,r.jsx)(n.code,{children:`../`}),` moves one section up before appending the rest of the path, letting you read or write sibling fields such as `,(0,r.jsx)(n.code,{children:`path="../targetField"`}),`.`]}),`
`]}),`
`,(0,r.jsx)(n.h2,{children:`Usage`}),`
`,(0,r.jsxs)(n.ol,{children:[`
`,(0,r.jsx)(n.li,{children:`Create the section component and export it:`}),`
`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Form, Field } from '@dnb/eufemia/extensions/forms'

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
`})}),`
`,(0,r.jsxs)(n.ol,{start:`2`,children:[`
`,(0,r.jsx)(n.li,{children:`Import the section component and use it in a form:`}),`
`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Form } from '@dnb/eufemia/extensions/forms'
import { MySection } from './form-sections'

function MyForm() {
  return (
    <Form.Handler>
      <MySection />
    </Form.Handler>
  )
}
`})}),`
`,(0,r.jsx)(n.h2,{children:`Overwrite properties`}),`
`,(0,r.jsxs)(n.p,{children:[`It lets you overwrite all of the given properties if needed by using `,(0,r.jsx)(n.code,{children:`overwriteProps`}),`:`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Form, Field } from '@dnb/eufemia/extensions/forms'

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
`})}),`
`,(0,r.jsxs)(n.h2,{children:[`Optional `,(0,r.jsx)(n.code,{children:`path`}),` support`]}),`
`,(0,r.jsxs)(n.p,{children:[`You can optionally define a `,(0,r.jsx)(n.code,{children:`path`}),` for the section component. Fields inside the section will use this path as a prefix for their own path. This makes it possible to reuse the same section component in different contexts.`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Form, Field } from '@dnb/eufemia/extensions/forms'

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
`})}),`
`,(0,r.jsxs)(n.h3,{children:[`Accessing root data with `,(0,r.jsx)(n.code,{children:`//`})]}),`
`,(0,r.jsxs)(n.p,{children:[`When a field is inside a `,(0,r.jsx)(n.code,{children:`Form.Section`}),`, you can use a path starting with `,(0,r.jsx)(n.code,{children:`//`}),` to access data from the root of the form data context, bypassing the section path. This is useful when you need to reference data outside the current section.`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Form, Field } from '@dnb/eufemia/extensions/forms'

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
`})}),`
`,(0,r.jsx)(n.p,{children:`In the example above:`}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsxs)(n.li,{children:[`The field with `,(0,r.jsx)(n.code,{children:`path="/sectionField"`}),` will access `,(0,r.jsx)(n.code,{children:`/section/sectionField`})]}),`
`,(0,r.jsxs)(n.li,{children:[`The field with `,(0,r.jsx)(n.code,{children:`path="//rootField"`}),` will access `,(0,r.jsx)(n.code,{children:`/rootField`}),` (root level)`]}),`
`,(0,r.jsxs)(n.li,{children:[`The field with `,(0,r.jsx)(n.code,{children:`path="//user/profile/name"`}),` will access `,(0,r.jsx)(n.code,{children:`/user/profile/name`}),` (root level)`]}),`
`]}),`
`,(0,r.jsxs)(n.p,{children:[`This feature works even with nested sections - `,(0,r.jsx)(n.code,{children:`//`}),` always refers to the root of the form data context.`]}),`
`,(0,r.jsxs)(n.p,{children:[`If you want every field inside a nested `,(0,r.jsx)(n.code,{children:`Form.Section`}),` to bypass the parent path, set the section `,(0,r.jsx)(n.code,{children:`path`}),` to start with `,(0,r.jsx)(n.code,{children:`//`}),` as well (for example `,(0,r.jsx)(n.code,{children:`path="//global"`}),` or `,(0,r.jsx)(n.code,{children:`path="//"`}),`). This works like protocol-relative URLs in HTML and resets the section context back to the root.`]}),`
`,(0,r.jsxs)(n.h3,{children:[`Accessing parent data with `,(0,r.jsx)(n.code,{children:`../`})]}),`
`,(0,r.jsxs)(n.p,{children:[`When a section is nested inside another section, you can use a path starting with `,(0,r.jsx)(n.code,{children:`../`}),` to access data relative to the parent section. Each `,(0,r.jsx)(n.code,{children:`../`}),` moves one level up the section hierarchy before the remainder of the path is appended.`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Form, Field } from '@dnb/eufemia/extensions/forms'

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
`})}),`
`,(0,r.jsx)(n.p,{children:`In the example above:`}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:`path="../postalCode"`}),` resolves to `,(0,r.jsx)(n.code,{children:`/address/postalCode`}),`, enabling fields inside `,(0,r.jsx)(n.code,{children:`/address/verification`}),` to work with the parent value.`]}),`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:`path="../../customerId"`}),` resolves to `,(0,r.jsx)(n.code,{children:`/customerId`}),`, since the section is nested two levels deep.`]}),`
`,(0,r.jsxs)(n.li,{children:[`When you chain more `,(0,r.jsx)(n.code,{children:`../`}),` segments than there are parent sections, the path simply starts from the root.`]}),`
`]}),`
`,(0,r.jsx)(n.p,{children:`This makes it easy to build advanced sections where nested parts reuse sibling values without duplicating props.`}),`
`,(0,r.jsx)(n.h2,{children:`Required property`}),`
`,(0,r.jsxs)(n.p,{children:[`You can optionally define a `,(0,r.jsx)(n.code,{children:`required`}),` property for the section component. Fields inside the section will then be required.`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`render(
  <Form.Section required={true}>
    <Field.Name.First path="/firstName" />
    <Field.Name.Last path="/lastName" />
  </Form.Section>
)
`})}),`
`,(0,r.jsx)(n.h2,{children:`TypeScript support`}),`
`,(0,r.jsx)(n.p,{children:`You can optionally define which properties the nested fields should accept:`}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Form, Field, SectionProps } from '@dnb/eufemia/extensions/forms'
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
`})}),`
`,(0,r.jsx)(n.h2,{children:`Schema support`}),`
`,(0,r.jsxs)(n.p,{children:[`You can also use a `,(0,r.jsx)(n.code,{children:`schema`}),` on the `,(0,r.jsx)(n.a,{href:`/uilib/extensions/forms/Form/Handler`,children:`Form.Handler`}),` to define the validation rules for the fields inside the section.`]}),`
`,(0,r.jsx)(n.p,{children:(0,r.jsx)(n.strong,{children:`Using Zod:`})}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Form, Field, z } from '@dnb/eufemia/extensions/forms'

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
`})}),`
`,(0,r.jsx)(n.p,{children:(0,r.jsx)(n.strong,{children:`Using JSON (Ajv):`})}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import {
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
`})}),`
`,(0,r.jsx)(n.h3,{children:`Section-level schema`}),`
`,(0,r.jsxs)(n.p,{children:[`You can define a `,(0,r.jsx)(n.code,{children:`schema`}),` directly on the `,(0,r.jsx)(n.code,{children:`Form.Section`}),` component. The handler or fields will automatically collect and validate all section schemas without requiring manual merging.`]}),`
`,(0,r.jsx)(n.p,{children:(0,r.jsx)(n.strong,{children:`Using Zod:`})}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Form, Field, z } from '@dnb/eufemia/extensions/forms'

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
`})}),`
`,(0,r.jsx)(n.p,{children:(0,r.jsx)(n.strong,{children:`Using JSON (Ajv):`})}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import {
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
`})}),`
`,(0,r.jsx)(n.h2,{children:`Translations`}),`
`,(0,r.jsxs)(n.p,{children:[`You can use the `,(0,r.jsx)(n.code,{children:`translations`}),` property to provide translations for the section:`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Field, Form } from '@dnb/eufemia/extensions/forms'

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
`})}),`
`,(0,r.jsxs)(n.p,{children:[`This way it is possible to extend or change the translations for a specific section from a `,(0,r.jsx)(n.code,{children:`Form.Handler`}),`:`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Form } from '@dnb/eufemia/extensions/forms'
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
`})}),`
`,(0,r.jsx)(n.h2,{children:`Edit and View container`}),`
`,(0,r.jsxs)(n.p,{children:[`The `,(0,r.jsx)(n.code,{children:`Form.Section`}),` supports a `,(0,r.jsx)(n.a,{href:`/uilib/extensions/forms/Form/Section/EditContainer/`,children:`Form.Section.EditContainer`}),` and a `,(0,r.jsx)(n.a,{href:`/uilib/extensions/forms/Form/Section/ViewContainer/`,children:`Form.Section.ViewContainer`}),` container. The edit container should be used for data input with fields, while the view container is used to display the data in a read-only manner.`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Form, Field } from '@dnb/eufemia/extensions/forms'

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
`})}),`
`,(0,r.jsxs)(n.p,{children:[`Note: The reason `,(0,r.jsx)(n.code,{children:`Done`}),` is used in the toolbar button instead of `,(0,r.jsx)(n.code,{children:`Save`}),` is because validation is performed in fields. If we decouple the data entered in a section, the `,(0,r.jsx)(n.code,{children:`Form.Handler`}),` will not be able to validate the data on submit. This can also lead to missing data because the user can press the submit button before `,(0,r.jsx)(n.code,{children:`Save`}),` is pressed.`]}),`
`,(0,r.jsx)(n.h2,{children:`Snapshot testing of a section (block)`}),`
`,(0,r.jsx)(n.p,{children:`One way to ensure a "contract" of what you expect a section to be outlined as, is to create a snapshot test:`}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Form, Tools } from '@dnb/eufemia/extensions/forms'
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
  expect(propsOfFields).toMatchInlineSnapshot(\`...\`)
  expect(propsOfValues).toMatchInlineSnapshot(\`...\`)
})
`})})]})}function a(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(i,{...e})}):i(e)}function o(e){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(a,{}),`
`,(0,r.jsx)(n,{})]})}function s(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(o,{...e})}):o(e)}export{s as default};