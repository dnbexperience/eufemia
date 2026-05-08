import{r as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{t as n}from"./ComponentBox-DPdYTeDv.js";var r=e({CopyContent:()=>s,CopyCursorHidden:()=>o,CopyTextContent:()=>c,CustomTooltipMessage:()=>l,Default:()=>a,InsideDrawer:()=>u}),i=t(),a=()=>(0,i.jsx)(n,{"data-visual-test":`copy-on-click-default`,children:`<P>
  <CopyOnClick>
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi cursus
    pharetra elit in bibendum. Praesent nunc ipsum, convallis eget
    convallis gravida, vehicula vitae metus.
  </CopyOnClick>
</P>
`}),o=()=>(0,i.jsx)(n,{children:`<P>
  <CopyOnClick showCursor={false}>
    Praesent nunc ipsum, convallis eget convallis gravida, vehicula vitae
    metus.
  </CopyOnClick>
</P>
`}),s=()=>(0,i.jsx)(n,{children:`<P>
  <CopyOnClick copyContent="content to copy">
    content to display
  </CopyOnClick>
</P>
`}),c=()=>(0,i.jsx)(n,{children:`<P>
  <CopyOnClick>
    <NumberFormat.Currency value={1234567.89} currency="NOK" />
  </CopyOnClick>
</P>
`}),l=()=>(0,i.jsx)(n,{children:`<P>
  <CopyOnClick tooltipContent="Custom message">
    Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi cursus
    pharetra elit in bibendum. Praesent nunc ipsum, convallis eget
    convallis gravida, vehicula vitae metus.
  </CopyOnClick>
</P>
`}),u=()=>(0,i.jsx)(n,{"data-visual-test":`copy-on-click-inside-drawer`,children:`<Drawer open>
  <CopyOnClick>I'm inside the drawer</CopyOnClick>
</Drawer>
`});export{a,l as i,o as n,r as o,c as r,u as s,s as t};