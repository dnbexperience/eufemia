/**
 * @dnb/eufemia Component Story
 *
 */

import React from 'react'
import { Button, Dropdown, Flex, Icon, Input } from '../../'
import CountryFlag from '../CountryFlag'

export default {
  title: 'Eufemia/Components/CountryFlag',
}

// Import the flag icons styles
import '../style/dnb-country-flag-icons.scss'
import { H1, H2, H3, P } from '../../../elements'

export function CountryFlags() {
  return (
    <Flex.Vertical gap="x-small">
      <Button icon={<CountryFlag iso="NO" />} title="Icon button" />
      <Button
        icon={<CountryFlag iso="NO" />}
        title="Icon button"
        size="large"
      />
      <Button
        icon={<CountryFlag iso="NO" />}
        icon_position="left"
        text="Button"
        variant="secondary"
      />
      <Button
        icon={<CountryFlag iso="NO" />}
        icon_size="medium"
        icon_position="left"
        size="large"
        text="Button"
        variant="secondary"
      />
      <Input
        icon={<CountryFlag iso="NO" />}
        icon_position="left"
        placeholder="Write something"
      />
      <Input
        icon={<CountryFlag iso="NO" />}
        icon_position="left"
        size="large"
        placeholder="Write something"
      />
      <Dropdown
        value="NO"
        icon_position="left"
        data={{
          NO: (
            <Dropdown.HorizontalItem>
              <CountryFlag iso="NO" />
              {' '}Norway
            </Dropdown.HorizontalItem>
          ),
          SE: (
            <Dropdown.HorizontalItem>
              <CountryFlag iso="SE" />
              {' '}Sweden
            </Dropdown.HorizontalItem>
          ),
        }}
      />
      <Dropdown icon={<CountryFlag iso="NO" />} size="large" />

      <Flex.Horizontal align="center">
        <CountryFlag iso="NO" />
        <CountryFlag iso="NO" size="small" />
        <CountryFlag iso="NO" size="medium" />
        <CountryFlag iso="NO" size="large" />
        <CountryFlag iso="NO" size="x-large" />
        <CountryFlag iso="NO" size="x-large" shape="square" />
      </Flex.Horizontal>

      <Flex.Horizontal align="center" gap="x-small">
        In Icon component:
        <Icon icon={<CountryFlag iso="NO" />} />
        <Icon icon={<CountryFlag iso="NO" />} size="medium" />
      </Flex.Horizontal>

      <Flex.Vertical>
        <H1>
          H1 heading <CountryFlag iso="NO" />
        </H1>
        <H2>
          H2 heading <CountryFlag iso="NO" />
        </H2>
        <H3>
          H3 heading <CountryFlag iso="NO" />
        </H3>
        <P>
          <CountryFlag iso="NO" /> Paragraph Eiusmod id cillum Lorem nulla
          non consectetur pariatur mollit Lorem non do nulla reprehenderit
          {' '}
          <CountryFlag iso="NO" />
        </P>
      </Flex.Vertical>
    </Flex.Vertical>
  )
}
