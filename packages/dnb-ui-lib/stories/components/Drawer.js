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
  const [selected, setSelected] = React.useState('C')
  // console.log('opened', opened)

  // React.useEffect(() => {
  //   const t = setInterval(() => setOpened(x => !x), 2e3)
  //   return () => clearInterval(t)
  // }, [])

  const list = [
    { value: 'A' },
    { value: 'B' },
    { value: 'C' },
    { value: 'D' },
    { value: 'E' },
    { value: 'F' },
    { value: 'G' },
    { value: 'H' },
    { value: 'I' },
    { value: 'J' },
    { value: 'K' },
    { value: 'L' }
  ]

  console.log('selected', selected)

  return (
    <>
      <Input on_focus={() => setOpened(true)}>x</Input>
      <Drawer
        // value={selected}
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
        on_hide={() => setOpened(false)}
        {...props}
      >
        <Dropdown.List>
          {list.map(({ value, ...props }, i) => (
            <Dropdown.Item
              key={i}
              {...props}
              selected={value === selected}
              value={value}
              on_click={({ value }) => setSelected(value)}
            >
              {value}
            </Dropdown.Item>
          ))}
        </Dropdown.List>
      </Drawer>
    </>
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
        {/* <Dropdown data={['A', 'B']} /> */}
        {/* <Dropdown>{['A', 'B']}</Dropdown> */}
        <Dropdown
          on_change={e => {
            console.log('e', e)
          }}
        >
          {{
            a: 'A',
            b: 'B'
          }}
        </Dropdown>
      </Box>
      <Box>
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
