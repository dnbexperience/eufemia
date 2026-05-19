import{a as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{t as n}from"./ComponentBox-a4aOn231.js";import{Di as r,li as i,mi as a}from"./index-DqqByKA2.js";import{t as o}from"./VippsWalletButton-BF5sRzlW.js";var s=e(t()),c=()=>(0,s.jsx)(n,{stableName:`ButtonPrimary`,children:`<Button
  text="Primary button with text only"
  onClick={() => {
    console.log('onClick')
  }}
  data-visual-test="button-primary"
/>
`}),l=()=>(0,s.jsx)(n,{stableName:`ButtonSecondary`,children:`<Button
  variant="secondary"
  onClick={() => {
    console.log('onClick')
  }}
  data-visual-test="button-secondary"
>
  Secondary button with text only
</Button>
`}),u=()=>(0,s.jsx)(n,{"data-visual-test":`button-disabled`,stableName:`ButtonDisabled`,children:`
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

`}),d=()=>(0,s.jsx)(n,{scope:{question:a},"data-visual-test":`button-error`,stableName:`ButtonErrorState`,children:`
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

`}),f=()=>(0,s.jsx)(n,{stableName:`ButtonPrimaryWithIcon`,children:`<Button text="Primary button with icon" icon="chevron_right" />
`}),p=()=>(0,s.jsx)(n,{stableName:`ButtonPrimaryWithIconLeft`,children:`<Button iconPosition="left" icon="chevron_left">
  Primary button with icon on left
</Button>
`}),m=()=>(0,s.jsx)(n,{"data-visual-test":`button-tertiary-all`,stableName:`ButtonTertiary`,children:`
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

`}),h=()=>(0,s.jsx)(n,{"data-visual-test":`button-tertiary-top`,stableName:`ButtonTertiaryTop`,children:`
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

`}),g=()=>(0,s.jsx)(n,{"data-visual-test":`button-custom-content`,stableName:`ButtonCustomContent`,children:`<Button
  icon="close"
  iconPosition="right"
  text="Button with custom content"
  customContent={<IconPrimary icon="check" right="small" />}
/>
`}),_=()=>(0,s.jsx)(n,{"data-visual-test":`button-tertiary-wrap`,stableName:`ButtonTertiaryWrap`,children:`<Button
  wrap
  variant="tertiary"
  text="A long text where wrap is enabled magnis rutrum netus neque ridiculus euismod sit dictum laoreet libero"
  icon="chevron_left"
  iconPosition="left"
/>
`}),v=()=>(0,s.jsx)(n,{"data-visual-test":`button-anchor`,stableName:`ButtonAnchor`,children:`
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

`}),y=()=>(0,s.jsx)(n,{scope:{question:a,VisibilityByTheme:r},"data-visual-test":`button-icons`,stableName:`ButtonIcon`,children:`
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

`}),b=()=>(0,s.jsx)(n,{"data-visual-test":`button-tertiary-no-icon`,stableName:`TertiaryWithNoIcon`,children:`<Button text="Tertiary button with no icon" variant="tertiary" />
`}),x=()=>(0,s.jsx)(n,{"data-visual-test":`button-unstyled`,stableName:`UnstyledVariant`,children:`<Button text="Unstyled button with icon" icon="bell" variant="unstyled" />
`}),S=()=>(0,s.jsx)(n,{scope:{Bell:i},stableName:`ButtonStretch`,children:`<Button
  text="A stretched button"
  icon={<Bell />}
  size="large"
  data-visual-test="button-stretch"
/>
`}),C=()=>(0,s.jsx)(n,{scope:{Bell:i},hideCode:!0,stableName:`PrimaryButtonSizes`,children:`
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

`}),w=()=>(0,s.jsx)(n,{scope:{Bell:i},hideCode:!0,stableName:`SecondaryButtonSizes`,children:`
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

`}),T=()=>(0,s.jsx)(n,{scope:{Bell:i},hideCode:!0,stableName:`TertiaryButtonSizes`,children:`
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

`}),E=()=>(0,s.jsx)(n,{hideCode:!0,stableName:`IconButtonSizes`,children:`
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

`}),D=()=>(0,s.jsx)(n,{"data-visual-test":`button-tertiary-alignment`,stableName:`TertiaryButtonAlignment`,children:`
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

`}),O=()=>(0,s.jsx)(n,{stableName:`ButtonOnDarkSurface`,children:`<Section
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
`}),k=()=>(0,s.jsx)(n,{hideCode:!0,scope:{VippsLogo:o},stableName:`SvgInButton`,noInline:!0,children:`render(
  <Button variant="secondary">
    Button with SVG <VippsLogo />
  </Button>
)
`});export{x as S,w as _,y as a,T as b,f as c,S as d,m as f,C as g,E as h,d as i,p as l,_ as m,g as n,O as o,h as p,u as r,c as s,v as t,l as u,k as v,b as x,D as y};