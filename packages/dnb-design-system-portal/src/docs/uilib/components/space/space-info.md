---
draft: true
---

import Examples from 'Pages/uilib/components/space/Examples'
import SpacingTable from 'Pages/uilib/usage/layout/spacing-table.md'

## Description

The `Space` component provides `margins` within the [provided spacing patterns](/uilib/usage/layout/spacing#spacing-helpers).

The reason why this exists is to make Your Syntax as clean as possible.
This way You see directly in words what the spacing is for every effected component.

### Spacing Table

<SpacingTable />

To get a spacing of e.g. **2.5rem** (40px)- You may combine `large` + `x-small`.

```jsx
<Space top="large x-small" right="2.5" bottom="2.5rem" left="40px" />
```

## Demos

<Examples />
