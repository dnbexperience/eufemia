import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{W as n}from"./index-BCXtuv-b.js";import r from"./demos-BlGKEbp32.js";var i=e(t());function a(e){let t={a:`a`,code:`code`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...n(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h2,{children:`Import`}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Wizard } from '@dnb/eufemia/extensions/forms'
// Use Wizard.useStep
`})}),`
`,(0,i.jsx)(t.h2,{children:`Description`}),`
`,(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.code,{children:`Wizard.useStep`}),` is a React Hook that returns `,(0,i.jsx)(t.code,{children:`Wizard.Context`}),` parameters such as `,(0,i.jsx)(t.code,{children:`totalSteps`}),`, `,(0,i.jsx)(t.code,{children:`activeIndex`}),` or the `,(0,i.jsx)(t.code,{children:`setActiveIndex`}),` handler.`]}),`
`,(0,i.jsx)(t.h2,{children:`Relevant links`}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Wizard/useStep.tsx`,children:`Source code`})}),`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/Wizard/useStep`,children:`Docs code`})}),`
`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-jsx`,children:`import { Form, Wizard } from '@dnb/eufemia/extensions/forms'

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
`,(0,i.jsxs)(t.p,{children:[`You can also connect the hook with the `,(0,i.jsx)(t.code,{children:`Wizard.Container`}),` via an `,(0,i.jsx)(t.code,{children:`id`}),` (string, function, object or React Context as the reference). This lets you render the hook outside of the context:`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-jsx`,children:`import { Form } from '@dnb/eufemia/extensions/forms'

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
`,(0,i.jsx)(t.h2,{children:`EditButton`}),`
`,(0,i.jsxs)(t.p,{children:[`In order to navigate to a new step when using `,(0,i.jsx)(t.code,{children:`setActiveIndex`}),` you can use the `,(0,i.jsx)(t.a,{href:`/uilib/extensions/forms/Wizard/EditButton/`,children:`Wizard.EditButton`}),` component.`]}),`
`,(0,i.jsx)(t.h2,{children:`Listen to step change`}),`
`,(0,i.jsxs)(t.p,{children:[`You can also use the `,(0,i.jsx)(t.code,{children:`onStepChange`}),` event to listen to a step change.`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-jsx`,children:`function MyStep() {
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
`})})]})}function o(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}function s(e){return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(o,{}),`
`,(0,i.jsx)(r,{})]})}function c(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(s,{...e})}):s(e)}export{c as default};