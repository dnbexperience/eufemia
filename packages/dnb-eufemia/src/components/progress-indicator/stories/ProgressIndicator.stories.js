/**
 * @dnb/eufemia Component Story
 *
 */

import React from 'react'
import { Wrapper, Box } from 'storybook-utils/helpers'
// import styled from '@emotion/styled'

import { ProgressIndicator } from '../../'

export default {
  title: 'Eufemia/Components/ProgressIndicator',
}

export function ProgressIndicatorSizes() {
  return (
    <>
      <ProgressIndicator size="small" />
      <ProgressIndicator size="medium" />
      <ProgressIndicator />
      <ProgressIndicator size="large" />
      <ProgressIndicator size="huge" />
    </>
  )
}

export const ProgressIndicatorSandbox = () => (
  <Wrapper>
    <Box>
      <ProgressIndicator progress={60} no_animation />
    </Box>
    <Box>
      <ProgressIndicator size="large" />
    </Box>
    <Box>
      <ProgressIndicatorCircular />
    </Box>
  </Wrapper>
)

const ProgressIndicatorCircular = () => {
  const [visible, setVisible] = React.useState(true)
  React.useEffect(() => {
    const timer = setInterval(() => setVisible(!visible), 3400)
    return () => clearInterval(timer)
  })
  return (
    <ProgressIndicator
      // progress={88}
      size="large"
      visible={visible}
      on_complete={() => {
        console.log('on_complete')
      }}
    />
  )
}
