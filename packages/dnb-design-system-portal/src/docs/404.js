/**
 * Page not found
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import { GlobalError } from 'dnb-ui-lib/src/components'

export default class PageNotFound extends React.PureComponent {
  static propTypes = {
    location: PropTypes.object.isRequired
  }
  render() {
    const { pathname } = this.props.location

    return (
      <GlobalError
        status="404"
        title="We couldn't find that page"
        text={
          <>
            There's not a page at <code>{pathname}</code>
          </>
        }
      />
    )
  }
}
