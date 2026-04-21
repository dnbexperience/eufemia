/**
 * @dnb/eufemia Component Story
 *
 */

import React from 'react' // , useEffect // useState
import { Wrapper } from 'storybook-utils/helpers'
import styled from '@emotion/styled'

import { GlobalError } from '../..'
import { H2, P, Link } from '../../..'

export default {
  title: 'Eufemia/Components/GlobalError',
}

const CustomStatus = () => (
  <>
    <H2>Custom Status</H2>
    <P>
      <Link href="/">Goto</Link> more text
    </P>
  </>
)
const Bg = styled.div`
  height: 100%;
  width: 100%;
  background: blue;
`

export const GlobalErrorSandbox = () => (
  <Bg>
    <Wrapper>
      <GlobalError statusCode="404" />
      <GlobalError statusCode="500">
        <CustomStatus />
      </GlobalError>
    </Wrapper>
  </Bg>
)

export const GlobalErrorExample = () => (
  <Wrapper>
    <GlobalError
      statusCode="404"
      title="title"
      text="text"
      aria-label="Label"
    />
  </Wrapper>
)
