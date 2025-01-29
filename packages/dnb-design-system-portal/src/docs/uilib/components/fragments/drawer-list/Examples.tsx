/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from '../../../../../shared/tags/ComponentBox'
import styled from '@emotion/styled'
import {
  NumberFormat,
  ToggleButton,
  HelpButton,
  Link,
} from '@dnb/eufemia/src'
import { DrawerList } from '@dnb/eufemia/src/fragments'

export const DrawerListExampleInteractive = () => (
  <Wrapper>
    <ComponentBox scope={{ data }}>
      {() => {
        const DrawerListWithState = (props) => {
          const [opened, setOpened] = React.useState(false)
          const Relative = styled.span`
            position: relative;
          `
          return (
            <Relative>
              <ToggleButton
                text="Toggle"
                checked={opened}
                icon={'chevron_' + (opened ? 'up' : 'down')}
                icon_position="left"
                on_change={({ checked }) => setOpened(checked)}
              />
              <DrawerList
                skip_portal
                data={data}
                opened={opened}
                on_hide={() => setOpened(false)}
                {...props}
              />
            </Relative>
          )
        }

        return <DrawerListWithState />
      }}
    </ComponentBox>
  </Wrapper>
)

export const DrawerListExampleOnlyToVisualize = () => (
  <Wrapper>
    <ComponentBox data-visual-test="drawer-list" scope={{ data }} hideCode>
      <span className="dnb-drawer-list__list">
        <ul className="dnb-drawer-list__options">
          <li className="dnb-drawer-list__option first-of-type">
            <span className="dnb-drawer-list__option__inner">
              Brukskonto - Kari Nordmann
            </span>
          </li>
          <li className="dnb-drawer-list__option dnb-drawer-list__option--selected">
            <span className="dnb-drawer-list__option__inner">
              <span className="dnb-drawer-list__option__item item-nr-1">
                <NumberFormat ban>12345678902</NumberFormat>
              </span>
              <span className="dnb-drawer-list__option__item">
                Sparekonto - Ole Nordmann
              </span>
            </span>
          </li>
          <li className="dnb-drawer-list__option">
            <span className="dnb-drawer-list__option__inner">
              <span className="dnb-drawer-list__option__item item-nr-1">
                <NumberFormat ban>11345678962</NumberFormat>
              </span>
              <span className="dnb-drawer-list__option__item item-nr-2">
                <a
                  className="dnb-anchor dnb-anchor--has-icon"
                  href="/uilib/components/fragments/drawer-list/"
                >
                  Long link that will wrap over several lines
                </a>
              </span>
              <span className="dnb-drawer-list__option__item">
                Feriekonto - Kari Nordmann med et kjempelangt etternavnsen
              </span>
            </span>
          </li>
          <li className="dnb-drawer-list__option last-of-type">
            <span className="dnb-drawer-list__option__inner">
              <span className="dnb-drawer-list__option__item item-nr-1">
                <NumberFormat ban>15349648901</NumberFormat>
              </span>
              <span className="dnb-drawer-list__option__item">
                Oppussing - Ole Nordmann
              </span>
            </span>
          </li>
          <li className="dnb-drawer-list__triangle" />
        </ul>
      </span>
    </ComponentBox>
  </Wrapper>
)

export const DrawerListExampleDefault = () => (
  <Wrapper>
    <ComponentBox scope={{ data }}>
      <DrawerList
        skip_portal
        opened
        prevent_close
        triangle_position="left"
        data={data}
        value={3}
        on_change={({ data: selectedDataItem }) => {
          console.log('on_change', selectedDataItem)
        }}
        on_show={() => {
          console.log('on_show')
        }}
        observer_element=".dnb-live-preview" // prevents direction to change when scrolling in this example
      />
    </ComponentBox>
  </Wrapper>
)

export const DrawerListExampleDisabled = () => (
  <Wrapper>
    <ComponentBox data-visual-test="drawer-list-disabled">
      <DrawerList
        skip_portal
        opened
        prevent_close
        data={[
          {
            content: 'Item 1',
          },
          {
            content: 'Item 2, disabled',
            disabled: true,
          },
          {
            content: 'Item 3',
          },
        ]}
        observer_element=".dnb-live-preview" // prevents direction to change when scrolling in this example
      />
    </ComponentBox>
  </Wrapper>
)

export const DrawerListExampleInlineStyling = () => (
  <Wrapper>
    <ComponentBox>
      <DrawerList
        skip_portal
        opened
        prevent_close
        observer_element=".dnb-live-preview" // prevents direction to change when scrolling in this example
      >
        <DrawerList.Options>
          <DrawerList.Item
            style={{ color: 'red' }}
            key="A"
            selected={false}
            value="A"
            on_click={() => {
              console.log('on_click')
            }}
          >
            Item 1
          </DrawerList.Item>
          <DrawerList.HorizontalItem
            style={{ color: 'green' }}
            key="B"
            selected={false}
            value="B"
            on_click={() => {
              console.log('on_click')
            }}
          >
            Item 2
          </DrawerList.HorizontalItem>
        </DrawerList.Options>
      </DrawerList>
    </ComponentBox>
  </Wrapper>
)

