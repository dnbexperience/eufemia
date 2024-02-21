import * as React from 'react'
import ComponentBox from '../../../../../../shared/tags/ComponentBox'
import { Button, Flex } from '@dnb/eufemia/src'
import { Field, FormError } from '@dnb/eufemia/src/extensions/forms'

// Dropdown

export const DropdownEmpty = () => (
  <ComponentBox>
    <Field.Selection
      onFocus={(value) => console.log('onFocus', value)}
      onBlur={(value) => console.log('onBlur', value)}
      onChange={(value) => console.log('onChange', value)}
    >
      <Field.Option value="foo" title="Foo!" />
      <Field.Option value="bar" title="Baar!" />
    </Field.Selection>
  </ComponentBox>
)

export const DropdownPlaceholder = () => (
  <ComponentBox>
    <Field.Selection
      placeholder="Select something..."
      onChange={(value) => console.log('onChange', value)}
    >
      <Field.Option value="foo" title="Foo!" />
      <Field.Option value="bar" title="Baar!" />
    </Field.Selection>
  </ComponentBox>
)

export const DropdownLabel = () => (
  <ComponentBox>
    <Field.Selection
      label="Label text"
      onChange={(value) => console.log('onChange', value)}
    >
      <Field.Option value="foo" title="Foo!" />
      <Field.Option value="bar" title="Baar!" />
    </Field.Selection>
  </ComponentBox>
)

export const DropdownOptionSelected = () => (
  <ComponentBox>
    <Field.Selection
      value="bar"
      onChange={(value) => console.log('onChange', value)}
    >
      <Field.Option value="foo" title="Foo!" />
      <Field.Option value="bar" title="Baar!" />
    </Field.Selection>
  </ComponentBox>
)

export const DropdownLabelAndOptionSelected = () => (
  <ComponentBox data-visual-test="selection-dropdown-default">
    <Field.Selection
      value="bar"
      label="Label text"
      onChange={(value) => console.log('onChange', value)}
    >
      <Field.Option value="foo" title="Foo!" />
      <Field.Option value="bar" title="Baar!" />
    </Field.Selection>
  </ComponentBox>
)

export const WithHelp = () => {
  return (
    <ComponentBox data-visual-test="selection-dropdown-help">
      <Field.Selection
        value="bar"
        label="Label text"
        help={{
          title: 'Help is available',
          content:
            'Somewhere along the way, we must learn that there is nothing greater than to do something for others.',
        }}
        onChange={(value) => console.log('onChange', value)}
      >
        <Field.Option value="foo" title="Foo!" />
        <Field.Option value="bar" title="Baar!" />
      </Field.Selection>
    </ComponentBox>
  )
}

export const HorizontalLayout = () => {
  return (
    <ComponentBox data-visual-test="selection-dropdown-horizontal">
      <Field.Selection
        value="bar"
        label="Label text"
        layout="horizontal"
        onChange={(value) => console.log('onChange', value)}
      >
        <Field.Option value="foo" title="Foo!" />
        <Field.Option value="bar" title="Baar!" />
      </Field.Selection>
    </ComponentBox>
  )
}

export const Widths = () => {
  return (
    <ComponentBox hideCode data-visual-test="selection-dropdown-widths">
      <Flex.Stack>
        <Field.Selection
          label="Default width (property omitted)"
          value="bar"
        >
          <Field.Option value="foo" title="Foo!" />
          <Field.Option value="bar" title="Baar!" />
        </Field.Selection>
        <Field.Selection label="Small" value="bar" width="small">
          <Field.Option value="foo" title="Foo!" />
          <Field.Option value="bar" title="Baar!" />
        </Field.Selection>
        <Field.Selection label="Medium" value="bar" width="medium">
          <Field.Option value="foo" title="Foo!" />
          <Field.Option value="bar" title="Baar!" />
        </Field.Selection>
        <Field.Selection label="Large" value="bar" width="large">
          <Field.Option value="foo" title="Foo!" />
          <Field.Option value="bar" title="Baar!" />
        </Field.Selection>
        <Field.Selection label="Stretch" value="bar" width="stretch">
          <Field.Option value="foo" title="Foo!" />
          <Field.Option value="bar" title="Baar!" />
        </Field.Selection>
      </Flex.Stack>
    </ComponentBox>
  )
}

export const DropdownDisabled = () => (
  <ComponentBox>
    <Field.Selection
      value="bar"
      label="Label text"
      onChange={(value) => console.log('onChange', value)}
      disabled
    >
      <Field.Option value="foo" title="Foo!" />
      <Field.Option value="bar" title="Baar!" />
    </Field.Selection>
  </ComponentBox>
)

