import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{K as n}from"./index-CsG353ar.js";import r from"./demos-BTuSZilT.js";var i=e(t());function a(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...n(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h2,{children:`Import`}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Field } from '@dnb/eufemia/extensions/forms'
render(<Field.OrganizationNumber />)
`})}),`
`,(0,i.jsx)(t.h2,{children:`Description`}),`
`,(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.code,{children:`Field.OrganizationNumber`}),` is a wrapper component for `,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/base-fields/String`,children:`string input`}),`, with user experience tailored for organization number values.`]}),`
`,(0,i.jsxs)(t.p,{children:[`This input expects a 9-digit number as its value. This is because Norwegian organization numbers are 9 digits long, based on information from `,(0,i.jsx)(t.a,{href:`https://www.brreg.no/en/about-us-2/our-registers/about-the-central-coordinating-register-for-legal-entities-ccr/about-the-organisation-number/?nocache=1701776533136`,children:`Brønnøysundregisteret`}),`.
It validates input for Norwegian organization numbers as described by `,(0,i.jsx)(t.a,{href:`https://www.brreg.no/om-oss/registrene-vare/om-enhetsregisteret/organisasjonsnummeret/`,children:`Brønnøysundregistrene`}),`, and in addition, we validate `,(0,i.jsx)(t.code,{children:`000 000 000`}),` as invalid.
The validation happens on blur, internally using the `,(0,i.jsx)(t.code,{children:`onBlurValidator`}),` `,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/feature-fields/OrganizationNumber/properties/#field-specific-properties`,children:`property`}),`.`]}),`
`,(0,i.jsxs)(t.p,{children:[`There is a corresponding `,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/Value/OrganizationNumber`,children:`Value.OrganizationNumber`}),` component.`]}),`
`,(0,i.jsx)(t.h2,{children:`Relevant links`}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Field/OrganizationNumber`,children:`Source code`})}),`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/feature-fields/OrganizationNumber`,children:`Docs code`})}),`
`]}),`
`,(0,i.jsx)(t.h2,{children:`Validators`}),`
`,(0,i.jsx)(t.h3,{children:`Internal validators exposed`}),`
`,(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.code,{children:`Field.OrganizationNumber`}),` exposes the `,(0,i.jsx)(t.code,{children:`organizationNumberValidator`}),` validator through its `,(0,i.jsx)(t.code,{children:`onChangeValidator`}),` and `,(0,i.jsx)(t.code,{children:`onBlurValidator`}),` properties. Take a look at `,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/feature-fields/OrganizationNumber/demos/#extend-validation-with-custom-validation-function`,children:`this demo`}),`.
The `,(0,i.jsx)(t.code,{children:`organizationNumberValidator`}),` validator validates whether the organization number provided is a `,(0,i.jsx)(t.a,{href:`https://www.brreg.no/om-oss/registrene-vare/om-enhetsregisteret/organisasjonsnummeret/`,children:`Norwegian organization number`}),` or not.`]}),`
`,(0,i.jsx)(t.h3,{children:`Extending validators`}),`
`,(0,i.jsxs)(t.p,{children:[`Return both the exported validator and a custom rule to extend validation safely. Import `,(0,i.jsx)(t.code,{children:`OrganizationNumberValidator`}),` to type your validator and the `,(0,i.jsx)(t.code,{children:`validators`}),` object.`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Field } from '@dnb/eufemia/extensions/forms'
import type { OrganizationNumberValidator } from '@dnb/eufemia/extensions/forms/Field/OrganizationNumber'

const myValidator: OrganizationNumberValidator = (
  value,
  { validators }
) => {
  const { organizationNumberValidator } = validators ?? {}
  const oddChecker = (value: string) => {
    if (value && parseInt(value.slice(-1), 10) % 2 === 0) {
      return new Error('Organization number must end with an odd digit')
    }
  }

  // Reuse the built-in validator and add an odd-digit rule.
  return [organizationNumberValidator, oddChecker]
}

render(<Field.OrganizationNumber onBlurValidator={myValidator} />)
`})})]})}function o(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}function s(e){return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(o,{}),`
`,(0,i.jsx)(r,{})]})}function c(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(s,{...e})}):s(e)}export{c as default};