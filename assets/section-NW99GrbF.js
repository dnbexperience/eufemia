import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{K as n}from"./index-ppRu2ktv.js";import r from"./demos-DX6R9nc9.js";var i=e(t());function a(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...n(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h2,{children:`Import`}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Section } from '@dnb/eufemia'
`})}),`
`,(0,i.jsx)(t.h2,{children:`Description`}),`
`,(0,i.jsx)(t.p,{children:`The Section component is a visual helper. It wraps content inside a visual section banner.`}),`
`,(0,i.jsx)(t.h2,{children:`Relevant links`}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/section`,children:`Source code`})}),`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/section`,children:`Docs code`})}),`
`]}),`
`,(0,i.jsx)(t.h3,{children:`Breakout / fullscreen`}),`
`,(0,i.jsxs)(t.p,{children:[`Under the hood, it uses a couple of tricks to achieve an infinite fullscreen size. You do not need to do anything more than you normally would with your content. The background of the Section component will extend beyond a `,(0,i.jsx)(t.code,{children:`max-width`}),` when enabled with the `,(0,i.jsx)(t.code,{children:`breakout`}),` property.`]}),`
`,(0,i.jsx)(t.h2,{children:`Usage`}),`
`,(0,i.jsxs)(t.p,{children:[`Many of the properties support `,(0,i.jsx)(t.a,{href:`/uilib/layout/media-queries/`,children:`media queries`}),`. This makes this component well suited to change its look based on screen sizes.`]}),`
`,(0,i.jsx)(t.p,{children:`Each of these properties do support either a single value or an object containing one or more media query sizes:`}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-js`,children:`{
  small: false,
  medium: true,
  large: true,
}
`})}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.code,{children:`breakout={boolean}`}),` or e.g. `,(0,i.jsx)(t.code,{children:`breakout={{ small: boolean }}`})]}),`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.code,{children:`roundedCorner={boolean}`}),` or e.g. `,(0,i.jsx)(t.code,{children:`roundedCorner={{ small: boolean }}`})]}),`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.code,{children:`outline={boolean|string}`}),` or e.g. `,(0,i.jsx)(t.code,{children:`outline={{ small: 'black' }}`})]}),`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.code,{children:`backgroundColor={string}`}),` or e.g. `,(0,i.jsx)(t.code,{children:`backgroundColor={{ small: 'white' }}`})]}),`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.code,{children:`textColor={string}`}),` or e.g. `,(0,i.jsx)(t.code,{children:`textColor={{ small: 'black-80' }}`})]}),`
`,(0,i.jsxs)(t.li,{children:[(0,i.jsx)(t.code,{children:`innerSpace={string}`}),` or e.g. `,(0,i.jsx)(t.code,{children:`innerSpace={{ small: { top: 'small' } }}`})]}),`
`]})]})}function o(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}function s(e){return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(o,{}),`
`,(0,i.jsx)(r,{})]})}function c(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(s,{...e})}):s(e)}export{c as default};