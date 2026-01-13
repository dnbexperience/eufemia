import React, { forwardRef } from 'react'
import clsx from 'clsx'
import { DrawerListDataArrayObject } from './DrawerList'

export type DrawerListItemProps = Omit<
  React.HTMLProps<HTMLLIElement>,
  'children' | 'onClick'
> & {
  children: ItemContentChildren
  active?: boolean
  hash?: string
  selected?: boolean
  /**
   * Define a preselected `data` entry. In order of priority, `value` can be set to: object key (if `data` is an object), `selectedKey` prop (if `data` is an array), array index (if no `selectedKey`) or content (if `value` is a non-integer string).
   */
  value?: string
  onClick?: ({
    selected,
    value,
  }: {
    selected: boolean
    /**
     * Define a preselected `data` entry. In order of priority, `value` can be set to: object key (if `data` is an object), `selectedKey` prop (if `data` is an array), array index (if no `selectedKey`) or content (if `value` is a non-integer string).
     */
    value: string
  }) => void
}

export const DrawerListItem = forwardRef(function DrawerListItem(
  props: DrawerListItemProps,
  ref: React.ForwardedRef<HTMLLIElement>
) {
  const {
    onClick,
    role = 'option', // eslint-disable-line
    hash = '', // eslint-disable-line
    children, // eslint-disable-line
    className = null, // eslint-disable-line
    selected, // eslint-disable-line
    active = null, // eslint-disable-line
    value = null, // eslint-disable-line
    disabled, // eslint-disable-line
    ...rest
  } = props

  const params = {
    className: clsx(
      className,
      'dnb-drawer-list__option',
      selected && 'dnb-drawer-list__option--selected',
      active && 'dnb-drawer-list__option--focus'
    ),
    role,
    tabIndex: selected ? 0 : -1,
    disabled,
    'aria-selected': !!selected,
    'aria-disabled': disabled,
    onClick: () =>
      onClick({
        selected,
        value,
        ...rest,
      }),
  }

  if (active) {
    params['aria-current'] = true
  }

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
    <li
      {...params}
      {...rest}
      ref={ref}
      key={'li' + hash}
      onClick={() =>
        onClick({
          selected,
          value,
          ...rest,
        })
      }
    >
      <span className="dnb-drawer-list__option__inner">
        <ItemContent hash={hash}>{children}</ItemContent>
      </span>
    </li>
  )
})

export type ItemContentChildren =
  | React.ReactNode
  | DrawerListDataArrayObject

export interface ItemContentProps {
  hash?: string
  children?: ItemContentChildren
}

export function ItemContent({ hash = '', children }: ItemContentProps) {
  let renderedContent = undefined
  const isDataObject =
    typeof children === 'object' && 'content' in children

  const content = isDataObject ? children.content : children
  if (content) {
    if (Array.isArray(content)) {
      renderedContent = content.map((contentItem, n) => (
        <DrawerListOptionItem
          key={hash + n}
          className={`item-nr-${n + 1}`} // "item-nr" is used by CSS
        >
          {isDataObject && children.render
            ? children.render(contentItem, hash + n)
            : contentItem}
        </DrawerListOptionItem>
      ))
    } else {
      renderedContent = (
        <DrawerListOptionItem>
          {isDataObject && children.render
            ? children.render(content, hash)
            : content}
        </DrawerListOptionItem>
      )
    }
  }

  return (
    <>
      {renderedContent}
      {isDataObject && children.suffixValue && (
        <DrawerListOptionItem className="dnb-drawer-list__option__suffix">
          {children.suffixValue}
        </DrawerListOptionItem>
      )}
    </>
  )
}

function DrawerListOptionItem({
  children = undefined,
  className = null,
  ...props
}) {
  return (
    <span
      className={clsx(['dnb-drawer-list__option__item', className])}
      {...props}
    >
      {children}
    </span>
  )
}

export type DrawerListHorizontalItemProps = {
  children: React.ReactNode
} & Omit<React.HTMLProps<HTMLElement>, 'children'>

export function DrawerListHorizontalItem({
  className,
  ...props
}: DrawerListHorizontalItemProps) {
  return (
    <DrawerListOptionItem
      className={clsx([
        'dnb-drawer-list__option__item--horizontal',
        className,
      ])}
      {...props}
    />
  )
}
