---
title: 'ValueBlock'
description: '`ValueBlock` is a reusable wrapper component that can be used to easily create custom Value-components that will display in the same way as other Value-components.'
metadata: https://eufemia.dnb.no/uilib/extensions/forms/create-component/ValueBlock/metadata.json
---

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
  </P>,
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
  </ValueBlock>,
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
  </ValueBlock>,
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
  </Flex.Stack>,
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
  </Flex.Stack>,
)
```
