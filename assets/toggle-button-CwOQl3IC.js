import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{U as n}from"./index-BsJ3GLEw.js";import{t as r}from"./when-to-use-forms-LK79e8dK.js";import i from"./demos-BtSAD3Tb.js";var a=e(t());function o(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...n(),...e.components},{RelatedComponents:i}=t;return i||c(`RelatedComponents`,!0),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.h2,{children:`Import`}),`
`,(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:`language-tsx`,children:`import { ToggleButton } from '@dnb/eufemia'
`})}),`
`,(0,a.jsx)(t.h2,{children:`Description`}),`
`,(0,a.jsx)(t.p,{children:`The ToggleButton component is used to toggle on or off a limited number of choices.`}),`
`,(0,a.jsx)(t.h2,{children:`When to use ToggleButton vs Eufemia Forms`}),`
`,(0,a.jsx)(r,{}),`
`,(0,a.jsxs)(t.p,{children:[`The Eufemia Forms equivalent of `,(0,a.jsx)(t.code,{children:`ToggleButton`}),` is `,(0,a.jsx)(t.a,{href:`/uilib/extensions/forms/base-fields/Selection/`,children:`Field.Selection`}),` with the buttons variant (`,(0,a.jsx)(t.code,{children:`variant="buttons"`}),`), or `,(0,a.jsx)(t.a,{href:`/uilib/extensions/forms/base-fields/Boolean/`,children:`Field.Boolean`}),` with the button variant for on/off choices.`]}),`
`,(0,a.jsx)(t.h2,{children:`Relevant links`}),`
`,(0,a.jsxs)(t.ul,{children:[`
`,(0,a.jsx)(t.li,{children:(0,a.jsx)(t.a,{href:`https://www.figma.com/design/cdtwQD8IJ7pTeE45U148r1/%F0%9F%92%BB-Eufemia---Web?node-id=4243-1493`,children:`Figma`})}),`
`,(0,a.jsx)(t.li,{children:(0,a.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/toggle-button`,children:`Source code`})}),`
`,(0,a.jsx)(t.li,{children:(0,a.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/toggle-button`,children:`Docs code`})}),`
`]}),`
`,(0,a.jsx)(t.h2,{children:`Accessibility`}),`
`,(0,a.jsxs)(t.p,{children:[`ToggleButton components use `,(0,a.jsx)(t.code,{children:`role="button"`}),` with `,(0,a.jsx)(t.code,{children:`aria-pressed`}),` to communicate their state to assistive technologies. When used in a group, navigation between buttons is possible using arrow keys, following standard toolbar interaction patterns.`]}),`
`,(0,a.jsxs)(t.p,{children:[`You can use the React component `,(0,a.jsx)(t.code,{children:`<ToggleButton.Group>`}),` to wrap several `,(0,a.jsx)(t.code,{children:`ToggleButton`}),` components. This makes it easier to handle the `,(0,a.jsx)(t.code,{children:`onChange`}),` event at a higher level, as well as several other `,(0,a.jsx)(t.a,{href:`/uilib/components/toggle-button/properties`,children:`context-related properties`}),`.`]}),`
`,(0,a.jsxs)(t.p,{children:[`By default, the `,(0,a.jsx)(t.code,{children:`ToggleButton.Group`}),` is single-select, like a `,(0,a.jsx)(t.a,{href:`/uilib/components/radio`,children:`Radio`}),` button. However, you can easily enable `,(0,a.jsx)(t.code,{children:`multiselect`}),` as well.`]}),`
`,(0,a.jsx)(t.h2,{children:`How to use`}),`
`,(0,a.jsxs)(t.p,{children:[`You can use the ToggleButton in different modes. Either as a stand-alone component or together with the `,(0,a.jsx)(t.code,{children:`ToggleButton.Group`}),` context.`]}),`
`,(0,a.jsx)(t.h3,{children:`Multi-select`}),`
`,(0,a.jsxs)(t.p,{children:[`If `,(0,a.jsx)(t.code,{children:`multiselect`}),` is enabled on the group, several items can be enabled or disabled by the user.`]}),`
`,(0,a.jsxs)(t.p,{children:[`You need to decide if you want to track the state yourself by using the `,(0,a.jsx)(t.code,{children:`checked`}),` property, or if you want to listen to the internal state with `,(0,a.jsx)(t.code,{children:`onChange(({ values }) => console.log(values))`}),`. In this case, you also need to give every item a `,(0,a.jsx)(t.code,{children:`value`}),` property.`]}),`
`,(0,a.jsx)(i,{})]})}function s(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(o,{...e})}):o(e)}function c(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}function l(e){return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(s,{}),`
`,(0,a.jsx)(i,{})]})}function u(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(l,{...e})}):l(e)}export{u as default};