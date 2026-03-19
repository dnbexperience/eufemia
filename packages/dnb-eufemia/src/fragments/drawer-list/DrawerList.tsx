/**
 * Web List Component
 */

import React, { useContext, useCallback } from 'react'
import useMountEffect from '../../shared/helpers/useMountEffect'
import clsx from 'clsx'
import {
  validateDOMAttributes,
  removeUndefinedProps,
  warn,
} from '../../shared/component-helper'
import type { SpacingProps } from '../../shared/types'
import type { Translation } from '../../shared/Context'

import { getThemeClasses } from '../../shared/Theme'
import { createSpacingClasses } from '../../components/space/SpacingHelper'

import E from '../../elements/Element'
import type { DrawerListContextValue } from './DrawerListContext'
import DrawerListContext from './DrawerListContext'
import DrawerListProvider from './DrawerListProvider'
import DrawerListPortal from './DrawerListPortal'
import { drawerListDefaultProps } from './DrawerListHelpers'
import { DrawerListHorizontalItem, DrawerListItem } from './DrawerListItem'
import type { DrawerListItemProps } from './DrawerListItem'
import withComponentMarkers from '../../shared/helpers/withComponentMarkers'

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
  wrapperElement: null,
}

export type DrawerListContent =
  | string
  | React.ReactNode
  | (string | React.ReactNode)[]

export type DrawerListDataArrayObjectStrict = {
  /** index of group supplied in the `groups` prop */
  groupIndex?: number
  selectedValue?: string | React.ReactNode
  selectedKey?: string | number
  suffixValue?: string | React.ReactNode
  content: DrawerListContent
  disabled?: boolean
  /** used by Autocomplete for additional search hits */
  searchContent?: string | React.ReactNode | string[]
  /** style prop of the html list item */
  style?: React.CSSProperties
  /** classname added to the html list item */
  className?: string
  /** set to true to disable mouse events selected style. Keyboard can still select. */
  ignoreEvents?: boolean
  /** internal use only */
  render?: (children: React.ReactNode, id: string) => React.ReactNode
}
export type DrawerListDataArrayObject = {
  [customProperty: string]: any
} & DrawerListDataArrayObjectStrict

export type DrawerListDataArrayItem =
  | DrawerListDataArrayObject
  | DrawerListContent

export type DrawerListDataArray = DrawerListDataArrayItem[]
export type DrawerListDataRecord = Record<string, DrawerListContent>

export type DrawerListDataAll = DrawerListDataRecord | DrawerListDataArray
export type DrawerListSize =
  | 'small'
  | 'medium'
  | 'large'
  | number

export type DrawerListGroup<T> = {
  groupTitle: React.ReactNode
  groupData: T
  /** Make title screen reader only */
  hideTitle?: boolean
}

export type DrawerListGroupTitles = React.ReactNode[]
export type DrawerListOptionsRender = ({
  data,
  Items,
  Item,
}: {
  data: DrawerListDataArrayObject[]
  Items: () => React.ReactNode
  Item: React.ComponentType<DrawerListItemProps>
}) => React.ReactNode
export type DrawerListValue = string | number
export type DrawerListData =
  | string
  | (() => DrawerListDataAll)
  | DrawerListDataAll
export type DrawerListSuffix = React.ReactNode

export type DrawerListEvent = {
  data: DrawerListDataArrayObject | null
  attributes: Record<string, unknown>
  ulElement?: HTMLUListElement | null
}

export type DrawerListChangeEvent = {
  selectedItem: number | null
  value: string | number
  data: DrawerListDataArrayObject | null
  event: React.SyntheticEvent | null
  attributes: Record<string, unknown>
}

export type DrawerListSelectEvent = DrawerListChangeEvent & {
  activeItem: number | string
}

export type DrawerListResizeEvent = {
  direction: string
  maxHeight: number
}

