import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{H as n,_ as r,t as i}from"./Anchor-9saPtqqX.js";import{t as a}from"./Button-B0t-0slw.js";import{t as o}from"./P-BqMs-VnB.js";import{t as s}from"./H2-BUc7e5iR.js";import{t as c}from"./Section-rdyRjaib.js";import{K as l,N as u,m as d}from"./index-Bx3ttow-.js";import{t as f}from"./ComponentBox-CG7uqrFy.js";var p=e(t()),m=d.div`
  [data-visual-test-wrapper] {
    margin: 0;
  }
`,h=d.div`
  padding: 0.5rem 0;

  html[data-visual-test] & {
    padding: 0.25rem 0;
  }

  h2 {
    margin: 0 !important;
  }
`,g=()=>(0,p.jsx)(m,{children:(0,p.jsx)(f,{"data-visual-test":`anchor-basic`,stableName:`AnchorBasicUse`,sourceImports:[`import styled from '@emotion/styled'`,`import { Section, Anchor, IconPrimary, H2, P } from '@dnb/eufemia'`,`import { Theme } from '@dnb/eufemia/shared'`],__buildScope:{P:o,Anchor:i},children:`<P>
  This is a regular paragraph with a{' '}
  <Anchor href="https://dnb.no/">link to a website</Anchor> in the middle
  of some text.
</P>
`})}),_=()=>(0,p.jsx)(m,{children:(0,p.jsx)(f,{"data-visual-test":`anchor-in-section`,stableName:`AnchorExampleInSection`,sourceImports:[`import styled from '@emotion/styled'`,`import { Section, Anchor, IconPrimary, H2, P } from '@dnb/eufemia'`,`import { Theme } from '@dnb/eufemia/shared'`],__buildScope:{Section:c,Anchor:i},children:`<Section
  innerSpace={{
    block: 'large',
  }}
>
  <Anchor className="dnb-anchor--no-underline" href="https://dnb.no/">
    Anchor in Section without underline
  </Anchor>
</Section>
`})}),v=()=>(0,p.jsx)(m,{children:(0,p.jsx)(f,{hideCode:!0,scope:{Example:h},stableName:`AnchorDarkSurfaceExample`,sourceImports:[`import styled from '@emotion/styled'`,`import { Section, Anchor, IconPrimary, H2, P } from '@dnb/eufemia'`,`import { Theme } from '@dnb/eufemia/shared'`],__buildScope:{Section:c,Anchor:i},children:`<Section surface="dark" innerSpace data-visual-test="anchor-surface-dark">
  <Anchor href="/uilib/components/anchor">Dark surface style</Anchor>
</Section>
`})}),y=()=>(0,p.jsx)(m,{children:(0,p.jsx)(f,{scope:{Example:h},"data-visual-test":`anchor-states`,hideCode:!0,stableName:`AnchorExampleStates`,sourceImports:[`import styled from '@emotion/styled'`,`import { Section, Anchor, IconPrimary, H2, P } from '@dnb/eufemia'`,`import { Theme } from '@dnb/eufemia/shared'`],__buildScope:{Anchor:i},children:`
<Example>
  <Anchor href="/uilib/components/anchor">Default Style</Anchor>
</Example>
<Example>
  <Anchor href="/uilib/components/anchor" className="dnb-anchor--hover">
    Hover Style
  </Anchor>
</Example>
<Example>
  <Anchor href="/uilib/components/anchor" className="dnb-anchor--active">
    Active Style
  </Anchor>
</Example>
<Example>
  <Anchor href="/uilib/components/anchor" className="dnb-anchor--focus">
    Focus Style
  </Anchor>
</Example>

`})}),b=()=>(0,p.jsx)(m,{children:(0,p.jsx)(f,{hideCode:!0,scope:{Example:h},stableName:`AnchorExampleHelperClasses`,sourceImports:[`import styled from '@emotion/styled'`,`import { Section, Anchor, IconPrimary, H2, P } from '@dnb/eufemia'`,`import { Theme } from '@dnb/eufemia/shared'`],__buildScope:{Anchor:i,Button:a,Skeleton:u},children:`
<Example>
  <Anchor
    href="/uilib/components/anchor"
    className="dnb-anchor--no-underline"
  >
    No underline
  </Anchor>
</Example>
<Example data-visual-test="anchor-no-icon">
  <Anchor
    target="_blank"
    href="/uilib/components/anchor"
    className="dnb-anchor--no-icon"
  >
    Blank target without launch icon
  </Anchor>
</Example>
<Example data-visual-test="anchor-no-hover">
  <Anchor
    href="/uilib/components/anchor"
    className="dnb-anchor--no-hover"
  >
    No hover
  </Anchor>
</Example>
<Example>
  <Anchor
    href="/uilib/components/anchor"
    className="dnb-anchor--no-radius"
  >
    No border-radius
  </Anchor>
</Example>
<Example>
  <Anchor
    href="/uilib/components/anchor"
    className="dnb-anchor--no-animation"
  >
    No animation
  </Anchor>
</Example>
<Example data-visual-test="anchor-no-style">
  <Anchor
    href="/uilib/components/anchor"
    className="dnb-anchor--no-style"
  >
    Reset anchor style
  </Anchor>
</Example>
<Example>
  <button className="dnb-anchor">I'm a Button!</button>
</Example>
<Example data-visual-test="anchor-newline">
  <Anchor href="/uilib/components/anchor">
    Newline <br />
    Newline
  </Anchor>
</Example>
<Example data-visual-test="anchor-skeleton">
  <Anchor skeleton href="/uilib/components/anchor">
    Skeleton
  </Anchor>
</Example>

`})}),x=()=>(0,p.jsx)(m,{children:(0,p.jsx)(f,{"data-visual-test":`anchor-disabled`,stableName:`AnchorExampleDisabled`,sourceImports:[`import styled from '@emotion/styled'`,`import { Section, Anchor, IconPrimary, H2, P } from '@dnb/eufemia'`,`import { Theme } from '@dnb/eufemia/shared'`],__buildScope:{Anchor:i},children:`<Anchor
  href="/uilib/components/anchor"
  disabled
  tooltip="This is disabled because ..."
>
  Disabled link
</Anchor>
`})}),S=()=>(0,p.jsx)(m,{children:(0,p.jsx)(f,{hideCode:!0,scope:{Example:h},stableName:`AnchorExampleHelperContrastVariations`,sourceImports:[`import styled from '@emotion/styled'`,`import { Section, Anchor, IconPrimary, H2, P } from '@dnb/eufemia'`,`import { Theme } from '@dnb/eufemia/shared'`],__buildScope:{Theme:n,Section:c,Anchor:i},children:`<Theme.Context surface="dark">
  <Example>
    <Section
      surface="dark"
      innerSpace
      data-visual-test="anchor-contrast-no-hover"
    >
      <Anchor
        href="/uilib/components/anchor"
        className="dnb-anchor--no-hover"
      >
        Dark surface - no hover
      </Anchor>
    </Section>
  </Example>
  <Example>
    <Section
      surface="dark"
      innerSpace
      data-visual-test="anchor-contrast-no-radius"
    >
      <Anchor
        href="/uilib/components/anchor"
        className="dnb-anchor--no-radius"
      >
        Dark surface - no radius
      </Anchor>
    </Section>
  </Example>
  <Example>
    <Section
      surface="dark"
      innerSpace
      data-visual-test="anchor-contrast-no-underline"
    >
      <Anchor
        href="/uilib/components/anchor"
        className="dnb-anchor--no-underline"
      >
        Dark surface - no underline
      </Anchor>
    </Section>
  </Example>
  <Example>
    <Section
      surface="dark"
      innerSpace
      data-visual-test="anchor-contrast-no-underline-no-hover"
    >
      <Anchor
        href="/uilib/components/anchor"
        className="dnb-anchor--no-underline dnb-anchor--no-hover"
      >
        Dark surface - no underline - no hover
      </Anchor>
    </Section>
  </Example>
  <Example>
    <Section
      surface="dark"
      innerSpace
      data-visual-test="anchor-contrast-no-underline-no-radius"
    >
      <Anchor
        href="/uilib/components/anchor"
        className="dnb-anchor--no-underline dnb-anchor--no-radius"
      >
        Dark surface - no underline - no radius
      </Anchor>
    </Section>
  </Example>
</Theme.Context>
`})}),C=()=>(0,p.jsx)(m,{children:(0,p.jsx)(f,{hideCode:!0,scope:{Example:h},stableName:`AnchorExampleIcons`,sourceImports:[`import styled from '@emotion/styled'`,`import { Section, Anchor, IconPrimary, H2, P } from '@dnb/eufemia'`,`import { Theme } from '@dnb/eufemia/shared'`],__buildScope:{Anchor:i,IconPrimary:r,P:o},children:`
<Example data-visual-test="anchor-icon-right">
  <Anchor
    href="/uilib/components/anchor"
    icon="arrow_right"
    iconPosition="right"
  >
    Anchor with icon right
  </Anchor>
</Example>
<Example data-visual-test="anchor-icon-left">
  <Anchor href="/uilib/components/anchor" icon="chevron_right">
    Anchor with icon left
  </Anchor>
</Example>
<Example data-visual-test="anchor-icon-node">
  <Anchor
    href="/uilib/components/anchor"
    icon={<IconPrimary icon="question" />}
  >
    Anchor with icon left using a html/react element
  </Anchor>
</Example>
<Example data-visual-test="anchor-paragraph">
  <P>
    A text paragraph with an{' '}
    <Anchor
      href="/uilib/components/anchor"
      icon="bell"
      iconPosition="right"
      className="dnb-anchor--inline"
    >
      anchor with icon
    </Anchor>{' '}
    in it.
  </P>
</Example>

`})}),w=()=>(0,p.jsx)(m,{children:(0,p.jsx)(f,{hideCode:!0,scope:{Example:h},stableName:`AnchorTargetBlank`,sourceImports:[`import styled from '@emotion/styled'`,`import { Section, Anchor, IconPrimary, H2, P } from '@dnb/eufemia'`,`import { Theme } from '@dnb/eufemia/shared'`],__buildScope:{Anchor:i},children:`
<Example data-visual-test="anchor-blank">
  <Anchor target="_blank" href="/uilib/components/anchor">
    Blank target with https
  </Anchor>
</Example>
<Example>
  <Anchor
    target="_blank"
    href="/uilib/components/anchor"
    icon="arrow_right"
    iconPosition="right"
  >
    Blank target with different launch icon
  </Anchor>
</Example>
<Example data-visual-test="anchor-blank-icon-left">
  <Anchor
    target="_blank"
    href="/uilib/components/anchor"
    icon="bell"
    iconPosition="left"
  >
    Blank target with icon to the left
  </Anchor>
</Example>

`})}),T=()=>(0,p.jsx)(m,{children:(0,p.jsx)(f,{hideCode:!0,scope:{Example:h},"data-visual-test":`anchor-protocol`,stableName:`AnchorProtocol`,sourceImports:[`import styled from '@emotion/styled'`,`import { Section, Anchor, IconPrimary, H2, P } from '@dnb/eufemia'`,`import { Theme } from '@dnb/eufemia/shared'`],__buildScope:{Anchor:i},children:`
<Example>
  <Anchor target="_blank" href="mailto:john.doe@email.com">
    Send a mail to: john.doe@email.com
  </Anchor>
</Example>
<Example>
  <Anchor target="_blank" href="tel:12345678">
    Make a phone call to: 12345678
  </Anchor>
</Example>
<Example>
  <Anchor target="_blank" href="sms:12345678">
    Send an SMS to: 12345678
  </Anchor>
</Example>

`})}),E=()=>(0,p.jsx)(m,{children:(0,p.jsx)(f,{hideCode:!0,scope:{Example:h},stableName:`AnchorExampleHeadings`,sourceImports:[`import styled from '@emotion/styled'`,`import { Section, Anchor, IconPrimary, H2, P } from '@dnb/eufemia'`,`import { Theme } from '@dnb/eufemia/shared'`],__buildScope:{H2:s,Anchor:i},children:`
<Example data-visual-test="anchor-heading">
  <H2>
    <Anchor
      href="/uilib/components/anchor"
      icon="bell"
      iconPosition="right"
    >
      Inside Headings
    </Anchor>{' '}
    H2
  </H2>
</Example>
<Example data-visual-test="anchor-heading-blank">
  <H2>
    <Anchor target="_blank" href="/uilib/components/anchor">
      Blank target in headings
    </Anchor>{' '}
    H2
  </H2>
</Example>

`})}),D=()=>(0,p.jsx)(p.Fragment,{children:`|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​`}),O=()=>(0,p.jsx)(m,{children:(0,p.jsx)(f,{hideCode:!0,scope:{Example:h,WidthMarkers:D},stableName:`AnchorIconWordBreak`,sourceImports:[`import styled from '@emotion/styled'`,`import { Section, Anchor, IconPrimary, H2, P } from '@dnb/eufemia'`,`import { Theme } from '@dnb/eufemia/shared'`],__buildScope:{P:o,Anchor:i},children:`<Example data-visual-test="anchor-icon-break">
  <P>
    Some space{' '}
    <Anchor
      href="/uilib/components/anchor"
      icon="bell"
      className="dnb-anchor--inline"
    >
      wordAttachedToIcon longFinalWord
    </Anchor>{' '}
    <WidthMarkers />
  </P>

  <P>
    Some{' '}
    <Anchor
      href="/uilib/components/anchor"
      icon="bell"
      iconPosition="right"
      className="dnb-anchor--inline"
    >
      space wordAttachedToIcon
    </Anchor>{' '}
    longFinalWord <WidthMarkers />
  </P>
</Example>
`})}),k=()=>(0,p.jsx)(m,{children:(0,p.jsx)(f,{hideCode:!0,scope:{Example:h},stableName:`AnchorNoIconAndNoLaunchIcon`,sourceImports:[`import styled from '@emotion/styled'`,`import { Section, Anchor, IconPrimary, H2, P } from '@dnb/eufemia'`,`import { Theme } from '@dnb/eufemia/shared'`],__buildScope:{Anchor:i},children:`
<Example data-visual-test="anchor-no-icon-prop">
  <Anchor href="/uilib/components/anchor" noIcon icon="bell">
    Anchor without icon
  </Anchor>
</Example>
<Example data-visual-test="anchor-no-launch-icon-prop">
  <Anchor target="_blank" href="/uilib/components/anchor" noLaunchIcon>
    Blank target without launch icon
  </Anchor>
</Example>

`})});function A(e){let t={code:`code`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,ul:`ul`,...l(),...e.components},{VisibilityByTheme:n,VisibleWhenVisualTest:r}=t;return n||M(`VisibilityByTheme`,!0),r||M(`VisibleWhenVisualTest`,!0),(0,p.jsxs)(p.Fragment,{children:[(0,p.jsx)(t.h2,{children:`Demos`}),`
`,(0,p.jsx)(t.h3,{children:`Basic usage`}),`
`,(0,p.jsxs)(t.p,{children:[`The basic use of `,(0,p.jsx)(t.code,{children:`<Anchor>`}),` is identical to the `,(0,p.jsx)(t.code,{children:`<a>`}),` tag.`]}),`
`,(0,p.jsx)(g,{}),`
`,(0,p.jsx)(t.h3,{children:`With icon`}),`
`,(0,p.jsxs)(t.p,{children:[`Icons can be added with the `,(0,p.jsx)(t.code,{children:`icon`}),` and `,(0,p.jsx)(t.code,{children:`iconPosition`}),` properties. Normally by sending in the name if an icon, but it is also possible to send in html/react code (normally for custom svg).`]}),`
`,(0,p.jsx)(n,{visible:`sbanken`,children:(0,p.jsxs)(t.p,{children:[`For Sbanken, links with icons have a slightly different styling that is
not intended to be used in a regular paragraph. The class
`,(0,p.jsx)(t.code,{children:`.dnb-anchor--inline`}),` can be used to force default styling even if there
is an icon.`]})}),`
`,(0,p.jsx)(C,{}),`
`,(0,p.jsx)(t.h3,{children:`On dark surface`}),`
`,(0,p.jsx)(v,{}),`
`,(0,p.jsx)(t.h3,{children:`Additional Anchor helper classes`}),`
`,(0,p.jsx)(t.p,{children:`To force a specific state of style, use the following classes to do so:`}),`
`,(0,p.jsx)(b,{}),`
`,(0,p.jsx)(t.h3,{children:`Anchor modifier properties`}),`
`,(0,p.jsxs)(t.ul,{children:[`
`,(0,p.jsxs)(t.li,{children:[(0,p.jsx)(t.code,{children:`noAnimation`}),` - `,(0,p.jsx)(`a`,{href:`/uilib/components/anchor`,className:`dnb-anchor dnb-anchor--no-animation`,children:`No Animation`})]}),`
`,(0,p.jsxs)(t.li,{children:[(0,p.jsx)(t.code,{children:`noStyle`}),` - `,(0,p.jsx)(`a`,{href:`/uilib/components/anchor`,className:`dnb-anchor dnb-anchor--no-style`,children:`No Style`})]}),`
`,(0,p.jsxs)(t.li,{children:[(0,p.jsx)(t.code,{children:`noHover`}),` - `,(0,p.jsx)(`a`,{href:`/uilib/components/anchor`,className:`dnb-anchor dnb-anchor--no-hover`,children:`No Hover`})]}),`
`,(0,p.jsxs)(t.li,{children:[(0,p.jsx)(t.code,{children:`noUnderline`}),` - `,(0,p.jsx)(`a`,{href:`/uilib/components/anchor`,className:`dnb-anchor dnb-anchor--no-underline`,children:`No Underline`})]}),`
`]}),`
`,(0,p.jsxs)(t.h3,{children:[`Anchor with `,(0,p.jsx)(t.code,{children:`target="_blank"`})]}),`
`,(0,p.jsx)(t.p,{children:`If the link opens a new window it will automatically get an icon to indicate this.`}),`
`,(0,p.jsx)(w,{}),`
`,(0,p.jsxs)(t.p,{children:[`Unless the href contains `,(0,p.jsx)(t.code,{children:`:mailto`}),`, `,(0,p.jsx)(t.code,{children:`:tel`}),` or `,(0,p.jsx)(t.code,{children:`:sms`}),`.`]}),`
`,(0,p.jsx)(T,{}),`
`,(0,p.jsx)(t.h3,{children:`Anchor in headings`}),`
`,(0,p.jsx)(E,{}),`
`,(0,p.jsx)(t.h3,{children:`Anchor in Section`}),`
`,(0,p.jsx)(_,{}),`
`,(0,p.jsxs)(r,{children:[(0,p.jsx)(y,{}),(0,p.jsx)(S,{}),(0,p.jsx)(O,{}),(0,p.jsx)(k,{}),(0,p.jsx)(x,{})]})]})}function j(e={}){let{wrapper:t}={...l(),...e.components};return t?(0,p.jsx)(t,{...e,children:(0,p.jsx)(A,{...e})}):A(e)}function M(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{j as default};