/**
 * Web List Component
 */

import {
  Fragment,
  isValidElement,
  memo,
  useCallback,
  useContext,
} from 'react'
import type { KeyboardEvent, MouseEvent, Ref } from 'react'
import useMountEffect from '../../shared/helpers/useMountEffect'
import { clsx } from 'clsx'
import {
  validateDOMAttributes,
  removeUndefinedProps,
  warn,
} from '../../shared/component-helper'
import type { Translation } from '../../shared/Context'

import { useSpacing } from '../../components/space/SpacingUtils'

import E from '../../elements/Element'
import type { DrawerListContextValue } from './DrawerListContext'
import DrawerListContext from './DrawerListContext'
import DrawerListProvider from './DrawerListProvider'
import DrawerListPortal from './DrawerListPortal'
import { drawerListDefaultProps, getEventData } from './DrawerListHelpers'
import { DrawerListHorizontalItem, DrawerListItem } from './DrawerListItem'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'
import type {
  DrawerListAllProps,
  DrawerListData,
  DrawerListDriverRow,
  DrawerListDriverRowProps,
  DrawerListGroupTitles,
  DrawerListInternalData,
  DrawerListInternalItem,
  DrawerListOptionsProps,
  DrawerListProps,
  DrawerListRenderData,
} from './types'

export type * from './types'

const propsToFilterOut: Record<string, null> = {
  onOpen: null,
  onClose: null,
  handleDismissFocus: null,
  onChange: null,
  onPreChange: null,
  onResize: null,
  onSelect: null,
  onKeyDown: null,
  optionsRender: null,
  listDriver: null,
  wrapperElement: null,
  onItemMouseEnter: null,
}

// Internal data structures

function DrawerList(props: DrawerListAllProps) {
  const drawerListContext = useContext(DrawerListContext)

  if (drawerListContext?.drawerList) {
    return <DrawerListComponent {...props} />
  }

  const { data, children, ...rest } = props

  return (
    <DrawerListProvider
      {...rest}
      data={
        data ||
        (!isValidElement(children)
          ? (children as DrawerListData)
          : undefined)
      }
    >
      <DrawerListComponent {...props} />
    </DrawerListProvider>
  )
}
DrawerList.blurDelay = DrawerListProvider.blurDelay // some ms more than "DrawerListSlideDown 200ms"

