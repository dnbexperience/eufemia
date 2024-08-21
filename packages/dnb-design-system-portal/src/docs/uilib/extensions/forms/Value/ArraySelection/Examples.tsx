import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { P } from '@dnb/eufemia/src'
import { Form, Value } from '@dnb/eufemia/src/extensions/forms'

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
        This is before the component
        <Value.ArraySelection value={['Foo', 'Bar', 'Baz']} inline />
        This is after the component
      </P>
    </ComponentBox>
  )
}
