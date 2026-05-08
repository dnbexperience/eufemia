---
title: 'Value.Number'
description: '`Value.Number` is a base component for displaying values of the type `number`.'
version: 11.2.1
generatedAt: 2026-05-08T08:59:11.398Z
checksum: 0f307fc9ab46854e5268683f8f4217f9372ca167662cbb832362a6a5abb6e3a6
---

# Value.Number

## Import

```tsx
import { Value } from '@dnb/eufemia/extensions/forms'
render(<Value.Number />)
```

## Description

`Value.Number` is a base component for displaying values of the type `number`.

Before using this component, ensure there is not a more specific [value component](/uilib/extensions/forms/Value/components/) available that better suits your needs.

There is a corresponding [Field.Number](/uilib/extensions/forms/base-fields/Number) component.

```jsx
import { Value } from '@dnb/eufemia/extensions/forms'
render(<Value.Number />)
```

It inherits all the properties from the [NumberFormat](/uilib/components/number-format/) component.

For a locale-by-locale reference that pairs these components with their rendered output, see [Best Practices for number formatting](/uilib/usage/best-practices/for-formatting/).

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Value/Number)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/Value/Number)


## Demos

### Label and value


```tsx
render(<Value.Number label="Label text" value={12345678} />)
```


### Value from path


```tsx
render(<Form.Handler data={{
  myNumber: 12345678
}}>
        <Value.Number label="Label text" currency currencyDisplay="code" currencyPosition="before" path="/myNumber" />
      </Form.Handler>)
```


### Label only


```tsx
render(<Value.Number label="Label text" showEmpty />)
```


### Placeholder


```tsx
render(<Value.Number placeholder="The number was not filled in" />)
```


### Inline


```tsx
render(<P>
        This is before the component <Value.Number value={123} inline />{' '}
        This is after the component
      </P>)
```

## Properties

### Value-specific properties


```json
{
  "props": {
    "value": {
      "doc": "A number or a string containing a number.",
      "type": [
        "number",
        "string"
      ],
      "status": "optional"
    },
    "minimum": {
      "doc": "Defines the minimum value of the rendered number. Defaults to `Number.MIN_SAFE_INTEGER`.",
      "type": "number",
      "status": "optional"
    },
    "maximum": {
      "doc": "Defines the maximum value of the rendered number. Defaults to `Number.MAX_SAFE_INTEGER`.",
      "type": "number",
      "status": "optional"
    },
    "percent": {
      "doc": "Formats the value as a percentage.",
      "type": "boolean",
      "status": "optional"
    },
    "locale": {
      "doc": "Use a [2 Letter Language Code](https://www.sitepoint.com/iso-2-letter-language-codes/) or an extended code such as `nb-NO`. Use `auto` to detect the locale from the browser (`navigator.language`). Defaults to the Norwegian locale: `nb-NO`.",
      "type": "string",
      "status": "optional"
    },
    "decimals": {
      "doc": "Set a number to define the number of decimals. Like `decimals=\"0\"` will ensure that decimals are simply not shown. The default decimals for currency usage are `2` (Browser API default).",
      "type": "number",
      "status": "optional"
    },
    "rounding": {
      "doc": "If `omit` is given, the decimal will NOT be rounded. If set to `half-even`, the value will be rounded to the nearest even number. If set to `half-up`, the fractional part is 0.5 or greater, the number is rounded up. If the fractional part is less than 0.5, the number is rounded down. Defaults to `half-up`.",
      "type": [
        "\"omit\"",
        "\"half-even\"",
        "\"half-up\""
      ],
      "status": "optional"
    },
    "signDisplay": {
      "doc": "When to display the sign for the number. Use `auto` (default) for negative numbers only, `always` to always display sign, `exceptZero` for positive and negative numbers but not zero, `negative` for negative numbers only including negative zero, or `never` to never display sign.",
      "type": [
        "\"auto\"",
        "\"always\"",
        "\"exceptZero\"",
        "\"negative\"",
        "\"never\""
      ],
      "status": "optional"
    },
    "clean": {
      "doc": "If set to `true` a dirty string will be parsed to extract the number (`prefix -123.45 suffix` would result in e.g. `kr -123,45`).",
      "type": "boolean",
      "status": "optional"
    },
    "prefix": {
      "doc": "Add a string or React component before the number, including white space.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "suffix": {
      "doc": "Appends a string or React component after the number, including white space. When the suffix is a string starting with `/`, no space is added (e.g. `suffix=\"/mnd\"` renders \"123/mnd\").",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "selectAll": {
      "doc": "Use `false` to disable the auto select all on the first click. Defaults to `true`.",
      "type": "boolean",
      "status": "optional"
    },
    "alwaysSelectAll": {
      "doc": "Use `true` to always auto select all on the first click. Defaults to `false`.",
      "type": "boolean",
      "status": "optional"
    },
    "copySelection": {
      "doc": "Use `false` to disable the auto copy feature. Defaults to `true`.",
      "type": "boolean",
      "status": "optional"
    },
    "cleanCopyValue": {
      "doc": "If set to `true` the copy&paste value will be provided without e.g. a currency sign or a percent sign. Defaults to `false`.",
      "type": "boolean",
      "status": "optional"
    },
    "srLabel": {
      "doc": "Will add a visually hidden label, to give screen reader users the missing context to easier understand what the number represents.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "monospace": {
      "doc": "Sets the font to [DNB Mono Regular](/quickguide-designer/fonts/#dnbmono-regular).",
      "type": "boolean",
      "status": "optional"
    },
    "element": {
      "doc": "Define what HTML element should be used. Defaults to `<span>`.",
      "type": "string",
      "status": "optional"
    },
    "options": {
      "doc": "Accepts all [number.toLocaleString](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/toLocaleString) or [Intl.NumberFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/NumberFormat) options as an object - can also be a JSON given as the parameter e.g. `options={{ 'minimumFractionDigits': 2 }}`.",
      "type": "object",
      "status": "optional"
    },
    "skeleton": {
      "doc": "If set to `true`, an overlaying skeleton with animation will be shown.",
      "type": "boolean",
      "status": "optional"
    },
    "tooltip": {
      "doc": "Provide a string or a React Element to be shown as the tooltip content.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "compact": {
      "doc": "Shortens any number or currency including an abbreviation. Available on both `NumberFormat.Number` and `NumberFormat.Currency`. It gives you zero decimal by default `decimals={0}`. Use either `short` or `long`. Defaults to `short` if `true` is given.",
      "type": [
        "boolean",
        "string"
      ],
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


### General properties


```json
{
  "props": {
    "value": {
      "doc": "Value for the value component. Will take precedence over the path value given in the data context.",
      "type": "number",
      "status": "optional"
    },
    "defaultValue": {
      "doc": "Default value for the value component. Will not take precedence over the path value given in the data context.",
      "type": "number",
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
      "type": [
        "\"auto\"",
        "\"small\"",
        "\"medium\"",
        "\"large\""
      ],
      "status": "optional"
    },
    "transformIn": {
      "doc": "Transforms the `value` before its displayed in the value component.",
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
  "valueType": "number",
  "omit": [
    "value",
    "[Space](/uilib/layout/space/properties)"
  ]
}
```
