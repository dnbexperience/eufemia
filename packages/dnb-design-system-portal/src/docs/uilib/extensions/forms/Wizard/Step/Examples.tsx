import { Provider } from '@dnb/eufemia/src/shared'
import { P } from '@dnb/eufemia/src'
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
      <Form.Handler defaultData={{ includedSteps: 'group-1' }}>
        <Provider
          StepIndicator={{ overviewTitle: 'Dynamic steps wizard steps' }}
        >
          <Wizard.Container
            onStepChange={(index, mode, args) => {
              console.log('onStepChange', index, mode, args.id)
            }}
          >
            <Wizard.Step
              aria-label="Dynamic steps wizard: Step A"
              title="Step A"
              id="step-a"
              includeWhen={{ path: '/includedSteps', hasValue: 'group-1' }}
            >
              <Form.MainHeading>Step A</Form.MainHeading>
              <Wizard.Buttons />
            </Wizard.Step>

            <Wizard.Step
              aria-label="Dynamic steps wizard: Step B"
              title="Step B"
              id="step-b"
              includeWhen={{ path: '/includedSteps', hasValue: 'group-1' }}
            >
              <Form.MainHeading>Step B</Form.MainHeading>
              <Wizard.Buttons />
            </Wizard.Step>

            <Wizard.Step
              aria-label="Dynamic steps wizard: Step C"
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
              aria-label="Dynamic steps wizard: Step D"
              title="Step D"
              id="step-d"
              includeWhen={{ path: '/includedSteps', hasValue: 'group-2' }}
            >
              <Form.MainHeading>Step D</Form.MainHeading>
              <Wizard.Buttons />
            </Wizard.Step>
          </Wizard.Container>
        </Provider>

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
    </ComponentBox>
  )
}

export const Inactive = () => {
  return (
    <ComponentBox data-visual-test="wizard-step-inactive">
      {() => {
        const Component = () => {
          const { activeIndex } = Wizard.useStep('unique-id-inactive')

          return (
            <Provider
              StepIndicator={{
                overviewTitle: 'Inactive steps wizard steps',
              }}
            >
              <Wizard.Container
                mode="strict"
                id="unique-id-inactive"
                initialActiveIndex={2}
                expandedInitially
              >
                <Wizard.Step
                  aria-label="Inactive steps wizard: Step 1"
                  title="Step 1"
                  inactive
                >
                  <Wizard.Buttons />
                </Wizard.Step>

                <Wizard.Step
                  aria-label="Inactive steps wizard: Step 2"
                  title="Step 2"
                  inactive={activeIndex < 1}
                >
                  <Wizard.Buttons />
                </Wizard.Step>

                <Wizard.Step
                  aria-label="Inactive steps wizard: Step 3"
                  title="Step 3"
                  inactive={activeIndex < 2}
                >
                  <Wizard.Buttons />
                </Wizard.Step>
                <Wizard.Step
                  aria-label="Inactive steps wizard: Step 4"
                  title="Step 4"
                  inactive={activeIndex < 3}
                >
                  <Wizard.Buttons />
                </Wizard.Step>
              </Wizard.Container>
            </Provider>
          )
        }

        return <Component />
      }}
    </ComponentBox>
  )
}

export const EditButton = () => {
  return (
    <ComponentBox data-visual-test="wizard-edit-button">
      {() => {
        const Step = ({ title }) => {
          return (
            <Wizard.Step
              aria-label={`Edit button wizard: ${title}`}
              title={title}
            >
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
            <Wizard.Step
              aria-label={`Edit button wizard: ${summaryTitle}`}
              title={summaryTitle}
            >
              <Form.Card>
                <Value.SummaryList>
                  <Value.Name.First path="/firstName" />
                </Value.SummaryList>

                <Wizard.EditButton toStep={0} />
              </Form.Card>
            </Wizard.Step>
          )
        }

        return (
          <Form.Handler
            data={{
              firstName: 'John',
            }}
          >
            <Provider
              StepIndicator={{ overviewTitle: 'Edit button wizard steps' }}
            >
              <Wizard.Container initialActiveIndex={1}>
                <Step title="Step" />
                <Summary />
              </Wizard.Container>
            </Provider>
          </Form.Handler>
        )
      }}
    </ComponentBox>
  )
}
