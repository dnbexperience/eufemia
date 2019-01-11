/**
 * UI lib Component Example
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import styled from '@emotion/styled'
import classnames from 'classnames'

const Wrapper = styled.div`
  padding: 3rem 0 0;
`

const NumberUsageExample = ({ typo_class }) => (
  <div className="example-box">
    <h4 className={typo_class}>Numbers:</h4>
    <p className={classnames('dnb-typo-number--lining', typo_class)}>
      <b>Lining:</b> 0123456789
    </p>
    <p className={classnames('dnb-typo-number--old-style', typo_class)}>
      <b>Old style:</b> 0123456789
    </p>
  </div>
)
NumberUsageExample.propTypes = {
  typo_class: PropTypes.string
}
NumberUsageExample.defaultProps = {
  typo_class: null
}

export default () => (
  <Wrapper>
    {/* Book */}
    <NumberUsageExample typo_class="dnb-typo-book" />

    {/* Demi */}
    <NumberUsageExample typo_class="dnb-typo-demi" />

    {/* Standard Medium */}
    <NumberUsageExample typo_class="dnb-typo-medium" />
  </Wrapper>
)
