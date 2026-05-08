import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Lr as t}from"./index--zEB_f_m.js";import n from"./demos-CzpBrb5j.js";var r=e();function i(e){let n={a:`a`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...t(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h2,{children:`Import`}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { ToggleButton } from '@dnb/eufemia'
`})}),`
`,(0,r.jsx)(n.h2,{children:`Description`}),`
`,(0,r.jsx)(n.p,{children:`The ToggleButton component is used to toggle on or off a limited number of choices.`}),`
`,(0,r.jsx)(n.h2,{children:`Relevant links`}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`https://www.figma.com/design/cdtwQD8IJ7pTeE45U148r1/%F0%9F%92%BB-Eufemia---Web?node-id=4243-1493`,children:`Figma`})}),`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/toggle-button`,children:`Source code`})}),`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/toggle-button`,children:`Docs code`})}),`
`]}),`
`,(0,r.jsx)(n.h2,{children:`Accessibility`}),`
`,(0,r.jsxs)(n.p,{children:[`ToggleButton components use `,(0,r.jsx)(n.code,{children:`role="button"`}),` with `,(0,r.jsx)(n.code,{children:`aria-pressed`}),` to communicate their state to assistive technologies. When used in a group, navigation between buttons is possible using arrow keys, following standard toolbar interaction patterns.`]}),`
`,(0,r.jsxs)(n.p,{children:[`You can use the React component `,(0,r.jsx)(n.code,{children:`<ToggleButton.Group>`}),` to wrap several `,(0,r.jsx)(n.code,{children:`ToggleButton`}),` components. This makes it easier to handle the `,(0,r.jsx)(n.code,{children:`onChange`}),` event at a higher level, as well as several other `,(0,r.jsx)(n.a,{href:`/uilib/components/toggle-button/properties`,children:`context-related properties`}),`.`]}),`
`,(0,r.jsxs)(n.p,{children:[`By default, the `,(0,r.jsx)(n.code,{children:`ToggleButton.Group`}),` is single-select, like a `,(0,r.jsx)(n.a,{href:`/uilib/components/radio`,children:`Radio`}),` button. However, you can easily enable `,(0,r.jsx)(n.code,{children:`multiselect`}),` as well.`]}),`
`,(0,r.jsx)(n.h2,{children:`How to use`}),`
`,(0,r.jsxs)(n.p,{children:[`You can use the ToggleButton in different modes. Either as a stand-alone component or together with the `,(0,r.jsx)(n.code,{children:`ToggleButton.Group`}),` context.`]}),`
`,(0,r.jsx)(n.h3,{children:`Multi-select`}),`
`,(0,r.jsxs)(n.p,{children:[`If `,(0,r.jsx)(n.code,{children:`multiselect`}),` is enabled on the group, several items can be enabled or disabled by the user.`]}),`
`,(0,r.jsxs)(n.p,{children:[`You need to decide if you want to track the state yourself by using the `,(0,r.jsx)(n.code,{children:`checked`}),` property, or if you want to listen to the internal state with `,(0,r.jsx)(n.code,{children:`onChange(({ values }) => console.log(values))`}),`. In this case, you also need to give every item a `,(0,r.jsx)(n.code,{children:`value`}),` property.`]})]})}function a(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(i,{...e})}):i(e)}function o(e){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(a,{}),`
`,(0,r.jsx)(n,{})]})}function s(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(o,{...e})}):o(e)}export{s as default};