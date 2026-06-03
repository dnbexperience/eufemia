import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{t as r}from"./Button-2YHZk8Pc.js";import{t as i}from"./Section-UYj7uQy5.js";import{t as a}from"./Form-C16rVaXm.js";import{W as o}from"./index-BCXtuv-b.js";import{t as s}from"./ComponentBox-B2X8809Z.js";var c=e({ViewAndEditContainer:()=>u}),l=t(n()),u=()=>(0,l.jsx)(s,{stableName:`ViewAndEditContainer`,sourceImports:[`import { Button } from '@dnb/eufemia'`,`import { Form } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:a,Section:i,Button:r},children:`<Form.Section>
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
`});function d(e){let t={h2:`h2`,h3:`h3`,...o(),...e.components};return c||p(`Examples`,!1),u||p(`Examples.ViewAndEditContainer`,!0),(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(t.h2,{children:`Demos`}),`
`,(0,l.jsx)(t.h3,{children:`Using ViewContainer and EditContainer`}),`
`,(0,l.jsx)(u,{})]})}function f(e={}){let{wrapper:t}={...o(),...e.components};return t?(0,l.jsx)(t,{...e,children:(0,l.jsx)(d,{...e})}):d(e)}function p(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{f as default};