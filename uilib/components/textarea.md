---
title: 'Textarea'
description: 'The Textarea component has to be used as a multi-line text input control with an unlimited number of characters possible.'
metadata: https://eufemia.dnb.no/uilib/components/textarea/metadata.json
---

## Import

```tsx
import { Textarea } from '@dnb/eufemia'
```

## Description

The Textarea component is a multi-line text input control with an unlimited number of characters.

## Relevant links

- [Figma](https://www.figma.com/design/cdtwQD8IJ7pTeE45U148r1/%F0%9F%92%BB-Eufemia---Web?node-id=40922-2303)
- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/textarea)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/textarea)

### Browser autofill styling

When users insert values using autofill in their browser, the browser applies its own background and text colors. However, in contrast to the [Input](/uilib/components/input/info) component, Eufemia overwrites the `:autofill` background color to avoid a visually inconsistent gap around the writing area when autofill is used.

### Accessibility

Please avoid using the `maxlength` attribute whenever possible, as it is not accessible. Instead, use the `characterCounter` property.

This way, the user gets visual feedback on the number of characters entered and the maximum number of characters allowed, and it will not limit the user in their workflow.

You can still set the requirement for your desired maximum number of characters by setting the `maxLength` property in [Eufemia Forms](/uilib/extensions/forms/base-fields/String/).

```tsx
render(
  <Wrapper>
    <ComponentBox hideCode>
      <Form.Handler>
        <Form.Card>
          <Field.String
            label="Label"
            placeholder="Write more than 3 characters to demonstrate the limit"
            multiline
            maxLength={3}
            required
            characterCounter={{
              max: 3,
              variant: 'up',
            }}
          />
          <Form.SubmitButton text="Test" />
        </Form.Card>
      </Form.Handler>
    </ComponentBox>
  </Wrapper>,
)
```

## Demos

### Textarea with rows and colds

```tsx
render(
  <Wrapper>
    <ComponentBox data-visual-test="textarea-default">
      <Textarea
        label="Default"
        rows="2"
        cols="20"
        value="Textarea value\nNewline"
        spellCheck={false}
        on_change={({ value }) => {
          console.log('on_change', value)
        }}
        on_focus={() => {
          console.log('on_focus')
        }}
        on_blur={() => {
          console.log('on_blur')
        }}
      />
    </ComponentBox>
  </Wrapper>,
)
```

### Textarea with placeholder text

```tsx
render(
  <Wrapper>
    <ComponentBox>
      <Textarea label="Placeholder" placeholder="Placeholder text" />
    </ComponentBox>
  </Wrapper>,
)
```

### Vertically placed label

```tsx
render(
  <Wrapper>
    <ComponentBox>
      <Textarea
        label="Vertical"
        label_direction="vertical"
        rows="3"
        cols="33"
        value="Textarea value with more than 3 lines\nNewline\nNewline\nNewline\nNewline"
      />
    </ComponentBox>
  </Wrapper>,
)
```

### Stretched horizontally placed label

```tsx
render(
  <Wrapper>
    <ComponentBox data-visual-test="textarea-stretch">
      <Textarea
        label="Horizontal"
        stretch={true}
        rows="3"
        value="Nec litora inceptos vestibulum id interdum donec gravida."
      />
    </ComponentBox>
  </Wrapper>,
)
```

### Autoresize with max rows

```tsx
render(
  <Wrapper>
    <ComponentBox>
      <Textarea
        label="Autogrow"
        rows={1}
        autoresize={true}
        autoresize_max_rows={4}
        placeholder="Placeholder"
        on_key_down={({ rows, event }) => {
          if (rows >= 4 && event.key === 'Enter') {
            event.preventDefault()
          }
        }}
      />
    </ComponentBox>
  </Wrapper>,
)
```

### Character counter

Internally, the [TextCounter](/uilib/components/fragments/text-counter/) fragment is used to display the character counter.

```tsx
render(
  <Wrapper>
    <ComponentBox data-visual-test="textarea-character-counter">
      <Textarea
        label="Count characters"
        label_direction="vertical"
        autoresize
        value="Textarea value\nNewline"
        status="Message to the user"
        characterCounter={40}
      />
    </ComponentBox>
  </Wrapper>,
)
```

### With FormStatus failure message

```tsx
render(
  <Wrapper>
    <ComponentBox data-visual-test="textarea-error">
      <Textarea
        label="Error Message"
        cols="33"
        value="Nec litora inceptos vestibulum id interdum donec gravida."
        status="Message to the user"
      />
    </ComponentBox>
  </Wrapper>,
)
```

### Sizes

```tsx
render(
  <Wrapper>
    <ComponentBox data-visual-test="textarea-sizes">
      <Flex.Stack>
        <Textarea placeholder="Small size" size="small" rows={1} />
        <Textarea placeholder="Medium size" size="medium" rows={1} />
        <Textarea placeholder="Large size" size="large" rows={1} />
      </Flex.Stack>
    </ComponentBox>
  </Wrapper>,
)
```

### Disabled textarea

```tsx
render(
  <Wrapper>
    <ComponentBox>
      <Textarea
        label="Disabled"
        disabled
        value="Nec litora inceptos vestibulum id interdum donec gravida."
      />
    </ComponentBox>
  </Wrapper>,
)
```

### Textarea with a suffix

```tsx
render(
  <Wrapper>
    <ComponentBox>
      <Textarea
        label="Textarea with suffix"
        value="Nec litora inceptos vestibulum id interdum donec gravida."
        suffix={<HelpButton title="Modal Title">Modal content</HelpButton>}
      />
    </ComponentBox>
  </Wrapper>,
)
```
