---
title: 'Web Components'
order: 8
---

import ComponentBox from 'Tags/ComponentBox'

# Web Components

So called [Custom Elements](https://www.w3.org/TR/custom-elements/), running as a [Web Component](https://github.com/w3c/webcomponents/) can be used to run the `dnb-ui-lib` components in all other frameworks like Dojo.

## Example usage

Once the method `enableWebComponents` is executed, we can use our web components right away in our HTML markup.
You can use Web Components in various situations. But one of the main situations will be:

- Build step
- UMD / ESM (mjs) browser based composition

### Web Components with build step

```jsx
// Method #1 (will import all components)
import { enableWebComponents } from 'dnb-ui-lib/components/lib'
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

### Web Components with UMD

Browser based composition.

```html
<body>
  <dnb-button icon="chevron_right">My Button</dnb-button>

  <!-- Required -->
  <script src="https://unpkg.com/react/umd/react.production.min.js"></script>
  <script src="https://unpkg.com/react-dom/umd/react-dom.production.min.js"></script>

  <!-- Method #1 -->
  <script src="https://unpkg.com/dnb-ui-lib/umd/dnb-ui-icons.min.js"></script>
  <script src="https://unpkg.com/dnb-ui-lib/umd/dnb-ui-web-components.min.js"></script>
  <script type="application/javascript">
    console.log(window.dnbWebComponents)
  </script>

  <!-- Method #2 -->
  <script src="https://unpkg.com/dnb-ui-lib/umd/dnb-ui-icons.min.js"></script>
  <script src="https://unpkg.com/dnb-ui-lib/umd/dnb-ui-lib.min.js"></script>
  <script type="application/javascript">
    window.dnbLib.enableWebComponents()
    console.log(window.dnbLib)
  </script>
</body>
```

### Web Components with ESM (mjs)

Browser based composition by using ESM bundles with the `mjs` file extension.

```html
<body>
  <dnb-button icon="chevron_right">My Button</dnb-button>

  <!-- With IE11 support by using a Polyfill: "-shim" -->
  <script
    crossorigin
    defer
    src="https://unpkg.com/es-module-shims/dist/es-module-shims.js"
  ></script>

  <script type="importmap-shim">
    {
      "imports": {
        "react": "...",
        "react-dom": "...",
        "../icons/primary_icons.js": "https://unpkg.com/dnb-ui-lib/esm/dnb-ui-icons.min.mjs",
        "../icons/primary_icons_medium.js": "https://unpkg.com/dnb-ui-lib/esm/dnb-ui-icons.min.mjs"
      }
    }
  </script>

  <script
    type="module-shim"
    src="https://unpkg.com/dnb-ui-lib/esm/dnb-ui-lib.min.mjs"
  >
    import 'dnb-ui-lib/web-components'
  </script>
</body>
```

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
      <dnb-input label="Label for this Input" placeholder="My Placeholder" right="small">My Value</dnb-input>
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
