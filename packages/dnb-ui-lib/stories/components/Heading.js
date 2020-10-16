/**
 * dnb-ui-lib Component Story
 *
 */

import React from 'react'
import { Wrapper, Box } from '../helpers'
import styled from '@emotion/styled'
import { H2, H3 } from '../../src/elements'
import { ToggleButton, Button } from '../../src/components'
import Provider from '../../src/shared/Provider'
import Heading, {
  setNextLevel,
  resetLevels
} from '../../src/components/Heading'

export default {
  title: 'Eufemia/Components/Heading'
}

const CustomStyle = styled.div`
  /* .dnb-heading {
  } */
`

const ChangeLevel = ({ level }) => {
  React.useEffect(() => {
    // resetLevels()
    setNextLevel(level)
  }, [])
  return <></>
}
const warn = (...log) => {
  console.log(...log)
}

export const HeadingSandbox = () => {
  const [showHeading, setShowHeading] = React.useState(false)

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      setShowHeading(true)
    }, 100)

    return () => clearTimeout(timeout)
  })

  return (
    <CustomStyle>
      <Provider>
        <Wrapper>
          <Box>
            {' '}
            <Heading.Level debug={warn} reset={1}>
              <Heading>Heading #1</Heading>
              <Heading>Heading #2</Heading>
              <Heading increase>Heading #3</Heading>
              <Heading.Level reset>
                <Heading>Heading #4</Heading>
              </Heading.Level>
              <Heading reset>Heading #4</Heading>
            </Heading.Level>
          </Box>
          <Box>
            <App />
          </Box>
          {/* <Box>
              <Heading level={2} debug={warn}>
                Heading #1
              </Heading>
              <Heading.Level reset={1} debug={warn}>
                <Heading level={2}>Heading #2</Heading>
                <Heading level={3}>Heading #3</Heading>
                <Heading level={4}>Heading #4</Heading>
                <Heading level={4}>Heading #5</Heading>
                <Heading level={2}>Heading #6</Heading>
                <Heading level={1}>Heading #7</Heading>
              </Heading.Level>
              <Heading.Level debug={warn}>
                <Heading>Heading #8</Heading>
              </Heading.Level>
              <Heading.Level increase debug={warn}>
                <Heading>Heading #9</Heading>
              </Heading.Level>
              <Heading.Level inherit debug={warn}>
                <Heading>Heading #10</Heading>
              </Heading.Level>
            </Box> */}
          <Box>
            <Heading group="A" level={2} debug={warn}>
              Heading #1 A
            </Heading>
            <Heading group="A" debug={warn}>
              Heading #1 A
            </Heading>
            <Heading.Level group="B" debug={warn}>
              Heading.Level B
              <Heading group="C" debug={warn}>
                Heading #2 C1
              </Heading>
              <Heading group="C" debug={warn}>
                Heading #2 C2
              </Heading>
              <Heading.Level group="async" debug={warn}>
                {showHeading && (
                  <Heading group="X" increase debug={warn}>
                    Heading #X
                  </Heading>
                )}
              </Heading.Level>
              <Heading group="C" increase debug={warn}>
                Heading #2 C3
              </Heading>
              <Heading.Level group="D" debug={warn}>
                Heading.Level D
                <Heading group="E" increase debug={warn}>
                  Heading #3 E
                </Heading>
                <Heading group="G" increase debug={warn}>
                  Heading #4
                </Heading>
                <Heading group="C" decrease debug={warn}>
                  Heading #4
                </Heading>
              </Heading.Level>
              <Heading group="C" decrease debug={warn}>
                Heading #4
              </Heading>
              <Heading
                // level={1}
                debug={warn}
              >
                Heading #1
              </Heading>
              <Heading level={2} debug={warn}>
                Heading #1
              </Heading>
              <Heading level={3} debug={warn}>
                Heading #1
              </Heading>
            </Heading.Level>

            <Heading.Level inherit debug={warn}>
              <Heading>Heading inherit #2</Heading>
              <Heading increase>Heading #3</Heading>
              <Heading level={4}>Heading #4</Heading>
              <Heading level={4}>Heading #5</Heading>
              <Heading level={2}>Heading #6</Heading>
              <Heading level={1}>Heading #7</Heading>
            </Heading.Level>

            {/* <Heading.Level debug={warn}>
                <Heading>Heading #8</Heading>
              </Heading.Level> */}
            {/* <Heading increase debug>
                Heading #9
              </Heading>
              <Heading increase debug>
                Heading #9
              </Heading> */}
            {/* <Heading.Level increase debug={warn}>
                <Heading>Heading #9</Heading>
              </Heading.Level> */}
            {/* <Heading.Level increase debug={warn}>
                <Heading>Heading #9</Heading>
              </Heading.Level>
              <Heading.Level inherit debug={warn}>
                <Heading>Heading #10</Heading>
              </Heading.Level> */}
          </Box>
          <Box>
            <H2 level="use">Heading #1</H2>
            <Heading debug increase>
              Heading #2
            </Heading>
            <Heading debug increase>
              Heading #3
            </Heading>
            ---
            <Heading.Level debug>
              <ChangeLevel level="2" />
              <Heading>Heading #1</Heading>
              <Heading increase>Heading #2</Heading>
              <Heading level={4}>Heading #3</Heading>
            </Heading.Level>
          </Box>
          <Box>
            {/* <Heading level={2} debug>
                Heading #1
              </Heading>
              <Heading debug>Heading #1a</Heading>
              <Heading debug increase>
                Heading #2a
              </Heading>
              <Heading debug increase>
                Heading #2a
              </Heading>
              --- */}
            <Heading.Level group="A" debug inherit>
              <Heading>Heading #1</Heading>
              <Heading increase>Heading #2</Heading>
            </Heading.Level>
            ---
            <Heading.Level reset debug={warn}>
              <Heading>Heading #1</Heading>
              <Heading>Heading #2</Heading>
              <H3 level="use">Heading #3</H3>
              <Heading>Heading #4</Heading>
            </Heading.Level>
            ---
            <Heading debug>Heading #1b</Heading>
            <Heading level={3} debug>
              Heading #2b
            </Heading>
            <Heading reset debug>
              Heading #1b
            </Heading>
            <Heading level={3} debug>
              Heading #2b
            </Heading>
            <Heading increase debug>
              Heading #3b
            </Heading>
            ---
            {/* <Heading inherit debug>
                Heading #1b
              </Heading>
              <Heading debug increase>
                Heading #2b
              </Heading> */}
            ---
            {/* <Heading debug>Heading #2b</Heading> */}
            ---
            {/* <Heading.Level debug inherit increase group="D">
                <Heading>Heading #6</Heading>
                <Heading increase>Heading #7</Heading>
              </Heading.Level> */}
            ---
            {/* <Heading debug>Heading #1b</Heading> */}
            ---
            {/* <Heading.Level debug level={5} group="E">
                <Heading>Heading #6</Heading>
                <Heading increase>Heading #7</Heading>
              </Heading.Level> */}
            ---
            {/* <Heading.Level group="X" debug decrease>
                <Heading>Heading #1</Heading>
              </Heading.Level> */}
            ---
            {/* <Heading.Level group="z" debug reset>
                <Heading level={2}>Heading #1</Heading>
              </Heading.Level> */}
            ---
            {/* <Heading level={2} debug>
                Heading #1
              </Heading> */}
            ---
            {/* <Heading.Level reset debug>
                <Heading level={2}>Heading #1</Heading>
                <Heading level={3}>Heading #2</Heading>
                <Heading level={5}>Heading #3</Heading>
                <Heading level={4}>Heading #4</Heading>
                <Heading level={2}>Heading #5</Heading>
                <Heading level={1}>Heading #6</Heading>
              </Heading.Level> */}
          </Box>
          {/* <Box>
              <H2 level="use">Heading #1</H2>
              <Heading debug increase>
                Heading #2
              </Heading>
              <Heading debug increase>
                Heading #3
              </Heading>
              ---
              <Heading.Level debug>
                <ChangeLevel level="2" />
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
                <Heading level={2}>Heading #2</Heading>
                <Heading>Heading #3</Heading>
                <Heading up>Heading #4</Heading>
                <Heading decrease>Heading #5</Heading>

                <Heading decrease>Heading #6</Heading>

                <Heading.Increase>
                  <Heading>Heading #7</Heading>
                  <Heading>Heading #8</Heading>
                </Heading.Increase>
                <Heading.Increase>
                  <Heading increase>Heading #9</Heading>
                  <Heading>Heading #10</Heading>
                  <Heading>Heading #11</Heading>
                  <Heading decrease>Heading #12</Heading>
                  <Heading>Heading #13</Heading>
                  <Heading decrease>Heading #14</Heading>

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
            </Box> */}
        </Wrapper>
      </Provider>
    </CustomStyle>
  )
}

