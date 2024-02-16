import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { Flex } from '@dnb/eufemia/src'
import { Field, FormError } from '@dnb/eufemia/src/extensions/forms'

export const Empty = () => {
  return (
    <ComponentBox>
      <Field.String
        onFocus={(value) => console.log('onFocus', value)}
        onBlur={(value) => console.log('onBlur', value)}
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const Placeholder = () => {
  return (
    <ComponentBox>
      <Field.String
        placeholder="Enter a text..."
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const Label = () => {
  return (
    <ComponentBox>
      <Field.String
        label="Label text"
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const LabelAndValue = () => {
  return (
    <ComponentBox>
      <Field.String
        label="Label text"
        value="foo"
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const WithHelp = () => {
  return (
    <ComponentBox>
      <Field.String
        label="Label text"
        value="foo"
        help={{
          title: 'Help is available',
          content:
            'Take the time to help other people without expecting a reward or gratitude is definitely important in living an optimistic life.',
        }}
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const Capitalize = () => {
  return (
    <ComponentBox>
      <Field.String
        label="Label text"
        value="foo bar"
        capitalize
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const HorizontalLayout = () => {
  return (
    <ComponentBox>
      <Field.String
        label="Label text"
        value="foo"
        layout="horizontal"
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const Widths = () => {
  return (
    <ComponentBox hideCode data-visual-test="string-widths">
      <Flex.Stack>
        <Field.String
          label="Default width (property omitted)"
          value="foo"
        />
        <Field.String label="Small" value="foo" width="small" />
        <Field.String label="Medium" value="foo" width="medium" />
        <Field.String label="Large" value="foo" width="large" />
        <Field.String label="Stretch" value="foo" width="stretch" />

        <Field.String
          label="Default width (property omitted)"
          value="foo"
          multiline
        />
        <Field.String label="Small" value="foo" width="small" multiline />
        <Field.String
          label="Medium"
          value="foo"
          width="medium"
          multiline
        />
        <Field.String label="Large" value="foo" width="large" multiline />
        <Field.String
          label="Stretch"
          value="foo"
          width="stretch"
          multiline
        />
      </Flex.Stack>
    </ComponentBox>
  )
}

export const Icons = () => {
  return (
    <ComponentBox>
      <Field.String
        label="Icon left"
        value="foo"
        leftIcon="check"
        onChange={(value) => console.log('onChange', value)}
      />
      <Field.String
        label="Icon right"
        value="foo"
        rightIcon="loupe"
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const Clear = () => {
  return (
    <ComponentBox>
      <Field.String
        value="foo"
        onChange={(value) => console.log('onChange', value)}
        clear
      />
    </ComponentBox>
  )
}

export const Disabled = () => {
  return (
    <ComponentBox>
      <Field.String
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
    <ComponentBox>
      <Field.String
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
    <ComponentBox scope={{ FormError }}>
      <Field.String
        value="foo"
        label="Label text"
        onChange={(value) => console.log('onChange', value)}
        warning="I'm warning you..."
      />
    </ComponentBox>
  )
}

export const Error = () => {
  return (
    <ComponentBox scope={{ FormError }}>
      <Field.String
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
    <ComponentBox>
      <Field.String
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
    <ComponentBox>
      <Field.String
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
    <ComponentBox>
      <Field.String
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
    <ComponentBox>
      <Field.String
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
    <ComponentBox scope={{ FormError }}>
      <Field.String
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
    <ComponentBox scope={{ FormError }}>
      <Field.String
        value="foo"
        label="Label text (minimum 4 characters)"
        validator={(value) =>
          new Promise((resolve) =>
            setTimeout(
              () =>
                resolve(
                  value.length < 5
                    ? new FormError('At least 5 characters')
                    : undefined,
                ),
              1500,
            ),
          )
        }
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const SynchronousExternalBlurValidator = () => {
  return (
    <ComponentBox scope={{ FormError }}>
      <Field.String
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
    <ComponentBox scope={{ FormError }}>
      <Field.String
        value="foo"
        label="Label text (minimum 4 characters)"
        onBlurValidator={(value) =>
          new Promise((resolve) =>
            setTimeout(
              () =>
                resolve(
                  value.length < 5
                    ? new FormError('At least 5 characters')
                    : undefined,
                ),
              1500,
            ),
          )
        }
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}

export const MultipleEmpty = () => {
  return (
    <ComponentBox>
      <Field.String
        onChange={(value) => console.log('onChange', value)}
        multiline
      />
    </ComponentBox>
  )
}

export const MultiplePlaceholder = () => {
  return (
    <ComponentBox>
      <Field.String
        placeholder="Enter text here"
        onChange={(value) => console.log('onChange', value)}
        multiline
      />
    </ComponentBox>
  )
}

export const MultipleLabelAndValue = () => {
  return (
    <ComponentBox>
      <Field.String
        value="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis in tempus odio, nec interdum orci. Integer vehicula ipsum et risus finibus, vitae commodo ex luctus. Nam viverra sollicitudin dictum. Vivamus maximus dignissim lorem, vitae viverra erat dapibus a."
        label="Label text"
        onChange={(value) => console.log('onChange', value)}
        multiline
      />
    </ComponentBox>
  )
}

export const MultipleWithHelp = () => {
  return (
    <ComponentBox>
      <Field.String
        label="Label text"
        help={{
          title: 'Help is available',
          content: 'There is more happiness in giving than in receiving.',
        }}
        multiline
        onChange={(value) => console.log('onChange', value)}
      />
    </ComponentBox>
  )
}
