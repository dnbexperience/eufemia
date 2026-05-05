/**
 * HTML Element
 *
 */

import React, { useContext } from 'react'
import type { SpacingProps } from '../../shared/types'
import E from '../Element'
import clsx from 'clsx'
import Context from '../../shared/Context'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'

type HrProps = SpacingProps &
  React.HTMLAttributes<HTMLHRElement> & {
    /**
     * To make the hr full width.
     */
    breakout?: boolean

    /**
     * To make the hr dashed.
     */
    dashed?: boolean
  }

const Hr = ({ breakout, dashed, className, ...props }: HrProps = {}) => {
  const context = useContext(Context)

  return (
    <E
      as="hr"
      className={clsx(
        className,
        context?.theme?.surface === 'dark' && 'dnb-hr--surface-dark',
        dashed && 'dnb-hr--dashed',
        breakout && 'dnb-hr--breakout'
      )}
      {...props}
    />
  )
}

withComponentMarkers(Hr, { _supportsSpacingProps: true })

export default Hr
