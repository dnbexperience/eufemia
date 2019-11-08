/**
 * UI lib Component Example
 *
 */

import React, { PureComponent, Fragment } from 'react'
import ComponentBox from 'Src/shared/tags/ComponentBox'
import CodeBlock from 'Src/shared/tags/CodeBlock'
import styled from '@emotion/styled'

class Example extends PureComponent {
  render() {
    const props =
      typeof window !== 'undefined' && window.IS_TEST
        ? { no_animation: true, no_scroll_animation: true }
        : {}
    console.log('props', props)
    return (
      <Fragment>
        <ComponentBox
          caption="Default dropdown, with long list to make it scrollable and searchable"
          useRender
          hideCode
          hideSyntaxButton
        >
          {/* @jsx */ `
const scrollableData = [
  {
    content: 'A'
  },
  {
    content: 'B'
  },
  {
    selected_value: <Number ban>11345678962</Number>,
    content: [<Number ban>11345678962</Number>, 'C']
  },
  {
    selected_value: <Number ban>15349648901</Number>,
    content: [<Number ban>15349648901</Number>, 'D']
  },
  {
    content: 'E'
  },
  {
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
    value={5}
    label="Label:"
  />
)
          `}
        </ComponentBox>
        <ComponentBox
          caption="Default dropdown - no `value` is defined, but a `title` is given."
          data-dnb-test="dropdown-closed"
          useRender
          hideSyntaxButton
          scope={{ props }}
        >
          {/* @jsx */ `
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
    selected_value: <Number ban>11345678962</Number>,
    content: [<Number ban>11345678962</Number>, 'Bank account number']
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
    on_change={({ data: { selected_key } }) => {
      console.log('on_change', selected_key)
    }}
    {...props}
  />
)
          `}
        </ComponentBox>
        <ComponentBox
          caption="Default dropdown, icon on left side"
          scope={{ data, props }}
          data-dnb-test="dropdown-left-icon"
        >
          {/* @jsx */ `
<Dropdown
  label="Label:"
  icon_position="left"
  data={data}
  value={3}
  on_change={({ data: selectedDataItem }) => {
    console.log('on_change', selectedDataItem)
  }}
  on_show={() => {
    console.log('on_show')
  }}
  {...props}
/>
          `}
        </ComponentBox>
        <ComponentBox
          caption="As **Popup Menu** - no lasting selection will be made"
          data-dnb-test="dropdown-more_menu"
          scope={{ props }}
        >
          {/* @jsx */ `
<Dropdown
  more_menu="true"
  size="small"
  title="Choose an item"
  data={() => ['Go this this Link', 'Or press on me', <>Custom component</>]}
  right="small"
  {...props}
/>
<Dropdown
  more_menu="true"
  title="Choose an item"
  data={['Go this this Link', 'Or press on me', <>Custom component</>]}
  right="small"
/>
<Dropdown
  prevent_selection="true"
  align_dropdown="right"
  title="Choose an item"
  data={['Go this this Link', 'Or press on me', <>Custom component</>]}
  on_change={({ value }) => {
    console.log('on_change', value)
  }}
  on_select={({ active_item }) => {
    console.log('on_select', active_item)
  }}
/>
          `}
        </ComponentBox>
        <ComponentBox caption="Disabled dropdown" scope={{ data }}>
          {/* @jsx */ `
<Dropdown disabled data={['Disabled Dropdown']} label="Label:" />
          `}
        </ComponentBox>
        <ComponentBox
          caption="Dropdown with status and vertical label layout"
          data-dnb-test="dropdown-status-error"
          scope={{ data, props }}
        >
          {/* @jsx */ `
<Dropdown
  data={data}
  label="Label:"
  label_direction="vertical"
  status="Message to the user"
  {...props}
/>
          `}
        </ComponentBox>
        <ComponentBox
          caption="Dropdown list - only to vissualize"
          data-dnb-test="dropdown-list"
          scope={{ data }}
          hideCode
        >
          {/* @jsx */ `
<span className="dnb-dropdown__list">
  <ul className="dnb-dropdown__options">
    <li className="dnb-dropdown__option">
      <span className="dnb-dropdown__option__inner">Brukskonto - Kari Nordmann</span>
    </li>
    <li className="dnb-dropdown__option dnb-dropdown__option--selected">
      <span className="dnb-dropdown__option__inner">
        <span className="dnb-dropdown__option__item"><Number ban>12345678902</Number></span>
        <span className="dnb-dropdown__option__item">Sparekonto - Ole Nordmann</span>
      </span>
    </li>
    <li className="dnb-dropdown__option">
      <span className="dnb-dropdown__option__inner">
        <span className="dnb-dropdown__option__item"><Number ban>11345678962</Number></span>
        <span className="dnb-dropdown__option__item">Feriekonto - Kari Nordmann med et kjempelangt etternavnsen</span>
      </span>
    </li>
    <li className="dnb-dropdown__option last-of-type">
      <span className="dnb-dropdown__option__inner">
        <span className="dnb-dropdown__option__item"><Number ban>15349648901</Number></span>
        <span className="dnb-dropdown__option__item">Oppussing - Ole Nordmann</span>
      </span>
    </li>
    <li className="dnb-dropdown__triangle" />
  </ul>
</span>
          `}
        </ComponentBox>
      </Fragment>
    )
  }
}

const Wrapper = styled.div`
  .dnb-form-label {
    margin-right: 1rem;
  }
  [data-dnb-test] {
    > :not(.dnb-dropdown--is-popup) .dnb-dropdown {
      width: var(--dropdown-width);
    }
  }
  [data-dnb-test-wrapper='dropdown-more_menu'] {
    width: 20rem;
    height: 15rem !important;
    ${'' /* .dnb-dropdown:nth-of-type(1n + 2) {
      display: none;
    } */}
  }
  [data-dnb-test='dropdown-list'] .dnb-dropdown__list {
    display: block;
    visibility: visible;
    position: relative;
    top: 0;
    width: var(--dropdown-width);
  }
`

export { Example }
export default () => (
  <Wrapper>
    <Example />
  </Wrapper>
)

export const Data = () => {
  return (
    <CodeBlock language="js">{/* @jsx */ `
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

  // more items ...
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

    `}</CodeBlock>
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
