---
showTabs: true
---

## Properties

### `Avatar` properties

| Properties                                  | Description                                                                                                                       |
| ------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- |
| `size`                                      | _(optional)_ Size of the Avatar. Options: `small` \| `medium` \| `large` \| `x-large`. Defaults to `medium`.                      |
| `children`                                  | _(optional)_ Content of the component.                                                                                            |
| `alt`                                       | _(optional)_ Used in combination with `src` to provide an alt attribute for the `img` element.                                    |
| `src`                                       | _(optional)_ Specifies the path to the image                                                                                      |
| `skeleton`                                  | _(optional)_ Applies loading skeleton.                                                                                            |
| `imgProps`                                  | _(optional)_ [Image properties](/uilib/elements/image) applied to the `img` element if the component is used to display an image. |
| `variant`                                   | _(optional)_ Override the variant of the component. Options: `primary` \| `secondary` \| `tertiary`. Defaults to `primary`.       |
| `className`                                 | _(optional)_ Custom className for the component root.                                                                             |
| [Space](/uilib/components/space/properties) | _(optional)_ spacing properties like `top` or `bottom` are supported.                                                             |

### `Avatar.Group` properties

| Properties                                  | Description                                                                                                                                    |
| ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `label`                                     | _(required)_ The label description of the group of avatars.                                                                                    |
| `size`                                      | _(optional)_ Size of the Avatars, and "elements hidden text (+x)". Options: `small` \| `medium` \| `large` \| `x-large`. Defaults to `medium`. |
| `variant`                                   | _(optional)_ Override the variant of the Avatars. Options: `primary` \| `secondary` \| `tertiary`. Defaults to `primary`.                      |
| `maxElements`                               | _(optional)_ Number of max displayed elements, including the "elements hidden text (+x)". Defaults to 4.                                       |
| `children`                                  | _(optional)_ The Avatars to group.                                                                                                             |
| `className`                                 | _(optional)_ Custom className for the component root.                                                                                          |
| [Space](/uilib/components/space/properties) | _(optional)_ spacing properties like `top` or `bottom` are supported.                                                                          |
