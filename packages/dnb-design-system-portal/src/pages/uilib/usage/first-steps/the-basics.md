---
title: 'The Basics'
draft: false
order: 2
---

import ComponentBox from 'Tags/ComponentBox'

<!-- They don't rely on any global style-sheets such as **normalize.css** beside the main DNB Stylesheet. -->

# The Basics

The `dnb-ui-lib` is hosted on the global NPM registry. It includes all the necessary parts to build an independent layer on top of a frontend framework of your choice.

It is recommended to have an application setup with a compiling/build process in place.

## HTML Elements and styling

There are three things going on once an HTML element is displayed and up-and-running.

- syntax as HTML
- styling by CSS
- internal states by JavaScript

From here we can redefine the properties of the HTML elements in order to customise them.
We can also bind event listeners to work together with your application.

## States

All the HTML elements have individual interaction states. The look and feel is defined in the default [theming file](/uilib/usage/theming) (**theme-ui**).

- hover
- active (TouchStart)
- focus
- disabled

## Global Scope

Once You import the `dnb-ui-lib` style, You will not only get the HTML Element styles, but also for lower lever tags like [Headings and Paragraphs](/uilib/typography) and support for [Focus Management](/uilib/usage/accessibility/focus).

## Compiler

With [Node.js](https://nodejs.org/) as our JavaScript runtime in place, we may use ES6 (ECMAScript 2015) to write our application. There are many frameworks and libraries to build user interfaces. If we take [React JSX](https://reactjs.org/docs/add-react-to-a-website.html#optional-try-react-with-jsx) as an starting point, we basically [do this](/uilib/usage/first-steps/react):

<ComponentBox hideCode hideToolbar>
{`
<Button text="Primary Button" />
`}
</ComponentBox>

```jsx
// Define the imports
import { Button } from 'dnb-ui-lib'

// In Your JSX
render(<Button text="Primary Button" />)
```

You also may [import the styles](/uilib/usage/customisation/styling) on a higher lever in Your application:

```js
// e.g. in the App root
import 'dnb-ui-lib/style'
```

And finally bind an [event listener](/uilib/usage/customisation/event-handling):

```jsx
<Button text="Button" on_click={myClickHandler} />
```

## UMD

In case you don't have a compiling/build process, You can use the UMD packed version of the `dnb-ui-lib`. Take a look here how to use it `REPOSITORY/packages/examples/example-html` (src/umd). But this will not optimize your code for the best user experience. So, to use UMD is **not recommended**.

```html
<html>
  <head>
    ...
    <link
      rel="stylesheet"
      href="https://unpkg.com/dnb-ui-lib@latest/style/dnb-ui-core.min.css"
    />
    <link
      rel="stylesheet"
      href="https://unpkg.com/dnb-ui-lib@latest/style/dnb-ui-components.min.css"
    />
    <link
      rel="stylesheet"
      href="https://unpkg.com/dnb-ui-lib@latest/style/themes/dnb-theme-ui.min.css"
    />
  </head>
  <body>
    ...
    <script src="https://unpkg.com/dnb-ui-lib@latest/umd/dnb-ui-lib.min.js"></script>
  </body>
</html>
```
