/**
 * UI lib Component Example
 *
 */

import React, { PureComponent, Fragment } from 'react'
import ComponentBox from 'Src/shared/tags/ComponentBox'
import styled from '@emotion/styled'

class Example extends PureComponent {
  render() {
    return (
      <Fragment>
        <ComponentBox
          title="Default autocomplete, with long list to make it scrollable and searchable"
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
  <Autocomplete
    data={scrollableData}
    value={5}
    label="Label:"
  />
)
          `}
        </ComponentBox>
        <ComponentBox
          title="Default autocomplete - no `value` is defined, but a `title` is given."
          data-dnb-test="autocomplete-closed"
          useRender
          hideSyntaxButton
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
  <Autocomplete
    data={data}
    label="Label:"
    title="Please select a value"
    on_change={({ data: { selected_key } }) => {
      console.log('on_change', selected_key)
    }}
  />
)
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
    > :not(.dnb-autocomplete--is-popup) .dnb-autocomplete {
      width: var(--autocomplete-width);
    }
  }
`

export { Example }
export default () => (
  <Wrapper>
    <Example />
  </Wrapper>
)

// const data = [
//   // Every data item can, beside "content" - contain what ever
//   {
//     // (optional) can be what ever
//     selected_key: 'key_0',
//
//     // (optional) is show insted of "content", once selected
//     selected_value: 'Item 1 Value',
//
//     // Item content as a string or array
//     content: 'Item 1 Content'
//   },
//   {
//     selected_key: 'key_1',
//     content: ['Item 2 Value', 'Item 2 Content']
//   },
//   {
//     selected_key: 'key_2',
//     selected_value: 'Item 3 Value',
//     content: ['Item 3 Content A', 'Item 3 Content B']
//   },
//   {
//     selected_key: 'key_3',
//     selected_value: 'Item 4 Value',
//     content: ['Item 4 Content A', <>Custom Component</>]
//   }
// ]
