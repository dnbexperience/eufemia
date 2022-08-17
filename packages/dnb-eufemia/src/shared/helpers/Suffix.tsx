/**
 * Suffix helper
 *
 */

import React from 'react'
import classnames from 'classnames'

const SuffixContext = React.createContext(null)

export type SuffixChildren = React.ReactNode

export type SuffixProps = {
  className: string
  children: SuffixChildren
  context: Record<string, unknown>
}

const Suffix = ({
  className,
  children,
  context,
  ...props
}: SuffixProps & React.HTMLAttributes<HTMLSpanElement>) => {
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
