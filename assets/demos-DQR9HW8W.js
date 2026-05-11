import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Lr as t}from"./index-DVm0MbGb.js";import{_ as n,a as r,d as i,f as a,g as o,h as s,i as c,l,m as u,o as d,u as f,v as p,y as m}from"./Examples-CFqMlL8X.js";var h=e();function g(e){let g={a:`a`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...t(),...e.components},{VisibleWhenVisualTest:_}=g;return _||v(`VisibleWhenVisualTest`,!0),(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(g.h2,{children:`Demos`}),`
`,(0,h.jsx)(g.h3,{children:`Default autocomplete`}),`
`,(0,h.jsx)(r,{}),`
`,(0,h.jsx)(g.h3,{children:`Autocomplete with numbers`}),`
`,(0,h.jsx)(a,{}),`
`,(0,h.jsx)(g.h3,{children:`Autocomplete with a custom title`}),`
`,(0,h.jsxs)(g.ul,{children:[`
`,(0,h.jsxs)(g.li,{children:[(0,h.jsx)(g.code,{children:`keepValue`}),` means the input value gets not removed after an input blur happens.`]}),`
`,(0,h.jsxs)(g.li,{children:[(0,h.jsx)(g.code,{children:`showClearButton`}),` means a clear button will show up when the input field contains a value.`]}),`
`]}),`
`,(0,h.jsx)(m,{}),`
`,(0,h.jsx)(g.h3,{children:`Async usage, dynamically update data during typing`}),`
`,(0,h.jsxs)(g.p,{children:[`This example simulates server delay with a timeout and - if it gets debounced, we cancel the timeout. Read more about the `,(0,h.jsx)(g.a,{href:`/uilib/components/autocomplete/methods/#methods`,children:`debounce method`}),`.`]}),`
`,(0,h.jsxs)(g.p,{children:[`Also, you may consider using `,(0,h.jsx)(g.code,{children:`disableFilter`}),` if you have a backend doing the search operation.`]}),`
`,(0,h.jsx)(l,{}),`
`,(0,h.jsx)(g.h3,{children:`Update data dynamically on the first focus`}),`
`,(0,h.jsx)(f,{}),`
`,(0,h.jsx)(g.h3,{children:`With a Button to toggle the open / close state`}),`
`,(0,h.jsxs)(g.p,{children:[(0,h.jsx)(g.strong,{children:`NB:`}),` Just to show the possibility; the data is given as a function.`]}),`
`,(0,h.jsx)(p,{}),`
`,(0,h.jsx)(g.h3,{children:`With a predefined input/search value`}),`
`,(0,h.jsx)(u,{}),`
`,(0,h.jsx)(g.h3,{children:`Different sizes`}),`
`,(0,h.jsxs)(g.p,{children:[`Four sizes are available: `,(0,h.jsx)(g.code,{children:`small`}),`, `,(0,h.jsx)(g.code,{children:`default`}),`, `,(0,h.jsx)(g.code,{children:`medium`}),` and `,(0,h.jsx)(g.code,{children:`large`}),`.`]}),`
`,(0,h.jsx)(d,{}),`
`,(0,h.jsx)(g.h3,{children:`Data suffix value`}),`
`,(0,h.jsx)(g.p,{children:`Data is provided as such:`}),`
`,(0,h.jsx)(g.pre,{children:(0,h.jsx)(g.code,{className:`language-js`,children:`const { locale } = React.useContext(Context)
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
`,(0,h.jsx)(n,{}),`
`,(0,h.jsx)(g.h3,{children:`Custom width`}),`
`,(0,h.jsx)(c,{}),`
`,(0,h.jsx)(g.h3,{children:`Autocomplete with status message`}),`
`,(0,h.jsx)(o,{}),`
`,(0,h.jsx)(_,{children:(0,h.jsx)(s,{})}),`
`,(0,h.jsx)(g.h3,{children:`Groups`}),`
`,(0,h.jsxs)(g.p,{children:[`If an item has a `,(0,h.jsx)(g.code,{children:`groupIndex`}),` property, it will use the groups in the `,(0,h.jsx)(g.code,{children:`groups`}),` property. Only the first group can be without title, all other groups must have a title.`]}),`
`,(0,h.jsx)(i,{})]})}function _(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,h.jsx)(n,{...e,children:(0,h.jsx)(g,{...e})}):g(e)}function v(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{_ as default};