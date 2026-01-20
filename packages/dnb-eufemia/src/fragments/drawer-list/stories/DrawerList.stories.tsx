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
  const [open, setOpen] = React.useState(false)
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
        onFocus={() => setOpen(true)}
        placeholder="Search for items ..."
        icon="chevron_down"
        innerRef={ref}
      />
      <Drawer
        wrapperElement={ref.current}
        open={open}
        onSelect={(e) => {
          console.log('onSelect', e)
        }}
        onChange={(e) => {
          console.log('onChange', e)
        }}
        onClose={() => setOpen(false)}
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
                  onClick={({ value }) => {
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
  const [open, setOpen] = React.useState(false)

  return (
    <>
      <ToggleButton
        id="ToggleButton"
        text="Toggle"
        checked={open}
        icon={'chevron_' + (open ? 'up' : 'down')}
        iconPosition="left"
        onChange={({ checked }) => setOpen(checked)}
      />
      <DrawerList
        keepOpen
        data={['A', 'B', 'C']}
        open={open}
        onClose={() => setOpen(false)}
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
        <Drawer open noAnimation preventClose>
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
