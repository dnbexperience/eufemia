---
title: 'Code'
description: 'The code and pre element is used for code and syntax highlighting.'
version: 11.2.0
generatedAt: 2026-05-08T07:25:37.243Z
checksum: 090b7d977ba4be5e2c4c04d199a30a4048416c59f443a56985df2f80629d9c40
---

# Code

## Import

```tsx
import { Code } from '@dnb/eufemia/elements'
```

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/elements/code)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/elements/code)

## `code` and `pre` tag usage

Both `code` and `pre` tags are styled:


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


### Code and Typography

`<code>` and `<pre>` use the [DNBMono](/uilib/typography) font:

```css
font-family: var(--font-family-monospace);
```

## Code and Syntax highlighting

[Prism](https://prismjs.com) is a popular Syntax Highlighting tool. DNB has its own **theme** you can use:

- `@dnb/eufemia/style/themes/ui/prism/dnb-prism-theme.js`

You can find the theme and its definitions in the [GitHub repository](https://github.com/dnbexperience/eufemia/blob/main/packages/dnb-eufemia/src/style/themes/ui/prism/dnb-prism-theme.js).
