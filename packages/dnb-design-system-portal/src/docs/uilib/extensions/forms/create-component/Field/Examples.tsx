import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { Field } from '@dnb/eufemia/src/extensions/forms'

export const FieldString = () => {
  return (
    <ComponentBox>
      <Field.String
        label="Label text"
        value="foobar"
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const FieldNumber = () => {
  return (
    <ComponentBox>
      <Field.Number
        label="Label text"
        value={42}
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const FieldBoolean = () => {
  return (
    <ComponentBox>
      <Field.String
        label="Label text"
        value="foo"
        onChange={console.log.bind(console, 'onChange')}
      />
    </ComponentBox>
  )
}
