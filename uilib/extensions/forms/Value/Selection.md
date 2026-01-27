---
title: 'Value.Selection'
description: '`Value.Selection` is a component for displaying a string value based on a user selection.'
version: 10.95.1
generatedAt: 2026-01-27T13:53:28.170Z
checksum: 6782e49a32910133869cc6a4d99a98cece9e7563cc006c70ef75edd7155531f6
---

# Value.Selection

## Import

```tsx
import { Value } from '@dnb/eufemia/extensions/forms'
render(<Value.Selection />)
```

## Description

`Value.Selection` is a component for displaying a string value based on a user selection.

Before using this component, ensure there is not a more specific [value component](/uilib/extensions/forms/Value/components/) available that better suits your needs.

There is a corresponding [Field.Selection](/uilib/extensions/forms/base-fields/Selection) component.

```jsx
import { Value } from '@dnb/eufemia/extensions/forms'
render(<Value.Selection />)
```

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Value/Selection)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/Value/Selection)

## Demos

### Placeholder

```tsx
render(<Value.Selection placeholder="No value selected" />)
```

### Value

```tsx
render(<Value.Selection value="Bar" />)
```

### Label

```tsx
render(<Value.Selection label="Label text" showEmpty />)
```

### Label and value

```tsx
render(<Value.Selection label="Label text" value="Foo" />)
```

### Inline

```tsx
render(
  <P>
    This is before the component <Value.Selection value="Baz" inline />{' '}
    This is after the component
  </P>
)
```

### Field.Selection with path

When using the same `path` as on a `Field.Selection`, the title will be used as the displayed value.

```tsx
render(
  <Form.Handler
    data={{
      selection: 'bar',
      myList: [
        {
          value: 'foo',
          title: 'Foo',
        },
        {
          value: 'bar',
          title: 'Bar',
        },
        {
          value: 'baz',
          title: 'Baz',
        },
      ],
    }}
  >
    <Flex.Stack>
      <Field.Selection
        path="/selection"
        dataPath="/myList"
        variant="radio"
        label="My selection"
      />
      <Value.Selection path="/selection" dataPath="/myList" inheritLabel />
    </Flex.Stack>
  </Form.Handler>
)
```

### Field.Option and Field.Selection

When using the same `path` as on a `Field.Selection`, the `Field.Option` title will be used as the displayed value.

```tsx
render(
  <Form.Handler>
    <Flex.Stack>
      <Field.Selection
        label="My selection"
        path="/myPath"
        variant="radio"
        value="bar"
      >
        <Field.Option value="foo" title="Foo" />
        <Field.Option value="bar" title="Bar" />
        <Field.Option value="baz" title="Baz" />
      </Field.Selection>

      <Value.Selection label="My selection" path="/myPath" />
    </Flex.Stack>
  </Form.Handler>
)
```

## Properties

### Value-specific properties

```json
{
  "props": {
    "dataPath": {
      "doc": "The path to the context data (Form.Handler). The context data object needs to have a `value` and a `title` property. The generated options will be placed above given JSX based children.",
      "type": "string",
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

### Translations

```json
{
  "locales": ["da-DK", "en-GB", "nb-NO", "sv-SE"],
  "entries": {
    "DrawerList.defaultGroupSR": {
      "nb-NO": "Standardvalg",
      "en-GB": "Default options",
      "sv-SE": "Standardval",
      "da-DK": "Standardvalg"
    },
    "DrawerList.missingGroup": {
      "nb-NO": "Gruppe",
      "en-GB": "Group",
      "sv-SE": "Grupp",
      "da-DK": "Gruppe"
    },
    "DrawerList.noGroupSR": {
      "nb-NO": "Andre valg",
      "en-GB": "Other options",
      "sv-SE": "Andra val",
      "da-DK": "Andre valg"
    }
  }
}
```
