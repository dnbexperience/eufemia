import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{W as n}from"./index-BCXtuv-b.js";import r from"./demos-CkQL6CXL.js";var i=e(t());function a(e){let t={a:`a`,code:`code`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...n(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h2,{children:`Import`}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { AriaLive } from '@dnb/eufemia'
`})}),`
`,(0,i.jsx)(t.h2,{children:`Description`}),`
`,(0,i.jsx)(t.p,{children:`AriaLive is a React component and hook that helps make your web app more accessible by adding or defining an ARIA live region that announces dynamic changes to screen readers.`}),`
`,(0,i.jsx)(t.p,{children:`Use it to manually inform users using a screen reader about changes on the screen that are not normally covered by screen readers.`}),`
`,(0,i.jsxs)(t.p,{children:[`By default, the `,(0,i.jsx)(t.code,{children:`AriaLive`}),` component will announce changes to the screen reader in a polite manner. This means that the announcement will wait until the screen reader is idle. This is the recommended way to use the component.`]}),`
`,(0,i.jsx)(t.h2,{children:`Relevant links`}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/aria-live`,children:`Source code`})}),`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/aria-live`,children:`Docs code`})}),`
`]}),`
`,(0,i.jsx)(t.h2,{children:`Usage`}),`
`,(0,i.jsx)(t.p,{children:`For invisible text content:`}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { AriaLive } from '@dnb/eufemia'
render(<AriaLive>invisible message to announce</AriaLive>)
`})}),`
`,(0,i.jsx)(t.p,{children:`For content that is visible, but where changes need to be announced:`}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { AriaLive } from '@dnb/eufemia'
render(
  <AriaLive variant="content">
    <ul>
      <li>item one</li>
      <li>item two</li>
      {/* When item three appears, it will be announced */}
    </ul>
  </AriaLive>
)
`})}),`
`,(0,i.jsx)(t.h2,{children:`Priority`}),`
`,(0,i.jsxs)(t.p,{children:[`The `,(0,i.jsx)(t.code,{children:`priority`}),` property in the `,(0,i.jsx)(t.code,{children:`AriaLive`}),` component is used to control the urgency of the announcement. It can be set to `,(0,i.jsx)(t.code,{children:`high`}),` (defaults to `,(0,i.jsx)(t.code,{children:`low`}),`). This allows you to control how assertive the announcement should be, helping to create a better user experience for users who rely on screen readers.`]}),`
`,(0,i.jsx)(t.h2,{children:`AriaLive Hook`}),`
`,(0,i.jsxs)(t.p,{children:[`The `,(0,i.jsx)(t.code,{children:`useAriaLive`}),` hook is a part of the `,(0,i.jsx)(t.code,{children:`AriaLive`}),` component. It can be used to make announcements in functional components. In this example `,(0,i.jsx)(t.code,{children:`<section>`}),` is turned into an ARIA live region with all the functionality of the `,(0,i.jsx)(t.code,{children:`<AriaLive>`}),` component:`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import useAriaLive from '@dnb/eufemia/components/aria-live/useAriaLive'

function MyCustomAriaLive(props) {
  const ariaAttributes = useAriaLive(props)
  return <section {...ariaAttributes} />
}
`})})]})}function o(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}function s(e){return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(o,{}),`
`,(0,i.jsx)(r,{})]})}function c(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(s,{...e})}):s(e)}export{c as default};