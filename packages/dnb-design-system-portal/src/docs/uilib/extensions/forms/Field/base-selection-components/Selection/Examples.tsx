import ComponentBox from '../../../../../../../shared/tags/ComponentBox'
import { Field } from '@dnb/eufemia/src/extensions/forms'
import { FormError } from '@dnb/eufemia/src/extensions/forms/types'

// Dropdown

export const DropdownEmpty = () => (
  <ComponentBox scope={{ Field }}>
    <Field.Selection onChange={(value) => console.log('onChange', value)}>
      <Field.Option value="foo" title="Foo!" />
      <Field.Option value="bar" title="Baar!" />
    </Field.Selection>
  </ComponentBox>
)

export const DropdownPlaceholder = () => (
  <ComponentBox scope={{ Field }}>
    <Field.Selection
      placeholder="Select something...."
      onChange={(value) => console.log('onChange', value)}
    >
      <Field.Option value="foo" title="Foo!" />
      <Field.Option value="bar" title="Baar!" />
    </Field.Selection>
  </ComponentBox>
)

export const DropdownLabel = () => (
  <ComponentBox scope={{ Field }}>
    <Field.Selection
      label="Label text"
      onChange={(value) => console.log('onChange', value)}
    />
  </ComponentBox>
)

export const DropdownOptionSelected = () => (
  <ComponentBox scope={{ Field }}>
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
  <ComponentBox scope={{ Field }}>
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

export const HorizontalLayout = () => {
  return (
    <ComponentBox scope={{ Field }}>
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
    <ComponentBox scope={{ Field }}>
      <Field.Selection
        label="Default width (property omitted)"
        value="bar"
        onChange={(value) => console.log('onChange', value)}
      >
        <Field.Option value="foo" title="Foo!" />
        <Field.Option value="bar" title="Baar!" />
      </Field.Selection>
      <Field.Selection
        label="Medium"
        value="bar"
        width="medium"
        onChange={(value) => console.log('onChange', value)}
      >
        <Field.Option value="foo" title="Foo!" />
        <Field.Option value="bar" title="Baar!" />
      </Field.Selection>
      <Field.Selection
        label="Large"
        value="bar"
        width="large"
        onChange={(value) => console.log('onChange', value)}
      >
        <Field.Option value="foo" title="Foo!" />
        <Field.Option value="bar" title="Baar!" />
      </Field.Selection>
      <Field.Selection
        label="Stretch"
        value="bar"
        width="stretch"
        onChange={(value) => console.log('onChange', value)}
      >
        <Field.Option value="foo" title="Foo!" />
        <Field.Option value="bar" title="Baar!" />
      </Field.Selection>
    </ComponentBox>
  )
}

export const DropdownDisabled = () => (
  <ComponentBox scope={{ Field }}>
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
  <ComponentBox scope={{ Field, FormError }}>
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

export const DropdownHighNumberOfOptions = () => (
  <ComponentBox scope={{ Field }}>
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
      <Field.Option value="option-21" title="Twentyone" />
      <Field.Option value="option-22" title="Twentytwo" />
      <Field.Option value="option-23" title="Twentythree" />
      <Field.Option value="option-24" title="Twentyfour" />
      <Field.Option value="option-25" title="Twentyfive" />
    </Field.Selection>
  </ComponentBox>
)

export const DropdownValidationRequired = () => (
  <ComponentBox scope={{ Field }}>
    <Field.Selection
      label="Label text"
      onChange={(value) => console.log('onChange', value)}
      required
      validateInitially
      validateUnchanged
    >
      <Field.Option value="foo" title="Foo!" />
      <Field.Option value="bar" title="Baar!" />
    </Field.Selection>
  </ComponentBox>
)

// Radio

export const RadioEmpty = () => (
  <ComponentBox scope={{ Field }}>
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
  <ComponentBox scope={{ Field }}>
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
  <ComponentBox scope={{ Field }}>
    <Field.Selection
      variant="radio"
      value="bar"
      onChange={(value) => console.log('onChange', value)}
    >
      <Field.Option value="foo" title="Foo!" />
      <Field.Option value="bar" title="Baar!" />
    </Field.Selection>
  </ComponentBox>
)

export const RadioDisabled = () => (
  <ComponentBox scope={{ Field }}>
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
  <ComponentBox scope={{ Field, FormError }}>
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

// Checkbox

export const CheckboxEmpty = () => (
  <ComponentBox scope={{ Field }}>
    <Field.Selection
      variant="radio"
      onChange={(value) => console.log('onChange', value)}
    >
      <Field.Option value="foo" title="Foo!" />
      <Field.Option value="bar" title="Baar!" />
    </Field.Selection>
  </ComponentBox>
)

export const CheckboxLabel = () => (
  <ComponentBox scope={{ Field }}>
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

export const CheckboxOptionSelected = () => (
  <ComponentBox scope={{ Field }}>
    <Field.Selection
      variant="radio"
      value="bar"
      onChange={(value) => console.log('onChange', value)}
    >
      <Field.Option value="foo" title="Foo!" />
      <Field.Option value="bar" title="Baar!" />
    </Field.Selection>
  </ComponentBox>
)

export const CheckboxDisabled = () => (
  <ComponentBox scope={{ Field }}>
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

export const CheckboxError = () => (
  <ComponentBox scope={{ Field, FormError }}>
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
