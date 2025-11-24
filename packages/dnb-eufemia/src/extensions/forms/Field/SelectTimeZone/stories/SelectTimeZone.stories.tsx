import React from 'react'
import { Field, Form, Tools, Value } from '../../..'
import { Flex } from '../../../../../components'
import { TimeZoneIdentifier, TimeZoneType } from '../../../constants/timezones'

export default {
  title: 'Eufemia/Extensions/Forms/SelectTimeZone',
}

export function SelectTimeZone() {
  const [state, update] = React.useState<TimeZoneIdentifier>('Europe/Oslo')
  React.useEffect(() => {
    update('Europe/Copenhagen')
  }, [])
  return (
    <Field.SelectTimeZone
      required
      value={state}
      onChange={(value: TimeZoneIdentifier, data) => {
        console.log('onChange', value, data)
        update(value)
      }}
    />
  )
}

const transformOut = (
  internal: string | TimeZoneType,
  timezone: TimeZoneType
) => {
  if (internal) {
    return `${timezone.name} (${internal})`
  }
}
const transformIn = (external: unknown) => {
  return (String(external).match(/\((.*)\)/)?.[1] || 'Europe/Oslo') as TimeZoneIdentifier
}

export function Transform() {
  return (
    <Form.Handler onSubmit={console.log}>
      <Flex.Stack>
        <Field.SelectTimeZone
          path="/timezone"
          transformIn={transformIn}
          transformOut={transformOut}
          defaultValue="Europe/Oslo"
        />

        <Value.SelectTimeZone
          path="/timezone"
          transformIn={transformIn}
          showEmpty
        />

        <Tools.Log />

        <Form.SubmitButton />
      </Flex.Stack>
    </Form.Handler>
  )
}

