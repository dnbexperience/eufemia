/**
 * Suffix helper
 *
 */

import React from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

export const SuffixContext = React.createContext()

const Suffix = ({ className, children, context, ...props }) => {
  const content = (
    // The styles are as of now, set in @dnb/eufemia/src/style/components/imports.scss
    <span className={classnames('dnb-suffix', className)} {...props}>
      {children}
    </span>
  )

  if (typeof children !== 'string' && context) {
    return (
      <SuffixContext.Provider value={context}>
        {content}
      </SuffixContext.Provider>
    )
  }

  return content
}
Suffix.propTypes = {
  className: PropTypes.string,
  children: PropTypes.node,
}
Suffix.defaultProps = {
  className: null,
  children: null,
}

export default Suffix
