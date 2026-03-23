import { useState } from 'react'
import { Field, Form, Tools } from '../../../'

export default {
  title: 'Eufemia/Extensions/Forms/Expiry',
}

export const Expiry = () => {
  const [value, setValue] = useState<string>('')
  console.log(value)

  function onChange(value: string) {
    setValue(value)
  }

  return <Field.Expiry onChange={onChange} value={value} />
}

const transformOut = (internal: unknown, args: unknown) => {
  const { year, month } = args as { year: string; month: string }
  return { year, month }
}

const transformIn = (external: unknown) => {
  if (external) {
    const { year, month } = external as { year: string; month: string }
    return { year, month }
  }
}

export const ExpiryTransformers = () => {
  return (
    <Form.Handler
      defaultData={{
        myField: {
          year: '35',
          month: '08',
        },
      }}
    >
      <Form.Card space>
        <Field.Expiry
          path="/myField"
          transformOut={transformOut}
          transformIn={transformIn}
        />

        <Tools.Log />
      </Form.Card>
    </Form.Handler>
  )
}
