import{a as e}from"./rolldown-runtime-BYbx6iT9.js";import{n as t,t as n}from"./jsx-runtime-BgMs7Gb-.js";import{N as r,k as i,t as a}from"./ComponentBox-DPdYTeDv.js";import{An as o,Ca as s,In as c,Ir as l,Lr as u,Mt as d,Vn as f,_n as p,xr as m}from"./index--zEB_f_m.js";var h=e(t()),g=n(),_=d.div`
  height: ${e=>e.height||`20rem`};
  overflow-y: scroll;
  background-color: var(--color-white);
  border: 0.25rem dotted var(--color-black);
`,v=d.div`
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
`,y=()=>(0,g.jsx)(a,{scope:{HeightLimit:_,LargePage:v},children:`<HeightLimit>
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
`}),b=()=>(0,g.jsx)(a,{scope:{HeightLimit:_,LargePage:v},children:`<HeightLimit>
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
`}),x=()=>(0,g.jsx)(a,{scope:{HeightLimit:_,LargePage:v},children:`<HeightLimit>
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
`}),S=()=>(0,g.jsx)(a,{scope:{HeightLimit:_,PaginationTableExample:C},children:`<HeightLimit height="60rem">
  <PaginationTableExample />
</HeightLimit>
`});function C(){return(0,g.jsxs)(M,{className:`dnb-core-style`,innerSpace:{block:`large`},children:[(0,g.jsxs)(l,{left:!0,children:[(0,g.jsx)(o,{size:`small`,children:`Infinity Table`}),(0,g.jsx)(c,{bottom:!0,children:`This is a semantic correct table using infinity scrolling. It also has a sticky header.`}),(0,g.jsxs)(p,{bottom:!0,children:[(0,g.jsx)(`li`,{children:`The startup page number is set to 3.`}),(0,g.jsx)(`li`,{children:`And per page we show 10 items.`}),(0,g.jsx)(`li`,{children:`A random delay is added to simulate asynchronous interaction.`})]})]}),(0,g.jsx)(T,{tableItems:w})]})}var w=[];for(let e=1;e<=300;e++)w.push({ssn:e,text:String(e),expanded:!1});var T=({tableItems:e,...t})=>{let n=Math.floor(e?.length/10),[{Pagination:i,setContent:a,resetContent:o,resetInfinity:s,endInfinity:c}]=(0,h.useState)(r),[l,u]=(0,h.useState)(`asc`),[d,f]=(0,h.useState)(null),[p,_]=(0,h.useState)(null);(0,h.useEffect)(()=>{f(3)},[]),e=j(e,l),a(d,(0,g.jsx)(E,{items:e,perPageCount:10,currentPage:d,onToggleExpanded:({ssn:t},{pageNumber:n,element:r=null,onExpanded:i=null})=>{let a=e.findIndex(({ssn:e})=>e===t);if(a>-1){let t=e[a];e[a]={...t,expanded:!t.expanded},f(n),_(new Date().getTime()),r&&A({element:r,expanded:!t.expanded}),setTimeout(i,10)}},onMounted:e=>{e.forEach(({element:{current:e},expanded:t})=>A({element:e,expanded:t,animation:!1}))},endInfinity:c}));let v;(0,h.useEffect)(()=>()=>clearTimeout(v));let y=({pageNumber:e})=>{console.log(`onChange: with page`,e),clearTimeout(v),v=setTimeout(()=>{e===d?_(new Date().getTime()):f(e)},Math.ceil(Math.random()*1e3))};return(0,g.jsxs)(D,{sticky:!0,children:[(0,g.jsx)(`thead`,{children:(0,g.jsxs)(`tr`,{children:[(0,g.jsx)(`th`,{scope:`col`,children:(0,g.jsx)(m,{size:`small`,icon:`reset`,iconPosition:`left`,variant:`secondary`,onClick:()=>{clearTimeout(v),s(),o(),u(`asc`),_(new Date().getTime())},children:`Reset everything`})}),(0,g.jsx)(`th`,{scope:`col`,className:`dnb-table--sortable dnb-table--active ${l===`desc`?` dnb-table--reversed`:``}`,children:(0,g.jsx)(m,{variant:`tertiary`,icon:`arrow-down`,text:`Sortable`,title:`Sort table row`,onClick:()=>{o(),u(e=>e===`asc`?`desc`:`asc`)}})})]})}),(0,g.jsx)(`tbody`,{children:(0,g.jsx)(i,{mode:`infinity`,markerElement:`tr`,fallbackElement:({className:e,...t})=>(0,g.jsx)(O,{className:e,children:(0,g.jsx)(k,{colSpan:2,...t})}),currentPage:d,pageCount:n,...t,onStartup:y,onChange:y})})]})},E=({children:e=null,items:t,currentPage:n,perPageCount:r,onToggleExpanded:i,onMounted:a,endInfinity:o,...l})=>{let u=[];return a&&(0,h.useEffect)(()=>a&&a(u),[]),t=t.filter((e,t)=>{let i=(n-1)*r,a=i+r;return t>=i&&t<a}),t.length===0?(o(),null):t.map((t,r)=>{let a={onClick:e=>{if(!s()||/button/.test(document.activeElement.tagName)){let r=e.currentTarget;i(t,{pageNumber:n,onExpanded:()=>{try{r=r.nextElementSibling,A({element:r,expanded:!t.expanded}),r.focus()}catch{}}})}}},o={current:null};return u.push({...t,element:o}),(0,g.jsxs)(h.Fragment,{children:[(0,g.jsxs)(O,{...l,...a,className:`dnb-table--${r%2?`even`:`odd`} ${t.expanded?`expanded`:``}`,ref:o,children:[(0,g.jsx)(k,{children:(0,g.jsx)(m,{title:t.expanded?`Hide details`:`Show more details`,icon:`chevron_down`,size:`small`,right:`large`})}),(0,g.jsx)(k,{children:(0,g.jsxs)(c,{children:[t.text,` `,e]})})]}),(0,g.jsx)(O,{className:`expanded-content dnb-no-focus ${t.expanded?`expanded`:``}`,tabIndex:-1,children:(0,g.jsx)(k,{colSpan:2,children:t.expanded&&(0,g.jsx)(`div`,{className:`expanded-content__outer`,children:(0,g.jsxs)(`div`,{className:`expanded-content__inner`,children:[(0,g.jsx)(c,{children:`What ever content ...`}),(0,g.jsx)(m,{variant:`secondary`,top:!0,children:`🔥`})]})})})})]},t.ssn)})},D=d(i)`
  table-layout: fixed;
`,O=d.tr`
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
`,k=d.td`
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
`,A=({element:e,expanded:t=!1,animation:n=!0})=>{if(e&&typeof window<`u`&&window.requestAnimationFrame){/td/.test(e.nodeName)&&(e=e.parentElement);let r=t?window.getComputedStyle(e)[`max-height`]:e.scrollHeight;window.requestAnimationFrame(()=>{n&&(e.style.height=`1px`),window.requestAnimationFrame(()=>e.style.height=r)})}},j=(e,t)=>e.sort(({text:e},{text:n})=>{let r=parseFloat(e),i=parseFloat(n);return(t===`asc`?r>i:r<i)?1:-1}),M=d(f)`
  width: 100%;
  background: var(--color-white);
`;function N(e){let t={a:`a`,code:`code`,h2:`h2`,h3:`h3`,p:`p`,...u(),...e.components};return(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(t.h2,{children:`Demos`}),`
`,(0,g.jsx)(t.h3,{children:`Infinity scroller with load button`}),`
`,(0,g.jsxs)(t.p,{children:[`A load button is shown at the bottom by having `,(0,g.jsx)(t.code,{children:`useLoadButton={true}`}),` - but here we define our `,(0,g.jsx)(t.code,{children:`startupPage={5}`}),`, so we also get a load button on top.`]}),`
`,(0,g.jsx)(y,{}),`
`,(0,g.jsx)(t.h3,{children:`Infinity scroller with custom load indicator`}),`
`,(0,g.jsx)(b,{}),`
`,(0,g.jsxs)(t.h3,{children:[`Infinity scroller with unknown `,(0,g.jsx)(t.code,{children:`pageCount`})]}),`
`,(0,g.jsx)(x,{}),`
`,(0,g.jsx)(t.h3,{children:`Advanced Table infinity scroller`}),`
`,(0,g.jsxs)(t.p,{children:[`You can find the code either on `,(0,g.jsx)(t.a,{href:`https://github.com/dnbexperience/eufemia/tree/main/packages/dnb-design-system-portal/src/docs/uilib/components/pagination/Examples.tsx`,children:`GitHub`}),` or on `,(0,g.jsx)(t.a,{href:`https://codesandbox.io/s/eufemia-table-pagination-infinity-546f7`,children:`CodeSandbox`})]}),`
`,(0,g.jsx)(S,{})]})}function P(e={}){let{wrapper:t}={...u(),...e.components};return t?(0,g.jsx)(t,{...e,children:(0,g.jsx)(N,{...e})}):N(e)}export{P as default};