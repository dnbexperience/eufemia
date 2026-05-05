import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{t}from"./ComponentBox-geTEYZ7b.js";import{Rr as n}from"./index-CMgyXmp3.js";var r=e(),i=`What’s the best thing about Switzerland? I’m not sure, but the flag is a big plus. 🇨🇭`,a=()=>(0,r.jsx)(t,{"data-visual-test":`tooltip-hover`,children:`<Button tooltip="Button tooltip" text="Hover" />
`}),o=()=>(0,r.jsx)(t,{children:`<Button tooltip={<Tooltip open>Basic Tooltip</Tooltip>} text="Open" />
`}),s=()=>(0,r.jsx)(t,{children:`
<button className="target-1">Show the Tooltip</button>
<Tooltip id="unique" open targetSelector=".target-1">
  Tooltip linked
</Tooltip>

`}),c=()=>(0,r.jsx)(t,{"data-visual-test":`tooltip-large`,children:`
<Tooltip
  hideDelay={1e3}
  size="large"
  targetElement={<Span right>Top</Span>}
>
  Tooltip 1
</Tooltip>
<Tooltip placement="bottom" targetElement={<Span>Bottom</Span>}>
  Tooltip 2
</Tooltip>

`}),l=()=>(0,r.jsx)(t,{children:`<NumberFormat.Number tooltip="Tooltip">1234</NumberFormat.Number>
`}),u=()=>(0,r.jsx)(t,{children:`<Tooltip targetElement={<NumberFormat.Number>1234</NumberFormat.Number>}>
  Tooltip NumberFormat
</Tooltip>
`}),d=()=>(0,r.jsx)(t,{"data-visual-test":`tooltip-hover-button-long-text`,scope:{longText:i},children:'<Button tooltip={`${longText} ${longText}`} text="Long text" />\n'}),f=()=>(0,r.jsx)(t,{"data-visual-test":`tooltip-hover-align-arrow-left-long-text`,scope:{longText:i},children:`
<Button className="target-align-arrow-left-long-text">
  Align left & arrow left
</Button>
<Tooltip
  id="unique-align-arrow-left-long-text"
  targetSelector=".target-align-arrow-left-long-text"
  align="left"
  arrow="left"
>
  {longText}
</Tooltip>

`}),p=()=>(0,r.jsx)(t,{"data-visual-test":`tooltip-hover-align-arrow-right-long-text`,scope:{longText:i},children:`
<Button className="target-align-arrow-right-long-text">
  Align right & arrow right
</Button>
<Tooltip
  id="unique-align-arrow-right-long-text"
  targetSelector=".target-align-arrow-right-long-text"
  align="right"
  arrow="right"
>
  {longText}
</Tooltip>

`}),m=()=>(0,r.jsx)(t,{"data-visual-test":`tooltip-hover-align-left-arrow-right-long-text`,scope:{longText:i},children:`
<Button className="target-align-left-arrow-right-long-text">
  Align left & arrow right
</Button>
<Tooltip
  id="unique-align-left-arrow-right-long-text"
  targetSelector=".target-align-left-arrow-right-long-text"
  align="left"
  arrow="right"
>
  {longText}
</Tooltip>

`}),h=()=>(0,r.jsx)(t,{"data-visual-test":`tooltip-hover-align-right-arrow-left-long-text`,scope:{longText:i},children:`
<Button className="target-align-right-arrow-left-long-text">
  Align right & arrow left
</Button>
<Tooltip
  id="unique-align-right-arrow-left-long-text"
  targetSelector=".target-align-right-arrow-left-long-text"
  align="right"
  arrow="left"
>
  {longText}
</Tooltip>

`}),g=()=>(0,r.jsx)(t,{"data-visual-test":`tooltip-hover-align-left-long-text`,scope:{longText:i},children:`
<Button className="target-align-left-long-text">Align left</Button>
<Tooltip
  id="unique-align-left-long-text"
  targetSelector=".target-align-left-long-text"
  align="left"
>
  {longText}
</Tooltip>

`}),_=()=>(0,r.jsx)(t,{"data-visual-test":`tooltip-hover-align-right-long-text`,scope:{longText:i},children:`
<Button className="target-align-right-long-text">Align right</Button>
<Tooltip
  id="unique-align-right-long-text"
  targetSelector=".target-align-right-long-text"
  align="right"
>
  {longText}
</Tooltip>

`}),v=()=>(0,r.jsx)(t,{"data-visual-test":`tooltip-hover-align-center-long-text`,scope:{longText:i},children:`
<Button className="target-align-center-long-text">
  Align center & arrow center
</Button>
<Tooltip
  id="unique-align-center-long-text"
  targetSelector=".target-align-center-long-text"
  align="center"
  arrow="center"
>
  {longText}
</Tooltip>

`}),y=()=>(0,r.jsx)(t,{"data-visual-test":`tooltip-hover-arrow-left-long-text`,scope:{longText:i},children:`
<Button className="target-arrow-left-long-text">Arrow left</Button>
<Tooltip
  id="unique-arrow-left-long-text"
  targetSelector=".target-arrow-left-long-text"
  arrow="left"
>
  {longText}
</Tooltip>

`}),b=()=>(0,r.jsx)(t,{"data-visual-test":`tooltip-hover-arrow-right-long-text`,scope:{longText:i},children:`
<Button className="target-arrow-right-long-text">Arrow right</Button>
<Tooltip
  id="unique-arrow-right-long-text"
  targetSelector=".target-arrow-right-long-text"
  arrow="right"
>
  {longText}
</Tooltip>

`}),x=()=>(0,r.jsx)(t,{"data-visual-test":`tooltip-hover-position-right-long-text`,scope:{longText:i},children:`
<Button className="target-position-right-long-text">
  Position right
</Button>
<Tooltip
  id="unique-position-right-long-text"
  targetSelector=".target-position-right-long-text"
  placement="right"
>
  {longText}
</Tooltip>

`}),S=()=>(0,r.jsx)(t,{"data-visual-test":`tooltip-hover-position-left-long-text`,scope:{longText:i},children:`
<Button className="target-position-left-long-text">Position left</Button>
<Tooltip
  id="unique-position-left-long-text"
  targetSelector=".target-position-left-long-text"
  placement="left"
>
  {longText}
</Tooltip>

`}),C=()=>(0,r.jsx)(t,{"data-visual-test":`tooltip-hover-position-bottom-long-text`,scope:{longText:i},children:`
<Button className="target-position-bottom-long-text">
  Position bottom
</Button>
<Tooltip
  id="unique-position-bottom-long-text"
  targetSelector=".target-position-bottom-long-text"
  placement="bottom"
>
  {longText}
</Tooltip>

`}),w=()=>(0,r.jsx)(t,{"data-visual-test":`tooltip-hover-align-arrow-left`,children:`
<Button className="target-align-arrow-left">
  Align left & arrow left
</Button>
<Tooltip
  id="unique-align-arrow-left"
  targetSelector=".target-align-arrow-left"
  align="left"
  arrow="left"
>
  Align left & arrow left
</Tooltip>

`}),T=()=>(0,r.jsx)(t,{"data-visual-test":`tooltip-hover-align-arrow-right`,children:`
<Button className="target-align-arrow-right">
  Align right & arrow right
</Button>
<Tooltip
  id="unique-align-arrow-right"
  targetSelector=".target-align-arrow-right"
  align="right"
  arrow="right"
>
  Align right & arrow right
</Tooltip>

`}),E=()=>(0,r.jsx)(t,{"data-visual-test":`tooltip-hover-align-left-arrow-right`,children:`
<Button className="target-align-left-arrow-right">
  Align left & arrow right
</Button>
<Tooltip
  id="unique-align-left-arrow-right"
  targetSelector=".target-align-left-arrow-right"
  align="left"
  arrow="right"
>
  Align left & arrow right
</Tooltip>

`}),D=()=>(0,r.jsx)(t,{"data-visual-test":`tooltip-hover-align-right-arrow-left`,children:`
<Button className="target-align-right-arrow-left">
  Align right & arrow left
</Button>
<Tooltip
  id="unique-align-right-arrow-left"
  targetSelector=".target-align-right-arrow-left"
  align="right"
  arrow="left"
>
  Align right & arrow left
</Tooltip>

`}),O=()=>(0,r.jsx)(t,{"data-visual-test":`tooltip-hover-align-left`,children:`
<Button className="target-align-left">Align left</Button>
<Tooltip
  id="unique-align-left"
  targetSelector=".target-align-left"
  align="left"
>
  Align left
</Tooltip>

`}),k=()=>(0,r.jsx)(t,{"data-visual-test":`tooltip-hover-align-right`,children:`
<Button className="target-align-right">Align right</Button>
<Tooltip
  id="unique-align-right"
  targetSelector=".target-align-right"
  align="right"
>
  Align right
</Tooltip>

`}),A=()=>(0,r.jsx)(t,{"data-visual-test":`tooltip-hover-align-center`,children:`
<Button className="target-align-center">
  Align center & arrow center
</Button>
<Tooltip
  id="unique-align-center"
  targetSelector=".target-align-center"
  align="center"
  arrow="center"
>
  Align center & arrow center
</Tooltip>

`}),j=()=>(0,r.jsx)(t,{"data-visual-test":`tooltip-hover-arrow-left`,children:`
<Button className="target-arrow-left">Arrow left</Button>
<Tooltip
  id="unique-arrow-left"
  targetSelector=".target-arrow-left"
  arrow="left"
>
  Arrow left
</Tooltip>

`}),M=()=>(0,r.jsx)(t,{"data-visual-test":`tooltip-hover-arrow-right`,children:`
<Button className="target-arrow-right">Arrow right</Button>
<Tooltip
  id="unique-arrow-right"
  targetSelector=".target-arrow-right"
  arrow="right"
>
  Arrow right
</Tooltip>

`}),N=()=>(0,r.jsx)(t,{"data-visual-test":`tooltip-hover-position-right`,children:`
<Button className="target-position-right">Position right</Button>
<Tooltip
  id="unique-position-right"
  targetSelector=".target-position-right"
  placement="right"
>
  Position right
</Tooltip>

`}),P=()=>(0,r.jsx)(t,{"data-visual-test":`tooltip-hover-position-left`,children:`
<Button className="target-position-left">Position left</Button>
<Tooltip
  id="unique-position-left"
  targetSelector=".target-position-left"
  placement="left"
>
  Position left
</Tooltip>

`}),F=()=>(0,r.jsx)(t,{"data-visual-test":`tooltip-hover-position-bottom`,children:`
<Button className="target-position-bottom">Position bottom</Button>
<Tooltip
  id="unique-position-bottom"
  targetSelector=".target-position-bottom"
  placement="bottom"
>
  Position bottom
</Tooltip>

`});function I(e){let t={a:`a`,h2:`h2`,h3:`h3`,p:`p`,...n(),...e.components},{VisibleWhenNotVisualTest:i,VisibleWhenVisualTest:I}=t;return i||R(`VisibleWhenNotVisualTest`,!0),I||R(`VisibleWhenVisualTest`,!0),(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.h2,{children:`Demos`}),`
`,(0,r.jsx)(t.h3,{children:`Button with hover Tooltip`}),`
`,(0,r.jsx)(a,{}),`
`,(0,r.jsx)(t.h3,{children:`Button with open Tooltip`}),`
`,(0,r.jsx)(i,{children:(0,r.jsx)(o,{})}),`
`,(0,r.jsx)(t.h3,{children:`NumberFormat with a tooltip`}),`
`,(0,r.jsx)(l,{}),`
`,(0,r.jsxs)(t.p,{children:[`... or wrapped around the `,(0,r.jsx)(t.a,{href:`/uilib/components/number-format`,children:`NumberFormat`}),` component:`]}),`
`,(0,r.jsx)(u,{}),`
`,(0,r.jsx)(t.h3,{children:`Tooltip with delay`}),`
`,(0,r.jsx)(c,{}),`
`,(0,r.jsx)(t.h3,{children:`Tooltip linked to a vanilla button`}),`
`,(0,r.jsx)(i,{children:(0,r.jsx)(s,{})}),`
`,(0,r.jsxs)(I,{children:[(0,r.jsx)(d,{}),(0,r.jsx)(A,{}),(0,r.jsx)(v,{}),(0,r.jsx)(N,{}),(0,r.jsx)(x,{}),(0,r.jsx)(O,{}),(0,r.jsx)(g,{}),(0,r.jsx)(k,{}),(0,r.jsx)(_,{}),(0,r.jsx)(w,{}),(0,r.jsx)(f,{}),(0,r.jsx)(T,{}),(0,r.jsx)(p,{}),(0,r.jsx)(E,{}),(0,r.jsx)(m,{}),(0,r.jsx)(D,{}),(0,r.jsx)(h,{}),(0,r.jsx)(j,{}),(0,r.jsx)(y,{}),(0,r.jsx)(M,{}),(0,r.jsx)(b,{}),(0,r.jsx)(P,{}),(0,r.jsx)(S,{}),(0,r.jsx)(F,{}),(0,r.jsx)(C,{})]})]})}function L(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(I,{...e})}):I(e)}function R(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{L as default};