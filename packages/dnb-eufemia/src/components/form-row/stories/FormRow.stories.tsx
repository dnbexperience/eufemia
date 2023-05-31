/**
 * @dnb/eufemia Component Story
 *
 */

import React from 'react'
import { Wrapper, Box } from 'storybook-utils/helpers'
import styled from '@emotion/styled'

import { H2, H3 } from '../../../elements'

import { Input, FormRow } from '../..'

export default {
  title: 'Eufemia/Components/FormRow',
}

const Center = styled.div`
  display: flex;
  .dnb-h--large,
  .dnb-h--medium {
    margin: 0 0 2rem;
    line-height: 1.5rem;
  }
`

export const FormRowSandbox = () => (
  <Center>
    <Wrapper showOverflow>
      {/* <Box>
        <H3 bottom="large">Plain</H3>
        <AllComponents showText horizontal vertical />
      </Box> */}

      {/* <Box>
        <H3 bottom="large">Horizontal label</H3>
        <Provider
          FormRow={{
            direction: 'horizontal',
          }}
        >
          <FormRow
            label="Horizontal Legend Aptent:"
          >
            <AllComponents showText horizontal />
          </FormRow>
        </Provider>
      </Box> */}

      {/* <Box>
        <H3 bottom="large">Horizontal with vertical label direction</H3>
        <FormRow label="Vertical Legend:" label_direction="vertical">
          <AllComponents showText horizontal />
        </FormRow>
      </Box> */}

      {/* <Box>
        <H3 bottom="large">
          Horizontal with vertical label direction, but no label
        </H3>
        <FormRow label="Vertical Legend:" label_direction="vertical">
          <AllComponents showText horizontal hideLabel />
        </FormRow>
      </Box> */}

      {/* <Box>
        <H3 bottom="large">Vertical direction</H3>
        <FormRow label="Vertical direction:" direction="vertical">
          <AllComponents showText />
        </FormRow>
      </Box> */}

      {/* <Box>
        <H3 bottom="large">Vertical everything</H3>
        <FormRow label="Vertical everything:" vertical={true}>
          <AllComponents showText />
        </FormRow>
      </Box> */}

      <Box>
        <FormRow label="Inputs legend:">
          <Input value="Input value A ..." right="small" />
          <Input value="Input value B ..." />
        </FormRow>
      </Box>

      <Box>
        <H2 bottom="large">Combine vertical and horizontal</H2>
        <FormRow
          label={
            <H3 top={false} bottom="large">
              Custom vertical legend:
            </H3>
          }
          vertical
          top="medium"
          // no_fieldset
        >
          <Input label="Vertical input A" />
          <Input label="Vertical input B" top="medium" />
          <FormRow
            // label="Horizontal legend:"
            // direction="horizontal"

            vertical={false}
            label_direction="horizontal"
            top="medium"
          >
            <Input label="Horizontal input A" right="small" />
            <Input label="Horizontal input B" />
          </FormRow>
          <Input label="Vertical input C" top="medium" />
        </FormRow>
      </Box>
    </Wrapper>
  </Center>
)

// export const FormRowStretch = () => {
//   return <AllStretchComponents />
// }
