---
title: 'FieldBlock'
description: '`FieldBlock` is a reusable wrapper for building Field-components. It shows surrounding elements through properties from `FieldProps` like `label` and `error`.'
metadata: https://eufemia.dnb.no/uilib/extensions/forms/create-component/FieldBlock/metadata.json
---

## Import

```tsx
import { FieldBlock } from '@dnb/eufemia/extensions/forms'
render(<FieldBlock />)
```

## Description

`FieldBlock` is a reusable wrapper [for building](/uilib/extensions/forms/create-component/) interactive [Field](/uilib/extensions/forms/feature-fields) components.

It shows surrounding elements through properties from `FieldProps` like `label` and `error`, and ensure that spacing between different fields work as required when put into surrounding components like [Flex.Container](/uilib/layout/flex/container/) or [Form.Card](/uilib/extensions/forms/Form/Card/).

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/create-component/FieldBlock)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/create-component/FieldBlock)

It can also be used to group multiple inner FieldBlock components, composing status (error) messages together as one component. Check out the [Field.Composition](/uilib/extensions/forms/base-fields/Composition/) docs for that.

```tsx
import { FieldBlock } from '@dnb/eufemia/extensions/forms'

const YourFieldComponent = () => {
  return (
    <FieldBlock
      forId="unique-id"
      label="A label"
      info="Info at the bottom"
    >
      <Input id="unique-id" />
    </FieldBlock>
  )
}
```

More information about the usage can be found in the [create your own component](/uilib/extensions/forms/create-component/) section.

## Demos

### Label only (default layout)

```tsx
render(
  <FieldBlock label="Label text">Input features goes here</FieldBlock>,
)
```

### With info

```tsx
render(
  <FieldBlock label="Label text" info="For your information">
    Input features goes here
  </FieldBlock>,
)
```

### Label size

```tsx
render(
  <Form.Handler>
    <Flex.Stack>
      <Form.MainHeading>Heading</Form.MainHeading>
      <FieldBlock
        label="Legend with medium heading size"
        labelSize="medium"
      >
        <Field.String
          label="Label with a long text that goes beyond the field"
          width="medium"
        />
      </FieldBlock>
    </Flex.Stack>
  </Form.Handler>,
)
```

### Horizontal layout

```tsx
render(
  <FieldBlock label="Label text" layout="horizontal">
    Input features goes here
  </FieldBlock>,
)
```

### Horizontal layout with info

```tsx
render(
  <FieldBlock
    label="Label text"
    layout="horizontal"
    info="For your information"
  >
    Input features goes here
  </FieldBlock>,
)
```

### With label and label description (vertical only)

```tsx
render(
  <FieldBlock label="Label text" labelDescription="Description text">
    Input features goes here
  </FieldBlock>,
)
```

### With label description (vertical only)

```tsx
render(
  <FieldBlock labelDescription="Description text">
    Input features goes here
  </FieldBlock>,
)
```

### Responsive forms

```tsx
render(
  <FieldBlock label="Label">
    <Flex.Container>
      <Flex.Item
        size={{
          small: 12,
          large: 'auto',
        }}
      >
        <Field.Name.First path="/firstName" width="medium" minLength={2} />
      </Flex.Item>
      <Flex.Item
        size={{
          small: 12,
          large: 'auto',
        }}
      >
        <Field.Name.Last path="/lastName" width="medium" required />
      </Flex.Item>
      <Flex.Item
        size={{
          small: 12,
          large: 'auto',
        }}
      >
        <FieldBlock width="large">
          <Slider
            min={1900}
            max={new Date().getFullYear()}
            step={1}
            value={2010}
            label="Birth year"
            label_direction="vertical"
            tooltip
            alwaysShowTooltip
          />
        </FieldBlock>
      </Flex.Item>
    </Flex.Container>
  </FieldBlock>,
)
```

### Combine error messages

Error messages from all fields inside the FieldBlock are combined as one message below the whole block

```tsx
render(
  <Field.Composition>
    <Field.Number
      width="small"
      label="Number"
      value={99}
      minimum={100}
      validateInitially
    />
    <Field.String
      width="medium"
      label="Text"
      value="Text"
      minLength={5}
      validateInitially
    />
  </Field.Composition>,
)
```

### Inline help button (vertical only)

```tsx
render(
  <Flex.Stack>
    <Field.String
      label="Ønsket lånebeløp"
      help={{
        title: 'Hva betyr lånebeløp?',
        content: (
          <>
            Dette er hvor mye du har tenkt å låne{' '}
            <Anchor href="#test">totalt</Anchor>.
          </>
        ),
      }}
      onChange={async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000))
      }}
    />
    <Field.String
      label="Ønsket lånebeløp"
      multiline
      rows={3}
      help={{
        title: 'Hva betyr lånebeløp?',
        content: 'Dette er hvor mye du har tenkt å låne totalt.',
      }}
    />
  </Flex.Stack>,
)
```

