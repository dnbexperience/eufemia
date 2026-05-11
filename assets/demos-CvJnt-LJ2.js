import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{t}from"./ComponentBox-xW2kV1s2.js";import{Lr as n}from"./index-DVm0MbGb.js";var r=e(),i=()=>(0,r.jsx)(t,{background:`plain`,hideCode:!0,"data-visual-test":`hr-default`,children:`<P>
  Before
  <Hr
    space={{
      top: '0.5rem',
      bottom: '0.5rem',
    }}
  />
  After
</P>
`}),a=()=>(0,r.jsx)(t,{background:`plain`,hideCode:!0,"data-visual-test":`hr-breakout`,children:`<P>
  Before
  <Hr
    breakout
    space={{
      top: '0.5rem',
      bottom: '0.5rem',
    }}
  />
  After
</P>
`}),o=()=>(0,r.jsx)(t,{background:`plain`,hideCode:!0,"data-visual-test":`hr-dashed`,children:`<P>
  Before
  <Hr
    dashed
    space={{
      top: '0.5rem',
      bottom: '0.5rem',
    }}
  />
  After
</P>
`});function s(e){let t={h2:`h2`,h3:`h3`,...n(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.h2,{children:`Demos`}),`
`,(0,r.jsx)(t.h3,{children:`Horizontal Rule default`}),`
`,(0,r.jsx)(i,{}),`
`,(0,r.jsx)(t.h3,{children:`Horizontal Rule dashed`}),`
`,(0,r.jsx)(o,{}),`
`,(0,r.jsx)(t.h3,{children:`Horizontal Rule in fullscreen`}),`
`,(0,r.jsx)(a,{})]})}function c(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(s,{...e})}):s(e)}export{c as default};