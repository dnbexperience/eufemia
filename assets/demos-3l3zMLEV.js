import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{t as n}from"./ComponentBox-C64JNWnl.js";import{Lr as r}from"./index-2AO2Cu5K.js";var i=e({Default:()=>o,SendVariant:()=>s,WithSubmitIndicator:()=>c}),a=t(),o=()=>(0,a.jsx)(n,{children:`<Form.Handler
  data={{
    foo: 'bar',
  }}
  onSubmit={(data) => console.log('onSubmit', data)}
>
  <Form.SubmitButton />
</Form.Handler>
`}),s=()=>(0,a.jsx)(n,{children:`<Form.Handler
  data={{
    foo: 'bar',
  }}
  onSubmit={(data) => console.log('onSubmit', data)}
>
  <Form.SubmitButton variant="send" />
</Form.Handler>
`}),c=()=>(0,a.jsx)(n,{children:`<Form.Handler>
  <Form.SubmitButton showIndicator />
</Form.Handler>
`});function l(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,p:`p`,...r(),...e.components};return i||d(`Examples`,!1),o||d(`Examples.Default`,!0),s||d(`Examples.SendVariant`,!0),c||d(`Examples.WithSubmitIndicator`,!0),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.h2,{children:`Demos`}),`
`,(0,a.jsx)(t.h3,{children:`Standard text`}),`
`,(0,a.jsx)(o,{}),`
`,(0,a.jsx)(t.h3,{children:`Send variant`}),`
`,(0,a.jsx)(s,{}),`
`,(0,a.jsx)(t.h3,{children:`With SubmitIndicator`}),`
`,(0,a.jsxs)(t.p,{children:[`Example of showing the `,(0,a.jsx)(t.a,{href:`/uilib/extensions/forms/Form/SubmitIndicator/`,children:`Form.SubmitIndicator`}),` with the property `,(0,a.jsx)(t.code,{children:`showSubmitIndicator`}),` set to `,(0,a.jsx)(t.code,{children:`true`}),`.`]}),`
`,(0,a.jsxs)(t.p,{children:[`When using the submit button inside `,(0,a.jsx)(t.a,{href:`/uilib/extensions/forms/Form/Handler/`,children:`Form.Handler`}),` you can use an async `,(0,a.jsx)(t.code,{children:`onSubmit`}),` event handler to show a loading indicator when the form is submitting.`]}),`
`,(0,a.jsx)(c,{})]})}function u(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(l,{...e})}):l(e)}function d(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{u as default};