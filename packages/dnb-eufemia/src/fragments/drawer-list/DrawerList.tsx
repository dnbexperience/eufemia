/**
 * Web List Component
 *
 * This is a legacy component.
 * For referencing while developing new features, please use a Functional component.
 */

import React, { useContext } from 'react'
import classnames from 'classnames'
import {
  isTrue,
  extendPropsWithContextInClassComponent,
  validateDOMAttributes,
  keycode,
  warn,
} from '../../shared/component-helper'
import type { SpacingProps } from '../../shared/types'
import type { Translation } from '../../shared/Context'

import { getThemeClasses } from '../../shared/Theme'
import { createSpacingClasses } from '../../components/space/SpacingHelper'

import E from '../../elements/Element'
import DrawerListContext, {
  DrawerListContextProps,
} from './DrawerListContext'
import DrawerListProvider from './DrawerListProvider'
import DrawerListPortal from './DrawerListPortal'
import { drawerListDefaultProps } from './DrawerListHelpers'
import { DrawerListHorizontalItem, DrawerListItem } from './DrawerListItem'
import type { DrawerListItemProps } from './DrawerListItem'

const propsToFilterOut = {
  on_show: null,
  on_hide: null,
  handle_dismiss_focus: null,
  on_change: null,
  on_pre_change: null,
  on_resize: null,
  on_select: null,
  on_state_update: null,
  on_key_down: null,
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
  | 'default'
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
  Items: React.FunctionComponent
  Item: React.FC<DrawerListItemProps>
}) => React.ReactNode
export type DrawerListValue = string | number
export type DrawerListData =
  | string
  | ((...args: any[]) => DrawerListDataAll)
  | DrawerListDataAll
export type DrawerListSuffix = React.ReactNode

export interface DrawerListProps {
  id?: string
  role?: string
  /**
   * Set a `cacheHash` as a string to enable internal memorizing of the list to enhance rerendering performance. Components like Autocomplete are using this because of the huge data changes due to search and reorder.
   */
  cacheHash?: string
  /**
   * Position of the arrow icon/triangle inside the drawer-list. Set to 'left' or 'right'. Defaults to 'left' if not set.
   */
  trianglePosition?: string
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
  no_animation?: boolean
  /**
   * To disable scrolling animation.
   */
  noScrollAnimation?: boolean
  /**
   * If set to `true`, the DrawerList will then not make any permanent selection.
   */
  preventSelection?: boolean
  action_menu?: boolean
  is_popup?: boolean
  /**
   * Use 'right' to change the options alignment direction. Makes only sense to use in combination with `preventSelection` or `more_menu` - or if an independent width is used.
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
  prevent_focus?: boolean
  /**
   * If set to `true`, search items by the first key will be ignored.
   */
  skipKeysearch?: boolean
  opened?: boolean
  data?: DrawerListData
  groups?: DrawerListGroupTitles
  prepared_data?: any[]
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
  on_show?: (...args: any[]) => any
  on_hide?: (...args: any[]) => any
  handle_dismiss_focus?: (...args: any[]) => any
  on_change?: (...args: any[]) => any
  on_pre_change?: (...args: any[]) => any
  on_resize?: (...args: any[]) => any
  on_select?: (...args: any[]) => any
  on_state_update?: (...args: any[]) => any
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
    'ref' | 'size' | 'label' | 'placeholder' | 'data' | 'children'
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
DrawerList.blurDelay = DrawerListProvider.blurDelay // some ms more than "DrawerListSlideDown 200ms" = 201 // some ms more than "DrawerListSlideDown 200ms"

class DrawerListInstance extends React.Component<DrawerListAllProps> {
  static defaultProps = {
    ...drawerListDefaultProps,
  }
  static contextType = DrawerListContext
  context!: React.ContextType<typeof DrawerListContext>

  constructor(props) {
    super(props)

    this.state = this.state || {}
  }

  componentDidMount() {
    // send along the event handlers to the provider state

    this.context.drawerList.setState(
      Object.entries(propsToFilterOut).reduce((acc, [key]) => {
        if (this.props[key]) {
          acc[key] = this.props[key]
        }
        return acc
      }, {})
    )

    this.context.drawerList.setState({
      trianglePosition: this.props.trianglePosition,
    })
  }
  preventTab = (e) => {
    switch (keycode(e)) {
      case 'tab':
        if (!this.context.drawerList.hasFocusOnElement) {
          e.preventDefault()
          this.context.drawerList.setHidden()
        }
        break

      case 'page down':
      case 'page up':
        e.preventDefault()
        break
    }
  }

