/**
 * Storybook Story
 *
 */

import React from 'react'
import { Wrapper, Box } from './helpers'
import styled from '@emotion/styled'
import { IconPrimary } from 'dnb-ui-lib/src'

const stories = []
export default stories

const CustomStyles = styled.div`
  a {
    ${'' /** :has is not supported in browsers yet */}
    &:has(> .dnb-icon) {
      border-bottom: none;
      color: red;
    }
  }
`

stories.push([
  'Table',
  () => (
    <Wrapper className="dnb-spacing">
      <Box>
        <CustomStyles>
          <table>
            <thead>
              <tr>
                <th colSpan="2">Column 1 + 2</th>
                <th>
                  <a href="#sort">Column 3</a>
                </th>
                <th>
                  <a href="#sort" className="dnb-no-anchor-underline">
                    Column 4 <IconPrimary icon="chevron-down" />
                  </a>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Column 1</td>
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
              <tr>
                <td>Column 1</td>
                <td>Column 2</td>
                <td>Column 3</td>
                <td>Column 4</td>
              </tr>
            </tbody>
          </table>

          <p>
            Lorem in morbi euismod id lectus varius imperdiet proin dui
          </p>
        </CustomStyles>
      </Box>
    </Wrapper>
  )
])

stories.push([
  'UL Lists',
  () => (
    <Wrapper className="dnb-spacing">
      <CustomStyles>
        <Box>
          <ul>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>
              Item Title
              <ul>
                <li>
                  Item 1 <br />
                  Break
                </li>
                <li>Item 2</li>
                <li>
                  Item Title
                  <ul>
                    <li>Item 1</li>
                    <li>Item 2</li>
                    <li>Item 3</li>
                    <li>Item 4</li>
                  </ul>
                </li>
                <li>Item 4</li>
              </ul>
            </li>
            <li>Item 4</li>
          </ul>
          <p>
            Lorem in morbi euismod id lectus varius imperdiet proin dui
          </p>
          <p>
            Lorem in morbi euismod id lectus varius imperdiet proin dui
          </p>
        </Box>
      </CustomStyles>
    </Wrapper>
  )
])

stories.push([
  'OL Lists',
  () => (
    <Wrapper className="dnb-spacing">
      <CustomStyles>
        <Box>
          <ol>
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
            <li>
              Item Title
              <ol>
                <li>Item 1</li>
                <li>Item 2</li>
                <li>Item 3</li>
                <li>Item 4</li>
              </ol>
            </li>
          </ol>
        </Box>
      </CustomStyles>
    </Wrapper>
  )
])

stories.push([
  'DL Lists',
  () => (
    <Wrapper className="dnb-spacing">
      <CustomStyles>
        <Box>
          <dl>
            <dt>Item Title 1</dt>
            <dd>Item Description 1</dd>
            <dt>Item Title 1</dt>
            <dd>Item Description 1</dd>
          </dl>
        </Box>
      </CustomStyles>
    </Wrapper>
  )
])

const Textarea = styled.textarea`
  ${'' /* border-radius: 1rem; */}
`

stories.push([
  'Textarea',
  () => (
    <Wrapper className="dnb-spacing">
      <CustomStyles>
        <Box>
          <Textarea
            defaultValue="Nec litora inceptos vestibulum id interdum donec gravida nostra
            lacinia bibendum hendrerit porttitor volutpat nam duis nisl
            scelerisque sapien erat"
          />
        </Box>
      </CustomStyles>
    </Wrapper>
  )
])
