import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Lr as t}from"./index-DVm0MbGb.js";import{a as n,i as r,n as i,o as a,r as o,t as s}from"./Examples-Cuw4mN4b.js";var c=e();function l(e){let l={a:`a`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...t(),...e.components};return o||d(`Examples`,!1),s||d(`Examples.AsyncWizardContainer`,!0),i||d(`Examples.Default`,!0),r||d(`Examples.OnSubmitRequest`,!0),n||d(`Examples.WithStatusMessage`,!0),a||d(`Examples.WithStatusMessageInMenu`,!0),(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(l.h2,{children:`Demos`}),`
`,(0,c.jsx)(l.h3,{children:`Basic usage`}),`
`,(0,c.jsx)(i,{}),`
`,(0,c.jsx)(l.h3,{children:`Async wizard`}),`
`,(0,c.jsx)(s,{}),`
`,(0,c.jsx)(l.h3,{children:`With StatusMessage in Menu`}),`
`,(0,c.jsxs)(l.p,{children:[`This example uses the `,(0,c.jsx)(l.code,{children:`loose`}),` mode to demonstrate status messages. Press the `,(0,c.jsx)(l.code,{children:`Send`}),` button to see the status message. You may also navigate to the previous steps and press the `,(0,c.jsx)(l.code,{children:`Send`}),` button again.`]}),`
`,(0,c.jsx)(a,{}),`
`,(0,c.jsx)(l.h3,{children:`With StatusMessage`}),`
`,(0,c.jsx)(n,{}),`
`,(0,c.jsx)(l.h3,{children:`Get errors before submit or step change`}),`
`,(0,c.jsxs)(l.p,{children:[`You can use the `,(0,c.jsx)(l.code,{children:`onSubmitRequest`}),` property on the `,(0,c.jsx)(l.a,{href:`/uilib/extensions/forms/Form/Handler/`,children:`Form.Handler`}),` to get visible errors before the form is submitted.`]}),`
`,(0,c.jsx)(l.p,{children:`Each item in the error array contains the following properties in an object:`}),`
`,(0,c.jsxs)(l.ul,{children:[`
`,(0,c.jsxs)(l.li,{children:[(0,c.jsx)(l.code,{children:`path`}),` The path of the field.`]}),`
`,(0,c.jsxs)(l.li,{children:[(0,c.jsx)(l.code,{children:`value`}),` The value of the field.`]}),`
`,(0,c.jsxs)(l.li,{children:[(0,c.jsx)(l.code,{children:`displayValue`}),` The displayed value of the field.`]}),`
`,(0,c.jsxs)(l.li,{children:[(0,c.jsx)(l.code,{children:`label`}),` The label of the field.`]}),`
`,(0,c.jsxs)(l.li,{children:[(0,c.jsx)(l.code,{children:`props`}),` The given field properties.`]}),`
`,(0,c.jsxs)(l.li,{children:[(0,c.jsx)(l.code,{children:`error`}),` The error of the field.`]}),`
`]}),`
`,(0,c.jsx)(l.pre,{children:(0,c.jsx)(l.code,{className:`language-tsx`,children:`const onSubmitRequest: OnSubmitRequest = ({ getErrors }) => {
  getErrors().forEach(
    ({ path, value, displayValue, label, props, error }) => {
      // Do something with the error
      console.log(label, error.message)
    }
  )
}
`})}),`
`,(0,c.jsx)(r,{})]})}function u(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,c.jsx)(n,{...e,children:(0,c.jsx)(l,{...e})}):l(e)}function d(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{u as default};