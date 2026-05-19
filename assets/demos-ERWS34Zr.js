import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{t as n}from"./jsx-runtime-BgMs7Gb-.js";import{t as r}from"./ComponentBox-a4aOn231.js";import{zr as i}from"./index-DqqByKA2.js";var a=t({ViewAndEditContainer:()=>s}),o=e(n()),s=()=>(0,o.jsx)(r,{stableName:`ViewAndEditContainer`,children:`<Form.Section>
  <Form.Section.ViewContainer>
    View content
    <Form.Section.Toolbar>
      <Button variant="tertiary">Your Tool</Button>
      <Form.Section.ViewContainer.EditButton />
    </Form.Section.Toolbar>
  </Form.Section.ViewContainer>

  <Form.Section.EditContainer>
    Edit content
    <Form.Section.Toolbar>
      <Button variant="tertiary">Your Tool</Button>
      <Form.Section.EditContainer.DoneButton />
      <Form.Section.EditContainer.CancelButton />
    </Form.Section.Toolbar>
  </Form.Section.EditContainer>
</Form.Section>
`});function c(e){let t={h2:`h2`,h3:`h3`,...i(),...e.components};return a||u(`Examples`,!1),s||u(`Examples.ViewAndEditContainer`,!0),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h2,{children:`Demos`}),`
`,(0,o.jsx)(t.h3,{children:`Using ViewContainer and EditContainer`}),`
`,(0,o.jsx)(s,{})]})}function l(e={}){let{wrapper:t}={...i(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(c,{...e})}):c(e)}function u(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{l as default};