import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{U as n}from"./index-kfZVC31v.js";import r from"./demos-24-VUygj.js";var i=e(t());function a(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...n(),...e.components},{RelatedComponents:r}=t;return r||s(`RelatedComponents`,!0),(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h2,{children:`Import`}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Anchor } from '@dnb/eufemia'
`})}),`
`,(0,i.jsx)(t.h2,{children:`Description`}),`
`,(0,i.jsxs)(t.p,{children:[`The Anchor, also known as `,(0,i.jsx)(t.code,{children:`Link`}),`, is used to navigate from one page to the next HTML page.`]}),`
`,(0,i.jsx)(t.h2,{children:`Relevant links`}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://www.figma.com/design/cdtwQD8IJ7pTeE45U148r1/%F0%9F%92%BB-Eufemia---Web?node-id=4243-1500&p=f&t=hDnIGm5ME8DL6NoN-0`,children:`Figma`})}),`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/anchor`,children:`Source code`})}),`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/anchor`,children:`Docs code`})}),`
`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-jsx`,children:`import { Link, Anchor } from '@dnb/eufemia'
render(<Anchor href="/uilib/components/anchor">Accessible text</Anchor>)
`})}),`
`,(0,i.jsx)(t.h3,{children:`Combine a Link with an Anchor`}),`
`,(0,i.jsx)(t.p,{children:`You can combine a meta framework link with the Anchor. This way, all the framework-provided features will still work, as well as the behavior of the Eufemia Anchor.`}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-jsx`,children:`import Anchor from '@dnb/eufemia/components/Anchor'
import { Link } from 'react-router-dom'

render(
  <App>
    <Anchor element={Link} to="/path">
      Link
    </Anchor>
  </App>
)
`})}),`
`,(0,i.jsx)(t.h2,{children:`Blank target`}),`
`,(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.strong,{children:`NB:`}),` If you only use a vanilla HTML anchor element including `,(0,i.jsx)(t.code,{children:`target="_blank"`}),`, then you have to ensure you add a `,(0,i.jsx)(t.code,{children:`title`}),` attribute that includes `,(0,i.jsx)(t.code,{children:`Opens a new Window`}),` or as part of the text:`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-html`,children:`<a
  title="Opens a new Window"
  target="_blank"
  href="https://"
  class="dnb-anchor"
>
  text (opens in new window)
</a>
`})}),`
`,(0,i.jsx)(t.h2,{children:`Security`}),`
`,(0,i.jsxs)(t.p,{children:[`For security reasons, the Anchor removes `,(0,i.jsx)(t.code,{children:`href`}),` and `,(0,i.jsx)(t.code,{children:`to`}),` values that use a script-executing protocol (`,(0,i.jsx)(t.code,{children:`javascript:`}),` or `,(0,i.jsx)(t.code,{children:`vbscript:`}),`), including obfuscated variants such as `,(0,i.jsx)(t.code,{children:`java\\tscript:`}),`. This prevents cross-site scripting (XSS) when untrusted input is passed to these properties; the element then renders without a link target. Other protocols, such as `,(0,i.jsx)(t.code,{children:`data:`}),` and `,(0,i.jsx)(t.code,{children:`blob:`}),`, are left untouched.`]}),`
`,(0,i.jsx)(r,{})]})}function o(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}function s(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}function c(e){return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(o,{}),`
`,(0,i.jsx)(r,{})]})}function l(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(c,{...e})}):c(e)}export{l as default};