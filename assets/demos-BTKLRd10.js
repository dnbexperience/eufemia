import{a as e}from"./rolldown-runtime-BYbx6iT9.js";import{n as t,t as n}from"./jsx-runtime-BgMs7Gb-.js";import{n as r,t as i}from"./Pagination-DiH2REJb.js";import{t as a}from"./Table-C7__Bj3A.js";import{Aa as o,An as s,Bn as c,In as l,Lr as u,Rr as d,_n as f,wr as p,y as m}from"./index-BIrFyEEc.js";import{t as h}from"./ComponentBox-DFVIRw0w.js";var g=e(t()),_=e(n()),v=m.div`
  height: ${e=>e.height||`20rem`};
  overflow-y: scroll;
  background-color: var(--color-white);
  border: 0.25rem dotted var(--color-black);
`,y=m.div`
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
`,b=()=>(0,_.jsx)(h,{scope:{HeightLimit:v,LargePage:y},stableName:`PaginationExampleInfinityLoadButton`,sourceImports:[`import { Fragment, useEffect, useState, MouseEvent } from 'react'`,`import styled from '@emotion/styled'`,`import { H1, P, Ul, Pagination, Section, Space, Button } from '@dnb/eufemia'`,`import Table from '@dnb/eufemia/components/Table'`,`import { hasSelectedText } from '@dnb/eufemia/shared/helpers'`,`import { createPagination, PaginationCreateReturn } from '@dnb/eufemia/components/Pagination'`],__buildScope:{Pagination:i},children:`<HeightLimit>
  <Pagination
    mode="infinity"
    useLoadButton
    startupPage={5}
    minWaitTime={0}
    onLoad={({ pageNumber, setContent }) => {
      // simulate server communication delay
      const timeout = setTimeout(() => {
        setContent(pageNumber, <LargePage>{pageNumber}</LargePage>)
      }, Math.ceil(Math.random() * 500))
      return () => clearTimeout(timeout)
    }}
  />
</HeightLimit>
`}),x=()=>(0,_.jsx)(h,{scope:{HeightLimit:v,LargePage:y},stableName:`PaginationExampleInfinityIndicator`,sourceImports:[`import { Fragment, useEffect, useState, MouseEvent } from 'react'`,`import styled from '@emotion/styled'`,`import { H1, P, Ul, Pagination, Section, Space, Button } from '@dnb/eufemia'`,`import Table from '@dnb/eufemia/components/Table'`,`import { hasSelectedText } from '@dnb/eufemia/shared/helpers'`,`import { createPagination, PaginationCreateReturn } from '@dnb/eufemia/components/Pagination'`],__buildScope:{Pagination:i},children:`<HeightLimit>
  <Pagination
    mode="infinity"
    indicatorElement={() => (
      <LargePage color="lightgreen">Loading ...</LargePage>
    )}
    startupPage={3}
    pageCount={10}
    minWaitTime={0}
    onLoad={({ pageNumber, setContent }) => {
      // simulate server communication delay
      const timeout = setTimeout(() => {
        setContent(pageNumber, <LargePage>{pageNumber}</LargePage>)
      }, Math.ceil(Math.random() * 500))
      return () => clearTimeout(timeout)
    }}
    onEnd={({ pageNumber, setContent }) => {
      setContent(pageNumber, <LargePage color="lightgreen">End</LargePage>)
    }}
  />
</HeightLimit>
`}),S=()=>(0,_.jsx)(h,{scope:{HeightLimit:v,LargePage:y},stableName:`PaginationExampleInfinityUnknown`,sourceImports:[`import { Fragment, useEffect, useState, MouseEvent } from 'react'`,`import styled from '@emotion/styled'`,`import { H1, P, Ul, Pagination, Section, Space, Button } from '@dnb/eufemia'`,`import Table from '@dnb/eufemia/components/Table'`,`import { hasSelectedText } from '@dnb/eufemia/shared/helpers'`,`import { createPagination, PaginationCreateReturn } from '@dnb/eufemia/components/Pagination'`],__buildScope:{Pagination:i},children:`<HeightLimit>
  <Pagination
    mode="infinity"
    parallelLoadCount={2}
    minWaitTime={0}
    onLoad={({ pageNumber, setContent, endInfinity }) => {
      // simulate server communication delay
      const timeout = setTimeout(() => {
        if (pageNumber > 10) {
          endInfinity()
        } else {
          setContent(pageNumber, <LargePage>{pageNumber}</LargePage>)
        }
      }, Math.ceil(Math.random() * 1e3))
      return () => clearTimeout(timeout)
    }}
    onEnd={({ pageNumber, setContent }) => {
      setContent(pageNumber, <LargePage color="lightgreen">End</LargePage>)
    }}
  />
</HeightLimit>
`}),C=()=>(0,_.jsx)(h,{scope:{HeightLimit:v,PaginationTableExample:w},stableName:`PaginationExampleInfinityTable`,sourceImports:[`import { Fragment, useEffect, useState, MouseEvent } from 'react'`,`import styled from '@emotion/styled'`,`import { H1, P, Ul, Pagination, Section, Space, Button } from '@dnb/eufemia'`,`import Table from '@dnb/eufemia/components/Table'`,`import { hasSelectedText } from '@dnb/eufemia/shared/helpers'`,`import { createPagination, PaginationCreateReturn } from '@dnb/eufemia/components/Pagination'`],children:`<HeightLimit height="60rem">
  <PaginationTableExample />
</HeightLimit>
`});function w(){return(0,_.jsxs)(N,{className:`dnb-core-style`,innerSpace:{block:`large`},children:[(0,_.jsxs)(u,{left:!0,children:[(0,_.jsx)(s,{size:`small`,children:`Infinity Table`}),(0,_.jsx)(l,{bottom:!0,children:`This is a semantic correct table using infinity scrolling. It also has a sticky header.`}),(0,_.jsxs)(f,{bottom:!0,children:[(0,_.jsx)(`li`,{children:`The startup page number is set to 3.`}),(0,_.jsx)(`li`,{children:`And per page we show 10 items.`}),(0,_.jsx)(`li`,{children:`A random delay is added to simulate asynchronous interaction.`})]})]}),(0,_.jsx)(E,{tableItems:T})]})}var T=[];for(let e=1;e<=300;e++)T.push({ssn:e,text:String(e),expanded:!1});var E=({tableItems:e,...t})=>{let n=Math.floor(e?.length/10),[{Pagination:i,setContent:a,resetContent:o,resetInfinity:s,endInfinity:c}]=(0,g.useState)(r),[l,u]=(0,g.useState)(`asc`),[d,f]=(0,g.useState)(null),[m,h]=(0,g.useState)(null);(0,g.useEffect)(()=>{f(3)},[]),e=M(e,l),a(d,(0,_.jsx)(D,{items:e,perPageCount:10,currentPage:d,onToggleExpanded:({ssn:t},{pageNumber:n,element:r=null,onExpanded:i=null})=>{let a=e.findIndex(({ssn:e})=>e===t);if(a>-1){let t=e[a];e[a]={...t,expanded:!t.expanded},f(n),h(new Date().getTime()),r&&j({element:r,expanded:!t.expanded}),setTimeout(i,10)}},onMounted:e=>{e.forEach(({element:{current:e},expanded:t})=>j({element:e,expanded:t,animation:!1}))},endInfinity:c}));let v;(0,g.useEffect)(()=>()=>clearTimeout(v));let y=({pageNumber:e})=>{console.log(`onChange: with page`,e),clearTimeout(v),v=setTimeout(()=>{e===d?h(new Date().getTime()):f(e)},Math.ceil(Math.random()*1e3))};return(0,_.jsxs)(O,{sticky:!0,children:[(0,_.jsx)(`thead`,{children:(0,_.jsxs)(`tr`,{children:[(0,_.jsx)(`th`,{scope:`col`,children:(0,_.jsx)(p,{size:`small`,icon:`reset`,iconPosition:`left`,variant:`secondary`,onClick:()=>{clearTimeout(v),s(),o(),u(`asc`),h(new Date().getTime())},children:`Reset everything`})}),(0,_.jsx)(`th`,{scope:`col`,className:`dnb-table--sortable dnb-table--active ${l===`desc`?` dnb-table--reversed`:``}`,children:(0,_.jsx)(p,{variant:`tertiary`,icon:`arrow-down`,text:`Sortable`,title:`Sort table row`,onClick:()=>{o(),u(e=>e===`asc`?`desc`:`asc`)}})})]})}),(0,_.jsx)(`tbody`,{children:(0,_.jsx)(i,{mode:`infinity`,markerElement:`tr`,fallbackElement:({className:e,...t})=>(0,_.jsx)(k,{className:e,children:(0,_.jsx)(A,{colSpan:2,...t})}),currentPage:d,pageCount:n,...t,onStartup:y,onChange:y})})]})},D=({children:e=null,items:t,currentPage:n,perPageCount:r,onToggleExpanded:i,onMounted:a,endInfinity:s,...c})=>{let u=[];return a&&(0,g.useEffect)(()=>a&&a(u),[]),t=t.filter((e,t)=>{let i=(n-1)*r,a=i+r;return t>=i&&t<a}),t.length===0?(s(),null):t.map((t,r)=>{let a={onClick:e=>{if(!o()||/button/.test(document.activeElement.tagName)){let r=e.currentTarget;i(t,{pageNumber:n,onExpanded:()=>{try{r=r.nextElementSibling,j({element:r,expanded:!t.expanded}),r.focus()}catch{}}})}}},s={current:null};return u.push({...t,element:s}),(0,_.jsxs)(g.Fragment,{children:[(0,_.jsxs)(k,{...c,...a,className:`dnb-table--${r%2?`even`:`odd`} ${t.expanded?`expanded`:``}`,ref:s,children:[(0,_.jsx)(A,{children:(0,_.jsx)(p,{title:t.expanded?`Hide details`:`Show more details`,icon:`chevron_down`,size:`small`,right:`large`})}),(0,_.jsx)(A,{children:(0,_.jsxs)(l,{children:[t.text,` `,e]})})]}),(0,_.jsx)(k,{className:`expanded-content dnb-no-focus ${t.expanded?`expanded`:``}`,tabIndex:-1,children:(0,_.jsx)(A,{colSpan:2,children:t.expanded&&(0,_.jsx)(`div`,{className:`expanded-content__outer`,children:(0,_.jsxs)(`div`,{className:`expanded-content__inner`,children:[(0,_.jsx)(l,{children:`What ever content ...`}),(0,_.jsx)(p,{variant:`secondary`,top:!0,children:`🔥`})]})})})})]},t.ssn)})},O=m(a)`
  table-layout: fixed;
`,k=m.tr`
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
`,A=m.td`
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
`,j=({element:e,expanded:t=!1,animation:n=!0})=>{if(e&&typeof window<`u`&&window.requestAnimationFrame){/td/.test(e.nodeName)&&(e=e.parentElement);let r=t?window.getComputedStyle(e)[`max-height`]:e.scrollHeight;window.requestAnimationFrame(()=>{n&&(e.style.height=`1px`),window.requestAnimationFrame(()=>e.style.height=r)})}},M=(e,t)=>e.sort(({text:e},{text:n})=>{let r=parseFloat(e),i=parseFloat(n);return(t===`asc`?r>i:r<i)?1:-1}),N=m(c)`
  width: 100%;
  background: var(--color-white);
`;function P(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,p:`p`,...d(),...e.components};return(0,_.jsxs)(_.Fragment,{children:[(0,_.jsx)(t.h2,{children:`Demos`}),`
`,(0,_.jsx)(t.h3,{children:`Infinity scroller with load button`}),`
`,(0,_.jsxs)(t.p,{children:[`A load button is shown at the bottom by having `,(0,_.jsx)(t.code,{children:`useLoadButton={true}`}),` - but here we define our `,(0,_.jsx)(t.code,{children:`startupPage={5}`}),`, so we also get a load button on top.`]}),`
`,(0,_.jsx)(b,{}),`
`,(0,_.jsx)(t.h3,{children:`Infinity scroller with custom load indicator`}),`
`,(0,_.jsx)(x,{}),`
`,(0,_.jsxs)(t.h3,{children:[`Infinity scroller with unknown `,(0,_.jsx)(t.code,{children:`pageCount`})]}),`
`,(0,_.jsx)(S,{}),`
`,(0,_.jsx)(t.h3,{children:`Advanced Table infinity scroller`}),`
`,(0,_.jsxs)(t.p,{children:[`You can find the code on `,(0,_.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/pagination/Examples.tsx`,children:`GitHub`})]}),`
`,(0,_.jsx)(C,{})]})}function F(e={}){let{wrapper:t}={...d(),...e.components};return t?(0,_.jsx)(t,{...e,children:(0,_.jsx)(P,{...e})}):P(e)}export{F as default};