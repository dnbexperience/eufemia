import { useState } from 'react'
import { Field, Form, Tools } from '../../../'

export default {
  title: 'Eufemia/Extensions/Forms/Time',
}

export const Time = () => {
  const [value, setValue] = useState<string>('')
  console.log(value)

  function onChange(value: string) {
    setValue(value)
  }

  return <Field.Time onChange={onChange} value={value} />
}

const transformOut = (internal, args) => {
  const { hours, minutes } = args
  return { hours, minutes }
}

const transformIn = (external) => {
  if (external) {
    const { hours, minutes } = external
    return { hours, minutes }
  }
  return undefined
}

export const TimeTransformers = () => {
  return (
    <Form.Handler
      defaultData={{
        myField: {
          hours: '14',
          minutes: '30',
        },
      }}
    >
      <Form.Card space>
        <Field.Time
          path="/myField"
          transformOut={transformOut}
          transformIn={transformIn}
        />

        <Tools.Log />
      </Form.Card>
    </Form.Handler>
  )
}
