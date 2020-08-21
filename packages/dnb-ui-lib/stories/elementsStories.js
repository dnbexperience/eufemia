/**
 * Storybook Story
 *
 */

import React from 'react'
import { Wrapper, Box } from './helpers'
import { css } from '@emotion/core'
import styled from '@emotion/styled'

import { FormStatus, FormRow } from '../src/components'
import { H1, H2, P, Link } from '../src/elements'
// import Link from '../src/elements/Link'

import Table from './elements/Table'
import Anchor from './elements/Anchor'
import Lists from './elements/Lists'
import Blockquote from './elements/Blockquote'

const stories = []
export default stories

stories.push(Table)
stories.push(Anchor)
stories.push(Lists)
stories.push(Blockquote)

const CustomStyles = styled.div`
  .dnb-form-row {
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
  ${'' /* .dnb-form-row + p,
  textarea + p {
    margin-top: 1rem;
  } */}
`

stories.push([
  'Other Elements',
  () => (
    <Wrapper className="dnb-spacing">
      <Box>
        <CustomStyles>
          <H1 className="dnb-small">H1</H1>
          <H2
            css={css`
              color: red;
            `}
          >
            H2
          </H2>
          <P>
            Fermentum sapien ipsum cursus lorem iaculis sagittis elit
            euismod non
          </P>
          <Link href="/">Link</Link>
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
          <p className="dnb-p">Paragraph</p>
          <ul className="dnb-ul">
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
                      Item 3 with <p className="dnb-p">Paragraph</p>
                    </li>
                    <li>Item 4</li>
                  </ul>
                </li>
                <li>Item 4</li>
              </ul>
            </li>
            <li>Item 4</li>
          </ul>
          <p className="dnb-p">
            Lorem in morbi euismod id lectus varius imperdiet proin dui
          </p>
          <p className="dnb-p">
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
          <ol className="dnb-ol">
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
          <dl className="dnb-dl">
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
          <FormRow vertical>
            <label className="dnb-form-label" htmlFor="hendrerit">
              Label for the textarea:
            </label>
            <textarea
              className="dnb-textarea"
              id="hendrerit"
              rows="5"
              cols="33"
              defaultValue="Nec litora inceptos vestibulum id interdum donec gravida
              nostra lacinia bibendum hendrerit porttitor volutpat nam duis
              nisl scelerisque sapien erat"
            />
          </FormRow>
          <p className="dnb-p">I have to be on the grid!</p>
        </Box>
        <Box>
          <FormRow>
            <label className="dnb-form-label" htmlFor="litora">
              Label for the textarea:
            </label>
            <textarea
              className="dnb-textarea"
              id="litora"
              rows="3"
              placeholder="Nec litora inceptos vestibulum id interdum donec gravida nostra
            lacinia bibendum hendrerit porttitor volutpat nam duis nisl
            scelerisque sapien erat"
            />
          </FormRow>
          <p className="dnb-p">I have to be on the grid!</p>
        </Box>
        <Box>
          <textarea
            className="dnb-textarea"
            rows="5"
            cols="33"
            minLength="10"
            maxLength="20"
            required
            defaultValue="Nec litora inceptos vestibulum id interdum donec gravida nostra
            lacinia bibendum hendrerit porttitor volutpat nam duis nisl
            scelerisque sapien erat"
          />
          <p className="dnb-p">I have to be on the grid!</p>
        </Box>
        <Box>
          <FormRow vertical>
            <label className="dnb-form-label" htmlFor="vestibulum">
              Label:
            </label>
            <textarea
              id="vestibulum"
              className="dnb-textarea status--error"
              cols="33"
              defaultValue="Nec litora inceptos vestibulum id interdum donec gravida nostra
            lacinia bibendum hendrerit porttitor volutpat nam duis nisl
            scelerisque sapien erat"
            />
            <FormStatus text="Message to the user" />
          </FormRow>
          <p className="dnb-p">I have to be on the grid!</p>
        </Box>
        <Box>
          <FormRow>
            <label className="dnb-form-label" htmlFor="volutpat">
              Label:
            </label>
            <textarea
              className="dnb-textarea"
              id="volutpat"
              disabled
              // readOnly
              cols="33"
              defaultValue="Nec litora inceptos vestibulum id interdum donec gravida nostra
            lacinia bibendum hendrerit porttitor volutpat nam duis nisl
            scelerisque sapien erat"
            />
          </FormRow>
          <p className="dnb-p">I have to be on the grid!</p>
        </Box>
      </CustomStyles>
    </Wrapper>
  )
])