### Inline help button (with label and label description)

```tsx
render(
  <Flex.Stack>
    <Field.String
      label="Ønsket lånebeløp"
      labelDescription="Description Nisi ad ullamco ut anim proident sint eiusmod."
      help={{
        title: 'Hva betyr lånebeløp?',
        content: 'Dette er hvor mye du har tenkt å låne totalt.',
      }}
      onChange={async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000))
      }}
    />
    <Field.String
      label="Ønsket lånebeløp"
      labelDescription="Description"
      multiline
      rows={3}
      help={{
        open: true,
        title: 'Hva betyr lånebeløp?',
        content: 'Dette er hvor mye du har tenkt å låne totalt.',
      }}
    />
  </Flex.Stack>,
)
```

### Inline help button (with label description)

```tsx
render(
  <Flex.Stack>
    <Field.String
      labelDescription="Description Nisi ad ullamco ut anim proident sint eiusmod."
      help={{
        title: 'Hva betyr lånebeløp?',
        content: 'Dette er hvor mye du har tenkt å låne totalt.',
      }}
      onChange={async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000))
      }}
    />
    <Field.String
      labelDescription="Description"
      multiline
      rows={3}
      help={{
        open: true,
        title: 'Hva betyr lånebeløp?',
        content: 'Dette er hvor mye du har tenkt å låne totalt.',
      }}
    />
  </Flex.Stack>,
)
```

### Inline help button (vertical label description)

```tsx
render(
  <Form.Card>
    <Field.String
      label="Ønsket lånebeløp"
      labelDescription="Description"
      help={{
        title: 'Hva betyr lånebeløp?',
        content: 'Dette er hvor mye du har tenkt å låne totalt.',
      }}
      onChange={async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000))
      }}
    />
    <Field.String
      label="Ønsket lånebeløp"
      labelDescription="Description"
      multiline
      rows={3}
      help={{
        open: true,
        title: 'Hva betyr lånebeløp?',
        content: 'Dette er hvor mye du har tenkt å låne totalt.',
      }}
    />
  </Form.Card>,
)
```

### Inline help button (horizontal label)

```tsx
render(
  <Form.Card>
    <Field.String
      label="Ønsket lånebeløp"
      layout="horizontal"
      help={{
        open: true,
        title: 'Hva betyr lånebeløp?',
        content: 'Dette er hvor mye du har tenkt å låne totalt.',
      }}
      info="Info message"
      onChange={async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000))
      }}
    />
    <Field.String
      label="Ønsket lånebeløp"
      layout="horizontal"
      layoutOptions={{
        width: '8rem',
      }}
      help={{
        title: 'Hva betyr lånebeløp?',
        content: 'Dette er hvor mye du har tenkt å låne totalt.',
      }}
      info="Info message"
    />
    <Field.String
      label="Ønsket lånebeløp"
      layout="horizontal"
      layoutOptions={{
        width: '8rem',
      }}
      multiline
      rows={3}
      help={{
        title: 'Hva betyr lånebeløp?',
        content: 'Dette er hvor mye du har tenkt å låne totalt.',
      }}
      info="Info message"
    />
  </Form.Card>,
)
```

### Inline help button (composition fields)

```tsx
render(
  <Form.Card>
    <Field.Composition label="Field.Composition" width="large">
      <Field.String
        width="medium"
        label="Label"
        help={{
          title: 'Hva betyr lånebeløp? ',
          content: 'Dette er hvor mye du har tenkt å låne totalt.',
        }}
      />
      <Field.String
        width="stretch"
        label="Label"
        help={{
          title: 'Hva betyr lånebeløp? ',
          content: 'Dette er hvor mye du har tenkt å låne totalt.',
        }}
      />
    </Field.Composition>
    <Field.PostalCodeAndCity
      help={{
        title: 'Hva betyr lånebeløp? ',
        content: 'Dette er hvor mye du har tenkt å låne totalt.',
      }}
    />
    <Field.PhoneNumber
      help={{
        open: true,
        title: 'Hva betyr lånebeløp? ',
        content: 'Dette er hvor mye du har tenkt å låne totalt.',
      }}
    />
  </Form.Card>,
)
```

### Inline help button with HTML

```tsx
render(
  <Flex.Stack>
    <Field.String
      label={<strong>Ønsket lånebeløp</strong>}
      labelDescription={
        <span>
          Label description with a <Anchor href="/">Anchor</Anchor>
        </span>
      }
      help={{
        open: true,
        title: <strong>Help title</strong>,
        content: (
          <>
            Help content with a <Anchor href="/">Anchor</Anchor>.
          </>
        ),
      }}
      onChange={async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000))
      }}
    />
  </Flex.Stack>,
)
```

### Widths

