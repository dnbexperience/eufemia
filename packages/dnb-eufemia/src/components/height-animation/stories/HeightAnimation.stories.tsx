/**
 * @dnb/eufemia Component Story
 *
 */

import styled from '@emotion/styled'
import React from 'react'
import { P } from '../../../elements'
import Section from '../../section/Section'
import { ToggleButton, Button } from '../../'
import HeightAnimation from '../HeightAnimation'

export default {
  title: 'Eufemia/Components/HeightAnimation',
}

export const HeightAnimationSandbox = () => {
  const [count, setCount] = React.useState(0)
  const [openState, setOpenState] = React.useState(true)
  const [isOpen, setIsOpen] = React.useState(true)
  const [contentState, setContentState] = React.useState(false)

  return (
    <>
      <ToggleButton
        checked={openState}
        onChange={({ checked }) => {
          setOpenState(checked)
        }}
        right
      >
        Open/close
      </ToggleButton>

      <ToggleButton
        disabled={!isOpen}
        checked={contentState}
        onChange={({ checked }) => {
          setContentState(checked)
        }}
        right
      >
        Change height inside
      </ToggleButton>

      <Button
        onClick={() => {
          setCount(count + 1)
        }}
      >
        {count}
      </Button>

      <StyledSection style_type="lavender" top>
        <HeightAnimation
          open={openState}
          element="div" // Optional
          animate={true} // Optional
          keepInDOM={true} // Optional
          duration={1000}
          onOpen={setIsOpen}
        >
          <Section spacing style_type="lavender">
            <P>Your content</P>
          </Section>
          {contentState && <P>More content</P>}
        </HeightAnimation>
      </StyledSection>

      <P top>Look at me 👀</P>
    </>
  )
}

const StyledSection = styled(Section)`
  .content-element {
    transition: transform 400ms var(--easing-default);
    transform: translateY(-2rem);

    padding: 4rem 0;
  }

  .dnb-height-animation--parallax .content-element {
    transform: translateY(0);
  }
`