const DrawerListComponent = memo(function DrawerListComponent(
  ownProps: DrawerListAllProps
) {
  const context = useContext(DrawerListContext)

  const propsWithDefaults = {
    ...drawerListDefaultProps,
    ...removeUndefinedProps({ ...ownProps }),
  }

  // Send along event handlers to the provider state on mount
  useMountEffect(() => {
    if (propsWithDefaults.listDriver && propsWithDefaults.optionsRender) {
      warn(
        'DrawerList: `listDriver` cannot be combined with `optionsRender`. The default list renderer will be used.'
      )
    }

    const eventHandlerState = Object.keys(propsToFilterOut).reduce<
      Record<string, unknown>
    >((acc, key) => {
      if (propsWithDefaults[key as keyof typeof propsWithDefaults]) {
        acc[key] = propsWithDefaults[key as keyof typeof propsWithDefaults]
      }
      return acc
    }, {})

    context.drawerList.setState(eventHandlerState)
  })

  const preventTab = useCallback(
    (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Tab':
          if (propsWithDefaults.inline) {
            return
          }

          if (!context.drawerList._hasFocusOnElementRef.current) {
            e.preventDefault()
            context.drawerList.setHidden()
          }
          break

        case 'PageDown':
        case 'PageUp':
          e.preventDefault()
          break
      }
    },
    [context.drawerList, propsWithDefaults.inline]
  )

  const selectItemHandler = useCallback(
    (params: { 'data-item'?: number; [key: string]: unknown }) => {
      const selectedItem = Number(params['data-item'])
      if (selectedItem > -1) {
        context.drawerList.selectItemAndClose(selectedItem, {
          fireSelectEvent: true,
          event: params,
        })
      }
    },
    [context.drawerList]
  )

  const onItemMouseEnterCallback = context.drawerList
    .onItemMouseEnter as DrawerListProps['onItemMouseEnter']

  const onItemMouseEnterHandler = useCallback(
    (itemId: number, event: MouseEvent<HTMLLIElement>) => {
      if (onItemMouseEnterCallback) {
        const data = getEventData(itemId, context.drawerList.data)
        onItemMouseEnterCallback({ item: itemId, data, event })
      }
    },
    [onItemMouseEnterCallback, context.drawerList.data]
  )

  const {
    role,
    alignDrawer,
    noDivider,
    fixedPosition,
    independentWidth,
    scrollable,
    focusable,
    size,
    noAnimation,
    noScrollAnimation,
    preventSelection,
    isPopup,
    inline,
    portalClass,
    listClass,
    ignoreEvents,
    optionsRender,
    listDriver,
    className,
    arrowPosition: _arrowPosition,
    cacheHash: _cacheHash,
    wrapperElement: _wrapperElement,
    direction: _direction,
    maxHeight: _maxHeight,
    id: _id,
    data: _data,
    open: _open,
    value: _value,
    keepOpen: _keepOpen,
    preventClose: _preventClose,
    skipKeysearch: _skipKeysearch,
    skipPortal: _skipPortal,
    enableBodyLock: _enableBodyLock,
    preventFocus: _preventFocus,
    pageOffset: _pageOffset,
    observerElement: _observerElement,
    children,

    onOpen: _onOpen,
    onClose: _onClose,
    handleDismissFocus: _handleDismissFocus,
    onChange: _onChange,
    onPreChange: _onPreChange,
    onResize: _onResize,
    onSelect: _onSelect,
    onKeyDown: _onKeyDown,
    onItemMouseEnter: _onItemMouseEnter,

    ...attributes
  } = propsWithDefaults as DrawerListAllProps & {
    onKeyDown?: (e: KeyboardEvent) => void
  }
  const activeListDriver = optionsRender ? undefined : listDriver

  function noNullNumbers({
    selectedItem,
    activeItem,
    maxHeight,
    ...rest
  }: DrawerListContextValue['drawerList']): DrawerListContextValue['drawerList'] {
    return {
      selectedItem: selectedItem ?? undefined,
      activeItem: activeItem ?? undefined,
      maxHeight: maxHeight ?? undefined,
      ...rest,
    }
  }

  const {
    id,
    data,
    groups,
    open,
    hidden,
    direction,
    maxHeight,
    cacheHash,
    selectedItem,
    activeItem,
    skipPortal,
    addObservers,
    removeObservers,
    _refShell,
    _refUl,
    _refRoot,
  } = noNullNumbers(context.drawerList)

  const renderData = makeRenderData(
    data,
    groups,
    context.getTranslation(propsWithDefaults).DrawerList
  )
  const hasGroups =
    renderData.length > 1 || renderData[0]?.groupTitle !== undefined

  const mainParams = useSpacing(propsWithDefaults, {
    id: `${id}-drawer-list`,
    className: clsx(
      'dnb-drawer-list',
      noDivider && 'dnb-drawer-list--no-divider',
      open && 'dnb-drawer-list--open',
      hidden && 'dnb-drawer-list--hidden',
      `dnb-drawer-list--${direction}`,
      alignDrawer && `dnb-drawer-list--${alignDrawer}`,
      size && `dnb-drawer-list--${size}`,
      isPopup && 'dnb-drawer-list--is-popup',
      inline && 'dnb-drawer-list--inline',
      independentWidth && 'dnb-drawer-list--independent-width',
      scrollable && 'dnb-drawer-list--scroll',
      noScrollAnimation && 'dnb-drawer-list--no-scroll-animation',
      className
    ),
    ...attributes,
  })

  const listParams = {
    id: `${id}-listbox`,
    className: clsx(
      'dnb-drawer-list__list',
      noAnimation && 'dnb-drawer-list__list--no-animation',
      listClass
    ),
  }

  const ulParams: Record<string, unknown> = {
    role,
    id: `${id}-ul`,
    'aria-expanded': open,
    'aria-labelledby': `${id}-label`,
    tabIndex: -1,
    style: {
      maxHeight:
        parseFloat(maxHeight as string) > 0 ? `${maxHeight}rem` : null,
    },
    ref: _refUl,
  }

  if (!hidden) {
    ulParams['aria-activedescendant'] =
      context.drawerList.ariaActiveDescendant
  }

  if (focusable) {
    ulParams.tabIndex = 0
  }

  // also used for code markup simulation
  validateDOMAttributes(ownProps, mainParams)
  validateDOMAttributes(null, listParams)
  validateDOMAttributes(null, ulParams)

  Object.assign(
    context.drawerList.attributes,
    validateDOMAttributes(null, attributes)
  )

  const ignoreEventsBoolean = ignoreEvents

  const renderItem = (
    dataItem: DrawerListInternalItem,
    i: number,
    j: number,
    data: DrawerListInternalData,
    itemProps: DrawerListDriverRowProps = {}
  ) => {
    const { __id, ignoreEvents, className, disabled, style } = dataItem
    const hash = `option-${id}-${__id}-${i}`
    const tagId = `option-${id}-${__id}`
    const liParams = {
      ...itemProps,
      role: role === 'menu' ? 'menuitem' : 'option',
      'data-item': __id,
      id: tagId,
      hash,
      className: clsx(
        j === 0 && i === 0 && 'first-item',
        j === renderData.length - 1 &&
          i === data.length - 1 &&
          'last-item',
        i === 0 && 'first-of-type',
        i === data.length - 1 && 'last-of-type',
        (ignoreEventsBoolean || ignoreEvents) && 'ignore-events',
        className,
        itemProps.className
      ),
      active: __id === activeItem,
      selected: !ignoreEvents && __id === selectedItem,
      onClick: selectItemHandler,
      onKeyDown: preventTab,
      onMouseEnter: onItemMouseEnterHandler
        ? (e: MouseEvent<HTMLLIElement>) =>
            onItemMouseEnterHandler(__id, e)
        : undefined,
      disabled,
      style: { ...style, ...itemProps.style },
    }
    if (ignoreEventsBoolean) {
      liParams.active = null
      liParams.selected = null
      liParams.onClick = null
      liParams.onKeyDown = null
      liParams.onMouseEnter = null
      liParams.className = clsx(
        liParams.className,
        'dnb-drawer-list__option--ignore'
      )
    }

    return (
      <DrawerList.Item key={hash} {...liParams}>
        {dataItem}
      </DrawerList.Item>
    )
  }

  const groupItems = renderData
    .filter(Boolean) // filter out empty groups
    .map(({ groupTitle, groupData: data, hideTitle }, j) => {
      const Items = () =>
        data.map((dataItem, i) => renderItem(dataItem, i, j, data))
      const itemsRendered =
        typeof optionsRender === 'function'
          ? optionsRender({ data, Items, Item: DrawerList.Item })
          : data.map((dataItem, i) => renderItem(dataItem, i, j, data))
      if (hasGroups) {
        const groupdId = `${id}-group-title-${j}`
        return (
          <ul
            key={j}
            role="group"
            aria-labelledby={groupdId}
            className={clsx(
              'dnb-drawer-list__group',
              j === 0 && 'first-of-type',
              j === renderData.length - 1 && 'last-of-type'
            )}
          >
            <li
              id={groupdId}
              role="presentation"
              className={clsx(
                'dnb-drawer-list__group-title',
                hideTitle && 'dnb-sr-only'
              )}
            >
              {groupTitle}
            </li>
            {itemsRendered}
          </ul>
        )
      }
      return <Fragment key={j}>{itemsRendered}</Fragment>
    })

  let optionPosition = 0
  const driverRows: DrawerListDriverRow[] = activeListDriver
    ? renderData.filter(Boolean).flatMap((group, j) => {
        const groupId = `${id}-group-title-${j}`
        const groupRows: DrawerListDriverRow[] = []

        if (hasGroups) {
          groupRows.push({
            key: groupId,
            type: 'group',
            render: (props = {}) => (
              <li
                {...props}
                id={groupId}
                role="presentation"
                className={clsx(
                  'dnb-drawer-list__group-title',
                  group.hideTitle && 'dnb-sr-only',
                  props.className
                )}
              >
                {group.groupTitle}
              </li>
            ),
          })
        }

        group.groupData.forEach((dataItem, i) => {
          optionPosition += 1
          const ariaPosition = optionPosition
          groupRows.push({
            key: `option-${id}-${dataItem.__id}`,
            type: 'option',
            itemId: dataItem.__id,
            keepMounted: Boolean(dataItem.showAll),
            render: (props = {}) =>
              renderItem(dataItem, i, j, group.groupData, {
                ...props,
                'aria-describedby': hasGroups ? groupId : undefined,
                'aria-posinset': ariaPosition,
                'aria-setsize': data.length,
              }),
          })
        })

        return groupRows
      })
    : []
  const activeIndex = driverRows.findIndex(
    ({ itemId }) => itemId === activeItem
  )
  const selectedIndex = driverRows.findIndex(
    ({ itemId }) => itemId === selectedItem
  )

  const mainList = (
    <span {...mainParams} ref={_refShell}>
      <span {...listParams}>
        {hidden === false && renderData.length > 0 ? (
          <>
            <DrawerList.Options
              cacheHash={
                cacheHash +
                activeItem +
                selectedItem +
                direction +
                maxHeight
              }
              {...ulParams}
              renderDriver={activeListDriver}
              hasGroups={activeListDriver ? false : hasGroups}
            >
              {activeListDriver ? (
                <activeListDriver.Renderer
                  rows={driverRows}
                  activeIndex={activeIndex}
                  selectedIndex={selectedIndex}
                  open={Boolean(open)}
                  listRef={_refUl}
                  registerListDriver={
                    context.drawerList.registerListDriver
                  }
                />
              ) : (
                groupItems
              )}
            </DrawerList.Options>
            <OnMounted
              addObservers={addObservers}
              removeObservers={removeObservers}
            />
          </>
        ) : (
          isValidElement(children) && (
            <span className="dnb-drawer-list__content">{children}</span>
          )
        )}
      </span>
    </span>
  )

  return (
    <span
      className={clsx(
        'dnb-drawer-list__root',
        !skipPortal && 'dnb-drawer-list__root--portal'
      )}
      ref={_refRoot}
    >
      <DrawerListPortal
        id={id}
        rootRef={_refRoot}
        open={hidden === false}
        includeOwnerWidth={alignDrawer === 'right'}
        independentWidth={independentWidth}
        fixedPosition={fixedPosition}
        skipPortal={skipPortal}
        className={portalClass}
      >
        {mainList}
      </DrawerListPortal>
    </span>
  )
})