// const StateUpdate = () => {
//   const [level, setLevel] = React.useState(1)
//   const [foo, setFoo] = React.useState('bar')

//   React.useEffect(() => {
//     const tA = setTimeout(() => {
//       setLevel(3)
//       setFoo('x')
//     }, 1e3)
//     const tB = setTimeout(() => {
//       setFoo('b')
//     }, 2e3)
//     const tC = setTimeout(() => {
//       setFoo('c')
//     }, 3e3)
//     return () => {
//       clearTimeout(tA)
//       clearTimeout(tB)
//       clearTimeout(tC)
//     }
//   }, [])

//   return (
//     <Heading.Level debug reset>
//       <Heading level={level}>Heading #1</Heading>
//       <Heading increase>Heading #2 {foo}</Heading>
//     </Heading.Level>
//   )
// }

// const StateUpdateKeepLevel = () => {
//   // const [level, setLevel] = React.useState(1)
//   const [foo, setFoo] = React.useState(1)
//   const [skip_correction, setskip_correction] = React.useState(false)

//   React.useEffect(() => {
//     const tA = setTimeout(() => {
//       setskip_correction(true)
//       setFoo(3)
//     }, 500)

//     return () => {
//       clearTimeout(tA)
//     }
//   }, [])

//   return (
//     <>
//       {/* <Heading debug>Heading #1</Heading> */}
//       <Heading debug level={foo} skip_correction={skip_correction}>
//         Heading #2
//       </Heading>
//     </>
//   )
// }

