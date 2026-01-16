---
title: 'Number'
description: '`Field.Number` is the base component for receiving user input where the target data is of type `number`.'
metadata: https://eufemia.dnb.no/uilib/extensions/forms/base-fields/Number/metadata.json
---

## Import

```tsx
import { Field } from '@dnb/eufemia/extensions/forms'
render(<Field.Number />)
```

## Description

`Field.Number` is the base component for receiving user input where the target data is of type `number`.

There is a corresponding [Value.Number](/uilib/extensions/forms/Value/Number) component.

```tsx
import { Field } from '@dnb/eufemia/extensions/forms'
render(<Field.Number path="/myNumber" />)
```

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/base-fields/Number)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/base-fields/Number)

## When to use and not to use

`Field.Number` only allows the user to enter numbers (negative and positive) and decimal numbers.

If a number has the type of number and cannot start with a zero, this field may be considered.

However, for a customer number, you should rather use [Field.String](/uilib/extensions/forms/base-fields/String/).

Internally, it is used by e.g. [Field.Currency](/uilib/extensions/forms/feature-fields/Currency/).

## Browser autofill

Check out the [Field.String](/uilib/extensions/forms/base-fields/String/#autocomplete-and-autofill) docs about autocomplete.

## Step controls

When using `showStepControls`, the Number component provides buttons for decrementing and incrementing the input value, where the value of de/increment is determined by the `step` property.

It can also be used with [Field.Currency](/uilib/extensions/forms/feature-fields/Currency/).

### Accessibility

The component does not include focusable buttons, aligning with accessibility considerations for keyboard-only users, who can utilize arrow keys for navigation, like the `incrementable` [number input](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input/number).

One of the reasons to make the buttons not focusable is to prevent keyboard-only users from having to tab through all the extra buttons during navigation.

Due to technical constraints, the `Field.Number` component will be announced as a `stepper` field but will have the same instructions read out by a screen reader like VoiceOver on how to change the value.

## Demos

<ChangeLocale
  bottom
  label="Locale used in the demos:"
  listUSLocale={true}
/>

### Label and value

```tsx
render(
  <Field.Number
    label="Label text"
    defaultValue={420000.25}
    onChange={(value) => console.log('onChange', value)}
  />,
)
```

### Label and description

```tsx
render(
  <Form.Card>
    <Field.Number
      label="Label text"
      labelDescription="Description text on the next line"
      placeholder="Enter a text..."
    />
    <Field.Number
      label="Label text"
      labelDescription="Description text on the same line"
      labelDescriptionInline
      placeholder="Enter a text..."
    />
  </Form.Card>,
)
```

### With a horizontal layout

This example uses [Field.Provider](/uilib/extensions/forms/feature-fields/Provider/) to set the `layout` to `horizontal` and `layoutOptions` to `{ width: 'medium' }` for all nested fields.

The `width` of the horizontal label can be set to `small`, `medium`, `large` or a `rem` value.

```tsx
render(
  <Form.Card>
    <Field.Provider
      layout="horizontal"
      layoutOptions={{
        width: 'medium', // can be a rem value
      }}
      required
    >
      <Field.Number
        label="Label text"
        defaultValue={420000}
        step={10000}
        showStepControls
      />
      <Field.Number
        label="Label with a long text that will wrap"
        placeholder="Enter a number..."
        info="Aliqua eu aute id qui esse aliqua dolor in aute magna commodo anim enim et."
      />
      <Field.Number
        label="Label with a long text that will wrap"
        placeholder="Enter a number..."
        size="large"
        width="stretch"
      />
    </Field.Provider>
  </Form.Card>,
)
```

### Placeholder

```tsx
render(
  <Field.Number
    label="Label text"
    placeholder="Enter a number..."
    onChange={(value) => console.log('onChange', value)}
  />,
)
```

#### With custom mask

```tsx
render(
  <Field.Number
    label="Label text"
    defaultValue={1234}
    mask={Array(4).fill(/\\d/)}
    onChange={(value) => console.log('onChange', value)}
  />,
)
```

### With a status

This example demonstrates how the status message width adjusts according to the field width.

```tsx
render(
  <Form.Card>
    <Field.Number
      label="Label text"
      placeholder="Enter a number..."
      width="large"
      warning="Short warning."
      required
    />
    <Field.Number
      label="Label text"
      defaultValue={420000}
      width="large"
      info="Aliqua eu aute id qui esse aliqua dolor in aute magna commodo anim enim et."
      required
    />
    <Field.Number
      label="Label text"
      value={1234}
      width="small"
      warning="Aliqua eu aute id qui esse aliqua dolor in aute magna commodo anim enim et. Velit incididunt exercitation est magna ex irure dolore nisi eiusmod ea exercitation."
      required
    />
  </Form.Card>,
)
```

#### With help

```tsx
render(
  <Field.Number
    defaultValue={12345}
    label="Label text"
    help={{
      title: 'Help is available',
      content:
        'Here is what a team can do for you. . . . It allows you to help others do their best.',
    }}
    onChange={(value) => console.log('onChange', value)}
  />,
)
```

### Exclusive minimum and exclusive maximum

```tsx
render(
  <Field.Number
    defaultValue={1000}
    label="Label text"
    allowNegative={false}
    required
    exclusiveMinimum={900}
    exclusiveMaximum={1000}
    validateInitially
  />,
)
```

### Prefix and suffix

You can also use a function as a prefix or suffix.

```tsx
render(
  <Flex.Stack>
    <Field.Number
      defaultValue={1234}
      label="With prefix"
      prefix="prefix "
      onChange={(value) => console.log('onChange', value)}
    />
    <Field.Number
      defaultValue={1}
      label="With suffix (function)"
      suffix={(value) => (value === 1 ? ' year' : ' years')}
      onChange={(value) => console.log('onChange', value)}
    />
  </Flex.Stack>,
)
```

### Alignment

```tsx
render(
  <Flex.Stack>
    <Field.Number
      align="center"
      label="Center aligned (default)"
      defaultValue={10}
      onChange={(value) => console.log('onChange', value)}
    />
    <Field.Number
      align="left"
      label="Left aligned"
      defaultValue={10}
      onChange={(value) => console.log('onChange', value)}
    />
    <Field.Number
      align="right"
      label="Right aligned"
      defaultValue={10}
      onChange={(value) => console.log('onChange', value)}
    />
  </Flex.Stack>,
)
```

### With help

```tsx
render(
  <Field.Number
    defaultValue={12345}
    label="Label text"
    help={{
      title: 'Help is available',
      content:
        'Here is what a team can do for you. . . . It allows you to help others do their best.',
    }}
    onChange={(value) => console.log('onChange', value)}
  />,
)
```

### With step controls

```tsx
render(
  <Field.Number
    label="Label text"
    showStepControls
    minimum={0}
    maximum={100}
    step={10}
    defaultValue={50}
  />,
)
```

### With step controls in conjunction with Slider

```tsx
const Component = () => {
  const [value, setValue] = React.useState(50000)
  const settings = {
    min: 0,
    max: 100000,
    step: 1000,
  }
  return (
    <Grid.Container>
      <Grid.Item
        span={{
          small: [1, 12],
          medium: [1, 4],
          large: [1, 3],
        }}
      >
        <Field.Number
          label="Label text"
          showStepControls
          minimum={settings.min}
          maximum={settings.max}
          step={settings.step}
          value={value}
          onChange={(value) => setValue(value)}
          width="stretch"
          bottom="small"
        />
        <Slider
          min={settings.min}
          max={settings.max}
          step={settings.step}
          value={value}
          onChange={({ value }) => setValue(parseFloat(String(value)))}
          hideButtons
          tooltip
        />
      </Grid.Item>
    </Grid.Container>
  )
}
render(<Component />)
```

### Disabled

```tsx
render(
  <Field.Number
    defaultValue={135}
    label="Label text"
    onChange={(value) => console.log('onChange', value)}
    disabled
  />,
)
```

### Validation - Required

```tsx
render(
  <Field.Number
    defaultValue={123}
    label="Label text"
    onChange={(value) => console.log('onChange', value)}
    required
  />,
)
```

### Validation - Minimum

```tsx
render(
  <Field.Number
    defaultValue={300}
    label="Enter a number below 250 and blur to trigger error"
    onChange={(value) => console.log('onChange', value)}
    minimum={250}
  />,
)
```

### Validation - Maximum and custom error message

```tsx
render(
  <Field.Number
    label="Enter a number above 250 and blur to trigger error"
    defaultValue={200}
    maximum={250}
    errorMessages={{
      maximum: "You can't enter a number THAR large.. Max 250!",
    }}
    onChange={(value) => console.log('onChange', value)}
  />,
)
```

### Displaying messages - Conditional info message

You can provide a function to the `info`, `warning` or `error` properties that returns a message based on your conditions.

```tsx
<Field.String
  info={(value) => {
    if (value === '123') {
      return 'The value is 123'
    }
  }}
/>
```

Optionally, use the `conditionally` higher order function to show the message only when the field got changed (onChange) and blurred (onBlur).

```tsx
<Field.String
  info={(value, { conditionally, getValueByPath, getFieldByPath }) => {
    if (value === '123') {
      // Show this message only when the field got changed and blurred.
      return conditionally(() => 'The value is 123')
    }
  }}
/>
```

You can also pass options to the `conditionally` function:

- `showInitially` – display the message when the field is first rendered.

```tsx
<Field.String
  info={(value, { conditionally, getValueByPath, getFieldByPath }) => {
    if (value === '123') {
      // Show this message only when the field got changed and blurred.
      return conditionally(() => 'The value is 123', {
        showInitially: true,
      })
    }
  }}
/>
```

Down below you can see an example of how to use the `conditionally` function. There are two input fields which depend on each other. Here we use `info` to show a message when the value of the first field is too low. While we use an error message when the value of the second field is more than what the first field has. The `info` on the first field will only be shown when the user has changed the value and blurred the field.

Read more about [validation and the user experience](/uilib/extensions/forms/getting-started/#validation-and-the-user-experience-ux).

```tsx
render(
  <Form.Handler
    defaultData={{
      maximum: 4,
      amount: 5,
    }}
    onSubmit={async (data) => {
      console.log('onSubmit', data)
    }}
  >
    <Form.Card>
      <Field.Number
        label="Maximum for amount"
        labelDescription={
          <>Defines the maximum amount possible to be entered.</>
        }
        path="/maximum"
        required
        info={(
          maximum,
          { conditionally, getValueByPath, getFieldByPath },
        ) => {
          return conditionally(() => {
            if (maximum < getValueByPath('/amount')) {
              const { props, id } = getFieldByPath('/amount')
              const anchor = props?.label && (
                <Anchor
                  href={'#' + id + '-label'}
                  onClick={(event) => {
                    event.preventDefault()
                    const el = document.getElementById(id + '-label')
                    el?.scrollIntoView()
                  }}
                >
                  {props.label}
                </Anchor>
              )
              return (
                anchor && (
                  <>
                    Remember to adjust the {anchor} to be {maximum} or
                    lower.
                  </>
                )
              )
            }
          })
        }}
      />
      <Field.Number
        label="Amount"
        labelDescription={<>Should be same or lower than maximum.</>}
        path="/amount"
        required
        onBlurValidator={(amount: number, { connectWithPath }) => {
          const maximum = connectWithPath('/maximum').getValue()
          if (amount > maximum) {
            return new FormError('NumberField.errorMaximum', {
              messageValues: {
                maximum: maximum.toString(),
              },
            })
          }
        }}
      />
    </Form.Card>

    <Form.SubmitButton />
  </Form.Handler>,
)
```

### Percentage

```tsx
render(
  <Field.Number
    percent
    defaultValue={80}
    label="Percentage"
    onChange={(value) => console.log('onChange', value)}
    minimum={90}
  />,
)
```

### Allow Negative

```tsx
render(<Field.Number allowNegative={false} />)
```

### Disallow Leading Zeroes

```tsx
render(<Field.Number disallowLeadingZeroes />)
```

### Widths

```tsx
render(
  <Flex.Stack>
    <Form.SubHeading>Without step controls</Form.SubHeading>

    <Field.Number
      label="Default width (property omitted)"
      defaultValue={1234}
    />
    <Field.Number label="Small" defaultValue={1234} width="small" />
    <Field.Number
      label="Medium (and medium size)"
      defaultValue={1234}
      width="medium"
      size="medium"
    />
    <Field.Number
      label="Large (and large size)"
      defaultValue={1234}
      width="large"
      size="large"
    />
    <Field.Number label="Stretch" defaultValue={1234} width="stretch" />
    <Form.SubHeading>With step controls</Form.SubHeading>
    <Field.Number
      showStepControls
      label="Default width (property omitted)"
      defaultValue={1234}
    />
    <Field.Number
      showStepControls
      label="Small"
      defaultValue={1234}
      width="small"
    />
    <Field.Number
      showStepControls
      label="Medium (and medium size)"
      defaultValue={1234}
      width="medium"
      size="medium"
    />
    <Field.Number
      showStepControls
      label="Large (and large size)"
      defaultValue={1234}
      width="large"
      size="large"
    />
    <Field.Number
      showStepControls
      label="Stretch"
      defaultValue={1234}
      width="stretch"
    />
  </Flex.Stack>,
)
```

```tsx
render(
  <Field.Number
    label="Label text"
    showStepControls
    maximum={100}
    defaultValue={150}
    error={new Error('You done messed up, A-a-ron!')}
  />,
)
```

```tsx
render(<Field.Number label="Label text" showStepControls disabled />)
```
