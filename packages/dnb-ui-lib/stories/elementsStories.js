/**
 * Storybook Story
 *
 */

import React from 'react'
import { Wrapper, Box } from './helpers'
import styled from '@emotion/styled'

const stories = []
export default stories

const Custom = styled.div`
  li {
    color: red;
    font-size: 1rem;
  }
`

stories.push([
  'UL Lists',
  () => (
    <Wrapper className="dnb-style">
      <Box>
        <Custom>
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
        </Custom>
      </Box>
    </Wrapper>
  )
])

stories.push([
  'OL Lists',
  () => (
    <Wrapper className="dnb-style">
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
    </Wrapper>
  )
])

stories.push([
  'DL Lists',
  () => (
    <Wrapper className="dnb-style">
      <Box>
        <dl>
          <dt>Item Title 1</dt>
          <dd>Item Description 1</dd>
          <dt>Item Title 1</dt>
          <dd>Item Description 1</dd>
        </dl>
      </Box>
    </Wrapper>
  )
])

const Textarea = styled.textarea`
  ${'' /* border-radius: 1rem; */}
`

stories.push([
  'Textarea',
  () => (
    <Wrapper className="dnb-style">
      <Box>
        <Textarea
          defaultValue="Nec litora inceptos vestibulum id interdum donec gravida nostra
        lacinia bibendum hendrerit porttitor volutpat nam duis nisl
        scelerisque sapien erat"
        />
      </Box>
    </Wrapper>
  )
])
