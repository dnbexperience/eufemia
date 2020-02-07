---
title: 'React'

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

To make the [Button](/uilib/components/button) component work, we have to import it as well:

```js
import { Button } from 'dnb-ui-lib'
```

And here an example with several imports:

```js
import { Button, Icon } from 'dnb-ui-lib/components'
import { H1, P, Link } from 'dnb-ui-lib/elements'
import { hamburger as hamburgerIcon } from 'dnb-ui-lib/icons/secondary_icons'
```

### Events

<ComponentBox>
{`
<Button text="Button" on_click={() => console.log('click')} />
`}
</ComponentBox>

Now, let's jump to the [Button Docs](/uilib/components/button) for more details.

Also, you may be interested in more code examples? Have a look at the [Demo App on GitHub](https://github.com/dnbexperience/eufemia-demo/blob/master/src/pages/form-demo-01.js) or [Example for React](https://github.com/dnbexperience/eufemia-examples/tree/master/packages/example-react).

## Examples

Have a look at [the demos](/uilib/getting-started/demos) as well as a [Webpack example app](https://github.com/dnbexperience/eufemia-examples/tree/master/packages/example-react) and [SSR example](https://github.com/dnbexperience/eufemia-examples/tree/master/packages/example-ssr).