function makeRenderData(
  data: DrawerListInternalData,
  groups?: DrawerListGroupTitles,
  translation?: Translation['DrawerList']
): DrawerListRenderData {
  const renderData: DrawerListRenderData = []
  const noIndex = []

  if (Array.isArray(data) && data.length > 0) {
    data.forEach((dataItem) => {
      const index = dataItem.groupIndex ?? undefined

      if (index >= 0) {
        if (!renderData[index]) {
          let groupTitle = groups?.[index]
          let hideTitle = false

          if (!groupTitle) {
            if (index === 0) {
              groupTitle = translation.defaultGroupSR
              hideTitle = true
            } else {
              warn(`Missing group title for groupIndex: ${index}`)
              groupTitle = `${translation.missingGroup} ${index + 1}`
            }
          }

          renderData[index] = {
            groupTitle,
            hideTitle,
            groupData: [],
          }
        }
        renderData[index].groupData.push(dataItem)
      } else {
        noIndex.push(dataItem)
      }
    })
  }

  if (noIndex.length > 0) {
    renderData.push({
      groupTitle:
        renderData.length > 0 ? translation.noGroupSR : undefined,
      hideTitle: true,
      groupData: noIndex,
    })
  }

  return renderData
}

// DrawerList List
DrawerList.Options = memo(
  ({
    children,
    className,
    cacheHash,
    hasGroups = false,
    renderDriver: _renderDriver,
    ref,
    ...rest
  }: DrawerListOptionsProps & {
    ref?: Ref<HTMLUListElement | HTMLSpanElement>
  }) => {
    return (
      <E
        internalClass={false}
        as={hasGroups ? 'span' : 'ul'}
        className={clsx('dnb-drawer-list__options', className)}
        {...rest}
        ref={ref}
      >
        {children}
      </E>
    )
  },
  (prevProps, nextProps) => {
    if (!prevProps.cacheHash) {
      return false
    }
    return (
      prevProps.cacheHash === nextProps.cacheHash &&
      prevProps.renderDriver === nextProps.renderDriver
    )
  }
)

DrawerList.Item = DrawerListItem
DrawerList.HorizontalItem = DrawerListHorizontalItem

withComponentMarkers(DrawerList, {
  _supportsSpacingProps: true,
})

function OnMounted({
  addObservers,
  removeObservers,
}: {
  addObservers: () => void
  removeObservers: () => void
}) {
  useMountEffect(() => {
    addObservers()
    return () => {
      removeObservers()
    }
  })

  return null
}

export default DrawerList
