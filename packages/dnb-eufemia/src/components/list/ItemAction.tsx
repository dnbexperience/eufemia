import { clsx } from 'clsx'
import type { ListVariant } from './ListContext'
import { ListContext } from './ListContext'
import type { ItemContentProps } from './ItemContent'
import ItemContent from './ItemContent'
import { useCallback, useContext, useRef } from 'react'
import type {
  ComponentPropsWithoutRef,
  ElementType,
  KeyboardEvent,
  MouseEvent as ReactMouseEvent,
  ReactNode,
} from 'react'
import IconPrimary from '../IconPrimary'
import Icon from '../icon/Icon'
import Anchor from '../Anchor'
import ItemIcon from './ItemIcon'
import ItemTitle from './ItemTitle'
import type { IconIcon } from '../icon/Icon'
import { chevron_down, chevron_up } from '../../icons'
import FlexItem from '../flex/Item'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'
import Context from '../../shared/Context'

export type ItemActionIconPosition = 'left' | 'right'

export type ItemActionProps<E extends ElementType = 'a'> = {
  id?: string
  variant?: ListVariant
  selected?: boolean
  disabled?: boolean
  chevronPosition?: ItemActionIconPosition
  icon?: IconIcon
  title?: ReactNode
  /**
   * Use `List.Cell.Footer` to place secondary actions outside the primary button or link, within the same list item and border. Clicking or using the keyboard in the footer does not activate the primary action. Eufemia buttons and links inherit the item's disabled state. Footer controls remain available while pending; manage their loading and disabled states individually.
   */
  footer?: ReactNode
  href?: string
  to?: string
  element?: E
  elementProps?: Omit<
    ComponentPropsWithoutRef<E>,
    | 'href'
    | 'to'
    | 'target'
    | 'rel'
    | 'children'
    | 'tabIndex'
    | 'aria-disabled'
  >
  target?: string
  rel?: string
} & Omit<ItemContentProps, 'title' | 'element'>

