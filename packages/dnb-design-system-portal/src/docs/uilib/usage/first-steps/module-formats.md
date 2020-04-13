---
title: 'Bundles: UMD and ESM (mjs)'
order: 9
---

import ComponentBox from 'Tags/ComponentBox'

# Bundles

The `dnb-ui-lib` also supports ready to use `UMD` and `ESM` bundles, providing `ES5` code.

## UMD bundles

Requires React and ReactDom to be loaded before.

- `dnb-ui-lib.min.js` includes all [components](/uilib/components) and [elements](/uilib/elements) and individual Web Components support
- `dnb-ui-components.min.js` includes all [components](/uilib/components)
- `dnb-ui-patterns.min.js` includes all [patterns](/uilib/patterns)
- `dnb-ui-web-components.min.js` includes all [components](/uilib/components) and enables all Web Components by default
- `dnb-ui-icons.min.js` includes all primary icons in default and medium size
- `dnb-ui-basis.min.js` includes just the core methods like: `isTouchDevice`, `defineNavigator`

### Usage of UMD bundles

```html
<body>
  <dnb-button icon="chevron_right">My Button</dnb-button>

  <script
    crossorigin
    src="https://unpkg.com/react/umd/react.production.min.js"
  ></script>
  <script
    crossorigin
    src="https://unpkg.com/react-dom/umd/react-dom.production.min.js"
  ></script>
  <script
    crossorigin
    src="https://unpkg.com/dnb-ui-lib/umd/dnb-ui-icons.min.js"
  ></script>
  <script
    crossorigin
    src="https://unpkg.com/dnb-ui-lib/umd/dnb-ui-lib.min.js"
  ></script>
</body>
```

## ESM bundles

Requires React and ReactDom to be loaded as a module resolution (importmap).

- `dnb-ui-lib.min.mjs` includes all [components](/uilib/components) and [elements](/uilib/elements) and individual Web Components support
- `dnb-ui-components.min.mjs` includes all [components](/uilib/components)
- `dnb-ui-patterns.min.mjs` includes all [patterns](/uilib/patterns)
- `dnb-ui-web-components.min.mjs` includes all [components](/uilib/components) and enables all Web Components by default
- `dnb-ui-icons.min.mjs` includes all primary icons in default and medium size
- `dnb-ui-basis.min.mjs` includes just the core methods like: `isTouchDevice`, `defineNavigator`

### Usage of ESM bundles

Because `importmap` is still not supported by the majority of browsers, we use a shim, witch can be simply removed one the browser support is good enough.
As React by default don't delivers an ESM bundle, we have to create our own.

```html
<body>
  <div id="app"></div>

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

  <script type="module-shim">
    import React from 'react'
    import ReactDom from 'react-dom'
    import { Button } from 'https://unpkg.com/dnb-ui-lib/esm/dnb-ui-lib.min.mjs'

    const MyButton = React.createElement(
      Button,
      { text: 'My Button' }
    )

    ReactDom.render(MyButton, document.getElementById('app'))
  </script>
</body>
```

#### Web Components with ESM (mjs)

Read more about the [Web Components](/uilib/usage/first-steps/web-components) usage.

```html
<body>
  <dnb-button icon="chevron_right">My Button</dnb-button>

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
    // Enable all by default
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
