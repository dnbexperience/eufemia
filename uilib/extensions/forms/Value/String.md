---
title: 'String'
description: '`Value.String` is a base component for displaying values of the type `string`.'
metadata: https://eufemia.dnb.no/uilib/extensions/forms/Value/String/metadata.json
---

## Import

```tsx
import { Value } from '@dnb/eufemia/extensions/forms'
render(<Value.String />)
```

## Description

`Value.String` is a base component for displaying values of the type `string`.

There is a corresponding [Field.String](/uilib/extensions/forms/base-fields/String) component.

```jsx
import { Value } from '@dnb/eufemia/extensions/forms'
render(<Value.String />)
```

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Value/String)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/Value/String)

## Demos

### Empty

```tsx
render(<Value.String showEmpty />)
```

### Placeholder

```tsx
render(<Value.String placeholder="The value was not filled in" />)
```

### Value

```tsx
render(<Value.String value="Text value" />)
```

### Label

```tsx
render(<Value.String label="Label text" showEmpty />)
```

### Label and value

```tsx
render(<Value.String label="Label text" value="Text value" />)
```

### With help

```tsx
render(
  <Value.String
    label="Label text"
    value="Value text"
    help={{
      title: 'Help title',
      content: 'Help content.',
    }}
  />,
)
```

### Inline

```tsx
render(
  <P>
    This is before the component <Value.String value="Text value" inline />{' '}
    This is after the component
  </P>,
)
```
