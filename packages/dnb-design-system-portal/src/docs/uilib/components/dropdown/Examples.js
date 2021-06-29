/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from 'Src/shared/tags/ComponentBox'
import styled from '@emotion/styled'

const Wrapper = styled.div`
  .dnb-form-label {
    margin-right: 1rem;
  }
  [data-visual-test] {
    > :not(.dnb-dropdown--is-popup):not(.dnb-dropdown--independent-width):not(.dnb-dropdown--stretch)
      .dnb-dropdown__shell {
      width: var(--dropdown-width);
    }
  }
  [data-visual-test-wrapper='dropdown-action_menu-custom'],
  [data-visual-test-wrapper='dropdown-more_menu'] {
    width: 20rem;
    height: 15rem !important;
  }
  [data-visual-test='dropdown-list'] .dnb-drawer-list__list {
    display: block;
    visibility: visible;
    position: relative;
    top: 0;
    width: var(--dropdown-width);
  }
`

const data = [
  // Every data item can, beside "content" - contain what ever
  {
    // (optional) can be what ever
    selected_key: 'key_0',

    // (optional) is show instead of "content", once selected
    selected_value: 'Item 1 Value',

    // Item content as a string or array
    content: 'Item 1 Content',
  },
  {
    selected_key: 'key_1',
    content: ['Item 2 Value', 'Item 2 Content'],
  },
  {
    selected_key: 'key_2',
    selected_value: 'Item 3 Value',
    content: ['Item 3 Content A', 'Item 3 Content B'],
  },
  {
    selected_key: 'key_3',
    selected_value: 'Item 4 Value',
    content: ['Item 4 Content A', <>Custom Component</>],
  },
]

export const DropdownFind = () => (
  <Wrapper>
    <ComponentBox useRender>
      {() => /* jsx */ `
const scrollableData = [
  {
    content: 'A'
  },
  {
    content: 'B'
  },
  {
    selected_value: <NumberFormat always_selectall ban>11345678962</NumberFormat>,
    content: [<NumberFormat always_selectall ban>11345678962</NumberFormat>, 'C']
  },
  {
    selected_value: <NumberFormat always_selectall ban>15349648901</NumberFormat>,
    content: [<NumberFormat always_selectall ban>15349648901</NumberFormat>, 'D']
  },
  {
    content: 'E'
  },
  {
    selected_key: 'key_1',
    selected_value: 'Find me by keypress',
    content: ['F', 'F', 'F', 'F']
  },
  {
    content: 'G'
  },
  {
    content: 'H'
  }
];
render(
  <Dropdown
    data={scrollableData}
    value="key_1"// use either index (5) or selected_key: 'key_1'
    label="Label:"
  />
)
`}
    </ComponentBox>
  </Wrapper>
)

export const DropdownNoValue = () => (
  <Wrapper>
    <ComponentBox data-visual-test="dropdown-closed" useRender>
      {() => /* jsx */ `
const data = [
  // Every data item can, beside "content" - contain what ever
  {
    // (optional) can be what ever
    selected_key: 'key_0',

    // (optional) is show instead of "content", once selected
    selected_value: 'Item 1 Value',

    // Item content as a string or array
    content: 'Item 1 Content'
  },
  {
    selected_key: 'key_1',
    content: ['Item 2 Value', 'Item 2 Content']
  },
  {
    selected_value: <NumberFormat always_selectall ban>11345678962</NumberFormat>,
    content: [<NumberFormat always_selectall ban>11345678962</NumberFormat>, 'Bank account number']
  },
  {
    selected_key: 'key_2',
    selected_value: 'Item 3 Value',
    content: [
      'Item 3 Content A',
      'Item 3 Content B'
    ]
  },
  {
    selected_key: 'key_3',
    selected_value: 'Item 4 Value',
    content: ['Item 4 Content A', <>Custom Component</>]
  }
];
render(
  <Dropdown
    data={data}
    label="Label:"
    title="Please select a value"
    on_change={({ data }) => {
      console.log('on_change', data)
    }}
  />
)
`}
    </ComponentBox>
  </Wrapper>
)

