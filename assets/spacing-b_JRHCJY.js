import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Lr as t}from"./index--zEB_f_m.js";import{t as n}from"./spacing-table-B0RoKw6_.js";var r=e();function i(e){let i={a:`a`,code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,img:`img`,p:`p`,pre:`pre`,strong:`strong`,...t(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(i.h1,{children:`Spacing`}),`
`,(0,r.jsx)(i.h2,{children:`Spatial System`}),`
`,(0,r.jsxs)(i.p,{children:[`Eufemia has a `,(0,r.jsx)(i.a,{href:`/quickguide-designer/spatial-system`,children:`Spatial System`}),` with a grid of `,(0,r.jsx)(i.strong,{children:`8px`}),` (0.5rem). This is simply a guide grid which helps with making design decisions about the sizes of components, elements, margins, paddings etc.`]}),`
`,(0,r.jsx)(i.p,{children:(0,r.jsx)(i.img,{src:`../usage/assets/ux-layout-spacing.png`,alt:`UX layout spacing`})}),`
`,(0,r.jsxs)(i.p,{children:[`Also have a look at the designers example guide on `,(0,r.jsx)(i.a,{href:`/quickguide-designer/inspiration#using-eufemias-spatial-system-for-layout`,children:`using Eufemia's spatial system for layout`}),`.`]}),`
`,(0,r.jsx)(i.h2,{children:`Spacing Helpers`}),`
`,(0,r.jsx)(i.p,{children:`Spacing follows a specific pattern:`}),`
`,(0,r.jsx)(n,{}),`
`,(0,r.jsx)(i.h3,{children:`Code Editor Extensions`}),`
`,(0,r.jsxs)(i.p,{children:[`You may be interested to install an `,(0,r.jsx)(i.a,{href:`/uilib/usage/first-steps/tools/#code-editor-extensions`,children:`Eufemia code editor extension`}),` that allows you to quickly auto complete the correct spacing.`]}),`
`,(0,r.jsx)(i.h2,{children:`Components and Spacing`}),`
`,(0,r.jsxs)(i.p,{children:[`Also, have a look at the `,(0,r.jsx)(i.a,{href:`/uilib/layout/space`,children:`Space`}),` component and the fact that every component supports `,(0,r.jsx)(i.a,{href:`/uilib/layout/space#components-and-spacing`,children:`spacing out of the box`}),`.`]}),`
`,(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{className:`language-jsx`,children:`<Button top="small" />
<Button right="large x-small medium" />
<Button space={{ top:'small', right: 'large x-small medium' }} />
`})}),`
`,(0,r.jsx)(i.h3,{children:`CSS Custom Property`}),`
`,(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{className:`language-css`,children:`margin-top: calc(var(--spacing-large) + var(--spacing-small));
`})}),`
`,(0,r.jsx)(i.h3,{children:`The Space component and Space Components (Emotion)`}),`
`,(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{className:`language-js`,children:`import { Space } from '@dnb/eufemia/components'

// A div with a margin-top of 2.5rem
<Space top="large x-small">
  ...
</Space>

// With Styled Components
const Custom = styled(Space)\`
  /* additional css */
\`
<Custom top="large x-small">
  ...
</Custom>
`})}),`
`,(0,r.jsx)(i.h2,{children:`Using Spacing helpers`}),`
`,(0,r.jsx)(i.p,{children:`You may use the internals to build helpers suited to your needs.`}),`
`,(0,r.jsx)(i.pre,{children:(0,r.jsx)(i.code,{className:`language-tsx`,children:`import { calc } from '@dnb/eufemia/components/space/SpacingUtils'

// With Styled Components
const StyledDiv = styled.div\`
  margin-top: \${calc('medium large')};
  margin-top: \${calc('medium', 'large')};
  margin-top: \${calc('1.5rem', '2rem')};
  margin-top: \${calc('24px', '32px')};
\`
`})}),`
`,(0,r.jsxs)(i.p,{children:[`All of the examples do output: `,(0,r.jsx)(i.code,{children:`calc(var(--spacing-medium) + var(--spacing-large))`})]}),`
`,(0,r.jsxs)(i.p,{children:[`Invalid values will be corrected to its nearest spacing type (e.g. 17px to `,(0,r.jsx)(i.code,{children:`var(--spacing-small)`}),`).`]})]})}function a(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(i,{...e})}):i(e)}export{a as default};