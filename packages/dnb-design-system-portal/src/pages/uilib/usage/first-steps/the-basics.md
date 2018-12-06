---
header: 'UI Library'
title: 'The Basics'
draft: false
order: 2
---

import { Button } from 'dnb-ui-lib/src'

<!-- They don't rely on any global style-sheets such as **normalize.css** beside the main DNB Stylesheet. -->

# The Basics

The `dnb-ui-lib` is hosed on the global NPM registry. Nevertheless, it includes all the needed parts to have a independent layer on top of a Frontend Framework of Your choice.

The recomandation is to have a application setup with a compiling/build process in place.

## HTML Elements and styling

In short, we have three things going on once a HTML Element is showing up and running.

- Syntax as HTML
- Styling by CSS
- Internal states by JavaScript

From there on we can define the properties to customize the HTML Elements as needed. But we may also bind some Event Listeners to work together with Your Application.

## States

All the HTML Elements have individual interaction states. The look and feel is defined in the default [theming file](/uilib/usage/theming) (**theme-ui**).

- Hover
- Active (TouchStart)
- Focus
- Disabled

## Global Scope

Once You import the `dnb-ui-lib` style, You will not only get the HTML Element styles, but also for lower lever tags like [Headings and Paragraphs](/uilib/typography) and support for [Focus Management](/uilib/usage/accessibility/focus).

## Compiler

With [Node.js](https://nodejs.org/) as our JavaScript runtime in place, we may use ES6 (ECMAScript 2015) to write our Application. There are many Framework and Libraries to build user interfaces. If we take [React JSX](https://reactjs.org/docs/add-react-to-a-website.html#optional-try-react-with-jsx) as an starting point, we basically [do this](/uilib/usage/first-steps/react):

```jsx
<Button text="Primary Button" />
```

and get this: <Button text="Primary Button" />

You also may [import the styles](/uilib/usage/styling) on a higher lever in Your application:

```js
import 'dnb-ui-lib/style'
```

And finally bind an [event listener](/uilib/usage/event-handling):

```jsx
<Button text="Button" on_click={myClickHandler} />
```

## UMD

In case You don't have a compiling/build process, You can use the UMD packed version of the `dnb-ui-lib`. Take a look here how to use it `REPOSITORY/packages/examples/example-html` (src/umd). But this will not optimize Your code for the best user experience. So, to use UMD is **not recommended**.

```html
<html>
  <head>
    ...
    <link
      rel="stylesheet"
      href="https://unpkg.com/dnb-ui-lib@latest/style/dnb-ui-lib.min.css"
    />
  </head>
  <body>
    ...
    <script src="https://unpkg.com/dnb-ui-lib@latest/umd/dnb-ui-lib.min.js"></script>
  </body>
</html>
```
