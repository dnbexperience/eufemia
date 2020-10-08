/**
 * dnb-ui-lib Element Story
 *
 */

import React from 'react'
import { Wrapper, Box } from '../helpers'
import styled from '@emotion/styled'

const CustomStyles = styled.div``

import { Ol, Li, Ul, Dl, Dt, Dd } from '../../src/elements'
import { Provider } from '../../src/shared'

const WidthLimit = styled.div`
  max-width: 22rem;
  .dnb-ol li::before {
    font-weight: var(--font-weight-bold);
  }
`

export const Lists = () => (
  <Wrapper className="dnb-spacing">
    <Provider>
      <CustomStyles>
        <Box>
          <Ul>
            <Li>Item 1</Li>
            <Li>Item 2</Li>
            <Li>
              Item 3
              <Ul>
                <Li>
                  Item 1 <br />
                  Break with a{' '}
                  <a className="dnb-anchor" href="/">
                    Anchor (Text Link
                  </a>
                </Li>
                <Li>Item 2</Li>
              </Ul>
            </Li>
            <Li>Item 4</Li>
          </Ul>
        </Box>
        <Box>
          <Ol nested>
            <Li>Item</Li>
            <Li>
              Item
              <Ol>
                <Li>
                  Item
                  <Ol>
                    <Li>Item</Li>
                    <Li>Item</Li>
                  </Ol>
                </Li>
                <Li>
                  Item
                  <Ol>
                    <Li>Item</Li>
                    <Li>Item</Li>
                  </Ol>
                </Li>
              </Ol>
            </Li>
            <Li>Item</Li>
          </Ol>
        </Box>
        <Box>
          <Ol nested type="A">
            <Li>Item</Li>
            <Li>
              Item
              <Ol type="I" start="3">
                <Li>
                  Item
                  <Ol type="i">
                    <Li>Item</Li>
                    <Li>Item</Li>
                  </Ol>
                </Li>
              </Ol>
            </Li>
            <Li>Item</Li>
          </Ol>
        </Box>
        <Box>
          <WidthLimit>
            <Ol nested className="dnb-ol--outside">
              <Li>
                Using <code className="dnb-code">dnb-ol--outside</code>{' '}
                (default): Using Porta commodo tempus interdum habitant
                urna magna aliquet quam nisl
                <Ol>
                  <Li>
                    Porta commodo tempus interdum habitant urna magna
                    aliquet quam nisl
                  </Li>
                </Ol>
              </Li>
            </Ol>
            <Ol nested className="dnb-ol--inside">
              <Li>
                New ol, using{' '}
                <code className="dnb-code">dnb-ol--inside</code>: Porta
                commodo tempus interdum habitant urna magna aliquet quam
                nisl
                <Ol>
                  <Li>
                    Porta commodo tempus interdum habitant urna magna
                    aliquet quam nisl
                  </Li>
                </Ol>
              </Li>
            </Ol>
          </WidthLimit>
        </Box>
        <Box>
          <Dl>
            <Dt>Term</Dt>
            <Dd>Description</Dd>
            <Dt>Term</Dt>
            <Dd>Description 1</Dd>
            <Dd>Description 2</Dd>
            <Dd>Description 3</Dd>
            <dl className="dnb-dl">
              <Dt>Sub Term</Dt>
              <Dd>Sub Description</Dd>
            </dl>
          </Dl>
        </Box>
      </CustomStyles>
    </Provider>
  </Wrapper>
)
