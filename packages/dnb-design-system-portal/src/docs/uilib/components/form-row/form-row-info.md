---
draft: true
---

import ComponentBox from 'Tags/ComponentBox'
import Examples from 'Pages/uilib/components/form-row/Examples'

## Description

The FormRow component is a helper to archive more easily often used DNB form layout setups. By default a `FormRow` is using the `<formset>` and `<legend>` HTML elements - if a label property is provided.

## Layout direction

The default direction is `horizontal`.
You can combine several FormRow's (example below) and the direction to achieve the wanted UX layout. You can also send the layout properties along from a [FormSet](/uilib/components/form-set) (example below).
There are three possible layout properties for the FormRow children:

- `label_direction` Children's label direction
- `direction` Children components direction
- `vertical` Forces both to be vertically

**`label_direction`**

<ComponentBox>
{`
<FormRow label_direction="vertical">
  <Input label="Label:" right />
  <Input label="Label:" />
</FormRow>
`}
</ComponentBox>

**`direction`**

<ComponentBox>
{`
<FormRow direction="vertical">
  <Input label="Label:" bottom />
  <Input label="Label:" />
</FormRow>
`}
</ComponentBox>

**`vertical`**

<ComponentBox>
{`
<FormRow vertical>
  <Input label="Label:" bottom />
  <Input label="Label:" />
</FormRow>
`}
</ComponentBox>

## Spacing

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

## Provider

If You are using React, You can make use of a `Provider` to support properties for all nested `FormRow`s, like:

```jsx
import Provider from `dnb-ui-lib/shared/Provider`

render(
  <Provider formRow={{ vertical: true }}>
    <App>
      ...
        <FormRow>Everything is vertical now</FormRow>
        <FormRow>Everything is vertical now</FormRow>
      ...
    </App>
  </Provider>
)
```

## Responsiveness

The FormRow component provides by default responsiveness. But if also the wrapped components internally have to wrap responsive, then make use of the [helper class](/uilib/helpers), e.g. `<FormRow className="dnb-responsive-component">...</FormRow>`.

## Demos

<Examples />
