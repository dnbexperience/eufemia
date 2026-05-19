import{a as e}from"./rolldown-runtime-BYbx6iT9.js";import{t}from"./jsx-runtime-BgMs7Gb-.js";import{t as n}from"./ComponentBox-a4aOn231.js";import{zr as r}from"./index-DqqByKA2.js";var i=e(t()),a=()=>(0,i.jsx)(n,{"data-visual-test":`image-plain`,hideCode:!0,stableName:`ImagePlainExample`,noInline:!0,children:`const StyledImg = styled(Img)\`
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
`}),o=()=>(0,i.jsx)(n,{"data-visual-test":`image-no-source`,hideCode:!0,stableName:`ImageInvalidSourceExample`,noInline:!0,children:`const MyImg = Img
render(
  <MyImg width="100" height="100" alt="Alt text" src="https://invalid" />
)
`}),s=()=>(0,i.jsx)(n,{"data-visual-test":`image-caption`,hideCode:!0,stableName:`ImageCaptionExample`,noInline:!0,children:`const StyledImg = styled(Img)\`
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
`}),c=()=>(0,i.jsx)(n,{"data-visual-test":`image-skeleton`,stableName:`ImageSkeletonExample`,noInline:!0,children:`const StyledImg = styled(Img)\`
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
`});function l(e){let t={h2:`h2`,h3:`h3`,...r(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(t.h2,{children:`Demos`}),`
`,(0,i.jsx)(t.h3,{children:`Basic image element`}),`
`,(0,i.jsx)(a,{}),`
`,(0,i.jsx)(t.h3,{children:`Image with invalid source`}),`
`,(0,i.jsx)(o,{}),`
`,(0,i.jsx)(t.h3,{children:`Image with caption`}),`
`,(0,i.jsx)(s,{}),`
`,(0,i.jsx)(t.h3,{children:`Image element with skeleton`}),`
`,(0,i.jsx)(c,{})]})}function u(e={}){let{wrapper:t}={...r(),...e.components};return t?(0,i.jsx)(t,{...e,children:(0,i.jsx)(l,{...e})}):l(e)}export{u as default};