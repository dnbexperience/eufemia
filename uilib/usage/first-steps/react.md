---
title: 'React & TypeScript'
version: 10.95.1
generatedAt: 2026-01-27T13:53:28.371Z
checksum: 090b7d977ba4be5e2c4c04d199a30a4048416c59f443a56985df2f80629d9c40
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
