---
title: 'Primary'
description: 'The primary icons are icons used inside of Eufemia components.'
icon: 'primary'
order: 2
---

import ListAllIcons from "Parts/icons/ListAllIcons";

# Primary Icons

The Primary Icons used inside of Eufemia [components](/uilib/components) and also bundled as an [UMD Package](https://unpkg.com/@dnb/eufemia@latest/umd/dnb-ui-icons.min.js).

Primary Icons can easily be defined/included in components, for instance, in [Buttons](/uilib/components/button).
They are integrated by using the `<IconPrimary />` [Icon Component](/uilib/components/icon-primary).

## React example usage

```jsx
<Icon icon="bell" size="medium" />
<Button icon="chevron_right" />
```

You can also import them like the [Secondary](/icons/secondary) icons:

```jsx
import { bell_medium, chevron_right } from '@dnb/eufemia/icons'

<Icon icon={bell_medium} size="medium" />
<Button icon={chevron_right} />
```

## A list of all Primary Icons

Title in parentheses are the icon's variable name used in coding.

<ListAllIcons variant="primary" />
