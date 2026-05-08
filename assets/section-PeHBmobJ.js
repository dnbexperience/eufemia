import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Lr as t}from"./index--zEB_f_m.js";import n from"./demos-Cyx8LtRl.js";var r=e();function i(e){let n={a:`a`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...t(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h2,{children:`Import`}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Section } from '@dnb/eufemia'
`})}),`
`,(0,r.jsx)(n.h2,{children:`Description`}),`
`,(0,r.jsx)(n.p,{children:`The Section component is a visual helper. It wraps content inside a visual section banner.`}),`
`,(0,r.jsx)(n.h2,{children:`Relevant links`}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/section`,children:`Source code`})}),`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/section`,children:`Docs code`})}),`
`]}),`
`,(0,r.jsx)(n.h3,{children:`Breakout / fullscreen`}),`
`,(0,r.jsxs)(n.p,{children:[`Under the hood, it uses a couple of tricks to achieve an infinite fullscreen size. You do not need to do anything more than you normally would with your content. The background of the Section component will extend beyond a `,(0,r.jsx)(n.code,{children:`max-width`}),` when enabled with the `,(0,r.jsx)(n.code,{children:`breakout`}),` property.`]}),`
`,(0,r.jsx)(n.h2,{children:`Usage`}),`
`,(0,r.jsxs)(n.p,{children:[`Many of the properties support `,(0,r.jsx)(n.a,{href:`/uilib/layout/media-queries/`,children:`media queries`}),`. This makes this component well suited to change its look based on screen sizes.`]}),`
`,(0,r.jsx)(n.p,{children:`Each of these properties do support either a single value or an object containing one or more media query sizes:`}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-js`,children:`{
  small: false,
  medium: true,
  large: true,
}
`})}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:`breakout={boolean}`}),` or e.g. `,(0,r.jsx)(n.code,{children:`breakout={{ small: boolean }}`})]}),`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:`roundedCorner={boolean}`}),` or e.g. `,(0,r.jsx)(n.code,{children:`roundedCorner={{ small: boolean }}`})]}),`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:`outline={boolean|string}`}),` or e.g. `,(0,r.jsx)(n.code,{children:`outline={{ small: 'black' }}`})]}),`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:`backgroundColor={string}`}),` or e.g. `,(0,r.jsx)(n.code,{children:`backgroundColor={{ small: 'white' }}`})]}),`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:`textColor={string}`}),` or e.g. `,(0,r.jsx)(n.code,{children:`textColor={{ small: 'black-80' }}`})]}),`
`,(0,r.jsxs)(n.li,{children:[(0,r.jsx)(n.code,{children:`innerSpace={string}`}),` or e.g. `,(0,r.jsx)(n.code,{children:`innerSpace={{ small: { top: 'small' } }}`})]}),`
`]})]})}function a(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(i,{...e})}):i(e)}function o(e){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(a,{}),`
`,(0,r.jsx)(n,{})]})}function s(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(o,{...e})}):o(e)}export{s as default};