import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{t}from"./ComponentBox-C64JNWnl.js";import{Lr as n}from"./index-2AO2Cu5K.js";var r=e(),i=()=>(0,r.jsx)(t,{"data-visual-test":`image-plain`,hideCode:!0,noInline:!0,children:`const StyledImg = styled(Img)\`
  border-radius: 1rem;
\`
const CustomImage = () => {
  return (
    <StyledImg
      width="100"
      height="100"
      alt="DNB logo"
      src="/dnb/android-chrome-192x192.png"
    />
  )
}
render(<CustomImage />)
`}),a=()=>(0,r.jsx)(t,{"data-visual-test":`image-no-source`,hideCode:!0,noInline:!0,children:`const MyImg = Img
render(
  <MyImg width="100" height="100" alt="Alt text" src="https://invalid" />
)
`}),o=()=>(0,r.jsx)(t,{"data-visual-test":`image-caption`,hideCode:!0,noInline:!0,children:`const StyledImg = styled(Img)\`
  border-radius: 1rem;
\`
const CustomImage = () => {
  return (
    <StyledImg
      width="100"
      height="100"
      alt="Alt text"
      caption="Caption text"
      src="/dnb/android-chrome-192x192.png"
    />
  )
}
render(<CustomImage />)
`}),s=()=>(0,r.jsx)(t,{"data-visual-test":`image-skeleton`,noInline:!0,children:`const StyledImg = styled(Img)\`
  border-radius: 1rem;
\`
const CustomImage = () => {
  const [state, setState] = useState(true)
  return (
    <Skeleton show={state}>
      <StyledImg
        width="100"
        height="100"
        alt="DNB logo"
        src="/dnb/android-chrome-192x192.png"
      />
      <br />
      <Skeleton.Exclude>
        <ToggleButton
          checked={state}
          onChange={({ checked }) => setState(checked)}
          top="large"
        >
          Toggle
        </ToggleButton>
      </Skeleton.Exclude>
    </Skeleton>
  )
}
render(<CustomImage />)
`});function c(e){let t={h2:`h2`,h3:`h3`,...n(),...e.components};return(0,r.jsxs)(r.Fragment,{children:[(0,r.jsx)(t.h2,{children:`Demos`}),`
`,(0,r.jsx)(t.h3,{children:`Basic image element`}),`
`,(0,r.jsx)(i,{}),`
`,(0,r.jsx)(t.h3,{children:`Image with invalid source`}),`
`,(0,r.jsx)(a,{}),`
`,(0,r.jsx)(t.h3,{children:`Image with caption`}),`
`,(0,r.jsx)(o,{}),`
`,(0,r.jsx)(t.h3,{children:`Image element with skeleton`}),`
`,(0,r.jsx)(s,{})]})}function l(e={}){let{wrapper:t}={...n(),...e.components};return t?(0,r.jsx)(t,{...e,children:(0,r.jsx)(c,{...e})}):c(e)}export{l as default};