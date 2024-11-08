import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { Field } from '@dnb/eufemia/src/extensions/forms'

export const ValueOn = () => {
  return (
    <ComponentBox>
      <Field.Toggle
        valueOn="checked"
        valueOff="unchecked"
        variant="checkbox"
        label="Label text"
        value="checked"
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const ValueOff = () => {
  return (
    <ComponentBox>
      <Field.Toggle
        valueOn="checked"
        valueOff="unchecked"
        variant="checkbox"
        label="Label text"
        value="unchecked"
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const TextOn = () => {
  return (
    <ComponentBox>
      <Field.Toggle
        valueOn="checked"
        valueOff="unchecked"
        textOn="Text on"
        textOff="Text off"
        variant="checkbox"
        value="checked"
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const TextOff = () => {
  return (
    <ComponentBox>
      <Field.Toggle
        valueOn="checked"
        valueOff="unchecked"
        textOn="Text on"
        textOff="Text off"
        variant="checkbox"
        value="unchecked"
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const Disabled = () => {
  return (
    <ComponentBox>
      <Field.Toggle
        valueOn="checked"
        valueOff="unchecked"
        variant="checkbox"
        label="Label text"
        onChange={(value) => console.log('onChange', value)}
        disabled
      />
    </ComponentBox>
  )
}

export const Info = () => {
  return (
    <ComponentBox>
      <Field.Toggle
        valueOn="checked"
        valueOff="unchecked"
        variant="checkbox"
        label="Label text"
        onChange={(value) => console.log('onChange', value)}
        info="Useful information (?)"
      />
    </ComponentBox>
  )
}

export const Warning = () => {
  return (
    <ComponentBox>
      <Field.Toggle
        valueOn="checked"
        valueOff="unchecked"
        variant="checkbox"
        label="Label text"
        onChange={(value) => console.log('onChange', value)}
        warning="I'm warning you..."
      />
    </ComponentBox>
  )
}

export const WithError = () => {
  return (
    <ComponentBox>
      <Field.Toggle
        valueOn="checked"
        valueOff="unchecked"
        variant="checkbox"
        label="Label text"
        onChange={(value) => console.log('onChange', value)}
        error={new Error('This is what is wrong...')}
      />
    </ComponentBox>
  )
}

// Value types

export const BooleanValueOn = () => {
  return (
    <ComponentBox>
      <Field.Toggle
        valueOn={true}
        valueOff={false}
        variant="checkbox"
        label="Boolean value"
        value={true}
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const BooleanValueOff = () => {
  return (
    <ComponentBox>
      <Field.Toggle
        valueOn={true}
        valueOff={false}
        variant="checkbox"
        label="Boolean value"
        value={false}
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const NumberValueOn = () => {
  return (
    <ComponentBox>
      <Field.Toggle
        valueOn={100}
        valueOff={0}
        variant="checkbox"
        label="Number value"
        value={100}
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const NumberValueOff = () => {
  return (
    <ComponentBox>
      <Field.Toggle
        valueOn={100}
        valueOff={0}
        variant="checkbox"
        label="Number value"
        value={0}
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

// Variants

export const VariantButton = () => {
  return (
    <ComponentBox>
      <Field.Toggle
        valueOn="on"
        valueOff="off"
        variant="button"
        label="Toggle button variant"
        value="on"
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const VariantCheckboxButton = () => {
  return (
    <ComponentBox>
      <Field.Toggle
        valueOn="on"
        valueOff="off"
        variant="checkbox-button"
        label="Toggle checkbox variant"
        value="on"
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const VariantButtons = () => {
  return (
    <ComponentBox>
      <Field.Toggle
        valueOn="on"
        valueOff="off"
        variant="buttons"
        label="Buttons variant"
        value="on"
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const VariantButtonsWithHelp = () => {
  return (
    <ComponentBox data-visual-test="toggle-variant-buttons-with-help">
      <Field.Toggle
        valueOn="on"
        valueOff="off"
        variant="buttons"
        label="Buttons variant"
        help={{ title: 'Help title', content: 'Help content' }}
        value="on"
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const VariantButtonsWithoutLabel = () => {
  return (
    <ComponentBox data-visual-test="toggle-variant-buttons-without-label">
      Text above the toggle:
      <Field.Toggle
        valueOn="on"
        valueOff="off"
        variant="buttons"
        value="on"
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}
