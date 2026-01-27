---
title: 'ValueBlock'
description: '`ValueBlock` is a reusable wrapper component that can be used to easily create custom Value-components that will display in the same way as other Value-components.'
version: 10.95.1
generatedAt: 2026-01-27T13:53:28.280Z
checksum: 090b7d977ba4be5e2c4c04d199a30a4048416c59f443a56985df2f80629d9c40
---

# ValueBlock

## Import

```tsx
import { ValueBlock } from '@dnb/eufemia/extensions/forms'
render(<ValueBlock />)
```

## Description

`ValueBlock` is a reusable wrapper for building [Value](/uilib/extensions/forms/Value) components.

```tsx
import { ValueBlock } from '@dnb/eufemia/extensions/forms'

const MyValueComponent = ({ value }) => (
  <ValueBlock label="Label">{value}</ValueBlock>
)
```

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/create-component/ValueBlock)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/create-component/ValueBlock)

Check out the docs for the [useValueProps](/uilib/extensions/forms/create-component/useValueProps/) hook. It will connect your value component to the data context.

For combining several value components into one, you can use [Value.Composition](/uilib/extensions/forms/Value/Composition/).

## Demos

```tsx
render(<ValueBlock label="Label text">Data-value goes here</ValueBlock>)
```

### Inline

```tsx
render(
  <P>
    this is before the value <ValueBlock inline>Foo</ValueBlock>{' '}
    <ValueBlock inline>Bar</ValueBlock> this is after the value
  </P>
)
```

## Help button

```tsx
render(
  <ValueBlock
    label="Label text"
    help={{
      title: 'Help title',
      content: 'Help content',
    }}
  >
    Data-value goes here
  </ValueBlock>
)
```

## Help button with HTML

```tsx
render(
  <ValueBlock
    label="Label text with a long label label – lorem ipsum
        dolor sit"
    help={{
      open: true,
      title: <strong>Help title</strong>,
      content: (
        <>
          Help content with a <Anchor href="/">Anchor</Anchor>.
        </>
      ),
    }}
  >
    Data-value goes here – lorem ipsum dolor sit amet consectetur.
  </ValueBlock>
)
```

### Widths

```tsx
render(
  <Flex.Stack>
    <ValueBlock label="No maxWidth: This label is long so we can validate that the label can be longer until it will wrap.">
      <TestElement>
        This content is long so we can see the maxWidth defined. It should
        wrap at a certain amount of characters.
      </TestElement>
    </ValueBlock>
    <ValueBlock
      label="maxWidth='small': This label is long so we can validate that the label can be longer."
      maxWidth="small"
    >
      <TestElement>
        This content is long so we can see the maxWidth defined. It should
        wrap at a certain amount of characters.
      </TestElement>
    </ValueBlock>
    <ValueBlock
      label="maxWidth='medium': This label is long so we can validate that the label can be longer."
      maxWidth="medium"
    >
      <TestElement>
        This content is long so we can see the maxWidth defined. It should
        wrap at a certain amount of characters.
      </TestElement>
    </ValueBlock>
    <ValueBlock
      label="maxWidth='large': This label is long so we can validate that the label can be longer."
      maxWidth="large"
    >
      <TestElement>
        This content is long so we can see the maxWidth defined. It should
        wrap at a certain amount of characters.
      </TestElement>
    </ValueBlock>
    <ValueBlock
      label="maxWidth='auto': This label is long so we can validate that the label can be longer."
      maxWidth="auto"
    >
      <TestElement>
        This content is long so we can see the maxWidth defined. It should
        wrap at a certain amount of characters.
      </TestElement>
    </ValueBlock>
  </Flex.Stack>
)
```

