import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Rr as t}from"./index-CMgyXmp3.js";var n=e();function r(e){let r={a:`a`,code:`code`,em:`em`,h1:`h1`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...t(),...e.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(r.h1,{children:`v4.10`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`#since-last-release-info`,children:`Since last release info`})}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.a,{href:`#globalstatus`,children:`GlobalStatus`}),` (`,(0,n.jsx)(r.strong,{children:`new`}),`)`]}),`
`,(0,n.jsx)(r.li,{children:(0,n.jsx)(r.a,{href:`#install`,children:`How to Install`})}),`
`,(0,n.jsxs)(r.li,{children:[`More in the `,(0,n.jsx)(r.a,{href:`https://github.com/dnbexperience/eufemia/releases`,children:`Releases section on GitHub`})]}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`Since last release info`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.a,{href:`/uilib/components/dropdown`,children:`Dropdown`}),` got several new properties like `,(0,n.jsx)(r.code,{children:`prevent_selection`}),` (Popup Menu), `,(0,n.jsx)(r.code,{children:`size`}),` (small), `,(0,n.jsx)(r.code,{children:`align_options`}),` (right) and `,(0,n.jsx)(r.code,{children:`more_menu`}),`. For the `,(0,n.jsx)(r.code,{children:`more_menu`}),`, have a look at the Demos and also take a look at `,(0,n.jsx)(r.strong,{children:`Popup Menu`}),`.`]}),`
`,(0,n.jsxs)(r.li,{children:[(0,n.jsx)(r.a,{href:`/uilib/components/date-picker`,children:`DatePicker`}),` is now using v2 of `,(0,n.jsx)(r.code,{children:`date-fns`}),` and with this it's easier to translate to English (including new properties `,(0,n.jsx)(r.code,{children:`submit_button_text`}),` and `,(0,n.jsx)(r.code,{children:`cancel_button_text`}),`), as Norwegian (`,(0,n.jsx)(r.code,{children:`nb`}),`) is the default `,(0,n.jsx)(r.code,{children:`locale`}),`. But also `,(0,n.jsx)(r.code,{children:`align_picker`}),` is a nice feature to have.`]}),`
`,(0,n.jsxs)(r.li,{children:[`Also mostly every "from" component now supports HTML `,(0,n.jsx)(r.code,{children:`data-*`}),` attributes in event returns.`]}),`
`]}),`
`,(0,n.jsx)(r.h2,{children:`GlobalStatus`}),`
`,(0,n.jsx)(r.p,{children:`This component is made to be used for mainly three UX situations:`}),`
`,(0,n.jsxs)(r.ul,{children:[`
`,(0,n.jsx)(r.li,{children:`Global application error messages`}),`
`,(0,n.jsx)(r.li,{children:`User-generated error messages`}),`
`,(0,n.jsx)(r.li,{children:`User input correction advices`}),`
`]}),`
`,(0,n.jsx)(r.p,{children:`The component has to be placed directly under a header bar (UX principles). From there it will expand / slide down once a message is appearing.`}),`
`,(0,n.jsxs)(r.p,{children:[`Every "form" component, like `,(0,n.jsx)(r.a,{href:`/uilib/components/dropdown`,children:`Input`}),` will automatically connect and update the `,(0,n.jsx)(r.a,{href:`/uilib/components/global-status`,children:`GlobalStatus`}),` once an error status is show to the form component:`]}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-jsx`,children:`import { Input } from 'dnb-ui-lib/components'

// 1. Place it under the header bar
<GlobalStatus />

// 2. Else where in your app - input with error status
<Input label="My Input" status="Error message" />
`})}),`
`,(0,n.jsx)(r.p,{children:`But you can also manually update / show as many messages as you want:`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-jsx`,children:`import { GlobalStatus } from 'dnb-ui-lib/components'

// 1. Place it under the header bar
<GlobalStatus />

// 2. Else where in you app and later on, you can show a message
<GlobalStatus.Add
  status_id="custom-id-1"
  title="New title"
  text="First long info text ..."
  item="Item from status #1"
/>

// 3. and remove it again whenever you want
<GlobalStatus.Remove status_id="custom-id-1" />
`})}),`
`,(0,n.jsx)(r.h2,{children:`Install`}),`
`,(0,n.jsx)(r.p,{children:`To upgrade to v4.10 with NPM, use:`}),`
`,(0,n.jsx)(r.pre,{children:(0,n.jsx)(r.code,{className:`language-bash`,children:`$ npm i dnb-ui-lib@4.10

# In case the NPM mirroring is not up to date
$ npm i https://github.com/dnbexperience/eufemia/releases/download/v4.10.0/dnb-ui-lib-4.10.0.tgz
`})}),`
`,(0,n.jsx)(r.p,{children:(0,n.jsx)(r.em,{children:`August, 24. 2019`})})]})}function i(e={}){let{wrapper:i}={...t(),...e.components};return i?(0,n.jsx)(i,{...e,children:(0,n.jsx)(r,{...e})}):r(e)}export{i as default};