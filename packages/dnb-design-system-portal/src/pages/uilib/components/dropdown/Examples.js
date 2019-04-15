/**
 * UI lib Component Example
 *
 */

import React, { PureComponent, Fragment } from 'react'
import ComponentBox from '../../../../shared/tags/ComponentBox'
import CodeBlock from '../../../../shared/tags/CodeBlock'
import styled from '@emotion/styled'

class Example extends PureComponent {
  static AdditionalCallback = {
    info: ({ CodeRenderer }) => (
      <Fragment>
        <h3>Data Structure</h3>
        <CodeRenderer language="json">{dataBlob}</CodeRenderer>
      </Fragment>
    )
  }
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
          {`
const scrollableData = [
  {
    selected_value: 'Find me by keypress',
    content: 'A'
  },
  {
    content: 'B'
  },
  {
    selected_value: 'CC',
    content: ['1134.56.78962', 'C']
  },
  {
    selected_value: 'DD',
    content: ['1534.96.48901', 'D']
  },
  {
    content: 'E'
  },
  {
    content: ['F', 'F', 'F', 'F', 'Find me by keypress']
  },
  {
    content: 'G'
  },
  {
    content: 'H'
  }
]
render(
  <Dropdown
    data={scrollableData}
    selected_item={0}
    label="Label:"
  />
)
          `}
        </ComponentBox>
        <ComponentBox
          caption="Default dropdown"
          data-dnb-test="dropdown-closed"
          useRender
          hideSyntaxButton
          scope={{ no_animation }}
        >
          {`
const data = [
  {
    selected_value: 'Item 1 Value',
    content: 'Item 1 Content'
  },
  {
    content: ['Item 2 Value', 'Item 2 Content']
  },
  {
    selected_value:
      'Item 3 Value',
    content: [
      'Item 3 Content A',
      'Item 3 Content B'
    ]
  },
  {
    selected_value: 'Item 4 Value',
    content: ['Item 4 Content A', 'Item 4 Content B']
  }
]
render(
  <Dropdown
    data={data}
    selected_item={0}
    label="Label:"
    no_animation={no_animation}
  />
)
          `}
        </ComponentBox>
        <ComponentBox
          caption="Default dropdown, icon on left side"
          scope={{ data }}
        >
          {`
<FormLabel for_id="text-dropdown-1" text="Label:" />
<Dropdown
  icon_position="left"
  data={data}
  selected_item={3}
  on_change={(e, data) => {
    console.log('on_change', e, data)
  }}
  on_show={() => {
    console.log('on_show')
  }}
  id="text-dropdown-1"
/>
          `}
        </ComponentBox>
        <ComponentBox caption="Disabled dropdown" scope={{ data }}>
          {`
<Dropdown disabled data={['Disabled Dropdown']} label="Label:" />
          `}
        </ComponentBox>
        <ComponentBox caption="Dropdown with status" scope={{ data }}>
          {`
<Dropdown data={data} label="Label:" status="Message to the user" />
          `}
        </ComponentBox>
        <ComponentBox
          caption="Dropdown list - only to vissualize"
          scope={{ data }}
          data-dnb-test="dropdown-list"
          hideCode
        >
          {`
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
    .dnb-dropdown__shell,
    .dnb-dropdown__text__inner {
      width: var(--dropdown-width);
    }
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

const data = [
  {
    selected_value: 'Brukskonto - Kari Nordmann',
    content: 'Brukskonto - Kari Nordmann'
  },
  {
    content: ['1234.56.78902', 'Sparekonto - Ole Nordmann']
  },
  {
    selected_value:
      'Feriekonto - Kari Nordmann med et kjempelangt etternavnsen',
    content: [
      '1134.56.78962',
      'Feriekonto - Kari Nordmann med et kjempelangt etternavnsen'
    ]
  },
  {
    selected_value: 'Oppussing - Ole Nordmann',
    content: ['1534.96.48901', 'Oppussing - Ole Nordmann']
  }
]
const dataBlob = JSON.stringify(data, null, 2)

export const Data = () => {
  return (
    <CodeBlock language="js">{`const data = ${JSON.stringify(
      data,
      null,
      2
    )}`}</CodeBlock>
  )
}
