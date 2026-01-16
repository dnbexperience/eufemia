---
title: 'React & TypeScript'
metadata: https://eufemia.dnb.no/uilib/usage/first-steps/react/metadata.json
---

# React JS for the web

The most basic way to use the `@dnb/eufemia` is like this:

## Basic Buttons

```tsx
render(<Button text="Basic Button" />)
```

### Importing the Components

To make the [Button](/uilib/components/button) component work, we have to import it as well:

```js
import { Button } from '@dnb/eufemia'
```

And here is an example with several imports:

```js
import { Button, Icon } from '@dnb/eufemia/components'
import { H1, P, Link } from '@dnb/eufemia'
import { hamburger as hamburgerIcon } from '@dnb/eufemia/icons'
```

### Events

```tsx
render(<Button text="Button" on_click={() => console.log('click')} />)
```

Now, let's jump to the [Button Docs](/uilib/components/button) for more details.
