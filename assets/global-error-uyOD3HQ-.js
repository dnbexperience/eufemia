import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Lr as t}from"./index-DVm0MbGb.js";import n from"./demos-cXDxjrVq.js";var r=e();function i(e){let n={a:`a`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...t(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h2,{children:`Import`}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { GlobalError } from '@dnb/eufemia'
`})}),`
`,(0,r.jsx)(n.h2,{children:`Description`}),`
`,(0,r.jsxs)(n.p,{children:[`The GlobalError is a simple component to integrate when a `,(0,r.jsx)(n.code,{children:`404`}),` or `,(0,r.jsx)(n.code,{children:`500`}),` has to be shown.`]}),`
`,(0,r.jsxs)(n.p,{children:[`This page component is `,(0,r.jsx)(n.strong,{children:`responsive`}),` and should be used as a `,(0,r.jsx)(n.strong,{children:`client wide`}),` (fullscreen) component.`]}),`
`,(0,r.jsx)(n.h3,{children:`Heading level`}),`
`,(0,r.jsxs)(n.p,{children:[`The GlobalError component uses the `,(0,r.jsx)(n.a,{href:`/uilib/components/heading`,children:`Heading`}),` component for its title. By default it renders as an `,(0,r.jsx)(n.code,{children:`h1`}),`, but it automatically respects the surrounding `,(0,r.jsx)(n.code,{children:`Heading.Level`}),` context. This means you can place it inside a `,(0,r.jsx)(n.code,{children:`Heading.Level`}),` to avoid duplicate `,(0,r.jsx)(n.code,{children:`h1`}),` elements on your page:`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`<Heading.Level reset={1}>
  <Heading>Page Title</Heading>
  {/* GlobalError title will render as h2 */}
  <GlobalError statusCode="500" />
</Heading.Level>
`})}),`
`,(0,r.jsxs)(n.p,{children:[`You may also take a look at how it behaves once `,(0,r.jsx)(n.a,{href:`/404`,children:`404`}),` or `,(0,r.jsx)(n.a,{href:`/500`,children:`500`}),` is used in an application.`]}),`
`,(0,r.jsx)(n.h2,{children:`Relevant links`}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`https://www.figma.com/design/cdtwQD8IJ7pTeE45U148r1/%F0%9F%92%BB-Eufemia---Web?node-id=22259-19235`,children:`Figma`})}),`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/global-error`,children:`Source code`})}),`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/global-error`,children:`Docs code`})}),`
`]})]})}function a(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(i,{...e})}):i(e)}function o(e){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(a,{}),`
`,(0,r.jsx)(n,{})]})}function s(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(o,{...e})}):o(e)}export{s as default};