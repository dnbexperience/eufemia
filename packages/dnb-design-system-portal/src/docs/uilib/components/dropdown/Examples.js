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
    const no_animation = typeof window !== 'undefined' && window.IS_TEST
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
    selected_value: '1134.56.78962',
    content: ['1134.56.78962', 'C']
  },
  {
    selected_value: '1534.96.48901',
    content: ['1534.96.48901', 'D']
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
    selected_item={5}
    label="Label:"
  />
)
          `}
        </ComponentBox>
        <ComponentBox
          caption="Default dropdown - no `selected_item` is defined, but a `title` is given."
          data-dnb-test="dropdown-closed"
          useRender
          hideSyntaxButton
          scope={{ no_animation, no_scroll_animation: no_animation }}
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
    no_animation={no_animation}
    on_change={({ data: { selected_key } }) => {
      console.log('on_change', selected_key)
    }}
  />
)
          `}
        </ComponentBox>
        <ComponentBox
          caption="Default dropdown, icon on left side"
          scope={{ data }}
        >
          {/* @jsx */ `
<FormLabel for_id="text-dropdown-1" text="Label:" />
<Dropdown
  icon_position="left"
  data={data}
  selected_item={3}
  on_change={({ data: selectedDataItem }) => {
    console.log('on_change', selectedDataItem)
  }}
  on_show={() => {
    console.log('on_show')
  }}
  id="text-dropdown-1"
/>
          `}
        </ComponentBox>
        <ComponentBox
          caption="As **Popup Menu** - no lasting selection will be made"
          data-dnb-test="dropdown-popup"
        >
          {/* @jsx */ `
  <Dropdown
    popup_menu="small"
    title="Choose an item"
    data={['Go this this Link', 'Or press on me', <>Custom component</>]}
    on_change={({ selected_item }) => {
      console.log('on_change', selected_item)
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
          scope={{ data }}
        >
          {/* @jsx */ `
<Dropdown
  data={data}
  label="Label:"
  label_direction="vertical"
  status="Message to the user"
/>
          `}
        </ComponentBox>
        <ComponentBox
          caption="Dropdown list - only to vissualize"
          scope={{ data }}
          data-dnb-test="dropdown-list"
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
        <span className="dnb-dropdown__option__item">1234.56.78902</span>
        <span className="dnb-dropdown__option__item">Sparekonto - Ole Nordmann</span>
      </span>
    </li>
    <li className="dnb-dropdown__option">
      <span className="dnb-dropdown__option__inner">
        <span className="dnb-dropdown__option__item">1134.56.78962</span>
        <span className="dnb-dropdown__option__item">Feriekonto - Kari Nordmann med et kjempelangt etternavnsen</span>
      </span>
    </li>
    <li className="dnb-dropdown__option last-of-type">
      <span className="dnb-dropdown__option__inner">
        <span className="dnb-dropdown__option__item">1534.96.48901</span>
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
    > :not(.dnb-dropdown--is-popup) .dnb-dropdown__shell,
    > :not(.dnb-dropdown--is-popup) .dnb-dropdown__text__inner {
      width: var(--dropdown-width);
    }
  }
  [data-dnb-test-wrapper='dropdown-popup'] {
    width: 20rem;
    height: 15rem !important;
  }
  [data-dnb-test='dropdown-list'] .dnb-dropdown__list {
    display: block;
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
