---
showTabs: true
---

## Description

The InputMasked component uses the basic [Input](/uilib/components/input) component, but with some additional masking functionality.

### How to use

You may read more about the [properties you can use](/uilib/components/input-masked/properties) on `number_mask`.

**NB:** If the property `show_mask` is `true`, screen readers will read the mask once the user is entering the text field. Also the user will hear the mask during typing. This behavior can both have positive and negative side effects to the user.

### Auto mask based on locale

The InputMasked component supports masks based on a given locale. The locale will be inherited from the [Eufemia Provider](/uilib/usage/customisation/provider) if not given.

As of now you can enable these masks by giving:

- `as_currency="EUR"`
- `as_number={true}`

You can still send in custom mask parameters by the `currency_mask={{ ... }}` and `number_mask={{ ... }}` properties.

More details in the [examples above](/uilib/components/input-masked/demos).
