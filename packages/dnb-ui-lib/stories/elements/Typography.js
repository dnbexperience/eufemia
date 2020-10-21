/**
 * Storybook Story
 *
 */

import React from 'react'
import { Wrapper, Box } from '../helpers'
import styled from '@emotion/styled'

export default {
  title: 'Eufemia/Elements/Typography'
}

const CustomStyle = styled.div`
  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    background-color: rgba(0, 200, 200, 0.25);
    :only-child {
      background-color: rgba(255, 255, 122, 0.35);
    }
  }
  h1 ~ h1,
  h2 ~ h2,
  h3 ~ h3,
  h4 ~ h4,
  h5 ~ h5,
  h6 ~ h6 {
    background-color: rgba(213, 30, 149, 0.25);
    :only-child {
      background-color: rgba(0, 200, 200, 1);
    }
  }
  p {
    background-color: rgba(213, 30, 149, 0.25);
  }
`

const HeadingsWithStyles = () => (
  <CustomStyle>
    <h1 className="dnb-h--xx-large">H1</h1>
    <h2 className="dnb-h--large">H2</h2>
    <h3 className="dnb-h--medium">H3</h3>
    <h4 className="dnb-h--basis">H4</h4>
    <h5 className="dnb-h--small">H5</h5>
    <h6 className="dnb-h--x-small">H6</h6>
    <p className="dnb-p">
      Paragraph with Link{' '}
      <a className="dnb-anchor" href="#anchor">
        Anchor
      </a>{' '}
      Posuere eget
      <code>vestibulum</code> nostra odio varius <span>integer</span>
      ullamcorper curabitur mi
    </p>
    <p className="dnb-p">Another Paragraph</p>
  </CustomStyle>
)

export const Headings = () => (
  <Wrapper className="dnb-spacing">
    <Box>
      <HeadingsWithStyles />
    </Box>
  </Wrapper>
)

export const Paragraph = () => (
  <Wrapper className="dnb-spacing">
    <CustomStyle>
      <Box>
        <article>
          <h1 className="dnb-h--xx-large">H1</h1>
          <p className="dnb-p">Paragraph A</p>
          <p className="dnb-p">Paragraph B</p>
          <p className="dnb-p">Paragraph C</p>
        </article>
        <article>
          <h2 className="dnb-h--large">H2</h2>
          <p className="dnb-p">Paragraph A</p>
          <p className="dnb-p">Paragraph B</p>
          <p className="dnb-p">Paragraph C</p>
        </article>
        <h2 className="dnb-h--large">H3</h2>
      </Box>
    </CustomStyle>
  </Wrapper>
)

export const Small = () => (
  <Wrapper className="dnb-spacing">
    <CustomStyle>
      <Box>
        {/* p */}
        <p className="dnb-p">
          Posuere eget vestibulum <small>Small Text</small> integer{' '}
          <a className="dnb-anchor" href="#anchor">
            Normal Anchor
          </a>{' '}
          <a className="dnb-anchor" href="#anchor">
            <small>Small Anchor</small>
          </a>{' '}
          curabitur mi
        </p>
      </Box>
      <Box>
        {/* h1 */}
        <h1 className="dnb-h--xx-large">
          <small>Small H1</small> Normal H1
        </h1>
        <h1 className="dnb-h--xx-large">
          <small>Small only H1</small>
        </h1>
        <h1 className="dnb-h--xx-large dnb-small">Small class H1</h1>
      </Box>
      <Box>
        {/* h2 */}
        <h2 className="dnb-h--large">
          Normal H2 <small>Small H2</small>
        </h2>
        <h2 className="dnb-h--large">
          <small>Small only H2</small>
        </h2>
        <h2 className="dnb-h--large dnb-small">Small class H2</h2>
      </Box>
      <Box>
        {/* h3 */}
        <h3 className="dnb-h--medium">
          Normal H3 <small>Small H3</small>
        </h3>
        <h3 className="dnb-h--medium">
          <small>Small only H3</small>
        </h3>
        <h3 className="dnb-h--medium dnb-small">Small class H3</h3>
      </Box>
      <Box>
        {/* h4 */}
        <h4 className="dnb-h--basis">
          Normal H4 <small>H4 Small</small>
        </h4>
        <h4 className="dnb-h--basis">Normal H4</h4>
      </Box>
      <Box>
        {/* h5 */}
        <h5 className="dnb-h--small">
          Normal H5 <small>H5 Small</small>
        </h5>
        <h5 className="dnb-h--small">Normal H5</h5>
      </Box>
      <Box>
        {/* h6 */}
        <h6 className="dnb-h--x-small">
          Normal H6 <small>H6 Small</small>
        </h6>
        <h6 className="dnb-h--x-small">Normal H6</h6>
      </Box>
    </CustomStyle>
  </Wrapper>
)

export const HeadingsOutside = () => (
  <Wrapper>
    <Box>
      <HeadingsWithStyles />
    </Box>
  </Wrapper>
)

HeadingsOutside.title = 'Headings outside of `dnb-spacing`'
