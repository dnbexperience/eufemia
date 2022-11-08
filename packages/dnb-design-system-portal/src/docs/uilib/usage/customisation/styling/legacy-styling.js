/**
 * To showcase legacy styling with the @dnb/eufemia
 *
 */

import React from 'react'
import classnames from 'classnames'
import InlineImg from 'dnb-design-system-portal/src/shared/tags/Img'
import { Button, Icon } from '@dnb/eufemia/src/components'
import { H2, H4, P, Hr, Code } from '@dnb/eufemia/src/elements'
import { bell } from '@dnb/eufemia/src/icons'
import LegacyCodeStylingExample from './assets/legacy-code-styling-example.png'
import {
  ShowPixelBounding,
  LegacyCodeExample,
  CoreStyleExample,
  SpacingExample,
} from './legacy-styling.module.scss'
import { portalStyle } from '../../../../../shared/parts/Layout.module.scss'

const LegacyCodeStyling = () => (
  <div className={classnames(portalStyle, 'dnb-core-style')}>
    <article className={LegacyCodeExample}>
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
      <InlineImg
        src={LegacyCodeStylingExample}
        caption="Screenshot of how the first example would look like"
        size="auto"
      />
    </article>
    {/* Use of core style reset */}
    <article
      className={classnames(
        CoreStyleExample,
        'dnb-core-style',
        'dnb-dev-grid'
      )}
    >
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
      <P className={ShowPixelBounding}>I'm still on the Pixel Grid</P>
    </article>

    {/* Use of spacing */}
    <article
      className={classnames(
        SpacingExample,
        'dnb-core-style',
        'dnb-spacing',
        'dnb-dev-grid'
      )}
    >
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
      <P className={ShowPixelBounding}>I'm still on the Pixel Grid</P>
    </article>
  </div>
)

export default LegacyCodeStyling
