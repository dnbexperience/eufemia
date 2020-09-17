---
title: 'Web Components'
description: 'Web Components are'
order: 9
---

import ComponentBox from 'Tags/ComponentBox'

# Web Components

So called [Custom Elements](https://www.w3.org/TR/custom-elements/) running as a [Web Component](https://github.com/w3c/webcomponents/) can be used to run the `dnb-ui-lib` components in all other frameworks like Dojo.

**Limitations:** Both nested Web Components and the usage of React Context is not supported. But can be implemented if needed.

## Update Properties

There are two ways of updating properties:

- You can change the HTML attributes
- You can use a method called `setProps`

### Change HTML attributes

```html
<dnb-button text="Primary"></dnb-button>
<script>
  const myElem = document.querySelector('.my-component')
  myElem.setAttribute('text', 'secondary')
</script>
```

### Using `setProps`

With that approach, you would not change the actual attributes, only the underlaying React properties. But this gives you the possibility to also pass `function` properties.

```html
<dnb-button text="Button"></dnb-button>
<script>
  const myElem = document.querySelector('.my-component')
  myElem.setProps('text', 'updated text')
  myElem.setProps({
    on_change: function (event) {}
  })
</script>
```

## Example usage

Once the method `enableWebComponents` is executed, we can use our web components right away in our HTML markup.
You can use Web Components in various situations. But one of the main situations will be:

- Build step
- Browser based composition, using UMD or ESM (mjs) bundles

### Web Components with build step

There are several different ways to enable Web Components:

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
  </script>
</body>
```

### Web Components with ESM (mjs)

Browser based composition by [using ESM bundles](/uilib/usage/first-steps/bundles) with the `mjs` file extension.
To support [importmap](https://github.com/WICG/import-maps), we can load a polyfill like [es-module-shims](https://github.com/guybedford/es-module-shims) and adding a suffix: `-shim`. **NB:** Right now the ESM bundles are delivered with ES5 code, but in future, this will change to be ES6. That means it's not future IE11 proof out of the box.

```html
<body>
  <dnb-button icon="chevron_right">My Button</dnb-button>

  <script
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
    // Enable every custom element by default
    import 'https://unpkg.com/dnb-ui-lib/esm/dnb-ui-web-components.min.mjs'

    // or enable them this way
    import { Button, enableWebComponents } 'https://unpkg.com/dnb-ui-lib/esm/dnb-ui-lib.min.mjs'

    // then, either all
    enableWebComponents()

    // or only buttons
    Button.enableWebComponent()
  </script>
</body>
```

### Web Component example: Button

<ComponentBox noFragments={false}>
{`
() => {
  Button.enableWebComponent()
  
  return (<dnb-button icon="chevron_right" text="Custom Element" />)
}
`}
</ComponentBox>

### Web Component example: Input

<ComponentBox noFragments={false}>
{`
() => {
  Button.enableWebComponent()
  Input.enableWebComponent()
  
  return (
    <form>
      <dnb-input label="Label" placeholder="My Placeholder" right="small">My Value</dnb-input>
      <dnb-button type="submit" text="Submit" />
    </form>
  )
}
`}
</ComponentBox>

## Events

You may have a look at [HTML & ES5 event handling](/uilib/usage/customisation/event-handling#html--es5) for both **Declarative** and **Imperative** usage and examples.

## More Web Component examples

Have a look at [this UDM example app](https://github.com/dnbexperience/eufemia-examples/tree/main/packages/example-html) as well as the [Web Component example](https://github.com/dnbexperience/eufemia-examples/tree/main/packages/example-web-components).
