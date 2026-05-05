import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{t as n}from"./ComponentBox-geTEYZ7b.js";import{Rr as r}from"./index-CMgyXmp3.js";var i=e({Default:()=>o,OnStepChange:()=>s,OutsideOfContext:()=>c}),a=t(),o=()=>(0,a.jsx)(n,{noInline:!0,children:`const Step1 = () => {
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
`}),s=()=>(0,a.jsx)(n,{noInline:!0,children:`const onStepChange1 = (index, mode, { preventNavigation }) => {
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
`}),c=()=>(0,a.jsx)(n,{noInline:!0,children:`const RenderBefore = () => {
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
`});function l(e){let t={code:`code`,h2:`h2`,h3:`h3`,...r(),...e.components};return i||d(`Examples`,!1),o||d(`Examples.Default`,!0),s||d(`Examples.OnStepChange`,!0),c||d(`Examples.OutsideOfContext`,!0),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.h2,{children:`Demos`}),`
`,(0,a.jsx)(o,{}),`
`,(0,a.jsx)(t.h3,{children:`Outside of context`}),`
`,(0,a.jsx)(c,{}),`
`,(0,a.jsxs)(t.h3,{children:[`Using `,(0,a.jsx)(t.code,{children:`onStepChange`}),` event`]}),`
`,(0,a.jsx)(s,{})]})}function u(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(l,{...e})}):l(e)}function d(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{u as default};