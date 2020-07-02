/**
 * dnb-ui-lib Component Story
 *
 */

import React from 'react'
import { Wrapper, Box } from '../helpers'
import styled from '@emotion/styled'

import {
  Input,
  // InputMasked,
  // Modal,
  // Button,
  // FormSet,
  FormRow,
  ToggleButton,
  Skeleton
  // FormLabel
} from '../../src/components'
import { H1, H2, P } from '../../src/elements'
import Provider from '../../src/shared/Provider'

const CustomStyle = styled.div`
  p {
    background-color: rgba(213, 30, 149, 0.25);
  }
`

const WidthLimit = styled(FormRow)`
  ${'' /* width: 10rem; */}
`

export default [
  'Skeleton',
  () => {
    // React.useEffect(() => {
    //   console.log('myRef', myRef.current)
    //   // console.log('myRef', Input, myRef.current)
    //   // myRef.current.focus()
    // })

    const [showSkeleton, setSkeletonState] = React.useState(true)
    // console.log('showSkeleton', showSkeleton)

    return (
      <Provider
        skeleton={showSkeleton}
        // formRow={{ skeleton: showSkeleton }}
      >
        <CustomStyle>
          <Wrapper>
            <Box>
              <ToggleButton
                checked={showSkeleton}
                on_change={() => setSkeletonState((s) => !s)}
              >
                Toggle Skeleton
              </ToggleButton>
              <H2 top bottom>
                Heading
              </H2>
              {/* <P top bottom>
                Paragraph Non habitasse ut nisi dictum laoreet ridiculus
                dui.
              </P> */}
              {/* <Input label_direction="vertical" label="Input" /> */}
            </Box>
            <Box>
              <WidthLimit vertical>
                {/* <div className="dnb-skeleton dnb-h--large">y</div> */}
                <H1>H1</H1>
                <P top>
                  Paragraph Non habitasse ut nisi dictum laoreet ridiculus
                  dui varius per nullam vel consectetur malesuada platea
                  molestie semper consequat commodo urna
                </P>
                <Input top label="Input" />
                <Input
                  top
                  label="Input"
                  size="medium"
                  value="Value"
                  icon="calendar"
                  align="right"
                />
                <Input
                  top
                  label="Input"
                  size="large"
                  placeholder="Placeholder"
                  icon_position="right"
                  icon="calendar"
                  align="right"
                />
                <Skeleton top className="dnb-h--xx-large" width={20}>
                  {/* x */}
                </Skeleton>
                <Skeleton top className="dnb-p" width={20} />
                <Skeleton top figure="article" />
                {/* <Skeleton show top>
                  <P>Paragraph</P>
                </Skeleton> */}
                end
              </WidthLimit>
            </Box>
          </Wrapper>
        </CustomStyle>
      </Provider>
    )
  }
]
