import React from 'react'
import { Field } from '../../..'

export default {
  title: 'Eufemia/Extensions/Forms/NationalIdentityNumber',
}

export function NationalIdentityNumber() {
  return (
    <>
      <Field.NationalIdentityNumber />
      <Field.NationalIdentityNumber value="123" />
      <Field.NationalIdentityNumber value="12345678901" />
    </>
  )
}
