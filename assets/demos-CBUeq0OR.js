import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{t as r}from"./Form-C16rVaXm.js";import{W as i}from"./index-BCXtuv-b.js";import{t as a}from"./ComponentBox-B2X8809Z.js";var o=e({Default:()=>c,SendVariant:()=>l,WithSubmitIndicator:()=>u}),s=t(n()),c=()=>(0,s.jsx)(a,{stableName:`Default`,sourceImports:[`import { Form } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:r},children:`<Form.Handler
  data={{
    foo: 'bar',
  }}
  onSubmit={(data) => console.log('onSubmit', data)}
>
  <Form.SubmitButton />
</Form.Handler>
`}),l=()=>(0,s.jsx)(a,{stableName:`SendVariant`,sourceImports:[`import { Form } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:r},children:`<Form.Handler
  data={{
    foo: 'bar',
  }}
  onSubmit={(data) => console.log('onSubmit', data)}
>
  <Form.SubmitButton variant="send" />
</Form.Handler>
`}),u=()=>(0,s.jsx)(a,{stableName:`WithSubmitIndicator`,sourceImports:[`import { Form } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:r},children:`<Form.Handler>
  <Form.SubmitButton showIndicator />
</Form.Handler>
`});function d(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,p:`p`,...i(),...e.components};return o||p(`Examples`,!1),c||p(`Examples.Default`,!0),l||p(`Examples.SendVariant`,!0),u||p(`Examples.WithSubmitIndicator`,!0),(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.h2,{children:`Demos`}),`
`,(0,s.jsx)(t.h3,{children:`Standard text`}),`
`,(0,s.jsx)(c,{}),`
`,(0,s.jsx)(t.h3,{children:`Send variant`}),`
`,(0,s.jsx)(l,{}),`
`,(0,s.jsx)(t.h3,{children:`With SubmitIndicator`}),`
`,(0,s.jsxs)(t.p,{children:[`Example of showing the `,(0,s.jsx)(t.a,{href:`/uilib/extensions/forms/Form/SubmitIndicator/`,children:`Form.SubmitIndicator`}),` with the property `,(0,s.jsx)(t.code,{children:`showSubmitIndicator`}),` set to `,(0,s.jsx)(t.code,{children:`true`}),`.`]}),`
`,(0,s.jsxs)(t.p,{children:[`When using the submit button inside `,(0,s.jsx)(t.a,{href:`/uilib/extensions/forms/Form/Handler/`,children:`Form.Handler`}),` you can use an async `,(0,s.jsx)(t.code,{children:`onSubmit`}),` event handler to show a loading indicator when the form is submitting.`]}),`
`,(0,s.jsx)(u,{})]})}function f(e={}){let{wrapper:t}={...i(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(d,{...e})}):d(e)}function p(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{f as default};