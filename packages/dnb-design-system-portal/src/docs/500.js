/**
 * Page not found
 *
 */

import React from 'react'
import { GlobalError } from '@dnb/eufemia/src/components'

export default class Error500 extends React.PureComponent {
  render() {
    return (
      <GlobalError
        status="500"
        title="Sorry, we got a technical issue!"
        text="The service is not working properly at the moment, but try again later"
      />
    )
  }
}
