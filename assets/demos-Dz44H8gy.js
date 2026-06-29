import{a as e,n as t,s as n,t as r}from"./jsx-runtime-DnlWeMvz.js";import{X as i,s as a}from"./SpacingUtils-Bo00Pdpx.js";import{t as o}from"./withComponentMarkers-ClZmq6eb.js";import{o as s}from"./ToggleButton-DfKpi57X.js";import{Ft as c,It as l,Pt as u}from"./forms-D54jfDKN.js";import{u as d}from"./FormStatus-82f84R4x.js";import{t as f}from"./Button-kSqfAUVR.js";import{F as p}from"./Autocomplete-eAFtuLbJ.js";import{t as m}from"./Table-DeLWJx8P.js";import{t as h}from"./H2-DASO3mku.js";import{t as g}from"./H4-ClUfpVC4.js";import{n as _,r as v,t as y}from"./Tr-BjVuDYhf.js";import{t as b}from"./Section-_oyssAWe.js";import{U as x}from"./index-BsJ3GLEw.js";import{t as S}from"./ComponentBox-sLMgHvLi.js";var C=n(t()),w=n(r()),T=e=>{let{selector:t,text:n,children:r,className:o,focusDelay:s=400,...c}=e;(0,C.useEffect)(()=>()=>{clearTimeout(g.current)},[]);let[l,u]=(0,C.useState)(!1),[p,m]=(0,C.useState)(!1),h=(0,C.useRef)(void 0),g=(0,C.useRef)(void 0),_=a(`dnb-skip-content`,l&&`dnb-skip-content--visible`,p&&`dnb-skip-content__return--active`,o),v=t.replace(/^(\.|#)/,``),y=`${v}--alias`,b=(0,C.useCallback)(()=>{u(!1)},[]),x=(0,C.useCallback)(()=>{u(!1);let e=document.querySelector(t);e?.scrollIntoView?.({behavior:`smooth`}),e?.classList.add(`dnb-skip-content__focus`),g.current=setTimeout(()=>{i(t),document.querySelector(`#${v}--alias--alias`)?.classList.add(`dnb-skip-content__return--active`)},s)},[t,s]),S=(0,C.useCallback)(()=>{u(!0),window.requestAnimationFrame(()=>{(h.current?.querySelector(`.dnb-button`))?.focus()}),h.current?.getAttribute(`class`).includes(`__return--active`)&&m(!0)},[]),T=(0,C.useCallback)(e=>{e.target.tagName===`SPAN`&&S()},[S]),E=(0,C.useCallback)(e=>{e.key===`Tab`&&S()},[S]);return(0,w.jsx)(`span`,{className:_,ref:h,onFocus:T,id:y,children:(0,w.jsxs)(w.Fragment,{children:[!l&&(0,w.jsx)(`button`,{className:`dnb-sr-only`,type:`button`,onKeyUp:E,children:n||r}),(0,w.jsx)(d,{open:l,"aria-live":`polite`,children:(0,w.jsx)(f,{wrap:!0,variant:`secondary`,onClick:x,onBlur:b,...c,children:n||r})})]})})};T.Return=e=>{let{selector:t,className:n,...r}=e,i=a(`dnb-skip-content__return`,n);return(0,w.jsx)(T,{selector:`${t}--alias`,className:i,...r})},o(T,{_supportsSpacingProps:!0});var E=e({SkipContentInfo1:()=>k,SkipContentInfo2:()=>A,SkipContentTable:()=>D}),D=()=>(0,w.jsx)(S,{hideCode:!0,scope:{LargeTableWithInteractiveElements:O},stableName:`SkipContentTable`,sourceImports:[`import { SkipContent, Button, Table, Td, Tr, Th, Checkbox, Input, Section, H4, Dl, Dd, Dt, H2 } from '@dnb/eufemia'`],__buildScope:{H4:g,SkipContent:T,Section:b,Button:f},children:`
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

`}),O=e=>{let t=()=>(0,w.jsx)(s,{label:`Select row`,labelSrOnly:!0}),n=()=>(0,w.jsx)(p,{label:`Label`,labelSrOnly:!0,size:4}),r=({nr:e})=>(0,w.jsxs)(y,{children:[(0,w.jsx)(v,{children:(0,w.jsx)(t,{})}),(0,w.jsxs)(v,{children:[`Row `,e]}),(0,w.jsx)(v,{spacing:`horizontal`,children:(0,w.jsx)(n,{})}),(0,w.jsxs)(v,{align:`right`,children:[`Row `,e]}),(0,w.jsx)(v.AccordionContent,{children:(0,w.jsx)(b,{top:!0,innerSpace:{block:`large`},children:(0,w.jsxs)(c,{children:[(0,w.jsx)(u,{children:`Favorittfarge`}),(0,w.jsx)(l,{children:`Grønn`}),(0,w.jsx)(u,{children:`Favorittmat`}),(0,w.jsx)(l,{children:`Taco`})]})})})]}),i=[];for(let e=0;e<10;e++)i.push((0,w.jsx)(r,{nr:String(e+1)},e));return(0,w.jsx)(m.ScrollView,{top:!0,children:(0,w.jsxs)(m,{mode:`accordion`,border:!0,outline:!0,size:`medium`,...e,children:[(0,w.jsx)(`caption`,{className:`dnb-sr-only`,children:`A Table Caption`}),(0,w.jsx)(`thead`,{children:(0,w.jsxs)(y,{children:[(0,w.jsx)(_,{children:`Column A`}),(0,w.jsx)(_,{children:`Column B`}),(0,w.jsx)(_,{children:`Column C`}),(0,w.jsx)(_,{align:`right`,children:`Column D`})]})}),(0,w.jsx)(`tbody`,{children:i})]})})},k=()=>(0,w.jsx)(S,{hidePreview:!0,hideToolbar:!0,stableName:`SkipContentInfo1`,sourceImports:[`import { SkipContent, Button, Table, Td, Tr, Th, Checkbox, Input, Section, H4, Dl, Dd, Dt, H2 } from '@dnb/eufemia'`],__buildScope:{H2:h,SkipContent:T,Table:m},children:`
<section aria-labelledby="heading-id">
  <H2 id="heading-id">Description of table</H2>
   <SkipContent selector="#my-selector" text="Skip table content" />
   <Table aria-labelledby="heading-id">table content</Table>
</section>
<section id="my-selector" aria-label="Submit">
  <div id="submit-form" />
</section>

`}),A=()=>(0,w.jsx)(S,{hidePreview:!0,hideToolbar:!0,stableName:`SkipContentInfo2`,sourceImports:[`import { SkipContent, Button, Table, Td, Tr, Th, Checkbox, Input, Section, H4, Dl, Dd, Dt, H2 } from '@dnb/eufemia'`],__buildScope:{SkipContent:T,Table:m},children:`<section aria-labelledby="table-id">
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
`});function j(e){let t={h2:`h2`,h3:`h3`,...x(),...e.components};return E||N(`Examples`,!1),D||N(`Examples.SkipContentTable`,!0),(0,w.jsxs)(w.Fragment,{children:[(0,w.jsx)(t.h2,{children:`Demos`}),`
`,(0,w.jsx)(t.h3,{children:`SkipContent with section`}),`
`,(0,w.jsx)(D,{})]})}function M(e={}){let{wrapper:t}={...x(),...e.components};return t?(0,w.jsx)(t,{...e,children:(0,w.jsx)(j,{...e})}):j(e)}function N(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{M as default,A as n,k as t};