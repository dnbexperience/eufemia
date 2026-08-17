import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{U as n}from"./index-CGxQ8PRe.js";import{S as r,_ as i,a,b as o,d as s,f as c,g as l,i as u,l as d,m as f,o as p,p as m,u as h,v as g,x as _,y as v}from"./Examples-Bc_ugyLY.js";var y=e(t());function b(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...n(),...e.components},{VisibleWhenVisualTest:b}=t;return b||S(`VisibleWhenVisualTest`,!0),(0,y.jsxs)(y.Fragment,{children:[(0,y.jsx)(t.h2,{children:`Demos`}),`
`,(0,y.jsx)(t.h3,{children:`Default autocomplete`}),`
`,(0,y.jsx)(a,{}),`
`,(0,y.jsx)(t.h3,{children:`Autocomplete with numbers`}),`
`,(0,y.jsx)(f,{}),`
`,(0,y.jsx)(t.h3,{children:`Autocomplete with a custom title`}),`
`,(0,y.jsxs)(t.ul,{children:[`
`,(0,y.jsxs)(t.li,{children:[(0,y.jsx)(t.code,{children:`keepValue`}),` means the input value gets not removed after an input blur happens.`]}),`
`,(0,y.jsxs)(t.li,{children:[(0,y.jsx)(t.code,{children:`showClearButton`}),` means a clear button will show up when the input field contains a value.`]}),`
`]}),`
`,(0,y.jsx)(_,{}),`
`,(0,y.jsx)(t.h3,{children:`Async usage, dynamically update data during typing`}),`
`,(0,y.jsxs)(t.p,{children:[`This example simulates server delay with a timeout and - if it gets debounced, we cancel the timeout. Read more about the `,(0,y.jsx)(t.a,{href:`/uilib/components/autocomplete/methods/#methods`,children:`debounce method`}),`.`]}),`
`,(0,y.jsxs)(t.p,{children:[`Also, you may consider using `,(0,y.jsx)(t.code,{children:`disableFilter`}),` if you have a backend doing the search operation.`]}),`
`,(0,y.jsx)(d,{}),`
`,(0,y.jsx)(t.h3,{children:`Update data dynamically on the first focus`}),`
`,(0,y.jsx)(h,{}),`
`,(0,y.jsx)(t.h3,{children:`With a Button to toggle the open / close state`}),`
`,(0,y.jsxs)(t.p,{children:[(0,y.jsx)(t.strong,{children:`NB:`}),` Just to show the possibility; the data is given as a function.`]}),`
`,(0,y.jsx)(o,{}),`
`,(0,y.jsx)(t.h3,{children:`With a predefined input/search value`}),`
`,(0,y.jsx)(l,{}),`
`,(0,y.jsx)(t.h3,{children:`Different sizes`}),`
`,(0,y.jsxs)(t.p,{children:[`Four sizes are available: `,(0,y.jsx)(t.code,{children:`small`}),`, `,(0,y.jsx)(t.code,{children:`default`}),`, `,(0,y.jsx)(t.code,{children:`medium`}),` and `,(0,y.jsx)(t.code,{children:`large`}),`.`]}),`
`,(0,y.jsx)(p,{}),`
`,(0,y.jsx)(t.h3,{children:`Data suffix value`}),`
`,(0,y.jsx)(t.p,{children:`Data is provided as such:`}),`
`,(0,y.jsx)(t.pre,{children:(0,y.jsx)(t.code,{className:`language-js`,children:`const { locale } = React.useContext(Context)
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
`,(0,y.jsx)(v,{}),`
`,(0,y.jsx)(t.h3,{children:`Custom width`}),`
`,(0,y.jsx)(u,{}),`
`,(0,y.jsx)(b,{children:(0,y.jsx)(c,{})}),`
`,(0,y.jsx)(t.h3,{children:`Autocomplete with status message`}),`
`,(0,y.jsx)(g,{}),`
`,(0,y.jsx)(b,{children:(0,y.jsx)(i,{})}),`
`,(0,y.jsx)(t.h3,{children:`Autocomplete with List item content`}),`
`,(0,y.jsxs)(t.p,{children:[`Reuse the `,(0,y.jsx)(t.a,{href:`/uilib/components/list`,children:`List`}),` row layout for rich option content. The option is already an `,(0,y.jsx)(t.code,{children:`<li>`}),` and wraps its content in `,(0,y.jsx)(t.code,{children:`<span>`}),` elements, so use `,(0,y.jsx)(t.code,{children:`element="span"`}),` on `,(0,y.jsx)(t.code,{children:`List.Item.Basic`}),` and its cells to keep the markup valid. Give the `,(0,y.jsx)(t.code,{children:`Autocomplete`}),` a width that fits both the title and the end value. Provide `,(0,y.jsx)(t.code,{children:`selectedValue`}),` with the plain text so the input shows a sensible value once an option is selected, and `,(0,y.jsx)(t.code,{children:`searchContent`}),` so typing still filters the options. See `,(0,y.jsxs)(t.a,{href:`/uilib/components/list/info#rendering-a-row-outside-a-listcontainer`,children:[`rendering a row outside a `,(0,y.jsx)(t.code,{children:`List.Container`})]}),` for the details.`]}),`
`,(0,y.jsx)(r,{}),`
`,(0,y.jsx)(t.h3,{children:`Groups`}),`
`,(0,y.jsxs)(t.p,{children:[`If an item has a `,(0,y.jsx)(t.code,{children:`groupIndex`}),` property, it will use the groups in the `,(0,y.jsx)(t.code,{children:`groups`}),` property. Only the first group can be without title, all other groups must have a title.`]}),`
`,(0,y.jsx)(s,{}),`
`,(0,y.jsx)(t.h2,{children:`No divider`}),`
`,(0,y.jsxs)(t.p,{children:[`We can remove the divider between items with the `,(0,y.jsx)(t.code,{children:`noDivider`}),` prop. Beware that this can make information dense lists difficult to parse.`]}),`
`,(0,y.jsx)(m,{})]})}function x(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,y.jsx)(t,{...e,children:(0,y.jsx)(b,{...e})}):b(e)}function S(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{x as default};