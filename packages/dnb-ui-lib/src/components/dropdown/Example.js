/**
 * UI lib Component Example
 *
 */

import React, { Component, Fragment } from 'react'
import Dropdown from './Dropdown'
import { css } from 'react-emotion'

class Example extends Component {
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
        <Dropdown data={data} selected_item={2} />
        <Dropdown
          icon_position="left"
          data={data}
          selected_item={3}
          onChange={(e, data) => {
            console.log('onChange', e, data)
          }}
          onShow={() => {
            console.log('onShow')
          }}
          attributes={{
            'data-fake:on_change': 'Example.onChangeHandler()',
            'data-fake:on_state_update': 'Example.onStateUpdateHandler()'
          }}
        />
        <Dropdown disabled data={['Disabled Dropdown']} />
      </Fragment>
    )
  }
}

export { Example }
export default () => (
  <div
    css={css`
      .dnb-dropdown {
        display: block;
        margin: 0.5rem 0;
      }
    `}
  >
    <Example />
  </div>
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
