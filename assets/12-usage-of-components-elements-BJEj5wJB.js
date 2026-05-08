import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Lr as t}from"./index--zEB_f_m.js";import{n,t as r}from"./Intro-CYZ-l3Op.js";var i=e();function a(e){let a={a:`a`,code:`code`,h1:`h1`,hr:`hr`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...t(),...e.components};return(0,i.jsxs)(r,{children:[(0,i.jsx)(a.h1,{children:`Usage of components and elements`}),(0,i.jsxs)(a.p,{children:[`Components and styles for HTML elements can be consumed differently. But for the sake of the matter of keeping the rule of `,(0,i.jsx)(a.strong,{children:`The Single Source of Truth`}),`, use the NPM Package: `,(0,i.jsx)(a.a,{href:`https://www.npmjs.com/package/@dnb/eufemia`,children:(0,i.jsx)(a.strong,{children:`@dnb/eufemia`})})]}),(0,i.jsxs)(a.ul,{children:[`
`,(0,i.jsx)(a.li,{children:`It is recommended to use ES import syntax`}),`
`,(0,i.jsxs)(a.li,{children:[(0,i.jsx)(a.a,{href:`/uilib/usage/customisation/styling/consume-styles`,children:`Import styles`}),` application wide:`]}),`
`]}),(0,i.jsx)(a.pre,{children:(0,i.jsx)(a.code,{className:`language-js`,children:`/* In your application root */
import '@dnb/eufemia/style/core'
import '@dnb/eufemia/style/themes/ui'
`})}),(0,i.jsxs)(a.ul,{children:[`
`,(0,i.jsxs)(a.li,{children:[(0,i.jsx)(a.a,{href:`/uilib/usage/first-steps/the-basics#compiler`,children:`Components can be imported`}),` both as:`]}),`
`]}),(0,i.jsx)(a.pre,{children:(0,i.jsx)(a.code,{className:`language-js`,children:`/* Named imports */
import { Button, ... } from '@dnb/eufemia'
import { Button, ... } from '@dnb/eufemia/components'
`})}),(0,i.jsx)(a.pre,{children:(0,i.jsx)(a.code,{className:`language-js`,children:`/* or default imports */
import MyButton from '@dnb/eufemia/components/Button'
`})}),(0,i.jsxs)(a.ul,{children:[`
`,(0,i.jsx)(a.li,{children:`HTML elements can be consumed as:`}),`
`]}),(0,i.jsx)(a.pre,{children:(0,i.jsx)(a.code,{className:`language-html`,children:`<!-- Classic HTML syntax with CSS class definition -->
<h4 class="dnb-h--xx-large">Title</h4>
`})}),(0,i.jsx)(a.pre,{children:(0,i.jsx)(a.code,{className:`language-js`,children:`/* or React JSX */
import { H1, P, Link, ... } from '@dnb/eufemia'
import H1 from '@dnb/eufemia/elements/H1'

render(<H1>Title</H1>)
`})}),(0,i.jsxs)(a.p,{children:[`Read more about using elements as `,(0,i.jsx)(a.a,{href:`/uilib/elements#react-jsx`,children:`React JSX`})]}),(0,i.jsx)(a.hr,{}),(0,i.jsx)(n,{href:`/uilib/intro/13-quality-and-tests`,text:`Next - Quality and Tests`})]})}function o(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}export{o as default};