/**
 * UI lib Component Example
 *
 */

import React, { PureComponent, Fragment } from 'react'
import ComponentBox from 'Src/shared/tags/ComponentBox'

class Example extends PureComponent {
  render() {
    return (
      <Fragment>
        <ComponentBox caption="Default Circular ProgressIndicator">
          {/* @jsx */ `
<ProgressIndicator />
          `}
        </ComponentBox>
        <ComponentBox
          caption="Shows a large Circular ProgressIndicator with a static 50% in progress"
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
          caption="ProgressIndicator with random progress value to show the transition"
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
          caption="ProgressIndicator with random `on_complete` callback"
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
      </Fragment>
    )
  }
}

export default Example
