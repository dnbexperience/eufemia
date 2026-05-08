import type { AnchorHTMLAttributes } from 'react'
type InlineLinkProps = AnchorHTMLAttributes<HTMLAnchorElement>

export default function InlineLink({
  className,
  children,
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
    <a className={classes} {...rest}>
      {children}
    </a>
  )
}
