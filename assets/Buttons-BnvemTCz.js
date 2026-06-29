import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{U as n}from"./index-BsJ3GLEw.js";import r from"./demos-Cx6U1fIO.js";var i=e(t());function a(e){let t={a:`a`,code:`code`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...n(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h2,{children:`Import`}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Wizard } from '@dnb/eufemia/extensions/forms'
render(<Wizard.Buttons />)
`})}),`
`,(0,i.jsx)(t.h2,{children:`Description`}),`
`,(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.code,{children:`Wizard.Buttons`}),` is a combination of `,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/Wizard/PreviousButton/`,children:`Wizard.PreviousButton`}),` and `,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/Wizard/NextButton/`,children:`Wizard.NextButton`}),` for navigating between steps/pages.`]}),`
`,(0,i.jsx)(t.h2,{children:`Relevant links`}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Wizard/Buttons`,children:`Source code`})}),`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/Wizard/Buttons`,children:`Docs code`})}),`
`]}),`
`,(0,i.jsx)(t.p,{children:`Only the relevant button is shown, depending on the current step.`}),`
`,(0,i.jsxs)(t.p,{children:[`These two buttons are wrapped in a `,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/Form/ButtonRow/`,children:`Form.ButtonRow`}),` component.`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-jsx`,children:`import { Form, Wizard } from '@dnb/eufemia/extensions/forms'

render(
  <Form.Handler>
    <Wizard.Container>
      <Wizard.Step title="Step 1">
        <Wizard.Buttons />
      </Wizard.Step>
    </Wizard.Container>
  </Form.Handler>
)
`})}),`
`,(0,i.jsxs)(t.p,{children:[`But you can still use `,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/Form/ButtonRow/`,children:`Form.ButtonRow`}),` to wrap a `,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/Form/SubmitButton/`,children:`Form.SubmitButton`}),` as well:`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-jsx`,children:`import { Form, Wizard } from '@dnb/eufemia/extensions/forms'

render(
  <Form.Handler>
    <Wizard.Container>
      <Wizard.Step title="Step 1">
        <Form.ButtonRow>
          <Wizard.Buttons />
          <Form.SubmitButton />
        </Form.ButtonRow>
      </Wizard.Step>
    </Wizard.Container>
  </Form.Handler>
)
`})})]})}function o(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}function s(e){return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(o,{}),`
`,(0,i.jsx)(r,{})]})}function c(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(s,{...e})}):s(e)}export{c as default};