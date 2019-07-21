---
title: 'React'
draft: false
order: 5
---

import ComponentBox from 'Tags/ComponentBox'
import { Button, IconPrimary } from 'dnb-ui-lib/src'
import { hamburger as hamburgerIcon } from 'dnb-ui-lib/src/icons/secondary_icons'

# React JS for the web

The most basic way to use the `dnb-ui-lib` is like this:

## Basic Buttons

<ComponentBox>
{`
<Button text="Basic Button" />
`}
</ComponentBox>

### Importing the Components

To make the [Button](/uilib/components/button) Component work, we have to import it as well:

```js
import { Button } from 'dnb-ui-lib'
```

And here an example with several imports:

```js
import { Button, Icon } from 'dnb-ui-lib/components'
import { H1, P, Link } from 'dnb-ui-lib/elements'
import { hamburger as hamburgerIcon } from 'dnb-ui-lib/icons/secondary_icons'
```

You may have a look at a [Example for React on GitHub](https://github.com/dnbexperience/eufemia/tree/develop/packages/examples/example-react).
