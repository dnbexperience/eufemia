import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{t as r}from"./P-avM674pJ.js";import{t as i}from"./Card--_AKADDp.js";import{t as a}from"./Form-913YPZs6.js";import{n as o}from"./Wizard-BYX_YzAY.js";import{W as s,j as c}from"./index-D7e1avVt.js";import{t as l}from"./ComponentBox-CE7bpcJy.js";import u from"./components-CdmJMBN1.js";var d=e({IntroExample:()=>p}),f=t(n()),p=()=>(0,f.jsx)(l,{hideCode:!0,stableName:`IntroExample`,sourceImports:[`import { Form, Wizard } from '@dnb/eufemia/extensions/forms'`,`import { P } from '@dnb/eufemia'`],__buildScope:{Wizard:o,Form:a,Heading:c,Card:i,P:r},noInline:!0,children:`const MyForm = () => {
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
`});function m(e){let t={a:`a`,code:`code`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...s(),...e.components};return d||g(`Examples`,!1),p||g(`Examples.IntroExample`,!0),(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(t.h2,{children:`Import`}),`
`,(0,f.jsx)(t.pre,{children:(0,f.jsx)(t.code,{className:`language-tsx`,children:`import { Wizard } from '@dnb/eufemia/extensions/forms'
`})}),`
`,(0,f.jsx)(t.h2,{children:`Description`}),`
`,(0,f.jsxs)(t.p,{children:[(0,f.jsx)(t.code,{children:`Wizard`}),` is a set of components for showing forms with a `,(0,f.jsx)(t.a,{href:`/uilib/components/step-indicator/`,children:`StepIndicator`}),` for navigation between several steps. It also includes components for navigating between steps.`]}),`
`,(0,f.jsx)(t.pre,{children:(0,f.jsx)(t.code,{className:`language-tsx`,children:`import { Wizard } from '@dnb/eufemia/extensions/forms'

render(
  <Wizard.Container>
    <Wizard.Step title="Step 1">...</Wizard.Step>
    <Wizard.Step title="Step 2">...</Wizard.Step>
  </Wizard.Container>
)
`})}),`
`,(0,f.jsx)(t.h2,{children:`Relevant links`}),`
`,(0,f.jsxs)(t.ul,{children:[`
`,(0,f.jsx)(t.li,{children:(0,f.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Wizard`,children:`Source code`})}),`
`,(0,f.jsx)(t.li,{children:(0,f.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/Wizard`,children:`Docs code`})}),`
`]}),`
`,(0,f.jsx)(t.h2,{children:`Intro example`}),`
`,(0,f.jsx)(p,{}),`
`,(0,f.jsx)(t.h2,{children:`Dynamic steps support`}),`
`,(0,f.jsxs)(t.p,{children:[`You can use the `,(0,f.jsx)(t.code,{children:`Wizard.Step`}),` component to create dynamic steps. The `,(0,f.jsx)(t.code,{children:`include`}),` and `,(0,f.jsx)(t.code,{children:`includeWhen`}),` properties allow you to show or hide a step based on specific conditions. You find an `,(0,f.jsx)(t.a,{href:`/uilib/extensions/forms/Wizard/Step/#dynamic-steps`,children:`example`}),` in the demo section.`]}),`
`,(0,f.jsx)(t.h2,{children:`Summary step`}),`
`,(0,f.jsxs)(t.p,{children:[`A wizard needs a summary step at the end. You can use the `,(0,f.jsx)(t.code,{children:`Wizard.Step`}),` component for that, including the `,(0,f.jsx)(t.a,{href:`/uilib/extensions/forms/Value/SummaryList/`,children:`Value.SummaryList`}),` component:`]}),`
`,(0,f.jsx)(t.pre,{children:(0,f.jsx)(t.code,{className:`language-tsx`,children:`import { Form, Wizard, Value } from '@dnb/eufemia/extensions/forms'

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
`})})]})}function h(e={}){let{wrapper:t}={...s(),...e.components};return t?(0,f.jsx)(t,{...e,children:(0,f.jsx)(m,{...e})}):m(e)}function g(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}function _(e){return(0,f.jsxs)(f.Fragment,{children:[(0,f.jsx)(h,{}),`
`,(0,f.jsx)(u,{})]})}function v(e={}){let{wrapper:t}={...s(),...e.components};return t?(0,f.jsx)(t,{...e,children:(0,f.jsx)(_,{...e})}):_(e)}export{v as default};