---
title: 'OrganizationNumber'
description: '`Value.OrganizationNumber` is a wrapper component for displaying string values, with user experience tailored for organization number values.'
metadata: https://eufemia.dnb.no/uilib/extensions/forms/Value/OrganizationNumber/metadata.json
---

## Import

```tsx
import { Value } from '@dnb/eufemia/extensions/forms'
render(<Value.OrganizationNumber />)
```

## Description

`Value.OrganizationNumber` is a wrapper component for displaying string values, with user experience tailored for organization number values.

There is a corresponding [Field.OrganizationNumber](/uilib/extensions/forms/feature-fields/OrganizationNumber) component.

```jsx
import { Value } from '@dnb/eufemia/extensions/forms'
render(<Value.OrganizationNumber />)
```

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Value/OrganizationNumber)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/Value/OrganizationNumber)

## Demos

### Empty

```tsx
render(<Value.OrganizationNumber showEmpty />)
```

### Placeholder

```tsx
render(
  <Value.OrganizationNumber placeholder="The value was not filled in" />,
)
```

### Value

```tsx
render(<Value.OrganizationNumber value="123456789" />)
```

### Label

```tsx
render(<Value.OrganizationNumber label="Label text" showEmpty />)
```

### Label and value

```tsx
render(<Value.OrganizationNumber label="Label text" value="123456789" />)
```

### Inline

```tsx
render(
  <P>
    This is before the component{' '}
    <Value.OrganizationNumber value="123456789" inline /> This is after the
    component
  </P>,
)
```
