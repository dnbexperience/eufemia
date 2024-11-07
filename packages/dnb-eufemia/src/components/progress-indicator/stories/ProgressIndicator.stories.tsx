/**
 * @dnb/eufemia Component Story
 *
 */

import React from 'react'
import { Wrapper, Box } from 'storybook-utils/helpers'

import { Button, ProgressIndicator } from '../..'
import styled from '@emotion/styled'

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

export const ProgressIndicatorLabel = () => (
  <>
    <Button>Button</Button>
    <ProgressIndicator left size="small" show_label progress={60} />
  </>
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
      onComplete={() => {
        console.log('on_complete')
      }}
    />
  )
}

export function Countdown() {
  const StyledText = styled.span`
    color: var(--color-white);
    font-size: var(--font-size-small);
    text-align: center;
  `

  const StyledTitle = styled.span`
    display: block;
    font-weight: var(--font-weight-medium);
    font-size: var(--font-size-medium);
  `

  const daysLeft = 20
  const daysInMonth = 31

  return (
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
      title={`${daysLeft} days left`}
      customCircleWidth="0.5rem"
    >
      <StyledText>
        <StyledTitle>{daysLeft} d</StyledTitle>
        left
      </StyledText>
    </ProgressIndicator>
  )
}
