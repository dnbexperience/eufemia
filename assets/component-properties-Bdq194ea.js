import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{t as n}from"./Icon-DjY-LVpV.js";import{t as r}from"./Button-CMFzxkr4.js";import{J as i,W as a}from"./index-D7e1avVt.js";import{t as o}from"./ComponentBox-CE7bpcJy.js";var s=e(t()),c=()=>(0,s.jsx)(o,{stableName:`LargeButtonsAndIconsExample`,sourceImports:[`import { Button, Icon } from '@dnb/eufemia'`,`import styled from '@emotion/styled'`,`import { hamburger as hamburgerIcon } from '@dnb/eufemia/icons'`],__buildScope:{Button:r},children:`
<Button
  variant="secondary"
  text="Secondary Button"
  icon="chevron_right_medium"
  size="large"
/>
<Button icon="chevron_right" iconSize="medium" size="large" />

`}),l=()=>(0,s.jsx)(o,{scope:{hamburgerIcon:i},stableName:`ExtendedExample`,sourceImports:[`import { Button, Icon } from '@dnb/eufemia'`,`import styled from '@emotion/styled'`,`import { hamburger as hamburgerIcon } from '@dnb/eufemia/icons'`],__buildScope:{Button:r,Icon:n},noInline:!0,children:`const Wrapper = styled.div\`
  .dnb-button {
    --button-width: 4rem;
    --button-height: 4rem;
    --button-border-radius: 2rem;
    svg {
      color: fuchsia;
    }
  }
\`
const myHandler = () => alert('Hello')
render(
  <Wrapper>
    <Button
      variant="secondary"
      icon={hamburgerIcon}
      size="default"
      onClick={myHandler}
    />
    <Button variant="secondary" size="default" onClick={myHandler}>
      <Icon icon={hamburgerIcon} />
    </Button>
  </Wrapper>
)
`});function u(e){let t={a:`a`,code:`code`,h1:`h1`,h2:`h2`,p:`p`,strong:`strong`,...a(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.h1,{children:`Component Properties`}),`
`,(0,s.jsxs)(t.p,{children:[`Every `,(0,s.jsx)(t.a,{href:`/uilib/components`,children:`Component`}),` has its own `,(0,s.jsx)(t.code,{children:`properties`}),` to make them work for a variety of cases. You may have a look at the table describing all the possibilities. Check out for example the `,(0,s.jsx)(t.a,{href:`/uilib/components/button/properties`,children:`Button Properties`}),`.`]}),`
`,(0,s.jsx)(t.h2,{children:`Naming`}),`
`,(0,s.jsxs)(t.p,{children:[`Both the properties- and event names should use `,(0,s.jsx)(t.strong,{children:`camelCase`}),` to support a universal `,(0,s.jsx)(t.a,{href:`/contribute/style-guides/naming`,children:`naming convention`}),`.`]}),`
`,(0,s.jsx)(t.h2,{children:`Large Buttons & Icons`}),`
`,(0,s.jsx)(t.p,{children:`Below are some examples. You can even modify them right away in the Browser.`}),`
`,(0,s.jsx)(c,{}),`
`,(0,s.jsx)(t.h2,{children:`Extended example`}),`
`,(0,s.jsx)(l,{})]})}function d(e={}){let{wrapper:t}={...a(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(u,{...e})}):u(e)}export{d as default};