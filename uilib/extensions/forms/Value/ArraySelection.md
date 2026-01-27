---
title: 'Value.ArraySelection'
description: '`Value.ArraySelection` is a wrapper component for displaying string values, with user experience tailored for an array of selected values.'
version: 10.95.1
generatedAt: 2026-01-27T13:53:27.874Z
checksum: f12df0403993f342663e615901d7bfd301426d2474518338f5240f45e61f8d41
---

# Value.ArraySelection

## Import

```tsx
import { Value } from '@dnb/eufemia/extensions/forms'
render(<Value.ArraySelection />)
```

## Description

`Value.ArraySelection` is a wrapper component for displaying string values, with user experience tailored for an array of selected values.

Before using this component, ensure there is not a more specific [value component](/uilib/extensions/forms/Value/components/) available that better suits your needs.

There is a corresponding [Field.ArraySelection](/uilib/extensions/forms/base-fields/ArraySelection) component.

```jsx
import { Value } from '@dnb/eufemia/extensions/forms'
render(<Value.ArraySelection />)
```

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Value/ArraySelection)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/Value/ArraySelection)

## Demos

### Placeholder

```tsx
render(<Value.ArraySelection placeholder="No value given" />)
```

### Value

```tsx
render(<Value.ArraySelection value={['Foo', 'Bar', 'Baz']} />)
```

### Custom format

```tsx
render(
  <Form.Handler
    locale="en-GB"
    data={{
      myPath: [123, 456, 789],
    }}
  >
    <Value.ArraySelection
      path="/myPath"
      format={{
        type: 'disjunction',
      }}
    />
  </Form.Handler>
)
```

### Label

```tsx
render(<Value.ArraySelection label="Label text" showEmpty />)
```

### Label and value

```tsx
render(
  <Value.ArraySelection label="Label text" value={['Foo', 'Bar', 'Baz']} />
)
```

### Inline

```tsx
render(
  <P>
    This is before the component{' '}
    <Value.ArraySelection value={['Foo', 'Bar', 'Baz']} inline /> This is
    after the component
  </P>
)
```

### List variants

```tsx
render(
  <Value.SummaryList>
    <Value.ArraySelection
      value={['Foo', 'Bar', 'Baz']}
      label="Ordered List"
      variant="ol"
    />
    <Value.ArraySelection
      value={['Foo', 'Bar', 'Baz']}
      label="Unordered List"
      variant="ul"
    />
  </Value.SummaryList>
)
```

### List types

```tsx
<Value.ArraySelection
  value={['Foo', 'Bar', 'Baz']}
  label="Ordered List a"
  variant="ol"
  listType="a"
/>
<Value.ArraySelection
  value={['Foo', 'Bar', 'Baz']}
  label="Ordered List A"
  variant="ol"
  listType="A"
/>
<Value.ArraySelection
  value={['Foo', 'Bar', 'Baz']}
  label="Ordered List i"
  variant="ol"
  listType="i"
/>
<Value.ArraySelection
  value={['Foo', 'Bar', 'Baz']}
  label="Ordered List I"
  variant="ol"
  listType="I"
/>
<Value.ArraySelection
  value={['Foo', 'Bar', 'Baz']}
  label="Unordered List square"
  variant="ul"
  listType="square"
/>
<Value.ArraySelection
  value={['Foo', 'Bar', 'Baz']}
  label="Unordered List circle"
  variant="ul"
  listType="circle"
/>
<Value.ArraySelection
  value={['Foo', 'Bar', 'Baz']}
  label="Unordered List unstyled"
  variant="ul"
  listType="unstyled"
/>
```

### Field.Option and Field.ArraySelection

When using the same `path` as on a `Field.ArraySelection`, the `Field.Option` title will be used as the displayed value.

```tsx
render(
  <Form.Handler>
    <Flex.Stack>
      <Field.ArraySelection
        label="My selections"
        path="/myPath"
        value={['bar', 'baz']}
      >
        <Field.Option value="foo" title="Foo" />
        <Field.Option value="bar" title="Bar" />
        <Field.Option value="baz" title="Baz" />
      </Field.ArraySelection>

      <Value.ArraySelection inheritLabel path="/myPath" />
    </Flex.Stack>
  </Form.Handler>
)
```

## Properties

### Value-specific properties

```json
{
  "props": {
    "value": {
      "doc": "The value to format. Can be given as `children` instead.",
      "type": ["Array<React.ReactNode>"],
      "status": "optional"
    },
    "children": {
      "doc": "The children to format.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "format": {
      "doc": "Formatting options for the value when variant is `text`. See the [Intl.ListFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/ListFormat/ListFormat) documentation.",
      "type": "Intl.ListFormatOptions",
      "status": "optional"
    },
    "variant": {
      "doc": "Defines if the value should be displayed in list format (`ol`, `ul`) or regular text format in one line. Defaults to `text`.",
      "type": ["ol", "ul", "text"],
      "status": "optional"
    },
    "listType": {
      "doc": "Defines the type of list styling used for list variants. Used together with variant `ol` and `ul`. Variant `ol`: `a`, `A`, `i`, `I` and `1`. Variant `ul`: `circle`, `disc` and `square`. Defaults to `undefined`.",
      "type": [
        "a",
        "A",
        "i",
        "I",
        "1",
        "circle",
        "disc",
        "square",
        "unstyled",
        "undefined"
      ],
      "status": "optional"
    },
    "inside": {
      "doc": "Defines the position of the marker.",
      "type": "boolean",
      "status": "optional"
    },
    "outside": {
      "doc": "Defines the position of the marker (default).",
      "type": "boolean",
      "status": "optional"
    },
    "nested": {
      "doc": "Will ensure a nested structure of several lists.",
      "type": "boolean",
      "status": "optional"
    },
    "innerRef": {
      "doc": "Send along a custom React Ref.",
      "type": "React.RefObject",
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

### General properties

```json
{
  "props": {
    "value": {
      "doc": "Value for the value component. Will take precedence over the path value given in the data context.",
      "type": "Array<string | number>",
      "status": "optional"
    },
    "defaultValue": {
      "doc": "Default value for the value component. Will not take precedence over the path value given in the data context.",
      "type": "Array<string | number>",
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
  },
  "valueType": "Array<string | number>"
}
```
