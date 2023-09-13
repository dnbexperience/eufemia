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

export const ButtonTrue = () => {
  return (
    <ComponentBox scope={{ Field }}>
      <Field.Boolean
        variant="button"
        label="Label text"
        value={true}
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const ButtonFalse = () => {
  return (
    <ComponentBox scope={{ Field }}>
      <Field.Boolean
        variant="button"
        label="Label text"
        value={false}
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const ButtonRequired = () => {
  return (
    <ComponentBox scope={{ Field }}>
      <Field.Boolean
        variant="button"
        label="Set to be required initially"
        onChange={(value) => console.log('onChange', value)}
        validateInitially
        required
      />
    </ComponentBox>
  )
}

export const ButtonDisabled = () => {
  return (
    <ComponentBox scope={{ Field }}>
      <Field.Boolean
        variant="button"
        label="I am disabled"
        onChange={(value) => console.log('onChange', value)}
        disabled
      />
    </ComponentBox>
  )
}

export const ButtonError = () => {
  return (
    <ComponentBox scope={{ Field }}>
      <Field.Boolean
        variant="button"
        label="Label text"
        onChange={(value) => console.log('onChange', value)}
        error={new Error('This is what is wrong...')}
      />
    </ComponentBox>
  )
}

export const CheckboxButtonTrue = () => {
  return (
    <ComponentBox scope={{ Field }}>
      <Field.Boolean
        variant="checkbox-button"
        label="Label text"
        value={true}
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const CheckboxButtonFalse = () => {
  return (
    <ComponentBox scope={{ Field }}>
      <Field.Boolean
        variant="checkbox-button"
        label="Label text"
        value={false}
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const CheckboxButtonRequired = () => {
  return (
    <ComponentBox scope={{ Field }}>
      <Field.Boolean
        variant="checkbox-button"
        label="Set to be required initially"
        onChange={(value) => console.log('onChange', value)}
        validateInitially
        required
      />
    </ComponentBox>
  )
}

export const CheckboxButtonDisabled = () => {
  return (
    <ComponentBox scope={{ Field }}>
      <Field.Boolean
        variant="checkbox-button"
        label="I am disabled"
        onChange={(value) => console.log('onChange', value)}
        disabled
      />
    </ComponentBox>
  )
}

export const CheckboxButtonError = () => {
  return (
    <ComponentBox scope={{ Field }}>
      <Field.Boolean
        variant="checkbox-button"
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
