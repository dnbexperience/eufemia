import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{j as r,m as i,v as a,w as o}from"./forms-CsJzlVUF.js";import{t as s}from"./P-CbimSwQH.js";import{t as c}from"./Card-DP9KYSzC.js";import{t as l}from"./ComponentBox-q_23Ylzi.js";var u=e({DynamicSteps:()=>f,EditButton:()=>m,Inactive:()=>p}),d=t(n()),f=()=>(0,d.jsx)(l,{stableName:`DynamicSteps`,sourceImports:[`import { P } from '@dnb/eufemia'`,`import { Field, Form, Value, Wizard } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Form:o,Wizard:i,Field:r},children:`<Form.Handler
  defaultData={{
    includedSteps: 'group-1',
  }}
>
  <Wizard.Container
    onStepChange={(index, mode, args) => {
      console.log('onStepChange', index, mode, args.id)
    }}
  >
    <Wizard.Step
      title="Step A"
      id="step-a"
      includeWhen={{
        path: '/includedSteps',
        hasValue: 'group-1',
      }}
    >
      <Form.MainHeading>Step A</Form.MainHeading>
      <Wizard.Buttons />
    </Wizard.Step>

    <Wizard.Step
      title="Step B"
      id="step-b"
      includeWhen={{
        path: '/includedSteps',
        hasValue: 'group-1',
      }}
    >
      <Form.MainHeading>Step B</Form.MainHeading>
      <Wizard.Buttons />
    </Wizard.Step>

    <Wizard.Step
      title="Step C"
      id="step-c"
      includeWhen={{
        path: '/includedSteps',
        hasValue: (value: string) =>
          ['group-1', 'group-2'].includes(value),
      }}
    >
      <Form.MainHeading>Step C</Form.MainHeading>
      <Wizard.Buttons />
    </Wizard.Step>

    <Wizard.Step
      title="Step D"
      id="step-d"
      includeWhen={{
        path: '/includedSteps',
        hasValue: 'group-2',
      }}
    >
      <Form.MainHeading>Step D</Form.MainHeading>
      <Wizard.Buttons />
    </Wizard.Step>
  </Wizard.Container>

  <Field.Selection
    path="/includedSteps"
    variant="button"
    optionsLayout="horizontal"
    top
  >
    <Field.Option value="group-1" title="Group 1" />
    <Field.Option value="group-2" title="Group 2" />
  </Field.Selection>
</Form.Handler>
`}),p=()=>(0,d.jsx)(l,{"data-visual-test":`wizard-step-inactive`,stableName:`Inactive`,sourceImports:[`import { P } from '@dnb/eufemia'`,`import { Field, Form, Value, Wizard } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Wizard:i},noInline:!0,children:`const Component = () => {
  const { activeIndex } = Wizard.useStep('unique-id-inactive')
  return (
    <Wizard.Container
      mode="strict"
      id="unique-id-inactive"
      initialActiveIndex={2}
      expandedInitially
    >
      <Wizard.Step title="Step 1" inactive>
        <Wizard.Buttons />
      </Wizard.Step>

      <Wizard.Step title="Step 2" inactive={activeIndex < 1}>
        <Wizard.Buttons />
      </Wizard.Step>

      <Wizard.Step title="Step 3" inactive={activeIndex < 2}>
        <Wizard.Buttons />
      </Wizard.Step>
      <Wizard.Step title="Step 4" inactive={activeIndex < 3}>
        <Wizard.Buttons />
      </Wizard.Step>
    </Wizard.Container>
  )
}
render(<Component />)
`}),m=()=>(0,d.jsx)(l,{"data-visual-test":`wizard-edit-button`,stableName:`EditButton`,sourceImports:[`import { P } from '@dnb/eufemia'`,`import { Field, Form, Value, Wizard } from '@dnb/eufemia/extensions/forms'`],__buildScope:{Wizard:i,Form:o,Card:c,P:s,Value:a},noInline:!0,children:`const Step = ({ title }) => {
  return (
    <Wizard.Step title={title}>
      <Form.Card>
        <P>Contents</P>
      </Form.Card>

      <Wizard.Buttons />
    </Wizard.Step>
  )
}
const Summary = () => {
  const { summaryTitle } = Form.useTranslation().Step
  return (
    <Wizard.Step title={summaryTitle}>
      <Form.Card>
        <Value.SummaryList>
          <Value.Name.First path="/firstName" />
        </Value.SummaryList>

        <Wizard.EditButton toStep={0} />
      </Form.Card>
    </Wizard.Step>
  )
}
render(
  <Form.Handler
    data={{
      firstName: 'John',
    }}
  >
    <Wizard.Container initialActiveIndex={1}>
      <Step title="Step" />
      <Summary />
    </Wizard.Container>
  </Form.Handler>
)
`});export{p as i,m as n,u as r,f as t};