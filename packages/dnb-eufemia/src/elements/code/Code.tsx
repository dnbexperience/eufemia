/**
 * HTML Element
 *
 */

import React, { useContext } from 'react'
import clsx from 'clsx'
import type { SpacingProps } from '../../shared/types'
import Context from '../../shared/Context'
import E from '../Element'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'

type CodeProps = SpacingProps & React.HTMLAttributes<HTMLElement>

function Code({
  className,
  ref,
  ...props
}: CodeProps & { ref?: React.Ref<HTMLElement> }) {
  const context = useContext(Context)

  return (
    <E
      as="code"
      ref={ref}
      className={clsx(
        context?.theme?.surface === 'dark' && 'dnb-code--surface-dark',
        className
      )}
      {...props}
    />
  )
}

withComponentMarkers(Code, { _supportsSpacingProps: true })

export default Code
