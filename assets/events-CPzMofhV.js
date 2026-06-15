import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{K as n}from"./index-ppRu2ktv.js";import{n as r}from"./PropertiesTable-B8eoyvum.js";import{t as i}from"./PaginationDocs-C5jEBJ2z.js";var a=e(t());function o(e){let t={code:`code`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,pre:`pre`,ul:`ul`,...n(),...e.components};return(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.h2,{children:`Events`}),`
`,(0,a.jsx)(r,{props:i}),`
`,(0,a.jsx)(t.h2,{children:`Returned object`}),`
`,(0,a.jsx)(t.p,{children:`Events have several useful methods to change / manipulate the content.`}),`
`,(0,a.jsx)(t.h3,{children:`Pagination mode`}),`
`,(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:`language-jsx`,children:`<Pagination
  onChange={({ pageNumber, ...methods }) => {
    // ...
  }}
/>
`})}),`
`,(0,a.jsxs)(t.ul,{children:[`
`,(0,a.jsxs)(t.li,{children:[(0,a.jsx)(t.code,{children:`pageNumber`}),` the current page number`]}),`
`,(0,a.jsxs)(t.li,{children:[(0,a.jsx)(t.code,{children:`setContent`}),` use it to add update a page including content: `,(0,a.jsx)(t.code,{children:`setContent(pageNumber, ReactComponent)`})]}),`
`]}),`
`,(0,a.jsx)(t.h3,{children:`Infinity mode`}),`
`,(0,a.jsx)(t.pre,{children:(0,a.jsx)(t.code,{className:`language-jsx`,children:`<Pagination
  mode="infinity"
  onChange={({ pageNumber, ...methods }) => {
    // ...
  }}
/>
`})}),`
`,(0,a.jsxs)(t.ul,{children:[`
`,(0,a.jsxs)(t.li,{children:[(0,a.jsx)(t.code,{children:`pageNumber`}),` the current page number`]}),`
`,(0,a.jsxs)(t.li,{children:[(0,a.jsx)(t.code,{children:`setContent`}),` use it to add update a page including content: `,(0,a.jsx)(t.code,{children:`setContent(pageNumber, ReactComponent, position = 'after')`})]}),`
`,(0,a.jsxs)(t.li,{children:[(0,a.jsx)(t.code,{children:`endInfinity`}),` use it to tell the infinity pagination to end the infinity scrolling interaction. Use this handler to end the infinity scrolling procedure, in case the pageCount is unknown: `,(0,a.jsx)(t.code,{children:`endInfinity(pageNumber)`})]}),`
`,(0,a.jsxs)(t.li,{children:[(0,a.jsx)(t.code,{children:`resetContent`}),` use it to invalidate all internal pages: `,(0,a.jsx)(t.code,{children:`resetContent()`})]}),`
`,(0,a.jsxs)(t.li,{children:[(0,a.jsx)(t.code,{children:`resetInfinity`}),` use it to reset the internal pagination states: `,(0,a.jsx)(t.code,{children:`resetInfinity(pageNumber = startupPage)`})]}),`
`,(0,a.jsxs)(t.li,{children:[(0,a.jsx)(t.code,{children:`items`}),` internal stored pages`]}),`
`]})]})}function s(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(o,{...e})}):o(e)}export{s as default};