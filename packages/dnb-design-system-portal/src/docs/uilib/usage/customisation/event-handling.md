---
title: 'Event Handling'
order: 2
---

import ComponentBox from 'dnb-design-system-portal/src/shared/tags/ComponentBox'

# Event Handling

The `@dnb/eufemia` offers a couple of different ways to handling events:

1. the declarative way to set and handle events (the way we SET the event is declarative)
1. the imperative way to set and handle events

Have a look at the following basic examples:

The `@dnb/eufemia` uses _snake case_ (**snake_case**) to define the event name property (e.g. `on_click` or `on_change`). Read more about the [naming conventions](/contribute/naming).

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
import { Button } from '@dnb/eufemia'

export default class MyComponent extends React.Component {
  myHandler = (event) => {}
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
    const eventId = this._ref.current.addEvent('on_change', (event) => {})
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

### Declarative

```jsx
// Template
<dnb-button @click="handleClick">Declarative</dnb-button>

// JS
import dnb from '@dnb/eufemia/components/vue'
const components = dnb.getComponents(Vue)
...
methods: {
  handleClick: e => {}
},
components
...
```

### Imperative

```jsx
// Template
<dnb-button ref="my_button">Imperative</dnb-button>

// JS
import dnb from '@dnb/eufemia/components/vue'
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

You may also take a look at the [example-html](https://github.com/dnbexperience/eufemia-examples/tree/main/packages/example-html) project:

```html
<!-- Declarative -->
<dnb-button text="Declarative" on_click="clickHandler" />
<dnb-button text="Declarative" on_click="myScope.on_click" />
<script>
  // Global scope
  function clickHandler() {}

  // Class scope
  function MyClass() {}
  MyClass.prototype.on_click = function (event) {}
  window.myScope = new MyClass()
</script>

<!-- Imperative -->
<dnb-button text="Imperative" />
<script>
  const elem = document.querySelector('dnb-button[text=Imperative]')
  const eventId = elem.addEvent('on_click', function (event) {})
  elem.removeEvent(eventId)
</script>

<!-- Imperative by using setProps -->
<dnb-button text="Imperative" />
<script>
  const elem = document.querySelector('dnb-button[text=Imperative]')
  elem.setProps('on_click', function (event) {})
</script>
```

## Dispatch Imperative Event

Besides the event handler methods, `addEvent` and `removeEvent`, there is also a method to dispatch an event:

```js
element.fireEvent('on_click', { value: 'Custom Value' })
```

## Example

This working example uses React to handle the setup (`useEffect`). But, keep in mind, this is only for demonstration purposes. It works for sure without React on the outer scope.

<ComponentBox noFragments={false}>
{`
() => {
  React.useEffect(() => {
    Button.enableWebComponent()
  })
  function MyClass() {}
  MyClass.prototype.on_click = function(event) {
    console.log(event)
  }
  if(typeof window !== 'undefined'){
    window.myScope = new MyClass()
  }
  return (<dnb-button icon="chevron_right" text="Click me" on_click="myScope.on_click" />)
}
`}
</ComponentBox>
