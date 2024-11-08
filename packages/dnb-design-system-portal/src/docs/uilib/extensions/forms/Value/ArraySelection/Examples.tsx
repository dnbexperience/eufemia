import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { Flex, P } from '@dnb/eufemia/src'
import { Field, Form, Value } from '@dnb/eufemia/src/extensions/forms'

export const Placeholder = () => {
  return (
    <ComponentBox>
      <Value.ArraySelection placeholder="No values given" />
    </ComponentBox>
  )
}

export const WithValue = () => {
  return (
    <ComponentBox>
      <Value.ArraySelection value={['Foo', 'Bar', 'Baz']} />
    </ComponentBox>
  )
}

export const WithCustomFormat = () => {
  return (
    <ComponentBox>
      <Form.Handler locale="en-GB" data={{ myPath: [123, 456, 789] }}>
        <Value.ArraySelection
          path="/myPath"
          format={{ type: 'disjunction' }}
        />
      </Form.Handler>
    </ComponentBox>
  )
}

export const FieldArraySelectionAndOption = () => {
  return (
    <ComponentBox>
      <Form.Handler>
        <Flex.Stack>
          <Field.ArraySelection
            label="My selections"
            path="/myPath"
            value={['bar', 'baz']}
          >
            <Field.Option value="foo" title="Foo" />
            <Field.Option value="bar" title="Bar" />
            <Field.Option value="baz" title="Baz" />
          </Field.ArraySelection>

          <Value.ArraySelection inheritLabel path="/myPath" />
        </Flex.Stack>
      </Form.Handler>
    </ComponentBox>
  )
}

export const FieldArraySelectionPath = () => {
  return (
    <ComponentBox>
      <Form.Handler
        data={{
          myPath: [
            { value: 'foo', title: 'Foo' },
            { value: 'bar', title: 'Bar' },
            { value: 'baz', title: 'Baz' },
          ],
        }}
      >
        <Flex.Stack>
          <Field.ArraySelection label="My selections" path="/myPath" />
          <Value.ArraySelection inheritLabel path="/myPath" />
        </Flex.Stack>
      </Form.Handler>
    </ComponentBox>
  )
}

export const Label = () => {
  return (
    <ComponentBox>
      <Value.ArraySelection label="Label text" showEmpty />
    </ComponentBox>
  )
}

export const LabelAndValue = () => {
  return (
    <ComponentBox>
      <Value.ArraySelection
        label="Label text"
        value={['Foo', 'Bar', 'Baz']}
      />
    </ComponentBox>
  )
}

export const Inline = () => {
  return (
    <ComponentBox>
      <P>
        This is before the component{' '}
        <Value.ArraySelection value={['Foo', 'Bar', 'Baz']} inline /> This
        is after the component
      </P>
    </ComponentBox>
  )
}

export const ListVariants = () => {
  return (
    <ComponentBox>
      <Value.ArraySelection
        value={['Foo', 'Bar', 'Baz']}
        label="Ordered List"
        variant="ol"
      />
      <Value.ArraySelection
        value={['Foo', 'Bar', 'Baz']}
        label="Unordered List"
        variant="ul"
      />
    </ComponentBox>
  )
}

export const ListTypes = () => {
  return (
    <ComponentBox>
      <Value.ArraySelection
        value={['Foo', 'Bar', 'Baz']}
        label="Ordered List a"
        variant="ol"
        listType="a"
      />
      <Value.ArraySelection
        value={['Foo', 'Bar', 'Baz']}
        label="Ordered List A"
        variant="ol"
        listType="A"
      />
      <Value.ArraySelection
        value={['Foo', 'Bar', 'Baz']}
        label="Ordered List i"
        variant="ol"
        listType="i"
      />
      <Value.ArraySelection
        value={['Foo', 'Bar', 'Baz']}
        label="Ordered List I"
        variant="ol"
        listType="I"
      />
      <Value.ArraySelection
        value={['Foo', 'Bar', 'Baz']}
        label="Unordered List square"
        variant="ul"
        listType="square"
      />
      <Value.ArraySelection
        value={['Foo', 'Bar', 'Baz']}
        label="Unordered List circle"
        variant="ul"
        listType="circle"
      />
    </ComponentBox>
  )
}
