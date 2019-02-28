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
    return (
      <Fragment>
        <ComponentBox
          caption="Default dropdown"
          scope={{ data }}
          data-dnb-test="dropdown-closed"
        >
          {/* @jsx */ `
<Dropdown data={data} selected_item={2} label="Label:" />
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
          {/* @jsx */ `
<Dropdown disabled data={['Disabled Dropdown']} label="Label:" />
          `}
        </ComponentBox>
        <ComponentBox caption="Dropdown with status" scope={{ data }}>
          {/* @jsx */ `
<Dropdown data={data} label="Label:" status="Message to the user" />
          `}
        </ComponentBox>
        <ComponentBox
          caption="Dropdown list - only to vissualize"
          scope={{ data }}
          data-dnb-test="dropdown-list"
          hideCode
        >
          {/* @jsx */ `
<ul className="dnb-dropdown__options">
  <li className="dnb-dropdown__option">
    <span className="dnb-dropdown__triangle"></span>
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
  <li className="dnb-dropdown__option">
    <span className="dnb-dropdown__option__inner">
      <span className="dnb-dropdown__option__item">1534.96.48901</span>
      <span className="dnb-dropdown__option__item">Oppussing - Ole Nordmann</span>
    </span>
  </li>
</ul>
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
  [data-dnb-test='dropdown-list'] .dnb-dropdown__options {
    position: relative;
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
    // outside_value: '1234.56.78901',
    content: 'Brukskonto - Kari Nordmann'
  },
  {
    content: ['1234.56.78902', 'Sparekonto - Ole Nordmann']
  },
  {
    selected_value:
      'Feriekonto - Kari Nordmann med et kjempelangt etternavnsen',
    // outside_value: '1134.56.78962',
    content: [
      '1134.56.78962',
      'Feriekonto - Kari Nordmann med et kjempelangt etternavnsen'
    ]
  },
  {
    selected_value: 'Oppussing - Ole Nordmann',
    // outside_value: '1534.96.48901',
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
