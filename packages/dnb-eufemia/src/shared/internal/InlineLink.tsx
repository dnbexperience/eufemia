import type { AnchorHTMLAttributes } from 'react'
import { isDangerousHref } from '../helpers/isDangerousHref'

type InlineLinkProps = AnchorHTMLAttributes<HTMLAnchorElement>

export default function InlineLink({
  className,
  children,
  href,
  ...rest
}: InlineLinkProps) {
  const hasNode = typeof children !== 'string'
  const classes = [
    'dnb-anchor',
    hasNode ? 'dnb-anchor--was-node' : null,
    'dnb-a',
    className,
  ]
    .filter(Boolean)
    .join(' ')

  return (
    <a
      className={classes}
      href={isDangerousHref(href) ? undefined : href}
      {...rest}
    >
      {children}
    </a>
  )
}
