/**
 * To showcase legacy styling with the @dnb/eufemia
 *
 */

import React from 'react'
import styled from '@emotion/styled'
import Img from 'Tags/Img'
import { css } from '@emotion/react'
import { Button, Icon } from '@dnb/eufemia/src/components'
import { H2, H4, P, Hr, Code } from '@dnb/eufemia/src/elements'
import { bell } from '@dnb/eufemia/src/icons'
import LegacyCodeStylingExample from './assets/legacy-code-styling-example.png'
import PortalStyle, { gridStyle } from 'Src/shared/parts/PortalStyle'

const LegacyCodeStyling = () => (
  <div
    className="dnb-core-style"
    css={[
      PortalStyle,
      css`
        .dnb-dev-grid {
          z-index: 1;
          ${gridStyle({ rgb: '220, 220, 220', a: 0.8 })};
        }
      `
    ]}
  >
    <LegacyCodeExample>
      <h1>Example usage</h1>
      <p>
        Further down on this page You find visual examples of how to deal
        with legacy styling.
      </p>
      <p>
        Check out the{' '}
        <a
          className="dnb-anchor"
          href="https://github.com/dnbexperience/eufemia-examples/tree/main/packages/example-styling/src/App.jsx"
        >
          source code for further explanation
        </a>
      </p>
      <Hr />
      <Img
        src={LegacyCodeStylingExample}
        caption="Screenshot of how the first example would look like"
        size="auto"
      />
    </LegacyCodeExample>
    {/* Use of core style reset */}
    <CoreStyleExample className="dnb-core-style dnb-dev-grid">
      <Code>{'<div class="dnb-core-style">'}</Code>
      <H4>
        I'm using the Eufemia CSS reset, so I'm <b>1.5rem</b> high!{' '}
      </H4>
      <P>Me as well {'😇'}</P>
      <H2>
        And I'm a <Code>{`<h2>`}</Code> <Icon icon={bell} size="auto" />
      </H2>
      <Button text="I'm looking good" icon="chevron_right" />
      <br />
      <br />
      <Code>{'</div>'}</Code>
      <ShowPixelBounding>I'm still on the Pixel Grid</ShowPixelBounding>
    </CoreStyleExample>

    {/* Use of spacing */}
    <SpacingExample className="dnb-core-style dnb-spacing dnb-dev-grid">
      <Code>{'<div class="dnb-core-style dnb-spacing">'}</Code>
      <H2>
        I'm a <Code>{`<h2>`}</Code> in an Article, and have the default
        spacing!
      </H2>
      <P>
        I'm a happy paragraph with spacing, written as <Code>{`<p>`}</Code>
        .
      </P>
      <p className="dnb-p">
        And I cloned Your style, but written as{' '}
        <Code>{`<p class="dnb-p">`}</Code>
      </p>
      <Button
        variant="secondary"
        text="I'm looking good"
        icon="add"
        icon_position="left"
      />
      <br />
      <br />
      <Code>{'</div>'}</Code>
      <ShowPixelBounding>I'm still on the Pixel Grid</ShowPixelBounding>
    </SpacingExample>
  </div>
)

export default LegacyCodeStyling

const ShowPixelBounding = styled(P)`
  .dnb-core-style & {
    margin-top: 3rem;
  }
  color: var(--color-sky-blue);
  background-color: rgba(164, 255, 255, 0.3);
`
const LegacyCodeExample = styled.article`
  padding: 3rem 2rem 4rem;
  background-color: var(--color-mint-green-12);
`
const CoreStyleExample = styled.article`
  margin: 0;
  padding: 3rem 2rem 4rem;
  background-color: var(--color-sea-green-30);
  code:first-of-type,
  code:last-of-type {
    margin-bottom: 1rem;
  }
  .show-pixel-bounding {
    background-color: rgba(255, 255, 255, 0.5);
  }
`
const SpacingExample = styled.article`
  padding: 3rem 2rem 4rem;
  background-color: var(--color-mint-green-50);
  .show-pixel-bounding {
    background-color: rgba(255, 255, 255, 0.5);
  }
`
