import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{C as n,g as r,k as i}from"./Anchor-CgDcBCwP.js";import{t as a}from"./Button-XQwxqpWO.js";import{t as o}from"./Section-BQdvtuRF.js";import{q as s}from"./index-kfZVC31v.js";import{t as c}from"./ComponentBox-qLaLt9T0.js";import{t as l}from"./VippsWalletButton-Ch60kkjx.js";var u=e(t()),d=()=>(0,u.jsx)(c,{stableName:`ButtonPrimary`,sourceImports:[`import { bell_medium as Bell, question } from '@dnb/eufemia/icons'`,`import { Button, IconPrimary, Section } from '@dnb/eufemia'`,`import { VippsLogo } from '@dnb/eufemia/extensions/vipps-wallet-button/VippsWalletButton'`,`import { VisibilityByTheme } from '@dnb/eufemia/shared'`],__buildScope:{Button:a},children:`<Button
  text="Primary button with text only"
  onClick={() => {
    console.log('onClick')
  }}
  data-visual-test="button-primary"
/>
`}),f=()=>(0,u.jsx)(c,{stableName:`ButtonSecondary`,sourceImports:[`import { bell_medium as Bell, question } from '@dnb/eufemia/icons'`,`import { Button, IconPrimary, Section } from '@dnb/eufemia'`,`import { VippsLogo } from '@dnb/eufemia/extensions/vipps-wallet-button/VippsWalletButton'`,`import { VisibilityByTheme } from '@dnb/eufemia/shared'`],__buildScope:{Button:a},children:`<Button
  variant="secondary"
  onClick={() => {
    console.log('onClick')
  }}
  data-visual-test="button-secondary"
>
  Secondary button with text only
</Button>
`}),p=()=>(0,u.jsx)(c,{"data-visual-test":`button-disabled`,stableName:`ButtonDisabled`,sourceImports:[`import { bell_medium as Bell, question } from '@dnb/eufemia/icons'`,`import { Button, IconPrimary, Section } from '@dnb/eufemia'`,`import { VippsLogo } from '@dnb/eufemia/extensions/vipps-wallet-button/VippsWalletButton'`,`import { VisibilityByTheme } from '@dnb/eufemia/shared'`],__buildScope:{Button:a},children:`
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

`}),m=()=>(0,u.jsx)(c,{scope:{question:i},"data-visual-test":`button-error`,stableName:`ButtonErrorState`,sourceImports:[`import { bell_medium as Bell, question } from '@dnb/eufemia/icons'`,`import { Button, IconPrimary, Section } from '@dnb/eufemia'`,`import { VippsLogo } from '@dnb/eufemia/extensions/vipps-wallet-button/VippsWalletButton'`,`import { VisibilityByTheme } from '@dnb/eufemia/shared'`],__buildScope:{Button:a},children:`
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

`}),h=()=>(0,u.jsx)(c,{stableName:`ButtonPrimaryWithIcon`,sourceImports:[`import { bell_medium as Bell, question } from '@dnb/eufemia/icons'`,`import { Button, IconPrimary, Section } from '@dnb/eufemia'`,`import { VippsLogo } from '@dnb/eufemia/extensions/vipps-wallet-button/VippsWalletButton'`,`import { VisibilityByTheme } from '@dnb/eufemia/shared'`],__buildScope:{Button:a},children:`<Button text="Primary button with icon" icon="chevron_right" />
`}),g=()=>(0,u.jsx)(c,{stableName:`ButtonPrimaryWithIconLeft`,sourceImports:[`import { bell_medium as Bell, question } from '@dnb/eufemia/icons'`,`import { Button, IconPrimary, Section } from '@dnb/eufemia'`,`import { VippsLogo } from '@dnb/eufemia/extensions/vipps-wallet-button/VippsWalletButton'`,`import { VisibilityByTheme } from '@dnb/eufemia/shared'`],__buildScope:{Button:a},children:`<Button iconPosition="left" icon="chevron_left">
  Primary button with icon on left
</Button>
`}),_=()=>(0,u.jsx)(c,{"data-visual-test":`button-tertiary-all`,stableName:`ButtonTertiary`,sourceImports:[`import { bell_medium as Bell, question } from '@dnb/eufemia/icons'`,`import { Button, IconPrimary, Section } from '@dnb/eufemia'`,`import { VippsLogo } from '@dnb/eufemia/extensions/vipps-wallet-button/VippsWalletButton'`,`import { VisibilityByTheme } from '@dnb/eufemia/shared'`],__buildScope:{Button:a},children:`
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

`}),v=()=>(0,u.jsx)(c,{"data-visual-test":`button-tertiary-top`,stableName:`ButtonTertiaryTop`,sourceImports:[`import { bell_medium as Bell, question } from '@dnb/eufemia/icons'`,`import { Button, IconPrimary, Section } from '@dnb/eufemia'`,`import { VippsLogo } from '@dnb/eufemia/extensions/vipps-wallet-button/VippsWalletButton'`,`import { VisibilityByTheme } from '@dnb/eufemia/shared'`],__buildScope:{Button:a},children:`
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

`}),y=()=>(0,u.jsx)(c,{"data-visual-test":`button-custom-content`,stableName:`ButtonCustomContent`,sourceImports:[`import { bell_medium as Bell, question } from '@dnb/eufemia/icons'`,`import { Button, IconPrimary, Section } from '@dnb/eufemia'`,`import { VippsLogo } from '@dnb/eufemia/extensions/vipps-wallet-button/VippsWalletButton'`,`import { VisibilityByTheme } from '@dnb/eufemia/shared'`],__buildScope:{Button:a,IconPrimary:r},children:`<Button
  icon="close"
  iconPosition="right"
  text="Button with custom content"
  customContent={<IconPrimary icon="check" right="small" />}
/>
`}),b=()=>(0,u.jsx)(c,{"data-visual-test":`button-tertiary-wrap`,stableName:`ButtonTertiaryWrap`,sourceImports:[`import { bell_medium as Bell, question } from '@dnb/eufemia/icons'`,`import { Button, IconPrimary, Section } from '@dnb/eufemia'`,`import { VippsLogo } from '@dnb/eufemia/extensions/vipps-wallet-button/VippsWalletButton'`,`import { VisibilityByTheme } from '@dnb/eufemia/shared'`],__buildScope:{Button:a},children:`<Button
  wrap
  variant="tertiary"
  text="A long text where wrap is enabled magnis rutrum netus neque ridiculus euismod sit dictum laoreet libero"
  icon="chevron_left"
  iconPosition="left"
/>
`}),x=()=>(0,u.jsx)(c,{"data-visual-test":`button-anchor`,stableName:`ButtonAnchor`,sourceImports:[`import { bell_medium as Bell, question } from '@dnb/eufemia/icons'`,`import { Button, IconPrimary, Section } from '@dnb/eufemia'`,`import { VippsLogo } from '@dnb/eufemia/extensions/vipps-wallet-button/VippsWalletButton'`,`import { VisibilityByTheme } from '@dnb/eufemia/shared'`],__buildScope:{Button:a},children:`
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

`}),S=()=>(0,u.jsx)(c,{scope:{question:i,VisibilityByTheme:s},"data-visual-test":`button-icons`,stableName:`ButtonIcon`,sourceImports:[`import { bell_medium as Bell, question } from '@dnb/eufemia/icons'`,`import { Button, IconPrimary, Section } from '@dnb/eufemia'`,`import { VippsLogo } from '@dnb/eufemia/extensions/vipps-wallet-button/VippsWalletButton'`,`import { VisibilityByTheme } from '@dnb/eufemia/shared'`],__buildScope:{Button:a},children:`
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

`}),C=()=>(0,u.jsx)(c,{"data-visual-test":`button-tertiary-no-icon`,stableName:`TertiaryWithNoIcon`,sourceImports:[`import { bell_medium as Bell, question } from '@dnb/eufemia/icons'`,`import { Button, IconPrimary, Section } from '@dnb/eufemia'`,`import { VippsLogo } from '@dnb/eufemia/extensions/vipps-wallet-button/VippsWalletButton'`,`import { VisibilityByTheme } from '@dnb/eufemia/shared'`],__buildScope:{Button:a},children:`<Button text="Tertiary button with no icon" variant="tertiary" />
`}),w=()=>(0,u.jsx)(c,{"data-visual-test":`button-unstyled`,stableName:`UnstyledVariant`,sourceImports:[`import { bell_medium as Bell, question } from '@dnb/eufemia/icons'`,`import { Button, IconPrimary, Section } from '@dnb/eufemia'`,`import { VippsLogo } from '@dnb/eufemia/extensions/vipps-wallet-button/VippsWalletButton'`,`import { VisibilityByTheme } from '@dnb/eufemia/shared'`],__buildScope:{Button:a},children:`<Button text="Unstyled button with icon" icon="bell" variant="unstyled" />
`}),T=()=>(0,u.jsx)(c,{scope:{Bell:n},stableName:`ButtonStretch`,sourceImports:[`import { bell_medium as Bell, question } from '@dnb/eufemia/icons'`,`import { Button, IconPrimary, Section } from '@dnb/eufemia'`,`import { VippsLogo } from '@dnb/eufemia/extensions/vipps-wallet-button/VippsWalletButton'`,`import { VisibilityByTheme } from '@dnb/eufemia/shared'`],__buildScope:{Button:a},children:`<Button
  text="A stretched button"
  icon={<Bell />}
  size="large"
  data-visual-test="button-stretch"
/>
`}),E=()=>(0,u.jsx)(c,{scope:{Bell:n},hideCode:!0,stableName:`PrimaryButtonSizes`,sourceImports:[`import { bell_medium as Bell, question } from '@dnb/eufemia/icons'`,`import { Button, IconPrimary, Section } from '@dnb/eufemia'`,`import { VippsLogo } from '@dnb/eufemia/extensions/vipps-wallet-button/VippsWalletButton'`,`import { VisibilityByTheme } from '@dnb/eufemia/shared'`],__buildScope:{Button:a},children:`
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

`}),D=()=>(0,u.jsx)(c,{scope:{Bell:n},hideCode:!0,stableName:`SecondaryButtonSizes`,sourceImports:[`import { bell_medium as Bell, question } from '@dnb/eufemia/icons'`,`import { Button, IconPrimary, Section } from '@dnb/eufemia'`,`import { VippsLogo } from '@dnb/eufemia/extensions/vipps-wallet-button/VippsWalletButton'`,`import { VisibilityByTheme } from '@dnb/eufemia/shared'`],__buildScope:{Button:a},children:`
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

`}),O=()=>(0,u.jsx)(c,{scope:{Bell:n},hideCode:!0,stableName:`TertiaryButtonSizes`,sourceImports:[`import { bell_medium as Bell, question } from '@dnb/eufemia/icons'`,`import { Button, IconPrimary, Section } from '@dnb/eufemia'`,`import { VippsLogo } from '@dnb/eufemia/extensions/vipps-wallet-button/VippsWalletButton'`,`import { VisibilityByTheme } from '@dnb/eufemia/shared'`],__buildScope:{Button:a},children:`
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

`}),k=()=>(0,u.jsx)(c,{hideCode:!0,stableName:`IconButtonSizes`,sourceImports:[`import { bell_medium as Bell, question } from '@dnb/eufemia/icons'`,`import { Button, IconPrimary, Section } from '@dnb/eufemia'`,`import { VippsLogo } from '@dnb/eufemia/extensions/vipps-wallet-button/VippsWalletButton'`,`import { VisibilityByTheme } from '@dnb/eufemia/shared'`],__buildScope:{Button:a},children:`
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

`}),A=()=>(0,u.jsx)(c,{"data-visual-test":`button-tertiary-alignment`,stableName:`TertiaryButtonAlignment`,sourceImports:[`import { bell_medium as Bell, question } from '@dnb/eufemia/icons'`,`import { Button, IconPrimary, Section } from '@dnb/eufemia'`,`import { VippsLogo } from '@dnb/eufemia/extensions/vipps-wallet-button/VippsWalletButton'`,`import { VisibilityByTheme } from '@dnb/eufemia/shared'`],__buildScope:{Button:a},children:`
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

`}),j=()=>(0,u.jsx)(c,{stableName:`ButtonOnDarkSurface`,sourceImports:[`import { bell_medium as Bell, question } from '@dnb/eufemia/icons'`,`import { Button, IconPrimary, Section } from '@dnb/eufemia'`,`import { VippsLogo } from '@dnb/eufemia/extensions/vipps-wallet-button/VippsWalletButton'`,`import { VisibilityByTheme } from '@dnb/eufemia/shared'`],__buildScope:{Section:o,Button:a},children:`<Section
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
    right
  >
    Tertiary button
  </Button>
  <Button
    data-visual-test="button-tertiary-icon-on-dark"
    variant="tertiary"
    icon="bell"
  />
</Section>
`}),M=()=>(0,u.jsx)(c,{hideCode:!0,scope:{VippsLogo:l},stableName:`SvgInButton`,sourceImports:[`import { bell_medium as Bell, question } from '@dnb/eufemia/icons'`,`import { Button, IconPrimary, Section } from '@dnb/eufemia'`,`import { VippsLogo } from '@dnb/eufemia/extensions/vipps-wallet-button/VippsWalletButton'`,`import { VisibilityByTheme } from '@dnb/eufemia/shared'`],__buildScope:{Button:a},noInline:!0,children:`render(
  <Button variant="secondary">
    Button with SVG <VippsLogo />
  </Button>
)
`});export{w as S,D as _,S as a,O as b,h as c,T as d,_ as f,E as g,k as h,m as i,g as l,b as m,y as n,j as o,v as p,p as r,d as s,x as t,f as u,M as v,C as x,A as y};