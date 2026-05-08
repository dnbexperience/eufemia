import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{t}from"./ComponentBox-C64JNWnl.js";import{Ti as n,fi as r,si as i}from"./index-2AO2Cu5K.js";import{t as a}from"./VippsWalletButton-CdtNnB68.js";var o=e(),s=()=>(0,o.jsx)(t,{children:`<Button
  text="Primary button with text only"
  onClick={() => {
    console.log('onClick')
  }}
  data-visual-test="button-primary"
/>
`}),c=()=>(0,o.jsx)(t,{children:`<Button
  variant="secondary"
  onClick={() => {
    console.log('onClick')
  }}
  data-visual-test="button-secondary"
>
  Secondary button with text only
</Button>
`}),l=()=>(0,o.jsx)(t,{"data-visual-test":`button-disabled`,children:`
<Button text="Disabled primary button" disabled right />
<Button
  text="Disabled secondary button"
  variant="secondary"
  disabled
  right
/>
<Button
  text="Disabled tertiary button"
  variant="tertiary"
  disabled
  right
/>
<Button title="Disabled Icon Button" icon="calendar" disabled right />
<Button
  text="Disabled button with href"
  href="/uilib/components/button/demos"
  target="_blank"
  disabled
/>

`}),u=()=>(0,o.jsx)(t,{scope:{question:r},"data-visual-test":`button-error`,children:`
<Button
  text="Primary button error"
  status="error"
  data-visual-test="button-error-primary"
/>
<Button
  text="Secondary button error"
  variant="secondary"
  status="error"
  left
  data-visual-test="button-error-secondary"
/>
<Button
  text="Tertiary button error"
  icon="chevron_right"
  variant="tertiary"
  status="error"
  left
  data-visual-test="button-error-tertiary"
/>
<Button
  title="Primary icon button error"
  variant="primary"
  icon={question}
  size="default"
  status="error"
  left
/>
<Button
  title="Secondary icon button error"
  icon={question}
  size="default"
  status="error"
  left
/>

`}),d=()=>(0,o.jsx)(t,{children:`<Button text="Primary button with icon" icon="chevron_right" />
`}),f=()=>(0,o.jsx)(t,{children:`<Button iconPosition="left" icon="chevron_left">
  Primary button with icon on left
</Button>
`}),p=()=>(0,o.jsx)(t,{"data-visual-test":`button-tertiary-all`,children:`
<Button
  variant="tertiary"
  text="Tertiary button with icon on left"
  iconPosition="left"
  icon="chevron_left"
  data-visual-test="button-tertiary"
/>
<Button
  variant="tertiary"
  text={<span>Text inside additional span</span>}
  iconPosition="left"
  icon="chevron_left"
  left
/>

`}),m=()=>(0,o.jsx)(t,{"data-visual-test":`button-tertiary-top`,children:`
<Button
  variant="tertiary"
  iconPosition="top"
  icon="close"
  text="Button text"
/>
<Button
  variant="tertiary"
  iconPosition="top"
  icon="close"
  text="Large button"
  size="large"
/>

`}),h=()=>(0,o.jsx)(t,{"data-visual-test":`button-custom-content`,children:`<Button
  icon="close"
  iconPosition="right"
  text="Button with custom content"
  customContent={<IconPrimary icon="check" right="small" />}
/>
`}),g=()=>(0,o.jsx)(t,{"data-visual-test":`button-tertiary-wrap`,children:`<Button
  wrap
  variant="tertiary"
  text="A long text where wrap is enabled magnis rutrum netus neque ridiculus euismod sit dictum laoreet libero"
  icon="chevron_left"
  iconPosition="left"
/>
`}),_=()=>(0,o.jsx)(t,{"data-visual-test":`button-anchor`,children:`
<Button
  text="Primary with href"
  href="/uilib/components/button/demos"
  iconPosition="right"
  icon="chevron_right"
  onClick={({ event }) => {
    event.preventDefault()
  }}
  right
/>
<Button
  variant="secondary"
  text="Secondary with href"
  href="/uilib/components/button/demos"
  target="_blank"
  right
/>
<Button
  href="/uilib/components/button/demos"
  title="This is a link"
  icon="chevron_right"
  size="default"
  right
/>

`}),v=()=>(0,o.jsx)(t,{scope:{question:r,VisibilityByTheme:n},"data-visual-test":`button-icons`,children:`
<Button
  title="Disabled Icon only Button"
  icon="calendar"
  disabled
  right
/>
<Button
  title="Button with Icon only"
  icon="calendar"
  data-visual-test="button-icon"
/>
<Button title="Small sized icon button" icon="add" size="small" left />
<Button
  title="Large sized icon button"
  icon={question}
  size="large"
  left
/>
<Button
  title="Icon button with status"
  icon={question}
  status="error"
  left
/>
<Button
  title="Tertiary icon button"
  size="large"
  icon={question}
  variant="tertiary"
  data-visual-test="button-icon-tertiary"
/>

`}),y=()=>(0,o.jsx)(t,{"data-visual-test":`button-tertiary-no-icon`,children:`<Button text="Tertiary button with no icon" variant="tertiary" />
`}),b=()=>(0,o.jsx)(t,{"data-visual-test":`button-unstyled`,children:`<Button text="Unstyled button with icon" icon="bell" variant="unstyled" />
`}),x=()=>(0,o.jsx)(t,{scope:{Bell:i},children:`<Button
  text="A stretched button"
  icon={<Bell />}
  size="large"
  data-visual-test="button-stretch"
/>
`}),S=()=>(0,o.jsx)(t,{scope:{Bell:i},hideCode:!0,children:`
<Button
  text="Default button"
  onClick={() => {
    console.log('onClick')
  }}
/>
<Button
  text="Large button"
  onClick={() => {
    console.log('onClick')
  }}
  size="large"
  left
/>
<Button
  text="Default button icon"
  onClick={() => {
    console.log('onClick')
  }}
  icon="chevron_right"
  left
/>
<Button
  text="Large button icon"
  onClick={() => {
    console.log('onClick')
  }}
  size="large"
  icon="chevron_right"
  left
/>

`}),C=()=>(0,o.jsx)(t,{scope:{Bell:i},hideCode:!0,children:`
<Button
  text="Default button"
  onClick={() => {
    console.log('onClick')
  }}
  variant="secondary"
/>
<Button
  text="Large button"
  onClick={() => {
    console.log('onClick')
  }}
  size="large"
  variant="secondary"
  left
/>
<Button
  text="Default button icon"
  onClick={() => {
    console.log('onClick')
  }}
  icon="chevron_right"
  variant="secondary"
  left
/>
<Button
  text="Large button icon"
  onClick={() => {
    console.log('onClick')
  }}
  size="large"
  icon="chevron_right"
  variant="secondary"
  left
/>

`}),w=()=>(0,o.jsx)(t,{scope:{Bell:i},hideCode:!0,children:`
<Button
  text="Default button"
  onClick={() => {
    console.log('onClick')
  }}
  icon="chevron_right"
  variant="tertiary"
/>
<Button
  text="Button large"
  onClick={() => {
    console.log('onClick')
  }}
  icon="chevron_right"
  variant="tertiary"
  size="large"
  left
/>
<Button
  text="Button text"
  onClick={() => {
    console.log('onClick')
  }}
  icon="bell"
  iconPosition="top"
  variant="tertiary"
  left
/>

`}),T=()=>(0,o.jsx)(t,{hideCode:!0,children:`
<Button
  title="Small sized button with add icon"
  icon="add"
  size="small"
/>
<Button
  title="Medium sized button with add icon (default)"
  icon="add"
  size="medium"
  left
/>
<Button
  title="Default sized button with add icon (not default)"
  icon="add"
  size="default"
  left
/>
<Button
  title="Large sized button with add icon"
  icon="add"
  size="large"
  left
/>

`}),E=()=>(0,o.jsx)(t,{"data-visual-test":`button-tertiary-alignment`,children:`
<span className="dnb-p">text</span>{' '}
<Button text="right" variant="tertiary" icon="chevron_right" />
<Button
  text="left"
  variant="tertiary"
  iconPosition="left"
  icon="chevron_left"
/>
<br />
<Button
  text="right medium"
  variant="tertiary"
  icon="chevron_right"
  iconSize="medium"
/>
<Button
  text="left medium"
  variant="tertiary"
  iconPosition="left"
  icon="chevron_left"
  iconSize="medium"
/>
<br />
<Button
  text="right large"
  variant="tertiary"
  icon="chevron_right"
  iconSize="large"
/>
<Button
  text="left large"
  variant="tertiary"
  iconPosition="left"
  icon="chevron_left"
  iconSize="large"
/>
<br />
<Button variant="tertiary" icon="chevron_right" />
<Button variant="tertiary" icon="chevron_right" iconSize="medium" />
<Button variant="tertiary" icon="chevron_right" iconSize="large" />{' '}
<span className="dnb-p">text</span>

`}),D=()=>(0,o.jsx)(t,{children:`<Section
  innerSpace={{
    block: true,
  }}
  surface="dark"
>
  <Button data-visual-test="button-primary-on-dark" right>
    Primary button
  </Button>
  <Button
    data-visual-test="button-secondary-on-dark"
    right
    variant="secondary"
  >
    Secondary button
  </Button>
  <Button
    data-visual-test="button-tertiary-on-dark"
    variant="tertiary"
    iconPosition="left"
    icon="chevron_left"
  >
    Tertiary button
  </Button>
</Section>
`}),O=()=>(0,o.jsx)(t,{hideCode:!0,scope:{VippsLogo:a},noInline:!0,children:`render(
  <Button variant="secondary">
    Button with SVG <VippsLogo />
  </Button>
)
`});export{b as S,C as _,v as a,w as b,d as c,x as d,p as f,S as g,T as h,u as i,f as l,g as m,h as n,D as o,m as p,l as r,s,_ as t,c as u,O as v,y as x,E as y};