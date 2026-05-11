import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{t}from"./ComponentBox-xW2kV1s2.js";import{Cr as n,Dr as r,Er as i,Lr as a,Tr as o}from"./index-DVm0MbGb.js";var s=e(),c=()=>(0,s.jsx)(t,{"data-visual-test":`form-status`,children:`<FormStatus text="Failure text" />
`}),l=()=>(0,s.jsx)(t,{"data-visual-test":`form-status-information`,children:`<FormStatus
  title="Hover title"
  text="Long info nisl tempus hendrerit tortor dapibus nascetur taciti porta risus cursus fusce platea enim curabitur proin nibh ut luctus magnis metus"
  state="information"
/>
`}),u=()=>(0,s.jsx)(t,{"data-visual-test":`form-status-stretch`,children:`<FormStatus
  stretch={true}
  text="Long info nisl tempus hendrerit tortor dapibus nascetur taciti porta risus cursus fusce platea enim curabitur proin nibh ut luctus magnis metus"
  state="warning"
/>
`}),d=()=>(0,s.jsx)(t,{"data-visual-test":`form-status-warning`,children:`<FormStatus state="warning" variant="outlined">
  Warningmessage. Take notice!
</FormStatus>
`}),f=()=>(0,s.jsx)(t,{"data-visual-test":`form-status-marketing`,children:`<FormStatus state="marketing" variant="outlined">
  Marketingmessage. What a deal!
</FormStatus>
`}),p=()=>(0,s.jsx)(t,{children:`<Input
  label="Input with status"
  status="You have to fill in this field"
  value="Input value"
/>
`}),m=()=>(0,s.jsx)(t,{"data-visual-test":`form-status-custom`,noInline:!0,children:`const CustomStatus = () => (
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
`}),h=()=>(0,s.jsx)(t,{noInline:!0,children:`render(
  <FormStatus state="information" size="large" variant="outlined">
    My HTML{' '}
    <Anchor href="/" target="_blank">
      with a link
    </Anchor>{' '}
    and more text
  </FormStatus>
)
`}),g=()=>(0,s.jsx)(t,{scope:{InfoIcon:o,WarnIcon:r,ErrorIcon:n,MarketingIcon:i},"data-visual-test":`form-status-icons`,children:`
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

`}),_=()=>(0,s.jsx)(t,{"data-visual-test":`form-status-all-variants`,children:`<Grid.Container
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
`});function v(e){let t={code:`code`,h2:`h2`,h3:`h3`,p:`p`,strong:`strong`,...a(),...e.components},{VisibleWhenVisualTest:n}=t;return n||b(`VisibleWhenVisualTest`,!0),(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.h2,{children:`Demos`}),`
`,(0,s.jsx)(t.h3,{children:`Displaying error status`}),`
`,(0,s.jsx)(c,{}),`
`,(0,s.jsx)(t.h3,{children:`Displaying information status`}),`
`,(0,s.jsx)(l,{}),`
`,(0,s.jsx)(t.h3,{children:`Displaying warning status`}),`
`,(0,s.jsx)(d,{}),`
`,(0,s.jsx)(t.h3,{children:`Displaying marketing status`}),`
`,(0,s.jsx)(f,{}),`
`,(0,s.jsx)(t.h3,{children:`Stretching the status message`}),`
`,(0,s.jsxs)(t.p,{children:[(0,s.jsx)(t.strong,{children:`NB:`}),` The inner text has a max-width of `,(0,s.jsx)(t.code,{children:`var(--prose-max-width)`}),` (defaults to `,(0,s.jsx)(t.code,{children:`60ch`}),`) to ensure we do not exceed characters limit per line for accessibility reasons.`]}),`
`,(0,s.jsx)(u,{}),`
`,(0,s.jsx)(t.h3,{children:`Used by the Input Component`}),`
`,(0,s.jsx)(p,{}),`
`,(0,s.jsx)(t.h3,{children:`With a custom-styled content`}),`
`,(0,s.jsx)(m,{}),`
`,(0,s.jsx)(t.h3,{children:`Large variant`}),`
`,(0,s.jsx)(h,{}),`
`,(0,s.jsx)(t.h3,{children:`In combination with the Icon component`}),`
`,(0,s.jsx)(g,{}),`
`,(0,s.jsx)(n,{children:(0,s.jsx)(_,{})})]})}function y(e={}){let{wrapper:t}={...a(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(v,{...e})}):v(e)}function b(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{y as default};