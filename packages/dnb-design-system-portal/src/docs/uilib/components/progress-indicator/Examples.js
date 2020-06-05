/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from 'Src/shared/tags/ComponentBox'

class Example extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
        <ComponentBox title="Default Circular ProgressIndicator">
          {/* @jsx */ `
<ProgressIndicator />
          `}
        </ComponentBox>
        <ComponentBox title="Circular ProgressIndicator with a label">
          {/* @jsx */ `
<ProgressIndicator
  // label="Custom label ..."
  show_label="true"
  label_direction="horizontal"
/>
          `}
        </ComponentBox>
        <ComponentBox
          title="Shows a large Circular ProgressIndicator with a static 50% in progress"
          data-dnb-test="progress-indicator-circular--primary"
        >
          {/* @jsx */ `
<ProgressIndicator
  type="circular"
  progress="50"
  size="large"
  no_animation
/>
          `}
        </ComponentBox>
        <ComponentBox
          title="ProgressIndicator with random progress value to show the transition"
          noFragments={false}
        >
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
        <ComponentBox
          title="ProgressIndicator with random `on_complete` callback"
          noFragments={false}
        >
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
      </React.Fragment>
    )
  }
}

export default Example