function ItemAction<E extends ElementType = 'a'>(
  props: ItemActionProps<E>
) {
  const {
    className,
    onClick,
    onKeyDown,
    children,
    footer,
    variant,
    selected,
    pending,
    disabled,
    skeleton,
    chevronPosition = 'right',
    icon,
    title,
    href,
    to,
    element,
    elementProps,
    target,
    rel,
    role: _role,
    ...rest
  } = props

  const inheritedDisabled = useContext(ListContext)?.disabled
  const appliedDisabled = disabled ?? inheritedDisabled
  const isInactive = pending || appliedDisabled
  const hasFooter =
    footer !== undefined && footer !== null && footer !== false

  const handleClick = useCallback(
    (
      event: ReactMouseEvent<
        HTMLDivElement | HTMLAnchorElement,
        MouseEvent
      >
    ) => {
      if (!isInactive) {
        onClick && onClick(event as ReactMouseEvent<HTMLDivElement>)
      }
    },
    [onClick, isInactive]
  )

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLElement>) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        handleClick(
          event as unknown as ReactMouseEvent<
            HTMLDivElement | HTMLAnchorElement,
            MouseEvent
          >
        )
      }
    },
    [handleClick]
  )

  const anchorRef = useRef<HTMLAnchorElement>(null)

  const handleLinkClick = useCallback(
    (event: ReactMouseEvent<HTMLAnchorElement | HTMLDivElement>) => {
      if (!isInactive) {
        onClick?.(event as ReactMouseEvent<HTMLDivElement>)
      }
    },
    [onClick, isInactive]
  )

  const handleLinkKeyDown = useCallback(
    (event: KeyboardEvent<HTMLElement>) => {
      onKeyDown?.(event as KeyboardEvent<HTMLDivElement>)

      if (event.key === ' ') {
        event.preventDefault()
        if (!isInactive) {
          anchorRef.current?.click()
        }
      }
    },
    [onKeyDown, isInactive]
  )

  const actionClassName = clsx(
    'dnb-list__item__action',
    hasFooter && 'dnb-list__item__action--with-footer',
    chevronPosition === 'left' && 'dnb-list__item--chevron-left',
    (href || to) && 'dnb-list__item__action--href',
    className
  )

  const content = (
    <>
      {chevronPosition === 'left' && <ChevronIcon />}
      {icon !== undefined && <ItemIcon>{icon}</ItemIcon>}
      {title !== undefined && <ItemTitle>{title}</ItemTitle>}
      {children}
      {chevronPosition === 'right' && <ChevronIcon />}
    </>
  )
  const footerContent = hasFooter && (
    <FlexItem className="dnb-list__item__action__footer">
      <ActionFooter disabled={appliedDisabled}>{footer}</ActionFooter>
    </FlexItem>
  )

  if (href || to) {
    return (
      <ItemContent
        className={actionClassName}
        onClick={hasFooter ? undefined : handleLinkClick}
        onKeyDown={hasFooter ? undefined : handleLinkKeyDown}
        variant={variant}
        selected={selected}
        skeleton={skeleton}
        pending={pending}
        disabled={appliedDisabled}
        {...rest}
      >
        <Anchor
          noStyle
          {...(href != null
            ? { href: isInactive ? undefined : href }
            : {})}
          to={isInactive ? undefined : to}
          element={element}
          target={target}
          rel={rel}
          tabIndex={isInactive ? -1 : 0}
          aria-disabled={isInactive ? true : undefined}
          {...elementProps}
          {...(hasFooter && {
            onClick: (event: ReactMouseEvent<HTMLAnchorElement>) => {
              elementProps?.onClick?.(event)
              handleLinkClick(event)
            },
            onKeyDown: (event: KeyboardEvent<HTMLAnchorElement>) => {
              elementProps?.onKeyDown?.(event)
              handleLinkKeyDown(event)
            },
          })}
          ref={anchorRef}
        >
          {content}
        </Anchor>
        {footerContent}
      </ItemContent>
    )
  }

  return (
    <ItemContent
      className={actionClassName}
      onClick={hasFooter ? undefined : handleClick}
      onKeyDown={hasFooter ? undefined : onKeyDown}
      variant={variant}
      selected={selected}
      skeleton={skeleton}
      pending={pending}
      disabled={appliedDisabled}
      {...rest}
    >
      <FlexItem
        className="dnb-list__item__action__button"
        role="button"
        tabIndex={isInactive ? -1 : 0}
        aria-disabled={isInactive ? true : undefined}
        onClick={hasFooter ? handleClick : undefined}
        onKeyDown={(event) => {
          handleKeyDown(event)
          if (hasFooter) {
            onKeyDown?.(event as KeyboardEvent<HTMLDivElement>)
          }
        }}
      >
        {content}
      </FlexItem>
      {footerContent}
    </ItemContent>
  )
}
withComponentMarkers(ChevronIcon, { _supportsSpacingProps: true })

// To pretend that this component supports spacing props, so it doesn't get wrapped by Flex
withComponentMarkers(ItemAction, {
  _supportsSpacingProps: true,
})

const listChevronIcon = Icon.transition({
  collapsed: chevron_down,
  expanded: chevron_up,
})

export default ItemAction

function ActionFooter({
  disabled,
  children,
}: {
  disabled?: boolean
  children: ReactNode
}) {
  const context = useContext(Context)

  return (
    <Context
      value={
        disabled
          ? {
              ...context,
              Button: { ...context.Button, disabled: true },
              Anchor: { ...context.Anchor, disabled: true },
            }
          : context
      }
    >
      {children}
    </Context>
  )
}

export function ChevronIcon({ expanded }: { expanded?: boolean }) {
  const isAccordion = expanded !== undefined

  return (
    <div className="dnb-list__item__chevron">
      <IconPrimary
        icon={isAccordion ? listChevronIcon : 'chevron_right'}
        transitionState={
          isAccordion ? (expanded ? 'expanded' : 'collapsed') : undefined
        }
      />
    </div>
  )
}
