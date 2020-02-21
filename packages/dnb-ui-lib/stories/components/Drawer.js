/**
 * dnb-ui-lib Component Story
 *
 */

import React from 'react'
import { Wrapper, Box } from '../helpers'
import styled from '@emotion/styled'

import { Dropdown, Input, ToggleButton } from '../../src/components'
import { DrawerList } from '../../src/fragments'

// import { P } from '../../src/elements'

const Drawer = styled(DrawerList)`
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
  const [opened, setOpened] = React.useState(false)
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

  return (
    <>
      <Input
        on_focus={() => setOpened(true)}
        placeholder="Search for items ..."
        icon="chevron_down"
      />
      <Drawer
        // value={selected}
        // focusable
        // prevent_close
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
        <DrawerList.List>
          {list.map(({ value, ...props }, i) => (
            <DrawerList.Item
              key={i}
              {...props}
              selected={value === selected}
              value={value}
              on_click={({ value }) => setSelected(value)}
            >
              {value}
            </DrawerList.Item>
          ))}
        </DrawerList.List>
      </Drawer>
    </>
  )
}

const DrawerListWithState = props => {
  const [opened, setOpened] = React.useState(false)
  return (
    <>
      <ToggleButton
        id="ToggleButton"
        text="Toggle"
        checked={opened}
        icon={'chevron_' + (opened ? 'up' : 'down')}
        icon_position="left"
        on_change={({ checked }) => setOpened(checked)}
      />
      <DrawerList
        keep_open
        data={['A', 'B', 'C']}
        opened={opened}
        on_hide={() => setOpened(false)}
        wrapper_element="#ToggleButton"
        {...props}
      />
    </>
  )
}

const DrawerStory = () => {
  return (
    <Wrapper>
      <Box>
        <Drawer opened no_animation prevent_close>
          Emty
        </Drawer>
      </Box>
      <Box>
        <DrawerListWithState></DrawerListWithState>
      </Box>
      <Box>
        <Dropdown data={['A', 'B']} />
        <Dropdown
          opened
          value="0"
          on_change={e => {
            console.log('test e', e)
          }}
        >
          {['A', 'B']}
        </Dropdown>
        <Dropdown
          value="a"
          on_change={e => {
            console.log('test e', e)
          }}
        >
          {{
            a: 'A',
            b: 'B'
          }}
        </Dropdown>
      </Box>
      <Box>
        <Dropdown
          // opened
          value="b"
          on_change={e => {
            console.log('test selected_key', e)
          }}
        >
          {{ a: 'A', b: 'B', c: 'C' }}
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
