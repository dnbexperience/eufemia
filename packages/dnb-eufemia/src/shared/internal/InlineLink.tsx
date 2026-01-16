import React from 'react'
type InlineLinkProps = React.AnchorHTMLAttributes<HTMLAnchorElement>

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