export const DropdownError = () => (
  <ComponentBox scope={{ FormError }}>
    <Field.Selection
      value="bar"
      label="Label text"
      onChange={(value) => console.log('onChange', value)}
      error={new FormError('This is what is wrong...')}
    >
      <Field.Option value="foo" title="Foo!" />
      <Field.Option value="bar" title="Baar!" />
    </Field.Selection>
  </ComponentBox>
)

export const DropdownDynamicOptions = () => (
  <ComponentBox>
    {() => {
      const Example = () => {
        const [numOptions, setNumOptions] = React.useState(3)

        return (
          <>
            <Field.Selection
              value="option-15"
              label="Label text"
              onChange={(value) => console.log('onChange', value)}
            >
              {Array.from(Array(numOptions).keys()).map((key) => (
                <Field.Option
                  key={key}
                  value={key}
                  title={'Option ' + (key + 1)}
                />
              ))}
            </Field.Selection>

            <p>
              {[3, 4, 5].map((num, i) => (
                <Button
                  key={i}
                  size="medium"
                  right="x-small"
                  variant={numOptions === num ? 'primary' : 'secondary'}
                  on_click={() => setNumOptions(num)}
                >
                  {num} options
                </Button>
              ))}
            </p>
          </>
        )
      }

      return <Example />
    }}
  </ComponentBox>
)

export const DropdownHighNumberOfOptions = () => (
  <ComponentBox>
    <Field.Selection
      value="option-15"
      label="Label text"
      onChange={(value) => console.log('onChange', value)}
    >
      <Field.Option value="option-1" title="One" />
      <Field.Option value="option-2" title="Two" />
      <Field.Option value="option-3" title="Three" />
      <Field.Option value="option-4" title="Four" />
      <Field.Option value="option-5" title="Five" />
      <Field.Option value="option-6" title="Six" />
      <Field.Option value="option-7" title="Seven" />
      <Field.Option value="option-8" title="Eight" />
      <Field.Option value="option-9" title="Nine" />
      <Field.Option value="option-10" title="Ten" />
      <Field.Option value="option-11" title="Eleven" />
      <Field.Option value="option-12" title="Twelve" />
      <Field.Option value="option-13" title="Thirteen" />
      <Field.Option value="option-14" title="Fourteen" />
      <Field.Option value="option-15" title="Fifteen" />
      <Field.Option value="option-16" title="Sixteen" />
      <Field.Option value="option-17" title="Seventeen" />
      <Field.Option value="option-18" title="Eighteen" />
      <Field.Option value="option-19" title="Nineteen" />
      <Field.Option value="option-20" title="Twenty" />
      <Field.Option value="option-21" title="Twenty-one" />
      <Field.Option value="option-22" title="Twenty-two" />
      <Field.Option value="option-23" title="Twenty-three" />
      <Field.Option value="option-24" title="Twenty-four" />
      <Field.Option value="option-25" title="Twenty-five" />
    </Field.Selection>
  </ComponentBox>
)

export const DropdownValidationRequired = () => (
  <ComponentBox>
    <Field.Selection
      value="foo"
      label="Label text"
      onChange={(value) => console.log('onChange', value)}
      onFocus={(value) => console.log('onFocus', value)}
      onBlur={(value) => console.log('onBlur', value)}
      required
    >
      <Field.Option value="foo" title="Foo!" />
      <Field.Option value="bar" title="Baar!" />
    </Field.Selection>
  </ComponentBox>
)

// Radio

export const RadioEmpty = () => (
  <ComponentBox>
    <Field.Selection
      variant="radio"
      onChange={(value) => console.log('onChange', value)}
    >
      <Field.Option value="foo" title="Foo!" />
      <Field.Option value="bar" title="Baar!" />
    </Field.Selection>
  </ComponentBox>
)

export const RadioLabel = () => (
  <ComponentBox data-visual-test="selection-radio-options-vertical">
    <Field.Selection
      variant="radio"
      label="Label text"
      onChange={(value) => console.log('onChange', value)}
    >
      <Field.Option value="foo" title="Foo!" />
      <Field.Option value="bar" title="Baar!" />
    </Field.Selection>
  </ComponentBox>
)

export const RadioOptionSelected = () => (
  <ComponentBox data-visual-test="selection-radio-vertical">
    <Field.Selection
      variant="radio"
      label="Label text"
      value="bar"
      onChange={(value) => console.log('onChange', value)}
    >
      <Field.Option value="foo" title="Foo!" />
      <Field.Option value="bar" title="Baar!" />
    </Field.Selection>
  </ComponentBox>
)

