import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{t as n}from"./ComponentBox-C64JNWnl.js";import{Lr as r}from"./index-2AO2Cu5K.js";var i=e({InheritVisibility:()=>o}),a=t();function o(){return(0,a.jsx)(n,{children:`<Form.Handler>
  <Form.Card>
    <Field.Boolean
      variant="button"
      path="/isVisible"
      defaultValue={true}
    />

    <Form.Visibility pathTrue="/isVisible" animate>
      <Field.Name.First path="/foo" defaultValue="foo" />
      <Field.Name.Last path="/bar" defaultValue="bar" />
    </Form.Visibility>

    <Value.Provider inheritVisibility>
      <Value.SummaryList>
        <Value.Name.First path="/foo" />
        <Value.Name.First path="/bar" />
      </Value.SummaryList>
    </Value.Provider>
  </Form.Card>
</Form.Handler>
`})}function s(e){let t={h2:`h2`,h3:`h3`,...r(),...e.components};return i||l(`Examples`,!1),o||l(`Examples.InheritVisibility`,!0),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.h2,{children:`Demos`}),`
`,(0,a.jsx)(t.h3,{children:`Inherit visibility`}),`
`,(0,a.jsx)(o,{})]})}function c(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(s,{...e})}):s(e)}function l(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{c as default};