---
title: 'CopyOnClick'
description: 'The CopyOnClick component allows users to copy text to their clipboard simply by clicking on it.'
version: 11.2.2
generatedAt: 2026-05-11T08:17:54.708Z
checksum: d295fb202d99102f67fd6615cb964c459dc2d8eea69dfec0225775022aaef4b0
---

# CopyOnClick

## Import

```tsx
import { CopyOnClick } from '@dnb/eufemia'
```

## Description

The `CopyOnClick` component provides a convenient way to copy text to the clipboard with a single click. This component is particularly useful in scenarios where users need to quickly copy text, such as when copying codes, IDs, URLs, or any other text content that needs to be easily shared or reused.
Upon hovering, the component can optionally provide visual feedback to the user, displaying a copy cursor or other visual cues that indicate the component's functionality.
Upon clicking, the component provides a visual feedback to the user, displaying a tooltip with a confirmation message, indicating that the text has been successfully copied.

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/copy-on-click)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/copy-on-click)

### Example

Here’s a simple usage example of the `CopyOnClick` component:

```jsx
import { CopyOnClick, P } from '@dnb/eufemia'
render(
  <P>
    <CopyOnClick>This is the text to copy!</CopyOnClick>
  </P>
)
```


## Demos

### Default


```tsx
render(<P>
        <CopyOnClick>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
          cursus pharetra elit in bibendum. Praesent nunc ipsum, convallis
          eget convallis gravida, vehicula vitae metus.
        </CopyOnClick>
      </P>)
```


### Cursor hidden


```tsx
render(<P>
        <CopyOnClick showCursor={false}>
          Praesent nunc ipsum, convallis eget convallis gravida, vehicula
          vitae metus.
        </CopyOnClick>
      </P>)
```


### Copy content

Used when the copied value should differ from the visually shown value (`children`).


```tsx
render(<P>
        <CopyOnClick copyContent="content to copy">
          content to display
        </CopyOnClick>
      </P>)
```


### Copy text content

If `children` is a React element that cannot be directly converted to a string, the component will copy the rendered text content (`textContent`) instead.


```tsx
render(<P>
        <CopyOnClick>
          <NumberFormat.Currency value={1234567.89} currency="NOK" />
        </CopyOnClick>
      </P>)
```


### Custom message shown in the tooltip when content is copied


```tsx
render(<P>
        <CopyOnClick tooltipContent="Custom message">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi
          cursus pharetra elit in bibendum. Praesent nunc ipsum, convallis
          eget convallis gravida, vehicula vitae metus.
        </CopyOnClick>
      </P>)
```

## Properties


```json
{
  "props": {
    "showCursor": {
      "doc": "Define if the copy cursor should be visible. Defaults to `true`.",
      "type": "boolean",
      "status": "optional"
    },
    "disabled": {
      "doc": "If `true`, the copy functionality and copy cursor will be omitted. Defaults to `false`.",
      "type": "boolean",
      "status": "optional"
    },
    "copyContent": {
      "doc": "Contents to copy. Used when the copied value should differ from the visually shown value(`children`).",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "tooltipContent": {
      "doc": "The message shown in the tooltip when the content is copied. Defaults to the translation `CopyOnClick.clipboardCopy`.",
      "type": "React.ReactNode",
      "status": "optional"
    },
    "children": {
      "doc": "Contents.",
      "type": "React.ReactNode",
      "status": "required"
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
    "CopyOnClick.clipboardCopy": {
      "nb-NO": "Kopiert",
      "en-GB": "Copied",
      "sv-SE": "Kopierad",
      "da-DK": "Kopieret"
    }
  }
}
```
