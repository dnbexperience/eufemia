import React from 'react'
import clsx from 'clsx'
import type { MenuHeaderProps } from './types'

export default function MenuHeader(props: MenuHeaderProps) {
  const { className, children, text, ...rest } = props

  return (
    <li className={clsx('dnb-menu__header', className)} {...rest}>
      <span className="dnb-menu__header__text dnb-lead">
        {text ?? children}
      </span>
    </li>
  )
}
