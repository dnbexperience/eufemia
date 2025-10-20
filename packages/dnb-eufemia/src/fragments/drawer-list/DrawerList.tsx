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
  makeUniqueId,
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
  options_render: null,
  wrapper_element: null,
}

export type DrawerListContent =
  | string
  | React.ReactNode
  | (string | React.ReactNode)[]

export type DrawerListDataArrayObjectStrict = {
  /** index of group supplied in the `groups` prop */
  groupIndex?: number
  selected_value?: string | React.ReactNode
  selectedKey?: string | number
  suffix_value?: string | React.ReactNode
  content: DrawerListContent
  disabled?: boolean
  /** used by Autocomplete for additional search hits */
  search_content?: string | React.ReactNode | string[]
  /** style prop of the html list item */
  style?: React.CSSProperties
  /** classname added to the html list item */
  class_name?: string
  /** set to true to disable mouse events selected style. Keyboard can still select @deprecated */
  ignore_events?: boolean
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
  _id?: string
  role?: string
  /**
   * Set a `cache_hash` as a string to enable internal memorizing of the list to enhance rerendering performance. Components like Autocomplete are using this because of the huge data changes due to search and reorder.
   */
  cache_hash?: string
  /**
   * Position of the arrow icon/triangle inside the drawer-list. Set to 'left' or 'right'. Defaults to 'left' if not set.
   */
  triangle_position?: string
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
  min_height?: string | number
  /**
   * Defines the maximum height (in `rem`) of the options list.
   */
  max_height?: string | number
  /**
   * To disable appear/disappear (show/hide) animation.
   */
  no_animation?: boolean
  /**
   * To disable scrolling animation.
   */
  no_scroll_animation?: boolean
  /**
   * If set to `true`, the DrawerList will then not make any permanent selection.
   */
  prevent_selection?: boolean
  action_menu?: boolean
  is_popup?: boolean
  /**
   * Use 'right' to change the options alignment direction. Makes only sense to use in combination with `prevent_selection` or `more_menu` - or if an independent width is used.
   */
  align_drawer?: 'left' | 'right'
  /**
   * Has to be a function, returning the items again. See [example](/uilib/components/fragments/drawer-list#example-usage-of-options_render). This can be used to add additional options above the actual rendered list.
   */
  options_render?: DrawerListOptionsRender
  /**
   * Has to be an HTML Element, ideally a mother element, used to calculate sizes and distances. Also used for the 'click outside' detection. Clicking on the `wrapper_element` will not trigger an outside click.
   */
  wrapper_element?: string | HTMLElement
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
  skip_portal?: boolean
  /**
   * Define an HTML class that will be set on the DOM portal beside `dnb-drawer-list__portal__style`. Can be useful to handle e.g. a custom `z-index` in relation to a header.
   */
  portal_class?: string
  /**
   * Define an HTML class that will be set on the list, beside `dnb-drawer-list__list`.
   */
  list_class?: string
  /**
   * If set to `true`, the DrawerList will not close on any events.
   */
  prevent_close?: boolean
  /**
   * If set to `true`, the DrawerList will handle its width and position independently of the parent/mother element.
   */
  independent_width?: boolean
  /**
   * If set to `true`, the DrawerList will be fixed in its scroll position by using CSS `position: fixed;`.
   */
  fixed_position?: boolean
  /**
   * If set to `true`, the DrawerList will close on outside clicks, but not on selection.
   */
  keep_open?: boolean
  prevent_focus?: boolean
  /**
   * If set to `true`, search items by the first key will be ignored.
   */
  skip_keysearch?: boolean
  opened?: boolean
  data?: DrawerListData
  groups?: DrawerListGroupTitles
  prepared_data?: any[]
  /**
   * If set to `true`, all keyboard and mouse events will be ignored.
   */
  ignore_events?: boolean
  className?: string
  /** Accepts the same values as the `data` prop. Will be ignored if `data` is used. Can also accept a single child for custom rendering. */
  children?: DrawerListData | React.ReactElement
  suffix?: DrawerListSuffix
  /**
   * If set to `true`, the HTML body will get locked from scrolling when the Dropdown is open.
   */
  enable_body_lock?: boolean
  /**
   * Defines the available scrollable height. If scrolling should not change the height of the drawer-list, then set it to `0` (useful if the DrawerList is used in fixed positions on contrast to a scrollable page content).
   */
  page_offset?: string | number
  /**
   * Set a HTML element, either as a selector or a DOM element. Can be used to send in an element which will be used to make the direction calculation on.
   */
  observer_element?: string | React.ReactNode
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

  const { data, children, id, ...rest } = props
  const _id = id || makeUniqueId()

  return (
    <DrawerListProvider
      id={_id}
      {...rest}
      data={
        data ||
        (!React.isValidElement(children)
          ? (children as DrawerListData)
          : undefined)
      }
    >
      <DrawerListInstance id={_id} {...props} />
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
  _id: string

  constructor(props) {
    super(props)

    this._id = props.id || makeUniqueId()
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
      triangle_position: this.props.triangle_position,
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
    // if (getPreviousSibling('dnb-number-format', event.target)) {
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
      align_drawer,
      fixed_position,
      independent_width,
      scrollable,
      focusable,
      size,
      no_animation,
      no_scroll_animation,
      prevent_selection,
      action_menu,
      is_popup,
      portal_class,
      list_class,
      ignore_events,
      options_render,
      className,
      cache_hash: _cache_hash, // eslint-disable-line
      wrapper_element: _wrapper_element, // eslint-disable-line
      triangle_position: _triangle_position, // eslint-disable-line
      direction: _direction, // eslint-disable-line
      max_height: _max_height, // eslint-disable-line
      id: _id, // eslint-disable-line
      data: _data, // eslint-disable-line
      opened: _opened, // eslint-disable-line
      value: _value, // eslint-disable-line
      children,
      ...attributes
    } = props

    const id = this._id

    function noNullNumbers({
      selected_item,
      active_item,
      max_height,
      ...rest
    }: DrawerListContextProps['drawerList']): DrawerListContextProps['drawerList'] {
      return {
        selected_item: selected_item ?? undefined,
        active_item: active_item ?? undefined,
        max_height: max_height ?? undefined,
        ...rest,
      }
    }

    const {
      data,
      groups,
      opened,
      hidden,
      triangle_position,
      direction,
      max_height,
      cache_hash,
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
        triangle_position &&
          `dnb-drawer-list--triangle-position-${triangle_position}`,
        align_drawer && `dnb-drawer-list--${align_drawer}`,
        size && `dnb-drawer-list--${size}`,
        isTrue(action_menu) && `dnb-drawer-list--action-menu`,
        isTrue(is_popup) && 'dnb-drawer-list--is-popup',
        (isTrue(independent_width) || isTrue(action_menu)) &&
          'dnb-drawer-list--independent-width',
        isTrue(scrollable) && 'dnb-drawer-list--scroll',
        isTrue(no_scroll_animation) &&
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
        list_class
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
          parseFloat(max_height as string) > 0 ? `${max_height}rem` : null,
      },
      ref: _refUl,
    }

    if (
      !hidden &&
      (parseFloat(active_item as string) > -1 ||
        (!(parseFloat(active_item as string) > -1) &&
          !(parseFloat(selected_item as string) > -1)))
    ) {
      ulParams['aria-activedescendant'] = `option-${id}-${
        parseFloat(active_item as string) > -1 ? active_item : 0
      }`
    } else if (
      !isTrue(prevent_selection) &&
      !hidden &&
      parseFloat(selected_item as string) > -1
    ) {
      ulParams['aria-activedescendant'] = `option-${id}-${selected_item}`
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

    const ignoreEvents = isTrue(ignore_events)

    const GroupItems = () =>
      renderData
        .filter(Boolean) // filter out empty groups
        .map(({ groupTitle, groupData: data, hideTitle }, j) => {
          const Items = () =>
            data.map((dataItem, i) => {
              const _id = dataItem.__id
              const hash = `option-${id}-${_id}-${i}`
              const tagId = `option-${id}-${_id}`
              const liParams = {
                role: role === 'menu' ? 'menuitem' : 'option',
                'data-item': _id,
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
                  ignoreEvents ||
                    (dataItem.ignore_events && 'ignore-events'),
                  dataItem.class_name
                ),
                active: _id == active_item,
                selected: !dataItem.ignore_events && _id == selected_item,
                onClick: this.selectItemHandler,
                onKeyDown: this.preventTab,
                disabled: dataItem.disabled,
                style: dataItem.style,
              }
              if (ignoreEvents) {
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
            typeof options_render === 'function' ? (
              options_render({ data, Items, Item: DrawerList.Item })
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
                cache_hash={
                  cache_hash +
                  active_item +
                  selected_item +
                  closestToTop +
                  closestToBottom +
                  direction +
                  max_height
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
          id={this._id}
          rootRef={_refRoot}
          opened={hidden === false}
          include_owner_width={align_drawer === 'right'}
          independent_width={isTrue(independent_width)}
          fixed_position={isTrue(fixed_position)}
          className={getThemeClasses(this.context?.theme, portal_class)}
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
  cache_hash?: string
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
        cache_hash, // eslint-disable-line
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
    if (!prevProps.cache_hash) {
      return null
    }
    return prevProps.cache_hash === nextProps.cache_hash
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
