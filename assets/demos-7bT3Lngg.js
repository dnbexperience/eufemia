import{a as e}from"./rolldown-runtime-BYbx6iT9.js";import{n as t,t as n}from"./jsx-runtime-BgMs7Gb-.js";import{n as r,t as i}from"./lightbulb_medium-1o1tS6WL.js";import{t as a}from"./Img-DyXvBWE8.js";import{Gi as o,Hi as s,In as c,Lr as l,On as u,Rr as d,Xi as f,Zi as p,_a as m,_n as h,ba as g,ea as _,ri as v,wr as y}from"./index-BIrFyEEc.js";import{t as b}from"./ComponentBox-DFVIRw0w.js";var x=e(t()),S=e(n()),C={centered:!1,dropShadow:!0,skeleton:!1,icon:i},w=e=>{let t=(0,x.useContext)(_),n=g(e,C,{skeleton:t?.skeleton},t?.InfoCard),{alt:r,centered:i,dropShadow:o,title:u,skeleton:d,stretch:h,className:b,icon:w,src:T,imgProps:E,text:D,children:O,onClose:k,onAccept:A,closeButtonText:j,acceptButtonText:M,closeButtonProps:N,closeButtonAttributes:P,acceptButtonProps:F,acceptButtonAttributes:I,...L}=n,R=N||P,z=F||I,B=!k&&!j,V=!A&&!M;m(n,L);let H=f(n,{...L,className:p(`dnb-info-card`,i&&`dnb-info-card--centered`,h&&`dnb-info-card--stretch`,o&&`dnb-info-card--shadow`,b)}),U=(0,x.useCallback)(()=>B&&V?null:(0,S.jsxs)(`div`,{className:`dnb-info-card__buttons`,children:[!V&&(0,S.jsx)(y,{top:i?`medium`:`small`,type:`button`,className:`dnb-info-card__buttons__accept-button`,variant:`secondary`,right:i?`zero`:`small`,onClick:A,text:M,...z}),!B&&(0,S.jsx)(y,{type:`button`,className:`dnb-info-card__buttons__close-button`,variant:`tertiary`,top:`small`,onClick:k,icon:`close`,iconPosition:`left`,text:j,...R})]}),[z,V,M,i,R,B,j,A,k]),W=(0,x.useCallback)(()=>T||E?(0,S.jsx)(a,{className:`dnb-info-card__image`,src:T,alt:r,...E}):(0,S.jsx)(v,{size:`medium`,className:`dnb-info-card__icon`,icon:w}),[r,w,E,T]);return(0,S.jsx)(`div`,{...H,children:(0,S.jsxs)(s,{skeleton:d,children:[(0,S.jsx)(l,{right:i?!1:`small`,bottom:i?`small`:!1,children:W()}),(0,S.jsxs)(`div`,{className:`dnb-info-card__content`,children:[u&&(0,S.jsx)(c,{className:`dnb-info-card__title`,size:`small`,weight:`medium`,bottom:`x-small`,children:u}),D&&(0,S.jsx)(c,{size:`small`,className:`dnb-info-card__text`,bottom:`0`,children:D}),O,U()]})]})})};o(w,{_supportsSpacingProps:!0});var T=()=>(0,S.jsx)(b,{"data-visual-test":`info-card-basic`,stableName:`InfoCardBasic`,sourceImports:[`import { card_medium as Card } from '@dnb/eufemia/icons'`,`import InfoCard from '@dnb/eufemia/components/info-card/InfoCard'`,`import Li from '@dnb/eufemia/elements/Li'`,`import Ul from '@dnb/eufemia/elements/Ul'`,`import P from '@dnb/eufemia/elements/P'`],__buildScope:{InfoCard:w},children:`<InfoCard text="This is a description of some information or a tip that will inform the user of something that will help them." />
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
`}),M=()=>(0,S.jsx)(b,{scope:{Card:r},"data-visual-test":`info-card-custom-icon`,stableName:`InfoCardCustomIcon`,sourceImports:[`import { card_medium as Card } from '@dnb/eufemia/icons'`,`import InfoCard from '@dnb/eufemia/components/info-card/InfoCard'`,`import Li from '@dnb/eufemia/elements/Li'`,`import Ul from '@dnb/eufemia/elements/Ul'`,`import P from '@dnb/eufemia/elements/P'`],__buildScope:{InfoCard:w,Card:r},children:`<InfoCard
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
`}),L=()=>(0,S.jsx)(b,{scope:{Ul:h,Li:u,P:c},"data-visual-test":`info-card-children`,stableName:`InfoCardChildren`,sourceImports:[`import { card_medium as Card } from '@dnb/eufemia/icons'`,`import InfoCard from '@dnb/eufemia/components/info-card/InfoCard'`,`import Li from '@dnb/eufemia/elements/Li'`,`import Ul from '@dnb/eufemia/elements/Ul'`,`import P from '@dnb/eufemia/elements/P'`],__buildScope:{InfoCard:w,P:c,Ul:h,Li:u},children:`<InfoCard
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
`});function R(e){let t={h2:`h2`,h3:`h3`,p:`p`,...d(),...e.components};return(0,S.jsxs)(S.Fragment,{children:[(0,S.jsx)(t.h2,{children:`Demos`}),`
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
`,(0,S.jsx)(L,{})]})}function z(e={}){let{wrapper:t}={...d(),...e.components};return t?(0,S.jsx)(t,{...e,children:(0,S.jsx)(R,{...e})}):R(e)}export{z as default};