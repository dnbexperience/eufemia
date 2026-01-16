---
title: 'Date'
description: '`Value.Date` is a wrapper component for displaying string values, with user experience tailored for date values.'
metadata: https://eufemia.dnb.no/uilib/extensions/forms/Value/Date/metadata.json
---

## Import

```tsx
import { Value } from '@dnb/eufemia/extensions/forms'
render(<Value.Date />)
```

## Description

`Value.Date` is a wrapper component for displaying string values, with user experience tailored for date values.

There is a corresponding [Field.Date](/uilib/extensions/forms/feature-fields/Date) component.

```jsx
import { Value } from '@dnb/eufemia/extensions/forms'
render(<Value.Date />)
```

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Value/Date)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/Value/Date)

## Demos

### Label and value

```tsx
render(<Value.Date label="Label text" value="2023-01-16" />)
```

### Variant short

```tsx
render(
  <Value.Date label="Label text" value="2023-01-16" variant="short" />,
)
```

### Variant numeric

```tsx
render(
  <Value.Date label="Label text" value="2023-01-16" variant="numeric" />,
)
```

### Date range

```tsx
render(<Value.Date label="Label text" value="2023-01-16|2023-04-01" />)
```

### Inline

```tsx
render(
  <P>
    This is before the component{' '}
    <Value.Date label="Label text" value="2023-01-16" inline /> This is
    after the component
  </P>,
)
```
