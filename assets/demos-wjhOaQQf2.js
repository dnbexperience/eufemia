import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{t as n}from"./jsx-runtime-BgMs7Gb-.js";import{t as r}from"./ComponentBox-a4aOn231.js";import{zr as i}from"./index-DqqByKA2.js";var a=t({AfterFirstRender:()=>c,Default:()=>s,UpdateValue:()=>l}),o=e(n());function s(){return(0,o.jsx)(r,{stableName:`Default`,noInline:!0,children:`Form.setData('default-id', {
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
`})}function c(){return(0,o.jsx)(r,{stableName:`AfterFirstRender`,noInline:!0,children:`const Component = () => {
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
`})}function l(){return(0,o.jsx)(r,{stableName:`UpdateValue`,noInline:!0,children:`const myFormId = {}
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
`})}function u(e){let t={h2:`h2`,h3:`h3`,...i(),...e.components};return a||f(`Examples`,!1),c||f(`Examples.AfterFirstRender`,!0),s||f(`Examples.Default`,!0),l||f(`Examples.UpdateValue`,!0),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h2,{children:`Demos`}),`
`,(0,o.jsx)(t.h3,{children:`Set data outside of the form`}),`
`,(0,o.jsx)(s,{}),`
`,(0,o.jsx)(t.h3,{children:`Set data after first render`}),`
`,(0,o.jsx)(c,{}),`
`,(0,o.jsx)(t.h3,{children:`Using the update function`}),`
`,(0,o.jsx)(l,{})]})}function d(e={}){let{wrapper:t}={...i(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(u,{...e})}):u(e)}function f(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{d as default};