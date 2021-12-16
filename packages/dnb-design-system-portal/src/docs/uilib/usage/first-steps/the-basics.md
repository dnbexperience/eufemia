---
title: 'The Basics'
order: 2
---

import ComponentBox from 'dnb-design-system-portal/src/shared/tags/ComponentBox'

<!-- They don't rely on any global style-sheets such as **normalize.css** beside the main DNB Stylesheet. -->

# The Basics

The `@dnb/eufemia` is hosted on the global NPM registry. It includes all the necessary parts to build an independent layer on top of a frontend framework of your choice.

It is recommended to have an application setup with a compiling/build process in place.

## HTML Elements and styling

There are three things going on once an HTML element is displayed and up-and-running.

- syntax as HTML
- styling by CSS
- internal states by JavaScript

From here we can redefine the properties of the HTML elements in order to customize them.
We can also bind event listeners to work together with your application.

### Pixel Perfect

One of the most important reasons why Eufemia exists, is to make it more easy to get a pixel perfect result on developing WEB Applications.

Therefore, You come a long way on using the `@dnb/eufemia` correctly:

- Make You use [import the style packages correctly](/uilib/usage/customisation/styling) (with or without CSS reset depending on your legacy code situation)
- Always (mostly) use `rem` to the nearest "8px" value, like **1px = 0.0625rem** (1/16)
- Always use the [HTML Elements](/uilib/elements) or [UI Components](/uilib/components)
- There are more [useful tips on styling](/uilib/usage/best-practices/for-styling)

**Make sure you test your layout and styles for various conditions during and after development:**

- Up two 3x times in **font-size** (change the Web Browser default font size)
- **Zoom** the Web Browser up to 3x times
- Makeyour layout **responsive**, either with CSS Grid or Media Queries and,
- Check the different screen sizes
- Testyour app on different devices and operating systems
- Pixel perfection is good for many, for the rest, make everything [accessible for everyone](/uilib/usage/accessibility)

## States

All the UI Components (and some HTML Elements) have individual interaction states. The look and feel is defined in the default [theming file](/uilib/usage/customisation/theming) (**theme-ui**).

- hover
- active (TouchStart)
- focus
- disabled

## CSS Styles

Read about [how the styles are setup](/uilib/usage/customisation/styling) and [how to import the CSS](/uilib/usage/customisation/styling/consume-styles).

## Compiler

With [Node.js](https://nodejs.org/) as our JavaScript runtime in place, we may use ES6 (ECMAScript 2015) to write our application. There are many frameworks and libraries to build user interfaces. If we take [React JSX](https://reactjs.org/docs/add-react-to-a-website.html#optional-try-react-with-jsx) as an starting point, we basically [do this](/uilib/usage/first-steps/react):

<ComponentBox hideCode hideToolbar>
{`
<Button text="Primary Button" />
`}
</ComponentBox>

```jsx
// Define the imports
import { Button } from '@dnb/eufemia'

// And consume the Component in Your markup render method
render(<Button text="Primary Button" />)
```

You also may [import the styles](/uilib/usage/customisation/styling/consume-styles) on a higher level in Your application:

```js
// e.g. in the App root
import '@dnb/eufemia/style'
```

You can also import a single style of one component at a time:

```js
// Imports only the Button CSS and Main DNB Theme
import '@dnb/eufemia/components/button/style'
import '@dnb/eufemia/components/button/style/themes/ui'
```

And finally bind an [event listener](/uilib/usage/customisation/event-handling):

```jsx
<Button text="Button" on_click={myClickHandler} />
```

## Importing components and elements

By default, you can import `components` and `elements` from the root:

```js
import { Button } from '@dnb/eufemia'
```

As the `@dnb/eufemia` uses [ESM](/uilib/usage/first-steps/module-formats#default-module-format) as its default module format, we get a good tree shaking with most of the bundler tools commonly used.

But you can be more specific if you want to:

```js
import { Button } from '@dnb/eufemia/components'
import { Anchor } from '@dnb/eufemia/elements'
```

And even go further:

```js
import Button from '@dnb/eufemia/components/Button'

// or

import Button from '@dnb/eufemia/components/button/Button'
```

### Importing extensions

Extensions you would have to import explicitly from `/extensions`

```js
import { ... } from '@dnb/eufemia/extensions'
```

### Importing icons

The same applies to icons, you would have to import them explicitly from `/icons`

```js
import { bell_medium as Bell } from '@dnb/eufemia/icons'

// or

import Bell from '@dnb/eufemia/icons/bell'
import BellMedium from '@dnb/eufemia/icons/bell_medium'
```

## UMD

In case you don't have a compiling/build process, you can use the UMD packed version of the `@dnb/eufemia`. Take a look into this repo and the [UMD example usage](https://github.com/dnbexperience/eufemia-examples/tree/main/packages/example-html/static). But this will not optimize your code for the best user experience.

```html
<html>
  <head>
    ...
    <link
      rel="stylesheet"
      href="https://unpkg.com/@dnb/eufemia@latest/style/dnb-ui-core.min.css"
    />
    <link
      rel="stylesheet"
      href="https://unpkg.com/@dnb/eufemia@latest/style/dnb-ui-components.min.css"
    />
    <link
      rel="stylesheet"
      href="https://unpkg.com/@dnb/eufemia@latest/style/themes/dnb-theme-ui.min.css"
    />
  </head>
  <body>
    ...
    <script src="https://unpkg.com/@dnb/eufemia@latest/umd/dnb-ui-icons.min.js"></script>
    <script src="https://unpkg.com/@dnb/eufemia@latest/umd/dnb-ui-lib.min.js"></script>
  </body>
</html>
```
