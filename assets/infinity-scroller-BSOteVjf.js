import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Lr as t}from"./index-DVm0MbGb.js";import n from"./demos-DogmS3MG.js";var r=e();function i(e){let n={a:`a`,code:`code`,h2:`h2`,h3:`h3`,h4:`h4`,hr:`hr`,li:`li`,ol:`ol`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...t(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h2,{children:`Import`}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { InfinityScroller } from '@dnb/eufemia/components/pagination/InfinityScroller'
`})}),`
`,(0,r.jsx)(n.h2,{children:`Description`}),`
`,(0,r.jsxs)(n.p,{children:[`The InfinityScroller component is a `,(0,r.jsx)(n.code,{children:`mode`}),` of the Pagination component which loads content continuously as the user scrolls down the page. Go to `,(0,r.jsx)(n.a,{href:`/uilib/components/pagination`,children:`Pagination`}),` for information on properties and events.`]}),`
`,(0,r.jsxs)(n.p,{children:[`You can choose to use either `,(0,r.jsx)(n.code,{children:`<Pagination mode="infinity" />`}),` or `,(0,r.jsx)(n.code,{children:`<InfinityScroller />`}),`.`]}),`
`,(0,r.jsx)(n.h2,{children:`Relevant links`}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/pagination/InfinityScroller`,children:`Source code`})}),`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/pagination/infinity-scroller`,children:`Docs code`})}),`
`]}),`
`,(0,r.jsx)(n.h3,{children:`Async data handling`}),`
`,(0,r.jsx)(n.p,{children:`Infinity scrolling requires additional handling of already loaded content. To do so, it stores already shown content and interacts from there.`}),`
`,(0,r.jsx)(n.h3,{children:`Gotchas`}),`
`,(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:`Infinity scroller:`}),` Once content inside a page changes, we have to tell the component explicitly what "page" number happened, including the new content.`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-jsx`,children:`setContent(pageNumber, ReactComponent)
`})}),`
`,(0,r.jsx)(n.hr,{}),`
`,(0,r.jsx)(n.h3,{children:`Infinity scroller and content handling`}),`
`,(0,r.jsx)(n.p,{children:`In order to update content into the internal pages stack, we have to get access to the component instance. There are several ways to do so.`}),`
`,(0,r.jsx)(n.p,{children:`Also, there are two type of handling content on:`}),`
`,(0,r.jsxs)(n.ol,{children:[`
`,(0,r.jsx)(n.li,{children:`Either you fill the content as "pages" in a page per page basis (methods 1-3),`}),`
`,(0,r.jsx)(n.li,{children:`or you have your own stack, and you only want use the infinity part (method 4).`}),`
`]}),`
`,(0,r.jsx)(n.h4,{children:`Infinity scroller method #1`}),`
`,(0,r.jsx)(n.p,{children:`Create the instance before using it.`}),`
`,(0,r.jsxs)(n.p,{children:[(0,r.jsx)(n.strong,{children:`NB:`}),` Keep in mind, you may create the instance first during runtime, either in a class `,(0,r.jsx)(n.code,{children:`constructor`}),` or by using `,(0,r.jsx)(n.code,{children:`useState`}),`:`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-jsx`,children:`import { createPagination } from '@dnb/eufemia/components/Pagination'

// create our Component instance
const { Pagination, setContent, endInfinity, resetContent } =
  React.useState(createPagination)

// Later we can do call this (make sure the page is set by listening to the events)
setContent(page, ReactComponent)

render(<Pagination mode="infinity" />)
`})}),`
`,(0,r.jsx)(n.h4,{children:`Infinity scroller method #2`}),`
`,(0,r.jsxs)(n.p,{children:[`Using the `,(0,r.jsx)(n.code,{children:`onChange`}),` event together with `,(0,r.jsx)(n.code,{children:`setContent`}),`.`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-jsx`,children:`import { Pagination } from '@dnb/eufemia/components'

render(
  <Pagination
    mode="infinity"
    onChange={({ pageNumber, setContent }) => {
      setContent(pageNumber, ReactComponent)
    }}
  />
)
`})}),`
`,(0,r.jsx)(n.h4,{children:`Infinity scroller method #3`}),`
`,(0,r.jsxs)(n.p,{children:[`Using a `,(0,r.jsx)(n.code,{children:`setContentHandler`}),` handler.`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-jsx`,children:`import InfinityScroller from '@dnb/eufemia/components/pagination/InfinityScroller'

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
`,(0,r.jsx)(n.h4,{children:`Infinity scroller method #4`}),`
`,(0,r.jsxs)(n.p,{children:[`Using a `,(0,r.jsx)(n.code,{children:`InfinityMarker`}),` only. See `,(0,r.jsx)(n.a,{href:`https://github.com/dnbexperience/eufemia/blob/main/packages/dnb-eufemia/src/components/pagination/stories/PaginationTableMarker.stories.tsx`,children:`code example on GitHub`}),`.`]}),`
`,(0,r.jsxs)(n.p,{children:[`This method will basically add a load button on top, if `,(0,r.jsx)(n.code,{children:`startupPage`}),` or `,(0,r.jsx)(n.code,{children:`currentPage`}),` is higher than `,(0,r.jsx)(n.code,{children:`1`}),` at the first render.`]}),`
`,(0,r.jsxs)(n.p,{children:[`Also, it adds an indicator at the bottom until next render, and as long as `,(0,r.jsx)(n.code,{children:`pageCount`}),` has not reached the internal page count. But instead of setting `,(0,r.jsx)(n.code,{children:`pageCount`}),` (total pages), you can pragmatically call `,(0,r.jsx)(n.code,{children:`endInfinity()`}),` instead.`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-jsx`,children:`import { createPagination } from '@dnb/eufemia/components/Pagination'

// create our Component instance
const { InfinityMarker, endInfinity, resetInfinity } =
  React.useState(createPagination)

render(<InfinityMarker>ReactComponent</InfinityMarker>)
`})})]})}function a(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(i,{...e})}):i(e)}function o(e){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(a,{}),`
`,(0,r.jsx)(n,{})]})}function s(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(o,{...e})}):o(e)}export{s as default};