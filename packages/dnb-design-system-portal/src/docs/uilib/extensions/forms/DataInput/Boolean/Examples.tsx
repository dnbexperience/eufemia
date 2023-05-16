import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { DataInput } from '@dnb/eufemia/src/extensions/forms'

export const Default = () => {
  return (
    <ComponentBox scope={{ DataInput }}>
      <DataInput.Boolean
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const CheckboxTrue = () => {
  return (
    <ComponentBox scope={{ DataInput }}>
      <DataInput.Boolean
        variant="checkbox"
        label="Label text"
        value={true}
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const CheckboxFalse = () => {
  return (
    <ComponentBox scope={{ DataInput }}>
      <DataInput.Boolean
        variant="checkbox"
        label="Label text"
        value={false}
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const CheckboxRequired = () => {
  return (
    <ComponentBox scope={{ DataInput }}>
      <DataInput.Boolean
        variant="checkbox"
        label="Set to be required initially"
        onChange={(value) => console.log('onChange', value)}
        validateInitially
        required
      />
    </ComponentBox>
  )
}

export const CheckboxDisabled = () => {
  return (
    <ComponentBox scope={{ DataInput }}>
      <DataInput.Boolean
        variant="checkbox"
        label="I am disabled"
        onChange={(value) => console.log('onChange', value)}
        disabled
      />
    </ComponentBox>
  )
}

export const CheckboxError = () => {
  return (
    <ComponentBox scope={{ DataInput }}>
      <DataInput.Boolean
        variant="checkbox"
        label="Label text"
        onChange={(value) => console.log('onChange', value)}
        error={new Error('This is what is wrong...')}
      />
    </ComponentBox>
  )
}

export const ToggleButtonTrue = () => {
  return (
    <ComponentBox scope={{ DataInput }}>
      <DataInput.Boolean
        variant="toggle-button"
        label="Label text"
        value={true}
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const ToggleButtonFalse = () => {
  return (
    <ComponentBox scope={{ DataInput }}>
      <DataInput.Boolean
        variant="toggle-button"
        label="Label text"
        value={false}
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const ToggleButtonRequired = () => {
  return (
    <ComponentBox scope={{ DataInput }}>
      <DataInput.Boolean
        variant="toggle-button"
        label="Set to be required initially"
        onChange={(value) => console.log('onChange', value)}
        validateInitially
        required
      />
    </ComponentBox>
  )
}

export const ToggleButtonDisabled = () => {
  return (
    <ComponentBox scope={{ DataInput }}>
      <DataInput.Boolean
        variant="toggle-button"
        label="I am disabled"
        onChange={(value) => console.log('onChange', value)}
        disabled
      />
    </ComponentBox>
  )
}

export const ToggleButtonError = () => {
  return (
    <ComponentBox scope={{ DataInput }}>
      <DataInput.Boolean
        variant="toggle-button"
        label="Label text"
        onChange={(value) => console.log('onChange', value)}
        error={new Error('This is what is wrong...')}
      />
    </ComponentBox>
  )
}

export const ToggleCheckboxTrue = () => {
  return (
    <ComponentBox scope={{ DataInput }}>
      <DataInput.Boolean
        variant="toggle-checkbox"
        label="Label text"
        value={true}
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const ToggleCheckboxFalse = () => {
  return (
    <ComponentBox scope={{ DataInput }}>
      <DataInput.Boolean
        variant="toggle-checkbox"
        label="Label text"
        value={false}
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const ToggleCheckboxRequired = () => {
  return (
    <ComponentBox scope={{ DataInput }}>
      <DataInput.Boolean
        variant="toggle-checkbox"
        label="Set to be required initially"
        onChange={(value) => console.log('onChange', value)}
        validateInitially
        required
      />
    </ComponentBox>
  )
}

export const ToggleCheckboxDisabled = () => {
  return (
    <ComponentBox scope={{ DataInput }}>
      <DataInput.Boolean
        variant="toggle-checkbox"
        label="I am disabled"
        onChange={(value) => console.log('onChange', value)}
        disabled
      />
    </ComponentBox>
  )
}

export const ToggleCheckboxError = () => {
  return (
    <ComponentBox scope={{ DataInput }}>
      <DataInput.Boolean
        variant="toggle-checkbox"
        label="Label text"
        onChange={(value) => console.log('onChange', value)}
        error={new Error('This is what is wrong...')}
      />
    </ComponentBox>
  )
}

export const ButtonsTrue = () => {
  return (
    <ComponentBox scope={{ DataInput }}>
      <DataInput.Boolean
        variant="buttons"
        label="Label text"
        value={true}
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const ButtonsFalse = () => {
  return (
    <ComponentBox scope={{ DataInput }}>
      <DataInput.Boolean
        variant="buttons"
        label="Label text"
        value={false}
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const ButtonsRequired = () => {
  return (
    <ComponentBox scope={{ DataInput }}>
      <DataInput.Boolean
        variant="buttons"
        label="Set to be required initially"
        onChange={(value) => console.log('onChange', value)}
        validateInitially
        required
      />
    </ComponentBox>
  )
}

export const ButtonsDisabled = () => {
  return (
    <ComponentBox scope={{ DataInput }}>
      <DataInput.Boolean
        variant="buttons"
        label="I am disabled"
        onChange={(value) => console.log('onChange', value)}
        disabled
      />
    </ComponentBox>
  )
}

export const ButtonsError = () => {
  return (
    <ComponentBox scope={{ DataInput }}>
      <DataInput.Boolean
        variant="buttons"
        label="Label text"
        onChange={(value) => console.log('onChange', value)}
        error={new Error('This is what is wrong...')}
      />
    </ComponentBox>
  )
}
