import React from 'react'
import { Field } from '../../../Forms'

export default {
  title: 'Eufemia/Extensions/Forms/Composition',
}

export function Composition() {
  return (
    <Field.Composition>
      <Field.String label="A" />
      <Field.String label="B" />
    </Field.Composition>
  )
}
