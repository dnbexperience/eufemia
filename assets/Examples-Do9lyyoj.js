import{s as e,t}from"./jsx-runtime-DnlWeMvz.js";import{g as n}from"./Anchor-CDwNjfi4.js";import{c as r}from"./ToggleButton-DoxBGtHF.js";import{f as i}from"./Autocomplete-CcXvXMYE.js";import{c as a}from"./Table-D3iIoHmL.js";import{t as o}from"./NumberFormatExport-luMPqWqu.js";import{x as s}from"./index-DdG6L_K8.js";import{t as c}from"./ComponentBox-q_23Ylzi.js";var l=e(t()),u=()=>(0,l.jsx)(c,{stableName:`ProgressIndicatorDefaultExample`,sourceImports:[`import { useEffect, useState } from 'react'`,`import styled from '@emotion/styled'`,`import { ProgressIndicator, Dialog, Flex, IconPrimary, NumberFormat } from '@dnb/eufemia'`],__buildScope:{ProgressIndicator:i},children:`<ProgressIndicator />
`}),d=()=>(0,l.jsx)(c,{stableName:`ProgressIndicatorCircularLabelHorizontalExample`,sourceImports:[`import { useEffect, useState } from 'react'`,`import styled from '@emotion/styled'`,`import { ProgressIndicator, Dialog, Flex, IconPrimary, NumberFormat } from '@dnb/eufemia'`],__buildScope:{ProgressIndicator:i},children:`<ProgressIndicator
  // label="Custom label ..."
  type="circular"
  showDefaultLabel={true}
  labelDirection="horizontal"
/>
`}),f=()=>(0,l.jsx)(c,{stableName:`ProgressIndicatorCircularLabelVerticalExample`,sourceImports:[`import { useEffect, useState } from 'react'`,`import styled from '@emotion/styled'`,`import { ProgressIndicator, Dialog, Flex, IconPrimary, NumberFormat } from '@dnb/eufemia'`],__buildScope:{ProgressIndicator:i},children:`<ProgressIndicator
  // label="Custom label ..."
  type="circular"
  showDefaultLabel={true}
/>
`}),p=()=>(0,l.jsx)(c,{stableName:`ProgressIndicatorCircularLabelInsideExample`,sourceImports:[`import { useEffect, useState } from 'react'`,`import styled from '@emotion/styled'`,`import { ProgressIndicator, Dialog, Flex, IconPrimary, NumberFormat } from '@dnb/eufemia'`],__buildScope:{ProgressIndicator:i,IconPrimary:n},children:`
<ProgressIndicator
  right
  label={<IconPrimary icon="save" />}
  type="circular"
  labelDirection="inside"
/>
<ProgressIndicator
  progress={72}
  size="large"
  type="circular"
  labelDirection="inside"
  data-visual-test="progress-indicator-label-inside"
  label={
    <span className="dnb-p dnb-t__weight--bold dnb-t__size--small">
      {72}%
    </span>
  }
/>

`}),m=()=>(0,l.jsx)(c,{"data-visual-test":`progress-indicator-circular--primary`,stableName:`ProgressIndicatorCircularPrimaryExample`,sourceImports:[`import { useEffect, useState } from 'react'`,`import styled from '@emotion/styled'`,`import { ProgressIndicator, Dialog, Flex, IconPrimary, NumberFormat } from '@dnb/eufemia'`],__buildScope:{ProgressIndicator:i},children:`<ProgressIndicator
  type="circular"
  progress="50"
  size="large"
  noAnimation
/>
`}),h=()=>(0,l.jsx)(c,{stableName:`ProgressIndicatorCircularRandomTransitionExample`,sourceImports:[`import { useEffect, useState } from 'react'`,`import styled from '@emotion/styled'`,`import { ProgressIndicator, Dialog, Flex, IconPrimary, NumberFormat } from '@dnb/eufemia'`],__buildScope:{ProgressIndicator:i},noInline:!0,children:`const Example = () => {
  const random = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min
  const [progress, setProgressIndicator] = useState(random(1, 100))
  useEffect(() => {
    const timer = setInterval(
      () => setProgressIndicator(random(1, 100)),
      1e3
    )
    return () => clearInterval(timer)
  })
  return (
    <ProgressIndicator type="circular" size="large" progress={progress} />
  )
}
render(<Example />)
`}),g=()=>(0,l.jsx)(c,{stableName:`ProgressIndicatorCircularRandomOnCompleteExample`,sourceImports:[`import { useEffect, useState } from 'react'`,`import styled from '@emotion/styled'`,`import { ProgressIndicator, Dialog, Flex, IconPrimary, NumberFormat } from '@dnb/eufemia'`],__buildScope:{ProgressIndicator:i},noInline:!0,children:`const Example = () => {
  const random = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min
  const [show, setShow] = useState(true)
  useEffect(() => {
    const timer = setInterval(() => setShow(!show), random(2400, 4200))
    return () => clearTimeout(timer)
  })
  return (
    <ProgressIndicator
      type="circular"
      size="large"
      show={show}
      onComplete={() => {
        console.log('onCompleteCircular')
      }}
    />
  )
}
render(<Example />)
`}),_=()=>(0,l.jsx)(c,{stableName:`ProgressIndicatorCircularDialogExample`,sourceImports:[`import { useEffect, useState } from 'react'`,`import styled from '@emotion/styled'`,`import { ProgressIndicator, Dialog, Flex, IconPrimary, NumberFormat } from '@dnb/eufemia'`],__buildScope:{Dialog:a,ProgressIndicator:i},children:`<Dialog
  spacing={false}
  maxWidth="12rem"
  fullscreen={false}
  alignContent="centered"
  hideCloseButton
  triggerAttributes={{
    text: 'Show',
  }}
  preventClose={false}
>
  <ProgressIndicator
    type="circular"
    showDefaultLabel
    top="large"
    bottom="large"
    size="large"
  />
</Dialog>
`}),v=()=>(0,l.jsx)(c,{stableName:`ProgressIndicatorLinearDefaultExample`,sourceImports:[`import { useEffect, useState } from 'react'`,`import styled from '@emotion/styled'`,`import { ProgressIndicator, Dialog, Flex, IconPrimary, NumberFormat } from '@dnb/eufemia'`],__buildScope:{ProgressIndicator:i},children:`<ProgressIndicator type="linear" />
`}),y=()=>(0,l.jsx)(c,{stableName:`ProgressIndicatorLinearLabelHorizontalExample`,sourceImports:[`import { useEffect, useState } from 'react'`,`import styled from '@emotion/styled'`,`import { ProgressIndicator, Dialog, Flex, IconPrimary, NumberFormat } from '@dnb/eufemia'`],__buildScope:{ProgressIndicator:i},children:`<ProgressIndicator
  type="linear"
  // label="Custom label ..."
  showDefaultLabel={true}
  labelDirection="horizontal"
/>
`}),b=()=>(0,l.jsx)(c,{stableName:`ProgressIndicatorLinearLabelVerticalExample`,sourceImports:[`import { useEffect, useState } from 'react'`,`import styled from '@emotion/styled'`,`import { ProgressIndicator, Dialog, Flex, IconPrimary, NumberFormat } from '@dnb/eufemia'`],__buildScope:{ProgressIndicator:i},children:`<ProgressIndicator type="linear" showDefaultLabel={true} />
`}),x=()=>(0,l.jsx)(c,{"data-visual-test":`progress-indicator-linear--primary`,stableName:`ProgressIndicatorLinearLargeExample`,sourceImports:[`import { useEffect, useState } from 'react'`,`import styled from '@emotion/styled'`,`import { ProgressIndicator, Dialog, Flex, IconPrimary, NumberFormat } from '@dnb/eufemia'`],__buildScope:{ProgressIndicator:i},children:`<ProgressIndicator type="linear" progress="50" size="large" noAnimation />
`}),S=()=>(0,l.jsx)(c,{stableName:`ProgressIndicatorLinearRandomTransitionExample`,sourceImports:[`import { useEffect, useState } from 'react'`,`import styled from '@emotion/styled'`,`import { ProgressIndicator, Dialog, Flex, IconPrimary, NumberFormat } from '@dnb/eufemia'`],__buildScope:{ProgressIndicator:i},noInline:!0,children:`const Example = () => {
  const random = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min
  const [progress, setProgressIndicator] = useState(random(1, 100))
  useEffect(() => {
    const timer = setInterval(
      () => setProgressIndicator(random(1, 100)),
      1e3
    )
    return () => clearInterval(timer)
  })
  return <ProgressIndicator type="linear" progress={progress} />
}
render(<Example />)
`}),C=()=>(0,l.jsx)(c,{"data-visual-test":`progress-indicator-sizes`,stableName:`ProgressIndicatorSizesExample`,sourceImports:[`import { useEffect, useState } from 'react'`,`import styled from '@emotion/styled'`,`import { ProgressIndicator, Dialog, Flex, IconPrimary, NumberFormat } from '@dnb/eufemia'`],__buildScope:{Flex:r,ProgressIndicator:i},children:`<Flex.Horizontal align="center" gap={false}>
  <ProgressIndicator progress="50" size="small" />
  <ProgressIndicator progress="50" size="medium" />
  <ProgressIndicator progress="50" />
  <ProgressIndicator progress="50" size="large" />
</Flex.Horizontal>
`}),w=s.span`
  display: grid;
  place-content: center;
`,T=({children:e,...t})=>(0,l.jsx)(w,{className:`dnb-p dnb-t__weight--medium dnb-t__size--small`,...t,children:e}),E=()=>(0,l.jsx)(c,{scope:{MyCustomLabel:T},stableName:`ProgressIndicatorCountdownExample`,sourceImports:[`import { useEffect, useState } from 'react'`,`import styled from '@emotion/styled'`,`import { ProgressIndicator, Dialog, Flex, IconPrimary, NumberFormat } from '@dnb/eufemia'`],__buildScope:{ProgressIndicator:i},noInline:!0,children:`const ChangeValue = () => {
  const max = 60
  const [current, setCurrent] = useState(10)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent(current === 0 ? max - 1 : current - 1)
    }, 1000)
    return () => clearTimeout(timer)
  })
  return (
    <ProgressIndicator
      type="countdown"
      progress={(current / max) * 100}
      title={\`\${current} av \${max}\`}
      size="large"
      labelDirection="inside"
      label={<MyCustomLabel aria-hidden>{current}</MyCustomLabel>}
    />
  )
}
render(<ChangeValue />)
`}),D=s.div`
  background-color: var(--color-emerald-green);
  border-radius: 0.5rem;
  padding: 1rem;
  text-align: center;
`,O=()=>(0,l.jsx)(c,{hideCode:!0,"data-visual-test":`progress-indicator-custom-countdown`,scope:{DarkBackground:D,MyCustomLabel:T},stableName:`ProgressIndicatorCustomCountdown`,sourceImports:[`import { useEffect, useState } from 'react'`,`import styled from '@emotion/styled'`,`import { ProgressIndicator, Dialog, Flex, IconPrimary, NumberFormat } from '@dnb/eufemia'`],__buildScope:{ProgressIndicator:i},noInline:!0,children:`const MyProgressIndicator = () => {
  const StyledText = styled.span\`
    color: var(--color-white);
    font-size: var(--font-size-small);
  \`
  const StyledTitle = styled.span\`
    display: block;
    font-weight: var(--font-weight-medium);
    font-size: var(--font-size-medium);
  \`
  const daysLeft = 20
  const daysInMonth = 31
  return (
    <DarkBackground>
      <ProgressIndicator
        type="countdown"
        progress={(daysLeft / daysInMonth) * 100}
        size="6rem"
        labelDirection="inside"
        customColors={{
          line: 'var(--color-summer-green)',
          shaft: 'transparent',
          background: 'var(--color-sea-green)',
        }}
        title={daysLeft + 'days left'}
        customCircleWidth="0.5rem"
        label={
          <StyledText>
            <StyledTitle>{daysLeft} d</StyledTitle>
            left
          </StyledText>
        }
      />
    </DarkBackground>
  )
}
render(<MyProgressIndicator />)
`}),k=()=>(0,l.jsx)(c,{hideCode:!0,"data-visual-test":`progress-indicator-custom-horizontal`,scope:{DarkBackground:D,MyCustomLabel:T},stableName:`ProgressIndicatorCustomHorizontal`,sourceImports:[`import { useEffect, useState } from 'react'`,`import styled from '@emotion/styled'`,`import { ProgressIndicator, Dialog, Flex, IconPrimary, NumberFormat } from '@dnb/eufemia'`],__buildScope:{ProgressIndicator:i,NumberFormat:o},noInline:!0,children:`const MyProgressIndicator = () => {
  const StyledText = styled.span\`
    color: white;
    font-size: var(--font-size-basis);
  \`
  return (
    <DarkBackground>
      <ProgressIndicator
        type="linear"
        progress={75}
        size="1rem"
        customColors={{
          line: 'var(--color-summer-green)',
          shaft: 'var(--color-sea-green)',
        }}
        label={
          <StyledText>
            <NumberFormat.Percent value={75} /> done
          </StyledText>
        }
      />
    </DarkBackground>
  )
}
render(<MyProgressIndicator />)
`}),A=()=>(0,l.jsx)(c,{"data-visual-test":`progress-indicator-customization`,stableName:`ProgressIndicatorCustomizationExample`,sourceImports:[`import { useEffect, useState } from 'react'`,`import styled from '@emotion/styled'`,`import { ProgressIndicator, Dialog, Flex, IconPrimary, NumberFormat } from '@dnb/eufemia'`],__buildScope:{ProgressIndicator:i},children:`
<ProgressIndicator
  type="linear"
  progress={32}
  customColors={{
    line: 'red',
    shaft: 'green',
  }}
  size="4rem"
/>
<ProgressIndicator
  type="circular"
  progress={32}
  customColors={{
    line: 'red',
    shaft: 'green',
    background: 'blue',
  }}
  size="4rem"
/>

`});export{S as _,m as a,E as c,A as d,u as f,x as g,b as h,f as i,O as l,y as m,d as n,g as o,v as p,p as r,h as s,_ as t,k as u,C as v};