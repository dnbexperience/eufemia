---
title: 'Address'
description: '`Field.Address` is a wrapper component for the input of strings, with user experience tailored for postal and street addresses.'
metadata: https://eufemia.dnb.no/uilib/extensions/forms/feature-fields/Address/metadata.json
---

## Import

```tsx
import { Field } from '@dnb/eufemia/extensions/forms'
render(<Field.Address.Postal />)
render(<Field.Address.Street />)
```

## Description

`Field.Address` is a wrapper component for the [input of strings](/uilib/extensions/forms/base-fields/String), with user experience tailored for postal and street addresses.

There is a corresponding [Value.Address](/uilib/extensions/forms/Value/Address) component.

## Relevant links

- [Source code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/extensions/forms/Field/Address)
- [Docs code](https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/extensions/forms/feature-fields/Address)

## Characteristics

- If the user enters an address with a space, the space is removed.
- `autocomplete` is by default set to `street-address`, but can be customized to using a grouping identifier like so `billing street-address`, see [mdn docs](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/autocomplete#grouping_identifier).
- `inputmode` is by default set to `text`.

## Postal address

Is for locations for receiving mail, for people or businesses. This can also be used as a postbox address.

```jsx
import { Field } from '@dnb/eufemia/extensions/forms'
render(<Field.Address.Postal />)
```

## Street address

Is for physical locations of people or businesses.

```jsx
import { Field } from '@dnb/eufemia/extensions/forms'
render(<Field.Address.Street />)
```

## Demos

### Postal address

```tsx
render(
  <Field.Address.Postal
    onChange={(value) => console.log('onChange', value)}
  />,
)
```

### Street address

```tsx
render(
  <Field.Address.Street
    onChange={(value) => console.log('onChange', value)}
  />,
)
```

### Placeholder

```tsx
render(
  <Field.Address.Postal
    placeholder="Enter address..."
    onChange={(value) => console.log('onChange', value)}
  />,
)
```

### Label

```tsx
render(
  <Field.Address.Postal
    label="Label text"
    onChange={(value) => console.log('onChange', value)}
  />,
)
```

### Label and value

```tsx
render(
  <Field.Address.Postal
    label="Label text"
    value="Dronning Eufemias gate 30"
    onChange={(value) => console.log('onChange', value)}
  />,
)
```

### With help

```tsx
render(
  <Field.Address.Postal
    label="Label text"
    value="Dronning Eufemias gate 30"
    help={{
      title: 'Help is available',
      content:
        'Use your gifts to teach and help others. Acknowledge them as gifts (even if only in your mind). Take some time to list your strengths as well as the ways in which you could share them with the world around you and how that truly is a gift to others.',
    }}
    onChange={(value) => console.log('onChange', value)}
  />,
)
```

### Disabled

```tsx
render(
  <Field.Address.Postal
    value="Dronning Eufemias gate 30"
    label="Label text"
    onChange={(value) => console.log('onChange', value)}
    disabled
  />,
)
```

### Error message

```tsx
render(
  <Field.Address.Postal
    value="Dronning Eufemias gate X"
    label="Label text"
    onChange={(value) => console.log('onChange', value)}
    error={new Error('This is what is wrong...')}
  />,
)
```

### Validation - Required

```tsx
render(
  <Field.Address.Postal
    value="Dronning Eufemias gate 30"
    label="Label text"
    onChange={(value) => console.log('onChange', value)}
    required
  />,
)
```
