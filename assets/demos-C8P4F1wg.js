import{a as e,n as t,s as n,t as r}from"./jsx-runtime-DnlWeMvz.js";import{Y as i,s as a}from"./SpacingUtils-Bm89tB4W.js";import{t as o}from"./withComponentMarkers-MtpU7Mly.js";import{u as s}from"./FormStatus-CFSqGC3x.js";import{t as c}from"./Button-DwQUlfj-.js";import{M as l}from"./Autocomplete-Bbkxjf2i.js";import{n as u,t as d}from"./Dt-7t1Tggru.js";import{t as f}from"./H2-Dw1W-git.js";import{t as p}from"./H4-CrhL04WO.js";import{n as m,r as h,t as g}from"./Tr-BKjgVrf0.js";import{t as _}from"./Section-BtXmNREe.js";import{s as v}from"./ToggleButton-_NsXxiTa.js";import{K as y,V as b,v as x}from"./index-ppRu2ktv.js";import{t as S}from"./ComponentBox-R2c6Bo76.js";var C=n(t()),w=n(r()),T=e=>{let{selector:t,text:n,children:r,className:o,focusDelay:l=400,...u}=e;(0,C.useEffect)(()=>()=>{clearTimeout(g.current)},[]);let[d,f]=(0,C.useState)(!1),[p,m]=(0,C.useState)(!1),h=(0,C.useRef)(void 0),g=(0,C.useRef)(void 0),_=a(`dnb-skip-content`,d&&`dnb-skip-content--visible`,p&&`dnb-skip-content__return--active`,o),v=t.replace(/^(\.|#)/,``),y=`${v}--alias`,b=(0,C.useCallback)(()=>{f(!1)},[]),x=(0,C.useCallback)(()=>{f(!1);let e=document.querySelector(t);e?.scrollIntoView?.({behavior:`smooth`}),e?.classList.add(`dnb-skip-content__focus`),g.current=setTimeout(()=>{i(t),document.querySelector(`#${v}--alias--alias`)?.classList.add(`dnb-skip-content__return--active`)},l)},[t,l]),S=(0,C.useCallback)(()=>{f(!0),window.requestAnimationFrame(()=>{(h.current?.querySelector(`.dnb-button`))?.focus()}),h.current?.getAttribute(`class`).includes(`__return--active`)&&m(!0)},[]),T=(0,C.useCallback)(e=>{e.target.tagName===`SPAN`&&S()},[S]),E=(0,C.useCallback)(e=>{e.key===`Tab`&&S()},[S]);return(0,w.jsx)(`span`,{className:_,ref:h,onFocus:T,id:y,children:(0,w.jsxs)(w.Fragment,{children:[!d&&(0,w.jsx)(`button`,{className:`dnb-sr-only`,type:`button`,onKeyUp:E,children:n||r}),(0,w.jsx)(s,{open:d,"aria-live":`polite`,children:(0,w.jsx)(c,{wrap:!0,variant:`secondary`,onClick:x,onBlur:b,...u,children:n||r})})]})})};T.Return=e=>{let{selector:t,className:n,...r}=e,i=a(`dnb-skip-content__return`,n);return(0,w.jsx)(T,{selector:`${t}--alias`,className:i,...r})},o(T,{_supportsSpacingProps:!0});var E=e({SkipContentInfo1:()=>k,SkipContentInfo2:()=>A,SkipContentTable:()=>D}),D=()=>(0,w.jsx)(S,{hideCode:!0,scope:{LargeTableWithInteractiveElements:O},stableName:`SkipContentTable`,sourceImports:[`import { SkipContent, Button, Table, Td, Tr, Th, Checkbox, Input, Section, H4, Dl, Dd, Dt, H2 } from '@dnb/eufemia'`],__buildScope:{H4:p,SkipContent:T,Section:_,Button:c},children:`
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

`}),O=e=>{let t=()=>(0,w.jsx)(v,{label:`Select row`,labelSrOnly:!0}),n=()=>(0,w.jsx)(l,{label:`Label`,labelSrOnly:!0,size:4}),r=({nr:e})=>(0,w.jsxs)(g,{children:[(0,w.jsx)(h,{children:(0,w.jsx)(t,{})}),(0,w.jsxs)(h,{children:[`Row `,e]}),(0,w.jsx)(h,{spacing:`horizontal`,children:(0,w.jsx)(n,{})}),(0,w.jsxs)(h,{align:`right`,children:[`Row `,e]}),(0,w.jsx)(h.AccordionContent,{children:(0,w.jsx)(_,{top:!0,innerSpace:{block:`large`},children:(0,w.jsxs)(b,{children:[(0,w.jsx)(d,{children:`Favorittfarge`}),(0,w.jsx)(u,{children:`Grønn`}),(0,w.jsx)(d,{children:`Favorittmat`}),(0,w.jsx)(u,{children:`Taco`})]})})})]}),i=[];for(let e=0;e<10;e++)i.push((0,w.jsx)(r,{nr:String(e+1)},e));return(0,w.jsx)(x.ScrollView,{top:!0,children:(0,w.jsxs)(x,{mode:`accordion`,border:!0,outline:!0,size:`medium`,...e,children:[(0,w.jsx)(`caption`,{className:`dnb-sr-only`,children:`A Table Caption`}),(0,w.jsx)(`thead`,{children:(0,w.jsxs)(g,{children:[(0,w.jsx)(m,{children:`Column A`}),(0,w.jsx)(m,{children:`Column B`}),(0,w.jsx)(m,{children:`Column C`}),(0,w.jsx)(m,{align:`right`,children:`Column D`})]})}),(0,w.jsx)(`tbody`,{children:i})]})})},k=()=>(0,w.jsx)(S,{hidePreview:!0,hideToolbar:!0,stableName:`SkipContentInfo1`,sourceImports:[`import { SkipContent, Button, Table, Td, Tr, Th, Checkbox, Input, Section, H4, Dl, Dd, Dt, H2 } from '@dnb/eufemia'`],__buildScope:{H2:f,SkipContent:T,Table:x},children:`
<section aria-labelledby="heading-id">
  <H2 id="heading-id">Description of table</H2>
   <SkipContent selector="#my-selector" text="Skip table content" />
   <Table aria-labelledby="heading-id">table content</Table>
</section>
<section id="my-selector" aria-label="Submit">
  <div id="submit-form" />
</section>

`}),A=()=>(0,w.jsx)(S,{hidePreview:!0,hideToolbar:!0,stableName:`SkipContentInfo2`,sourceImports:[`import { SkipContent, Button, Table, Td, Tr, Th, Checkbox, Input, Section, H4, Dl, Dd, Dt, H2 } from '@dnb/eufemia'`],__buildScope:{SkipContent:T,Table:x},children:`<section aria-labelledby="table-id">
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
`});function j(e){let t={h2:`h2`,h3:`h3`,...y(),...e.components};return E||N(`Examples`,!1),D||N(`Examples.SkipContentTable`,!0),(0,w.jsxs)(w.Fragment,{children:[(0,w.jsx)(t.h2,{children:`Demos`}),`
`,(0,w.jsx)(t.h3,{children:`SkipContent with section`}),`
`,(0,w.jsx)(D,{})]})}function M(e={}){let{wrapper:t}={...y(),...e.components};return t?(0,w.jsx)(t,{...e,children:(0,w.jsx)(j,{...e})}):j(e)}function N(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{M as default,A as n,k as t};