export type DrawerListProps = {
  id?: string
  role?: string
  /**
   * Set a `cacheHash` as a string to enable internal memorizing of the list to enhance rerendering performance. Components like Autocomplete are using this because of the huge data changes due to search and reorder.
   */
  cacheHash?: string
  /**
   * Position of the arrow on the popup drawer. Set to 'left' or 'right'. Defaults to 'left' if not set.
   */
  arrowPosition?: string
  /**
   * Defines if the options list should be scrollable (the `max-height` is set by default to `50vh`).
   */
  scrollable?: boolean
  /**
   * If set to `true`, the element is then focusable by assertive technologies.
   */
  focusable?: boolean
  /**
   * Defines the direction of how the drawer-list shows the options list. Can be 'bottom' or 'top'. Defaults to 'auto'.
   */
  direction?: 'auto' | 'top' | 'bottom'
  size?: DrawerListSize
  /**
   * Defines the minimum height (in `rem`) of the options list.
   */
  minHeight?: string | number
  /**
   * Defines the maximum height (in `rem`) of the options list.
   */
  maxHeight?: string | number
  /**
   * To disable appear/disappear (show/hide) animation.
   */
  noAnimation?: boolean
  /**
   * To disable scrolling animation.
   */
  noScrollAnimation?: boolean
  /**
   * If set to `true`, the DrawerList will then not make any permanent selection.
   */
  preventSelection?: boolean
  actionMenu?: boolean
  isPopup?: boolean
  /**
   * Use 'right' to change the options alignment direction. Makes only sense to use in combination with `preventSelection` or `moreMenu` - or if an independent width is used.
   */
  alignDrawer?: 'left' | 'right'
  /**
   * Has to be a function, returning the items again. See [example](/uilib/components/fragments/drawer-list#example-usage-of-optionsRender). This can be used to add additional options above the actual rendered list.
   */
  optionsRender?: DrawerListOptionsRender
  /**
   * Has to be an HTML Element, ideally a mother element, used to calculate sizes and distances. Also used for the 'click outside' detection. Clicking on the `wrapperElement` will not trigger an outside click.
   */
  wrapperElement?: string | HTMLElement
  /**
   * Define a startup value or handle a re-render without handling the state during the re-render by yourself. Defaults to null.
   */
  defaultValue?: DrawerListValue
  /**
   * Define a preselected `data` entry. In order of priority, `value` can be set to: object key (if `data` is an object), `selectedKey` prop (if `data` is an array), array index (if no `selectedKey`) or content (if `value` is a non-integer string).
   */
  value?: DrawerListValue
  /**
   * To disable the React Portal behavior.
   */
  skipPortal?: boolean
  /**
   * Define an HTML class that will be set on the DOM portal beside `dnb-drawer-list__portal__style`. Can be useful to handle e.g. a custom `z-index` in relation to a header.
   */
  portalClass?: string
  /**
   * Define an HTML class that will be set on the list, beside `dnb-drawer-list__list`.
   */
  listClass?: string
  /**
   * If set to `true`, the DrawerList will not close on any events.
   */
  preventClose?: boolean
  /**
   * If set to `true`, the DrawerList will handle its width and position independently of the parent/mother element.
   */
  independentWidth?: boolean
  /**
   * If set to `true`, the DrawerList will be fixed in its scroll position by using CSS `position: fixed;`.
   */
  fixedPosition?: boolean
  /**
   * If set to `true`, the DrawerList will close on outside clicks, but not on selection.
   */
  keepOpen?: boolean
  preventFocus?: boolean
  /**
   * If set to `true`, search items by the first key will be ignored.
   */
  skipKeysearch?: boolean
  /**
   * If set to `true`, the DrawerList will be open. Use together with onHide/onShow to control visibility.
   */
  open?: boolean
  data?: DrawerListData
  groups?: DrawerListGroupTitles
  /**
   * If set to `true`, all keyboard and mouse events will be ignored.
   */
  ignoreEvents?: boolean
  className?: string
  /** Accepts the same values as the `data` prop. Will be ignored if `data` is used. Can also accept a single child for custom rendering. */
  children?: DrawerListData | React.ReactElement
  suffix?: DrawerListSuffix
  /**
   * If set to `true`, the HTML body will get locked from scrolling when the Dropdown is open.
   */
  enableBodyLock?: boolean
  /**
   * Defines the available scrollable height. If scrolling should not change the height of the drawer-list, then set it to `0` (useful if the DrawerList is used in fixed positions on contrast to a scrollable page content).
   */
  pageOffset?: string | number
  /**
   * Set a HTML element, either as a selector or a DOM element. Can be used to send in an element which will be used to make the direction calculation on.
   */
  observerElement?: string | React.ReactNode
  onOpen?: (event: DrawerListEvent) => void
  onClose?: (event: DrawerListEvent) => void
  handleDismissFocus?: () => void
  onChange?: (event: DrawerListChangeEvent) => void
  onPreChange?: (event: DrawerListChangeEvent) => boolean | void
  onResize?: (event: DrawerListResizeEvent) => void
  onSelect?: (event: DrawerListSelectEvent) => void
}

