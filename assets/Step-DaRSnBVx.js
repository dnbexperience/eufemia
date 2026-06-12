import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{K as n}from"./index-CsG353ar.js";import r from"./demos-BYfa0EM-.js";var i=e(t());function a(e){let t={a:`a`,code:`code`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...n(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h2,{children:`Import`}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Wizard } from '@dnb/eufemia/extensions/forms'
render(<Wizard.Step />)
`})}),`
`,(0,i.jsx)(t.h2,{children:`Description`}),`
`,(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.code,{children:`Wizard.Step`}),` shows child components when the surrounding `,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/Wizard/Container/`,children:`Wizard.Container`}),` has been navigated to this step. `,(0,i.jsx)(t.code,{children:`Wizard.Container`}),` keeps track of the active step, and navigating between wizard steps is done through callbacks on the `,(0,i.jsx)(t.code,{children:`Wizard.Context`}),`, e.g., using `,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/Wizard/Buttons/`,children:`navigation buttons`}),`.`]}),`
`,(0,i.jsx)(t.h2,{children:`Relevant links`}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Wizard/Step`,children:`Source code`})}),`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/Wizard/Step`,children:`Docs code`})}),`
`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Form, Wizard } from '@dnb/eufemia/extensions/forms'

const Step1 = () => {
  return (
    <Wizard.Step title="Step 1">
      <Form.MainHeading>Heading</Form.MainHeading>
      <Form.Card>
        <P>Contents</P>
      </Form.Card>
      <Form.Card>
        <P>Contents</P>
      </Form.Card>

      <Wizard.Buttons />
    </Wizard.Step>
  )
}

const MyForm = () => {
  return (
    <Form.Handler>
      <Wizard.Container>
        <Step1 />
      </Wizard.Container>
    </Form.Handler>
  )
}
`})}),`
`,(0,i.jsxs)(t.p,{children:[`It uses `,(0,i.jsx)(t.a,{href:`/uilib/layout/flex/stack/`,children:`Flex.Stack`}),`, so you do not need to wrap your content additionally.`]}),`
`,(0,i.jsx)(t.h2,{children:`EditButton`}),`
`,(0,i.jsxs)(t.p,{children:[`In order to navigate back to another step, you can use the `,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/Wizard/EditButton/`,children:`Wizard.EditButton`}),` component.`]}),`
`,(0,i.jsx)(t.h2,{children:`Events`}),`
`,(0,i.jsxs)(t.p,{children:[`If you need an event to be triggered when the user changes the active step, you can use the `,(0,i.jsx)(t.code,{children:`onStepChange`}),` in the `,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/Wizard/Container/`,children:`Wizard.Container`}),`.`]}),`
`,(0,i.jsx)(t.h2,{children:`Dynamic steps support`}),`
`,(0,i.jsxs)(t.p,{children:[`You can use the `,(0,i.jsx)(t.code,{children:`Wizard.Step`}),` component to create dynamic steps. The `,(0,i.jsx)(t.code,{children:`include`}),` and `,(0,i.jsx)(t.code,{children:`includeWhen`}),` properties allow you to show or hide a step based on specific conditions.`]}),`
`,(0,i.jsxs)(t.p,{children:[`If a step is replaced by another step, the `,(0,i.jsx)(t.code,{children:`onStepChange`}),` event will trigger with `,(0,i.jsx)(t.code,{children:`stepListModified`}),` as the second argument. The current step index might remain the same. However, if the total number of steps becomes less than the current step, the index will adjust to the last step.`]}),`
`,(0,i.jsxs)(t.p,{children:[`To keep track of the current step, you can provide each step with an `,(0,i.jsx)(t.code,{children:`id`}),` property. This `,(0,i.jsx)(t.code,{children:`id`}),` can then be used to identify the current step and will be returned as part of an object in the `,(0,i.jsx)(t.code,{children:`onStepChange`}),` event.
The same options object also provides `,(0,i.jsx)(t.code,{children:`totalSteps`}),`.`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`<Wizard.Container
  onStepChange={(index, mode, args) => {
    const {
      id,
      totalSteps,
      preventNavigation,
      previousStep: { index },
    } = args
  }}
>
  <Wizard.Step
    title="Step 1"
    id="step-1"
    includeWhen={{ path: '/myPath', hasValue: '...' }}
  >
    content
  </Wizard.Step>
</Wizard.Container>
`})}),`
`,(0,i.jsxs)(t.p,{children:[`In the demo section, you will find an example demonstrating how to use the `,(0,i.jsx)(t.code,{children:`Wizard.Step`}),` component with `,(0,i.jsx)(t.code,{children:`includeWhen`}),`.`]})]})}function o(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}function s(e){return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(o,{}),`
`,(0,i.jsx)(r,{})]})}function c(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(s,{...e})}):s(e)}export{c as default};