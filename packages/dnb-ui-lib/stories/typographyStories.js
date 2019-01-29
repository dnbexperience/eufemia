/**
 * Storybook Story
 *
 */

import React from 'react'
import { Wrapper, Box } from './helpers'

const stories = []
export default stories

stories.push([
  'Headings',
  () => (
    <Wrapper className="dnb-style">
      <Box>
        <h1>H1</h1>
        <h2>H2</h2>
        <h3>H3</h3>
        <h4>H4</h4>
        <h5>H5</h5>
        <h6>H6</h6>
        <p>
          Paragraph with Link <a href="https://dnb.no">Anchor</a> Posuere
          eget vestibulum nostra odio varius integer ullamcorper curabitur
          mi
        </p>
      </Box>
    </Wrapper>
  )
])

stories.push([
  'Headings outside of `dnb-style`',
  () => (
    <Wrapper>
      <Box>
        <h1>H1</h1>
        <h2>H2</h2>
        <h3>H3</h3>
        <h4>H4</h4>
        <h5>H5</h5>
        <h6>H6</h6>
        <p>
          Paragraph with Link <a href="https://dnb.no">Anchor</a> Posuere
          eget vestibulum nostra odio varius integer ullamcorper curabitur
          mi
        </p>
      </Box>
    </Wrapper>
  )
])
