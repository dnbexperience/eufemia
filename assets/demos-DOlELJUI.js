import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{t as n}from"./Anchor-VfvEVqst.js";import{t as r}from"./Icon-DjY-LVpV.js";import{a as i,i as a,n as o,r as s,t as c}from"./FormStatus-DyD2Q-ji.js";import{M as l}from"./Autocomplete-NmPCgejB.js";import{t as u}from"./Link-CbyKMXKy.js";import{t as d}from"./export-BnZzhjZv.js";import{W as f}from"./index-D7e1avVt.js";import{t as p}from"./ComponentBox-CE7bpcJy.js";var m=e(t()),h=()=>(0,m.jsx)(p,{"data-visual-test":`form-status`,stableName:`FormStatusDefault`,sourceImports:[`import { useState } from 'react'`,`import { InfoIcon, WarnIcon, ErrorIcon, MarketingIcon } from '@dnb/eufemia/components/form-status/FormStatus'`,`import { FormStatus, Icon, Input, ToggleButton, Link, Grid, Anchor } from '@dnb/eufemia'`,`import { Provider } from '@dnb/eufemia/shared'`],__buildScope:{FormStatus:o},children:`<FormStatus text="Failure text" />
`}),g=()=>(0,m.jsx)(p,{"data-visual-test":`form-status-information`,stableName:`FormStatusWithInformation`,sourceImports:[`import { useState } from 'react'`,`import { InfoIcon, WarnIcon, ErrorIcon, MarketingIcon } from '@dnb/eufemia/components/form-status/FormStatus'`,`import { FormStatus, Icon, Input, ToggleButton, Link, Grid, Anchor } from '@dnb/eufemia'`,`import { Provider } from '@dnb/eufemia/shared'`],__buildScope:{FormStatus:o},children:`<FormStatus
  title="Hover title"
  text="Long info nisl tempus hendrerit tortor dapibus nascetur taciti porta risus cursus fusce platea enim curabitur proin nibh ut luctus magnis metus"
  state="information"
/>
`}),_=()=>(0,m.jsx)(p,{"data-visual-test":`form-status-stretch`,stableName:`FormStatusWithStretch`,sourceImports:[`import { useState } from 'react'`,`import { InfoIcon, WarnIcon, ErrorIcon, MarketingIcon } from '@dnb/eufemia/components/form-status/FormStatus'`,`import { FormStatus, Icon, Input, ToggleButton, Link, Grid, Anchor } from '@dnb/eufemia'`,`import { Provider } from '@dnb/eufemia/shared'`],__buildScope:{FormStatus:o},children:`<FormStatus
  stretch={true}
  text="Long info nisl tempus hendrerit tortor dapibus nascetur taciti porta risus cursus fusce platea enim curabitur proin nibh ut luctus magnis metus"
  state="warning"
/>
`}),v=()=>(0,m.jsx)(p,{"data-visual-test":`form-status-warning`,stableName:`FormStatusWithWarning`,sourceImports:[`import { useState } from 'react'`,`import { InfoIcon, WarnIcon, ErrorIcon, MarketingIcon } from '@dnb/eufemia/components/form-status/FormStatus'`,`import { FormStatus, Icon, Input, ToggleButton, Link, Grid, Anchor } from '@dnb/eufemia'`,`import { Provider } from '@dnb/eufemia/shared'`],__buildScope:{FormStatus:o},children:`<FormStatus state="warning" variant="outlined">
  Warningmessage. Take notice!
</FormStatus>
`}),y=()=>(0,m.jsx)(p,{"data-visual-test":`form-status-marketing`,stableName:`FormStatusWithMarketing`,sourceImports:[`import { useState } from 'react'`,`import { InfoIcon, WarnIcon, ErrorIcon, MarketingIcon } from '@dnb/eufemia/components/form-status/FormStatus'`,`import { FormStatus, Icon, Input, ToggleButton, Link, Grid, Anchor } from '@dnb/eufemia'`,`import { Provider } from '@dnb/eufemia/shared'`],__buildScope:{FormStatus:o},children:`<FormStatus state="marketing" variant="outlined">
  Marketingmessage. What a deal!
</FormStatus>
`}),b=()=>(0,m.jsx)(p,{stableName:`FormStatusInput`,sourceImports:[`import { useState } from 'react'`,`import { InfoIcon, WarnIcon, ErrorIcon, MarketingIcon } from '@dnb/eufemia/components/form-status/FormStatus'`,`import { FormStatus, Icon, Input, ToggleButton, Link, Grid, Anchor } from '@dnb/eufemia'`,`import { Provider } from '@dnb/eufemia/shared'`],__buildScope:{Input:l},children:`<Input
  label="Input with status"
  status="You have to fill in this field"
  value="Input value"
/>
`}),x=()=>(0,m.jsx)(p,{"data-visual-test":`form-status-custom`,stableName:`FormStatusCustom`,sourceImports:[`import { useState } from 'react'`,`import { InfoIcon, WarnIcon, ErrorIcon, MarketingIcon } from '@dnb/eufemia/components/form-status/FormStatus'`,`import { FormStatus, Icon, Input, ToggleButton, Link, Grid, Anchor } from '@dnb/eufemia'`,`import { Provider } from '@dnb/eufemia/shared'`],__buildScope:{Link:u,Input:l},noInline:!0,children:`const CustomStatus = () => (
  <>
    My info <Link href="/">with a link</Link> and more text
  </>
)
render(
  <Input
    label="Input with custom status"
    status={<CustomStatus />}
    statusState="information"
    value="Input value"
  />
)
`}),S=()=>(0,m.jsx)(p,{stableName:`FormStatusLarge`,sourceImports:[`import { useState } from 'react'`,`import { InfoIcon, WarnIcon, ErrorIcon, MarketingIcon } from '@dnb/eufemia/components/form-status/FormStatus'`,`import { FormStatus, Icon, Input, ToggleButton, Link, Grid, Anchor } from '@dnb/eufemia'`,`import { Provider } from '@dnb/eufemia/shared'`],__buildScope:{FormStatus:o,Anchor:n},noInline:!0,children:`render(
  <FormStatus state="information" size="large" variant="outlined">
    My HTML{' '}
    <Anchor href="/" target="_blank">
      with a link
    </Anchor>{' '}
    and more text
  </FormStatus>
)
`}),C=()=>(0,m.jsx)(p,{scope:{InfoIcon:s,WarnIcon:i,ErrorIcon:c,MarketingIcon:a},"data-visual-test":`form-status-icons`,stableName:`FormStatusWithIcons`,sourceImports:[`import { useState } from 'react'`,`import { InfoIcon, WarnIcon, ErrorIcon, MarketingIcon } from '@dnb/eufemia/components/form-status/FormStatus'`,`import { FormStatus, Icon, Input, ToggleButton, Link, Grid, Anchor } from '@dnb/eufemia'`,`import { Provider } from '@dnb/eufemia/shared'`],__buildScope:{Icon:r},children:`
<Icon
  icon={<InfoIcon />}
  size="medium"
  title="Some title"
  inheritColor={false}
  right
/>
<Icon
  icon={WarnIcon}
  size="medium"
  title="Some title"
  inheritColor={false}
  right
/>
<Icon
  icon={ErrorIcon}
  size="medium"
  title="Some title"
  inheritColor={false}
  right
/>
<Icon
  icon={MarketingIcon}
  size="medium"
  title="Some title"
  inheritColor={false}
/>

`}),w=()=>(0,m.jsx)(p,{"data-visual-test":`form-status-all-variants`,stableName:`FormStatusAllVariants`,sourceImports:[`import { useState } from 'react'`,`import { InfoIcon, WarnIcon, ErrorIcon, MarketingIcon } from '@dnb/eufemia/components/form-status/FormStatus'`,`import { FormStatus, Icon, Input, ToggleButton, Link, Grid, Anchor } from '@dnb/eufemia'`,`import { Provider } from '@dnb/eufemia/shared'`],__buildScope:{Grid:d,FormStatus:o},children:`<Grid.Container
  columns={{
    small: 2,
    medium: 3,
    large: 3,
  }}
  columnGap="small"
  rowGap="small"
>
  <Grid.Container columns={1}>
    <FormStatus text="Text" state="information" variant="plain" />
    <FormStatus text="Text" state="information" variant="outlined" />
  </Grid.Container>
  <Grid.Container columns={1}>
    <FormStatus text="Text" state="success" />
    <FormStatus text="Text" state="success" variant="outlined" />
  </Grid.Container>
  <Grid.Container columns={1}>
    <FormStatus text="Text" state="warning" variant="plain" />
    <FormStatus text="Text" state="warning" variant="outlined" />
  </Grid.Container>
  <Grid.Container columns={1}>
    <FormStatus text="Text" state="error" variant="plain" />
    <FormStatus text="Text" state="error" variant="outlined" />
  </Grid.Container>
  <Grid.Container columns={1}>
    <FormStatus text="Text" state="marketing" />
    <FormStatus text="Text" state="marketing" variant="outlined" />
  </Grid.Container>
</Grid.Container>
`});function T(e){let t={code:`code`,h2:`h2`,h3:`h3`,p:`p`,strong:`strong`,...f(),...e.components},{VisibleWhenVisualTest:n}=t;return n||D(`VisibleWhenVisualTest`,!0),(0,m.jsxs)(m.Fragment,{children:[(0,m.jsx)(t.h2,{children:`Demos`}),`
`,(0,m.jsx)(t.h3,{children:`Displaying error status`}),`
`,(0,m.jsx)(h,{}),`
`,(0,m.jsx)(t.h3,{children:`Displaying information status`}),`
`,(0,m.jsx)(g,{}),`
`,(0,m.jsx)(t.h3,{children:`Displaying warning status`}),`
`,(0,m.jsx)(v,{}),`
`,(0,m.jsx)(t.h3,{children:`Displaying marketing status`}),`
`,(0,m.jsx)(y,{}),`
`,(0,m.jsx)(t.h3,{children:`Stretching the status message`}),`
`,(0,m.jsxs)(t.p,{children:[(0,m.jsx)(t.strong,{children:`NB:`}),` The inner text has a max-width of `,(0,m.jsx)(t.code,{children:`var(--prose-max-width)`}),` (defaults to `,(0,m.jsx)(t.code,{children:`60ch`}),`) to ensure we do not exceed characters limit per line for accessibility reasons.`]}),`
`,(0,m.jsx)(_,{}),`
`,(0,m.jsx)(t.h3,{children:`Used by the Input Component`}),`
`,(0,m.jsx)(b,{}),`
`,(0,m.jsx)(t.h3,{children:`With a custom-styled content`}),`
`,(0,m.jsx)(x,{}),`
`,(0,m.jsx)(t.h3,{children:`Large variant`}),`
`,(0,m.jsx)(S,{}),`
`,(0,m.jsx)(t.h3,{children:`In combination with the Icon component`}),`
`,(0,m.jsx)(C,{}),`
`,(0,m.jsx)(n,{children:(0,m.jsx)(w,{})})]})}function E(e={}){let{wrapper:t}={...f(),...e.components};return t?(0,m.jsx)(t,{...e,children:(0,m.jsx)(T,{...e})}):T(e)}function D(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{E as default};