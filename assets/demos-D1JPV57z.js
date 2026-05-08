import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{t}from"./card_medium-GKRMgrO1.js";import{t as n}from"./ComponentBox-C64JNWnl.js";import{In as r,Lr as i,On as a,_n as o}from"./index-2AO2Cu5K.js";var s=e(),c=()=>(0,s.jsx)(n,{"data-visual-test":`info-card-basic`,children:`<InfoCard text="This is a description of some information or a tip that will inform the user of something that will help them." />
`}),l=()=>(0,s.jsx)(n,{children:`<InfoCard
  text="This is a description of some information or a tip that will inform the user of something that will help them."
  title="Title of your info/tip"
/>
`}),u=()=>(0,s.jsx)(n,{"data-visual-test":`info-card-stretch`,children:`<InfoCard
  stretch
  text="This is a description of some information or a tip that will inform the user of something that will help them."
  title="Title of your info/tip"
/>
`}),d=()=>(0,s.jsx)(n,{"data-visual-test":`info-card-buttons`,children:`<InfoCard
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
`}),f=()=>(0,s.jsx)(n,{"data-visual-test":`info-card-buttons-centered`,children:`<InfoCard
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
`}),p=()=>(0,s.jsx)(n,{"data-visual-test":`info-card-accept-button`,children:`<InfoCard
  text="This is a description of some information or a tip that will inform the user of something that will help them."
  title="Title of your info/tip"
  acceptButtonText="Accept"
  onAccept={() => {
    console.log('onAccept')
  }}
/>
`}),m=()=>(0,s.jsx)(n,{"data-visual-test":`info-card-close-button`,children:`<InfoCard
  text="This is a description of some information or a tip that will inform the user of something that will help them."
  title="Title of your info/tip"
  closeButtonText="Close"
  onClose={() => {
    console.log('onClose')
  }}
/>
`}),h=()=>(0,s.jsx)(n,{scope:{Card:t},"data-visual-test":`info-card-custom-icon`,children:`<InfoCard
  text="This is a description of some information or a tip that will inform the user of something that will help them."
  title="Title of your info/tip"
  icon={Card}
/>
`}),g=()=>(0,s.jsx)(n,{"data-visual-test":`info-card-centered`,children:`<InfoCard
  text="This is a description of some information or a tip that will inform the user of something that will help them."
  title="Title of your info/tip"
  centered={true}
/>
`}),_=()=>(0,s.jsx)(n,{children:`<InfoCard
  text="This is a description of some information or a tip that will inform the user of something that will help them."
  title="Title of your info/tip"
  dropShadow={false}
/>
`}),v=()=>(0,s.jsx)(n,{"data-visual-test":`info-card-custom-image`,children:`<InfoCard
  text="This is a description of some information or a tip that will inform the user of something that will help them."
  title="This is the InfoCard with a custom image"
  src="/images/avatars/1501870.jpg"
  alt="Profile picture"
/>
`}),y=()=>(0,s.jsx)(n,{"data-visual-test":`info-card-custom-image-centered`,children:`<InfoCard
  text="This is a description of some information or a tip that will inform the user of something that will help them."
  title="This is the InfoCard with a custom image"
  centered={true}
  src="/images/avatars/1501870.jpg"
  alt="Profile picture"
/>
`}),b=()=>(0,s.jsx)(n,{scope:{Ul:o,Li:a,P:r},"data-visual-test":`info-card-children`,children:`<InfoCard
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
`});function x(e){let t={h2:`h2`,h3:`h3`,p:`p`,...i(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.h2,{children:`Demos`}),`
`,(0,s.jsx)(t.h3,{children:`InfoCard (default)`}),`
`,(0,s.jsx)(c,{}),`
`,(0,s.jsx)(t.h3,{children:`InfoCard with a title`}),`
`,(0,s.jsx)(l,{}),`
`,(0,s.jsx)(t.h3,{children:`InfoCard with a stretched container`}),`
`,(0,s.jsx)(u,{}),`
`,(0,s.jsx)(t.h3,{children:`InfoCard with Buttons`}),`
`,(0,s.jsx)(d,{}),`
`,(0,s.jsx)(f,{}),`
`,(0,s.jsx)(t.p,{children:`Each button can be used independently.`}),`
`,(0,s.jsx)(p,{}),`
`,(0,s.jsx)(m,{}),`
`,(0,s.jsx)(t.h3,{children:`InfoCard accepts a custom icon`}),`
`,(0,s.jsx)(h,{}),`
`,(0,s.jsx)(t.h3,{children:`InfoCard centered content`}),`
`,(0,s.jsx)(g,{}),`
`,(0,s.jsx)(t.h3,{children:`InfoCard without drop shadow`}),`
`,(0,s.jsx)(_,{}),`
`,(0,s.jsx)(t.h3,{children:`InfoCard custom image`}),`
`,(0,s.jsx)(v,{}),`
`,(0,s.jsx)(t.h3,{children:`InfoCard custom image centered`}),`
`,(0,s.jsx)(y,{}),`
`,(0,s.jsx)(t.h3,{children:`InfoCard with children`}),`
`,(0,s.jsx)(b,{})]})}function S(e={}){let{wrapper:t}={...i(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(x,{...e})}):x(e)}export{S as default};