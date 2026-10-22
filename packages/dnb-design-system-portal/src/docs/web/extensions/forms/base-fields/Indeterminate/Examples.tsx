import { Flex } from '@dnb/eufemia/src'
import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { Field, Form } from '@dnb/eufemia/src/extensions/forms'

export const MixedIndeterminateDependence = () => {
  return (
    <ComponentBox>
      <Form.Handler onChange={console.log}>
        <Form.Card>
          <Field.Indeterminate
            label="Indeterminate"
            dependencePaths={['/child1', '/child2', '/child3']}
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
        </Form.Card>

        <Form.SubmitButton />
      </Form.Handler>
    </ComponentBox>
  )
}

export const PropagateIndeterminateDependence = () => {
  return (
    <ComponentBox>
      {() => {
        const MyFormContent = () => {
          const { data } = Form.useData()
          return (
            <>
              <Form.Card>
                <Field.Selection label="Propagate to" path="/propagate">
                  <Field.Option value="checked">Checked</Field.Option>
                  <Field.Option value="unchecked">Unchecked</Field.Option>
                  <Field.Option value="auto">Auto</Field.Option>
                </Field.Selection>

                <Field.Indeterminate
                  label="Indeterminate"
                  dependencePaths={['/child1', '/child2', '/child3']}
                  propagateIndeterminateState={data['propagate']}
                />

                <Field.Toggle
                  label="Checkbox 1"
                  path="/child1"
                  valueOn="what-ever"
                  valueOff="you-name-it"
                />

                <Field.Boolean label="Checkbox 2" path="/child2" />

                <Field.Toggle
                  label="Checkbox 3"
                  path="/child3"
                  valueOn="on"
                  valueOff="off"
                />
              </Form.Card>
            </>
          )
        }

        const MyForm = () => {
          return (
            <Form.Handler
              id="propagate-demo"
              defaultData={{
                propagate: 'checked',
                child1: 'you-name-it',
                child2: true,
                child3: 'on',
              }}
              onChange={console.log}
            >
              <MyFormContent />
            </Form.Handler>
          )
        }

        return <MyForm />
      }}
    </ComponentBox>
  )
}

export const NestedIndeterminateDependence = () => {
  return (
    <ComponentBox>
      <Form.Handler onChange={console.log}>
        <Form.Card>
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
        </Form.Card>
      </Form.Handler>
    </ComponentBox>
  )
}
