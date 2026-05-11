import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Lr as t}from"./index-DVm0MbGb.js";import{r as n}from"./Examples-BlMY_zoo.js";var r=e();function i(e){let i={a:`a`,code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...t(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(i.h1,{children:`The Basics`}),`
`,(0,r.jsxs)(i.p,{children:[`The `,(0,r.jsx)(i.code,{children:`@dnb/eufemia`}),` is hosted on the global NPM registry. It includes all the necessary parts to build an independent layer on top of a frontend framework of your choice.`]}),`
`,(0,r.jsx)(i.p,{children:`It is recommended to have an application setup with a compiling/build process in place.`}),`
`,(0,r.jsx)(i.h2,{children:`HTML Elements and styling`}),`
`,(0,r.jsx)(i.p,{children:`There are three things going on once an HTML element is displayed and up-and-running:`}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsx)(i.li,{children:`Syntax as HTML`}),`
`,(0,r.jsx)(i.li,{children:`Styling by CSS`}),`
`,(0,r.jsx)(i.li,{children:`Internal states by JavaScript`}),`
`]}),`
`,(0,r.jsx)(i.p,{children:`From here we can redefine the properties of the HTML elements in order to customize them.
We can also bind event listeners to work together with your application.`}),`
`,(0,r.jsx)(i.h3,{children:`Pixel Perfect`}),`
`,(0,r.jsx)(i.p,{children:`One of the most important reasons why Eufemia exists, is to make it easier to get a pixel perfect result when developing WEB Applications.`}),`
`,(0,r.jsxs)(i.p,{children:[`You will have come a long way to achieve this by using `,(0,r.jsx)(i.code,{children:`@dnb/eufemia`}),` correctly:`]}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Make sure you `,(0,r.jsx)(i.a,{href:`/uilib/usage/customisation/styling`,children:`import the style packages correctly`}),` (with or without CSS reset depending on your legacy code situation)`]}),`
`,(0,r.jsxs)(i.li,{children:[`Always (mostly) use `,(0,r.jsx)(i.code,{children:`rem`}),` to the nearest "8px" value, like `,(0,r.jsx)(i.strong,{children:`1px = 0.0625rem`}),` (1/16)`]}),`
`,(0,r.jsxs)(i.li,{children:[`Always use the `,(0,r.jsx)(i.a,{href:`/uilib/elements`,children:`HTML Elements`}),` or `,(0,r.jsx)(i.a,{href:`/uilib/components`,children:`UI Components`})]}),`
`,(0,r.jsxs)(i.li,{children:[`Follow these `,(0,r.jsx)(i.a,{href:`/uilib/usage/best-practices/for-styling`,children:`useful tips on styling`})]}),`
`]}),`
`,(0,r.jsx)(i.p,{children:(0,r.jsx)(i.strong,{children:`Make sure you test your layout and styles for various conditions during and after development:`})}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsxs)(i.li,{children:[`Up two 3x times in `,(0,r.jsx)(i.strong,{children:`font-size`}),` (change the Web Browser default font size)`]}),`
`,(0,r.jsxs)(i.li,{children:[(0,r.jsx)(i.strong,{children:`Zoom`}),` the Web Browser up to 3x times`]}),`
`,(0,r.jsxs)(i.li,{children:[`Make your layout `,(0,r.jsx)(i.strong,{children:`responsive`}),`, either with CSS Grid or Media Queries`]}),`
`,(0,r.jsx)(i.li,{children:`Check the different screen sizes`}),`
`,(0,r.jsx)(i.li,{children:`Test your app on different devices and operating systems`}),`
`,(0,r.jsxs)(i.li,{children:[`Pixel perfection is good for many, for the rest, make everything `,(0,r.jsx)(i.a,{href:`/uilib/usage/accessibility`,children:`accessible for everyone`})]}),`
`]}),`
`,(0,r.jsx)(i.h2,{children:`States`}),`
`,(0,r.jsxs)(i.p,{children:[`All the UI Components (and some HTML Elements) have individual interaction states. The look and feel is defined in the default `,(0,r.jsx)(i.a,{href:`/uilib/usage/customisation/theming`,children:`theming file`}),` (`,(0,r.jsx)(i.strong,{children:`theme-ui`}),`).`]}),`
`,(0,r.jsxs)(i.ul,{children:[`
`,(0,r.jsx)(i.li,{children:`hover`}),`
`,(0,r.jsx)(i.li,{children:`active (TouchStart)`}),`
`,(0,r.jsx)(i.li,{children:`focus`}),`
`,(0,r.jsx)(i.li,{children:`disabled`}),`
`]}),`
`,(0,r.jsx)(i.h2,{children:`CSS Styles`}),`
`,(0,r.jsxs)(i.p,{children:[`Read about `,(0,r.jsx)(i.a,{href:`/uilib/usage/customisation/styling`,children:`how the styles are setup`}),` and `,(0,r.jsx)(i.a,{href:`/uilib/usage/customisation/styling/consume-styles`,children:`how to import the CSS`}),`.`]}),`
`,(0,r.jsx)(i.h2,{children:`Compiler`}),`
`,(0,r.jsxs)(i.p,{children:[`With `,(0,r.jsx)(i.a,{href:`https://nodejs.org/`,children:`Node.js`}),` as our JavaScript runtime in place, we may use modern JavaScript syntax (ECMAScript 2015+) to write our application. There are many frameworks and libraries to build user interfaces. If we take `,(0,r.jsx)(i.a,{href:`https://reactjs.org/docs/add-react-to-a-website.html#optional-try-react-with-jsx`,children:`React JSX`}),` as a starting point, we basically `,(0,r.jsx)(i.a,{href:`/uilib/usage/first-steps/react`,children:`do this`}),`:`]}),`
`,(0,r.jsx)(n,{}),`
`,(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{className:`language-jsx`,children:`// Define the imports
import { Button } from '@dnb/eufemia'

// And consume the Component in your markup render method
render(<Button text="Primary Button" />)
`})}),`
`,(0,r.jsxs)(i.p,{children:[`You also may `,(0,r.jsx)(i.a,{href:`/uilib/usage/customisation/styling/consume-styles`,children:`import the styles`}),` on a higher level in your application:`]}),`
`,(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{className:`language-js`,children:`// e.g. in the App root
import '@dnb/eufemia/style'
`})}),`
`,(0,r.jsx)(i.p,{children:`You can also import a single style of one component at a time:`}),`
`,(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{className:`language-js`,children:`// Imports only the Button CSS and Main DNB Theme
import '@dnb/eufemia/components/button/style'
import '@dnb/eufemia/components/button/style/themes/ui'
`})}),`
`,(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{className:`language-jsx`,children:`<Button text="Button" onClick={myClickHandler} />
`})}),`
`,(0,r.jsx)(i.h2,{children:`Importing components and elements`}),`
`,(0,r.jsxs)(i.p,{children:[`By default, you can import `,(0,r.jsx)(i.code,{children:`components`}),` and `,(0,r.jsx)(i.code,{children:`elements`}),` from the root:`]}),`
`,(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{className:`language-js`,children:`import { Button } from '@dnb/eufemia'
`})}),`
`,(0,r.jsxs)(i.p,{children:[`As the `,(0,r.jsx)(i.code,{children:`@dnb/eufemia`}),` uses `,(0,r.jsx)(i.a,{href:`/uilib/usage/first-steps/module-formats#default-module-format`,children:`ESM`}),` as its default module format, we get a good tree shaking with most of the bundler tools commonly used.`]}),`
`,(0,r.jsx)(i.p,{children:`But you can be more specific if you want to:`}),`
`,(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{className:`language-js`,children:`import { Button } from '@dnb/eufemia/components'
`})}),`
`,(0,r.jsx)(i.p,{children:`And even go further:`}),`
`,(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{className:`language-js`,children:`import Button from '@dnb/eufemia/components/Button'

// or

import Button from '@dnb/eufemia/components/button/Button'
`})}),`
`,(0,r.jsx)(i.h3,{children:`Importing extensions`}),`
`,(0,r.jsxs)(i.p,{children:[`Extensions you would have to import explicitly from `,(0,r.jsx)(i.code,{children:`/extensions`})]}),`
`,(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{className:`language-js`,children:`import { ... } from '@dnb/eufemia/extensions'
`})}),`
`,(0,r.jsx)(i.h3,{children:`Importing icons`}),`
`,(0,r.jsxs)(i.p,{children:[`The same applies to icons, you would have to import them explicitly from `,(0,r.jsx)(i.code,{children:`/icons`})]}),`
`,(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{className:`language-js`,children:`import { bell_medium as Bell } from '@dnb/eufemia/icons'

// or

import Bell from '@dnb/eufemia/icons/bell'
import BellMedium from '@dnb/eufemia/icons/bell_medium'
`})}),`
`,(0,r.jsx)(i.h2,{children:`UMD`}),`
`,(0,r.jsxs)(i.p,{children:[`In case you do not have a compiling/build process, you can use the UMD packed version of the `,(0,r.jsx)(i.code,{children:`@dnb/eufemia`}),`.`]}),`
`,(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{className:`language-html`,children:`<html>
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
`})})]})}function a(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(i,{...e})}):i(e)}export{a as default};