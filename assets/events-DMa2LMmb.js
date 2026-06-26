import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{U as n}from"./index-kfZVC31v.js";import{n as r}from"./PropertiesTable-BIB66Y92.js";import{t as i}from"./methods-Be7oNSLa.js";import{t as a}from"./AutocompleteDocs-DGGPWqBr.js";var o=e(t());function s(e){let t={code:`code`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...n(),...e.components};return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(t.h2,{children:`Events`}),`
`,(0,o.jsx)(r,{props:a}),`
`,(0,o.jsxs)(t.h3,{children:[`The `,(0,o.jsx)(t.code,{children:`onChange`}),` vs `,(0,o.jsx)(t.code,{children:`onSelect`}),` difference`]}),`
`,(0,o.jsxs)(t.p,{children:[`The difference between `,(0,o.jsx)(t.code,{children:`onChange`}),` and `,(0,o.jsx)(t.code,{children:`onSelect`}),` is:`]}),`
`,(0,o.jsxs)(t.ul,{children:[`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.code,{children:`onChange`}),` will be called when the state changes, either with a `,(0,o.jsx)(t.strong,{children:`click`}),` or `,(0,o.jsx)(t.strong,{children:`space/enter`}),` keypress confirmation.`]}),`
`,(0,o.jsxs)(t.li,{children:[(0,o.jsx)(t.code,{children:`onSelect`}),` differs most when the user is navigating by keyboard. Once the user is pressing e.g. the arrow keys, the selection is changing, but not the state.`]}),`
`]}),`
`,(0,o.jsxs)(t.h3,{children:[`The `,(0,o.jsx)(t.code,{children:`onSubmit`}),` event`]}),`
`,(0,o.jsxs)(t.p,{children:[`The `,(0,o.jsx)(t.code,{children:`onSubmit`}),` event is called when the user presses `,(0,o.jsx)(t.strong,{children:`Enter`}),` in the input field without having selected or navigated to an item in the list. This is useful for implementing custom behaviors such as:`]}),`
`,(0,o.jsxs)(t.ul,{children:[`
`,(0,o.jsx)(t.li,{children:`Navigating to a dedicated search results page`}),`
`,(0,o.jsx)(t.li,{children:`Triggering an advanced search action`}),`
`]}),`
`,(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:`language-tsx`,children:`<Autocomplete
  data={myData}
  onSubmit={({ value }) => {
    navigateTo(\`/search?q=\${value}\`)
  }}
/>
`})}),`
`,(0,o.jsxs)(t.h3,{children:[`The `,(0,o.jsx)(t.code,{children:`onItemMouseEnter`}),` event`]}),`
`,(0,o.jsxs)(t.p,{children:[`The `,(0,o.jsx)(t.code,{children:`onItemMouseEnter`}),` event is called when the user hovers over a dropdown item. This is useful for pre-fetching data or triggering actions before the user commits to a selection.`]}),`
`,(0,o.jsx)(t.pre,{children:(0,o.jsx)(t.code,{className:`language-tsx`,children:`<Autocomplete
  data={myData}
  onItemMouseEnter={({ item, data, event }) => {
    prefetchData(data)
  }}
/>
`})}),`
`,(0,o.jsx)(i,{})]})}function c(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,o.jsx)(t,{...e,children:(0,o.jsx)(s,{...e})}):s(e)}export{c as default};