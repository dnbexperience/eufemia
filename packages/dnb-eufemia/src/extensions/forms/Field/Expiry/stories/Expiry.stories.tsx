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

const transformOut = (internal) => {
  if (internal?.length === 4) {
    const month = internal.slice(0, 2)
    const year = internal.slice(2, 4)
    return { year, month }
  }
}

const transformIn = (external: any) => {
  console.log('transformIn')
  console.log(external)
  if (external) {
    const { year, month } = external
    return `${month}${year}`
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
