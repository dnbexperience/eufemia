import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { Field, Form, Wizard } from '@dnb/eufemia/src/extensions/forms'

export const InWizard = () => {
  return (
    <ComponentBox>
      {() => {
        const MyForm = () => {
          const { createSnapshot, revertSnapshot } =
            Form.useSnapshot('my-form')

          return (
            <Form.Handler
              id="my-form"
              defaultData={{ activeSteps: 'group-1' }}
            >
              <Wizard.Container
                onStepChange={(index, mode, args) => {
                  if (mode === 'previous') {
                    revertSnapshot(args.id)
                  } else {
                    createSnapshot(args.previousStep.id)
                  }
                }}
              >
                <Wizard.Step
                  title="Step A"
                  id="step-a"
                  activeWhen={{
                    path: '/activeSteps',
                    hasValue: 'group-1',
                  }}
                >
                  <Form.MainHeading>Step A</Form.MainHeading>
                  <Field.String path="/foo" label="Content" />
                  <Wizard.Buttons />
                </Wizard.Step>

                <Wizard.Step
                  title="Step B"
                  id="step-b"
                  activeWhen={{
                    path: '/activeSteps',
                    hasValue: 'group-1',
                  }}
                >
                  <Form.MainHeading>Step B</Form.MainHeading>
                  <Field.String path="/foo" label="Content" />
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
                  <Field.String path="/foo" label="Content" />
                  <Wizard.Buttons />
                </Wizard.Step>

                <Wizard.Step
                  title="Step D"
                  id="step-d"
                  activeWhen={{
                    path: '/activeSteps',
                    hasValue: 'group-2',
                  }}
                >
                  <Form.MainHeading>Step D</Form.MainHeading>
                  <Field.String path="/foo" label="Content" />
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
          )
        }

        return <MyForm></MyForm>
      }}
    </ComponentBox>
  )
}
