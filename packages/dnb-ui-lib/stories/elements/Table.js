/**
 * dnb-ui-lib Component Story
 *
 */

import React /* , { useState, useEffect } */ from 'react'
import { Wrapper, Box } from '../helpers'
// import styled from '@emotion/styled'

import { Button, DatePicker } from '../../src/components'

export default [
  'Table',
  () => (
    <Wrapper className="dnb-spacing">
      <Box>
        <table className="dnb-table">
          <thead>
            <tr>
              <th colSpan="2" className="dnb-table--no-wrap">
                Only text
              </th>
              <th className="dnb-table--sortable dnb-table--reversed">
                {/* <a className="dnb-anchor" href="#sort">
                    Sortable
                    <IconPrimary icon="chevron-down" />
                  </a> */}
                <Button
                  variant="tertiary"
                  icon="chevron-down"
                  text="Sortable"
                />
              </th>
              <th className="dnb-table--sortable dnb-table--active">
                {/* <a className="dnb-anchor" href="#sort">
                    Active
                    <IconPrimary icon="chevron-down" />
                  </a> */}
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
              <td>
                <p className="dnb-p">
                  Column 1 <b>width p</b>
                </p>
              </td>
              <td>
                <code>Column 2 with code</code>{' '}
                <DatePicker label="Date:" range />
              </td>
              <td>
                <span>Column 3 with span</span>
              </td>
              <td>Column 4</td>
            </tr>
            <tr>
              <td>
                Column 1 <DatePicker label="Date:" range show_input />
              </td>
              <td>Column 2</td>
              <td>Column 3</td>
              <td>Column 4</td>
            </tr>
            <tr>
              <td>Column 1</td>
              <td>Column 2</td>
              <td>Column 3</td>
              <td>Column 4</td>
            </tr>
          </tbody>
        </table>

        <p className="dnb-p">
          Lorem in morbi euismod id lectus varius imperdiet proin dui
        </p>
      </Box>
    </Wrapper>
  )
]
