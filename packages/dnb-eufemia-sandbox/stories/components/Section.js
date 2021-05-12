/**
 * @dnb/eufemia Component Story
 *
 */

import React from 'react'
import { Wrapper, Box } from '../helpers'
import Section from '@dnb/eufemia/src/components/section/web-component'
import { Button } from '@dnb/eufemia/src'
import styled from '@emotion/styled'

export default {
  title: 'Eufemia/Components/Section',
}

export const SectionSandbox = () => (
  <Wrapper>
    <Box>
      <Section spacing>content</Section>
      {/* <Buttons></Buttons> */}
      {/* <DatePicker></DatePicker> */}
    </Box>
  </Wrapper>
)

const WidthWrapper = styled.div`
  display: flex;
  justify-content: center;
`
const WidthWrapperInner = styled.div`
  /* for large screens */
  width: 84vw; /* apr. the same as 60rem */
  max-width: 60rem;
  padding: 0 1rem;

  /* for small screens */
  @media screen and (max-width: 40em) {
    width: 95vw;
    padding: 0;
  }
`

export const SectionWrapped = () => (
  <Wrapper>
    <WidthWrapper>
      <WidthWrapperInner>
        <Section style_type="emerald-green" spacing>
          <p className="dnb-p">
            Tempor auctor mi vel sociosqu suspendisse eros fames congue at
          </p>
          <Button text="Next" icon="chevron_right" />
        </Section>
      </WidthWrapperInner>
    </WidthWrapper>
  </Wrapper>
)
