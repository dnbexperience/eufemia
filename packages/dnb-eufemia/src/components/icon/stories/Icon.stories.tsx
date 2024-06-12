/**
 * @dnb/eufemia Component Story
 *
 */

import React from 'react'
import { Wrapper, Box } from 'storybook-utils/helpers'

import { Button, Icon, IconPrimary } from '../..'
import { add as Svg } from '../../../icons'
import { P, H1, H4 } from '../../..'
import { ErrorIcon } from '../../FormStatus'

export default {
  title: 'Eufemia/Components/Icon',
}

export const IconSandbox = () => (
  <Wrapper>
    <Box>
      text
      <Svg />
      <Icon alt="vanlig svg" icon={Svg} />
    </Box>

    <Box>
      Using FormStatus icons in Icon: Here's a regular ErrorIcon:
      <ErrorIcon />
      Here's a ErrorIcon in an Icon:
      <Icon alt="ErrorIcon svg" icon={ErrorIcon} />
    </Box>
  </Wrapper>
)

const showMe = (e) => {
  console.log('showMe', e)
}
