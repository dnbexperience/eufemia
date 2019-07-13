---
draft: true
---

import Examples from 'Pages/uilib/components/form-row/Examples'

## Description

The `FormRow` component is a helper to archive more easily often used DNB form layout setups. By default a `FormRow` is using the `<formset>` and `<legend>` HTML elements - if a label property is provided.

```jsx
<FormRow label="Legend label:" label_direction="vertical">
  /** Only the legend label will be placed vertically */
  <Input label="Input label A:" />
  <Input label="Input label B:" />
</FormRow>
```

**TODO:** Support [Spacing](/uilib/usage/layout/spacing#spacing-helpers) out of box by defining e.g. `<FormRow top="large x-small" ...` witch will be equivalent with **`margin-top: 2.5rem;`**

## Demos

<Examples />
