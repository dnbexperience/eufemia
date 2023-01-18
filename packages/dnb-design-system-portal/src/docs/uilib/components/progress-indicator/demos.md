---
showTabs: true
redirect_from:
  - /uilib/components/progress/demos
---

import ComponentBox from 'dnb-design-system-portal/src/shared/tags/ComponentBox'

## Demos

### Default ProgressIndicator is Circular

<ComponentBox>
	{/* jsx */ `
<ProgressIndicator />
`}
</ComponentBox>

### Default Circular ProgressIndicator

<ComponentBox>
	{/* jsx */ `
<ProgressIndicator
  type="circular"
/>
`}
</ComponentBox>

### Circular ProgressIndicator with a label in a horizontal direction

<ComponentBox>
	{/* jsx */ `
<ProgressIndicator
  // label="Custom label ..."
  type="circular"
  show_label="true"
  label_direction="horizontal"
/>
`}
</ComponentBox>

### Circular ProgressIndicator with a label in a vertical direction

<ComponentBox>
	{/* jsx */ `
<ProgressIndicator
  // label="Custom label ..."
  type="circular"
  show_label="true"
  label_direction="vertical"
/>
`}
</ComponentBox>

### Shows a large Circular ProgressIndicator with a static 50% in progress

<ComponentBox data-visual-test="progress-indicator-circular--primary">
	{/* jsx */ `
  <ProgressIndicator
    type="circular"
    progress="50"
    size="large"
    no_animation
  />
`}
</ComponentBox>

### Circular ProgressIndicator with random value

<ComponentBox useRender>
	{/* jsx */ `
const ChangeValue = () => {
	const [value, setValue] = React.useState(50)
	return (
		<FormRow centered>
			<ProgressIndicator
        type="circular"
				progress={value}
				show_label
				no_animation
			/>
			<Button
				left
				size="small"
				variant="secondary"
				onClick={() => setValue(Math.random()*100)}
			>
				Change
			</Button>
		</FormRow>
	)
}
render(<ChangeValue />)
`}
</ComponentBox>

### Circular ProgressIndicator with random progress value to show the transition

<ComponentBox noFragments={false}>
	{/* jsx */ `
() => {
  const random = (min, max) => (Math.floor( Math.random () * (max - min + 1)) + min)
  const [progress, setProgressIndicator] = React.useState(random(1, 100))
  React.useEffect(() => {
    const timer = setInterval(() => setProgressIndicator(random(1, 100)), 1e3)
    return () => clearInterval(timer)
  })
  return (
    <ProgressIndicator
      type="circular"
      size="large"
      progress={progress}
    />
  )
}
`}
</ComponentBox>

### Circular ProgressIndicator with random `on_complete` callback

<ComponentBox noFragments={false}>
	{/* jsx */ `
() => {
  const random = (min, max) => (Math.floor( Math.random () * (max - min + 1)) + min)
  const [visible, setVisible] = React.useState(true)
  React.useEffect(() => {
    const timer = setInterval(() => setVisible(!visible), random(2400, 4200))
    return () => clearTimeout(timer)
  })
  return (
    <ProgressIndicator
      type="circular"
      size="large"  
      visible={visible}
      on_complete={() => {
        console.log('on_complete_circular')
      }}
    />
  )
}
`}
</ComponentBox>

### Circular ProgressIndicator inside a Dialog

<ComponentBox>
	{/* jsx */ `
<Dialog
  spacing={false}
  fullscreen={false}
  alignContent="centered"
  hideCloseButton
  triggerAttributes={{
    text: 'Show',
  }}
  preventClose={false}
  maxWidth="12rem"
>
  <ProgressIndicator
    type="circular"
    show_label
    label_direction="vertical"
    top="large"
    bottom="large"
    size="large"
  />
</Dialog>
`}
</ComponentBox>

### Default Linear ProgressIndicator

<ComponentBox>
	{/* jsx */ `
  <ProgressIndicator 
    type="linear" 
  />
`}
</ComponentBox>

### Small Linear ProgressIndicator

<ComponentBox>
	{/* jsx */ `
  <ProgressIndicator 
    type="linear"
    size="small"
  />
`}
</ComponentBox>

### Linear ProgressIndicator with a label in a horizontal direction

<ComponentBox>
	{/* jsx */ `
<ProgressIndicator
  type="linear"
  // label="Custom label ..."
  show_label="true"
  label_direction="horizontal"
/>
`}
</ComponentBox>

### Linear ProgressIndicator with a label in a vertical direction

<ComponentBox>
	{/* jsx */ `
<ProgressIndicator
  type="linear"
  // label="Custom label ..."
  show_label="true"
  label_direction="vertical"
/>
`}
</ComponentBox>

### Shows a large Linear ProgressIndicator with a static 50% in progress

<ComponentBox data-visual-test="progress-indicator-linear--primary">
	{/* jsx */ `
  <ProgressIndicator 
    type="linear" 
    progress="50"
    size="large"
    no_animation
  />
`}
</ComponentBox>

### Linear ProgressIndicator with random value

<ComponentBox useRender>
	{/* jsx */ `
const ChangeValue = () => {
	const [value, setValue] = React.useState(50)
	return (
		<FormRow centered>
			<ProgressIndicator
        type="linear" 
				progress={value}
				no_animation
			/>
			<Button
				left
				size="small"
				variant="secondary"
				onClick={() => setValue(Math.random()*100)}
			>
				Change
			</Button>
		</FormRow>
	)
}
render(<ChangeValue />)
`}
</ComponentBox>

### Linear ProgressIndicator with random progress value to show the transition

<ComponentBox noFragments={false}>
	{/* jsx */ `
() => {
  const random = (min, max) => (Math.floor( Math.random () * (max - min + 1)) + min)
  const [progress, setProgressIndicator] = React.useState(random(1, 100))
  React.useEffect(() => {
    const timer = setInterval(() => setProgressIndicator(random(1, 100)), 1e3)
    return () => clearInterval(timer)
  })
  return (
    <ProgressIndicator
      type="linear"
      progress={progress}
    />
  )
}
`}
</ComponentBox>

### Linear ProgressIndicator with random `on_complete` callback

<ComponentBox noFragments={false}>
	{/* jsx */ `
() => {
  const random = (min, max) => (Math.floor( Math.random () * (max - min + 1)) + min)
  const [visible, setVisible] = React.useState(true)
  React.useEffect(() => {
    const timer = setInterval(() => setVisible(!visible), random(2400, 4200))
    return () => clearTimeout(timer)
  })
  return (
    <ProgressIndicator
      type="linear"
      size="large"  
      visible={visible}
      on_complete={() => {
        console.log('on_complete_linear')
      }}
    />
  )
}
`}
</ComponentBox>

### Linear ProgressIndicator inside a Dialog

<ComponentBox>
	{/* jsx */ `
<Dialog
  spacing={false}
  fullscreen={false}
  alignContent="centered"
  hideCloseButton
  triggerAttributes={{
    text: 'Show',
  }}
  preventClose={false}
  maxWidth="12rem"
>
  <ProgressIndicator
    type="linear"
    show_label
    label_direction="vertical"
    top="large"
    bottom="large"
  />
</Dialog>
`}
</ComponentBox>
