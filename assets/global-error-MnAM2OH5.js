import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{K as n}from"./index-CsG353ar.js";import r from"./demos-XpID2F4p.js";var i=e(t());function a(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...n(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h2,{children:`Import`}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { GlobalError } from '@dnb/eufemia'
`})}),`
`,(0,i.jsx)(t.h2,{children:`Description`}),`
`,(0,i.jsxs)(t.p,{children:[`The GlobalError is a simple component to integrate when a `,(0,i.jsx)(t.code,{children:`404`}),` or `,(0,i.jsx)(t.code,{children:`500`}),` has to be shown.`]}),`
`,(0,i.jsxs)(t.p,{children:[`This page component is `,(0,i.jsx)(t.strong,{children:`responsive`}),` and should be used as a `,(0,i.jsx)(t.strong,{children:`client wide`}),` (fullscreen) component.`]}),`
`,(0,i.jsx)(t.h3,{children:`Heading level`}),`
`,(0,i.jsxs)(t.p,{children:[`The GlobalError component uses the `,(0,i.jsx)(t.a,{href:`/uilib/components/heading`,children:`Heading`}),` component for its title. By default it renders as an `,(0,i.jsx)(t.code,{children:`h1`}),`, but it automatically respects the surrounding `,(0,i.jsx)(t.code,{children:`Heading.Level`}),` context. This means you can place it inside a `,(0,i.jsx)(t.code,{children:`Heading.Level`}),` to avoid duplicate `,(0,i.jsx)(t.code,{children:`h1`}),` elements on your page:`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`<Heading.Level reset={1}>
  <Heading>Page Title</Heading>
  {/* GlobalError title will render as h2 */}
  <GlobalError statusCode="500" />
</Heading.Level>
`})}),`
`,(0,i.jsxs)(t.p,{children:[`You may also take a look at how it behaves once `,(0,i.jsx)(t.a,{href:`/404`,children:`404`}),` or `,(0,i.jsx)(t.a,{href:`/500`,children:`500`}),` is used in an application.`]}),`
`,(0,i.jsx)(t.h2,{children:`Relevant links`}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://www.figma.com/design/cdtwQD8IJ7pTeE45U148r1/%F0%9F%92%BB-Eufemia---Web?node-id=22259-19235`,children:`Figma`})}),`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/global-error`,children:`Source code`})}),`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/global-error`,children:`Docs code`})}),`
`]})]})}function o(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}function s(e){return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(o,{}),`
`,(0,i.jsx)(r,{})]})}function c(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(s,{...e})}):s(e)}export{c as default};