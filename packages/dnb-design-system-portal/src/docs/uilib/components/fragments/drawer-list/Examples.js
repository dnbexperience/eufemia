/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from 'Src/shared/tags/ComponentBox'
import styled from '@emotion/styled'

class Example extends React.PureComponent {
  render() {
    return (
      <React.Fragment>
        <ComponentBox
          title="Default DrawerList, triggered by a ToggleButton"
          useRender
          scope={{ data }}
        >
          {
            /* @jsx */ `
const DrawerListWithState = props => {
  const [opened, setOpened] = React.useState(false)
  const Relative = styled.span\`
    position: relative;
  \`
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
render(<DrawerListWithState />)
          `
          }
        </ComponentBox>
        <ComponentBox
          title="DrawerList list - only to visualize"
          data-visual-test="drawer-list"
          scope={{ data }}
          hideCode
        >
          {
            /* @jsx */ `
<span className="dnb-drawer-list__list">
  <ul className="dnb-drawer-list__options">
    <li className="dnb-drawer-list__option first-of-type">
      <span className="dnb-drawer-list__option__inner">Brukskonto - Kari Nordmann</span>
    </li>
    <li className="dnb-drawer-list__option dnb-drawer-list__option--selected">
      <span className="dnb-drawer-list__option__inner">
        <span className="dnb-drawer-list__option__item"><Number ban>12345678902</Number></span>
        <span className="dnb-drawer-list__option__item">Sparekonto - Ole Nordmann</span>
      </span>
    </li>
    <li className="dnb-drawer-list__option">
      <span className="dnb-drawer-list__option__inner">
        <span className="dnb-drawer-list__option__item"><Number ban>11345678962</Number></span>
        <span className="dnb-drawer-list__option__item">Feriekonto - Kari Nordmann med et kjempelangt etternavnsen</span>
      </span>
    </li>
    <li className="dnb-drawer-list__option last-of-type">
      <span className="dnb-drawer-list__option__inner">
        <span className="dnb-drawer-list__option__item"><Number ban>15349648901</Number></span>
        <span className="dnb-drawer-list__option__item">Oppussing - Ole Nordmann</span>
      </span>
    </li>
    <li className="dnb-drawer-list__triangle" />
  </ul>
</span>
          `
          }
        </ComponentBox>
        <ComponentBox
          title="Default DrawerList"
          scope={{ data }}
          data-visual-test="drawer-list-default"
        >
          {
            /* @jsx */ `
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
/>
          `
          }
        </ComponentBox>
        <ComponentBox
          title="Custom event and link on single item"
          scope={{ data }}
          useRender
          data-visual-test="drawer-list-events"
        >
          {
            /* @jsx */ `
const CustomComponent = () => (
  <CustomComponentInner
    onTouchStart={preventDefault}
    onClick={e => {
      console.log('Do someting different')
      preventDefault(e)
    }}
  >
    Custom event handler
  </CustomComponentInner>
)
const CustomComponentInner = styled.span\`
  display: block;
  margin: -1rem -2rem -1rem -1rem;
  padding: 1rem 2rem 1rem 1rem;
\`
const preventDefault = e => {
  e.stopPropagation()
  e.preventDefault()
}
const CustomWidth = styled(DrawerList)\`
  .dnb-drawer-list__list {
    width: var(--drawer-list-width);
  }
\`
render(
  <CustomWidth
    skip_portal
    opened
    prevent_close
    more_menu
    right
    title="Choose an item"
    data={() => [
      <Link href="/">Go to this Link</Link>,
      'Or press on me',
      <CustomComponent />
    ]}
    on_change={({ value }) => {
      console.log('More menu:', value)
    }}
    suffix={<HelpButton title="Modal Title">Modal content</HelpButton>}
  />
)
          `
          }
        </ComponentBox>
        <ComponentBox
          title="Using List and Items markup"
          description="**NB:** By using this method you lose currently a lot of the core functionality like keyboard support and other accessibility features."
          data-visual-test="drawer-items"
          useRender
        >
          {
            /* @jsx */ `
const list = [
  { value: 'A' },
  { value: 'B' },
  { value: 'C' }
]
const CustomWidth = styled(DrawerList)\`
  .dnb-drawer-list__list {
    width: var(--drawer-list-width);
  }
\`
const DrawerListWithState = props => {
  const [selected, setSelected] = React.useState('C')

  return (
    <CustomWidth
      skip_portal
      opened
      prevent_close
    >
      <DrawerList.Options>
        {list.map(({ value, ...props }, i) => (
          <DrawerList.Item
            key={i}
            {...props}
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
render(<DrawerListWithState />)
          `
          }
        </ComponentBox>
      </React.Fragment>
    )
  }
}

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

export { Example }
export default function StyledExample() {
  return (
    <Wrapper>
      <Example />
    </Wrapper>
  )
}

const data = [
  // Every data item can, beside "content" - contain what ever
  {
    // (optional) can be what ever
    selected_key: 'key_0',

    // (optional) is show insted of "content", once selected
    selected_value: 'Item 1 Value',

    // Item content as a string or array
    content: 'Item 1 Content'
  },
  {
    selected_key: 'key_1',
    content: ['Item 2 Value', 'Item 2 Content']
  },
  {
    selected_key: 'key_2',
    selected_value: 'Item 3 Value',
    content: ['Item 3 Content A', 'Item 3 Content B']
  },
  {
    selected_key: 'key_3',
    selected_value: 'Item 4 Value',
    content: ['Item 4 Content A', <>Custom Component</>]
  }
]
