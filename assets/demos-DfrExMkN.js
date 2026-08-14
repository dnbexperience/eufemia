import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{$ as r}from"./Anchor-DN_sG59G.js";import{j as i,v as a,w as o}from"./forms-Ce7VSRGW.js";import{t as s}from"./Card-C4jdcnXT.js";import{U as c}from"./index-DHCu7dhB.js";import{t as l}from"./ComponentBox-CmvipvMU.js";var u=e({InheritVisibility:()=>f}),d=t(n());function f(){return(0,d.jsx)(l,{stableName:`InheritVisibility`,sourceImports:[`import { Field, Form, Value } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:o,Card:s,Field:i,Value:a,Provider:r},children:`<Form.Handler>
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
`})}function p(e){let t={h2:`h2`,h3:`h3`,...c(),...e.components};return u||h(`Examples`,!1),f||h(`Examples.InheritVisibility`,!0),(0,d.jsxs)(d.Fragment,{children:[(0,d.jsx)(t.h2,{children:`Demos`}),`
`,(0,d.jsx)(t.h3,{children:`Inherit visibility`}),`
`,(0,d.jsx)(f,{})]})}function m(e={}){let{wrapper:t}={...c(),...e.components};return t?(0,d.jsx)(t,{...e,children:(0,d.jsx)(p,{...e})}):p(e)}function h(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{m as default};