import{a as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{t as r}from"./P-CbimSwQH.js";import{t as i}from"./NumberFormatExport-luMPqWqu.js";import{F as a,I as o}from"./index-DdG6L_K8.js";import{t as s}from"./ComponentBox-q_23Ylzi.js";var c=e({CopyContent:()=>f,CopyCursorHidden:()=>d,CopyTextContent:()=>p,CustomTooltipMessage:()=>m,Default:()=>u,InsideDrawer:()=>h}),l=t(n()),u=()=>(0,l.jsx)(s,{"data-visual-test":`copy-on-click-default`,stableName:`Default`,sourceImports:[`import { CopyOnClick, Drawer, NumberFormat, P } from '@dnb/eufemia'`],__buildScope:{P:r,CopyOnClick:o},children:`<P>
  <CopyOnClick>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi cursus
    pharetra elit in bibendum. Praesent nunc ipsum, convallis eget
    convallis gravida, vehicula vitae metus.
  </CopyOnClick>
</P>
`}),d=()=>(0,l.jsx)(s,{stableName:`CopyCursorHidden`,sourceImports:[`import { CopyOnClick, Drawer, NumberFormat, P } from '@dnb/eufemia'`],__buildScope:{P:r,CopyOnClick:o},children:`<P>
  <CopyOnClick showCursor={false}>
    Praesent nunc ipsum, convallis eget convallis gravida, vehicula vitae
    metus.
  </CopyOnClick>
</P>
`}),f=()=>(0,l.jsx)(s,{stableName:`CopyContent`,sourceImports:[`import { CopyOnClick, Drawer, NumberFormat, P } from '@dnb/eufemia'`],__buildScope:{P:r,CopyOnClick:o},children:`<P>
  <CopyOnClick copyContent="content to copy">
    content to display
  </CopyOnClick>
</P>
`}),p=()=>(0,l.jsx)(s,{stableName:`CopyTextContent`,sourceImports:[`import { CopyOnClick, Drawer, NumberFormat, P } from '@dnb/eufemia'`],__buildScope:{P:r,CopyOnClick:o,NumberFormat:i},children:`<P>
  <CopyOnClick>
    <NumberFormat.Currency value={1234567.89} currency="NOK" />
  </CopyOnClick>
</P>
`}),m=()=>(0,l.jsx)(s,{stableName:`CustomTooltipMessage`,sourceImports:[`import { CopyOnClick, Drawer, NumberFormat, P } from '@dnb/eufemia'`],__buildScope:{P:r,CopyOnClick:o},children:`<P>
  <CopyOnClick tooltipContent="Custom message">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi cursus
    pharetra elit in bibendum. Praesent nunc ipsum, convallis eget
    convallis gravida, vehicula vitae metus.
  </CopyOnClick>
</P>
`}),h=()=>(0,l.jsx)(s,{"data-visual-test":`copy-on-click-inside-drawer`,stableName:`InsideDrawer`,sourceImports:[`import { CopyOnClick, Drawer, NumberFormat, P } from '@dnb/eufemia'`],__buildScope:{Drawer:a,CopyOnClick:o},children:`<Drawer open>
  <CopyOnClick>I'm inside the drawer</CopyOnClick>
</Drawer>
`});export{u as a,m as i,d as n,c as o,p as r,h as s,f as t};