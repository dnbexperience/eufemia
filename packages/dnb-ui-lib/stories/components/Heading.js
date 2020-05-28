/**
 * dnb-ui-lib Component Story
 *
 */

import React from 'react'
import { Wrapper, Box } from '../helpers'
import styled from '@emotion/styled'
import { H2 } from '../../src/elements'
import Provider from '../../src/shared/Provider'
import Heading, {
  // resetLevels,
  setNextLevel
} from '../../src/components/Heading'

const CustomStyle = styled.div`
  /* .dnb-heading {
  } */
`

const RenderNow = () => {
  // resetLevels()
  setNextLevel(2)
  return <></>
}

export default [
  'Heading',
  () => {
    return (
      <CustomStyle>
        <Provider>
          <Wrapper>
            <Box>
              <H2 level="auto" H2>
                Heading #1
              </H2>
              <Heading debug increase>
                Heading #2
              </Heading>
              <Heading debug increase>
                Heading #3
              </Heading>
              ---
              <Heading.Level debug>
                <RenderNow />
                <Heading>Heading #1</Heading>
                <Heading increase>Heading #2</Heading>
                <Heading level={4}>Heading #3</Heading>
              </Heading.Level>
            </Box>
            <Box>
              <Heading.Level reset debug>
                <Heading level={2}>Heading #1</Heading>
                <Heading level={3}>Heading #2</Heading>
                <Heading level={4}>Heading #3</Heading>
                <Heading level={4}>Heading #4</Heading>
              </Heading.Level>
            </Box>
            <Box>
              <Heading.Level reset debug>
                <Heading>Heading #1</Heading>
                <Heading>Heading #2</Heading>
                <Heading>Heading #3</Heading>
                <Heading increase>Heading #4</Heading>
                <Heading>Heading #5</Heading>
                <Heading increase>Heading #6</Heading>
                <Heading decrease>Heading #7</Heading>
                <Heading>Heading #8</Heading>
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

                <Heading.Increase>
                  <Heading>Heading #7</Heading>
                  <Heading>Heading #8</Heading>
                </Heading.Increase>
                <Heading.Increase>
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
                </Heading.Increase>
              </Heading.Level>
            </Box>
            <Box>
              <StateUpdate />
            </Box>
            <Box>
              <StateUpdateKeepLevel />
            </Box>
          </Wrapper>
        </Provider>
      </CustomStyle>
    )
  }
]

const StateUpdate = () => {
  const [level, setLevel] = React.useState(1)
  const [foo, setFoo] = React.useState('bar')

  React.useEffect(() => {
    const tA = setTimeout(() => {
      setLevel(3)
      setFoo('x')
    }, 1e3)
    const tB = setTimeout(() => {
      setFoo('b')
    }, 2e3)
    const tC = setTimeout(() => {
      setFoo('c')
    }, 3e3)
    return () => {
      clearTimeout(tA)
      clearTimeout(tB)
      clearTimeout(tC)
    }
  }, [])

  return (
    <Heading.Level debug reset>
      <Heading level={level}>Heading #1</Heading>
      <Heading increase>Heading #2 {foo}</Heading>
    </Heading.Level>
  )
}

const StateUpdateKeepLevel = () => {
  // const [level, setLevel] = React.useState(1)
  const [foo, setFoo] = React.useState('bar')

  React.useEffect(() => {
    const tA = setTimeout(() => {
      setFoo('a')
    }, 1e3)
    const tB = setTimeout(() => {
      setFoo('b')
    }, 2e3)
    const tC = setTimeout(() => {
      setFoo('c')
    }, 3e3)

    return () => {
      clearTimeout(tA)
      clearTimeout(tB)
      clearTimeout(tC)
    }
  }, [])

  return (
    <Heading.Level debug reset>
      <Heading>Heading #1</Heading>
      <Heading increase>Heading #2 {foo}</Heading>
    </Heading.Level>
  )
}
