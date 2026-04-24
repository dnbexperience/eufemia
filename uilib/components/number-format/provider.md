---
version: 12.0.0
generatedAt: 2026-04-24T07:15:47.282Z
checksum: 090b7d977ba4be5e2c4c04d199a30a4048416c59f443a56985df2f80629d9c40
---

<ProviderInfo></ProviderInfo>

## Properties

`NumberFormat` is only exposed as a namespace. Pick the variant you need – this keeps the bundle small because only the variants you import are included.

### `NumberFormat.Number`

```json
{
  "props": {
    "value": {
      "doc": "A number or a string containing a number.",
      "type": ["number", "string"],
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
      "type": ["\"omit\"", "\"half-even\"", "\"half-up\""],
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
      "type": ["boolean", "string"],
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

### `NumberFormat.Currency`

```json
{
  "props": {
    "value": {
      "doc": "A number or a string containing a number.",
      "type": ["number", "string"],
      "status": "optional"
    },
    "locale": {
      "doc": "Use a [2 Letter Language Code](https://www.sitepoint.com/iso-2-letter-language-codes/) or an extended code such as `nb-NO`. Use `auto` to detect the locale from the browser (`navigator.language`). Defaults to the Norwegian locale: `nb-NO`.",
      "type": "string",
      "status": "optional"
    },
    "currency": {
      "doc": "Currency code (ISO 4217) or `true` to use the default `NOK`. Defaults to `true` when using `NumberFormat.Currency`. Uses two decimals by default.",
      "type": ["string", "boolean"],
      "status": "optional"
    },
    "currencyDisplay": {
      "doc": "Use either empty/false to hide the sign/name or use `code` (NOK), `name` (kroner), `symbol` (kr) or `narrowSymbol` (for a shorter symbol variant). Defaults to `narrowSymbol` when the locale is `no` else we default to `code`.",
      "type": "string",
      "status": "optional"
    },
    "currencyPosition": {
      "doc": "Use either `before` or `after` to change/define the position of the currency. Defaults to `auto` (Browser API defaults, but with an exception, if the locale is `nb-NO` or `no`, use after as the default position).",
      "type": "string",
      "status": "optional"
    },
    "compact": {
      "doc": "Shortens any number or currency including an abbreviation. Available on both `NumberFormat.Number` and `NumberFormat.Currency`. It gives you zero decimal by default `decimals={0}`. Use either `short` or `long`. Defaults to `short` if `true` is given.",
      "type": ["boolean", "string"],
      "status": "optional"
    },
    "decimals": {
      "doc": "Set a number to define the number of decimals. Like `decimals=\"0\"` will ensure that decimals are simply not shown. The default decimals for currency usage are `2` (Browser API default).",
      "type": "number",
      "status": "optional"
    },
    "rounding": {
      "doc": "If `omit` is given, the decimal will NOT be rounded. If set to `half-even`, the value will be rounded to the nearest even number. If set to `half-up`, the fractional part is 0.5 or greater, the number is rounded up. If the fractional part is less than 0.5, the number is rounded down. Defaults to `half-up`.",
      "type": ["\"omit\"", "\"half-even\"", "\"half-up\""],
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
    "[Space](/uilib/layout/space/properties)": {
      "doc": "Spacing properties like `top` or `bottom` are supported.",
      "type": ["string", "object"],
      "status": "optional"
    }
  }
}
```

### `NumberFormat.Percent`

```json
{
  "props": {
    "value": {
      "doc": "A number or a string containing a number.",
      "type": ["number", "string"],
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
      "type": ["\"omit\"", "\"half-even\"", "\"half-up\""],
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
    "[Space](/uilib/layout/space/properties)": {
      "doc": "Spacing properties like `top` or `bottom` are supported.",
      "type": ["string", "object"],
      "status": "optional"
    }
  }
}
```

### `NumberFormat.PhoneNumber`

```json
{
  "props": {
    "value": {
      "doc": "A number or a string containing a number.",
      "type": ["number", "string"],
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
      "type": ["\"omit\"", "\"half-even\"", "\"half-up\""],
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
    "link": {
      "doc": "Use `tel` (default) or `sms` to enable a clickable / touchable anchor link. Only available on `NumberFormat.PhoneNumber`.",
      "type": "string",
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

### `NumberFormat.BankAccountNumber`

Norwegian bank account number (e.g. `2000 12 34567`).

```json
{
  "props": {
    "value": {
      "doc": "A number or a string containing a number.",
      "type": ["number", "string"],
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
      "type": ["\"omit\"", "\"half-even\"", "\"half-up\""],
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
    "[Space](/uilib/layout/space/properties)": {
      "doc": "Spacing properties like `top` or `bottom` are supported.",
      "type": ["string", "object"],
      "status": "optional"
    }
  }
}
```

### `NumberFormat.NationalIdentityNumber`

Norwegian national identification number (e.g. `180892 12345`).

```json
{
  "props": {
    "value": {
      "doc": "A number or a string containing a number.",
      "type": ["number", "string"],
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
      "type": ["\"omit\"", "\"half-even\"", "\"half-up\""],
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
    "[Space](/uilib/layout/space/properties)": {
      "doc": "Spacing properties like `top` or `bottom` are supported.",
      "type": ["string", "object"],
      "status": "optional"
    }
  }
}
```

### `NumberFormat.OrganizationNumber`

Norwegian organization number (e.g. `123 456 789`). Screen readers read digit by digit.

```json
{
  "props": {
    "value": {
      "doc": "A number or a string containing a number.",
      "type": ["number", "string"],
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
      "type": ["\"omit\"", "\"half-even\"", "\"half-up\""],
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
    "[Space](/uilib/layout/space/properties)": {
      "doc": "Spacing properties like `top` or `bottom` are supported.",
      "type": ["string", "object"],
      "status": "optional"
    }
  }
}
```

## Translations

```json
{
  "locales": ["da-DK", "en-GB", "nb-NO", "sv-SE"],
  "entries": {
    "NumberFormat.clipboardCopy": {
      "nb-NO": "Kopiert",
      "en-GB": "Copied",
      "sv-SE": "Kopierad",
      "da-DK": "Kopieret"
    },
    "NumberFormat.notAvailable": {
      "nb-NO": "Ikke tilgjengelig",
      "en-GB": "Not available",
      "sv-SE": "Inte tillgänglig",
      "da-DK": "Ikke tilgængelig"
    }
  }
}
```
