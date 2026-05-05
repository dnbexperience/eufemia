import"./rolldown-runtime-BYbx6iT9.js";import{n as e,t}from"./jsx-runtime-BgMs7Gb-.js";import{t as n}from"./ComponentBox-geTEYZ7b.js";import{Rr as r}from"./index-CMgyXmp3.js";e();var i=t(),a=()=>(0,i.jsx)(n,{hideCode:!0,noInline:!0,children:`const MyColors = styled.div\`
  .eufemia-theme__dnb {
    --token-color-text-action: var(--color-sea-green);
  }
  .eufemia-theme__sbanken {
    --token-color-text-action: var(--sb-color-purple-alternative);
  }
\`
const MyComponent = () => {
  return (
    <P
      top
      style={{
        color: 'var(--token-color-text-action)',
      }}
    >
      Text with different color based on theme. Change the theme to see the
      effect.
    </P>
  )
}
const Demo = () => {
  const [name, setName] = React.useState<ThemeNames>('dnb' as ThemeNames)
  return (
    <MyColors>
      <Dropdown
        data={['dnb', 'sbanken']}
        value={name}
        onChange={({ data }) => setName(String(data) as ThemeNames)}
      />
      <Theme name={name}>
        <MyComponent />
      </Theme>
    </MyColors>
  )
}
render(<Demo />)
`}),o=()=>(0,i.jsx)(n,{"data-visual-test":`theme-surface-dark`,children:`<section
  style={{
    padding: '1rem',
    backgroundColor: 'var(--token-color-decorative-first-bold-static)',
  }}
>
  <Theme.Context surface="dark">
    <Button right>Primary button</Button>
    <Button variant="secondary" right>
      Secondary button
    </Button>
    <Anchor href="/">Anchor on dark surface</Anchor>
  </Theme.Context>
</section>
`}),s=()=>(0,i.jsx)(n,{"data-visual-test":`theme-surface-initial`,children:`<Section surface="dark" innerSpace>
  <Button right>Dark surface button</Button>
  <Theme.Context surface="initial">
    <Button>Default surface button</Button>
  </Theme.Context>
</Section>
`});function c(e){let t={code:`code`,h2:`h2`,h3:`h3`,p:`p`,...r(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h2,{children:`Demos`}),`
`,(0,i.jsx)(t.h3,{children:`Basis example`}),`
`,(0,i.jsx)(a,{}),`
`,(0,i.jsx)(t.h3,{children:`Surface dark`}),`
`,(0,i.jsxs)(t.p,{children:[`Use `,(0,i.jsx)(t.code,{children:`surface="dark"`}),` to adjust component styles for dark backgrounds.`]}),`
`,(0,i.jsx)(o,{}),`
`,(0,i.jsx)(t.h3,{children:`Surface initial`}),`
`,(0,i.jsxs)(t.p,{children:[`Use `,(0,i.jsx)(t.code,{children:`surface="initial"`}),` to reset components back to their default surface behavior inside a dark surface context.`]}),`
`,(0,i.jsx)(s,{})]})}function l(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(c,{...e})}):c(e)}export{l as default};