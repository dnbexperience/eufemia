import React from 'react'
import { Field, Form } from '../../..'
import { Flex } from '../../../../../components'
import { SectionProps } from '../../../Form/Section'

const translations = {
  'nb-NO': { MyBlock: { MyField: { label: 'Felt label' } } },
  'en-GB': { MyBlock: { MyField: { label: 'Field label' } } },
}
type Translation = (typeof translations)[keyof typeof translations]

export default function FirstBlock(props: SectionProps) {
  return (
    <Form.Section translations={translations} required {...props}>
      <Content />
    </Form.Section>
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
