import { useCallback } from 'react'
import { Field, Form, UseFieldProps } from '../../..'
import { Flex } from '../../../../../components'

export default {
  title: 'Eufemia/Extensions/Forms/Number',
}

export const Number = () => {
  return (
    <Flex.Stack>
      <Field.Number label="Label" bottom width="stretch" value={5} />
      <Field.Number
        label="Label"
        showStepControls
        value={5}
        maximum={20}
        minimum={10}
        step={5}
      />
      <Field.Number
        label="Label"
        showStepControls
        value={5}
        maximum={20}
        minimum={10}
        step={5}
        required
        validateInitially
      />
      <Field.Number
        label="Label"
        showStepControls
        value={5}
        maximum={20}
        minimum={10}
        step={5}
        required
        // validateInitially
        disabled
      />
      <Field.Number showStepControls width="stretch" value={1} />
    </Flex.Stack>
  )
}

export const WithFreshValidator = () => {
  const validator: UseFieldProps<number>['validator'] = useCallback(
    (num, { connectWithPath }) => {
      const { getValue } = connectWithPath('/refValue')
      const amount = getValue()
      // console.log('amount', amount, amount >= num)
      if (amount >= num) {
        return new Error(`The amount should be greater than ${amount}`)
      }
      if (num === undefined) {
        return new Error(`No amount was given`)
      }
    },
    []
  )

  return (
    <Form.Handler
      defaultData={{ refValue: 2 }}
      onSubmit={() => {
        console.log('onSubmit 🍏')
      }}
    >
      <Flex.Stack>
        <Field.Number label="Ref" path="/refValue" />

        <Field.Number
          label="Num"
          // onBlurValidator={validator}
          validator={validator}
          defaultValue={2}
          // validateInitially
          // continuousValidation
          // validateUnchanged
          path="/myNumberWithValidator"
        />

        <Form.SubmitButton />
      </Flex.Stack>
    </Form.Handler>
  )
}
