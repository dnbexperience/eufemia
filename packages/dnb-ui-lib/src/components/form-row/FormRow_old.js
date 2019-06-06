/**
 * This is mainly a Wrapper, to bulid more easely HTML Elements
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

const FormRow = ({ children, className, class: class_name, ...rest }) => (
  <div
    className={classnames('dnb-form-group', className, class_name)}
    {...rest}
  >
    {children}
  </div>
)
FormRow.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  class: PropTypes.string
}
FormRow.defaultProps = {
  className: null,
  class: null
}

export default FormRow
