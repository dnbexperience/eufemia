import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Rr as t}from"./index-CMgyXmp3.js";import n from"./demos-Bgl4erfa.js";var r=e();function i(e){let n={a:`a`,code:`code`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...t(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h2,{children:`Import`}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Wizard } from '@dnb/eufemia/extensions/forms'
render(<Wizard.Container />)
`})}),`
`,(0,r.jsx)(n.h2,{children:`Description`}),`
`,(0,r.jsxs)(n.p,{children:[`The `,(0,r.jsx)(n.code,{children:`Wizard.Container`}),` is a container component for multi-step forms, including a `,(0,r.jsx)(n.a,{href:`/uilib/components/step-indicator/`,children:`StepIndicator`}),`.`]}),`
`,(0,r.jsx)(n.h2,{children:`Relevant links`}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Wizard/Container`,children:`Source code`})}),`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/Wizard/Container`,children:`Docs code`})}),`
`]}),`
`,(0,r.jsxs)(n.p,{children:[`Use the `,(0,r.jsx)(n.a,{href:`/uilib/extensions/forms/Wizard/Step/`,children:`Wizard.Step`}),` component to define the wizard steps.`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Form, Wizard } from '@dnb/eufemia/extensions/forms'

const MyForm = () => {
  return (
    <Form.Handler>
      <Wizard.Container>
        <Wizard.Step title="Step 1">...</Wizard.Step>
      </Wizard.Container>
    </Form.Handler>
  )
}
`})}),`
`,(0,r.jsxs)(n.p,{children:[`You can also split or separate the `,(0,r.jsx)(n.code,{children:`Wizard.Step`}),` and its content:`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Form, Wizard } from '@dnb/eufemia/extensions/forms'

// You can use the \`Wizard.Step\` in an external component like this:
const Step1 = () => (
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
`,(0,r.jsxs)(n.p,{children:[`You can mix and match the usage of `,(0,r.jsx)(n.code,{children:`Wizard.Step`}),` and `,(0,r.jsx)(n.code,{children:`Flex.Stack`}),` depending on your needs:`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Form, Wizard } from '@dnb/eufemia/extensions/forms'

const Step2 = () => (
  <Flex.Stack>
    <Form.Card>
      <P>Contents</P>
    </Form.Card>
    <Form.Card>
      <P>Contents</P>
    </Form.Card>

    <Wizard.Buttons />
  </Flex.Stack>
)

const MyForm = () => {
  return (
    <Form.Handler>
      <Wizard.Container>
        <Wizard.Step title="Step 2">
          <Form.MainHeading>Heading</Form.MainHeading>
          <Step2 />
          <Wizard.Buttons />
        </Wizard.Step>
      </Wizard.Container>
    </Form.Handler>
  )
}
`})}),`
`,(0,r.jsx)(n.h2,{children:`Controlling the wizard steps`}),`
`,(0,r.jsxs)(n.p,{children:[`To define a different initial index (other than 0), you can use the `,(0,r.jsx)(n.code,{children:`initialActiveIndex`}),` property.`]}),`
`,(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:`Note:`}),` When using `,(0,r.jsx)(n.code,{children:`initialActiveIndex`}),`, there may be previous steps with unknown field validation statuses. To address this, you can use the `,(0,r.jsx)(n.code,{children:`keepInDOM`}),` property to ensure that some or all steps are not removed from the DOM, so validation runs on fields in previous steps.`]}),`
`,(0,r.jsxs)(n.p,{children:[`For controlling the wizard steps interactively, you can use the `,(0,r.jsx)(n.a,{href:`/uilib/extensions/forms/Wizard/useStep/`,children:`Wizard.useStep`}),` hook:`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Form, Wizard } from '@dnb/eufemia/extensions/forms'

const MyStep = () => {
  const { setActiveIndex, activeIndex } = Wizard.useStep()
  return (
    <Form.Card>
      <Button onClick={() => setActiveIndex(1)}>Go to step 2</Button>
    </Form.Card>
  )
}

const MyForm = () => {
  return (
    <Form.Handler>
      <Wizard.Container initialActiveIndex={3}>
        <Wizard.Step>
          <MyStep />
        </Wizard.Step>
      </Wizard.Container>
    </Form.Handler>
  )
}
`})}),`
`,(0,r.jsxs)(n.p,{children:[`When using the `,(0,r.jsx)(n.code,{children:`useStep`}),` hook outside of the `,(0,r.jsx)(n.code,{children:`Wizard.Container`}),` context, you need to provide a unique `,(0,r.jsx)(n.code,{children:`id`}),` (string, function, object or React Context as the reference):`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Form, Wizard } from '@dnb/eufemia/extensions/forms'

const myContainerId = 'unique-id' // or a function, object or React Context reference

const MyForm = () => {
  const { setActiveIndex, activeIndex } = Wizard.useStep(myContainerId)

  return (
    <Form.Handler>
      <Wizard.Container id={myContainerId}>
        <Wizard.Step>
          <Button onClick={() => setActiveIndex(0)}>Step 1</Button>
        </Wizard.Step>
        <Wizard.Step>
          <Button onClick={() => setActiveIndex(1)}>Step 2</Button>
        </Wizard.Step>
      </Wizard.Container>
    </Form.Handler>
  )
}
`})}),`
`,(0,r.jsxs)(n.p,{children:[`You can also prevent the user from navigating to the next or previous step, by using the `,(0,r.jsx)(n.code,{children:`preventNavigation`}),` callback function found as the third parameter, in the `,(0,r.jsx)(n.code,{children:`onStepChange`}),` event.`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Form, Wizard } from '@dnb/eufemia/extensions/forms'

const MyForm = () => {
  return (
    <Form.Handler>
      <Wizard.Container
        onStepChange={(step, type, { preventNavigation }) => {
          if (step === 2 && type === 'next') {
            preventNavigation()
          }
        }}
      >
        <Wizard.Step title="Step 1">
          <P>Step 1</P>
          <Wizard.Buttons />
        </Wizard.Step>
        <Wizard.Step title="Step 2">
          <P>Step 2</P>
          <Wizard.Buttons />
        </Wizard.Step>
        <Wizard.Step title="Step 3">
          <P>Step 3</P>
          <Wizard.Buttons />
        </Wizard.Step>
      </Wizard.Container>
    </Form.Handler>
  )
}
`})}),`
`,(0,r.jsx)(n.h2,{children:`Modes`}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsxs)(n.li,{children:[`The `,(0,r.jsx)(n.code,{children:`strict`}),` mode is the default. The user can only navigate forward using the `,(0,r.jsx)(n.a,{href:`/uilib/extensions/forms/Wizard/NextButton/`,children:`Wizard.NextButton`}),`, not via the menu. However, the previous step remains active, allowing the user to go back at any time—even if there are errors in the current step.`]}),`
`,(0,r.jsxs)(n.li,{children:[`Use `,(0,r.jsx)(n.code,{children:`loose`}),` mode if the user should be able to navigate freely between all steps, including those that have not been visited before. When there is an error in the current step, the user can navigate to other steps via the menu but not via the `,(0,r.jsx)(n.a,{href:`/uilib/extensions/forms/Wizard/NextButton/`,children:`Wizard.NextButton`}),`.`]}),`
`]}),`
`,(0,r.jsx)(n.h2,{children:`Accessibility`}),`
`,(0,r.jsxs)(n.p,{children:[`The `,(0,r.jsx)(n.code,{children:`Wizard.Step`}),` component uses an `,(0,r.jsx)(n.code,{children:`aria-label`}),` attribute that matches the title property value. The step content is enclosed within a section element, which further enhances accessibility.`]}),`
`,(0,r.jsx)(n.p,{children:`Whenever a new step becomes active, it automatically receives focus, ensuring that screen readers convey the relevant information to users.`}),`
`,(0,r.jsx)(n.p,{children:`Additionally, during a step change, the Wizard will scroll to the top of the form to ensure the user is aware of the new content.`})]})}function a(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(i,{...e})}):i(e)}function o(e){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(a,{}),`
`,(0,r.jsx)(n,{})]})}function s(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(o,{...e})}):o(e)}export{s as default};