import React from 'react'
import { Composite, Field, Form } from '../../..'
import { Flex } from '../../../../../components'
import { BlockProps } from '../../../Composite/Block'

const translations = {
  'nb-NO': { MyBlock: { MyField: { label: 'Felt label' } } },
  'en-GB': { MyBlock: { MyField: { label: 'Field label' } } },
}
type Translation = (typeof translations)[keyof typeof translations]

export default function FirstBlock(props: BlockProps) {
  return (
    <Composite.Block translations={translations} required {...props}>
      <Content />
    </Composite.Block>
  )
}

function Content() {
  const tr = Form.useTranslation<Translation>()
  return (
    <Flex.Stack>
      <Field.Name.First path="/firstName" />
      <Field.Name.Last path="/lastName" />
      <Field.String label={tr.MyBlock.MyField.label} path="/myField" />
    </Flex.Stack>
  )
}
