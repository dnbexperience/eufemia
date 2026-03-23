import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react'
import classnames from 'classnames'
import useId from '../../shared/helpers/useId'
import { ListVariant, ListContext } from './ListContext'
import ItemContent, { ItemContentProps } from './ItemContent'
import FlexItem from '../flex/Item'
import type { IconIcon } from '../icon/Icon'
import HeightAnimation from '../height-animation/HeightAnimation'
import Hr from '../../elements/Hr'
import { ChevronIcon } from './ItemAction'
import Space from '../space/Space'
import { omitSpacingProps, pickSpacingProps } from '../flex/utils'
import ItemIcon from './ItemIcon'
import ItemTitle from './ItemTitle'
import { createSkeletonClass } from '../skeleton/SkeletonHelper'
import { warn } from '../../shared/component-helper'
import Context from '../../shared/Context'

export type ItemAccordionIconPosition = 'left' | 'right'

export type ItemAccordionProps = {
  variant?: ListVariant
  open?: boolean
  /**
   * When true, keeps the accordion content in the DOM when closed. Defaults to false.
   */
  keepInDOM?: boolean
  /**
   * When true, the accordion is visually dimmed and interaction is prevented.
   */
  disabled?: boolean
  chevronPosition?: ItemAccordionIconPosition
  icon?: IconIcon
  title?: React.ReactNode
  id?: string
} & Omit<ItemContentProps, 'title'>

const ItemAccordionContext = createContext<{
  openState: boolean
  pending?: boolean
  disabled?: boolean
  keepInDOM?: boolean
  chevronPosition?: ItemAccordionIconPosition
  accordionId: string
  icon?: IconIcon
  title?: React.ReactNode
  setOpen: React.Dispatch<React.SetStateAction<boolean>>
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
}>(undefined)

function ItemAccordion(props: ItemAccordionProps) {
  const {
    className,
    onClick,
    children,
    variant,
    pending,
    disabled,
    skeleton,
    open = false,
    keepInDOM = false,
    chevronPosition = 'right',
    icon,
    title,
    id: idProp,
    ...rest
  } = props

  const [openState, setOpen] = useState(open)
  const accordionId = useId(idProp)
  const inheritedDisabled = useContext(ListContext)?.disabled
  const appliedDisabled = disabled ?? inheritedDisabled
  const childArray = React.Children.toArray(children)
  const hasExplicitHeader = childArray.some(
    (child) =>
      React.isValidElement(child) && child.type === AccordionHeader
  )

  useEffect(() => {
    setOpen(open)
  }, [open])

  return (
    <ItemAccordionContext.Provider
      value={{
        openState,
        pending,
        disabled: appliedDisabled,
        keepInDOM,
        chevronPosition,
        accordionId,
        icon,
        title,
        setOpen,
        onClick,
      }}
    >
      <ItemContent
        className={classnames(
          'dnb-list__item__accordion',
          openState && 'dnb-list__item__accordion--open',
          className
        )}
        direction="vertical"
        pending={pending}
        disabled={appliedDisabled}
        skeleton={skeleton}
        variant={variant}
        {...rest}
      >
        {!hasExplicitHeader ? <AccordionHeader /> : null}
        {children}
      </ItemContent>
    </ItemAccordionContext.Provider>
  )
}
ItemAccordion._supportsSpacingProps = true

export type AccordionHeaderProps = {
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
} & ItemContentProps

function AccordionHeader(props: AccordionHeaderProps) {
  const { className, children, ...rest } = props
  const accordionContext = useContext(ItemAccordionContext)
  const context = useContext(Context)
  const inheritedSkeleton = useContext(ListContext)?.skeleton

  const isInactive =
    accordionContext?.pending || accordionContext?.disabled

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (!isInactive && accordionContext) {
        accordionContext.setOpen((prev) => !prev)
        accordionContext.onClick && accordionContext.onClick(event)
      }
    },
    [accordionContext, isInactive]
  )

  const handleKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLDivElement>) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault()
        handleClick(
          event as unknown as React.MouseEvent<HTMLDivElement, MouseEvent>
        )
      }
    },
    [handleClick]
  )

  if (!accordionContext) {
    warn(
      'List.Item.Accordion.Header should be used inside List.Item.Accordion.'
    )
    return null
  }

  const { chevronPosition, accordionId, openState, icon, title } =
    accordionContext

  const content = (
    <FlexItem
      className={classnames(
        'dnb-list__item__accordion__header',
        chevronPosition === 'left' && 'dnb-list__item--chevron-left',
        inheritedSkeleton && createSkeletonClass('font', true),
        className
      )}
      id={`${accordionId}-header`}
      role="button"
      aria-controls={`${accordionId}-content`}
      aria-expanded={openState}
      aria-disabled={isInactive ? true : undefined}
      tabIndex={isInactive ? -1 : 0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      {...rest}
    >
      {chevronPosition === 'left' && <ChevronIcon />}
      {icon && <ItemIcon>{icon}</ItemIcon>}
      {title !== undefined && <ItemTitle>{title}</ItemTitle>}
      {children}
      {chevronPosition === 'right' && <ChevronIcon />}
    </FlexItem>
  )

  if (inheritedSkeleton) {
    return (
      <Context.Provider
        value={{ ...context, skeleton: inheritedSkeleton }}
      >
        {content}
      </Context.Provider>
    )
  }

  return content
}
ItemAccordion.Header = AccordionHeader
AccordionHeader._supportsSpacingProps = true

function AccordionContent(props: ItemContentProps) {
  const { className, children, ...rest } = props
  const context = useContext(Context)
  const accordionContext = useContext(ItemAccordionContext)
  const inheritedSkeleton = useContext(ListContext)?.skeleton

  if (!accordionContext) {
    warn(
      'List.Item.Accordion.Content should be used inside List.Item.Accordion.'
    )
    return null
  }

  const { openState, accordionId, keepInDOM } = accordionContext

  const spacingProps = pickSpacingProps(rest)

  const content = (
    <FlexItem
      className={classnames(
        'dnb-list__item__accordion__content',
        inheritedSkeleton && createSkeletonClass('font', true),
        className
      )}
      id={`${accordionId}-content`}
      aria-labelledby={`${accordionId}-header`}
      aria-hidden={!openState}
      aria-expanded={openState}
      {...omitSpacingProps(rest)}
    >
      <HeightAnimation open={openState} keepInDOM={keepInDOM}>
        <Hr bottom={false} />
        <Space {...spacingProps}>{children}</Space>
      </HeightAnimation>
    </FlexItem>
  )

  if (inheritedSkeleton) {
    return (
      <Context.Provider
        value={{ ...context, skeleton: inheritedSkeleton }}
      >
        {content}
      </Context.Provider>
    )
  }

  return content
}
ItemAccordion.Content = AccordionContent
AccordionContent._supportsSpacingProps = true

export default ItemAccordion
