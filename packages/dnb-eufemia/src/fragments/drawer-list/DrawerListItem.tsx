import React, { forwardRef } from 'react'
import classnames from 'classnames'
import { DrawerListDataArrayObject } from './DrawerList'

export type DrawerListItemProps = Omit<
  React.HTMLProps<HTMLLIElement>,
  'children'
> & {
  children: ItemContentChildren
  active?: boolean
  hash?: string
  selected?: boolean
  /**
   * Define a preselected `data` entry. In order of priority, `value` can be set to: object key (if `data` is an object), `selectedKey` prop (if `data` is an array), array index (if no `selectedKey`) or content (if `value` is a non-integer string).
   */
  value?: string
  on_click?: ({
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
    role = 'option', // eslint-disable-line
    hash = '', // eslint-disable-line
    children, // eslint-disable-line
    className = null, // eslint-disable-line
    on_click = null, // eslint-disable-line
    selected, // eslint-disable-line
    active = null, // eslint-disable-line
    value = null, // eslint-disable-line
    disabled, // eslint-disable-line
    ...rest
  } = props

  const params = {
    className: classnames(
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
  }
  if (active) {
    params['aria-current'] = true
  }

  if (on_click && !rest.onClick) {
    rest.onClick = () =>
      on_click({
        selected,
        value,
        ...rest,
      })
  }

  return (
    <li {...params} {...rest} ref={ref} key={'li' + hash}>
      <span className="dnb-drawer-list__option-inner">
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
      {isDataObject && children.suffix_value && (
        <DrawerListOptionItem className="dnb-drawer-list__option-suffix">
          {children.suffix_value}
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
      className={classnames(['dnb-drawer-list__option-item', className])}
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
      className={classnames([
        'dnb-drawer-list__option-item--horizontal',
        className,
      ])}
      {...props}
    />
  )
}
