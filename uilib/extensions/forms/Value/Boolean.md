---
title: 'Boolean'
description: '`Value.Boolean` is a base component for displaying values of the type `boolean`.'
metadata: https://eufemia.dnb.no/uilib/extensions/forms/Value/Boolean/metadata.json
---

## Import

```tsx
import { Value } from '@dnb/eufemia/extensions/forms'
render(<Value.Boolean />)
```

## Description

`Value.Boolean` is a base component for displaying values of the type `boolean`.

There is a corresponding [Field.Boolean](/uilib/extensions/forms/base-fields/Boolean) component.

```jsx
import { Value } from '@dnb/eufemia/extensions/forms'
render(<Value.Boolean />)
```

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Value/Boolean)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/Value/Boolean)

## Demos

### Empty

```tsx
render(<Value.Boolean showEmpty />)
```

### Placeholder

```tsx
render(<Value.Boolean placeholder="The value was not filled in" />)
```

### Value true

```tsx
render(<Value.Boolean value={true} />)
```

### Value false

```tsx
render(<Value.Boolean value={false} />)
```

### Label

```tsx
render(<Value.Boolean label="Label text" showEmpty />)
```

### Label and value

```tsx
render(<Value.Boolean label="Label text" value={false} />)
```

### Inline

```tsx
render(
  <P>
    <span
      style={{
        color: 'red',
      }}
    >
      This is before the component
    </span>{' '}
    <Value.Boolean value={true} inline />{' '}
    <span
      style={{
        color: 'red',
      }}
    >
      This is after the component
    </span>
  </P>,
)
```
