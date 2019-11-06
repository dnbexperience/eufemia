/**
 * Storybook Story
 *
 */

import React from 'react'
import { Wrapper, Box } from './helpers'
import styled from '@emotion/styled'
import { Button, Section } from 'dnb-ui-lib/src'

const stories = []
export default stories

const SkipLinkReset = styled.div`
  /* empty */
`
const WidthWrapper = styled.div`
  display: flex;
  justify-content: center;
`
const WidthWrapperInner = styled.div`
  /* for large screesn */
  width: 84vw; /* apr. the same as 60rem */
  max-width: 60rem;
  padding: 0 1rem;

  /* for small screesn */
  @media (max-width: 40em) {
    width: 95vw;
    padding: 0;
  }
`

stories.push([
  'Skip Link',
  () => (
    <Wrapper>
      <Box>
        <SkipLinkReset>
          <a
            className="dnb-skip-link-demo"
            href="#dnb-app-content"
            onClick={e => e.preventDefault()}
          >
            Skip to content
          </a>
        </SkipLinkReset>
      </Box>
    </Wrapper>
  )
])

stories.push([
  'Section',
  () => (
    <Wrapper>
      <WidthWrapper>
        <WidthWrapperInner>
          <Section style_type="emerald-green" spacing>
            <p className="dnb-p">
              Tempor auctor mi vel sociosqu suspendisse eros fames congue
              at
            </p>
            <Button text="Next" icon="chevron_right" />
          </Section>
        </WidthWrapperInner>
      </WidthWrapper>
    </Wrapper>
  )
])
