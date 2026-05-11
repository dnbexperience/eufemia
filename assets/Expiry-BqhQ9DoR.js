import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Lr as t}from"./index-DVm0MbGb.js";import n from"./demos-CZM7Abai.js";var r=e();function i(e){let n={a:`a`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...t(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h2,{children:`Import`}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Field } from '@dnb/eufemia/extensions/forms'
render(<Field.Expiry />)
`})}),`
`,(0,r.jsx)(n.h2,{children:`Description`}),`
`,(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:`Field.Expiry`}),` is a wrapper component for `,(0,r.jsx)(n.a,{href:`/uilib/extensions/forms/base-fields/String`,children:`string input`}),`, with user experience tailored for expiry dates on payment cards.`]}),`
`,(0,r.jsxs)(n.p,{children:[`It supports the HTML `,(0,r.jsx)(n.a,{href:`https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete`,children:`autocomplete`}),` attribute and by default sets it to `,(0,r.jsx)(n.code,{children:`cc-exp-month`}),` for the month field and to `,(0,r.jsx)(n.code,{children:`cc-exp-year`}),` for the year field.`]}),`
`,(0,r.jsx)(n.h2,{children:`Relevant links`}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Field/Expiry`,children:`Source code`})}),`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/feature-fields/Expiry`,children:`Docs code`})}),`
`]}),`
`,(0,r.jsx)(n.h2,{children:`Validators`}),`
`,(0,r.jsx)(n.h3,{children:`Internal validators exposed`}),`
`,(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:`Field.Expiry`}),` exposes the `,(0,r.jsx)(n.code,{children:`expiryValidator`}),` validator through its `,(0,r.jsx)(n.code,{children:`onBlurValidator`}),` property. Take a look at `,(0,r.jsx)(n.a,{href:`/uilib/extensions/forms/feature-fields/Expiry/demos/#extend-validation-with-custom-validation-function`,children:`this demo`}),`.
The `,(0,r.jsx)(n.code,{children:`expiryValidator`}),` validator validates invalid months and/or years.`]}),`
`,(0,r.jsx)(n.h3,{children:`Extending validators`}),`
`,(0,r.jsxs)(n.p,{children:[`Combine the exported validator with your own rules to keep the built-in checks and add custom guards. Import `,(0,r.jsx)(n.code,{children:`ExpiryValidator`}),` to type your validator and the shared `,(0,r.jsx)(n.code,{children:`validators`}),`.`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Field } from '@dnb/eufemia/extensions/forms'
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
`})})]})}function a(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(i,{...e})}):i(e)}function o(e){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(a,{}),`
`,(0,r.jsx)(n,{})]})}function s(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(o,{...e})}):o(e)}export{s as default};