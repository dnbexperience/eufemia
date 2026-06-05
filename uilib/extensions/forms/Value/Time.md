---
title: 'Value.Time'
description: '`Value.Time` is a wrapper component for displaying string values, with user experience tailored for time values.'
version: 11.5.2
generatedAt: 2026-06-05T08:55:37.860Z
checksum: 39e3f8837d6e37ee2189d4221c053f099b9fb3cb96ab591e6ed253301dbd1a79
---

# Value.Time

## Import

```tsx
import { Value } from '@dnb/eufemia/extensions/forms'
render(<Value.Time />)
```

## Description

`Value.Time` is a read-only component for displaying time values with locale-aware formatting.

The value format is `"HH:mm"` (e.g. `"14:30"`), or `"HH:mm:ss"` (e.g. `"14:30:45"`) when the value includes seconds.

There is a corresponding [Field.Time](/uilib/extensions/forms/feature-fields/Time) component.

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Value/Time)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/Value/Time)


## Demos

### Label and value


```tsx
render(<Value.Time label="Label text" value="14:30" />)
```


### With seconds


```tsx
render(<Value.Time label="Label text" value="14:30:45" />)
```


### With locale


```tsx
<Value.Time label="en-US" value="14:30" locale="en-US" />
<Value.Time label="nb-NO" value="14:30" locale="nb-NO" />
<Value.Time label="de-DE" value="14:30" locale="de-DE" />
```


### Inline


```tsx
render(<P>
        This is before the component{' '}
        <Value.Time label="Label text" value="14:30" inline /> This is
        after the component
      </P>)
```

## Properties

### Value-specific properties


```json
{
  "props": {
    "locale": {
      "doc": "Defines the locale used for formatting the time value. Defaults to the locale from context.",
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
      "doc": "Provide help content for the field using `title` and `content` as a string or `React.ReactNode`. Additionally, you can set `open` to `true` to display the inline help, set the `breakout` property to `false` to disable the breakout of the inline help content, set `outset` to `false` to display the help text inline (inset) instead of the default outset behavior, or use `renderAs` set to `dialog` to render the content in a [Dialog](/uilib/components/dialog/) (recommended for larger amounts of content).",
      "type": "object",
      "status": "optional"
    },
    "transformLabel": {
      "doc": "Transforms the label before it gets displayed. Receives the label as the first parameter. The second parameter is an object containing the `convertJsxToString` function.",
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
      "type": [
        "\"auto\"",
        "\"small\"",
        "\"medium\"",
        "\"large\""
      ],
      "status": "optional"
    },
    "transformIn": {
      "doc": "Transforms the `value` before it's displayed in the value component.",
      "type": "function",
      "status": "optional"
    },
    "[Space](/uilib/layout/space/properties)": {
      "doc": "Spacing properties like `top` or `bottom` are supported.",
      "type": [
        "string",
        "object"
      ],
      "status": "optional"
    }
  }
}
```


## Translations


```json
{
  "locales": [
    "da-DK",
    "en-GB",
    "nb-NO",
    "sv-SE"
  ],
  "entries": {
    "Time.label": {
      "nb-NO": "Tidspunkt",
      "en-GB": "Time",
      "sv-SE": "Tid",
      "da-DK": "Tidspunkt"
    }
  }
}
```
