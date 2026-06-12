import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{K as n}from"./index-CsG353ar.js";import r from"./demos-BMLmYaeg.js";var i=e(t());function a(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...n(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h2,{children:`Import`}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Field } from '@dnb/eufemia/extensions/forms'
render(<Field.Time />)
`})}),`
`,(0,i.jsx)(t.h2,{children:`Description`}),`
`,(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.code,{children:`Field.Time`}),` is a wrapper component for `,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/base-fields/String`,children:`string input`}),`, with user experience tailored for time input (hours, minutes and seconds).`]}),`
`,(0,i.jsxs)(t.p,{children:[`It uses a segmented input with spin buttons, allowing users to input hours (0–23), minutes (0–59), and optionally seconds (0–59) with the `,(0,i.jsx)(t.code,{children:`showSeconds`}),` prop.`]}),`
`,(0,i.jsxs)(t.p,{children:[`The value format is `,(0,i.jsx)(t.code,{children:`"HH:mm"`}),` (e.g. `,(0,i.jsx)(t.code,{children:`"14:30"`}),`), or `,(0,i.jsx)(t.code,{children:`"HH:mm:ss"`}),` (e.g. `,(0,i.jsx)(t.code,{children:`"14:30:45"`}),`) when `,(0,i.jsx)(t.code,{children:`showSeconds`}),` is enabled.`]}),`
`,(0,i.jsxs)(t.p,{children:[`There is a corresponding `,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/Value/Time`,children:`Value.Time`}),` component.`]}),`
`,(0,i.jsx)(t.h2,{children:`Relevant links`}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Field/Time`,children:`Source code`})}),`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/feature-fields/Time`,children:`Docs code`})}),`
`]}),`
`,(0,i.jsx)(t.h2,{children:`Validators`}),`
`,(0,i.jsx)(t.h3,{children:`Internal validators exposed`}),`
`,(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.code,{children:`Field.Time`}),` exposes the `,(0,i.jsx)(t.code,{children:`timeValidator`}),` validator through its `,(0,i.jsx)(t.code,{children:`onBlurValidator`}),` property. Take a look at `,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/feature-fields/Time/demos/#extend-validation-with-custom-validation-function`,children:`this demo`}),`.
The `,(0,i.jsx)(t.code,{children:`timeValidator`}),` validator validates invalid hours, minutes, and seconds.`]}),`
`,(0,i.jsx)(t.h3,{children:`Extending validators`}),`
`,(0,i.jsxs)(t.p,{children:[`Combine the exported validator with your own rules to keep the built-in checks and add custom guards. Import `,(0,i.jsx)(t.code,{children:`TimeValidator`}),` to type your validator and the shared `,(0,i.jsx)(t.code,{children:`validators`}),`.`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Field } from '@dnb/eufemia/extensions/forms'
import type { TimeValidator } from '@dnb/eufemia/extensions/forms/Field/Time'

const myValidator: TimeValidator = (value, { validators }) => {
  const { timeValidator } = validators ?? {}
  const noMidnight = (value: string) => {
    if (value === '00:00') {
      return new Error('Midnight is not allowed')
    }
  }

  return [timeValidator, noMidnight]
}

render(<Field.Time onBlurValidator={myValidator} />)
`})})]})}function o(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}function s(e){return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(o,{}),`
`,(0,i.jsx)(r,{})]})}function c(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(s,{...e})}):s(e)}export{c as default};