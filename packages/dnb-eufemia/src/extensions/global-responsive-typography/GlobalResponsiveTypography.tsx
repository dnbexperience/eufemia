/**
 * GlobalResponsiveTypography Component
 *
 */

import type { HTMLAttributes } from 'react'

import { clsx } from 'clsx'
import { Typography, Div } from '../../elements'

type GlobalResponsiveTypography = HTMLAttributes<HTMLDivElement> & {
  off?: boolean
}

const GlobalResponsiveTypography = ({
  off,
  className,
  children,
  ...rest
}: GlobalResponsiveTypography) => {
  return (
    <Div
      className={clsx(
        className,
        'dnb-global-responsive-typography',
        off
          ? 'dnb-global-responsive-typography__responsive-all-off'
          : 'dnb-global-responsive-typography__responsive-all-on'
      )}
      {...rest}
    >
      <Typography.Context responsive={!off}>{children}</Typography.Context>
    </Div>
  )
}

export default GlobalResponsiveTypography
