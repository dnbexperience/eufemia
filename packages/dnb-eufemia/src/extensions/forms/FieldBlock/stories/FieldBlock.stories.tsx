import React, { useCallback } from 'react'
import FieldBlock from '../FieldBlock'
import Input from '../../../../components/Input'
import { useDataValue } from '../../hooks'
import { Field, Form } from '../..'

export default {
  title: 'Eufemia/Extensions/Forms/FieldBlock',
}

export function FieldBlockLabel() {
  const fromInput = useCallback(({ value }) => value, [])
  const { value, handleChange, handleFocus, handleBlur } = useDataValue({
    value: 'foo',
    fromInput,
  })

  return (
    <FieldBlock label="Label" forId="unique">
      <Input
        id="unique"
        value={value}
        on_change={handleChange}
        on_focus={handleFocus}
        on_blur={handleBlur}
      />
    </FieldBlock>
  )
}

export function Composition() {
  return (
    <FieldBlock info="Info at the bottom" width="large" composition>
      <Field.String label="Field A with a long label" width="stretch" />
      <Field.String label="Field B" width="medium" />
    </FieldBlock>
  )
}

export function CompositionLayout() {
  return (
    <>
      <FieldBlock composition width="large">
        <Field.String label="Field A with a long label" width="medium" />
        <Field.String label="Field B" width="stretch" />
      </FieldBlock>

      {/* <FieldBlock top composition="vertical" width="large">
        <Field.String label="Field A with a long label" width="medium" />
        <Field.String label="Field B" width="stretch" />
      </FieldBlock> */}
    </>
  )
}

export function CompositionErrors() {
  const blockError = 'FieldBlock error'
  const blockWarning = 'FieldBlock warning'
  const blockInfo = 'FieldBlock info'
  const firstError = 'First error'
  const firstWarning = 'First warning'
  const firstInfo = 'First info'
  // const secondError = 'Second error'
  const secondWarning = 'Second warning'
  const secondInfo = 'Second info'

  return (
    <>
      <Field.String
        label="FieldBlock label"
        width="medium"
        // error={new Error(blockError)}
        warning={blockWarning}
        info={blockInfo}
        required
      />

      <Form.Handler>
        <FieldBlock
          id="unique"
          label="FieldBlock label"
          width="large"
          // error={animatedState}
          error={new Error(blockError)}
          warning={blockWarning}
          info={blockInfo}
          composition
        >
          <Field.String
            label="First field"
            // width="stretch"
            error={new Error(firstError)}
            warning={firstWarning}
            info={firstInfo}
            required
            // validateInitially
          />
          <Field.Number
            label="Second field"
            // width="stretch"
            // error={new Error(secondError)}
            warning={secondWarning}
            info={secondInfo}
            required
            // validateInitially
          />
        </FieldBlock>
      </Form.Handler>
    </>
  )
}
