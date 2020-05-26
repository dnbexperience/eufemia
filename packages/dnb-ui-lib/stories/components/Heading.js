/**
 * dnb-ui-lib Component Story
 *
 */

import React from 'react'
import { Wrapper, Box } from '../helpers'
import styled from '@emotion/styled'
// import { P } from '../../src/elements'
import Provider from '../../src/shared/Provider'
import Heading from '../../src/components/Heading'

const CustomStyle = styled.div`
  /* .dnb-heading {
  } */
`

export default [
  'Heading',
  () => {
    return (
      <CustomStyle>
        <Provider>
          <Wrapper>
            {/* <Box>
              <Heading>Heading</Heading>
              <Heading>Heading</Heading>
              <Heading>Heading</Heading>
              <Heading increase>Heading</Heading>
              <Heading>Heading</Heading>
              <Heading increase>Heading</Heading>
              <Heading decrease>Heading</Heading>
              <Heading>Heading</Heading>
            </Box> */}
            <Box>
              <Heading.Level>
                <Heading>Heading</Heading>
                {/* Heading levels can only increase by factor one! Got: 3 and had before 1 */}
                <Heading level={2}>Heading</Heading>
                <Heading>Heading</Heading>
                <Heading increase>Heading</Heading>
                <Heading decrease>Heading</Heading>

                {/* Can not decrement to heading level 1! Had before 2 */}
                <Heading decrease>Heading</Heading>

                <Heading.Level>
                  <Heading>Heading</Heading>
                  <Heading>Heading</Heading>
                </Heading.Level>
                <Heading.Level>
                  {/* Heading level increment is not in sync! 3 4 */}
                  <Heading increase>Heading</Heading>
                  <Heading>Heading</Heading>
                  <Heading>Heading</Heading>
                  <Heading decrease>Heading</Heading>
                  <Heading>Heading</Heading>
                  <Heading decrease>Heading</Heading>

                  {/* Can not decrement to heading level 1! Had before 2 */}
                  <Heading decrease>Heading</Heading>
                </Heading.Level>
              </Heading.Level>
            </Box>
          </Wrapper>
        </Provider>
      </CustomStyle>
    )
  }
]
