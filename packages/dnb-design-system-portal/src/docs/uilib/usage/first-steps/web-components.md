---
title: 'Web Components'
draft: false
order: 8
---

import ComponentBox from 'Tags/ComponentBox'

# Web Components

So called [Custom Elements](https://www.w3.org/TR/custom-elements/), running as a [Web Component](https://github.com/w3c/webcomponents/) can be used to run the `dnb-ui-lib` components in all other frameworks like Dojo.

## Example usage

```jsx
// Method #1 (will import all components)
import { enableWebComponents } from 'dnb-ui-lib/components'
enableWebComponents()

// Method #2 (will import all components)
import 'dnb-ui-lib/components/web-components'

// Method #3 (will import all components)
import 'dnb-ui-lib/web-components'

// Method #4
// Will import only the code for the Button
// NB: web-component without "s"
import 'dnb-ui-lib/components/button/web-component'

// Method #5
// Will only enable the Button Web Component
import { Button } from 'dnb-ui-lib/components/Button'
Button.enableWebComponent()
```

Now we can use our web components right away in our markup.

### Button

<ComponentBox noFragments={false}>
{`
() => {
  React.useEffect(() => {
    Button.enableWebComponent()
  })
  return (<dnb-button icon="chevron_right" text="Custom Element" />)
}
`}
</ComponentBox>

### Input

<ComponentBox noFragments={false}>
{`
() => {
  React.useEffect(() => {
    Button.enableWebComponent()
    Input.enableWebComponent()
  })
  return (
    <form>
      <dnb-input label="Label for this Input" placeholder="My Placeholder">My Value</dnb-input>
      <dnb-button type="submit" text="Submit" />
    </form>
  )
}
`}
</ComponentBox>

## Events

You may have a look at [HTML & ES5 event handling](/uilib/usage/customisation/event-handling#html--es5) for both **Declarative** and **Imperative** usage and examples.

## Example

Have a look at [this UDM example app](https://github.com/dnbexperience/eufemia-examples/tree/master/packages/example-html) as well as the [Web Component example](https://github.com/dnbexperience/eufemia-examples/tree/master/packages/example-web-components).
