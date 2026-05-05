import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Rr as t}from"./index-CMgyXmp3.js";var n=e();function r(e){let r={a:`a`,code:`code`,h1:`h1`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...t(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.h1,{children:`Best Practices on Forms`}),`
`,(0,n.jsx)(r.p,{children:`This document provides a set of best practices to follow when creating forms for DNB.`}),`
`,(0,n.jsx)(r.h2,{children:`General`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`Ensure you have a `,(0,n.jsx)(r.code,{children:`form`}),` element. It will add support for additional keyboard (enter key) and auto-complete features. Use the `,(0,n.jsx)(r.a,{href:`/uilib/extensions/forms/Form/Handler/`,children:`Form.Handler`}),` that uses an HTML form element under the hood.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Ensure your form HTML elements have a semantic and unique `,(0,n.jsx)(r.code,{children:`name`}),`. By using the `,(0,n.jsx)(r.code,{children:`path`}),` property (e.g. `,(0,n.jsx)(r.code,{children:`path="/firstName"`}),`), it will set a unique `,(0,n.jsx)(r.code,{children:`name`}),` attribute to the rendered HTML element without the need of more work.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Ensure you have a submit button. Use the `,(0,n.jsx)(r.a,{href:`/uilib/extensions/forms/Form/SubmitButton/`,children:`Form.SubmitButton`}),` for that.`]}),`
`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-jsx`,children:`<Form.Handler>
  <Field.String path="/myField" />
  <Form.SubmitButton>Submit</Form.SubmitButton>
</Form.Handler>
`})}),`
`,(0,n.jsx)(r.h2,{children:`Workflow and browser features`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`Ensure to let browser autofill personal data if applicable, based on HTML `,(0,n.jsx)(r.a,{href:`https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete`,children:`autocomplete attributes`}),`. By using the `,(0,n.jsx)(r.code,{children:`path`}),` property with semantic names (e.g. `,(0,n.jsx)(r.code,{children:`path="/firstName"`}),`), browser can provide a correct autofill integration.`]}),`
`,(0,n.jsxs)(r.li,{children:[`In some cases, it is appreciated to temporary store user entered input data. Use the `,(0,n.jsx)(r.code,{children:`sessionStorageId`}),` feature provided by `,(0,n.jsx)(r.a,{href:`/uilib/extensions/forms/Form/Handler/`,children:`Form.Handler`}),` for that.`]}),`
`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-jsx`,children:`<Form.Handler sessionStorageId="my-form">
  <Field.String
    path="/organizationTitle"
    autoComplete="organization-title"
  />
</Form.Handler>
`})}),`
`,(0,n.jsx)(r.h2,{children:`Validation`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`The `,(0,n.jsx)(r.code,{children:`tab`}),` (Tab) key should be used to navigate between form fields. It should NOT trigger validation.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Required fields should have `,(0,n.jsx)(r.code,{children:`aria-required="true"`}),` attribute. Use the `,(0,n.jsx)(r.code,{children:`required`}),` property for that.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Validation should be triggered on `,(0,n.jsx)(r.code,{children:`submit`}),` events and on `,(0,n.jsx)(r.code,{children:`blur`}),` – if the user has made changes. In some cases, it is appreciated to trigger validation on `,(0,n.jsx)(r.code,{children:`change`}),` events. This behavior can be changed if needed by using `,(0,n.jsx)(r.code,{children:`validateInitially`}),`, `,(0,n.jsx)(r.code,{children:`validateUnchanged`}),` and `,(0,n.jsx)(r.code,{children:`validateContinuously`}),`. More info about these properties can be found in the `,(0,n.jsx)(r.a,{href:`/uilib/extensions/forms/create-component/useFieldProps/`,children:`useFieldProps`}),` documentation.`]}),`
`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-jsx`,children:`<Field.String
  path="/myField"
  required
  onBlurValidator={validationFunction}
/>
`})}),`
`,(0,n.jsx)(r.h2,{children:`Error messages`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`Fields with errors should have `,(0,n.jsx)(r.code,{children:`aria-invalid="true"`}),` attribute.`]}),`
`,(0,n.jsxs)(r.li,{children:[`When a `,(0,n.jsx)(r.a,{href:`/uilib/components/form-status/`,children:`FormStatus`}),` (Messageboxes) is used, it should be placed in the DOM before the form element itself and it should be linked together with the related form element by using `,(0,n.jsx)(r.code,{children:`aria-describedby`}),`. This is done automatically by the `,(0,n.jsx)(r.a,{href:`/uilib/extensions/forms/create-component/FieldBlock`,children:`FieldBlock`}),`, which is used in each `,(0,n.jsx)(r.a,{href:`/uilib/extensions/forms/all-fields/`,children:`field`}),`. This will allow screen readers to find and announce the error message without too much frustration.`]}),`
`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-jsx`,children:`<Field.String
  label="Show me an error message"
  required
  validateInitially
/>
`})}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`To improve user experience communication regarding errors and their locations, WCAG/UU suggests summarizing error messages when errors have occurred. Eufemia Forms will only display the summary when the form is being submitted and not when one field shows its error during the blur event.`}),`
`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-tsx`,children:`<GlobalStatus />
<Form.Handler>
  My Form
</Form.Handler>
`})}),`
`,(0,n.jsx)(r.h2,{children:`Semantics`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`When several form elements do share the same label, a `,(0,n.jsx)(r.code,{children:`fieldset`}),` and `,(0,n.jsx)(r.code,{children:`legend`}),` element should be used to group them together. Use the `,(0,n.jsx)(r.a,{href:`/uilib/extensions/forms/create-component/FieldBlock`,children:`FieldBlock`}),` for that.`]}),`
`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-jsx`,children:`<FieldBlock label="My legend">
  <Field.String path="/myFirstField" />
  <Field.String path="/mySecondField" />
</FieldBlock>
`})}),`
`,(0,n.jsx)(r.h2,{children:`Focus management`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`When replacing content on the screen dynamically, a screen reader user should receive a notice. The `,(0,n.jsx)(r.a,{href:`/uilib/extensions/forms/Wizard/`,children:`Wizard`}),` component includes focus and scroll management by default.`]}),`
`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-jsx`,children:`<Wizard.Container>
  <Wizard.Step title="Step 1">...</Wizard.Step>
  <Wizard.Step title="Step 2">...</Wizard.Step>
</Wizard.Container>
`})}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[`The `,(0,n.jsx)(r.a,{href:`/uilib/extensions/forms/Iterate/`,children:`Iterate`}),` component includes focus management for its Edit and View containers when opening, closing and deleting items.`]}),`
`,(0,n.jsxs)(r.li,{children:[`The `,(0,n.jsx)(r.a,{href:`/uilib/extensions/forms/Form/Section/`,children:`Form.Section`}),` component also has focus management by default like `,(0,n.jsx)(r.code,{children:`Iterate`}),` does.`]}),`
`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-jsx`,children:`<Wizard.Container>
  <Iterate.Array>
    <Iterate.AnimatedContainer>...</Iterate.AnimatedContainer>
  </Iterate.Array>
</Wizard.Container>
`})})]})}function i(e={}){let{wrapper:i}={...t(),...e.components};return i?(0,n.jsx)(i,{...e,children:(0,n.jsx)(r,{...e})}):r(e)}export{i as default};