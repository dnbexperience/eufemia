/**
 * @dnb/eufemia Component Story
 *
 */

import React from 'react'
import { Wrapper, Box } from 'storybook-utils/helpers'

import { Logo } from '../../components'
import { colors } from '../colors'

export default {
  title: 'Eufemia/Components/Colors',
}

export const ColorsSandbox = () => {
  return (
    <Wrapper>
      Hex values:
      <Box>
        <Logo color={colors.ui.oceanGreen.hex} size="100" />
        <Logo color={colors.ui.emeraldGreen.hex} size="100" />
        <Logo color={colors.ui.seaGreen.hex} size="100" />
        <Logo color={colors.ui.mintGreen.hex} size="100" />
        <Logo color={colors.ui.summerGreen.hex} size="100" />
        <Logo color={colors.ui.accentYellow.hex} size="100" />
        <Logo color={colors.ui.indigo.hex} size="100" />
        <Logo color={colors.ui.violet.hex} size="100" />
      </Box>
      Rgb values:
      <Box>
        <Logo color={colors.ui.oceanGreen.rgb} size="100" />
        <Logo color={colors.ui.emeraldGreen.rgb} size="100" />
        <Logo color={colors.ui.seaGreen.rgb} size="100" />
        <Logo color={colors.ui.mintGreen.rgb} size="100" />
        <Logo color={colors.ui.summerGreen.rgb} size="100" />
        <Logo color={colors.ui.accentYellow.rgb} size="100" />
        <Logo color={colors.ui.indigo.rgb} size="100" />
        <Logo color={colors.ui.violet.rgb} size="100" />
      </Box>
    </Wrapper>
  )
}
