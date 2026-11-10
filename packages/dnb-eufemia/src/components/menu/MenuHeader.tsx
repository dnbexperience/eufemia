import { clsx } from 'clsx'
import Span from '../../elements/Span'
import type { MenuHeaderProps } from './types'

export default function MenuHeader(props: MenuHeaderProps) {
  const { className, children, text, ...rest } = props

  return (
    <li
      className={clsx('dnb-menu__header', className)}
      role="presentation"
      {...rest}
    >
      <Span
        className="dnb-menu__header__text"
        size="small"
        weight="medium"
      >
        {text ?? children}
      </Span>
    </li>
  )
}
