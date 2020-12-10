---
title: 'Secondary'
description: 'The secondary icons will be extended over time to include all the often used Eufemia icons.'
icon: 'secondary'
order: 3
---

import Icons from "Parts/icons/ListAllIcons";

# Secondary Icons

The Secondary Icons are an addition to the [Primary Icons](/icons/primary). They extend the possibility to have more, not mainly used icons. They get not shipped integrated as the [Primary Icons](/icons/primary) do.

The Secondary Icons can be extended infinitely.

**Technically:** The consequence is that they have to be [imported](/uilib/components/icon) where ever they have to be used.

## React example usage

```jsx
import { hamburger_medium as HamburgerIcon, bubble } from 'dnb-ui-lib/icons'

<HamburgerIcon />/* <-- is not recommended, but possible */
<Icon icon={HamburgerIcon} />
<Button icon={bubble} />
```

## A list of all Secondary Icons

<Icons variant="secondary" />
