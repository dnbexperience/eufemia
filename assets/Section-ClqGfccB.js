import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{W as n}from"./index-D7e1avVt.js";import r from"./demos-Dv5SitGR.js";var i=e(t());function a(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...n(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h2,{children:`Import`}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Form } from '@dnb/eufemia/extensions/forms'
render(<Form.Section />)
`})}),`
`,(0,i.jsx)(t.h2,{children:`Description`}),`
`,(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.code,{children:`Form.Section`}),` lets you compose together sections of fields and values to be reused in different contexts.`]}),`
`,(0,i.jsx)(t.h2,{children:`Relevant links`}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Form/Section`,children:`Source code`})}),`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/Form/Section`,children:`Docs code`})}),`
`]}),`
`,(0,i.jsx)(t.h3,{children:`Good to know`}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsxs)(t.li,{children:[`It allows you to easily customize and reposition nested `,(0,i.jsx)(t.code,{children:`Form.Section`}),` components within the data context, making it effortless to reuse the same set of fields and values in various contexts. Check out the `,(0,i.jsx)(t.code,{children:`overwriteProps`}),` and `,(0,i.jsx)(t.code,{children:`path`}),` properties for more information.`]}),`
`,(0,i.jsxs)(t.li,{children:[`When defining a default value for a field or value, you can use the `,(0,i.jsx)(t.code,{children:`defaultValue`}),` property instead of `,(0,i.jsx)(t.code,{children:`value`}),`. It will not take precedence over the data context like `,(0,i.jsx)(t.code,{children:`value`}),` does.`]}),`
`,(0,i.jsxs)(t.li,{children:[`Use `,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/Form/Visibility/`,children:`Form.Visibility`}),` to handle logic and hide parts of your form based on the data context.`]}),`
`,(0,i.jsxs)(t.li,{children:[`To provide localization for all used texts defined in the `,(0,i.jsx)(t.code,{children:`translations`}),` property of the section, you can create a localization easily.`]}),`
`,(0,i.jsx)(t.li,{children:`Only imported sections with their localizations are included in the production bundle.`}),`
`,(0,i.jsxs)(t.li,{children:[`It is possible to overwrite the translations later by using the `,(0,i.jsx)(t.code,{children:`Form.Handler`}),` component.`]}),`
`,(0,i.jsxs)(t.li,{children:[`A single section can be used without `,(0,i.jsx)(t.code,{children:`Form.Handler`}),`, just like any other field and value.`]}),`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/Form/Section/EditContainer/`,children:`Form.Section.EditContainer`}),` and `,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/Form/Section/ViewContainer/`,children:`Form.Section.ViewContainer`}),` containers are available to use.`]}),`
`,(0,i.jsxs)(t.li,{children:[`Here is a `,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/blocks/`,children:`list of blocks`}),` ready to use.`]}),`
`,(0,i.jsxs)(t.li,{children:[`You can use `,(0,i.jsx)(t.code,{children:`//`}),` at the start of a field path to access data from the root of the form data context, bypassing the section path. For example, `,(0,i.jsx)(t.code,{children:`path="//rootField"`}),` inside a section at `,(0,i.jsx)(t.code,{children:`/section`}),` will access `,(0,i.jsx)(t.code,{children:`/rootField`}),` instead of `,(0,i.jsx)(t.code,{children:`/section/rootField`}),`.`]}),`
`,(0,i.jsxs)(t.li,{children:[`You can use `,(0,i.jsx)(t.code,{children:`../`}),` to reference parent section paths. Each `,(0,i.jsx)(t.code,{children:`../`}),` moves one section up before appending the rest of the path, letting you read or write sibling fields such as `,(0,i.jsx)(t.code,{children:`path="../targetField"`}),`.`]}),`
`]}),`
`,(0,i.jsx)(t.h2,{children:`Usage`}),`
`,(0,i.jsxs)(t.ol,{children:[`
`,(0,i.jsx)(t.li,{children:`Create the section component and export it:`}),`
`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Form, Field } from '@dnb/eufemia/extensions/forms'

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
`,(0,i.jsxs)(t.ol,{start:`2`,children:[`
`,(0,i.jsx)(t.li,{children:`Import the section component and use it in a form:`}),`
`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Form } from '@dnb/eufemia/extensions/forms'
import { MySection } from './form-sections'

function MyForm() {
  return (
    <Form.Handler>
      <MySection />
    </Form.Handler>
  )
}
`})}),`
`,(0,i.jsx)(t.h2,{children:`Overwrite properties`}),`
`,(0,i.jsxs)(t.p,{children:[`It lets you overwrite all of the given properties if needed by using `,(0,i.jsx)(t.code,{children:`overwriteProps`}),`:`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Form, Field } from '@dnb/eufemia/extensions/forms'

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
`,(0,i.jsxs)(t.h2,{children:[`Optional `,(0,i.jsx)(t.code,{children:`path`}),` support`]}),`
`,(0,i.jsxs)(t.p,{children:[`You can optionally define a `,(0,i.jsx)(t.code,{children:`path`}),` for the section component. Fields inside the section will use this path as a prefix for their own path. This makes it possible to reuse the same section component in different contexts.`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Form, Field } from '@dnb/eufemia/extensions/forms'

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
`,(0,i.jsxs)(t.h3,{children:[`Accessing root data with `,(0,i.jsx)(t.code,{children:`//`})]}),`
`,(0,i.jsxs)(t.p,{children:[`When a field is inside a `,(0,i.jsx)(t.code,{children:`Form.Section`}),`, you can use a path starting with `,(0,i.jsx)(t.code,{children:`//`}),` to access data from the root of the form data context, bypassing the section path. This is useful when you need to reference data outside the current section.`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Form, Field } from '@dnb/eufemia/extensions/forms'

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
`,(0,i.jsx)(t.p,{children:`In the example above:`}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsxs)(t.li,{children:[`The field with `,(0,i.jsx)(t.code,{children:`path="/sectionField"`}),` will access `,(0,i.jsx)(t.code,{children:`/section/sectionField`})]}),`
`,(0,i.jsxs)(t.li,{children:[`The field with `,(0,i.jsx)(t.code,{children:`path="//rootField"`}),` will access `,(0,i.jsx)(t.code,{children:`/rootField`}),` (root level)`]}),`
`,(0,i.jsxs)(t.li,{children:[`The field with `,(0,i.jsx)(t.code,{children:`path="//user/profile/name"`}),` will access `,(0,i.jsx)(t.code,{children:`/user/profile/name`}),` (root level)`]}),`
`]}),`
`,(0,i.jsxs)(t.p,{children:[`This feature works even with nested sections - `,(0,i.jsx)(t.code,{children:`//`}),` always refers to the root of the form data context.`]}),`
`,(0,i.jsxs)(t.p,{children:[`If you want every field inside a nested `,(0,i.jsx)(t.code,{children:`Form.Section`}),` to bypass the parent path, set the section `,(0,i.jsx)(t.code,{children:`path`}),` to start with `,(0,i.jsx)(t.code,{children:`//`}),` as well (for example `,(0,i.jsx)(t.code,{children:`path="//global"`}),` or `,(0,i.jsx)(t.code,{children:`path="//"`}),`). This works like protocol-relative URLs in HTML and resets the section context back to the root.`]}),`
`,(0,i.jsxs)(t.h3,{children:[`Accessing parent data with `,(0,i.jsx)(t.code,{children:`../`})]}),`
`,(0,i.jsxs)(t.p,{children:[`When a section is nested inside another section, you can use a path starting with `,(0,i.jsx)(t.code,{children:`../`}),` to access data relative to the parent section. Each `,(0,i.jsx)(t.code,{children:`../`}),` moves one level up the section hierarchy before the remainder of the path is appended.`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Form, Field } from '@dnb/eufemia/extensions/forms'

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
`,(0,i.jsx)(t.p,{children:`In the example above:`}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.code,{children:`path="../postalCode"`}),` resolves to `,(0,i.jsx)(t.code,{children:`/address/postalCode`}),`, enabling fields inside `,(0,i.jsx)(t.code,{children:`/address/verification`}),` to work with the parent value.`]}),`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.code,{children:`path="../../customerId"`}),` resolves to `,(0,i.jsx)(t.code,{children:`/customerId`}),`, since the section is nested two levels deep.`]}),`
`,(0,i.jsxs)(t.li,{children:[`When you chain more `,(0,i.jsx)(t.code,{children:`../`}),` segments than there are parent sections, the path simply starts from the root.`]}),`
`]}),`
`,(0,i.jsx)(t.p,{children:`This makes it easy to build advanced sections where nested parts reuse sibling values without duplicating props.`}),`
`,(0,i.jsx)(t.h2,{children:`Required property`}),`
`,(0,i.jsxs)(t.p,{children:[`You can optionally define a `,(0,i.jsx)(t.code,{children:`required`}),` property for the section component. Fields inside the section will then be required.`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`render(
  <Form.Section required={true}>
    <Field.Name.First path="/firstName" />
    <Field.Name.Last path="/lastName" />
  </Form.Section>
)
`})}),`
`,(0,i.jsx)(t.h2,{children:`TypeScript support`}),`
`,(0,i.jsx)(t.p,{children:`You can optionally define which properties the nested fields should accept:`}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Form, Field, SectionProps } from '@dnb/eufemia/extensions/forms'
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
`,(0,i.jsx)(t.h2,{children:`Schema support`}),`
`,(0,i.jsxs)(t.p,{children:[`You can also use a `,(0,i.jsx)(t.code,{children:`schema`}),` on the `,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/Form/Handler`,children:`Form.Handler`}),` to define the validation rules for the fields inside the section.`]}),`
`,(0,i.jsx)(t.p,{children:(0,i.jsx)(t.strong,{children:`Using Zod:`})}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Form, Field, z } from '@dnb/eufemia/extensions/forms'

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
`,(0,i.jsx)(t.p,{children:(0,i.jsx)(t.strong,{children:`Using JSON (Ajv):`})}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import {
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
`,(0,i.jsx)(t.h3,{children:`Section-level schema`}),`
`,(0,i.jsxs)(t.p,{children:[`You can define a `,(0,i.jsx)(t.code,{children:`schema`}),` directly on the `,(0,i.jsx)(t.code,{children:`Form.Section`}),` component. The handler or fields will automatically collect and validate all section schemas without requiring manual merging.`]}),`
`,(0,i.jsx)(t.p,{children:(0,i.jsx)(t.strong,{children:`Using Zod:`})}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Form, Field, z } from '@dnb/eufemia/extensions/forms'

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
`,(0,i.jsx)(t.p,{children:(0,i.jsx)(t.strong,{children:`Using JSON (Ajv):`})}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import {
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
`,(0,i.jsx)(t.h2,{children:`Translations`}),`
`,(0,i.jsxs)(t.p,{children:[`You can use the `,(0,i.jsx)(t.code,{children:`translations`}),` property to provide translations for the section:`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Field, Form } from '@dnb/eufemia/extensions/forms'

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
`,(0,i.jsxs)(t.p,{children:[`This way it is possible to extend or change the translations for a specific section from a `,(0,i.jsx)(t.code,{children:`Form.Handler`}),`:`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Form } from '@dnb/eufemia/extensions/forms'
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
`,(0,i.jsx)(t.h2,{children:`Edit and View container`}),`
`,(0,i.jsxs)(t.p,{children:[`The `,(0,i.jsx)(t.code,{children:`Form.Section`}),` supports a `,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/Form/Section/EditContainer/`,children:`Form.Section.EditContainer`}),` and a `,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/Form/Section/ViewContainer/`,children:`Form.Section.ViewContainer`}),` container. The edit container should be used for data input with fields, while the view container is used to display the data in a read-only manner.`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Form, Field } from '@dnb/eufemia/extensions/forms'

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
`,(0,i.jsxs)(t.p,{children:[`Note: The reason `,(0,i.jsx)(t.code,{children:`Done`}),` is used in the toolbar button instead of `,(0,i.jsx)(t.code,{children:`Save`}),` is because validation is performed in fields. If we decouple the data entered in a section, the `,(0,i.jsx)(t.code,{children:`Form.Handler`}),` will not be able to validate the data on submit. This can also lead to missing data because the user can press the submit button before `,(0,i.jsx)(t.code,{children:`Save`}),` is pressed.`]}),`
`,(0,i.jsx)(t.h2,{children:`Snapshot testing of a section (block)`}),`
`,(0,i.jsx)(t.p,{children:`One way to ensure a "contract" of what you expect a section to be outlined as, is to create a snapshot test:`}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Form, Tools } from '@dnb/eufemia/extensions/forms'
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
`})})]})}function o(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}function s(e){return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(o,{}),`
`,(0,i.jsx)(r,{})]})}function c(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(s,{...e})}):s(e)}export{c as default};