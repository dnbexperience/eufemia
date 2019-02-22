/**
 * UI lib Component Example
 *
 */

import React, { PureComponent, Fragment } from 'react'
import ComponentBox from '../../../../dnb-design-system-portal/src/shared/tags/ComponentBox'
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
  static on_change = (e, data) => {
    console.log('on_change', e, data)
  }
  componentDidMount() {
    // Dropdown.enableWebComponent()
    window.Example = Example
  }
  render() {
    return (
      <Fragment>
        <ComponentBox caption="Default dropdown" scope={{ data }}>
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
<Dropdown disabled id="text-dropdown-3" data={['Disabled Dropdown']} label="Label:" />
          `}
        </ComponentBox>
        <ComponentBox caption="Dropdown with status" scope={{ data }}>
          {/* @jsx */ `
<Dropdown id="text-dropdown-3" data={['Disabled Dropdown']} label="Label:" status="Message to the user" />
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
    outside_value: '1234.56.78901',
    content: 'Brukskonto - Kari Nordmann'
  },
  {
    content: ['1234.56.78902', 'Sparekonto - Ole Nordmann']
  },
  {
    selected_value:
      'Feriekonto - Kari Nordmann med et kjempelangt etternavnsen',
    outside_value: '1134.56.78962',
    content: [
      '1134.56.78962',
      'Feriekonto - Kari Nordmann med et kjempelangt etternavnsen'
    ]
  },
  {
    selected_value: 'Oppussing - Ole Nordmann',
    outside_value: '1534.96.48901',
    content: ['1534.96.48901', 'Oppussing - Ole Nordmann']
  }
]
const dataBlob = JSON.stringify(data, null, 2)
