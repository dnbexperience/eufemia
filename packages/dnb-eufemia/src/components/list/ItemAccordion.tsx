import React, {
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react'
import classnames from 'classnames'
import useId from '../../shared/helpers/useId'
import { ListVariant } from './ListContext'
import ItemContent, { ItemContentProps } from './ItemContent'
import FlexItem from '../flex/Item'
import HeightAnimation from '../height-animation/HeightAnimation'
import Hr from '../../elements/Hr'
import { ChevronIcon } from './ItemNavigate'
import Space from '../space/Space'
import { omitSpacingProps, pickSpacingProps } from '../flex/utils'

export type ItemAccordionIconPosition = 'left' | 'right'

export type ItemAccordionProps = {
  variant?: ListVariant
  open?: boolean
  iconPosition?: ItemAccordionIconPosition
  id?: string
} & ItemContentProps

const ItemAccordionContext = createContext<{
  open?: boolean
  openState: boolean
  pending?: boolean
  iconPosition?: ItemAccordionIconPosition
  accordionId: string
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
    open = false,
    iconPosition = 'right',
    id: idProp,
    ...rest
  } = props

  const [openState, setOpen] = useState(open)
  const accordionId = useId(idProp)

  return (
    <ItemAccordionContext.Provider
      value={{
        open,
        openState,
        pending,
        iconPosition,
        accordionId,
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
        variant={variant}
        {...rest}
      >
        {children}
      </ItemContent>
    </ItemAccordionContext.Provider>
  )
}
ItemAccordion._supportsSpacingProps = true

export type AccordionHeaderProps = {
  open?: boolean
  onClick?: (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => void
} & ItemContentProps

function AccordionHeader(props: AccordionHeaderProps) {
  const { className, children, ...rest } = props
  const {
    setOpen,
    onClick,
    pending,
    iconPosition,
    accordionId,
    openState,
  } = useContext(ItemAccordionContext)
  const iconPos = iconPosition ?? 'right'

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      if (!pending) {
        setOpen((prev) => !prev)
        onClick && onClick(event)
      }
    },
    [onClick, pending, setOpen]
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

  return (
    <FlexItem
      className={classnames(
        'dnb-list__item__accordion__header',
        iconPos === 'left' &&
          'dnb-list__item__accordion__header--icon-left',
        className
      )}
      id={`${accordionId}-header`}
      role="button"
      aria-controls={`${accordionId}-content`}
      aria-expanded={openState}
      aria-disabled={pending ? true : undefined}
      tabIndex={pending ? -1 : 0}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      {...rest}
    >
      {iconPosition === 'left' && <ChevronIcon iconPosition="left" />}
      {children}
      {iconPosition === 'right' && <ChevronIcon iconPosition="right" />}
    </FlexItem>
  )
}
ItemAccordion.Header = AccordionHeader
AccordionHeader._supportsSpacingProps = true

function AccordionContent(props: ItemContentProps) {
  const { className, children, ...rest } = props
  const { openState, accordionId } = useContext(ItemAccordionContext)

  const spacingProps = pickSpacingProps(rest)

  return (
    <FlexItem
      className={classnames(
        'dnb-list__item__accordion__content',
        className
      )}
      id={`${accordionId}-content`}
      aria-labelledby={`${accordionId}-header`}
      aria-hidden={!openState}
      aria-expanded={openState}
      {...omitSpacingProps(rest)}
    >
      <HeightAnimation open={openState}>
        <Hr bottom={false} />
        <Space {...spacingProps}>{children}</Space>
      </HeightAnimation>
    </FlexItem>
  )
}
ItemAccordion.Content = AccordionContent
AccordionContent._supportsSpacingProps = true

export default ItemAccordion
