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
            <Box>
              <Heading debug>Heading #1</Heading>
              <Heading debug>Heading #2</Heading>
              <Heading debug>Heading #3</Heading>
              <Heading debug increase>
                Heading #4
              </Heading>
              <Heading debug>Heading #5</Heading>
              <Heading debug increase>
                Heading #6
              </Heading>
              <Heading debug decrease>
                Heading #7
              </Heading>
              <Heading debug>Heading #8</Heading>
            </Box>
            <Box>
              <Heading.Level bypass_checks={true} debug level={2}>
                <Heading>Heading #1</Heading>
                <Heading level={4}>Heading #2</Heading>
              </Heading.Level>
            </Box>
            <Box>
              <Heading.Level reset debug>
                <Heading>Heading #1</Heading>
                {/* Heading levels can only increase by factor one! Got: 3 and had before 1 */}
                <Heading level={2}>Heading #2</Heading>
                <Heading>Heading #3</Heading>
                <Heading up>Heading #4</Heading>
                <Heading decrease>Heading #5</Heading>

                {/* Can not decrement to heading level 1! Had before 2 */}
                <Heading decrease>Heading #6</Heading>

                <Heading.Level>
                  <Heading>Heading #7</Heading>
                  <Heading>Heading #8</Heading>
                </Heading.Level>
                <Heading.Level>
                  {/* Heading level increment is not in sync! 3 4 */}
                  <Heading increase>Heading #9</Heading>
                  <Heading>Heading #10</Heading>
                  <Heading>Heading #11</Heading>
                  <Heading decrease>Heading #12</Heading>
                  <Heading>Heading #13</Heading>
                  <Heading decrease>Heading #14</Heading>

                  {/* Can not decrement to heading level 1! Had before 2 */}
                  <Heading decrease>Heading #15</Heading>
                  <Heading increase>Heading #16</Heading>
                  <Heading increase>Heading #17</Heading>
                  <Heading increase>Heading #18</Heading>
                  <Heading increase>Heading #19</Heading>
                  <Heading increase>Heading #20</Heading>
                </Heading.Level>
              </Heading.Level>
            </Box>
          </Wrapper>
        </Provider>
      </CustomStyle>
    )
  }
]
