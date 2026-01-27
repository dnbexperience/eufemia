---
title: 'Field.Number'
description: '`Field.Number` is the base component for receiving user input where the target data is of type `number`.'
version: 10.95.1
generatedAt: 2026-01-27T13:53:28.262Z
checksum: 090b7d977ba4be5e2c4c04d199a30a4048416c59f443a56985df2f80629d9c40
---

# Field.Number

## Import

```tsx
import { Field } from '@dnb/eufemia/extensions/forms'
render(<Field.Number />)
```

## Description

`Field.Number` is the base component for receiving user input where the target data is of type `number`.

Before using this component, ensure there is not a more specific [field component](/uilib/extensions/forms/feature-fields/) available that better suits your needs.

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
  />
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
  </Form.Card>
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
  </Form.Card>
)
```

### Placeholder

```tsx
render(
  <Field.Number
    label="Label text"
    placeholder="Enter a number..."
    onChange={(value) => console.log('onChange', value)}
  />
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
  />
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
  </Form.Card>
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
  />
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
  />
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
  </Flex.Stack>
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
  </Flex.Stack>
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
  />
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
  />
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
  />
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
  />
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
  />
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
  />
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
          { conditionally, getValueByPath, getFieldByPath }
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
  </Form.Handler>
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
  />
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
  </Flex.Stack>
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
  />
)
```

```tsx
render(<Field.Number label="Label text" showStepControls disabled />)
```

## Properties

### Field-specific properties

```json
{
  "props": {
    "decimalLimit": {
      "doc": "Max number of decimals. Values with more decimals will be rounded. Defaults to `12`.",
      "type": "number",
      "status": "optional"
    },
    "percent": {
      "doc": "Format a number as percentage.",
      "type": "boolean",
      "status": "optional"
    },
    "currency": {
      "doc": "Currency code (ISO 4217) or `true` to use the default `NOK`. Uses two decimals by default.",
      "type": ["boolean", "string"],
      "status": "optional"
    },
    "allowNegative": {
      "doc": "Whether or not to allow negative numbers. Defaults to `true`.",
      "type": "boolean",
      "status": "optional"
    },
    "disallowLeadingZeroes": {
      "doc": "Whether or not to allow leading zeroes during typing. Defaults to `false`.",
      "type": "boolean",
      "status": "optional"
    },
    "minimum": {
      "doc": "Validation for inclusive minimum number value (greater than or equal). Defaults to `Number.MIN_SAFE_INTEGER`.",
      "type": "number",
      "status": "optional"
    },
    "maximum": {
      "doc": "Validation for inclusive maximum number value (less than or equal). Defaults to `Number.MAX_SAFE_INTEGER`.",
      "type": "number",
      "status": "optional"
    },
    "exclusiveMinimum": {
      "doc": "Validation for exclusive minimum number value (greater than).",
      "type": "number",
      "status": "optional"
    },
    "exclusiveMaximum": {
      "doc": "Validation for exclusive maximum number value (less than).",
      "type": "number",
      "status": "optional"
    },
    "multipleOf": {
      "doc": "Validation that requires the number to be a multiple of given value.",
      "type": "number",
      "status": "optional"
    },
    "width": {
      "doc": "`false` for no width (use browser default), `small`, `medium` or `large` for predefined standard widths, `stretch` for fill available width.",
      "type": ["string", "false"],
      "status": "optional"
    },
    "size": {
      "doc": "The sizes you can choose is `default` (2rem), `medium` (2.5rem) and `large` (3rem) are supported component sizes. Defaults to `default` / `null`. Also, if you define a number like `size={2}` then it will be forwarded as the input element attribute. Consider rather setting field sizes with [Form.Appearance](/uilib/extensions/forms/Form/Appearance/).",
      "type": ["string", "number"],
      "status": "optional"
    },
    "align": {
      "doc": "Lateral alignment of contents of input field, one of `left` (default), `center`, or `right`.",
      "type": "string",
      "status": "optional"
    },
    "autoComplete": {
      "doc": "For HTML `autocomplete` attributes.",
      "type": ["on", "string"],
      "status": "optional"
    },
    "prefix": {
      "doc": "Text added before the value input.",
      "type": "string",
      "status": "optional"
    },
    "suffix": {
      "doc": "Text added after the value input.",
      "type": "string",
      "status": "optional"
    },
    "step": {
      "doc": "Determines step granularity when in/decreasing value input through step controls buttons or arrow keys. Defaults to `1`.",
      "type": "number",
      "status": "optional"
    },
    "startWith": {
      "doc": "When no `value` or `defaultValue` is given, start with a given value when in/decreasing value input through step controls buttons or arrow keys. Defaults to `null`.",
      "type": "number",
      "status": "optional"
    },
    "showStepControls": {
      "doc": "Show buttons that in/decreases value input by the step value.",
      "type": "boolean",
      "status": "optional"
    },
    "mask": {
      "doc": "An array or a function returning an array of regexes to use as a mask for the input. If not given, the input will not be masked.",
      "type": ["array", "function"],
      "status": "optional"
    }
  }
}
```

### General properties

```json
{
  "props": {
    "value": {
      "doc": "Source data value for the field. Will take precedence over the path value given in the data context.",
      "type": "number",
      "status": "optional"
    },
    "defaultValue": {
      "doc": "Default source data value for the field. Will not take precedence over the path value given in the data context.",
      "type": "number",
      "status": "optional"
    },
    "path": {
      "doc": "JSON Pointer for where the data for the field is located in the source dataset (when using Form.Handler or DataContext). The `path` will also be set as the `name` attribute for the [string](/uilib/extensions/forms/base-fields/String/)-field.",
      "type": "string",
      "status": "optional"
    },
    "info": {
      "doc": "Info message shown below / after the field. When provided as a function, the function will be called with the current value as argument. The second parameter is an object with `{ conditionally, getValueByPath, getFieldByPath }`. To show the message first after the user has interacted with the field, you can call and return `conditionally` function with a callback and with options: `conditionally(() => 'Your message', { showInitially: true })`",
      "type": ["React.Node", "Array<React.Node>", "function"],
      "status": "optional"
    },
    "warning": {
      "doc": "Warning message shown below / after the field. When provided as a function, the function will be called with the current value as argument. The second parameter is an object with `{ conditionally, getValueByPath, getFieldByPath }`. To show the message first after the user has interacted with the field, you can call and return `conditionally` function with a callback and with options: `conditionally(() => 'Your message', { showInitially: true })`",
      "type": ["React.Node", "Array<React.Node>", "function"],
      "status": "optional"
    },
    "error": {
      "doc": "Error message shown below / after the field. When provided as a function, the function will be called with the current value as argument. The second parameter is an object with `{ conditionally, getValueByPath, getFieldByPath }`. To show the message first after the user has interacted with the field, you can call and return `conditionally` function with a callback and with options: `conditionally(() => 'Your message', { showInitially: true })`",
      "type": [
        "Error",
        "FormError",
        "Array<Error | FormError>",
        "function"
      ],
      "status": "optional"
    },
    "disabled": {
      "doc": "Set `true` to show the field but without the possibility of changing the value.",
      "type": "boolean",
      "status": "optional"
    },
    "emptyValue": {
      "doc": "The value to use (in `onChange` events etc) when emptying the field. Makes it possible for instance to provide `undefined` instead of an empty string when clearing the content of a text input.",
      "type": ["number", "undefined"],
      "status": "optional"
    },
    "required": {
      "doc": "When set to `true`, the field will give an error if the value fails the required validation. When set to `false`, the field will not be required, but will add a \"(optional)\" suffix to the label.",
      "type": "boolean",
      "status": "optional"
    },
    "labelSuffix": {
      "doc": "Will append an additional text to the label, like \"(optional)\". When using `inheritLabel`, the suffix will not be inherited. NB: The visual appearance of the `labelSuffix` may change in the future.",
      "type": "React.Node",
      "status": "optional"
    },
    "schema": {
      "doc": "Custom JSON Schema for validating the value.",
      "type": "object",
      "status": "optional"
    },
    "validateInitially": {
      "doc": "Set to `true` to show validation based errors initially (from given value-prop or source data) before the user interacts with the field.",
      "type": "boolean",
      "status": "optional"
    },
    "validateUnchanged": {
      "doc": "Set to `true` to show validation based errors when the field is touched (like focusing a field and blurring) without having changed the value. Since the user did not introduce a new error, this will apply when the value was initially invalid based on validation.",
      "type": "boolean",
      "status": "optional"
    },
    "validateContinuously": {
      "doc": "Set to `true` to show validation based errors continuously while writing, not just when blurring the field.",
      "type": "boolean",
      "status": "optional"
    },
    "errorMessages": {
      "doc": "Custom error messages for each type of error, overriding default messages. The messages can be a React.ReactNode or a string.",
      "type": "object",
      "status": "optional"
    },
    "onChangeValidator": {
      "doc": "Custom validator function where you can return `undefined`, `Error`, `FormError` or an Array with either several other validators or several `Error` or `FormError`. It is triggered on every change done by the user. The function can be either asynchronous or synchronous. The first parameter is the value, and the second parameter returns an object containing { errorMessages, connectWithPath, validators }.",
      "type": "function",
      "status": "optional"
    },
    "onBlurValidator": {
      "doc": "Custom validator function where you can return `undefined`, `Error`, `FormError` or an Array with either several other validators or several `Error` or `FormError`. It is triggered when the user leaves a field (e.g., blurring a text input or closing a dropdown). The function can be either asynchronous or synchronous. The first parameter is the value, and the second parameter returns an object containing { errorMessages, connectWithPath, validators }.",
      "type": "function",
      "status": "optional"
    },
    "transformIn": {
      "doc": "Transforms the `value` before its displayed in the field (e.g. input).",
      "type": "function",
      "status": "optional"
    },
    "transformOut": {
      "doc": "Transforms the value before it gets forwarded to the form data object (context) or returned as the `onChange` value parameter. The first parameter is the internal value. Some fields do support a second parameter, like the SelectCountry, where the country object is given.",
      "type": "function",
      "status": "optional"
    },
    "label": {
      "doc": "Label text displayed above the field. Most fields already have a default label, so check the field translations for an existing label entry. Only set `label` when you need to override the default.",
      "type": "string",
      "status": "optional"
    },
    "labelDescription": {
      "doc": "A more discreet text displayed beside the label (i.e for \"(optional)\").",
      "type": "string",
      "status": "optional"
    },
    "labelDescriptionInline": {
      "doc": "If true, the `labelDescription` will be displayed on the same line as the label.",
      "type": "boolean",
      "status": "optional"
    },
    "labelSrOnly": {
      "doc": "Use `true` to make the label only readable by screen readers.",
      "type": "boolean",
      "status": "optional"
    },
    "labelSize": {
      "doc": "Define the font-size of the label based on the [font-size](/uilib/typography/font-size/) table.",
      "type": ["medium", "large"],
      "status": "optional"
    },
    "help": {
      "doc": "Provide help content for the field using `title` and `content` as a string or React.Node. Additionally, you can set `open` to `true` to display the inline help, set the `breakout` property to `false` to disable the breakout of the inline help content, set `outset` to `false` to display the help text inline (inset) instead of the default outset behavior, or use `renderAs` set to `dialog` to render the content in a [Dialog](/uilib/components/dialog/) (recommended for larger amounts of content).",
      "type": "object",
      "status": "optional"
    },
    "hideHelpButton": {
      "doc": "Set `true` when you render the inline help button outside the label (e.g. inside a checkbox suffix) so FieldBlock skips drawing the default label help button.",
      "type": "boolean",
      "status": "optional"
    },
    "layout": {
      "doc": "Layout for the label and input. Can be `horizontal` or `vertical`.",
      "type": "string",
      "status": "optional"
    },
    "layoutOptions": {
      "doc": "Use this to set additional options for the `horizontal` layout. E.g. `{ width: \"medium\" }`. You can also use a custom width `{number}rem`. Instead of a width, you can use a min/max width. E.g. `{ minWidth: \"6rem\", maxWidth: \"12rem\" }`.",
      "type": "object",
      "status": "optional"
    },
    "width": {
      "doc": "Will set the width for the whole block. Use `small`, `medium`, `large` for predefined standard widths. You can also set a custom width `{number}rem` or use `stretch` or `false`.",
      "type": ["string", "false"],
      "status": "optional"
    },
    "contentWidth": {
      "doc": "Will set the width for its contents. Use `small`, `medium`, `large` for predefined standard widths. You can also set a custom width `{number}rem` or use `stretch` or `false`.",
      "type": ["string", "false"],
      "status": "optional"
    },
    "[Space](/uilib/layout/space/properties)": {
      "doc": "Spacing properties like `top` or `bottom` are supported.",
      "type": ["string", "object"],
      "status": "optional"
    }
  },
  "valueType": "number"
}
```

## Translations

```json
{
  "locales": ["da-DK", "en-GB", "nb-NO", "sv-SE"],
  "entries": {
    "Field.errorPattern": {
      "nb-NO": "Verdien er ugyldig.",
      "en-GB": "The value is invalid.",
      "sv-SE": "Värdet är ogiltigt.",
      "da-DK": "Ugyldig værdi."
    },
    "Field.errorRequired": {
      "nb-NO": "Dette feltet må fylles ut.",
      "en-GB": "This field is required.",
      "sv-SE": "Detta fält måste fyllas i.",
      "da-DK": "Dette felt skal udfyldes."
    },
    "Field.errorSummary": {
      "nb-NO": "Feil som må rettes:",
      "en-GB": "Please correct the following errors:",
      "sv-SE": "Fel som måste åtgärdas:",
      "da-DK": "Felter der skal rettes:"
    },
    "Field.errorSummaryTitle": {
      "nb-NO": "Feil som må rettes",
      "en-GB": "Please correct the following errors",
      "sv-SE": "Fel som måste åtgärdas",
      "da-DK": "Felter der skal rettes"
    },
    "Field.optionalLabelSuffix": {
      "nb-NO": "(valgfritt)",
      "en-GB": "(optional)",
      "sv-SE": "(valfritt)",
      "da-DK": "(valgfrit)"
    },
    "Field.stateSummary": {
      "nb-NO": "Oppsummering:",
      "en-GB": "Summary:",
      "sv-SE": "Sammanfattning:",
      "da-DK": "Oversigt:"
    },
    "NumberField.errorExclusiveMaximum": {
      "nb-NO": "Verdien må være mindre enn {exclusiveMaximum}.",
      "en-GB": "The value must be less than {exclusiveMaximum}.",
      "sv-SE": "Värdet måste vara mindre än {exclusiveMaximum}.",
      "da-DK": "Værdien skal være mindre end {exclusiveMaximum}."
    },
    "NumberField.errorExclusiveMinimum": {
      "nb-NO": "Verdien må være større enn {exclusiveMinimum}.",
      "en-GB": "The value must be greater than {exclusiveMinimum}.",
      "sv-SE": "Värdet måste vara större än {exclusiveMinimum}.",
      "da-DK": "Værdien skal være større end {exclusiveMinimum}."
    },
    "NumberField.errorInteger": {
      "nb-NO": "Verdien må være et heltall (uten desimaler).",
      "en-GB": "The value must be an integer (no decimals).",
      "sv-SE": "Värdet måste vara ett heltal (utan decimaler).",
      "da-DK": "Værdien skal være et helt tal (uden decimaler)."
    },
    "NumberField.errorMaximum": {
      "nb-NO": "Verdien må maksimalt være {maximum}.",
      "en-GB": "The value must be a maximum of {maximum}.",
      "sv-SE": "Värdet får vara högst {maximum}.",
      "da-DK": "Værdien må højst være {maximum}."
    },
    "NumberField.errorMinimum": {
      "nb-NO": "Verdien må minst være {minimum}.",
      "en-GB": "The value must be at least {minimum}.",
      "sv-SE": "Värdet måste vara minst {minimum}.",
      "da-DK": "Værdien skal være mindst {minimum}."
    },
    "NumberField.errorMultipleOf": {
      "nb-NO": "Verdien må være et multiplum av {multipleOf}.",
      "en-GB": "The value must be a multiple of {multipleOf}.",
      "sv-SE": "Värdet måste vara en multipel av {multipleOf}.",
      "da-DK": "Indtast en værdi, der går op i {multipleOf}."
    }
  }
}
```

## Events

```json
{
  "props": {
    "onChange": {
      "doc": "Will be called on value changes made by the user, with the new value as argument. When an `async` function is used, the corresponding [FieldBlock](/uilib/extensions/forms/create-component/FieldBlock/) will show an indicator on the field label. You can return `{ success: 'saved' } as const` to show a success symbol, or an error or an object with these keys `{ info: 'Info message', warning: 'Warning message', error: Error('My error') } as const`. The second parameter is an object that e.g. contains `props` (all given `Field.*` properties).",
      "type": "(value) => void",
      "status": "optional"
    },
    "onFocus": {
      "doc": "Will be called when the component gets into focus. Like clicking inside a text input or opening a dropdown. Called with active value as argument. The second parameter is an object that e.g. contains `props` (all given `Field.*` properties).",
      "type": "(value) => void",
      "status": "optional"
    },
    "onBlur": {
      "doc": "Will be called when the component stop being in focus. Like when going to next field, or closing a dropdown. Called with active value as argument. The second parameter is an object that e.g. contains `props` (all given `Field.*` properties).",
      "type": "(value) => void",
      "status": "optional"
    },
    "onStatusChange": {
      "doc": "Called whenever the status messages (info, warning or error) gets visible or changes. Receives the current `{ info, warning, error }` object.",
      "type": "({ info?, warning?, error? }: FieldStatus) => void",
      "status": "optional"
    }
  }
}
```
