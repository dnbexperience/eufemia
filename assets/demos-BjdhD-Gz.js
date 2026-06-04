import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{W as n}from"./index-D7e1avVt.js";import{a as r,i,n as a,o,r as s,t as c}from"./Examples-C8DfaFw1.js";var l=e(t());function u(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...n(),...e.components};return s||f(`Examples`,!1),c||f(`Examples.AsyncWizardContainer`,!0),a||f(`Examples.Default`,!0),i||f(`Examples.OnSubmitRequest`,!0),r||f(`Examples.WithStatusMessage`,!0),o||f(`Examples.WithStatusMessageInMenu`,!0),(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(t.h2,{children:`Demos`}),`
`,(0,l.jsx)(t.h3,{children:`Basic usage`}),`
`,(0,l.jsx)(a,{}),`
`,(0,l.jsx)(t.h3,{children:`Async wizard`}),`
`,(0,l.jsx)(c,{}),`
`,(0,l.jsx)(t.h3,{children:`With StatusMessage in Menu`}),`
`,(0,l.jsxs)(t.p,{children:[`This example uses the `,(0,l.jsx)(t.code,{children:`loose`}),` mode to demonstrate status messages. Press the `,(0,l.jsx)(t.code,{children:`Send`}),` button to see the status message. You may also navigate to the previous steps and press the `,(0,l.jsx)(t.code,{children:`Send`}),` button again.`]}),`
`,(0,l.jsx)(o,{}),`
`,(0,l.jsx)(t.h3,{children:`With StatusMessage`}),`
`,(0,l.jsx)(r,{}),`
`,(0,l.jsx)(t.h3,{children:`Get errors before submit or step change`}),`
`,(0,l.jsxs)(t.p,{children:[`You can use the `,(0,l.jsx)(t.code,{children:`onSubmitRequest`}),` property on the `,(0,l.jsx)(t.a,{href:`/uilib/extensions/forms/Form/Handler/`,children:`Form.Handler`}),` to get visible errors before the form is submitted.`]}),`
`,(0,l.jsx)(t.p,{children:`Each item in the error array contains the following properties in an object:`}),`
`,(0,l.jsxs)(t.ul,{children:[`
`,(0,l.jsxs)(t.li,{children:[(0,l.jsx)(t.code,{children:`path`}),` The path of the field.`]}),`
`,(0,l.jsxs)(t.li,{children:[(0,l.jsx)(t.code,{children:`value`}),` The value of the field.`]}),`
`,(0,l.jsxs)(t.li,{children:[(0,l.jsx)(t.code,{children:`displayValue`}),` The displayed value of the field.`]}),`
`,(0,l.jsxs)(t.li,{children:[(0,l.jsx)(t.code,{children:`label`}),` The label of the field.`]}),`
`,(0,l.jsxs)(t.li,{children:[(0,l.jsx)(t.code,{children:`props`}),` The given field properties.`]}),`
`,(0,l.jsxs)(t.li,{children:[(0,l.jsx)(t.code,{children:`error`}),` The error of the field.`]}),`
`]}),`
`,(0,l.jsx)(t.pre,{children:(0,l.jsx)(t.code,{className:`language-tsx`,children:`const onSubmitRequest: OnSubmitRequest = ({ getErrors }) => {
  getErrors().forEach(
    ({ path, value, displayValue, label, props, error }) => {
      // Do something with the error
      console.log(label, error.message)
    }
  )
}
`})}),`
`,(0,l.jsx)(i,{})]})}function d(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,l.jsx)(t,{...e,children:(0,l.jsx)(u,{...e})}):u(e)}function f(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{d as default};