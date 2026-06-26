import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{U as n}from"./index-kfZVC31v.js";import r from"./ListDataContextComponents-C-DHF50X.js";import{t as i}from"./ListFormComponents-DCwyDPKi.js";import{t as a}from"./ListIterateComponents-DrfsIBKM.js";import{t as o}from"./ListWizardComponents-NfDhQF45.js";var s=e(t());function c(e){let t={a:`a`,code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,h4:`h4`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...n(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.h1,{children:`All features and APIs`}),`
`,(0,s.jsx)(t.p,{children:(0,s.jsx)(t.strong,{children:`Table of Contents`})}),`
`,(0,s.jsxs)(t.ul,{children:[`
`,(0,s.jsx)(t.li,{children:(0,s.jsx)(t.a,{href:`#form`,children:`Form`})}),`
`,(0,s.jsx)(t.li,{children:(0,s.jsx)(t.a,{href:`#connectors`,children:`Connectors`})}),`
`,(0,s.jsx)(t.li,{children:(0,s.jsx)(t.a,{href:`#wizard`,children:`Wizard`})}),`
`,(0,s.jsx)(t.li,{children:(0,s.jsx)(t.a,{href:`#iterate`,children:`Iterate`})}),`
`,(0,s.jsx)(t.li,{children:(0,s.jsx)(t.a,{href:`#data-context`,children:`Data Context`})}),`
`,(0,s.jsx)(t.li,{children:(0,s.jsx)(t.a,{href:`#type-checked-paths`,children:`Type-checked paths`})}),`
`,(0,s.jsx)(t.li,{children:(0,s.jsx)(t.a,{href:`#fieldblock`,children:`FieldBlock`})}),`
`,(0,s.jsx)(t.li,{children:(0,s.jsx)(t.a,{href:`#valueblock`,children:`ValueBlock`})}),`
`,(0,s.jsx)(t.li,{children:(0,s.jsx)(t.a,{href:`#usefieldprops`,children:`useFieldProps`})}),`
`,(0,s.jsx)(t.li,{children:(0,s.jsx)(t.a,{href:`#usevalueprops`,children:`useValueProps`})}),`
`]}),`
`,(0,s.jsx)(t.h2,{children:`Intro`}),`
`,(0,s.jsx)(t.p,{children:`Eufemia Forms is a flexible set of building blocks for form functionality. Besides field components and data display, it consists of more complex functionality for surrounding processes such as data flow, validation and building UI.`}),`
`,(0,s.jsx)(t.h2,{children:(0,s.jsx)(t.a,{href:`/uilib/extensions/forms/Form`,children:`Form`})}),`
`,(0,s.jsx)(t.p,{children:`Form provides the main forms-helpers including data provider and event handling. This makes it possible to do a combined processing of the data for a form, so you do not have to create individual distribution of data and callbacks to persist changes for each field individually.`}),`
`,(0,s.jsxs)(t.p,{children:[`Example using the `,(0,s.jsx)(t.a,{href:`/uilib/extensions/forms/Form/Handler`,children:`Form.Handler`}),` collecting data with `,(0,s.jsx)(t.code,{children:`onSubmit`}),`:`]}),`
`,(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:`language-jsx`,children:`import { Form, Field, Value } from '@dnb/eufemia/extensions/forms'

const existingData = {
  email: 'name@email.no'
  date: '2024-01-01'
}

// The submit handler can be async
const submitHandler = async (data) => {
  try {
    await makeRequest(data)
  } catch (error) {
    return error
  }
}

function Component() {
  return (
    <Form.Handler defaultData={existingData} onSubmit={submitHandler}>
      <Field.Email path="/email" />
      <Value.Date path="/date" />
      <Form.SubmitButton />
    </Form.Handler>
  )
}
`})}),`
`,(0,s.jsxs)(t.p,{children:[`Here is a list of all available `,(0,s.jsx)(t.code,{children:`Form.*`}),` components:`]}),`
`,(0,s.jsx)(i,{size:`small`}),`
`,(0,s.jsxs)(t.p,{children:[`To render fields and form building blocks outside the `,(0,s.jsx)(t.code,{children:`Form.Handler`}),` subtree while still linking to the same handler data context, use `,(0,s.jsx)(t.a,{href:`/uilib/extensions/forms/Form/Outlet/`,children:`Form.Outlet`}),` with a shared form handler id (`,(0,s.jsx)(t.code,{children:`formHandlerId`}),`).`]}),`
`,(0,s.jsx)(t.h3,{children:`Validation and error handling`}),`
`,(0,s.jsxs)(t.p,{children:[`You can provide `,(0,s.jsx)(t.a,{href:`/uilib/extensions/forms/getting-started/#validation-and-error-handling`,children:`custom logic`}),` and texts to handle and display error messages. More details about error messages can be found `,(0,s.jsx)(t.a,{href:`/uilib/extensions/forms/Form/error-messages`,children:`on a separate page`}),`.`]}),`
`,(0,s.jsx)(t.h3,{children:`Schema validation`}),`
`,(0,s.jsxs)(t.p,{children:[`Eufemia Forms does support `,(0,s.jsx)(t.a,{href:`https://ajv.js.org/`,children:`Ajv schema validator`}),` on both single fields and the whole data set – if needed.`]}),`
`,(0,s.jsxs)(t.p,{children:[(0,s.jsx)(t.a,{href:`https://json-schema.org/`,children:`JSON Schema`}),` is a flexible standard that makes it possible to describe the data's structure and validation needs, both for the individual value, and more complex rules across the data set.`]}),`
`,(0,s.jsxs)(t.p,{children:[`Descriptions and examples of such validation can be found `,(0,s.jsx)(t.a,{href:`/uilib/extensions/forms/Form/schema-validation`,children:`on a separate page`}),`.`]}),`
`,(0,s.jsxs)(t.p,{children:[`You can also `,(0,s.jsx)(t.a,{href:`/uilib/extensions/forms/Form/schema-validation/#custom-ajv-instance-and-keywords`,children:`create your own Ajv instance`}),` and pass it to your form.`]}),`
`,(0,s.jsxs)(t.p,{children:[`This is useful if you want to use a custom schema keyword and `,(0,s.jsx)(t.code,{children:`validate`}),` function or if you want to use a different version of Ajv.`]}),`
`,(0,s.jsx)(t.h4,{children:`Generate schema from fields`}),`
`,(0,s.jsxs)(t.p,{children:[`You can also easily generate an Ajv schema from a set of fields (JSX), by using the `,(0,s.jsx)(t.code,{children:`log`}),` property on the `,(0,s.jsx)(t.code,{children:`Tools.GenerateSchema`}),` component. It will e.g. console log the generated schema. More info about this feature can be found `,(0,s.jsx)(t.a,{href:`/uilib/extensions/forms/Form/schema-validation/#generate-schema-from-fields`,children:`on a separate page`})]}),`
`,(0,s.jsx)(t.h2,{children:(0,s.jsx)(t.a,{href:`/uilib/extensions/forms/Connectors/`,children:`Connectors`})}),`
`,(0,s.jsx)(t.p,{children:`Connectors are an opt-in way to extend the functionality of a form. They can be used to add features like API calls for autofill, validation, and more.`}),`
`,(0,s.jsx)(t.h2,{children:(0,s.jsx)(t.a,{href:`/uilib/extensions/forms/Wizard/`,children:`Wizard`})}),`
`,(0,s.jsx)(t.p,{children:`Wizard is a wrapper component for showing forms with a StepIndicator for navigation between several pages (multi-steps). It also includes components for navigating between steps.`}),`
`,(0,s.jsxs)(t.p,{children:[`Example using the `,(0,s.jsx)(t.a,{href:`/uilib/extensions/forms/Wizard/Container`,children:`Wizard.Container`}),` for handling stepped layouts:`]}),`
`,(0,s.jsx)(t.pre,{children:(0,s.jsx)(t.code,{className:`language-jsx`,children:`import { Wizard, Form } from '@dnb/eufemia/extensions/forms'

render(
  <Wizard.Container>
    <Wizard.Step title="Name">
      <Form.MainHeading>Profile</Form.MainHeading>
    </Wizard.Step>
  </Wizard.Container>
)
`})}),`
`,(0,s.jsxs)(t.p,{children:[`Here is a list of all available `,(0,s.jsx)(t.code,{children:`Wizard.*`}),` components:`]}),`
`,(0,s.jsx)(o,{size:`small`}),`
`,(0,s.jsx)(t.h2,{children:(0,s.jsx)(t.a,{href:`/uilib/extensions/forms/Iterate/`,children:`Iterate`})}),`
`,(0,s.jsxs)(t.p,{children:[(0,s.jsx)(t.code,{children:`Iterate`}),` contains components and functionality for traversing values and parts of data sets such as arrays, which contain a varying number of elements where the number of components on the screen depends on how many elements the data consists of.`]}),`
`,(0,s.jsx)(a,{size:`small`}),`
`,(0,s.jsx)(t.h2,{children:(0,s.jsx)(t.a,{href:`/uilib/extensions/forms/DataContext/`,children:`Data Context`})}),`
`,(0,s.jsxs)(t.p,{children:[(0,s.jsx)(t.code,{children:`DataContext`}),` builds a surrounding `,(0,s.jsx)(t.a,{href:`https://react.dev/learn/passing-data-deeply-with-context`,children:`React context`}),` that binds an entire source dataset together with the fields placed within. It enables fields and other components to retrieve data from the source data using `,(0,s.jsx)(t.code,{children:`path`}),` parameters that identify where in the source data the target value is located, and the same components will report changes to the data back so the context can update the dataset.`]}),`
`,(0,s.jsx)(r,{size:`small`}),`
`,(0,s.jsx)(t.h2,{children:(0,s.jsx)(t.a,{href:`/uilib/extensions/forms/typed-paths/`,children:`Type-checked paths`})}),`
`,(0,s.jsxs)(t.p,{children:[`Register your form data type once via the `,(0,s.jsx)(t.code,{children:`Register`}),` interface, and the `,(0,s.jsx)(t.code,{children:`path`}),` prop on every field and value gets autocomplete and compile-time checking. Opt into the pre-typed `,(0,s.jsx)(t.code,{children:`RegisteredField`}),`, `,(0,s.jsx)(t.code,{children:`RegisteredValue`}),`, `,(0,s.jsx)(t.code,{children:`RegisteredForm`}),` and `,(0,s.jsx)(t.code,{children:`RegisteredIterate`}),` namespaces to turn path typos into hard compile-time errors.`]}),`
`,(0,s.jsx)(t.h2,{children:(0,s.jsx)(t.a,{href:`/uilib/extensions/forms/create-component/FieldBlock`,children:`FieldBlock`})}),`
`,(0,s.jsxs)(t.p,{children:[(0,s.jsx)(t.code,{children:`FieldBlock`}),` is a reusable wrapper `,(0,s.jsx)(t.a,{href:`/uilib/extensions/forms/create-component/`,children:`for building`}),` interactive `,(0,s.jsx)(t.a,{href:`/uilib/extensions/forms/feature-fields`,children:`Field`}),` components.`]}),`
`,(0,s.jsx)(t.h2,{children:(0,s.jsx)(t.a,{href:`/uilib/extensions/forms/create-component/ValueBlock`,children:`ValueBlock`})}),`
`,(0,s.jsxs)(t.p,{children:[(0,s.jsx)(t.code,{children:`ValueBlock`}),` is a reusable wrapper for building `,(0,s.jsx)(t.a,{href:`/uilib/extensions/forms/Value`,children:`Value`}),` components.`]}),`
`,(0,s.jsx)(t.h2,{children:(0,s.jsx)(t.a,{href:`/uilib/extensions/forms/create-component/useFieldProps/`,children:`useFieldProps`})}),`
`,(0,s.jsxs)(t.p,{children:[`The `,(0,s.jsx)(t.code,{children:`useFieldProps`}),` hook standardize handling of the value flow for a single consumer component for one data point.`]}),`
`,(0,s.jsx)(t.h2,{children:(0,s.jsx)(t.a,{href:`/uilib/extensions/forms/create-component/useValueProps/`,children:`useValueProps`})}),`
`,(0,s.jsxs)(t.p,{children:[`The `,(0,s.jsx)(t.code,{children:`useValueProps`}),` hook standardize handling of the value flow for a single presentation component for one data point.`]})]})}function l(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(c,{...e})}):c(e)}export{l as default};