/**
 * @dnb/eufemia Component Story
 *
 */

import React from 'react'
import { Wrapper, Box } from 'storybook-utils/helpers'
import styled from '@emotion/styled'

import { Input, ToggleButton } from '../../../components'
import { DrawerList } from '../..'

export default {
  title: 'Eufemia/Fragments/DrawerList',
}

const Drawer = styled(DrawerList)`
  margin-bottom: 4rem;
`
const CustomStyle = styled.div`
  [data-testid='dropdown-list'].dnb-drawer-list__list {
    display: block;
    visibility: visible;
    position: relative;
    top: 0;
    width: var(--dropdown-width);
  }
`

const ref = React.createRef<HTMLInputElement>()
const MagicOpen = (props) => {
  const [opened, setOpened] = React.useState(false)
  const [selected, setSelected] = React.useState('C')

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
        innerRef={ref}
      />
      <Drawer
        wrapperElement={ref.current}
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
        <DrawerList>
          <DrawerList.Options>
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
          </DrawerList.Options>
        </DrawerList>
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
        iconPosition="left"
        on_change={({ checked }) => setOpened(checked)}
      />
      <DrawerList
        keepOpen
        data={['A', 'B', 'C']}
        opened={opened}
        on_hide={() => setOpened(false)}
        wrapperElement="#ToggleButton"
        {...props}
      />
    </>
  )
}

const DrawerStory = () => {
  return (
    <Wrapper>
      <Box>
        <Drawer opened noAnimation preventClose>
          Empty
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