export const DrawerListExampleInlineStylingData = () => (
  <Wrapper>
    <ComponentBox data-visual-test="drawer-list-inline-style">
      <DrawerList
        skip_portal
        opened
        prevent_close
        data={[
          {
            content:
              'They may be very large, like pneumonoultramicroscopicsilicovolcanoconiosis, a 45-letter hippopotomonstrosesquipedalian word for black lung disease.',
            style: { hyphens: 'auto', color: 'red' },
          },
          {
            content:
              'The longest word in the Oxford English Dictionary is the 45-letter pneumonoultramicroscopicsilicovolcanoconiosis, which refers to a form of lung disease.',
            style: { hyphens: 'none', color: 'green' },
          },
          {
            content:
              'According to the Oxford English Dictionary the longest word in the language is pneumonoultramicroscopicsilicovolcanoconiosis, with 45 letters.',
            style: { hyphens: 'manual', color: 'blue' },
          },
        ]}
        observer_element=".dnb-live-preview" // prevents direction to change when scrolling in this example
      />
    </ComponentBox>
  </Wrapper>
)

export const DrawerListExampleSingleItem = () => (
  <Wrapper>
    <ComponentBox scope={{ data }}>
      {() => {
        const CustomComponent = () => (
          <CustomComponentInner
            onTouchStart={preventDefault}
            onClick={(e) => {
              console.log('Do something different')
              preventDefault(e)
            }}
          >
            Custom event handler
          </CustomComponentInner>
        )
        const CustomComponentInner = styled.span`
          display: block;
          width: 100%;
          margin: -1rem -2rem -1rem -1rem;
          padding: 1rem 2rem 1rem 1rem;
        `
        const preventDefault = (e) => {
          e.stopPropagation()
          e.preventDefault()
        }
        const CustomWidth = styled(DrawerList)`
          .dnb-drawer-list__list {
            width: var(--drawer-list-width);
          }
        `

        return (
          <CustomWidth
            skip_portal
            opened
            prevent_close
            // more_menu
            right
            title="Choose an item"
            data={() => [
              <Link key="link" href="/">
                Go to this Link
              </Link>,
              'Or press on me',
              <CustomComponent key="custom" />,
            ]}
            on_change={({ value }) => {
              console.log('More menu:', value)
            }}
            suffix={
              <HelpButton title="Modal Title">Modal content</HelpButton>
            }
            observer_element=".dnb-live-preview" // prevents direction to change when scrolling in this example
          />
        )
      }}
    </ComponentBox>
  </Wrapper>
)

export const DrawerListExampleMarkup = () => (
  <Wrapper>
    <ComponentBox>
      {() => {
        const list = [{ value: 'A' }, { value: 'B' }, { value: 'C' }]
        const CustomWidth = styled(DrawerList)`
          .dnb-drawer-list__list {
            width: var(--drawer-list-width);
          }
        `
        const DrawerListWithState = () => {
          const [selected, setSelected] = React.useState('C')

          return (
            <CustomWidth skip_portal opened prevent_close>
              <DrawerList.Options>
                {list.map(({ value, ...props }, i) => (
                  <DrawerList.Item
                    key={i}
                    selected={value === selected}
                    value={value}
                    on_click={({ value }) => setSelected(value)}
                    {...props}
                  >
                    {value}
                  </DrawerList.Item>
                ))}
              </DrawerList.Options>
            </CustomWidth>
          )
        }

        return <DrawerListWithState />
      }}
    </ComponentBox>
  </Wrapper>
)

const Wrapper = styled.div`
  [data-visual-test] {
    .dnb-drawer-list__list {
      position: relative;
    }
  }
  [data-visual-test='drawer-list'] .dnb-drawer-list__list {
    display: block;
    visibility: visible;
    position: relative;
    top: 0;
    width: var(--drawer-list-width);
  }
`

const data = [
  // Every data item can, beside "content" - contain what ever
  {
    // (optional) can be what ever
    selected_key: 'key_0',

    // Item content as a string or array
    content: 'Item 1 Content',
  },
  {
    selected_key: 'key_1',
    content: ['Item 2 Value', 'Item 2 Content'],
  },
  {
    selected_key: 'key_2',
    content: ['Item 3 Content A', 'Item 3 Content B'],
  },
  {
    selected_key: 'key_3',
    content: ['Item 4 Content A', <>Custom Component</>],
  },
]

export const DrawerListExampleOptionsRender = () => (
  <Wrapper>
    <ComponentBox scope={{ data }} hidePreview hideToolbar>
      <DrawerList
        options_render={({ Items, Item, data }) => (
          <>
            <Items />
            <Item>Addition</Item>
            {data.length > 1 && <li>Addition</li>}
          </>
        )}
      />
    </ComponentBox>
  </Wrapper>
)
