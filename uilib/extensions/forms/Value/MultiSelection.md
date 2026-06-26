---
title: 'Value.MultiSelection'
description: '`Value.MultiSelection` displays the selected values from a `Field.MultiSelection` as a formatted list of titles.'
version: 11.8.0
generatedAt: 2026-06-26T12:38:10.300Z
checksum: c8943d90dbf0005b71713183521df7f0d1e21b82301277d7b28126f274d9d45e
---

# Value.MultiSelection

## Import

```tsx
import { Value } from '@dnb/eufemia/extensions/forms'
render(<Value.MultiSelection />)
```

## Description

`Value.MultiSelection` displays the selected values from a `Field.MultiSelection` as a formatted list of titles.

There is a corresponding [Field.MultiSelection](/uilib/extensions/forms/base-fields/MultiSelection) component.

When used with a `path`, it automatically resolves values to their display titles via the co-rendered `Field.MultiSelection`. You can also provide title mappings directly via the `data` or `dataPath` props for standalone usage.

```jsx
import { Value } from '@dnb/eufemia/extensions/forms'
render(<Value.MultiSelection />)
```

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Value/MultiSelection)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/Value/MultiSelection)


## Demos

### Value


```tsx
render(<Value.MultiSelection value={['Oslo', 'Stockholm', 'Copenhagen']} />)
```


### Field.MultiSelection with path

When using the same `path` as on a `Field.MultiSelection`, titles are resolved automatically via field internals.


```tsx
const cities = [{
  value: 'oslo',
  title: 'Oslo'
}, {
  value: 'stockholm',
  title: 'Stockholm'
}, {
  value: 'copenhagen',
  title: 'Copenhagen'
}, {
  value: 'helsinki',
  title: 'Helsinki'
}, {
  value: 'reykjavik',
  title: 'Reykjavik'
}];
render(<Form.Handler>
            <Flex.Stack>
              <Value.MultiSelection inheritLabel path="/myPath" placeholder="No cities selected" />

              <Field.MultiSelection label="Select cities" path="/myPath" data={cities} />
            </Flex.Stack>
          </Form.Handler>);
```


### With data prop

Resolve values to titles using the `data` prop.


```tsx
const cities = [{
  value: 'oslo',
  title: 'Oslo'
}, {
  value: 'stockholm',
  title: 'Stockholm'
}, {
  value: 'copenhagen',
  title: 'Copenhagen'
}];
render(<Value.MultiSelection value={['oslo', 'copenhagen']} data={cities} />);
```


### With dataPath

Use `dataPath` to resolve titles from the data context without rendering a `Field.MultiSelection`.


```tsx
render(<Form.Handler data={{
  myItems: [{
    value: 'oslo',
    title: 'Oslo'
  }, {
    value: 'stockholm',
    title: 'Stockholm'
  }, {
    value: 'copenhagen',
    title: 'Copenhagen'
  }],
  myPath: ['oslo', 'copenhagen']
}}>
        <Value.MultiSelection label="Selected cities" path="/myPath" dataPath="/myItems" />
      </Form.Handler>)
```


### Inline


```tsx
render(<P>
        This is before the component{' '}
        <Value.MultiSelection value={['Oslo', 'Stockholm', 'Copenhagen']} inline />{' '}
        This is after the component
      </P>)
```


### List variants


```tsx
render(<Value.SummaryList>
        <Value.MultiSelection value={['Oslo', 'Stockholm', 'Copenhagen']} label="Ordered List" variant="ol" />
        <Value.MultiSelection value={['Oslo', 'Stockholm', 'Copenhagen']} label="Unordered List" variant="ul" />
      </Value.SummaryList>)
```

## Properties

### Value-specific properties


```json
{
  "props": {
    "value": {
      "doc": "The value to format. Can be given as `children` instead.",
      "type": [
        "Array<React.ReactNode>"
      ],
      "status": "optional"
    },
    "children": {
      "doc": "The children to format.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "locale": {
      "doc": "Locale used to format the value when variant is `text`. Defaults to the shared Provider locale.",
      "type": "string",
      "status": "optional"
    },
    "format": {
      "doc": "Formatting options for the value when variant is `text`. See the [Intl.ListFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/ListFormat/ListFormat) documentation.",
      "type": "Intl.ListFormatOptions",
      "status": "optional"
    },
    "variant": {
      "doc": "Defines if the value should be displayed in list format (`ol`, `ul`) or regular text format in one line. Defaults to `text`.",
      "type": [
        "\"ol\"",
        "\"ul\"",
        "\"text\""
      ],
      "status": "optional"
    },
    "listType": {
      "doc": "Defines the type of list styling used for list variants. Used together with variant `ol` and `ul`. Variant `ol`: `a`, `A`, `i`, `I` and `1`. Variant `ul`: `circle`, `disc` and `square`. Defaults to `undefined`.",
      "type": [
        "\"a\"",
        "\"A\"",
        "\"i\"",
        "\"I\"",
        "\"1\"",
        "\"circle\"",
        "\"disc\"",
        "\"square\"",
        "\"unstyled\"",
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
    "ref": {
      "doc": "Send along a custom `React.Ref`.",
      "type": "React.RefObject",
      "status": "optional"
    },
    "[Space](/uilib/layout/space/properties)": {
      "doc": "Spacing properties like `top` or `bottom` are supported.",
      "type": [
        "string",
        "object"
      ],
      "status": "optional"
    },
    "data": {
      "doc": "Data to resolve values to their display titles. Array of objects with `value` and `title` properties.",
      "type": "Array<{ value, title }>",
      "status": "optional"
    },
    "dataPath": {
      "doc": "The path to the context data (Form.Handler). The context data object needs to have a `value` and a `title` property.",
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
  },
  "valueType": "Array<string | number>"
}
```
