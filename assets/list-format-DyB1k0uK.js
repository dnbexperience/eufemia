import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{U as n}from"./index-BsJ3GLEw.js";import r from"./demos-CyHFS-31.js";var i=e(t());function a(e){let t={a:`a`,code:`code`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...n(),...e.components},{RelatedComponents:r}=t;return r||s(`RelatedComponents`,!0),(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h2,{children:`Import`}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { ListFormat } from '@dnb/eufemia'
`})}),`
`,(0,i.jsx)(t.h2,{children:`Description`}),`
`,(0,i.jsx)(t.p,{children:`A ready-to-use list formatter. Use it wherever you have to display a list of strings, numbers, or React components (JSX).`}),`
`,(0,i.jsx)(t.p,{children:`Good reasons for why we have this is to:`}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsx)(t.li,{children:`Uniform the creation and formatting of lists.`}),`
`,(0,i.jsx)(t.li,{children:`Supports translation and localization.`}),`
`,(0,i.jsx)(t.li,{children:`Built on top of web standards.`}),`
`]}),`
`,(0,i.jsxs)(t.p,{children:[`The component is designed to maximum display 10-20 items.
If you need to display more items than that, consider a different design, and perhaps using `,(0,i.jsx)(t.a,{href:`/uilib/components/pagination`,children:`Pagination`}),` and/or `,(0,i.jsx)(t.a,{href:`/uilib/components/pagination/infinity-scroller`,children:`InfinityScroller`}),`.`]}),`
`,(0,i.jsxs)(t.p,{children:[`When the `,(0,i.jsx)(t.code,{children:`variant`}),` property is set to `,(0,i.jsx)(t.code,{children:`text`}),` (default), the browser API `,(0,i.jsx)(t.a,{href:`https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/ListFormat`,children:`Intl.ListFormat`}),` will be used with additional React components (JSX) support.`]}),`
`,(0,i.jsxs)(t.p,{children:[`When the `,(0,i.jsx)(t.code,{children:`variant`}),` is set to a non-`,(0,i.jsx)(t.code,{children:`text`}),` variant, it uses `,(0,i.jsx)(t.a,{href:`/uilib/elements/lists/`,children:`Lists`}),` to render the given list.`]}),`
`,(0,i.jsx)(t.h2,{children:`Relevant links`}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/list-format`,children:`Source code`})}),`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/list-format`,children:`Docs code`})}),`
`]}),`
`,(0,i.jsx)(t.h2,{children:`Formatting only`}),`
`,(0,i.jsxs)(t.p,{children:[`You can use the `,(0,i.jsx)(t.code,{children:`listFormat`}),` function without using the React Component `,(0,i.jsx)(t.code,{children:`ListFormat`}),`, to format strings, numbers, or React components (JSX) as a string. It does not return lists(ol, ul, etc).`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-ts`,children:`import { listFormat } from '@dnb/eufemia/components/ListFormat'

return listFormat(myList, {
  format: { type: 'disjunction' },
  locale: 'en-US',
})
`})}),`
`,(0,i.jsxs)(t.p,{children:[`See the following `,(0,i.jsx)(t.a,{href:`/uilib/components/list-format/demos/#using-listformat-function`,children:`demo`}),` for a more detailed example.`]}),`
`,(0,i.jsxs)(t.p,{children:[`The `,(0,i.jsx)(t.code,{children:`listFormat`}),` function supports an object with `,(0,i.jsx)(t.code,{children:`{ format, locale }`}),` as the second parameter. `,(0,i.jsx)(t.code,{children:`format`}),` and `,(0,i.jsx)(t.code,{children:`locale`}),` will accept the same values as documented in `,(0,i.jsx)(t.a,{href:`/uilib/components/list-format/properties/`,children:`format property`}),` of the `,(0,i.jsx)(t.code,{children:`ListFormat`}),` component.`]}),`
`,(0,i.jsx)(r,{})]})}function o(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}function s(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}function c(e){return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(o,{}),`
`,(0,i.jsx)(r,{})]})}function l(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(c,{...e})}):c(e)}export{l as default};