/**
 * dnb-ui-lib Component Story
 *
 */

import React from 'react'
import { Wrapper, Box } from '../helpers'
// import styled from '@emotion/styled'

import { Button, Icon, IconPrimary } from '../../src/components'
import { add as Svg } from '../../src/icons'

export default [
  'Icons',
  () => (
    <Wrapper>
      <Box>
        <Svg />
        <Icon icon={Svg} />
      </Box>
      <Box>
        <h1>
          My H1 with an Icon <Icon icon={Svg} size="auto" />
        </h1>
        <h4>
          My H4 with the same Icon <Icon icon={Svg} size="auto" />
        </h4>
      </Box>
      <Box>
        <IconPrimary icon="add" size="medium" />
      </Box>
      <Box>
        text <IconPrimary icon="add" right="x-small" />
        <IconPrimary icon="add" size="medium" /> text
        <h1 className="dnb-h1">
          text <IconPrimary icon="add" right="x-small" />
          <IconPrimary icon="add" size="medium" /> text{' '}
          <IconPrimary icon="add" size="auto" /> text
        </h1>
      </Box>
      <Box>
        text <IconPrimary icon="add" border right="x-small" />
        <IconPrimary icon="add" size="medium" border /> text
        <h1 className="dnb-h1">
          text <IconPrimary icon="add" border right="x-small" />
          <IconPrimary icon="add" size="medium" border /> text{' '}
          <IconPrimary icon="add" size="auto" border /> text
        </h1>
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
]

const showMe = e => {
  console.log('showMe', e)
}
