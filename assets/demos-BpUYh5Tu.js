import{a as e}from"./rolldown-runtime-BYbx6iT9.js";import{n as t,t as n}from"./jsx-runtime-BgMs7Gb-.js";import{t as r}from"./ComponentBox-a4aOn231.js";import{Rt as i,y as a,zr as o}from"./index-DqqByKA2.js";t();var s=e(n()),c=a.div`
  display: flex;
  justify-content: center;
  align-items: center;

  height: 15vw;

  background-color: ${e=>e.color||`tomato`};
  font-size: 15vw;
  font-weight: var(--font-weight-bold);
  font-feature-settings:
    'pnum' on,
    'lnum' on;

  color: var(--color-white);
`,l=()=>(0,s.jsx)(r,{"data-visual-test":`pagination-default`,stableName:`PaginationExampleDefault`,children:`<Pagination
  pageCount={888}
  currentPage={4}
  onChange={({ pageNumber }) => {
    console.log('onChange:', pageNumber)
  }}
>
  <P>Current Page Content</P>
</Pagination>
`}),u=()=>(0,s.jsx)(r,{"data-visual-test":`pagination-horizontal`,stableName:`PaginationExampleWithHorizontalLayout`,children:`<Pagination
  pageCount={888}
  currentPage={4}
  onChange={({ pageNumber }) => {
    console.log('onChange:', pageNumber)
  }}
  paginationBarLayout="horizontal"
>
  <P>Current Page Content</P>
</Pagination>
`}),d=()=>(0,s.jsx)(r,{hideCode:!0,stableName:`PaginationExampleWithCallback`,children:`<Pagination
  pageCount={5}
  startupPage={3}
  onChange={({ pageNumber }) => {
    console.log('onChange:', pageNumber)
  }}
>
  {({ pageNumber }) => <P>Page {pageNumber}</P>}
</Pagination>
`}),f=()=>(0,s.jsx)(r,{scope:{LargePage:c},stableName:`PaginationExampleCentered`,children:`<Pagination align="center" pageCount={30}>
  {({ pageNumber, setContent }) => {
    // simulate server communication delay
    const timeout = setTimeout(() => {
      setContent(pageNumber, <LargePage>{pageNumber}</LargePage>)
    }, Math.ceil(Math.random() * 500))
    return () => clearTimeout(timeout)
  }}
</Pagination>
`}),p=[];for(let e=1;e<=300;e++)p.push({ssn:e,text:String(e),expanded:!1});a(i)`
  table-layout: fixed;
`,a.tr`
  &:not(.expanded-content):hover {
    cursor: pointer;
    opacity: 0.8;
  }

  .dnb-icon {
    transition: transform 300ms ease-out;
  }
  &.expanded {
    .dnb-icon {
      transform: rotate(-180deg);
    }
  }

  &.expanded-content {
    /*
      This is our expanded height (maxHeight)
      NB: we can use max-height, because max-height is not supported in tr
    */
    max-height: 10rem;

    transform: translateY(-10px);
    opacity: 0;

    transition:
      height 400ms ease-out,
      opacity 600ms ease-out,
      transform 400ms ease-out;

    td {
      height: inherit;
      padding: 0;
      background-color: var(--color-white);

      .expanded-content__outer {
        height: inherit;
      }

      /* If we don't wrap with an additional inner, then we get a jump in the animation */
      .expanded-content__inner {
        height: inherit;
        padding: 2rem 0 2rem 3rem;

        background-color: tomato;
      }
    }
  }
  &.expanded.expanded-content {
    opacity: 1;
    transform: translateY(0);
  }
`,a.td`
  .dnb-pagination__loadbar {
    justify-content: flex-start;
  }
  .dnb-pagination__indicator,
  .dnb-pagination__loadbar {
    height: 6rem;
  }

  .dnb-p {
    cursor: text;

    font-feature-settings:
      'pnum' on,
      'lnum' on;
    font-weight: var(--font-weight-bold);
    font-size: var(--font-size-large);

    /** reset css specificity */
    .dnb-spacing &.dnb-h--large:not([class*='space__bottom']),
    .dnb-core-style
      .dnb-spacing
      &.dnb-h--large:not([class*='space__bottom']) {
      margin: 0;
    }
  }
`;function m(e){let t={a:`a`,h2:`h2`,h3:`h3`,p:`p`,...o(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.h2,{children:`Demos`}),`
`,(0,s.jsx)(t.h3,{children:`Default pagination`}),`
`,(0,s.jsx)(l,{}),`
`,(0,s.jsx)(t.p,{children:`If you need to access methods provided by the render property arguments.`}),`
`,(0,s.jsx)(d,{}),`
`,(0,s.jsx)(t.h3,{children:`Horizontal pagination`}),`
`,(0,s.jsx)(u,{}),`
`,(0,s.jsx)(t.h3,{children:`Centered Pagination with random delay`}),`
`,(0,s.jsx)(t.p,{children:`Note that we keep the height of the previous page. All pages can for sure have their own height.`}),`
`,(0,s.jsx)(f,{}),`
`,(0,s.jsx)(t.h3,{children:`Infinity scroller demos`}),`
`,(0,s.jsxs)(t.p,{children:[`Check out `,(0,s.jsx)(t.a,{href:`/uilib/components/pagination/infinity-scroller`,children:`demos for the Infinity Scroller`}),`.`]})]})}function h(e={}){let{wrapper:t}={...o(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(m,{...e})}):m(e)}export{h as default};