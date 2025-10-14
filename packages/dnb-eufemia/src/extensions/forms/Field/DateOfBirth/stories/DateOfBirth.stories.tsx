import { Field, Form, Tools } from '../../..'
import { AdditionalArgs } from '../DateOfBirth'

export default {
  title: 'Eufemia/Extensions/Forms/DateOfBirth',
}

const transformOut = (internal, additionalArgs: AdditionalArgs) => {
  if (additionalArgs) {
    const { year, month, day } = additionalArgs
    return { year, month, day }
  }
}

const transformIn = (external: AdditionalArgs) => {
  if (external) {
    const { year, month, day } = external
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
          transformOut={transformOut}
          transformIn={transformIn}
        />

        <Tools.Log />
      </Form.Card>
    </Form.Handler>
  )
}