function App() {
  // const [showHeading3, setShowHeading3] = React.useState(false)
  const [showHeading3, setShowHeading3] = React.useState(false)
  const [showHeading4, setShowHeading4] = React.useState(false)

  React.useState(() => {
    resetLevels(1)
  })

  return (
    <Heading.Level
      group="A"
      debug
      debug_counter
      // reset={1}
    >
      <Button text="Reset" size="small" onClick={() => resetLevels(1)} />

      <Heading>h1</Heading>
      <Heading>h2</Heading>
      <Heading increase>h3</Heading>

      <Heading.Level group="B">
        <ToggleButton
          text="Toggle h3"
          size="small"
          checked={showHeading3}
          onChange={() => setShowHeading3((c) => !c)}
        />

        <Heading>h3 before</Heading>
        {showHeading3 && (
          <>
            <Heading increase>h4 1</Heading>
            <Heading>h4 2</Heading>
            <Heading increase>h5 1</Heading>
          </>
        )}
        <Heading>h3 after</Heading>

        <Heading.Increase group="C">
          <ToggleButton
            text="Toggle h4"
            size="small"
            checked={showHeading4}
            onChange={() => setShowHeading4((c) => !c)}
          />
          {showHeading4 && (
            <>
              <Heading>h4</Heading>
              <Heading>h4</Heading>
              <Heading increase>h5</Heading>
            </>
          )}
        </Heading.Increase>
      </Heading.Level>

      <Heading.Level group="C">
        <Heading>h2</Heading>
      </Heading.Level>
    </Heading.Level>
  )
}
