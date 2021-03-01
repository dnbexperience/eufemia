---
title: 'Bundles: UMD and ESM (mjs)'
order: 10
---

import ComponentBox from 'Tags/ComponentBox'

# Bundles

The `@dnb/eufemia` also supports ready to use `UMD` and `ESM` bundles.

> **NB:** As these bundles will keep on getting larger once new components arrive, I strongly recommend to only use UMD and ESM bundles as an easy drop-in for simple web pages.
>
> For **advanced applications**, I recommend a holistic build step, handling all dependencies together, creating mono page bundles with code splitting in place. This ensures that only code which is currently used by the application, is sent to the user.
>
> The reason for that is the first page load (first paint) which is extremely important for good UX, as it has a whole bunch of negative side effects like page flicker and uncontrolled movements as well as load time.
>
> - **Tobias Høegh**, april 2020

All the code examples are only quick demos, showing how to load the bundles. Keep in mind, there are many ways on how to consume them. The example code is in no way recommended for production usage, as it is highly imperative code and you will make code bases hard to read and maintain.

## UMD bundles

Requires React and ReactDOM to be loaded. Supports `ES5`.

- **@dnb/eufemia.min.js** - includes all [components](/uilib/components) and [elements](/uilib/elements) and individual [Web Component](/uilib/usage/first-steps/web-components) support.
- **dnb-ui-components.min.js** - includes all [components](/uilib/components).
- **dnb-ui-patterns.min.js** - includes all [patterns](/uilib/patterns).
- **dnb-ui-web-components.min.js** - includes all [components](/uilib/components) and enables all [custom elements](/uilib/usage/first-steps/web-components) by default.
- **dnb-ui-icons.min.js** - includes all [primary icons](/icons/primary) in default and medium size.
- **dnb-ui-basis.min.js** - includes just the core methods like: `isTouchDevice`, `defineNavigator`.

### Usage of UMD bundles

```html
<body>
  <div id="app"></div>

  <script src="https://unpkg.com/react/umd/react.production.min.js"></script>
  <script src="https://unpkg.com/react-dom/umd/react-dom.production.min.js"></script>
  <script src="https://unpkg.com/@dnb/eufemia/umd/dnb-ui-icons.min.js"></script>
  <script src="https://unpkg.com/@dnb/eufemia/umd/dnb-ui-lib.min.js"></script>

  <script type="application/javascript">
    const MyButton = React.createElement(window.dnbLib.Button, {
      text: 'My Button',
      icon: 'chevron_right',
      on_click: (params) => {
        console.log('on_click', params)
      }
    })

    ReactDOM.render(MyButton, document.getElementById('app'))
  </script>
</body>
```

## ESM bundles

Requires React and ReactDOM to be loaded as a module resolution ([importmap](https://github.com/WICG/import-maps)). Supports `ES6` (**NB:** That is the aim, right now it is also compiled down to ES5).

- **@dnb/eufemia.min.mjs** - includes all [components](/uilib/components) and [elements](/uilib/elements) and individual [Web Component](/uilib/usage/first-steps/web-components) support.
- **dnb-ui-components.min.mjs** - includes all [components](/uilib/components).
- **dnb-ui-patterns.min.mjs** - includes all [patterns](/uilib/patterns).
- **dnb-ui-web-components.min.mjs** - includes all [components](/uilib/components) and enables all [custom elements](/uilib/usage/first-steps/web-components) by default.
- **dnb-ui-icons.min.mjs** - includes all [primary icons](/icons/primary) in default and medium size.
- **dnb-ui-basis.min.mjs** - includes just the core methods like: `isTouchDevice`, `defineNavigator`.

### Usage of ESM bundles

Because `importmap` is still not supported by the majority of browsers, we use a shim, which can be simply removed once the browser support is good enough.

```html
<body>
  <div id="app"></div>

  <script
    defer
    src="https://unpkg.com/es-module-shims/dist/es-module-shims.js"
  ></script>

  <script type="importmap-shim">
    {
      "imports": {
        "react": "...",
        "react-dom": "...",
        "../icons/primary_icons.js": "https://unpkg.com/@dnb/eufemia/esm/dnb-ui-icons.min.mjs",
        "../icons/primary_icons_medium.js": "https://unpkg.com/@dnb/eufemia/esm/dnb-ui-icons.min.mjs"
      }
    }
  </script>

  <script type="module-shim">
    import React from 'react'
    import ReactDOM from 'react-dom'
    import { Button } from 'https://unpkg.com/@dnb/eufemia/esm/dnb-ui-lib.min.mjs'

    const MyButton = React.createElement(
      Button,
      {
        text: 'My Button',
        icon: 'chevron_right',
        on_click: (params) => {
          console.log('on_click', params)
        }
      }
    )

    ReactDOM.render(MyButton, document.getElementById('app'))
  </script>
</body>
```

_Note:_ Because React don't delivers an ESM bundle right now, we have to create our own.

Have a look at [this UDM example app](https://github.com/dnbexperience/eufemia-examples/tree/main/packages/example-umd-bundle) as well as the [this ESM example app](https://github.com/dnbexperience/eufemia-examples/tree/main/packages/example-esm-bundle).

Read more about [Web Components](/uilib/usage/first-steps/web-components#web-components-with-esm-mjs) usage in ESM.
