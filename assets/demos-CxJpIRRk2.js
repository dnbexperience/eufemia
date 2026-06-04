import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{o as n}from"./Anchor-VfvEVqst.js";import{t as r}from"./Button-CMFzxkr4.js";import{t as i}from"./Span-BXAZEs8c.js";import{t as a}from"./NumberFormatExport-BZdemG6C.js";import{W as o}from"./index-D7e1avVt.js";import{t as s}from"./ComponentBox-CE7bpcJy.js";var c=e(t()),l=`What’s the best thing about Switzerland? I’m not sure, but the flag is a big plus. 🇨🇭`,u=()=>(0,c.jsx)(s,{"data-visual-test":`tooltip-hover`,stableName:`TooltipExampleDefault`,sourceImports:[`import { Button, Tooltip, Span, NumberFormat } from '@dnb/eufemia'`],__buildScope:{Button:r},children:`<Button tooltip="Button tooltip" text="Hover" />
`}),d=()=>(0,c.jsx)(s,{stableName:`TooltipExampleOpen`,sourceImports:[`import { Button, Tooltip, Span, NumberFormat } from '@dnb/eufemia'`],__buildScope:{Button:r,Tooltip:n},children:`<Button tooltip={<Tooltip open>Basic Tooltip</Tooltip>} text="Open" />
`}),f=()=>(0,c.jsx)(s,{stableName:`TooltipExampleLinked`,sourceImports:[`import { Button, Tooltip, Span, NumberFormat } from '@dnb/eufemia'`],__buildScope:{Tooltip:n},children:`
<button className="target-1">Show the Tooltip</button>
<Tooltip id="unique" open targetSelector=".target-1">
  Tooltip linked
</Tooltip>

`}),p=()=>(0,c.jsx)(s,{"data-visual-test":`tooltip-large`,stableName:`TooltipExampleDelay`,sourceImports:[`import { Button, Tooltip, Span, NumberFormat } from '@dnb/eufemia'`],__buildScope:{Tooltip:n,Span:i},children:`
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

`}),m=()=>(0,c.jsx)(s,{stableName:`TooltipExampleNumberFormat`,sourceImports:[`import { Button, Tooltip, Span, NumberFormat } from '@dnb/eufemia'`],__buildScope:{NumberFormat:a},children:`<NumberFormat.Number tooltip="Tooltip">1234</NumberFormat.Number>
`}),h=()=>(0,c.jsx)(s,{stableName:`TooltipExampleNumberFormatWrapped`,sourceImports:[`import { Button, Tooltip, Span, NumberFormat } from '@dnb/eufemia'`],__buildScope:{Tooltip:n,NumberFormat:a},children:`<Tooltip targetElement={<NumberFormat.Number>1234</NumberFormat.Number>}>
  Tooltip NumberFormat
</Tooltip>
`}),g=()=>(0,c.jsx)(s,{"data-visual-test":`tooltip-hover-button-long-text`,scope:{longText:l},stableName:`TooltipExampleButtonLongText`,sourceImports:[`import { Button, Tooltip, Span, NumberFormat } from '@dnb/eufemia'`],__buildScope:{Button:r},children:'<Button tooltip={`${longText} ${longText}`} text="Long text" />\n'}),_=()=>(0,c.jsx)(s,{"data-visual-test":`tooltip-hover-align-arrow-left-long-text`,scope:{longText:l},stableName:`TooltipExampleAlignArrowLeftLongText`,sourceImports:[`import { Button, Tooltip, Span, NumberFormat } from '@dnb/eufemia'`],__buildScope:{Button:r,Tooltip:n},children:`
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

`}),v=()=>(0,c.jsx)(s,{"data-visual-test":`tooltip-hover-align-arrow-right-long-text`,scope:{longText:l},stableName:`TooltipExampleAlignArrowRightLongText`,sourceImports:[`import { Button, Tooltip, Span, NumberFormat } from '@dnb/eufemia'`],__buildScope:{Button:r,Tooltip:n},children:`
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

`}),y=()=>(0,c.jsx)(s,{"data-visual-test":`tooltip-hover-align-left-arrow-right-long-text`,scope:{longText:l},stableName:`TooltipExampleAlignLeftArrowRightLongText`,sourceImports:[`import { Button, Tooltip, Span, NumberFormat } from '@dnb/eufemia'`],__buildScope:{Button:r,Tooltip:n},children:`
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

`}),b=()=>(0,c.jsx)(s,{"data-visual-test":`tooltip-hover-align-right-arrow-left-long-text`,scope:{longText:l},stableName:`TooltipExampleAlignRightArrowLeftLongText`,sourceImports:[`import { Button, Tooltip, Span, NumberFormat } from '@dnb/eufemia'`],__buildScope:{Button:r,Tooltip:n},children:`
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

`}),x=()=>(0,c.jsx)(s,{"data-visual-test":`tooltip-hover-align-left-long-text`,scope:{longText:l},stableName:`TooltipExampleAlignLeftLongText`,sourceImports:[`import { Button, Tooltip, Span, NumberFormat } from '@dnb/eufemia'`],__buildScope:{Button:r,Tooltip:n},children:`
<Button className="target-align-left-long-text">Align left</Button>
<Tooltip
  id="unique-align-left-long-text"
  targetSelector=".target-align-left-long-text"
  align="left"
>
  {longText}
</Tooltip>

`}),S=()=>(0,c.jsx)(s,{"data-visual-test":`tooltip-hover-align-right-long-text`,scope:{longText:l},stableName:`TooltipExampleAlignRightLongText`,sourceImports:[`import { Button, Tooltip, Span, NumberFormat } from '@dnb/eufemia'`],__buildScope:{Button:r,Tooltip:n},children:`
<Button className="target-align-right-long-text">Align right</Button>
<Tooltip
  id="unique-align-right-long-text"
  targetSelector=".target-align-right-long-text"
  align="right"
>
  {longText}
</Tooltip>

`}),C=()=>(0,c.jsx)(s,{"data-visual-test":`tooltip-hover-align-center-long-text`,scope:{longText:l},stableName:`TooltipExampleAlignArrowCenterLongText`,sourceImports:[`import { Button, Tooltip, Span, NumberFormat } from '@dnb/eufemia'`],__buildScope:{Button:r,Tooltip:n},children:`
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

`}),w=()=>(0,c.jsx)(s,{"data-visual-test":`tooltip-hover-arrow-left-long-text`,scope:{longText:l},stableName:`TooltipExampleArrowLeftLongText`,sourceImports:[`import { Button, Tooltip, Span, NumberFormat } from '@dnb/eufemia'`],__buildScope:{Button:r,Tooltip:n},children:`
<Button className="target-arrow-left-long-text">Arrow left</Button>
<Tooltip
  id="unique-arrow-left-long-text"
  targetSelector=".target-arrow-left-long-text"
  arrow="left"
>
  {longText}
</Tooltip>

`}),T=()=>(0,c.jsx)(s,{"data-visual-test":`tooltip-hover-arrow-right-long-text`,scope:{longText:l},stableName:`TooltipExampleArrowRightLongText`,sourceImports:[`import { Button, Tooltip, Span, NumberFormat } from '@dnb/eufemia'`],__buildScope:{Button:r,Tooltip:n},children:`
<Button className="target-arrow-right-long-text">Arrow right</Button>
<Tooltip
  id="unique-arrow-right-long-text"
  targetSelector=".target-arrow-right-long-text"
  arrow="right"
>
  {longText}
</Tooltip>

`}),E=()=>(0,c.jsx)(s,{"data-visual-test":`tooltip-hover-position-right-long-text`,scope:{longText:l},stableName:`TooltipExamplePositionRightLongText`,sourceImports:[`import { Button, Tooltip, Span, NumberFormat } from '@dnb/eufemia'`],__buildScope:{Button:r,Tooltip:n},children:`
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

`}),D=()=>(0,c.jsx)(s,{"data-visual-test":`tooltip-hover-position-left-long-text`,scope:{longText:l},stableName:`TooltipExamplePositionLeftLongText`,sourceImports:[`import { Button, Tooltip, Span, NumberFormat } from '@dnb/eufemia'`],__buildScope:{Button:r,Tooltip:n},children:`
<Button className="target-position-left-long-text">Position left</Button>
<Tooltip
  id="unique-position-left-long-text"
  targetSelector=".target-position-left-long-text"
  placement="left"
>
  {longText}
</Tooltip>

`}),O=()=>(0,c.jsx)(s,{"data-visual-test":`tooltip-hover-position-bottom-long-text`,scope:{longText:l},stableName:`TooltipExamplePositionBottomLongText`,sourceImports:[`import { Button, Tooltip, Span, NumberFormat } from '@dnb/eufemia'`],__buildScope:{Button:r,Tooltip:n},children:`
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

`}),k=()=>(0,c.jsx)(s,{"data-visual-test":`tooltip-hover-align-arrow-left`,stableName:`TooltipExampleAlignArrowLeft`,sourceImports:[`import { Button, Tooltip, Span, NumberFormat } from '@dnb/eufemia'`],__buildScope:{Button:r,Tooltip:n},children:`
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

`}),A=()=>(0,c.jsx)(s,{"data-visual-test":`tooltip-hover-align-arrow-right`,stableName:`TooltipExampleAlignArrowRight`,sourceImports:[`import { Button, Tooltip, Span, NumberFormat } from '@dnb/eufemia'`],__buildScope:{Button:r,Tooltip:n},children:`
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

`}),j=()=>(0,c.jsx)(s,{"data-visual-test":`tooltip-hover-align-left-arrow-right`,stableName:`TooltipExampleAlignLeftArrowRight`,sourceImports:[`import { Button, Tooltip, Span, NumberFormat } from '@dnb/eufemia'`],__buildScope:{Button:r,Tooltip:n},children:`
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

`}),M=()=>(0,c.jsx)(s,{"data-visual-test":`tooltip-hover-align-right-arrow-left`,stableName:`TooltipExampleAlignRightArrowLeft`,sourceImports:[`import { Button, Tooltip, Span, NumberFormat } from '@dnb/eufemia'`],__buildScope:{Button:r,Tooltip:n},children:`
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

`}),N=()=>(0,c.jsx)(s,{"data-visual-test":`tooltip-hover-align-left`,stableName:`TooltipExampleAlignLeft`,sourceImports:[`import { Button, Tooltip, Span, NumberFormat } from '@dnb/eufemia'`],__buildScope:{Button:r,Tooltip:n},children:`
<Button className="target-align-left">Align left</Button>
<Tooltip
  id="unique-align-left"
  targetSelector=".target-align-left"
  align="left"
>
  Align left
</Tooltip>

`}),P=()=>(0,c.jsx)(s,{"data-visual-test":`tooltip-hover-align-right`,stableName:`TooltipExampleAlignRight`,sourceImports:[`import { Button, Tooltip, Span, NumberFormat } from '@dnb/eufemia'`],__buildScope:{Button:r,Tooltip:n},children:`
<Button className="target-align-right">Align right</Button>
<Tooltip
  id="unique-align-right"
  targetSelector=".target-align-right"
  align="right"
>
  Align right
</Tooltip>

`}),F=()=>(0,c.jsx)(s,{"data-visual-test":`tooltip-hover-align-center`,stableName:`TooltipExampleAlignArrowCenter`,sourceImports:[`import { Button, Tooltip, Span, NumberFormat } from '@dnb/eufemia'`],__buildScope:{Button:r,Tooltip:n},children:`
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

`}),I=()=>(0,c.jsx)(s,{"data-visual-test":`tooltip-hover-arrow-left`,stableName:`TooltipExampleArrowLeft`,sourceImports:[`import { Button, Tooltip, Span, NumberFormat } from '@dnb/eufemia'`],__buildScope:{Button:r,Tooltip:n},children:`
<Button className="target-arrow-left">Arrow left</Button>
<Tooltip
  id="unique-arrow-left"
  targetSelector=".target-arrow-left"
  arrow="left"
>
  Arrow left
</Tooltip>

`}),L=()=>(0,c.jsx)(s,{"data-visual-test":`tooltip-hover-arrow-right`,stableName:`TooltipExampleArrowRight`,sourceImports:[`import { Button, Tooltip, Span, NumberFormat } from '@dnb/eufemia'`],__buildScope:{Button:r,Tooltip:n},children:`
<Button className="target-arrow-right">Arrow right</Button>
<Tooltip
  id="unique-arrow-right"
  targetSelector=".target-arrow-right"
  arrow="right"
>
  Arrow right
</Tooltip>

`}),R=()=>(0,c.jsx)(s,{"data-visual-test":`tooltip-hover-position-right`,stableName:`TooltipExamplePositionRight`,sourceImports:[`import { Button, Tooltip, Span, NumberFormat } from '@dnb/eufemia'`],__buildScope:{Button:r,Tooltip:n},children:`
<Button className="target-position-right">Position right</Button>
<Tooltip
  id="unique-position-right"
  targetSelector=".target-position-right"
  placement="right"
>
  Position right
</Tooltip>

`}),z=()=>(0,c.jsx)(s,{"data-visual-test":`tooltip-hover-position-left`,stableName:`TooltipExamplePositionLeft`,sourceImports:[`import { Button, Tooltip, Span, NumberFormat } from '@dnb/eufemia'`],__buildScope:{Button:r,Tooltip:n},children:`
<Button className="target-position-left">Position left</Button>
<Tooltip
  id="unique-position-left"
  targetSelector=".target-position-left"
  placement="left"
>
  Position left
</Tooltip>

`}),B=()=>(0,c.jsx)(s,{"data-visual-test":`tooltip-hover-position-bottom`,stableName:`TooltipExamplePositionBottom`,sourceImports:[`import { Button, Tooltip, Span, NumberFormat } from '@dnb/eufemia'`],__buildScope:{Button:r,Tooltip:n},children:`
<Button className="target-position-bottom">Position bottom</Button>
<Tooltip
  id="unique-position-bottom"
  targetSelector=".target-position-bottom"
  placement="bottom"
>
  Position bottom
</Tooltip>

`});function V(e){let t={a:`a`,h2:`h2`,h3:`h3`,p:`p`,...o(),...e.components},{VisibleWhenNotVisualTest:n,VisibleWhenVisualTest:r}=t;return n||U(`VisibleWhenNotVisualTest`,!0),r||U(`VisibleWhenVisualTest`,!0),(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(t.h2,{children:`Demos`}),`
`,(0,c.jsx)(t.h3,{children:`Button with hover Tooltip`}),`
`,(0,c.jsx)(u,{}),`
`,(0,c.jsx)(t.h3,{children:`Button with open Tooltip`}),`
`,(0,c.jsx)(n,{children:(0,c.jsx)(d,{})}),`
`,(0,c.jsx)(t.h3,{children:`NumberFormat with a tooltip`}),`
`,(0,c.jsx)(m,{}),`
`,(0,c.jsxs)(t.p,{children:[`... or wrapped around the `,(0,c.jsx)(t.a,{href:`/uilib/components/number-format`,children:`NumberFormat`}),` component:`]}),`
`,(0,c.jsx)(h,{}),`
`,(0,c.jsx)(t.h3,{children:`Tooltip with delay`}),`
`,(0,c.jsx)(p,{}),`
`,(0,c.jsx)(t.h3,{children:`Tooltip linked to a vanilla button`}),`
`,(0,c.jsx)(n,{children:(0,c.jsx)(f,{})}),`
`,(0,c.jsxs)(r,{children:[(0,c.jsx)(g,{}),(0,c.jsx)(F,{}),(0,c.jsx)(C,{}),(0,c.jsx)(R,{}),(0,c.jsx)(E,{}),(0,c.jsx)(N,{}),(0,c.jsx)(x,{}),(0,c.jsx)(P,{}),(0,c.jsx)(S,{}),(0,c.jsx)(k,{}),(0,c.jsx)(_,{}),(0,c.jsx)(A,{}),(0,c.jsx)(v,{}),(0,c.jsx)(j,{}),(0,c.jsx)(y,{}),(0,c.jsx)(M,{}),(0,c.jsx)(b,{}),(0,c.jsx)(I,{}),(0,c.jsx)(w,{}),(0,c.jsx)(L,{}),(0,c.jsx)(T,{}),(0,c.jsx)(z,{}),(0,c.jsx)(D,{}),(0,c.jsx)(B,{}),(0,c.jsx)(O,{})]})]})}function H(e={}){let{wrapper:t}={...o(),...e.components};return t?(0,c.jsx)(t,{...e,children:(0,c.jsx)(V,{...e})}):V(e)}function U(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{H as default};