import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Lr as t}from"./index--zEB_f_m.js";import n from"./demos-CEtD7w3J.js";var r=e();function i(e){let n={a:`a`,code:`code`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...t(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h2,{children:`Import`}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Wizard } from '@dnb/eufemia/extensions/forms'
// Use Wizard.useStep
`})}),`
`,(0,r.jsx)(n.h2,{children:`Description`}),`
`,(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.code,{children:`Wizard.useStep`}),` is a React Hook that returns `,(0,r.jsx)(n.code,{children:`Wizard.Context`}),` parameters such as `,(0,r.jsx)(n.code,{children:`totalSteps`}),`, `,(0,r.jsx)(n.code,{children:`activeIndex`}),` or the `,(0,r.jsx)(n.code,{children:`setActiveIndex`}),` handler.`]}),`
`,(0,r.jsx)(n.h2,{children:`Relevant links`}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Wizard/useStep.tsx`,children:`Source code`})}),`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/Wizard/useStep`,children:`Docs code`})}),`
`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-jsx`,children:`import { Form, Wizard } from '@dnb/eufemia/extensions/forms'

function Step1() {
  const { totalSteps, activeIndex, setActiveIndex } = Wizard.useStep()

  return <Wizard.Step>...</Wizard.Step>
}

function MyForm() {
  return (
    <Form.Handler>
      <Wizard.Container>
        <Step1 />
      </Wizard.Container>
    </Form.Handler>
  )
}
`})}),`
`,(0,r.jsxs)(n.p,{children:[`You can also connect the hook with the `,(0,r.jsx)(n.code,{children:`Wizard.Container`}),` via an `,(0,r.jsx)(n.code,{children:`id`}),` (string, function, object or React Context as the reference). This lets you render the hook outside of the context:`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-jsx`,children:`import { Form } from '@dnb/eufemia/extensions/forms'

const myContainerId = 'unique-id' // or a function, object or React Context reference

function Sidecar() {
  const { activeIndex, setActiveIndex } = Wizard.useStep(myContainerId)
}

function MyForm() {
  return (
    <Form.Handler>
      <Sidecar />
      <Wizard.Container id={myContainerId}>...</Wizard.Container>
    </Form.Handler>
  )
}
`})}),`
`,(0,r.jsx)(n.h2,{children:`EditButton`}),`
`,(0,r.jsxs)(n.p,{children:[`In order to navigate to a new step when using `,(0,r.jsx)(n.code,{children:`setActiveIndex`}),` you can use the `,(0,r.jsx)(n.a,{href:`/uilib/extensions/forms/Wizard/EditButton/`,children:`Wizard.EditButton`}),` component.`]}),`
`,(0,r.jsx)(n.h2,{children:`Listen to step change`}),`
`,(0,r.jsxs)(n.p,{children:[`You can also use the `,(0,r.jsx)(n.code,{children:`onStepChange`}),` event to listen to a step change.`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-jsx`,children:`function MyStep() {
  // Ensure to use "useCallback" or keep the function outside of the component to avoid memory leaks
  const onStepChange = React.useCallback(
    (index, mode, { preventNavigation }) => {
      // Do something with the step change
    },
    []
  )

  Wizard.useStep(undefined, { onStepChange })

  return <Wizard.Step>...</Wizard.Step>
}
`})})]})}function a(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(i,{...e})}):i(e)}function o(e){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(a,{}),`
`,(0,r.jsx)(n,{})]})}function s(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(o,{...e})}):o(e)}export{s as default};