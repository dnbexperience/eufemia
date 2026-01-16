---
title: 'PhoneNumber'
description: '`Value.PhoneNumber` is a wrapper component for displaying string values, with user experience tailored for phone number values.'
metadata: https://eufemia.dnb.no/uilib/extensions/forms/Value/PhoneNumber/metadata.json
---

## Import

```tsx
import { Value } from '@dnb/eufemia/extensions/forms'
render(<Value.PhoneNumber />)
```

## Description

`Value.PhoneNumber` is a wrapper component for displaying string values, with user experience tailored for phone number values.

There is a corresponding [Field.PhoneNumber](/uilib/extensions/forms/feature-fields/PhoneNumber) component.

```jsx
import { Value } from '@dnb/eufemia/extensions/forms'
render(<Value.PhoneNumber />)
```

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Value/PhoneNumber)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/Value/PhoneNumber)

## Demos

### Empty

```tsx
render(<Value.PhoneNumber showEmpty />)
```

### Placeholder

```tsx
render(<Value.PhoneNumber placeholder="The value was not filled in" />)
```

### Value

```tsx
render(<Value.PhoneNumber value="98712345" />)
```

### Label

```tsx
render(<Value.PhoneNumber label="Label text" showEmpty />)
```

### Label and value

```tsx
render(<Value.PhoneNumber label="Label text" value="98712345" />)
```

### Inline

```tsx
render(
  <P>
    This is before the component{' '}
    <Value.PhoneNumber value="98712345" inline /> This is after the
    component
  </P>,
)
```

### International Suffix

```tsx
render(
  <Flex.Stack>
    <Value.PhoneNumber label="Label text" value="+47 98712345" />
    <Value.PhoneNumber label="Label text" value="+886 0998472751" />
    <Value.PhoneNumber label="Label text" value="+1-868 6758288" />
  </Flex.Stack>,
)
```
