import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{t as n}from"./jsx-runtime-BgMs7Gb-.js";import{t as r}from"./NumberFormatExport-BhhaFuUE.js";import{In as i,an as a,nn as o}from"./index-mmuoVhax.js";import{t as s}from"./ComponentBox-XDAvsf_r.js";var c=t({CopyContent:()=>f,CopyCursorHidden:()=>d,CopyTextContent:()=>p,CustomTooltipMessage:()=>m,Default:()=>u,InsideDrawer:()=>h}),l=e(n()),u=()=>(0,l.jsx)(s,{"data-visual-test":`copy-on-click-default`,stableName:`Default`,sourceImports:[`import { CopyOnClick, Drawer, NumberFormat, P } from '@dnb/eufemia'`],__buildScope:{P:i,CopyOnClick:a},children:`<P>
  <CopyOnClick>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi cursus
    pharetra elit in bibendum. Praesent nunc ipsum, convallis eget
    convallis gravida, vehicula vitae metus.
  </CopyOnClick>
</P>
`}),d=()=>(0,l.jsx)(s,{stableName:`CopyCursorHidden`,sourceImports:[`import { CopyOnClick, Drawer, NumberFormat, P } from '@dnb/eufemia'`],__buildScope:{P:i,CopyOnClick:a},children:`<P>
  <CopyOnClick showCursor={false}>
    Praesent nunc ipsum, convallis eget convallis gravida, vehicula vitae
    metus.
  </CopyOnClick>
</P>
`}),f=()=>(0,l.jsx)(s,{stableName:`CopyContent`,sourceImports:[`import { CopyOnClick, Drawer, NumberFormat, P } from '@dnb/eufemia'`],__buildScope:{P:i,CopyOnClick:a},children:`<P>
  <CopyOnClick copyContent="content to copy">
    content to display
  </CopyOnClick>
</P>
`}),p=()=>(0,l.jsx)(s,{stableName:`CopyTextContent`,sourceImports:[`import { CopyOnClick, Drawer, NumberFormat, P } from '@dnb/eufemia'`],__buildScope:{P:i,CopyOnClick:a,NumberFormat:r},children:`<P>
  <CopyOnClick>
    <NumberFormat.Currency value={1234567.89} currency="NOK" />
  </CopyOnClick>
</P>
`}),m=()=>(0,l.jsx)(s,{stableName:`CustomTooltipMessage`,sourceImports:[`import { CopyOnClick, Drawer, NumberFormat, P } from '@dnb/eufemia'`],__buildScope:{P:i,CopyOnClick:a},children:`<P>
  <CopyOnClick tooltipContent="Custom message">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi cursus
    pharetra elit in bibendum. Praesent nunc ipsum, convallis eget
    convallis gravida, vehicula vitae metus.
  </CopyOnClick>
</P>
`}),h=()=>(0,l.jsx)(s,{"data-visual-test":`copy-on-click-inside-drawer`,stableName:`InsideDrawer`,sourceImports:[`import { CopyOnClick, Drawer, NumberFormat, P } from '@dnb/eufemia'`],__buildScope:{Drawer:o,CopyOnClick:a},children:`<Drawer open>
  <CopyOnClick>I'm inside the drawer</CopyOnClick>
</Drawer>
`});export{u as a,m as i,d as n,c as o,p as r,h as s,f as t};