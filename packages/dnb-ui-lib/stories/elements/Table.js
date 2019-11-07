/**
 * dnb-ui-lib Component Story
 *
 */

import React, { Fragment } from 'react'
import { Wrapper, Box } from '../helpers'
import styled from '@emotion/styled'

import {
  Button,
  Switch,
  Checkbox,
  Dropdown,
  Input,
  DatePicker,
  Number
} from '../../src/components'

const CustomWrapper = styled(Wrapper)`
  .mint_col {
    background-color: var(--color-mint-green-12);
  }
  .white_col {
    background-color: var(--color-white);
  }
`

export default [
  'Table',
  () => (
    <CustomWrapper className="dnb-spacing">
      <Box>
        <table className="dnb-table">
          <thead>
            <tr>
              <th colSpan="2" className="dnb-table--no-wrap-2">
                Only text In nam at lacinia blandit risus turpis cras
                sagittis et Id adipiscing per diam quam volutpat sed turpis
                odio donec Phasellus odio magnis sit neque commodo nisl
                hendrerit viverra consectetur tortor risus faucibus lacus
                erat egestas felis rhoncus lobortis dis
              </th>
              <th className="dnb-table--sortable dnb-table--reversed">
                <Button
                  variant="tertiary"
                  icon="chevron-down"
                  text="Sortable"
                />
              </th>
              <th className="dnb-table--sortable dnb-table--active">
                <Button
                  variant="tertiary"
                  icon="chevron-down"
                  text="Active"
                />
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              {/* <td>
                <Button variant="secondary" icon="close" />
              </td> */}
              <td>
                <Dropdown
                  data={data}
                  selected_index={0}
                  title="Please select a value"
                  on_change={({ data: { selected_key } }) => {
                    //eslint-disable-line
                    console.log('on_change', selected_key) //eslint-disable-line
                  }}
                />
              </td>
              <td>
                <Input placeholder="Placeholder text" />
              </td>
              <td>
                <DatePicker
                  range
                  date={new Date()}
                  show_input
                  align_picker="right"
                  show_cancel_button
                  on_change={({ date }) => {
                    console.log('on_change', date) //eslint-disable-line
                  }}
                  on_cancel={({ date }) => {
                    console.log('on_cancel', date) //eslint-disable-line
                  }}
                />
              </td>
              <td>
                <Checkbox label="12345" />
              </td>
            </tr>
            <tr>
              <td>
                <p className="dnb-p">
                  Column 1 <b>width p</b>
                </p>
              </td>
              <td>
                <code>Col</code>{' '}
                <DatePicker label="Date:" range align_picker="right" />
              </td>
              <td>
                <span>
                  Col <Switch />
                </span>
              </td>
              <td>Column 4</td>
            </tr>
            <tr>
              <td>
                Col <DatePicker label="Date:" show_input range />
              </td>
              <td>
                Column 2 <Button icon="close" variant="secondary" />
              </td>
              <td>
                Column 3 <Button icon="chevron_down" variant="tertiary" />
              </td>
              <td>
                Column 4
                <Button
                  text="Button"
                  icon="chevron_down"
                  variant="tertiary"
                />
              </td>
            </tr>
            <tr>
              <td>Column 1</td>
              <td>Column 2</td>
              <td>Column 3</td>
              <td>Column 4</td>
            </tr>
          </tbody>
        </table>
      </Box>
      <Box>
        <table className="dnb-table">
          <caption>A Table Caption</caption>
          <thead>
            <tr className="dnb-table__tr">
              <th className="dnb-table__th">.dnb-table__th</th>
              <th
                scope="col"
                className="dnb-table__th dnb-table--sortable dnb-table--reversed"
              >
                <Button
                  variant="tertiary"
                  icon="chevron-down"
                  text="dnb-table--reversed"
                  title="dnb-table__th dnb-table--sortable dnb-table--reversed"
                />
              </th>
              <th
                scope="col"
                className="dnb-table__th dnb-table--sortable dnb-table--active"
              >
                <Button
                  variant="tertiary"
                  icon="chevron-down"
                  text="dnb-table--active"
                  title="dnb-table__th dnb-table--sortable dnb-table--active"
                />
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="dnb-table__tr dnb-table__tr--even">
              <td colSpan="3" className="dnb-table__td">
                {'.dnb-table__tr--even > .dnb-table__td'}
              </td>
            </tr>
            <tr className="dnb-table__tr dnb-table__tr--odd">
              <td colSpan="3" className="dnb-table__td">
                {'.dnb-table__tr--odd > .dnb-table__td'}
              </td>
            </tr>
          </tbody>
        </table>
      </Box>
      <Box>
        <table className="dnb-table">
          <caption>Superheros and sidekicks</caption>
          <colgroup>
            <col />
            <col span="2" className="mint_col" />
            <col span="2" className="white_col" />
          </colgroup>
          <tr>
            <td> </td>
            <th scope="col">Batman</th>
            <th scope="col">Robin</th>
            <th scope="col">The Flash</th>
            <th scope="col">Kid Flash</th>
          </tr>
          <tr>
            <th scope="row">Skill</th>
            <td>Smarts</td>
            <td>Dex, acrobat</td>
            <td>Super speed</td>
            <td>Super speed</td>
          </tr>
          <tr>
            <th scope="row">Skill</th>
            <td>Smarts</td>
            <td>Dex, acrobat</td>
            <td>Super speed</td>
            <td>Super speed</td>
          </tr>
        </table>
      </Box>
    </CustomWrapper>
  )
]

const data = [
  {
    selected_value: 'AA',
    content: 'A'
  },
  {
    content: [
      <Number key={12345678902} ban>
        12345678902
      </Number>,
      'B'
    ]
  },
  {
    selected_value: 'CC',
    content: [
      <Number key={11345678962} ban>
        11345678962
      </Number>,
      'C'
    ]
  },
  {
    content: <Fragment>E</Fragment>
  },
  <Fragment key="key1">Custom content {'🔥'}</Fragment>,
  [<Fragment key="key2">Custom content X {'🔥'}</Fragment>],
  {
    content: 'EE'
  },
  {
    content: 'EEE'
  },
  {
    content: ['F', 'F', 'F', 'F', 'F']
  },
  {
    content: 'G'
  },
  {
    content: 'H'
  }
]
