import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{n as r,r as i,t as a}from"./forms-CFi5-4x5.js";import{t as o}from"./Card-Db-Q1D3Y.js";import{t as s}from"./Section-BQdvtuRF.js";import{U as c}from"./index-kfZVC31v.js";import{t as l}from"./ComponentBox-qLaLt9T0.js";var u=e({BasicFields:()=>f,IterateExample:()=>m,SectionExample:()=>p}),d=t(n()),f=()=>(0,d.jsx)(l,{hidePreview:!0,stableName:`BasicFields`,sourceImports:[`import { RegisteredForm as Form, RegisteredField as Field, RegisteredIterate as Iterate, TypedItemField, TypedSectionField } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:r,Card:o,Field:a},children:`<Form.Handler
  defaultData={{
    firstName: 'Nora',
    age: 30,
  }}
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
`}),p=()=>(0,d.jsx)(l,{hidePreview:!0,stableName:`SectionExample`,sourceImports:[`import { RegisteredForm as Form, RegisteredField as Field, RegisteredIterate as Iterate, TypedItemField, TypedSectionField } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:a,Form:r,Card:o,Section:s},noInline:!0,children:`// Derive the section's object type from the registered path to
// type-check the section-relative \`path\` — no extra registration.
// \`as unknown as\` because we re-narrow the already-root-typed namespace.
const { Name } = Field as unknown as TypedSectionField<'/company'>
render(
  <Form.Handler
    defaultData={{
      company: {
        name: 'DNB',
      },
    }}
  >
    <Form.Card>
      <Form.Section path="/company">
        {/* Section-relative paths are checked against the section type */}
        <Name.Company path="/name" />

        {/* @ts-expect-error /nope is not a path in the section */}
        <Name.Company path="/nope" />
      </Form.Section>

      <Form.SubmitButton />
    </Form.Card>
  </Form.Handler>
)
`}),m=()=>(0,d.jsx)(l,{hidePreview:!0,stableName:`IterateExample`,sourceImports:[`import { RegisteredForm as Form, RegisteredField as Field, RegisteredIterate as Iterate, TypedItemField, TypedSectionField } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Field:a,Form:r,Card:o,Iterate:i},noInline:!0,children:`// Derive the item type from the registered array path to type-check
// the item-relative \`itemPath\` — no extra registration.
const { String: StringItem, Number: NumberItem } =
  Field as TypedItemField<'/accounts'>
render(
  <Form.Handler
    defaultData={{
      accounts: [
        {
          name: 'Savings',
          balance: 1000,
        },
        {
          name: 'Checking',
          balance: 500,
        },
      ],
    }}
  >
    <Form.Card>
      <Iterate.Array path="/accounts">
        <StringItem itemPath="/name" label="Name" />
        <NumberItem itemPath="/balance" label="Balance" />

        {/* @ts-expect-error /nope is not a path in the array item */}
        <StringItem itemPath="/nope" />
      </Iterate.Array>

      <Form.SubmitButton />
    </Form.Card>
  </Form.Handler>
)
`});function h(e){let t={a:`a`,code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...c(),...e.components};return u||_(`Examples`,!1),f||_(`Examples.BasicFields`,!0),m||_(`Examples.IterateExample`,!0),p||_(`Examples.SectionExample`,!0),(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(t.h1,{children:`Type-checked paths`}),`
`,(0,d.jsxs)(t.p,{children:[`Eufemia Forms uses `,(0,d.jsx)(t.a,{href:`/uilib/extensions/forms/getting-started/#what-is-a-json-pointer`,children:`JSON Pointer`}),` strings (such as `,(0,d.jsx)(t.code,{children:`/firstName`}),`) for the `,(0,d.jsx)(t.code,{children:`path`}),` prop. By default these are plain strings, so a typo like `,(0,d.jsx)(t.code,{children:`/firstNme`}),` is not caught until runtime.`]}),`
`,(0,d.jsxs)(t.p,{children:[`Register your data type `,(0,d.jsx)(t.strong,{children:`once`}),`, and every `,(0,d.jsx)(t.code,{children:`Field.*`}),` and `,(0,d.jsx)(t.code,{children:`Value.*`}),` gets path `,(0,d.jsx)(t.strong,{children:`autocomplete`}),`, while `,(0,d.jsx)(t.code,{children:`Form.Handler`}),` keeps its typed `,(0,d.jsx)(t.code,{children:`data`}),`/`,(0,d.jsx)(t.code,{children:`defaultData`}),`. Opt into the `,(0,d.jsx)(t.a,{href:`#pre-typed-namespaces`,children:`pre-typed namespaces`}),` to turn typos into `,(0,d.jsx)(t.strong,{children:`hard compile-time errors`}),`.`]}),`
`,(0,d.jsx)(t.h2,{children:`Good to know`}),`
`,(0,d.jsxs)(t.ul,{children:[`
`,(0,d.jsx)(t.li,{children:`The typing is purely type-level and is erased at build time, so the types themselves add no runtime or bundle-size cost.`}),`
`,(0,d.jsxs)(t.li,{children:[`Nested objects and arrays are supported, e.g. `,(0,d.jsx)(t.code,{children:`/address/street`}),` or `,(0,d.jsx)(t.code,{children:`/items/0/title`}),`.`]}),`
`,(0,d.jsxs)(t.li,{children:[`The exported `,(0,d.jsx)(t.code,{children:`Paths<Data>`}),` helper produces the union of all valid paths for a data type, and `,(0,d.jsx)(t.code,{children:`PathValue<Data, Path>`}),` resolves the value type at a given path – both are available for advanced use.`]}),`
`,(0,d.jsxs)(t.li,{children:[`The registered data type is available as `,(0,d.jsx)(t.code,{children:`RegisteredFormData`}),`, handy for typing your own helpers against the same shape, e.g. `,(0,d.jsx)(t.code,{children:`function onSubmit(data: RegisteredFormData) {}`}),`.`]}),`
`,(0,d.jsxs)(t.li,{children:[`The plain `,(0,d.jsx)(t.code,{children:`path`}),` prop is typed against the `,(0,d.jsx)(t.strong,{children:`root`}),` data type. The section-relative `,(0,d.jsx)(t.code,{children:`path`}),` inside `,(0,d.jsx)(t.a,{href:`/uilib/extensions/forms/Form/Section/`,children:`Form.Section`}),` is not narrowed on the registered `,(0,d.jsx)(t.strong,{children:`root`}),` namespace – use `,(0,d.jsx)(t.a,{href:`#type-checking-section-relative-paths`,children:(0,d.jsx)(t.code,{children:`TypedSectionField`})}),` (or the regular `,(0,d.jsx)(t.code,{children:`Field`}),`/`,(0,d.jsx)(t.code,{children:`Value`}),`, which accept any string) there. For the item-relative `,(0,d.jsx)(t.code,{children:`itemPath`}),` inside `,(0,d.jsx)(t.a,{href:`/uilib/extensions/forms/Iterate/`,children:`Iterate`}),`, use `,(0,d.jsx)(t.a,{href:`#type-checking-itempath-inside-iterate`,children:(0,d.jsx)(t.code,{children:`TypedItemField`})}),`.`]}),`
`,(0,d.jsxs)(t.li,{children:[`A `,(0,d.jsx)(t.code,{children:`path`}),` stored in a `,(0,d.jsx)(t.code,{children:`const`}),` keeps its literal type (e.g. `,(0,d.jsx)(t.code,{children:`'/company'`}),`), so it is type-checked exactly like an inline string. Use `,(0,d.jsx)(t.code,{children:`const`}),`, not `,(0,d.jsx)(t.code,{children:`let`}),` – `,(0,d.jsx)(t.code,{children:`let`}),` widens the value to `,(0,d.jsx)(t.code,{children:`string`}),` and loses the narrowing. The same const can drive the type helpers with `,(0,d.jsx)(t.code,{children:`typeof`}),`, e.g. `,(0,d.jsx)(t.code,{children:`TypedSectionField<typeof path>`}),`, keeping the section type and the `,(0,d.jsx)(t.code,{children:`path`}),` prop in sync.`]}),`
`,(0,d.jsxs)(t.li,{children:[`See also the `,(0,d.jsx)(t.a,{href:`/uilib/extensions/forms/getting-started/#typescript-support`,children:`TypeScript support`}),` section in Getting started.`]}),`
`]}),`
`,(0,d.jsx)(t.h2,{children:`Register the data type once`}),`
`,(0,d.jsxs)(t.p,{children:[`Register your data type `,(0,d.jsx)(t.strong,{children:`globally`}),`. Augment the `,(0,d.jsx)(t.code,{children:`Register`}),` interface once:`]}),`
`,(0,d.jsx)(t.pre,{children:(0,d.jsx)(t.code,{className:`language-tsx`,children:`// forms-register.ts – imported once (e.g. from your app entry)
import type { MyData } from './types'

declare module '@dnb/eufemia/extensions/forms' {
  interface Register {
    formData: MyData
  }
}
`})}),`
`,(0,d.jsxs)(t.p,{children:[`With the registration in place, the `,(0,d.jsx)(t.code,{children:`path`}),` prop on every `,(0,d.jsx)(t.code,{children:`Field.*`}),` and `,(0,d.jsx)(t.code,{children:`Value.*`}),` autocompletes the valid paths directly:`]}),`
`,(0,d.jsx)(t.pre,{children:(0,d.jsx)(t.code,{className:`language-tsx`,children:`import { Field, Form } from '@dnb/eufemia/extensions/forms'

function MyForm() {
  return (
    <Form.Handler defaultData={{ firstName: 'Nora', age: 30 }}>
      <Form.Card>
        {/* Autocompletes /firstName, /age, /address/street … */}
        <Field.Name path="/firstName" />
        <Field.Number path="/age" />
      </Form.Card>
    </Form.Handler>
  )
}
`})}),`
`,(0,d.jsxs)(t.p,{children:[`This is `,(0,d.jsx)(t.strong,{children:`non-breaking`}),`: any string is still accepted, so relative paths inside `,(0,d.jsx)(t.a,{href:`/uilib/extensions/forms/Form/Section/`,children:`Form.Section`}),` and `,(0,d.jsx)(t.a,{href:`/uilib/extensions/forms/Iterate/`,children:`Iterate`}),`, as well as dynamic paths, keep working. Because of that, a typo like `,(0,d.jsx)(t.code,{children:`path="/unknown"`}),` is `,(0,d.jsx)(t.strong,{children:`not`}),` a hard error on the plain `,(0,d.jsx)(t.code,{children:`Field`}),`/`,(0,d.jsx)(t.code,{children:`Value`}),` – they get autocomplete, not compile-time errors.`]}),`
`,(0,d.jsx)(t.h3,{children:`Pre-typed namespaces`}),`
`,(0,d.jsxs)(t.p,{children:[`To turn typos into `,(0,d.jsx)(t.strong,{children:`compile-time errors`}),`, import the pre-typed namespaces (e.g. `,(0,d.jsx)(t.code,{children:`RegisteredForm`}),`) and alias them to `,(0,d.jsx)(t.code,{children:`Form`}),`/`,(0,d.jsx)(t.code,{children:`Field`}),`/`,(0,d.jsx)(t.code,{children:`Value`}),`/`,(0,d.jsx)(t.code,{children:`Iterate`}),`. They resolve the registered data type, so bare namespace access is fully type-checked:`]}),`
`,(0,d.jsxs)(t.ul,{children:[`
`,(0,d.jsx)(t.li,{children:(0,d.jsx)(t.code,{children:`RegisteredForm`})}),`
`,(0,d.jsx)(t.li,{children:(0,d.jsx)(t.code,{children:`RegisteredField`})}),`
`,(0,d.jsx)(t.li,{children:(0,d.jsx)(t.code,{children:`RegisteredValue`})}),`
`,(0,d.jsx)(t.li,{children:(0,d.jsx)(t.code,{children:`RegisteredIterate`})}),`
`]}),`
`,(0,d.jsxs)(t.p,{children:[`This relies on the `,(0,d.jsxs)(t.a,{href:`#register-the-data-type-once`,children:[(0,d.jsx)(t.code,{children:`declare module`}),` registration`]}),` being set – without it, the namespaces fall back to the default and accept any string instead of your data paths.`]}),`
`,(0,d.jsx)(t.pre,{children:(0,d.jsx)(t.code,{className:`language-tsx`,children:`import {
  RegisteredForm as Form,
  RegisteredField as Field,
} from '@dnb/eufemia/extensions/forms'

function MyForm() {
  return (
    <Form.Handler defaultData={{ firstName: 'Nora', age: 30 }}>
      <Form.Card>
        <Field.Name.First path="/firstName" />
        <Field.Name.Company path="/company/name" />

        {/* Type error: "/firstLast" is not a path in the registered data */}
        <Field.Name.Last path="/firstLast" />
      </Form.Card>
    </Form.Handler>
  )
}
`})}),`
`,(0,d.jsx)(f,{}),`
`,(0,d.jsxs)(t.p,{children:[`The `,(0,d.jsx)(t.code,{children:`path`}),` is checked against the `,(0,d.jsx)(t.strong,{children:`root`}),` data type, so absolute paths like `,(0,d.jsx)(t.code,{children:`/company/name`}),` are typed and typos are rejected. The section-relative `,(0,d.jsx)(t.code,{children:`path`}),` inside `,(0,d.jsx)(t.a,{href:`/uilib/extensions/forms/Form/Section/`,children:`Form.Section`}),` (such as `,(0,d.jsx)(t.code,{children:`/name`}),` for `,(0,d.jsx)(t.code,{children:`company.name`}),`) and the item-relative `,(0,d.jsx)(t.code,{children:`itemPath`}),` inside `,(0,d.jsx)(t.a,{href:`/uilib/extensions/forms/Iterate/`,children:`Iterate`}),` are not narrowed by the registered `,(0,d.jsx)(t.strong,{children:`root`}),` namespace – but both can be typed by deriving the nested type from the same registered root, with `,(0,d.jsx)(t.a,{href:`#type-checking-section-relative-paths`,children:(0,d.jsx)(t.code,{children:`TypedSectionField`})}),` and `,(0,d.jsx)(t.a,{href:`#type-checking-itempath-inside-iterate`,children:(0,d.jsx)(t.code,{children:`TypedItemField`})}),`.`]}),`
`,(0,d.jsxs)(t.p,{children:[`This binds `,(0,d.jsx)(t.strong,{children:`one`}),` data type globally.`]}),`
`,(0,d.jsx)(t.h3,{children:`Type-checking container paths`}),`
`,(0,d.jsxs)(t.p,{children:[`When you use the pre-typed `,(0,d.jsx)(t.code,{children:`RegisteredForm`}),` and `,(0,d.jsx)(t.code,{children:`RegisteredIterate`}),` namespaces, the `,(0,d.jsx)(t.code,{children:`path`}),` on the containers themselves is narrowed too: `,(0,d.jsx)(t.a,{href:`/uilib/extensions/forms/Form/Section/`,children:`Form.Section`}),` only accepts paths that point to an `,(0,d.jsx)(t.strong,{children:`object`}),`, and `,(0,d.jsx)(t.a,{href:`/uilib/extensions/forms/Iterate/Array/`,children:`Iterate.Array`}),` only accepts paths that point to an `,(0,d.jsx)(t.strong,{children:`array`}),`. A typo like `,(0,d.jsx)(t.code,{children:`path="/accountss"`}),` is therefore a compile-time error.`]}),`
`,(0,d.jsxs)(t.h3,{children:[`Type-checking `,(0,d.jsx)(t.code,{children:`itemPath`}),` inside Iterate`]}),`
`,(0,d.jsxs)(t.p,{children:[`Inside an `,(0,d.jsx)(t.a,{href:`/uilib/extensions/forms/Iterate/Array/`,children:`Iterate.Array`}),`, fields address each item with the `,(0,d.jsx)(t.strong,{children:`item-relative`}),` `,(0,d.jsx)(t.code,{children:`itemPath`}),` prop. Its valid paths come from the array `,(0,d.jsx)(t.strong,{children:`item`}),` type, not the root, so the registered root namespace leaves it as a plain string. You do not need a second registration: derive the item type from the `,(0,d.jsx)(t.strong,{children:`single`}),` registered root with `,(0,d.jsx)(t.code,{children:`TypedItemField`}),`, passing the same path you give to `,(0,d.jsx)(t.code,{children:`Iterate.Array`}),`.`]}),`
`,(0,d.jsx)(t.pre,{children:(0,d.jsx)(t.code,{className:`language-tsx`,children:`import {
  RegisteredField as Field,
  RegisteredIterate as Iterate,
} from '@dnb/eufemia/extensions/forms'
import type { TypedItemField } from '@dnb/eufemia/extensions/forms'

// Registered data: { accounts: Array<{ name: string; balance: number }> }
const { String: StringItem, Number: NumberItem } =
  Field as TypedItemField<'/accounts'>

function MyForm() {
  return (
    // The container path is checked too: "/accounts" must be an array path
    <Iterate.Array path="/accounts">
      <StringItem itemPath="/name" />
      <NumberItem itemPath="/balance" />

      {/* Type error: "/nope" is not a path in the array item */}
      <StringItem itemPath="/nope" />
    </Iterate.Array>
  )
}
`})}),`
`,(0,d.jsxs)(t.p,{children:[(0,d.jsx)(t.code,{children:`TypedItemValue`}),` narrows the `,(0,d.jsx)(t.code,{children:`Value`}),` namespace the same way. Because a single global `,(0,d.jsx)(t.code,{children:`Register`}),` binds one root data type, every nested object and array-item type is reachable from the one root – via `,(0,d.jsx)(t.code,{children:`TypedItemField`}),` for `,(0,d.jsx)(t.code,{children:`itemPath`}),` and the `,(0,d.jsx)(t.code,{children:`PathValue`}),` helper for deriving a sub-type.`]}),`
`,(0,d.jsx)(m,{}),`
`,(0,d.jsx)(t.h3,{children:`Type-checking section-relative paths`}),`
`,(0,d.jsxs)(t.p,{children:[`Inside a `,(0,d.jsx)(t.a,{href:`/uilib/extensions/forms/Form/Section/`,children:`Form.Section`}),`, fields address values with a `,(0,d.jsx)(t.code,{children:`path`}),` `,(0,d.jsx)(t.strong,{children:`relative to the section`}),` – the section path is prefixed automatically. Those relative paths come from the section's `,(0,d.jsx)(t.strong,{children:`object`}),` type, not the root, so the registered root namespace does not narrow them. As with Iterate, you do not need a second registration: derive the section type from the `,(0,d.jsx)(t.strong,{children:`single`}),` registered root with `,(0,d.jsx)(t.code,{children:`TypedSectionField`}),`, passing the same path you give to `,(0,d.jsx)(t.code,{children:`Form.Section`}),`.`]}),`
`,(0,d.jsx)(t.pre,{children:(0,d.jsx)(t.code,{className:`language-tsx`,children:`import {
  RegisteredField as Field,
  RegisteredForm as Form,
} from '@dnb/eufemia/extensions/forms'
import type { TypedSectionField } from '@dnb/eufemia/extensions/forms'

// Registered data: { company?: { name: string } }
// \`as unknown as\` because we re-narrow the already-root-typed namespace.
const { Name } = Field as unknown as TypedSectionField<'/company'>

function MyForm() {
  return (
    // The container path is checked too: "/company" must be an object path
    <Form.Section path="/company">
      {/* Checked against the section type, relative to /company */}
      <Name.Company path="/name" />

      {/* Type error: "/nope" is not a path in the section object */}
      <Name.Company path="/nope" />
    </Form.Section>
  )
}
`})}),`
`,(0,d.jsxs)(t.p,{children:[(0,d.jsx)(t.code,{children:`TypedSectionValue`}),` narrows the `,(0,d.jsx)(t.code,{children:`Value`}),` namespace the same way. This is the same single-registered-root model as `,(0,d.jsx)(t.code,{children:`TypedItemField`}),`: the section's type is resolved from the one registered root, so there is a single source of truth.`]}),`
`,(0,d.jsx)(p,{})]})}function g(e={}){let{wrapper:t}={...c(),...e.components};return t?(0,d.jsx)(t,{...e,children:(0,d.jsx)(h,{...e})}):h(e)}function _(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{g as default};