import{t as e}from"./jsx-runtime-BgMs7Gb-.js";import{t}from"./ComponentBox-C64JNWnl.js";import{Mt as n}from"./index-2AO2Cu5K.js";var r=e(),i=()=>(0,r.jsx)(t,{children:`<ProgressIndicator />
`}),a=()=>(0,r.jsx)(t,{children:`<ProgressIndicator type="circular" />
`}),o=()=>(0,r.jsx)(t,{children:`<ProgressIndicator
  // label="Custom label ..."
  type="circular"
  showDefaultLabel={true}
  labelDirection="horizontal"
/>
`}),s=()=>(0,r.jsx)(t,{children:`<ProgressIndicator
  // label="Custom label ..."
  type="circular"
  showDefaultLabel={true}
/>
`}),c=()=>(0,r.jsx)(t,{children:`
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

`}),l=()=>(0,r.jsx)(t,{"data-visual-test":`progress-indicator-circular--primary`,children:`<ProgressIndicator
  type="circular"
  progress="50"
  size="large"
  noAnimation
/>
`}),u=()=>(0,r.jsx)(t,{noInline:!0,children:`const ChangeValue = () => {
  const [value, setValue] = useState(50)
  return (
    <Flex.Horizontal align="center">
      <ProgressIndicator
        type="circular"
        progress={value}
        showDefaultLabel
        labelDirection="horizontal"
        noAnimation
      />
      <Button
        left
        size="small"
        variant="secondary"
        onClick={() => setValue(Math.random() * 100)}
      >
        Change
      </Button>
    </Flex.Horizontal>
  )
}
render(<ChangeValue />)
`}),d=()=>(0,r.jsx)(t,{noInline:!0,children:`const Example = () => {
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
`}),f=()=>(0,r.jsx)(t,{noInline:!0,children:`const Example = () => {
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
`}),p=()=>(0,r.jsx)(t,{children:`<Dialog
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
`}),m=()=>(0,r.jsx)(t,{children:`<ProgressIndicator type="linear" />
`}),h=()=>(0,r.jsx)(t,{children:`<ProgressIndicator type="linear" size="small" />
`}),g=()=>(0,r.jsx)(t,{children:`<ProgressIndicator
  type="linear"
  // label="Custom label ..."
  showDefaultLabel={true}
  labelDirection="horizontal"
/>
`}),_=()=>(0,r.jsx)(t,{children:`<ProgressIndicator type="linear" showDefaultLabel={true} />
`}),v=()=>(0,r.jsx)(t,{"data-visual-test":`progress-indicator-linear--primary`,children:`<ProgressIndicator type="linear" progress="50" size="large" noAnimation />
`}),y=()=>(0,r.jsx)(t,{noInline:!0,children:`const ChangeValue = () => {
  const [value, setValue] = useState(50)
  return (
    <Flex.Horizontal align="center">
      <ProgressIndicator type="linear" progress={value} noAnimation />
      <Button
        left
        size="small"
        variant="secondary"
        onClick={() => setValue(Math.random() * 100)}
      >
        Change
      </Button>
    </Flex.Horizontal>
  )
}
render(<ChangeValue />)
`}),b=()=>(0,r.jsx)(t,{noInline:!0,children:`const Example = () => {
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
`}),x=()=>(0,r.jsx)(t,{noInline:!0,children:`const Example = () => {
  const random = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min
  const [show, setShow] = useState(true)
  useEffect(() => {
    const timer = setInterval(() => setShow(!show), random(2400, 4200))
    return () => clearTimeout(timer)
  })
  return (
    <ProgressIndicator
      type="linear"
      size="large"
      show={show}
      onComplete={() => {
        console.log('onCompleteLinear')
      }}
    />
  )
}
render(<Example />)
`}),S=()=>(0,r.jsx)(t,{children:`<Dialog
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
    type="linear"
    showDefaultLabel
    top="large"
    bottom="large"
  />
</Dialog>
`}),C=()=>(0,r.jsx)(t,{"data-visual-test":`progress-indicator-sizes`,children:`<Flex.Horizontal align="center" gap={false}>
  <ProgressIndicator progress="50" size="small" />
  <ProgressIndicator progress="50" size="medium" />
  <ProgressIndicator progress="50" />
  <ProgressIndicator progress="50" size="large" />
</Flex.Horizontal>
`}),w=n.span`
  display: grid;
  place-content: center;
`,T=({children:e,...t})=>(0,r.jsx)(w,{className:`dnb-p dnb-t__weight--medium dnb-t__size--small`,...t,children:e}),E=()=>(0,r.jsx)(t,{scope:{MyCustomLabel:T},noInline:!0,children:`const ChangeValue = () => {
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
`}),D=n.div`
  background-color: var(--color-emerald-green);
  border-radius: 0.5rem;
  padding: 1rem;
  text-align: center;
`,O=()=>(0,r.jsx)(t,{hideCode:!0,"data-visual-test":`progress-indicator-custom-countdown`,scope:{DarkBackground:D,MyCustomLabel:T},noInline:!0,children:`const MyProgressIndicator = () => {
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
`}),k=()=>(0,r.jsx)(t,{hideCode:!0,"data-visual-test":`progress-indicator-custom-horizontal`,scope:{DarkBackground:D,MyCustomLabel:T},noInline:!0,children:`const MyProgressIndicator = () => {
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
`}),A=()=>(0,r.jsx)(t,{"data-visual-test":`progress-indicator-customization`,children:`
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

`});export{h as C,b as S,g as _,s as a,y as b,f as c,O as d,k as f,S as g,m as h,c as i,d as l,i as m,a as n,l as o,A as p,o as r,u as s,p as t,E as u,_ as v,C as w,x,v as y};