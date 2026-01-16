---
title: 'PostalCodeAndCity'
description: '`Value.PostalCodeAndCity` is a wrapper component for displaying string values, with user experience tailored for Norwegian postal code and city values.'
metadata: https://eufemia.dnb.no/uilib/extensions/forms/Value/PostalCodeAndCity/metadata.json
---

## Import

```tsx
import { Value } from '@dnb/eufemia/extensions/forms'
render(<Value.PostalCodeAndCity />)
```

## Description

`Value.PostalCodeAndCity` is a wrapper component for displaying string values, with user experience tailored for Norwegian postal code and city values.

There is a corresponding [Field.PostalCodeAndCity](/uilib/extensions/forms/feature-fields/PostalCodeAndCity) component.

```jsx
import { Value } from '@dnb/eufemia/extensions/forms'
render(<Value.PostalCodeAndCity />)
```

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Value/PostalCodeAndCity)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/Value/PostalCodeAndCity)

## Demos

### Empty

```tsx
render(<Value.PostalCodeAndCity showEmpty />)
```

### Placeholder

```tsx
render(
  <Value.PostalCodeAndCity placeholder="The value was not filled in" />,
)
```

### Value

```tsx
render(<Value.PostalCodeAndCity value="0010 Oslo" />)
```

### Label

```tsx
render(<Value.PostalCodeAndCity label="Label text" showEmpty />)
```

### Label and value

```tsx
render(<Value.PostalCodeAndCity label="Label text" value="0010 Oslo" />)
```

### Label and value from the DataContext

```tsx
render(
  <Form.Handler
    data={{
      myPostalCode: '0010',
      myCity: 'Oslo',
    }}
  >
    <Value.PostalCodeAndCity
      postalCode={{
        path: '/myPostalCode',
      }}
      city={{
        path: '/myCity',
      }}
    />
  </Form.Handler>,
)
```

### Inline

```tsx
render(
  <P>
    This is before the component{' '}
    <Value.PostalCodeAndCity value="0010 Oslo" inline /> This is after the
    component
  </P>,
)
```
