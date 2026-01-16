---
title: 'DateOfBirth'
description: '`Value.DateOfBirth` is a wrapper component for displaying string values, with user experience tailored for date of birth values.'
metadata: https://eufemia.dnb.no/uilib/extensions/forms/Value/DateOfBirth/metadata.json
---

## Import

```tsx
import { Value } from '@dnb/eufemia/extensions/forms'
render(<Value.DateOfBirth />)
```

## Description

`Value.DateOfBirth` is a wrapper component for displaying string values, with user experience tailored for date of birth values.

There is a corresponding [Field.DateOfBirth](/uilib/extensions/forms/feature-fields/DateOfBirth) component.

```jsx
import { Value } from '@dnb/eufemia/extensions/forms'
render(<Value.DateOfBirth />)
```

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Value/DateOfBirth)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/Value/DateOfBirth)

## Demos

<ChangeLocale
  bottom
  label="Locale used in the demos:"
  listUSLocale={true}
/>

### Empty

```tsx
render(<Value.DateOfBirth showEmpty />)
```

### Placeholder

```tsx
render(<Value.DateOfBirth placeholder="The value was not filled in" />)
```

### Value

```tsx
render(<Value.DateOfBirth value="2023-01-16" />)
```

### Label

```tsx
render(<Value.DateOfBirth label="Label text" showEmpty />)
```

### Label and value

```tsx
render(<Value.DateOfBirth label="Label text" value="2023-01-16" />)
```

### Inline

```tsx
render(
  <P>
    This is before the component{' '}
    <Value.DateOfBirth value="2023-01-16" inline /> This is after the
    component
  </P>,
)
```
