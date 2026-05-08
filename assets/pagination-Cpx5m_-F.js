import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{Lr as t}from"./index--zEB_f_m.js";import n from"./demos-Bg7D0pZy.js";var r=e();function i(e){let n={a:`a`,code:`code`,em:`em`,h2:`h2`,h3:`h3`,h4:`h4`,hr:`hr`,li:`li`,p:`p`,pre:`pre`,strong:`strong`,ul:`ul`,...t(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(n.h2,{children:`Import`}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-tsx`,children:`import { Pagination } from '@dnb/eufemia'
`})}),`
`,(0,r.jsx)(n.h2,{children:`Description`}),`
`,(0,r.jsxs)(n.p,{children:[`The Pagination component is used to split up larger data sets into pages / sections so users can interact sequentially through the content. It supports both classical `,(0,r.jsx)(n.strong,{children:`page pagination`}),` and `,(0,r.jsx)(n.strong,{children:`infinite scrolling`}),`.`]}),`
`,(0,r.jsx)(n.h2,{children:`Relevant links`}),`
`,(0,r.jsxs)(n.ul,{children:[`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`https://www.figma.com/design/cdtwQD8IJ7pTeE45U148r1/%F0%9F%92%BB-Eufemia---Web?node-id=20703-8887`,children:`Figma`})}),`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-eufemia/src/components/pagination`,children:`Source code`})}),`
`,(0,r.jsx)(n.li,{children:(0,r.jsx)(n.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/pagination`,children:`Docs code`})}),`
`]}),`
`,(0,r.jsx)(n.h3,{children:`Screen reader support`}),`
`,(0,r.jsxs)(n.p,{children:[`To make it easier for screen readers to navigate, the `,(0,r.jsx)(n.em,{children:`navigation bar`}),` markup is placed above the content, even if it is visually the opposite.`]}),`
`,(0,r.jsx)(n.hr,{}),`
`,(0,r.jsx)(n.h3,{children:`Default pagination and content handling`}),`
`,(0,r.jsx)(n.p,{children:`You can put your content inside the pagination wrapper. This has the advantage of giving screen reader users an easier way to interact with and understand the content. It will also "keep" the old page height until the next page is inserted while showing an indicator.`}),`
`,(0,r.jsxs)(n.p,{children:[`The pagination component can be used outside of the content. Then you have to export the `,(0,r.jsx)(n.code,{children:`Bar`}),` component directly from Pagination and link it together with your own states.`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-jsx`,children:`import { Bar } from '@dnb/eufemia/components/Pagination'
`})}),`
`,(0,r.jsxs)(n.p,{children:[`We recommend contacting one of the developers at Eufemia (`,(0,r.jsx)(n.a,{href:`https://dnb-it.slack.com/archives/CMXABCHEY`,children:`Slack channel #eufemia-web`}),`) to help you set up `,(0,r.jsx)(n.code,{children:`Bar`}),`, so that the pagination becomes screen reader compliant.`]}),`
`,(0,r.jsx)(n.h4,{children:`Pagination method #1`}),`
`,(0,r.jsx)(n.p,{children:`Returning a component directly inside a function as a child.`}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-jsx`,children:`import { Pagination } from '@dnb/eufemia/components'

render(
  <Pagination pageCount={2}>
    {() => {
      return ReactComponent
    }}
  </Pagination>
)
`})}),`
`,(0,r.jsx)(n.h4,{children:`Pagination method #2`}),`
`,(0,r.jsxs)(n.p,{children:[`Returning a function as a child and using `,(0,r.jsx)(n.code,{children:`setContent`}),`.`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-jsx`,children:`import { Pagination } from '@dnb/eufemia/components'

render(
  <Pagination pageCount={2}>
    {({ pageNumber, setContent }) => {
      setContent(pageNumber, ReactComponent)
    }}
  </Pagination>
)
`})}),`
`,(0,r.jsx)(n.h4,{children:`Pagination method #3`}),`
`,(0,r.jsxs)(n.p,{children:[`Using the `,(0,r.jsx)(n.code,{children:`onChange`}),` event together with `,(0,r.jsx)(n.code,{children:`setContent`}),`.`]}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-jsx`,children:`import { Pagination } from '@dnb/eufemia/components'

render(
  <Pagination
    pageCount={2}
    onChange={({ pageNumber, setContent }) => {
      setContent(pageNumber, ReactComponent)
    }}
  />
)
`})}),`
`,(0,r.jsx)(n.h4,{children:`Pagination method #4`}),`
`,(0,r.jsx)(n.p,{children:`Create the instance before using it.`}),`
`,(0,r.jsx)(n.pre,{children:(0,r.jsx)(n.code,{className:`language-jsx`,children:`import { createPagination } from '@dnb/eufemia/components/Pagination'

// create our Component instance
const { Pagination, setContent, resetContent } = createPagination()

// Later we can call this
setContent(pageNumber, ReactComponent)

render(<Pagination pageCount={2} />)
`})}),`
`,(0,r.jsx)(n.hr,{})]})}function a(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(i,{...e})}):i(e)}function o(e){return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(a,{}),`
`,(0,r.jsx)(n,{})]})}function s(e={}){let{wrapper:n}={...t(),...e.components};return n?(0,r.jsx)(n,{...e,children:(0,r.jsx)(o,{...e})}):o(e)}export{s as default};