import { useState } from 'react'
import ComponentBox from '../../../../../../../shared/tags/ComponentBox'
import { FormStatus } from '@dnb/eufemia/src'
import {
  Field,
  Form,
  Value,
  Wizard,
} from '@dnb/eufemia/src/extensions/forms'

export const ViewAndEditContainer = () => {
  return (
    <ComponentBox>
      {() => {
        const MyEditContainer = () => {
          return (
            <Form.Section.EditContainer>
              <Field.Name.First path="/firstName" />
              <Field.Name.Last path="/lastName" />
            </Form.Section.EditContainer>
          )
        }

        const MyViewContainer = () => {
          return (
            <Form.Section.ViewContainer>
              <Value.SummaryList>
                <Value.Name.First path="/firstName" />
                <Value.Name.Last path="/lastName" />
              </Value.SummaryList>
            </Form.Section.ViewContainer>
          )
        }

        return (
          <Form.Handler
            onSubmit={async (data) => console.log('onSubmit', data)}
            defaultData={{
              nestedPath: {
                firstName: 'Nora',
              },
            }}
          >
            <Form.Card>
              <Form.SubHeading>Your account</Form.SubHeading>
              <Form.Section
                path="/nestedPath"
                required
                containerMode="edit"
              >
                <MyEditContainer />
                <MyViewContainer />
              </Form.Section>
            </Form.Card>
            <Form.SubmitButton />
          </Form.Handler>
        )
      }}
    </ComponentBox>
  )
}

export const PreventUncommittedChanges = () => {
  return (
    <ComponentBox>
      <Form.Handler>
        <Wizard.Container>
          <Wizard.Step title="Profile">
            <Form.Section path="/profile" containerMode="edit">
              <Form.Section.EditContainer preventUncommittedChanges>
                <Field.Name.First path="/firstName" />
              </Form.Section.EditContainer>

              <Form.Section.ViewContainer>
                <Value.Name.First path="/firstName" />
              </Form.Section.ViewContainer>
            </Form.Section>

            <Wizard.Buttons />
          </Wizard.Step>

          <Wizard.Step title="Summary">
            <Value.Name.First path="/profile/firstName" />
            <Wizard.Buttons />
          </Wizard.Step>
        </Wizard.Container>
      </Form.Handler>
    </ComponentBox>
  )
}

export const AsyncOnDone = () => {
  return (
    <ComponentBox>
      {() => {
        const formId = 'async-on-done'

        const Example = () => {
          const [error, setError] = useState<string>()

          const saveSection = async () => {
            setError(undefined)
            await new Promise((resolve) => setTimeout(resolve, 1500))

            const { getValue } = Form.getData(formId)
            if (getValue('/simulateError')) {
              setError('The section could not be saved. Try again.')
              throw new Error('The section could not be saved')
            }
          }

          return (
            <Form.Handler
              id={formId}
              defaultData={{
                profile: { firstName: 'Nora' },
                simulateError: true,
              }}
            >
              <Form.Card>
                <Form.Section path="/profile" containerMode="edit">
                  <Form.Section.EditContainer onDone={saveSection}>
                    <Field.Name.First path="/firstName" />
                    <Field.Boolean
                      path="//simulateError"
                      label="Simulate save error"
                      variant="button"
                    />
                    {error && <FormStatus>{error}</FormStatus>}
                  </Form.Section.EditContainer>

                  <Form.Section.ViewContainer>
                    <Value.Name.First path="/firstName" />
                  </Form.Section.ViewContainer>
                </Form.Section>
              </Form.Card>
            </Form.Handler>
          )
        }

        return <Example />
      }}
    </ComponentBox>
  )
}
