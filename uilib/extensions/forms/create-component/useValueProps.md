---
title: 'useValueProps'
description: 'The `useValueProps` hook standardize handling of the value flow for a single consumer component representing one data point.'
version: 11.5.0
generatedAt: 2026-06-03T07:21:25.016Z
checksum: 090b7d977ba4be5e2c4c04d199a30a4048416c59f443a56985df2f80629d9c40
---

# useValueProps

## Import

```tsx
import { useValueProps } from '@dnb/eufemia/extensions/forms'
// Use useValueProps
```

## Description

The `useValueProps` hook standardize handling of the value flow for a single consumer component representing one data point.

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/hooks/useValueProps.tsx)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/create-component/useValueProps)

It also provides a way to transform the value.

This hook works perfectly together with [ValueBlock](/uilib/extensions/forms/create-component/ValueBlock/).

## How to use

```tsx
import { useValueProps } from '@dnb/eufemia/extensions/forms'

const MyValueComponent = (props) => {
  const { value, ...rest } = useValueProps(props)
  return <ValueBlock {...rest}>{value}</ValueBlock>
}

render(<MyValueComponent path="/dataSelector" />)
```

### Internal Properties

All properties are optional and can be used as needed. These properties can be provided as part of your component properties.

- `value` the input value (string).
- `emptyValue` defines what value is considered to be empty. Defaults to `undefined`. But an empty string will also be validated when required is true.
- `path` the JSON pointer that defines the entry name/key in the data structure.
- `itemPath` similar to `path`, but is used when run inside the [Iterate](/uilib/extensions/forms/Iterate/) context.

### Return Parameters

It returns all of the given component properties, in addition to these:

- `value` the output value.

### Value transformers

The transformers are hooks to transform the value on different stages.

They should return a transformed value: `(value) => value`

- `toInput` transforms the value before it is returned. This applies whether the original source of the value is the value property or the data context.

- `fromExternal` transforms the provided `value` property before any other operations are performed.

In addition there are **value transformers** which should be used outside of the value component (by the value consumer):

- `transformIn` transforms the `value` before it's displayed in the value component.


## Demos


```tsx
const MyValueComponent = props => {
  const preparedProps = {
    label: 'Default Label',
    ...props,
    toInput: value => value + 10
  };
  const {
    value,
    ...rest
  } = useValueProps(preparedProps);
  return <ValueBlock {...rest}>
              {formatCurrency(value)} kroner
            </ValueBlock>;
};
render(<Form.Handler data={{
  myValue: 10
}}>
            <MyValueComponent label="Amount" path="/myValue" transformIn={value => value * 2} />
          </Form.Handler>);
```


## Parameters

Properties passed to the `useValueProps` hook.


```json
{
  "props": {
    "value": {
      "doc": "Direct value to display. Takes precedence over path-based data from DataContext.",
      "type": "{valueType}",
      "status": "optional"
    },
    "defaultValue": {
      "doc": "Default value when no value is available from DataContext or value prop.",
      "type": "{valueType}",
      "status": "optional"
    },
    "path": {
      "doc": "JSON Pointer to the data location in DataContext. Links this Value component to its data source.",
      "type": "string",
      "status": "optional"
    },
    "itemPath": {
      "doc": "Path relative to the current Iterate element. Used when inside an Iterate context.",
      "type": "string",
      "status": "optional"
    },
    "label": {
      "doc": "Label to display with the value. Can be inherited from the associated Field component.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "inheritLabel": {
      "doc": "When `true`, inherits the label from the Field component at the same path.",
      "type": "boolean",
      "status": "optional"
    },
    "inheritVisibility": {
      "doc": "When `true`, inherits visibility state from the Field component at the same path.",
      "type": "boolean",
      "status": "optional"
    },
    "transformIn": {
      "doc": "Transforms the external value before processing. Receives the raw data value.",
      "type": "(external: Value) => Value",
      "status": "optional"
    },
    "toInput": {
      "doc": "Transforms the internal value for display (after transformIn).",
      "type": "(value: Value) => Value",
      "status": "optional"
    },
    "fromExternal": {
      "doc": "Transforms value when reading from external data sources.",
      "type": "(value: Value) => Value",
      "status": "optional"
    }
  }
}
```


## Return Values

Properties returned from the `useValueProps` hook (in addition to all input props).


```json
{
  "props": {
    "...props": {
      "doc": "All input props are passed through in the return value.",
      "type": "object",
      "status": "required"
    },
    "value": {
      "doc": "The transformed value ready for display, or `undefined` if the associated field is not visible.",
      "type": [
        "{valueType}",
        "undefined"
      ],
      "status": "optional"
    },
    "label": {
      "doc": "The label to display, either from props or inherited from the associated Field.",
      "type": "React.ReactNode",
      "status": "optional"
    }
  }
}
```

## Parameters

Properties passed to the `useValueProps` hook.


```json
{
  "props": {
    "value": {
      "doc": "Direct value to display. Takes precedence over path-based data from DataContext.",
      "type": "{valueType}",
      "status": "optional"
    },
    "defaultValue": {
      "doc": "Default value when no value is available from DataContext or value prop.",
      "type": "{valueType}",
      "status": "optional"
    },
    "path": {
      "doc": "JSON Pointer to the data location in DataContext. Links this Value component to its data source.",
      "type": "string",
      "status": "optional"
    },
    "itemPath": {
      "doc": "Path relative to the current Iterate element. Used when inside an Iterate context.",
      "type": "string",
      "status": "optional"
    },
    "label": {
      "doc": "Label to display with the value. Can be inherited from the associated Field component.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "inheritLabel": {
      "doc": "When `true`, inherits the label from the Field component at the same path.",
      "type": "boolean",
      "status": "optional"
    },
    "inheritVisibility": {
      "doc": "When `true`, inherits visibility state from the Field component at the same path.",
      "type": "boolean",
      "status": "optional"
    },
    "transformIn": {
      "doc": "Transforms the external value before processing. Receives the raw data value.",
      "type": "(external: Value) => Value",
      "status": "optional"
    },
    "toInput": {
      "doc": "Transforms the internal value for display (after transformIn).",
      "type": "(value: Value) => Value",
      "status": "optional"
    },
    "fromExternal": {
      "doc": "Transforms value when reading from external data sources.",
      "type": "(value: Value) => Value",
      "status": "optional"
    }
  }
}
```


## Return Values

Properties returned from the `useValueProps` hook (in addition to all input props).


```json
{
  "props": {
    "...props": {
      "doc": "All input props are passed through in the return value.",
      "type": "object",
      "status": "required"
    },
    "value": {
      "doc": "The transformed value ready for display, or `undefined` if the associated field is not visible.",
      "type": [
        "{valueType}",
        "undefined"
      ],
      "status": "optional"
    },
    "label": {
      "doc": "The label to display, either from props or inherited from the associated Field.",
      "type": "React.ReactNode",
      "status": "optional"
    }
  }
}
```
