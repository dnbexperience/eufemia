import{a as e,r as t}from"./rolldown-runtime-BYbx6iT9.js";import{t as n}from"./jsx-runtime-BgMs7Gb-.js";import{t as r}from"./ComponentBox-a4aOn231.js";var i=t({CopyContent:()=>c,CopyCursorHidden:()=>s,CopyTextContent:()=>l,CustomTooltipMessage:()=>u,Default:()=>o,InsideDrawer:()=>d}),a=e(n()),o=()=>(0,a.jsx)(r,{"data-visual-test":`copy-on-click-default`,stableName:`Default`,children:`<P>
  <CopyOnClick>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi cursus
    pharetra elit in bibendum. Praesent nunc ipsum, convallis eget
    convallis gravida, vehicula vitae metus.
  </CopyOnClick>
</P>
`}),s=()=>(0,a.jsx)(r,{stableName:`CopyCursorHidden`,children:`<P>
  <CopyOnClick showCursor={false}>
    Praesent nunc ipsum, convallis eget convallis gravida, vehicula vitae
    metus.
  </CopyOnClick>
</P>
`}),c=()=>(0,a.jsx)(r,{stableName:`CopyContent`,children:`<P>
  <CopyOnClick copyContent="content to copy">
    content to display
  </CopyOnClick>
</P>
`}),l=()=>(0,a.jsx)(r,{stableName:`CopyTextContent`,children:`<P>
  <CopyOnClick>
    <NumberFormat.Currency value={1234567.89} currency="NOK" />
  </CopyOnClick>
</P>
`}),u=()=>(0,a.jsx)(r,{stableName:`CustomTooltipMessage`,children:`<P>
  <CopyOnClick tooltipContent="Custom message">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi cursus
    pharetra elit in bibendum. Praesent nunc ipsum, convallis eget
    convallis gravida, vehicula vitae metus.
  </CopyOnClick>
</P>
`}),d=()=>(0,a.jsx)(r,{"data-visual-test":`copy-on-click-inside-drawer`,stableName:`InsideDrawer`,children:`<Drawer open>
  <CopyOnClick>I'm inside the drawer</CopyOnClick>
</Drawer>
`});export{o as a,u as i,s as n,i as o,l as r,d as s,c as t};