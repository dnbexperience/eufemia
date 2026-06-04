import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{W as n}from"./index-D7e1avVt.js";import r from"./demos-DHTJh7yJ.js";var i=e(t());function a(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...n(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h2,{children:`Import`}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { Dropdown } from '@dnb/eufemia'
`})}),`
`,(0,i.jsx)(t.h2,{children:`Description`}),`
`,(0,i.jsx)(t.p,{children:`The Dropdown component is a fully custom-made component. This allows us to change its form based on context (small screens, touch devices, etc.).`}),`
`,(0,i.jsx)(t.h2,{children:`Relevant links`}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://www.figma.com/design/cdtwQD8IJ7pTeE45U148r1/%F0%9F%92%BB-Eufemia---Web?node-id=4243-1494`,children:`Figma`})}),`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/dropdown`,children:`Source code`})}),`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/dropdown`,children:`Docs code`})}),`
`]}),`
`,(0,i.jsx)(t.h3,{children:`When to use`}),`
`,(0,i.jsx)(t.p,{children:`Use a dropdown when you need to provide many options to the user but don't have space to display them all. The hidden options should only appear when the user requests them, reducing visual clutter.`}),`
`,(0,i.jsxs)(t.ol,{children:[`
`,(0,i.jsx)(t.li,{children:`When space is limited`}),`
`,(0,i.jsx)(t.li,{children:`When you want to reduce visual clutter`}),`
`,(0,i.jsx)(t.li,{children:`When it's intuitive for users to request hidden content`}),`
`]}),`
`,(0,i.jsx)(t.h3,{children:`When not to use`}),`
`,(0,i.jsxs)(t.ol,{children:[`
`,(0,i.jsxs)(t.li,{children:[`Do not use a dropdown if you have only a few options that could be shown using `,(0,i.jsx)(t.a,{href:`/uilib/components/radio`,children:`Radio buttons`}),` or `,(0,i.jsx)(t.a,{href:`/uilib/components/toggle-button`,children:`ToggleButtons`}),`.`]}),`
`]}),`
`,(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.strong,{children:`Note:`}),` This pattern can be constructed in various ways to achieve a similar effect—from using the HTML `,(0,i.jsx)(t.code,{children:`select`}),` element to custom building with divs, spans, and JavaScript.`]}),`
`,(0,i.jsx)(t.h2,{children:`Accessibility`}),`
`,(0,i.jsxs)(t.p,{children:[`When `,(0,i.jsx)(t.code,{children:`preventSelection`}),` is true, the Dropdown will use `,(0,i.jsx)(t.code,{children:`role="menu"`}),`, instead of `,(0,i.jsx)(t.code,{children:`role="listbox"`}),` for better screen reader support.`]}),`
`,(0,i.jsx)(t.h2,{children:`Custom size`}),`
`,(0,i.jsxs)(t.p,{children:[`You can change the `,(0,i.jsx)(t.strong,{children:`width`}),` of the Dropdown component with CSS by using:`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-css`,children:`.dnb-dropdown {
  --dropdown-width: 20rem; /* custom width */
}
`})}),`
`,(0,i.jsxs)(t.p,{children:[`You can also set the width directly, but then it has to be defined like so (including `,(0,i.jsx)(t.code,{children:`min-width`}),`):`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-css`,children:`/** Because of the included label/status etc. we target the "__shell" */
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
`})})]})}function o(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}function s(e){return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(o,{}),`
`,(0,i.jsx)(r,{})]})}function c(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(s,{...e})}):s(e)}export{c as default};