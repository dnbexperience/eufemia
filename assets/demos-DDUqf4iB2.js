import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{n,t as r}from"./jsx-runtime-BgMs7Gb-.js";import{n as i,t as a}from"./Dt-FqnacRx_.js";import{t as o}from"./H2-DdnHe8Vl.js";import{t as s}from"./H4-DAjTECx1.js";import{n as c,r as l,t as u}from"./Tr-Bab2LFw_.js";import{Bn as d,Da as f,Gi as p,Ir as m,Nn as h,Rr as g,Rt as _,Zi as v,gr as y,sn as b,wr as x}from"./index-mmuoVhax.js";import{t as S}from"./ComponentBox-XDAvsf_r.js";var C=e(n()),w=e(r()),T=e=>{let{selector:t,text:n,children:r,className:i,focusDelay:a=400,...o}=e;(0,C.useEffect)(()=>()=>{clearTimeout(p.current)},[]);let[s,c]=(0,C.useState)(!1),[l,u]=(0,C.useState)(!1),d=(0,C.useRef)(void 0),p=(0,C.useRef)(void 0),h=v(`dnb-skip-content`,s&&`dnb-skip-content--visible`,l&&`dnb-skip-content__return--active`,i),g=t.replace(/^(\.|#)/,``),_=`${g}--alias`,y=(0,C.useCallback)(()=>{c(!1)},[]),b=(0,C.useCallback)(()=>{c(!1);let e=document.querySelector(t);e?.scrollIntoView?.({behavior:`smooth`}),e?.classList.add(`dnb-skip-content__focus`),p.current=setTimeout(()=>{f(t),document.querySelector(`#${g}--alias--alias`)?.classList.add(`dnb-skip-content__return--active`)},a)},[t,a]),S=(0,C.useCallback)(()=>{c(!0),window.requestAnimationFrame(()=>{(d.current?.querySelector(`.dnb-button`))?.focus()}),d.current?.getAttribute(`class`).includes(`__return--active`)&&u(!0)},[]),T=(0,C.useCallback)(e=>{e.target.tagName===`SPAN`&&S()},[S]),E=(0,C.useCallback)(e=>{e.key===`Tab`&&S()},[S]);return(0,w.jsx)(`span`,{className:h,ref:d,onFocus:T,id:_,children:(0,w.jsxs)(w.Fragment,{children:[!s&&(0,w.jsx)(`button`,{className:`dnb-sr-only`,onKeyUp:E,children:n||r}),(0,w.jsx)(m,{open:s,"aria-live":`polite`,children:(0,w.jsx)(x,{wrap:!0,variant:`secondary`,onClick:b,onBlur:y,...o,children:n||r})})]})})};T.Return=e=>{let{selector:t,className:n,...r}=e,i=v(`dnb-skip-content__return`,n);return(0,w.jsx)(T,{selector:`${t}--alias`,className:i,...r})},p(T,{_supportsSpacingProps:!0});var E=t({SkipContentInfo1:()=>k,SkipContentInfo2:()=>A,SkipContentTable:()=>D}),D=()=>(0,w.jsx)(S,{hideCode:!0,scope:{LargeTableWithInteractiveElements:O},stableName:`SkipContentTable`,sourceImports:[`import { SkipContent, Button, Table, Td, Tr, Th, Checkbox, Input, Section, H4, Dl, Dd, Dt, H2 } from '@dnb/eufemia'`],__buildScope:{H4:s,SkipContent:T,Section:d,Button:x},children:`
<section aria-labelledby="table-with-caption heading">
  <H4 id="heading" space={0}>
    This table has many focusable elements
  </H4>
   <SkipContent selector="#submit-area" text="Skip table content" top />
   <LargeTableWithInteractiveElements id="table-with-caption" />
</section>
<Section
  id="submit-area"
  innerSpace={{
    block: 'small',
  }}
  variant="divider"
  top
>
  <SkipContent.Return selector="#submit-area" bottom>
    Back to beginning of table
  </SkipContent.Return>
   <Button>Submit</Button>
</Section>

`}),O=e=>{let t=()=>(0,w.jsx)(b,{label:`Select row`,labelSrOnly:!0}),n=()=>(0,w.jsx)(y,{label:`Label`,labelSrOnly:!0,size:4}),r=({nr:e})=>(0,w.jsxs)(u,{children:[(0,w.jsx)(l,{children:(0,w.jsx)(t,{})}),(0,w.jsxs)(l,{children:[`Row `,e]}),(0,w.jsx)(l,{spacing:`horizontal`,children:(0,w.jsx)(n,{})}),(0,w.jsxs)(l,{align:`right`,children:[`Row `,e]}),(0,w.jsx)(l.AccordionContent,{children:(0,w.jsx)(d,{top:!0,innerSpace:{block:`large`},children:(0,w.jsxs)(h,{children:[(0,w.jsx)(a,{children:`Favorittfarge`}),(0,w.jsx)(i,{children:`Grønn`}),(0,w.jsx)(a,{children:`Favorittmat`}),(0,w.jsx)(i,{children:`Taco`})]})})})]}),o=[];for(let e=0;e<10;e++)o.push((0,w.jsx)(r,{nr:String(e+1)},e));return(0,w.jsx)(_.ScrollView,{top:!0,children:(0,w.jsxs)(_,{mode:`accordion`,border:!0,outline:!0,size:`medium`,...e,children:[(0,w.jsx)(`caption`,{className:`dnb-sr-only`,children:`A Table Caption`}),(0,w.jsx)(`thead`,{children:(0,w.jsxs)(u,{children:[(0,w.jsx)(c,{children:`Column A`}),(0,w.jsx)(c,{children:`Column B`}),(0,w.jsx)(c,{children:`Column C`}),(0,w.jsx)(c,{align:`right`,children:`Column D`})]})}),(0,w.jsx)(`tbody`,{children:o})]})})},k=()=>(0,w.jsx)(S,{hidePreview:!0,hideToolbar:!0,stableName:`SkipContentInfo1`,sourceImports:[`import { SkipContent, Button, Table, Td, Tr, Th, Checkbox, Input, Section, H4, Dl, Dd, Dt, H2 } from '@dnb/eufemia'`],__buildScope:{H2:o,SkipContent:T,Table:_},children:`
<section aria-labelledby="heading-id">
  <H2 id="heading-id">Description of table</H2>
   <SkipContent selector="#my-selector" text="Skip table content" />
   <Table aria-labelledby="heading-id">table content</Table>
</section>
<section id="my-selector" aria-label="Submit">
  <div id="submit-form" />
</section>

`}),A=()=>(0,w.jsx)(S,{hidePreview:!0,hideToolbar:!0,stableName:`SkipContentInfo2`,sourceImports:[`import { SkipContent, Button, Table, Td, Tr, Th, Checkbox, Input, Section, H4, Dl, Dd, Dt, H2 } from '@dnb/eufemia'`],__buildScope:{SkipContent:T,Table:_},children:`<section aria-labelledby="table-id">
  <SkipContent selector=".my-selector">Skip table content</SkipContent>

  <Table id="table-id">
    <caption>Description of table</caption>
  </Table>

  <div className="my-selector">
    <SkipContent.Return
      selector=".my-selector" // same as SkipContent
      text="Back to beginning of table"
    />

    <div id="submit-form" />
  </div>
</section>
`});function j(e){let t={h2:`h2`,h3:`h3`,...g(),...e.components};return E||N(`Examples`,!1),D||N(`Examples.SkipContentTable`,!0),(0,w.jsxs)(w.Fragment,{children:[(0,w.jsx)(t.h2,{children:`Demos`}),`
`,(0,w.jsx)(t.h3,{children:`SkipContent with section`}),`
`,(0,w.jsx)(D,{})]})}function M(e={}){let{wrapper:t}={...g(),...e.components};return t?(0,w.jsx)(t,{...e,children:(0,w.jsx)(j,{...e})}):j(e)}function N(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{M as default,A as n,k as t};