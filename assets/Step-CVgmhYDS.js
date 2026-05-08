import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Lr as t}from"./index-2AO2Cu5K.js";import n from"./demos-BaDyVXIK.js";var r=e();function i(e){let n={a:`a`,code:`code`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...t(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h2,{children:`Import`}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Wizard } from '@dnb/eufemia/extensions/forms'
render(<Wizard.Step />)
`})}),`
`,(0,r.jsx)(n.h2,{children:`Description`}),`
`,(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:`Wizard.Step`}),` shows child components when the surrounding `,(0,r.jsx)(n.a,{href:`/uilib/extensions/forms/Wizard/Container/`,children:`Wizard.Container`}),` has been navigated to this step. `,(0,r.jsx)(n.code,{children:`Wizard.Container`}),` keeps track of the active step, and navigating between wizard steps is done through callbacks on the `,(0,r.jsx)(n.code,{children:`Wizard.Context`}),`, e.g., using `,(0,r.jsx)(n.a,{href:`/uilib/extensions/forms/Wizard/Buttons/`,children:`navigation buttons`}),`.`]}),`
`,(0,r.jsx)(n.h2,{children:`Relevant links`}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Wizard/Step`,children:`Source code`})}),`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/Wizard/Step`,children:`Docs code`})}),`
`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Form, Wizard } from '@dnb/eufemia/extensions/forms'

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
`,(0,r.jsxs)(n.p,{children:[`It uses `,(0,r.jsx)(n.a,{href:`/uilib/layout/flex/stack/`,children:`Flex.Stack`}),`, so you do not need to wrap your content additionally.`]}),`
`,(0,r.jsx)(n.h2,{children:`EditButton`}),`
`,(0,r.jsxs)(n.p,{children:[`In order to navigate back to another step, you can use the `,(0,r.jsx)(n.a,{href:`/uilib/extensions/forms/Wizard/EditButton/`,children:`Wizard.EditButton`}),` component.`]}),`
`,(0,r.jsx)(n.h2,{children:`Events`}),`
`,(0,r.jsxs)(n.p,{children:[`If you need an event to be triggered when the user changes the active step, you can use the `,(0,r.jsx)(n.code,{children:`onStepChange`}),` in the `,(0,r.jsx)(n.a,{href:`/uilib/extensions/forms/Wizard/Container/`,children:`Wizard.Container`}),`.`]}),`
`,(0,r.jsx)(n.h2,{children:`Dynamic steps support`}),`
`,(0,r.jsxs)(n.p,{children:[`You can use the `,(0,r.jsx)(n.code,{children:`Wizard.Step`}),` component to create dynamic steps. The `,(0,r.jsx)(n.code,{children:`include`}),` and `,(0,r.jsx)(n.code,{children:`includeWhen`}),` properties allow you to show or hide a step based on specific conditions.`]}),`
`,(0,r.jsxs)(n.p,{children:[`If a step is replaced by another step, the `,(0,r.jsx)(n.code,{children:`onStepChange`}),` event will trigger with `,(0,r.jsx)(n.code,{children:`stepListModified`}),` as the second argument. The current step index might remain the same. However, if the total number of steps becomes less than the current step, the index will adjust to the last step.`]}),`
`,(0,r.jsxs)(n.p,{children:[`To keep track of the current step, you can provide each step with an `,(0,r.jsx)(n.code,{children:`id`}),` property. This `,(0,r.jsx)(n.code,{children:`id`}),` can then be used to identify the current step and will be returned as part of an object in the `,(0,r.jsx)(n.code,{children:`onStepChange`}),` event.
The same options object also provides `,(0,r.jsx)(n.code,{children:`totalSteps`}),`.`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`<Wizard.Container
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
`,(0,r.jsxs)(n.p,{children:[`In the demo section, you will find an example demonstrating how to use the `,(0,r.jsx)(n.code,{children:`Wizard.Step`}),` component with `,(0,r.jsx)(n.code,{children:`includeWhen`}),`.`]})]})}function a(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(i,{...e})}):i(e)}function o(e){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(a,{}),`
`,(0,r.jsx)(n,{})]})}function s(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(o,{...e})}):o(e)}export{s as default};