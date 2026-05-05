import"./rolldown-runtime-BYbx6iT9.js";import{n as e,t}from"./jsx-runtime-BgMs7Gb-.js";import{t as n}from"./ComponentBox-geTEYZ7b.js";import{Ar as r,Mr as i,Or as a,Rr as o,jr as s}from"./index-CMgyXmp3.js";e();var c=t(),l=()=>(0,c.jsx)(n,{"data-visual-test":`form-status`,children:`<FormStatus text="Failure text" />
`}),u=()=>(0,c.jsx)(n,{"data-visual-test":`form-status-information`,children:`<FormStatus
  title="Hover title"
  text="Long info nisl tempus hendrerit tortor dapibus nascetur taciti porta risus cursus fusce platea enim curabitur proin nibh ut luctus magnis metus"
  state="information"
/>
`}),d=()=>(0,c.jsx)(n,{"data-visual-test":`form-status-stretch`,children:`<FormStatus
  stretch={true}
  text="Long info nisl tempus hendrerit tortor dapibus nascetur taciti porta risus cursus fusce platea enim curabitur proin nibh ut luctus magnis metus"
  state="warning"
/>
`}),f=()=>(0,c.jsx)(n,{"data-visual-test":`form-status-warning`,children:`<FormStatus state="warning" variant="outlined">
  Warningmessage. Take notice!
</FormStatus>
`}),p=()=>(0,c.jsx)(n,{"data-visual-test":`form-status-marketing`,children:`<FormStatus state="marketing" variant="outlined">
  Marketingmessage. What a deal!
</FormStatus>
`}),m=()=>(0,c.jsx)(n,{children:`<Input
  label="Input with status"
  status="You have to fill in this field"
  value="Input value"
/>
`}),h=()=>(0,c.jsx)(n,{"data-visual-test":`form-status-custom`,noInline:!0,children:`const CustomStatus = () => (
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
`}),g=()=>(0,c.jsx)(n,{noInline:!0,children:`render(
  <FormStatus state="information" size="large" variant="outlined">
    My HTML{' '}
    <Anchor href="/" target="_blank">
      with a link
    </Anchor>{' '}
    and more text
  </FormStatus>
)
`}),_=()=>(0,c.jsx)(n,{scope:{InfoIcon:r,WarnIcon:i,ErrorIcon:a,MarketingIcon:s},"data-visual-test":`form-status-icons`,children:`
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

`}),v=()=>(0,c.jsx)(n,{"data-visual-test":`form-status-all-variants`,children:`<Grid.Container
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
`});function y(e){let t={code:`code`,h2:`h2`,h3:`h3`,p:`p`,strong:`strong`,...o(),...e.components},{VisibleWhenVisualTest:n}=t;return n||x(`VisibleWhenVisualTest`,!0),(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)(t.h2,{children:`Demos`}),`
`,(0,c.jsx)(t.h3,{children:`Displaying error status`}),`
`,(0,c.jsx)(l,{}),`
`,(0,c.jsx)(t.h3,{children:`Displaying information status`}),`
`,(0,c.jsx)(u,{}),`
`,(0,c.jsx)(t.h3,{children:`Displaying warning status`}),`
`,(0,c.jsx)(f,{}),`
`,(0,c.jsx)(t.h3,{children:`Displaying marketing status`}),`
`,(0,c.jsx)(p,{}),`
`,(0,c.jsx)(t.h3,{children:`Stretching the status message`}),`
`,(0,c.jsxs)(t.p,{children:[(0,c.jsx)(t.strong,{children:`NB:`}),` The inner text has a max-width of `,(0,c.jsx)(t.code,{children:`var(--prose-max-width)`}),` (defaults to `,(0,c.jsx)(t.code,{children:`60ch`}),`) to ensure we do not exceed characters limit per line for accessibility reasons.`]}),`
`,(0,c.jsx)(d,{}),`
`,(0,c.jsx)(t.h3,{children:`Used by the Input Component`}),`
`,(0,c.jsx)(m,{}),`
`,(0,c.jsx)(t.h3,{children:`With a custom-styled content`}),`
`,(0,c.jsx)(h,{}),`
`,(0,c.jsx)(t.h3,{children:`Large variant`}),`
`,(0,c.jsx)(g,{}),`
`,(0,c.jsx)(t.h3,{children:`In combination with the Icon component`}),`
`,(0,c.jsx)(_,{}),`
`,(0,c.jsx)(n,{children:(0,c.jsx)(v,{})})]})}function b(e={}){let{wrapper:t}={...o(),...e.components};return t?(0,c.jsx)(t,{...e,children:(0,c.jsx)(y,{...e})}):y(e)}function x(e,t){throw Error(`Expected `+(t?`component`:`object`)+" `"+e+"` to be defined: you likely forgot to import, pass, or provide it.")}export{b as default};