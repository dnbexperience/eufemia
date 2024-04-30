import { Card, Flex } from '@dnb/eufemia/src'
import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { Field, Form } from '@dnb/eufemia/src/extensions/forms'

export const MixedIndeterminateDependence = () => {
  return (
    <ComponentBox>
      <Form.Handler onChange={console.log}>
        <Card stack>
          <Field.Indeterminate
            dependencePaths={['/child1', '/child2', '/child3']}
            label="Indeterminate"
          />

          <Field.Toggle
            label="Checkbox 1"
            path="/child1"
            valueOn="what-ever"
            valueOff="you-name-it"
            required
          />

          <Field.Boolean label="Checkbox 2" path="/child2" required />

          <Field.Toggle
            label="Checkbox 3"
            path="/child3"
            valueOn="on"
            valueOff="off"
          />
        </Card>

        <Form.SubmitButton />
      </Form.Handler>
    </ComponentBox>
  )
}

export const NestedIndeterminateDependence = () => {
  return (
    <ComponentBox>
      <Form.Handler onChange={console.log}>
        <Card stack>
          <Field.Indeterminate
            label="1"
            path="/p1"
            dependencePaths={['/c2.1', '/p2.2', '/c3.1', '/c3.2']}
          />

          <Flex.Stack left="large">
            <Field.Boolean label="2.1" path="/c2.1" />
            <Field.Indeterminate
              label="2.2"
              valueOn="what-ever"
              valueOff="you-name-it"
              path="/p2.2"
              dependencePaths={['/c3.1', '/c3.2']}
            />

            <Flex.Stack left="large">
              <Field.Boolean label="3.1" path="/c3.1" />
              <Field.Toggle
                label="3.2"
                path="/c3.2"
                valueOn="what-ever"
                valueOff="you-name-it"
              />
            </Flex.Stack>
          </Flex.Stack>
        </Card>
      </Form.Handler>
    </ComponentBox>
  )
}
