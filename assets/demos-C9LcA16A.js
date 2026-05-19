import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{t as n}from"./jsx-runtime-BgMs7Gb-.js";import{t as r}from"./ComponentBox-a4aOn231.js";import{zr as i}from"./index-DqqByKA2.js";var a=t({Default:()=>s,SendVariant:()=>c,WithSubmitIndicator:()=>l}),o=e(n()),s=()=>(0,o.jsx)(r,{stableName:`Default`,children:`<Form.Handler
  data={{
    foo: 'bar',
  }}
  onSubmit={(data) => console.log('onSubmit', data)}
>
  <Form.SubmitButton />
</Form.Handler>
`}),c=()=>(0,o.jsx)(r,{stableName:`SendVariant`,children:`<Form.Handler
  data={{
    foo: 'bar',
  }}
  onSubmit={(data) => console.log('onSubmit', data)}
>
  <Form.SubmitButton variant="send" />
</Form.Handler>
`}),l=()=>(0,o.jsx)(r,{stableName:`WithSubmitIndicator`,children:`<Form.Handler>
  <Form.SubmitButton showIndicator />
</Form.Handler>
`});function u(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,p:`p`,...i(),...e.components};return a||f(`Examples`,!1),s||f(`Examples.Default`,!0),c||f(`Examples.SendVariant`,!0),l||f(`Examples.WithSubmitIndicator`,!0),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h2,{children:`Demos`}),`
`,(0,o.jsx)(t.h3,{children:`Standard text`}),`
`,(0,o.jsx)(s,{}),`
`,(0,o.jsx)(t.h3,{children:`Send variant`}),`
`,(0,o.jsx)(c,{}),`
`,(0,o.jsx)(t.h3,{children:`With SubmitIndicator`}),`
`,(0,o.jsxs)(t.p,{children:[`Example of showing the `,(0,o.jsx)(t.a,{href:`/uilib/extensions/forms/Form/SubmitIndicator/`,children:`Form.SubmitIndicator`}),` with the property `,(0,o.jsx)(t.code,{children:`showSubmitIndicator`}),` set to `,(0,o.jsx)(t.code,{children:`true`}),`.`]}),`
`,(0,o.jsxs)(t.p,{children:[`When using the submit button inside `,(0,o.jsx)(t.a,{href:`/uilib/extensions/forms/Form/Handler/`,children:`Form.Handler`}),` you can use an async `,(0,o.jsx)(t.code,{children:`onSubmit`}),` event handler to show a loading indicator when the form is submitting.`]}),`
`,(0,o.jsx)(l,{})]})}function d(e={}){let{wrapper:t}={...i(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(u,{...e})}):u(e)}function f(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{d as default};