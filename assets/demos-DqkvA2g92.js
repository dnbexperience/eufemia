import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{ot as n,st as r,t as i}from"./ComponentBox-geTEYZ7b.js";import{n as a,r as o,t as s}from"./Tr-BoYP63eF.js";import{Er as c,Ft as l,Gn as u,Rr as d,in as f,vr as p}from"./index-CMgyXmp3.js";var m=e({SkipContentInfo1:()=>v,SkipContentInfo2:()=>y,SkipContentTable:()=>g}),h=t(),g=()=>(0,h.jsx)(i,{hideCode:!0,scope:{LargeTableWithInteractiveElements:_},children:`
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

`}),_=e=>{let t=()=>(0,h.jsx)(f,{label:`Select row`,labelSrOnly:!0}),i=()=>(0,h.jsx)(u,{label:`Label`,labelSrOnly:!0,size:4}),d=({nr:e})=>(0,h.jsxs)(s,{children:[(0,h.jsx)(o,{children:(0,h.jsx)(t,{})}),(0,h.jsxs)(o,{children:[`Row `,e]}),(0,h.jsx)(o,{spacing:`horizontal`,children:(0,h.jsx)(i,{})}),(0,h.jsxs)(o,{align:`right`,children:[`Row `,e]}),(0,h.jsx)(o.AccordionContent,{children:(0,h.jsx)(c,{top:!0,innerSpace:{block:`large`},children:(0,h.jsxs)(p,{children:[(0,h.jsx)(n,{children:`Favorittfarge`}),(0,h.jsx)(r,{children:`Grønn`}),(0,h.jsx)(n,{children:`Favorittmat`}),(0,h.jsx)(r,{children:`Taco`})]})})})]}),m=[];for(let e=0;e<10;e++)m.push((0,h.jsx)(d,{nr:String(e+1)},e));return(0,h.jsx)(l.ScrollView,{top:!0,children:(0,h.jsxs)(l,{accordion:!0,border:!0,outline:!0,size:`medium`,...e,children:[(0,h.jsx)(`caption`,{className:`dnb-sr-only`,children:`A Table Caption`}),(0,h.jsx)(`thead`,{children:(0,h.jsxs)(s,{children:[(0,h.jsx)(a,{children:`Column A`}),(0,h.jsx)(a,{children:`Column B`}),(0,h.jsx)(a,{children:`Column C`}),(0,h.jsx)(a,{align:`right`,children:`Column D`})]})}),(0,h.jsx)(`tbody`,{children:m})]})})},v=()=>(0,h.jsx)(i,{hidePreview:!0,hideToolbar:!0,children:`
<section aria-labelledby="heading-id">
  <H2 id="heading-id">Description of table</H2>
   <SkipContent selector="#my-selector" text="Skip table content" />
   <Table aria-labelledby="heading-id">table content</Table>
</section>
<section id="my-selector" aria-label="Submit">
  <div id="submit-form" />
</section>

`}),y=()=>(0,h.jsx)(i,{hidePreview:!0,hideToolbar:!0,children:`<section aria-labelledby="table-id">
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
`});function b(e){let t={h2:`h2`,h3:`h3`,...d(),...e.components};return m||S(`Examples`,!1),g||S(`Examples.SkipContentTable`,!0),(0,h.jsxs)(h.Fragment,{children:[(0,h.jsx)(t.h2,{children:`Demos`}),`
`,(0,h.jsx)(t.h3,{children:`SkipContent with section`}),`
`,(0,h.jsx)(g,{})]})}function x(e={}){let{wrapper:t}={...d(),...e.components};return t?(0,h.jsx)(t,{...e,children:(0,h.jsx)(b,{...e})}):b(e)}function S(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{x as default,y as n,v as t};