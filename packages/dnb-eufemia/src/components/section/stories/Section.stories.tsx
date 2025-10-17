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
      <Section style_type="divider">
        <P top="xx-large" bottom="xx-large">
          style_type="divider"
        </P>
      </Section>
      <Section style_type="white">
        <P top="xx-large" bottom="xx-large">
          style_type="white"
        </P>
      </Section>
      <Section style_type="transparent">
        <P top="xx-large" bottom="xx-large">
          style_type="transparent"
        </P>
      </Section>
      <Section style_type="lavender">
        <P top="xx-large" bottom="xx-large">
          style_type="lavender"
        </P>
      </Section>
      <Section style_type="pistachio">
        <P top="xx-large" bottom="xx-large">
          style_type="pistachio"
        </P>
      </Section>
      <Section style_type="emerald-green">
        <P top="xx-large" bottom="xx-large">
          style_type="emerald-green"
        </P>
      </Section>
      <Section style_type="sea-green">
        <P top="xx-large" bottom="xx-large">
          style_type="sea-green"
        </P>
      </Section>
      <Section style_type="fire-red">
        <P top="xx-large" bottom="xx-large">
          style_type="fire-red"
        </P>
      </Section>
      <Section style_type="fire-red-8">
        <P top="xx-large" bottom="xx-large">
          style_type="fire-red-8"
        </P>
      </Section>
      <Section style_type="pistachio">
        <P top="xx-large" bottom="xx-large">
          style_type="pistachio"
        </P>
      </Section>
      <Section style_type="sand-yellow">
        <P top="xx-large" bottom="xx-large">
          style_type="sand-yellow"
        </P>
      </Section>
      <Section style_type="black-3">
        <P top="xx-large" bottom="xx-large">
          style_type="black-3"
        </P>
      </Section>
      <Section style_type="mint-green">
        <P top="xx-large" bottom="xx-large">
          style_type="mint-green"
        </P>
      </Section>
      <Section style_type="mint-green-12">
        <P top="xx-large" bottom="xx-large">
          style_type="mint-green-12"
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
        <Section style_type="emerald-green" innerSpace>
          <p className="dnb-p">
            Tempor auctor mi vel sociosqu suspendisse eros fames congue at
          </p>
          <Button text="Next" icon="chevron_right" />
        </Section>
      </WidthWrapperInner>
    </WidthWrapper>
  </Wrapper>
)
