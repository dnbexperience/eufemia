import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{B as n}from"./index-DdG6L_K8.js";import r from"./demos-a4Y1SHhW.js";var i=e(t());function a(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...n(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h2,{children:`Import`}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Field } from '@dnb/eufemia/extensions/forms'
render(<Field.Expiry />)
`})}),`
`,(0,i.jsx)(t.h2,{children:`Description`}),`
`,(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.code,{children:`Field.Expiry`}),` is a wrapper component for `,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/base-fields/String`,children:`string input`}),`, with user experience tailored for expiry dates on payment cards.`]}),`
`,(0,i.jsxs)(t.p,{children:[`It supports the HTML `,(0,i.jsx)(t.a,{href:`https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete`,children:`autocomplete`}),` attribute and by default sets it to `,(0,i.jsx)(t.code,{children:`cc-exp-month`}),` for the month field and to `,(0,i.jsx)(t.code,{children:`cc-exp-year`}),` for the year field.`]}),`
`,(0,i.jsx)(t.h2,{children:`Relevant links`}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Field/Expiry`,children:`Source code`})}),`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/feature-fields/Expiry`,children:`Docs code`})}),`
`]}),`
`,(0,i.jsx)(t.h2,{children:`Validators`}),`
`,(0,i.jsx)(t.h3,{children:`Internal validators exposed`}),`
`,(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.code,{children:`Field.Expiry`}),` exposes the `,(0,i.jsx)(t.code,{children:`expiryValidator`}),` validator through its `,(0,i.jsx)(t.code,{children:`onBlurValidator`}),` property. Take a look at `,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/feature-fields/Expiry/demos/#extend-validation-with-custom-validation-function`,children:`this demo`}),`.
The `,(0,i.jsx)(t.code,{children:`expiryValidator`}),` validator validates invalid months and/or years.`]}),`
`,(0,i.jsx)(t.h3,{children:`Extending validators`}),`
`,(0,i.jsxs)(t.p,{children:[`Combine the exported validator with your own rules to keep the built-in checks and add custom guards. Import `,(0,i.jsx)(t.code,{children:`ExpiryValidator`}),` to type your validator and the shared `,(0,i.jsx)(t.code,{children:`validators`}),`.`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Field } from '@dnb/eufemia/extensions/forms'
import type { ExpiryValidator } from '@dnb/eufemia/extensions/forms/Field/Expiry'

const myValidator: ExpiryValidator = (value, { validators }) => {
  const { expiryValidator } = validators ?? {}
  const monthNotZero = (value: string) => {
    if (value && value.slice(0, 2) === '00') {
      return new Error('Month cannot be 00')
    }
  }

  // Return both the built-in validator and the custom month check.
  return [expiryValidator, monthNotZero]
}

render(<Field.Expiry onBlurValidator={myValidator} />)
`})})]})}function o(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}function s(e){return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(o,{}),`
`,(0,i.jsx)(r,{})]})}function c(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(s,{...e})}):s(e)}export{c as default};