---
title: 'Field.String'
description: '`Field.String` is the base component for receiving user input where the target data is of type `string`.'
version: 10.95.0
generatedAt: 2026-01-26T10:49:27.266Z
checksum: 090b7d977ba4be5e2c4c04d199a30a4048416c59f443a56985df2f80629d9c40
---

# Field.String

## Import

```tsx
import { Field } from '@dnb/eufemia/extensions/forms'
render(<Field.String />)
```

## Description

`Field.String` is the base component for receiving user input where the target data is of type `string`.

Before using this component, ensure there is not a more specific [field component](/uilib/extensions/forms/feature-fields/) available that better suits your needs.

There is a corresponding [Value.String](/uilib/extensions/forms/Value/String) component.

```tsx
import { Field } from '@dnb/eufemia/extensions/forms'
render(<Field.String path="/myValue" />)
```

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/base-fields/String)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/base-fields/String)

## Browser autofill

The string component supports HTML `autocomplete` [attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete).

1. You may either set the property directly on each field:

```tsx
<Form.Handler>
  <Field.String autoComplete="first-name" path="/your-pointer" />
  <Field.String autoComplete="last-name" path="/your-pointer" />
</Form.Handler>
```

2. Or use the "less-code" approach by just giving the data pointer `path` a meaningful name:

```tsx
<Form.Handler autoComplete={true}>
  <Field.String path="/firstName" />
  <Field.String path="/lastName" />
</Form.Handler>
```

The `path` property will be used to set the `name` attribute.

## Accessibility

Avoid using the `maxlength` attribute when possible, as it is not accessible. Instead, use [TextCounter](/uilib/components/fragments/text-counter/) together with `Field.String`.

