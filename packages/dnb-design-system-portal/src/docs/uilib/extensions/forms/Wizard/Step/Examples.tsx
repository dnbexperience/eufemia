import { Card, P } from '@dnb/eufemia/src'
import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import {
  Field,
  Form,
  Value,
  Wizard,
} from '@dnb/eufemia/src/extensions/forms'

export const DynamicSteps = () => {
  return (
    <ComponentBox>
      <Form.Handler defaultData={{ activeSteps: 'group-1' }}>
        <Wizard.Container
          onStepChange={(index, mode, args) => {
            console.log('onStepChange', index, mode, args.id)
          }}
        >
          <Wizard.Step
            title="Step A"
            id="step-a"
            activeWhen={{ path: '/activeSteps', hasValue: 'group-1' }}
          >
            <Form.MainHeading>Step A</Form.MainHeading>
            <Wizard.Buttons />
          </Wizard.Step>

          <Wizard.Step
            title="Step B"
            id="step-b"
            activeWhen={{ path: '/activeSteps', hasValue: 'group-1' }}
          >
            <Form.MainHeading>Step B</Form.MainHeading>
            <Wizard.Buttons />
          </Wizard.Step>

          <Wizard.Step
            title="Step C"
            id="step-c"
            activeWhen={{
              path: '/activeSteps',
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
            activeWhen={{ path: '/activeSteps', hasValue: 'group-2' }}
          >
            <Form.MainHeading>Step D</Form.MainHeading>
            <Wizard.Buttons />
          </Wizard.Step>
        </Wizard.Container>

        <Field.Selection
          path="/activeSteps"
          variant="button"
          optionsLayout="horizontal"
          top
        >
          <Field.Option value="group-1" title="Group 1" />
          <Field.Option value="group-2" title="Group 2" />
        </Field.Selection>
      </Form.Handler>
    </ComponentBox>
  )
}

export const EditButton = () => {
  return (
    <ComponentBox data-visual-test="wizard-edit-button">
      {() => {
        const Step = ({ title }) => {
          return (
            <Wizard.Step title={title}>
              <Card stack>
                <P>Contents</P>
              </Card>

              <Wizard.Buttons />
            </Wizard.Step>
          )
        }

        const Summary = () => {
          const { summaryTitle } = Form.useLocale().Step

          return (
            <Wizard.Step title={summaryTitle}>
              <Card stack>
                <Value.SummaryList>
                  <Value.Name.First path="/firstName" />
                </Value.SummaryList>

                <Wizard.EditButton toStep={0} />
              </Card>
            </Wizard.Step>
          )
        }

        return (
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
      }}
    </ComponentBox>
  )
}
