import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { Field } from '@dnb/eufemia/src/extensions/forms'

export const Default = () => {
  return (
    <ComponentBox>
      <Field.Boolean
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const CheckboxTrue = () => {
  return (
    <ComponentBox>
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
    <ComponentBox>
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
    <ComponentBox>
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
    <ComponentBox>
      <Field.Boolean
        variant="checkbox"
        label="I am disabled"
        onChange={(value) => console.log('onChange', value)}
        disabled
      />
    </ComponentBox>
  )
}

export const CheckboxPreventDefault = () => {
  return (
    <ComponentBox>
      <Field.Boolean
        variant="checkbox"
        label="I will never change the state"
        onClick={(value, { event }) => {
          event.preventDefault()
        }}
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const CheckboxError = () => {
  return (
    <ComponentBox>
      <Field.Boolean
        variant="checkbox"
        label="Label text"
        onChange={(value) => console.log('onChange', value)}
        error={new Error('This is what is wrong...')}
      />
    </ComponentBox>
  )
}

export const VariantCheckboxWithHelp = () => {
  return (
    <ComponentBox>
      <Field.Boolean
        variant="checkbox"
        label="Checkbox variant"
        help={{ title: 'Help title', content: 'Help content' }}
      />
    </ComponentBox>
  )
}

export const ButtonTrue = () => {
  return (
    <ComponentBox>
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
    <ComponentBox>
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
    <ComponentBox>
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
    <ComponentBox>
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
    <ComponentBox>
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
    <ComponentBox>
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
    <ComponentBox>
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
    <ComponentBox>
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
    <ComponentBox>
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
    <ComponentBox>
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
    <ComponentBox>
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
    <ComponentBox>
      <Field.Boolean
        variant="buttons"
        label="Label text"
        value={false}
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const ButtonsUndefined = () => {
  return (
    <ComponentBox>
      <Field.Boolean
        variant="buttons"
        label="Label text"
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const ButtonsRequired = () => {
  return (
    <ComponentBox>
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
    <ComponentBox>
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
    <ComponentBox>
      <Field.Boolean
        variant="buttons"
        label="Label text"
        onChange={(value) => console.log('onChange', value)}
        error={new Error('This is what is wrong...')}
      />
    </ComponentBox>
  )
}

export const VariantButtonsWithHelp = () => {
  return (
    <ComponentBox>
      <Field.Boolean
        variant="buttons"
        label="Buttons variant"
        help={{ title: 'Help title', content: 'Help content' }}
      />
    </ComponentBox>
  )
}

export const RadioTrue = () => {
  return (
    <ComponentBox>
      <Field.Boolean
        variant="radio"
        label="Label text"
        value={true}
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const RadioFalse = () => {
  return (
    <ComponentBox>
      <Field.Boolean
        variant="radio"
        label="Label text"
        value={false}
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const RadioUndefined = () => {
  return (
    <ComponentBox>
      <Field.Boolean
        variant="radio"
        label="Label text"
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const RadioRequired = () => {
  return (
    <ComponentBox>
      <Field.Boolean
        variant="radio"
        label="Set to be required initially"
        onChange={(value) => console.log('onChange', value)}
        validateInitially
        required
      />
    </ComponentBox>
  )
}

export const RadioDisabled = () => {
  return (
    <ComponentBox>
      <Field.Boolean
        variant="radio"
        label="I am disabled"
        onChange={(value) => console.log('onChange', value)}
        disabled
      />
    </ComponentBox>
  )
}

export const RadioError = () => {
  return (
    <ComponentBox>
      <Field.Boolean
        variant="radio"
        label="Label text"
        onChange={(value) => console.log('onChange', value)}
        error={new Error('This is what is wrong...')}
      />
    </ComponentBox>
  )
}

export const VariantRadioWithHelp = () => {
  return (
    <ComponentBox>
      <Field.Boolean
        variant="radio"
        label="Radio variant"
        help={{ title: 'Help title', content: 'Help content' }}
      />
    </ComponentBox>
  )
}

export const VariantSwitchWithHelp = () => {
  return (
    <ComponentBox>
      <Field.Boolean
        variant="switch"
        label="Switch variant"
        help={{ title: 'Help title', content: 'Help content' }}
      />
    </ComponentBox>
  )
}
