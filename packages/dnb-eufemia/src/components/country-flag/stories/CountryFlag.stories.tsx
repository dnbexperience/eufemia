/**
 * @dnb/eufemia Component Story
 *
 */

import React from 'react'
import { Flex } from '../../lib'
import CountryFlag from '../CountryFlag'

export default {
  title: 'Eufemia/Components/CountryFlag',
}

// Import the flag-icons CSS
import '../icons'

export function CountryFlags() {
  return (
    <Flex.Horizontal align="center">
      <CountryFlag iso="NO" size="x-small" />
      <CountryFlag iso="NO" size="small" />
      <CountryFlag iso="NO" />
      <CountryFlag iso="NO" size="medium" />
      <CountryFlag iso="NO" size="large" />
      <CountryFlag iso="NO" size="x-large" />
      <CountryFlag iso="NO" size="x-large" shape="square" />
    </Flex.Horizontal>
  )
}
