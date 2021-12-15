---
redirect_from:
  - /uilib/about-the-lib/releases/v4-info
---

# v4

All the major edge cases as listed below:

- [Component wrappers](#component-wrappers) **(major change)**
- [Dropdown event handling](#dropdown-event-handling) **(major change)**
- [Switch label position](#switch-label-position) **(minor change)**
- [Layout/Spacing components](#layout-and-spacing) **(new)**
- [How to Install](#install)

## Component wrappers

Every component that provides a `label` property is now wrapping the `FormLabel` inside itself.

> **Note:** This is not a breaking change, but if You have made CSS styling to the component, then this can cause some issues.

To select and change the component **inside** with CSS, You can use now the `*__inner` wrapper. But - for sure, it depends on Your customization made with v3.

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

Did You use `on_select` before? Then make sure You double-check that You really want `on_select`. In most cases, You will only need `on_change`. [Read more about the difference](/uilib/components/dropdown/events) between `on_change` and `on_select`.

## Switch label position

Now the [Switch](/uilib/components/switch) component has `right` as the default `label_position` in contrast to what it was in v3. The reason is to make it consistent with both the [Radio](/uilib/components/radio) button and the [Checkbox](/uilib/components/checkbox).

## Layout and Spacing

Spacing is an important part of Eufemia, that's why there are now three new helper components to make it easy and fast to build forms and layouts with proper spacing.

- [FormSet](/uilib/components/form-set) provides by default the `<form>` tag and sends some `FormRow` properties along down.
- [FormRow](/uilib/components/form-row) provides by default the `<fieldset>` tag and `<legend>` tag. `FormRow` is meant to help You achieve easily common DNB layout patterns and setups. Also, `FormRow` is supporting the `Spacing` component.
- [Space](/uilib/components/space) is made to achieve the Eufemia [spacing patterns](/uilib/usage/layout/spacing#spacing-helpers). In other words; _margin_ within the provided spacing blocks.

### Components and Spacing

In v4, all components have the properties `top`, `right`, `bottom` and `left` available to define [spacing directly](/uilib/components/space#components-and-spacing).

E.g. this `right="small"` will give You a spacing of `8rem` to the left side.

```jsx
<Input label="My Input" right="small" />
```

## Install

To upgrade to v4 with NPM, use:

```bash
$ npm i dnb-ui-lib@4
```

_July, 21. 2019_
