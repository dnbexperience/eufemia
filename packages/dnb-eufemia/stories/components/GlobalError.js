/**
 * @dnb/eufemia Component Story
 *
 */

import React from 'react' // , useEffect // useState
import { Wrapper } from '../helpers'
import styled from '@emotion/styled'

import { GlobalError } from '../../src/components'
import { H2, P, Link } from '../../src/elements'

export default {
  title: 'Eufemia/Components/GlobalError'
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
      <GlobalError status="404" />
      <GlobalError status="500">
        <CustomStatus />
      </GlobalError>
    </Wrapper>
  </Bg>
)