export const DropdownDirections = () => (
  <Wrapper>
    <ComponentBox data-visual-test="dropdown-item-directions">
      {() => /* jsx */ `
<Dropdown
  label="Label:"
  data={[
    ['Vertical', 'text'],
    <><span className="dnb-p--medium">Vertical</span> text</>,
    <Dropdown.HorizontalItem><span className="dnb-p--medium">Horizontal</span> text</Dropdown.HorizontalItem>
  ]}
  skip_portal
/>
`}
    </ComponentBox>
  </Wrapper>
)

export const DropdownIconLeft = () => (
  <Wrapper>
    <ComponentBox scope={{ data }} data-visual-test="dropdown-left-icon">
      {() => /* jsx */ `
<Dropdown
  label="Label:"
  icon_position="left"
  data={data}
  value={3}
  skip_portal={true}
  on_change={({ data: selectedDataItem }) => {
    console.log('on_change', selectedDataItem)
  }}
  on_show={() => {
    console.log('on_show')
  }}
/>
`}
    </ComponentBox>
  </Wrapper>
)

export const DropdownActionMenu = () => (
  <Wrapper>
    <ComponentBox scope={{ data }} data-visual-test="dropdown-action_menu">
      {() => /* jsx */ `
<Dropdown
  title="ActionMenu"
  action_menu={true}
  align_dropdown="left"
  data={[
    <>
      <IconPrimary icon="check" right />
      Save
    </>,
    <>
      <IconPrimary icon="download" right />
      Download
    </>
  ]}
/>
`}
    </ComponentBox>
  </Wrapper>
)

export const DropdownTertiary = () => (
  <Wrapper>
    <ComponentBox scope={{ data }} data-visual-test="dropdown-tertiary">
      {() => /* jsx */ `
<Dropdown
  variant="tertiary"
  independent_width={true}
  icon_position="left"
  align_dropdown="left"
  data={data}
/>
`}
    </ComponentBox>
  </Wrapper>
)

export const DropdownMoreMenu = () => (
  <Wrapper>
    <ComponentBox data-visual-test="dropdown-more_menu">
      {() => /* jsx */ `
<Dropdown
  more_menu="true"
  size="small"
  title="Choose an item"
  data={() => [<Link href="/">Go to this Link</Link>, 'Or press on me', <>Custom component</>]}
  right="small"
/>
<Dropdown
  prevent_selection="true"
  align_dropdown="right"
  size="small"
  title={null}
  aria-label="Choose an item"
  data={() => [<Link href="/">Go to this Link</Link>, 'Or press on me', <>Custom component</>]}
  right="small"
/>
<Dropdown
  more_menu="true"
  title="Choose an item"
  data={[<Link href="/">Go to this Link</Link>, 'Or press on me', <>Custom component</>]}
  right="small"
/>
<Dropdown
  prevent_selection="true"
  align_dropdown="right"
  title={null}
  aria-label="Choose an item"
  data={[<Link href="/">Go to this Link</Link>, 'Or press on me', <>Custom component</>]}
  on_change={({ value }) => {
    console.log('on_change', value)
  }}
  on_select={({ active_item }) => {
    console.log('on_select', active_item)
  }}
/>
`}
    </ComponentBox>
  </Wrapper>
)

export const DropdownDisabled = () => (
  <Wrapper>
    <ComponentBox scope={{ data }} data-visual-test="dropdown-disabled">
      {() => /* jsx */ `
<Dropdown disabled data={['Disabled Dropdown']} label="Label:" />
`}
    </ComponentBox>
  </Wrapper>
)

export const DropdownCustomEvent = () => (
  <Wrapper>
    <ComponentBox
      scope={{ data }}
      useRender
      data-visual-test="dropdown-action_menu-custom"
    >
      {() => /* jsx */ `
const CustomComponent = () => (
  <CustomComponentInner
    onTouchStart={preventDefault}
    onClick={e => {
      console.log('Do something different')
      preventDefault(e)
    }}
  >
    Custom event handler
  </CustomComponentInner>
)
const CustomComponentInner = styled.span\`
  display: block;
  width: 100%;
  margin: -1rem -2rem -1rem -1rem;
  padding: 1rem 2rem 1rem 1rem;
\`
const preventDefault = e => {
  e.stopPropagation()
  e.preventDefault()
}
render(
  <Dropdown
    action_menu
    right
    label="Label:"
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
`}
    </ComponentBox>
  </Wrapper>
)

