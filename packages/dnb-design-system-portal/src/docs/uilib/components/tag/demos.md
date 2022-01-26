---
showTabs: true
---

import {
TagDefault,
TagWithIcon,
TagClickable,
TagRemovable,
TagMultipleRemovable,
} from 'Docs/uilib/components/tag/Examples'

## Demos

#### Tag

To ensure the correct use of the Tags, we require using a `Tag.Group` with `Tag`-components as children. <br/>
The required `label`-property in `Tag.Group` will ensure the correct use of accessibility for screen readers. <br/>
See more examples below.

<TagDefault />

#### Tag with icon

<TagWithIcon />

#### Clickable Tag

<TagClickable />

#### Removable tag

Use the `onDelete`-prop to make a tag removable. A removable tag supports adds a `onClick`-event to the underlying `Button`-component. <br/>
Removable tags will not support the `icon`-prop and will also be ignored if a `onClick`-prop is defined.

<TagRemovable />

#### Multiple removable tags

Removable tags can for example be used in filter lists. This example simple example on how to implement a filter list using removable `Tags`.<br/> When a `Tag` is focused (e.g. when tabbing) releasing `Backspace` or `Delete` (`keyup` event) will call the `onDelete`-handler. This behavior can be omitted by setting the `omitOnKeyUpDeleteEvent`-prop to `true`.

<TagMultipleRemovable />
