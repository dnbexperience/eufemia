import React, { useCallback } from 'react'
import FieldBlock from '../FieldBlock'
import Input from '../../../../components/Input'
import { useDataValue } from '../../hooks'

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
