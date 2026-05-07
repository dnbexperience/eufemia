/**
 * Anchor Tag
 *
 */

import type { AnchorHTMLAttributes, DetailedHTMLProps, Ref } from 'react'
import { Anchor as EufemiaAnchor } from '@dnb/eufemia/src'
import type { AnchorAllProps as Props } from '@dnb/eufemia/src/components/Anchor'
import { Link as RouterLink, type LinkProps } from 'react-router-dom'

export type AnchorProps = Props &
  DetailedHTMLProps<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  >

function PortalLink({ href, onClick = null, ref, ...props }: AnchorProps) {
  return (
    <RouterLink
      to={href}
      ref={ref as Ref<HTMLAnchorElement>}
      {...(props as Omit<LinkProps, 'ref' | 'onClick' | 'to'>)}
      onClick={onClick}
    />
  )
}

export { PortalLink as Link }

export default function Anchor({ href, to = null, ...rest }: AnchorProps) {
  if (to) {
    href = to
  }

  if (href?.startsWith('!')) {
    href = href.substring(1)
  }

  const isAbsoluteUrl = href?.startsWith('http')
  const isHash = href?.startsWith('#')

  if (isAbsoluteUrl) {
    rest.target = '_blank'
    rest.rel = 'noreferrer'
  } else if (!/^(\/|#)/.test(href)) {
    href = `/${href}`
  }

  const element = (
    isAbsoluteUrl || isHash ? 'a' : PortalLink
  ) as Props['element']

  return <EufemiaAnchor href={href} element={element} {...rest} />
}
