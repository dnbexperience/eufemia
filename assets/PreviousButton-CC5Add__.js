import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{B as n}from"./index-DdG6L_K8.js";import r from"./demos-g9VLFoOa.js";var i=e(t());function a(e){let t={a:`a`,code:`code`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...n(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h2,{children:`Import`}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Wizard } from '@dnb/eufemia/extensions/forms'
render(<Wizard.PreviousButton />)
`})}),`
`,(0,i.jsx)(t.h2,{children:`Description`}),`
`,(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.code,{children:`Wizard.PreviousButton`}),` connects to `,(0,i.jsx)(t.code,{children:`Wizard.Context`}),` to move the user to the previous step when clicked.`]}),`
`,(0,i.jsx)(t.h2,{children:`Relevant links`}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Wizard/PreviousButton`,children:`Source code`})}),`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/Wizard/PreviousButton`,children:`Docs code`})}),`
`]}),`
`,(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.strong,{children:`Note:`}),` This button is used in `,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/Wizard/Buttons/`,children:`Wizard.Buttons`}),`, which is easier to integrate into most wizards.`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-jsx`,children:`import { Form, Wizard } from '@dnb/eufemia/extensions/forms'

render(
  <Form.Handler>
    <Wizard.Container>
      <Wizard.Step title="Step 1">previous step</Wizard.Step>
      <Wizard.Step title="Step 2">
        <Wizard.PreviousButton />
      </Wizard.Step>
    </Wizard.Container>
  </Form.Handler>
)
`})})]})}function o(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}function s(e){return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(o,{}),`
`,(0,i.jsx)(r,{})]})}function c(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(s,{...e})}):s(e)}export{c as default};