export const DropdownSizes = () => (
  <Wrapper>
    <ComponentBox data-visual-test="dropdown-sizes" scope={{ data }}>
      {() => /* jsx */ `
<FormRow direction="vertical">
  <Dropdown
    label="Label:"
    size="default"
    bottom
    data={() => (data)}
  />
  <Dropdown
    label="Label:"
    size="medium"
    bottom
    data={() => (data)}
  />
  <Dropdown
    label="Label:"
    size="large"
    bottom
    data={() => (data)}
  />
</FormRow>
`}
    </ComponentBox>
  </Wrapper>
)

export const DropdownCustomWidth = () => (
  <Wrapper>
    <ComponentBox
      // data-visual-test="dropdown-width"
      scope={{ data }}
      useRender
    >
      {() => /* jsx */ `
const CustomWidthOne = styled(Dropdown)\`
  .dnb-dropdown__shell {
    width: 10rem;
  }
\`
const CustomWidthTwo = styled(Dropdown)\`
  &.dnb-dropdown--is-popup .dnb-drawer-list__root {
    width: 12rem;
  }
\`
const CustomWidthThree = styled(Dropdown)\`
  /** Change the "__shell" width */
  .dnb-dropdown__shell {
    width: 10rem;
  }

  /** Change the "__list" width */
  .dnb-drawer-list__root {
    width: 20rem;
  }
\`
const CustomWidthFour = styled(Dropdown)\`
  width: 60%;
  min-width: 224px; /** 14rem (please use pixels on min-width!) */
  max-width: 25rem;

  /** In case we have a label */
  .dnb-form-label + .dnb-dropdown__inner {
    width: 100%;
  }
\`
render(<FormRow direction="vertical">
  <CustomWidthOne
    label="Label:"
    size="default"
    icon_position="left"
    bottom
    data={data}
  />
  <CustomWidthTwo
    label="Label:"
    size="small"
    more_menu
    bottom
    data={data}
  />
  <CustomWidthThree
    label="Label:"
    size="large"
    align_dropdown="right"
    bottom
    data={data}
  />
  <CustomWidthFour
    title="Min and max width"
    stretch={true}
    bottom
    data={data}
  />
</FormRow>)
`}
    </ComponentBox>
  </Wrapper>
)

export const DropdownStatusVertical = () => (
  <Wrapper>
    <ComponentBox
      data-visual-test="dropdown-status-error"
      scope={{ data }}
    >
      {() => /* jsx */ `
<Dropdown
  data={data}
  label="Label:"
  label_direction="vertical"
  status="Message to the user"
/>
`}
    </ComponentBox>
  </Wrapper>
)

export const DropdownListOpened = () => (
  <Wrapper>
    <ComponentBox
      data-visual-test="dropdown-list"
      scope={{ data }}
      hideCode
    >
      {() => /* jsx */ `
<span className="dnb-drawer-list__list">
  <ul className="dnb-drawer-list__options">
    <li className="dnb-drawer-list__option first-of-type">
      <span className="dnb-drawer-list__option__inner">Brukskonto - Kari Nordmann</span>
    </li>
    <li className="dnb-drawer-list__option dnb-drawer-list__option--selected">
      <span className="dnb-drawer-list__option__inner">
        <span className="dnb-drawer-list__option__item"><NumberFormat always_selectall key="n-1" ban>12345678902</NumberFormat></span>
        <span className="dnb-drawer-list__option__item">Sparekonto - Ole Nordmann</span>
      </span>
    </li>
    <li className="dnb-drawer-list__option">
      <span className="dnb-drawer-list__option__inner">
        <span className="dnb-drawer-list__option__item"><NumberFormat always_selectall key="n-2" ban>11345678962</NumberFormat></span>
        <span className="dnb-drawer-list__option__item">Feriekonto - Kari Nordmann med et kjempelangt etternavnsen</span>
      </span>
    </li>
    <li className="dnb-drawer-list__option last-of-type">
      <span className="dnb-drawer-list__option__inner">
        <span className="dnb-drawer-list__option__item"><NumberFormat always_selectall key="n-3" ban>15349648901</NumberFormat></span>
        <span className="dnb-drawer-list__option__item">Oppussing - Ole Nordmann</span>
      </span>
    </li>
    <li className="dnb-drawer-list__triangle" />
  </ul>
</span>
`}
    </ComponentBox>
  </Wrapper>
)
