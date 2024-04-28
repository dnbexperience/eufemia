import React from 'react'
import { Field, Form, JSONSchema, Value } from '../../..'
import { Flex } from '../../../../../components'
import Provider from '../Provider'

export default {
  title: 'Eufemia/Extensions/Forms/Provider',
}

const existingData = {
  count: 1,
  foo: 'bar',
}

const Component = () => {
  const { data, update } = Form.useData('update-id', existingData)

  const increment = React.useCallback(() => {
    update('/count', (count) => {
      return count + 1
    })
  }, [update])

  return (
    <Form.Handler id="update-id">
      <Flex.Horizontal>
        <Field.Number path="/count" showStepControls />
        <Form.SubmitButton
          onClick={increment}
          text={'Increment ' + data.count}
        />
      </Flex.Horizontal>
    </Form.Handler>
  )
}

export function Hook() {
  return (
    <Flex.Vertical>
      <Component />
      <Component />
    </Flex.Vertical>
  )
}

const initialSchema: JSONSchema = {
  type: 'object',
  properties: {
    txt: {
      type: 'string',
      pattern: '^(one|two|three)$',
    },
  },
}
const initialData = {}

export function Validation() {
  return (
    <Provider schema={initialSchema} data={initialData}>
      <Flex.Vertical>
        <Field.String path="/txt" validateInitially />

        <Field.String
          label="Field 1"
          path="/foo"
          errorMessages={{
            required: 'Required string',
          }}
          required
        />
        <Field.String
          label="Field 2"
          value="abc"
          minLength={5}
          errorMessages={{
            minLength: 'Min 5 chars',
          }}
        />
        <Field.Number
          label="Field 3"
          errorMessages={{
            required: 'Required number',
          }}
          required
        />

        <Form.SubmitButton>Submit</Form.SubmitButton>
      </Flex.Vertical>
    </Provider>
  )
}

const id = 'form-with-disabled'

const filterDataHandler = (path, value, props) => {
  if (props.disabled === true) {
    return false
  }
}

export const FilterData = () => {
  const { hasErrors } = Form.useError(id)
  const { data, filterData } = Form.useData(id, {
    disabled: true,
    validate: false,
    myField: 'Value',
  })

  return (
    <Form.Handler
      id={id}
      onSubmit={(data) => console.log('onSubmit', data)}
      filterData={filterDataHandler}
    >
      <Flex.Stack spacing="medium">
        <Field.Boolean label="Disabled" path="/disabled" />
        <Field.Boolean label="Validate" path="/validate" />
        <Field.String
          label="My Field"
          path="/myField"
          required={data.validate}
          disabled={data.disabled}
          clear
        />
        <Form.ButtonRow>
          <Form.SubmitButton />
        </Form.ButtonRow>

        <output>
          hasErrors: {JSON.stringify(hasErrors(), null, 2)}
          <pre>
            {JSON.stringify(
              replaceUndefinedValues(filterData(filterDataHandler)),
              null,
              2
            )}
          </pre>
        </output>
      </Flex.Stack>
    </Form.Handler>
  )
}

/**
 * Replaces undefined values in an object with a specified replacement value.
 * @param value - The value to check for undefined values.
 * @param replaceWith - The value to replace undefined values with. Default is null.
 * @returns The object with undefined values replaced.
 */
function replaceUndefinedValues(
  value: unknown,
  replaceWith = null
): unknown {
  if (typeof value === 'undefined') {
    return replaceWith
  } else if (typeof value === 'object' && value !== replaceWith) {
    return {
      ...value,
      ...Object.fromEntries(
        Object.entries(value).map(([k, v]) => [
          k,
          replaceUndefinedValues(v),
        ])
      ),
    }
  } else {
    return value
  }
}

function Rerenders() {
  console.log('Rerenders', Date.now())
  return null
}

export function PartialUpdate() {
  return (
    <Form.Handler
      data={{
        same: '',
        other: 123,
      }}
      onSubmit={(data) => console.log('onSubmit', data)}
      // onChange={async (data) => {
      //   await new Promise((resolve) => setTimeout(resolve, 3000))
      //   console.log('onChange', data)
      // }}
    >
      <Field.String
        label="Main"
        path="/same"
        // value="x"
        required
        // validateInitially
      />
      <Field.String label="In sync" path="/same" />
      <Value.String label="In sync" path="/same" />
      <Field.Number label="other" path="/other" />
      <Rerenders />

      <Form.SubmitButton>Submit</Form.SubmitButton>
    </Form.Handler>
  )
}
