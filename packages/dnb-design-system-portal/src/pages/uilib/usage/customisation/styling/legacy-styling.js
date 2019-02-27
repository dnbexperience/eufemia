import React from 'react'
import Img from 'Tags/Img'
import { css } from '@emotion/core'
import { Hr } from 'dnb-ui-lib/src/elements'
import {
  Cases,
  LegacyCodeExample
} from '../../../../../../../examples/example-styling/src/App'
import LegacyCodeStylingExample from './assets/legacy-code-styling-example.png'
import PortalStyle, {
  gridStyle
} from '../../../../../shared/parts/PortalStyle'

const LegacyCodeStyling = () => (
  <div
    className="dnb-core-style"
    css={[
      PortalStyle,
      css`
        .dnb-dev-grid {
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
          href="https://github.com/dnbexperience/eufemia/blob/develop/packages/examples/example-styling/src/App.jsx"
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
    <Cases />
  </div>
)

export default LegacyCodeStyling
