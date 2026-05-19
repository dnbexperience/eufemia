import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{t as n}from"./jsx-runtime-BgMs7Gb-.js";import{t as r}from"./ComponentBox-a4aOn231.js";var i=t({DynamicSteps:()=>o,EditButton:()=>c,Inactive:()=>s}),a=e(n()),o=()=>(0,a.jsx)(r,{stableName:`DynamicSteps`,children:`<Form.Handler
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
`}),s=()=>(0,a.jsx)(r,{"data-visual-test":`wizard-step-inactive`,stableName:`Inactive`,noInline:!0,children:`const Component = () => {
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
`}),c=()=>(0,a.jsx)(r,{"data-visual-test":`wizard-edit-button`,stableName:`EditButton`,noInline:!0,children:`const Step = ({ title }) => {
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
`});export{s as i,c as n,i as r,o as t};