```tsx
render(
  <Flex.Stack>
    <Form.Card>
      <Form.SubHeading>Breaking word with 61 characters</Form.SubHeading>
      <ValueBlock label={sixtyOneChars}>{sixtyOneChars}</ValueBlock>
      <ValueBlock
        label={sixtyOneChars}
        help={{
          title: 'Help title',
          content: 'Help content',
        }}
      >
        {sixtyOneChars}
      </ValueBlock>
    </Form.Card>
    <Form.Card>
      <Form.SubHeading>
        Breaking a sentence of 61 characters that include a space
      </Form.SubHeading>
      <ValueBlock label={sixtyOneCharsIncludingASpace}>
        {sixtyOneCharsIncludingASpace}
      </ValueBlock>
      <ValueBlock
        label={sixtyOneCharsIncludingASpace}
        help={{
          title: 'Help title',
          content: 'Help content',
        }}
      >
        {sixtyOneCharsIncludingASpace}
      </ValueBlock>
    </Form.Card>
    <Form.Card>
      <Form.SubHeading>Help button should not wrap alone</Form.SubHeading>
      <ValueBlock
        label={fiftyEightCharsIncludingASpace}
        help={{
          title: 'Help title',
          content: 'Help content',
        }}
      >
        {'value'}
      </ValueBlock>
    </Form.Card>
  </Flex.Stack>
)
```

## Properties

```json
{
  "props": {
    "value": {
      "doc": "Value for the value component. Will take precedence over the path value given in the data context.",
      "type": "{valueType}",
      "status": "optional"
    },
    "defaultValue": {
      "doc": "Default value for the value component. Will not take precedence over the path value given in the data context.",
      "type": "{valueType}",
      "status": "optional"
    },
    "label": {
      "doc": "Field label to show above the displayed value.",
      "type": "string",
      "status": "optional"
    },
    "labelSrOnly": {
      "doc": "Use `true` to make the label only readable by screen readers.",
      "type": "boolean",
      "status": "optional"
    },
    "help": {
      "doc": "Provide help content for the field using `title` and `content` as a string or React.Node. Additionally, you can set `open` to `true` to display the inline help, set the `breakout` property to `false` to disable the breakout of the inline help content, set `outset` to `false` to display the help text inline (inset) instead of the default outset behavior, or use `renderAs` set to `dialog` to render the content in a [Dialog](/uilib/components/dialog/) (recommended for larger amounts of content).",
      "type": "object",
      "status": "optional"
    },
    "transformLabel": {
      "doc": "Transforms the label before it gets displayed. Receives the label as the first parameter. The second parameter is a object containing the `convertJsxToString` function.",
      "type": "function",
      "status": "optional"
    },
    "inheritLabel": {
      "doc": "Use `true` to inherit the label from a visible (rendered) field with the same path.",
      "type": "boolean",
      "status": "optional"
    },
    "inheritVisibility": {
      "doc": "Use `true` to inherit the visibility from a field with the same path. You can find more info in the [Value section](/uilib/extensions/forms/Value/#inherit-visibility-from-fields-based-on-path).",
      "type": "boolean",
      "status": "optional"
    },
    "showEmpty": {
      "doc": "Shows the value even if it is empty.",
      "type": "boolean",
      "status": "optional"
    },
    "placeholder": {
      "doc": "Text showing in place of the value if no value is given.",
      "type": "string",
      "status": "optional"
    },
    "path": {
      "doc": "JSON Pointer for where the data for this input is located in the source dataset.",
      "type": "string",
      "status": "optional"
    },
    "inline": {
      "doc": "For showing the value inline (not as a block element).",
      "type": "boolean",
      "status": "optional"
    },
    "maxWidth": {
      "doc": "Use `auto` for no max-width (use browser default), `small`, `medium` or `large` for predefined standard max widths. Defaults to `large`.",
      "type": "string",
      "status": "optional"
    },
    "transformIn": {
      "doc": "Transforms the `value` before its displayed in the value component.",
      "type": "function",
      "status": "optional"
    },
    "[Space](/uilib/layout/space/properties)": {
      "doc": "Spacing properties like `top` or `bottom` are supported.",
      "type": ["string", "object"],
      "status": "optional"
    }
  }
}
```
