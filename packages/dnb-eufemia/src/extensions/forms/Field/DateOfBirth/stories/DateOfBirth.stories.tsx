import { Field, Form, Tools } from '../../..'
import { Flex } from '../../../../..'

export default {
  title: 'Eufemia/Extensions/Forms/DateOfBirth',
}

export const DateOfBirth = () => {
  return (
    <Form.Handler onSubmit={console.log}>
      <Flex.Stack space>
        <Field.DateOfBirth
          path="/dob"
          transformOut={(_value, additionalArgs: any) => {
            if (additionalArgs) {
              const { year, month, day } = additionalArgs
              return {
                year,
                month,
                day,
              }
            }
          }}
          transformIn={(value: any) => {
            if (value) {
              const { year, month, day } = value
              return `${year}-${month}-${day}`
            }
          }}
        />

        <Form.SubmitButton />
      </Flex.Stack>
      <Tools.Log />
    </Form.Handler>
  )
}
