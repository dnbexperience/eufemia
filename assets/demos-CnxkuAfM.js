import"./rolldown-runtime-BYbx6iT9.js";import{n as e,t}from"./jsx-runtime-BgMs7Gb-.js";import{t as n}from"./ComponentBox-geTEYZ7b.js";import{Rr as r,a as i}from"./index-CMgyXmp3.js";e();var a=t(),o=i.div`
  [data-visual-test-wrapper] {
    margin: 0;
  }
`,s=i.div`
  padding: 0.5rem 0;

  html[data-visual-test] & {
    padding: 0.25rem 0;
  }

  h2 {
    margin: 0 !important;
  }
`,c=()=>(0,a.jsx)(o,{children:(0,a.jsx)(n,{"data-visual-test":`anchor-basic`,children:`<P>
  This is a regular paragraph with a{' '}
  <Anchor href="https://dnb.no/">link to a website</Anchor> in the middle
  of some text.
</P>
`})}),l=()=>(0,a.jsx)(o,{children:(0,a.jsx)(n,{"data-visual-test":`anchor-in-section`,children:`<Section
  innerSpace={{
    block: 'large',
  }}
>
  <Anchor className="dnb-anchor--no-underline" href="https://dnb.no/">
    Anchor in Section without underline
  </Anchor>
</Section>
`})}),u=()=>(0,a.jsx)(o,{children:(0,a.jsx)(n,{hideCode:!0,scope:{Example:s},children:`<Section surface="dark" innerSpace data-visual-test="anchor-surface-dark">
  <Anchor href="/uilib/components/anchor">Dark surface style</Anchor>
</Section>
`})}),d=()=>(0,a.jsx)(o,{children:(0,a.jsx)(n,{scope:{Example:s},"data-visual-test":`anchor-states`,hideCode:!0,children:`
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

`})}),f=()=>(0,a.jsx)(o,{children:(0,a.jsx)(n,{hideCode:!0,scope:{Example:s},children:`
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

`})}),p=()=>(0,a.jsx)(o,{children:(0,a.jsx)(n,{"data-visual-test":`anchor-disabled`,children:`<Anchor
  href="/uilib/components/anchor"
  disabled
  tooltip="This is disabled because ..."
>
  Disabled link
</Anchor>
`})}),m=()=>(0,a.jsx)(o,{children:(0,a.jsx)(n,{hideCode:!0,scope:{Example:s},children:`<Theme.Context surface="dark">
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
`})}),h=()=>(0,a.jsx)(o,{children:(0,a.jsx)(n,{hideCode:!0,scope:{Example:s},children:`
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

`})}),g=()=>(0,a.jsx)(o,{children:(0,a.jsx)(n,{hideCode:!0,scope:{Example:s},children:`
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

`})}),_=()=>(0,a.jsx)(o,{children:(0,a.jsx)(n,{hideCode:!0,scope:{Example:s},"data-visual-test":`anchor-protocol`,children:`
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

`})}),v=()=>(0,a.jsx)(o,{children:(0,a.jsx)(n,{hideCode:!0,scope:{Example:s},children:`
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

`})}),y=()=>(0,a.jsx)(a.Fragment,{children:`|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​|​`}),b=()=>(0,a.jsx)(o,{children:(0,a.jsx)(n,{hideCode:!0,scope:{Example:s,WidthMarkers:y},children:`<Example data-visual-test="anchor-icon-break">
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
`})}),x=()=>(0,a.jsx)(o,{children:(0,a.jsx)(n,{hideCode:!0,scope:{Example:s},children:`
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

`})});function S(e){let t={code:`code`,h2:`h2`,h3:`h3`,li:`li`,p:`p`,ul:`ul`,...r(),...e.components},{VisibilityByTheme:n,VisibleWhenVisualTest:i}=t;return n||w(`VisibilityByTheme`,!0),i||w(`VisibleWhenVisualTest`,!0),(0,a.jsxs)(a.Fragment,{children:[(0,a.jsx)(t.h2,{children:`Demos`}),`
`,(0,a.jsx)(t.h3,{children:`Basic usage`}),`
`,(0,a.jsxs)(t.p,{children:[`The basic use of `,(0,a.jsx)(t.code,{children:`<Anchor>`}),` is identical to the `,(0,a.jsx)(t.code,{children:`<a>`}),` tag.`]}),`
`,(0,a.jsx)(c,{}),`
`,(0,a.jsx)(t.h3,{children:`With icon`}),`
`,(0,a.jsxs)(t.p,{children:[`Icons can be added with the `,(0,a.jsx)(t.code,{children:`icon`}),` and `,(0,a.jsx)(t.code,{children:`iconPosition`}),` properties. Normally by sending in the name if an icon, but it is also possible to send in html/react code (normally for custom svg).`]}),`
`,(0,a.jsx)(n,{visible:`sbanken`,children:(0,a.jsxs)(t.p,{children:[`For Sbanken, links with icons have a slightly different styling that is
not intended to be used in a regular paragraph. The class
`,(0,a.jsx)(t.code,{children:`.dnb-anchor--inline`}),` can be used to force default styling even if there
is an icon.`]})}),`
`,(0,a.jsx)(h,{}),`
`,(0,a.jsx)(t.h3,{children:`On dark surface`}),`
`,(0,a.jsx)(u,{}),`
`,(0,a.jsx)(t.h3,{children:`Additional Anchor helper classes`}),`
`,(0,a.jsx)(t.p,{children:`To force a specific state of style, use the following classes to do so:`}),`
`,(0,a.jsx)(f,{}),`
`,(0,a.jsx)(t.h3,{children:`Anchor modifier properties`}),`
`,(0,a.jsxs)(t.ul,{children:[`
`,(0,a.jsxs)(t.li,{children:[(0,a.jsx)(t.code,{children:`noAnimation`}),` - `,(0,a.jsx)(`a`,{href:`/uilib/components/anchor`,className:`dnb-anchor dnb-anchor--no-animation`,children:`No Animation`})]}),`
`,(0,a.jsxs)(t.li,{children:[(0,a.jsx)(t.code,{children:`noStyle`}),` - `,(0,a.jsx)(`a`,{href:`/uilib/components/anchor`,className:`dnb-anchor dnb-anchor--no-style`,children:`No Style`})]}),`
`,(0,a.jsxs)(t.li,{children:[(0,a.jsx)(t.code,{children:`noHover`}),` - `,(0,a.jsx)(`a`,{href:`/uilib/components/anchor`,className:`dnb-anchor dnb-anchor--no-hover`,children:`No Hover`})]}),`
`,(0,a.jsxs)(t.li,{children:[(0,a.jsx)(t.code,{children:`noUnderline`}),` - `,(0,a.jsx)(`a`,{href:`/uilib/components/anchor`,className:`dnb-anchor dnb-anchor--no-underline`,children:`No Underline`})]}),`
`]}),`
`,(0,a.jsxs)(t.h3,{children:[`Anchor with `,(0,a.jsx)(t.code,{children:`target="_blank"`})]}),`
`,(0,a.jsx)(t.p,{children:`If the link opens a new window it will automatically get an icon to indicate this.`}),`
`,(0,a.jsx)(g,{}),`
`,(0,a.jsxs)(t.p,{children:[`Unless the href contains `,(0,a.jsx)(t.code,{children:`:mailto`}),`, `,(0,a.jsx)(t.code,{children:`:tel`}),` or `,(0,a.jsx)(t.code,{children:`:sms`}),`.`]}),`
`,(0,a.jsx)(_,{}),`
`,(0,a.jsx)(t.h3,{children:`Anchor in headings`}),`
`,(0,a.jsx)(v,{}),`
`,(0,a.jsx)(t.h3,{children:`Anchor in Section`}),`
`,(0,a.jsx)(l,{}),`
`,(0,a.jsxs)(i,{children:[(0,a.jsx)(d,{}),(0,a.jsx)(m,{}),(0,a.jsx)(b,{}),(0,a.jsx)(x,{}),(0,a.jsx)(p,{})]})]})}function C(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,a.jsx)(t,{...e,children:(0,a.jsx)(S,{...e})}):S(e)}function w(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{C as default};