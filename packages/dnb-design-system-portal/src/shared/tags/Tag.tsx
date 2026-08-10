/**
 * Custom Tag
 *
 */

import type { ReactNode } from 'react'
import { clsx } from 'clsx'
import type { DynamicElement } from '@dnb/eufemia/src/shared/types'

type Props = {
  as: DynamicElement
  className?: string
  children: ReactNode
}

const Tag = ({ children, className, as: Component, ...rest }: Props) => {
  if (children === null && !/hr/.test(String(Component))) return <></>
  return (
    <Component className={clsx(`dnb-${Component}`, className)} {...rest}>
      {children}
    </Component>
  )
}

export default Tag
