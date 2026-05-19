import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{t as n}from"./jsx-runtime-BgMs7Gb-.js";import{t as r}from"./ComponentBox-a4aOn231.js";import{zr as i}from"./index-DqqByKA2.js";var a=t({InheritVisibility:()=>s}),o=e(n());function s(){return(0,o.jsx)(r,{stableName:`InheritVisibility`,children:`<Form.Handler>
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
`})}function c(e){let t={h2:`h2`,h3:`h3`,...i(),...e.components};return a||u(`Examples`,!1),s||u(`Examples.InheritVisibility`,!0),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h2,{children:`Demos`}),`
`,(0,o.jsx)(t.h3,{children:`Inherit visibility`}),`
`,(0,o.jsx)(s,{})]})}function l(e={}){let{wrapper:t}={...i(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(c,{...e})}):c(e)}function u(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{l as default};