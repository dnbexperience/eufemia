---
header: 'UI Library'
title: 'First Steps'
draft: false
order: 2
---

# First Steps

## Setup Examples

There are several ways to use this lib. Below there are some basic usage examples. But there are more detailed and running examples under `dnb-design-system/packages/examples`.

### Production ready vs. ES6

All code examples are shows as ES6 ([ECMAScript 2015](https://en.wikipedia.org/wiki/ECMAScript)). But the production `dnb-ui-lib` is actually compiled down to ES5 (5th Edition). So Your product is consuming production ready code at all stages.

### Installation

Go an check out the `dnb-ui-lib` **[documentation](/uilib/usage/#Installation)**.

### React

The most basic way to use the `dnb-ui-lib` is like this:

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
    <Icon icon="hevron-right" />
  </Button>
)
```

### Web Components

So called [Custom Elements](https://www.w3.org/TR/custom-elements/), running as a [Web Component](https://github.com/w3c/webcomponents/) can be used to run the `dnb-ui-lib` Components in all other frameworks like Dojo, Vue and Angular.

---

##### Example

```jsx
// Method #1
import dnb from 'dnb-ui-lib'
dnb.enableWebComponents()

// Method #2
import 'dnb-ui-lib/web-components'

// Method #3 - note, web-component without "s"
import 'dnb-ui-lib/components/button/web-component'
```

```html
<!-- Syntax -->
<dnb-button icon="chevron-right" text="Custom Element" />
```

##### Demo

<dnb-web-component>
  <dnb-button icon="chevron-right" text="Custom Element"></dnb-button>
</dnb-web-component>

---
