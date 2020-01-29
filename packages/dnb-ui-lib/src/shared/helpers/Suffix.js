/**
 * Suffix helper
 *
 */

import React from 'react'

export const SuffixContext = React.createContext()

const Suffix = props => {
  if (!(props && props.suffix)) {
    return null
  }

  if (typeof props.children !== 'string') {
    return (
      <SuffixContext.Provider value={props}>
        {props.children}
      </SuffixContext.Provider>
    )
  }

  return props.children
}

export default Suffix
