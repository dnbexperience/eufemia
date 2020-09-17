---
showTabs: true
---

## Description

The ToggleButton component should be used to toggle on or off a limited number of choices.

You can use the React component `<ToggleButton.Group>` to wrap several `ToggleButton`. This makes it more easy to handle the event `on_change` on a higher level - as well as several other [context related properties](uilib/components/toggle-button/properties).

By default the `ToggleButton.Group` is single-select, like a [Radio](/uilib/components/radio) button. But You can easily enable `multiselect` as well.

## How to use

You can use the ToggleButton in different modes. Either as a stand alone component, or together with the `ToggleButton.Group` context.

### Multi select

If `multiselect` is enabled on the group, several items can be enabled/disabled by the user.

You would have to decide if you want to track the state by yourself by using the `checked` property, or you want just to listen to the internal state with `on_change(({ values } => console.log(values)))`. You have then to give every item also a `value` property.
