import React from 'react'
import Field from '../../../Forms'

export default {
  title: 'Eufemia/Extensions/Forms/Toggle',
}

export function Toggle() {
  return (
    <>
      <Field.Toggle
        variant="checkbox"
        valueOn="checked"
        valueOff="unchecked"
        label="Label text"
        required
        validateInitially
        onChange={(value) => console.log('onChange', value)}
      />

      <Field.Toggle
        variant="checkbox-button"
        valueOn="checked"
        valueOff="unchecked"
        label="Label text"
        required
        validateInitially
        onChange={(value) => console.log('onChange', value)}
      />

      <Field.Toggle
        variant="button"
        valueOn="checked"
        valueOff="unchecked"
        label="Label text"
        required
        validateInitially
        onChange={(value) => console.log('onChange', value)}
      />

      <Field.Toggle
        variant="buttons"
        valueOn="checked"
        valueOff="unchecked"
        label="Label text"
        required
        validateInitially
        onChange={(value) => console.log('onChange', value)}
      />
      <>
        No label:
        <Field.Toggle
          variant="buttons"
          valueOn="checked"
          valueOff="unchecked"
          required
          validateInitially
          onChange={(value) => console.log('onChange', value)}
        />
      </>
    </>
  )
}
