import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Lr as t}from"./index-2AO2Cu5K.js";import n from"./ListDataContextComponents-CSvzfj-4.js";import{t as r}from"./ListFormComponents-DNWL89mJ.js";import{t as i}from"./ListIterateComponents-BxNtI_pL.js";import"./ListBaseValueComponents-CZWzAgOY.js";import{t as a}from"./ListWizardComponents-LBGgfq-9.js";var o=e();function s(e){let s={a:`a`,code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,h4:`h4`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...t(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(s.h1,{children:`All features and APIs`}),`
`,(0,o.jsx)(s.p,{children:(0,o.jsx)(s.strong,{children:`Table of Contents`})}),`
`,(0,o.jsxs)(s.ul,{children:[`
`,(0,o.jsx)(s.li,{children:(0,o.jsx)(s.a,{href:`#form`,children:`Form`})}),`
`,(0,o.jsx)(s.li,{children:(0,o.jsx)(s.a,{href:`#connectors`,children:`Connectors`})}),`
`,(0,o.jsx)(s.li,{children:(0,o.jsx)(s.a,{href:`#wizard`,children:`Wizard`})}),`
`,(0,o.jsx)(s.li,{children:(0,o.jsx)(s.a,{href:`#iterate`,children:`Iterate`})}),`
`,(0,o.jsx)(s.li,{children:(0,o.jsx)(s.a,{href:`#data-context`,children:`Data Context`})}),`
`,(0,o.jsx)(s.li,{children:(0,o.jsx)(s.a,{href:`#fieldblock`,children:`FieldBlock`})}),`
`,(0,o.jsx)(s.li,{children:(0,o.jsx)(s.a,{href:`#valueblock`,children:`ValueBlock`})}),`
`,(0,o.jsx)(s.li,{children:(0,o.jsx)(s.a,{href:`#usefieldprops`,children:`useFieldProps`})}),`
`,(0,o.jsx)(s.li,{children:(0,o.jsx)(s.a,{href:`#usevalueprops`,children:`useValueProps`})}),`
`]}),`
`,(0,o.jsx)(s.h2,{children:`Intro`}),`
`,(0,o.jsx)(s.p,{children:`Eufemia Forms is a flexible set of building blocks for form functionality. Besides field components and data display, it consists of more complex functionality for surrounding processes such as data flow, validation and building UI.`}),`
`,(0,o.jsx)(s.h2,{children:(0,o.jsx)(s.a,{href:`/uilib/extensions/forms/Form`,children:`Form`})}),`
`,(0,o.jsx)(s.p,{children:`Form provides the main forms-helpers including data provider and event handling. This makes it possible to do a combined processing of the data for a form, so you do not have to create individual distribution of data and callbacks to persist changes for each field individually.`}),`
`,(0,o.jsxs)(s.p,{children:[`Example using the `,(0,o.jsx)(s.a,{href:`/uilib/extensions/forms/Form/Handler`,children:`Form.Handler`}),` collecting data with `,(0,o.jsx)(s.code,{children:`onSubmit`}),`:`]}),`
`,(0,o.jsx)(s.pre,{children:(0,o.jsx)(s.code,{className:`language-jsx`,children:`import { Form, Field, Value } from '@dnb/eufemia/extensions/forms'

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
`,(0,o.jsxs)(s.p,{children:[`Here is a list of all available `,(0,o.jsx)(s.code,{children:`Form.*`}),` components:`]}),`
`,(0,o.jsx)(r,{size:`small`}),`
`,(0,o.jsx)(s.h3,{children:`Validation and error handling`}),`
`,(0,o.jsxs)(s.p,{children:[`You can provide `,(0,o.jsx)(s.a,{href:`/uilib/extensions/forms/getting-started/#validation-and-error-handling`,children:`custom logic`}),` and texts to handle and display error messages. More details about error messages can be found `,(0,o.jsx)(s.a,{href:`/uilib/extensions/forms/Form/error-messages`,children:`on a separate page`}),`.`]}),`
`,(0,o.jsx)(s.h3,{children:`Schema validation`}),`
`,(0,o.jsxs)(s.p,{children:[`Eufemia Forms does support `,(0,o.jsx)(s.a,{href:`https://ajv.js.org/`,children:`Ajv schema validator`}),` on both single fields and the whole data set – if needed.`]}),`
`,(0,o.jsxs)(s.p,{children:[(0,o.jsx)(s.a,{href:`https://json-schema.org/`,children:`JSON Schema`}),` is a flexible standard that makes it possible to describe the data's structure and validation needs, both for the individual value, and more complex rules across the data set.`]}),`
`,(0,o.jsxs)(s.p,{children:[`Descriptions and examples of such validation can be found `,(0,o.jsx)(s.a,{href:`/uilib/extensions/forms/Form/schema-validation`,children:`on a separate page`}),`.`]}),`
`,(0,o.jsxs)(s.p,{children:[`You can also `,(0,o.jsx)(s.a,{href:`/uilib/extensions/forms/Form/schema-validation/#custom-ajv-instance-and-keywords`,children:`create your own Ajv instance`}),` and pass it to your form.`]}),`
`,(0,o.jsxs)(s.p,{children:[`This is useful if you want to use a custom schema keyword and `,(0,o.jsx)(s.code,{children:`validate`}),` function or if you want to use a different version of Ajv.`]}),`
`,(0,o.jsx)(s.h4,{children:`Generate schema from fields`}),`
`,(0,o.jsxs)(s.p,{children:[`You can also easily generate an Ajv schema from a set of fields (JSX), by using the `,(0,o.jsx)(s.code,{children:`log`}),` property on the `,(0,o.jsx)(s.code,{children:`Tools.GenerateSchema`}),` component. It will e.g. console log the generated schema. More info about this feature can be found `,(0,o.jsx)(s.a,{href:`/uilib/extensions/forms/Form/schema-validation/#generate-schema-from-fields`,children:`on a separate page`})]}),`
`,(0,o.jsx)(s.h2,{children:(0,o.jsx)(s.a,{href:`/uilib/extensions/forms/Connectors/`,children:`Connectors`})}),`
`,(0,o.jsx)(s.p,{children:`Connectors are an opt-in way to extend the functionality of a form. They can be used to add features like API calls for autofill, validation, and more.`}),`
`,(0,o.jsx)(s.h2,{children:(0,o.jsx)(s.a,{href:`/uilib/extensions/forms/Wizard/`,children:`Wizard`})}),`
`,(0,o.jsx)(s.p,{children:`Wizard is a wrapper component for showing forms with a StepIndicator for navigation between several pages (multi-steps). It also includes components for navigating between steps.`}),`
`,(0,o.jsxs)(s.p,{children:[`Example using the `,(0,o.jsx)(s.a,{href:`/uilib/extensions/forms/Wizard/Container`,children:`Wizard.Container`}),` for handling stepped layouts:`]}),`
`,(0,o.jsx)(s.pre,{children:(0,o.jsx)(s.code,{className:`language-jsx`,children:`import { Wizard, Form } from '@dnb/eufemia/extensions/forms'

render(
  <Wizard.Container>
    <Wizard.Step title="Name">
      <Form.MainHeading>Profile</Form.MainHeading>
    </Wizard.Step>
  </Wizard.Container>
)
`})}),`
`,(0,o.jsxs)(s.p,{children:[`Here is a list of all available `,(0,o.jsx)(s.code,{children:`Wizard.*`}),` components:`]}),`
`,(0,o.jsx)(a,{size:`small`}),`
`,(0,o.jsx)(s.h2,{children:(0,o.jsx)(s.a,{href:`/uilib/extensions/forms/Iterate/`,children:`Iterate`})}),`
`,(0,o.jsxs)(s.p,{children:[(0,o.jsx)(s.code,{children:`Iterate`}),` contains components and functionality for traversing values and parts of data sets such as arrays, which contain a varying number of elements where the number of components on the screen depends on how many elements the data consists of.`]}),`
`,(0,o.jsx)(i,{size:`small`}),`
`,(0,o.jsx)(s.h2,{children:(0,o.jsx)(s.a,{href:`/uilib/extensions/forms/DataContext/`,children:`Data Context`})}),`
`,(0,o.jsxs)(s.p,{children:[(0,o.jsx)(s.code,{children:`DataContext`}),` builds a surrounding `,(0,o.jsx)(s.a,{href:`https://react.dev/learn/passing-data-deeply-with-context`,children:`React context`}),` that binds an entire source dataset together with the fields placed within. It enables fields and other components to retrieve data from the source data using `,(0,o.jsx)(s.code,{children:`path`}),` parameters that identify where in the source data the target value is located, and the same components will report changes to the data back so the context can update the dataset.`]}),`
`,(0,o.jsx)(n,{size:`small`}),`
`,(0,o.jsx)(s.h2,{children:(0,o.jsx)(s.a,{href:`/uilib/extensions/forms/create-component/FieldBlock`,children:`FieldBlock`})}),`
`,(0,o.jsxs)(s.p,{children:[(0,o.jsx)(s.code,{children:`FieldBlock`}),` is a reusable wrapper `,(0,o.jsx)(s.a,{href:`/uilib/extensions/forms/create-component/`,children:`for building`}),` interactive `,(0,o.jsx)(s.a,{href:`/uilib/extensions/forms/feature-fields`,children:`Field`}),` components.`]}),`
`,(0,o.jsx)(s.h2,{children:(0,o.jsx)(s.a,{href:`/uilib/extensions/forms/create-component/ValueBlock`,children:`ValueBlock`})}),`
`,(0,o.jsxs)(s.p,{children:[(0,o.jsx)(s.code,{children:`ValueBlock`}),` is a reusable wrapper for building `,(0,o.jsx)(s.a,{href:`/uilib/extensions/forms/Value`,children:`Value`}),` components.`]}),`
`,(0,o.jsx)(s.h2,{children:(0,o.jsx)(s.a,{href:`/uilib/extensions/forms/create-component/useFieldProps/`,children:`useFieldProps`})}),`
`,(0,o.jsxs)(s.p,{children:[`The `,(0,o.jsx)(s.code,{children:`useFieldProps`}),` hook standardize handling of the value flow for a single consumer component for one data point.`]}),`
`,(0,o.jsx)(s.h2,{children:(0,o.jsx)(s.a,{href:`/uilib/extensions/forms/create-component/useValueProps/`,children:`useValueProps`})}),`
`,(0,o.jsxs)(s.p,{children:[`The `,(0,o.jsx)(s.code,{children:`useValueProps`}),` hook standardize handling of the value flow for a single presentation component for one data point.`]})]})}function c(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,o.jsx)(n,{...e,children:(0,o.jsx)(s,{...e})}):s(e)}export{c as default};