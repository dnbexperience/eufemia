/**
 * @dnb/eufemia Component Story
 *
 */

import React from 'react'
import { Wrapper, Box } from '../helpers'
import styled from '@emotion/styled'

import { Input, ToggleButton } from '@dnb/eufemia/src/components'
import { DrawerList } from '@dnb/eufemia/src/fragments'

// import { P } from '@dnb/eufemia/src/elements'

export default {
  title: 'Eufemia/Fragments/DrawerList',
}

const Drawer = styled(DrawerList)`
  margin-bottom: 4rem;
`
const CustomStyle = styled.div`
  [data-visual-test='dropdown-list'].dnb-drawer-list__list {
    display: block;
    visibility: visible;
    position: relative;
    top: 0;
    width: var(--dropdown-width);
  }
`

const ref = React.createRef()
const MagicOpen = (props) => {
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
    { value: 'L' },
  ]

  return (
    <>
      <Input
        on_focus={() => setOpened(true)}
        placeholder="Search for items ..."
        icon="chevron_down"
        inner_ref={ref}
      />
      <Drawer
        // value={selected}
        // focusable
        // prevent_close
        // no_animation
        wrapper_element={ref.current}
        opened={opened}
        // data={['A', 'B']}
        on_select={(e) => {
          // does not fire!
          console.log('on_select', e)
        }}
        on_change={(e) => {
          // does not fire!
          console.log('on_change', e)
        }}
        on_hide={() => setOpened(false)}
        {...props}
      >
        <DrawerList.List>
          {list.map(({ value, ...props }, i) => {
            return (
              <DrawerList.Item
                key={i}
                {...props}
                selected={value === selected}
                value={value}
                on_click={({ value }) => {
                  setSelected(value)
                }}
              >
                {value}
              </DrawerList.Item>
            )
          })}
        </DrawerList.List>
      </Drawer>
    </>
  )
}

const DrawerListWithState = (props) => {
  const [opened, setOpened] = React.useState(false)
  // React.useState(() => {
  //   setInterval(() => {
  //     setOpened(o => !o)
  //   }, 1e3)
  // }, [])
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
        <DrawerListWithState />
      </Box>
      <Box>
        <MagicOpen bottom />
      </Box>
    </Wrapper>
  )
}

export const DrawerSandbox = () => (
  <CustomStyle>
    <DrawerStory />
  </CustomStyle>
)
