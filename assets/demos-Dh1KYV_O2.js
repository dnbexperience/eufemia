import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{t as n}from"./jsx-runtime-BgMs7Gb-.js";import{nt as r,rt as i,t as a}from"./ComponentBox-a4aOn231.js";import{n as o,r as s,t as c}from"./Tr-Ch5mnnm5.js";import{Bn as l,Mn as u,Rt as d,_r as f,on as p,zr as m}from"./index-DqqByKA2.js";var h=t({SkipContentInfo1:()=>y,SkipContentInfo2:()=>b,SkipContentTable:()=>_}),g=e(n()),_=()=>(0,g.jsx)(a,{hideCode:!0,scope:{LargeTableWithInteractiveElements:v},stableName:`SkipContentTable`,children:`
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

`}),v=e=>{let t=()=>(0,g.jsx)(p,{label:`Select row`,labelSrOnly:!0}),n=()=>(0,g.jsx)(f,{label:`Label`,labelSrOnly:!0,size:4}),a=({nr:e})=>(0,g.jsxs)(c,{children:[(0,g.jsx)(s,{children:(0,g.jsx)(t,{})}),(0,g.jsxs)(s,{children:[`Row `,e]}),(0,g.jsx)(s,{spacing:`horizontal`,children:(0,g.jsx)(n,{})}),(0,g.jsxs)(s,{align:`right`,children:[`Row `,e]}),(0,g.jsx)(s.AccordionContent,{children:(0,g.jsx)(l,{top:!0,innerSpace:{block:`large`},children:(0,g.jsxs)(u,{children:[(0,g.jsx)(r,{children:`Favorittfarge`}),(0,g.jsx)(i,{children:`Grønn`}),(0,g.jsx)(r,{children:`Favorittmat`}),(0,g.jsx)(i,{children:`Taco`})]})})})]}),m=[];for(let e=0;e<10;e++)m.push((0,g.jsx)(a,{nr:String(e+1)},e));return(0,g.jsx)(d.ScrollView,{top:!0,children:(0,g.jsxs)(d,{mode:`accordion`,border:!0,outline:!0,size:`medium`,...e,children:[(0,g.jsx)(`caption`,{className:`dnb-sr-only`,children:`A Table Caption`}),(0,g.jsx)(`thead`,{children:(0,g.jsxs)(c,{children:[(0,g.jsx)(o,{children:`Column A`}),(0,g.jsx)(o,{children:`Column B`}),(0,g.jsx)(o,{children:`Column C`}),(0,g.jsx)(o,{align:`right`,children:`Column D`})]})}),(0,g.jsx)(`tbody`,{children:m})]})})},y=()=>(0,g.jsx)(a,{hidePreview:!0,hideToolbar:!0,stableName:`SkipContentInfo1`,children:`
<section aria-labelledby="heading-id">
  <H2 id="heading-id">Description of table</H2>
   <SkipContent selector="#my-selector" text="Skip table content" />
   <Table aria-labelledby="heading-id">table content</Table>
</section>
<section id="my-selector" aria-label="Submit">
  <div id="submit-form" />
</section>

`}),b=()=>(0,g.jsx)(a,{hidePreview:!0,hideToolbar:!0,stableName:`SkipContentInfo2`,children:`<section aria-labelledby="table-id">
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
`});function x(e){let t={h2:`h2`,h3:`h3`,...m(),...e.components};return h||C(`Examples`,!1),_||C(`Examples.SkipContentTable`,!0),(0,g.jsxs)(g.Fragment,{children:[(0,g.jsx)(t.h2,{children:`Demos`}),`
`,(0,g.jsx)(t.h3,{children:`SkipContent with section`}),`
`,(0,g.jsx)(_,{})]})}function S(e={}){let{wrapper:t}={...m(),...e.components};return t?(0,g.jsx)(t,{...e,children:(0,g.jsx)(x,{...e})}):x(e)}function C(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{S as default,b as n,y as t};