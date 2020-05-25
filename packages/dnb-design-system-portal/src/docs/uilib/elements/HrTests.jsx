/**
 * To showcase the creation of a DNB Receipt
 *
 */

import React from 'react'
import styled from '@emotion/styled'

import { Section } from 'dnb-ui-lib/src/components'
import { H3, Code, Hr, P } from 'dnb-ui-lib/src/elements'

export default function App() {
  return (
    <Wrapper>
      <Example spacing bottom="x-large">
        <RoundedBorder />
        <H3 bottom>Eufemia hr line</H3>
        <Info>
          <b>0.5px</b> using modified <Code bottom>{'<Hr />'}</Code>
        </Info>
        <EufemiaHr05 />
        <Info>
          <b>1px (default)</b> using
          <Code bottom>{'<Hr />'}</Code>
        </Info>
        <EufemiaHr10 />
        <Info>
          <b>1.5px</b> using modified <Code bottom>{'<Hr />'}</Code>
        </Info>
        <EufemiaHr15 />
        <Info>
          <b>1px</b> using
          <Code bottom>{'<Hr className="dnb-hr--fullscreen" />'}</Code>
        </Info>
        <EufemiaHr10 className="dnb-hr--fullscreen" />
      </Example>

      <Example spacing bottom="x-large">
        <H3 bottom>Shadow line</H3>
        <Info>
          <b>0.5px</b> using
          <Code bottom>{'box-shadow: 0 0 0 0.25px #888'}</Code>{' '}
        </Info>
        <LowResolution>
          <small>
            box-shadow with less than {'<1px'} does not show up in Safari
            12
          </small>
        </LowResolution>
        <BoxShadow05 />
        <Info>
          <b>1px</b> using
          <Code bottom>{'box-shadow: 0 0 0 0.5px #888'}</Code>
        </Info>
        <BoxShadow06 />
        <Info>
          <b>1.5px</b> using
          <Code bottom>{'box-shadow: 0 0 0 0.75px #888'}</Code>
        </Info>
        <BoxShadow15 />
      </Example>

      <Example spacing bottom="x-large">
        {/* <LowResolution /> */}
        <NegativeEffect />
        <RoundedBorder />
        <H3 bottom>Height</H3>
        <Info>
          <b>0.5px</b> using <Code bottom>{'height: 0.5px'}</Code>
        </Info>
        <Height05 />
        <Info>
          <b>1px</b> using <Code bottom>{'height: 1px'}</Code>
        </Info>
        <Height10 />
        <Info>
          <b>1.5px</b> using <Code bottom>{'height: 1.5px'}</Code>
        </Info>
        <Height15 />
      </Example>

      <Example spacing bottom="x-large">
        {/* <LowResolution /> */}
        <NegativeEffect />
        <RoundedBorder />
        <H3 bottom>Plain border</H3>
        <Info>
          <b>0.5px</b> using{' '}
          <Code bottom>{'border-top: 0.5px solid #888'}</Code>
        </Info>
        <Border05 />
        <Info>
          <b>1px</b> using{' '}
          <Code bottom>{'border-top: 1px solid #888'}</Code>
        </Info>
        <Border10 />
        <Info>
          <b>1.5px</b> using{' '}
          <Code bottom>{'border-top: 1.5px solid #888'}</Code>
        </Info>
        <Border15 />
      </Example>

      <Example spacing bottom="x-large">
        {/* <LowResolution /> */}
        {/* <RoundedBorder /> */}
        <H3 bottom>Pseudo and linear-gradient</H3>
        <Info>
          <b>0.5px</b> using{' '}
          <Code bottom>{'::after and 0.5px linear-gradient'}</Code>
        </Info>
        <Pseudo05 />
        <Info>
          <b>1px</b> using{' '}
          <Code bottom>{'::after and 1px linear-gradient'}</Code>
        </Info>
        <Pseudo10 />
        <Info>
          <b>1.5px</b> using{' '}
          <Code bottom>{'::after and 1.5px linear-gradient'}</Code>
        </Info>
        <Pseudo15 />
      </Example>
    </Wrapper>
  )
}

const EufemiaHr10 = styled(Hr)`
  height: 0;
  margin-top: 0;
  &::after {
    color: #888;
  }
`
const EufemiaHr05 = styled(EufemiaHr10)`
  &::after {
    height: 0.5px;
  }
`
const EufemiaHr15 = styled(EufemiaHr10)`
  &::after {
    height: 1.5px;
  }
`
const Pseudo05 = styled.div`
  overflow: visible;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    width: 100%;
    height: 0.5px;

    /* In order to get the hairline, add transparent after 51% */
    background-image: linear-gradient(
      to bottom,
      #888 0%,
      #888 50%,
      transparent 51%
    );
    background-size: 100% 1px;
  }
`
const Pseudo10 = styled(Pseudo05)`
  &::after {
    height: 1px;

    /* Revert the hairline */
    background-image: linear-gradient(to bottom, #888 0%, #888 100%);
    background-size: 100% 1px;
  }
`
const Pseudo15 = styled(Pseudo05)`
  &::after {
    height: 1.5px;

    /* Revert the hairline */
    background-image: linear-gradient(to bottom, #888 0%, #888 100%);
    background-size: 100% 1.5px;
  }
`
const Height05 = styled.div`
  width: 100%;
  height: 0.5px; /* 0.61px works in Safari 12 */
  background-color: #888;
  overflow: visible;
`
const Height10 = styled.div`
  width: 100%;
  height: 1px;
  background-color: #888;
  overflow: visible;
`
const Height15 = styled.div`
  width: 100%;
  height: 1.5px;

  background-color: #888;
`
const BoxShadow05 = styled.div`
  box-shadow: 0 0 0 0.25px #888;
  overflow: visible;
  height: 0;
`
const BoxShadow06 = styled.div`
  box-shadow: 0 0 0 0.5px #888;
  overflow: visible;
  height: 0;
`
const BoxShadow15 = styled.div`
  box-shadow: 0 0 0 0.75px #888;
  overflow: visible;
  height: 0;
`
const Border05 = styled.div`
  border-top: 0.5px solid #888;
  overflow: visible;
`
const Border10 = styled.div`
  border-top: 1px solid #888;
  overflow: visible;
`
const Border15 = styled.div`
  border-top: 1.5px solid #888;
  overflow: visible;
`

const NegativeEffectStyle = styled(P)`
  color: red;
`
const NegativeEffect = ({
  children = 'Bad solution, as this pushes down the content below!'
} = {}) => (
  <NegativeEffectStyle>
    <b>NB:</b> {children}
  </NegativeEffectStyle>
)
const LowResolutionStyle = styled(P)`
  color: orange;
`
const LowResolution = ({
  children = 'This solution gets a low resolution on default screens!'
} = {}) => (
  <LowResolutionStyle>
    <b>NB:</b> {children}
  </LowResolutionStyle>
)
const RoundedBorderStyle = styled(P)`
  color: teal;
`
const RoundedBorder = ({
  children = '0.5px gets rounded to 1px (and 1.5px = 2px) in chromium based browsers!'
} = {}) => (
  <RoundedBorderStyle>
    <b>NB:</b> {children}
  </RoundedBorderStyle>
)

const Info = styled(P)`
  padding: 1.5rem 0 0.25rem;
`
const Example = styled(Section)`
  &::after {
    color: white;
  }
`
const Wrapper = styled.div`
  padding: 0;
`
