import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Lr as t}from"./index-DVm0MbGb.js";import{n}from"./PropertiesTable-C9mjC5N9.js";import{t as r}from"./PaginationDocs-CBYOVYX4.js";var i=e();function a(e){let a={code:`code`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...t(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(a.h2,{children:`Events`}),`
`,(0,i.jsx)(n,{props:r}),`
`,(0,i.jsx)(a.h2,{children:`Returned object`}),`
`,(0,i.jsx)(a.p,{children:`Events have several useful methods to change / manipulate the content.`}),`
`,(0,i.jsx)(a.h3,{children:`Pagination mode`}),`
`,(0,i.jsx)(a.pre,{children:(0,i.jsx)(a.code,{className:`language-jsx`,children:`<Pagination
  onChange={({ pageNumber, ...methods }) => {
    // ...
  }}
/>
`})}),`
`,(0,i.jsxs)(a.ul,{children:[`
`,(0,i.jsxs)(a.li,{children:[(0,i.jsx)(a.code,{children:`pageNumber`}),` the current page number`]}),`
`,(0,i.jsxs)(a.li,{children:[(0,i.jsx)(a.code,{children:`setContent`}),` use it to add update a page including content: `,(0,i.jsx)(a.code,{children:`setContent(pageNumber, ReactComponent)`})]}),`
`]}),`
`,(0,i.jsx)(a.h3,{children:`Infinity mode`}),`
`,(0,i.jsx)(a.pre,{children:(0,i.jsx)(a.code,{className:`language-jsx`,children:`<Pagination
  mode="infinity"
  onChange={({ pageNumber, ...methods }) => {
    // ...
  }}
/>
`})}),`
`,(0,i.jsxs)(a.ul,{children:[`
`,(0,i.jsxs)(a.li,{children:[(0,i.jsx)(a.code,{children:`pageNumber`}),` the current page number`]}),`
`,(0,i.jsxs)(a.li,{children:[(0,i.jsx)(a.code,{children:`setContent`}),` use it to add update a page including content: `,(0,i.jsx)(a.code,{children:`setContent(pageNumber, ReactComponent, position = 'after')`})]}),`
`,(0,i.jsxs)(a.li,{children:[(0,i.jsx)(a.code,{children:`endInfinity`}),` use it to tell the infinity pagination to end the infinity scrolling interaction. Use this handler to end the infinity scrolling procedure, in case the pageCount is unknown: `,(0,i.jsx)(a.code,{children:`endInfinity(pageNumber)`})]}),`
`,(0,i.jsxs)(a.li,{children:[(0,i.jsx)(a.code,{children:`resetContent`}),` use it to invalidate all internal pages: `,(0,i.jsx)(a.code,{children:`resetContent()`})]}),`
`,(0,i.jsxs)(a.li,{children:[(0,i.jsx)(a.code,{children:`resetInfinity`}),` use it to reset the internal pagination states: `,(0,i.jsx)(a.code,{children:`resetInfinity(pageNumber = startupPage)`})]}),`
`,(0,i.jsxs)(a.li,{children:[(0,i.jsx)(a.code,{children:`items`}),` internal stored pages`]}),`
`]})]})}function o(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}export{o as default};