import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{t}from"./ComponentBox-DPdYTeDv.js";import{Lr as n}from"./index--zEB_f_m.js";var r=e(),i=()=>(0,r.jsx)(t,{hideCode:!0,noInline:!0,children:`const MyColors = styled.div\`
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
  const [name, setName] = useState<ThemeNames>('dnb' as ThemeNames)
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
`}),a=()=>(0,r.jsx)(t,{"data-visual-test":`theme-surface-dark`,children:`<section
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
`}),o=()=>(0,r.jsx)(t,{"data-visual-test":`theme-surface-initial`,children:`<Section surface="dark" innerSpace>
  <Button right>Dark surface button</Button>
  <Theme.Context surface="initial">
    <Button>Default surface button</Button>
  </Theme.Context>
</Section>
`});function s(e){let t={code:`code`,h2:`h2`,h3:`h3`,p:`p`,...n(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.h2,{children:`Demos`}),`
`,(0,r.jsx)(t.h3,{children:`Basis example`}),`
`,(0,r.jsx)(i,{}),`
`,(0,r.jsx)(t.h3,{children:`Surface dark`}),`
`,(0,r.jsxs)(t.p,{children:[`Use `,(0,r.jsx)(t.code,{children:`surface="dark"`}),` to adjust component styles for dark backgrounds.`]}),`
`,(0,r.jsx)(a,{}),`
`,(0,r.jsx)(t.h3,{children:`Surface initial`}),`
`,(0,r.jsxs)(t.p,{children:[`Use `,(0,r.jsx)(t.code,{children:`surface="initial"`}),` to reset components back to their default surface behavior inside a dark surface context.`]}),`
`,(0,r.jsx)(o,{})]})}function c(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(s,{...e})}):s(e)}export{c as default};