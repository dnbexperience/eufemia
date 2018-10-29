---
header: 'UI Library'
title: 'Event Handling'
draft: false
---

# Event Handling

The [dnb-ui-lib](/uilib/) offers a couple of different ways to handling events:

1. The declarative way to set and handle events (The way we SET the event is declarative)
1. The imperative way to set and handle events.

Have a look at the following basic examples.

Keep in mind, the general rule is to use _Snake Case_ to define the event name property.

### React

Here some of the most basic event handling in React.

###### Stateless Component

```jsx
import { Button } from 'dnb-ui-lib'
const myHandler = event => {}
const MyComponent = () => (
  <Button text="Declarative" on_click={myHandler} />
)
```

###### Lifecycle Component (ES6 Class)

```jsx
import { Button } from 'dnb-ui-lib'

// Declarative
export default class MyComponent extends React.Component {
  myHandler = event => {}
  render() {
    return <Button text="Declarative" on_click={this.myHandler} />
  }
}

// Imperative
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

### Vue

Use either the `@click` or `v-on:click` event binding property.
Else You could also use the imperative **ref** method.

```jsx
import dnb from 'dnb-ui-lib/components/web-components'
dnb.additional.vue.setIgnoredPatterns(Vue) // enable all the possible custom elements

<!-- Declarative -->
<dnb-button
  ref="button"
  @click="handleClick"
  v-on:click="handleClick"
>Declarative</dnb-button>

<!-- Imperative -->
...
mounted() {
  this.$refs.button.addEvent('on_click', this.handleClick)
}
...
```

### HTML & ES5

```html
<!-- Declarative -->
<dnb-button text="Declarative" on_click="myScope.on_click" />
<script>
  function MyClass() {}
  MyClass.prototype.on_click = function (event) {};
  window.myScope = new MyClass();
</script>

<!-- Imperative -->
<dnb-button text="Imperative" />
<script>
  var elem = document.querySelector('dnb-button[text=Imperative]')
  var eventId = elem.addEvent('on_click', function (event) {});
  elem.removeEvent(eventId);
</script>
```

### Dispatch Event

Beside the event handler methods, `addEvent` and `removeEvent`, there is also a method to dispatch an event:

```js
element.fireEvent('on_click', { value: 'Custom Value' })
```
