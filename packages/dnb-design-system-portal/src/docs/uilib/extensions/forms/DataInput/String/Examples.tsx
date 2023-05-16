import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { DataInput } from '@dnb/eufemia/src/extensions/forms'
import { FormError } from '@dnb/eufemia/src/extensions/forms/types'

export const Empty = () => {
  return (
    <ComponentBox scope={{ DataInput }}>
      <DataInput.String
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const Placeholder = () => {
  return (
    <ComponentBox scope={{ DataInput }}>
      <DataInput.String
        placeholder="Enter a text..."
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const Label = () => {
  return (
    <ComponentBox scope={{ DataInput }}>
      <DataInput.String
        label="Label text"
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const LabelAndValue = () => {
  return (
    <ComponentBox scope={{ DataInput }}>
      <DataInput.String
        label="Label text"
        value="foo"
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const IconLeft = () => {
  return (
    <ComponentBox scope={{ DataInput }}>
      <DataInput.String
        value="foo"
        leftIcon="check"
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const IconRight = () => {
  return (
    <ComponentBox scope={{ DataInput }}>
      <DataInput.String
        value="foo"
        rightIcon="loupe"
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const CharacterCounter1 = () => {
  return (
    <ComponentBox scope={{ DataInput }}>
      <DataInput.String
        onChange={(value) => console.log('onChange', value)}
        characterCounter
      />
    </ComponentBox>
  )
}

export const CharacterCounter2 = () => {
  return (
    <ComponentBox scope={{ DataInput }}>
      <DataInput.String
        label="Label text"
        value="foo"
        onChange={(value) => console.log('onChange', value)}
        characterCounter
      />
    </ComponentBox>
  )
}

export const CharacterCounter3 = () => {
  return (
    <ComponentBox scope={{ DataInput }}>
      <DataInput.String
        label="Label text"
        value="foo"
        onChange={(value) => console.log('onChange', value)}
        maxLength={16}
        characterCounter
      />
    </ComponentBox>
  )
}

export const Clear = () => {
  return (
    <ComponentBox scope={{ DataInput }}>
      <DataInput.String
        value="foo"
        onChange={(value) => console.log('onChange', value)}
        clear
      />
    </ComponentBox>
  )
}

export const Disabled = () => {
  return (
    <ComponentBox scope={{ DataInput }}>
      <DataInput.String
        value="foo"
        label="Label text"
        onChange={(value) => console.log('onChange', value)}
        disabled
      />
    </ComponentBox>
  )
}

export const Info = () => {
  return (
    <ComponentBox scope={{ DataInput }}>
      <DataInput.String
        value="foo"
        label="Label text"
        onChange={(value) => console.log('onChange', value)}
        info="Useful information (?)"
      />
    </ComponentBox>
  )
}

export const Warning = () => {
  return (
    <ComponentBox scope={{ DataInput, FormError }}>
      <DataInput.String
        value="foo"
        label="Label text"
        onChange={(value) => console.log('onChange', value)}
        warning={new FormError("I'm warning you...")}
      />
    </ComponentBox>
  )
}

export const Error = () => {
  return (
    <ComponentBox scope={{ DataInput, FormError }}>
      <DataInput.String
        value="foo"
        label="Label text"
        onChange={(value) => console.log('onChange', value)}
        error={new FormError('This is what is wrong...')}
      />
    </ComponentBox>
  )
}

export const ValidateRequired = () => {
  return (
    <ComponentBox scope={{ DataInput }}>
      <DataInput.String
        value="foo"
        label="Label text"
        onChange={(value) => console.log('onChange', value)}
        required
      />
    </ComponentBox>
  )
}

export const ValidateMinimumLength = () => {
  return (
    <ComponentBox scope={{ DataInput }}>
      <DataInput.String
        value="foo"
        label="Label text (minimum 8 characters)"
        onChange={(value) => console.log('onChange', value)}
        minLength={8}
      />
    </ComponentBox>
  )
}

export const ValidateMaximumLengthCustomError = () => {
  return (
    <ComponentBox scope={{ DataInput }}>
      <DataInput.String
        value="foo"
        label="Label text (maximum 8 characters)"
        onChange={(value) => console.log('onChange', value)}
        maxLength={8}
        errorMessages={{
          maxLength: "You can't write THAT long.. Max 8 chars!",
        }}
      />
    </ComponentBox>
  )
}

export const ValidatePattern = () => {
  return (
    <ComponentBox scope={{ DataInput }}>
      <DataInput.String
        value="foo"
        label="Label text"
        onChange={(value) => console.log('onChange', value)}
        pattern="^foo123"
      />
    </ComponentBox>
  )
}

export const SynchronousExternalValidator = () => {
  return (
    <ComponentBox scope={{ DataInput, FormError }}>
      <DataInput.String
        value="foo"
        label="Label text (minimum 4 characters)"
        validator={(value) =>
          value.length < 4
            ? new FormError('At least 4 characters')
            : undefined
        }
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const AsynchronousExternalValidator = () => {
  return (
    <ComponentBox scope={{ DataInput, FormError }}>
      <DataInput.String
        value="foo"
        label="Label text (minimum 4 characters)"
        validator={(value) =>
          new Promise((resolve) =>
            setTimeout(
              () =>
                resolve(
                  value.length < 5
                    ? new FormError('At least 5 characters')
                    : undefined
                ),
              1500
            )
          )
        }
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const SynchronousExternalBlurValidator = () => {
  return (
    <ComponentBox scope={{ DataInput, FormError }}>
      <DataInput.String
        value="foo"
        label="Label text (minimum 4 characters)"
        onBlurValidator={(value) =>
          value.length < 4
            ? new FormError('At least 4 characters')
            : undefined
        }
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const AsynchronousExternalBlurValidator = () => {
  return (
    <ComponentBox scope={{ DataInput, FormError }}>
      <DataInput.String
        value="foo"
        label="Label text (minimum 4 characters)"
        onBlurValidator={(value) =>
          new Promise((resolve) =>
            setTimeout(
              () =>
                resolve(
                  value.length < 5
                    ? new FormError('At least 5 characters')
                    : undefined
                ),
              1500
            )
          )
        }
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const MultipleEmpty = () => {
  return (
    <ComponentBox scope={{ DataInput }}>
      <DataInput.String
        onChange={(value) => console.log('onChange', value)}
        multiline
      />
    </ComponentBox>
  )
}

export const MultiplePlaceholder = () => {
  return (
    <ComponentBox scope={{ DataInput }}>
      <DataInput.String
        placeholder="Enter text here"
        onChange={(value) => console.log('onChange', value)}
        multiline
      />
    </ComponentBox>
  )
}

export const MultipleLabelAndValue = () => {
  return (
    <ComponentBox scope={{ DataInput }}>
      <DataInput.String
        value="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis in tempus odio, nec interdum orci. Integer vehicula ipsum et risus finibus, vitae commodo ex luctus. Nam viverra sollicitudin dictum. Vivamus maximus dignissim lorem, vitae viverra erat dapibus a."
        label="Label text"
        onChange={(value) => console.log('onChange', value)}
        multiline
      />
    </ComponentBox>
  )
}
