import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{W as n}from"./index-D7e1avVt.js";import{r}from"./Examples-DGzpnZ3K.js";var i=e(t());function a(e){let t={a:`a`,code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...n(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h1,{children:`The Basics`}),`
`,(0,i.jsxs)(t.p,{children:[`The `,(0,i.jsx)(t.code,{children:`@dnb/eufemia`}),` is hosted on the global NPM registry. It includes all the necessary parts to build an independent layer on top of a frontend framework of your choice.`]}),`
`,(0,i.jsx)(t.p,{children:`It is recommended to have an application setup with a compiling/build process in place.`}),`
`,(0,i.jsx)(t.h2,{children:`HTML Elements and styling`}),`
`,(0,i.jsx)(t.p,{children:`There are three things going on once an HTML element is displayed and up-and-running:`}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsx)(t.li,{children:`Syntax as HTML`}),`
`,(0,i.jsx)(t.li,{children:`Styling by CSS`}),`
`,(0,i.jsx)(t.li,{children:`Internal states by JavaScript`}),`
`]}),`
`,(0,i.jsx)(t.p,{children:`From here we can redefine the properties of the HTML elements in order to customize them.
We can also bind event listeners to work together with your application.`}),`
`,(0,i.jsx)(t.h3,{children:`Pixel Perfect`}),`
`,(0,i.jsx)(t.p,{children:`One of the most important reasons why Eufemia exists, is to make it easier to get a pixel perfect result when developing WEB Applications.`}),`
`,(0,i.jsxs)(t.p,{children:[`You will have come a long way to achieve this by using `,(0,i.jsx)(t.code,{children:`@dnb/eufemia`}),` correctly:`]}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsxs)(t.li,{children:[`Make sure you `,(0,i.jsx)(t.a,{href:`/uilib/usage/customisation/styling`,children:`import the style packages correctly`}),` (with or without CSS reset depending on your legacy code situation)`]}),`
`,(0,i.jsxs)(t.li,{children:[`Always (mostly) use `,(0,i.jsx)(t.code,{children:`rem`}),` to the nearest "8px" value, like `,(0,i.jsx)(t.strong,{children:`1px = 0.0625rem`}),` (1/16)`]}),`
`,(0,i.jsxs)(t.li,{children:[`Always use the `,(0,i.jsx)(t.a,{href:`/uilib/elements`,children:`HTML Elements`}),` or `,(0,i.jsx)(t.a,{href:`/uilib/components`,children:`UI Components`})]}),`
`,(0,i.jsxs)(t.li,{children:[`Follow these `,(0,i.jsx)(t.a,{href:`/uilib/usage/best-practices/for-styling`,children:`useful tips on styling`})]}),`
`]}),`
`,(0,i.jsx)(t.p,{children:(0,i.jsx)(t.strong,{children:`Make sure you test your layout and styles for various conditions during and after development:`})}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsxs)(t.li,{children:[`Up two 3x times in `,(0,i.jsx)(t.strong,{children:`font-size`}),` (change the Web Browser default font size)`]}),`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.strong,{children:`Zoom`}),` the Web Browser up to 3x times`]}),`
`,(0,i.jsxs)(t.li,{children:[`Make your layout `,(0,i.jsx)(t.strong,{children:`responsive`}),`, either with CSS Grid or Media Queries`]}),`
`,(0,i.jsx)(t.li,{children:`Check the different screen sizes`}),`
`,(0,i.jsx)(t.li,{children:`Test your app on different devices and operating systems`}),`
`,(0,i.jsxs)(t.li,{children:[`Pixel perfection is good for many, for the rest, make everything `,(0,i.jsx)(t.a,{href:`/uilib/usage/accessibility`,children:`accessible for everyone`})]}),`
`]}),`
`,(0,i.jsx)(t.h2,{children:`States`}),`
`,(0,i.jsxs)(t.p,{children:[`All the UI Components (and some HTML Elements) have individual interaction states. The look and feel is defined in the default `,(0,i.jsx)(t.a,{href:`/uilib/usage/customisation/theming`,children:`theming file`}),` (`,(0,i.jsx)(t.strong,{children:`theme-ui`}),`).`]}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsx)(t.li,{children:`hover`}),`
`,(0,i.jsx)(t.li,{children:`active (TouchStart)`}),`
`,(0,i.jsx)(t.li,{children:`focus`}),`
`,(0,i.jsx)(t.li,{children:`disabled`}),`
`]}),`
`,(0,i.jsx)(t.h2,{children:`CSS Styles`}),`
`,(0,i.jsxs)(t.p,{children:[`Read about `,(0,i.jsx)(t.a,{href:`/uilib/usage/customisation/styling`,children:`how the styles are setup`}),` and `,(0,i.jsx)(t.a,{href:`/uilib/usage/customisation/styling/consume-styles`,children:`how to import the CSS`}),`.`]}),`
`,(0,i.jsx)(t.h2,{children:`Compiler`}),`
`,(0,i.jsxs)(t.p,{children:[`With `,(0,i.jsx)(t.a,{href:`https://nodejs.org/`,children:`Node.js`}),` as our JavaScript runtime in place, we may use modern JavaScript syntax (ECMAScript 2015+) to write our application. There are many frameworks and libraries to build user interfaces. If we take `,(0,i.jsx)(t.a,{href:`https://reactjs.org/docs/add-react-to-a-website.html#optional-try-react-with-jsx`,children:`React JSX`}),` as a starting point, we basically `,(0,i.jsx)(t.a,{href:`/uilib/usage/first-steps/react`,children:`do this`}),`:`]}),`
`,(0,i.jsx)(r,{}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-jsx`,children:`// Define the imports
import { Button } from '@dnb/eufemia'

// And consume the Component in your markup render method
render(<Button text="Primary Button" />)
`})}),`
`,(0,i.jsxs)(t.p,{children:[`You also may `,(0,i.jsx)(t.a,{href:`/uilib/usage/customisation/styling/consume-styles`,children:`import the styles`}),` on a higher level in your application:`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-js`,children:`// e.g. in the App root
import '@dnb/eufemia/style'
`})}),`
`,(0,i.jsx)(t.p,{children:`You can also import a single style of one component at a time:`}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-js`,children:`// Imports only the Button CSS and Main DNB Theme
import '@dnb/eufemia/components/button/style'
import '@dnb/eufemia/components/button/style/themes/ui'
`})}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-jsx`,children:`<Button text="Button" onClick={myClickHandler} />
`})}),`
`,(0,i.jsx)(t.h2,{children:`Importing components and elements`}),`
`,(0,i.jsxs)(t.p,{children:[`By default, you can import `,(0,i.jsx)(t.code,{children:`components`}),` and `,(0,i.jsx)(t.code,{children:`elements`}),` from the root:`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-js`,children:`import { Button } from '@dnb/eufemia'
`})}),`
`,(0,i.jsxs)(t.p,{children:[`As the `,(0,i.jsx)(t.code,{children:`@dnb/eufemia`}),` uses `,(0,i.jsx)(t.a,{href:`/uilib/usage/first-steps/module-formats#default-module-format`,children:`ESM`}),` as its default module format, we get a good tree shaking with most of the bundler tools commonly used.`]}),`
`,(0,i.jsx)(t.p,{children:`But you can be more specific if you want to:`}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-js`,children:`import { Button } from '@dnb/eufemia/components'
`})}),`
`,(0,i.jsx)(t.p,{children:`And even go further:`}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-js`,children:`import Button from '@dnb/eufemia/components/Button'

// or

import Button from '@dnb/eufemia/components/button/Button'
`})}),`
`,(0,i.jsx)(t.h3,{children:`Importing extensions`}),`
`,(0,i.jsxs)(t.p,{children:[`Extensions you would have to import explicitly from `,(0,i.jsx)(t.code,{children:`/extensions`})]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-js`,children:`import { ... } from '@dnb/eufemia/extensions'
`})}),`
`,(0,i.jsx)(t.h3,{children:`Importing icons`}),`
`,(0,i.jsxs)(t.p,{children:[`The same applies to icons, you would have to import them explicitly from `,(0,i.jsx)(t.code,{children:`/icons`})]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-js`,children:`import { bell_medium as Bell } from '@dnb/eufemia/icons'

// or

import Bell from '@dnb/eufemia/icons/bell'
import BellMedium from '@dnb/eufemia/icons/bell_medium'
`})}),`
`,(0,i.jsx)(t.h2,{children:`UMD`}),`
`,(0,i.jsxs)(t.p,{children:[`In case you do not have a compiling/build process, you can use the UMD packed version of the `,(0,i.jsx)(t.code,{children:`@dnb/eufemia`}),`.`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-html`,children:`<html>
  <head>
    ...
    <link
      rel="stylesheet"
      href="https://unpkg.com/@dnb/eufemia@latest/style/dnb-ui-core.min.css"
    />
    <link
      rel="stylesheet"
      href="https://unpkg.com/@dnb/eufemia@latest/style/themes/ui/ui-theme-components.min.css"
    />
    <link
      rel="stylesheet"
      href="https://unpkg.com/@dnb/eufemia@latest/style/themes/ui/ui-theme-basis.min.css"
    />
  </head>
  <body>
    ...
    <script src="https://unpkg.com/@dnb/eufemia@latest/umd/dnb-ui-icons.min.js"><\/script>
    <script src="https://unpkg.com/@dnb/eufemia@latest/umd/dnb-ui-lib.min.js"><\/script>
  </body>
</html>
`})})]})}function o(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}export{o as default};