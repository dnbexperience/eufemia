import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{U as n}from"./index-kfZVC31v.js";import{n as r,t as i}from"./Intro-DTsaBE7b.js";var a=e(t());function o(e){let t={a:`a`,code:`code`,h1:`h1`,hr:`hr`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...n(),...e.components};return(0,a.jsxs)(i,{children:[(0,a.jsx)(t.h1,{children:`Usage of components and elements`}),(0,a.jsxs)(t.p,{children:[`Components and styles for HTML elements can be consumed differently. But for the sake of the matter of keeping the rule of `,(0,a.jsx)(t.strong,{children:`The Single Source of Truth`}),`, use the NPM Package: `,(0,a.jsx)(t.a,{href:`https://www.npmjs.com/package/@dnb/eufemia`,children:(0,a.jsx)(t.strong,{children:`@dnb/eufemia`})})]}),(0,a.jsxs)(t.ul,{children:[`
`,(0,a.jsx)(t.li,{children:`It is recommended to use ES import syntax`}),`
`,(0,a.jsxs)(t.li,{children:[(0,a.jsx)(t.a,{href:`/uilib/usage/customisation/styling/consume-styles`,children:`Import styles`}),` application wide:`]}),`
`]}),(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:`language-js`,children:`/* In your application root */
import '@dnb/eufemia/style/core'
import '@dnb/eufemia/style/themes/ui'
`})}),(0,a.jsxs)(t.ul,{children:[`
`,(0,a.jsxs)(t.li,{children:[(0,a.jsx)(t.a,{href:`/uilib/usage/first-steps/the-basics#compiler`,children:`Components can be imported`}),` both as:`]}),`
`]}),(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:`language-js`,children:`/* Named imports */
import { Button, ... } from '@dnb/eufemia'
import { Button, ... } from '@dnb/eufemia/components'
`})}),(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:`language-js`,children:`/* or default imports */
import MyButton from '@dnb/eufemia/components/Button'
`})}),(0,a.jsxs)(t.ul,{children:[`
`,(0,a.jsx)(t.li,{children:`HTML elements can be consumed as:`}),`
`]}),(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:`language-html`,children:`<!-- Classic HTML syntax with CSS class definition -->
<h4 class="dnb-h--xx-large">Title</h4>
`})}),(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:`language-js`,children:`/* or React JSX */
import { H1, P, Link, ... } from '@dnb/eufemia'
import H1 from '@dnb/eufemia/elements/H1'

render(<H1>Title</H1>)
`})}),(0,a.jsxs)(t.p,{children:[`Read more about using elements as `,(0,a.jsx)(t.a,{href:`/uilib/elements#react-jsx`,children:`React JSX`})]}),(0,a.jsx)(t.hr,{}),(0,a.jsx)(r,{href:`/uilib/intro/13-quality-and-tests`,text:`Next - Quality and Tests`})]})}function s(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(o,{...e})}):o(e)}export{s as default};