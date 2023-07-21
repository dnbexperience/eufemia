import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { Field } from '@dnb/eufemia/src/extensions/forms'

export const Default = () => {
  return (
    <ComponentBox scope={{ Field }}>
      <Field.Boolean
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const CheckboxTrue = () => {
  return (
    <ComponentBox scope={{ Field }}>
      <Field.Boolean
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
    <ComponentBox scope={{ Field }}>
      <Field.Boolean
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
    <ComponentBox scope={{ Field }}>
      <Field.Boolean
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
    <ComponentBox scope={{ Field }}>
      <Field.Boolean
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
    <ComponentBox scope={{ Field }}>
      <Field.Boolean
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
    <ComponentBox scope={{ Field }}>
      <Field.Boolean
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
    <ComponentBox scope={{ Field }}>
      <Field.Boolean
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
    <ComponentBox scope={{ Field }}>
      <Field.Boolean
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
    <ComponentBox scope={{ Field }}>
      <Field.Boolean
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
    <ComponentBox scope={{ Field }}>
      <Field.Boolean
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
    <ComponentBox scope={{ Field }}>
      <Field.Boolean
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
    <ComponentBox scope={{ Field }}>
      <Field.Boolean
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
    <ComponentBox scope={{ Field }}>
      <Field.Boolean
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
    <ComponentBox scope={{ Field }}>
      <Field.Boolean
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
    <ComponentBox scope={{ Field }}>
      <Field.Boolean
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
    <ComponentBox scope={{ Field }}>
      <Field.Boolean
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
    <ComponentBox scope={{ Field }}>
      <Field.Boolean
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
    <ComponentBox scope={{ Field }}>
      <Field.Boolean
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
    <ComponentBox scope={{ Field }}>
      <Field.Boolean
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
    <ComponentBox scope={{ Field }}>
      <Field.Boolean
        variant="buttons"
        label="Label text"
        onChange={(value) => console.log('onChange', value)}
        error={new Error('This is what is wrong...')}
      />
    </ComponentBox>
  )
}
