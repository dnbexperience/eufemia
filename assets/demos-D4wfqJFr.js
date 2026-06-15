import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{t as r}from"./Button-DwQUlfj-.js";import{c as i}from"./ToggleButton-_NsXxiTa.js";import{n as a}from"./Wizard-CUdMs3bu.js";import{K as o}from"./index-ppRu2ktv.js";import{t as s}from"./ComponentBox-R2c6Bo76.js";var c=e({Default:()=>u,OnStepChange:()=>d,OutsideOfContext:()=>f}),l=t(n()),u=()=>(0,l.jsx)(s,{stableName:`Default`,sourceImports:[`import { Button, Flex } from '@dnb/eufemia'`,`import { Wizard } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Wizard:a,Button:r},noInline:!0,children:`const Step1 = () => {
  const { activeIndex, setActiveIndex } = Wizard.useStep()
  return (
    <Button
      variant="secondary"
      onClick={() => {
        setActiveIndex(activeIndex + 1)
      }}
    >
      Next
    </Button>
  )
}
const Step2 = () => {
  const { activeIndex, setActiveIndex } = Wizard.useStep()
  return (
    <Button
      variant="secondary"
      onClick={() => {
        setActiveIndex(activeIndex + 1)
      }}
    >
      Next
    </Button>
  )
}
const Step3 = () => {
  const { activeIndex, setActiveIndex } = Wizard.useStep()
  return (
    <Button
      variant="secondary"
      onClick={() => {
        setActiveIndex(activeIndex - 1)
      }}
    >
      Previous
    </Button>
  )
}
render(
  <Wizard.Container mode="loose">
    <Wizard.Step title="Step 1">
      <Step1 />
    </Wizard.Step>

    <Wizard.Step title="Step 2">
      <Step2 />
    </Wizard.Step>

    <Wizard.Step title="Step 3">
      <Step3 />
    </Wizard.Step>
  </Wizard.Container>
)
`}),d=()=>(0,l.jsx)(s,{stableName:`OnStepChange`,sourceImports:[`import { Button, Flex } from '@dnb/eufemia'`,`import { Wizard } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Wizard:a},noInline:!0,children:`const onStepChange1 = (index, mode, { preventNavigation }) => {
  console.log(
    'onStepChange from Step1:',
    index,
    mode,
    typeof preventNavigation
  )
}
const onStepChange2 = (index, mode, { preventNavigation }) => {
  console.log(
    'onStepChange from Step2:',
    index,
    mode,
    typeof preventNavigation
  )
}
const onStepChange3 = (index, mode, { preventNavigation }) => {
  console.log(
    'onStepChange from Step3:',
    index,
    mode,
    typeof preventNavigation
  )
}
const Step1 = () => {
  Wizard.useStep(undefined, {
    onStepChange: onStepChange1,
  })
  return (
    <Wizard.Step title="Step 1">
      <Wizard.Buttons />
    </Wizard.Step>
  )
}
const Step2 = () => {
  Wizard.useStep(undefined, {
    onStepChange: onStepChange2,
  })
  return (
    <Wizard.Step title="Step 2">
      <Wizard.Buttons />
    </Wizard.Step>
  )
}
const Step3 = () => {
  Wizard.useStep(undefined, {
    onStepChange: onStepChange3,
  })
  return (
    <Wizard.Step title="Step 3">
      <Wizard.Buttons />
    </Wizard.Step>
  )
}
render(
  <Wizard.Container mode="loose">
    <Step1 />
    <Step2 />
    <Step3 />
  </Wizard.Container>
)
`}),f=()=>(0,l.jsx)(s,{stableName:`OutsideOfContext`,sourceImports:[`import { Button, Flex } from '@dnb/eufemia'`,`import { Wizard } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Wizard:a,Button:r,Flex:i},noInline:!0,children:`const RenderBefore = () => {
  const { activeIndex, setActiveIndex } = Wizard.useStep('unique-id')
  return (
    <Button
      variant="secondary"
      onClick={() => {
        setActiveIndex(activeIndex - 1)
      }}
    >
      Previous
    </Button>
  )
}
const RenderAfter = () => {
  const { activeIndex, setActiveIndex } = Wizard.useStep('unique-id')
  return (
    <Button
      variant="secondary"
      onClick={() => {
        setActiveIndex(activeIndex + 1)
      }}
    >
      Next
    </Button>
  )
}
render(
  <Flex.Stack>
    <RenderBefore />
    <Wizard.Container id="unique-id" mode="loose">
      <Wizard.Step title="Step 1">
        <output>Step 1</output>
      </Wizard.Step>

      <Wizard.Step title="Step 2">
        <output>Step 2</output>
      </Wizard.Step>

      <Wizard.Step title="Step 1">
        <output>Step 3</output>
      </Wizard.Step>
    </Wizard.Container>
    <RenderAfter />
  </Flex.Stack>
)
`});function p(e){let t={code:`code`,h2:`h2`,h3:`h3`,...o(),...e.components};return c||h(`Examples`,!1),u||h(`Examples.Default`,!0),d||h(`Examples.OnStepChange`,!0),f||h(`Examples.OutsideOfContext`,!0),(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(t.h2,{children:`Demos`}),`
`,(0,l.jsx)(u,{}),`
`,(0,l.jsx)(t.h3,{children:`Outside of context`}),`
`,(0,l.jsx)(f,{}),`
`,(0,l.jsxs)(t.h3,{children:[`Using `,(0,l.jsx)(t.code,{children:`onStepChange`}),` event`]}),`
`,(0,l.jsx)(d,{})]})}function m(e={}){let{wrapper:t}={...o(),...e.components};return t?(0,l.jsx)(t,{...e,children:(0,l.jsx)(p,{...e})}):p(e)}function h(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{m as default};