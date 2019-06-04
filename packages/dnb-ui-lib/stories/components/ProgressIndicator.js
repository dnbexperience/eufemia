/**
 * dnb-ui-lib Component Story
 *
 */

import React, { useState, useEffect } from 'react'
import { Wrapper, Box } from '../helpers'
// import styled from '@emotion/styled'

import { ProgressIndicator } from '../../src/components'

export default [
  'ProgressIndicator',
  () => (
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
]
const ProgressIndicatorCircular = () => {
  const [visible, setVisibe] = useState(true)
  useEffect(() => {
    const timer = setInterval(() => setVisibe(!visible), 3400)
    return () => clearInterval(timer)
  })
  return (
    <ProgressIndicator
      // progress={88}
      size="huge"
      visible={visible}
      on_complete={() => {
        console.log('on_complete')
      }}
    />
  )
}
