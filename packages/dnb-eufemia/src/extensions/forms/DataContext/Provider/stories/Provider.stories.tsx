import React from 'react'
import { Field, Form, JSONSchema } from '../../..'
import { Flex } from '../../../../../components'
import Provider from '../Provider'
import type { FilterData } from '../../Context'

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

const filterDataHandler: FilterData = ({ props }) => {
  if (props.disabled === true) {
    return false
  }
}

export const FilterDataStory = () => {
  const { hasErrors } = Form.useValidation(id)
  const { data, filterData } = Form.useData(id, {
    disabled: true,
    validate: false,
    myField: 'Value',
  })

  return (
    <Form.Handler
      id={id}
      onSubmit={(data, { filterData }) => {
        console.log('onSubmit', filterData(filterDataHandler))
      }}
    >
      <Flex.Stack>
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
