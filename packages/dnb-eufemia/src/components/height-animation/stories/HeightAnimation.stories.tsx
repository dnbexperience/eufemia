/**
 * @dnb/eufemia Component Story
 *
 */

import styled from '@emotion/styled'
import React from 'react'
import { P } from '../../../elements'
import Section from '../../section/Section'
import ToggleButton from '../../toggle-button/ToggleButton'
import HeightAnimation from '../HeightAnimation'

export default {
  title: 'Eufemia/Components/HeightAnimation',
}

export const HeightAnimationSandbox = () => {
  const [openState, setOpenState] = React.useState(false)

  const onChangeHandler = ({ checked }) => {
    setOpenState(checked)
  }

  return (
    <>
      <ToggleButton checked={openState} onChange={onChangeHandler}>
        Toggle me
      </ToggleButton>

      <StyledSection style_type="lavender">
        <HeightAnimation
          open={openState}
          element="div" // Optional
          animate={true} // Optional
          keepInDOM={true} // Optional
        >
          <P className="content-element" space={0}>
            Your content
          </P>
        </HeightAnimation>
      </StyledSection>
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
