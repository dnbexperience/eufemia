---
title: 'Code'
description: 'The code and pre element is used for code and syntax highlighting.'
version: 11.8.1
generatedAt: 2026-06-29T11:30:03.806Z
checksum: c6dca9365d4527fa38f65c8d0801933be8e1918dcb2f125eb85ed10e9d3c2d3a
---

# Code

## Import

```tsx
import { Code } from '@dnb/eufemia/elements'
```

## Description

The `code` and `pre` elements are used for code and syntax highlighting. Both `code` and `pre` tags are styled.

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/elements/code)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/elements/code)

## Code and Typography

`<code>` and `<pre>` use the [DNBMono](/uilib/typography) font:

```css
font-family: var(--font-family-monospace);
```

## Code and Syntax highlighting

[Prism](https://prismjs.com) is a popular Syntax Highlighting tool. DNB has its own **theme** you can use:

- `@dnb/eufemia/style/themes/ui/prism/dnb-prism-theme.js`

You can find the theme and its definitions in the [GitHub repository](https://github.com/dnbexperience/eufemia/blob/main/packages/dnb-eufemia/src/style/themes/ui/prism/dnb-prism-theme.js).


## Demos

### `code` and `pre` tags

Use [Section](/uilib/components/section/demos/#dark-surface) or [Theme.Context](/uilib/usage/customisation/theming/theme#surface-property) with `surface="dark"` to provide dark surface context to supporting components.


```tsx
render(<Flex.Stack>
        <P>
          My <Code>formatted text</Code> inside a paragraph
        </P>

        <Section surface="dark" innerSpace={{
    block: 'small'
  }}>
          <P>
            My <Code>formatted text</Code> inside a paragraph on dark
            surface
          </P>
        </Section>

        <pre className="dnb-pre">Code Syntax</pre>
      </Flex.Stack>)
```

## Properties


```json
{
  "props": {
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
