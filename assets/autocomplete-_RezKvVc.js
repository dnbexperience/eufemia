import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Rr as t}from"./index-CMgyXmp3.js";import{t as n}from"./methods-EP7dWF_b.js";import{n as r,r as i,t as a}from"./Examples-r-CSE0Av.js";import o from"./demos-DvnA-8Ig.js";var s=e();function c(e){let o={a:`a`,code:`code`,em:`em`,h2:`h2`,h3:`h3`,h4:`h4`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...t(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(o.h2,{children:`Import`}),`
`,(0,s.jsx)(o.pre,{children:(0,s.jsx)(o.code,{className:`language-tsx`,children:`import { Autocomplete } from '@dnb/eufemia'
`})}),`
`,(0,s.jsx)(o.h2,{children:`Description`}),`
`,(0,s.jsxs)(o.p,{children:[`The Autocomplete component is a combination of an `,(0,s.jsx)(o.a,{href:`/uilib/components/input`,children:`Input`}),` and a `,(0,s.jsx)(o.a,{href:`/uilib/components/dropdown`,children:`Dropdown`}),`, also called `,(0,s.jsx)(o.strong,{children:`ComboBox`}),`. During typing, matching data items get suggested in an option menu (listbox).`]}),`
`,(0,s.jsx)(o.h2,{children:`Relevant links`}),`
`,(0,s.jsxs)(o.ul,{children:[`
`,(0,s.jsx)(o.li,{children:(0,s.jsx)(o.a,{href:`https://www.figma.com/design/cdtwQD8IJ7pTeE45U148r1/%F0%9F%92%BB-Eufemia---Web?node-id=48469-4820`,children:`Figma`})}),`
`,(0,s.jsx)(o.li,{children:(0,s.jsx)(o.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/autocomplete`,children:`Source code`})}),`
`,(0,s.jsx)(o.li,{children:(0,s.jsx)(o.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/autocomplete`,children:`Docs code`})}),`
`]}),`
`,(0,s.jsx)(o.h2,{children:`Typeahead and ComboBox`}),`
`,(0,s.jsxs)(o.p,{children:[`The Autocomplete component may also be known as `,(0,s.jsx)(o.em,{children:`Typeahead`}),` or `,(0,s.jsx)(o.em,{children:`ComboBox`}),`. But autocomplete describes the purpose more precisely and descriptively, therefore Eufemia uses this term.`]}),`
`,(0,s.jsx)(o.h3,{children:`When to use it`}),`
`,(0,s.jsxs)(o.p,{children:[`Use it for both small autocomplete purposes and large (async) data set searches. The component supports two ways of showing `,(0,s.jsx)(o.a,{href:`/uilib/components/progress-indicator`,children:`ProgressIndicator`}),`.`]}),`
`,(0,s.jsxs)(o.p,{children:[`You may check out the `,(0,s.jsx)(o.a,{href:`/uilib/components/dropdown/info`,children:`Dropdown`}),` component for more details on how to use it. They both share the same `,(0,s.jsx)(o.a,{href:`/uilib/components/fragments/drawer-list`,children:`DrawerList`}),`.`]}),`
`,(0,s.jsx)(o.h3,{children:`Highlighting`}),`
`,(0,s.jsx)(o.p,{children:`Words found during typing are highlighted. The rules are:`}),`
`,(0,s.jsxs)(o.ol,{children:[`
`,(0,s.jsx)(o.li,{children:`The first two words will match the beginning of a word`}),`
`,(0,s.jsxs)(o.li,{children:[`The third word will match inside a word (can be changed with `,(0,s.jsx)(o.code,{children:`searchInWordIndex`}),`)`]}),`
`,(0,s.jsx)(o.li,{children:`Case-insensitive`}),`
`]}),`
`,(0,s.jsxs)(o.p,{children:[`To only match items that begin with the first typed word, set `,(0,s.jsx)(o.code,{children:`searchMatch="starts-with"`}),`.`]}),`
`,(0,s.jsx)(o.h4,{children:`Using Components inside content`}),`
`,(0,s.jsxs)(o.p,{children:[`It is `,(0,s.jsx)(o.strong,{children:`not`}),` possible to wrap them inside React Components. The reason is that the Autocomplete component needs to know what data it wants to search for before your React Component has rendered. Additionally, the component cannot update the HTML to make the bold highlighting after your component has rendered.`]}),`
`,(0,s.jsx)(o.p,{children:`That means you cannot run a component that will render as soon as it is displayed.`}),`
`,(0,s.jsx)(o.p,{children:`If you need to format numbers, then do it before you send in the data content.`}),`
`,(0,s.jsxs)(o.p,{children:[`It is possible to wrap your content inside one HTML Element. Nested elements are `,(0,s.jsx)(o.strong,{children:`not`}),` supported.`]}),`
`,(0,s.jsx)(o.p,{children:`To wrap your content only visually, you can provide your wrappers inside an array:`}),`
`,(0,s.jsx)(a,{}),`
`,(0,s.jsx)(o.p,{children:`or you can provide it inside a fragment:`}),`
`,(0,s.jsx)(r,{}),`
`,(0,s.jsxs)(o.p,{children:[`and if you need to decouple the searchable content from what's displayed, then you can put your searchable content inside `,(0,s.jsx)(o.code,{children:`searchContent`}),`:`]}),`
`,(0,s.jsx)(i,{}),`
`,(0,s.jsx)(o.h2,{children:`Re-render data`}),`
`,(0,s.jsxs)(o.p,{children:[`For performance optimization, you should ensure the `,(0,s.jsx)(o.code,{children:`data`}),` array/object is memoized (with `,(0,s.jsx)(o.code,{children:`useMemo`}),`, `,(0,s.jsx)(o.code,{children:`useState`}),`, or `,(0,s.jsx)(o.code,{children:`useRef`}),`), so when the Autocomplete re-renders, it does not have to process the internal data unnecessarily.`]}),`
`,(0,s.jsx)(o.pre,{children:(0,s.jsx)(o.code,{className:`language-tsx`,children:`const MyComponent = () => {
  const data = React.useMemo(() => ['Item 1', 'Item 2'], [])
  return <Autocomplete data={data} />
}
`})}),`
`,(0,s.jsx)(o.p,{children:`Or keep it outside the component:`}),`
`,(0,s.jsx)(o.pre,{children:(0,s.jsx)(o.code,{className:`language-tsx`,children:`const data = ['Item 1', 'Item 2']
const MyComponent = () => {
  return <Autocomplete data={data} />
}
`})}),`
`,(0,s.jsx)(o.h3,{children:`Numbers`}),`
`,(0,s.jsxs)(o.p,{children:[`Numbers are often different from a word filter. You can use `,(0,s.jsx)(o.code,{children:`searchNumbers={true}`}),` to enable number-specialized filtering. See examples in the demos.`]}),`
`,(0,s.jsxs)(o.p,{children:[`Now the user could search for e.g. bank account numbers by just entering `,(0,s.jsx)(o.code,{children:`201`}),`, even if you format it like `,(0,s.jsx)(o.code,{children:`2000 12 34567`}),` (e.g. use `,(0,s.jsx)(o.code,{children:`format(20001234567, { ban: true })`}),` from `,(0,s.jsx)(o.code,{children:`@dnb/eufemia/components/number-format/NumberUtils`}),`).`]}),`
`,(0,s.jsx)(o.h3,{children:`Screen reader support`}),`
`,(0,s.jsxs)(o.p,{children:[`To enhance screen reader usage, this component uses `,(0,s.jsx)(o.code,{children:`aria-live`}),` to announce the number of options found (`,(0,s.jsx)(o.code,{children:`ariaLiveOptions`}),`).`]}),`
`,(0,s.jsx)(o.h2,{children:`Custom size`}),`
`,(0,s.jsx)(o.pre,{children:(0,s.jsx)(o.code,{className:`language-css`,children:`.dnb-autocomplete {
  --autocomplete-width: 20rem; /* custom width */
}
`})}),`
`,(0,s.jsxs)(o.p,{children:[`You can also set the width directly, but then it has to be defined like so (including `,(0,s.jsx)(o.code,{children:`min-width`}),`):`]}),`
`,(0,s.jsx)(o.pre,{children:(0,s.jsx)(o.code,{className:`language-css`,children:`/** Because of the included label/status etc. we target the "__shell" */
.dnb-autocomplete__shell {
  width: 10rem;
}

/** In order to change only the drawer-list width */
.dnb-autocomplete .dnb-drawer-list__root {
  width: 10rem;
}
`})}),`
`,(0,s.jsx)(n,{})]})}function l(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(c,{...e})}):c(e)}function u(e){return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(l,{}),`
`,(0,s.jsx)(o,{})]})}function d(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(u,{...e})}):u(e)}export{d as default};