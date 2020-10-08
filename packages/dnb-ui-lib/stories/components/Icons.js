/**
 * dnb-ui-lib Component Story
 *
 */

import React from 'react'
import { Wrapper, Box } from '../helpers'
// import styled from '@emotion/styled'

import { Button, Icon, IconPrimary } from '../../src/components'
import { add as Svg } from '../../src/icons'
import { P, H1, H4 } from '../../src/elements'

export const Icons = () => (
  <Wrapper>
    <Box>
      text
      <Svg />
      <Icon icon={Svg} />
    </Box>
    <Box>
      <H1>
        My H1 with an auto <Icon icon={Svg} size="auto" />
      </H1>
      <H4>
        My H4 with the same auto <Icon icon={Svg} size="auto" />
      </H4>
    </Box>
    <Box>
      <IconPrimary icon="add" size="medium" />
    </Box>
    <Box>
      <P>
        text <IconPrimary icon="add" />
        text <IconPrimary icon="add" size="medium" />
        text
      </P>
      <H1>
        text <IconPrimary icon="add" right />
        text <IconPrimary icon="add" size="medium" right />
        auto <IconPrimary icon="add" size="auto" right />
        text
      </H1>
    </Box>
    <Box>
      <P>
        text <IconPrimary icon="add" border right />
        text <IconPrimary icon="add" size="medium" border right />
        text
        <Button icon="add" text="Button" right />
        <Button
          icon={<IconPrimary icon="add" border />}
          text="Button"
          right
        />
      </P>
      <H1 top>
        text <IconPrimary icon="add" border right />
        text <IconPrimary icon="add" size="medium" border right />
        auto <IconPrimary icon="add" size="auto" border right />
        text
      </H1>
    </Box>
    <Box>
      <Button icon="add" right />
      <Button icon="add" variant="primary" />
    </Box>
    <Box>
      <Button title="Click Me" on_click={showMe}>
        <IconPrimary icon="add" size="medium" />
      </Button>
    </Box>
    <Box>
      <Button
        title="Click Me"
        on_click={showMe}
        variant="tertiary"
        icon="add"
      />
    </Box>
  </Wrapper>
)

const showMe = (e) => {
  console.log('showMe', e)
}
