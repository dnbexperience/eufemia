import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{U as n}from"./index-BsJ3GLEw.js";import{t as r}from"./methods-BMj-MvVH.js";import{n as i,r as a,t as o}from"./Examples-xubeU_fJ.js";import{t as s}from"./when-to-use-forms-LK79e8dK.js";import c from"./demos-DF-CMufP.js";var l=e(t());function u(e){let t={a:`a`,code:`code`,em:`em`,h2:`h2`,h3:`h3`,h4:`h4`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...n(),...e.components},{RelatedComponents:c}=t;return c||f(`RelatedComponents`,!0),(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(t.h2,{children:`Import`}),`
`,(0,l.jsx)(t.pre,{children:(0,l.jsx)(t.code,{className:`language-tsx`,children:`import { Autocomplete } from '@dnb/eufemia'
`})}),`
`,(0,l.jsx)(t.h2,{children:`Description`}),`
`,(0,l.jsxs)(t.p,{children:[`The Autocomplete component is a combination of an `,(0,l.jsx)(t.a,{href:`/uilib/components/input`,children:`Input`}),` and a `,(0,l.jsx)(t.a,{href:`/uilib/components/dropdown`,children:`Dropdown`}),`, also called `,(0,l.jsx)(t.strong,{children:`ComboBox`}),`. During typing, matching data items get suggested in an option menu (listbox).`]}),`
`,(0,l.jsx)(t.h2,{children:`When to use Autocomplete vs Eufemia Forms`}),`
`,(0,l.jsx)(s,{}),`
`,(0,l.jsxs)(t.p,{children:[`The Eufemia Forms equivalent of `,(0,l.jsx)(t.code,{children:`Autocomplete`}),` is `,(0,l.jsx)(t.a,{href:`/uilib/extensions/forms/base-fields/Selection/`,children:`Field.Selection`}),` with the autocomplete variant (`,(0,l.jsx)(t.code,{children:`variant="autocomplete"`}),`), or `,(0,l.jsx)(t.a,{href:`/uilib/extensions/forms/base-fields/ArraySelection/`,children:`Field.ArraySelection`}),` for selecting multiple values.`]}),`
`,(0,l.jsx)(t.h2,{children:`Relevant links`}),`
`,(0,l.jsxs)(t.ul,{children:[`
`,(0,l.jsx)(t.li,{children:(0,l.jsx)(t.a,{href:`https://www.figma.com/design/cdtwQD8IJ7pTeE45U148r1/%F0%9F%92%BB-Eufemia---Web?node-id=48469-4820`,children:`Figma`})}),`
`,(0,l.jsx)(t.li,{children:(0,l.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/autocomplete`,children:`Source code`})}),`
`,(0,l.jsx)(t.li,{children:(0,l.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/autocomplete`,children:`Docs code`})}),`
`]}),`
`,(0,l.jsx)(t.h2,{children:`Typeahead and ComboBox`}),`
`,(0,l.jsxs)(t.p,{children:[`The Autocomplete component may also be known as `,(0,l.jsx)(t.em,{children:`Typeahead`}),` or `,(0,l.jsx)(t.em,{children:`ComboBox`}),`. But autocomplete describes the purpose more precisely and descriptively, therefore Eufemia uses this term.`]}),`
`,(0,l.jsx)(t.h3,{children:`When to use it`}),`
`,(0,l.jsxs)(t.p,{children:[`Use it for both small autocomplete purposes and large (async) data set searches. The component supports two ways of showing `,(0,l.jsx)(t.a,{href:`/uilib/components/progress-indicator`,children:`ProgressIndicator`}),`.`]}),`
`,(0,l.jsxs)(t.p,{children:[`You may check out the `,(0,l.jsx)(t.a,{href:`/uilib/components/dropdown/info`,children:`Dropdown`}),` component for more details on how to use it. They both share the same `,(0,l.jsx)(t.a,{href:`/uilib/components/fragments/drawer-list`,children:`DrawerList`}),`.`]}),`
`,(0,l.jsx)(t.h3,{children:`Highlighting`}),`
`,(0,l.jsx)(t.p,{children:`Words found during typing are highlighted. The rules are:`}),`
`,(0,l.jsxs)(t.ol,{children:[`
`,(0,l.jsx)(t.li,{children:`The first two words will match the beginning of a word`}),`
`,(0,l.jsxs)(t.li,{children:[`The third word will match inside a word (can be changed with `,(0,l.jsx)(t.code,{children:`searchInWordIndex`}),`)`]}),`
`,(0,l.jsx)(t.li,{children:`Case-insensitive`}),`
`]}),`
`,(0,l.jsxs)(t.p,{children:[`To only match items that begin with the first typed word, set `,(0,l.jsx)(t.code,{children:`searchMatch="starts-with"`}),`.`]}),`
`,(0,l.jsx)(t.h4,{children:`Using Components inside content`}),`
`,(0,l.jsxs)(t.p,{children:[`It is `,(0,l.jsx)(t.strong,{children:`not`}),` possible to wrap them inside React Components. The reason is that the Autocomplete component needs to know what data it wants to search for before your React Component has rendered. Additionally, the component cannot update the HTML to make the bold highlighting after your component has rendered.`]}),`
`,(0,l.jsx)(t.p,{children:`That means you cannot run a component that will render as soon as it is displayed.`}),`
`,(0,l.jsx)(t.p,{children:`If you need to format numbers, then do it before you send in the data content.`}),`
`,(0,l.jsxs)(t.p,{children:[`It is possible to wrap your content inside one HTML Element. Nested elements are `,(0,l.jsx)(t.strong,{children:`not`}),` supported.`]}),`
`,(0,l.jsx)(t.p,{children:`To wrap your content only visually, you can provide your wrappers inside an array:`}),`
`,(0,l.jsx)(o,{}),`
`,(0,l.jsx)(t.p,{children:`or you can provide it inside a fragment:`}),`
`,(0,l.jsx)(i,{}),`
`,(0,l.jsxs)(t.p,{children:[`and if you need to decouple the searchable content from what's displayed, then you can put your searchable content inside `,(0,l.jsx)(t.code,{children:`searchContent`}),`:`]}),`
`,(0,l.jsx)(a,{}),`
`,(0,l.jsx)(t.h2,{children:`Re-render data`}),`
`,(0,l.jsxs)(t.p,{children:[`For performance optimization, you should ensure the `,(0,l.jsx)(t.code,{children:`data`}),` array/object is memoized (with `,(0,l.jsx)(t.code,{children:`useMemo`}),`, `,(0,l.jsx)(t.code,{children:`useState`}),`, or `,(0,l.jsx)(t.code,{children:`useRef`}),`), so when the Autocomplete re-renders, it does not have to process the internal data unnecessarily.`]}),`
`,(0,l.jsx)(t.pre,{children:(0,l.jsx)(t.code,{className:`language-tsx`,children:`const MyComponent = () => {
  const data = React.useMemo(() => ['Item 1', 'Item 2'], [])
  return <Autocomplete data={data} />
}
`})}),`
`,(0,l.jsx)(t.p,{children:`Or keep it outside the component:`}),`
`,(0,l.jsx)(t.pre,{children:(0,l.jsx)(t.code,{className:`language-tsx`,children:`const data = ['Item 1', 'Item 2']
const MyComponent = () => {
  return <Autocomplete data={data} />
}
`})}),`
`,(0,l.jsx)(t.h3,{children:`Numbers`}),`
`,(0,l.jsxs)(t.p,{children:[`Numbers are often different from a word filter. You can use `,(0,l.jsx)(t.code,{children:`searchNumbers={true}`}),` to enable number-specialized filtering. See examples in the demos.`]}),`
`,(0,l.jsxs)(t.p,{children:[`Now the user could search for e.g. bank account numbers by just entering `,(0,l.jsx)(t.code,{children:`201`}),`, even if you format it like `,(0,l.jsx)(t.code,{children:`2000 12 34567`}),` (e.g. use `,(0,l.jsx)(t.code,{children:`format(20001234567, { ban: true })`}),` from `,(0,l.jsx)(t.code,{children:`@dnb/eufemia/components/number-format/NumberUtils`}),`).`]}),`
`,(0,l.jsx)(t.h3,{children:`Screen reader support`}),`
`,(0,l.jsxs)(t.p,{children:[`To enhance screen reader usage, this component uses `,(0,l.jsx)(t.code,{children:`aria-live`}),` to announce the number of options found (`,(0,l.jsx)(t.code,{children:`ariaLiveOptions`}),`).`]}),`
`,(0,l.jsx)(t.h2,{children:`Custom size`}),`
`,(0,l.jsx)(t.pre,{children:(0,l.jsx)(t.code,{className:`language-css`,children:`.dnb-autocomplete {
  --autocomplete-width: 20rem; /* custom width */
}
`})}),`
`,(0,l.jsxs)(t.p,{children:[`You can also set the width directly, but then it has to be defined like so (including `,(0,l.jsx)(t.code,{children:`min-width`}),`):`]}),`
`,(0,l.jsx)(t.pre,{children:(0,l.jsx)(t.code,{className:`language-css`,children:`/** Because of the included label/status etc. we target the "__shell" */
.dnb-autocomplete__shell {
  width: 10rem;
}

/** In order to change only the drawer-list width */
.dnb-autocomplete .dnb-drawer-list__root {
  width: 10rem;
}
`})}),`
`,(0,l.jsx)(r,{}),`
`,(0,l.jsx)(t.h2,{children:`Root Element (React Portal)`}),`
`,(0,l.jsxs)(t.p,{children:[`The Autocomplete component uses `,(0,l.jsx)(t.a,{href:`/uilib/components/portal-root`,children:`PortalRoot`}),` internally to render its option list. See the `,(0,l.jsx)(t.a,{href:`/uilib/components/portal-root`,children:`PortalRoot documentation`}),` for information on how to control where the portal content appears in the DOM, and for the `,(0,l.jsx)(t.a,{href:`/uilib/components/portal-root/#browsertranslate-helper-google-translate`,children:`BrowserTranslate helper`}),` when browser translation tools such as Google Translate should not modify content rendered through PortalRoot.`]}),`
`,(0,l.jsx)(c,{})]})}function d(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,l.jsx)(t,{...e,children:(0,l.jsx)(u,{...e})}):u(e)}function f(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}function p(e){return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(d,{}),`
`,(0,l.jsx)(c,{})]})}function m(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,l.jsx)(t,{...e,children:(0,l.jsx)(p,{...e})}):p(e)}export{m as default};