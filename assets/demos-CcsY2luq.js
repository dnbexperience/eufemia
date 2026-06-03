import{n as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{t as r}from"./Anchor-ywdvt45E.js";import{t as i}from"./P-DtVKLSL-.js";import{t as a}from"./Pagination-C6K6JGcc.js";import{W as o,m as s,v as c}from"./index-BCXtuv-b.js";import{t as l}from"./ComponentBox-B2X8809Z.js";e();var u=t(n()),d=s.div`
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
`,f=()=>(0,u.jsx)(l,{"data-visual-test":`pagination-default`,stableName:`PaginationExampleDefault`,sourceImports:[`import { Fragment, useEffect, useState } from 'react'`,`import styled from '@emotion/styled'`,`import { P, Pagination, Table, Button, Anchor } from '@dnb/eufemia'`,`import { hasSelectedText } from '@dnb/eufemia/shared/helpers'`,`import { createPagination } from '@dnb/eufemia/components/pagination/Pagination'`],__buildScope:{Pagination:a,P:i},children:`<Pagination
  pageCount={888}
  currentPage={4}
  onChange={({ pageNumber }) => {
    console.log('onChange:', pageNumber)
  }}
>
  <P>Current Page Content</P>
</Pagination>
`}),p=()=>(0,u.jsx)(l,{"data-visual-test":`pagination-href`,stableName:`PaginationExampleWithTransformNavigationItem`,sourceImports:[`import { Fragment, useEffect, useState } from 'react'`,`import styled from '@emotion/styled'`,`import { P, Pagination, Table, Button, Anchor } from '@dnb/eufemia'`,`import { hasSelectedText } from '@dnb/eufemia/shared/helpers'`,`import { createPagination } from '@dnb/eufemia/components/pagination/Pagination'`],__buildScope:{Pagination:a,Anchor:r,P:i},children:`<Pagination
  pageCount={10}
  currentPage={3}
  transformNavigationItem={(pageNumber, navigationItemProps) => (
    <Anchor href={\`/page/\${pageNumber}\`} {...navigationItemProps} />
  )}
  onChange={({ pageNumber }) => {
    console.log('onChange:', pageNumber)
  }}
>
  <P>Current Page Content</P>
</Pagination>
`}),m=()=>(0,u.jsx)(l,{"data-visual-test":`pagination-horizontal`,stableName:`PaginationExampleWithHorizontalLayout`,sourceImports:[`import { Fragment, useEffect, useState } from 'react'`,`import styled from '@emotion/styled'`,`import { P, Pagination, Table, Button, Anchor } from '@dnb/eufemia'`,`import { hasSelectedText } from '@dnb/eufemia/shared/helpers'`,`import { createPagination } from '@dnb/eufemia/components/pagination/Pagination'`],__buildScope:{Pagination:a,P:i},children:`<Pagination
  pageCount={888}
  currentPage={4}
  onChange={({ pageNumber }) => {
    console.log('onChange:', pageNumber)
  }}
  paginationBarLayout="horizontal"
>
  <P>Current Page Content</P>
</Pagination>
`}),h=()=>(0,u.jsx)(l,{hideCode:!0,stableName:`PaginationExampleWithCallback`,sourceImports:[`import { Fragment, useEffect, useState } from 'react'`,`import styled from '@emotion/styled'`,`import { P, Pagination, Table, Button, Anchor } from '@dnb/eufemia'`,`import { hasSelectedText } from '@dnb/eufemia/shared/helpers'`,`import { createPagination } from '@dnb/eufemia/components/pagination/Pagination'`],__buildScope:{Pagination:a,P:i},children:`<Pagination
  pageCount={5}
  startupPage={3}
  onChange={({ pageNumber }) => {
    console.log('onChange:', pageNumber)
  }}
>
  {({ pageNumber }) => <P>Page {pageNumber}</P>}
</Pagination>
`}),g=()=>(0,u.jsx)(l,{scope:{LargePage:d},stableName:`PaginationExampleCentered`,sourceImports:[`import { Fragment, useEffect, useState } from 'react'`,`import styled from '@emotion/styled'`,`import { P, Pagination, Table, Button, Anchor } from '@dnb/eufemia'`,`import { hasSelectedText } from '@dnb/eufemia/shared/helpers'`,`import { createPagination } from '@dnb/eufemia/components/pagination/Pagination'`],__buildScope:{Pagination:a},children:`<Pagination align="center" pageCount={30}>
  {({ pageNumber, setContent }) => {
    // simulate server communication delay
    const timeout = setTimeout(() => {
      setContent(pageNumber, <LargePage>{pageNumber}</LargePage>)
    }, Math.ceil(Math.random() * 500))
    return () => clearTimeout(timeout)
  }}
</Pagination>
`}),_=[];for(let e=1;e<=300;e++)_.push({ssn:e,text:String(e),expanded:!1});s(c)`
  table-layout: fixed;
`,s.tr`
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
`,s.td`
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
`;function v(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,p:`p`,...o(),...e.components};return(0,u.jsxs)(u.Fragment,{children:[(0,u.jsx)(t.h2,{children:`Demos`}),`
`,(0,u.jsx)(t.h3,{children:`Default pagination`}),`
`,(0,u.jsx)(f,{}),`
`,(0,u.jsx)(t.p,{children:`If you need to access methods provided by the render property arguments.`}),`
`,(0,u.jsx)(h,{}),`
`,(0,u.jsx)(t.h3,{children:`Pagination with custom navigation element`}),`
`,(0,u.jsxs)(t.p,{children:[`Use `,(0,u.jsx)(t.code,{children:`transformNavigationItem`}),` to replace the default navigation buttons with custom elements.`]}),`
`,(0,u.jsx)(p,{}),`
`,(0,u.jsx)(t.h3,{children:`Horizontal pagination`}),`
`,(0,u.jsx)(m,{}),`
`,(0,u.jsx)(t.h3,{children:`Centered Pagination with random delay`}),`
`,(0,u.jsx)(t.p,{children:`Note that we keep the height of the previous page. All pages can for sure have their own height.`}),`
`,(0,u.jsx)(g,{}),`
`,(0,u.jsx)(t.h3,{children:`Infinity scroller demos`}),`
`,(0,u.jsxs)(t.p,{children:[`Check out `,(0,u.jsx)(t.a,{href:`/uilib/components/pagination/infinity-scroller`,children:`demos for the Infinity Scroller`}),`.`]})]})}function y(e={}){let{wrapper:t}={...o(),...e.components};return t?(0,u.jsx)(t,{...e,children:(0,u.jsx)(v,{...e})}):v(e)}export{y as default};