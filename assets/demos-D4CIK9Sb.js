import{n as e,s as t,t as n}from"./jsx-runtime-DnlWeMvz.js";import{X as r,_ as i}from"./Anchor-9saPtqqX.js";import{L as a,N as o,a as s,c,s as l}from"./SpacingUtils-DG3qCKRf.js";import{t as u}from"./withComponentMarkers-wexATyax.js";import{n as d,t as f}from"./lightbulb_medium-BWzJf7M2.js";import{t as p}from"./Space-yHDYbMRV2.js";import{t as m}from"./Button-B0t-0slw.js";import{t as h}from"./Img-DTmI_1d2.js";import{t as g}from"./P-BqMs-VnB.js";import{n as _,t as v}from"./Ul-CJ3LH_FQ.js";import{K as y}from"./index-Bx3ttow-.js";import{t as b}from"./ComponentBox-CG7uqrFy.js";var x=t(e()),S=t(n()),C={centered:!1,dropShadow:!0,skeleton:!1,icon:f},w=e=>{let t=(0,x.useContext)(c),n=a(e,C,{skeleton:t?.skeleton},t?.InfoCard),{alt:u,centered:d,dropShadow:f,title:_,skeleton:v,stretch:y,className:b,icon:w,src:T,imgProps:E,text:D,children:O,onClose:k,onAccept:A,closeButtonText:j,acceptButtonText:M,closeButtonProps:N,closeButtonAttributes:P,acceptButtonProps:F,acceptButtonAttributes:I,...L}=n,R=N||P,z=F||I,B=!k&&!j,V=!A&&!M;o(n,L);let H=s(n,{...L,className:l(`dnb-info-card`,d&&`dnb-info-card--centered`,y&&`dnb-info-card--stretch`,f&&`dnb-info-card--shadow`,b)}),U=(0,x.useCallback)(()=>B&&V?null:(0,S.jsxs)(`div`,{className:`dnb-info-card__buttons`,children:[!V&&(0,S.jsx)(m,{top:d?`medium`:`small`,type:`button`,className:`dnb-info-card__buttons__accept-button`,variant:`secondary`,right:d?`zero`:`small`,onClick:A,text:M,...z}),!B&&(0,S.jsx)(m,{type:`button`,className:`dnb-info-card__buttons__close-button`,variant:`tertiary`,top:`small`,onClick:k,icon:`close`,iconPosition:`left`,text:j,...R})]}),[z,V,M,d,R,B,j,A,k]),W=(0,x.useCallback)(()=>T||E?(0,S.jsx)(h,{className:`dnb-info-card__image`,src:T,alt:u,...E}):(0,S.jsx)(i,{size:`medium`,className:`dnb-info-card__icon`,icon:w}),[u,w,E,T]);return(0,S.jsx)(`div`,{...H,children:(0,S.jsxs)(r,{skeleton:v,children:[(0,S.jsx)(p,{right:d?!1:`small`,bottom:d?`small`:!1,children:W()}),(0,S.jsxs)(`div`,{className:`dnb-info-card__content`,children:[_&&(0,S.jsx)(g,{className:`dnb-info-card__title`,size:`small`,weight:`medium`,bottom:`x-small`,children:_}),D&&(0,S.jsx)(g,{size:`small`,className:`dnb-info-card__text`,bottom:`0`,children:D}),O,U()]})]})})};u(w,{_supportsSpacingProps:!0});var T=()=>(0,S.jsx)(b,{"data-visual-test":`info-card-basic`,stableName:`InfoCardBasic`,sourceImports:[`import { card_medium as Card } from '@dnb/eufemia/icons'`,`import InfoCard from '@dnb/eufemia/components/info-card/InfoCard'`,`import Li from '@dnb/eufemia/elements/Li'`,`import Ul from '@dnb/eufemia/elements/Ul'`,`import P from '@dnb/eufemia/elements/P'`],__buildScope:{InfoCard:w},children:`<InfoCard text="This is a description of some information or a tip that will inform the user of something that will help them." />
`}),E=()=>(0,S.jsx)(b,{stableName:`InfoCardTitle`,sourceImports:[`import { card_medium as Card } from '@dnb/eufemia/icons'`,`import InfoCard from '@dnb/eufemia/components/info-card/InfoCard'`,`import Li from '@dnb/eufemia/elements/Li'`,`import Ul from '@dnb/eufemia/elements/Ul'`,`import P from '@dnb/eufemia/elements/P'`],__buildScope:{InfoCard:w},children:`<InfoCard
  text="This is a description of some information or a tip that will inform the user of something that will help them."
  title="Title of your info/tip"
/>
`}),D=()=>(0,S.jsx)(b,{"data-visual-test":`info-card-stretch`,stableName:`InfoCardStretch`,sourceImports:[`import { card_medium as Card } from '@dnb/eufemia/icons'`,`import InfoCard from '@dnb/eufemia/components/info-card/InfoCard'`,`import Li from '@dnb/eufemia/elements/Li'`,`import Ul from '@dnb/eufemia/elements/Ul'`,`import P from '@dnb/eufemia/elements/P'`],__buildScope:{InfoCard:w},children:`<InfoCard
  stretch
  text="This is a description of some information or a tip that will inform the user of something that will help them."
  title="Title of your info/tip"
/>
`}),O=()=>(0,S.jsx)(b,{"data-visual-test":`info-card-buttons`,stableName:`InfoCardButtons`,sourceImports:[`import { card_medium as Card } from '@dnb/eufemia/icons'`,`import InfoCard from '@dnb/eufemia/components/info-card/InfoCard'`,`import Li from '@dnb/eufemia/elements/Li'`,`import Ul from '@dnb/eufemia/elements/Ul'`,`import P from '@dnb/eufemia/elements/P'`],__buildScope:{InfoCard:w},children:`<InfoCard
  text="This is a description of some information or a tip that will inform the user of something that will help them."
  title="Title of your info/tip"
  closeButtonText="Close"
  onClose={() => {
    console.log('onClose')
  }}
  acceptButtonText="Accept"
  onAccept={() => {
    console.log('onAccept')
  }}
/>
`}),k=()=>(0,S.jsx)(b,{"data-visual-test":`info-card-buttons-centered`,stableName:`InfoCardButtonsCentered`,sourceImports:[`import { card_medium as Card } from '@dnb/eufemia/icons'`,`import InfoCard from '@dnb/eufemia/components/info-card/InfoCard'`,`import Li from '@dnb/eufemia/elements/Li'`,`import Ul from '@dnb/eufemia/elements/Ul'`,`import P from '@dnb/eufemia/elements/P'`],__buildScope:{InfoCard:w},children:`<InfoCard
  centered
  text="This is a description of some information or a tip that will inform the user of something that will help them."
  title="Title of your info/tip"
  closeButtonText="Close"
  onClose={() => {
    console.log('onClose')
  }}
  acceptButtonText="Accept"
  onAccept={() => {
    console.log('onAccept')
  }}
/>
`}),A=()=>(0,S.jsx)(b,{"data-visual-test":`info-card-accept-button`,stableName:`InfoCardAcceptButton`,sourceImports:[`import { card_medium as Card } from '@dnb/eufemia/icons'`,`import InfoCard from '@dnb/eufemia/components/info-card/InfoCard'`,`import Li from '@dnb/eufemia/elements/Li'`,`import Ul from '@dnb/eufemia/elements/Ul'`,`import P from '@dnb/eufemia/elements/P'`],__buildScope:{InfoCard:w},children:`<InfoCard
  text="This is a description of some information or a tip that will inform the user of something that will help them."
  title="Title of your info/tip"
  acceptButtonText="Accept"
  onAccept={() => {
    console.log('onAccept')
  }}
/>
`}),j=()=>(0,S.jsx)(b,{"data-visual-test":`info-card-close-button`,stableName:`InfoCardCloseButton`,sourceImports:[`import { card_medium as Card } from '@dnb/eufemia/icons'`,`import InfoCard from '@dnb/eufemia/components/info-card/InfoCard'`,`import Li from '@dnb/eufemia/elements/Li'`,`import Ul from '@dnb/eufemia/elements/Ul'`,`import P from '@dnb/eufemia/elements/P'`],__buildScope:{InfoCard:w},children:`<InfoCard
  text="This is a description of some information or a tip that will inform the user of something that will help them."
  title="Title of your info/tip"
  closeButtonText="Close"
  onClose={() => {
    console.log('onClose')
  }}
/>
`}),M=()=>(0,S.jsx)(b,{scope:{Card:d},"data-visual-test":`info-card-custom-icon`,stableName:`InfoCardCustomIcon`,sourceImports:[`import { card_medium as Card } from '@dnb/eufemia/icons'`,`import InfoCard from '@dnb/eufemia/components/info-card/InfoCard'`,`import Li from '@dnb/eufemia/elements/Li'`,`import Ul from '@dnb/eufemia/elements/Ul'`,`import P from '@dnb/eufemia/elements/P'`],__buildScope:{InfoCard:w,Card:d},children:`<InfoCard
  text="This is a description of some information or a tip that will inform the user of something that will help them."
  title="Title of your info/tip"
  icon={Card}
/>
`}),N=()=>(0,S.jsx)(b,{"data-visual-test":`info-card-centered`,stableName:`InfoCardCentered`,sourceImports:[`import { card_medium as Card } from '@dnb/eufemia/icons'`,`import InfoCard from '@dnb/eufemia/components/info-card/InfoCard'`,`import Li from '@dnb/eufemia/elements/Li'`,`import Ul from '@dnb/eufemia/elements/Ul'`,`import P from '@dnb/eufemia/elements/P'`],__buildScope:{InfoCard:w},children:`<InfoCard
  text="This is a description of some information or a tip that will inform the user of something that will help them."
  title="Title of your info/tip"
  centered={true}
/>
`}),P=()=>(0,S.jsx)(b,{stableName:`InfoCardWithoutDropShadow`,sourceImports:[`import { card_medium as Card } from '@dnb/eufemia/icons'`,`import InfoCard from '@dnb/eufemia/components/info-card/InfoCard'`,`import Li from '@dnb/eufemia/elements/Li'`,`import Ul from '@dnb/eufemia/elements/Ul'`,`import P from '@dnb/eufemia/elements/P'`],__buildScope:{InfoCard:w},children:`<InfoCard
  text="This is a description of some information or a tip that will inform the user of something that will help them."
  title="Title of your info/tip"
  dropShadow={false}
/>
`}),F=()=>(0,S.jsx)(b,{"data-visual-test":`info-card-custom-image`,stableName:`InfoCardCustomImage`,sourceImports:[`import { card_medium as Card } from '@dnb/eufemia/icons'`,`import InfoCard from '@dnb/eufemia/components/info-card/InfoCard'`,`import Li from '@dnb/eufemia/elements/Li'`,`import Ul from '@dnb/eufemia/elements/Ul'`,`import P from '@dnb/eufemia/elements/P'`],__buildScope:{InfoCard:w},children:`<InfoCard
  text="This is a description of some information or a tip that will inform the user of something that will help them."
  title="This is the InfoCard with a custom image"
  src="/images/avatars/1501870.jpg"
  alt="Profile picture"
/>
`}),I=()=>(0,S.jsx)(b,{"data-visual-test":`info-card-custom-image-centered`,stableName:`InfoCardCustomImageCentered`,sourceImports:[`import { card_medium as Card } from '@dnb/eufemia/icons'`,`import InfoCard from '@dnb/eufemia/components/info-card/InfoCard'`,`import Li from '@dnb/eufemia/elements/Li'`,`import Ul from '@dnb/eufemia/elements/Ul'`,`import P from '@dnb/eufemia/elements/P'`],__buildScope:{InfoCard:w},children:`<InfoCard
  text="This is a description of some information or a tip that will inform the user of something that will help them."
  title="This is the InfoCard with a custom image"
  centered={true}
  src="/images/avatars/1501870.jpg"
  alt="Profile picture"
/>
`}),L=()=>(0,S.jsx)(b,{scope:{Ul:v,Li:_,P:g},"data-visual-test":`info-card-children`,stableName:`InfoCardChildren`,sourceImports:[`import { card_medium as Card } from '@dnb/eufemia/icons'`,`import InfoCard from '@dnb/eufemia/components/info-card/InfoCard'`,`import Li from '@dnb/eufemia/elements/Li'`,`import Ul from '@dnb/eufemia/elements/Ul'`,`import P from '@dnb/eufemia/elements/P'`],__buildScope:{InfoCard:w,P:g,Ul:v,Li:_},children:`<InfoCard
  title="Title of your info/tip"
  acceptButtonText="Accept"
  onAccept={() => {
    console.log('onAccept')
  }}
>
  <P>I want to inform you about the following items:</P>
  <Ul>
    <Li>Item 1</Li>
    <Li>Item 2</Li>
  </Ul>
  <P>Is this okay with you?</P>
</InfoCard>
`});function R(e){let t={h2:`h2`,h3:`h3`,p:`p`,...y(),...e.components};return(0,S.jsxs)(S.Fragment,{children:[(0,S.jsx)(t.h2,{children:`Demos`}),`
`,(0,S.jsx)(t.h3,{children:`InfoCard (default)`}),`
`,(0,S.jsx)(T,{}),`
`,(0,S.jsx)(t.h3,{children:`InfoCard with a title`}),`
`,(0,S.jsx)(E,{}),`
`,(0,S.jsx)(t.h3,{children:`InfoCard with a stretched container`}),`
`,(0,S.jsx)(D,{}),`
`,(0,S.jsx)(t.h3,{children:`InfoCard with Buttons`}),`
`,(0,S.jsx)(O,{}),`
`,(0,S.jsx)(k,{}),`
`,(0,S.jsx)(t.p,{children:`Each button can be used independently.`}),`
`,(0,S.jsx)(A,{}),`
`,(0,S.jsx)(j,{}),`
`,(0,S.jsx)(t.h3,{children:`InfoCard accepts a custom icon`}),`
`,(0,S.jsx)(M,{}),`
`,(0,S.jsx)(t.h3,{children:`InfoCard centered content`}),`
`,(0,S.jsx)(N,{}),`
`,(0,S.jsx)(t.h3,{children:`InfoCard without drop shadow`}),`
`,(0,S.jsx)(P,{}),`
`,(0,S.jsx)(t.h3,{children:`InfoCard custom image`}),`
`,(0,S.jsx)(F,{}),`
`,(0,S.jsx)(t.h3,{children:`InfoCard custom image centered`}),`
`,(0,S.jsx)(I,{}),`
`,(0,S.jsx)(t.h3,{children:`InfoCard with children`}),`
`,(0,S.jsx)(L,{})]})}function z(e={}){let{wrapper:t}={...y(),...e.components};return t?(0,S.jsx)(t,{...e,children:(0,S.jsx)(R,{...e})}):R(e)}export{z as default};