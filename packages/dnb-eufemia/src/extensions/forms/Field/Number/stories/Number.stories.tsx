import { useCallback } from 'react'
import { Field, Form, FormError, UseFieldProps } from '../../..'
import { Anchor, Flex } from '../../../../../components'

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
  const validator: UseFieldProps<number>['onChangeValidator'] =
    useCallback((num, { connectWithPath }) => {
      const { getValue } = connectWithPath('/refValue')
      const amount = getValue()
      // console.log('amount', amount, amount >= num)
      if (amount >= num) {
        return new Error(`The amount should be greater than ${amount}`)
      }
      if (num === undefined) {
        return new Error(`No amount was given`)
      }
    }, [])

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
          onChangeValidator={validator}
          defaultValue={2}
          // validateInitially
          // validateContinuously
          // validateUnchanged
          path="/myNumberWithOnChangeValidator"
        />

        <Form.SubmitButton />
      </Flex.Stack>
    </Form.Handler>
  )
}

export const ConditionalInfo = () => {
  const conditionalInfo: UseFieldProps<number>['info'] = (
    maximum: number,
    { renderMode, getValueByPath, getFieldByPath }
  ) => {
    renderMode('interactive') // Can also be 'initially' or 'continuously'

    const amount = getValueByPath('/amount')
    const { props } = getFieldByPath('/amount')

    if (maximum < amount && props) {
      const anchor = (
        <Anchor
          href={`#${props?.id}-label`}
          onClick={(event: React.MouseEvent<HTMLAnchorElement>) => {
            event.preventDefault()
            const el = document.getElementById(`${props.id}-label`)
            el?.scrollIntoView()
          }}
        >
          {props?.label}
        </Anchor>
      )

      return (
        <>
          Remember to adjust the {anchor} to be {maximum} or lower.{' '}
        </>
      )
    }
  }
  const onBlurValidator: UseFieldProps<number>['onBlurValidator'] = (
    amount: number,
    { connectWithPath }
  ) => {
    const { getValue: getMaximum } = connectWithPath('/maximum')

    if (amount > getMaximum()) {
      return new FormError('NumberField.errorMaximum', {
        messageValues: {
          maximum: String(getMaximum()),
        },
      })
    }
  }
  return (
    <Form.Handler
      defaultData={{
        maximum: 4,
        amount: 5,
      }}
    >
      <Form.Card>
        <Field.Number
          label="Maximum for amount"
          labelDescription={
            '\nDefines the maximum amount possible to be entered.'
          }
          path="/maximum"
          // defaultValue={4}
          info={conditionalInfo}
          // warning={conditionalInfo}
          // validateInitially
          // validateUnchanged
          // continuousValidation
        />
        <Field.Number
          label="Amount"
          labelDescription={'\nShould be same or lower than maximum.'}
          path="/amount"
          // defaultValue={5}
          onBlurValidator={onBlurValidator}
          // validateInitially
        />
      </Form.Card>

      <Form.SubmitButton />
    </Form.Handler>
  )
}
