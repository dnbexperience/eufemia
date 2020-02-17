/**
 * dnb-ui-lib Component Story
 *
 */

import React from 'react'
import { Wrapper, Box } from '../helpers'
import styled from '@emotion/styled'

import {
  Dropdown,
  Input
  // Checkbox
} from '../../src/components'

// import { P } from '../../src/elements'

const Drawer = styled(Dropdown.Drawer)`
  margin-bottom: 4rem;
`
const CustomStyle = styled.div`
  ${'' /* --dropdown-width: 20rem; */}
  ${'' /* .dnb-dropdown:not(.dnb-dropdown--is-popup) .dnb-dropdown__shell {
    width: 20rem;
  }
  .dnb-dropdown:not(.dnb-dropdown--is-popup) .dnb-dropdown__list {
    min-width: 20rem;
  } */}
   [data-dnb-test='dropdown-list'].dnb-drawer-list__list {
    display: block;
    visibility: visible;
    position: relative;
    top: 0;
    width: var(--dropdown-width);
  }
`

const MagicOpen = props => {
  const [opened, setOpened] = React.useState(true)
  console.log('opened', opened)

  // React.useEffect(() => {
  //   const t = setInterval(() => setOpened(x => !x), 2e3)
  //   return () => clearInterval(t)
  // }, [])

  return (
    <Drawer
      // value="0"
      // focusable
      // keep_opened
      // no_animation
      opened={opened}
      // data={['A', 'B']}
      on_select={e => {
        console.log('on_select', e)
      }}
      on_change={e => {
        console.log('on_change', e)
      }}
      {...props}
    >
      <Dropdown.List>
        <Dropdown.Item>A</Dropdown.Item>
        <Dropdown.Item selected>B</Dropdown.Item>
        <Dropdown.Item>B</Dropdown.Item>
        <Dropdown.Item>B</Dropdown.Item>
        <Dropdown.Item>B</Dropdown.Item>
        <Dropdown.Item>B</Dropdown.Item>
        <Dropdown.Item>B</Dropdown.Item>
        <Dropdown.Item>B</Dropdown.Item>
        <Dropdown.Item>B</Dropdown.Item>
        <Dropdown.Item>B</Dropdown.Item>
        <Dropdown.Item>B</Dropdown.Item>
        <Dropdown.Item>B</Dropdown.Item>
      </Dropdown.List>
    </Drawer>
  )
}

const DrawerStory = () => {
  return (
    <Wrapper>
      <Box>
        <Drawer opened no_animation keep_opened>
          Emty
        </Drawer>
      </Box>
      <Box>
        <Input>x</Input>
        <MagicOpen bottom></MagicOpen>
      </Box>
    </Wrapper>
  )
}

export default [
  'Drawer',
  () => (
    <CustomStyle>
      <DrawerStory />
    </CustomStyle>
  )
]
