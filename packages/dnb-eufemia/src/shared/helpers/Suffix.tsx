/**
 * Suffix helper
 *
 */

import React from 'react'
import classnames from 'classnames'

const SuffixContext = React.createContext(null)

interface SuffixProps {
  className: string
  children: React.ReactNode
  context: Record<string, unknown>
}

const Suffix = ({
  className,
  children,
  context,
  ...props
}: SuffixProps) => {
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

export { SuffixContext }

export default Suffix
