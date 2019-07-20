---
draft: true
---

import Examples from 'Pages/uilib/components/form-row/Examples'

## Description

The `FormRow` component is a helper to archive more easily often used DNB form layout setups. By default a `FormRow` is using the `<formset>` and `<legend>` HTML elements - if a label property is provided.

### Layout direction

There are three possible layout properties for the FormRow children:

- `direction` Children components direction
- `label_direction` Children's label direction
- `vertical` Forces both to be vertically

```jsx
/** Only the component labels will be placed vertically */
<FormRow label="Legend label:" label_direction="vertical">
  ...
</FormRow>
```

### Spacing

To give a FormRow space, properties from [Space](/uilib/components/space#tab-properties) are supported:

```jsx
/** The FormRow will then have a "margin-top: 2.5rem;" */
<FormRow top="large x-small" ... >
  ...
</FormRow>

/** ... or go crazy */
<FormRow top="large medium small" ... >
  ...
</FormRow>
```

## Demos

<Examples />
