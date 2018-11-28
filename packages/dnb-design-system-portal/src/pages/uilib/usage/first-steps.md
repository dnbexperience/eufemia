---
header: 'UI Library'
title: 'First Steps'
draft: false
order: 2
---

import ButtonExample from 'Pages/uilib/usage/first-steps/examples/button-example.md'

# First Steps

### Installation

Go an check out the `dnb-ui-lib` **[Installation documentation](/uilib/usage/#Installation)**.

## Setup Examples

There are several ways to use this lib. Below there are some basic usage examples. But there are more detailed and running examples under `dnb-design-system/packages/examples`.

### Production ready

All code examples are shows as ES6 ([ECMAScript 2015](https://en.wikipedia.org/wiki/ECMAScript)). But the production `dnb-ui-lib` is actually compiled down to ES5 (5th Edition). So Your product is consuming production ready code on all stages.

##### Basic Example

```js
import { Button } from 'dnb-ui-lib'

const MyComponent = props => (
  <Button icon="chevron-right" text="Custom Element" {...props} />
)
```

##### Additional Example

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

##### Demo

<ButtonExample />

---
