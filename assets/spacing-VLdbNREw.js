import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{B as n}from"./index-DdG6L_K8.js";import{t as r}from"./spacing-table-DVXrVpv4.js";var i=e(t());function a(e){let t={a:`a`,code:`code`,h1:`h1`,h2:`h2`,h3:`h3`,img:`img`,p:`p`,pre:`pre`,strong:`strong`,...n(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h1,{children:`Spacing`}),`
`,(0,i.jsx)(t.h2,{children:`Spatial System`}),`
`,(0,i.jsxs)(t.p,{children:[`Eufemia has a `,(0,i.jsx)(t.a,{href:`/quickguide-designer/spatial-system`,children:`Spatial System`}),` with a grid of `,(0,i.jsx)(t.strong,{children:`8px`}),` (0.5rem). This is simply a guide grid which helps with making design decisions about the sizes of components, elements, margins, paddings etc.`]}),`
`,(0,i.jsx)(t.p,{children:(0,i.jsx)(t.img,{src:`../usage/assets/ux-layout-spacing.png`,alt:`UX layout spacing`})}),`
`,(0,i.jsxs)(t.p,{children:[`Also have a look at the designers example guide on `,(0,i.jsx)(t.a,{href:`/quickguide-designer/inspiration#using-eufemias-spatial-system-for-layout`,children:`using Eufemia's spatial system for layout`}),`.`]}),`
`,(0,i.jsx)(t.h2,{children:`Spacing Helpers`}),`
`,(0,i.jsx)(t.p,{children:`Spacing follows a specific pattern:`}),`
`,(0,i.jsx)(r,{}),`
`,(0,i.jsx)(t.h3,{children:`Code Editor Extensions`}),`
`,(0,i.jsxs)(t.p,{children:[`You may be interested to install an `,(0,i.jsx)(t.a,{href:`/uilib/usage/first-steps/tools/#code-editor-extensions`,children:`Eufemia code editor extension`}),` that allows you to quickly auto complete the correct spacing.`]}),`
`,(0,i.jsx)(t.h2,{children:`Components and Spacing`}),`
`,(0,i.jsxs)(t.p,{children:[`Also, have a look at the `,(0,i.jsx)(t.a,{href:`/uilib/layout/space`,children:`Space`}),` component and the fact that every component supports `,(0,i.jsx)(t.a,{href:`/uilib/layout/space#components-and-spacing`,children:`spacing out of the box`}),`.`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-jsx`,children:`<Button top="small" />
<Button right="large x-small medium" />
<Button space={{ top:'small', right: 'large x-small medium' }} />
`})}),`
`,(0,i.jsx)(t.h3,{children:`CSS Custom Property`}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-css`,children:`margin-top: calc(var(--spacing-large) + var(--spacing-small));
`})}),`
`,(0,i.jsx)(t.h3,{children:`The Space component and Space Components (Emotion)`}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-js`,children:`import { Space } from '@dnb/eufemia/components'

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
`,(0,i.jsx)(t.h2,{children:`Using Spacing helpers`}),`
`,(0,i.jsx)(t.p,{children:`You may use the internals to build helpers suited to your needs.`}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { calc } from '@dnb/eufemia/components/space/SpacingUtils'

// With Styled Components
const StyledDiv = styled.div\`
  margin-top: \${calc('medium large')};
  margin-top: \${calc('medium', 'large')};
  margin-top: \${calc('1.5rem', '2rem')};
  margin-top: \${calc('24px', '32px')};
\`
`})}),`
`,(0,i.jsxs)(t.p,{children:[`All of the examples do output: `,(0,i.jsx)(t.code,{children:`calc(var(--spacing-medium) + var(--spacing-large))`})]}),`
`,(0,i.jsxs)(t.p,{children:[`Invalid values will be corrected to its nearest spacing type (e.g. 17px to `,(0,i.jsx)(t.code,{children:`var(--spacing-small)`}),`).`]})]})}function o(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}export{o as default};