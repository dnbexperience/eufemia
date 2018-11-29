---
header: 'UI Library'
title: 'Basic Examples'
draft: false
order: 2
---

import ButtonExample from 'Pages/uilib/usage/first-steps/examples/button-example.md'

## Basic Example

```js
import { Button } from 'dnb-ui-lib'

const MyComponent = props => (
  <Button icon="chevron-right" text="Custom Element" {...props} />
)
```

## Additional Example

```js
import { Button, Icon } from 'dnb-ui-lib'

const onClickHandler = event => {
  console.log('onClickHandler', event)
}
const MyComponent = () => (
  <Button on_click={onClickHandler}>
    <Icon icon="chevron-right" />
  </Button>
)
```

## Demos

<ButtonExample />
