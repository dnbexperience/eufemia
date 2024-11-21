/**
 * UI lib Component Example
 *
 */

import React from 'react'
import ComponentBox from '../../../../shared/tags/ComponentBox'
import { Dl, Dt, Dd, Ul, Li, Ol, Anchor } from '@dnb/eufemia/src'
import styled from '@emotion/styled'

export const DefinitionListExample = () => (
  <ComponentBox hideCode data-visual-test="lists-dl">
    <Dl>
      <Dt>Term</Dt>
      <Dd>Description</Dd>
      <Dt>Term</Dt>
      <Dd>Description 1</Dd>
      <Dd>Description 2</Dd>
      <Dd>Description 3</Dd>
      <Dd>
        <Dl>
          <Dt>Sub Term</Dt>
          <Dd>Sub Description</Dd>
        </Dl>
      </Dd>
    </Dl>
  </ComponentBox>
)

export const DefinitionListHorizontalExample = () => (
  <ComponentBox hideCode data-visual-test="lists-dl-horizontal">
    <Dl layout="horizontal">
      <Dl.Item>
        <Dt>Term 1</Dt>
        <Dd>Description 1</Dd>
      </Dl.Item>
      <Dl.Item>
        <Dt>Term 2</Dt>
        <Dd>Description 2</Dd>
      </Dl.Item>
      <Dl.Item>
        <Dt>
          A term with several words lorem dolor sit amet consectetur
          adipiscing
        </Dt>
        <Dd>
          Description with several words lorem nulla mi posuere cubilia vel
          vulputate
        </Dd>
      </Dl.Item>
    </Dl>
  </ComponentBox>
)

export const DefinitionListHorizontalExampleWithoutDtValue = () => (
  <ComponentBox
    hideCode
    data-visual-test="lists-dl-horizontal-without-dt-value"
  >
    <Dl layout="horizontal">
      <Dl.Item>
        <Dt>Term 1</Dt>
        <Dd>Description 1</Dd>
      </Dl.Item>
      <Dl.Item>
        <Dt></Dt>
        <Dd>Description 2</Dd>
      </Dl.Item>
      <Dl.Item>
        <Dt>
          A term with several words lorem dolor sit amet consectetur
          adipiscing
        </Dt>
        <Dd>
          Description with several words lorem nulla mi posuere cubilia vel
          vulputate
        </Dd>
      </Dl.Item>
    </Dl>
  </ComponentBox>
)

export const DefinitionListGridExample = () => (
  <ComponentBox hideCode data-visual-test="lists-dl-grid">
    <Dl layout="grid">
      <Dt>Term 1</Dt>
      <Dd>Description 1</Dd>

      <Dt>Term 2</Dt>
      <Dd>Description 2</Dd>

      <Dt>A term with several words lorem dolor sit amet</Dt>
      <Dd>
        Description with several words lorem nulla mi posuere cubilia vel
        vulputate
      </Dd>
    </Dl>
  </ComponentBox>
)

export const UnorderedListExample = () => (
  <ComponentBox hideCode data-visual-test="lists-ul">
    <Ul>
      <Li>Item 1</Li>
      <Li>Item 2</Li>
      <Li>
        Item 3
        <Ul>
          <Li>
            Item 1 <br />
            Break with a <Anchor href="/">Anchor (Text Link</Anchor>
          </Li>
          <Li>Item 2</Li>
        </Ul>
      </Li>
      <Li>Item 4</Li>
    </Ul>
  </ComponentBox>
)

export const OrderedListNestedExample = () => (
  <ComponentBox hideCode data-visual-test="lists-ol">
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
  </ComponentBox>
)

export const OrderedListStylePositionExample = () => (
  <ComponentBox hideCode data-visual-test="lists-ol-style-position">
    {() => {
      const WidthLimit = styled.div`
        max-width: 22rem;
        .dnb-ol li::before {
          font-weight: var(--font-weight-bold);
        }
      `

      return (
        <WidthLimit>
          <Ol nested className="dnb-ol--outside">
            <Li>
              Using <code className="dnb-code">dnb-ol--outside</code>{' '}
              (default): Using Porta commodo tempus interdum habitant urna
              magna aliquet quam nisl
              <Ol>
                <Li>
                  Porta commodo tempus interdum habitant urna magna aliquet
                  quam nisl
                </Li>
              </Ol>
            </Li>
          </Ol>
          <Ol nested className="dnb-ol--inside">
            <Li>
              New ol, using{' '}
              <code className="dnb-code">dnb-ol--inside</code>: Porta
              commodo tempus interdum habitant urna magna aliquet quam nisl
              <Ol>
                <Li>
                  Porta commodo tempus interdum habitant urna magna aliquet
                  quam nisl
                </Li>
              </Ol>
            </Li>
          </Ol>
        </WidthLimit>
      )
    }}
  </ComponentBox>
)

export const OrderedListOtherTypesExample = () => (
  <ComponentBox hideCode data-visual-test="lists-ol-types">
    <Ol type="A">
      <Li>Item</Li>
      <Li>
        Item
        <Ol type="I" start={3}>
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
  </ComponentBox>
)

export const RemoveListExample = () => (
  <ComponentBox hideCode data-visual-test="lists-reset">
    <ul className="dnb-ul dnb-unstyled-list">
      <li>ul Item</li>
    </ul>
    <ol className="dnb-ol dnb-unstyled-list">
      <li>ol Item</li>
    </ol>
    <dl className="dnb-dl dnb-unstyled-list">
      <dt>dl Title</dt>
      <dd>dl Description</dd>
    </dl>
  </ComponentBox>
)
