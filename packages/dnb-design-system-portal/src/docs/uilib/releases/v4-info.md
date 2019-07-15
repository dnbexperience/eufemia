# Release of `dnb-ui-lib` v4

There are **no** significant changes due to breaking changes, but a few major cases are listed below:

- [Component wrappers](#component-wrappers) **(major change)**
- [Dropdown event handling](#dropdown-event-handling) **(major change)**
- [Layout/Spacing components](#layout-and-spacing) **(new)**
- [How to Install](#install)

## Component wrappers

Every component that provides a `label` property is now wrapping the `FormLabel` inside itself.

> **Note:** This is not a breaking change, but if You has made CSS styling to the component, then this can cause some issues.

To select and change the component **inside** with CSS, You can use now the `*__inner` wrapper. But - for sure, it depends on Your use case.

**Before** (v3):

```jsx
<Input label="Label" className="my-input" />

// Will result in:
<label>Label</label>
<span class="dnb-input my-input">
  <input class="dnb-input__input" />
  ...
</span>
```

**After** (v4):

```jsx
<Input label="Label" className="my-input" />

// Will result in:
<span class="dnb-input my-input">
  <label>Label</label>
  <span class="dnb-input__inner">
    <input class="dnb-input__input" />
    ...
  </span>
</span>
```

## Dropdown event handling

Did You use `on_select` before? Then make sure You double check that You really want `on_select`. In most cases You will only need `on_change`. [Read more about the difference](/uilib/components/dropdown#tab-events) between `on_change` and `on_select`.

## Layout and Spacing

Spacing is an important part of Eufemia, thats why there are now tree new helper components to make it really easy and fast to build forms and layouts with proper spacing.

- [FormSet](/uilib/components/form-set) provides by default the `<form>` tag and sends some `FormRow` properties along down.
- [FormRow](/uilib/components/form-row) provides by default the `<formset>` tag and `<legend>` tag. `FormRow` is meant to help You achieve easily common DNB layout patterns and setups. Also, `FormRow` is supporting the `Spacing` component.
- [Space](/uilib/components/space) is made to achieve the Eufemia [spacing patterns](/uilib/usage/layout/spacing#spacing-helpers). In other words; _margin_ within the provided spacing blocks.

## Install

To upgrade to v4 with NPM, use:

```bash
$ npm i dnb-ui-lib@4
```