```tsx
render(
  <Flex.Stack>
    <FieldBlock label="Default width (no width props). This label is long so we can validate that the label can be longer.">
      <TestElement>Contents</TestElement>
    </FieldBlock>
    <FieldBlock label="Small (affects outer block element)." width="small">
      <TestElement>Contents</TestElement>
    </FieldBlock>
    <FieldBlock
      label="Medium (affects outer block element)."
      width="medium"
    >
      <TestElement>Contents</TestElement>
    </FieldBlock>
    <FieldBlock label="Large (affects outer block element)." width="large">
      <TestElement>Contents</TestElement>
    </FieldBlock>
    <FieldBlock label="Custom (affects outer block element)." width="8rem">
      <TestElement>Contents</TestElement>
    </FieldBlock>
    <FieldBlock
      label="Stretch (affects outer block element). This label is long so we can validate that the label also stretches full width."
      width="stretch"
    >
      <TestElement>Contents</TestElement>
    </FieldBlock>

    <FieldBlock
      label="Small (affects contents only). This label is long so we can validate that the label can be longer."
      contentWidth="small"
    >
      <TestElement>Contents</TestElement>
    </FieldBlock>
    <FieldBlock
      label="Medium (affects contents only). This label is long so we can validate that the label can be longer."
      contentWidth="medium"
    >
      <TestElement>Contents</TestElement>
    </FieldBlock>
    <FieldBlock
      label="Large (affects contents only). This label is long so we can validate that the label can be longer."
      contentWidth="large"
    >
      <TestElement>Contents</TestElement>
    </FieldBlock>
    <FieldBlock
      label="Custom (affects contents only). This label is long so we can validate that the label can be longer."
      contentWidth="8rem"
    >
      <TestElement>Contents</TestElement>
    </FieldBlock>
    <FieldBlock
      label="Stretch (affects contents only). This label is long so we can validate that the label can be longer."
      contentWidth="stretch"
    >
      <TestElement>Contents</TestElement>
    </FieldBlock>

    <Flex.Horizontal gap={false}>
      <FieldBlock
        width="stretch"
        style={{
          backgroundColor: 'var(--color-mint-green)',
        }}
      >
        Left content
      </FieldBlock>
      <FieldBlock
        width="stretch"
        style={{
          backgroundColor: 'var(--color-pistachio)',
        }}
      >
        Right content
      </FieldBlock>
    </Flex.Horizontal>
  </Flex.Stack>,
)
```

```tsx
render(
  <FieldBlock layout="horizontal" composition width="large">
    <Field.String label="Foo" width="medium" />
    <Field.String label="Bar" width="medium" />
  </FieldBlock>,
)
```

```tsx
render(
  <Flex.Stack>
    <Form.Card>
      <Form.SubHeading>Breaking word with 61 characters</Form.SubHeading>
      <FieldBlock label={sixtyOneChars}>value</FieldBlock>
      <FieldBlock
        label={sixtyOneChars}
        help={{
          title: 'Help title',
          content: 'Help content',
        }}
      >
        value
      </FieldBlock>
    </Form.Card>
    <Form.Card>
      <Form.SubHeading>
        Breaking a sentence of 61 characters that include a space
      </Form.SubHeading>
      <FieldBlock label={sixtyOneCharsIncludingASpace}>value</FieldBlock>
      <FieldBlock
        label={sixtyOneCharsIncludingASpace}
        help={{
          title: 'Help title',
          content: 'Help content',
        }}
      >
        value
      </FieldBlock>
    </Form.Card>
    <Form.Card>
      <Form.SubHeading>Help button should not wrap alone</Form.SubHeading>
      <FieldBlock
        label={fiftyEightCharsIncludingASpace}
        help={{
          title: 'Help title',
          content: 'Help content',
        }}
      >
        value
      </FieldBlock>
    </Form.Card>
  </Flex.Stack>,
)
```

```tsx
render(
  <Flex.Stack>
    <Form.Card>
      <Form.SubHeading>Breaking word with 68 characters</Form.SubHeading>
      <FieldBlock labelDescription={sixtyEightChars}>value</FieldBlock>
      <FieldBlock
        labelDescription={sixtyEightChars}
        help={{
          title: 'Help title',
          content: 'Help content',
        }}
      >
        value
      </FieldBlock>
    </Form.Card>
    <Form.Card>
      <Form.SubHeading>
        Breaking a sentence of 68 characters that include a space
      </Form.SubHeading>
      <FieldBlock labelDescription={sixtyEightCharsIncludingASpace}>
        value
      </FieldBlock>
      <FieldBlock
        labelDescription={sixtyEightCharsIncludingASpace}
        help={{
          title: 'Help title',
          content: 'Help content',
        }}
      >
        value
      </FieldBlock>
    </Form.Card>
    <Form.Card>
      <Form.SubHeading>Help button should not wrap alone</Form.SubHeading>
      <FieldBlock
        labelDescription={sixtyFiveCharsIncludingASpace}
        help={{
          title: 'Help title',
          content: 'Help content',
        }}
      >
        value
      </FieldBlock>
    </Form.Card>
  </Flex.Stack>,
)
```