A demo of how to use the `TextCounter` with `Field.String` can be found [here](/uilib/extensions/forms/base-fields/String/#validation---maximum-length-with-textcounter).

This way, the user receives visual feedback on the number of characters entered and the maximum allowed, without being limited in their workflow.

You can still set the desired maximum number of characters by using the `maxLength` property in Eufemia Forms.

## Demos

### Label and value

```tsx
render(
  <Field.String
    label="Label text"
    defaultValue="foo"
    onChange={(value) => console.log('onChange', value)}
  />
)
```

### Label and description

```tsx
render(
  <Form.Card>
    <Field.String
      label="Label text"
      labelDescription="Description text on the next line"
      placeholder="Enter a text..."
    />
    <Field.String
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
      placeholder="Enter a text..."
      required
    >
      <Field.String label="Label text" warning="Short warning." />
      <Field.String
        label="Label with a long text that will wrap"
        placeholder="Enter a text..."
        size="medium"
        info="Aliqua eu aute id qui esse aliqua dolor in aute magna commodo anim enim et."
      />
      <Field.String
        label="Label with a long text that will wrap"
        placeholder="Enter a text..."
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
  <Field.String
    label="Label text"
    placeholder="Enter a text..."
    onChange={(value) => console.log('onChange', value)}
  />
)
```

### With a status

This example demonstrates how the status message width adjusts according to the field width.

```tsx
render(
  <Form.Card>
    <Field.String
      label="Label text"
      defaultValue="foo"
      warning="Short warning."
      required
    />
    <Field.String
      label="Label text"
      placeholder="Enter a text..."
      info="Aliqua eu aute id qui esse aliqua dolor in aute magna commodo anim enim et."
      required
    />
    <Field.String
      label="Label text"
      defaultValue="foo"
      width="small"
      warning="Aliqua eu aute id qui esse aliqua dolor in aute magna commodo anim enim et. Velit incididunt exercitation est magna ex irure dolore nisi eiusmod ea exercitation."
    />
    <Field.String
      label="Label text"
      error={[new Error('Error message A'), new Error('Error message B')]}
      warning={['Warning message A', 'Warning message B']}
      info={['Info message A', 'Info message B']}
    />
  </Form.Card>
)
```

#### With help

```tsx
render(
  <Field.String
    label="Label text"
    defaultValue="foo"
    help={{
      title: 'Help is available',
      content:
        'Take the time to help other people without expecting a reward or gratitude is definitely important in living an optimistic life.',
    }}
    onChange={(value) => console.log('onChange', value)}
  />
)
```

### Capitalize each word

```tsx
render(
  <Field.String
    label="Label text"
    defaultValue="foo bar"
    capitalize
    onChange={(value) => console.log('onChange', value)}
  />
)
```

### Icons

```tsx
render(
  <Form.Card>
    <Field.String
      label="Icon left"
      defaultValue="foo"
      leftIcon="check"
      onChange={(value) => console.log('onChange', value)}
    />
    <Field.String
      label="Icon right"
      defaultValue="foo"
      rightIcon="loupe"
      onChange={(value) => console.log('onChange', value)}
    />
  </Form.Card>
)
```

### Clear

```tsx
render(
  <Field.String
    defaultValue="foo"
    onChange={(value) => console.log('onChange', value)}
    clear
  />
)
```

### Disabled

```tsx
render(
  <Field.String
    defaultValue="foo"
    label="Label text"
    onChange={(value) => console.log('onChange', value)}
    disabled
  />
)
```

### Validation - Required

```tsx
render(
  <Field.String
    defaultValue="foo"
    label="Label text"
    onChange={(value) => console.log('onChange', value)}
    required
  />
)
```

### Validation - Minimum length

```tsx
render(
  <Field.String
    defaultValue="foo"
    label="Label text (minimum 8 characters)"
    onChange={(value) => console.log('onChange', value)}
    minLength={8}
  />
)
```

### Validation - Maximum length and custom error message

```tsx
render(
  <Field.String
    defaultValue="foo"
    label="Label text (maximum 8 characters)"
    onChange={(value) => console.log('onChange', value)}
    maxLength={8}
    errorMessages={{
      maxLength: "You can't write THAT long.. Max 8 chars!",
    }}
  />
)
```

### Validation - Maximum length with [TextCounter](/uilib/components/fragments/text-counter/)

```tsx
const MyFieldStringWithTextCounter = () => {
  const [text, setText] = React.useState('')
  return (
    <Flex.Vertical gap="x-small">
      <Field.String
        label="Label text (maximum 8 characters)"
        maxLength={8}
        onChange={setText}
      />
      <TextCounter variant="down" text={text} max={8} />
    </Flex.Vertical>
  )
}
render(<MyFieldStringWithTextCounter />)
```

### Validation - Pattern

```tsx
render(
  <Field.String
    defaultValue="foo"
    label="Label text"
    onChange={(value) => console.log('onChange', value)}
    pattern="^foo123"
  />
)
```

### Validation - Multiple Errors

```tsx
render(
  <Field.String
    label="Multiple errors"
    defaultValue="foo"
    pattern="bar"
    minLength={4}
    validateInitially
  />
)
```

### Synchronous external validator (called on every change)

```tsx
render(
  <Field.String
    defaultValue="foo"
    label="Label text (minimum 4 characters)"
    onChangeValidator={(value) =>
      value.length < 4 ? Error('At least 4 characters') : undefined
    }
    onChange={(value) => console.log('onChange', value)}
  />
)
```

### Asynchronous external validator (called on every change)

```tsx
render(
  <Field.String
    defaultValue="foo"
    label="Label text (minimum 4 characters)"
    onChangeValidator={(value) =>
      new Promise((resolve) =>
        setTimeout(
          () =>
            resolve(
              value.length < 5 ? Error('At least 5 characters') : undefined
            ),
          1500
        )
      )
    }
    onChange={(value) => console.log('onChange', value)}
  />
)
```

### Synchronous external validator (called on blur)

```tsx
render(
  <Field.String
    defaultValue="foo"
    label="Label text (minimum 4 characters)"
    onBlurValidator={(value) =>
      value.length < 4 ? Error('At least 4 characters') : undefined
    }
    onChange={(value) => console.log('onChange', value)}
  />
)
```

### Asynchronous external validator (called on blur)

```tsx
render(
  <Field.String
    defaultValue="foo"
    label="Label text (minimum 4 characters)"
    onBlurValidator={(value) =>
      new Promise((resolve) =>
        setTimeout(
          () =>
            resolve(
              value.length < 5 ? Error('At least 5 characters') : undefined
            ),
          1500
        )
      )
    }
    onChange={(value) => console.log('onChange', value)}
  />
)
```

### Multiline, empty

```tsx
render(
  <Field.String
    onChange={(value) => console.log('onChange', value)}
    multiline
  />
)
```

### Multiline, placeholder

```tsx
render(
  <Field.String
    placeholder="Enter text here"
    onChange={(value) => console.log('onChange', value)}
    multiline
  />
)
```

### Multiline, label & value

```tsx
render(
  <Field.String
    defaultValue="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis in tempus odio, nec interdum orci. Integer vehicula ipsum et risus finibus, vitae commodo ex luctus. Nam viverra sollicitudin dictum. Vivamus maximus dignissim lorem, vitae viverra erat dapibus a."
    label="Label text"
    onChange={(value) => console.log('onChange', value)}
    multiline
  />
)
```

### Multiline, with help

```tsx
render(
  <Field.String
    label="Label text"
    help={{
      title: 'Help is available',
      content: 'There is more happiness in giving than in receiving.',
    }}
    multiline
    onChange={(value) => console.log('onChange', value)}
  />
)
```

### TransformIn and TransformOut

```tsx
// From the Field (internal value) to the data context or event parameter
const transformOut = (value) => {
  return {
    value,
    foo: 'bar',
  }
}

// To the Field (from e.g. defaultValue)
// To the Field (from e.g. defaultValue)
const transformIn = (data) => {
  if (typeof data === 'string') {
    return data
  }
  return data?.value
}
const MyForm = () => {
  return (
    <Form.Handler onSubmit={console.log}>
      <Form.Card>
        <Field.String
          label="String field"
          path="/myValue"
          transformIn={transformIn}
          transformOut={transformOut}
          defaultValue="Default value"
        />

        <Value.String
          label="String value"
          path="/myValue"
          transformIn={transformIn}
          placeholder="(placeholder)"
          showEmpty
        />

        <Form.SubHeading>Data Context</Form.SubHeading>
        <Tools.Log />
      </Form.Card>
      <Form.SubmitButton />
    </Form.Handler>
  )
}
render(<MyForm />)
```

### Prevent typing of invalid characters

You can use the `onInput` property together with the `htmlAttributes` property to prevent typing of invalid characters.

```tsx
const forbiddenRegex = /\\d/
const onInput = (event: React.FormEvent<HTMLInputElement>) => {
  const inputEl = event.currentTarget
  const oldVal = inputEl.dataset.oldVal || ''
  const addedLength = inputEl.value.length - oldVal.length
  const caretStart = inputEl.selectionStart
  const selectionStart = parseFloat(inputEl.dataset.selectionStart)
  const selectionEnd = parseFloat(inputEl.dataset.selectionEnd)
  let inserted = ''
  if (selectionStart !== selectionEnd) {
    inserted = inputEl.value.substring(selectionStart, selectionEnd)
  } else {
    inserted = inputEl.value.substring(
      caretStart - addedLength,
      caretStart
    )
  }
  if (forbiddenRegex.test(inserted)) {
    inputEl.value = oldVal
    const { selectionStart, selectionEnd } = inputEl.dataset
    if (selectionStart !== selectionEnd) {
      inputEl.setSelectionRange(
        parseFloat(selectionStart),
        parseFloat(selectionEnd)
      )
    } else {
      inputEl.setSelectionRange(
        caretStart - addedLength,
        caretStart - addedLength
      )
    }
  }
  inputEl.dataset.oldVal = inputEl.value
}
const onFocus = (event: React.FormEvent<HTMLInputElement>) => {
  const inputEl = event.currentTarget
  if (typeof inputEl.dataset.oldVal === 'undefined') {
    inputEl.dataset.oldVal = inputEl.value
  }
}
const onSelect = (event: React.FormEvent<HTMLInputElement>) => {
  const inputEl = event.currentTarget
  inputEl.dataset.selectionStart = String(inputEl.selectionStart)
  inputEl.dataset.selectionEnd = String(inputEl.selectionEnd)
}
render(
  <Form.Handler onSubmit={console.log} onChange={console.log}>
    <Form.Card>
      <Field.String
        path="/myValue"
        label="You can't type numbers here"
        value="Existing value: 123"
        htmlAttributes={{
          onFocus,
          onInput,
          onSelect,
        }}
        autoComplete="off"
        required
      />
    </Form.Card>

    <Form.SubmitButton />
  </Form.Handler>
)
```

### Widths

```tsx
render(
  <Flex.Stack>
    <Field.String
      label="Default width (property omitted)"
      defaultValue="foo"
    />
    <Field.String label="Small" defaultValue="foo" width="small" />
    <Field.String label="Medium" defaultValue="foo" width="medium" />
    <Field.String label="Large" defaultValue="foo" width="large" />
    <Field.String label="Custom" defaultValue="foo" width="8rem" />
    <Field.String label="Stretch" defaultValue="foo" width="stretch" />

    <Field.String
      label="Default width (property omitted)"
      defaultValue="foo"
      multiline
    />
    <Field.String
      label="Small"
      defaultValue="foo"
      width="small"
      multiline
    />
    <Field.String
      label="Medium"
      defaultValue="foo"
      width="medium"
      multiline
    />
    <Field.String
      label="Large"
      defaultValue="foo"
      width="large"
      multiline
    />
    <Field.String
      label="Custom"
      defaultValue="foo"
      width="8rem"
      multiline
    />
    <Field.String
      label="Stretch"
      defaultValue="foo"
      width="stretch"
      multiline
    />
  </Flex.Stack>
)
```

## Properties

### Field-specific properties

```json
{
  "multiline": {
    "doc": "True to be able to write in multiple lines (switching from input-element to textarea-element).",
    "type": "boolean",
    "status": "optional"
  },
  "leftIcon": {
    "doc": "For icon at the left side of the text input. Only one of `leftIcon` or `rightIcon` can be used at the same time.",
    "type": "string",
    "status": "optional"
  },
  "rightIcon": {
    "doc": "For icon at the right side of the text input. Only one of `leftIcon` or `rightIcon` can be used at the same time.",
    "type": "string",
    "status": "optional"
  },
  "capitalize": {
    "doc": "When set to true, it will capitalize the first letter of every word, transforming the rest to lower case.",
    "type": "boolean",
    "status": "optional"
  },
  "trim": {
    "doc": "When true, it will trim leading and trailing whitespaces on blur, triggering `onChange` if the value changes.",
    "type": "boolean",
    "status": "optional"
  },
  "inputMode": {
    "doc": "Define an [inputmode](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/inputmode).",
    "type": "string",
    "status": "optional"
  },
  "autoComplete": {
    "doc": "For HTML [autocomplete](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete) attributes.",
    "type": ["on", "string"],
    "status": "optional"
  },
  "minLength": {
    "doc": "Validation for minimum length of the text (number of characters).",
    "type": "number",
    "status": "optional"
  },
  "maxLength": {
    "doc": "Validation for maximum length of the text (number of characters).",
    "type": "number",
    "status": "optional"
  },
  "pattern": {
    "doc": "Validation based on regex pattern.",
    "type": "string",
    "status": "optional"
  },
  "width": {
    "doc": "`false` for no width (use browser default), `small`, `medium` or `large` for predefined standard widths, `stretch` to fill available width.",
    "type": ["string", "false"],
    "status": "optional"
  },
  "size": {
    "doc": "The sizes you can choose is `default` (2rem), `medium` (2.5rem) and `large` (3rem) are supported component sizes. Defaults to `default` / `null`. Also, if you define a number like `size={2}` then it will be forwarded as the input element attribute. Consider rather setting field sizes with [Form.Appearance](/uilib/extensions/forms/Form/Appearance/).",
    "type": ["string", "number"],
    "status": "optional"
  },
  "align": {
    "doc": "Defines the text alignment of the input. Can be `left`, `right` or `center`. Defaults to `left`.",
    "type": "string",
    "status": "optional"
  },
  "selectall": {
    "doc": "If set to `true`, then the whole input value gets selected on the entry focus. A second click will place the cursor on the wanted position.",
    "type": "boolean",
    "status": "optional"
  },
  "clear": {
    "doc": "If set to `true`, then a clear button will be shown which lets the user clear any given input value.",
    "type": "boolean",
    "status": "optional"
  },
  "keepPlaceholder": {
    "doc": "Set to `true` in case the `placeholder` has to be kept during focus. By default, the placeholder disappears on focus.",
    "type": "boolean",
    "status": "optional"
  },
  "rows": {
    "doc": "To be used together with `multiline`. Set how many rows of text can be shown by default. Defaults to `2`.",
    "type": "number",
    "status": "optional"
  },
  "autoresizeMaxRows": {
    "doc": "To be used together with `multiline`. Set how many rows of text can be shown at max. Defaults to `6`.",
    "type": "number",
    "status": "optional"
  },
  "characterCounter": {
    "doc": "To be used together with `multiline`. Use a number to define the displayed max length e.g. `40` or `{ max: 40, variant: 'down' }`.",
    "type": ["number", "object"],
    "status": "optional"
  },
  "autoresize": {
    "doc": "To be used together with `multiline`. Set true to expand when writing longer texts. Defaults to `true`.",
    "type": "boolean",
    "status": "optional"
  },
  "inputClassName": {
    "doc": "Class name set on the <input> DOM element.",
    "type": "string",
    "status": "optional"
  },
  "innerRef": {
    "doc": "By providing a React.Ref we can get the internally used input element (DOM).",
    "type": "React.RefObject",
    "status": "optional"
  },
  "submitElement": {
    "doc": "Accepts a React element which will show up like the \"submit button\" would do on type=\"search\".",
    "type": "React.Element",
    "status": "optional"
  }
}
```

### General properties

```json
{
  "value": {
    "doc": "Source data value for the field. Will take precedence over the path value given in the data context.",
    "type": "{valueType}",
    "status": "optional"
  },
  "defaultValue": {
    "doc": "Default source data value for the field. Will not take precedence over the path value given in the data context.",
    "type": "{valueType}",
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
    "type": ["Error", "FormError", "Array<Error | FormError>", "function"],
    "status": "optional"
  },
  "disabled": {
    "doc": "Set `true` to show the field but without the possibility of changing the value.",
    "type": "boolean",
    "status": "optional"
  },
  "emptyValue": {
    "doc": "The value to use (in `onChange` events etc) when emptying the field. Makes it possible for instance to provide `undefined` instead of an empty string when clearing the content of a text input.",
    "type": ["{valueType}", "undefined"],
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
    "doc": "Field label to show above / before the input feature.",
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
    "StringField.errorMaxLength": {
      "nb-NO": "Verdien kan ikke være lengre enn {maxLength} tegn.",
      "en-GB": "The value cannot be longer than {maxLength} characters.",
      "sv-SE": "Värdet kan inte vara längre än {maxLength} tecken.",
      "da-DK": "Værdien må ikke være længere end {maxLength} tegn."
    },
    "StringField.errorMinLength": {
      "nb-NO": "Verdien kan ikke være kortere enn {minLength} tegn.",
      "en-GB": "The value cannot be shorter than {minLength} characters.",
      "sv-SE": "Värdet kan inte vara kortare än {minLength} tecken.",
      "da-DK": "Værdien må ikke være kortere end {minLength} tegn."
    }
  }
}
```

## Events

```json
{
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
```
