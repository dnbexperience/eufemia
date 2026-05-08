import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Lr as t}from"./index--zEB_f_m.js";import n from"./demos-BMyGDpr8.js";var r=e();function i(e){let n={a:`a`,code:`code`,h2:`h2`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...t(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h2,{children:`Import`}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { ListFormat } from '@dnb/eufemia'
`})}),`
`,(0,r.jsx)(n.h2,{children:`Description`}),`
`,(0,r.jsx)(n.p,{children:`A ready-to-use list formatter. Use it wherever you have to display a list of strings, numbers, or React components (JSX).`}),`
`,(0,r.jsx)(n.p,{children:`Good reasons for why we have this is to:`}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsx)(n.li,{children:`Uniform the creation and formatting of lists.`}),`
`,(0,r.jsx)(n.li,{children:`Supports translation and localization.`}),`
`,(0,r.jsx)(n.li,{children:`Built on top of web standards.`}),`
`]}),`
`,(0,r.jsxs)(n.p,{children:[`The component is designed to maximum display 10-20 items.
If you need to display more items than that, consider a different design, and perhaps using `,(0,r.jsx)(n.a,{href:`/uilib/components/pagination`,children:`Pagination`}),` and/or `,(0,r.jsx)(n.a,{href:`/uilib/components/pagination/infinity-scroller`,children:`InfinityScroller`}),`.`]}),`
`,(0,r.jsxs)(n.p,{children:[`When the `,(0,r.jsx)(n.code,{children:`variant`}),` property is set to `,(0,r.jsx)(n.code,{children:`text`}),` (default), the browser API `,(0,r.jsx)(n.a,{href:`https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/ListFormat`,children:`Intl.ListFormat`}),` will be used with additional React components (JSX) support.`]}),`
`,(0,r.jsxs)(n.p,{children:[`When the `,(0,r.jsx)(n.code,{children:`variant`}),` is set to a non-`,(0,r.jsx)(n.code,{children:`text`}),` variant, it uses `,(0,r.jsx)(n.a,{href:`/uilib/elements/lists/`,children:`Lists`}),` to render the given list.`]}),`
`,(0,r.jsx)(n.h2,{children:`Relevant links`}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/list-format`,children:`Source code`})}),`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/list-format`,children:`Docs code`})}),`
`]}),`
`,(0,r.jsx)(n.h2,{children:`Formatting only`}),`
`,(0,r.jsxs)(n.p,{children:[`You can use the `,(0,r.jsx)(n.code,{children:`listFormat`}),` function without using the React Component `,(0,r.jsx)(n.code,{children:`ListFormat`}),`, to format strings, numbers, or React components (JSX) as a string. It does not return lists(ol, ul, etc).`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-ts`,children:`import { listFormat } from '@dnb/eufemia/components/ListFormat'

return listFormat(myList, {
  format: { type: 'disjunction' },
  locale: 'en-US',
})
`})}),`
`,(0,r.jsxs)(n.p,{children:[`See the following `,(0,r.jsx)(n.a,{href:`/uilib/components/list-format/demos/#using-listformat-function`,children:`demo`}),` for a more detailed example.`]}),`
`,(0,r.jsxs)(n.p,{children:[`The `,(0,r.jsx)(n.code,{children:`listFormat`}),` function supports an object with `,(0,r.jsx)(n.code,{children:`{ format, locale }`}),` as the second parameter. `,(0,r.jsx)(n.code,{children:`format`}),` and `,(0,r.jsx)(n.code,{children:`locale`}),` will accept the same values as documented in `,(0,r.jsx)(n.a,{href:`/uilib/components/list-format/properties/`,children:`format property`}),` of the `,(0,r.jsx)(n.code,{children:`ListFormat`}),` component.`]})]})}function a(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(i,{...e})}):i(e)}function o(e){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(a,{}),`
`,(0,r.jsx)(n,{})]})}function s(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(o,{...e})}):o(e)}export{s as default};