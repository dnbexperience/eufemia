import React from 'react'
import { Field, Form, Value, Wizard } from '..'
import { Flex } from '../../../components'

export default {
  title: 'Eufemia/Extensions/Forms/FieldAndValueVisibility',
}

const LogVisibleData = () => {
  const { data, reduceToVisibleFields } = Form.useData()

  // Use useEffect to ensure we get the latest data
  React.useEffect(() => {
    console.log(
      'visibleData',
      reduceToVisibleFields(data, {
        removePaths: ['/isVisible'],
      })
    )
  }, [data, reduceToVisibleFields])

  return null
}

export const ValueVisibility = () => {
  const [count, increment] = React.useReducer((state) => state + 1, 1)

  return (
    <Form.Handler
    // onChange={(data) => console.log('onChange', data)}
    // onSubmit={(data) => console.log('onSubmit', data)}
    >
      <LogVisibleData />
      <Form.Card>
        <button type="button" onClick={increment}>
          {count}
        </button>

        <Field.Boolean
          label="Visible"
          variant="button"
          path="/isVisible"
          defaultValue={true}
        />

        <Value.Selection inheritLabel inheritVisibility path="/myValue" />

        <Form.Visibility pathTrue="/isVisible" animate>
          <Field.Selection
            label="Radio"
            variant="radio"
            path="/myValue"
            defaultValue="foo"
          >
            <Field.Option value="foo" title="Foo" />
            <Field.Option value="bar" title="Bar" />
          </Field.Selection>
        </Form.Visibility>

        {/* {count % 2 && (
          <Field.Selection
            label="Radio"
            variant="radio"
            path="/myValue"
            defaultValue="foo"
          >
            <Field.Option value="foo" title="Foo" />
            <Field.Option value="bar" title="Bar" />
          </Field.Selection>
        )} */}

        <Value.Selection inheritLabel inheritVisibility path="/myValue" />

        <Form.SubmitButton />
      </Form.Card>
    </Form.Handler>
  )
}

export const ValueVisibilityInWizard = () => {
  const [count, increment] = React.useReducer((state) => state + 1, 1)
  return (
    <Form.Handler
    // onChange={(data) => console.log('onChange', data)}
    // onSubmit={(data) => console.log('onSubmit', data)}
    >
      <LogVisibleData />
      <Flex.Stack>
        <Wizard.Container mode="loose">
          <Wizard.Step title="Step 0">
            <Wizard.Buttons />
            first
          </Wizard.Step>

          <Wizard.Step title="Step 1">
            <Wizard.Buttons />

            <button type="button" onClick={increment}>
              {count}
            </button>

            <Field.Boolean
              label="Visible"
              variant="button"
              path="/isVisible"
              defaultValue={true}
            />

            <Value.Selection
              inheritLabel
              inheritVisibility
              path="/myValue"
            />

            <Form.Visibility pathTrue="/isVisible" animate>
              {count % 2 ? (
                <Field.Selection
                  label="Radio"
                  variant="radio"
                  path="/myValue"
                  defaultValue="foo"
                >
                  <Field.Option value="foo" title="Foo" />
                  <Field.Option value="bar" title="Bar" />
                </Field.Selection>
              ) : null}
            </Form.Visibility>

            <Value.Selection
              inheritLabel
              inheritVisibility
              path="/myValue"
            />
          </Wizard.Step>

          <Wizard.Step title="Step 2">
            <Wizard.Buttons />

            <Value.Selection
              inheritLabel
              inheritVisibility
              path="/myValue"
            />
          </Wizard.Step>

          <Wizard.Step title="Step 3">
            <Form.ButtonRow>
              <Wizard.Buttons />
              <Form.SubmitButton />
            </Form.ButtonRow>

            <Value.Selection
              inheritLabel
              inheritVisibility
              path="/myValue"
            />
          </Wizard.Step>
        </Wizard.Container>
      </Flex.Stack>
    </Form.Handler>
  )
}
