import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { Field } from '@dnb/eufemia/src/extensions/forms'
import { FormError } from '@dnb/eufemia/src/extensions/forms/types'

export const ValueOn = () => {
  return (
    <ComponentBox scope={{ Field }}>
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
    <ComponentBox scope={{ Field }}>
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

export const NoValue = () => {
  return (
    <ComponentBox scope={{ Field }}>
      <Field.Toggle
        valueOn="checked"
        valueOff="unchecked"
        variant="checkbox"
        label="Label text"
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const Disabled = () => {
  return (
    <ComponentBox scope={{ Field }}>
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
    <ComponentBox scope={{ Field }}>
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
    <ComponentBox scope={{ Field, FormError }}>
      <Field.Toggle
        valueOn="checked"
        valueOff="unchecked"
        variant="checkbox"
        label="Label text"
        onChange={(value) => console.log('onChange', value)}
        warning={new FormError("I'm warning you...")}
      />
    </ComponentBox>
  )
}

export const Error = () => {
  return (
    <ComponentBox scope={{ Field, FormError }}>
      <Field.Toggle
        valueOn="checked"
        valueOff="unchecked"
        variant="checkbox"
        label="Label text"
        onChange={(value) => console.log('onChange', value)}
        error={new FormError('This is what is wrong...')}
      />
    </ComponentBox>
  )
}

// Value types

export const BooleanValueOn = () => {
  return (
    <ComponentBox scope={{ Field }}>
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
    <ComponentBox scope={{ Field }}>
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
    <ComponentBox scope={{ Field }}>
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
    <ComponentBox scope={{ Field }}>
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
    <ComponentBox scope={{ Field }}>
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
    <ComponentBox scope={{ Field }}>
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
    <ComponentBox scope={{ Field }}>
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
