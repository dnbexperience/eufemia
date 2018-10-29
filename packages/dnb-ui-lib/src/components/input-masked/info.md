---
component: 'InputMasked'
status: 'prototype'
version: 0.5.0
---

The masked input component uses the DNB original input component, but with some additional masking functionality. Read more about the details [on the open source project](github.com/sanniassin/react-input-mask).

**TODO:** This is an experimental component and should be tested more before using it in production (thinking of e.g. DerivedStateFromProps, or that the "mask" prop uses a function or RegExp, so there has to be build in a special type of JSON parser).

| Properties  | Description                                                                                                                                                                                                                             |
| ----------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `mask`      | _(mandatory)_ The mask prop, defined with a RegExp style of of characters or a callback function. Se [example](https://github.com/eggsdesign/dnb-design-system/tree/master/packages/dnb-ui-lib/src/components/input-masked/Example.js). |
| `show_mask` | _(optional)_ Show mask when input is empty and has no focus.                                                                                                                                                                            |
