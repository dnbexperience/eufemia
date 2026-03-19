import { Field, Form, Tools } from '../../..'
import type { AdditionalArgs } from '../DateOfBirth'

export default {
  title: 'Eufemia/Extensions/Forms/DateOfBirth',
}

const transformOut = (internal: unknown, additionalArgs?: unknown) => {
  const args = additionalArgs as AdditionalArgs
  if (args) {
    const { year, month, day } = args
    return { year, month, day }
  }
}

const transformIn = (external: unknown) => {
  const ext = external as AdditionalArgs
  if (ext) {
    const { year, month, day } = ext
    return `${year}-${month}-${day}`
  }
}

export const DateOfBirth = () => {
  return (
    <Form.Handler
      onSubmit={console.log}
      defaultData={{
        myField: {
          year: '1990',
          month: '05',
          day: '15',
        },
      }}
    >
      <Form.Card space>
        <Field.DateOfBirth
          path="/myField"
          labelDescription="Please enter your date of birth"
          labelDescriptionInline
          transformOut={transformOut}
          transformIn={transformIn}
        />

        <Tools.Log />
      </Form.Card>
    </Form.Handler>
  )
}
