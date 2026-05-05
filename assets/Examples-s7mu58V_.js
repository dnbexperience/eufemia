import"./rolldown-runtime-BYbx6iT9.js";import{n as e,t}from"./jsx-runtime-BgMs7Gb-.js";import{t as n}from"./ComponentBox-geTEYZ7b.js";import{a as r}from"./index-CMgyXmp3.js";e();var i=t(),a=()=>(0,i.jsx)(n,{children:`<ProgressIndicator />
`}),o=()=>(0,i.jsx)(n,{children:`<ProgressIndicator type="circular" />
`}),s=()=>(0,i.jsx)(n,{children:`<ProgressIndicator
  // label="Custom label ..."
  type="circular"
  showDefaultLabel={true}
  labelDirection="horizontal"
/>
`}),c=()=>(0,i.jsx)(n,{children:`<ProgressIndicator
  // label="Custom label ..."
  type="circular"
  showDefaultLabel={true}
/>
`}),l=()=>(0,i.jsx)(n,{children:`
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

`}),u=()=>(0,i.jsx)(n,{"data-visual-test":`progress-indicator-circular--primary`,children:`<ProgressIndicator
  type="circular"
  progress="50"
  size="large"
  noAnimation
/>
`}),d=()=>(0,i.jsx)(n,{noInline:!0,children:`const ChangeValue = () => {
  const [value, setValue] = React.useState(50)
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
`}),f=()=>(0,i.jsx)(n,{noInline:!0,children:`const Example = () => {
  const random = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min
  const [progress, setProgressIndicator] = React.useState(random(1, 100))
  React.useEffect(() => {
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
`}),p=()=>(0,i.jsx)(n,{noInline:!0,children:`const Example = () => {
  const random = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min
  const [show, setShow] = React.useState(true)
  React.useEffect(() => {
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
`}),m=()=>(0,i.jsx)(n,{children:`<Dialog
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
`}),h=()=>(0,i.jsx)(n,{children:`<ProgressIndicator type="linear" />
`}),g=()=>(0,i.jsx)(n,{children:`<ProgressIndicator type="linear" size="small" />
`}),_=()=>(0,i.jsx)(n,{children:`<ProgressIndicator
  type="linear"
  // label="Custom label ..."
  showDefaultLabel={true}
  labelDirection="horizontal"
/>
`}),v=()=>(0,i.jsx)(n,{children:`<ProgressIndicator type="linear" showDefaultLabel={true} />
`}),y=()=>(0,i.jsx)(n,{"data-visual-test":`progress-indicator-linear--primary`,children:`<ProgressIndicator type="linear" progress="50" size="large" noAnimation />
`}),b=()=>(0,i.jsx)(n,{noInline:!0,children:`const ChangeValue = () => {
  const [value, setValue] = React.useState(50)
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
`}),x=()=>(0,i.jsx)(n,{noInline:!0,children:`const Example = () => {
  const random = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min
  const [progress, setProgressIndicator] = React.useState(random(1, 100))
  React.useEffect(() => {
    const timer = setInterval(
      () => setProgressIndicator(random(1, 100)),
      1e3
    )
    return () => clearInterval(timer)
  })
  return <ProgressIndicator type="linear" progress={progress} />
}
render(<Example />)
`}),S=()=>(0,i.jsx)(n,{noInline:!0,children:`const Example = () => {
  const random = (min, max) =>
    Math.floor(Math.random() * (max - min + 1)) + min
  const [show, setShow] = React.useState(true)
  React.useEffect(() => {
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
`}),C=()=>(0,i.jsx)(n,{children:`<Dialog
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
`}),w=()=>(0,i.jsx)(n,{"data-visual-test":`progress-indicator-sizes`,children:`<Flex.Horizontal align="center" gap={false}>
  <ProgressIndicator progress="50" size="small" />
  <ProgressIndicator progress="50" size="medium" />
  <ProgressIndicator progress="50" />
  <ProgressIndicator progress="50" size="large" />
</Flex.Horizontal>
`}),T=r.span`
  display: grid;
  place-content: center;
`,E=({children:e,...t})=>(0,i.jsx)(T,{className:`dnb-p dnb-t__weight--medium dnb-t__size--small`,...t,children:e}),D=()=>(0,i.jsx)(n,{scope:{MyCustomLabel:E},noInline:!0,children:`const ChangeValue = () => {
  const max = 60
  const [current, setCurrent] = React.useState(10)
  React.useEffect(() => {
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
`}),O=r.div`
  background-color: var(--color-emerald-green);
  border-radius: 0.5rem;
  padding: 1rem;
  text-align: center;
`,k=()=>(0,i.jsx)(n,{hideCode:!0,"data-visual-test":`progress-indicator-custom-countdown`,scope:{DarkBackground:O,MyCustomLabel:E},noInline:!0,children:`const MyProgressIndicator = () => {
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
`}),A=()=>(0,i.jsx)(n,{hideCode:!0,"data-visual-test":`progress-indicator-custom-horizontal`,scope:{DarkBackground:O,MyCustomLabel:E},noInline:!0,children:`const MyProgressIndicator = () => {
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
`}),j=()=>(0,i.jsx)(n,{"data-visual-test":`progress-indicator-customization`,children:`
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

`});export{g as C,x as S,_,c as a,b,p as c,k as d,A as f,C as g,h,l as i,f as l,a as m,o as n,u as o,j as p,s as r,d as s,m as t,D as u,v,w,S as x,y};