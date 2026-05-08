import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Lr as t}from"./index-2AO2Cu5K.js";import n from"./demos-mTDxj6Uv.js";var r=e();function i(e){let n={a:`a`,code:`code`,h2:`h2`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,ul:`ul`,...t(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h2,{children:`Import`}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Field } from '@dnb/eufemia/extensions/forms'
render(<Field.String />)
`})}),`
`,(0,r.jsx)(n.h2,{children:`Description`}),`
`,(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:`Field.String`}),` is the base component for receiving user input where the target data is of type `,(0,r.jsx)(n.code,{children:`string`}),`.`]}),`
`,(0,r.jsxs)(n.p,{children:[`Before using this component, ensure there is not a more specific `,(0,r.jsx)(n.a,{href:`/uilib/extensions/forms/feature-fields/`,children:`field component`}),` available that better suits your needs.`]}),`
`,(0,r.jsxs)(n.p,{children:[`There is a corresponding `,(0,r.jsx)(n.a,{href:`/uilib/extensions/forms/Value/String`,children:`Value.String`}),` component.`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Field } from '@dnb/eufemia/extensions/forms'
render(<Field.String path="/myValue" />)
`})}),`
`,(0,r.jsx)(n.h2,{children:`Relevant links`}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/base-fields/String`,children:`Source code`})}),`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/base-fields/String`,children:`Docs code`})}),`
`]}),`
`,(0,r.jsx)(n.h2,{children:`Browser autofill`}),`
`,(0,r.jsxs)(n.p,{children:[`The string component supports HTML `,(0,r.jsx)(n.code,{children:`autocomplete`}),` `,(0,r.jsx)(n.a,{href:`https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete`,children:`attributes`}),`.`]}),`
`,(0,r.jsxs)(n.ol,{children:[`
`,(0,r.jsx)(n.li,{children:`You may either set the property directly on each field:`}),`
`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`<Form.Handler>
  <Field.String autoComplete="first-name" path="/your-pointer" />
  <Field.String autoComplete="last-name" path="/your-pointer" />
</Form.Handler>
`})}),`
`,(0,r.jsxs)(n.ol,{start:`2`,children:[`
`,(0,r.jsxs)(n.li,{children:[`Or use the "less-code" approach by just giving the data pointer `,(0,r.jsx)(n.code,{children:`path`}),` a meaningful name:`]}),`
`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`<Form.Handler autoComplete={true}>
  <Field.String path="/firstName" />
  <Field.String path="/lastName" />
</Form.Handler>
`})}),`
`,(0,r.jsxs)(n.p,{children:[`The `,(0,r.jsx)(n.code,{children:`path`}),` property will be used to set the `,(0,r.jsx)(n.code,{children:`name`}),` attribute.`]}),`
`,(0,r.jsx)(n.h2,{children:`Accessibility`}),`
`,(0,r.jsxs)(n.p,{children:[`Avoid using the `,(0,r.jsx)(n.code,{children:`maxlength`}),` attribute when possible, as it is not accessible. Instead, use `,(0,r.jsx)(n.a,{href:`/uilib/components/fragments/text-counter/`,children:`TextCounter`}),` together with `,(0,r.jsx)(n.code,{children:`Field.String`}),`.`]}),`
`,(0,r.jsxs)(n.p,{children:[`A demo of how to use the `,(0,r.jsx)(n.code,{children:`TextCounter`}),` with `,(0,r.jsx)(n.code,{children:`Field.String`}),` can be found `,(0,r.jsx)(n.a,{href:`/uilib/extensions/forms/base-fields/String/#validation-maximum-length-with-textcounter`,children:`here`}),`.`]}),`
`,(0,r.jsx)(n.p,{children:`This way, the user receives visual feedback on the number of characters entered and the maximum allowed, without being limited in their workflow.`}),`
`,(0,r.jsxs)(n.p,{children:[`You can still set the desired maximum number of characters by using the `,(0,r.jsx)(n.code,{children:`maxLength`}),` property in Eufemia Forms.`]})]})}function a(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(i,{...e})}):i(e)}function o(e){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(a,{}),`
`,(0,r.jsx)(n,{})]})}function s(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(o,{...e})}):o(e)}export{s as default};