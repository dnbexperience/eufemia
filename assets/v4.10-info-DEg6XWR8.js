import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{K as n}from"./index-CsG353ar.js";var r=e(t());function i(e){let t={a:`a`,code:`code`,em:`em`,h1:`h1`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...n(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.h1,{children:`v4.10`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsx)(t.li,{children:(0,r.jsx)(t.a,{href:`#since-last-release-info`,children:`Since last release info`})}),`
`,(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.a,{href:`#globalstatus`,children:`GlobalStatus`}),` (`,(0,r.jsx)(t.strong,{children:`new`}),`)`]}),`
`,(0,r.jsx)(t.li,{children:(0,r.jsx)(t.a,{href:`#install`,children:`How to Install`})}),`
`,(0,r.jsxs)(t.li,{children:[`More in the `,(0,r.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/releases`,children:`Releases section on GitHub`})]}),`
`]}),`
`,(0,r.jsx)(t.h2,{children:`Since last release info`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.a,{href:`/uilib/components/dropdown`,children:`Dropdown`}),` got several new properties like `,(0,r.jsx)(t.code,{children:`prevent_selection`}),` (Popup Menu), `,(0,r.jsx)(t.code,{children:`size`}),` (small), `,(0,r.jsx)(t.code,{children:`align_options`}),` (right) and `,(0,r.jsx)(t.code,{children:`more_menu`}),`. For the `,(0,r.jsx)(t.code,{children:`more_menu`}),`, have a look at the Demos and also take a look at `,(0,r.jsx)(t.strong,{children:`Popup Menu`}),`.`]}),`
`,(0,r.jsxs)(t.li,{children:[(0,r.jsx)(t.a,{href:`/uilib/components/date-picker`,children:`DatePicker`}),` is now using v2 of `,(0,r.jsx)(t.code,{children:`date-fns`}),` and with this it's easier to translate to English (including new properties `,(0,r.jsx)(t.code,{children:`submit_button_text`}),` and `,(0,r.jsx)(t.code,{children:`cancel_button_text`}),`), as Norwegian (`,(0,r.jsx)(t.code,{children:`nb`}),`) is the default `,(0,r.jsx)(t.code,{children:`locale`}),`. But also `,(0,r.jsx)(t.code,{children:`align_picker`}),` is a nice feature to have.`]}),`
`,(0,r.jsxs)(t.li,{children:[`Also mostly every "from" component now supports HTML `,(0,r.jsx)(t.code,{children:`data-*`}),` attributes in event returns.`]}),`
`]}),`
`,(0,r.jsx)(t.h2,{children:`GlobalStatus`}),`
`,(0,r.jsx)(t.p,{children:`This component is made to be used for mainly three UX situations:`}),`
`,(0,r.jsxs)(t.ul,{children:[`
`,(0,r.jsx)(t.li,{children:`Global application error messages`}),`
`,(0,r.jsx)(t.li,{children:`User-generated error messages`}),`
`,(0,r.jsx)(t.li,{children:`User input correction advices`}),`
`]}),`
`,(0,r.jsx)(t.p,{children:`The component has to be placed directly under a header bar (UX principles). From there it will expand / slide down once a message is appearing.`}),`
`,(0,r.jsxs)(t.p,{children:[`Every "form" component, like `,(0,r.jsx)(t.a,{href:`/uilib/components/dropdown`,children:`Input`}),` will automatically connect and update the `,(0,r.jsx)(t.a,{href:`/uilib/components/global-status`,children:`GlobalStatus`}),` once an error status is show to the form component:`]}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-jsx`,children:`import { Input } from 'dnb-ui-lib/components'

// 1. Place it under the header bar
<GlobalStatus />

// 2. Else where in your app - input with error status
<Input label="My Input" status="Error message" />
`})}),`
`,(0,r.jsx)(t.p,{children:`But you can also manually update / show as many messages as you want:`}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-jsx`,children:`import { GlobalStatus } from 'dnb-ui-lib/components'

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
`,(0,r.jsx)(t.h2,{children:`Install`}),`
`,(0,r.jsx)(t.p,{children:`To upgrade to v4.10 with NPM, use:`}),`
`,(0,r.jsx)(t.pre,{children:(0,r.jsx)(t.code,{className:`language-bash`,children:`$ npm i dnb-ui-lib@4.10

# In case the NPM mirroring is not up to date
$ npm i https://github.com/dnbexperience/eufemia/releases/download/v4.10.0/dnb-ui-lib-4.10.0.tgz
`})}),`
`,(0,r.jsx)(t.p,{children:(0,r.jsx)(t.em,{children:`August, 24. 2019`})})]})}function a(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(i,{...e})}):i(e)}export{a as default};