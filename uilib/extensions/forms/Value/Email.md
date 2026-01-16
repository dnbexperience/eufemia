---
title: 'Email'
description: '`Value.Email` is a wrapper component for displaying string values, with user experience tailored for email values.'
metadata: https://eufemia.dnb.no/uilib/extensions/forms/Value/Email/metadata.json
---

## Import

```tsx
import { Value } from '@dnb/eufemia/extensions/forms'
render(<Value.Email />)
```

## Description

`Value.Email` is a wrapper component for displaying string values, with user experience tailored for email values.

There is a corresponding [Field.Email](/uilib/extensions/forms/feature-fields/Email) component.

```jsx
import { Value } from '@dnb/eufemia/extensions/forms'
render(<Value.Email />)
```

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Value/Email)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/Value/Email)

## Demos

### Empty

```tsx
render(<Value.Email showEmpty />)
```

### Placeholder

```tsx
render(<Value.Email placeholder="The value was not filled in" />)
```

### Value

```tsx
render(<Value.Email value="firstname.lastname@domain.com" />)
```

### Label

```tsx
render(<Value.Email label="Label text" showEmpty />)
```

### Label and value

```tsx
render(
  <Value.Email label="Label text" value="firstname.lastname@domain.com" />,
)
```

### Inline

```tsx
render(
  <P>
    This is before the component{' '}
    <Value.Email value="firstname.lastname@domain.com" inline /> This is
    after the component
  </P>,
)
```
