/**
 * @dnb/eufemia Component Story
 *
 */

import React from 'react'
import { Wrapper, Box } from 'storybook-utils/helpers'
import { Button, Section } from '../../'
import { P } from '../../..'
import styled from '@emotion/styled'

export default {
  title: 'Eufemia/Components/Section',
}

export const SectionSandbox = () => (
  <Wrapper>
    <Box>
      <Section>
        <P top="xx-large">Paragraph with spacing on top</P>
        <P left="xx-large">Paragraph with spacing on top</P>
        <P bottom="xx-large">Paragraph with spacing on top</P>
      </Section>
      {/* <Buttons></Buttons> */}
      {/* <DatePicker></DatePicker> */}
    </Box>
    <Box>
      <Section variant="divider">
        <P top="xx-large" bottom="xx-large">
          variant="divider"
        </P>
      </Section>
      <Section backgroundColor="white">
        <P top="xx-large" bottom="xx-large">
          backgroundColor="white"
        </P>
      </Section>
      <Section backgroundColor="transparent">
        <P top="xx-large" bottom="xx-large">
          backgroundColor="transparent"
        </P>
      </Section>
      <Section backgroundColor="lavender">
        <P top="xx-large" bottom="xx-large">
          backgroundColor="lavender"
        </P>
      </Section>
      <Section backgroundColor="pistachio">
        <P top="xx-large" bottom="xx-large">
          backgroundColor="pistachio"
        </P>
      </Section>
      <Section backgroundColor="emerald-green">
        <P top="xx-large" bottom="xx-large">
          backgroundColor="emerald-green"
        </P>
      </Section>
      <Section backgroundColor="sea-green">
        <P top="xx-large" bottom="xx-large">
          backgroundColor="sea-green"
        </P>
      </Section>
      <Section backgroundColor="fire-red">
        <P top="xx-large" bottom="xx-large">
          backgroundColor="fire-red"
        </P>
      </Section>
      <Section backgroundColor="fire-red-8">
        <P top="xx-large" bottom="xx-large">
          backgroundColor="fire-red-8"
        </P>
      </Section>
      <Section backgroundColor="pistachio">
        <P top="xx-large" bottom="xx-large">
          backgroundColor="pistachio"
        </P>
      </Section>
      <Section backgroundColor="sand-yellow">
        <P top="xx-large" bottom="xx-large">
          backgroundColor="sand-yellow"
        </P>
      </Section>
      <Section backgroundColor="black-3">
        <P top="xx-large" bottom="xx-large">
          backgroundColor="black-3"
        </P>
      </Section>
      <Section backgroundColor="mint-green">
        <P top="xx-large" bottom="xx-large">
          backgroundColor="mint-green"
        </P>
      </Section>
      <Section backgroundColor="mint-green-12">
        <P top="xx-large" bottom="xx-large">
          backgroundColor="mint-green-12"
        </P>
      </Section>
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
        <Section backgroundColor="emerald-green" spacing>
          <p className="dnb-p">
            Tempor auctor mi vel sociosqu suspendisse eros fames congue at
          </p>
          <Button text="Next" icon="chevron_right" />
        </Section>
      </WidthWrapperInner>
    </WidthWrapper>
  </Wrapper>
)