export const RadioHorizontalLayout = () => (
  <ComponentBox data-visual-test="selection-radio-horizontal">
    <Field.Selection
      variant="radio"
      label="Label text"
      value="bar"
      layout="horizontal"
      onChange={(value) => console.log('onChange', value)}
    >
      <Field.Option value="foo" title="Foo!" />
      <Field.Option value="bar" title="Baar!" />
    </Field.Selection>
  </ComponentBox>
)

export const RadioHorizontalOptionsLayout = () => (
  <ComponentBox data-visual-test="selection-radio-options-horizontal">
    <Field.Selection
      variant="radio"
      label="Label text"
      value="bar"
      optionsLayout="horizontal"
      onChange={(value) => console.log('onChange', value)}
    >
      <Field.Option value="foo" title="Foo!" />
      <Field.Option value="bar" title="Baar!" />
    </Field.Selection>
  </ComponentBox>
)

export const RadioHorizontalLayoutAndHorizontalOptionsLayout = () => (
  <ComponentBox>
    <Field.Selection
      variant="radio"
      label="Label text"
      value="bar"
      layout="horizontal"
      optionsLayout="horizontal"
      onChange={(value) => console.log('onChange', value)}
    >
      <Field.Option value="foo" title="Foo!" />
      <Field.Option value="bar" title="Baar!" />
    </Field.Selection>
  </ComponentBox>
)

export const RadioDisabled = () => (
  <ComponentBox>
    <Field.Selection
      variant="radio"
      value="bar"
      label="Label text"
      onChange={(value) => console.log('onChange', value)}
      disabled
    >
      <Field.Option value="foo" title="Foo!" />
      <Field.Option value="bar" title="Baar!" />
    </Field.Selection>
  </ComponentBox>
)

export const RadioError = () => (
  <ComponentBox scope={{ FormError }}>
    <Field.Selection
      variant="radio"
      value="bar"
      label="Label text"
      onChange={(value) => console.log('onChange', value)}
      error={new FormError('This is what is wrong...')}
    >
      <Field.Option value="foo" title="Foo!" />
      <Field.Option value="bar" title="Baar!" />
    </Field.Selection>
  </ComponentBox>
)

// Button

export const ButtonEmpty = () => (
  <ComponentBox>
    <Field.Selection
      variant="button"
      onChange={(value) => console.log('onChange', value)}
    >
      <Field.Option value="foo" title="Foo!" />
      <Field.Option value="bar" title="Baar!" />
    </Field.Selection>
  </ComponentBox>
)

export const ButtonLabel = () => (
  <ComponentBox data-visual-test="selection-button-options-vertical">
    <Field.Selection
      variant="button"
      label="Label text"
      onChange={(value) => console.log('onChange', value)}
    >
      <Field.Option value="foo" title="Foo!" />
      <Field.Option value="bar" title="Baar!" />
    </Field.Selection>
  </ComponentBox>
)

export const ButtonHorizontalOptionsLayout = () => (
  <ComponentBox data-visual-test="selection-button-options-horizontal">
    <Field.Selection
      variant="button"
      label="Label text"
      optionsLayout="horizontal"
      onChange={(value) => console.log('onChange', value)}
    >
      <Field.Option value="foo" title="Foo!" />
      <Field.Option value="bar" title="Baar!" />
    </Field.Selection>
  </ComponentBox>
)

export const ButtonOptionSelected = () => (
  <ComponentBox data-visual-test="selection-button-vertical">
    <Field.Selection
      variant="button"
      label="Label text"
      value="bar"
      onChange={(value) => console.log('onChange', value)}
    >
      <Field.Option value="foo" title="Foo!" />
      <Field.Option value="bar" title="Baar!" />
    </Field.Selection>
  </ComponentBox>
)

export const ButtonDisabled = () => (
  <ComponentBox>
    <Field.Selection
      variant="button"
      value="bar"
      label="Label text"
      onChange={(value) => console.log('onChange', value)}
      disabled
    >
      <Field.Option value="foo" title="Foo!" />
      <Field.Option value="bar" title="Baar!" />
    </Field.Selection>
  </ComponentBox>
)

export const ButtonError = () => (
  <ComponentBox scope={{ FormError }}>
    <Field.Selection
      variant="button"
      value="bar"
      label="Label text"
      onChange={(value) => console.log('onChange', value)}
      error={new FormError('This is what is wrong...')}
    >
      <Field.Option value="foo" title="Foo!" />
      <Field.Option value="bar" title="Baar!" />
    </Field.Selection>
  </ComponentBox>
)
