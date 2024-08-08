import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { Flex } from '@dnb/eufemia/src'
import { Field, Form } from '@dnb/eufemia/src/extensions/forms'

export const UsingCommitButton = () => {
  return (
    <ComponentBox>
      <Form.Handler
        onSubmit={(data) => console.log('onSubmit', data)}
        onChange={(data) => console.log('Regular onChange:', data)}
      >
        <Flex.Stack>
          <Form.Isolation
            onChange={(data) => console.log('Isolated onChange:', data)}
          >
            <Flex.Stack>
              <Field.String required label="Isolated" path="/isolated" />

              <Flex.Horizontal>
                <Form.Isolation.CommitButton text="Commit" />
              </Flex.Horizontal>
            </Flex.Stack>
          </Form.Isolation>

          <Field.String
            required
            label="Commited from isolation"
            path="/isolated"
          />
          <Field.String
            required
            label="Outside of isolation"
            path="/regular"
          />

          <Form.SubmitButton />
        </Flex.Stack>
      </Form.Handler>
    </ComponentBox>
  )
}
