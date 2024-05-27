import React from 'react'
import { Composite, Field, Form } from '../..'
import { Flex } from '../../../../components'

const translations = {
  'nb-NO': { MyBlock: { MyField: { label: 'Felt label' } } },
  'en-GB': { MyBlock: { MyField: { label: 'Field label' } } },
}
type Translation = (typeof translations)[keyof typeof translations]

export default function FirstBlock() {
  return (
    <Composite.Block translations={translations}>
      <Content />
    </Composite.Block>
  )
}

function Content() {
  const tr = Form.useTranslation<Translation>()
  return (
    <Flex.Stack>
      <Field.Name.First path="/firstName" required />
      <Field.Name.Last path="/lastName" required />
      <Field.String label={tr.MyBlock.MyField.label} path="/custom" />
    </Flex.Stack>
  )
}
