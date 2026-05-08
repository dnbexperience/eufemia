import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Lr as t}from"./index-2AO2Cu5K.js";import n from"./demos-D0PmdKNL.js";var r=e();function i(e){let n={a:`a`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...t(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h2,{children:`Import`}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Dropdown } from '@dnb/eufemia'
`})}),`
`,(0,r.jsx)(n.h2,{children:`Description`}),`
`,(0,r.jsx)(n.p,{children:`The Dropdown component is a fully custom-made component. This allows us to change its form based on context (small screens, touch devices, etc.).`}),`
`,(0,r.jsx)(n.h2,{children:`Relevant links`}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`https://www.figma.com/design/cdtwQD8IJ7pTeE45U148r1/%F0%9F%92%BB-Eufemia---Web?node-id=4243-1494`,children:`Figma`})}),`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/dropdown`,children:`Source code`})}),`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/dropdown`,children:`Docs code`})}),`
`]}),`
`,(0,r.jsx)(n.h3,{children:`When to use`}),`
`,(0,r.jsx)(n.p,{children:`Use a dropdown when you need to provide many options to the user but don't have space to display them all. The hidden options should only appear when the user requests them, reducing visual clutter.`}),`
`,(0,r.jsxs)(n.ol,{children:[`
`,(0,r.jsx)(n.li,{children:`When space is limited`}),`
`,(0,r.jsx)(n.li,{children:`When you want to reduce visual clutter`}),`
`,(0,r.jsx)(n.li,{children:`When it's intuitive for users to request hidden content`}),`
`]}),`
`,(0,r.jsx)(n.h3,{children:`When not to use`}),`
`,(0,r.jsxs)(n.ol,{children:[`
`,(0,r.jsxs)(n.li,{children:[`Do not use a dropdown if you have only a few options that could be shown using `,(0,r.jsx)(n.a,{href:`/uilib/components/radio`,children:`Radio buttons`}),` or `,(0,r.jsx)(n.a,{href:`/uilib/components/toggle-button`,children:`ToggleButtons`}),`.`]}),`
`]}),`
`,(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:`Note:`}),` This pattern can be constructed in various ways to achieve a similar effect—from using the HTML `,(0,r.jsx)(n.code,{children:`select`}),` element to custom building with divs, spans, and JavaScript.`]}),`
`,(0,r.jsx)(n.h2,{children:`Accessibility`}),`
`,(0,r.jsxs)(n.p,{children:[`When `,(0,r.jsx)(n.code,{children:`preventSelection`}),` is true, the Dropdown will use `,(0,r.jsx)(n.code,{children:`role="menu"`}),`, instead of `,(0,r.jsx)(n.code,{children:`role="listbox"`}),` for better screen reader support.`]}),`
`,(0,r.jsx)(n.h2,{children:`Custom size`}),`
`,(0,r.jsxs)(n.p,{children:[`You can change the `,(0,r.jsx)(n.strong,{children:`width`}),` of the Dropdown component with CSS by using:`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-css`,children:`.dnb-dropdown {
  --dropdown-width: 20rem; /* custom width */
}
`})}),`
`,(0,r.jsxs)(n.p,{children:[`You can also set the width directly, but then it has to be defined like so (including `,(0,r.jsx)(n.code,{children:`min-width`}),`):`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-css`,children:`/** Because of the included label/status etc. we target the "__shell" */
.dnb-dropdown__shell {
  width: 10rem;
}

/** In order to change only the drawer-list width */
.dnb-dropdown .dnb-drawer-list__root {
  width: 10rem;
}

/** If using popup style (no title) */
.dnb-dropdown--is-popup .dnb-drawer-list__root {
  width: 10rem;
}
`})})]})}function a(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(i,{...e})}):i(e)}function o(e){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(a,{}),`
`,(0,r.jsx)(n,{})]})}function s(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(o,{...e})}):o(e)}export{s as default};