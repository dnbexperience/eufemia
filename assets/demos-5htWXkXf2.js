import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{t as n}from"./jsx-runtime-BgMs7Gb-.js";import{t as r}from"./Card-2G-TKpj3.js";import{t as i}from"./Form-PES0Uozy.js";import{t as a}from"./Field-DrUGn0oz.js";import{Rr as o,wr as s}from"./index-BIrFyEEc.js";import{t as c}from"./ComponentBox-DFVIRw0w.js";var l=t({AfterFirstRender:()=>f,Default:()=>d,UpdateValue:()=>p}),u=e(n());function d(){return(0,u.jsx)(c,{stableName:`Default`,sourceImports:[`import { Button } from '@dnb/eufemia'`,`import { Form, Field } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:i,Field:a},noInline:!0,children:`Form.setData('default-id', {
  foo: 'bar',
})
const Component = () => {
  return (
    <Form.Handler id="default-id">
      <Field.String path="/foo" />
    </Form.Handler>
  )
}
render(<Component />)
`})}function f(){return(0,u.jsx)(c,{stableName:`AfterFirstRender`,sourceImports:[`import { Button } from '@dnb/eufemia'`,`import { Form, Field } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:i,Field:a},noInline:!0,children:`const Component = () => {
  return (
    <Form.Handler id="after-id">
      <Field.String path="/foo" />
    </Form.Handler>
  )
}
Form.setData('after-id', {
  foo: 'bar',
})
render(<Component />)
`})}function p(){return(0,u.jsx)(c,{stableName:`UpdateValue`,sourceImports:[`import { Button } from '@dnb/eufemia'`,`import { Form, Field } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:i,Card:r,Field:a,Button:s},noInline:!0,children:`const myFormId = {}
const { update } = Form.setData(myFormId)
const Component = () => {
  return (
    <Form.Card>
      <Form.Handler id={myFormId}>
        <Field.Number path="/foo" defaultValue={1} />
      </Form.Handler>
      <Button
        onClick={() => {
          update('/foo', (count) => count + 1)
        }}
      >
        Update
      </Button>
    </Form.Card>
  )
}
render(<Component />)
`})}function m(e){let t={h2:`h2`,h3:`h3`,...o(),...e.components};return l||g(`Examples`,!1),f||g(`Examples.AfterFirstRender`,!0),d||g(`Examples.Default`,!0),p||g(`Examples.UpdateValue`,!0),(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(t.h2,{children:`Demos`}),`
`,(0,u.jsx)(t.h3,{children:`Set data outside of the form`}),`
`,(0,u.jsx)(d,{}),`
`,(0,u.jsx)(t.h3,{children:`Set data after first render`}),`
`,(0,u.jsx)(f,{}),`
`,(0,u.jsx)(t.h3,{children:`Using the update function`}),`
`,(0,u.jsx)(p,{})]})}function h(e={}){let{wrapper:t}={...o(),...e.components};return t?(0,u.jsx)(t,{...e,children:(0,u.jsx)(m,{...e})}):m(e)}function g(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{h as default};