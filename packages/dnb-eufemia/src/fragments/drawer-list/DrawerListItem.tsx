import React, { forwardRef } from 'react'
import classnames from 'classnames'

export type DrawerListItemProps = React.HTMLProps<HTMLLIElement> & {
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
    'aria-selected': active,
    'aria-disabled': disabled,
  }
  if (selected) {
    params['aria-current'] = true // has best support on NVDA
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
      <span className="dnb-drawer-list__option__inner">
        <ItemContent hash={hash}>{children}</ItemContent>
      </span>
    </li>
  )
})

export type ItemContentChildren = React.ReactNode | Record<string, unknown>
export interface ItemContentProps {
  hash?: string
  children?: ItemContentChildren
}

export function ItemContent({ hash = '', children = undefined }) {
  let content = null

  if (Array.isArray(children.content || children)) {
    content = (children.content || children).map((item, n) => (
      <DrawerListOptionItem
        key={hash + n}
        className={`item-nr-${n + 1}`} // "item-nr" is used by CSS
      >
        {children.render ? children.render(item, hash + n) : item}
      </DrawerListOptionItem>
    ))
  } else if (Object.prototype.hasOwnProperty.call(children, 'content')) {
    content = children.render
      ? children.render(children.content, hash, children)
      : children.content
    if (content) {
      content = <DrawerListOptionItem>{content}</DrawerListOptionItem>
    }
  } else {
    content = children && (
      <DrawerListOptionItem>{children}</DrawerListOptionItem>
    )
  }

  return Object.prototype.hasOwnProperty.call(children, 'suffix_value') ? (
    <>
      {content}

      <DrawerListOptionItem className="dnb-drawer-list__option__suffix">
        {children.suffix_value}
      </DrawerListOptionItem>
    </>
  ) : (
    content
  )
}

function DrawerListOptionItem({
  children = undefined,
  className = null,
  ...props
}) {
  return (
    <span
      className={classnames(['dnb-drawer-list__option__item', className])}
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
        'dnb-drawer-list__option__item--horizontal',
        className,
      ])}
      {...props}
    />
  )
}
