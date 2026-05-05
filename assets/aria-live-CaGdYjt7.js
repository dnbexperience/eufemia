import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Rr as t}from"./index-CMgyXmp3.js";import n from"./demos-VshqpJFw.js";var r=e();function i(e){let n={a:`a`,code:`code`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...t(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h2,{children:`Import`}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { AriaLive } from '@dnb/eufemia'
`})}),`
`,(0,r.jsx)(n.h2,{children:`Description`}),`
`,(0,r.jsx)(n.p,{children:`AriaLive is a React component and hook that helps make your web app more accessible by adding or defining an ARIA live region that announces dynamic changes to screen readers.`}),`
`,(0,r.jsx)(n.p,{children:`Use it to manually inform users using a screen reader about changes on the screen that are not normally covered by screen readers.`}),`
`,(0,r.jsxs)(n.p,{children:[`By default, the `,(0,r.jsx)(n.code,{children:`AriaLive`}),` component will announce changes to the screen reader in a polite manner. This means that the announcement will wait until the screen reader is idle. This is the recommended way to use the component.`]}),`
`,(0,r.jsx)(n.h2,{children:`Relevant links`}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/aria-live`,children:`Source code`})}),`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/aria-live`,children:`Docs code`})}),`
`]}),`
`,(0,r.jsx)(n.h2,{children:`Usage`}),`
`,(0,r.jsx)(n.p,{children:`For invisible text content:`}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { AriaLive } from '@dnb/eufemia'
render(<AriaLive>invisible message to announce</AriaLive>)
`})}),`
`,(0,r.jsx)(n.p,{children:`For content that is visible, but where changes need to be announced:`}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { AriaLive } from '@dnb/eufemia'
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
`,(0,r.jsx)(n.h2,{children:`Priority`}),`
`,(0,r.jsxs)(n.p,{children:[`The `,(0,r.jsx)(n.code,{children:`priority`}),` property in the `,(0,r.jsx)(n.code,{children:`AriaLive`}),` component is used to control the urgency of the announcement. It can be set to `,(0,r.jsx)(n.code,{children:`high`}),` (defaults to `,(0,r.jsx)(n.code,{children:`low`}),`). This allows you to control how assertive the announcement should be, helping to create a better user experience for users who rely on screen readers.`]}),`
`,(0,r.jsx)(n.h2,{children:`AriaLive Hook`}),`
`,(0,r.jsxs)(n.p,{children:[`The `,(0,r.jsx)(n.code,{children:`useAriaLive`}),` hook is a part of the `,(0,r.jsx)(n.code,{children:`AriaLive`}),` component. It can be used to make announcements in functional components. In this example `,(0,r.jsx)(n.code,{children:`<section>`}),` is turned into an ARIA live region with all the functionality of the `,(0,r.jsx)(n.code,{children:`<AriaLive>`}),` component:`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import useAriaLive from '@dnb/eufemia/components/aria-live/useAriaLive'

function MyCustomAriaLive(props) {
  const ariaAttributes = useAriaLive(props)
  return <section {...ariaAttributes} />
}
`})})]})}function a(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(i,{...e})}):i(e)}function o(e){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(a,{}),`
`,(0,r.jsx)(n,{})]})}function s(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(o,{...e})}):o(e)}export{s as default};