  selectItemHandler = (event) => {
    // In case we want to stop if the users makes a number selection.
    // Should optional
    // if (getClosestParent('dnb-number-format', event.target)) {
    //   return // stop
    // }
    const selected_item = parseFloat(
      event.currentTarget.getAttribute('data-item')
    )
    if (selected_item > -1) {
      this.context.drawerList.selectItemAndClose(selected_item, {
        fireSelectEvent: true,
        event,
      })
    }
  }

  render() {
    // use only the props from context, who are available here anyway
    const props = extendPropsWithContextInClassComponent(
      this.props,
      DrawerListInstance.defaultProps
      // TODO: should we only allow getTranslation if we define lang and locale props?
      // this.context.getTranslation(this.props).Button
    )
    const {
      role,
      alignDrawer,
      fixedPosition,
      independentWidth,
      scrollable,
      focusable,
      size,
      no_animation,
      noScrollAnimation,
      preventSelection,
      action_menu,
      is_popup,
      portalClass,
      listClass,
      ignoreEvents,
      optionsRender,
      className,
      cacheHash: _cacheHash, // eslint-disable-line
      wrapperElement: _wrapperElement, // eslint-disable-line
      trianglePosition: _trianglePosition, // eslint-disable-line
      direction: _direction, // eslint-disable-line
      maxHeight: _maxHeight, // eslint-disable-line
      id: _id, // eslint-disable-line
      data: _data, // eslint-disable-line
      opened: _opened, // eslint-disable-line
      value: _value, // eslint-disable-line
      keepOpen: _keepOpen, // eslint-disable-line
      preventClose: _preventClose, // eslint-disable-line
      skipKeysearch: _skipKeysearch, // eslint-disable-line
      skipPortal: _skipPortal, // eslint-disable-line
      enableBodyLock: _enableBodyLock, // eslint-disable-line
      children,
      ...attributes
    } = props

    function noNullNumbers({
      selected_item,
      active_item,
      maxHeight,
      ...rest
    }: DrawerListContextProps['drawerList']): DrawerListContextProps['drawerList'] {
      return {
        selected_item: selected_item ?? undefined,
        active_item: active_item ?? undefined,
        maxHeight: maxHeight ?? undefined,
        ...rest,
      }
    }

    const {
      id,
      data,
      groups,
      opened,
      hidden,
      trianglePosition,
      direction,
      maxHeight,
      cacheHash,
      selected_item,
      active_item,
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
    } = noNullNumbers(this.context.drawerList)

    const renderData = makeRenderData(
      data,
      groups,
      this.context.getTranslation(this.props).DrawerList
    )
    const hasGroups =
      renderData.length > 1 || renderData[0]?.groupTitle !== undefined

    const mainParams = {
      id: `${id}-drawer-list`,
      className: classnames(
        'dnb-drawer-list',
        opened && 'dnb-drawer-list--opened',
        hidden && 'dnb-drawer-list--hidden',
        `dnb-drawer-list--${direction}`,
        trianglePosition &&
          `dnb-drawer-list--triangle-position-${trianglePosition}`,
        alignDrawer && `dnb-drawer-list--${alignDrawer}`,
        size && `dnb-drawer-list--${size}`,
        isTrue(action_menu) && `dnb-drawer-list--action-menu`,
        isTrue(is_popup) && 'dnb-drawer-list--is-popup',
        (isTrue(independentWidth) || isTrue(action_menu)) &&
          'dnb-drawer-list--independent-width',
        isTrue(scrollable) && 'dnb-drawer-list--scroll',
        isTrue(noScrollAnimation) &&
          'dnb-drawer-list--no-scroll-animation',
        createSpacingClasses(props),
        className
      ),
      ...attributes,
    }

    const listParams = {
      id: `${id}-listbox`,
      /**
       * We may consider to use the hidden attribute in future
       * Or we may add an prop to put the HTML in the DOM, if needed
       */
      // hidden: hidden !== false,
      className: classnames(
        'dnb-drawer-list__list',
        isTrue(no_animation) && 'dnb-drawer-list__list--no-animation',
        listClass
      ),
    }

    const ulParams = {
      role,
      id: `${id}-ul`,
      'aria-expanded': opened,
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
        this.context.drawerList.ariaActiveDescendant
    }

    if (isTrue(focusable)) {
      ulParams.tabIndex = 0
    }

    // also used for code markup simulation
    validateDOMAttributes(this.props, mainParams)
    validateDOMAttributes(null, listParams)
    validateDOMAttributes(null, ulParams)

    // make it possible to grab the rest attributes and return it with all events
    Object.assign(
      this.context.drawerList.attributes,
      validateDOMAttributes(null, attributes)
    )

    const ignoreEventsBoolean = isTrue(ignoreEvents)

    const GroupItems = () =>
      renderData
        .filter(Boolean) // filter out empty groups
        .map(({ groupTitle, groupData: data, hideTitle }, j) => {
          const Items = () =>
            data.map((dataItem, i) => {
              const { __id, ignore_events, class_name, disabled, style } =
                dataItem
              const hash = `option-${id}-${__id}-${i}`
              const tagId = `option-${id}-${__id}`
              const liParams = {
                role: role === 'menu' ? 'menuitem' : 'option',
                'data-item': __id,
                id: tagId,
                hash,
                className: classnames(
                  // helper classes
                  j === 0 && i === 0 && 'first-item',
                  j === renderData.length - 1 &&
                    i === data.length - 1 &&
                    'last-item',
                  tagId === closestToTop && 'closest-to-top',
                  tagId === closestToBottom && 'closest-to-bottom',
                  i === 0 && 'first-of-type', // because of the triangle element
                  i === data.length - 1 && 'last-of-type', // because of the triangle element
                  (ignoreEventsBoolean || ignore_events) &&
                    'ignore-events',
                  class_name
                ),
                active: __id === active_item,
                selected: !ignore_events && __id === selected_item,
                onClick: this.selectItemHandler,
                onKeyDown: this.preventTab,
                disabled: disabled,
                style: style,
              }
              if (ignoreEventsBoolean) {
                liParams.active = null
                liParams.selected = null
                liParams.onClick = null
                liParams.onKeyDown = null
                liParams.className = classnames(
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
                className={classnames(
                  'dnb-drawer-list__group',
                  j === 0 && 'first-of-type',
                  j === renderData.length - 1 && 'last-of-type'
                )}
              >
                <li
                  id={groupdId}
                  role="presentation"
                  className={classnames(
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
                  active_item +
                  selected_item +
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
                  className="dnb-drawer-list__triangle"
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
        className={classnames(
          'dnb-drawer-list__root',
          !skipPortal && 'dnb-drawer-list__root--portal'
        )}
        ref={_refRoot}
      >
        <DrawerListPortal
          id={id}
          rootRef={_refRoot}
          opened={hidden === false}
          include_owner_width={alignDrawer === 'right'}
          independentWidth={isTrue(independentWidth)}
          fixedPosition={isTrue(fixedPosition)}
          className={getThemeClasses(this.context?.theme, portalClass)}
          skipPortal={skipPortal}
        >
          {mainList}
        </DrawerListPortal>
      </span>
    )
  }
}

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
  triangleRef?: React.ForwardedRef<HTMLLIElement | HTMLSpanElement>
  cacheHash?: string
  showFocusRing?: boolean
  hasGroups?: boolean
}
// DrawerList List
DrawerList.Options = React.memo(
  React.forwardRef(
    (
      props: DrawerListOptionsProps,
      ref: React.ForwardedRef<HTMLUListElement | HTMLSpanElement>
    ) => {
      const {
        children,
        className,
        triangleRef,
        cacheHash, // eslint-disable-line
        showFocusRing = false,
        hasGroups = false,
        ...rest
      } = props

      return (
        <E
          internalClass={false}
          as={hasGroups ? 'span' : 'ul'}
          className={classnames(
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
            className="dnb-drawer-list__triangle"
            aria-hidden
            ref={triangleRef}
          />
        </E>
      )
    }
  ),
  (prevProps, nextProps) => {
    if (!prevProps.cacheHash) {
      return null
    }
    return prevProps.cacheHash === nextProps.cacheHash
  }
)

DrawerList.Item = DrawerListItem
DrawerList.HorizontalItem = DrawerListHorizontalItem

class OnMounted extends React.PureComponent<{
  addObservers: () => void
  removeObservers: () => void
}> {
  componentDidMount() {
    this.props.addObservers()
  }
  componentWillUnmount() {
    this.props.removeObservers()
  }
  render() {
    return null
  }
}
export default DrawerList
