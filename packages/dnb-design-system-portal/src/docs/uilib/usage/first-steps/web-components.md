---
title: 'Web Components'
draft: false
order: 8
---

import 'dnb-ui-lib/src/web-components'
import ComponentBox from 'Tags/ComponentBox'

# Web Components

So called [Custom Elements](https://www.w3.org/TR/custom-elements/), running as a [Web Component](https://github.com/w3c/webcomponents/) can be used to run the `dnb-ui-lib` components in all other frameworks like Dojo.

## Web Components and their negative trade offs

The usage of the UMD version in combination with Web Components is **not recommended** because:

- Accessibility and screen reader support due to ID referencing
- Lack of native HTML support, like submit inside a form
- Will involve too much imperative code

## Example usage

```jsx
// Method #1
import { enableWebComponents } from 'dnb-ui-lib/components'
enableWebComponents()

// Method #2
import 'dnb-ui-lib/web-components'

// Method #3 - note, web-component without "s"
import 'dnb-ui-lib/components/button/web-component'
```

Now we can use our web components right away in our markup.

### Button

<ComponentBox>
{`
  <dnb-button icon="chevron_right" text="Custom Element" />
`}
</ComponentBox>

### Input

<ComponentBox>
{`
<form>
  <dnb-form-label for_id="form-input">Label for this Input</dnb-form-label>
  <dnb-input id="form-input" placeholder="My Placeholder">My Value</dnb-input>
  <dnb-button type="submit" text="Submit" />
</form>
`}
</ComponentBox>

## Events

You may have a look at [HTML & ES5 event handling](/uilib/usage/customisation/event-handling#html--es5) for both **Declarative** and **Imperative** usage and examples.
