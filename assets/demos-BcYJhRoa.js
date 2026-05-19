import{a as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{zr as n}from"./index-DqqByKA2.js";import{_ as r,a as i,d as a,f as o,g as s,h as c,i as l,l as u,m as d,o as f,u as p,v as m,y as h}from"./Examples-Dw3Ii53Y.js";var g=e(t());function _(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...n(),...e.components},{VisibleWhenVisualTest:_}=t;return _||y(`VisibleWhenVisualTest`,!0),(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(t.h2,{children:`Demos`}),`
`,(0,g.jsx)(t.h3,{children:`Default autocomplete`}),`
`,(0,g.jsx)(i,{}),`
`,(0,g.jsx)(t.h3,{children:`Autocomplete with numbers`}),`
`,(0,g.jsx)(o,{}),`
`,(0,g.jsx)(t.h3,{children:`Autocomplete with a custom title`}),`
`,(0,g.jsxs)(t.ul,{children:[`
`,(0,g.jsxs)(t.li,{children:[(0,g.jsx)(t.code,{children:`keepValue`}),` means the input value gets not removed after an input blur happens.`]}),`
`,(0,g.jsxs)(t.li,{children:[(0,g.jsx)(t.code,{children:`showClearButton`}),` means a clear button will show up when the input field contains a value.`]}),`
`]}),`
`,(0,g.jsx)(h,{}),`
`,(0,g.jsx)(t.h3,{children:`Async usage, dynamically update data during typing`}),`
`,(0,g.jsxs)(t.p,{children:[`This example simulates server delay with a timeout and - if it gets debounced, we cancel the timeout. Read more about the `,(0,g.jsx)(t.a,{href:`/uilib/components/autocomplete/methods/#methods`,children:`debounce method`}),`.`]}),`
`,(0,g.jsxs)(t.p,{children:[`Also, you may consider using `,(0,g.jsx)(t.code,{children:`disableFilter`}),` if you have a backend doing the search operation.`]}),`
`,(0,g.jsx)(u,{}),`
`,(0,g.jsx)(t.h3,{children:`Update data dynamically on the first focus`}),`
`,(0,g.jsx)(p,{}),`
`,(0,g.jsx)(t.h3,{children:`With a Button to toggle the open / close state`}),`
`,(0,g.jsxs)(t.p,{children:[(0,g.jsx)(t.strong,{children:`NB:`}),` Just to show the possibility; the data is given as a function.`]}),`
`,(0,g.jsx)(m,{}),`
`,(0,g.jsx)(t.h3,{children:`With a predefined input/search value`}),`
`,(0,g.jsx)(d,{}),`
`,(0,g.jsx)(t.h3,{children:`Different sizes`}),`
`,(0,g.jsxs)(t.p,{children:[`Four sizes are available: `,(0,g.jsx)(t.code,{children:`small`}),`, `,(0,g.jsx)(t.code,{children:`default`}),`, `,(0,g.jsx)(t.code,{children:`medium`}),` and `,(0,g.jsx)(t.code,{children:`large`}),`.`]}),`
`,(0,g.jsx)(f,{}),`
`,(0,g.jsx)(t.h3,{children:`Data suffix value`}),`
`,(0,g.jsx)(t.p,{children:`Data is provided as such:`}),`
`,(0,g.jsx)(t.pre,{children:(0,g.jsx)(t.code,{className:`language-js`,children:`const { locale } = React.useContext(Context)
const data = [
  {
    suffixValue: (
      <NumberFormat.Currency srLabel="Total:" locale={locale}>
        {12345678}
      </NumberFormat.Currency>
    ),
    selectedValue: \`Brukskonto (\${ban})\`,
    content: ['Brukskonto', ban],
  },
]
`})}),`
`,(0,g.jsx)(r,{}),`
`,(0,g.jsx)(t.h3,{children:`Custom width`}),`
`,(0,g.jsx)(l,{}),`
`,(0,g.jsx)(t.h3,{children:`Autocomplete with status message`}),`
`,(0,g.jsx)(s,{}),`
`,(0,g.jsx)(_,{children:(0,g.jsx)(c,{})}),`
`,(0,g.jsx)(t.h3,{children:`Groups`}),`
`,(0,g.jsxs)(t.p,{children:[`If an item has a `,(0,g.jsx)(t.code,{children:`groupIndex`}),` property, it will use the groups in the `,(0,g.jsx)(t.code,{children:`groups`}),` property. Only the first group can be without title, all other groups must have a title.`]}),`
`,(0,g.jsx)(a,{})]})}function v(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,g.jsx)(t,{...e,children:(0,g.jsx)(_,{...e})}):_(e)}function y(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{v as default};