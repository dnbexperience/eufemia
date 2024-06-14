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
        <Wizard.Container id="my-wizard">
          <Wizard.Step
            title="Step 1"
            activeWhen={{ path: '/activeSteps', hasValue: 'group-1' }}
          >
            <Form.MainHeading>Step 1</Form.MainHeading>
            <Wizard.Buttons />
          </Wizard.Step>

          <Wizard.Step
            title="Step 2"
            activeWhen={{ path: '/activeSteps', hasValue: 'group-1' }}
          >
            <Form.MainHeading>Step 2</Form.MainHeading>
            <Wizard.Buttons />
          </Wizard.Step>

          <Wizard.Step
            title="Step 3"
            activeWhen={{
              path: '/activeSteps',
              withValue: (value: string) =>
                ['group-1', 'group-2'].includes(value),
            }}
          >
            <Form.MainHeading>Step 3</Form.MainHeading>
            <Wizard.Buttons />
          </Wizard.Step>

          <Wizard.Step
            title="Step 4"
            activeWhen={{ path: '/activeSteps', hasValue: 'group-2' }}
          >
            <Form.MainHeading>Step 4</Form.MainHeading>
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
