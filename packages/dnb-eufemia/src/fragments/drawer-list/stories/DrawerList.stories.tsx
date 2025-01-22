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
        inner_ref={ref}
      />
      <Drawer
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
        <DrawerList>
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

export const DrawerListHyphenation = () => {
  return (
    <Wrapper>
      <Box>
        <DrawerList opened skip_portal>
          <DrawerList.Options>
            <DrawerList.Item
              key="A"
              selected={false}
              value="A"
              on_click={({ value }) => {
                console.log('on_click', value)
              }}
              hyphenation="none"
            >
              The longest word in the Oxford English Dictionary is the
              45-letter pneumonoultramicroscopicsilicovolcanoconiosis,
              which refers to a form of lung disease. (hyphenation="none")
            </DrawerList.Item>
            <DrawerList.Item
              key="B"
              selected={false}
              value="B"
              on_click={({ value }) => {
                console.log('on_click', value)
              }}
              hyphenation="manual"
            >
              The longest word in the Oxford English Dictionary is the
              45-letter pneumonoultramicroscopicsilicovolcanoconiosis,
              which refers to a form of lung disease.
              (hyphenation="manual")
            </DrawerList.Item>
            <DrawerList.Item
              key="C"
              selected={false}
              value="C"
              on_click={({ value }) => {
                console.log('on_click', value)
              }}
              hyphenation="auto"
            >
              The longest word in the Oxford English Dictionary is the
              45-letter pneumonoultramicroscopicsilicovolcanoconiosis,
              which refers to a form of lung disease. (hyphenation="auto")
            </DrawerList.Item>
          </DrawerList.Options>
        </DrawerList>
      </Box>
    </Wrapper>
  )
}

export const DrawerListHyphenationData = () => {
  return (
    <Wrapper>
      <Box>
        <DrawerList
          opened
          skip_portal
          data={[
            {
              hyphenation: 'none',
              content:
                'The longest word in the Oxford English Dictionary is the 45-letter pneumonoultramicroscopicsilicovolcanoconiosis, which refers to a form of lung disease. (hyphenation="none")',
            },
            {
              hyphenation: 'manual',
              content:
                'The longest word in the Oxford English Dictionary is the 45-letter pneumonoultramicroscopicsilicovolcanoconiosis, which refers to a form of lung disease. (hyphenation="manual")',
            },
            {
              hyphenation: 'auto',
              content:
                'The longest word in the Oxford English Dictionary is the 45-letter pneumonoultramicroscopicsilicovolcanoconiosis, which refers to a form of lung disease. (hyphenation="auto")',
            },
          ]}
        />
      </Box>
    </Wrapper>
  )
}

export const DrawerSandbox = () => (
  <CustomStyle>
    <DrawerStory />
  </CustomStyle>
)
