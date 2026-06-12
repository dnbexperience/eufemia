import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{K as n}from"./index-CsG353ar.js";import r from"./demos-BOtvM0Vo.js";var i=e(t());function a(e){let t={a:`a`,code:`code`,h2:`h2`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,ul:`ul`,...n(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h2,{children:`Import`}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Field } from '@dnb/eufemia/extensions/forms'
render(<Field.String />)
`})}),`
`,(0,i.jsx)(t.h2,{children:`Description`}),`
`,(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.code,{children:`Field.String`}),` is the base component for receiving user input where the target data is of type `,(0,i.jsx)(t.code,{children:`string`}),`.`]}),`
`,(0,i.jsxs)(t.p,{children:[`Before using this component, ensure there is not a more specific `,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/feature-fields/`,children:`field component`}),` available that better suits your needs.`]}),`
`,(0,i.jsxs)(t.p,{children:[`There is a corresponding `,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/Value/String`,children:`Value.String`}),` component.`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Field } from '@dnb/eufemia/extensions/forms'
render(<Field.String path="/myValue" />)
`})}),`
`,(0,i.jsx)(t.h2,{children:`Relevant links`}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/base-fields/String`,children:`Source code`})}),`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/base-fields/String`,children:`Docs code`})}),`
`]}),`
`,(0,i.jsx)(t.h2,{children:`Browser autofill`}),`
`,(0,i.jsxs)(t.p,{children:[`The string component supports HTML `,(0,i.jsx)(t.code,{children:`autocomplete`}),` `,(0,i.jsx)(t.a,{href:`https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete`,children:`attributes`}),`.`]}),`
`,(0,i.jsxs)(t.ol,{children:[`
`,(0,i.jsx)(t.li,{children:`You may either set the property directly on each field:`}),`
`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`<Form.Handler>
  <Field.String autoComplete="first-name" path="/your-pointer" />
  <Field.String autoComplete="last-name" path="/your-pointer" />
</Form.Handler>
`})}),`
`,(0,i.jsxs)(t.ol,{start:`2`,children:[`
`,(0,i.jsxs)(t.li,{children:[`Or use the "less-code" approach by just giving the data pointer `,(0,i.jsx)(t.code,{children:`path`}),` a meaningful name:`]}),`
`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`<Form.Handler autoComplete={true}>
  <Field.String path="/firstName" />
  <Field.String path="/lastName" />
</Form.Handler>
`})}),`
`,(0,i.jsxs)(t.p,{children:[`The `,(0,i.jsx)(t.code,{children:`path`}),` property will be used to set the `,(0,i.jsx)(t.code,{children:`name`}),` attribute.`]}),`
`,(0,i.jsx)(t.h2,{children:`Accessibility`}),`
`,(0,i.jsxs)(t.p,{children:[`Avoid using the `,(0,i.jsx)(t.code,{children:`maxlength`}),` attribute when possible, as it is not accessible. Instead, use `,(0,i.jsx)(t.a,{href:`/uilib/components/fragments/text-counter/`,children:`TextCounter`}),` together with `,(0,i.jsx)(t.code,{children:`Field.String`}),`.`]}),`
`,(0,i.jsxs)(t.p,{children:[`A demo of how to use the `,(0,i.jsx)(t.code,{children:`TextCounter`}),` with `,(0,i.jsx)(t.code,{children:`Field.String`}),` can be found `,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/base-fields/String/#validation-maximum-length-with-textcounter`,children:`here`}),`.`]}),`
`,(0,i.jsx)(t.p,{children:`This way, the user receives visual feedback on the number of characters entered and the maximum allowed, without being limited in their workflow.`}),`
`,(0,i.jsxs)(t.p,{children:[`You can still set the desired maximum number of characters by using the `,(0,i.jsx)(t.code,{children:`maxLength`}),` property in Eufemia Forms.`]})]})}function o(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}function s(e){return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(o,{}),`
`,(0,i.jsx)(r,{})]})}function c(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(s,{...e})}):s(e)}export{c as default};