---
title: 'Value.Composition'
description: '`Value.Composition` combines two or more `Value.*` components into one.'
version: 10.95.0
generatedAt: 2026-01-26T10:49:27.095Z
checksum: af2bf29c5ffe27f01dc450b22520080d7fdbecb1580e2ed22b59dc70c7e8062f
---

# Value.Composition

## Import

```tsx
import { Value } from '@dnb/eufemia/extensions/forms'
render(<Value.Composition />)
```

## Description

`Value.Composition` combines two or more `Value.*` components into one.

By default, they will be placed in a horizontal layout. When rendered on a small screen and the Composition contains Values with labels, they will be placed in a vertical layout.

There is a corresponding [Field.Composition](/uilib/extensions/forms/base-fields/Composition/) component that can be used for [field](/uilib/extensions/forms/all-fields/) components.

```jsx
import { Value } from '@dnb/eufemia/extensions/forms'

render(
  <Value.Composition label="Label">
    <Value.String label="First" path="/first" />
    <Value.String label="Second" path="/second" />
  </Value.Composition>
)
```

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Value/Composition)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/Value/Composition)

## Accessibility

When you combine multiple `Value.*` components together, consider enclosing them within the [SummaryList](/uilib/extensions/forms/Value/SummaryList/) component. This component offers a standardized approach for presenting labels and values within an accessible definition list structure.

## Demos

### Basic usage

```tsx
render(
  <Value.Composition>
    <Value.String label="Label A" value="value" />
    <Value.Number label="Label B" value={123} />
  </Value.Composition>
)
```

### In SummaryList

```tsx
render(
  <Value.SummaryList>
    <Value.Composition label="Label">
      <Value.String value="value" />
      <Value.Number value={123} />
    </Value.Composition>
  </Value.SummaryList>
)
```

### Inside a plain SummaryList

```tsx
render(
  <Form.Handler
    data={{
      firstName: 'John',
      lastName: 'Doe',
      streetName: 'Øvraørnefjeddstakkslåttåveien',
      streetNr: 9998,
      streetId: 'H0301',
      postalCode: '9713',
      city: 'Russenes',
    }}
  >
    <Form.Card>
      <Form.SubHeading>Subheading</Form.SubHeading>

      <Value.SummaryList>
        <Value.Composition label="Name">
          <Value.String path="/firstName" />
          <Value.String path="/lastName" />
        </Value.Composition>

        <Value.Composition label="Street">
          <Value.String path="/streetName" />
          <Value.Number path="/streetNr" />
          <Value.String path="/streetId" />
        </Value.Composition>

        <Value.Composition label="City">
          <Value.String path="/postalCode" />
          <Value.String path="/city" />
        </Value.Composition>
      </Value.SummaryList>
    </Form.Card>
  </Form.Handler>
)
```

### Inside a SummaryList with grid layout

```tsx
render(
  <Form.Handler
    data={{
      firstName: 'John',
      lastName: 'Doe',
      streetName: 'Øvraørnefjeddstakkslåttåveien',
      streetNr: 9998,
      streetId: 'H0301',
      postalCode: '9713',
      city: 'Russenes',
    }}
  >
    <Form.Card>
      <Form.SubHeading>Subheading</Form.SubHeading>

      <Value.SummaryList layout="grid">
        <Value.Composition label="Name">
          <Value.Name.First path="/firstName" />
          <Value.Name.Last path="/lastName" />
        </Value.Composition>

        <Value.Composition label="Street">
          <Value.String path="/streetName" />
          <Value.Number path="/streetNr" />
          <Value.String path="/streetId" />
        </Value.Composition>

        <Value.PostalCodeAndCity
          postalCode={{
            path: '/postalCode',
          }}
          city={{
            path: '/city',
          }}
        />
      </Value.SummaryList>
    </Form.Card>
  </Form.Handler>
)
```

### Width comparison

```tsx
render(
  <Value.Composition gap="large">
    <Value.String
      maxWidth="medium"
      label="Medium maxWidth"
      value="Nam sed aliquet nunc. Pellentesque condimentum enim arcu."
    />
    <Value.String
      label="Without a width"
      value="Nam sed aliquet nunc. Pellentesque condimentum enim arcu."
    />
  </Value.Composition>
)
```

### With help

```tsx
render(
  <Flex.Stack>
    <Value.Composition
      label="Label with help"
      help={{
        title: 'Hva betyr lånebeløp?',
        content: 'Dette er hvor mye du har tenkt å låne totalt.',
      }}
    >
      <Value.String value="value" />
      <Value.Number value={123} />
    </Value.Composition>

    <Form.Card>
      <Value.SummaryList>
        <Value.Composition
          label="Label with help inside SummaryList"
          help={{
            title: 'Hva betyr lånebeløp?',
            content: 'Dette er hvor mye du har tenkt å låne totalt.',
          }}
        >
          <Value.String value="value" />
          <Value.Number value={123} />
        </Value.Composition>
        <Value.String value="Another value" />
      </Value.SummaryList>
    </Form.Card>
  </Flex.Stack>
)
```

```tsx
render(
  <Flex.Stack>
    <Form.Card>
      <Form.SubHeading>Breaking word with 61 characters</Form.SubHeading>
      <Value.Composition label={sixtyOneChars}>
        <Value.String value={sixtyOneChars} />
        <Value.String value={sixtyOneChars} />
      </Value.Composition>
      <Value.Composition
        label={sixtyOneChars}
        help={{
          title: 'Help title',
          content: 'Help content',
        }}
      >
        <Value.String value={sixtyOneChars} />
        <Value.String value={sixtyOneChars} />
      </Value.Composition>
    </Form.Card>
    <Form.Card>
      <Form.SubHeading>
        Breaking a sentence of 61 characters that include a space
      </Form.SubHeading>
      <Value.Composition label={sixtyOneCharsIncludingASpace}>
        <Value.String value={sixtyOneCharsIncludingASpace} />
        <Value.String value={sixtyOneCharsIncludingASpace} />
      </Value.Composition>
      <Value.Composition
        label={sixtyOneCharsIncludingASpace}
        help={{
          title: 'Help title',
          content: 'Help content',
        }}
      >
        <Value.String value={sixtyOneCharsIncludingASpace} />
        <Value.String value={sixtyOneCharsIncludingASpace} />
      </Value.Composition>
    </Form.Card>
    <Form.Card>
      <Form.SubHeading>Help button should not wrap alone</Form.SubHeading>
      <Value.Composition
        label={fiftyEightCharsIncludingASpace}
        help={{
          title: 'Help title',
          content: 'Help content',
        }}
      >
        <Value.String value={'value'} />
        <Value.String value={'value'} />
      </Value.Composition>
    </Form.Card>
  </Flex.Stack>
)
```

## Properties

```json
{
  "label": {
    "doc": "Field label to show above the displayed value.",
    "type": "string",
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
  "maxWidth": {
    "doc": "Use `small`, `medium` or `large` for predefined standard max widths. Defaults to `auto`.",
    "type": "string",
    "status": "optional"
  },
  "gap": {
    "doc": "The gap between the different value blocks. Can be `xx-small`, `x-small`, `small`, `medium`, `large` or `false`. Defaults to `xx-small`.",
    "type": "string",
    "status": "optional"
  }
}
```
