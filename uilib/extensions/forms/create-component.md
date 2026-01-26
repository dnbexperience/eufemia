---
title: 'Create your own component'
version: 10.95.0
generatedAt: 2026-01-26T10:49:27.280Z
checksum: 090b7d977ba4be5e2c4c04d199a30a4048416c59f443a56985df2f80629d9c40
---

# Create your own component

Eufemia Forms contains helper fields and tools so you can declaratively create interactive form components that flawlessly integrates between existing data and your custom form components.

By using the building blocks for value and field components, you save development time, and at the same time ensure that local, custom components work similarly, and fit into the setup with the standardized base [value components](/uilib/extensions/forms/Value/#base-components) and base [field components](/uilib/extensions/forms/base-fields/).

**Table of Contents**

- [Value components](#value-components)
- [Field components](#field-components)
- [Layout](#layout)
- [Localization and translations](#localization-and-translations)

## Value components

For creating a `Value.*` component you can use [ValueBlock](/uilib/extensions/forms/create-component/ValueBlock/) and [useValueProps](/uilib/extensions/forms/create-component/useValueProps/):

```tsx
import { ValueBlock, useValueProps } from '@dnb/eufemia/extensions/forms'

const MyValue = (props) => {
  const { value, ...rest } = useValueProps(props)
  return <ValueBlock {...rest}>{value}</ValueBlock>
}

render(<MyValue path="/dataSelector" />)
```

[ValueBlock](/uilib/extensions/forms/create-component/ValueBlock/) provides a standardized way to display labels and other surrounding elements in a consistent manner.

```tsx
const MyValue = ({ value, ...props }) => {
  return (
    <ValueBlock {...props}>
      <NumberFormat currency>{value}</NumberFormat>
    </ValueBlock>
  )
}
render(<MyValue label="Label" value={1234} />)
```

The `useValueProps` provides a standardized way to handle data flow in a consistent manner.

The `FieldBlock` provides a standardized way to display a label and other surrounding elements in a consistent manner.

## Field components

For creating a `Field.*` component, you can use [FieldBlock](/uilib/extensions/forms/create-component/FieldBlock/) and [useFieldProps](/uilib/extensions/forms/create-component/useFieldProps/):

```tsx
import { FieldBlock, useFieldProps } from '@dnb/eufemia/extensions/forms'

const MyField = (props) => {
  const {
    id,
    value,
    handleChange,
    handleFocus,
    handleBlur,
    htmlAttributes,
  } = useFieldProps(props)

  return (
    <FieldBlock
      forId={id}
      id={id} // If your field component does not support the HTML "for" attribute, you can use the "id" property instead of "forId".
    >
      <input
        id={id}
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        {...htmlAttributes}
      />
    </FieldBlock>
  )
}

render(<MyField label="Label text" path="/dataSelector" />)
```

The `useFieldProps` provides a standardized way to handle data flow, validation and error messages in a consistent manner.

The `FieldBlock` provides a standardized way to display labels, error messages and other surrounding elements in a consistent manner.

Here is a working example with code you can edit in the playground:

```tsx
const MyField = (props) => {
  const fromInput = React.useCallback(({ value }) => value, [])
  const preparedProps = {
    label: 'What is the secret of this field?',
    fromInput,
    onChangeValidator: (value) => {
      if (value === 'secret') {
        return new Error('Do not reveal the secret!')
      }
    },
    ...props,
  }
  const { id, value, label, handleChange, handleFocus, handleBlur } =
    useFieldProps(preparedProps)
  return (
    <FieldBlock forId={id} label={label}>
      <Input
        id={id}
        value={value}
        on_change={handleChange}
        on_focus={handleFocus}
        on_blur={handleBlur}
      />
    </FieldBlock>
  )
}
render(
  <MyField onChange={(value) => console.log('onChange', value)} required />
)
```

### Further customization

You can customize the behavior of the field component. For example, you can add a custom error message:

```tsx
import { useFieldProps } from '@dnb/eufemia/extensions/forms'

useFieldProps({
  errorMessages: {
    'Field.errorRequired': 'Show this when "required" fails.',
  },
})
```

or a custom `required` property validation function:

```tsx
import { FormError } from '@dnb/eufemia/extensions/forms'

const validateRequired = (value, { emptyValue, required, isChanged }) => {
  if (required && value === emptyValue) {
    return new FormError('Field.errorRequired')
  }
}

useFieldProps({ validateRequired })
```

For more information about all the available parameters, see the [useFieldProps](/uilib/extensions/forms/create-component/useFieldProps/) or the [FieldBlock](/uilib/extensions/forms/create-component/FieldBlock/) documentation.

### More details

This example shows a custom component. The [useFieldProps](/uilib/extensions/forms/create-component/useFieldProps/) hook receives the properties and adds extra properties to standardize field behavior. These include `handleFocus`, `handleChange`, and `handleBlur` functions. Even if the field components have external callbacks like "onChange", these will not be altered. The "handle" variants simplify your code.

### The example explained

Using these two form helpers in your field component triggers several automatic processes. These include timely validation checks, syncing value changes with the [DataContext](/uilib/extensions/forms/DataContext/), coordinating error messages across multiple fields, and preventing premature error displays while the user is editing the field.

Keep in mind, you can customize the behavior of [useFieldProps](/uilib/extensions/forms/create-component/useFieldProps/) and other helper functions to make the component work exactly as you want.

### Your own validation

If you need custom validation that cannot use the built-in JSON Schema or a derivative validator (like in the example above), you can create your own logic. Then, pass the result as an `error` property to [FieldBlock](/uilib/extensions/forms/create-component/FieldBlock/). All direct properties override standard handling, giving you full control over your component.

### Customized even further

If you need something that looks even more different from the usual fields, you can drop [FieldBlock](/uilib/extensions/forms/create-component/FieldBlock/) and display surrounding elements in other ways – but still get all the help of a data flow logic, such as [useFieldProps](/uilib/extensions/forms/create-component/useFieldProps/) offers.

Here follows an example that retrieves data from a surrounding DataContext, and creates a composite field based on other components from Eufemia:

```tsx
const MyComposedField = (props) => {
  const { id, value, hasError, handleChange, handleFocus, handleBlur } =
    useFieldProps({
      path: '/birthYear',
    })
  const handleBirthYearChange = React.useCallback(
    (sliderData) => {
      handleChange(sliderData.value)
    },
    [handleChange]
  )
  return (
    <FieldBlock id={id} label={props.label ?? 'Name and age'}>
      <Flex.Horizontal>
        <Field.Name.First path="/firstName" width="medium" minLength={2} />
        <Field.Name.Last path="/lastName" width="medium" required />
        <FieldBlock width="large">
          <Slider
            min={1900}
            max={new Date().getFullYear()}
            step={1}
            label="Birth year"
            label_direction="vertical"
            value={parseFloat(String(value))}
            on_change={handleBirthYearChange}
            on_drag_start={handleFocus}
            on_drag_end={handleBlur}
            status={hasError}
            tooltip
          />
        </FieldBlock>
      </Flex.Horizontal>
    </FieldBlock>
  )
}
const data = {
  firstName: 'John',
  birthYear: 2000,
}
render(
  <DataContext.Provider
    defaultData={data}
    onChange={(data) => console.log('onChange', data)}
  >
    <MyComposedField label="My custom label" />
  </DataContext.Provider>
)
```

## Layout

When building your custom form components, preferably use the [Layout](/uilib/layout) component.

### Width definitions

These are the official sizes you can use when [creating your own form fields](/uilib/extensions/forms/create-component/).

```css
:root {
  /* Field */
  --forms-field-width--small: 5rem;
  --forms-field-width--medium: 11rem;
  --forms-field-width--large: 21rem;
  --forms-field-label-max-width--large: 60ch;

  /* Value */
  --forms-value-width--small: 30ch;
  --forms-value-width--medium: 40ch;
  --forms-value-width--large: 60ch;
  --forms-value-label-max-width--large: 60ch;
}
```

You can also use a [FieldBlock](/uilib/extensions/forms/create-component/FieldBlock/) and provide a `width` property with a value of either `small`, `medium` or `large` and use it as a sized wrapper.

## Localization and translations

You can use the [Form.useTranslation](/uilib/extensions/forms/Form/useTranslation/) hook to use existing translations or extend it with your custom field localization:

```tsx
import {
  Form,
  FieldBlock,
  useFieldProps,
  FieldProps,
} from '@dnb/eufemia/extensions/forms'

const myFieldTranslations = {
  'en-GB': {
    MyField: {
      label: 'My field',
      requiredMessage: 'Custom required message',
    },
  },
  'nb-NO': {
    MyField: {
      label: 'Mitt felt',
      requiredMessage: 'Obligatorisk felt melding',
    },
  },
}

type Translation =
  (typeof myFieldTranslations)[keyof typeof myFieldTranslations]

type MyFieldValue = string

const MyField = (props: FieldProps<MyFieldValue>) => {
  const translations = Form.useTranslation<Translation>(
    myFieldTranslations
  )
  const { label, requiredMessage } = translations.MyField

  const preparedProps = {
    label,
    errorMessages: {
      'Field.errorRequired': requiredMessage,
    },
    ...props,
  }

  const { id, value, handleChange, handleFocus, handleBlur } =
    useFieldProps(preparedProps)

  return (
    <FieldBlock<MyFieldValue> forId={id}>
      <input
        id={id}
        value={value}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
      />
    </FieldBlock>
  )
}
```
