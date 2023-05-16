import ComponentBox from '../../../../../shared/tags/ComponentBox'
import { DataInput } from '@dnb/eufemia/src/extensions/forms'

export const DataInputString = () => {
  return (
    <ComponentBox scope={{ DataInput }}>
      <DataInput.String
        label="Label text"
        value="foobar"
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const DataInputNumber = () => {
  return (
    <ComponentBox scope={{ DataInput }}>
      <DataInput.Number
        label="Label text"
        value={42}
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const DataInputBoolean = () => {
  return (
    <ComponentBox scope={{ DataInput }}>
      <DataInput.String
        label="Label text"
        value="foo"
        onChange={console.log.bind(console, 'onChange')}
      />
    </ComponentBox>
  )
}
