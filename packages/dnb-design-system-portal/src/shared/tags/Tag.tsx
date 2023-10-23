/**
 * Custom Tag
 *
 */

import React from 'react'
import classnames from 'classnames'
import type { DynamicElement } from '@dnb/eufemia/src/shared/types'

type StyleObj = {
  [key: string]: string | number | null
}

type Props = {
  as: DynamicElement
  css?: StyleObj
  className?: string
  children: React.ReactNode
}

const Tag = ({ children, className, as: Component, ...rest }: Props) => {
  if (children === null && !/hr/.test(String(Component))) return <></>
  return (
    <Component
      className={classnames(`dnb-${Component}`, className)}
      {...rest}
    >
      {children}
    </Component>
  )
}

export default Tag
