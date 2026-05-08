import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Lr as t}from"./index--zEB_f_m.js";import n from"./demos-BOqdzd61.js";var r=e();function i(e){let n={a:`a`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...t(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h2,{children:`Import`}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Anchor } from '@dnb/eufemia'
`})}),`
`,(0,r.jsx)(n.h2,{children:`Description`}),`
`,(0,r.jsxs)(n.p,{children:[`The Anchor, also known as `,(0,r.jsx)(n.code,{children:`Link`}),`, is used to navigate from one page to the next HTML page.`]}),`
`,(0,r.jsx)(n.h2,{children:`Relevant links`}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`https://www.figma.com/design/cdtwQD8IJ7pTeE45U148r1/%F0%9F%92%BB-Eufemia---Web?node-id=4243-1500&p=f&t=hDnIGm5ME8DL6NoN-0`,children:`Figma`})}),`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/anchor`,children:`Source code`})}),`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/anchor`,children:`Docs code`})}),`
`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-jsx`,children:`import { Link, Anchor } from '@dnb/eufemia'
render(<Anchor href="/uilib/components/anchor">Accessible text</Anchor>)
`})}),`
`,(0,r.jsx)(n.h3,{children:`Combine a Link with an Anchor`}),`
`,(0,r.jsx)(n.p,{children:`You can combine a meta framework link with the Anchor. This way, all the framework-provided features will still work, as well as the behavior of the Eufemia Anchor.`}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-jsx`,children:`import Anchor from '@dnb/eufemia/components/Anchor'
import { Link } from 'react-router-dom'

render(
  <App>
    <Anchor element={Link} to="/path">
      Link
    </Anchor>
  </App>
)
`})}),`
`,(0,r.jsx)(n.h2,{children:`Blank target`}),`
`,(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:`NB:`}),` If you only use a vanilla HTML anchor element including `,(0,r.jsx)(n.code,{children:`target="_blank"`}),`, then you have to ensure you add a `,(0,r.jsx)(n.code,{children:`title`}),` attribute that includes `,(0,r.jsx)(n.code,{children:`Opens a new Window`}),` or as part of the text:`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-html`,children:`<a
  title="Opens a new Window"
  target="_blank"
  href="https://"
  class="dnb-anchor"
>
  text (opens in new window)
</a>
`})})]})}function a(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(i,{...e})}):i(e)}function o(e){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(a,{}),`
`,(0,r.jsx)(n,{})]})}function s(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(o,{...e})}):o(e)}export{s as default};