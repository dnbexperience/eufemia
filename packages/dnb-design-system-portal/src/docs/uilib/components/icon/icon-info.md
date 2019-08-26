---
draft: true
---

import Examples from 'Pages/uilib/components/icon/Examples'

## Description

The main `Icon` component is basically a wrapper for whatever icon you place within it. This means a `span` wrapping an inline `svg`.

You can basically use whatever you like inside this `Icon` component.

### Why use it?

You will get several advantages on using it, like:

- Responsiveness in terms of `font-size`
- Coloring
- Accessibility

### Primary Icon

There is also the [IconPrimary](/uilib/components/icon-primary/) component, which comes with all the [Primary Icons](/icons/primary) included in the `dnb-ui-lib`. You don't have to import the primary icons.

### Importing Icons

In case your environment doesn't support tree-shaking, import the icons explicit.

```jsx
// Named ES import
import { bell } from 'dnb-ui-lib/icons'

// or named import with modifier
import { bell as Bell } from 'dnb-ui-lib/icons'

// Default and explicit ES import
import Bell from 'dnb-ui-lib/icons/bell'
```

## Demos

<Examples />
