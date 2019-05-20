/**
 * UI lib Component Example
 *
 */

import React, { PureComponent, Fragment } from 'react'
import ComponentBox from '../../../../shared/tags/ComponentBox'

class Example extends PureComponent {
  render() {
    return (
      <Fragment>
        <ComponentBox caption="Default circular progress">
          {/* @jsx */ `
<Progress />
          `}
        </ComponentBox>
        <ComponentBox
          caption="Shows a large circular progress with a static 50% in progress"
          data-dnb-test="progress-circular--primary"
        >
          {/* @jsx */ `
<Progress
  type="circular"
  progress="50"
  size="large"
  no_animation
/>
          `}
        </ComponentBox>
        <ComponentBox
          caption="Progress with random progress value to show the the transition"
          noFragments={false}
        >
          {/* @jsx */ `
() => {
  const random = (min, max) => (Math.floor( Math.random () * (max - min + 1)) + min)
  const [progress, setProgress] = useState(random(1, 100))
  useEffect(() => {
    const timer = setInterval(() => setProgress(random(1, 100)), 1e3)
    return () => clearTimeout(timer)
  })
  return (
    <Progress
      size="large"
      progress={progress}
    />
  )
}
          `}
        </ComponentBox>
        <ComponentBox
          caption="Progress with on_complete callback"
          noFragments={false}
        >
          {/* @jsx */ `
() => {
  const [visible, setVisibe] = useState(true)
  useEffect(() => {
    const timer = setInterval(() => setVisibe(!visible), 2400)
    return () => clearTimeout(timer)
  })
  return (
    <Progress
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
