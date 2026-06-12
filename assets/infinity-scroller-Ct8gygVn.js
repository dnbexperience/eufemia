import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{K as n}from"./index-CsG353ar.js";import r from"./demos-USy40mtv.js";var i=e(t());function a(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,h4:`h4`,hr:`hr`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...n(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h2,{children:`Import`}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-tsx`,children:`import { InfinityScroller } from '@dnb/eufemia/components/pagination/InfinityScroller'
`})}),`
`,(0,i.jsx)(t.h2,{children:`Description`}),`
`,(0,i.jsxs)(t.p,{children:[`The InfinityScroller component is a `,(0,i.jsx)(t.code,{children:`mode`}),` of the Pagination component which loads content continuously as the user scrolls down the page. Go to `,(0,i.jsx)(t.a,{href:`/uilib/components/pagination`,children:`Pagination`}),` for information on properties and events.`]}),`
`,(0,i.jsxs)(t.p,{children:[`You can choose to use either `,(0,i.jsx)(t.code,{children:`<Pagination mode="infinity" />`}),` or `,(0,i.jsx)(t.code,{children:`<InfinityScroller />`}),`.`]}),`
`,(0,i.jsx)(t.h2,{children:`Relevant links`}),`
`,(0,i.jsxs)(t.ul,{children:[`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/pagination/InfinityScroller`,children:`Source code`})}),`
`,(0,i.jsx)(t.li,{children:(0,i.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/pagination/infinity-scroller`,children:`Docs code`})}),`
`]}),`
`,(0,i.jsx)(t.h3,{children:`Async data handling`}),`
`,(0,i.jsx)(t.p,{children:`Infinity scrolling requires additional handling of already loaded content. To do so, it stores already shown content and interacts from there.`}),`
`,(0,i.jsx)(t.h3,{children:`Gotchas`}),`
`,(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.strong,{children:`Infinity scroller:`}),` Once content inside a page changes, we have to tell the component explicitly what "page" number happened, including the new content.`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-jsx`,children:`setContent(pageNumber, ReactComponent)
`})}),`
`,(0,i.jsx)(t.hr,{}),`
`,(0,i.jsx)(t.h3,{children:`Infinity scroller and content handling`}),`
`,(0,i.jsx)(t.p,{children:`In order to update content into the internal pages stack, we have to get access to the component instance. There are several ways to do so.`}),`
`,(0,i.jsx)(t.p,{children:`Also, there are two type of handling content on:`}),`
`,(0,i.jsxs)(t.ol,{children:[`
`,(0,i.jsx)(t.li,{children:`Either you fill the content as "pages" in a page per page basis (methods 1-3),`}),`
`,(0,i.jsx)(t.li,{children:`or you have your own stack, and you only want use the infinity part (method 4).`}),`
`]}),`
`,(0,i.jsx)(t.h4,{children:`Infinity scroller method #1`}),`
`,(0,i.jsx)(t.p,{children:`Create the instance before using it.`}),`
`,(0,i.jsxs)(t.p,{children:[(0,i.jsx)(t.strong,{children:`NB:`}),` Keep in mind, you may create the instance first during runtime, either in a class `,(0,i.jsx)(t.code,{children:`constructor`}),` or by using `,(0,i.jsx)(t.code,{children:`useState`}),`:`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-jsx`,children:`import { createPagination } from '@dnb/eufemia/components/Pagination'

// create our Component instance
const { Pagination, setContent, endInfinity, resetContent } =
  React.useState(createPagination)

// Later we can do call this (make sure the page is set by listening to the events)
setContent(page, ReactComponent)

render(<Pagination mode="infinity" />)
`})}),`
`,(0,i.jsx)(t.h4,{children:`Infinity scroller method #2`}),`
`,(0,i.jsxs)(t.p,{children:[`Using the `,(0,i.jsx)(t.code,{children:`onChange`}),` event together with `,(0,i.jsx)(t.code,{children:`setContent`}),`.`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-jsx`,children:`import { Pagination } from '@dnb/eufemia/components'

render(
  <Pagination
    mode="infinity"
    onChange={({ pageNumber, setContent }) => {
      setContent(pageNumber, ReactComponent)
    }}
  />
)
`})}),`
`,(0,i.jsx)(t.h4,{children:`Infinity scroller method #3`}),`
`,(0,i.jsxs)(t.p,{children:[`Using a `,(0,i.jsx)(t.code,{children:`setContentHandler`}),` handler.`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-jsx`,children:`import InfinityScroller from '@dnb/eufemia/components/pagination/InfinityScroller'

const [localPage, setLocalPage] = React.useState(1)
const setContent = React.createRef()

React.useEffect(() => {
  setContent.current(localPage, ReactComponent)
}, [localPage])

render(
  <InfinityScroller
    setContentHandler={(fn) => (setContent = fn)}
    onChange={({ pageNumber }) => {
      setLocalPage(pageNumber)
    }}
  />
)
`})}),`
`,(0,i.jsx)(t.h4,{children:`Infinity scroller method #4`}),`
`,(0,i.jsxs)(t.p,{children:[`This method will basically add a load button on top, if `,(0,i.jsx)(t.code,{children:`startupPage`}),` or `,(0,i.jsx)(t.code,{children:`currentPage`}),` is higher than `,(0,i.jsx)(t.code,{children:`1`}),` at the first render.`]}),`
`,(0,i.jsxs)(t.p,{children:[`Also, it adds an indicator at the bottom until next render, and as long as `,(0,i.jsx)(t.code,{children:`pageCount`}),` has not reached the internal page count. But instead of setting `,(0,i.jsx)(t.code,{children:`pageCount`}),` (total pages), you can pragmatically call `,(0,i.jsx)(t.code,{children:`endInfinity()`}),` instead.`]}),`
`,(0,i.jsx)(t.pre,{children:(0,i.jsx)(t.code,{className:`language-jsx`,children:`import { createPagination } from '@dnb/eufemia/components/Pagination'

// create our Component instance
const { InfinityMarker, endInfinity, resetInfinity } =
  React.useState(createPagination)

render(<InfinityMarker>ReactComponent</InfinityMarker>)
`})})]})}function o(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(a,{...e})}):a(e)}function s(e){return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(o,{}),`
`,(0,i.jsx)(r,{})]})}function c(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(s,{...e})}):s(e)}export{c as default};