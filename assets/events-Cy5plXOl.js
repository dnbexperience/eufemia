import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Lr as t}from"./index--zEB_f_m.js";import{n}from"./PropertiesTable-NQTsOnC6.js";import{t as r}from"./methods-D1HsAtgB.js";import{t as i}from"./AutocompleteDocs-BEMdDFw3.js";var a=e();function o(e){let o={code:`code`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...t(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(o.h2,{children:`Events`}),`
`,(0,a.jsx)(n,{props:i}),`
`,(0,a.jsxs)(o.h3,{children:[`The `,(0,a.jsx)(o.code,{children:`onChange`}),` vs `,(0,a.jsx)(o.code,{children:`onSelect`}),` difference`]}),`
`,(0,a.jsxs)(o.p,{children:[`The difference between `,(0,a.jsx)(o.code,{children:`onChange`}),` and `,(0,a.jsx)(o.code,{children:`onSelect`}),` is:`]}),`
`,(0,a.jsxs)(o.ul,{children:[`
`,(0,a.jsxs)(o.li,{children:[(0,a.jsx)(o.code,{children:`onChange`}),` will be called when the state changes, either with a `,(0,a.jsx)(o.strong,{children:`click`}),` or `,(0,a.jsx)(o.strong,{children:`space/enter`}),` keypress confirmation.`]}),`
`,(0,a.jsxs)(o.li,{children:[(0,a.jsx)(o.code,{children:`onSelect`}),` differs most when the user is navigating by keyboard. Once the user is pressing e.g. the arrow keys, the selection is changing, but not the state.`]}),`
`]}),`
`,(0,a.jsxs)(o.h3,{children:[`The `,(0,a.jsx)(o.code,{children:`onSubmit`}),` event`]}),`
`,(0,a.jsxs)(o.p,{children:[`The `,(0,a.jsx)(o.code,{children:`onSubmit`}),` event is called when the user presses `,(0,a.jsx)(o.strong,{children:`Enter`}),` in the input field without having selected or navigated to an item in the list. This is useful for implementing custom behaviors such as:`]}),`
`,(0,a.jsxs)(o.ul,{children:[`
`,(0,a.jsx)(o.li,{children:`Navigating to a dedicated search results page`}),`
`,(0,a.jsx)(o.li,{children:`Triggering an advanced search action`}),`
`]}),`
`,(0,a.jsx)(o.pre,{children:(0,a.jsx)(o.code,{className:`language-tsx`,children:`<Autocomplete
  data={myData}
  onSubmit={({ value }) => {
    navigateTo(\`/search?q=\${value}\`)
  }}
/>
`})}),`
`,(0,a.jsxs)(o.h3,{children:[`The `,(0,a.jsx)(o.code,{children:`onItemMouseEnter`}),` event`]}),`
`,(0,a.jsxs)(o.p,{children:[`The `,(0,a.jsx)(o.code,{children:`onItemMouseEnter`}),` event is called when the user hovers over a dropdown item. This is useful for pre-fetching data or triggering actions before the user commits to a selection.`]}),`
`,(0,a.jsx)(o.pre,{children:(0,a.jsx)(o.code,{className:`language-tsx`,children:`<Autocomplete
  data={myData}
  onItemMouseEnter={({ item, data, event }) => {
    prefetchData(data)
  }}
/>
`})}),`
`,(0,a.jsx)(r,{})]})}function s(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,a.jsx)(n,{...e,children:(0,a.jsx)(o,{...e})}):o(e)}export{s as default};