---
title: 'Event Handling'
draft: false
order: 7
---

import ComponentBox from 'Tags/ComponentBox'

# Event Handling

The `dnb-ui-lib` offers a couple of different ways to handling events:

1. the declarative way to set and handle events (the way we SET the event is declarative)
1. the imperative way to set and handle events

Have a look at the following basic examples:

The `dnb-ui-lib` uses _snake case_ (**snake_case**) to define the event name property (e.g. `on_click` or `on_change`). Read more about the [naming conventions](uilib/development/naming).

## React

Some of the most basic event handling in React.

### Stateless Component

<ComponentBox useRender>
{`
const myHandler = () => alert('Hello')
render(<Button text="Declarative" on_click={myHandler} />)
`}
</ComponentBox>

### Lifecycle Component

This example requires also support for class properties.

#### Declarative

```jsx
import { Button } from 'dnb-ui-lib'

export default class MyComponent extends React.Component {
  myHandler = event => {}
  render() {
    return <Button text="Declarative" on_click={this.myHandler} />
  }
}
```

#### Imperative

```jsx
export default class MyComponent extends React.Component {
  constructor(props) {
    super(props)
    this._ref = React.createRef()
  }
  componentDidMount() {
    const eventId = this._ref.current.addEvent('on_change', event => {})
    this._ref.current.removeEvent(eventId)
  }
  render() {
    return <Button text="Imperative" ref={this._ref} />
  }
}
```

## Vue

Use either the `@click` or `v-on:click` event binding property.
Or else you could also use the imperative **ref** method.

#### Declarative

```jsx
// Template
<dnb-button @click="handleClick">Declarative</dnb-button>

// JS
import dnb from 'dnb-ui-lib/components/vue'
const components = dnb.getComponents(Vue)
...
methods: {
  handleClick: e => {}
},
components
...
```

#### Imperative

```jsx
// Template
<dnb-button ref="my_button">Imperative</dnb-button>

// JS
import dnb from 'dnb-ui-lib/components/vue'
const components = dnb.getComponents(Vue)
...
methods: {
  handleClick: e => {}
},
mounted() {
  this.$refs.my_button.addEvent('on_click', this.handleClick)
},
components
...
```

## HTML & ES5

You may also take a look at the example projects in the repo, called `example-html`;

```html
<!-- Declarative -->
<dnb-button text="Declarative" on_click="myScope.on_click" />
<script>
  function MyClass() {}
  MyClass.prototype.on_click = function(event) {}
  window.myScope = new MyClass()
</script>

<!-- Imperative -->
<dnb-button text="Imperative" />
<script>
  var elem = document.querySelector('dnb-button[text=Imperative]')
  var eventId = elem.addEvent('on_click', function(event) {})
  elem.removeEvent(eventId)
</script>
```

## Dispatch Imperative Event

Besides the event handler methods, `addEvent` and `removeEvent`, there is also a method to dispatch an event:

```js
element.fireEvent('on_click', { value: 'Custom Value' })
```