// Internal data structures
export type DrawerListInternalItem = {
  __id: number
} & DrawerListDataArrayObject

export type DrawerListInternalData = Array<DrawerListInternalItem>

export type DrawerListRenderData = Array<
  DrawerListGroup<DrawerListInternalData>
>

export type DrawerListAllProps = DrawerListProps &
  SpacingProps &
  Omit<
    React.HTMLProps<HTMLElement>,
    | 'ref'
    | 'size'
    | 'label'
    | 'placeholder'
    | 'data'
    | 'children'
    | 'onChange'
    | 'onSelect'
    | 'onResize'
  >
function DrawerList(props: DrawerListAllProps) {
  const drawerListContext = useContext(DrawerListContext)

  if (drawerListContext?.drawerList) {
    return <DrawerListInstance {...props} />
  }

  const { data, children, ...rest } = props

  return (
    <DrawerListProvider
      {...rest}
      data={
        data ||
        (!React.isValidElement(children)
          ? (children as DrawerListData)
          : undefined)
      }
    >
      <DrawerListInstance {...props} />
    </DrawerListProvider>
  )
}
DrawerList.blurDelay = DrawerListProvider.blurDelay // some ms more than "DrawerListSlideDown 200ms"

const DrawerListInstance = React.memo(function DrawerListInstance(
  ownProps: DrawerListAllProps
) {
  const context = useContext(DrawerListContext)

  const propsWithDefaults = {
    ...drawerListDefaultProps,
    ...removeUndefinedProps({ ...ownProps }),
  }

  // Send along event handlers and arrowPosition to the provider state on mount
  useMountEffect(() => {
    const eventHandlerState = Object.keys(propsToFilterOut).reduce<
      Record<string, unknown>
    >((acc, key) => {
      if (propsWithDefaults[key as keyof typeof propsWithDefaults]) {
        acc[key] = propsWithDefaults[key as keyof typeof propsWithDefaults]
      }
      return acc
    }, {})

    context.drawerList.setState(eventHandlerState)
    context.drawerList.setState({
      arrowPosition: propsWithDefaults.arrowPosition,
    })
  })

  const preventTab = useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case 'Tab':
          if (!context.drawerList.hasFocusOnElement) {
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
    [context.drawerList]
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

  const {
    role,
    alignDrawer,
    fixedPosition,
    independentWidth,
    scrollable,
    focusable,
    size,
    noAnimation,
    noScrollAnimation,
    preventSelection,
    actionMenu,
    isPopup,
    portalClass,
    listClass,
    ignoreEvents,
    optionsRender,
    className,
    cacheHash: _cacheHash,
    wrapperElement: _wrapperElement,
    arrowPosition: _arrowPosition,
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

    ...attributes
  } = propsWithDefaults as DrawerListAllProps & {
    onKeyDown?: (e: React.KeyboardEvent) => void
  }

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
    arrowPosition,
    direction,
    maxHeight,
    cacheHash,
    selectedItem,
    activeItem,
    showFocusRing,
    closestToTop,
    closestToBottom,
    skipPortal,
    addObservers,
    removeObservers,
    _refShell,
    _refTriangle,
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

  const mainParams = {
    id: `${id}-drawer-list`,
    className: clsx(
      'dnb-drawer-list',
      open && 'dnb-drawer-list--open',
      hidden && 'dnb-drawer-list--hidden',
      `dnb-drawer-list--${direction}`,
      arrowPosition && `dnb-drawer-list--arrow-position-${arrowPosition}`,
      alignDrawer && `dnb-drawer-list--${alignDrawer}`,
      size && `dnb-drawer-list--${size}`,
      actionMenu && `dnb-drawer-list--action-menu`,
      isPopup && 'dnb-drawer-list--is-popup',
      (independentWidth || actionMenu) &&
        'dnb-drawer-list--independent-width',
      scrollable && 'dnb-drawer-list--scroll',
      noScrollAnimation && 'dnb-drawer-list--no-scroll-animation',
      createSpacingClasses(propsWithDefaults),
      className
    ),
    ...attributes,
  }

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

  const GroupItems = () =>
    renderData
      .filter(Boolean) // filter out empty groups
      .map(({ groupTitle, groupData: data, hideTitle }, j) => {
        const Items = () =>
          data.map((dataItem, i) => {
            const { __id, ignoreEvents, className, disabled, style } =
              dataItem
            const hash = `option-${id}-${__id}-${i}`
            const tagId = `option-${id}-${__id}`
            const liParams = {
              role: role === 'menu' ? 'menuitem' : 'option',
              'data-item': __id,
              id: tagId,
              hash,
              className: clsx(
                // helper classes
                j === 0 && i === 0 && 'first-item',
                j === renderData.length - 1 &&
                  i === data.length - 1 &&
                  'last-item',
                tagId === closestToTop && 'closest-to-top',
                tagId === closestToBottom && 'closest-to-bottom',
                i === 0 && 'first-of-type', // because of the triangle element
                i === data.length - 1 && 'last-of-type', // because of the triangle element
                (ignoreEventsBoolean || ignoreEvents) && 'ignore-events',
                className
              ),
              active: __id === activeItem,
              selected: !ignoreEvents && __id === selectedItem,
              onClick: selectItemHandler,
              onKeyDown: preventTab,
              disabled: disabled,
              style: style,
            }
            if (ignoreEventsBoolean) {
              liParams.active = null
              liParams.selected = null
              liParams.onClick = null
              liParams.onKeyDown = null
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
          })
        const ItemsRendered = () =>
          typeof optionsRender === 'function' ? (
            optionsRender({ data, Items, Item: DrawerList.Item })
          ) : (
            <Items />
          )
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
                  hideTitle && 'dnb-sr-only',
                  groupdId === closestToBottom && 'closest-to-bottom',
                  groupdId === closestToTop && 'closest-to-top'
                )}
              >
                {groupTitle}
              </li>
              <ItemsRendered />
            </ul>
          )
        } else {
          return <ItemsRendered key={j} />
        }
      })

  const mainList = (
    <span {...mainParams} ref={_refShell}>
      <span {...listParams}>
        {hidden === false && renderData.length > 0 ? (
          <>
            <DrawerList.Options
              hasGroups={hasGroups}
              cacheHash={
                cacheHash +
                activeItem +
                selectedItem +
                closestToTop +
                closestToBottom +
                direction +
                maxHeight
              }
              {...ulParams}
              showFocusRing={showFocusRing}
              triangleRef={_refTriangle}
            >
              <GroupItems />
            </DrawerList.Options>
            <OnMounted
              addObservers={addObservers}
              removeObservers={removeObservers}
            />
          </>
        ) : (
          React.isValidElement(children) && (
            <span className="dnb-drawer-list__content">
              {children}
              <span
                className="dnb-drawer-list__arrow"
                ref={_refTriangle}
              />
            </span>
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
        className={getThemeClasses(context?.theme, portalClass)}
        skipPortal={skipPortal}
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

export type DrawerListOptionsProps = React.HTMLProps<HTMLUListElement> & {
  children: React.ReactNode
  triangleRef?: React.Ref<HTMLLIElement | HTMLSpanElement>
  cacheHash?: string
  showFocusRing?: boolean
  hasGroups?: boolean
}
// DrawerList List
DrawerList.Options = React.memo(
  ({
    children,
    className,
    triangleRef,
    cacheHash,
    showFocusRing = false,
    hasGroups = false,
    ref,
    ...rest
  }: DrawerListOptionsProps & {
    ref?: React.Ref<HTMLUListElement | HTMLSpanElement>
  }) => {
    return (
      <E
        internalClass={false}
        as={hasGroups ? 'span' : 'ul'}
        className={clsx(
          'dnb-drawer-list__options',
          showFocusRing && 'dnb-drawer-list__options--focusring',
          className
        )}
        {...rest}
        ref={ref}
      >
        {children}
        <E
          internalClass={false}
          as={hasGroups ? 'span' : 'li'}
          className="dnb-drawer-list__arrow"
          aria-hidden
          ref={triangleRef}
        />
      </E>
    )
  },
  (prevProps, nextProps) => {
    if (!prevProps.cacheHash) {
      return false
    }
    return prevProps.cacheHash === nextProps.cacheHash
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
