import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{B as n}from"./index-DdG6L_K8.js";import{_ as r,a as i,b as a,d as o,f as s,g as c,i as l,l as u,m as d,o as f,p,u as m,v as h,x as g,y as _}from"./Examples-DSV0Op05.js";var v=e(t());function y(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...n(),...e.components},{VisibleWhenVisualTest:y}=t;return y||x(`VisibleWhenVisualTest`,!0),(0,v.jsxs)(v.Fragment,{children:[(0,v.jsx)(t.h2,{children:`Demos`}),`
`,(0,v.jsx)(t.h3,{children:`Default autocomplete`}),`
`,(0,v.jsx)(i,{}),`
`,(0,v.jsx)(t.h3,{children:`Autocomplete with numbers`}),`
`,(0,v.jsx)(d,{}),`
`,(0,v.jsx)(t.h3,{children:`Autocomplete with a custom title`}),`
`,(0,v.jsxs)(t.ul,{children:[`
`,(0,v.jsxs)(t.li,{children:[(0,v.jsx)(t.code,{children:`keepValue`}),` means the input value gets not removed after an input blur happens.`]}),`
`,(0,v.jsxs)(t.li,{children:[(0,v.jsx)(t.code,{children:`showClearButton`}),` means a clear button will show up when the input field contains a value.`]}),`
`]}),`
`,(0,v.jsx)(g,{}),`
`,(0,v.jsx)(t.h3,{children:`Async usage, dynamically update data during typing`}),`
`,(0,v.jsxs)(t.p,{children:[`This example simulates server delay with a timeout and - if it gets debounced, we cancel the timeout. Read more about the `,(0,v.jsx)(t.a,{href:`/uilib/components/autocomplete/methods/#methods`,children:`debounce method`}),`.`]}),`
`,(0,v.jsxs)(t.p,{children:[`Also, you may consider using `,(0,v.jsx)(t.code,{children:`disableFilter`}),` if you have a backend doing the search operation.`]}),`
`,(0,v.jsx)(u,{}),`
`,(0,v.jsx)(t.h3,{children:`Update data dynamically on the first focus`}),`
`,(0,v.jsx)(m,{}),`
`,(0,v.jsx)(t.h3,{children:`With a Button to toggle the open / close state`}),`
`,(0,v.jsxs)(t.p,{children:[(0,v.jsx)(t.strong,{children:`NB:`}),` Just to show the possibility; the data is given as a function.`]}),`
`,(0,v.jsx)(a,{}),`
`,(0,v.jsx)(t.h3,{children:`With a predefined input/search value`}),`
`,(0,v.jsx)(c,{}),`
`,(0,v.jsx)(t.h3,{children:`Different sizes`}),`
`,(0,v.jsxs)(t.p,{children:[`Four sizes are available: `,(0,v.jsx)(t.code,{children:`small`}),`, `,(0,v.jsx)(t.code,{children:`default`}),`, `,(0,v.jsx)(t.code,{children:`medium`}),` and `,(0,v.jsx)(t.code,{children:`large`}),`.`]}),`
`,(0,v.jsx)(f,{}),`
`,(0,v.jsx)(t.h3,{children:`Data suffix value`}),`
`,(0,v.jsx)(t.p,{children:`Data is provided as such:`}),`
`,(0,v.jsx)(t.pre,{children:(0,v.jsx)(t.code,{className:`language-js`,children:`const { locale } = React.useContext(Context)
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
`,(0,v.jsx)(_,{}),`
`,(0,v.jsx)(t.h3,{children:`Custom width`}),`
`,(0,v.jsx)(l,{}),`
`,(0,v.jsx)(y,{children:(0,v.jsx)(s,{})}),`
`,(0,v.jsx)(t.h3,{children:`Autocomplete with status message`}),`
`,(0,v.jsx)(h,{}),`
`,(0,v.jsx)(y,{children:(0,v.jsx)(r,{})}),`
`,(0,v.jsx)(t.h3,{children:`Groups`}),`
`,(0,v.jsxs)(t.p,{children:[`If an item has a `,(0,v.jsx)(t.code,{children:`groupIndex`}),` property, it will use the groups in the `,(0,v.jsx)(t.code,{children:`groups`}),` property. Only the first group can be without title, all other groups must have a title.`]}),`
`,(0,v.jsx)(o,{}),`
`,(0,v.jsx)(t.h2,{children:`No divider`}),`
`,(0,v.jsxs)(t.p,{children:[`We can remove the divider between items with the `,(0,v.jsx)(t.code,{children:`noDivider`}),` prop. Beware that this can make information dense lists difficult to parse.`]}),`
`,(0,v.jsx)(p,{})]})}function b(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,v.jsx)(t,{...e,children:(0,v.jsx)(y,{...e})}):y(e)}function x(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{b as default};