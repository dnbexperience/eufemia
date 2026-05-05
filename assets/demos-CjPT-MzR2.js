import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{t as n}from"./ComponentBox-geTEYZ7b.js";import{Rr as r}from"./index-CMgyXmp3.js";var i=e({AfterFirstRender:()=>s,Default:()=>o,UpdateValue:()=>c}),a=t();function o(){return(0,a.jsx)(n,{noInline:!0,children:`Form.setData('default-id', {
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
`})}function s(){return(0,a.jsx)(n,{noInline:!0,children:`const Component = () => {
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
`})}function c(){return(0,a.jsx)(n,{noInline:!0,children:`const myFormId = {}
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
`})}function l(e){let t={h2:`h2`,h3:`h3`,...r(),...e.components};return i||d(`Examples`,!1),s||d(`Examples.AfterFirstRender`,!0),o||d(`Examples.Default`,!0),c||d(`Examples.UpdateValue`,!0),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.h2,{children:`Demos`}),`
`,(0,a.jsx)(t.h3,{children:`Set data outside of the form`}),`
`,(0,a.jsx)(o,{}),`
`,(0,a.jsx)(t.h3,{children:`Set data after first render`}),`
`,(0,a.jsx)(s,{}),`
`,(0,a.jsx)(t.h3,{children:`Using the update function`}),`
`,(0,a.jsx)(c,{})]})}function u(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(l,{...e})}):l(e)}function d(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{u as default};