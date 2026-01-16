---
title: 'String'
description: '`Field.String` is the base component for receiving user input where the target data is of type `string`.'
metadata: https://eufemia.dnb.no/uilib/extensions/forms/base-fields/String/metadata.json
---

## Import

```tsx
import { Field } from '@dnb/eufemia/extensions/forms'
render(<Field.String />)
```

## Description

`Field.String` is the base component for receiving user input where the target data is of type `string`.

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
  />,
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
  </Form.Card>,
)
```

### Placeholder

```tsx
render(
  <Field.String
    label="Label text"
    placeholder="Enter a text..."
    onChange={(value) => console.log('onChange', value)}
  />,
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
  </Form.Card>,
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
  />,
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
  />,
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
  </Form.Card>,
)
```

### Clear

```tsx
render(
  <Field.String
    defaultValue="foo"
    onChange={(value) => console.log('onChange', value)}
    clear
  />,
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
  />,
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
  />,
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
  />,
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
  />,
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
  />,
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
  />,
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
  />,
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
              value.length < 5
                ? Error('At least 5 characters')
                : undefined,
            ),
          1500,
        ),
      )
    }
    onChange={(value) => console.log('onChange', value)}
  />,
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
  />,
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
              value.length < 5
                ? Error('At least 5 characters')
                : undefined,
            ),
          1500,
        ),
      )
    }
    onChange={(value) => console.log('onChange', value)}
  />,
)
```

### Multiline, empty

```tsx
render(
  <Field.String
    onChange={(value) => console.log('onChange', value)}
    multiline
  />,
)
```

### Multiline, placeholder

```tsx
render(
  <Field.String
    placeholder="Enter text here"
    onChange={(value) => console.log('onChange', value)}
    multiline
  />,
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
  />,
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
  />,
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
      caretStart,
    )
  }
  if (forbiddenRegex.test(inserted)) {
    inputEl.value = oldVal
    const { selectionStart, selectionEnd } = inputEl.dataset
    if (selectionStart !== selectionEnd) {
      inputEl.setSelectionRange(
        parseFloat(selectionStart),
        parseFloat(selectionEnd),
      )
    } else {
      inputEl.setSelectionRange(
        caretStart - addedLength,
        caretStart - addedLength,
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
  </Form.Handler>,
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
  </Flex.Stack>,
)
```
