import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{t as n}from"./ComponentBox-geTEYZ7b.js";import{Rr as r}from"./index-CMgyXmp3.js";import i from"./components-BUvsgRpc.js";var a=e({IntroExample:()=>s}),o=t(),s=()=>(0,o.jsx)(n,{hideCode:!0,noInline:!0,children:`const MyForm = () => {
  // Routers like "react-router" are supported as well
  Wizard.useQueryLocator('my-wizard')
  return (
    <Form.Handler>
      <Wizard.Container id="my-wizard" omitScrollManagement>
        <Wizard.Step title="Step 1">
          <Form.MainHeading>Heading</Form.MainHeading>
          <Form.Card>
            <P>Step 1</P>
          </Form.Card>
          <Wizard.Buttons />
        </Wizard.Step>
        <Wizard.Step title="Step 2">
          <Form.MainHeading>Heading</Form.MainHeading>
          <Form.Card>
            <P>Step 2</P>
          </Form.Card>
          <Wizard.Buttons />
        </Wizard.Step>
      </Wizard.Container>
    </Form.Handler>
  )
}
render(<MyForm />)
`});function c(e){let t={a:`a`,code:`code`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...r(),...e.components};return a||u(`Examples`,!1),s||u(`Examples.IntroExample`,!0),(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h2,{children:`Import`}),`
`,(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:`language-tsx`,children:`import { Wizard } from '@dnb/eufemia/extensions/forms'
`})}),`
`,(0,o.jsx)(t.h2,{children:`Description`}),`
`,(0,o.jsxs)(t.p,{children:[(0,o.jsx)(t.code,{children:`Wizard`}),` is a set of components for showing forms with a `,(0,o.jsx)(t.a,{href:`/uilib/components/step-indicator/`,children:`StepIndicator`}),` for navigation between several steps. It also includes components for navigating between steps.`]}),`
`,(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:`language-tsx`,children:`import { Wizard } from '@dnb/eufemia/extensions/forms'

render(
  <Wizard.Container>
    <Wizard.Step title="Step 1">...</Wizard.Step>
    <Wizard.Step title="Step 2">...</Wizard.Step>
  </Wizard.Container>
)
`})}),`
`,(0,o.jsx)(t.h2,{children:`Relevant links`}),`
`,(0,o.jsxs)(t.ul,{children:[`
`,(0,o.jsx)(t.li,{children:(0,o.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Wizard`,children:`Source code`})}),`
`,(0,o.jsx)(t.li,{children:(0,o.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/Wizard`,children:`Docs code`})}),`
`]}),`
`,(0,o.jsx)(t.h2,{children:`Intro example`}),`
`,(0,o.jsx)(s,{}),`
`,(0,o.jsx)(t.h2,{children:`Dynamic steps support`}),`
`,(0,o.jsxs)(t.p,{children:[`You can use the `,(0,o.jsx)(t.code,{children:`Wizard.Step`}),` component to create dynamic steps. The `,(0,o.jsx)(t.code,{children:`include`}),` and `,(0,o.jsx)(t.code,{children:`includeWhen`}),` properties allow you to show or hide a step based on specific conditions. You find an `,(0,o.jsx)(t.a,{href:`/uilib/extensions/forms/Wizard/Step/#dynamic-steps`,children:`example`}),` in the demo section.`]}),`
`,(0,o.jsx)(t.h2,{children:`Summary step`}),`
`,(0,o.jsxs)(t.p,{children:[`A wizard needs a summary step at the end. You can use the `,(0,o.jsx)(t.code,{children:`Wizard.Step`}),` component for that, including the `,(0,o.jsx)(t.a,{href:`/uilib/extensions/forms/Value/SummaryList/`,children:`Value.SummaryList`}),` component:`]}),`
`,(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:`language-tsx`,children:`import { Form, Wizard, Value } from '@dnb/eufemia/extensions/forms'

const MyForm = () => {
  const { summaryTitle } = Form.useTranslation().Step

  return (
    <Form.Handler>
      <Wizard.Container>
        <Wizard.Step title="Step 1">...</Wizard.Step>
        <Wizard.Step title="Step 2">...</Wizard.Step>
        <Wizard.Step title={summaryTitle}>
          <Value.SummaryList layout="grid">
            <Value.String label="Label" path="/myValue" />
          </Value.SummaryList>
        </Wizard.Step>
      </Wizard.Container>
    </Form.Handler>
  )
}
`})})]})}function l(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(c,{...e})}):c(e)}function u(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}function d(e){return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(l,{}),`
`,(0,o.jsx)(i,{})]})}function f(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(d,{...e})}):d(e)}export{f as default};