import { useCallback } from 'react'
import type {
  ComponentType,
  KeyboardEvent,
  MouseEventHandler,
  Ref,
} from 'react'
import type { CardProps } from './CardInner'
import Card from './CardInner'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'

export type CardActionProps = Omit<CardProps, 'onClick' | 'element'> & {
  /**
   * The URL to navigate to. When set, renders an anchor element.
   */
  href?: string

  /**
   * Route path for use with a router Link component (e.g. react-router). Pass a custom `element` that accepts `to`.
   */
  to?: string

  /**
   * The anchor target attribute.
   */
  target?: string

  /**
   * The anchor rel attribute.
   */
  rel?: string

  /**
   * Click handler. When used without `href`/`to`, renders a button-like wrapper with keyboard support (Enter/Space).
   */
  onClick?: MouseEventHandler<HTMLElement>

  /**
   * Custom element to render as the wrapper. Defaults to `a` when `href`/`to` is set.
   * Use this for router Link components.
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  element?: 'a' | ComponentType<any>

  /**
   * Ref forwarded to the wrapper element.
   */
  ref?: Ref<HTMLElement>
}

function CardAction(props: CardActionProps) {
  const {
    href,
    to,
    target,
    rel: relProp,
    onClick,
    element,
    ref,
    children,
    ...cardProps
  } = props

  const isLink = Boolean(href || to)

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLElement>) => {
      if (onClick && (event.key === 'Enter' || event.key === ' ')) {
        event.preventDefault()
        onClick(event as unknown as React.MouseEvent<HTMLElement>)
      }
    },
    [onClick]
  )

  // Security: prevent reverse tabnabbing for external links
  const rel =
    target === '_blank' && !relProp ? 'noopener noreferrer' : relProp

  const card = <Card {...cardProps}>{children}</Card>

  if (isLink) {
    const AnchorElement = element || 'a'

    if (AnchorElement !== 'a') {
      return (
        <AnchorElement
          className="dnb-card-action"
          ref={ref}
          onClick={onClick}
          target={target}
          rel={rel}
          to={(to || href) as string}
        >
          {card}
        </AnchorElement>
      )
    }

    return (
      <a
        className="dnb-card-action"
        ref={ref as Ref<HTMLAnchorElement>}
        onClick={onClick}
        target={target}
        rel={rel}
        href={href || to}
      >
        {card}
      </a>
    )
  }

  return (
    <div
      className="dnb-card-action"
      ref={ref as Ref<HTMLDivElement>}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
    >
      {card}
    </div>
  )
}

withComponentMarkers(CardAction, { _supportsSpacingProps: true })

export default CardAction
