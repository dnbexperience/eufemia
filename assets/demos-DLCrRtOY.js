import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{t as n}from"./Img-Czzf6SRf.js";import{t as r}from"./ToggleButton-_NsXxiTa.js";import{K as i,N as a}from"./index-ppRu2ktv.js";import{t as o}from"./ComponentBox-R2c6Bo76.js";var s=e(t()),c=()=>(0,s.jsx)(o,{"data-visual-test":`image-plain`,hideCode:!0,stableName:`ImagePlainExample`,sourceImports:[`import { useState } from 'react'`,`import { Skeleton, ToggleButton, Img } from '@dnb/eufemia'`,`import styled from '@emotion/styled'`],__buildScope:{Img:n},noInline:!0,children:`const StyledImg = styled(Img)\`
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
`}),l=()=>(0,s.jsx)(o,{"data-visual-test":`image-no-source`,hideCode:!0,stableName:`ImageInvalidSourceExample`,sourceImports:[`import { useState } from 'react'`,`import { Skeleton, ToggleButton, Img } from '@dnb/eufemia'`,`import styled from '@emotion/styled'`],__buildScope:{Img:n},noInline:!0,children:`const MyImg = Img
render(
  <MyImg width="100" height="100" alt="Alt text" src="https://invalid" />
)
`}),u=()=>(0,s.jsx)(o,{"data-visual-test":`image-caption`,hideCode:!0,stableName:`ImageCaptionExample`,sourceImports:[`import { useState } from 'react'`,`import { Skeleton, ToggleButton, Img } from '@dnb/eufemia'`,`import styled from '@emotion/styled'`],__buildScope:{Img:n},noInline:!0,children:`const StyledImg = styled(Img)\`
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
`}),d=()=>(0,s.jsx)(o,{"data-visual-test":`image-skeleton`,stableName:`ImageSkeletonExample`,sourceImports:[`import { useState } from 'react'`,`import { Skeleton, ToggleButton, Img } from '@dnb/eufemia'`,`import styled from '@emotion/styled'`],__buildScope:{Img:n,Skeleton:a,ToggleButton:r},noInline:!0,children:`const StyledImg = styled(Img)\`
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
`});function f(e){let t={h2:`h2`,h3:`h3`,...i(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(t.h2,{children:`Demos`}),`
`,(0,s.jsx)(t.h3,{children:`Basic image element`}),`
`,(0,s.jsx)(c,{}),`
`,(0,s.jsx)(t.h3,{children:`Image with invalid source`}),`
`,(0,s.jsx)(l,{}),`
`,(0,s.jsx)(t.h3,{children:`Image with caption`}),`
`,(0,s.jsx)(u,{}),`
`,(0,s.jsx)(t.h3,{children:`Image element with skeleton`}),`
`,(0,s.jsx)(d,{})]})}function p(e={}){let{wrapper:t}={...i(),...e.components};return t?(0,s.jsx)(t,{...e,children:(0,s.jsx)(f,{...e})}):f(e)}export{p as default};