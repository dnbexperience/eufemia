/**
 * Storybook Story
 *
 */

import React from 'react'
import { Wrapper, Box } from './helpers'
import styled from '@emotion/styled'
import { IconPrimary } from 'dnb-ui-lib/src'
import { FormStatus } from '../src/components'

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

  blockquote {
    max-width: 220px;
  }

  .dnb-form-group {
    background-color: rgba(200, 0, 200, 0.15);
  }

  ul,
  ol,
  dl {
    background-color: rgba(200, 0, 200, 0.15);
  }

  li,
  dt {
    background-color: rgba(0, 0, 0, 0.15);
  }

  dd {
    background-color: rgba(0, 0, 0, 0.075);
  }

  li ul li {
    background-color: rgba(0, 0, 0, 0.15);
  }

  li ul li ul li {
    background-color: rgba(0, 0, 0, 0.15);
  }

  p {
    background-color: rgba(0, 0, 0, 0.15);
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
                  <a href="#sort" className="dnb-anchor-no-underline">
                    Column 4 <IconPrimary icon="chevron-down" />
                  </a>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <p>
                    Column 1 <b>width p</b>
                  </p>
                </td>
                <td>
                  <code>Column 2 with code</code>
                </td>
                <td>
                  <span>Column 3 with span</span>
                </td>
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
          <p>Paragraph</p>
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
                    <li>
                      Item 3 with <p>Paragraph</p>
                    </li>
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
  'Blockquote',
  () => (
    <Wrapper className="dnb-spacing">
      <CustomStyles>
        <Box>
          <blockquote>
            Scaevola dissentias ne nec, praesent pertinacia te vim, velit
            laboramus assentior ne ius. Choro vivendum tractatos ei quo. Te
            vim enim meis conclusionemque, per ut dolorem copiosae, ea veri
            sanctus deterruisset per
            <footer>Footer Referance</footer>
          </blockquote>
          <p>
            Next line <cite>with a Cite</cite>
          </p>
        </Box>
        <Box>
          <blockquote className="dnb-blockquote--top">
            Scaevola dissentias ne nec, praesent pertinacia te vim, velit
            laboramus assentior ne ius. Choro vivendum tractatos ei quo. Te
            vim enim meis conclusionemque, per ut dolorem copiosae, ea veri
            sanctus deterruisset per
            <cite>Cite Referance</cite>
            <figcaption>Figcaption Referance</figcaption>
          </blockquote>
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

stories.push([
  'Textarea',
  () => (
    <Wrapper className="dnb-spacing">
      <CustomStyles>
        <Box>
          <div className="dnb-form-group dnb-form-group__position--vertical">
            <label htmlFor="hendrerit">Label for the textarea:</label>
            <textarea
              id="hendrerit"
              rows="5"
              cols="33"
              defaultValue="Nec litora inceptos vestibulum id interdum donec gravida
            nostra lacinia bibendum hendrerit porttitor volutpat nam duis
            nisl scelerisque sapien erat"
            />
          </div>
          <p>I have to be on the grid!</p>
        </Box>
        <Box>
          <div className="dnb-form-group">
            <label htmlFor="litora">Label for the textarea:</label>
            <textarea
              id="litora"
              placeholder="Nec litora inceptos vestibulum id interdum donec gravida nostra
            lacinia bibendum hendrerit porttitor volutpat nam duis nisl
            scelerisque sapien erat"
            />
          </div>
          <p>I have to be on the grid!</p>
        </Box>
        <Box>
          <textarea
            rows="5"
            cols="33"
            minLength="10"
            maxLength="20"
            required
            defaultValue="Nec litora inceptos vestibulum id interdum donec gravida nostra
            lacinia bibendum hendrerit porttitor volutpat nam duis nisl
            scelerisque sapien erat"
          />
          <p>I have to be on the grid!</p>
        </Box>
        <Box>
          <div className="dnb-form-group dnb-form-group__position--vertical">
            <label htmlFor="vestibulum">Label:</label>
            <textarea
              id="vestibulum"
              className="status--error"
              cols="33"
              defaultValue="Nec litora inceptos vestibulum id interdum donec gravida nostra
            lacinia bibendum hendrerit porttitor volutpat nam duis nisl
            scelerisque sapien erat"
            />
            <FormStatus text="Message to the user" />
          </div>
          <p>dI have to be on the grid!</p>
        </Box>
        <Box>
          <div className="dnb-form-group">
            <label htmlFor="volutpat">Label:</label>
            <textarea
              id="volutpat"
              disabled
              cols="33"
              defaultValue="Nec litora inceptos vestibulum id interdum donec gravida nostra
            lacinia bibendum hendrerit porttitor volutpat nam duis nisl
            scelerisque sapien erat"
            />
          </div>
          <p>I have to be on the grid!</p>
        </Box>
      </CustomStyles>
    </Wrapper>
  )
])

stories.push([
  'Anchor',
  () => (
    <Wrapper>
      <Box>
        <a href="http://dnb.no">
          <IconPrimary icon="chevron_left" /> Anchor
        </a>
      </Box>
      <Box>
        <a href="http://dnb.no">
          Anchor <IconPrimary icon="chevron_right" />
        </a>
      </Box>
      <Box>
        <a href="/" className="dnb-anchor--hover">
          Hover Style
        </a>
      </Box>
      <Box>
        <a href="/" className="dnb-anchor--active">
          Active Style
        </a>
      </Box>
      <Box>
        <a href="/" className="dnb-anchor--focus">
          Focus Style
        </a>
      </Box>
      <Box>
        <a href="/" className="dnb-anchor--animation">
          With a special Animation (is removed from the styles)
        </a>
      </Box>
      <Box>
        <a href="http://dnb.no">
          Default Anchor - Adipiscing per egestas duis feugiat dignissim
          quam cras eget non est ante purus taciti volutpat mi phasellus
          rhoncus ridiculus diam at proin fusce bibendum netus dapibus
          natoque varius eros litora
        </a>
      </Box>
      <Box>
        <a href="http://dnb.no" className="dnb-anchor--animation">
          Anchor with Animation <IconPrimary icon="chevron_right" />
        </a>
      </Box>
      <Box>
        <a href="http://dnb.no" className="dnb-anchor--animation">
          Anchor with Animation - Adipiscing per egestas duis feugiat
          dignissim quam cras eget non est ante purus taciti volutpat mi
          phasellus rhoncus ridiculus diam at proin fusce bibendum netus
          dapibus natoque varius eros litora
        </a>
      </Box>
      <Box>
        <a
          href="http://dnb.no"
          className="dnb-anchor--animation"
          style={{ whiteSpace: 'normal' }}
        >
          Anchor with Animation and no `white-space: pre;` - Adipiscing per
          egestas duis feugiat dignissim quam cras eget non est ante purus
          taciti volutpat mi phasellus rhoncus ridiculus diam at proin
          fusce bibendum netus dapibus natoque varius eros litora
        </a>
      </Box>
    </Wrapper>
  )
])
