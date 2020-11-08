---
showTabs: true
---

import ComponentBox from 'Src/shared/tags/ComponentBox'

## Demos

### Default Circular ProgressIndicator

<ComponentBox>
	{/* @jsx */ `
<ProgressIndicator />
	`}
</ComponentBox>

### Circular ProgressIndicator with a label

<ComponentBox>
	{/* @jsx */ `
<ProgressIndicator
  // label="Custom label ..."
  show_label="true"
  label_direction="horizontal"
/>
	`}
</ComponentBox>

### Shows a large Circular ProgressIndicator with a static 50% in progress

<ComponentBox data-visual-test="progress-indicator-circular--primary">
	{/* @jsx */ `
<ProgressIndicator
  type="circular"
  progress="50"
  size="large"
  no_animation
/>
	`}
</ComponentBox>

### ProgressIndicator with random value

<ComponentBox useRender>
	{/* @jsx */ `
const ChangeValue = () => {
	const [value, setValue] = React.useState(50)
	return (
		<FormRow centered>
			<ProgressIndicator
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

### ProgressIndicator with random progress value to show the transition

<ComponentBox noFragments={false}>
	{/* @jsx */ `
() => {
  const random = (min, max) => (Math.floor( Math.random () * (max - min + 1)) + min)
  const [progress, setProgressIndicator] = React.useState(random(1, 100))
  React.useEffect(() => {
    const timer = setInterval(() => setProgressIndicator(random(1, 100)), 1e3)
    return () => clearInterval(timer)
  })
  return (
    <ProgressIndicator
      size="large"
      progress={progress}
    />
  )
}
	`}
</ComponentBox>

### ProgressIndicator with random `on_complete` callback

<ComponentBox noFragments={false}>
	{/* @jsx */ `
() => {
  const random = (min, max) => (Math.floor( Math.random () * (max - min + 1)) + min)
  const [visible, setVisibe] = React.useState(true)
  React.useEffect(() => {
    const timer = setInterval(() => setVisibe(!visible), random(2400, 4200))
    return () => clearTimeout(timer)
  })
  return (
    <ProgressIndicator
      size="large"
      visible={visible}
      on_complete={() => {
        console.log('on_complete')
      }}
    />
  )
}
	`}
</ComponentBox>

### ProgressIndicator inside a Modal

<ComponentBox>
	{/* @jsx */ `
<Modal
  spacing={false}
  fullscreen={false}
  align_content="centered"
  hide_close_button
  trigger_text="Show"
  prevent_close={false}
>
  <ProgressIndicator
    show_label
    label_direction="vertical"
    top="large"
    bottom="large"
    size="large"
  />
</Modal>
	`}
</ComponentBox>
