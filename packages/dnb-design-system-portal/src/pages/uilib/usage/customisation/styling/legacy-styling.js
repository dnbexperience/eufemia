import React from 'react'
import {
  Cases,
  Article1
} from '../../../../../../../examples/example-styling/src/App'

const LegacyCodeStyling = () => (
  <>
    <Article1>
      <h2>This would have content without Eufemia styles.</h2>
      <p>
        Check out the source of{' '}
        <a
          className="dnb-anchor"
          href="https://github.com/dnbexperience/eufemia/blob/develop/packages/examples/example-styling/src/App.jsx"
        >
          <b>App.jsx</b> for further information
        </a>
      </p>
    </Article1>
    <Cases />
  </>
)

export default LegacyCodeStyling
